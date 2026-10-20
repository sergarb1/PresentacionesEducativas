LICENCIA

**Reconocimiento \- No comercial \- CompartirIgual (BY-NC-SA)**: No se permite un uso comercial de la obra original ni de las posibles obras derivadas, la distribución de las cuales se ha de hacer con una licencia igual a la que regula la obra original.

**ÍNDICE**

[**1\. Qué es un proceso	3**](#1.-qué-es-un-proceso)

[**2\. Estados de un proceso	5**](#2.-estados-de-un-proceso)

[**3\. Paralela vs Distribuida	7**](#3.-paralela-vs-distribuida)

[**4\. subprocess.run()	10**](#4.-subprocess.run\(\))

[**5\. subprocess.Popen()	13**](#5.-subprocess.popen\(\))

[**6\. Comunicación con procesos	15**](#6.-comunicación-con-procesos)

[**7\. Compatibilidad Windows / Linux	18**](#7.-compatibilidad-windows-/-linux)

[**8\. Procesos nativos en Python con multiprocessing	20**](#8.-procesos-nativos-en-python-con-multiprocessing)

[**9\. Procesos en la práctica	25**](#9.-procesos-en-la-práctica)

[**10\. Cierre: consolida lo aprendido	27**](#10.-cierre:-consolida-lo-aprendido)

# 

***Unidad 02 \- Gestión de procesos***

# **1\. Qué es un proceso** {#1.-qué-es-un-proceso}

## **📬 La idea en una frase**

Un **proceso** es un programa en ejecución con su propio espacio de memoria, recursos (archivos abiertos, sockets) y un identificador único llamado **PID**.

Un programa en el disco duro es un **muerto viviente**: no hace nada. Un proceso es ese mismo programa **vivo**, ocupando memoria, consumiendo CPU y respondiendo al teclado, a la red o al ratón. La diferencia no está en el código: está en que el sistema operativo lo ha cargado en memoria y lo está ejecutando.

| import osprint(f"Este proceso se llama PID {os.getpid()}") |
| :---- |

Cada vez que ejecutas ese programa, el sistema operativo crea un proceso nuevo con su propio PID.

## **🫧 La burbuja de memoria**

Cada proceso vive en su propia **burbuja de memoria**: un espacio de direcciones aislado del resto del sistema. Dentro de esa burbuja viajan:

![][image1]

* **Código**: las instrucciones del programa.  
* **Estado**: los valores actuales de las variables.  
* **Contador de programa**: qué instrucción toca ejecutar ahora.  
* **PID**: el carnet de identidad del proceso (técnicamente lo guarda el sistema operativo en su tabla de procesos, no dentro de la memoria del proceso; aquí lo dibujamos junto por claridad).

“Si un proceso se cuelga, los demás no se enteran. Cada uno vive en su burbuja de memoria.”

## **🪪 El PID, el carnet de identidad**

Cada proceso tiene un **PID** (*Process IDentifier*): un número único que asigna el sistema operativo en el momento de crearlo. Sirve para referirse a él, para matarlo, para vigilarlo.

| import osprint(f"Mi PID es {os.getpid()}") |
| :---- |

Para ver los procesos de tu sistema con sus PIDs:

* **Windows**: Administrador de tareas → pestaña “Detalles”, o tasklist en la terminal.  
* **Linux / macOS**: ps aux o top.

## **📋 Características de un proceso**

| Propiedad | Descripción |
| ----- | ----- |
| PID | Identificador único numérico |
| Memoria propia | Cada proceso tiene su espacio de direcciones aislado |
| Recursos | Archivos, sockets, manejadores |
| Contexto | Estado de la CPU, registros, contador de programa |
| Comunicación | Necesita mecanismos externos (pipes, sockets, archivos) |

La última fila es la clave: los procesos **no comparten memoria por defecto**. Si quieren intercambiar datos necesitan un mecanismo externo: un archivo, un socket o un pipe. 

## **🍳 La analogía de la cocina**

Un proceso es una **receta en marcha** en una cocina. La receta escrita en el libro es el **programa** (código muerto en el disco). Cuando un cocinero la coge, pone los ingredientes sobre su mesa (memoria), empieza a leerla por el paso 1 (contador de programa) y recibe su propio número de pedido (PID).

Cada cocinero con su receta y su mesa: si uno se quema, los demás siguen cocinando sin enterarse. Eso es el **aislamiento** de la burbuja de memoria. Más adelante verás qué pasa cuando hay varias cocinas (varias CPUs) o varios restaurantes (varias máquinas).

## **🧠 Mini-chequeo**

1. ¿Qué es el PID y para qué sirve?  
2. ¿Qué contiene la burbuja de memoria de un proceso?  
3. ¿Por qué dos procesos no pueden compartir una variable directamente?

**🔄 Respuestas**

1. Es el **identificador único numérico** que el sistema operativo asigna a cada proceso para referirse a él.  
2. El **código**, el **estado** de las variables, el **contador de programa** y el **PID**.  
3. Porque cada uno vive en su **burbuja de memoria aislada**; para intercambiar datos necesitan mecanismos externos (pipes, sockets, archivos).

## **✅ Resumen en 3 frases**

* Un proceso es un programa **en ejecución** con memoria, recursos y un PID propio.  
* Su burbuja de memoria contiene código, estado, contador de programa y PID, aislada del resto.  
* Los procesos no comparten memoria: se comunican con mecanismos externos.

## **🐛 Vocabulario rápido**

| Término | Idea general |
| ----- | ----- |
| Proceso | Programa en ejecución con memoria y recursos propios |
| PID | Identificador único del proceso |
| Burbuja de memoria | Espacio de direcciones aislado de cada proceso |
| Contador de programa | Qué instrucción toca ejecutar ahora |
| Contexto | Estado de la CPU, registros y contador del proceso |

# **2\. Estados de un proceso** {#2.-estados-de-un-proceso}

## **📬 La idea en una frase**

Un proceso no está siempre “ejecutándose”: nace, espera su turno, usa la CPU, se bloquea esperando recursos y finalmente muere. Esos **cinco estados** forman su ciclo de vida.

El sistema operativo gestiona decenas o cientos de procesos a la vez con una sola CPU (o pocas). Para que todo parezca simultáneo, reparte la CPU en porciones de tiempo y cada proceso va pasando de estado según lo que le toca.

## **🔄 El ciclo de vida de un proceso**

![][image2]

* De **LISTO** solo se puede ir a **EJECUCIÓN** (la CPU toca) y volver.  
* De **EJECUCIÓN** se va a **LISTO** (time slice), a **BLOQUEADO** (E/S) o a **TERMINADO**.  
* De **BLOQUEADO** se vuelve siempre a **LISTO** cuando la E/S termina.

| Estado | Qué significa |
| ----- | ----- |
| **NUEVO** | El proceso acaba de ser creado |
| **LISTO** | Preparado para ejecutar, esperando que la CPU esté libre |
| **EJECUCIÓN** | La CPU está ejecutando sus instrucciones |
| **BLOQUEADO** | Esperando un recurso (I/O, socket, sleep) |
| **TERMINADO** | El proceso ha finalizado |

## **🚦 Las transiciones, una a una**

* **NUEVO → LISTO**: el proceso ya está cargado y espera su turno de CPU.  
* **LISTO → EJECUCIÓN**: el planificador (*scheduler*) le entrega la CPU.  
* **EJECUCIÓN → LISTO**: el planificador se la quita porque llega otro con más prioridad o por **time slice** (cada proceso tiene una porción de tiempo).  
* **EJECUCIÓN → BLOQUEADO**: el proceso pide una operación de E/S (leer un archivo, esperar un socket, time.sleep) y no puede continuar hasta que llegue el dato.  
* **BLOQUEADO → LISTO**: la E/S ha terminado y el proceso vuelve a la cola de preparados.  
* **EJECUCIÓN → TERMINADO**: el proceso acaba (return, sys.exit(), o lo matan).

💡 **LISTO y BLOQUEADO no son lo mismo.** LISTO significa “puedo ejecutar, solo espero a que la CPU me toque”. BLOQUEADO significa “no puedo ejecutar aunque me dieran la CPU: estoy esperando un recurso”.

## **🍵 El ejemplo de la cafetería**

Imagina una cola de gente en una cafetería con un único camarero:

* Entras por la puerta → **NUEVO**.  
* Te pones en la cola → **LISTO** (esperando al camarero).  
* El camarero te atiende → **EJECUCIÓN**.  
* Pides un café y el camarero se va a la máquina → **BLOQUEADO** (esperando el recurso “café”).  
* El café está listo y vuelves a la cola → **LISTO**.  
* El camarero te lo entrega → **EJECUCIÓN**.  
* Pagas y te vas → **TERMINADO**.

El camarero (la CPU) alterna entre los clientes de la cola dando a cada uno unos segundos: por eso una sola CPU puede atender a muchos procesos “a la vez”.

## **🧠 Mini-chequeo**

1. ¿Qué diferencia hay entre LISTO y BLOQUEADO?  
2. ¿Qué transición ocurre cuando un proceso llama a time.sleep(2)?  
3. Un proceso está ejecutándose y el planificador le quita la CPU porque llega otro con más prioridad. ¿A qué estado pasa?

**🔄 Respuestas**

1. LISTO \= “puedo ejecutar, solo espero a que la CPU me toque”. BLOQUEADO \= “estoy esperando un recurso y no puedo ejecutar aunque me dieran la CPU”.  
2. **EJECUCIÓN → BLOQUEADO**: el proceso pide una espera de E/S y se bloquea hasta que pasa el tiempo.  
3. A **LISTO**: sigue preparado para ejecutar, solo ha perdido su turno de CPU.

## **✅ Resumen en 3 frases**

* Un proceso recorre cinco estados: **NUEVO, LISTO, EJECUCIÓN, BLOQUEADO y TERMINADO**.  
* LISTO y BLOQUEADO son distintos: uno espera CPU y el otro espera un recurso.  
* El planificador reparte la CPU y por eso un solo procesador parece ejecutar muchos procesos a la vez.

## **🐛 Vocabulario rápido**

| Término | Idea general |
| ----- | ----- |
| NUEVO | El proceso acaba de crearse |
| LISTO | Preparado, esperando que la CPU se libre |
| EJECUCIÓN | La CPU está ejecutando sus instrucciones |
| BLOQUEADO | Esperando un recurso (I/O, socket, sleep) |
| TERMINADO | El proceso ha finalizado |
| Planificador (scheduler) | Decide qué proceso LISTO pasa a EJECUCIÓN |

# **3\. Paralela vs Distribuida** {#3.-paralela-vs-distribuida}

## **📬 La idea en una frase**

**Paralela** es ejecutar varias tareas **a la vez** en varias CPUs; **distribuida** es ejecutarlas en **múltiples máquinas** conectadas por red; **concurrencia** es que varias tareas **avancen**, aunque se turnen en una sola CPU.

La diferencia está en el “dónde”: la paralela reparte trabajo entre los núcleos de tu máquina, la distribuida entre máquinas, y la concurrencia es una forma de *parecer* simultáneo aunque físicamente no lo sea.

## **🤹 La tabla de los tres conceptos**

| Concepto | Qué significa |
| ----- | ----- |
| Paralela | Varias tareas ejecutándose a la vez en múltiples CPUs/núcleos |
| Distribuida | Varias tareas ejecutándose en múltiples máquinas conectadas por red |
| Concurrencia | Varias tareas avanzando (no necesariamente a la vez, pueden turnarse) |

### **Ejemplos cotidianos**

* **Paralela**: 4 hilos de cocina, cada uno friendo un huevo en su sartén (4 CPUs).  
* **Distribuida**: 4 restaurantes en 4 ciudades, todos cocinando el mismo menú.  
* **Concurrente**: 1 cocinero que va friendo huevos de 3 pedidos, alternando.

## **🍳 Paralela: cuatro sartenes**

Imagina que tienes que freír 4 huevos. Con **una sola sartén** (una CPU), los fríes de uno en uno o alternando: eso es *concurrencia*. Con **4 sartenes** (4 CPUs), los fríes los 4 a la vez: eso es *paralelismo real*.

En Python, el módulo multiprocessing crea procesos reales que el sistema operativo reparte entre los núcleos de tu CPU:

| *\# Paralela con multiprocessing (varios CPUs)*from multiprocessing import Pooldef cuadrado(n):    return n \* nif \_\_name\_\_ \== "\_\_main\_\_": *\# obligatorio en Windows: protege el spawn*        with Pool(4) as p: *\# 4 procesos en paralelo*            print(p.map(cuadrado, \[1, 2, 3, 4\])) |
| :---- |

**Salida:**

| \[1, 4, 9, 16\] |
| :---- |

Los 4 procesos se reparten la lista y cada uno calcula una parte. Si tu máquina tiene 4 núcleos, los 4 se ejecutan **a la vez**.

## **🏙️ Distribuida: varios restaurantes**

La computación distribuida lleva la idea al límite: no varias CPUs de la misma máquina, sino **máquinas completas conectadas por red**, cada una con su memoria y su CPU. Es el modelo de los clústeres, la web y los servicios en la nube.

![][image3]

Cada máquina ejecuta uno o varios procesos independientes. La distribución introduce un problema nuevo: **la comunicación por red** y **los fallos de máquina**. 

## **⚖️ CPUs vs máquinas**

| Pregunta | Paralela | Distribuida |
| ----- | ----- | ----- |
| ¿Dónde se ejecuta? | Múltiples CPUs/núcleos de una máquina | Múltiples máquinas conectadas por red |
| ¿Comparten memoria? | No por defecto: cada proceso vive en su burbuja aislada (los hilos de una misma máquina sí comparten) | No (cada máquina tiene la suya) |
| ¿Comunicación? | Pipes, memoria compartida, locks | Sockets, HTTP, mensajería |
| ¿Escala? | Hasta los núcleos de tu CPU | Hasta cientos de máquinas |
| Ejemplo en Python | multiprocessing.Pool | socket, APIs REST |

💡 El **GIL** de Python limita la concurrencia real de los hilos; con **procesos** (multiprocessing) ese límite no existe porque cada proceso tiene su propio intérprete.

## **🧠 Mini-chequeo**

1. ¿Cuál es la diferencia clave entre paralela y distribuida?  
2. ¿Por qué el ejemplo del “cocinero alternando” es concurrencia y no paralelismo?  
3. ¿Qué función de multiprocessing reparte una tarea entre varios procesos?

**🔄 Respuestas**

1. La paralela usa **varias CPUs de una misma máquina**; la distribuida usa **múltiples máquinas conectadas por red**.  
2. Porque hay **una sola CPU/sartén**: las tareas **avanzan** turnándose, pero no se ejecutan a la vez.  
3. Pool(4).map(funcion, lista): crea 4 procesos y reparte la lista entre ellos.

## **✅ Resumen en 3 frases**

* **Paralela** \= varias CPUs a la vez; **distribuida** \= varias máquinas por red; **concurrencia** \= avanzar turnándose.  
* multiprocessing.Pool reparte trabajo real entre los núcleos de tu CPU.  
* La paralela comparte memoria y es interna a la máquina; la distribuida necesita red y comunicación por sockets/HTTP.

## **🐛 Vocabulario rápido**

| Término | Idea general |
| ----- | ----- |
| Paralela | Varias tareas a la vez en varias CPUs |
| Distribuida | Varias tareas en varias máquinas por red |
| Concurrencia | Varias tareas avanzando, turnándose |
| multiprocessing | Módulo Python que crea procesos reales |
| Pool | Grupo de procesos que reparte tareas |

# **4\. subprocess.run()** {#4.-subprocess.run()}

## **📬 La idea en una frase**

subprocess.run() lanza un programa y **espera** a que termine, devolviéndote su salida y su código de retorno. Es la forma más sencilla de ejecutar otro programa desde Python.

Cuando necesitas el resultado de un comando (¿Qué versión hay? ¿Responde el ping? ¿Qué dice este comando?), run() es tu herramienta: lanza, espera y captura.

## **🚀 El primer lanzamiento**

| import subprocess*\# Comando simple*resultado \= subprocess.run( \["python", "--version"\], capture\_output=True, text=True)print(f"Salida: {resultado.stdout}")print(f"Código de retorno: {resultado.returncode}") |
| :---- |

**Salida** (más o menos):

| Salida: Python 3.11.4Código de retorno: 0 |
| :---- |

* **subprocess.run(\["python", "--version"\])** recibe una **lista** con el ejecutable y sus argumentos. Cada elemento de la lista es un argumento aparte.  
* **capture\_output=True** captura la salida estándar (stdout) y la de errores (stderr).  
* **text=True** devuelve cadenas en vez de bytes (mucho más cómodo para leer).  
* **resultado.returncode** es el código de retorno: **0 \= todo bien**, distinto de 0 \= algo falló.

## **🎛️ Los parámetros importantes**

| Parámetro | Qué hace |
| ----- | ----- |
| capture\_output=True | Captura stdout y stderr |
| text=True | Devuelve strings en vez de bytes |
| timeout=N | Lanza excepción si tarda más de N segundos |
| check=True | Lanza excepción si el código de retorno no es 0 |

### **Resultado: stdout, stderr y returncode**

| Atributo | Qué contiene |
| ----- | ----- |
| resultado.stdout | La salida estándar del programa |
| resultado.stderr | La salida de errores |
| resultado.returncode | 0 si fue bien, otro número si falló |

## **⏱️ Timeout: no esperes para siempre**

Si un comando puede colgarse (un ping, un servidor), protege tu programa con timeout:

| import subprocess*\# Con timeout y control de errores*try:   resultado \= subprocess.run(     \["ping", "google.com", "-n", "3"\],     capture\_output=True,     text=True,     timeout=10     )   print(resultado.stdout)except subprocess.TimeoutExpired:    print("❌ El ping tardó demasiado")except subprocess.CalledProcessError:    print("❌ Error en el comando") |
| :---- |

* **subprocess.TimeoutExpired:** el comando superó los timeout segundos.  
* **subprocess.CalledProcessError:** solo se lanza con check=True cuando el returncode no es 0\.

## 

## 

## 

## **🐛 Un ejemplo con error controlado**

| import subprocessresultado \= subprocess.run(\["python", "--versio"\], capture\_output=True, text=True)print(f"Código: {resultado.returncode}")print(f"Error: {resultado.stderr}") |
| :---- |

**Salida:**

| Código: 2Error: Unknown option: \--versio |
| :---- |

El código de retorno **2** (distinto de 0\) te dice que el comando falló, y stderr te dice por qué. No hizo falta ninguna excepción: por defecto run() no lanza, solo devuelve el resultado.

## **🧠 Mini-chequeo**

1. ¿Qué hace capture\_output=True y text=True?  
2. ¿Qué significa un returncode distinto de 0?  
3. ¿Qué excepción lanza run() si el comando tarda más de timeout?

**🔄 Respuestas**

1. capture\_output=True captura stdout y stderr; text=True los devuelve como **strings** en vez de bytes.  
2. Que el comando **falló** (0 \= éxito, cualquier otro número \= error).  
3. subprocess.TimeoutExpired.

## **✅ Resumen en 3 frases**

* subprocess.run() lanza un comando y **espera** su finalización.  
* Captura la salida con capture\_output=True, texto con text=True y controla el tiempo con timeout.  
* El returncode te dice si fue bien (0) o mal (distinto de 0).

## **🐛 Vocabulario rápido**

| Término | Idea general |
| ----- | ----- |
| subprocess.run | Función que lanza un comando y espera |
| capture\_output | Captura stdout y stderr |
| text=True | Devuelve strings en vez de bytes |
| timeout | Lanza TimeoutExpired si excede |
| returncode | Código de retorno (0 \= bien) |
| check=True | Lanza CalledProcessError si returncode ≠ 0 |

# **5\. subprocess.Popen()** {#5.-subprocess.popen()}

## **📬 La idea en una frase**

subprocess.Popen() lanza un proceso en **segundo plano** y devuelve el control inmediatamente: no espera a que termine. Tú sigues haciendo cosas mientras él vive.

run() espera; Popen() no. Eso convierte a Popen en la herramienta para abrir aplicaciones, lanzar varios programas a la vez y gestionarlos después con sus métodos.

## **🚀 El primer Popen: abrir el bloc de notas**

| import subprocess*\# Lanzar el bloc de notas (no espera)*proceso \= subprocess.Popen(\["notepad.exe"\])print(f"Bloc de notas lanzado con PID {proceso.pid}")*\# Podemos hacer otras cosas mientras el bloc de notas está abierto*print("Haciendo otras cosas...")*\# Cuando queramos, esperamos a que termine*proceso.wait()print("El bloc de notas se cerró") |
| :---- |

**Paso a paso:**

1. subprocess.Popen(\["notepad.exe"\]) lanza el bloc de notas y **vuelve al instante**.  
2. proceso.pid te da el PID del proceso recién creado.  
3. Python sigue ejecutando (print("Haciendo otras cosas...")) mientras el bloc de notas está abierto.  
4. proceso.wait() **bloquea** a Python hasta que el bloc de notas se cierra.

## **🎛️ Los métodos de Popen**

| Método de Popen | Qué hace |
| ----- | ----- |
| proceso.wait() | Espera a que termine (bloqueante) |
| proceso.poll() | Pregunta si ha terminado (no bloqueante) |
| proceso.terminate() | Envía señal de terminación |
| proceso.kill() | Mata el proceso forzosamente |
| proceso.pid | PID del proceso hijo |

### **wait() vs poll()**

* wait() **bloquea**: Python se queda parado hasta que el proceso termina.  
* poll() **no bloquea**: devuelve None si el proceso sigue vivo, o su código de retorno si ya terminó.

| import subprocess, timeproceso \= subprocess.Popen(\["notepad.exe"\])while proceso.poll() is None:  print("El bloc de notas sigue abierto...")  time.sleep(1)print(f"Cerrado con código {proceso.poll()}") |
| :---- |

### **terminate() vs kill()**

* terminate() en Linux/macOS envía **SIGTERM**: un cierre *suave*, el proceso tiene oportunidad de guardar y salir. En **Windows** ambos son equivalentes: terminate() llama a TerminateProcess, una terminación **forzosa** igual que kill().  
* kill() mata **forzosamente**, sin dar opción. Úsalo solo cuando terminate() no baste.

| *import subprocessproceso \= subprocess.Popen(\["calc.exe"\])print(f"Calculadora lanzada con PID {proceso.pid}")proceso.terminate() \# cierre forzoso (Windows) o suave (Linux/macOS)proceso.kill() \# solo si el anterior no funcionó* |
| :---- |

## **🏃 Lanzar varios procesos a la vez**

La gran ventaja de Popen es lanzar varios procesos y esperarlos después:

| import subprocess, timenotepad \= subprocess.Popen(\["notepad.exe"\])calc \= subprocess.Popen(\["calc.exe"\])mspaint \= subprocess.Popen(\["mspaint.exe"\])print(f"PIDs: {notepad.pid}, {calc.pid}, {mspaint.pid}")time.sleep(5) *\# les damos 5 segundos de vida*notepad.terminate()calc.terminate()mspaint.kill()print("Todos cerrados 🏁") |
| :---- |

Los 3 procesos viven a la vez, cada uno con su PID, mientras Python hace otras cosas. Eso es imposible con run(), que espera a cada uno antes de lanzar el siguiente.

## **🧠 Mini-chequeo**

1. ¿Qué diferencia hay entre wait() y poll()?  
2. ¿Qué devuelve proceso.poll() mientras el proceso sigue vivo?  
3. ¿Cuándo usarías kill() en lugar de terminate()?

**🔄 Respuestas**

1. wait() **bloquea** hasta que el proceso termina; poll() **pregunta** sin bloquear y devuelve el estado.  
2. None (el proceso sigue ejecutándose).  
3. Cuando terminate() no consigue cerrarlo: kill() mata el proceso forzosamente.

## **✅ Resumen en 3 frases**

* Popen lanza un proceso en segundo plano y devuelve el control **al instante**.  
* wait() bloquea, poll() pregunta, terminate() cierra suave y kill() mata a la fuerza.  
* Con Popen puedes lanzar y gestionar **varios procesos a la vez**, cada uno con su PID.

## **🐛 Vocabulario rápido**

| Término | Idea general |
| ----- | ----- |
| Popen | Clase que lanza procesos en segundo plano |
| wait() | Espera bloqueante a que termine |
| poll() | Consulta no bloqueante del estado |
| terminate() | Señal de cierre suave |
| kill() | Muerte forzosa |
| pid | PID del proceso hijo |

# **6\. Comunicación con procesos** {#6.-comunicación-con-procesos}

## **📬 La idea en una frase**

Un proceso hijo puede **leer de su stdin** y **escribir en su stdout**; con communicate() le pasas datos por un tubo y lees su respuesta por el otro.

Los procesos no comparten memoria, pero el sistema operativo les presta **pipes** (tuberías): el stdin, stdout y stderr de cada proceso pueden conectarse a Python. Así un proceso “pregunta” y el otro “responde”.

## **🔌 Conectar los tubos**

| import subprocessproceso \= subprocess.Popen(    \["python", "-c", "print(input().upper())"\],    stdin=subprocess.PIPE,    stdout=subprocess.PIPE,    text=True    ) |
| :---- |

* **stdin=subprocess.PIPE**: Python podrá **escribir** en el stdin del hijo.  
* **stdout=subprocess.PIPE**: Python podrá **leer** el stdout del hijo.  
* **text=True**: los datos viajan como texto, no como bytes.

El proceso hijo ejecuta print(input().upper()): lee una línea de su stdin, la pasa a mayúsculas y la escribe en su stdout.

## **📨 Enviar y recibir con communicate()**

| *salida, \_ \= proceso.communicate(input="hola mundo")print(f"El proceso respondió: {salida.strip()}") \# → "HOLA MUNDO"* |
| :---- |

**communicate(input="hola mundo"):**

1. Escribe "hola mundo" en el stdin del hijo y cierra el tubo de entrada.  
2. Espera a que el hijo termine.  
3. Devuelve una tupla (stdout, stderr).

Después de communicate() el proceso ya terminó: no puedes volver a comunicarte con él.

## **🗣️ El mismo ejemplo completo, con sentido**

| *import subprocess \# Escribir en stdin y leer stdoutproceso \= subprocess.Popen(  \["python", "-c", "print(input().upper())"\],  stdin=subprocess.PIPE,  stdout=subprocess.PIPE,  text=True  )salida, error \= proceso.communicate(input="hola mundo")print(f"El proceso respondió: {salida.strip()}")\# → "HOLA MUNDO"print(f"Error (None si todo bien): {error}")\# → Error (None si todo bien): None* |
| :---- |

**Flujo de datos:**

![][image4]

## **💡 ¿Cuándo usar cada herramienta?**

| Situación | Herramienta |
| ----- | ----- |
| Necesitas el resultado de un comando y puedes esperar | subprocess.run(..., capture\_output=True) |
| El proceso vive en segundo plano y no necesitas sus datos | subprocess.Popen(...) \+ wait() |
| Necesitas enviarle datos y/o leer su respuesta | Popen(..., stdin=PIPE, stdout=PIPE) \+ communicate() |

⚠️ **Cuidado con los deadlocks:** si el hijo escribe mucho en stdout y nadie lo lee, el pipe se llena y el hijo se bloquea esperando a que alguien lo vacíe. communicate() lee todo y te evita ese problema. Por eso con run() se usa capture\_output=True y con Popen, communicate().

## **🧠 Mini-chequeo**

1. ¿Qué significa stdin=subprocess.PIPE y stdout=subprocess.PIPE?  
2. ¿Qué devuelve communicate(input="texto")?  
3. ¿Por qué communicate() evita los deadlocks con pipes?

**🔄 Respuestas**

1. Que Python podrá **escribir** en el stdin del hijo y **leer** su stdout.  
2. Una tupla (stdout, stderr) con la salida del proceso.  
3. Porque lee todo el stdout del proceso mientras lo espera, sin dejar que el pipe se llene y el hijo se bloquee.

## **✅ Resumen en 3 frases**

* Con stdin=PIPE y stdout=PIPE conectas tuberías entre Python y el proceso hijo.  
* communicate(input="...") envía datos al hijo, espera su fin y devuelve (stdout, stderr).  
* Los pipes permiten “preguntar” a un proceso y “leer” su respuesta sin compartir memoria.

## **🐛 Vocabulario rápido**

| Término | Idea general |
| ----- | ----- |
| Pipe | Tubería que conecta la salida de un proceso con la entrada de otro |
| stdin | Entrada estándar del proceso |
| stdout | Salida estándar del proceso |
| stderr | Salida de errores del proceso |
| PIPE | Constante que le dice a Popen “conecta esta tubería” |
| communicate() | Envía datos y recoge la salida del hijo |

# **7\. Compatibilidad Windows / Linux** {#7.-compatibilidad-windows-/-linux}

## **📬 La idea en una frase**

Los ejemplos de esta unidad están escritos para **Windows**, pero los conceptos (subprocess.run, Popen, PID, communicate) son **idénticos en todos los sistemas**: solo cambia el comando.

La API de subprocess es la misma en Windows, Linux y macOS. Lo único que cambia es qué ejecutable pones en la lista: notepad.exe no existe en Linux y ls no existe en Windows. Aprende a sustituir el comando y el código funciona igual.

## **🪟🐧 La tabla de comandos equivalentes**

| Windows | Linux / macOS |
| ----- | ----- |
| notepad.exe | gedit, nano, xed |
| calc.exe | gnome-calculator, bc |
| mspaint.exe | pinta, kolourpaint |
| ping \-n 5 8.8.8.8 | ping \-c 5 8.8.8.8 |
| ipconfig | ip addr, ifconfig |
| where python | which python |
| cmd /c mkdir | mkdir (es ejecutable real) |
| start http\://... | xdg-open http\://... |
| dir | ls |

**Sustituye el comando correspondiente y el código funciona igual.**

## **🧩 El truco del shell**

Algunos comandos **no son ejecutables reales**: son palabras que interpreta el intérprete de comandos (shell). El ejemplo clásico es mkdir:

* En **Windows**, mkdir es un **comando interno de cmd**: no hay un archivo mkdir.exe, así que hay que invocarlo a través del shell con cmd /c mkdir ....  
* En **Linux**, mkdir es un **ejecutable real** (/usr/bin/mkdir): se lanza directamente.

| import subprocess*\# En Windows: cmd /c ejecuta comandos internos del shell*resultado \= subprocess.run(\["cmd", "/c", "mkdir", "prueba\_psp"\],capture\_output=True, text=True)print(f"Creada con código: {resultado.returncode}") |
| :---- |

En Linux usarías directamente \["mkdir", "prueba\_psp"\] porque mkdir es un ejecutable real.

Otro ejemplo: abrir el navegador con una URL.

* **Windows**: start http\://localhost:4321 (con shell=True, porque start es interno del shell).  
* **Linux**: xdg-open http\://localhost:4321 (ejecutable real).

| *import subprocess\# Windowssubprocess.run(\["start", "http\://localhost:4321"\], shell=True)\# Linux / macOS\# subprocess.run(\["xdg-open", "http\://localhost:4321"\])* |
| :---- |

⚠️ **shell=True con cuidado:** solo úsalo cuando el comando es interno del shell (como start o dir). Con shell=True y texto del usuario, un atacante podría inyectar comandos. Pasa siempre la lista de argumentos, no un string concatenado.

## **🌍 Lo que nunca cambia**

| Concepto | Windows | Linux |
| ----- | ----- | ----- |
| subprocess.run(\[...\]) | ✅ | ✅ |
| subprocess.Popen(\[...\]) | ✅ | ✅ |
| capture\_output=True, text=True | ✅ | ✅ |
| timeout, returncode | ✅ | ✅ |
| communicate(input=...) | ✅ | ✅ |
| proceso.wait(), poll(), terminate(), kill() | ✅ | ✅ |
| proceso.pid | ✅ | ✅ |

Aprende los conceptos con notepad.exe y calc.exe y, cuando toques Linux, solo cambia la lista de comandos de la tabla de arriba.

## **🧠 Mini-chequeo**

1. ¿Qué comando de Windows equivale a ls en Linux?  
2. ¿Por qué en Windows mkdir necesita cmd /c?  
3. ¿Cuándo tienes que usar shell=True?

**🔄 Respuestas**

1. dir.  
2. Porque en Windows mkdir es un **comando interno del shell cmd**, no un ejecutable real: hay que invocarlo con cmd /c.  
3. Solo cuando el comando es **interno del shell** (como start o dir). Con listas de argumentos no hace falta, y es más seguro.

## **✅ Resumen en 3 frases**

* La API de subprocess es idéntica en Windows y Linux: solo cambian los comandos.  
* Comandos internos del shell (como mkdir en Windows) necesitan cmd /c o shell=True.  
* Sustituye el comando de la tabla y tu código funcionará en cualquier sistema.

## **🐛 Vocabulario rápido**

| Término | Idea general |
| ----- | ----- |
| Shell | Intérprete de comandos (cmd, bash) |
| Comando interno | Palabra que interpreta el shell (no es un ejecutable) |
| cmd /c | Ejecuta un comando interno de cmd en Windows |
| shell=True | Delega la ejecución en el shell (¡con cuidado\!) |
| xdg-open | Abre una URL o archivo con la app por defecto en Linux |

# **8\. Procesos nativos en Python con multiprocessing** {#8.-procesos-nativos-en-python-con-multiprocessing}

**📬La idea en una frase**

Mientras que subprocess sirve para lanzar programas externos (como la calculadora o un comando del sistema), multiprocessing te permite clonar tu propio programa Python para ejecutar varias de tus funciones al mismo tiempo en distintos núcleos del procesador.

Hasta ahora has visto cómo abrir aplicaciones de terceros. Pero, ¿qué pasa si quieres que tu propio servidor atienda a cinco clientes a la vez? No puedes usar subprocess.Popen(\["python", "mi\_script.py"\]) de forma elegante para cada tarea interna. Aquí entra la librería estándar multiprocessing.

### **subprocess vs multiprocessing**

| Característica | subprocess | multiprocessing |
| :---- | :---- | :---- |
| ¿Qué lanza? | Ejecutables externos (ping, notepad.exe, ls) | Funciones de tu propio código Python |
| Paso de datos | Difícil: a través de tuberías de texto (stdin/stdout) | Fácil: pasas variables y objetos como argumentos a la función |
| Uso típico | Automatización del sistema operativo y scripts de bash | Programación concurrente, servidores y cálculos matemáticos pesados |

### 

### **🚀 Lanzando funciones: Process, start() y join()**

Para crear un proceso interno, utilizas la clase Process. Le indicas qué función (target) debe ejecutar y qué argumentos (args) necesita.

| import multiprocessingimport osimport timedef trabajador(nombre, repeticiones):    print(f"\[{os.getpid()}\] Hola, soy el trabajador {nombre}")    time.sleep(repeticiones)    print(f"\[{os.getpid()}\] El trabajador {nombre} ha terminado")*\# IMPORTANTE EN WINDOWS: Siempre debes proteger la creación de procesos*if \_\_name\_\_ \== '\_\_main\_\_':    print(f"\[{os.getpid()}\] Soy el proceso PADRE")        *\# 1\. Instanciar los procesos*    p1 \= multiprocessing.Process(target=trabajador, args=("Alice", 2))    p2 \= multiprocessing.Process(target=trabajador, args=("Bob", 1))        *\# 2\. Arrancarlos (pasan al estado LISTO/EJECUCIÓN)*    p1.start()    p2.start()        *\# 3\. Esperar a que terminen (equivalente a wait() en subprocess)*    p1.join()    p2.join()        print(f"\[{os.getpid()}\] Todos los trabajadores han finalizado") |
| :---- |

* target: El nombre de la función (sin paréntesis, porque no quieres ejecutarla ahora, sino pasársela al proceso).  
* args: Una tupla con los argumentos. Si solo pasas un argumento, recuerda poner una coma al final: args=("Alice",).  
* start(): Lanza el proceso al sistema operativo.  
* join(): Bloquea al proceso padre hasta que este hijo específico termine.

### **🫧 El muro del aislamiento (La burbuja de memoria)**

Recuerda la teoría del principio del tema: **cada proceso vive en su propia burbuja aislada**. Si creas un proceso nuevo a partir de tu código, el sistema operativo hace un clon de toda la memoria RAM en ese instante. Lo que modifique el hijo, no lo ve el padre.

Observa esta trampa didáctica:

| import multiprocessing*\# Variable global*puntuacion \= 10def sumar\_puntos():   global puntuacion   puntuacion \+= 5   print(f"Hijo: La puntuación es {puntuacion}")if \_\_name\_\_ \== "\_\_main\_\_":   p1 \= multiprocessing.Process(target=sumar\_puntos)   p1.start()   p1.join()   print(f"Padre: La puntuación es {puntuacion}") |
| :---- |

**Salida:**

| Hijo: La puntuación es 15Padre: La puntuación es 10 |
| :---- |

**¿Qué ha pasado?** Al hacer start(), el hijo clonó la variable puntuacion \= 10 en su propia RAM. El hijo suma 5 y su clon vale 15\. Cuando el hijo muere, su burbuja de memoria se destruye. El proceso padre imprime su propia variable original, que nunca fue modificada. **Los procesos no comparten variables globales.**

### **🧱 Rompiendo el muro con Manager**

Si quieres que un proceso servidor actualice un diccionario de usuarios y otro proceso pueda leerlo, necesitas **Comunicación Entre Procesos (IPC)** estructurada. Python nos ofrece multiprocessing.Manager().

El Manager crea un proceso servidor invisible que gestiona la memoria y permite que los demás procesos accedan a diccionarios o listas compartidas (conocidas como *proxies*).

| import multiprocessingdef registrar\_usuario(diccionario\_compartido, nombre, edad):   *\# Esto SÍ modifica la memoria que ven todos*   diccionario\_compartido\[nombre\] \= edad   print(f"Proceso hijo registró a {nombre}")if \_\_name\_\_ \== "\_\_main\_\_":   *\# Creamos el gestor de memoria compartida*   with multiprocessing.Manager() as manager:       *\# manager.dict() crea un diccionario especial que cruza la burbuja*       buzones \= manager.dict()       p1 \= multiprocessing.Process(           target=registrar\_usuario, args=(buzones, "Alice", 25)       )       p2 \= multiprocessing.Process(           target=registrar\_usuario, args=(buzones, "Bob", 30)       )       p1.start()       p2.start()       p1.join()       p2.join()       *\# El padre SÍ puede ver los cambios*       print(f"Diccionario final en el padre: {buzones}") |
| :---- |

### **🔒Sincronización con Lock (Condiciones de carrera)**

Compartir memoria trae un problema crítico: ¿qué pasa si dos procesos intentan modificar el mismo buzón a la vez? El sistema se satura y los datos pueden sobrescribirse y corromperse. A esto se le llama **Condición de Carrera** (*Race Condition*).

Para solucionarlo, existe el candado: multiprocessing.Lock. Es un "testigo" que solo puede tener un proceso a la vez.

1. El proceso pide el candado (lock.acquire()).  
2. Modifica la variable compartida (esta zona protegida se llama **sección crítica**).  
3. Suelta el candado (lock.release()) para que pase el siguiente.

***💡Truco:** En Python puedes usar el bloque with lock: para que el acquire y release se hagan automáticamente.*

| import multiprocessingimport timedef incrementar\_contador(contador\_compartido, candado):    for \_ in range(100):        *\# Protegemos la sección crítica. Si otro proceso tiene el Lock,*        *\# este proceso se queda bloqueado esperando.*        with candado:            *\# Sección crítica: modificar la variable compartida*            valor\_actual \= contador\_compartido.value            time.sleep(0.001) *\# Simulamos que el cálculo tarda*            contador\_compartido.value \= valor\_actual \+ 1if \_\_name\_\_ \== '\_\_main\_\_':    *\# Variable numérica compartida (empieza en 0\)*    contador \= multiprocessing.Value('i', 0)    *\# Creamos un candado para organizar a los trabajadores*    candado \= multiprocessing.Lock()        procesos \= \[\]    *\# Lanzamos 5 procesos*    for i in range(5):        *\# Hay que pasarles el candado como parámetro*        p \= multiprocessing.Process(target=incrementar\_contador, args=(contador, candado))        procesos.append(p)        p.start()            for p in procesos:        p.join()            print(f"Valor final del contador: {contador.value}") *\# Siempre será 500* |
| :---- |

Si ejecutas ese mismo código sin el Lock, verás que el resultado final es impredecible (ej. 143, 290...), porque los procesos leen y escriben a la vez, machacando el trabajo del anterior.

### **🧠 Mini-chequeo**

1. ¿Por qué debes usar if \_\_name\_\_ \== '\_\_main\_\_': al crear procesos en Windows?  
2. Si un proceso hijo modifica una lista global estándar de tu script, ¿el proceso padre verá la lista modificada?  
3. ¿Qué hace manager.dict()?  
4. ¿Para qué sirve un Lock en programación concurrente?

### **🔄 Respuestas**

1. Porque Windows no tiene el sistema fork de Linux. Si no proteges el código principal, los procesos hijos volverán a importar todo el script desde el principio, creando un bucle infinito de procesos hasta colgar la máquina.  
2. No, debido al aislamiento de memoria. El hijo modifica su propio clon en su burbuja de RAM.  
3. Crea un diccionario "proxy" gestionado por el sistema operativo que permite compartir datos dinámicos entre múltiples procesos de forma segura.  
4. Para evitar condiciones de carrera. Actúa como un semáforo que garantiza que solo un proceso a la vez pueda entrar en una "sección crítica" y modificar la memoria compartida.

### **✅ Resumen en 3 frases**

* multiprocessing te permite crear procesos (Process), arrancarlos (start()) y esperarlos (join()) ejecutando funciones de tu propio código.  
* Las variables globales no se comparten entre procesos porque el sistema operativo clona la RAM; necesitas usar multiprocessing.Manager() para pasar datos de un proceso a otro.  
* Cuando varios procesos modifican los mismos datos compartidos, debes proteger el código conflictivo usando un Lock para evitar sobreescrituras.

## **🐛 Vocabulario rápido**

| Término | Idea general |
| ----- | ----- |
| Process(target=f) | Clase que prepara la ejecución paralela de una función. |
| .start() | Envía el proceso al planificador del sistema operativo (lo arranca). |
| .join() | Detiene al proceso padre hasta que el proceso hijo finalice. |
| Manager | Utilidad del sistema para crear estructuras de memoria compartida (IPC). |
| Lock | Candado de exclusión mutua para proteger secciones críticas de código. |
| Condición de carrera | Fallo que ocurre cuando varios procesos modifican un dato a la vez sin sincronizarse. |

# **9\. Procesos en la práctica** {#9.-procesos-en-la-práctica}

## **📬 La idea en una frase**

Aterriza todo lo anterior: sé el código que abre dos aplicaciones a la vez, mira pelearse a run() y Popen() en el ring, y pon a prueba tus manos con los ejercicios del lápiz.

## **⭐ Sé el código: abrir bloc de notas y calculadora**

“Sé el programa que abre dos aplicaciones a la vez. Traza cada paso.”

| import subprocess, timeprint("🚀 Abriendo bloc de notas...")notepad \= subprocess.Popen(\["notepad.exe"\])print(f" → PID: {notepad.pid}")print("🚀 Abriendo calculadora...")calc \= subprocess.Popen(\["calc.exe"\])print(f" → PID: {calc.pid}")print("\\nAmbos programas están abiertos.")print("El usuario puede escribir en el bloc de notas y usar la calculadora.") *\# Mientras tanto, Python no está bloqueado*for i in range(5):  print(f" Python haciendo cosas... ({i+1}/5)")  time.sleep(1)print("\\nCerrando programas...")notepad.terminate()calc.kill()print("Hecho 🏁") |
| :---- |

**Traza paso a paso:**

**1\. subprocess.Popen(\["notepad.exe"\])**

|  → El SO crea un nuevo proceso → Windows busca notepad.exe en el PATH → Lo carga en memoria → Asigna PID 12345 → Python recibe el control inmediatamente |
| :---- |

 **2\. print("PID: 12345")**

 **3\. subprocess.Popen(\["calc.exe"\])**

|  → Mismo proceso, PID 12346 |
| :---- |

 **4\. Python hace 5 cosas mientras ambos están abiertos**

|  → 3 procesos independientes: Python, notepad, calc |
| :---- |

 **5\. notepad.terminate()**

|  → Envía señal de cierre al bloc de notas |
| :---- |

 **6\. calc.kill()**

|  → Mata la calculadora forzosamente |
| :---- |

Fíjate en el paso 4: **Python no se bloquea**. Mientras los dos programas están abiertos, el proceso de Python sigue imprimiendo. Tres procesos independientes conviven a la vez, cada uno con su PID, su memoria y su turno de CPU.

## **🥊 El ring de los conceptos — run() vs Popen()**

*Dos funciones de subprocess se citan en el cuadrilátero para resolver, de una vez, quién lanza mejor.*

* **run():** — ¡Yo soy el rey de la simplicidad\! Lanzas un comando, esperas, y ¡zas\! tienes el resultado.  
* **Popen():** — Sí, pero mientras tú esperas como un muñeco, yo puedo lanzar un proceso y seguir haciendo otras cosas. ¿Para qué esperar si no hace falta?  
* **run():** — ¿Y si necesitas el resultado? Conmigo es directo: result.stdout y ya. Tú necesitas communicate(), más vueltas…  
* **Popen():** — Pero imagina que quieres lanzar 3 programas a la vez. Conmigo puedes lanzarlos, irte a hacer café, y luego matarlos a todos. Tú tendrías que esperar a que termine cada uno antes de lanzar el siguiente.  
* **run():** — Vale, vale… para procesos que viven en segundo plano, eres mejor. Pero para comandos rápidos y resultados inmediatos, soy más limpio.

**Moraleja**: run() para comandos rápidos que necesitan respuesta. Popen() para procesos que deben vivir en segundo plano.

## **🧠 Mini-chequeo**

1. En el “Sé el código”, ¿cuántos procesos hay vivos mientras Python imprime sus 5 mensajes?  
2. ¿Cuándo usarías run() y cuándo Popen()?  
3. ¿Qué devuelve os.getppid()?

**🔄 Respuestas**

1. **3**: Python, el bloc de notas y la calculadora.  
2. run() para comandos rápidos que necesitan respuesta; Popen() para procesos que viven en segundo plano.  
3. El **PID del proceso padre** (el que lanzó tu programa).

## **✅ Resumen en 3 frases**

* Popen lanza aplicaciones en segundo plano y Python sigue trabajando mientras viven.  
* run() es para respuestas inmediatas; Popen() para procesos de larga vida.  
* Con os.getpid(), os.getppid(), communicate() y terminate() ya sabes jugar con procesos de verdad.

## **🐛 Vocabulario rápido**

| Término | Idea general |
| ----- | ----- |
| Sé el código | Técnica de traza mental: ejecutar el programa paso a paso en tu cabeza |
| os.getpid() | PID del proceso actual |
| os.getppid() | PID del proceso padre |
| communicate() | Enviar datos al hijo y leer su respuesta |
| terminate() / kill() | Cierre suave / muerte forzosa |

# **10\. Cierre: consolida lo aprendido** {#10.-cierre:-consolida-lo-aprendido}

Has terminado la teoría: la burbuja de memoria y el PID, los cinco estados, paralela contra distribuida, run(), Popen(), los pipes con communicate() y la compatibilidad Windows/Linux. Este cierre es el aterrizaje.

## **⭐ Sé el proceso**

*Eres un proceso de Python recién lanzado con subprocess.Popen(\["python", "calcula.py"\]). Acaban de asignarte un PID: 12345\.*

**¿Qué pasa?**

1. El sistema operativo crea tu proceso: asigna PID **12345**, reserva tu **burbuja de memoria** (código, estado, contador de programa).  
2. Pasas al estado **NUEVO** y, en cuanto estás cargado, a **LISTO**: esperas tu turno de CPU en la cola del planificador.  
3. La CPU te toca: pasas a **EJECUCIÓN**. Ejecutas las instrucciones de calcula.py una a una.  
4. Llamas a input() para leer de stdin: te bloqueas (**BLOQUEADO**) esperando que el usuario escriba algo.  
5. El usuario escribe y pulsa **ENTER**; la E/S termina y vuelves a **LISTO**.  
6. La CPU te toca otra vez (**EJECUCIÓN**), terminas tu último print() y llegas a **TERMINADO**.  
7. Tu padre espera con proceso.wait() o poll() y recoge tu código de retorno: **0**.

💡 **Ahora tú:** ¿y si tu padre lanza a la vez otros dos procesos (calc.exe y notepad.exe)? Los tres avanzáis turnándoos la CPU (concurrencia) y, si hay varios núcleos, alguno ejecutará de verdad a la vez (paralelismo).

## **🔥 Fireside Chat: Proceso vs Hilo**

*Un proceso y un hilo se sientan junto a la chimenea a resolver, de una vez, quién es más ligero.*

* **Proceso:** — Yo soy la unidad completa: memoria propia, recursos, PID. Si me cuelgo, tú ni te enteras.  
* **Hilo:** — ¿Y para qué quieres toda esa burbuja? Yo vivo **dentro** de un proceso y comparto su memoria. Soy mucho más barato de crear.  
* **Proceso:** — Pero mis fallos no tumban a nadie más. Tú, si se te va un puntero, te llevas por delante al proceso entero.  
* **Hilo:** — Cierto, pero yo puedo compartir variables directamente. Tú necesitas pipes y communicate() para hablar con tu vecino.  
* **Proceso:** — Sí, pero en Python tengo otra ventaja: mi propio intérprete. Los hilos comparten el **GIL**, así que mi paralelismo con multiprocessing es real.  
* **Hilo:** — Vale, vale. Tú para aislamiento y paralelismo real; yo para tareas ligeras que comparten memoria. ¿Empate?  
* **Proceso:** — *sonríe* Empate…

**Moraleja**: el proceso aísla y paraleliza de verdad; el hilo es ligero y comparte memoria. Los hilos los veremos más adelante en el temario

## **🕵️ ¿Quién soy?**

1. Soy el identificador único que el SO asigna a cada proceso.  
2. Soy el estado en el que el proceso espera un recurso (I/O, socket, sleep).  
3. Soy el mecanismo por el que una sola CPU parece ejecutar varios procesos a la vez.  
4. Soy el módulo de Python que reparte tareas en procesos paralelos reales.  
5. Soy el tubo que conecta la salida de un proceso con la entrada de otro.  
6. Soy la herramienta de sincronización que evita que dos procesos modifiquen la memoria compartida al mismo tiempo (condición de carrera).  
7. Soy el proceso que ya terminó pero que su padre no ha recogido todavía.

**🔄 Respuestas**

1. **PID**.  
2. **BLOQUEADO**.  
3. **El planificador (scheduler)** con la **concurrencia** (time slices).  
4. **multiprocessing**.  
5. **El pipe**.  
6. **Lock (multiprocessing.Lock).**  
7. **El zombie**.

## **🤬 CONRAD VS EL MUNDO: “maté el proceso y no volvió”**

* **CONRAD:** — “Clásico: *‘he lanzado mi programa con subprocess.run y no me devuelve el control’*. ¡Pues claro\! run() espera a que el comando termine, y si lanzas notepad.exe, el bloc de notas no se cierra nunca: te quedas colgado hasta que el usuario cierre la ventana. Si querías lanzar y seguir, eso es Popen, no run().”  
* **CONRAD:** — «Y el segundo error mítico: *"Modifico una variable global en mi proceso hijo y luego en el padre vale 0"*. ¡Bienvenido al aislamiento de memoria\! Los procesos se ejecutan en burbujas separadas. Si no usas un Manager o una estructura IPC, tus cambios mueren en la burbuja del hijo.»   
* **CONRAD:** — “Y lo mejor: *‘puse shell=True para abrir el navegador y ahora un comando borra mis archivos’*. Pues sí: shell=True delega en el intérprete de comandos. Si le pasas un string con datos del usuario, es un agujero de seguridad. Lista de argumentos, nunca strings concatenados. O cmd /c, que para eso está.”  
* **CONRAD:** — “Y no me vengas con *‘¿será que mi proceso se ha convertido en zombie?’*. Míralo con proceso.poll(): si te devuelve el código de retorno, ya terminó y solo falta que lo recojas con wait() o poll(). Zombie sin recoger \= entrada ocupada en la tabla de procesos. A diagnosticar.”

## **🧠 Atrévete a pensar**

1. ¿Por qué un proceso no puede modificar directamente las variables de otro proceso?  
2.  ¿Qué ocurre si ejecutas un proceso con multiprocessing.Process en Windows y no incluyes el bloque if \_\_name\_\_ \== '\_\_main\_\_':?  
3. ¿Cuándo deberías usar subprocess y cuándo multiprocessing?  
4. ¿Por qué un multiprocessing.Manager().dict() necesita un multiprocessing.Lock() si ya es un objeto especial de memoria compartida?  
5. ¿Qué diferencia existe entre el método wait() de Popen y el método join() de Process?

**💡 Soluciones**

1. Porque cada proceso vive aislado en su propia burbuja de memoria RAM gestionada por el SO. Esto garantiza que un fallo o puntero descontrolado en un proceso no corrompa el espacio de memoria de otros.     
2. En Windows (que no dispone de fork nativo), la creación de procesos importa de nuevo el archivo .py completo. Sin esa protección, el proceso hijo volvería a ejecutar el código de creación de procesos, entrando en un bucle infinito de creación de procesos hasta agotar la RAM de la máquina.  
3. Usas subprocess cuando necesitas interactuar con programas externos del sistema operativo o ejecutables ya compilados (ping, ls, ffmpeg). Usas multiprocessing cuando deseas paralelizar funciones nativas de tu propio script en Python aprovechando múltiples núcleos de la CPU.    
4. El Manager permite que varios procesos accedan al mismo espacio de memoria, pero no evita las condiciones de carrera si dos procesos realizan operaciones compuestas simultáneas (como leer, calcular y escribir). El Lock garantiza la exclusión mutua en la sección crítica.  
5. Conceptualmente hacen lo mismo (bloquear al proceso padre hasta que el hijo finalice), pero Popen.wait() pertenece al módulo subprocess para procesos del SO, mientras que Process.join() pertenece al módulo multiprocessing para procesos nativos de Python.  

## **💬 Entrevista de trabajo**

1. **"¿Qué es un proceso y en qué se diferencia de un programa?"**     
2. **"Explica los 5 estados de un proceso y pon un ejemplo de qué provoca el paso de EJECUCIÓN a BLOQUEADO."**  
3.  **"¿Por qué en Python el multiproceso permite paralelismo real mientras que los hilos sufren por el GIL?"**   
4. **"¿Cómo comunicarías dos procesos de Python que necesitan compartir un diccionario de datos en tiempo real?"**  
5. **"¿Qué es una condición de carrera (Race Condition) y cómo se previene en un entorno multiproceso?""¿Qué diferencia hay entre subprocess.run() y subprocess.Popen()?"**  
6. **"¿Qué diferencia hay entre subprocess.run() y subprocess.Popen()?"**

💡 **Cómo encararlas:** 

* Para la 1, menciona siempre el concepto de código estático en disco vs. ejecución viva en memoria RAM con PID asignado.   
* Para la 3, aclara que cada proceso levanta su propia instancia del intérprete de Python, obteniendo su propio GIL independiente por núcleo de CPU.  
* Para la 4, justifica el uso de multiprocessing.Manager() y sus objetos proxy (manager.dict()).  
* Para la 5, define el concepto de sección crítica y explica cómo multiprocessing.Lock() garantiza la exclusión mutua.

## **🤷 No hay preguntas tontas**

❓ **¿Cuántos procesos puede tener mi sistema?**

Depende de la **memoria RAM**. Cada proceso ocupa memoria. En Windows puedes verlos en el Administrador de tareas.

❓ **¿Qué pasa si un proceso hijo muere?**

El proceso padre puede enterarse con proceso.wait() o proceso.poll(). Si no, el hijo se convierte en **zombie** (ocupa una entrada en la tabla de procesos).

❓ **¿Y si el padre muere antes que el hijo?**

Los hijos se convierten en **huérfanos**. En Windows, el sistema los gestiona. En Linux, init los adopta.

❓ **run() vs Popen() — ¿cuándo usar cada uno?**

* run(): cuando necesitas el resultado y puedes esperar.  
* Popen(): cuando el proceso debe vivir en segundo plano mientras tú haces otras cosas.

❓ **¿Puedo lanzar cualquier programa?**

Sí, cualquier ejecutable. Pero el **PATH** debe incluirlo o debes dar la ruta completa.

**❓ ¿Qué ocurre si un proceso hijo termina pero el padre nunca consulta su estado?**

*Respuesta:* El hijo se convierte en un **proceso zombie**. Ha liberado su memoria RAM pero conserva su entrada en la tabla de procesos del SO a la espera de que el padre lea su código de salida mediante wait(), poll() o join().

**❓ ¿Y si el proceso padre muere repentinamente antes que sus hijos?**

*Respuesta:* Los procesos hijos se convierten en **huérfanos**. En sistemas Linux/POSIX, son adoptados automáticamente por el proceso raíz init (PID 1\) o systemd, el cual se encarga de recoger sus estados cuando finalicen.

**❓ Si multiprocessing duplica la memoria al crear un proceso, ¿es muy costoso para el sistema?**

* *Respuesta:* Sí. Crear procesos es considerablemente más pesado en consumo de memoria y tiempo de CPU (*overhead*) que crear hilos. Por ello, en sistemas de alta producción se suelen utilizar arquitecturas de *Pools* de procesos (ProcessPoolExecutor) para reutilizar procesos ya creados en lugar de instanciar y destruir procesos constantemente.

[image1]: <data:image/png;base64,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>

[image2]: <data:image/png;base64,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>

[image3]: <data:image/png;base64,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>

[image4]: <data:image/png;base64,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>
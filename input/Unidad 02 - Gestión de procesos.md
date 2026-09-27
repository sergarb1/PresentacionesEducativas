LICENCIA

**Reconocimiento \- No comercial \- CompartirIgual (BY-NC-SA)**: No se permite un uso comercial de la obra original ni de las posibles obras derivadas, la distribución de las cuales se ha de hacer con una licencia igual a la que regula la obra original.

**ÍNDICE**

[**U02 — Ethernet, medios de transmisión y cableado	3**](#heading=h.cn5m3phl4xh5)

[**1\. Qué es un proceso	3**](#1.-qué-es-un-proceso)

[**2\. Estados de un proceso	5**](#2.-estados-de-un-proceso)

[**3\. Paralela vs Distribuida	7**](#3.-paralela-vs-distribuida)

[**4\. subprocess.run()	10**](#4.-subprocess.run\(\))

[**5\. subprocess.Popen()	12**](#5.-subprocess.popen\(\))

[**06 — Comunicación con procesos	15**](#6.-comunicación-con-procesos)

[**07 — Compatibilidad Windows / Linux	18**](#7.-compatibilidad-windows-/-linux)

[**08 — Procesos en la práctica	20**](#8.-procesos-en-la-práctica)

[**09 — Cierre: consolida lo aprendido	25**](#9.-cierre:-consolida-lo-aprendido)

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

┌─────────────────────────────────────────┐  
 │ BURBUJA DE MEMORIA │  
 │ │  
 │ ┌────────────┐ ┌──────────────────┐ │  
 │ │ CÓDIGO │ │ ESTADO │ │  
 │ │ (las │ │ (los valores de │ │  
 │ │ funciones)│ │ las variables) │ │  
 │ └────────────┘ └──────────────────┘ │  
 │ ┌────────────┐ ┌──────────────────┐ │  
 │ │ CONTADOR │ │ PID │ │  
 │ │ (próxima │ │ (identificador │ │  
 │ │ instrucción) │ único) │ │  
 │ └────────────┘ └──────────────────┘ │  
 └─────────────────────────────────────────┘

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

La última fila es la clave: los procesos **no comparten memoria por defecto**. Si quieren intercambiar datos necesitan un mecanismo externo: un archivo, un socket o un pipe. Lo verás en el punto 6.

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

*Diagrama de transiciones de estados de un proceso: NUEVO, LISTO, EJECUCIÓN, BLOQUEADO y TERMINADO con las flechas del planificador y las esperas de E/S*

NUEVO ──→ LISTO ──→ EJECUCIÓN ──→ TERMINADO  
 ↑ │  
 │ │ (E/S, sleep)  
 │ ↓  
 └──────── BLOQUEADO

* De **LISTO** solo se puede ir a **EJECUCIÓN** (la CPU toca) y volver.  
* De **EJECUCIÓN** se va a **LISTO** (time slice), a **BLOQUEADO** (E/S) o a **TERMINADO**.  
* De **BLOQUEADO** se vuelve siempre a **LISTO** cuando la E/S termina.

| Estado | Qué significa |
| ----- | ----- |
| NUEVO | El proceso acaba de ser creado |
| LISTO | Preparado para ejecutar, esperando que la CPU esté libre |
| EJECUCIÓN | La CPU está ejecutando sus instrucciones |
| BLOQUEADO | Esperando un recurso (I/O, socket, sleep) |
| TERMINADO | El proceso ha finalizado |

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

┌────────────┐ red ┌────────────┐  
 │ Servidor A │◄───────►│ Servidor B │  
 └────────────┘ └────────────┘  
 ▲ ▲  
 │ red │  
 ┌─────┴─────┐ ┌──────┴─────┐  
 │ Servidor C│ │ Servidor D │  
 └───────────┘ └────────────┘

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

Cuando necesitas el resultado de un comando (¿qué versión hay? ¿responde el ping? ¿qué dice este comando?), run() es tu herramienta: lanza, espera y captura.

## **🚀 El primer lanzamiento**

| import subprocess*\# Comando simple*resultado \= subprocess.run( \["python", "--version"\], capture\_output=True, text=True)print(f"Salida: {resultado.stdout}")print(f"Código de retorno: {resultado.returncode}") |
| :---- |

**Salida** (más o menos):

| Salida: Python 3.11.4Código de retorno: 0 |
| :---- |

* subprocess.run(\["python", "--version"\]) recibe una **lista** con el ejecutable y sus argumentos. Cada elemento de la lista es un argumento aparte.  
* capture\_output=True captura la salida estándar (stdout) y la de errores (stderr).  
* text=True devuelve cadenas en vez de bytes (mucho más cómodo para leer).  
* resultado.returncode es el código de retorno: **0 \= todo bien**, distinto de 0 \= algo falló.

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

Python ──stdin──► proceso hijo (lee input, pasa a mayúsculas)

proceso hijo ──stdout──► Python (recibe "HOLA MUNDO")

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
| start http://... | xdg-open http://... |
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

* **Windows**: start http://localhost:4321 (con shell=True, porque start es interno del shell).

| *Linux: xdg-open http://localhost:4321 (ejecutable real).import subprocess\# Windowssubprocess.run(\["start", "http://localhost:4321"\], shell=True)\# Linux / macOS\# subprocess.run(\["xdg-open", "http://localhost:4321"\])* |
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

# **8\. Procesos en la práctica** {#8.-procesos-en-la-práctica}

## **📬 La idea en una frase**

Aterriza todo lo anterior: sé el código que abre dos aplicaciones a la vez, mira pelearse a run() y Popen() en el ring, y pon a prueba tus manos con los ejercicios del lápiz.

## **⭐ Sé el código: abrir bloc de notas y calculadora**

“Sé el programa que abre dos aplicaciones a la vez. Traza cada paso.”

| import subprocess, timeprint("🚀 Abriendo bloc de notas...")notepad \= subprocess.Popen(\["notepad.exe"\])print(f" → PID: {notepad.pid}")print("🚀 Abriendo calculadora...")calc \= subprocess.Popen(\["calc.exe"\])print(f" → PID: {calc.pid}")print("\\nAmbos programas están abiertos.")print("El usuario puede escribir en el bloc de notas y usar la calculadora.") *\# Mientras tanto, Python no está bloqueado*for i in range(5):  print(f" Python haciendo cosas... ({i+1}/5)")  time.sleep(1)print("\\nCerrando programas...")notepad.terminate()calc.kill()print("Hecho 🏁") |
| :---- |

**Traza paso a paso:**

1\. subprocess.Popen(\["notepad.exe"\])  
 → El SO crea un nuevo proceso  
 → Windows busca notepad.exe en el PATH  
 → Lo carga en memoria  
 → Asigna PID 12345  
 → Python recibe el control inmediatamente

 2\. print("PID: 12345")

 3\. subprocess.Popen(\["calc.exe"\])  
 → Mismo proceso, PID 12346

 4\. Python hace 5 cosas mientras ambos están abiertos  
 → 3 procesos independientes: Python, notepad, calc

 5\. notepad.terminate()  
 → Envía señal de cierre al bloc de notas

 6\. calc.kill()  
 → Mata la calculadora forzosamente

Fíjate en el paso 4: **Python no se bloquea**. Mientras los dos programas están abiertos, el proceso de Python sigue imprimiendo. Tres procesos independientes conviven a la vez, cada uno con su PID, su memoria y su turno de CPU.

## **🥊 El ring de los conceptos — run() vs Popen()**

*Dos funciones de subprocess se citan en el cuadrilátero para resolver, de una vez, quién lanza mejor.*

**run():** — ¡Yo soy el rey de la simplicidad\! Lanzas un comando, esperas, y ¡zas\! tienes el resultado.

**Popen():** — Sí, pero mientras tú esperas como un muñeco, yo puedo lanzar un proceso y seguir haciendo otras cosas. ¿Para qué esperar si no hace falta?

**run():** — ¿Y si necesitas el resultado? Conmigo es directo: result.stdout y ya. Tú necesitas communicate(), más vueltas…

**Popen():** — Pero imagina que quieres lanzar 3 programas a la vez. Conmigo puedes lanzarlos, irte a hacer café, y luego matarlos a todos. Tú tendrías que esperar a que termine cada uno antes de lanzar el siguiente.

**run():** — Vale, vale… para procesos que viven en segundo plano, eres mejor. Pero para comandos rápidos y resultados inmediatos, soy más limpio.

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

# **9\. Cierre: consolida lo aprendido** {#9.-cierre:-consolida-lo-aprendido}

Has terminado la teoría: la burbuja de memoria y el PID, los cinco estados, paralela contra distribuida, run(), Popen(), los pipes con communicate() y la compatibilidad Windows/Linux. Este cierre es el aterrizaje: recorres lo aprendido con juegos, un laboratorio real con fallos intencionados y las preguntas que te harán en una entrevista. Léelo justo después del punto 8 y antes de abrir los boletines.

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

## 

## **🔥 Fireside Chat: Proceso vs Hilo**

*Un proceso y un hilo se sientan junto a la chimenea a resolver, de una vez, quién es más ligero.*

**Proceso:** — Yo soy la unidad completa: memoria propia, recursos, PID. Si me cuelgo, tú ni te enteras.

**Hilo:** — ¿Y para qué quieres toda esa burbuja? Yo vivo **dentro** de un proceso y comparto su memoria. Soy mucho más barato de crear.

**Proceso:** — Pero mis fallos no tumban a nadie más. Tú, si se te va un puntero, te llevas por delante al proceso entero.

**Hilo:** — Cierto, pero yo puedo compartir variables directamente. Tú necesitas pipes y communicate() para hablar con tu vecino.

**Proceso:** — Sí, pero en Python tengo otra ventaja: mi propio intérprete. Los hilos comparten el **GIL**, así que mi paralelismo con multiprocessing es real.

**Hilo:** — Vale, vale. Tú para aislamiento y paralelismo real; yo para tareas ligeras que comparten memoria. ¿Empate?

**Proceso:** — *sonríe* Empate…

**Moraleja**: el proceso aísla y paraleliza de verdad; el hilo es ligero y comparte memoria. Los hilos los veremos más adelante en el temario

## **🕵️ ¿Quién soy?**

1. Soy el identificador único que el SO asigna a cada proceso.  
2. Soy el estado en el que el proceso espera un recurso (I/O, socket, sleep).  
3. Soy el mecanismo por el que una sola CPU parece ejecutar varios procesos a la vez.  
4. Soy el módulo de Python que reparte tareas en procesos paralelos reales.  
5. Soy el tubo que conecta la salida de un proceso con la entrada de otro.  
6. Soy el proceso que ya terminó pero que su padre no ha recogido todavía.

**🔄 Respuestas**

1. **PID**.  
2. **BLOQUEADO**.  
3. **El planificador (scheduler)** con la **concurrencia** (time slices).  
4. **multiprocessing**.  
5. **El pipe**.  
6. **El zombie**.

## **🤬 CONRAD VS EL MUNDO: “maté el proceso y no volvió”**

**CONRAD:** — “Clásico: *‘he lanzado mi programa con subprocess.run y no me devuelve el control’*. ¡Pues claro\! run() espera a que el comando termine, y si lanzas notepad.exe, el bloc de notas no se cierra nunca: te quedas colgado hasta que el usuario cierre la ventana. Si querías lanzar y seguir, eso es Popen, no run().”

**CONRAD:** — “Y lo mejor: *‘puse shell=True para abrir el navegador y ahora un comando borra mis archivos’*. Pues sí: shell=True delega en el intérprete de comandos. Si le pasas un string con datos del usuario, es un agujero de seguridad. Lista de argumentos, nunca strings concatenados. O cmd /c, que para eso está.”

**CONRAD:** — “Y no me vengas con *‘¿será que mi proceso se ha convertido en zombie?’*. Míralo con proceso.poll(): si te devuelve el código de retorno, ya terminó y solo falta que lo recojas con wait() o poll(). Zombie sin recoger \= entrada ocupada en la tabla de procesos. A diagnosticar.”

## **🧠 Atrévete a pensar**

1. ¿Por qué un proceso no puede compartir memoria directamente con otro?  
2. ¿Qué pasa si un proceso hijo muere y su padre nunca llama a wait() ni poll()?  
3. ¿Cuándo usarías multiprocessing en lugar de subprocess?  
4. ¿Por qué shell=True es peligroso si le pasas datos del usuario?  
5. ¿Qué ventaja tiene Popen sobre run() para lanzar 3 aplicaciones a la vez?

**💡 Soluciones**

1. Porque cada proceso vive en su **burbuja de memoria aislada**; si compartieran memoria, un fallo de uno corrompería a todos. Por eso se comunican con **mecanismos externos**: pipes, sockets, archivos.  
2. Se queda como **zombie**: ya terminó, pero su código de retorno sigue en la tabla de procesos hasta que el padre lo recoge con wait() o poll(). El sistema lo limpia cuando el padre muere.  
3. multiprocessing para **paralelismo real** dentro de tu programa (repartir trabajo entre CPUs); subprocess para **lanzar otros programas** (apps, comandos del sistema).  
4. Porque shell=True delega en el intérprete de comandos: un dato del usuario con ;, & o | puede **ejecutar comandos extra** (inyección). La lista de argumentos no tiene ese problema.  
5. Popen devuelve el control al instante: lanzas las tres y sigues trabajando mientras viven. Con run() tendrías que esperar a que cada una termine antes de lanzar la siguiente.

## **💬 Entrevista de trabajo**

1. **“¿Qué es un proceso y en qué se diferencia de un programa?”**  
2. **“Explica el ciclo de vida de un proceso.”**  
3. **“¿Qué diferencia hay entre computación paralela y distribuida?”**  
4. **“¿Cómo lanzarías un programa externo desde Python y leerías su salida?”**  
5. **“¿Qué diferencia hay entre run() y Popen()? ¿Cuándo usarías cada uno?”**  
6. **“¿Cómo comunicarías dos procesos entre sí?”**

💡 **Cómo encararlas:** la 4 y la 5 son las “preguntas reina”. Para la 4, recorre la cadena: subprocess.run(\[...\], capture\_output=True, text=True) → resultado.stdout; si el proceso necesita datos, Popen(stdin=PIPE, stdout=PIPE) \+ communicate(input=...). Para la 5, repite la moraleja: run() para respuestas inmediatas, Popen() para segundo plano. Y para la 1 no olvides la **burbuja de memoria** y el **PID**. Si sabes contarlo fluido, ya eres medio programador de sistemas.

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
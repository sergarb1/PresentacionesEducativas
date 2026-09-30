**LICENCIA**

**Reconocimiento \- No comercial \- CompartirIgual (BY-NC-SA):** No se permite un uso comercial de la obra original ni de las posibles obras derivadas, la distribución de las cuales se ha de hacer con una licencia igual a la que regula la obra original.

**ÍNDICE**

**[1\. De proceso a hilo	3](#1.-de-proceso-a-hilo)**

[**2\. Tu primer hilo	5**](#2.-tu-primer-hilo)

[**3\. Hilos con argumentos	8**](#3.-hilos-con-argumentos)

[**4\. Hilos daemon	12**](#4.-hilos-daemon)

[**5\. Timer	15**](#5.-timer)

[**6\. El GIL	18**](#6.-el-gil)

[**7\. Estados del hilo	21**](#7.-estados-del-hilo)

[**8\. Hilos en la práctica	23**](#8.-hilos-en-la-práctica)

[**9\. Cierre: consolida lo aprendido	26**](#9.-cierre:-consolida-lo-aprendido)

# 

**Unidad 03 \- Hilos y concurrencia**

# **1\. De proceso a hilo** {#1.-de-proceso-a-hilo}

## **📬 La idea en una frase**

Un **hilo** es la unidad más pequeña de ejecución: una tarea que vive *dentro* de un proceso y comparte su memoria con los demás hilos de ese proceso.

En la unidad pasada lanzaste procesos: programas completos con su propia memoria, su propio PID y su propio estado. Ahora entramos a un nivel más fino: un solo proceso puede tener **varios hilos ejecutándose a la vez**, todos trabajando con la misma memoria. Es como pasar de abrir varias casas (procesos) a repartir habitaciones dentro de una sola (hilos).

## **🧵 ¿Qué es un hilo?**

Un **hilo** (thread) es la unidad más pequeña de ejecución que el sistema operativo puede gestionar. Un proceso puede tener múltiples hilos, todos compartiendo la misma memoria.

| import threadingdef saludar():   print("¡Hola desde un hilo\!")   hilo \= threading.Thread(target=saludar)   hilo.start()   hilo.join() |
| :---- |

Fíjate en las tres líneas mágicas que ya usarás toda la unidad:

1. threading.Thread(target=saludar) → **crea** el hilo (todavía no hace nada).  
2. hilo.start() → **lo lanza**: el hilo empieza a ejecutar la función saludar.  
3. hilo.join() → **espera** a que el hilo termine antes de seguir con el programa.

### **Características de un hilo**

* **Comparten memoria** con otros hilos del mismo proceso (por eso se comunican tan rápido).  
* Son **más ligeros que los procesos**: cuestan muchos menos recursos al crearlos.  
* Se comunican mediante **variables compartidas** (con cuidado: eso es el TEMA 03).  
* En Python, están **limitados por el GIL** para código CPU-bound (lo verás en el punto 6).

## **🥊 Hilos vs Procesos**

| Característica | Proceso | Hilo |
| ----- | ----- | ----- |
| Memoria | Aislada (cada uno la suya) | Compartida (todos en la misma) |
| Creación | Lenta (el SO debe copiar recursos) | Rápida |
| Comunicación | Pipes, sockets, archivos | Variables globales |
| Aislamiento | Alto (uno no afecta a otro) | Bajo (uno puede romper a todos) |
| Coste | Alto | Bajo |

“Los procesos son como casas separadas. Los hilos son como habitaciones de la misma casa.”

## **🍳 La analogía de los chefs en una cocina**

Imagina una cocina de restaurante con varios cocineros:

* **Procesos** \= cocinas de restaurantes diferentes. Cada una tiene su propia cocina, sus propios fogones y sus propios ingredientes. Si un restaurante se quema, el de al lado ni se entera (aislamiento alto). Pero abrir un restaurante nuevo es caro y lento.  
* **Hilos** \= cocineros dentro de la **misma** cocina. Todos comparten la encimera, la nevera y los ingredientes (memoria compartida). Contratar a un cocinero más es barato y rápido. Pero si uno tira el aceite caliente, todos lo sufren (aislamiento bajo).

“Un hilo es como una tarea dentro de una casa. Todos los hilos comparten la misma casa (memoria), pero cada uno hace su propia cosa.”

Ese reparto de la misma nevera es lo que hace a los hilos tan rápidos para comunicarse… y tan peligrosos si dos tocan el mismo ingrediente a la vez. Ese peligro se llama **condición de carrera**.

## **🧠 Mini-chequeo**

1. ¿Dónde vive un hilo: dentro de un proceso o junto a él?  
2. ¿Por qué un hilo es más barato de crear que un proceso?  
3. ¿Cuál es el precio de compartir memoria entre hilos?

**🔄 Respuestas**

1. **Dentro** de un proceso. Un proceso puede tener varios hilos ejecutándose a la vez, todos con la misma memoria.  
2. Porque **no hay que copiar recursos**: el hilo reutiliza la memoria y las estructuras del proceso que ya existe. Un proceso nuevo obliga al SO a preparar un espacio aislado entero.  
3. El **aislamiento bajo**: si un hilo corrompe una variable compartida, afecta a todos los hilos del proceso. Uno solo puede romper a todos.

## **✅ Resumen en 3 frases**

* Un **hilo** es la unidad más pequeña de ejecución y vive dentro de un proceso compartiendo su memoria.  
* Frente a los procesos, los hilos son más ligeros, se crean más rápido y se comunican con variables compartidas, pero con menos aislamiento.  
* La memoria compartida es a la vez su gran ventaja y su gran riesgo: a eso le pondremos remedio más adelante.

## 

## 

## 

## 

## **🐛 Vocabulario rápido**

| Término | Idea general |
| ----- | ----- |
| Hilo (thread) | Unidad más pequeña de ejecución dentro de un proceso |
| Memoria compartida | La memoria del proceso, usada por todos sus hilos |
| threading.Thread | Clase de Python para crear un hilo |
| start() | Lanza el hilo: empieza a ejecutar su función |
| join() | Espera a que el hilo termine |
| GIL | Candado de CPython que limita los hilos para código CPU-bound |

# **2\. Tu primer hilo** {#2.-tu-primer-hilo}

## **📬 La idea en una frase**

Crear un hilo es escribir threading.Thread(target=funcion), lanzarlo con .start() y esperarlo con .join().

Tres líneas. Eso es todo lo que necesitas para que una función se ejecute en paralelo con el resto del programa. La gracia (y la complicación) está en *cuándo* se ejecuta cada pieza.

## **🧵 Crear y lanzar un hilo**

| import threadingdef saludar():   print("¡Hola desde un hilo\!")   hilo \= threading.Thread(target=saludar)   hilo.start()   hilo.join() |
| :---- |

**Salida:**

| ¡Hola desde un hilo\! |
| :---- |

Desglose de las tres líneas clave:

| Línea | Qué hace |
| ----- | ----- |
| threading.Thread(target=saludar) | Crea el hilo. En este momento el hilo existe, pero no hace nada (estado NUEVO. |
| hilo.start() | Lanza el hilo: pasa a ejecutable y el sistema operativo decide cuándo ejecutar saludar(). |
| hilo.join() | Espera a que el hilo termine. Sin ella, el programa principal seguiría su camino y podría terminar antes que el hilo. |

⚠️ Un error típico de principiante: llamar a saludar() directamente (con paréntesis) en vez de pasar la función sin ellos. target=saludar pasa la *referencia*; target=saludar() ejecuta la función antes de crear el hilo y no lanza nada.

## **👑 El hilo principal vs los hilos secundarios**

Cuando ejecutas python programa.py, tu código se ejecuta dentro de un hilo: el **hilo principal** (main thread). Todo lo que lanzas con Thread() son **hilos secundarios** que viven dentro del mismo proceso.

*![][image1]*

El hilo principal **no espera** a los secundarios por arte de magia: hay que decírselo con join(). Sin join(), el principal puede llegar al final de su código y su último print puede salir **antes** que el de los secundarios. Ojo: el intérprete **sí espera** a que terminen todos los hilos **no-daemon** antes de salir del programa; lo que pierdes sin join() es el **orden** de la salida, no la espera.

## **⏳ join() — esperar a que termine**

join() hace que el programa principal espere hasta que el hilo termine.

| import threading, timedef trabajador(segundos):   print(f"Trabajando durante {segundos}s...")   time.sleep(segundos)   print("Terminado")   h \= threading.Thread(target=trabajador, args=(3,))   h.start()   print("Esperando al hilo...")   h.join()  *\# Espera hasta que termine*   print("El hilo terminó, continuamos") |
| :---- |

**Salida:**

| Trabajando durante 3s...Esperando al hilo...TerminadoEl hilo terminó, continuamos |
| :---- |

Fíjate en el orden: el print("Esperando al hilo...") del principal aparece *mientras* el hilo sigue dormido. El principal llega a join(), se queda bloqueado esperando, y recién cuando el hilo termina sigue con su última línea.

Sin join(), el programa principal seguiría y posiblemente terminaría antes que el hilo. Con join(), tienes la garantía de que el hilo ha acabado cuando tú continúas.

## **🧰 Propiedades de un hilo**

Un hilo no es solo una función en ejecución: es un objeto con información útil.

| *import threadingdef fn():   print(f"Ejecutando {threading.current\_thread().name}")   hilo \= threading.Thread(target=fn, name="hilo-1")   hilo.start()   hilo.join()   print(hilo.name)  \# "hilo-1"   print(hilo.ident)  \# ID numérico del hilo   print(hilo.daemon)  \# True/False (lo verás en el punto 4\)   print(hilo.is\_alive())  \# True si sigue ejecutándose* |
| :---- |

| Propiedad | Qué devuelve |
| ----- | ----- |
| .name | El nombre del hilo (por defecto algo como “Thread-1”) |
| .ident | Un ID numérico único mientras el hilo vive |
| .daemon | True si es un hilo daemon, False si no |
| .is\_alive() | True si el hilo aún se está ejecutando |

💡 Desde dentro del hilo puedes obtener tu propia información con threading.current\_thread(), que devuelve el objeto Thread actual.

## **🧠 Mini-chequeo**

1. ¿Qué pasa si creas un hilo y no llamas a start()?  
2. ¿Qué pasa si llamas a start() dos veces sobre el mismo hilo?  
3. ¿Para qué sirve join()? ¿Qué riesgo evitas?

🔄 Respuestas

1. El hilo existe pero **no hace nada**: sin start() la función nunca se ejecuta. Es solo un objeto esperando en estado NUEVO.  
2. **Error** (RuntimeError: threads can only be started once). Un hilo solo puede lanzarse una vez; si quieres repetir el trabajo, crea otro Thread.  
3. join() hace que el programa principal **espere** a que el hilo termine, evitando que el programa acabe antes que sus hilos y sin saber qué ha pasado.

## **✅ Resumen en 3 frases**

* Crear y lanzar un hilo es Thread(target=fn), .start() y .join(): crear, lanzar, esperar.  
* El **hilo principal** no espera a los secundarios por defecto; join() fuerza esa espera.  
* Cada hilo es un objeto con .name, .ident, .daemon e .is\_alive() que te cuenta su estado.

## **🐛 Vocabulario rápido**

| Término | Idea general |
| ----- | ----- |
| Hilo principal | El hilo que ejecuta python programa.py, el “main” |
| Hilo secundario | Un hilo lanzado desde otro con Thread() |
| start() | Lanza el hilo: de nuevo a ejecutable |
| join() | Bloquea el programa principal hasta que el hilo termina |
| is\_alive() | Dice si el hilo todavía se está ejecutando |
| current\_thread() | Devuelve el objeto Thread desde dentro del propio hilo |

# **3\. Hilos con argumentos** {#3.-hilos-con-argumentos}

## **📬 La idea en una frase**

Para que un hilo trabaje con datos propios le pasas argumentos en args= (tupla) o kwargs= (diccionario), y para distinguirlo le pones nombre con .name.

Sin argumentos, todos los hilos harían exactamente lo mismo. Con args y kwargs, cada hilo puede hacer su versión del trabajo. Y con .name, puedes saber en cada momento *quién* está haciendo qué.

## **🎒 Pasar argumentos con args**

La función que ejecuta el hilo puede recibir argumentos: se los pasas en args= como una **tupla**, en el mismo orden que espera la función.

| import threadingdef trabajar(nombre, tarea):   print(f"{nombre} empezando: {tarea}")   *\# ... trabajo ...*   print(f"{nombre} terminó: {tarea}")   *\# Crear hilos con nombre y argumentos*   hilo\_a \= threading.Thread(target=trabajar, args=("Ana", "lavar platos"))   hilo\_b \= threading.Thread(target=trabajar, args=("Bob", "fregar suelo"))   *\# Lanzarlos*   hilo\_a.start()   hilo\_b.start()   *\# Esperar*   hilo\_a.join()   hilo\_b.join() |
| :---- |

**Salida (orden no garantizado):**

| Ana empezando: lavar platosBob empezando: fregar sueloAna terminó: lavar platosBob terminó: fregar suelo |
| :---- |

⚠️ **Truco de la coma:** una tupla de un solo elemento necesita coma final: args=("Ana",). Sin la coma, args="Ana" no es una tupla: Python **itera el string** y pasa un argumento por carácter ('A', 'n', 'a'), así que trabajar recibiría 3 argumentos en lugar de 1 → TypeError.

## **🎁 kwargs: argumentos con nombre**

Si tu función usa parámetros con nombre, puedes pasarlos con kwargs= en forma de diccionario.

| import threadingdef preparar(plato, minutos):   print(f"Preparando {plato}: tarda {minutos} min")   hilo \= threading.Thread(target=preparar, kwargs={"plato": "paella", "minutos": 40})   hilo.start()   hilo.join() |
| :---- |

**Salida:**

| Preparando paella: tarda 40 min |
| :---- |

Puedes mezclar ambos: args=("Ana",) y kwargs={"tarea": "limpiar"} si la función recibe (nombre, tarea=...). Lo importante es que el orden de args coincide con los parámetros posicionales, y kwargs con los de nombre.

## **📇 Nombrar hilos: .name \= "hilo-" \+ str(n)**

Cuando lanzas varios hilos iguales, ¿cómo sabes cuál es cuál? Poniéndoles nombre. La forma clásica es generarlos con un nombre único dentro de un bucle:

| import threadingdef trabajar(n):   print(f"🌱 {threading.current\_thread().name}: trabajando ({n})")   *\# ... trabajo ...*   print(f"🏁 {threading.current\_thread().name}: terminado ({n})")hilos \= \[\]for i in range(1, 4):   h \= threading.Thread(target=trabajar, args=(i,))   h.name \= "hilo-" \+ str(i)  *\# 📇 nombre único*   hilos.append(h)for h in hilos:   h.start()for h in hilos:   h.join() |
| :---- |

**Salida (orden no garantizado):**

| 🌱 hilo\-1: trabajando (1)🌱 hilo\-2: trabajando (2)🌱 hilo\-3: trabajando (3)🏁 hilo\-1: terminado (1)🏁 hilo\-3: terminado (3)🏁 hilo\-2: terminado (2) |
| :---- |

Fíjate en los detalles:

* h.name \= "hilo-" \+ str(i) asigna un **nombre único** a cada hilo antes de lanzarlo.  
* Dentro de la función, threading.current\_thread().name devuelve el nombre del hilo que está ejecutando.  
* Los print **se entremezclan**: el orden exacto lo decide el scheduler del sistema operativo, no nosotros.

💡También puedes poner el nombre directamente al crear: threading.Thread(target=trabajar, args=(i,), name="hilo-" \+ str(i)). El resultado es idéntico.

## **👨‍👩‍👧 Varios hilos a la vez**

Con una **lista por comprensión** puedes crear y lanzar N hilos en tres líneas. Es el patrón que usarás toda la unidad:

| import threadingdef tarea(n):   print(f"{threading.current\_thread().name} → tarea {n}")hilos \= \[   threading.Thread(target=tarea, args=(i,), name="hilo-" \+ str(i))   for i in range(1, 5)\]for h in hilos:   h.start()for h in hilos:   h.join()print("Todas las tareas terminadas") |
| :---- |

**Salida (orden no garantizado):**

| hilo\-1 → tarea 1hilo\-3 → tarea 3hilo\-2 → tarea 2hilo\-4 → tarea 4Todas las tareas terminadas |
| :---- |

El mensaje final **siempre aparece el último** gracias a los dos bucles: primero lanzas todos, luego esperas a todos con join().

## **🧠 Mini-chequeo**

1. ¿Qué le pasas a args=? ¿Y a kwargs=?  
2. ¿Por qué hace falta la coma en args=("Ana",)?  
3. ¿Cómo sabes, dentro de la función del hilo, el nombre del hilo que te está ejecutando?

**🔄 Respuestas**

1. A args= una **tupla** con los argumentos posicionales (("Ana", "lavar platos")); a kwargs= un **diccionario** con los argumentos con nombre ({"plato": "paella"}).  
2. Porque ("Ana") sin coma es solo un string, no una tupla. Con la coma, Python entiende que quieres una tupla de un elemento.  
3. Con threading.current\_thread().name: devuelve el objeto Thread que te está ejecutando, y su .name.

## **✅ Resumen en 3 frases**

* Los argumentos del hilo se pasan con args= (tupla) o kwargs= (diccionario), en el orden o con el nombre que espera la función.  
* Con .name \= "hilo-" \+ str(n) cada hilo lleva un nombre único que puedes leer con threading.current\_thread().name.  
* El patrón lista por comprensión \+ for h in hilos: h.start() \+ for h in hilos: h.join() lanza N hilos a la vez y espera a todos.

## **🐛 Vocabulario rápido**

| Término | Idea general |
| ----- | ----- |
| args | Tupla de argumentos posicionales que recibe la función del hilo |
| kwargs | Diccionario de argumentos con nombre que recibe la función |
| .name | Nombre del hilo, único para distinguirlo |
| current\_thread() | El objeto Thread del hilo que se está ejecutando |
| Lista por comprensión | Forma compacta de crear N hilos en una línea |

# **4\. Hilos daemon** {#4.-hilos-daemon}

## **📬 La idea en una frase**

Un hilo **daemon** se ejecuta en segundo plano y **se mata automáticamente** cuando el programa principal termina. Los no-daemon, en cambio, impiden que el programa salga hasta terminar.

Imagina una alarma de incendios: la quieres encendida mientras el edificio está vivo, pero si el edificio desaparece, la alarma no tiene sentido y muere con él. Esa es la filosofía del hilo daemon.

## **😈 ¿Qué es un hilo daemon?**

Un hilo **daemon** (diablo) es un hilo de fondo pensado para tareas auxiliares: monitorizar, limpiar, emitir un heartbeat, mostrar un reloj… La regla de oro:

* Un hilo **no daemon** (por defecto) impide que el programa termine hasta que él acabe.  
* Un hilo **daemon** se corta en seco cuando el programa principal llega al final, sin esperar a nada.

| *import threading, timedef reloj():   """Imprime la hora cada segundo (por siempre)"""   while True:       print(f"⏰ {time.strftime('%H:%M:%S')}")       time.sleep(1)hilo\_reloj \= threading.Thread(target=reloj, daemon=True)hilo\_reloj.start()time.sleep(3)  \# El programa principal dura 3 segundosprint("Programa principal terminando...")\# Al terminar, el hilo daemon se mata solo* |
| :---- |

**Salida:**

| ⏰ 14:35:22⏰ 14:35:23⏰ 14:35:24Programa principal terminando... |
| :---- |

El reloj es un while True: nunca terminaría. Si no fuera daemon, el programa se quedaría colgado para siempre esperándolo. Siendo daemon, el programa principal hace su vida, y al terminar **el hilo muere con él**.

| Tipo | Comportamiento |
| ----- | ----- |
| daemon=False (defecto) | El programa espera a que termine |
| daemon=True | El programa lo mata al salir |

Los hilos **no daemon** impiden que el programa termine. Los daemon se sacrifican para que el programa pueda salir.

## **🪂 Be the code, my friend — daemon en acción**

Vamos a ser el código. El mismo trabajador de 5 pasos, primero sin daemon y luego con él.

**SIN daemon — el programa espera:**

| import threading, timedef trabajador():   for i in range(5):       print(f"Trabajando... ({i+1}/5)")       time.sleep(0.5)   print("Trabajador terminó")*\# SIN daemon \-- el programa espera*h1 \= threading.Thread(target=trabajador)h1.start()h1.join()print("Programa terminó (después del hilo)") |
| :---- |

**Salida:**

| Trabajando... (1/5)Trabajando... (2/5)Trabajando... (3/5)Trabajando... (4/5)Trabajando... (5/5)Trabajador terminóPrograma terminó (después del hilo) |
| :---- |

El hilo hace sus 5 pasos completos y **recién después** el programa principal termina.

**CON daemon — el hilo se mata al salir:**

| *\# CON daemon \-- el hilo se mata al salir*h2 \= threading.Thread(target=trabajador, daemon=True)h2.start()time.sleep(1.2)print("Programa terminó (el hilo daemon muere conmigo)") |
| :---- |

**Salida:**

| Trabajando... (1/5)Trabajando... (2/5)Trabajando... (3/5)Programa terminó (el hilo daemon muere conmigo) |
| :---- |

El daemon solo llegó a la iteración 3\. El programa principal terminó y lo mató. Fíjate: no hay join() aquí, porque no queremos esperarlo; justo lo contrario.

## **🥊 El ring de los conceptos — Hilo normal vs Hilo daemon**

**Hilo Normal**: — Yo soy un hilo de verdad. El programa principal espera a que termine lo que tengo que hacer. Tengo responsabilidad.

**Hilo Daemon**: — ¡Qué aburrido\! Yo soy libre. Mi única misión es servir en segundo plano. Cuando el programa principal termina, yo me muero con él, sin dramas.

**Hilo Normal**: — ¿Y si estás en medio de algo importante cuando el main termina? Pierdes datos, dejas cosas a medias…

**Hilo Daemon**: — Para eso existen los daemon bien hechos: tareas de monitorización, limpieza, heartbeat… cosas que da igual si se cortan. Si quieres garantía de finalización, usas un hilo normal con join().

**Hilo Normal**: — Cierto. Al final, cada uno tiene su sitio. Yo para tareas críticas, tú para servicios auxiliares.

**Moraleja**: Usa hilos **daemon** para servicios de fondo prescindibles. Usa hilos **normales** con join() para tareas que deben completarse sí o sí.

## **⏳ join() para esperar a un daemon (si acaso lo necesitas)**

Un daemon se mata solo al final… pero también puedes esperarlo explícitamente con join() si quieres que termine *antes* de que el programa siga. El join() funciona igual: bloquea hasta que el hilo termina. Con un daemon infinito (while True) eso significa esperar para siempre, así que solo tiene sentido con daemons finitos o con join(timeout):

| import threading, timedef aviso():   time.sleep(2)   print("Aviso listo")h \= threading.Thread(target=aviso, daemon=True)h.start()h.join(timeout=3)  *\# espera como mucho 3 segundos*print("Continuamos...") |
| :---- |

**join(timeout=N)** espera un máximo de N segundos: si el hilo no ha terminado, el programa sigue igual. Es la herramienta perfecta para no quedarse bloqueado.

## **🧠 Mini-chequeo**

1. ¿Un hilo daemon impide que el programa termine?  
2. ¿Cuándo usarías daemon=True en lugar de un hilo normal?  
3. ¿Qué hace join(timeout=2) si el hilo tarda 5 segundos?

**🔄 Respuestas**

1. **No.** Un daemon se mata automáticamente cuando el programa principal termina. Quien impide que el programa termine es el hilo **no daemon**.  
2. Para **servicios de fondo prescindibles**: monitorización, limpieza, heartbeat, un reloj… Si el programa acaba, da igual que se corten. Si la tarea debe completarse sí o sí, hilo normal con join().  
3. Espera 2 segundos como máximo y luego **continúa**, aunque el hilo siga vivo a los 5\. is\_alive() te diría que todavía se está ejecutando.

## **✅ Resumen en 3 frases**

* Un hilo **daemon** se ejecuta en segundo plano y se **mata al terminar** el programa principal.  
* Un hilo **normal** impide que el programa salga hasta completarse; por eso las tareas críticas van con join().  
* Regla: daemon para servicios auxiliares prescindibles, normal para lo que debe terminarse sí o sí.

## **🐛 Vocabulario rápido**

| Término | Idea general |
| ----- | ----- |
| Hilo daemon | Hilo de fondo que muere cuando termina el programa principal |
| daemon=True | Flag que convierte un hilo en daemon |
| Hilo normal | Hilo que el programa principal espera antes de salir |
| join(timeout) | Espera al hilo un máximo de segundos y sigue |
| Heartbeat | Señal periódica de “sigo vivo”, típica de hilos daemon |

# **5\. Timer** {#5.-timer}

## **📬 La idea en una frase**

threading.Timer(retardo, funcion) ejecuta funcion **una sola vez** después de retardo segundos, sin bloquear el resto del programa.

El Timer es un hilo especial que en vez de empezar a trabajar ya, se queda “dormido” el tiempo que le digas y entonces dispara la función. Es la manera más sencilla de programar un aviso diferido.

## **⏰ El ejemplo mínimo**

| import threadingdef aviso():   print("⏰ ¡Tiempo cumplido\!")temporizador \= threading.Timer(5.0, aviso)temporizador.start()print("Timer iniciado, 5 segundos...")*\# temporizador.cancel()  \# Si queremos cancelar* |
| :---- |

**Salida:**

| Timer iniciado, 5 segundos...⏰ ¡Tiempo cumplido\! |
| :---- |

El print("Timer iniciado...") sale **inmediatamente**: el programa no se queda bloqueado esperando. Cinco segundos después, el Timer dispara aviso() por su cuenta, como un hilo más.

Timer ejecuta la función **una sola vez** después del retardo. No se repite. Si lo que quieres es repetirlo cada N segundos, la forma clásica es que la propia función se reprograme (lo retocamos en el boletín avanzado).

## **🧭 Cancelar un Timer**

Como el Timer es un hilo, puedes cancelarlo antes de que dispare con .cancel():

| import threading, timedef aviso():   print("⏰ ¡Tiempo cumplido\!")t \= threading.Timer(5.0, aviso)t.start()time.sleep(2)t.cancel()  *\# cancelamos antes de los 5 segundos*print("Cancelado: el aviso nunca llegará") |
| :---- |

**Salida:**

| Cancelado: el aviso nunca llegará |
| :---- |

cancel() funciona si el Timer todavía no ha disparado. Una vez disparado, ya no tiene sentido: la función ya se ejecutó.

## **🎁 Pasar argumentos al Timer**

El Timer admite los mismos args/kwargs que cualquier hilo:

| import threadingdef recordatorio(mensaje, veces):   for \_ in range(veces):       print(f"📌 {mensaje}")t \= threading.Timer(3.0, recordatorio, args=("¡Beber agua\!", 3))t.start()print("Recordatorio programado en 3 segundos...") |
| :---- |

**Salida:**

| Recordatorio programado en 3 segundos...📌 ¡Beber agua\!📌 ¡Beber agua\!📌 ¡Beber agua\! |
| :---- |

## **💡 Usos típicos del Timer**

| Uso | Ejemplo |
| ----- | ----- |
| Despertador / aviso | “¡Despierta\!” a los 3 segundos |
| Recordatorio | Un mensaje que aparece al pasar un rato |
| Timeout de una operación | Cancelar algo que tarda demasiado |
| Cierre de sesión | Desconectar a un usuario tras N segundos de inactividad |
| Limpieza diferida | Borrar un archivo temporal después de un tiempo |

Un detalle a recordar: el Timer dispara desde un **hilo aparte** que **hereda el valor de daemon del hilo que lo crea** (en el hilo principal, daemon=False). Eso significa que, por defecto, el intérprete **espera** al Timer antes de salir: si no quieres que el programa se alargue esperando el aviso, hazlo daemon a mano, y siempre **antes** de start():

| import threadingt \= threading.Timer(5, lambda: print("¡Despierta\!"))t.daemon \= True  *\# daemon: si el principal termina, el aviso se cancela*t.start() |
| :---- |

## **🧠 Mini-chequeo**

1. ¿Cuántas veces ejecuta el Timer la función?  
2. ¿El programa principal se bloquea mientras espera el retardo?  
3. ¿Qué hace t.cancel()?

**🔄 Respuestas**

1. **Una sola vez.** Tras el retardo ejecuta la función una vez y termina. No se repite por defecto.  
2. **No.** El Timer se ejecuta en su propio hilo; el programa principal sigue con lo suyo y recibe el aviso cuando toca.  
3. Cancela el Timer **antes** de que dispare, de modo que la función nunca llega a ejecutarse. Una vez disparado, cancel() no tiene efecto.

## **✅ Resumen en 3 frases**

* threading.Timer(retardo, funcion) ejecuta la función **una sola vez** después del retardo, sin bloquear el programa.  
* Puedes pasar argumentos con args=/kwargs= y cancelar el disparo con .cancel().  
* Es ideal para avisos, recordatorios y timeouts; si quieres repetición, la función debe reprogramarse a sí misma.

## **🐛 Vocabulario rápido**

| Término | Idea general |
| ----- | ----- |
| threading.Timer | Hilo que dispara una función tras un retardo |
| Retardo | Segundos que espera el Timer antes de ejecutar |
| cancel() | Cancela el disparo si aún no ha ocurrido |
| args / kwargs | Argumentos que recibe la función del Timer |
| Una sola vez | Comportamiento del Timer: no se repite por defecto |

# **6\. El GIL** {#6.-el-gil}

## **📬 La idea en una frase**

**GIL** \= Global Interpreter Lock: un candado interno de CPython que evita que dos hilos ejecuten bytecode Python a la vez, así que los hilos no aceleran el código de CPU… pero sí el de espera.

Es la gran trampa de los hilos en Python: “¿para qué sirven si no aceleran nada?” La respuesta corta: sí aceleran lo que vale la pena (esperar por red y disco) y no aceleran lo que no (calcular). Vamos a verlo con números.

## **🔒 ¿Qué es el GIL?**

**GIL** \= **G**lobal **I**nterpreter **L**ock. Es un candado que CPython (el Python de toda la vida) mantiene para que **solo un hilo ejecute bytecode Python en cada instante**.

¿Por qué existe? Para proteger la memoria interna del intérprete: sin el candado, dos hilos podrían corromper las estructuras de Python al tocarlas a la vez. Python paga el precio de la seguridad con un límite: **no hay paralelismo real de CPU** entre hilos de un mismo proceso.

*![][image2]*

Los hilos se turnan el candado en pequeños fragmentos: parecen simultáneos (por eso los print se entremezclan), pero nunca ejecutan Python a la vez.

## **⚡ CPU-bound: los hilos NO sirven de nada**

Una tarea **CPU-bound** es la que usa la CPU a tope: sumar millones de números, procesar imágenes, comprimir. Ahí el GIL no deja ejecutar a más de un hilo, así que 4 hilos tardan lo mismo que 1\.

| *import threading, time\# ⚡ CPU-bound: los hilos NO sirven de nadadef contar():   total \= 0   for i in range(50\_000\_000):       total \+= iinicio \= time.time()hilos \= \[threading.Thread(target=contar) for \_ in range(4)\]for h in hilos:   h.start()for h in hilos:   h.join()print(f"4 hilos CPU: {time.time() \- inicio:.2f}s")\# → varios segundos (mismo tiempo que con 1 hilo)* |
| :---- |

Cuatro hilos contando 50 millones cada uno… y el tiempo es prácticamente el mismo que con uno solo. Peor aún: a veces es **ligeramente más lento** por el coste de turnarse el candado.

## **🌐 I/O-bound: los hilos SÍ aceleran**

Una tarea **I/O-bound** espera por algo externo: descargar de una red, leer de disco, esperar una respuesta. Ahí el hilo **libera el GIL mientras espera**, y los demás pueden trabajar.

| *import threading, time\# 🌐 I/O-bound: los hilos SÍ acelerandef esperar():   time.sleep(2)  \# Simula descarga/lecturainicio \= time.time()hilos \= \[threading.Thread(target=esperar) for \_ in range(4)\]for h in hilos:   h.start()for h in hilos:   h.join()print(f"4 hilos I/O: {time.time() \- inicio:.2f}s")\# → \~2 segundos (4 descargas en paralelo)* |
| :---- |

En serio: cuatro hilos esperando 2 segundos **cada uno** terminan en \~2 segundos, no en 8\. Mientras un hilo espera la red, el siguiente aprovecha para iniciar su descarga. Todos esperan *a la vez*.

## **📊 La tabla que hay que saberse**

| Tipo de tarea | ¿Hilos ayudan? | Motivo |
| ----- | ----- | ----- |
| CPU-bound (calcular, procesar) | ❌ No | El GIL solo deja ejecutar a uno |
| I/O-bound (esperar red, disco) | ✅ Sí | El GIL se libera durante la espera |

💡 **¿Cómo distingo cada tipo?** Si tu programa gasta el tiempo **calculando** (contar, cifrar, procesar), es CPU-bound. Si gasta el tiempo **esperando** (descargar, consultar una API, leer archivos), es I/O-bound. Los hilos brillan en el segundo caso.

## **🔨 Cuándo sirven de verdad los hilos**

Con lo visto, el mapa mental queda así:

* **Solicitudes de red** → hilos sí. Descargar 10 archivos con 10 hilos es \~10 veces más rápido.  
* **Lecturas/escrituras de archivos** → hilos sí. Varias operaciones de disco en paralelo.  
* **Servidores que atienden clientes** → hilos sí. Cada cliente espera su turno; mientras espera, otros avanzan (lo verás en la UD 6).  
* **Cálculo puro** → hilos no. Para eso, **multiprocessing**.

Para CPU-bound en Python, usa multiprocessing (varios procesos, cada uno con su propio GIL). Esos procesos sí ejecutan en paralelo de verdad, a cambio del coste de crear procesos que viste en el punto 1.

## **🧠 Mini-chequeo**

1. ¿Qué significa exactamente “CPython solo ejecuta un hilo a la vez”?  
2. Descargar 5 archivos de 2 segundos cada uno: ¿1 hilo o 5 hilos? ¿Cuánto tarda cada opción?  
3. Sumar 50 millones de números con 4 hilos: ¿más rápido, igual o más lento que con 1?

**🔄 Respuestas**

1. Que el GIL hace que los hilos se **turnen** la ejecución del bytecode Python en fragmentos pequeños. Parecen simultáneos, pero nunca ejecutan Python a la vez.  
2. **5 hilos**: los 5 esperan a la vez y se acaba en \~2 segundos. Con 1 hilo, 5 × 2 \= **10 segundos**.  
3. **Igual** (a veces ligeramente más lento). El GIL no deja que más de un hilo calcule a la vez; para eso hace falta multiprocessing.

## **✅ Resumen en 3 frases**

* El **GIL** es un candado de CPython que impide que dos hilos ejecuten bytecode a la vez.  
* Para código **CPU-bound**, los hilos no sirven; para código **I/O-bound**, aceleran muchísimo porque el GIL se libera durante la espera.  
* Cuando necesitas paralelismo real de CPU, toca usar multiprocessing, no hilos.

## **🐛 Vocabulario rápido**

| Término | Idea general |
| ----- | ----- |
| GIL | Global Interpreter Lock: candado de CPython |
| CPU-bound | Tarea que gasta el tiempo calculando (no le sirven los hilos) |
| I/O-bound | Tarea que gasta el tiempo esperando (le sirven los hilos) |
| Bytecode | El código intermedio que ejecuta CPython, protegido por el GIL |
| multiprocessing | Módulo para paralelismo real con procesos (cada uno con su GIL) |

# **7\. Estados del hilo** {#7.-estados-del-hilo}

## **📬 La idea en una frase**

Un hilo nace como objeto, se lanza con start(), espera su turno, se ejecuta, se bloquea cuando espera algo y termina cuando su función acaba: ese es su ciclo de vida.

Cada hilo pasa por estados, igual que una persona pasa por situaciones a lo largo del día. Saber en qué estado está un hilo (o cuándo lo estará) es clave para entender por qué un programa se comporta como se comporta.

## **🔄 El diagrama del ciclo de vida**

*![][image3]*

## **🗺️ Los estados, uno a uno**

| Estado | Significado |
| ----- | ----- |
| **NUEVO** | El objeto Thread existe pero no se ha llamado a start() |
| **EJECUTABLE** | start() llamado. Puede ejecutar en cualquier momento |
| **EJECUCIÓN** | El scheduler le ha dado la CPU: está ejecutando su código ahora mismo |
| **BLOQUEADO** | Esperando (sleep, I/O, un lock) |
| **TERMINADO** | El método run() ha terminado |

**Recorrido completo de un hilo típico:**

1. **NUEVO** — threading.Thread(target=fn) crea el objeto. Todavía no se ejecuta nada.  
2. **EJECUTABLE** — h.start() lo lanza. A partir de aquí el scheduler del sistema operativo decide *cuándo* le toca.  
3. **EJECUCIÓN** — Le toca: ejecuta su código. Puede volver a EJECUTABLE cuando el scheduler decide dar paso a otro hilo.  
4. **BLOQUEADO** — El hilo se queda esperando: un time.sleep(), una lectura de red, una espera de I/O o (en el TEMA 03\) un lock. Cuando lo que espera se libera, vuelve a EJECUTABLE.  
5. **TERMINADO** — La función que ejecutaba el hilo acaba. Su run() terminó y no volverá a ejecutarse.

## **🧍 El estado BLOQUEADO, el más importante**

En la práctica, el estado que más vemos es **BLOQUEADO**, y casi siempre por dos motivos:

* **time.sleep(n)** — el hilo pide “no me des CPU durante n segundos” (lo usaste en los puntos 2 y 4).  
* **Espera de I/O** — descarga, lectura de archivo, esperar un socket (del TEMA 04 para allá).

Mientras un hilo está BLOQUEADO, **libera la CPU** (y también el GIL): otro hilo puede ejecutar. Es exactamente el mecanismo que hace rápidas las tareas I/O-bound.

💡 sleep(0) es un caso curioso: cede la CPU **voluntariamente** sin esperar nada, solo para dar paso a otro hilo. Es una “buena práctica” en hilos cooperativos.

## **🕐 ¿Cuándo termina un hilo?**

Un hilo llega a **TERMINADO** cuando su función acaba (o si lanza una excepción no capturada).

* Un hilo **no daemon** que llega a TERMINADO es requisito para que el programa principal pueda salir.  
* Un hilo **daemon** puede ser cortado en seco por el final del programa principal, aunque esté en EJECUCIÓN o BLOQUEADO: muere sin llegar “bien” a TERMINADO.

Puedes comprobar si un hilo sigue vivo en cada momento con hilo.is\_alive():

| *import threading, timedef corto():   time.sleep(1)h \= threading.Thread(target=corto)print(f"Antes de start: {h.is\_alive()}")  \# False (estado NUEVO)h.start()print(f"Justo tras start: {h.is\_alive()}")  \# True (EJECUTABLE/EJECUCIÓN)h.join()print(f"Tras join: {h.is\_alive()}")  \# False (TERMINADO)* |
| :---- |

**Salida:**

| Antes de start: FalseJusto tras start: TrueTras join: False |
| :---- |

## **🧠 Mini-chequeo**

1. ¿En qué estado está un hilo justo después de crearlo pero antes de start()?  
2. ¿Qué ocurre cuando un hilo en EJECUCIÓN llama a time.sleep(2)?  
3. ¿Puede un hilo volver de BLOQUEADO a EJECUCIÓN sin pasar por EJECUTABLE?

**🔄 Respuestas**

1. **NUEVO**: el objeto existe, pero sin start() no ha empezado a ejecutar nada.  
2. Pasa a **BLOQUEADO** durante 2 segundos, liberando la CPU (y el GIL). Al despertar vuelve a EJECUTABLE para que el scheduler le dé su turno.  
3. No exactamente: al desbloquearse vuelve a **EJECUTABLE** y espera a que el scheduler le conceda la CPU para pasar a EJECUCIÓN. Siempre pasa por EJECUTABLE.

## **✅ Resumen en 3 frases**

* El ciclo de vida de un hilo es **NUEVO → EJECUTABLE → EJECUCIÓN ⇄ BLOQUEADO → TERMINADO**.  
* **BLOQUEADO** es el estado de las esperas (sleep, I/O, lock): al bloquearse, el hilo libera la CPU y el GIL.  
* is\_alive() te dice en vivo si el hilo todavía se está ejecutando o ya terminó.

## **🐛 Vocabulario rápido**

| Término | Idea general |
| ----- | ----- |
| NUEVO | Hilo creado, sin start() todavía |
| EJECUTABLE | start() llamado, esperando turno del scheduler |
| EJECUCIÓN | El hilo tiene la CPU y está ejecutando código |
| BLOQUEADO | Esperando: sleep, I/O o un lock |
| TERMINADO | La función del hilo ha acabado |
| Scheduler | Componente del SO que decide qué hilo ejecuta |

# **8\. Hilos en la práctica** {#8.-hilos-en-la-práctica}

## **📬 La idea en una frase**

Este punto es el taller de la unidad: seguimos la ejecución de varios hilos paso a paso, dirimimos la pelea Hilo vs Proceso y resolvemos los ejercicios de Aprieta el lápiz.

Ya sabes crear hilos, pasarles datos, convertirlos en daemons, temporizarlos y entender el GIL y los estados. Ahora toca juntarlo todo como lo harás en el examen: leyendo código multihilo y prediciendo su salida.

## **🧍 Be the code, my friend — El hilo viajero**

“Sé el código y recorre su ejecución paso a paso. Dos hilos, dos viajeros.”

| import threading, timedef viajero(nombre, paradas):   for i in range(paradas):       print(f"{nombre} 🚶 está en la parada {i+1}")       time.sleep(0.5)   print(f"{nombre} 🏁 ha llegado a su destino")h1 \= threading.Thread(target=viajero, args=("Ana", 3))h2 \= threading.Thread(target=viajero, args=("Bob", 2))h1.start()h2.start()h1.join()h2.join() |
| :---- |

**Traza (ejecución real):**

| ▶️ Ana (h1) empieza. Dice: "Ana 🚶 está en la parada 1"▶️ Bob (h2) empieza. Dice: "Bob 🚶 está en la parada 1"⏳ Ana duerme 0.5s⏳ Bob duerme 0.5s▶️ Bob se despierta. Dice: "Bob 🚶 está en la parada 2"▶️ Ana se despierta. Dice: "Ana 🚶 está en la parada 2"⏳ Ana duerme 0.5s⏳ Bob duerme 0.5s▶️ Bob se despierta. Dice: "Bob 🏁 ha llegado a su destino"▶️ Ana se despierta. Dice: "Ana 🚶 está en la parada 3"⏳ Ana duerme 0.5s▶️ Ana se despierta. Dice: "Ana 🏁 ha llegado a su destino" |
| :---- |

Fíjate en los detalles que te piden en los exámenes:

* Ambos hilos **arrancan a la vez**: Ana y Bob dicen su parada 1 casi al mismo tiempo.  
* Mientras Ana duerme sus 0.5s (estado **BLOQUEADO**), Bob aprovecha y avanza.  
* Bob hace solo 2 paradas; Ana hace 3\. **Bob llega antes** a su destino.  
* Los join() del final garantizan que el mensaje del principal (si lo hubiera) esperaría a ambos.

Fíjate cómo los print se entremezclan. El orden exacto lo decide el scheduler del sistema operativo. **No hay garantía de orden.**

## **🥊 El ring de los conceptos — Hilo vs Proceso**

**Hilo**: — Soy ligero, veloz y nacido para compartir. Nací en milisegundos y trabajo en la misma memoria que mis hermanos.

**Proceso**: — ¿Y dónde está tu privacidad? Yo tengo mi propia memoria aislada. Si tú cometes un error, te llevas por delante a todo el proceso. A mí nadie me toca.

**Hilo**: — Pero compartir es mi superpoder: me comunico con variables globales al instante, sin pipes ni sockets. ¿Cuánto tardas tú en enviar un dato a tu vecino?

**Proceso**: — Pipes, sockets, archivos… más lento, sí. Pero creo cien procesos y cada uno trabaja con su propio GIL a toda CPU. Tú y tus hermanos os peleáis por un solo GIL.

**Hilo**: — ¡El GIL es para calcular\! Yo brillo esperando: descargas, lecturas de disco, clientes de red. Mientras uno espera, los demás avanzan.

**Proceso**: — Al final, cada uno a su oficio. Yo para aislamiento y CPU de verdad; tú para esperas y servicios ligeros.

**Moraleja**: Usa **procesos** cuando necesites aislamiento o paralelismo real de CPU (multiprocessing). Usa **hilos** cuando tu tarea es de espera (I/O) o quieres algo ligero y que comparta memoria.

## **🧠 Mini-chequeo**

1. En la traza del viajero, ¿por qué Bob llega antes que Ana a su destino?  
2. ¿Qué garantizan los join() del final del programa de los viajeros?

**🔄 Respuestas**

1. Porque Bob solo tiene **2 paradas** y Ana 3: cada parada dura 0.5s, así que Bob termina su ruta antes, aunque los dos empezaron a la vez.  
2. Que el programa principal **espera a los dos hilos** antes de continuar/terminar: cuando llegan los join(), ambos viajeros han acabado su recorrido.

## **✅ Resumen en 3 frases**

* La traza de varios hilos se **entremezcla** y su orden lo decide el scheduler: no hay garantía de orden, solo de que con join() se esperan.  
* En el ring, **hilos** para tareas ligeras y de espera que comparten memoria; **procesos** para aislamiento y CPU de verdad.

## **🐛 Vocabulario rápido**

| Término | Idea general |
| ----- | ----- |
| Traza | Recorrido paso a paso de la ejecución del programa |
| Intercalado | Alternancia de mensajes de varios hilos sin orden fijo |
| Scheduler | Decide qué hilo ejecuta en cada momento |
| Pool Puzzle | Ejercicio de ordenar líneas de código desordenadas |
| join() | Espera a que el hilo termine antes de continuar |

# **9\. Cierre: consolida lo aprendido** {#9.-cierre:-consolida-lo-aprendido}

Has terminado la teoría: qué es un hilo, cómo se crea y se espera, argumentos y nombres, daemons, Timer, el GIL y el ciclo de vida. Este cierre es el aterrizaje: recorres lo aprendido con juegos, un laboratorio real con fallos intencionados y las preguntas que te harán en una entrevista. Léelo justo después del punto 8 y antes de abrir los boletines.

## **⭐ Sé el hilo**

*Eres un hilo llamado “hilo-1”. Acabas de nacer en el programa de los viajeros del punto anterior. Tu misión: recorrer 3 paradas con 0.5s de sueño entre cada una.*

**¿Qué pasa, paso a paso?**

1. **Naces en estado NUEVO**: threading.Thread(target=viajero, args=("Ana", 3)). Existes como objeto, pero no has hecho nada todavía.  
2. **h1.start() te lanza**: pasas a **EJECUTABLE**. Ya puedes ejecutar cuando el scheduler quiera.  
3. **El scheduler te da la CPU**: pasas a **EJECUCIÓN** e imprimes "Ana 🚶 está en la parada 1".  
4. **time.sleep(0.5) te bloquea**: pasas a **BLOQUEADO**. Sueltas la CPU y el GIL; tu compañero Bob aprovecha y avanza.  
5. **Te despiertas**: vuelves a **EJECUTABLE**, el scheduler te da CPU de nuevo y avanzas a la parada 2… y luego la 3\.  
6. **Tu función acaba**: pasas a **TERMINADO**. El h1.join() del programa principal confirma que ya no sigues vivo.

**En ningún momento decides tú cuándo te toca.** El scheduler del sistema operativo reparte la CPU entre ti y Bob como quiere; tu único control es lanzarte (start()) y hacer esperar al principal (join()).

💡 **Ahora tú:** ¿y si fueras el reloj daemon del punto 4? Tu función es un while True: nunca llegas “bien” a TERMINADO. El día que el programa principal acabe, te matan en seco, estés en EJECUCIÓN o BLOQUEADO. Ese es el destino del daemon.

## **🔥 Fireside Chat: Hilo vs Proceso**

*Dos trabajadores de la multitarea se sientan junto a la chimenea a zanjar, de una vez, quién hace qué.*

**Hilo:** — Soy la unidad más pequeña de ejecución. Nací dentro de un proceso y comparto su memoria con mis hermanos. Me crean en milisegundos.

**Proceso:** — Yo soy el dueño de la casa. Memoria aislada, PID propio, espacio de direcciones separado. Si un hilo se equivoca, puede tirar la casa entera.

**Hilo:** — Pero comunicarme es instantáneo: una variable global y listo. Tú necesitas pipes, sockets o archivos para hablar con tu vecino.

**Proceso:** — Es cierto, más lento. Pero cuando toca calcular de verdad, cada proceso tiene su propio GIL. Yo puedo usar 8 CPUs de golpe; tú te peleas con tus hermanos por una.

**Hilo:** — ¡El GIL es para calcular\! Yo brillo esperando: descargas, lectura de disco, clientes de red. Mientras uno espera, los demás avanzan. Ahí no me gana nadie.

**Proceso:** — Al final, cada uno a su oficio. Yo para aislamiento y CPU real; tú para esperas, servicios de fondo y todo lo ligero.

**Moraleja**: los hilos comparten memoria y son baratos (perfectos para I/O y servicios ligeros); los procesos aíslan y paralelizan CPU de verdad. Elige según la tarea.

## **🕵️ ¿Quién soy?**

1. Soy la unidad más pequeña de ejecución y comparto memoria con mis hermanos dentro de un proceso.  
2. Me llaman “main” y, sin un join(), puedo terminar el programa antes que los demás hilos.  
3. Me ejecuto en segundo plano y muero cuando el programa principal termina, sin dramas.  
4. Soy un candado de CPython que impide que dos hilos ejecuten bytecode a la vez.  
5. Me ejecutan una sola vez tras un retardo, y pueden cancelarme antes de que dispare.  
6. Soy el estado en el que un hilo espera dormido, leyendo de red o esperando un lock.

🔄 Respuestas

1. **El hilo** (thread).  
2. **El hilo principal** (main thread).  
3. **El hilo daemon**.  
4. **El GIL** (Global Interpreter Lock).  
5. **El Timer** (threading.Timer).  
6. **Bloqueado** (BLOQUEADO).

## **🤬 CONRAD VS EL MUNDO: “el programa termina antes que mis hilos”**

**CONRAD:** — “Clásico: mi programa imprime ‘Fin’ y los hilos ni se han enterado. Razones: 1\) **No puse join()**: el principal siguió a lo suyo y se fue antes de que terminaran. 2\) **Llamé a la función con paréntesis** en target=fn(): se ejecutó al instante en el hilo principal y el hilo nació ya terminado. 3\) **Hice el hilo daemon** y el principal salió: lo maté yo mismo. 4\) **Esperaba que start() ejecutara al momento**, cuando en realidad solo lo pone en EJECUTABLE a merced del scheduler.”

**CONRAD:** — “Y lo mejor: *‘pero si lo he lanzado’*. ¡Pues claro\! **Lanzar no es esperar.** start() pone el hilo en marcha; join() es lo único que hace que el programa principal se quede esperándolo. Sin join(), tu ‘Fin’ puede salir antes que todo el trabajo.”

**CONRAD:** — “Y no me vengas con *‘¿será que el GIL lo bloquea?’*. Si tus hilos son de espera (I/O), el GIL no es el problema: el problema es que **no los estás esperando tú**. A diagnosticar: ¿hay join()? ¿la función va sin paréntesis? ¿el hilo es daemon sin quererlo?”

## **🧠 Atrévete a pensar**

1. ¿Por qué los hilos comparten memoria y los procesos no?  
2. ¿Qué le pasa a tu programa si un hilo **no daemon** entra en un bucle infinito?  
3. ¿Cuándo conviene usar multiprocessing en lugar de hilos?  
4. ¿Por qué la salida de varios hilos nunca tiene orden garantizado?  
5. ¿Qué diferencia hay entre un hilo en EJECUTABLE y uno en EJECUCIÓN?

**💡 Soluciones**

1. Por diseño: el hilo vive **dentro del espacio de direcciones del proceso**, que es memoria compartida por todos sus hilos. Un proceso, en cambio, tiene su propio espacio de direcciones **aislado** que el SO protege.  
2. El programa **nunca termina**: un hilo no daemon impide la salida hasta que él acabe. Un while True en un no-daemon cuelga el programa para siempre (por eso los loops infinitos van en daemons).  
3. Cuando la tarea es **CPU-bound** y necesitas paralelismo real: cada proceso tiene su propio GIL, así que varios procesos sí usan varias CPUs a la vez.  
4. Porque el **scheduler del sistema operativo** reparte la CPU como quiere, con sus propias reglas. Nosotros solo controlamos cuándo lanzar (start()) y cuándo esperar (join()); el orden interno no lo decidimos.  
5. **EJECUTABLE** significa “listo pero esperando turno”; **EJECUCIÓN** significa “el scheduler me ha dado la CPU y estoy ejecutando ahora mismo”.

## **💬 Entrevista de trabajo**

1. **“¿Qué es un hilo y en qué se diferencia de un proceso?”**  
2. **“¿Cómo creas y lanzas varios hilos en Python con argumentos y nombres?”**  
3. **“¿Qué es un hilo daemon? ¿Cuándo lo usarías?”**  
4. **“¿Qué es el GIL y cómo afecta al rendimiento de tus hilos?”**  
5. **“¿Cómo sabes si un hilo ha terminado y cómo esperas a varios hilos a la vez?”**

💡 **Cómo encararlas:** la 1 y la 4 son las “preguntas reina”. Para la 1, compara memoria, coste de creación, comunicación y aislamiento (la tabla del punto 1) y remata con la moraleja del ring: hilos para I/O y servicios ligeros, procesos para aislamiento y CPU. Para la 4, recorre el punto 6: qué es el GIL, por qué los hilos no aceleran CPU-bound, por qué sí I/O-bound, y cuándo toca multiprocessing. Si sabes contarlo fluido, ya eres medio programador concurrente.

## **🤷 No hay preguntas tontas**

❓ **¿Un hilo puede crear otro hilo?**

Sí. Un hilo puede lanzar otros hilos sin problema.

❓ **¿Cuántos hilos puedo crear?**

Hay límite práctico. En Windows, unos pocos miles. Cada hilo consume \~1MB de memoria virtual por su pila.

❓ **¿Puedo matar un hilo desde fuera?**

No limpiamente. No hay hilo.kill(). La forma correcta es usar una variable bandera que el hilo compruebe periódicamente.

❓ **¿Qué pasa si no llamo a join()?**

El hilo se ejecuta igual. Pero el programa principal no espera. Si es no-daemon, el programa no terminará hasta que el hilo termine.

❓ **¿sleep(0) sirve para algo?**

Sí, cede la CPU voluntariamente para que otro hilo pueda ejecutar. Es una “buena práctica” en hilos cooperativos.

❓ **¿Los hilos tienen prioridad?**

En Python, no hay prioridades nativas. El scheduler del SO decide. Puedes simular prioridades con lógica condicional, pero no es real.

[image1]: <data:image/png;base64,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>

[image2]: <data:image/png;base64,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>

[image3]: <data:image/png;base64,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>
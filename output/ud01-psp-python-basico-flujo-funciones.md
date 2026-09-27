---
title: "UD01 — Python básico: flujo y funciones"
author: Sergi García Barea
layout: cover
---

# Unidad 01 — Python básico<br>Bloque 03

## 2º CFGS DAM · Programación de Servicios y Procesos

---
class: sparse-slide
---

## 📬 La idea en una frase

<div class="key-idea">
  <p class="key-idea-text">El <strong>control de flujo</strong> decide qué código se ejecuta y cuándo: con <code>if</code> el programa toma decisiones, con <code>for</code> y <code>while</code> repite tareas y con <code>try/except</code> sobrevive a los errores.</p>
</div>

---
class: compact-slide
---

## 🔀 Condicional: `if / elif / else`

```python
una_variable = 5

if una_variable > 10:
    print("Es mayor que 10")
elif una_variable < 10:    # elif es opcional
    print("Es menor que 10")
else:                      # else también es opcional
    print("Es exactamente 10")
```

### Reglas clave

| Regla | Detalle |
| --- | --- |
| **Indentación obligatoria** | La sangría (4 espacios) define los bloques de código. |
| **Encadenamiento** | Tantos `elif` como necesites; solo se ejecuta el primer bloque `True`. |

<div class="warning">La indentación es obligatoria: Python usa la sangría para saber qué código pertenece a cada bloque.</div>

---
class: compact-slide
---

## 📊 Condicionales encadenados

Ejemplo práctico de evaluación de notas según rangos:

```python
nota = 7

if nota >= 9:
    print("Sobresaliente")
elif nota >= 7:
    print("Notable")
elif nota >= 5:
    print("Aprobado")
else:
    print("Suspenso")

# Salida esperada: "Notable"
```

| Cláusula | Función |
| --- | --- |
| `if` | Evalúa la primera condición; si es `True`, ejecuta su bloque y salta el resto. |
| `elif` | Alternativa (*else if*); solo se evalúa si las anteriores fueron `False`. |
| `else` | Caso por defecto, cuando ninguna condición se cumple. |

<div class="info">Solo se ejecuta el primer bloque cuya condición sea <code>True</code>.</div>

---
class: compact-slide
---

## 🔄 Bucle `for` y la función `range()`

El bucle `for` itera sobre cualquier **iterable**: listas, tuplas, strings, diccionarios, rangos…

```python
for animal in ["perro", "gato", "ratón"]:
    print(f"{animal} es un mamífero")

for i in range(4):
    print(i)  # 0, 1, 2, 3
```

### Fórmulas de `range(inicio, final, paso)`

| Sintaxis | Ejemplo | Secuencia |
| --- | --- | --- |
| `range(n)` | `range(4)` | `0, 1, 2, 3` |
| `range(ini, fin)` | `range(2, 6)` | `2, 3, 4, 5` |
| `range(ini, fin, paso)` | `range(0, 10, 2)` | `0, 2, 4, 6, 8` |
| `range(ini, fin, paso_neg)` | `range(5, 0, -1)` | `5, 4, 3, 2, 1` |

---
class: compact-slide
---

## 🔢 Iterar con índice usando `enumerate()`

Para acceder a la vez al índice y al valor, usa `enumerate()`:

```python
frutas = ["manzana", "plátano", "cereza"]

for i, fruta in enumerate(frutas):
    print(f"{i}: {fruta}")
```

```text
0: manzana
1: plátano
2: cereza
```

| Sin `enumerate()` (tradicional) | Con `enumerate()` (pythonico) |
| --- | --- |
| `for i in range(len(lista)):` | `for i, val in enumerate(lista):` |
| `    print(i, lista[i])` | `    print(i, val)` |

<div class="success">Prefiere <code>enumerate()</code>: evita contadores manuales y expresa mejor la intención.</div>

---
class: compact-slide
---

## ⏳ Bucle `while` y control de ejecución

El bucle `while` itera mientras la condición sea `True`:

```python
x = 0
while x < 4:
    print(x)
    x += 1  # Incremento (equivalente a x = x + 1)

# Salida: 0, 1, 2, 3
```

### ⚠️ Cuidado con los bucles infinitos

Si la condición nunca llega a `False`, el programa no acaba nunca:

```python
# ¡Bucle infinito!
while True:
    print("Esto no para nunca...")
```

<div class="warning">La condición debe poder llegar a ser <code>False</code>. Si bloqueas la terminal, interrumpe con <code>Ctrl + C</code>.</div>

---
class: compact-slide
---

## 🛡️ Manejo de errores: `try / except / finally`

Python lanza excepciones cuando algo falla. Puedes capturarlas para que el programa no se rompa:

### Captura básica, con variable y múltiple

```python
try:
    resultado = 10 / 0
except ZeroDivisionError:
    print("No se puede dividir por cero")

try:
    print([1, 2, 3][10])
except IndexError as e:
    print(f"Error: {e}")

try:
    x = int(input("Número: "))
    resultado = 10 / x
except ValueError:
    print("No es un número")
finally:
    print("Siempre se imprime")
```

---
class: compact-slide
---

## 🛡️ Bloques `try / except / finally`

| Bloque | Cuándo se ejecuta | Uso principal |
| --- | --- | --- |
| `try` | Siempre al inicio. | Contiene el código susceptible de fallar. |
| `except` | Solo si se lanza la excepción indicada. | Tratamiento y recuperación del error. |
| `finally` | **Siempre**, haya fallado o no. | Cerrar archivos, conexiones o liberar recursos. |

```python
try:
    f = open("archivo.txt")
    contenido = f.read()
except FileNotFoundError:
    print("Archivo no encontrado")
finally:
    print("Esto se imprime siempre")
```

---

## ⚙️ Iterables e iteradores por dentro

Un **iterable** es cualquier objeto sobre el que puedes hacer un `for`: listas, tuplas, strings, diccionarios, conjuntos, range…

Un **iterador** mantiene el estado de la iteración y sabe cuál es el siguiente elemento.

```python
mi_lista = [1, 2, 3]

# La función iter() crea un iterador a partir del iterable
mi_iterador = iter(mi_lista)

# next() avanza elemento a elemento
print(next(mi_iterador))  # 1
print(next(mi_iterador))  # 2
print(next(mi_iterador))  # 3
# next(mi_iterador)       # Lanza la excepción StopIteration (sin más elementos)
```

<div class="info">Cuando escribes <code>for x in iterable</code>, Python crea automáticamente un iterador por debajo usando <code>iter()</code> y <code>next()</code>.</div>

---
class: compact-slide
---

## 📦 Funciones: `def`, `return` y argumentos

> Una función es un bloque de código reutilizable que hace una sola cosa. Se define con `def`, se llama con paréntesis y puede recibir argumentos y devolver valores.

```python
def sumar(x, y):
    print(f"x es {x} y y es {y}")
    return x + y  # Sin return, devuelve None implícitamente

resultado1 = sumar(5, 6)     # posicionales (orden estricto) → 11
resultado2 = sumar(y=6, x=5) # de palabra clave (el orden no importa) → 11
```

| Regla | Detalle |
| --- | --- |
| `def` | Palabra clave + nombre, paréntesis y dos puntos `:`. |
| Indentación | El cuerpo va indentado a 4 espacios. |
| `return` | Devuelve uno o varios valores (con coma, retorna una tupla). |

<div class="info">Sin <code>return</code>, la función devuelve <code>None</code> implícitamente.</div>

---
class: compact-slide
---

## 🎒 Argumentos variables: `*args` y `**kwargs`

Funciones flexibles que aceptan cualquier cantidad de parámetros:

### `*args` — posicionales en tupla · `**kwargs` — nombrados en dict

```python
def varargs(*args):
    return args

varargs(1, 2, 3)   # => (1, 2, 3)

keyword_args(pie="grande", lago="ness")  # => {"pie": "grande", ...}
```

### Combinar ambos y desempaquetar al llamar

```python
def todos_los_args(*args, **kwargs):
    print(f"Args (tupla): {args}")
    print(f"Kwargs (dict): {kwargs}")

todos_los_args(1, 2, a=3, b=4)   # Args: (1, 2) · Kwargs: {'a': 3, 'b': 4}

todos_los_args(*(1, 2, 3, 4), **{"a": 3})  # desempaquetando
```

<div class="info">Úsalos solo cuando la función deba aceptar parámetros variables.</div>

---

## ⚡ Clausuras (closures)

En Python las funciones son **objetos de primera clase**: se guardan en variables, se pasan como argumentos y se devuelven.

```python
def crear_suma(x):
    def suma(y):
        return x + y
    return suma

sumar_10 = crear_suma(10)
print(sumar_10(3))  # Devuelve 13
```

La función interna `suma` "recuerda" el valor de `x` aunque `crear_suma` ya ha terminado.

<div class="info">Las cláusuras son la base de los decoradores, que veremos en el bloque de POO y módulos.</div>

---

## ⚡ Funciones lambda (anónimas)

Funciones anónimas de una sola expresión con sintaxis `lambda args: expresión`:

```python
# Lambda declarada y ejecutada "al vuelo"
es_mayor = (lambda x: x > 2)(3)  # Devuelve True

cuadrado = lambda x: x ** 2
print(cuadrado(5))  # Devuelve 25
```

<div class="info">Las lambdas son útiles como argumentos de otras funciones. Deben ser cortas y contener una única expresión.</div>

---
class: compact-slide
---

## 🔄 Funciones de orden superior: `map`, `filter` y `reduce`

| Función | Qué hace | Ejemplo |
| --- | --- | --- |
| `map(fn, iter)` | Aplica una función a cada elemento. | `list(map(lambda x: x**2, [1, 2, 3, 4]))` → `[1, 4, 9, 16]` |
| `filter(fn, iter)` | Retiene los que cumplen la condición. | `list(filter(lambda x: x % 2 == 0, [1, 2, 3, 4, 5, 6]))` → `[2, 4, 6]` |
| `reduce(fn, iter)` | Acumula todo en un solo valor (requiere `functools`). | `reduce(lambda a, b: a + b, [1, 2, 3, 4])` → `10` |

```python
from functools import reduce

numeros = [1, 2, 3, 4]
suma_total = reduce(lambda a, b: a + b, numeros)
print(suma_total)  # 10
```

<div class="warning"><code>map()</code> y <code>filter()</code> devuelven iteradores perezosos: envuélvelos en <code>list()</code>.</div>

---
class: compact-slide
---

## 📋 Comprensiones (comprehensions)

Forma concisa y pythonica de generar colecciones a partir de iterables:

### Comprensión de lista

```python
# Bucle clásico            # Comprensión (lo mismo en una línea)
cuadrados = []              cuadrados = [x ** 2 for x in range(5)]
for x in range(5):
    cuadrados.append(x ** 2)

# Con condición integrada (filtro)
pares = [x for x in range(10) if x % 2 == 0]  # => [0, 2, 4, 6, 8]
```

### Comprensión de diccionario y de conjunto

```python
cuadrados_dict = {k: k ** 2 for k in range(3)}  # => {0: 0, 1: 1, 2: 4}
letras = {c for c in "la cadena"}  # => {'l', 'a', ' ', 'c', 'd', 'e', 'n'}
```

<div class="success">Las comprehensions sustituyen patrones simples de <code>for</code> + <code>append</code> con código conciso y pythonico.</div>

---

## 🧠 Mini-chequeo — Flujo y funciones

1. ¿Qué imprime `for i in range(3): print(i)`?
2. ¿Qué pasa si olvidas el `:` al final de un `if`?
3. ¿Cómo capturas un `ValueError` en un `try/except`?
4. ¿Cuál es la diferencia entre `*args` y `**kwargs`?
5. ¿Qué devuelve `map(lambda x: x * 2, [1, 2, 3])` sin envolver en `list()`?

<div class="info">
<strong>Respuestas:</strong><br>
1. Imprime 0, 1, 2 (uno en cada línea). <code>range(3)</code> va de 0 a 2.<br>
2. Python lanza un error de sintaxis: <code>SyntaxError: invalid syntax</code>.<br>
3. <code>except ValueError:</code> o <code>except ValueError as e:</code> si quieres guardar el mensaje de error.<br>
4. <code>*args</code> recoge argumentos posicionales en una tupla. <code>**kwargs</code> recoge argumentos de palabra clave en un diccionario.<br>
5. Un objeto map (un iterable perezoso). Para ver los valores, necesitas <code>list()</code>.
</div>

---

## ✅ Resumen — Bloque 03

- `if/elif/else` toma decisiones; la indentación define los bloques.
- `for` itera sobre iterables; `while` itera mientras haya condición.
- `try/except` captura errores sin que el programa se rompa.
- Se define con `def`, se llama con paréntesis y se devuelve valor con `return`.
- `*args` y `**kwargs` permiten argumentos variables; las lambda son funciones anónimas de una expresión.
- Las comprensiones crean listas, diccionarios y conjuntos de forma concisa y legible.

---
class: compact-slide
---

## 🐛 Vocabulario rápido

<div class="two-cols">
<div>

| Término | Idea general |
| --- | --- |
| Iterable | Objeto sobre el que se puede iterar |
| Iterador | Recorre un iterable elemento a elemento |
| Excepción | Error que se lanza durante la ejecución |
| Indentación | Sangría (4 espacios) que define bloques |
| Comprensión | Colección creada con un bucle conciso |
| `def` / `return` | Definir una función / devolver un valor |
| args / kwargs | Posicionales variables / nombrados variables |

</div>
<div>

| Término | Idea general |
| --- | --- |
| Lambda | Función anónima de una sola expresión |
| Cláusura | Función que recuerda su contexto |
| `map` | Aplica una función a cada elemento |
| `filter` | Filtra según una condición |
| `range` | Secuencia de números para iterar |
| `enumerate` | Da (índice, valor) en cada iteración |
| `try/except` | Captura errores sin romperse |

</div>
</div>

---
layout: closing
---

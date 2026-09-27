---
title: "UD01 — Python básico: tipos y colecciones"
author: Sergi García Barea
layout: cover
---

# Unidad 01 — Python básico<br>Bloque 02

## 2º CFGS DAM · Programación de Servicios y Procesos

---
class: sparse-slide
---

## 📬 La idea en una frase

<div class="key-idea">
  <p class="key-idea-text">En Python todo valor es un <strong>objeto</strong> con un tipo que el lenguaje <strong>deduce solo</strong> al asignarlo —sin declararlo como en C o Java—, y los primitivos con los que trabajaremos son <code>int</code>, <code>float</code>, <code>bool</code>, <code>str</code> y <code>None</code>.</p>
</div>

---

## 🔢 Números enteros (`int`)

Los enteros no tienen límite de tamaño: puedes tener números enormes sin preocuparte.

```python
3        # => 3
-10      # => -10
1000000  # => 1000000
```

### Operaciones aritméticas

| Operador | Operación | Ejemplo | Resultado |
| --- | --- | --- | --- |
| `+` / `-` | Suma y Resta | `1 + 1` \| `8 - 1` | `2` \| `7` |
| `*` | Multiplicación | `10 * 2` | `20` |
| `( )` | Precedencia | `(1 + 3) * 2` | `8` (los paréntesis fuerzan el orden) |
| `**` | Potencia | `2 ** 3` | `8` (2 elevado a 3) |
| `%` | Módulo (resto) | `10 % 3` | `1` (resto de 10/3: 3×3=9, resto 1) |

---

## 📐 División y decimales (`float`)

La división con `/` **siempre devuelve un float** (decimal), incluso entre enteros:

```python
35 / 5   # => 7.0  (float, no int)
34 / 5   # => 6.8
```

Si quieres un resultado entero con truncado de decimales, usa `//`:

```python
34 // 5  # => 6   (trunca los decimales)
35 // 5  # => 7
```

Cuando un operador es float, el resultado siempre es float:

```python
3 * 2.0    # => 6.0
3.5 + 1.2  # => 4.7
```

<div class="warning"><strong>Precisión IEEE 754:</strong> <code>0.1 + 0.2</code> no da 0.3 exacto por la representación interna en punto flotante. No es un error de Python. Para cálculos que requieren precisión exacta (dinero), se usa el módulo <code>decimal</code>.</div>

---
class: compact-slide
---

## ✅ Booleanos (`bool`) y comparaciones

Dos valores posibles: `True` y `False` (**con mayúscula inicial obligatoria**).

| Operador | Acción | Ejemplo | Resultado |
| --- | --- | --- | --- |
| `not` | Invierte el valor | `not True` \| `not False` | `False` \| `True` |
| `==` / `!=` | Igualdad / Desigualdad | `1 == 1` \| `1 != 1` | `True` \| `False` |
| `<` / `>` | Menor / Mayor que | `1 < 10` \| `1 > 10` | `True` \| `False` |
| `<=` / `>=` | Menor/Mayor o igual | `2 <= 2` \| `2 >= 2` | `True` \| `True` |

### Comparaciones encadenadas

```python
1 < 2 < 3   # True (equivale a 1 < 2 and 2 < 3)
2 < 3 < 2   # False
```

<div class="info"><code>==</code> compara valores: <code>1 == 1.0</code> es <code>True</code>. <code>is</code> compara identidad: <code>1 is 1.0</code> es <code>False</code>.</div>

---
class: compact-slide
---

## 📝 Cadenas de texto (`str`) y f-strings

Se delimitan con comillas simples `'` o dobles `"`. Permiten índices positivos (inicio en 0) e índices negativos (-1 es el último):

```python
texto = "Hola mundo"
texto[0]          # 'H' (primer carácter)
texto[-1]         # 'o' (último carácter)
"Hola " + "mundo!"  # Concatenación con +
```

### Formateo: `.format()` vs f-strings

| Método | Ejemplo | Resultado |
| --- | --- | --- |
| `.format()` | `"{0} sé rápido".format("Jack")` | `"Jack sé rápido"` |
| **f-strings (3.6+)** | `f"{nombre} come {comida}"` | `"Bob come Lasaña"` |

<div class="success">Usa <strong>f-strings</strong> en código nuevo: son directos, legibles y recomendados desde Python 3.6.</div>

---

## 🔤 Métodos útiles de `str`

```python
"Hola Mundo".lower()                # "hola mundo"
"Hola Mundo".upper()                # "HOLA MUNDO"
"Hola Mundo".replace("Mundo", "Py") # "Hola Py"
"hola mundo".split()                # ["hola", "mundo"] (divide por espacios)
"  hola  ".strip()                  # "hola" (elimina espacios al inicio y final)
```

---

## 🕳️ El objeto `None`

`None` representa la ausencia de valor (tipo `NoneType`). No uses `==` para comparar con None. Usa **`is`**:

| Regla de Comparación | Sintaxis correcta | Resultado |
| --- | --- | --- |
| **Usa siempre `is`** (nunca `==`) | `"etc" is None` | `False` |
| | `None is None` | `True` |

---
class: compact-slide
---

## 🔄 Valores falsy y conversiones de tipo

Se evalúan como `False` en contexto booleano: `None`, `0`, `""`, `[]`, `{}` y `set()`.

```python
bool(0)      # => False
bool("")     # => False
bool([])     # => False
bool({})     # => False
bool(set())  # => False
```

<div class="info">Todo lo demás se evalúa como <code>True</code> (<strong>Truthy</strong>). Conocerlo simplifica condiciones y validaciones.</div>

### Funciones de conversión

```python
int(3.7)      # 3: trunca, no redondea
float(5)      # 5.0
str(100)      # "100"
bool(1)       # True
bool(0)       # False
bool("hola")  # True
bool("")      # False
```

---

## 🧠 Mini-chequeo — Tipos de datos

1. ¿Qué devuelve `10 / 2` en Python 3? ¿Y `10 // 2`?
2. ¿Cuál es la diferencia entre `==` y `is`?
3. ¿Por qué `0.1 + 0.2` no da exactamente `0.3`?

<div class="info">
<strong>Respuestas:</strong><br>
1. <code>10 / 2</code> devuelve <code>5.0</code> (float). <code>10 // 2</code> devuelve <code>5</code> (int, división entera).<br>
2. <code>==</code> compara valores: <code>1 == 1.0</code> es True. <code>is</code> compara identidad de objeto: <code>1 is 1.0</code> es False.<br>
3. Por la precisión del formato de punto flotante. 0.1 y 0.2 no se representan exactamente en binario, por lo que la suma acumula un pequeño error. No es un bug de Python.
</div>

---
class: compact-slide
---

## 📌 Variables y convención PEP 8

> Las variables almacenan datos y las colecciones agrupan varios datos: listas (mutables), tuplas (inmutables), diccionarios (clave:valor) y conjuntos (sin duplicados).

En Python no hace falta declarar variables: asignas un nombre a un valor con `=`:

```python
nombre = "Ana"
edad = 22
activa = True
```

| Convención | Uso | Ejemplo |
| --- | --- | --- |
| **`snake_case`** | Variables y funciones (PEP 8) | `mi_variable = 5` |
| `PascalCase` | Clases | `PersonaCliente` |
| `UPPER_CASE` | Constantes | `IVA_GENERAL` |
| `camelCase` | Funciona, pero no es la guía oficial | `miVariable = 5` |

<div class="warning">Acceder a una variable que no existe produce <code>NameError</code>: <code>name 'otra_variable' is not defined</code></div>

---
class: compact-slide
---

## 📋 Listas (colecciones mutables)

Las listas son la colección más usada en Python. Almacenan una secuencia de elementos y son **mutables** (puedes cambiarlas después de crearlas).

```python
# Crear listas
lista = []
otra_lista = [4, 5, 6]
```

### Añadir y eliminar elementos

```python
lista.append(1)  # [1]
lista.append(2)  # [1, 2]
lista.append(4)  # [1, 2, 4]
lista.append(3)  # [1, 2, 4, 3]
lista.pop()      # => 3 (elimina y devuelve el último)
```

### Acceso por índice

Los índices empiezan en 0. Python también permite índices negativos (-1 es el último):

```python
lista = [1, 2, 4, 3]
lista[0]     # => 1
lista[-1]    # => 3
# lista[4]  # IndexError: list index out of range
```

---

## ✂️ Slicing (rebanado de listas y cadenas)

El *slicing* extrae una porción con la sintaxis `secuencia[inicio:final:paso]`. El índice final **no se incluye**.

```python
lista = [1, 2, 4, 3]

lista[1:3]    # => [2, 4]      (del índice 1 al 2, sin incluir el 3)
lista[2:]     # => [4, 3]      (desde el índice 2 hasta el final)
lista[:3]     # => [1, 2, 4]   (desde el inicio hasta el índice 2)
lista[::2]    # => [1, 4]      (cada dos elementos)
lista[::-1]   # => [3, 4, 2, 1]  (invertir la lista completa)
```

<div class="info">El índice final indicado en la cota superior del slicing jamás se incluye en el resultado devuelto.</div>

---

## 📋 Otras operaciones con listas

```python
del lista[2]           # Elimina el elemento en índice 2 (el 4): lista ahora es [1, 2, 3]

lista + otra_lista     # => [1, 2, 3, 4, 5, 6] (no modifica las originales)

lista.extend(otra_lista)  # Añade otra_lista al final de lista (modifica lista)

1 in lista             # => True (comprobar existencia)

len(lista)             # => 6 (longitud)
```

---
class: compact-slide
---

## 📦 Tuplas e inmutabilidad

Las tuplas son como las listas, pero **inmutables**: no puedes cambiar nada una vez creadas. Se definen con paréntesis `()`.

```python
tupla = (1, 2, 3)
tupla[0]       # => 1
# tupla[0] = 3  # TypeError: 'tuple' object does not support item assignment
```

### Operaciones válidas

```python
len(tupla)         # => 3
tupla + (4, 5, 6)  # => (1, 2, 3, 4, 5, 6)
tupla[:2]          # => (1, 2)
2 in tupla         # => True
```

<div class="info">Usa una tupla cuando los valores no deben cambiar: coordenadas (x, y), configuraciones (ancho, alto), registros.</div>

---

## 📦 Desempaquetado e intercambio

### Una de las cosas más elegantes de Python

Asignar múltiples variables de golpe, sin variable temporal:

```python
a, b, c = (1, 2, 3)    # a=1, b=2, c=3
d, e, f = 4, 5, 6      # sin paréntesis (tupla automática)

# Intercambiar valores sin variable temporal
e, d = d, e             # d=5, e=4
```

<div class="info">El desempaquetado también funciona con listas y strings: <code>x, y = [10, 20]</code> o <code>a, b = "hi"</code>.</div>

---
class: compact-slide
---

## 📖 Diccionarios (clave:valor)

Los diccionarios almacenan pares `clave:valor` delimitados por llaves `{}`. Ideales para datos estructurados.

```python
# Diccionario vacío
 dicc_vacio = {}

# Diccionario prellenado
usuario = {"uno": 1, "dos": 2, "tres": 3}

# Acceso directo por clave (lanza KeyError si no existe)
usuario["uno"]            # => 1
# usuario["cuatro"]       # KeyError!

# Método seguro .get()
usuario.get("uno")        # => 1
usuario.get("cuatro")     # None (no lanza error)
usuario.get("cuatro", 4)  # => 4 (valor por defecto)
```

---

## 📖 Diccionarios: claves, valores y modificaciones

```python
list(usuario.keys())    # => ["uno", "dos", "tres"]
list(usuario.values())  # => [1, 2, 3]

# Añadir, modificar y eliminar
usuario["cuatro"] = 4           # Añadir o modificar
usuario.setdefault("cinco", 5)  # Solo si la clave no existe
del usuario["uno"]              # Eliminar una clave

# Comprobar existencia
"uno" in usuario     # => True
1 in usuario         # => False (1 es un valor, no una clave)
```

<div class="warning">Acceder con <code>usuario["clave"]</code> lanza <code>KeyError</code> si la clave no existe. Usa <code>.get()</code> cuando pueda faltar.</div>

---
class: compact-slide
---

## 🎯 Conjuntos (`set`)

Los conjuntos almacenan elementos **sin duplicados** y permiten operaciones de teoría de conjuntos.

```python
# Conjunto vacío (¡cuidado! {} crea un dict, no un set)
conjunto_vacio = set()

# Conjunto con valores (los duplicados se eliminan solos)
un_conjunto = {1, 2, 2, 3, 4}   # => {1, 2, 3, 4}
otro_conjunto = {3, 4, 5, 6}

un_conjunto & otro_conjunto    # => {3, 4}  intersección
un_conjunto | otro_conjunto    # => {1, 2, 3, 4, 5, 6}  unión
{1, 2, 3, 4} - {2, 3, 5}       # => {1, 4}  diferencia

un_conjunto.add(5)   # => {1, 2, 3, 4, 5}
2 in un_conjunto     # => True
```

---

## 📊 Resumen de colecciones

| Colección | Mutable | Duplicados | Sintaxis / Acceso |
| --- | --- | --- | --- |
| **Lista** | Sí | Sí | `[1, 2, 3]` \| Por índice (`lista[0]`) |
| **Tupla** | No | Sí | `(1, 2, 3)` \| Por índice (`tupla[0]`) |
| **Diccionario** | Sí | Claves NO | `{"k": "v"}` \| Por clave (`dict["k"]` o `.get()`) |
| **Set** | Sí | NO | `{1, 2, 3}` \| Operaciones de conjuntos / `in` |

<div class="warning"><code>{}</code> crea un diccionario vacío; para un set vacío escribe <code>set()</code>.</div>

---

## 🧠 Mini-chequeo — Colecciones

1. ¿Cuál es la diferencia entre una lista y una tupla?
2. ¿Qué devuelve `{1, 2, 2, 3}`?
3. ¿Cómo accedes al último elemento de una lista `mi_lista`?

<div class="info">
<strong>Respuestas:</strong><br>
1. La lista es mutable (puedes añadir, eliminar y cambiar elementos). La tupla es inmutable (una vez creada, no cambia).<br>
2. <code>{1, 2, 3}</code>: los conjuntos eliminan duplicados automáticamente.<br>
3. <code>mi_lista[-1]</code>: el índice -1 accede al último elemento.
</div>

---

## ✅ Resumen — Bloque 02

- Los tipos primitivos son `int`, `float`, `bool`, `str` y `None`; Python deduce el tipo automáticamente.
- La división `/` devuelve float; `//` devuelve entero con truncado.
- Usa `is` para comparar con `None` y f-strings para formatear texto de forma moderna.
- Las variables no se declaran: simplemente asignas un valor con `=`.
- Las listas son mutables y usan índices; las tuplas son inmutables; los diccionarios usan claves; los conjuntos eliminan duplicados.
- El slicing `lista[inicio:final:pasos]` extrae porciones de listas y strings de forma elegante.

---
class: compact-slide
---

## 🐛 Vocabulario rápido

<div class="two-cols">
<div>

| Término | Idea general |
| --- | --- |
| `int` | Entero, sin límite de tamaño |
| `float` | Decimal (punto flotante) |
| `bool` | Booleano: `True` o `False` |
| `str` | Cadena de texto |
| `None` | Representa "nada" |
| Tipado dinámico | El tipo se deduce al asignar |
| f-string | Formato moderno `f"..."` |
| Concatenación | Unir strings con `+` |

</div>
<div>

| Término | Idea general |
| --- | --- |
| snake_case | Minúsculas con guion bajo |
| Mutable | Puede cambiar tras crearse |
| Inmutable | No puede cambiar |
| Slicing | Extraer una porción |
| Desempaquetado | Asignar varias variables de golpe |
| Clave:valor | Par de datos en un diccionario |
| Set | Conjunto sin duplicados |

</div>
</div>

---
layout: closing
---

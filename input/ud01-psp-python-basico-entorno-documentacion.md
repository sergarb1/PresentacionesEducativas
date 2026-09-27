---
title: "UD01 — Python básico: entorno y documentación"
author: Sergi García Barea
layout: cover
---

# Unidad 01 — Python básico<br>Bloque 01

## 2º CFGS DAM · Programación de Servicios y Procesos

---
class: sparse-slide
---

## 📬 La idea en una frase

<div class="key-idea">
  <p class="key-idea-text">Python es un lenguaje <strong>interpretado</strong>, de <strong>tipado dinámico</strong> y sintaxis limpia, diseñado para que los programas se lean casi como pseudocódigo, y será el lenguaje con el que trabajaremos todo el módulo de PSP.</p>
</div>

---

## 🐍 ¿Qué es Python?

Un lenguaje de programación de alto nivel, interpretado y multiplataforma. Creado por Guido van Rossum en 1991.

| Característica | Qué significa en la práctica |
| --- | --- |
| **Interpretado** | No necesitas compilar. Escribes el código y lo ejecutas directamente. |
| **Tipado dinámico** | No declares tipos: `x = 5` y luego `x = "hola"` funciona sin problemas. |
| **Sintaxis limpia** | El código se lee casi como inglés. Las indentaciones obligatorias fuerzan código limpio. |
| **Multiplataforma** | Funciona en Windows, Linux y macOS sin cambiar nada. |
| **Biblioteca estándar enorme** | `os`, `sys`, `threading`, `socket`, `json`… todo incluido. |
| **Comunidad masiva** | Casi cualquier duda que tengas, ya alguien la respondió en Stack Overflow. |

---

## 🤔 ¿Por qué Python para PSP?

En este módulo vamos a crear procesos, hilos, servidores, clientes y APIs:

- `subprocess` y `threading` están en la biblioteca estándar: no necesitas instalar nada.
- `socket` permite crear servidores TCP y UDP en pocas líneas.
- `requests` y `httpx` hacen peticiones HTTP fáciles.
- `asyncio` permite programación asíncrona para servidores concurrentes.
- La sintaxis clara reduce errores cuando estás aprendiendo conceptos nuevos.

---

## 🖥️ Instalar Python

<div class="two-cols">
<div>

### Windows

1. Ve a [python.org/downloads](https://www.python.org/downloads/)
2. Descarga la última versión (3.10 o superior)
3. **Importante:** marca la casilla *"Add Python to PATH"*
4. Verifica en terminal:

```bash
python --version
# Python 3.11.5
```

</div>
<div>

### Linux (Ubuntu / Debian)

```bash
sudo apt update
sudo apt install python3 python3-pip
python3 --version
```

### macOS

```bash
brew install python3
python3 --version
```

</div>
</div>

<div class="warning">En Windows, si no marcas "Add Python to PATH", la terminal no reconoce el comando <code>python</code>. Tendrías que usar la ruta completa o añadirlo manualmente.</div>

---

## 📦 Entorno virtual (`venv`)
### Un proyecto, sus dependencias

Un **entorno virtual** es una carpeta aislada con su propia instalación de Python y sus propios paquetes, separada del sistema global.

| Ventaja Principal | Qué soluciona en la práctica |
| --- | --- |
| **Aislamiento** | Los paquetes solo existen en ese entorno, sin contaminar el sistema base. |
| **Reproducibilidad** | Con `pip freeze > requirements.txt` recreas el entorno exacto en otro equipo. |
| **No rompes nada** | Si una librería falla en un proyecto, los demás no se ven afectados. |

<div class="info"><strong>Consejo profesional:</strong> crea siempre un entorno virtual antes de empezar. La carpeta <code>venv/</code> va al <code>.gitignore</code>: no se sube al repositorio.</div>

---

## 🔧 Operativa paso a paso de `venv`

| Fase / Acción | Windows | Linux / macOS |
| --- | --- | --- |
| **1. Crear entorno** *(una vez por proyecto)* | `python -m venv venv` | `python3 -m venv venv` |
| **2. Activar entorno** | `venv\Scripts\activate` | `source venv/bin/activate` |
| **3. Verificar activación** | Deberías ver el prefijo `(venv)` al inicio del prompt. Comprueba con `python --version`. | Lo mismo |
| **4. Desactivar al acabar** | Escribe simplemente `deactivate` en la terminal. | Lo mismo |

<div class="success">Cuando el entorno está activo, el prompt muestra el prefijo <code>(venv)</code>.</div>

---

## 👋 Tu primer programa

Abre un editor de texto (VS Code, PyCharm o incluso el Bloc de notas) y escribe:

```python
print("¡Hola, mundo!")
```

Guárdalo como `hola.py` y ejecútalo en la terminal:

```bash
python hola.py
# Salida: ¡Hola, mundo!
```

<div class="success">¿Ha funcionado? Enhorabuena: ya tienes Python instalado y sabes ejecutar un programa.</div>

---

## 🧪 La consola interactiva

Python ofrece una consola interactiva donde puedes probar código línea a línea. Abre una terminal y escribe `python`:

```text
>>> 2 + 3
5
>>> "hola".upper()
'HOLA'
>>> exit()
```

<div class="info">La consola interactiva es perfecta para probar cosas rápido antes de meterlas en un archivo <code>.py</code>.</div>

---

## 🧠 Mini-chequeo — Introducción

1. ¿Qué pasa si no marcas *"Add Python to PATH"* al instalar en Windows?
2. ¿Cuál es la diferencia entre el archivo `.py` y la consola interactiva?
3. ¿Python necesita compilar los programas antes de ejecutarlos?

<div class="info">
<strong>Respuestas:</strong><br>
1. La terminal no reconoce el comando <code>python</code>. Tendrías que usar la ruta completa o añadirlo manualmente al PATH.<br>
2. El archivo <code>.py</code> es un programa guardado que puedes reejecutar cuantas veces quieras. La consola interactiva es para probar código suelto sin guardar.<br>
3. No. Python es interpretado: las instrucciones se traducen y ejecutan una a una, sin generar un archivo binario intermedio.
</div>

---

## 📝 Comentarios de línea (`#`)

> Los comentarios explican el código a quien lo lea —incluido tú dentro de tres meses—. En Python se escriben con `#` para una línea y con `"""` para bloques multilínea. Python los ignora por completo al ejecutar.

```python
# Este es un comentario completo de línea
x = 5  # Este comentario va al final de la línea de código
```

| Buena Práctica | Ejemplo Correcto | Ejemplo Incorrecto |
| --- | --- | --- |
| Separa el comentario del código con al menos un espacio. | `x = 5  # valor inicial` | `x = 5 #valor inicial` |

---

## 📝 Cuándo usar comentarios

- Para explicar **por qué** haces algo, no qué hace el código (eso se lee solo).
- Para dejar una nota temporal: `# TODO: mejorar esto más adelante`.
- Para bloquear código que no quieres ejecutar de momento:

```python
# print("Esta línea no se ejecuta")
x = 10
```

<div class="warning">Un comentario es texto que Python ignora por completo al ejecutar. Sirve para documentar, explicar la lógica o dejar notas. Es la diferencia entre código que funciona y código que funciona <strong>y se entiende</strong>.</div>

---

## 📖 Docstrings (`"""comentarios multilínea"""`)

Para comentarios de varias líneas se usan tres comillas dobles `"""`. Esto se llama **docstring** y se usa especialmente para documentar funciones, clases y módulos:

```python
"""
Este es un comentario multilínea.
Puede ocupar las líneas que necesites.
Python lo ignora completamente.
"""
```

---

## 📖 Docstrings en funciones

Cuando pones un docstring como **primera instrucción** de una función, se convierte en su documentación oficial:

```python
def sumar(a, b):
    """
    Suma dos números y devuelve el resultado.

    Parámetros:
        a (int o float): primer número
        b (int o float): segundo número

    Retorna:
        int o float: la suma de a y b
    """
    return a + b
```

Puedes acceder a ese docstring con `help()` o con `sumar.__doc__`:

```python
help(sumar)
# Salida: Suma dos números y devuelve el resultado...
```

---

## 📖 Docstrings en clases

Lo mismo aplica a las clases:

```python
class Persona:
    """
    Representa una persona con nombre y edad.

    Atributos:
        nombre (str): nombre de la persona
        edad (int): edad en años
    """

    def __init__(self, nombre, edad):
        self.nombre = nombre
        self.edad = edad
```

---

## 🔄 Comillas simples vs dobles

Python acepta comillas simples `'` y dobles `"` para strings. Para docstrings se usan `"""` (tres comillas dobles) por convención, aunque `'''` (tres comillas simples) también funciona:

```python
# Todos son strings válidos
'Hola'
"Hola"
'''Hola'''
"""Hola"""
```

<div class="info">La convención del <strong>PEP 257</strong> (guía de estilo de Python) recomienda <code>"""</code> para docstrings.</div>

---

## ⚠️ Errores comunes

| Error Común | Explicación y Corrección |
| --- | --- |
| **Olvidar cerrar comillas** | `"Hola mundo` provoca un `SyntaxError: invalid syntax`. Revisa que cada `"` o `"""` tenga cierre. |
| **Confundir string con docstring** | Asignar un bloque `mensaje = """Texto"""` crea una variable de texto, no un docstring de documentación. Debe ser la primera instrucción de la definición. |
| **Comillas simples vs dobles** | Python acepta `'''` simples, pero la norma oficial **PEP 257** recomienda encarecidamente tres comillas dobles `"""`. |

---

## ✅ Resumen — Bloque 01

- Python es un lenguaje interpretado, de tipado dinámico y sintaxis limpia, ideal para empezar.
- Para instalarlo, ve a python.org (Windows) o usa el gestor de paquetes (Linux/macOS) y verifica con `python --version`.
- Crea siempre un entorno virtual (`venv`) antes de empezar un proyecto.
- Tu primer programa es un `print("¡Hola, mundo!")`: guárdalo en un `.py` y ejecútalo con `python hola.py`.
- Los comentarios de línea usan `#` y se ignoran al ejecutar.
- Los docstrings usan `"""` y documentan funciones, clases y módulos.
- Comenta **por qué**, no el **qué**: el código debe ser autoexplicativo.

---
class: compact-slide
---

## 🐛 Vocabulario rápido

<div class="two-cols">
<div>

| Término | Idea general |
| --- | --- |
| Interpretado | Se ejecuta línea a línea, sin compilar |
| Tipado dinámico | El tipo de una variable puede cambiar |
| Alto nivel | Cerca del lenguaje humano |
| PATH | Dónde busca el sistema los ejecutables |
| Consola interactiva | Probar código línea a línea |
| Módulo | Archivo `.py` con código reutilizable |

</div>
<div>

| Término | Idea general |
| --- | --- |
| venv | Carpeta aislada con su propio Python y paquetes |
| Comentario | Texto con `#` que Python ignora |
| Docstring | Comentario `"""` que documenta funciones y clases |
| PEP 257 | Convención para escribir docstrings |
| Autoexplicativo | Código que se entiende por su nombre |

</div>
</div>

---
layout: closing
---

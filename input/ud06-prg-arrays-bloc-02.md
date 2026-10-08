---
layout: cover
---

# Unitat 06 — Arrays<br>Bloc 2

## 1r CFGS DAW · Programació

---
---

## En aquesta sessió

### El funcionament intern, els objectes de veritat i el gimnàs d'examen

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">Arrays i mètodes: passar i tornar arrays (la <strong>referència</strong>).</div>
</div>

<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">Aplicacions: <code>String</code>, <code>char[]</code>, <strong>objectes</strong> i taules de dades.</div>
</div>

<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><strong>Be the Code</strong>: invertir sense array auxiliar i buscar totes les posicions.</div>
</div>

<div class="step">
  <div class="step-number">4</div>
  <div class="step-content">Els <strong>6 monstres</strong> dels arrays i com depurar-los.</div>
</div>

<div class="step">
  <div class="step-number">5</div>
  <div class="step-content"><strong>Repàs</strong>: l'aparcament a examen.</div>
</div>

<div class="info">
  Necessites el Bloc 1: índexs, <code>length</code>, for i for-each, matrius i la classe <code>Arrays</code>.
</div>

---
---

## Arrays i mètodes: passant el testimoni

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">ArraysMetodos.java</span>
        <span class="code-card-badge">99?</span>
      </div>
      <pre><code><span class="keyword">public class</span> <span class="class-name">ArraysMetodos</span> {
  <span class="keyword">public static void</span> main(<span class="type">String</span>[] args) {
    <span class="type">int</span>[] edades = {10, 20, 30};
    modificar(edades);
    <span class="type">System</span>.out.println(edades[0]);
  }
  <span class="keyword">public static void</span> modificar(<span class="type">int</span>[] arr) {
    arr[0] = 99;
  }
}</code></pre>
    </div>
  </div>
  <div class="right">
    <p>Imprimix <strong>99</strong>, no 10: el mètode ha canviat la plaça 0 d'un array creat en <code>main</code>.</p>
    <p>Com és possible si Java passa els arguments <strong>per valor</strong>?</p>
    <div class="info">
      Perquè es passa per valor la <strong>còpia de la referència</strong>: l'array no es copia, només l'adreça. La còpia i l'original apunten al <strong>mateix aparcament</strong>.
    </div>
  </div>
</div>

---
---

## La referència, dibuixada

<div class="diagram-frame diagram-small">
  <Excalidraw drawFilePath="/diagrams/ud06-prg-referencia.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<div class="warning">
  ⚠️ Açò <strong>NO és pas per referència de veritat</strong>: Java mai passa la variable per referència. Passa una <em>còpia</em> de la referència — per això es diu <em>pass-by-value</em>.
</div>

---
---

## Primitius vs arrays: la diferència clau

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">PasoDeDatos.java</span>
      </div>
      <pre><code><span class="type">int</span> numero = 5;
cambiarNumero(numero);
<span class="comment">// numero seguix en 5:</span>
<span class="comment">// el mètode rep una còpia</span>

<span class="type">int</span>[] arr = {1, 2, 3};
cambiarArray(arr);
<span class="comment">// arr[0] val 99:</span>
<span class="comment">// objecte compartit</span></code></pre>
    </div>
  </div>
  <div class="right">
    | Tipus | Què rep el mètode | Es modifica fora? |
    | ----- | ----- | ----- |
    | `int`, `double`, `boolean`… | Còpia del valor | No |
    | `String` | Còpia de la referència (immutable) | No |
    | **Array** | Còpia de la referència | **Sí** (elements) |
    | Objectes | Còpia de la referència | Sí (atributs) |
    <div class="info">
      🕶️ <strong>Don Tip:</strong> si ho entens ací, entens el 90% dels bugs rars del curs.
    </div>
  </div>
</div>

---
---

## Reassignar no és modificar

<div class="comparison-grid">
  <div class="comparison-item bad">
    <p>❌ <code>arr = otroArray;</code> dins del mètode</p>
    <p>Només reassignes la teua <strong>còpia de la referència</strong>: l'original seguix intacte.</p>
  </div>
  <div class="comparison-item good">
    <p>✅ <code>arr[i] = ...;</code> dins del mètode</p>
    <p>Toca el <strong>contingut</strong> de l'objecte compartit: el canvi es veu fora.</p>
  </div>
</div>

<div class="info">
  Per a modificar l'original, toca <strong>elements</strong> (o atributs de l'objecte), mai la variable. A dues variables que apunten al mateix objecte se'ls diu <strong>àlies</strong>.
</div>

---
---

## Mètodes que treballen amb arrays

<div class="two-cols">
  <div class="left">
    <h3>Rebre un array per a calcular</h3>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Media.java</span>
      </div>
      <pre><code><span class="keyword">public static</span> <span class="type">double</span> media(<span class="type">int</span>[] notas) {
  <span class="type">int</span> suma = 0;
  <span class="keyword">for</span> (<span class="type">int</span> n : notas) {
    suma += n;
  }
  <span class="keyword">return</span> (<span class="type">double</span>) suma / notas.length;
}</code></pre>
    </div>
    <p>I <code>duplicar(int[] arr)</code> amb <code>arr[i] *= 2</code>: modifica <strong>sense return</strong>.</p>
  </div>
  <div class="right">
    <h3>Tornar un array nou</h3>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Cuadrados.java</span>
      </div>
      <pre><code><span class="keyword">public static</span> <span class="type">int</span>[] cuadrados(<span class="type">int</span> n) {
  <span class="type">int</span>[] resultado = <span class="keyword">new</span> <span class="type">int</span>[n];
  <span class="keyword">for</span> (<span class="type">int</span> i = 0; i &lt; n; i++) {
    resultado[i] = (i + 1) * (i + 1);
  }
  <span class="keyword">return</span> resultado;
}
<span class="comment">// cuadrados(4) → [1, 4, 9, 16]</span></code></pre>
    </div>
    <div class="info">
      Tornar un array = tornar una <strong>referència</strong> a un objecte del heap. Si no vols que te'l toquen, torna una còpia (<code>Arrays.copyOf</code>).
    </div>
  </div>
</div>

---
---

## El famós main(String[] args)

<div class="two-cols">
  <div class="left">
    <p>Des de la U02 escriviu <code>main(String[] args)</code> sense parar-vos a pensar. És un mètode que rep un <strong>array de Strings</strong>: els arguments de la línia de comandes.</p>
    <div class="terminal">
      <div><span class="prompt">&gt;</span> java Saludo Ana</div>
      <div class="output">Hola, Ana</div>
      <div><span class="prompt">&gt;</span> <span class="comment">// args = {"Ana"} · args.length = 1</span></div>
    </div>
  </div>
  <div class="right">
    <div class="warning">
      Executar <strong>sense arguments</strong> i accedir a <code>args[0]</code> → <code>ArrayIndexOutOfBoundsException</code> — el mateix error del Bloc 1, ara amb la cara de <code>args</code>.
    </div>
    <div class="success">
      Comprova sempre abans d'accedir: <code>if (args.length &gt; 0) { ... }</code>
    </div>
  </div>
</div>

---
---

## ⭐ Be the Code: l'array al quadrat

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">BeTheArrayRevelde.java</span>
      </div>
      <pre><code><span class="keyword">public class</span> <span class="class-name">BeTheArrayRevelde</span> {
  <span class="keyword">public static void</span> main(<span class="type">String</span>[] args) {
    <span class="type">int</span>[] nums = {1, 2, 3, 4, 5};
    <span class="keyword">for</span> (<span class="type">int</span> i = 0; i &lt; nums.length; i++) {
      nums[i] = nums[i] * nums[i];
    }
    <span class="type">System</span>.out.println(nums[2]);
  }
}</code></pre>
    </div>
  </div>
  <div class="right">
    <p><strong>Què imprimix?</strong></p>
    <p>a) 3 &nbsp;·&nbsp; b) 6 &nbsp;·&nbsp; c) 9 &nbsp;·&nbsp; d) 25</p>
    <div class="answer-card">
      <p><strong>El c.</strong> Es fa el quadrat de cada número al lloc: <code>{1, 4, 9, 16, 25}</code> → <code>nums[2] = 9</code>. El patró <code>arr[i] = ...</code> és el mateix que usaríes per a modificar un array rebut en un mètode.</p>
    </div>
  </div>
</div>

---
---

## Comprovació ràpida 🔁

<div class="question-card">
  <span class="question-icon">?</span> <code>int[] a = {1,2,3}; cambiar(a);</code> amb <code>cambiar(int[] x) { x[0] = 7; }</code> — quant val <code>a[0]</code>?
</div>

<div class="question-card">
  <span class="question-icon">?</span> I si el mètode fa <code>x = new int[]{9,9,9}</code> en comptes de tocar <code>x[0]</code>?
</div>

<div class="question-card">
  <span class="question-icon">?</span> <code>String</code> es comporta com un array o com un primitiu al passar-lo a un mètode?
</div>

<div class="answer-card">
  <strong>1.</strong> 7: el mètode modifica el contingut de l'objecte compartit. · <strong>2.</strong> Res: l'original seguix <code>{1, 2, 3}</code>; només reassigna la còpia local de la referència. · <strong>3.</strong> La referència es copia, però <code>String</code> és immutable: cap mètode no pot canviar el seu contingut.
</div>

---
---

## Arrays de String: la llista de la classe

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">LlistaClasse.java</span>
      </div>
      <pre><code><span class="type">String</span>[] clase = {<span class="string">"Ana"</span>, <span class="string">"Bruno"</span>,
        <span class="string">"Carla"</span>, <span class="string">"Diego"</span>};

<span class="keyword">for</span> (<span class="type">String</span> alumno : clase) {
  <span class="type">System</span>.out.println(<span class="string">"Hola, "</span> + alumno);
}</code></pre>
    </div>
    <p>Cada plaça guarda una <code>String</code>. Res de nou en la sintaxi: el que canvia és <strong>el que guardes</strong>.</p>
  </div>
  <div class="right">
    <div class="warning">
      Amb String <strong>mai no compares amb <code>==</code></strong>: usa <code>.equals()</code>. <code>fruta == "pera"</code> compara referències, no text.
    </div>
    <div class="info">
      El <code>String[]</code> més usat del curs el portes escrivint des de la U02: <code>main(String[] args)</code> — un array de String de veritat.
    </div>
  </div>
</div>

---
---

## char[] vs String: semblants però no iguals

| Cosa | `String` | `char[]` |
| ----- | ----- | ----- |
| **Immutable?** | Sí: no es pot canviar | No: pots tocar cada plaça |
| **Mètodes** | `length()`, `charAt()`, `substring()`… | No en té (uses bucles) |
| **Canviar una lletra?** | No (en crees una altra) | Sí: `vocales[0] = 'A';` |
| **Passar a mètode** | Es comporta com immutable | Es compartix com qualsevol objecte |

<div class="info">
  💡 Si necessites «canviar una lletra»: passa la <code>String</code> a <code>char[]</code>, modifica-la i torna a construir la <code>String</code>. Esta idea tornarà en la unitat de fitxers i regex.
</div>

---
---

## Arrays d'objectes: l'aparcament de persones

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Alumno.java</span>
      </div>
      <pre><code><span class="keyword">class</span> <span class="class-name">Alumno</span> {
  <span class="type">String</span> nombre;
  <span class="type">int</span> nota;
  <span class="class-name">Alumno</span>(<span class="type">String</span> nombre, <span class="type">int</span> nota) {
    <span class="keyword">this</span>.nombre = nombre;
    <span class="keyword">this</span>.nota = nota;
  }
}
<span class="comment">// al main:</span>
<span class="type">Alumno</span>[] alumnos = <span class="keyword">new</span> <span class="class-name">Alumno</span>[3];
alumnos[0] = <span class="keyword">new</span> <span class="class-name">Alumno</span>(<span class="string">"Ana"</span>, 8);
alumnos[1] = <span class="keyword">new</span> <span class="class-name">Alumno</span>(<span class="string">"Bruno"</span>, 5);
alumnos[2] = <span class="keyword">new</span> <span class="class-name">Alumno</span>(<span class="string">"Carla"</span>, 10);</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="warning">
      Un <code>Alumno[]</code> acabat de crear està ple de <strong>null</strong>, no d'alumnes. Accedir a <code>alumnos[0].nombre</code> sense crear l'objecte → <code>NullPointerException</code>. Primer <code>new Alumno(...)</code>, després usar.
    </div>
    <p>I el bucle? <strong>Idèntic</strong> al dels números:</p>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Comptar aprovats</span>
      </div>
      <pre><code><span class="type">int</span> aprobados = 0;
<span class="keyword">for</span> (<span class="class-name">Alumno</span> a : alumnos) {
  <span class="keyword">if</span> (a.nota &gt;= 5) {
    aprobados++;
  }
}</code></pre>
    </div>
  </div>
</div>

---
---

## Taules de dades: double[][]

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Notas.java</span>
      </div>
      <pre><code><span class="type">double</span>[][] notas = {
    {8.0, 7.5, 9.0},  <span class="comment">// Ana</span>
    {5.0, 6.0, 4.5},  <span class="comment">// Bruno</span>
    {9.5, 8.0, 10.0}  <span class="comment">// Carla</span>
};</code></pre>
    </div>
    <p>Cada <strong>fila</strong> és un alumne; cada <strong>columna</strong>, una assignatura (Mat, Llengua, Anglés).</p>
  </div>
  <div class="right">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Mitjana per alumne</span>
      </div>
      <pre><code><span class="keyword">for</span> (<span class="type">int</span> i = 0; i &lt; notas.length; i++) {
  <span class="type">double</span> suma = 0;
  <span class="keyword">for</span> (<span class="type">int</span> j = 0; j &lt; notas[i].length; j++) {
    suma += notas[i][j];
  }
  <span class="type">System</span>.out.println(<span class="string">"Alumne "</span> + i
      + <span class="string">": mitjana "</span>
      + (suma / notas[i].length));
}</code></pre>
    </div>
    <div class="info">
      Els programes que «porten el compte» de la vida real són, en el fons, açò.
    </div>
  </div>
</div>

---
---

## ⭐ Be the Code: la cerca de la pel·lícula

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">BeTheCatalogo.java</span>
      </div>
      <pre><code><span class="keyword">public class</span> <span class="class-name">BeTheCatalogo</span> {
  <span class="keyword">public static void</span> main(<span class="type">String</span>[] args) {
    <span class="type">String</span>[] peliculas = {<span class="string">"Alien"</span>,
        <span class="string">"Matrix"</span>, <span class="string">"Gladiator"</span>,
        <span class="string">"Matrix"</span>, <span class="string">"Coco"</span>};
    <span class="type">String</span> buscada = <span class="string">"Matrix"</span>;
    <span class="type">int</span> cuantas = 0;
    <span class="keyword">for</span> (<span class="type">String</span> p : peliculas) {
      <span class="keyword">if</span> (p.equals(buscada)) {
        cuantas++;
      }
    }
    <span class="type">System</span>.out.println(cuantas);
  }
}</code></pre>
    </div>
  </div>
  <div class="right">
    <p><strong>Què imprimix?</strong></p>
    <p>a) 1 &nbsp;·&nbsp; b) 2 &nbsp;·&nbsp; c) 3 &nbsp;·&nbsp; d) "Matrix"</p>
    <div class="answer-card">
      <p><strong>L'b.</strong> «Matrix» apareix en les posicions 1 i 3: <strong>dues voltes</strong>. I fixa't en el <code>.equals()</code>: amb <code>==</code> compararies referències i no trobaria cap.</p>
    </div>
  </div>
</div>

---
---

## Comprovació ràpida 🧍

<div class="question-card">
  <span class="question-icon">?</span> Què hi ha a les places d'un <code>Alumno[]</code> acabat de crear?
</div>

<div class="question-card">
  <span class="question-icon">?</span> Per què <code>fruta == "pera"</code> és un error amb String?
</div>

<div class="question-card">
  <span class="question-icon">?</span> Pots modificar una lletra d'una <code>String</code>? I d'un <code>char[]</code>?
</div>

<div class="answer-card">
  <strong>1.</strong> <code>null</code>: cal crear els objectes amb <code>new Alumno(...)</code>. · <strong>2.</strong> <code>==</code> compara referències (és el mateix objecte?), no el contingut: amb String cal <code>.equals()</code>. · <strong>3.</strong> No: String és immutable. Sí: <code>char[]</code> no ho és (<code>vocales[0] = 'A'</code> funciona).
</div>

---
---

## ⭐ Be the Code: el gimnàs

<p>Este punt no té teoria nova: té <strong>tres reptes</strong>. Quan et demanen «inverteix este array» en una entrevista, ningú et deixa usar <code>Arrays</code>: cal saber-ho fer a mà.</p>

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">Dos punters: <code>izquierda = 0</code> i <code>derecha = array.length - 1</code>.</div>
</div>

<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">Mentre <code>izquierda &lt; derecha</code>: intercanvia <code>array[izquierda]</code> i <code>array[derecha]</code> amb una variable <code>temp</code>.</div>
</div>

<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><code>izquierda++</code> i <code>derecha--</code>: els punters s'apropen al centre.</div>
</div>

<div class="step">
  <div class="step-number">4</div>
  <div class="step-content">Quan es creuen, ja està: tot l'array invertit al lloc.</div>
</div>

---
---

## 🧩 REPTE 1: invertir l'array al lloc

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">RetoInverso.java</span>
        <span class="code-card-badge">🧠</span>
      </div>
      <pre><code><span class="keyword">public class</span> <span class="class-name">RetoInverso</span> {
  <span class="keyword">public static void</span> invertir(
      <span class="type">int</span>[] array) {
    <span class="comment">// 🧠 EL TEU CODI ACÍ</span>
  }
  <span class="keyword">public static void</span> main(<span class="type">String</span>[] args) {
    <span class="type">int</span>[] datos = {1, 2, 3, 4, 5};
    invertir(datos);
    <span class="keyword">for</span> (<span class="type">int</span> n : datos) {
      <span class="type">System</span>.out.print(n + <span class="string">" "</span>);
    }
  }
}</code></pre>
    </div>
  </div>
  <div class="right">
    <p><strong>Objectiu:</strong> mostrar <code>5 4 3 2 1</code> <strong>sense crear un altre array</strong>.</p>
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">Declara els dos punters.</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">Escriu el <code>while</code> amb la condició correcta.</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content">Intercanvia els dos elements amb una variable temporal.</div>
    </div>
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content">Mou els punters cap al centre.</div>
    </div>
  </div>
</div>

---
---

## El truc dels dos punters, dibuixat

<div class="diagram-frame diagram-small">
  <Excalidraw drawFilePath="/diagrams/ud06-prg-invertir.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<div class="success">
  Al lloc: <strong>O(n) de temps i O(1) de memòria</strong>. Açò és el que impressiona en una entrevista.
</div>

---
---

## ✅ Solució del repte 1

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <span class="code-card-title">RetoInverso.java — solució</span>
  </div>
  <pre><code><span class="keyword">public static void</span> invertir(<span class="type">int</span>[] array) {
  <span class="type">int</span> izquierda = 0;
  <span class="type">int</span> derecha = array.length - 1;
  <span class="keyword">while</span> (izquierda &lt; derecha) {
    <span class="type">int</span> temp = array[izquierda];
    array[izquierda] = array[derecha];
    array[derecha] = temp;
    izquierda++;
    derecha--;
  }
}</code></pre>
</div>

<div class="warning">
  <strong>L'error més comú:</strong> crear un array auxiliar quan no cal. Al lloc, amb dos punters i una variable temporal, és suficient — i molt més eficient.
</div>

---
---

## 🧩 REPTE 2: buscar totes les posicions

<div class="two-cols">
  <div class="left">
    <p><code>binarySearch</code> et dona <strong>una</strong> posició. Este repte demana <strong>totes</strong>:</p>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">RetoBusqueda.java</span>
        <span class="code-card-badge">🧠</span>
      </div>
      <pre><code><span class="keyword">public static</span> <span class="type">int</span>[] posiciones(
    <span class="type">int</span>[] datos, <span class="type">int</span> buscado) {
  <span class="comment">// 🧠 EL TEU CODI ACÍ</span>
  <span class="keyword">return</span> <span class="keyword">new</span> <span class="type">int</span>[0];
}
<span class="comment">// datos = {3, 7, 2, 7, 9, 7, 1}</span>
<span class="comment">// posiciones(datos, 7) → [1, 3, 5]</span>
<span class="comment">// posiciones(datos, 5) → []</span></code></pre>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">Primera passada: <strong>compta</strong> quantes voltes apareix.</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">Crea l'array de resultats amb <strong>eixa grandària</strong>.</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content">Segona passada: <strong>ompli</strong> les posicions.</div>
    </div>
    <div class="info">
      💡 Quan la grandària depén de les dades, es fa en <strong>dues passades</strong>: no pots crear l'array fins a saber quantes places necessita.
    </div>
  </div>
</div>

---
---

## ✅ Solució del repte 2: el patró de les dues passades

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Passada 1: comptar</span>
      </div>
      <pre><code><span class="keyword">public static</span> <span class="type">int</span>[] posiciones(
    <span class="type">int</span>[] datos, <span class="type">int</span> buscado) {
  <span class="type">int</span> cuantas = 0;
  <span class="keyword">for</span> (<span class="type">int</span> i = 0; i &lt; datos.length; i++) {
    <span class="keyword">if</span> (datos[i] == buscado) {
      cuantas++;
    }
  }</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Passada 2: crear i omplir</span>
      </div>
      <pre><code>  <span class="type">int</span>[] resultado = <span class="keyword">new</span> <span class="type">int</span>[cuantas];
  <span class="type">int</span> k = 0;
  <span class="keyword">for</span> (<span class="type">int</span> i = 0; i &lt; datos.length; i++) {
    <span class="keyword">if</span> (datos[i] == buscado) {
      resultado[k++] = i;
    }
  }
  <span class="keyword">return</span> resultado;
}</code></pre>
    </div>
  </div>
</div>

<div class="success">
  Un mètode, dos bucles: el primer compta, el segon ompli. Patró que repetiràs sovint.
</div>

---
---

## 🧩 EL LÍO: l'aparcament que es va rebel·lar

<div class="two-cols">
  <div class="left">
    <p>L'encarregat volia «deixar les places imparelles buides». Alguna cosa fa mala olor:</p>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">ParkingLioso.java</span>
        <span class="code-card-badge">🚨</span>
      </div>
      <pre><code><span class="keyword">public class</span> <span class="class-name">ParkingLioso</span> {
  <span class="keyword">public static void</span> vaciarImpares(
      <span class="type">int</span>[] arr) {
    <span class="keyword">for</span> (<span class="type">int</span> i = 0; i &lt; arr.length; i++) {
      <span class="keyword">if</span> (arr[i] % 2 == 1) {
        arr[i] = <span class="error-inline">null</span>; <span class="comment">// 🚨 compila açò?</span>
      }
    }
  }
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="answer-card">
      <p><strong>No compila.</strong> <code>arr</code> és un <code>int[]</code>, i <code>int</code> és un tipus primitiu: <strong>no pot valer null</strong>. null només cap en variables de tipus objecte (<code>String</code>, <code>Integer</code>, <code>Alumno</code>…).</p>
    </div>
    <div class="info">
      Per a «buidar» un <code>int[]</code>, posa un <strong>valor de sentinella</strong> (0 o −1). I si necessites places buides de veritat: arrays d'objectes o col·leccions (U12).
    </div>
    <p>🕶️ <strong>Don Tip:</strong> pregunta sempre: <em>quin tipus de dada guarda este array?</em></p>
  </div>
</div>

---
class: compact-slide
---

## 👹 La galeria dels 6 monstres

| Monstre | Símptoma | Cura |
| ----- | ----- | ----- |
| **1. ArrayIndexOutOfBoundsException** | Accedir fora de 0…length − 1 | Revisar límits i el `<=` del bucle |
| **2. NullPointerException** | Tocar una plaça sense objecte | `if (arr[i] != null)` o crear els objectes |
| **3. Imprimir sense toString** | `[I@6d06d69c` | `Arrays.toString` (o `deepToString`) |
| **4. Comparar amb `==` / equals** | `false` amb contingut igual | `Arrays.equals(a, b)` |
| **5. length / length() / size()** | No compila | array `length` · String `length()` · col·lecció `size()` |
| **6. Modificar amb for-each** | L'array no canvia | for amb índex: `a[i] = ...` |

<div class="success">
  El 90% dels «arrays rebel·les» s'arreglen llegint el missatge d'error amb calma.
</div>

---
---

## 🤬 CONRAD vs el món: l'array que no es calla

<div class="warning">
  «Un for amb quina condició? — <em>Doncs i &lt;= numeros.length…</em> ¿&lt;=?! L'últim índex vàlid és <strong>length − 1</strong>. &lt;= et porta a la plaça fantasma i d'allí no torna ningú.»
</div>

<div class="info">
  «Pregunta: què tens a la plaça? — <em>No ho sé, la vaig crear amb new String[10].</em> I quantes places has omplit? — <em>Doncs… bé…</em> ¡AH! ¡CAP! Un <code>String[]</code> acabat de crear és una fila de <strong>null</strong>. Si no fiques objectes, no hi ha objectes.»
</div>

<div class="success">
  «I el favorit de tots: <em>el meu bucle que duplica no funciona</em>. — Com el recorres? — <em>Amb for-each.</em> ¡EL for-each NO MODIFICA! És un robot lector de matrícules: llig, però no repinta. Per a repintar, índex i claudàtors.»
</div>

---
---

## 🐛 Depurar arrays sense perdre el cap

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><strong>Imprimeix l'array complet</strong> amb <code>Arrays.toString()</code> a cada pas: vore les dades arregla la mitat dels misteris.</div>
</div>

<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><strong>Comprova els límits abans de tocar</strong>: si vas a accedir a <code>a[i + 1]</code>, que <code>i</code> no arribe a length − 1.</div>
</div>

<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><strong>Usa el depurador</strong>: breakpoint al bucle i observa <code>i</code> a cada volta. Si es passa de length − 1, ho veus a la primera.</div>
</div>

<div class="step">
  <div class="step-number">4</div>
  <div class="step-content"><strong>Paper i boli</strong>: simula el bucle a mà amb un array de 3 elements. En ple segle XXI, i seguix funcionant.</div>
</div>

<div class="step">
  <div class="step-number">5</div>
  <div class="step-content"><strong>Aïlla l'error</strong>: primer ompli i comprova; després el bucle; després el càlcul. Si falla, sabràs quin tram és.</div>
</div>

<div class="info">
  El missatge d'excepció no és el teu enemic: és un detectiu que et diu la línia i el motiu. <code>Index 5 out of bounds for length 5</code> no deixa lloc a dubtes. <strong>LLEGEIX-LO</strong> abans de tocar res.
</div>

---
---

## ⭐ Be the Code: el caçador de monstres

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">CazaMonstruos.java</span>
        <span class="code-card-badge">👹</span>
      </div>
      <pre><code><span class="keyword">public class</span> <span class="class-name">CazaMonstruos</span> {
  <span class="keyword">public static void</span> main(<span class="type">String</span>[] args) {
    <span class="type">int</span>[] datos = <span class="keyword">new</span> <span class="type">int</span>[5];
    <span class="keyword">for</span> (<span class="type">int</span> i = 1; i &lt;= datos.length; i++) {
      datos[i] = i * 10;
    }
    <span class="type">System</span>.out.println(
        java.util.<span class="type">Arrays</span>.toString(datos));
  }
}</code></pre>
    </div>
  </div>
  <div class="right">
    <p><strong>Què ocorre?</strong></p>
    <p>a) Imprimix [10, 20, 30, 40, 50]<br>
    b) Imprimix [0, 10, 20, 30, 40]<br>
    c) ArrayIndexOutOfBoundsException<br>
    d) NullPointerException</p>
    <div class="answer-card">
      <p><strong>El c</strong> (monstre 1 en acció). Quan <code>i</code> val 5, <code>datos[5]</code> no existix: les places vàlides van de 0 a 4. I de passada, la plaça 0 es queda sense tocar (el bucle comença en 1): un altre ensurt per als despistats.</p>
    </div>
  </div>
</div>

---
class: compact-slide
---

## Repàs: qui soc? 🕵️

<div class="two-cols">
  <div class="left">
    <div class="question-card">
      <span class="question-icon">1</span> Sóc un aparcament de grandària fixa: guarde moltes dades del mateix tipus sota un sol nom.
    </div>
    <div class="question-card">
      <span class="question-icon">2</span> Sóc el número de cada plaça, i comence en 0, per a confusió general.
    </div>
    <div class="question-card">
      <span class="question-icon">3</span> Em llancen quan demanen la plaça que no existix.
    </div>
  </div>
  <div class="right">
    <div class="question-card">
      <span class="question-icon">4</span> Sóc el bucle de només lectura: «per a cada X en Y».
    </div>
    <div class="question-card">
      <span class="question-icon">5</span> Sóc la classe utilitària amb <code>toString</code>, <code>sort</code>, <code>binarySearch</code>, <code>copyOf</code> i <code>fill</code>.
    </div>
    <div class="question-card">
      <span class="question-icon">6</span> Sóc l'atribut que diu quantes places hi ha, sense parèntesis.
    </div>
  </div>
</div>

<div class="answer-card">
  1. L'array · 2. L'índex · 3. La <code>ArrayIndexOutOfBoundsException</code> · 4. El for-each · 5. La classe <code>Arrays</code> · 6. <code>length</code>
</div>

---
class: compact-slide
---

## Repàs: el joc de les decisions 🎮

<div class="two-cols">
  <div class="left">
    <div class="question-card">
      <span class="question-icon">1</span> Últim índex vàlid de <code>int[] a = new int[8]</code>? — a) 7 · b) 8 · c) 9
    </div>
    <div class="question-card">
      <span class="question-icon">2</span> Valor de cada plaça de <code>new boolean[4]</code>? — a) true · b) false · c) null
    </div>
    <div class="question-card">
      <span class="question-icon">3</span> <code>binarySearch</code> sobre un array <strong>desordenat</strong>? — a) Excepció · b) Impredictible · c) Ordena primer
    </div>
  </div>
  <div class="right">
    <div class="question-card">
      <span class="question-icon">4</span> <code>println(a.length)</code> per a <code>new int[10]</code>? — a) 9 · b) 10 · c) [10]
    </div>
    <div class="question-card">
      <span class="question-icon">5</span> Bucle per a recórrer un array <strong>cap arrere</strong>? — a) for-each · b) for amb índex · c) Qualsevol
    </div>
  </div>
</div>

<div class="answer-card">
  1. <strong>a</strong> — 7 (de 0 a length − 1) · 2. <strong>b</strong> — false · 3. <strong>b</strong> — impredictible: exigix ordre · 4. <strong>b</strong> — 10 · 5. <strong>b</strong> — for cap arrere
</div>

---
class: compact-slide
---

## Repàs: preguntes d'entrevista de treball 💼

<div class="two-cols">
  <div class="left">
    <div class="question-card">
      <span class="question-icon">1</span> «Explícam'ho, com si jo fóra la teua iaia: <strong>què és un array</strong>?»
    </div>
    <div class="question-card">
      <span class="question-icon">2</span> «Inverteix este array <strong>sense crear-ne un altre</strong>. Ara digues-me quanta memòria extra necessites.»
    </div>
    <div class="question-card">
      <span class="question-icon">3</span> «Quina és la diferència entre <strong>length, length() i size()</strong>?»
    </div>
  </div>
  <div class="right">
    <div class="question-card">
      <span class="question-icon">4</span> «Quan usaríes <strong>for-each</strong> i quan un <strong>for amb índex</strong>?»
    </div>
    <div class="question-card">
      <span class="question-icon">5</span> «Com compares dos arrays per a saber si tenen el <strong>mateix contingut</strong>?»
    </div>
    <div class="question-card">
      <span class="question-icon">6</span> «Escriu el codi que torna la <strong>nota més alta</strong> d'un array.»
    </div>
  </div>
</div>

<div class="info">
  Preguntes reals per a un programador Java júnior. Si saps respondre les sis, la unitat està apresa.
</div>

---
class: compact-slide
---

## No hi ha preguntes tontes 🤷

<div class="two-cols">
  <div class="left">
    <div class="question-card">
      <p><strong>❓ Per què el primer índex és 0 i no 1?</strong></p>
      <p>Perquè l'índex és una <strong>distància</strong> des del principi, no un número de plaça. La primera casa és a 0 passes de tu. Contar des de 0 evita l'off-by-one en milers de càlculs.</p>
    </div>
    <div class="question-card">
      <p><strong>❓ Puc usar sort i binarySearch en lloc dels algoritmes a mà?</strong></p>
      <p>En programes reals, sí. Però en la U07 aprendràs <strong>com funcionen per dins</strong> (bombolla, cerca binària) — i en una entrevista, et demanaran l'algoritme a mà.</p>
    </div>
  </div>
  <div class="right">
    <div class="question-card">
      <p><strong>❓ Un array pot canviar de grandària?</strong></p>
      <p>No. És <strong>grandària fixa</strong> per sempre. Quan necessites «més places», es crea un array nou i es copia (<code>Arrays.copyOf</code>). Per això existixen les col·leccions (U12).</p>
    </div>
    <div class="question-card">
      <p><strong>❓ Què guarda la variable <code>args</code> del main?</strong></p>
      <p>Un <code>String[]</code> amb els arguments de la línia de comandes: <code>args[0]</code> és el primer i <code>args.length</code>, quants n'hi ha.</p>
    </div>
  </div>
</div>

---
---

## Resum del bloc 2 en 5 frases

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">Els arrays es passen per <strong>referència</strong> (còpia de la referència): modificar-los dins d'un mètode es veu fora. Els primitius, per <strong>valor</strong>.</div>
</div>

<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">Els arrays guarden <strong>el que siga</strong>: String (usa <code>.equals()</code>), <code>char[]</code>, objectes (comencen en <code>null</code>) i taules 2D.</div>
</div>

<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><strong>Invertir al lloc</strong>: dos punters, intercanvi amb <code>temp</code> i <code>while (izquierda &lt; derecha)</code>.</div>
</div>

<div class="step">
  <div class="step-number">4</div>
  <div class="step-content">Grandària dependent de les dades → patró de <strong>dues passades</strong>: comptar primer, crear i omplir després.</div>
</div>

<div class="step">
  <div class="step-number">5</div>
  <div class="step-content">Els <strong>6 monstres</strong> tenen nom, missatge i cura — i el missatge d'excepció és una pista: llig-lo abans de tocar res.</div>
</div>

---
layout: closing
---

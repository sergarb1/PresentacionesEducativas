---
layout: cover
---

# Unitat 06 — Arrays<br>Bloc 1

## 1r CFGS DAW · Programació

---
---

## En aquesta sessió

### La primera ferramenta "de veritat" per a gestionar quantitats: l'aparcament de dades

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">L'array: l'<strong>aparcament de dades</strong> — crear, indexar i la plaça fantasma.</div>
</div>

<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">Valors per defecte i <code>length</code> — <strong>sense parèntesis</strong>!</div>
</div>

<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">Recórrer arrays: el duo <strong>for i for-each</strong>.</div>
</div>

<div class="step">
  <div class="step-number">4</div>
  <div class="step-content">Arrays <strong>multidimensionals</strong>: taules, taulers i matrius.</div>
</div>

<div class="step">
  <div class="step-number">5</div>
  <div class="step-content">La classe <strong>Arrays</strong>: la navalla suïssa.</div>
</div>

<div class="info">
  El Bloc 2 porta la <strong>referència</strong> (arrays i mètodes), objectes, els reptes <em>Be the Code</em> i la cacera d'errors.
</div>

---
---

## El problema: tens 100 gats i un sol nom

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">SenseArrays.java</span>
        <span class="code-card-badge">😱</span>
      </div>
      <pre><code><span class="type">String</span> gato1 = <span class="string">"Bigotes"</span>;
<span class="type">String</span> gato2 = <span class="string">"Garfield"</span>;
<span class="type">String</span> gato3 = <span class="string">"Misifú"</span>;
<span class="comment">// ... 97 línies després ...</span>
<span class="type">String</span> gato100 = <span class="string">"Calcetines"</span>;</code></pre>
    </div>
  </div>
  <div class="right">
    <p>Arriba el <strong>gat 101</strong> i el programa es cau. O pitjor: vols saber quants gats comencen per «M» i has d'escriure <strong>100 if</strong>.</p>
    <div class="warning">
      Si alguna volta escrius <code>gato1, gato2… gatoN</code> al teu codi, en algun lloc un programador sènior plora. Els arrays existixen exactament per a això.
    </div>
  </div>
</div>

---
---

## L'array: el teu primer aparcament

<div class="diagram-frame diagram-small">
  <Excalidraw drawFilePath="/diagrams/ud06-prg-array-aparcament.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<div class="info">
  Grandària <strong>fixa</strong>, un sol nom per a moltes dades del mateix tipus — i cada plaça, numerada des de <strong>0</strong>.
</div>

---
---

## Dos constructors: amb new o amb literal

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Buit, per a omplir després</span>
      </div>
      <pre><code><span class="comment">// 5 places, totes buides (0)</span>
<span class="type">int</span>[] numeros = <span class="keyword">new</span> <span class="type">int</span>[5];</code></pre>
    </div>
    <p>La grandària va entre claudàtors i <strong>ja no canvia mai</strong>.</p>
  </div>
  <div class="right">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Ple, de naixement</span>
      </div>
      <pre><code><span class="comment">// 3 places, ja ocupades</span>
<span class="type">int</span>[] directo = {10, 20, 30};</code></pre>
    </div>
    <p>Els valors, entre claus i separats per comes.</p>
  </div>
</div>

<div class="success">
  💡 La primera plaça és la <strong>0</strong>, no la 1. Pensa en els índexs com a <strong>distàncies</strong>: la primera casa és a 0 passes de tu, no a 1.
</div>

---
---

## Els valors per defecte

<p>En crear un array amb <code>new</code>, cada plaça s'ompli amb el valor per defecte del tipus:</p>

| Tipus | Valor per defecte |
| ----- | ----- |
| `int`, `long`, `short`, `byte` | `0` |
| `double`, `float` | `0.0` |
| `boolean` | `false` |
| `char` | `'\u0000'` |
| **Objectes** (`String`, `Alumne`…) | `null` |

<div class="warning">
  Eixe últim és el que mossega: un array de <code>String</code> acabat de crear està ple de <strong>null</strong>, no de <code>""</code>. Cridar un mètode sobre una plaça null → <code>NullPointerException</code> a l'acte.
</div>

---
---

## Ficar coses: l'índex i la plaça fantasma

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Parking.java</span>
        <span class="code-card-badge">💥</span>
      </div>
      <pre><code><span class="type">String</span>[] gatos = <span class="keyword">new</span> <span class="type">String</span>[3];
gatos[0] = <span class="string">"Bigotes"</span>;
gatos[1] = <span class="string">"Garfield"</span>;
gatos[2] = <span class="string">"Misifú"</span>;
gatos[3] = <span class="string">"Calcetines"</span>; <span class="error-inline">// ¡BOOM!</span></code></pre>
    </div>
  </div>
  <div class="right">
    <p>S'accedix a una plaça amb claudàtors i l'<strong>índex</strong>. Però l'array té places del <strong>0 al 2</strong>: demanar la 3 és intentar aparcar on no hi ha plaça.</p>
    <div class="warning">
      Java respon amb <code>ArrayIndexOutOfBoundsException</code> — <strong>la</strong> excepció més típica d'esta unitat.
    </div>
    <div class="info">
      📝 Memoritza: índexs vàlids de <strong>0 a length − 1</strong>. L'últim element sempre és <code>arr[arr.length - 1]</code>.
    </div>
  </div>
</div>

---
---

## La longitud: length sense parèntesis

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Longitud.java</span>
      </div>
      <pre><code><span class="type">int</span>[] numeros = <span class="keyword">new</span> <span class="type">int</span>[10];
<span class="type">System</span>.out.println(numeros.length);
<span class="comment">// 10 — sense parèntesis!</span></code></pre>
    </div>
  </div>
  <div class="right">
    <p><code>length</code> no és un mètode: és un <strong>atribut</strong>. Per això no porta parèntesis.</p>
    <div class="warning">
      <strong>Trampa mortal d'examen:</strong> arrays → <code>length</code> · String → <code>length()</code> · col·leccions → <code>size()</code> (U12).
    </div>
  </div>
</div>

<div class="info">
  L'array és un <strong>objecte</strong> (viu al heap), però la variable que el referencia és a la pila. Quan passes un array a un mètode, passes la <strong>referència</strong>: si el modifiques dins, el canvi afecta l'original. Ho veurem al Bloc 2.
</div>

---
---

## Comprovació ràpida ☕

<div class="question-card">
  <span class="question-icon">?</span> Quant places té <code>int[] a = new int[7]</code> i quins són els índexs vàlids?
</div>

<div class="question-card">
  <span class="question-icon">?</span> Quin valor té cada plaça de <code>boolean[] b = new boolean[3]</code>?
</div>

<div class="question-card">
  <span class="question-icon">?</span> Quina excepció llança <code>arr[arr.length]</code>?
</div>

<div class="answer-card">
  <strong>1.</strong> 7 places: índexs del 0 al 6 (length − 1). · <strong>2.</strong> <code>false</code> a totes: és el valor per defecte de boolean. · <strong>3.</strong> <code>ArrayIndexOutOfBoundsException</code>: la plaça length no existix, les vàlides acaben en length − 1.
</div>

---
---

## Recórrer arrays: el duo inseparable

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">RecorreGatos.java</span>
      </div>
      <pre><code><span class="type">String</span>[] gatos = {<span class="string">"Bigotes"</span>, <span class="string">"Garfield"</span>,
        <span class="string">"Misifú"</span>, <span class="string">"Calcetines"</span>};

<span class="keyword">for</span> (<span class="type">int</span> i = 0; i &lt; gatos.length; i++) {
    <span class="type">System</span>.out.println(<span class="string">"Gato "</span> + i
        + <span class="string">": "</span> + gatos[i]);
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="terminal">
      <div class="output">Gato 0: Bigotes</div>
      <div class="output">Gato 1: Garfield</div>
      <div class="output">Gato 2: Misifú</div>
      <div class="output">Gato 3: Calcetines</div>
    </div>
    <div class="warning">
      Fixa't: la condició és <code>i &lt; gatos.length</code>. Si escrigueres <code>&lt;=</code>, a l'última volta demanes la plaça length i… ¡BOOM! L'error de bucle més comés de l'univers.
    </div>
  </div>
</div>

---
---

## El duo, dibuixat

<div class="diagram-frame diagram-medium">
  <Excalidraw drawFilePath="/diagrams/ud06-prg-for-for-each.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<div class="info">
  <strong>for clàssic</strong>: recorre per índex i pot <strong>modificar</strong> · <strong>for-each</strong>: recorre els valors i <strong>només llig</strong>.
</div>

---
---

## Patrons clàssics amb for

<div class="two-cols">
  <div class="left">
    <h3>Sumar tots els elements</h3>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Mitjana.java</span>
      </div>
      <pre><code><span class="type">int</span>[] notas = {7, 8, 5, 9, 6};
<span class="type">int</span> suma = 0;
<span class="keyword">for</span> (<span class="type">int</span> i = 0; i &lt; notas.length; i++) {
    suma += notas[i];
}
<span class="comment">// mitjana: (double) suma / notas.length</span></code></pre>
    </div>
  </div>
  <div class="right">
    <h3>Cerca lineal</h3>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Cerca.java</span>
      </div>
      <pre><code><span class="type">int</span>[] edades = {12, 45, 7, 34, 89};
<span class="type">int</span> buscado = 34;
<span class="type">int</span> posicion = -1;
<span class="keyword">for</span> (<span class="type">int</span> i = 0; i &lt; edades.length; i++) {
    <span class="keyword">if</span> (edades[i] == buscado) {
        posicion = i;
        <span class="keyword">break</span>;
    }
}</code></pre>
    </div>
  </div>
</div>

<div class="info">
  Modificar l'array al lloc (<code>numeros[i] *= 10</code>) <strong>només es pot amb índex</strong>: el for-each és de només lectura.
</div>

---
---

## for-each: la variant peresosa

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">ForEach.java</span>
      </div>
      <pre><code><span class="type">String</span>[] gatos = {<span class="string">"Bigotes"</span>,
        <span class="string">"Garfield"</span>, <span class="string">"Misifú"</span>};

<span class="keyword">for</span> (<span class="type">String</span> gato : gatos) {
   <span class="type">System</span>.out.println(<span class="string">"Miau: "</span> + gato);
}</code></pre>
    </div>
    <p>Es llig: <em>«per a cada String gato en gatos, fes això»</em>. Sense comptadors ni claudàtors.</p>
  </div>
  <div class="right">
    <div class="warning">
      El for-each és <strong>només de lectura</strong>: la variable del bucle és una <strong>còpia</strong> del valor de la plaça. <code>gato = "Nuevo"</code> només canvia la variable local, mai l'array.
    </div>
    <p>🕶️ <strong>Don Tip:</strong> el for-each és un robot que va per l'aparcament llegint matrícules. Només llig: no pot repintar els cotxes.</p>
  </div>
</div>

---
---

## Quan use cada un?

| Situació | Bucle recomanat |
| ----- | ----- |
| Només llegir i no t'importa la posició | **for-each** |
| Necessite l'índex (posicions, comparar veïns) | **for clàssic** |
| Vull modificar els elements de l'array | **for clàssic** |
| Recórrer cap arrere o de dos en dos | **for clàssic** |
| Recórrer una col·lecció (`ArrayList`, `HashSet`…) | for-each (U12) |

<div class="success">
  💡 Si no necessites l'índex, usa <strong>for-each</strong>: és més curt, més llegible i t'estalvia una classe sencera d'errors (oblidar el <code>++</code>, començar en 1, escriure <code>&lt;=</code>…).
</div>

---
---

## ⭐ Be the Code: la suma dels pacients

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">BeTheForEach.java</span>
      </div>
      <pre><code><span class="keyword">public class</span> <span class="class-name">BeTheForEach</span> {
  <span class="keyword">public static void</span> main(<span class="type">String</span>[] args) {
    <span class="type">int</span>[] numeros = {10, 20, 30, 40, 50};
    <span class="type">int</span> total = 0;
    <span class="keyword">for</span> (<span class="type">int</span> n : numeros) {
      <span class="keyword">if</span> (n % 20 == 0) {
        total += n;
      }
    }
    <span class="type">System</span>.out.println(total);
  }
}</code></pre>
    </div>
  </div>
  <div class="right">
    <p><strong>Què imprimix?</strong></p>
    <p>a) 60 &nbsp;·&nbsp; b) 90 &nbsp;·&nbsp; c) 120 &nbsp;·&nbsp; d) 150</p>
    <div class="answer-card">
      <p><strong>L'a.</strong> El for-each recorre 10, 20, 30, 40, 50 i el <code>if</code> només suma els múltiples de 20: <strong>20 + 40 = 60</strong>. Els altres s'ignoren.</p>
    </div>
  </div>
</div>

---
---

## Comprovació ràpida 🚗

<div class="question-card">
  <span class="question-icon">?</span> Què imprimix <code>for (int i = 0; i &lt; a.length; i++)</code> sobre <code>{1, 2, 3}</code> imprimint <code>a[i]</code>?
</div>

<div class="question-card">
  <span class="question-icon">?</span> Per què <code>i &lt;= a.length</code> llança excepció?
</div>

<div class="question-card">
  <span class="question-icon">?</span> Com imprimixes un array al revés?
</div>

<div class="answer-card">
  <strong>1.</strong> <code>1 2 3</code>: recorre les places 0, 1 i 2. · <strong>2.</strong> A l'última volta (i == length) demana una plaça que no existix: els índexs vàlids acaben en length − 1. · <strong>3.</strong> Un for clàssic cap arrere: <code>for (int i = a.length - 1; i &gt;= 0; i--)</code>.
</div>

---
---

## Arrays multidimensionals: l'aparcament de plantes

<p>Un array bidimensional és <strong>un array de arrays</strong>: cada plaça guarda… un altre aparcament. Es declara amb doble claudàtor:</p>

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <span class="code-card-title">Aparcament.java</span>
  </div>
  <pre><code><span class="type">int</span>[][] tabla = <span class="keyword">new</span> <span class="type">int</span>[3][4]; <span class="comment">// 3 files, 4 columnes</span>

tabla[0][0] = 1; <span class="comment">// fila 0, columna 0</span>
tabla[1][2] = 5; <span class="comment">// fila 1, columna 2</span></code></pre>
</div>

<div class="info">
  Pensa en un aparcament amb <strong>3 plantes</strong> i <strong>4 places per planta</strong>: per a una plaça necessites <strong>dos números</strong>, la fila i la columna.
</div>

---
---

## La matriu, dibuixada

<div class="diagram-frame diagram-small">
  <Excalidraw drawFilePath="/diagrams/ud06-prg-array-2d.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<div class="warning">
  <code>tabla.length</code> (files) i <code>tabla[0].length</code> (columnes) <strong>NO són el mateix</strong> — l'error clàssic amb matrius.
</div>

---
---

## Crear i recórrer una matriu

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Creació amb literal</span>
      </div>
      <pre><code><span class="type">int</span>[][] matriz = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};</code></pre>
    </div>
    <div class="info">
      Anomena els índexs <code>i</code> i <code>j</code> (o <code>fila</code> i <code>col</code>): NO uses <code>x</code> i <code>y</code> tret que treballes amb coordenades.
    </div>
  </div>
  <div class="right">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Bucles niats</span>
      </div>
      <pre><code><span class="keyword">for</span> (<span class="type">int</span> i = 0; i &lt; matriz.length; i++) {
  <span class="keyword">for</span> (<span class="type">int</span> j = 0; j &lt; matriz[i].length; j++) {
    <span class="type">System</span>.out.print(matriz[i][j] + <span class="string">" "</span>);
  }
  <span class="type">System</span>.out.println();
}</code></pre>
    </div>
    <p><strong>Eixida:</strong> <code>1 2 3</code> · <code>4 5 6</code> · <code>7 8 9</code></p>
  </div>
</div>

---
---

## Arrays irregulars (jagged arrays)

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Irregular.java</span>
      </div>
      <pre><code><span class="type">int</span>[][] irregular = <span class="keyword">new</span> <span class="type">int</span>[3][];
irregular[0] = <span class="keyword">new</span> <span class="type">int</span>[2];
irregular[1] = <span class="keyword">new</span> <span class="type">int</span>[5];
irregular[2] = <span class="keyword">new</span> <span class="type">int</span>[3];</code></pre>
    </div>
  </div>
  <div class="right">
    <p>Java permet files amb <strong>grandàries diferents</strong>: la fila 0 té 2 columnes, la 1 en té 5 i la 2 en té 3.</p>
    <div class="info">
      Per a què? Triangles, piràmides o dades que no formen un rectangle: els dies de cada mes (febrer en té menys).
    </div>
    <div class="warning">
      Per això els recorreguts usen <code>matriz[i].length</code> dins del bucle interior, <strong>mai un número fix</strong>.
    </div>
  </div>
</div>

---
---

## Per a què serveixen de veritat

| Situació | Array |
| ----- | ----- |
| Tauler de joc (escacs, busca-mines, tres en ratlla) | `char[][]` o `boolean[][]` |
| Notes per alumne i assignatura | `double[][]` |
| Mapa de píxels d'una imatge | `int[][]` |
| Matrius matemàtiques | `double[][]` |

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <span class="code-card-title">BuscaMinas.java</span>
  </div>
  <pre><code><span class="type">boolean</span>[][] minas = <span class="keyword">new</span> <span class="type">boolean</span>[5][5];
minas[2][3] = <span class="keyword">true</span>; <span class="comment">// hi ha una mina en fila 2, columna 3</span></code></pre>
</div>

<div class="warning">
  Eixir-te de fila o columna torna a ser <code>ArrayIndexOutOfBoundsException</code> — ara amb dues coordenades.
</div>

---
---

## ⭐ Be the Code: la diagonal que no es veu

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">BeTheDiagonal.java</span>
      </div>
      <pre><code><span class="keyword">public class</span> <span class="class-name">BeTheDiagonal</span> {
  <span class="keyword">public static void</span> main(<span class="type">String</span>[] args) {
    <span class="type">int</span>[][] m = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    <span class="type">int</span> suma = 0;
    <span class="keyword">for</span> (<span class="type">int</span> i = 0; i &lt; m.length; i++) {
      suma += m[i][i];
    }
    <span class="type">System</span>.out.println(suma);
  }
}</code></pre>
    </div>
  </div>
  <div class="right">
    <p><strong>Què imprimix?</strong></p>
    <p>a) 12 &nbsp;·&nbsp; b) 15 &nbsp;·&nbsp; c) 18 &nbsp;·&nbsp; d) 45</p>
    <div class="answer-card">
      <p><strong>L'b.</strong> Suma <code>m[0][0] + m[1][1] + m[2][2] = 1 + 5 + 9 = 15</code>. Quan fila i columna són el mateix número, camines per la <strong>diagonal principal</strong>: un sol bucle, no dos.</p>
    </div>
  </div>
</div>

---
---

## Comprovació ràpida 🎲

<div class="question-card">
  <span class="question-icon">?</span> Quant files i columnes té <code>int[][] a = new int[3][4]</code>?
</div>

<div class="question-card">
  <span class="question-icon">?</span> Com accedixes a l'element de la fila 2, columna 1?
</div>

<div class="question-card">
  <span class="question-icon">?</span> Què representa <code>a.length</code> i què representa <code>a[0].length</code>?
</div>

<div class="answer-card">
  <strong>1.</strong> 3 files i 4 columnes. · <strong>2.</strong> <code>a[2][1]</code>: primer la fila, després la columna, tots dos començant en 0. · <strong>3.</strong> <code>a.length</code> són les files; <code>a[0].length</code>, les columnes de la primera fila.
</div>

---
---

## La classe Arrays: la teua navalla suïssa

<div class="info">
  <code>java.util.Arrays</code> és una classe plena de <strong>mètodes estàtics</strong> per a treballar amb arrays: imprimir, ordenar, copiar, buscar i omplir sense escriure tu el bucle. Es criden amb el nom de la classe: <code>Arrays.xxx(array)</code>.
</div>

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <span class="code-card-title">ImprimirBonic.java</span>
  </div>
  <pre><code><span class="type">int</span>[] numeros = {1, 2, 3};
<span class="type">System</span>.out.println(numeros);
<span class="comment">// [I@6d06d69c ← adreça de memòria, inútil</span>
<span class="type">System</span>.out.println(<span class="type">Arrays</span>.toString(numeros));
<span class="comment">// [1, 2, 3] ← les dades, llegibles</span></code></pre>
</div>

<div class="warning">
  <code>numeros.toString()</code> tampoc no funciona: els arrays no sobreescriuen <code>toString()</code>. Sempre <code>Arrays.toString(numeros)</code> — i <code>Arrays.deepToString()</code> per a arrays 2D.
</div>

---
---

## Ordenar i omplir: sort i fill

<div class="two-cols">
  <div class="left">
    <h3>Arrays.sort — ordenar al lloc</h3>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Sort.java</span>
      </div>
      <pre><code><span class="type">int</span>[] notas = {7, 3, 9, 5};
<span class="type">Arrays</span>.sort(notas);
<span class="comment">// [3, 5, 7, 9]</span></code></pre>
    </div>
    <div class="warning">
      <strong>Modifica l'original</strong>: si vols conservar l'ordre inicial, copia abans amb <code>Arrays.copyOf</code>. Amb String ordena per Unicode: <code>"Zebra"</code> va abans que <code>"abc"</code>.
    </div>
  </div>
  <div class="right">
    <h3>Arrays.fill — omplir-ho tot</h3>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Fill.java</span>
      </div>
      <pre><code><span class="type">int</span>[] tabla = <span class="keyword">new</span> <span class="type">int</span>[10];
<span class="type">Arrays</span>.fill(tabla, 7);
<span class="comment">// totes les places a 7</span></code></pre>
    </div>
    <div class="info">
      Útil per a inicialitzar taulers, reiniciar marcadors o preparar un array abans d'usar-lo.
    </div>
  </div>
</div>

---
---

## Buscar i copiar: binarySearch i copyOf

<div class="two-cols">
  <div class="left">
    <h3>Arrays.binarySearch — buscar ràpid</h3>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">CercaBinaria.java</span>
      </div>
      <pre><code><span class="type">int</span>[] nums = {3, 5, 7, 9, 11};
<span class="type">int</span> pos = <span class="type">Arrays</span>.binarySearch(nums, 7);
<span class="comment">// 2 — partix l'array per la meitat</span></code></pre>
    </div>
    <div class="warning">
      <strong>Exigix array ordenat</strong>: si no, el resultat és impredictible. Ordena abans de buscar, sempre.
    </div>
  </div>
  <div class="right">
    <h3>Arrays.copyOf — copiar amb talla nova</h3>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Copiar.java</span>
      </div>
      <pre><code><span class="type">int</span>[] original = {1, 2, 3, 4, 5};
<span class="type">int</span>[] retallat =
    <span class="type">Arrays</span>.copyOf(original, 3);
<span class="comment">// {1, 2, 3}</span>
<span class="type">int</span>[] allargat =
    <span class="type">Arrays</span>.copyOf(original, 8);
<span class="comment">// {1, 2, 3, 4, 5, 0, 0, 0}</span></code></pre>
    </div>
    <div class="info">
      La forma civilitzada de «canviar la grandària» (que és fixa): en crees un de nou i copies.
    </div>
  </div>
</div>

---
---

## Comparar: == vs Arrays.equals

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Comparar.java</span>
      </div>
      <pre><code><span class="type">int</span>[] a = {1, 2, 3};
<span class="type">int</span>[] b = {1, 2, 3};

System.out.println(a == b);
<span class="comment">// false: són el MATEIX objecte?</span>
System.out.println(
    <span class="type">Arrays</span>.equals(a, b));
<span class="comment">// true: mateix contingut</span></code></pre>
    </div>
  </div>
  <div class="right">
    <div class="comparison-grid">
      <div class="comparison-item bad">
        <p>❌ <code>a == b</code> i <code>a.equals(b)</code></p>
        <p>Comparen <strong>referències</strong>: són el mateix objecte en memòria?</p>
      </div>
      <div class="comparison-item good">
        <p>✅ <code>Arrays.equals(a, b)</code></p>
        <p>Compara el <strong>contingut</strong> element a element. El teu cap t'ho agrairà.</p>
      </div>
    </div>
  </div>
</div>

---
---

## El mapa de la navalla

| Mètode | Què fa | Compte amb |
| ----- | ----- | ----- |
| **`Arrays.toString(arr)`** | Imprimeix l'array llegible | No usar `arr.toString()` |
| **`Arrays.sort(arr)`** | Ordena al lloc | Modifica l'original |
| **`Arrays.binarySearch(arr, v)`** | Busca per índex | Requerix array ordenat |
| **`Arrays.copyOf(arr, n)`** | Nou array amb n elements | Crea còpia, no toca l'original |
| **`Arrays.fill(arr, v)`** | Ompli tot amb v | Servix per a inicialitzar |
| **`Arrays.equals(a, b)`** | Compara contingut | No confondre amb `==` |
| **`Arrays.deepToString(arr2d)`** | Imprimeix arrays 2D | Versió profunda del toString |

<div class="info">
  🕶️ <strong>Don Tip:</strong> <code>binarySearch()</code> sense ordre és com buscar en un diccionari que no està alfabètic: no trobaràs res fiable.
</div>

---
---

## ⭐ Be the Code: la cerca que ho tenia tot

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">BeTheSort.java</span>
      </div>
      <pre><code><span class="keyword">public class</span> <span class="class-name">BeTheSort</span> {
  <span class="keyword">public static void</span> main(<span class="type">String</span>[] args) {
    <span class="type">int</span>[] datos = {42, 17, 8, 99, 3};
    <span class="type">Arrays</span>.sort(datos);
    <span class="type">int</span> indice =
        <span class="type">Arrays</span>.binarySearch(datos, 42);
    <span class="type">System</span>.out.println(indice);
  }
}</code></pre>
    </div>
  </div>
  <div class="right">
    <p><strong>Què imprimix?</strong></p>
    <p>a) 0 &nbsp;·&nbsp; b) 3 &nbsp;·&nbsp; c) 4 &nbsp;·&nbsp; d) 99</p>
    <div class="answer-card">
      <p><strong>L'b.</strong> Després d'ordenar, l'array és <code>{3, 8, 17, 42, 99}</code> i el 42 està a l'índex <strong>3</strong>. Sense ordenar abans, binarySearch podria tornar qualsevol cosa, inclòs un negatiu fals.</p>
    </div>
  </div>
</div>

---
---

## Comprovació ràpida 🧰

<div class="question-card">
  <span class="question-icon">?</span> Què torna <code>Arrays.binarySearch</code> si el valor no està a l'array?
</div>

<div class="question-card">
  <span class="question-icon">?</span> Què fa <code>Arrays.copyOf(arr, 10)</code> si <code>arr</code> té 4 elements?
</div>

<div class="question-card">
  <span class="question-icon">?</span> Per què <code>System.out.println(arr)</code> no imprimix les dades?
</div>

<div class="answer-card">
  <strong>1.</strong> Un número negatiu: «no hi és, però ací aniria». · <strong>2.</strong> Crea un nou array de 10 places amb els 4 valors i la resta a 0: el truc per a «engrandir» un array. · <strong>3.</strong> Imprimix l'adreça de memòria (<code>[I@…</code>): per a vore les dades, <code>Arrays.toString(arr)</code>.
</div>

---
---

## Resum del bloc 1 en 5 frases

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">Un <strong>array</strong> és un aparcament de <strong>grandària fixa</strong>: moltes dades del mateix tipus sota un nom, amb índexs des de <strong>0</strong>.</div>
</div>

<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">Índexs vàlids de <strong>0 a length − 1</strong>: passar-te provoca <code>ArrayIndexOutOfBoundsException</code>. I <code>length</code>, sense parèntesis.</div>
</div>

<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><strong>for clàssic</strong>: llegir i modificar · <strong>for-each</strong>: només lectura. La condició segura: <code>i &lt; length</code>.</div>
</div>

<div class="step">
  <div class="step-number">4</div>
  <div class="step-content">Un array 2D és un <strong>array de arrays</strong>: <code>[fila][columna]</code>, bucles niats i <code>matriz[i].length</code> per a files irregulars.</div>
</div>

<div class="step">
  <div class="step-number">5</div>
  <div class="step-content">La classe <strong>Arrays</strong>: <code>toString</code>, <code>sort</code>, <code>binarySearch</code> (ordenat!), <code>copyOf</code>, <code>fill</code> i <code>equals</code>.</div>
</div>

---
layout: closing
---

---
layout: cover
---

# Unitat 07 — Algorítmica I<br>Bloc 2

## 1r CFGS DAW · Programació

---
---

## En aquesta sessió

### Ordenar com un professional i mesurar sense cronòmetre

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><strong>Ordenació bombolla</strong>: comparar veïns i intercanviar.</div>
</div>

<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><strong>Ordenació per inserció</strong>: la mà de cartes del pòquer.</div>
</div>

<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><strong>Big O</strong>: la taxa de creixement, no el cronòmetre.</div>
</div>

<div class="step">
  <div class="step-number">4</div>
  <div class="step-content"><strong>Triar l'algoritme adequat</strong>: la taula de decisió.</div>
</div>

<div class="step">
  <div class="step-number">5</div>
  <div class="step-content"><strong>Reptes</strong>: binària i bombolla a mà, l'EL LIO i el repàs final.</div>
</div>

<div class="info">
  Necessites el Bloc 1: algoritme, cerca lineal, cerca binària i O(n) vs O(log n).
</div>

---
---

## Ordenació bombolla: els grans pugen

<p>La bombolla compara <strong>parelles veïnes</strong>: si el de l'esquerra és major, els intercanvia. En cada passada, el major restant «puja» al final com una bombolla en una copa.</p>

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <span class="code-card-title">Bombolla.java — el nucli</span>
  </div>
  <pre><code><span class="keyword">for</span> (<span class="type">int</span> i = 0; i &lt; n - 1; i++) {
  <span class="keyword">for</span> (<span class="type">int</span> j = 0; j &lt; n - 1 - i; j++) {
    <span class="keyword">if</span> (array[j] &gt; array[j + 1]) {
      <span class="type">int</span> temp = array[j];
      array[j] = array[j + 1];
      array[j + 1] = temp;
    }
  }
}</code></pre>
</div>

<div class="info">
  Per això el bucle interior arriba només fins a <code>n − 1 − i</code>: després de cada passada, el major dels que queden <strong>ja va quedar col·locat al final</strong>.
</div>

---
---

## La bombolla, dibuixada

<div class="diagram-frame diagram-small">
  <Excalidraw drawFilePath="/diagrams/ud07-prg-bombolla.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<div class="success">
  💡 Primera passada sobre <code>{5, 2, 9, 1}</code>: el 9 — el major — ja és en el seu lloc. Després el 5, després el 2, després l'1.
</div>

---
---

## 🚩 L'optimització del flag

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">El flag hiHaIntercanvi</span>
      </div>
      <pre><code><span class="keyword">boolean</span> hiHaIntercanvi;
<span class="keyword">for</span> (<span class="type">int</span> i = 0; i &lt; n - 1; i++) {
  hiHaIntercanvi = <span class="keyword">false</span>;
  <span class="keyword">for</span> (<span class="type">int</span> j = 0; j &lt; n - 1 - i; j++) {
    <span class="keyword">if</span> (array[j] &gt; array[j + 1]) {
      <span class="comment">// intercanvi...</span>
      hiHaIntercanvi = <span class="keyword">true</span>;
    }
  }
  <span class="keyword">if</span> (!hiHaIntercanvi) <span class="keyword">break</span>;
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="info">
      Si en una passada completa <strong>no intercanviem res</strong>, l'array ja està ordenat: <code>break</code> i fora.
    </div>
    <div class="success">
      No millora el pitjor cas (array invertit), però converteix el <strong>millor cas en O(n)</strong>: una sola passada de comprovació.
    </div>
    <div class="warning">
      🕶️ <strong>Don Tip:</strong> el patró del flag («marca si ha passat alguna cosa; si no, para») apareix en moltíssims algoritmes reals. T' farà semblar sènior encara que només portes quatre unitats.
    </div>
  </div>
</div>

---
---

## Per què la bombolla és tan lenta?

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Dos bucles anidats</span>
      </div>
      <pre><code><span class="keyword">for</span> (<span class="type">int</span> i = 0; i &lt; n; i++) {
  <span class="keyword">for</span> (<span class="type">int</span> j = 0; j &lt; n; j++) {
    <span class="comment">// n × n = n² operacions</span>
  }
}</code></pre>
    </div>
  </div>
  <div class="right">
    | Mida | Operacions ~ |
    | ----- | ----- |
    | 10 elements | 100 (bé) |
    | 1.000 elements | 1.000.000 (comença a doldre) |
    | 1.000.000 elements | 10¹² (el PC demana la jubilació) |
  </div>
</div>

<div class="warning">
  💡 La bombolla només s'usa en dos casos: (1) estàs aprenent, i (2) l'array tindrà <strong>menys de ~50 elements</strong>. Per a tot lo demés, la U08.
</div>

---
---

## ⭐ Be the Code: la bombolla curta

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">BombollaCurta.java</span>
        <span class="code-card-badge">🧠</span>
      </div>
      <pre><code><span class="type">int</span>[] dades = {3, 1, 2};

<span class="keyword">for</span> (<span class="type">int</span> i = 0; i &lt; 2; i++) {
  <span class="keyword">for</span> (<span class="type">int</span> j = 0;
       j &lt; dades.length - 1 - i; j++) {
    <span class="keyword">if</span> (dades[j] &gt; dades[j + 1]) {
      <span class="type">int</span> temp = dades[j];
      dades[j] = dades[j + 1];
      dades[j + 1] = temp;
    }
  }
}
<span class="comment">// imprimitx les dades</span></code></pre>
    </div>
  </div>
  <div class="right">
    <p><strong>Sense executar: què imprimix?</strong></p>
    <p>a) 3 1 2 · b) 1 2 3 · c) 1 3 2 · d) 2 1 3</p>
    <div class="answer-card">
      <p><strong>El b.</strong> Passada 1: 3↔1 → <code>1 3 2</code>; 3↔2 → <code>1 2 3</code>. Passada 2: 1↔2 → res. Eixida: <code>1 2 3</code>.</p>
      <p>Este codi no té flag: en un array ja ordenat de 1.000 elements faria totes les passades igualment. Ahí guanya la versió amb <code>break</code>.</p>
    </div>
  </div>
</div>

---
---

## Ordenació per inserció: la mà de cartes

<p>Com ordenes cartes al pòquer? No ho tires tot i comences de zero: vas col·locant cada <strong>carta nova en el seu buit</strong> dins de la mà que ja tens ordenada. Doncs això, però en Java.</p>

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <span class="code-card-title">Insercio.java — el nucli</span>
  </div>
  <pre><code><span class="keyword">for</span> (<span class="type">int</span> i = 1; i &lt; array.length; i++) {
  <span class="type">int</span> clau = array[i];  <span class="comment">// la carta nova</span>
  <span class="type">int</span> j = i - 1;
  <span class="keyword">while</span> (j &gt;= 0 &amp;&amp; array[j] &gt; clau) {
    array[j + 1] = array[j];  <span class="comment">// desplaça</span>
    j--;
  }
  array[j + 1] = clau;  <span class="comment">// cau en el seu buit</span>
}</code></pre>
</div>

<div class="info">
  La «mà» (l'esquerra de la barra) <strong>sempre està ordenada</strong>; la resta de l'array espera el seu torn.
</div>

---
---

## La mà de cartes, dibuixada

<div class="diagram-frame diagram-small">
  <Excalidraw drawFilePath="/diagrams/ud07-prg-insercio.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<div class="success">
  💡 Cada element nou s'<strong>inserta</strong> en el seu lloc. D'ací el nom. Amb {9, 5, 1, 4, 3}: la mà creix <code>[9]</code> → <code>[5 9]</code> → <code>[1 5 9]</code> → <code>[1 4 5 9]</code> → <code>[1 3 4 5 9]</code>.
</div>

---
---

## Quan és bona la inserció?

| Propietat | Valor |
| ----- | ----- |
| **Pitjor cas** (array invertit) | O(n²): cada element viatja fins al principi |
| **Millor cas** (quasi ordenat) | **O(n)**: una passada de comprovació |
| **Estable?** | Sí: manté l'ordre relatiu dels iguals |
| **Memòria extra?** | No: ordena **in-place** |

<div class="info">
  En la pràctica, és <strong>més ràpida que la bombolla</strong> encara que totes dos siguen O(n²). De fet, s'usa com a pas final en <strong>TimSort</strong>, l'algoritme que Java usa per defecte en les seues col·leccions.
</div>

<div class="warning">
  🕶️ <strong>Don Tip:</strong> la inserció és la reina de les dades <strong>quasi ordenades</strong>. Si el teu array té 100 elements i només un parell de despistats, la inserció et sorprendrà.
</div>

---
---

## Comprovació ràpida 🫧

<div class="question-card">
  <span class="question-icon">?</span> Per què el bucle interior de la bombolla arriba fins a n − 1 − i?
</div>

<div class="question-card">
  <span class="question-icon">?</span> Què fa la variable hiHaIntercanvi?
</div>

<div class="question-card">
  <span class="question-icon">?</span> Bombolla vs inserció: quina diferència hi ha en la manera d'ordenar?
</div>

<div class="answer-card">
  <strong>1.</strong> Després de cada passada, el major restant ja va quedar col·locat al final: no cal tornar-lo a mirar. · <strong>2.</strong> Detecta si hi va haver intercanvis; si no n'hi va haver cap, fa <code>break</code> perquè l'array ja està ordenat. · <strong>3.</strong> La bombolla <strong>intercanvia veïns</strong>; la inserció <strong>col·loca cada element en el seu lloc</strong> desplaçant els majors.
</div>

---
class: compact-slide
---

## Big O: la tendència, no el cronòmetre

<p>Big O no et diu quants segons tarda un algoritme: et diu <strong>com creix el seu temps quan creixen les dades</strong>. Dos ordinadors poden executar el mateix codi a velocitats diferents — però l'algoritme mana.</p>

<div class="diagram-frame diagram-small">
  <Excalidraw drawFilePath="/diagrams/ud07-prg-bigo.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<div class="warning">
  La diferència entre O(n) i O(n²) amb dades grans és la diferència entre «faig un cafè mentre carrega» i «em jubile abans que acabe».
</div>

---
---

## Big O en codi: les tres habituals

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">ExemplesComplexitat.java</span>
      </div>
      <pre><code><span class="comment">// O(1) — CONSTANT</span>
<span class="keyword">public static int</span> primer(<span class="type">int</span>[] a) {
  <span class="keyword">return</span> a[0];  <span class="comment">// un pas, sempre</span>
}

<span class="comment">// O(n) — LINEAL</span>
<span class="keyword">public static int</span> sumar(<span class="type">int</span>[] a) {
  <span class="type">int</span> s = 0;
  <span class="keyword">for</span> (<span class="type">int</span> x : a) { s += x; }
  <span class="keyword">return</span> s;     <span class="comment">// n passos</span>
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">O(n²) — QUADRÀTICA</span>
      </div>
      <pre><code><span class="keyword">public static void</span> parells(<span class="type">int</span>[] a) {
  <span class="keyword">for</span> (<span class="type">int</span> i = 0; i &lt; a.length; i++) {
    <span class="keyword">for</span> (<span class="type">int</span> j = 0; j &lt; a.length; j++) {
      <span class="type">System</span>.out.println(a[i]
          + <span class="string">", "</span> + a[j]);
    }
  }
}</code></pre>
    </div>
    <div class="success">
      💡 <strong>Regla del polze:</strong> un bucle sol → O(n). Un bucle dins d'un altre → O(n²).
    </div>
  </div>
</div>

---
---

## Les 4 regles d'or de Big O

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><strong>Ignora les constants</strong>: O(2n) és el mateix que O(n). El 2 no importa quan n tendix a l'infinit.</div>
</div>

<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><strong>Queda't amb el terme dominant</strong>: O(n² + 5n + 1) → O(n²). El n² es menja la resta.</div>
</div>

<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><strong>Bucles anidats multipliquen</strong>: un dins d'un altre → n × n → O(n²).</div>
</div>

<div class="step">
  <div class="step-number">4</div>
  <div class="step-content"><strong>Bucles seqüencials sumen</strong>: un i després un altre → O(n + n) → O(2n) → O(n).</div>
</div>

<div class="info">
  📝 Big O descriu el <strong>pitjor cas</strong> (la cota superior). Existixen Big Ω (millor cas) i Big Θ (cas mitjà), però amb Big O tens de sobres. I per a aprovar, també.
</div>

---
---

## ⭐ Be the Code: l'analista de complexitats

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Analisi.java</span>
        <span class="code-card-badge">🧠</span>
      </div>
      <pre><code><span class="comment">// mètode A</span>
<span class="keyword">for</span> (<span class="type">int</span> i = 0; i &lt; a.length; i++) { ... }
<span class="keyword">for</span> (<span class="type">int</span> i = 0; i &lt; a.length; i++) { ... }

<span class="comment">// mètode B</span>
<span class="keyword">for</span> (<span class="type">int</span> i = 0; i &lt; a.length; i++) {
  <span class="keyword">for</span> (<span class="type">int</span> j = 0; j &lt; a.length; j++) {
    <span class="type">System</span>.out.println(a[i] + <span class="string">" "</span> + a[j]);
  }
}

<span class="comment">// mètode C</span>
<span class="keyword">return</span> a[a.length - 1];</code></pre>
    </div>
  </div>
  <div class="right">
    <p><strong>Quina és la complexitat de cada mètode?</strong></p>
    <div class="answer-card">
      <p><strong>A → O(n):</strong> dos bucles <strong>seqüencials</strong> sumen: O(n + n) = O(2n) = O(n).</p>
      <p><strong>B → O(n²):</strong> dos bucles <strong>anidats</strong> multipliquen: n × n.</p>
      <p><strong>C → O(1):</strong> accés directe per índex, sense bucles.</p>
    </div>
  </div>
</div>

---
---

## Comprovació ràpida 📈

<div class="question-card">
  <span class="question-icon">?</span> Què mesura exactament Big O?
</div>

<div class="question-card">
  <span class="question-icon">?</span> Ordena de menor a major: O(1), O(n²), O(n), O(log n), O(2ⁿ).
</div>

<div class="question-card">
  <span class="question-icon">?</span> O(2n) i O(n) són el mateix?
</div>

<div class="answer-card">
  <strong>1.</strong> La <strong>taxa de creixement</strong> del temps quan creix n, no els segons exactes. · <strong>2.</strong> <code>O(1) &lt; O(log n) &lt; O(n) &lt; O(n²) &lt; O(2ⁿ)</code>. · <strong>3.</strong> <strong>Sí</strong>: les constants s'ignoren.
</div>

---
---

## Triar l'algoritme adequat

| Algoritme | Complexitat | Quan usar-lo? | Quan NO? |
| ----- | ----- | ----- | ----- |
| Cerca lineal | O(n) | Arrays xicotets o desordenats | Arrays grans i ordenats |
| Cerca binària | O(log n) | Arrays grans **ordenats**, moltes cerques | Arrays desordenats (escombraria!) |
| Bombolla | O(n²) | Aprendre; arrays &lt; 50 | Qualsevol cosa seriosa |
| Inserció | O(n²) / O(n) | Arrays xicotets o **quasi ordenats** | Arrays grans i desordenats |

<div class="info">
  Per a obrir una nou faries servir una excavadora? Hi ha qui clava una cerca binària en un array de 5 elements, i qui ordena un milió de dades amb bombolla. Els dos estan malament.
</div>

---
---

## La pregunta clau: ordenar abans de buscar?

<div class="comparison-grid">
  <div class="comparison-item good">
    <p>✅ <strong>Ordenes una vegada i busques moltes</strong></p>
    <p>Ordena amb alguna cosa decent i després usa binària: la inversió <strong>s'amortitza</strong> amb cada consulta.</p>
  </div>
  <div class="comparison-item bad">
    <p>❌ <strong>Busques una sola vegada</strong> en un array desordenat</p>
    <p>Cerca lineal directa. Ordenar només per a una cerca és <strong>regar el jardí amb xampany</strong>.</p>
  </div>
</div>

<div class="info">
  Curiositat: en arrays <strong>molt xicotets</strong> (&lt; ~50), la lineal sol guanyar fins i tot amb dades ordenades: la sobrecàrrega de la binària no compensa. La teoria importa, però el <strong>context mana</strong>.
</div>

---
---

## Regles d'or per a decidir

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">És <strong>xicotet</strong> (&lt; 50)? → Qualsevol val: lineal o inserció per simplicitat.</div>
</div>

<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">És <strong>gran i desordenat</strong>? → Ni bombolla ni inserció. Espera a la U08 (QuickSort, MergeSort).</div>
</div>

<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">És <strong>gran i ordenat</strong>? → Cerca binària, sense pensar-ho.</div>
</div>

<div class="step">
  <div class="step-number">4</div>
  <div class="step-content">Està <strong>quasi ordenat</strong>? → Inserció arrasa: O(n) en la pràctica.</div>
</div>

<div class="step">
  <div class="step-number">5</div>
  <div class="step-content"><strong>Vaig a buscar moltes voltes</strong>? → Ordena bé una vegada i busca amb binària. Una sola? Lineal directa.</div>
</div>

---
---

## 🧩 REPTE 1: binària a mà, sense mirar

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">RepBbinaria.java</span>
        <span class="code-card-badge">🧠</span>
      </div>
      <pre><code><span class="keyword">public static int</span> cercaBinaria(
    <span class="type">int</span>[] array, <span class="type">int</span> objectiu) {
  <span class="comment">// 🧠 EL TEU CODI ACÍ</span>
  <span class="keyword">return</span> -1;
}
<span class="comment">// proves = {1,3,5,7,9,11,13,15,17,19}</span>
<span class="comment">// cercaBinaria(proves, 7)  → 3</span>
<span class="comment">// cercaBinaria(proves, 8)  → -1</span>
<span class="comment">// cercaBinaria(proves, 19) → 9</span>
<span class="comment">// cercaBinaria(new int[]{}, 5) → -1</span></code></pre>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">Declara <code>esquerra</code> i <code>dreta</code>.</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">Escriu el <code>while</code> amb la condició correcta.</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content">Calcula el <code>mig</code> anti-desbordament.</div>
    </div>
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content">Els tres casos: trobat / major / menor.</div>
    </div>
    <div class="step">
      <div class="step-number">5</div>
      <div class="step-content">Fora del bucle: torna el «no trobat».</div>
    </div>
  </div>
</div>

---
class: compact-slide
---

## ✅ Solució del repte 1

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <span class="code-card-title">cercaBinaria — solució</span>
  </div>
  <pre><code><span class="keyword">public static int</span> cercaBinaria(<span class="type">int</span>[] array, <span class="type">int</span> objectiu) {
  <span class="type">int</span> esquerra = 0;
  <span class="type">int</span> dreta = array.length - 1;
  <span class="keyword">while</span> (esquerra &lt;= dreta) {
    <span class="type">int</span> mig = esquerra + (dreta - esquerra) / 2;
    <span class="keyword">if</span> (array[mig] == objectiu) {
      <span class="keyword">return</span> mig;
    } <span class="keyword">else if</span> (array[mig] &lt; objectiu) {
      esquerra = mig + 1;
    } <span class="keyword">else</span> {
      dreta = mig - 1;
    }
  }
  <span class="keyword">return</span> -1;
}</code></pre>
</div>

<div class="warning">
  <strong>L'error més comú (fins i tot amb 10 anys d'experiència):</strong> l'off-by-one. ¿<code>&lt;=</code> o <code>&lt;</code>? ¿<code>mig + 1</code> o <code>mig</code>? La resposta: <code>&lt;=</code> en la condició, i <code>mig + 1</code> / <code>mig − 1</code> en moure els punters. Sense ells, bucle infinit.
</div>

---
---

## 🧩 EL LÍO: la bombolla que apesta

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">BombollaLiosa.java</span>
        <span class="code-card-badge">👹</span>
      </div>
      <pre><code><span class="keyword">public static void</span> ordenar(<span class="type">int</span>[] arr) {
  <span class="keyword">for</span> (<span class="type">int</span> i = 0; i &lt; arr.length; i++) {
    <span class="keyword">for</span> (<span class="type">int</span> j = 0; j &lt; arr.length; j++) {
      <span class="keyword">if</span> (arr[j] &gt; arr[j + 1]) {
        <span class="type">int</span> temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}</code></pre>
    </div>
  </div>
  <div class="right">
    <p><strong>El departament de qualitat diu que fa mala olor. Quins errors trobes?</strong></p>
    <div class="answer-card">
      <p><strong>1. Error d'índexs:</strong> el bucle interior va fins a <code>j &lt; arr.length</code>; quan <code>j = arr.length − 1</code>, accedix a <code>arr[j + 1] = arr[arr.length]</code>, que no existix → <code>ArrayIndexOutOfBoundsException</code>. Ha d'arribar fins a <code>arr.length − 1 − i</code>.</p>
      <p><strong>2. Rendiment:</strong> sense aprofitar que cada passada col·loca un element al final, i sense el flag <code>hiHaIntercanvi</code>: bombolla «sense polir».</p>
    </div>
  </div>
</div>

---
class: compact-slide
---

## 🕵️ Repàs: qui soc?

<div class="two-cols">
  <div class="left">
    <div class="question-card">
      <span class="question-icon">1</span> Sóc una recepta per a l'ordinador: finita, precisa i sense ambigüitats.
    </div>
    <div class="question-card">
      <span class="question-icon">2</span> Recórrec l'array un a un. No exigisc ordre, però soc lenta amb dades grans.
    </div>
    <div class="question-card">
      <span class="question-icon">3</span> Obric el diccionari per la meitat i descarte mitja llibre en cada intent.
    </div>
  </div>
  <div class="right">
    <div class="question-card">
      <span class="question-icon">4</span> Compare veïns i intercanvie: els grans pugen com bombolles.
    </div>
    <div class="question-card">
      <span class="question-icon">5</span> Ordene com en el pòquer: cada carta nova en el seu buit.
    </div>
    <div class="question-card">
      <span class="question-icon">6</span> No mesure segons: mesure com creix el temps quan creixen les dades.
  </div>
</div>

<div class="answer-card">
  1. L'algoritme · 2. La cerca lineal · 3. La cerca binària · 4. La bombolla · 5. La inserció · 6. La notació Big O
</div>

---
class: compact-slide
---

## 🎮 Repàs: el joc de les decisions

<div class="two-cols">
  <div class="left">
    <div class="question-card">
      <span class="question-icon">1</span> Complexitat de la cerca binària? — a) O(n) · b) O(log n) · c) O(1)
    </div>
    <div class="question-card">
      <span class="question-icon">2</span> Passos màxims amb 1.024 elements? — a) 10 · b) 1.024 · c) 11
    </div>
    <div class="question-card">
      <span class="question-icon">3</span> <code>buscar(new int[]{}, 5)</code> ben feta? — a) −1 · b) 0 · c) Excepció
    </div>
  </div>
  <div class="right">
    <div class="question-card">
      <span class="question-icon">4</span> Quina és O(n²)? — a) Bucle seqüencial · b) Dos anidats · c) <code>a[0]</code>
    </div>
    <div class="question-card">
      <span class="question-icon">5</span> Un algoritme O(n²) tarda 1 s amb 1.000 elements. Amb 2.000? — a) 2 s · b) 4 s · c) 1 s
    </div>
  </div>
</div>

<div class="answer-card">
  1. <strong>b</strong> — O(log n): descarta la meitat en cada pas · 2. <strong>a</strong> — 10: log₂(1.024) = 10 · 3. <strong>a</strong> — −1: el while ni entra (0 &lt;= −1 és false) · 4. <strong>b</strong> — anidats multipliquen · 5. <strong>b</strong> — el doble de dades quadruplica: n²
</div>

---
class: compact-slide
---

## 💬 Preguntes d'entrevista de treball 💼

<div class="two-cols">
  <div class="left">
    <div class="question-card">
      <span class="question-icon">1</span> «Explica'm, com si jo fóra la teua àvia, la diferència entre <strong>cerca lineal i binària</strong>.»
    </div>
    <div class="question-card">
      <span class="question-icon">2</span> «Què és la notació <strong>Big O</strong> i per què importa?»
    </div>
    <div class="question-card">
      <span class="question-icon">3</span> «Escriu una <strong>cerca binària a la pissarra</strong>. Ara digues què passa si l'array no està ordenat.»
    </div>
  </div>
  <div class="right">
    <div class="question-card">
      <span class="question-icon">4</span> «Quan usaríes la <strong>inserció</strong> en comptes de la bombolla?»
    </div>
    <div class="question-card">
      <span class="question-icon">5</span> «Què és l'<strong>off-by-one</strong> i com l'evites en la binària?»
    </div>
    <div class="question-card">
      <span class="question-icon">6</span> «Un O(n²) tarda 1 s amb 1.000 elements. Quant tardarà amb <strong>10.000</strong>?»
    </div>
  </div>
</div>

<div class="info">
  Preguntes reals per a un programador Java júnior. Si saps respondre les sis, la unitat està apresa — i pots dir «O(n²) → 100 segons» sense parpadar.
</div>

---
class: compact-slide
---

## 🤷 No hi ha preguntes tontes

<div class="two-cols">
  <div class="left">
    <div class="question-card">
      <p><strong>❓ Puc usar Arrays.sort() i Arrays.binarySearch()?</strong></p>
      <p>En programes reals, sí. Ací l'objectiu és <strong>entendre la idea</strong> de davall: com sumar a mà abans d'usar la calculadora. En una entrevista volen veure que ho entens, no que saps importar <code>java.util.Arrays</code>.</p>
    </div>
    <div class="question-card">
      <p><strong>❓ Per què «log n» i no «pocs passos»?</strong></p>
      <p>Perquè «pocs» no servix per a comparar. El log₂ et diu quantes voltes pots partir entre 2 abans d'arribar a 1. La precisió és el sou del programador.</p>
    </div>
  </div>
  <div class="right">
    <div class="question-card">
      <p><strong>❓ Si són totes dos O(n²), per què la inserció és millor?</strong></p>
      <p>Fa <strong>menys intercanvis</strong> (desplaça) i en arrays <strong>quasi ordenats és O(n)</strong> de veritat. La bombolla sense flag fa passades senceres vinga o no vinga.</p>
    </div>
    <div class="question-card">
      <p><strong>❓ V o F: «la binària funciona amb qualsevol array, només que a voltes és lenta».</strong></p>
      <p><strong>Fals.</strong> Amb un array desordenat retorna <strong>resultats incorrectes sense avisar</strong>. No hi ha error: hi ha escombraria silenciosa.</p>
    </div>
  </div>
</div>

---
---

## Resum del bloc 2 en 5 frases

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">La <strong>bombolla</strong> compara veïns i intercanvia: O(n²), el flag <code>hiHaIntercanvi</code> fa el millor cas O(n).</div>
</div>

<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">La <strong>inserció</strong> col·loca cada element com una carta en la mà ordenada: O(n) amb quasi ordenats, estable i in-place.</div>
</div>

<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><strong>Big O</strong> mesura la taxa de creixement: constants fora, terme dominant es queda, <strong>anidar multiplica i seqüenciar suma</strong>.</div>
</div>

<div class="step">
  <div class="step-number">4</div>
  <div class="step-content">Triar bé és la mitat de la faena: <strong>mida, ordre inicial i freqüència</strong> de les cerques decideixen.</div>
</div>

<div class="step">
  <div class="step-number">5</div>
  <div class="step-content">Binària i bombolla <strong>a mà</strong>: dos punters i els +1/−1 sagrats; dos bucles, intercanvi amb <code>temp</code> i flag.</div>
</div>

---
layout: closing
---

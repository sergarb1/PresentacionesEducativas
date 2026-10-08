---
layout: cover
---

# Unitat 07 — Algorítmica I<br>Bloc 1

## 1r CFGS DAW · Programació

---
---

## En aquesta sessió

### De la recepta de cuina al codi que busca en un milió de dades

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">Què és un <strong>algoritme</strong>: la recepta, les propietats i la idea vs. el codi.</div>
</div>

<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><strong>Cerca lineal</strong>: un a un, sense dreceres. Índex o −1.</div>
</div>

<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><strong>Cerca binària</strong>: obrir el diccionari per la meitat.</div>
</div>

<div class="step">
  <div class="step-number">4</div>
  <div class="step-content">Traçar la binària: <strong>esquerra, dreta, mig</strong> — i el +1/−1 sagrats.</div>
</div>

<div class="step">
  <div class="step-number">5</div>
  <div class="step-content">Reptes <strong>Be the Code</strong> i primer contacte amb O(n) vs O(log n).</div>
</div>

<div class="info">
  El Bloc 2 porta les <strong>ordenacions</strong> (bombolla, inserció), <strong>Big O</strong> com ho escoltaràs a examen i el gimnàs de reptes.
</div>

---
---

## Què és un algoritme: la recepta de l'ordinador

<p>Un algoritme és una <strong>seqüència finita, ordenada i sense ambigüitats</strong> de passos que resol un problema. Com una recepta de truita de creïlles:</p>

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">Pelar les creïlles i tallar-les a rodanxes.</div>
</div>

<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">Fregir-les amb oli abundant.</div>
</div>

<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">Batre els ous, barrejar-ho tot i quallar.</div>
</div>

<div class="warning">
  <strong>«Posa sal al gust» no val com a pas:</strong> quant és «al gust»? Un pessic? Un grapat? Un algoritme de veritat <strong>no deixa espai a la interpretació</strong>: mateixa entrada → sempre mateixa eixida.
</div>

---
---

## La recepta, dibuixada

<div class="diagram-frame diagram-small">
  <Excalidraw drawFilePath="/diagrams/ud07-prg-algoritme.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<div class="info">
  Cada pas és <strong>precís i determinista</strong>. El pas ambigu (sal «al gust») es queda fora: és la diferència entre una recepta i una tora.
</div>

---
---

## Les 5 propietats d'un algoritme

| # | Propietat | Què exigeix |
| ----- | ----- | ----- |
| 1 | **Finit** | Ha d'acabar. Si s'executa per sempre, és un malson, no un algoritme |
| 2 | **Precís** | Cada pas definit sense ambigüitat: res de «al gust» ni «quan estiga llest» |
| 3 | **Entrada** | Rep zero o més valors d'entrada |
| 4 | **Eixida** | Produïx almenys un valor d'eixida |
| 5 | **Eficaç** | Resol el problema en temps finit i de manera correcta |

<div class="info">
  📝 <strong>Nota històrica:</strong> «algoritme» ve del matemàtic persa <strong>Al-Juarismi</strong> (segle IX). Segles després, els informàtics li vam robar la paraula. Som així.
</div>

---
---

## La idea vs. el codi

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">AlgoritmeSimple.java</span>
      </div>
      <pre><code><span class="keyword">public class</span> <span class="class-name">AlgoritmeSimple</span> {
  <span class="keyword">public static void</span> main(<span class="type">String</span>[] args) {
    <span class="type">int</span> a = 5;
    <span class="type">int</span> b = 3;
    <span class="type">int</span> resultat = a + b;
    <span class="comment">// la idea: sumar.</span>
    <span class="comment">// el codi: la materialització</span>
    <span class="type">System</span>.out.println(resultat);
  }
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="warning">
      <strong>No tot codi és un algoritme.</strong> L'algoritme és la <em>idea</em>: la seqüència de passos. El codi és la seua <em>materialització</em> en un llenguatge concret.
    </div>
    <div class="success">
      💡 El mateix algoritme s'escriu igual de bé en Java, en Python o en ensamblador: són les receptes, i Java només és una de les teues cuines.
    </div>
  </div>
</div>

---
---

## Les dues grans famílies

<div class="features-grid">
  <div class="feature-item">
    <span class="feature-icon">🔍</span>
    <strong>Cerca</strong><br>
    Trobar un element dins d'un conjunt de dades: «el 23 és en este array?»
  </div>
  <div class="feature-item">
    <span class="feature-icon">📊</span>
    <strong>Ordenació</strong><br>
    Posar les dades en un ordre determinat: «deixa este array de menor a major»
  </div>
</div>

<div class="info">
  Són les dues habilitats bàsiques de qualsevol programa que maneja dades: llistes de reproducció, bases de dades, cercadors. Sense ordenar ni buscar, la teua app és un calaix desordenat on les coses només estan «per ací».
</div>

---
---

## ⭐ Be the Code: la truita ordenada

<div class="question-card">
  <span class="question-icon">?</span> Estes passos de recepta estan desordenats. Ordena'ls i digues quina propietat de l'algoritme falla en l'ordre original:
</div>

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">Batre els ous.</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">Menjar la truita.</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content">Posar sal «al gust».</div>
    </div>
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content">Fregir les creïlles.</div>
    </div>
    <div class="step">
      <div class="step-number">5</div>
      <div class="step-content">Pelar i tallar les creïlles.</div>
    </div>
    <div class="step">
      <div class="step-number">6</div>
      <div class="step-content">Barrejar amb l'ou i quallar.</div>
    </div>
  </div>
  <div class="right">
    <div class="answer-card">
      <p><strong>Ordre correcte:</strong> 5 → 4 → 1 → 6 → 2 (el 3 sobra).</p>
      <p><strong>Falla la precisió:</strong> «posar sal al gust» és ambigu — cada persona interpretaria una quantitat diferent. La recepta no tindria una única manera correcta d'executar-se.</p>
    </div>
  </div>
</div>

---
---

## Comprovació ràpida 🍳

<div class="question-card">
  <span class="question-icon">?</span> Quina és la diferència entre un algoritme i un programa?
</div>

<div class="question-card">
  <span class="question-icon">?</span> Un algoritme pot rebre zero entrades?
</div>

<div class="question-card">
  <span class="question-icon">?</span> Què passaria si un algoritme mai no acabara?
</div>

<div class="answer-card">
  <strong>1.</strong> L'algoritme és la <strong>idea</strong>; el programa, la seua <strong>materialització</strong> en un llenguatge. · <strong>2.</strong> Sí: «imprimeix els nombres de l'1 al 10» no necesita cap entrada. · <strong>3.</strong> Deixaria de ser un algoritme: incompleix la propietat de ser <strong>finit</strong>.
</div>

---
---

## Cerca lineal: la sabatilla perduda

<p>La cerca lineal recorre l'array <strong>element per element</strong> fins a trobar l'objectiu o comprovar que no hi és. Com buscar la sabatilla: davall del llit, darrere de la porta, en l'armari…</p>

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <span class="code-card-title">CercaLinial.java</span>
  </div>
  <pre><code><span class="keyword">public static int</span> buscar(<span class="type">int</span>[] array, <span class="type">int</span> objectiu) {
  <span class="keyword">for</span> (<span class="type">int</span> i = 0; i &lt; array.length; i++) {
    <span class="keyword">if</span> (array[i] == objectiu) {
      <span class="keyword">return</span> i; <span class="comment">// trobat! la posició</span>
    }
  }
  <span class="keyword">return</span> -1; <span class="comment">// l'índex impossible: no hi és</span>
}</code></pre>
</div>

<div class="success">
  💡 <strong>−1</strong> és la convenció clàssica de «no trobat». Mai 0: la posició 0 és vàlida i diferent de «no hi és» — el clàssic «bug de l'índex zero».
</div>

---
---

## ⭐ Be the Code: el cercador que es perd

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Cerca2.java</span>
        <span class="code-card-badge">🧠</span>
      </div>
      <pre><code><span class="keyword">int</span>[] dades = {3, 8, 1, 9, 5, 2};
<span class="type">int</span> passos = 0;
<span class="keyword">for</span> (<span class="type">int</span> i = 0; i &lt; dades.length; i++) {
  passos++;
  <span class="keyword">if</span> (dades[i] == 9) {
    <span class="type">System</span>.out.println(
        <span class="string">"Passos: "</span> + passos);
    <span class="keyword">return</span> i;
  }
}
<span class="comment">// si acaba: return -1</span></code></pre>
    </div>
  </div>
  <div class="right">
    <p><strong>Sense executar: quantes comparacions fa i què imprimix?</strong></p>
    <div class="answer-card">
      <p>Compara <strong>3, 8, 1, 9</strong> → trobat al 4t pas.</p>
      <p>Eixida: <code>He necessitat 4 passos.</code> · <code>Posició: 3</code></p>
      <p>El <code>return</code> talla el mètode tan bon punt troba: el bucle <strong>no</strong> recorre tot l'array.</p>
    </div>
  </div>
</div>

---
---

## Com de ràpida és la cerca lineal?

| Cas | Quants passos |
| ----- | ----- |
| **Millor cas** — l'element és el primer | 1 sol pas |
| **Pitjor cas** — és l'últim o no existix | recorres els **n** elements sencers |

<div class="info">
  Complexitat <strong>O(n), lineal</strong>: 10 elements → ~10 passos; 10.000 elements → ~10.000 passos. Creix al mateix ritme que les dades.
</div>

<div class="warning">
  🕶️ <strong>Don Tip:</strong> la cerca lineal és com buscar en la teua nevera: si és xicoteta, tant li fa el mètode. Però amb un magatzem de 10.000 productes necessites alguna cosa millor… i en la pròxima diapositiva la trobes.
</div>

---
---

## Cerca binària: obrir el diccionari per la meitat

<p>Buscar una paraula al diccionari: no comences a la pàgina 1. Obres per la meitat, veus si la paraula va abans o després, i <strong>descartes mitja llibre en un gest</strong>. I repetix.</p>

<div class="warning">
  ⚠️ <strong>El requisit imprescindible: l'array ha d'estar ordenat.</strong> Si no, el mètode no funciona — i el pitjor de tot: <strong>no t'avisa</strong>. No hi ha error ni excepció: simplement obtens la resposta equivocada.
</div>

<div class="info">
  És com buscar «berenar» en un diccionari amb les paraules a l'atzar: obrir per la meitat no et servix de res.
</div>

---
---

## Les dues cerques, dibuixades

<div class="diagram-frame diagram-small">
  <Excalidraw drawFilePath="/diagrams/ud07-prg-cerca-lineal-binaria.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<div class="info">
  <strong>Lineal</strong>: un a un, sense dreceres, funciona sempre · <strong>Binària</strong>: partir per la meitat, exigix ordre. Amb un milió d'elements: 1.000.000 passos vs <strong>20</strong>.
</div>

---
---

## L'algoritme de la cerca binària

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <span class="code-card-title">CercaBinaria.java</span>
    <span class="code-card-badge">⭐</span>
  </div>
  <pre><code><span class="keyword">public static int</span> buscar(<span class="type">int</span>[] array, <span class="type">int</span> objectiu) {
  <span class="type">int</span> esquerra = 0;
  <span class="type">int</span> dreta = array.length - 1;
  <span class="comment">// dos punters</span>
  <span class="keyword">while</span> (esquerra &lt;= dreta) {
    <span class="type">int</span> mig = esquerra + (dreta - esquerra) / 2;
    <span class="keyword">if</span> (array[mig] == objectiu) {
      <span class="keyword">return</span> mig;              <span class="comment">// bingo!</span>
    } <span class="keyword">else if</span> (array[mig] &lt; objectiu) {
      esquerra = mig + 1;      <span class="comment">// descarta l'esquerra</span>
    } <span class="keyword">else</span> {
      dreta = mig - 1;         <span class="comment">// descarta la dreta</span>
    }
  }
  <span class="keyword">return</span> -1;                   <span class="comment">// no trobat</span>
}</code></pre>
</div>

<div class="warning">
  El <strong>+1</strong> i el <strong>−1</strong> són sagrats: sense ells, el bucle es pot quedar donant voltes per sempre. I la condició és <code>&lt;=</code>, no <code>&lt;</code>.
</div>

---
---

## Traçant la cerca del 31

<p>Array ordenat de 12 elements: <code>{2, 5, 8, 12, 19, 24, 31, 37, 42, 50, 58, 63}</code></p>

| Volta | esquerra | dreta | mig | array[mig] | Què passa? |
| ----- | ----- | ----- | ----- | ----- | ----- |
| 1 | 0 | 11 | 5 | 24 | 24 &lt; 31 → `esquerra = 6` |
| 2 | 6 | 11 | 8 | 42 | 42 &gt; 31 → `dreta = 7` |
| 3 | 6 | 7 | 6 | **31** | **Bingo!** → retorna 6 |

<div class="success">
  💡 <strong>Tres comparacions.</strong> La cerca lineal n'hauria necessitat set. I amb un milió d'elements la diferència és escandalosa: 20 passos vs un milió.
</div>

---
---

## Per què esquerra + (dreta − esquerra) / 2?

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">La fórmula anti-desbordament</span>
      </div>
      <pre><code><span class="comment">// ⚠️ (esquerra + dreta) / 2:</span>
<span class="comment">// amb arrays gegants, la suma</span>
<span class="comment">// pot desbordar l'int i fer-se</span>
<span class="comment">// negativa de sobte</span>
<span class="comment">// ✅ la fórmula segura:</span>
<span class="type">int</span> mig =
    esquerra + (dreta - esquerra) / 2;</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="warning">
      Si l'array té a prop de <code>Integer.MAX_VALUE</code> elements, <code>esquerra + dreta</code> <strong>desborda</strong>: el resultat ja no cap en un int.
    </div>
    <div class="info">
      ⚠️ Este bug és tan famós que va aparéixer en la biblioteca original de Java. Du anys col·leccionant trofeus: Bug de l'any, Bug de la dècada, Bug favorit del públic…
    </div>
  </div>
</div>

---
---

## O(log n): creix molt a poc a poc

| Mida de l'array | Passos màxims de la binària |
| ----- | ----- |
| 16 elements | 4 |
| 32 elements | 5 |
| 1.024 elements | 10 |
| **1.000.000 elements** | **20** |

<div class="info">
  <strong>O(log n), logarítmica:</strong> en cada pas es descarta <strong>la meitat</strong> del que queda. «log n» és en base 2: quantes voltes pots partir entre 2 abans d'arribar a 1.
</div>

<div class="warning">
  Torna a llegir-ho: un milió d'elements, <strong>vint passos</strong>. La lineal necessita un milió.
</div>

---
---

## ⭐ Be the Code: la traça del 8

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Traca.java</span>
        <span class="code-card-badge">🧠</span>
      </div>
      <pre><code><span class="type">int</span>[] dades = {1, 4, 8, 12, 20, 33};
<span class="type">int</span> esquerra = 0;
<span class="type">int</span> dreta = dades.length - 1;
<span class="keyword">while</span> (esquerra &lt;= dreta) {
  <span class="type">int</span> mig =
      esquerra + (dreta - esquerra) / 2;
  <span class="keyword">if</span> (dades[mig] == 8) {
    <span class="keyword">return</span> mig;
  }
  <span class="comment">// ... mou esquerra o dreta</span>
}</code></pre>
    </div>
  </div>
  <div class="right">
    <p><strong>Traça la cerca del 8: esquerra, dreta i mig en cada volta.</strong></p>
    <div class="answer-card">
      <p>Volta única: <code>esquerra=0 dreta=5 mig=2</code> → <code>dades[2] = 8</code>. <strong>Bingo a la primera.</strong></p>
      <p>Eixida: <code>Resultat: 2</code> — el millor cas de la binària: l'objectiu just al centre.</p>
    </div>
  </div>
</div>

---
---

## Comprovació ràpida 🔍

<div class="question-card">
  <span class="question-icon">?</span> Què retorna la cerca lineal quan l'element no és en l'array?
</div>

<div class="question-card">
  <span class="question-icon">?</span> Quants passos màxims necessita la binària per a 1.000.000 d'elements?
</div>

<div class="question-card">
  <span class="question-icon">?</span> Què passa si fas la binària sobre un array desordenat?
</div>

<div class="answer-card">
  <strong>1.</strong> <code>−1</code>: la senyal clàssica de «no trobat». · <strong>2.</strong> <strong>20 passos</strong> — log₂(1.000.000) ≈ 20. · <strong>3.</strong> Torna la resposta equivocada <strong>sense avisar</strong>: no hi ha error ni excepció, hi ha escombraria silenciosa.
</div>

---
---

## Resum del bloc 1 en 5 frases

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">Un <strong>algoritme</strong> és una recepta finita, precisa i sense ambigüitats: l'algoritme és la <strong>idea</strong>, el codi la materialització.</div>
</div>

<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">La <strong>cerca lineal</strong> recorre un a un, funciona amb desordenats i torna l'índex o <strong>−1</strong>. Complexitat O(n).</div>
</div>

<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">La <strong>cerca binària</strong> descarta la meitat en cada pas: <strong>exigix array ordenat</strong> o torna escombraria sense avisar.</div>
</div>

<div class="step">
  <div class="step-number">4</div>
  <div class="step-content">La recepta mental: dos punters, <code>while (esquerra &lt;= dreta)</code>, mig anti-desbordament i els <strong>+1/−1 sagrats</strong>.</div>
</div>

<div class="step">
  <div class="step-number">5</div>
  <div class="step-content"><strong>O(log n)</strong>: un milió d'elements en 20 passos. La lineal en necessita un milió.</div>
</div>

---
layout: closing
---

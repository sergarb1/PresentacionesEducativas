---
layout: cover
---

# Unitat 05 — Funcions i mètodes<br>Bloc 02

## 1r CFGS DAW · Programació

---
---

## Què veurem en este bloc

<div class="features-grid" style="grid-template-columns:repeat(3,1fr);gap:0.8rem;">
  <div class="feature-item" style="padding:0.8rem 0.6rem;font-size:0.92rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🏠</span><strong>Àmbit de variables</strong><br>Cada mètode és una casa</div>
  <div class="feature-item" style="padding:0.8rem 0.6rem;font-size:0.92rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🧯</span><strong>Errors freqüents</strong><br>Els 7 entrebancs i el diagnòstic</div>
  <div class="feature-item" style="padding:0.8rem 0.6rem;font-size:0.92rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🎼</span><strong>Divideix el problema</strong><br>main com a director d'orquestra</div>
  <div class="feature-item" style="padding:0.8rem 0.6rem;font-size:0.92rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🛠️</span><strong>Be the Code</strong><br>Tallar un programa amb les teues mans</div>
  <div class="feature-item" style="padding:0.8rem 0.6rem;font-size:0.92rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🕵️</span><strong>Repàs general</strong><br>Qui soc? · decisions · entrevistes</div>
  <div class="feature-item" style="padding:0.8rem 0.6rem;font-size:0.92rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🌀</span><strong>Un avançament</strong><br>La cadena de crides (recursió, U08)</div>
</div>

---
---

## Àmbit de variables
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    L'àmbit (<em>scope</em>) és el tros de codi on una variable <strong>existeix</strong>: dins d'un mètode només viuen els seus paràmetres i els seus locals, i <strong>el que naix ahí, mor ahí</strong>.
  </div>
</div>

<div class="info" style="margin-top:1.2rem;">
  Quan veges <code>cannot find symbol</code> en una variable, gairebé sempre és una de dos: l'has escrit malament (<em>typo</em>) o estàs usant-la <strong>fora de la seua casa</strong>.
</div>

---
class: compact-slide
---

## Cada mètode és una casa

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Casas.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>public class Casas {
   public static void sumar() {
      int total = 10;
      total += 5;
      System.out.println(total);   // 15
   }
   public static void restar() {
      int total = 100;
      total -= 5;
      System.out.println(total);   // 95
   }
   public static void main(String[] args) {
      sumar();
      restar();
      // System.out.println(total); → ¡error!
   }
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="terminal">
      <div><span class="prompt">$</span> java Casas</div>
      <div class="output">15</div>
      <div class="output">95</div>
      <div class="output">error: cannot find symbol: variable total</div>
    </div>
    <div class="info" style="margin-top:0.6rem;">
      Dos mètodes amb una variable <code>total</code> <strong>alhora</strong>: zero problemes. Són <strong>dos totals diferents</strong>, una en cada casa.
    </div>
    <div class="warning" style="margin-top:0.5rem;">
      <code>main</code> no pot usar <code>total</code>: <strong>no existeix</strong> fora de <code>sumar()</code>. El mètode acabà, la seua pila es desfet i <code>total</code> ja no està.
    </div>
  </div>
</div>

---
class: compact-slide
---

## El mapa de les cases

<div class="diagram-frame diagram-medium">
  <Excalidraw drawFilePath="/diagrams/ud05-prg-ambit-cases.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---
---

## Les regles de l'àmbit

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><strong>Paràmetres i locals</strong> es veuen només <strong>dins del seu mètode</strong> (de la firma a la clau de tancament)</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><strong>Un bloc també és una casa menuda:</strong> la <code>i</code> d'un <code>for</code> no existeix fora de les seues claus (U04)</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><strong>L'ordre importa dins del mètode:</strong> només pots usar una variable <strong>després</strong> de declarar-la</div>
</div>
<div class="step">
  <div class="step-number">4</div>
  <div class="step-content"><strong>Dues germanes no es barallen:</strong> repetir noms entre mètodes és normal i sa</div>
</div>

<div class="info">
  En acabar el mètode, les seues variables <strong>moren</strong>: només sobreviu el que tornes amb <code>return</code> o el que imprimixes.
</div>

---
class: compact-slide
---

## El que entra per la porta també és de la casa

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Triplicar.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>public static int triplicar(int numero) {
   int resultado = numero * 3;
   return resultado;
}
// en main:
int puntos = 10;
triplicar(puntos);
System.out.println(puntos);  // 10</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="warning">
      <code>triplicar</code> va treballar amb la seua <strong>còpia</strong> de <code>puntos</code>: el teu mètode pot usar el valor, però <strong>no reescriure la variable de qui crida</strong>.
    </div>
    <div class="success" style="margin-top:0.6rem;">
      Per a «tornar» canvis: el mètode retorna el nou valor amb <code>return</code> i qui crida el guarda.
    </div>
    <div class="info" style="margin-top:0.6rem;">
      Els mètodes només comparteixen el que es <strong>passen</strong> (arguments) o el que es <strong>torna</strong> (<code>return</code>). <strong>No hi ha ventanetes laterals.</strong>
    </div>
  </div>
</div>

---
---

## Exercici: existeix esta variable?

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Alcance.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>public class Alcance {
   public static void a() {
      int x = 1;
   }
   public static void b() {
      System.out.println(x);
   }
   public static void main(String[] args) {
      b();
   }
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="question-card">
      <span class="question-icon">🧠</span>
      Què passa? (A) imprimeix 1 · (B) imprimeix 0 · (C) no compila · (D) excepció en executar
    </div>
    <div class="answer-card">
      <strong>🔄 Solució: la C.</strong> <code>x</code> viu i mor dins de <code>a()</code>: el mètode <code>b()</code> no la coneix. És un <code>cannot find symbol</code> de <strong>compilació</strong>: ni tan sols arriba a executar-se. Les variables no viatgen entre mètodes per art d'engany.
    </div>
  </div>
</div>

---
---

## Mini-chequeig: l'àmbit

<div class="question-card">
  <span class="question-icon">🧠</span>
  Respon en 30 segons:
</div>

1. Poden dos mètodes tindre una variable local `contador` alhora?
2. Existeix la `i` del `for` fora de les seues claus?
3. Sobreviu `resultado` a l'acabar el mètode que la declara?
4. El meu mètode no canvia el saldo que li he passat. És un bug?

<div class="answer-card">
  <strong>🔄 Respostes:</strong>
  <ul style="font-size:0.85rem;margin-top:0.3rem;">
    <li>Sí: cadascuna viu en el seu mètode, són <strong>dos variables diferents</strong></li>
    <li>No: el seu àmbit acaba en la clau de tancament del <code>for</code></li>
    <li>No: les locals <strong>moren</strong> en eixir; només sobreviu el que tornes</li>
    <li>No és bug: els arguments primitius arriben <strong>copiats</strong>; si vols el resultat, <code>return</code></li>
  </ul>
</div>

---

## Errors freqüents
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Els errors amb mètodes <strong>no són aleatoris</strong>: tenen nom, missatge i arregla. Apren els set i el 90% de les teues hores de frustració s'evaporen.
  </div>
</div>

<div class="info" style="margin-top:1.2rem;">
  Els sis primers els veu <strong>CONRAD</strong> (el compilador) en roig abans d'executar. El setè és d'execució: <strong>el detecta el teu cervell</strong> llegint noms en veu alta.
</div>

---
class: compact-slide
---

## La galeria dels entrebancs (1-4)

| # | Codi sospitós | Error de CONRAD | Arregla |
| :--- | :--- | :--- | :--- |
| **1** | `int` amb un camí sense `return` | `missing return statement` | Tanca **tots** els camins amb `return` |
| **2** | `pintar(3, "roig")` quan la firma és `(String, int)` | `incompatible types` | Respecta l'**ordre i el tipus** de la firma |
| **3** | `suma(1, 2, 3)` quan la firma demana 2 | `wrong number of arguments` | La firma mana: 2 paràmetres = 2 arguments |
| **4** | `int r = media(3, 4);` amb `media` void | `void cannot be converted` | Que el mètode faça `return`; imprimir és de qui crida |

<div class="warning">
  El 4 és <strong>el pecat més comú de la unitat</strong>: imprimir quan has de tornar. El valor s'imprimix i desapareix per a tothom.
</div>

---
class: compact-slide
---

## La galeria dels entrebancs (5-7)

| # | Codi sospitós | Error | Arregla |
| :--- | :--- | :--- | :--- |
| **5** | `void saludar() {...}` cridat des de `main` | `non-static method ... cannot be referenced from a static context` | De moment, els teus mètodes porten **static** |
| **6** | `saludar` (sense `()` i `;`) | no és una crida | La crida és `saludar();` |
| **7** | `mostrarTotal();` quan volies `mostrarMedia()` | **cap**: compila i executa... i ment | Llig el nom de cada crida en veu alta |

<div class="warning">
  El <strong>7 és el més perillós dels set</strong>: sense error de compilació, executa i ment. D'ací a dos setmanes, el que va escriure eixe codi serà un desconegut (tu mateix).
</div>

---
class: compact-slide
---

## Com diagnosticar sense perdre't

<div class="diagram-frame diagram-medium">
  <Excalidraw drawFilePath="/diagrams/ud05-prg-diagnostic-errors.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---
class: compact-slide
---

## Exercici: el taller d'arregles

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Mayor.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>// hauria de tornar el major de dos
// nombres, però té 2 errors:
public static int mayor(int a, int b) {
   if (a &gt; b) {
      return a
   }
   return 0;
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="question-card">
      <span class="question-icon">🧠</span>
      Un error de compilació i un de lògica. Quins són?
    </div>
    <div class="answer-card">
      <strong>🔄 Solució:</strong>
      <ul style="font-size:0.85rem;margin-top:0.3rem;">
        <li><strong>Compilació:</strong> falta <code>;</code> després de <code>return a</code></li>
        <li><strong>Lògica:</strong> el segon camí torna <code>0</code> en lloc de <code>b</code>: quan <code>a &lt;= b</code>, el major és <code>b</code></li>
      </ul>
    </div>
    <div class="success" style="margin-top:0.5rem;">
      🕶️ <strong>Don Tip:</strong> quan tot compile i el resultat no quadre, imprimeix (o millor: <strong>torna</strong>) els valors a mig camí. Depurar és mirar, no endevinar.
    </div>
  </div>
</div>

---
---

## Mini-chequeig: errors

<div class="question-card">
  <span class="question-icon">🧠</span>
  Respon sense mirar:
</div>

1. Quin error dona `int r = media(3, 4);` si `media` és void i només imprimeix?
2. Quins missatges busques primer en no compilar una crida?
3. Per què l'error 7 no el detecta el compilador?

<div class="answer-card">
  <strong>🔄 Respostes:</strong>
  <ul style="font-size:0.85rem;margin-top:0.3rem;">
    <li><code>void cannot be converted to int</code>: res de <code>void</code> es pot guardar en una variable</li>
    <li><code>cannot find symbol</code> · <code>wrong number of arguments</code> · <code>incompatible types</code> · <code>missing return statement</code></li>
    <li>Perquè el nom i els arguments són correctes <strong>sintàcticament</strong>: només tu saps que volies l'altre mètode</li>
  </ul>
</div>

---

## Divideix el problema
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Dividir és escriure un <code>main</code> que es llija com un <strong>resum</strong> («llegir dades, calcular mitjana, mostrar informe») i amagar cada frase <strong>en un mètode amb el seu nom</strong>.
  </div>
</div>

<div class="warning" style="margin-top:1.2rem;">
  El director d'orquestra <strong>no toca els instruments</strong>: coordina. Un <code>main</code> de 40 línies barrejant lectura, càlcul i format és un full de receptes, no un índex del programa.
</div>

---
class: compact-slide
---

## El director i la seua orquestra

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">InformeNotas.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>public static void main(String[] args) {
    double[] notas = leerNotas(5);
    double media = calcularMedia(notas);
    boolean suspensa = tieneSuspensa(notas);
    mostrarVeredicto(media, suspensa);
}</code></pre>
    </div>
    <p>Quatre línies, quatre verbs, <strong>zero aritmètica</strong>.</p>
  </div>
  <div class="right">
    <p><strong>El mètode dels verbs:</strong> cada verb amb parèntesis en un comentari és un candidat a mètode.</p>
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">Escriu el <strong>comentari-objectiu</strong> («llegir les notes»)</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">Crea el <strong>mètode</strong> amb eixe nom: paràmetres si necessita dades, retorn si torna algo</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><strong>Mou el codi</strong> al cos i deixa la crida en <code>main</code></div>
    </div>
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content"><strong>Executa:</strong> si fa el mateix que abans, has trossejat bé. Un mètode cada volta</div>
    </div>
  </div>
</div>

---
---

## main com a índex del programa

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud05-prg-main-director.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---
class: compact-slide
---

## On està el límit?

<div class="two-cols">
  <div class="left">
    <table>
      <thead><tr><th>Es queda en main</th><th>Va al seu mètode</th></tr></thead>
      <tbody>
        <tr><td>La seqüència de passos</td><td>Un pas amb <strong>nom propi</strong></td></tr>
        <tr><td>Un <code>if</code> de dues línies de flux</td><td>Un bloc que <strong>repetixes</strong> o que «fa una cosa»</td></tr>
        <tr><td>La crida final d'impressió</td><td>El compte, la lectura, la cerca, el format</td></tr>
      </tbody>
    </table>
    <div class="info" style="margin-top:0.6rem;">
      No hi ha llei de «més de N línies»: la brúixola és <strong>una responsabilitat per mètode</strong>.
    </div>
  </div>
  <div class="right">
    <div class="warning">
      <code>calcularMediaYMostrarYGuardar</code> són <strong>tres mètodes disfressats d'un</strong>: si el nom necessita una «i», són dos mètodes.
    </div>
    <div class="success" style="margin-top:0.6rem;">
      💡 Si necessites un comentari per explicar un bloc de 5 línies, eixe bloc <strong>ja té nom</strong>: fes-lo mètode i que el nom parle per ell.
    </div>
    <div class="info" style="margin-top:0.6rem;">
      🕶️ <strong>Don Tip:</strong> escriu la crida que <strong>volgueres tindre</strong> (<code>int max = encontrarMaximo(notas);</code>) i després fes que existisca. El codi es dissenya cap avant.
    </div>
  </div>
</div>

---
---

## Exercici: el verb amagat

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Positius.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>public static void main(String[] args) {
   int[] datos = { 3, 7, 2 };
   boolean todoPositivo = true;
   for (int i = 0; i &lt; datos.length; i++) {
      if (datos[i] &lt;= 0) {
         todoPositivo = false;
      }
   }
   System.out.println("¿Tot positiu? "
       + todoPositivo);
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="question-card">
      <span class="question-icon">🧠</span>
      Quin mètode (nom i firma) treguries d'eixe main?
    </div>
    <div class="answer-card">
      <strong>🔄 Solució:</strong> el verb és «tots positius» → <code>todosPositivos</code>.
      <pre style="margin:0.4rem 0 0;"><code style="font-size:0.72rem;">static boolean todosPositivos(int[] datos) {
   for (int i = 0; i &lt; datos.length; i++) {
      if (datos[i] &lt;= 0) { return false; }
   }
   return true;
}</code></pre>
    </div>
    <p style="margin-top:0.4rem;">Necessita dades? Sí → <code>int[] datos</code>. Torna un judici? Sí → <code>boolean</code>.</p>
  </div>
</div>

---
---

## Mini-chequeig: dividir

<div class="question-card">
  <span class="question-icon">🧠</span>
  Respon en 30 segons:
</div>

1. Quines tres preguntes et fas en dissenyar un mètode?
2. Quin és l'ofici de `main` en un programa ben trossejat?
3. Quants blocs trosseges d'una volta?

<div class="answer-card">
  <strong>🔄 Respostes:</strong>
  <ul style="font-size:0.85rem;margin-top:0.3rem;">
    <li>Com es diu (<strong>quin verb fa</strong>)? Quines dades necessita (<strong>paràmetres</strong>)? Què torna (<strong>retorn o void</strong>)?</li>
    <li><strong>Coordinar</strong>: llegir → calcular → mostrar, en crides llegibles</li>
    <li><strong>Un sol</strong>, executant després de cada extracció: si algo es trenca, saps què va ser</li>
  </ul>
</div>

---

## Repàs: Be the Code
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Este punt no té teoria nova: té un programa de 30 línies que has de <strong>trossejar amb les teues mans</strong>. Si ho fas, domines la unitat sencera.
  </div>
</div>

<div class="step" style="margin-top:1.4rem;">
  <div class="step-number">🎯</div>
  <div class="step-content">La missió: convertir l'<code>InformeNotas</code> en una <strong>orquestra de mètodes</strong> sense canviar el que imprimeix. Abans d'escriure: <strong>quants verbs</strong> veus? Quines dades necessita cada un i <strong>què torna</strong>?</div>
</div>

---
class: compact-slide
---

## El punt de partida (tot en main)

<div class="code-card" style="margin-top:0.1rem;">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">InformeNotas.java</div>
    <div class="code-card-badge">Java</div>
  </div>
  <pre><code>public static void main(String[] args) {
   Scanner teclado = new Scanner(System.in);
   double suma = 0;
   boolean haySuspensa = false;
   for (int i = 0; i &lt; 5; i++) {
      System.out.print("Nota " + (i + 1) + ": ");
      double nota = teclado.nextDouble();
      suma += nota;
      if (nota &lt; 5) { haySuspensa = true; }
   }
   double media = suma / 5;
   System.out.println("Mitjana: " + media);
   if (haySuspensa) { System.out.println("Hi ha suspesa: a per ella."); }
   else if (media &gt;= 7) { System.out.println("¡Qué nota!"); }
   else { System.out.println("Aprovat amb genolls."); }
}</code></pre>
</div>

<div class="info" style="margin-top:0.2rem;padding:0.4rem 0.85rem;">
  Pista: <strong>tres verbs</strong> amb nom propi: llegir → calcular → mostrar. I una pregunta (¿hi ha suspensa?) que també vol ser mètode.
</div>

---
class: compact-slide
---

## Pas a pas (pistes que no regalen el final)

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><code>static double[] leerNotas(int cantidad)</code> — llegir, amb Scanner dins</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><code>static double calcularMedia(double[] notas)</code> — calcular, torna la mitjana</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><code>static boolean tieneSuspensa(double[] notas)</code> — pregunta, torna <code>true/false</code></div>
</div>
<div class="step">
  <div class="step-number">4</div>
  <div class="step-content"><code>static void mostrarVeredicto(double media, boolean suspensa)</code> — contar, <code>void</code></div>
</div>
<div class="step">
  <div class="step-number">5</div>
  <div class="step-content">Reescriu <code>main</code> com a resum: <strong>llegir → mitjana → suspensa → mostrar</strong>, sense un sol <code>for</code></div>
</div>

<div class="warning" style="margin-top:0.6rem;">
  L'eixida ha de ser <strong>idèntica</strong> abans i després. Si canvia, has mogut una línia de més: <strong>refactoritzar és canviar la forma, mai el comportament</strong>.
</div>

---
class: compact-slide
---

## El Lío: el refactor malograt

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">MalRefactor.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>public static void main(String[] args) {
   double m = media(3, 4, 5);
   System.out.println(m);
}
static void media(int a, int b, int c) {
   double resultado = (a + b + c) / 3.0;
   System.out.println(resultado);
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="warning">
      <strong>No compila:</strong> <code>main</code> intenta guardar en <code>double m</code> el resultat d'un mètode <code>void</code> → <code>void cannot be converted to double</code>.
    </div>
    <div class="success" style="margin-top:0.6rem;">
      <strong>L'arregle correcte:</strong> <code>static double media(int a, int b, int c) { return (a + b + c) / 3.0; }</code> — i fora el <code>println</code> de dins.
    </div>
    <div class="info" style="margin-top:0.6rem;">
      Calcula → <strong>torna</strong>. Decideix → <strong>imprimeix</strong>. Si el mètode es diu <code>media</code>, el seu ofici és calcular, no contar.
    </div>
  </div>
</div>

---
---

## La cadena de crides (avançament de la U08)

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud05-prg-recursio-cadena.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---
class: compact-slide
---

## Repàs: qui sóc?

<div class="question-card">
  <span class="question-icon">🕵️</span>
  Endevina el concepte:
</div>

1. Sóc la variable que un mètode rep en ser cridat, declarada en la seua firma.
2. Sóc el valor que arriba en la crida, en l'exacte lloc on polses el gatell.
3. Sóc la regió on una variable existeix: de la firma a la clau de tancament.
4. Sóc el final del mètode: tanque l'execució i entregue el valor promés.
5. Sóc un mètode que torna `true` o `false`: `esPar`, `tieneSuspensa`.

<div class="answer-card">
  <strong>🔄 Respostes:</strong>
  <span style="font-size:0.95rem;">1 → <strong>el paràmetre</strong> · 2 → <strong>l'argument</strong> · 3 → <strong>l'àmbit (scope)</strong> · 4 → <code>return</code> · 5 → <strong>el predicat</strong></span>
</div>

---
class: compact-slide
---

## El joc de les decisions

<div class="two-cols">
  <div class="left">
    <ol style="font-size:0.92rem;">
      <li>Quina és la diferència real entre paràmetre i argument?</li>
      <li>Què imprimeix <code>println(truco(7))</code>?</li>
      <li>Poden <code>a()</code> i <code>b()</code> tindre totes dues una variable <code>x</code>?</li>
      <li>Quin error dona <code>int r = suma(1, 2);</code> si la firma demana 3?</li>
      <li>Quan uses <code>void</code>?</li>
    </ol>
  </div>
  <div class="right">
    <div class="answer-card">
      <strong>🔄 Solucions:</strong>
      <ul style="font-size:0.85rem;margin-top:0.3rem;">
        <li><strong>1-b:</strong> declaració vs crida</li>
        <li><strong>2-a:</strong> 10 (cau en <code>x &gt; 5</code>: 7 + 3)</li>
        <li><strong>3-b:</strong> sí, són cases distintes</li>
        <li><strong>4-a:</strong> <code>wrong number of arguments</code></li>
        <li><strong>5-a:</strong> només efecte, sense valor a entregar</li>
      </ul>
    </div>
  </div>
</div>

---
---

## Preguntes d'entrevista (Java junior)

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">Explica'm, com si jo fora ta àvia, la diferència entre <strong>paràmetre i argument</strong></div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">Escriu un mètode que torne <code>true</code> si tots els nombres són positius. <strong>Per què boolean i no un println?</strong></div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content">Què és l'<strong>àmbit</strong> d'una variable i per què existeix?</div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content">El teu mètode compila però el resultat <strong>no arriba a main</strong>. Per què pot ser?</div>
    </div>
    <div class="step">
      <div class="step-number">5</div>
      <div class="step-content">Quan faries un mètode <code>void</code> i quan amb retorn? Un exemple de cada</div>
    </div>
    <div class="step">
      <div class="step-number">6</div>
      <div class="step-content">Refactoritza un <code>main</code> de 40 línies: <strong>per on comences</strong> i com comproves que no l'has trencat?</div>
    </div>
  </div>
</div>

<div class="success" style="margin-top:0.6rem;">
  💡 Per a la 2: <strong>boolean és reutilitzable</strong> (comparar, combinar, tornar a usar); un println només es veu una volta i desapareix.
</div>

---
---

## Resum del bloc 02

<div class="features-grid" style="grid-template-columns:repeat(3,1fr);gap:0.8rem;">
  <div class="feature-item" style="padding:0.8rem 0.6rem;font-size:0.92rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🏠</span><strong>Àmbit</strong><br>El que naix en una casa, mor en la casa; entre mètodes: arguments i return</div>
  <div class="feature-item" style="padding:0.8rem 0.6rem;font-size:0.92rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🧯</span><strong>7 errors</strong>
<br>6 els veu CONRAD; el 7 (mètode equivocat) el veus tu</div>
  <div class="feature-item" style="padding:0.8rem 0.6rem;font-size:0.92rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🎼</span><strong>Divideix</strong><br>main = resum de verbs; una responsabilitat per mètode</div>
</div>

<div class="success" style="margin-top:0.8rem;">
  La lliçó que ho cobreix tot: <strong>void per a efectes, return per a valors</strong>. Qui calcula torna; qui decideix imprimeix.
</div>

---
layout: closing
---

---
layout: cover
---

# Unitat 03 — Variables, tipus i operadors<br>Bloc 01

## 1r CFGS DAW · Programació

---
---

## Variables i tipus primitius
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Les variables són <strong>caixes etiquetades</strong> en la memòria de l'ordinador, i Java et oferix <strong>8 tamanys de caixa</strong> (els tipus primitius) perquè tries el que millor li va a cada dada.
  </div>
</div>

En unitats anteriors, el teu programa només cridava text per la consola. Ara li donaràs memòria: guardarà la teua edat, el teu nom, la teua nota mitjana i fins i tot si tens gana.

I per a triar bé la caixa de cada dada, primer has de conéixer el catàleg del magatzem.

---
---

## La declaració: la recepta d'una caixa
### Tipus · nom · valor

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">recepta</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>tipo nombreDeLaCaja = valorQueMetoDentro;
// Exemples reals
int edad = 25;          // caixa "edad" amb un 25
double precio = 19.99;  // caixa amb decimals
String nombre = "María"; // caixa que guarda text
boolean hambre = true;  // vertader/fals</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Tipus</strong> — tamany i forma de la caixa</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Nom</strong> — l'etiqueta de la caixa</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><strong>Valor</strong> — el que fiques dins</div>
    </div>
    <div class="info" style="margin-top: 0.8rem;">
      Les variables es diuen així perquè <strong>varien</strong>: <code>int edad = 25;</code> i el dia del teu aniversari, <code>edad = 26;</code>. L'etiqueta és la mateixa, el contingut canvia.
    </div>
  </div>
</div>

---
---

## Les regles de nomenclatura
### Les regles d'or de les etiquetes

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">Lletres, números, <code>_</code> i <code>$</code>. <strong>Res d'espais</strong> (evita ñ, ç, accents)</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>No començar amb número</strong>: <code>1numero</code> és il·legal; <code>numero1</code> és legal</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><strong>Les majúscules importen</strong>: <code>edad</code>, <code>Edad</code> i <code>EDAD</code> són tres caixes distintes</div>
    </div>
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content"><strong>No usar paraules reservades</strong>: <code>int</code>, <code>class</code>, <code>if</code>, <code>while</code>...</div>
    </div>
    <div class="step">
      <div class="step-number">5</div>
      <div class="step-content"><strong>camelCase</strong>: <code>miVariableEjemplo</code></div>
    </div>
  </div>
  <div class="right">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">noms</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>// ✅ Correcte
int numeroAlumnos = 30;
double notaMedia = 7.5;
// ❌ Incorrecte
int 1numero = 30;   // comença per número
double nota media = 7.5; // espai en el nom
int class = 30;     // paraula reservada</code></pre>
    </div>
  </div>
</div>

---
class: compact-slide
---

## Els 8 primitius: el catàleg de caixes

| Tipus | Mida | El que cap | Analogia |
| :--- | :--- | :--- | :--- |
| **byte** | 8 bits | -128 a 127 | Caixa de llumins |
| **short** | 16 bits | -32.768 a 32.767 | Caixa de sabates |
| **int** | 32 bits | ±2.147 milions | Caixa de mudança (la que més usaràs) |
| **long** | 64 bits | ±9 trilions | Contenidor de vaixell |
| **float** | 32 bits | Decimals precisió simple | Got d'aigua |
| **double** | 64 bits | Decimals precisió doble | Cubell d'aigua |
| **char** | 16 bits | Un sol caràcter Unicode | Una lletra en una caixa de sabates |
| **boolean** | 1 bit | true o false | Interruptor de llum |

<div class="info" style="margin-top: 0.6rem;">
  <strong>Nota:</strong> usa <code>int</code> per a quasi tot el numèric enter (només <code>long</code> si vas a contar estrelles) i <code>double</code> per a decimals, a menys que estalviar memòria siga el teu fetitxe.
</div>

---
---

## Com es declara cada primitiu

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">els 8 primitius</div>
    <div class="code-card-badge">Java</div>
  </div>
  <pre><code>byte nivel = 100;
short poblacion = 30000;
int habitantes = 1500000;   // el més usat
long distancia = 384400000L;  // la L al final és obligatoria
float precio = 12.99f;        // la f al final és obligatoria
double pi = 3.14159265359;
char letra = 'A';             // cometes SIMPLES per a char
boolean esJavaDivertido = true; // açò és opinable</code></pre>
</div>

<div class="warning" style="margin-top: 0.6rem;">
  <code>long</code> necessita la <code>L</code>, <code>float</code> la <code>f</code>, i <code>char</code> va amb cometes simples. Tres lletres que estalvien el 80% de les bronques amb el compilador.
</div>

---
---

## Quina caixa use per a cada dada?
### Triar la maleta del viatge

<div class="features-grid" style="grid-template-columns:repeat(5,1fr);">
  <div class="feature-item">
    <div class="feature-icon">🔢</div>
    <div><strong>int</strong></div>
    <div style="font-size:0.8rem;color:#64748B;">edats, comptadors, puntuacions — quasi tot enter</div>
  </div>
  <div class="feature-item">
    <div class="feature-icon">💰</div>
    <div><strong>double</strong></div>
    <div style="font-size:0.8rem;color:#64748B;">preus, notes mitjanes, temperatures — qualsevol decimal</div>
  </div>
  <div class="feature-item">
    <div class="feature-icon">🔀</div>
    <div><strong>boolean</strong></div>
    <div style="font-size:0.8rem;color:#64748B;">respostes sí/no: "ha aprovat?", "hi ha connexió?"</div>
  </div>
  <div class="feature-item">
    <div class="feature-icon">🔤</div>
    <div><strong>char</strong></div>
    <div style="font-size:0.8rem;color:#64748B;">una sola lletra: 'A', 'B', 'C'</div>
  </div>
  <div class="feature-item">
    <div class="feature-icon">🚀</div>
    <div><strong>long</strong></div>
    <div style="font-size:0.8rem;color:#64748B;">nombres astronòmics, mil·lisegons, IDs gegants</div>
  </div>
</div>

<div class="warning" style="margin-top: 0.9rem;">
  Quan dubtes entre <code>int</code> i <code>double</code>: <em>esta dada pot portar decimals?</em> Si sí → <code>double</code>. Si no → <code>int</code>. Simple.
</div>

---
---

## Exercici: El guarda del magatzem
### Quines declaracions compilen?

<div class="two-cols">
  <div class="left">
    <div class="question-card">
      <span class="question-icon">📦</span>
      Eres el guarda d'un magatzem de dades. Et donen estes declaracions: <strong>quines compilen i quines no?</strong> Marca les que fallarien i per què.
    </div>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Misteri.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>int a = 150;        // ¿compila?
int b = 10.5;       // ¿compila?
double c = 7;       // ¿compila?
char d = "A";       // ¿compila?
boolean e = "true"; // ¿compila?
long f = 3000000000L;  // ¿compila?
int g = 3000000000;    // ¿compila?</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="answer-card">
      <strong>🔄 Solució</strong>
      <ul style="font-size:0.88rem;margin-top:0.4rem;">
        <li><code>a = 150</code> ✅ cap de sobres</li>
        <li><code>b = 10.5</code> ❌ un int no admet decimals</li>
        <li><code>c = 7</code> ✅ enter → double implícit</li>
        <li><code>d = "A"</code> ❌ char usa cometes simples</li>
        <li><code>e = "true"</code> ❌ amb cometes és text</li>
        <li><code>f = 3000000000L</code> ✅ la L diu "això és un long"</li>
        <li><code>g = 3000000000</code> ❌ 3.000M no cap en un int (tope 2.147M)</li>
      </ul>
    </div>
  </div>
</div>

---
---

## Mini-chequeig: primitius

<div class="question-card">
  <span class="question-icon">🎯</span>
  Posat a prova en 30 segons:
</div>

1. Quin tamany de caixa usaríes per a guardar el nombre d'habitants de la Terra (més de 8.000 milions)?
2. Per què <code>char letra = "A";</code> no compila i <code>char letra = 'A';</code> sí?
3. Quina és la diferència entre <code>float</code> i <code>double</code> en una frase?
4. Per què <code>Edad</code>, <code>edad</code> i <code>EDAD</code> són tres variables distintes?

<div class="answer-card">
  <strong>🔄 Respostes:</strong> 1) <strong>long</strong> — més de 2.147M no cap en un int · 2) char va amb <strong>cometes simples</strong> · 3) double té <strong>doble precisió</strong> (64 bits) · 4) les <strong>majúscules importen</strong>: cada variació és una caixa distinta.
</div>

---
---

## String i constants
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    <code>String</code> és una <strong>classe</strong> (no un primitiu) que guarda text, és <strong>immutable</strong> com una foto, i <code>final</code> és el superglue que converteix qualsevol caixa en una <strong>constant</strong> que no es pot tocar.
  </div>
</div>

<div class="two-cols" style="margin-top: 1rem;">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">strings</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>String saludo = "Hola, DAW"; // forma normal
String nombre = new String("Ana"); // constructor</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="info">
      <code>String</code> va amb <strong>cometes dobles</strong> "..." · les simples '...' són només per a <code>char</code> (un únic caràcter).
    </div>
  </div>
</div>

---
---

## La immutabilitat i la trampa del ==
### No toques, que es trenca

<div class="two-cols">
  <div class="left">
    <h3 style="color:#3B82F6;">🧊 Immutables</h3>
    <p style="font-size:0.9rem;">Quan fas <code>texto = texto + " mundo"</code>, Java <strong>no modifica</strong> "Hola": tira el vell i crea un String nou. El text original queda congelat per sempre.</p>
    <div class="warning" style="margin-top: 0.6rem;">
      Comparar Strings amb <code>==</code> pregunta <em>"són el mateix objecte?"</em>, no <em>"tenen el mateix text?"</em>.
    </div>
  </div>
  <div class="right">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">PoolTrampa.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>String a = "Hello";
String b = "Hello";
String c = new String("Hello");
a == b        // true (mateix objecte)
a == c        // false (objecte nou)
a.equals(c)   // true (mateix text)</code></pre>
    </div>
  </div>
</div>

<div class="success" style="margin-top: 0.7rem;">
  <strong>Regla d'or:</strong> els String <strong>sempre</strong> es comparen amb <code>.equals()</code>. Si uses <code>==</code>, tard o d'hora et mossegarà en un examen.
</div>

---
---

## Constants amb final
### Caixes amb superglue

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Constants.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>final double IVA = 0.21;
final int MAXIMO_INTENTOS = 3;
final String NOMBRE_APP = "Gestión DAW";
IVA = 0.10; // ERROR: no pots reasignar!</code></pre>
    </div>
    <div class="info" style="margin-top: 0.6rem;">
      Per convenció, <strong>MAJÚSCULES_AMB_GUIONS</strong>: crida "¡SOC IMMUTABLE!" a qualsevol que lligue el codi.
    </div>
  </div>
  <div class="right">
    <h3 style="color:#3B82F6;">🏫 Exemple guiat: la factura</h3>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Factura.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>final double IVA = 0.21;
double precioBase = 50.0;
double ivaAplicado = precioBase * IVA;
double precioFinal = precioBase + ivaAplicado;
System.out.println("Total: " + precioFinal + "€");
// Total: 60.5€</code></pre>
    </div>
    <div class="success" style="margin-top: 0.6rem;">
      Si l'IVA canvia demà, edites <strong>una línia</strong>, no les 50 on vas usar el 0.21.
    </div>
  </div>
</div>

---
---

## Exercici: l'embolic de Strings
### Què imprimeix?

<div class="two-cols">
  <div class="left">
    <div class="question-card">
      <span class="question-icon">🕵️</span>
      Sense executar, digues què imprimeix exactament este codi.
    </div>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Embolic.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>String x = "Java";
String y = "Java";
String z = new String("Java");
System.out.println(x == y);
System.out.println(x == z);
System.out.println(x.equals(z));</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="answer-card">
      <strong>🔄 Solució:</strong> <code>true</code>, <code>false</code>, <code>true</code>
      <ul style="font-size:0.9rem;margin-top:0.4rem;">
        <li><code>x == y</code> → <strong>true</strong>: els dos literals comparteixen el pool de Strings</li>
        <li><code>x == z</code> → <strong>false</strong>: <code>new</code> crea un objecte nou, sense referència compartida</li>
        <li><code>x.equals(z)</code> → <strong>true</strong>: compara <strong>text</strong>, no referències</li>
      </ul>
    </div>
    <div class="info" style="margin-top: 0.6rem;">
      Clàssic d'examen. Si l'encertes a la primera, la unitat la portes bé.
    </div>
  </div>
</div>

---
class: compact-slide
---

## Operadors aritmètics
### La idea en una frase

<div class="key-idea" style="margin-top: 1rem;">
  <div class="key-idea-text">
    Els operadors aritmètics (+, -, *, /, %) són les màquines de pesos del gimnàs de dades: transformen les teues variables, i la <strong>divisió entera</strong> i la <strong>precedència</strong> són les trampes que separen els que saben dels que improvisen.
  </div>
</div>

<div class="two-cols" style="margin-top: 0.6rem;">
  <div class="left">
    <div class="step">
      <div class="step-number">➕</div>
      <div class="step-content"><strong>+</strong> press de banca: <code>5 + 3 = 8</code></div>
    </div>
    <div class="step">
      <div class="step-number">➖</div>
      <div class="step-content"><strong>-</strong> curl de bíceps: <code>5 - 3 = 2</code></div>
    </div>
    <div class="step">
      <div class="step-number">✖️</div>
      <div class="step-content"><strong>*</strong> sentadilla: <code>5 * 3 = 15</code></div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">➗</div>
      <div class="step-content"><strong>/</strong> pes mort: <code>10 / 3 = 3</code> (enters) o <code>10.0 / 3 = 3.333...</code></div>
    </div>
    <div class="step">
      <div class="step-number">🧮</div>
      <div class="step-content"><strong>%</strong> l'abdominal odiat: <code>10 % 3 = 1</code> (el reste)</div>
    </div>
    <div class="info" style="margin-top: 0.6rem;">
      Sense <code>%</code> no existiria res cíclic: parell/senar, torns, rellotges, jocs...
    </div>
  </div>
</div>

---
class: compact-slide
---

## La divisió entera mata
### Si divideixes dos enters, Java et retorna un enter

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Divisio.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>int alumnos = 17;
int grupos = 5;
System.out.println(alumnos / grupos);
// 3 — Java diu que cada grup té 3 alumnes
int a = 10, b = 3;
System.out.println(a / b);  // 3 (entera)
System.out.println(a % b);  // 1 (reste)
System.out.println((double) a / b); // 3.333...</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="warning">
      <strong>5 / 2</strong> és 2 · <strong>5 / 2.0</strong> és 2.5 · <strong>(double) 5 / 2</strong> és 2.5. Memoritza-ho com un mantra.
    </div>
    <h3 style="color:#3B82F6;margin-top:0.7rem;">🎭 Precedència: la llei del menjador</h3>
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Parèntesis ()</strong> — passe VIP, van els primers</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>* / %</strong> — els populars</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><strong>+ -</strong> — els normals, els últims</div>
    </div>
    <div class="info" style="margin-top:0.5rem;">
      Quan dubtes, <strong>posa parèntesis</strong>: no dolen i el teu jo del futur t'ho agrairà.
    </div>
  </div>
</div>

---
---

## Assignació composta i increment
### La drecera peresosa

<div class="two-cols">
  <div class="left">
    <h3 style="color:#3B82F6;">⚡ Dreceres d'assignació</h3>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Dreceres.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>int x = 10;
x += 5;  // x = 15 (x = x + 5)
x -= 3;  // x = 12
x *= 2;  // x = 24
x /= 4;  // x = 6
x %= 3;  // x = 0</code></pre>
    </div>
  </div>
  <div class="right">
    <h3 style="color:#3B82F6;">💪 ++ i --: dues cares</h3>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Increments.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>int a = 5;
int b = a++; // POST: usa (5), puja → b=5, a=6
int c = ++a; // PRE: puja, després usa → a=7, c=7</code></pre>
    </div>
    <div class="warning" style="margin-top: 0.6rem;">
      Si uses <code>++</code> dins d'una expressió complicada, escrius codi que ni tu entendràs en una setmana. Usa'ls <strong>sols</strong>, en la seua pròpia línia.
    </div>
  </div>
</div>

---
---

## Exercici: l'acròbata de les variables
### Sense executar, calcula quant val tot

<div class="two-cols">
  <div class="left">
    <div class="question-card">
      <span class="question-icon">🤸</span>
      <strong>Don Tip:</strong> desglossa l'expressió pas a pas. Quin valor té cada variable en cada moment? Anota-ho, no ho faces de memòria.
    </div>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Acróbata.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>int x = 3;
int y = x++ + ++x;
System.out.println("x = " + x + ", y = " + y);</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="answer-card">
      <strong>🔄 Solució:</strong> <code>x = 5, y = 8</code>
      <div style="margin-top:0.5rem;">
        <div class="step"><div class="step-number">1</div><div class="step-content">x = 3</div></div>
        <div class="step"><div class="step-number">2</div><div class="step-content"><code>x++</code>: usa 3, després puja x a 4</div></div>
        <div class="step"><div class="step-number">3</div><div class="step-content"><code>++x</code>: puja x a 5 i usa 5</div></div>
        <div class="step"><div class="step-number">4</div><div class="step-content">y = 3 + 5 = <strong>8</strong>, x = <strong>5</strong></div></div>
      </div>
    </div>
  </div>
</div>

---
class: compact-slide
---

## Relacionals, lògics i ternari
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Els operadors <strong>relacionals</strong> comparen valors i retornen un boolean; els <strong>lògics</strong> combinen booleans; i el <strong>ternari</strong> resumix una decisió en una sola línia.
  </div>
</div>

<div class="two-cols" style="margin-top: 1rem;">
  <div class="left">
    <h3 style="color:#3B82F6;">⚖️ El jutge de la discussió</h3>
    <p style="font-size:0.92rem;">Els relacionals sempre retornen <code>true</code> o <code>false</code>: el jutge que dicta sentència sobre dos valors.</p>
    <div class="warning" style="margin-top: 0.6rem;">
      <strong>= no és ==</strong>. = assigna ("guarda açò"); == compara ("són iguals?"). L'error més clàssic de la història de la programació.
    </div>
  </div>
  <div class="right">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Jutge.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>int edad = 18;
edad >= 18  // true
edad != 18  // false
edad > 21   // false
edad < 21   // true</code></pre>
    </div>
  </div>
</div>

---
class: compact-slide
---

## Operadors relacionals
### Taula del jutge (edad = 18)

| Operador | Significat | Exemple (edad = 18) |
| :---: | :--- | :--- |
| **==** | Igual que | `edad == 18` → true |
| **!=** | Distint de | `edad != 18` → false |
| **>** | Major que | `edad > 21` → false |
| **<** | Menor que | `edad < 21` → true |
| **>=** | Major o igual | `edad >= 18` → true |
| **<=** | Menor o igual | `edad <= 18` → true |

<div class="info" style="margin-top: 0.6rem;">
  Tots retornen un <code>boolean</code>: el resultat d'una comparació és una dada que pots guardar, passar i combinar.
</div>

---
---

## Lògics: el porter del club
### && (AND) · || (OR) · ! (NOT)

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">&&</div>
      <div class="step-content"><strong>AND</strong>: més de 18 <strong>I</strong> entrada? Les dos condicions s'han de complir</div>
    </div>
    <div class="step">
      <div class="step-number">‖</div>
      <div class="step-content"><strong>OR</strong>: més de 18 <strong>O</strong> eres l'amo? Basta una</div>
    </div>
    <div class="step">
      <div class="step-number">!</div>
      <div class="step-content"><strong>NOT</strong>: nega la condició</div>
    </div>
    <div class="code-card" style="margin-top: 0.6rem;">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Porter.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>boolean entra = mayorEdad && tieneEntrada;   // false
boolean entraVip = mayorEdad || tieneEntrada; // true
boolean noEsMenor = !(edad < 18);             // true</code></pre>
    </div>
  </div>
  <div class="right">
    <h3 style="color:#3B82F6;">⚡ Curtcircuit: el porter que no mira</h3>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Curtcircuit.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>int x = 5;
boolean r = (x > 10) && (++x > 0);
// false, i x seguix sent 5: el ++x mai no s'executa</code></pre>
    </div>
    <div class="info" style="margin-top: 0.6rem;">
      Amb <code>&&</code>, si el primer és <code>false</code>, Java <strong>ni mira</strong> el segon. Amb <code>||</code>, si el primer és <code>true</code>, tampoc. A més et protegix: <code>(algo != null) && algo.metodo()</code> evita el crash.
    </div>
  </div>
</div>

---
---

## El ternari i l'exemple guiat
### Un if-else de butxaca

<div class="two-cols">
  <div class="left">
    <h3 style="color:#3B82F6;">🎚️ El ternari</h3>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Ternari.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>int nota = 7;
String r = nota >= 5 ? "Aprobado" : "Suspenso";
// condició ? valorSiTrue : valorSiFalse</code></pre>
    </div>
    <div class="info" style="margin-top:0.5rem;">
      Els ternaris es poden <strong>encadenar</strong> per a tres casos o més.
    </div>
  </div>
  <div class="right">
    <h3 style="color:#3B82F6;">🏫 El porter del club</h3>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">ClubNoche.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>int edad = 19;
boolean entrada = true, esVip = false;
boolean puede = (edad >= 18) && (entrada || esVip);
String msg = puede ? "¡Pasa!" : "Fora de aquí";
int golesL = 2, golesV = 2;
String res = golesL > golesV ? "Gana local"
    : golesL < golesV ? "Gana visitante" : "Empate";</code></pre>
    </div>
  </div>
</div>

---
---

## Exercici: el detectiu de booleans
### Sense executar, calcula el valor de cada variable

<div class="two-cols">
  <div class="left">
    <div class="question-card">
      <span class="question-icon">🔍</span>
      <strong>Don Tip:</strong> en una expressió amb <code>&&</code> i <code>||</code>, pregunta sempre: <em>i si el primer ja decideix?</em> Eixe és el curtcircuit.
    </div>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Detectiu.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>int n = 10;
boolean a = (n > 5) && (n < 20);      // ¿?
boolean b = (n > 15) || (++n == 11);  // ¿?
boolean c = !(n == 10) && (n % 2 == 0); // ¿?
System.out.println(a);
System.out.println(b);
System.out.println(c);
System.out.println(n);</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="answer-card">
      <strong>🔄 Solució:</strong> true, true, false i 11
      <ul style="font-size:0.9rem;margin-top:0.4rem;">
        <li><strong>a</strong>: 10 > 5 <strong>i</strong> 10 < 20 → <code>true</code></li>
        <li><strong>b</strong>: 10 > 15 és false → Java avalu <code>++n == 11</code>: puja n a 11 i compara → <code>true</code></li>
        <li><strong>c</strong>: <code>!(n == 10)</code> amb n=11 → !false → true; && amb 11 % 2 == 0 → false → <code>false</code></li>
        <li><strong>n</strong> acabà en <strong>11</strong> pel <code>++n</code> de la línia 2</li>
      </ul>
    </div>
  </div>
</div>

---
class: compact-slide
---

## Casting i conversions
### La idea en una frase

<div class="key-idea" style="margin-top: 0.9rem; padding: 1.1rem 1.6rem 1.1rem 3.4rem;">
  <div class="key-idea-text" style="font-size: 1.25rem;">
    El casting converteix un valor d'un tipus a un altre: la conversió <strong>implícita</strong> (widening) la fa Java sol i sense pèrdues, mentre que l'<strong>explícita</strong> (narrowing) la forces tu amb <code>(tipo)</code> i pots perdre dades pel camí.
  </div>
</div>

<div class="two-cols" style="margin-top: 0.6rem;">
  <div class="left">
    <h3 style="color:#3B82F6;">🪜 Widening: mudar-se a caixa més gran</h3>
    <p style="font-size:0.92rem;"><code>byte → short → int → long → float → double</code></p>
    <p style="font-size:0.92rem;">Qualsevol tipus cap al de la seua dreta sense perdre ni un bit. Java somriu i et deixa.</p>
  </div>
  <div class="right">
    <h3 style="color:#F59E0B;">📉 Narrowing: la maleta XXL en un Smart</h3>
    <p style="font-size:0.92rem;">Java es nega. Has d'empènyer amb <code>(tipo)</code>: estàs dient <em>"confia en mi, sé el que faig"</em>.</p>
    <div class="warning" style="margin-top:0.5rem;">
      El casting sobre un double <strong>trunca</strong>, no redoniga: <code>(int) 19.99</code> dona 19. Per a redonir, <code>Math.round()</code>.
    </div>
  </div>
</div>

---
class: compact-slide
---

## El truncament i el desbordament
### El cèntim oblidat i l'elefant en el Mini Cooper

<div class="two-cols">
  <div class="left">
    <h3 style="color:#F59E0B;">🪓 Truncament</h3>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Trunca.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>double precio = 9.99;
int precioEntero = (int) precio;
System.out.println(precioEntero);
// 9 — t'acaben de llevar 0.99€</code></pre>
    </div>
  </div>
  <div class="right">
    <h3 style="color:#DC2626;">💥 Desbordament</h3>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Desborda.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>int grande = 300;
byte pequeno = (byte) grande;
System.out.println(pequeno);
// 44 — ¡quaranta-quatre!?</code></pre>
    </div>
    <div class="info" style="margin-top:0.5rem;">
      300 en binari és 100101100; un byte només guarda 8 bits → queda 00101100 = <strong>44</strong>. Elefant al Mini, eix un gos salchicha.
    </div>
  </div>
</div>

<div class="warning" style="margin-top: 0.7rem;">
  El desbordament <strong>no dona error</strong>: Java no t'avisa i el programa seguix corrent amb un valor absurd. Comprova sempre que el valor cap abans de forçar el casting.
</div>

---
class: compact-slide
---

## Exercici: seguix el guarda
### Determina què imprimeix este programa

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Cadena.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>int a = 10;
double b = a;
int c = (int) b;
byte d = (byte) c;
System.out.println(d);
int grande = 300;
byte pequeno = (byte) grande;
System.out.println(pequeno);</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="answer-card">
      <strong>🔄 Solució:</strong> <code>10</code> i <code>44</code>
      <ul style="font-size:0.9rem;margin-top:0.4rem;">
        <li><strong>Primer bloc</strong>: cadena sense pèrdua 10 → 10.0 → 10 → 10. Imprimeix <strong>10</strong></li>
        <li><strong>Segon bloc</strong>: desbordament clàssic — 300 no cap en un byte, es truncaren els bits i queda <strong>44</strong></li>
      </ul>
    </div>
    <div class="success" style="margin-top: 0.6rem;">
      <strong>Resum de la unitat (1/5):</strong> variable = caixa etiquetada (tipus, nom, valor) · 8 primitius, tria <code>int</code>/<code>double</code> per defecte · String es compara amb <code>.equals()</code> · divisió entera trunca · el casting pot truncar i desbordar.
    </div>
  </div>
</div>

---
layout: closing
---

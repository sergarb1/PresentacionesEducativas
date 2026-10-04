---
layout: cover
---

# Unitat 05 — Funcions i mètodes<br>Bloc 01

## 1r CFGS DAW · Programació

---
---

## Què veurem en este bloc

<div class="features-grid" style="grid-template-columns:repeat(4,1fr);gap:0.7rem;">
  <div class="feature-item" style="padding:0.7rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🍳</span><strong>Què és una funció?</strong><br>La recepta amb nom</div>
  <div class="feature-item" style="padding:0.7rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">✍️</span><strong>El primer mètode</strong><br>Declarar i cridar</div>
  <div class="feature-item" style="padding:0.7rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">📥</span><strong>Paràmetres</strong><br>L'entrada de la funció</div>
  <div class="feature-item" style="padding:0.7rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">📤</span><strong>return</strong><br>L'eixida: tornar un valor</div>
</div>

<p style="margin-top:0.7rem;">Tot en <strong>Java</strong>: el codi deixa de ser un paràgraf infinit i es converteix en un <strong>receptari</strong>.</p>

---
---

## Què és una funció?
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Una funció és una <strong>recepta amb nom</strong>: rep dades per la porta, fa una cosa ben explicada i torna el resultat; tu només la <strong>inviteixes pel seu nom</strong>.
  </div>
</div>

<div class="warning" style="margin-top:1.2rem;">
  Programar copiant i enganxant és com cuinar repetint cada pas del receptari en veu alta en cada plat: funciona... <strong>fins que tens comensals</strong>.
</div>

---
class: compact-slide
---

## El problema: el paràgraf infinit

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">Notas.java</div>
    <div class="code-card-badge">Java</div>
  </div>
  <pre><code>public class Notas {
    public static void main(String[] args) {
        // Calcular la mitjana de 3 notes
        double media = (8 + 7 + 9) / 3.0;
        System.out.println("Mitjana 1: " + media);
        // Calcular la mitjana d'altres 3 notes... una altra volta
        double media2 = (6 + 5 + 10) / 3.0;
        System.out.println("Mitjana 2: " + media2);
        // I demà, amb 30 alumnes: copiar i pegar 30 voltes
    }
}</code></pre>
</div>

<div class="warning">
  El càlcul està escrit <strong>dues voltes</strong>. Si canvies la fórmula (¿i si les notes tenen pes?), has d'arreglar <strong>totes les còpies</strong>: una oblidada i el programa ja ment. El codi repetit no és codi: <strong>és deute amb interessos</strong>.
</div>

---
---

## La màquina de fer plats

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud05-prg-funcio-recepta.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---
---

## La recepta amb nom

| Recepta de cuina | Funció en Java |
| :--- | :--- |
| El nom («Truita de patates») | El nom del mètode (`calcularMedia`) |
| Els ingredients que et passen | Els **paràmetres** (dades d'entrada) |
| Els passos dins de la recepta | El **cos** (el codi entre `{ i }`) |
| El plat que ix | El **valor que torna** (o res, si només fa) |

<div class="code-card" style="margin-top:0.6rem;">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">crida</div>
    <div class="code-card-badge">Java</div>
  </div>
  <pre><code>double notaMedia = calcularMedia(8, 7, 9);
System.out.println("Mitjana 1: " + notaMedia);</code></pre>
</div>

<div class="success">
  Dues línies on abans n'hi havia tres... i la fórmula <strong>només està escrita una volta</strong>. Quan canvie, canviarà en un sol lloc.
</div>

---
---

## Funció o mètode? (no, no és el mateix... bé, sí)

<div class="two-cols">
  <div class="left">
    <div class="info">
      <strong>Funció</strong> és el concepte general: entrades → procés → eixida. En Python, JavaScript o C se'n diu funcions.
    </div>
    <div class="info" style="margin-top:0.6rem;">
      <strong>Mètode</strong> és eixa mateixa idea <strong>vivint dins d'una classe</strong>, que és on viu tot en Java (fins i tot <code>main</code>, ho vas vore en la U02).
    </div>
  </div>
  <div class="right">
    <div class="success">
      En la pràctica, tothom usa els dos noms per al mateix. Si en una entrevista et pregunten la diferència: <strong>en Java, les funcions són mètodes d'una classe</strong>.
    </div>
    <div class="warning" style="margin-top:0.6rem;">
      🕶️ <strong>Don Tip:</strong> el nom del mètode és documentació. Un mètode anomenat <code>hacerCosas</code> és una confessió; un anomenat <code>calcularIVA</code> és un pla.
    </div>
  </div>
</div>

---
---

## Què guanya el teu programa al tallar-lo

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><strong>No repeteixes codi.</strong> La fórmula s'escriu una volta i s'usa 30</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><strong>Es llig millor.</strong> <code>mostrarMedia(...)</code> explica què passa; cinc línies d'aritmètica a mitges, no</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><strong>Es prova per parts.</strong> Comproves que <code>calcularMedia</code> funciona sense executar tot el programa</div>
</div>
<div class="step">
  <div class="step-number">4</div>
  <div class="step-content"><strong>Es repara sense por.</strong> Arregles el tros trencat i la resta no s'assabenta</div>
</div>

<div class="info">
  És l'instint de la <strong>descomposició</strong> de la U01, però ara amb ferramenta: abans <em>pensaves</em> el problema per parts; ara <strong>escrius</strong> cada part per separat.
</div>

---
class: compact-slide
---

## Exercici: el vident d'eixides

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">Vidente.java</div>
    <div class="code-card-badge">Java</div>
  </div>
  <pre><code>public class Vidente {
    static void saludar() {
        System.out.println("Hola, món");
    }
    public static void main(String[] args) {
        saludar();
        saludar();
    }
}</code></pre>
</div>

<div class="question-card">
  <span class="question-icon">🧠</span>
  Què imprimeix? (A) Hola, món una volta · (B) dues voltes · (C) res
</div>

<div class="answer-card">
  <strong>🔄 Solució: la B.</strong> <code>saludar()</code> es crida dues voltes i cada crida executa el seu cos. Un mètode <strong>no s'executa sol</strong> en declarar-se: només quan algú el crida. (La C és la trampa clàssica de «si està escrit, s'executa».)
</div>

---
---

## Mini-chequeig: què és una funció?

<div class="question-card">
  <span class="question-icon">🧠</span>
  Respon en 30 segons:
</div>

1. Quines tres coses «típiques» té una funció (taula de la recepta)?
2. S'executa el cos d'un mètode pel sol fet d'estar escrit al fitxer?
3. `main` és una funció? I `saludar()` del teu programa?
4. Menciona dos avantatges de tallar el codi en mètodes.

<div class="answer-card">
  <strong>🔄 Respostes:</strong>
  <ul style="font-size:0.85rem;margin-top:0.3rem;">
    <li>Un <strong>nom</strong>, unes <strong>entrades</strong> (paràmetres) i un <strong>resultat</strong> que torna (o res)</li>
    <li>No: s'executa quan algú el <strong>crida</strong></li>
    <li>Els dos són mètodes; <code>main</code> és el mètode especial per on arranca la JVM</li>
    <li>No repetir codi · llegibilitat · provar per parts · reparar sense trencar la resta</li>
  </ul>
</div>

---

## El teu primer mètode
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Declarar un mètode és escriure la seua recepta (<code>public static void nom() { ... }</code>); cridar-lo és dir el seu nom amb parèntesis i punt i coma perquè <strong>execute el seu cos</strong>.
  </div>
</div>

<div class="step" style="margin-top:1.4rem;">
  <div class="step-number">✍️</div>
  <div class="step-content">La <strong>declaració</strong> no porta punt i coma: acaba amb el seu bloc <code>{ ... }</code>. La <strong>crida</strong> sí: és una sentència, igual que <code>int x = 5;</code></div>
</div>

---
class: compact-slide
---

## La primera recepta

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Saludo.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>public class Saludo {
    public static void saludar() {
        System.out.println("Hola, classe!");
    }
    public static void main(String[] args) {
        saludar();
        saludar();
    }
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="terminal">
      <div><span class="prompt">$</span> java Saludo</div>
      <div class="output">Hola, classe!</div>
      <div class="output">Hola, classe!</div>
    </div>
    <div class="info" style="margin-top:0.6rem;">
      <code>saludar()</code> és la <strong>recepta</strong> (declarada amunt); en <code>main</code> la <strong>cridem</strong> dues voltes. Cada crida executa el cos sencer.
    </div>
    <div class="warning" style="margin-top:0.5rem;">
      El nom va en <strong>camelCase</strong>: <code>calcularMedia</code>, <code>mostrarMenu</code>, <code>esPar</code>. Sense espais ni accents, la primera paraula en minúscula.
    </div>
  </div>
</div>

---
---

## La firma, paraula per paraula

| Paraula | Què significa | Quan la veuràs explicada |
| :--- | :--- | :--- |
| `public` | Visible des de qualsevol lloc | U10 (visibilitat) |
| `static` | Pertany a la classe, no a un objecte | U10 (mètodes static) |
| `void` | No torna res | Este punt 4, ara mateix |
| `saludar()` | El nom i els seus parèntesis | Hui |

<div class="warning" style="margin-top:0.8rem;">
  De moment escrius <strong>sempre</strong> <code>public static</code> davant dels teus mètodes. Sense <code>static</code>, <code>main</code> no podrà cridar-los: <code>non-static method cannot be referenced from a static context</code>.
</div>

---
---

## Declarar i cridar dins de la classe

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud05-prg-firma-crida.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---
---

## main també és un mètode

<div class="key-idea">
  <div class="key-idea-text">
    <code>main</code> no és especial per màgia: la JVM <strong>el busca per eixe nom exacte</strong> per arrancar el teu programa. Tot el que has usat des de la primera unitat era... <strong>un mètode més</strong>.
  </div>
</div>

<div class="step" style="margin-top:1.2rem;">
  <div class="step-number">🔓</div>
  <div class="step-content"><code>public</code> → la JVM ha de poder veure'l · <code>static</code> → el crida <strong>sense crear objectes</strong> · <code>void</code> → no torna res · <code>String[] args</code> → els arguments de la línia d'ordres (U02)</div>
</div>

<div class="success">
  Abans cridaves a un mètode sense adonar-te'n. Ara crides a tots els que et vinga de gust.
</div>

---
---

## Les regles del joc

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">Els mètodes es declaren <strong>dins de la classe</strong>, mai dins d'un altre mètode (ni tan sols dins de <code>main</code>)</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">L'<strong>ordre no importa</strong>: pots cridar un mètode declarat més baix. Java no llig d'amunt a avall; <strong>busca per nom</strong></div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">Dos mètodes no poden dir-se igual <strong>amb els mateixos paràmetres</strong> (la sobrecàrrega arriba en la U09)</div>
</div>

<div class="warning" style="margin-top:0.7rem;">
  <code>cannot find symbol</code> en cridar un mètode gairebé sempre vol dir: li has posat <strong>un nom diferent</strong> del que té, o el crides des de fora de la classe.
</div>

---
class: compact-slide
---

## Exercici: la firma trencada

<div class="comparison-grid">
  <div class="comparison-item">
    <p><strong>A</strong> · <code>static public void contar() { ... }</code></p>
    <p><strong>B</strong> · <code>public static contar() { ... }</code></p>
    <p><strong>C</strong> · <code>public static void contar { ... }</code></p>
    <p><strong>D</strong> · <code>public static void contar() System.out.println("1");</code></p>
  </div>
  <div class="comparison-item good">
    <p><strong>🔄 Compila la A.</strong> <code>static</code> i <code>public</code> són modificadors: qualsevol ordre val.</p>
    <p>La <strong>B</strong> oblida el tipus de retorn (<code>void</code>).</p>
    <p>La <strong>C</strong> oblida els parèntesis <code>()</code>.</p>
    <p>La <strong>D</strong> oblida les claus: el cos <strong>sempre</strong> va entre <code>{ }</code>.</p>
  </div>
</div>

---
---

## Mini-chequeig: el primer mètode

<div class="question-card">
  <span class="question-icon">🧠</span>
  Respon sense mirar:
</div>

1. Escriu la firma completa d'un mètode `acomiadar` que no torne res.
2. Quina línia (i en quin lloc) executa el cos d'`acomiadar()`?
3. Pot `main` estar declarat després d'`acomiadar`? I a l'inrevés?
4. Quina és la diferència de puntuació entre declarar i cridar?

<div class="answer-card">
  <strong>🔄 Respostes:</strong>
  <ul style="font-size:0.85rem;margin-top:0.3rem;">
    <li><code>public static void acomiadar() { ... }</code></li>
    <li>Una <strong>crida</strong> amb punt i coma, tipus <code>acomiadar();</code> dins de <code>main</code></li>
    <li>Sí als dos: l'ordre dels mètodes <strong>no importa</strong></li>
    <li>Declarar acaba en <code>{ ... }</code> <strong>sense</strong> <code>;</code>; cridar és una sentència i porta <code>;</code></li>
  </ul>
</div>

---

## Paràmetres: l'entrada
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Els paràmetres són les variables que un mètode <strong>rep en ser cridat</strong>: tu passes valors en els parèntesis i el mètode treballa amb ells com si els haguera escrit ell mateix.
  </div>
</div>

<div class="step" style="margin-top:1.4rem;">
  <div class="step-number">🔁</div>
  <div class="step-content">El nostre <code>saludar()</code> només sap dir una cosa. Per saludar a «Marta», a «Youssef» i a tota la classe... <strong>donem-li entrades</strong></div>
</div>

<div class="success">
  Una sola recepta, tres plats: el mètode ja no decideix quines dades usa. <strong>Se les passes tu</strong>.
</div>

---
class: compact-slide
---

## Paràmetres en acció

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Saludos.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>public class Saludos {
   public static void saludar(String nombre) {
      System.out.println("Hola, " + nombre + "!");
   }
   public static void main(String[] args) {
      saludar("Marta");
      saludar("Youssef");
      saludar("la classe sencera");
   }
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="terminal">
      <div><span class="prompt">$</span> java Saludos</div>
      <div class="output">Hola, Marta!</div>
      <div class="output">Hola, Youssef!</div>
      <div class="output">Hola, la classe sencera!</div>
    </div>
    <div class="info" style="margin-top:0.6rem;">
      Cada paràmetre porta <strong>tipus i nom</strong>, com una variable: <code>String nombre</code>, <code>int edad</code>, <code>double nota</code>. Dins del cos s'usen <strong>com variables normals</strong>.
    </div>
    <div class="warning" style="margin-top:0.5rem;">
      Varios paràmetres se separen amb <strong>coma</strong> i cadascú repeteix el seu tipus: <code>String nombre, int edad</code>
    </div>
  </div>
</div>

---
---

## Paràmetre ≠ argument

| Moment | Nom | Exemple |
| :--- | :--- | :--- |
| Declarar el mètode | **Paràmetres** | `int a, int b` |
| Cridar el mètode | **Arguments** | `3, 4` |

<div class="code-card" style="margin-top:0.6rem;">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">parametres.java</div>
    <div class="code-card-badge">Java</div>
  </div>
  <pre><code>// paràmetres (en la declaració)
static int sumar(int a, int b) { return a + b; }
// arguments (en la crida)
int r = sumar(3, 4);</code></pre>
</div>

<div class="info" style="margin-top:0.6rem;">
  💡 Nomena els paràmetres pel que <strong>són</strong>: <code>double base, double altura</code> s'entén; <code>double x, double y</code> obliga a llegir el cos cada volta.
</div>

---
---

## La còpia que viatja

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud05-prg-parametres-arguments.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---
class: compact-slide
---

## Regles de les entrades

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><strong>L'ordre importa:</strong> <code>presentar("Ana", 20)</code> no és <code>presentar(20, "Ana")</code> (aquesta ni compila)</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><strong>El nombre importa:</strong> <code>sumar(3)</code> o <code>sumar(3, 4, 5)</code> no quadren amb la firma → error de compilació</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><strong>El tipus ha d'encaixar:</strong> un <code>int</code> cap on es demana <code>double</code> (ampliació), però un <code>String</code> on es demana <code>int</code> és un mur</div>
</div>
<div class="step">
  <div class="step-number">4</div>
  <div class="step-content">Cada crida crea <strong>les seues pròpies còpies</strong>: <code>sumar(3, 4)</code> i <code>sumar(10, 20)</code> no es pisen</div>
</div>

<div class="warning" style="margin-top:0.6rem;">
  Els paràmetres <strong>no són opcionals</strong>: cridar <code>saludar();</code> a un mètode que espera un <code>String</code> dona <code>method saludar in class ... cannot be applied to given types</code>.
</div>

---
class: compact-slide
---

## Exercici: la crida confusa

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Confusion.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>static void pintar(String color, int veces) {
   for (int i = 0; i &lt; veces; i++) {
      System.out.print(color);
   }
   System.out.println();
}
// en main:
pintar("verd", 3);
pintar(2, "blau");</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="question-card">
      <span class="question-icon">🧠</span>
      Què passa?
    </div>
    <p>(A) verdverdverd i blaublaublau<br>(B) bucle rar amb 2222...<br>(C) No compila<br>(D) Necessita return</p>
    <div class="answer-card">
      <strong>🔄 Solució: la C.</strong> En <code>pintar(2, "blau")</code> arriba un <code>int</code> on ha d'anar el <code>String</code> → <code>incompatible types</code>. L'ordre dels arguments <strong>és part de la firma</strong>.
    </div>
  </div>
</div>

---
---

## Mini-chequeig: paràmetres

<div class="question-card">
  <span class="question-icon">🧠</span>
  Respon en 30 segons:
</div>

1. En `static void log(String mensaje, int nivel)`, quins són els paràmetres? I els arguments de `log("Fallo", 3)`?
2. Per què `sumar(1, 2, 3)` no compila si la firma és `sumar(int a, int b)`?
3. Es pot cridar sense parèntesis, com `saludar;`?

<div class="answer-card">
  <strong>🔄 Respostes:</strong>
  <ul style="font-size:0.85rem;margin-top:0.3rem;">
    <li>Paràmetres: <code>String mensaje</code> i <code>int nivel</code>. Arguments: <code>"Fallo"</code> i <code>3</code></li>
    <li>La firma admet <strong>2</strong> arguments i la crida n'envia <strong>3</strong>: <code>wrong number of arguments</code></li>
    <li>No: sense <code>()</code> no hi ha crida. Crida = <code>saludar();</code></li>
  </ul>
</div>

---

## return: l'eixida
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Un mètode amb <code>return</code> calcula i <strong>lliura un valor</strong> a qui l'ha cridat; un mètode <code>void</code> només executa i se calla. La firma <strong>promet el tipus</strong> i <code>return</code> compleix la promesa.
  </div>
</div>

<div class="step" style="margin-top:1.4rem;">
  <div class="step-number">📤</div>
  <div class="step-content">Fins ara els teus mètodes <strong>feien</strong> coses (imprimien). Ara aniran a <strong>entregar</strong> coses: qui crida rep el valor <strong>i pot usar-lo</strong></div>
</div>

---
class: compact-slide
---

## Dos oficis, dos firmes

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Suma.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>public static int sumar(int a, int b) {
    return a + b;
}
// en main, el valor es pot usar:
int total = sumar(3, 4);      // 7 guardat
System.out.println(sumar(3, 4)); // 7 directe
int doble = sumar(sumar(1, 2), 3); // 6</code></pre>
    </div>
  </div>
  <div class="right">
    <table>
      <thead><tr><th>Usa return quan...</th><th>Usa void quan...</th></tr></thead>
      <tbody>
        <tr><td>Un altre mètode <strong>necessita el resultat</strong></td><td>Només cal un <strong>efecte</strong> (imprimir, guardar)</td></tr>
        <tr><td>La tasca és «<strong>calcular</strong>»</td><td>La tasca és «<strong>fer</strong>»</td></tr>
        <tr><td>Vols provar el valor per separat</td><td>El resultat ja es veu en pantalla</td></tr>
      </tbody>
    </table>
    <div class="warning" style="margin-top:0.6rem;">
      💡 Si es diu <code>calcular...</code>, <code>get...</code> o <code>es...</code> → segurament <strong>torna</strong>. Si es diu <code>imprimir...</code> o <code>mostrar...</code> → segurament <strong>void</strong>.
    </div>
  </div>
</div>

---
class: compact-slide
---

## return talla l'execució

<div class="diagram-frame diagram-medium">
  <Excalidraw drawFilePath="/diagrams/ud05-prg-return-flux.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---
---

## El pecat d'imprimir quan has de tornar

<div class="comparison-grid">
  <div class="comparison-item bad">
    <p><strong>❌ void que imprimeix</strong></p>
    <p><code>static void media(int a, int b) {</code><br><code>&nbsp;&nbsp;System.out.println((a + b) / 2.0);</code><code>}</code></p>
    <p>main <strong>no pot guardar</strong> la mitjana, comparar-la ni reutilitzar-la: es va imprimir i <strong>va desaparéixer</strong>.</p>
  </div>
  <div class="comparison-item good">
    <p><strong>✅ que torna</strong></p>
    <p><code>static double media(int a, int b) {</code><br><code>&nbsp;&nbsp;return (a + b) / 2.0;</code><code>}</code></p>
    <p>El valor entra al programa <strong>com a dades de veritat</strong>: qui crida decideix què fer amb ell.</p>
  </div>
</div>

<div class="warning" style="margin-top:0.6rem;">
  <code>System.out.println</code> és per a <code>main</code> (o per als mètodes el ofici dels quals siga mostrar). <strong>Qui calcula calcula; qui decideix imprimeix.</strong>
</div>

---
class: compact-slide
---

## Exercici: l'endevinalla del retorn

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Truco.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>public static int truco(int x) {
   if (x &gt; 10) {
      return x * 2;
   } else if (x &gt; 5) {
      return x + 3;
   }
   return 1;
}
// què torna...
truc(7)  → ?
truc(12) → ?</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="question-card">
      <span class="question-icon">🧠</span>
      Tria: (A) 10 i 24 · (B) 14 i 24 · (C) 10 i 12 · (D) truco(7) no torna res
    </div>
    <div class="answer-card">
      <strong>🔄 Solució: la A.</strong> <code>truco(7)</code> cau en <code>x &gt; 5</code> i torna <code>7 + 3 = 10</code>. <code>truco(12)</code> compleix <code>x &gt; 10</code> i torna <code>12 × 2 = 24</code>. Traça el camí línia a línia: és exactament el que fa Java.
    </div>
    <div class="info" style="margin-top:0.5rem;">
      🕶️ <strong>Don Tip:</strong> <code>return true;</code> / <code>return false;</code> en mètodes <code>es...</code> o <code>pot...</code> converteix preguntes en <strong>booleanes reutilitzables</strong>.
    </div>
  </div>
</div>

---
---

## Mini-chequeig: return

<div class="question-card">
  <span class="question-icon">🧠</span>
  Respon sense mirar:
</div>

1. En `public static boolean esPar(int n)`, quina línia mínima ha de tindre el cos?
2. Quin error dona un mètode `int` amb un camí sense `return`?
3. Es pot fer `return;` (buit) en un mètode `int`?

<div class="answer-card">
  <strong>🔄 Respostes:</strong>
  <ul style="font-size:0.85rem;margin-top:0.3rem;">
    <li>Almenys un <code>return</code> amb booleà: <code>return n % 2 == 0;</code></li>
    <li><code>missing return statement</code> (error de compilació)</li>
    <li>No: <code>return;</code> buit només val en mètodes <code>void</code>; un <code>int</code> necessita <code>return expressió;</code></li>
  </ul>
</div>

---
---

## Resum del bloc 01

<div class="features-grid" style="grid-template-columns:repeat(4,1fr);gap:0.7rem;">
  <div class="feature-item" style="padding:0.7rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🍳</span><strong>Funció</strong><br>Recepta amb nom: escriure una volta, usar moltes</div>
  <div class="feature-item" style="padding:0.7rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">✍️</span><strong>Firma</strong><br><code>public static void nom()</code>; crida amb <code>()</code> i <code>;</code></div>
  <div class="feature-item" style="padding:0.7rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">📥</span><strong>Paràmetres</strong><br>Ordre, nombre i tipus encaixen amb la firma</div>
  <div class="feature-item" style="padding:0.7rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">📤</span><strong>return</strong><br>Talla el mètode i lliura el valor promés</div>
</div>

<div class="success" style="margin-top:0.8rem;">
  Bloc 02: l'<strong>àmbit</strong> de les variables, els <strong>7 errors freqüents</strong>, com <strong>dividir el problema</strong> i el taller <strong>Be the Code</strong>.
</div>

---
layout: closing
---

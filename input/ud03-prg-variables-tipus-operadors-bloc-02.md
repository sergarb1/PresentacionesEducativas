---
layout: cover
---

# Unitat 03 — Variables, tipus i operadors<br>Bloc 02

## 1r CFGS DAW · Programació

---
class: compact-slide
---

## Scanner: llegir pel teclat
### La idea en una frase

<div class="key-idea" style="margin-top: 0.7rem; padding: 0.9rem 1.4rem 0.9rem 3.1rem;">
  <div class="key-idea-text" style="font-size: 1.15rem;">
    <code>Scanner</code> és la classe de Java que llegeix el que escrius pel teclat: instancies un objecte amb <code>new Scanner(System.in)</code> i li demanes dades amb <code>nextInt()</code>, <code>nextDouble()</code> o <code>nextLine()</code>.
  </div>
</div>

<div class="two-cols" style="margin-top: 0.4rem;">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Importar</strong> — <code>import java.util.Scanner;</code> demanes el llibre a la biblioteca</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Instanciar</strong> — <code>Scanner sc = new Scanner(System.in);</code> (el constructor, com <code>new String(...)</code>)</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><strong>Demanar dades</strong> — mètodes <code>next...</code>: cada un espera que escrigues i pulses Enter</div>
    </div>
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content"><strong>Tancar</strong> — <code>sc.close();</code> en acabar</div>
    </div>
  </div>
  <div class="right">
    <div class="success">
      A partir d'ací els teus programes tenen <strong>oïdes</strong>: conversors, calculadores, registres de notes... programes de veritat.
    </div>
  </div>
</div>

---
---

## Demanar dades: els mètodes next

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">PrimerEscucha.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>import java.util.Scanner;
public class PrimerEscucha {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("¿Cómo te llamas? ");
        String nombre = sc.nextLine();
        System.out.print("¿Cuántos años tienes? ");
        int edad = sc.nextInt();
        System.out.print("¿Nota media? ");
        double nota = sc.nextDouble();
        System.out.println("Hola, " + nombre
            + ". " + edad + " anys i un " + nota);
        sc.close();
    }
}</code></pre>
    </div>
  </div>
  <div class="right">
    <h3 style="color:#3B82F6;">Els mètodes més usats</h3>
    <table>
      <thead><tr><th>Mètode</th><th>Llig</th></tr></thead>
      <tbody><tr><td><code>nextLine()</code></td><td>Una línia de text completa</td></tr>
      <tr><td><code>next()</code></td><td>Només la següent paraula</td></tr>
      <tr><td><code>nextInt()</code></td><td>Un número enter</td></tr>
      <tr><td><code>nextDouble()</code></td><td>Un número amb decimals</td></tr>
      <tr><td><code>nextBoolean()</code></td><td>true o false</td></tr>
    </tbody></table>
  </div>
</div>

---
---

## ⚠️ L'embolic de nextLine() després de nextInt()
### L'error més odiat del Scanner

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Trampa.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>System.out.print("Edad: ");
int edad = sc.nextInt(); // escrius 18 + Enter
System.out.print("Nombre: ");
String nombre = sc.nextLine();
// ¡es salta la pregunta! retorna ""</code></pre>
    </div>
    <div class="warning" style="margin-top:0.6rem;">
      Quan fas <code>nextInt()</code>, l'Enter que vas pulsar <strong>queda al buffer</strong>. El següent <code>nextLine()</code> se'l menja i retorna una línia buida.
    </div>
  </div>
  <div class="right">
    <h3 style="color:#16A34A;">La solució: el guardià del buffer</h3>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Arreglat.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>int edad = sc.nextInt();
sc.nextLine(); // es menja l'Enter sobrant
String nombre = sc.nextLine(); // ara sí</code></pre>
    </div>
    <div class="success" style="margin-top:0.6rem;">
      Memoritza el reflex: <strong>número → nextLine() buit → text</strong>. Apareix en tots els exàmens.
    </div>
  </div>
</div>

---
class: compact-slide
---

## Consola: eixida amb format
### La idea en una frase

<div class="key-idea" style="margin-top: 0.9rem; padding: 1rem 1.5rem 1rem 3.2rem;">
  <div class="key-idea-text" style="font-size: 1.18rem;">
    <code>printf</code> i <code>String.format</code> donen format a la teua eixida (decimals, amplària, alineació) en una línia, i conéixer els errors típics del Scanner t'estalvia els bugs més odiats de la unitat.
  </div>
</div>

<div class="two-cols" style="margin-top: 1rem;">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Format.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>String nom = "Ana";
int edat = 20;
double nota = 9.5;
System.out.printf("Nom: %s, Edat: %d, Nota: %.2f%n",
    nom, edat, nota);
// Nom: Ana, Edat: 20, Nota: 9,50</code></pre>
    </div>
  </div>
  <div class="right">
    <h3 style="color:#3B82F6;">Especificadors bàsics</h3>
    <table>
      <thead><tr><th>Especificador</th><th>Tipus</th></tr></thead>
      <tbody><tr><td><code>%s</code></td><td>String</td></tr>
      <tr><td><code>%d</code></td><td>Enter</td></tr>
      <tr><td><code>%f</code></td><td>Decimal (<code>%.2f</code> = 2 decimals)</td></tr>
      <tr><td><code>%c</code></td><td>Caràcter</td></tr>
      <tr><td><code>%n</code></td><td>Salt de línia (multiplataforma)</td></tr>
    </tbody></table>
  </div>
</div>

---
---

## Decimals, amplària i String.format
### Controlar com es veu

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Amplaria.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>double pi = Math.PI;
System.out.printf("%.2f%n", pi);   // 3,14
System.out.printf("%10.2f%n", pi); // alineat dreta
System.out.printf("%-10.2f%n", pi); // alineat esquerra</code></pre>
    </div>
    <div class="warning" style="margin-top:0.5rem;">
      Els decimals usen la <strong>configuració regional</strong>: locale espanyol escriu <code>3,14</code> (coma); anglés, <code>3.14</code> (punt). No t'espantes si varia.
    </div>
  </div>
  <div class="right">
    <h3 style="color:#3B82F6;">🧵 String.format: el mateix sense imprimir</h3>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Missatge.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>String msg = String.format(
    "Benvingut, %s. Tens %d missatges.",
    "Carles", 3);
// Benvingut, Carles. Tens 3 missatges.</code></pre>
    </div>
    <div class="info" style="margin-top:0.5rem;">
      <code>printf</code> per a <strong>imprimir</strong> · <code>String.format</code> per a <strong>guardar</strong> el text format com a valor.
    </div>
  </div>
</div>

---
class: compact-slide
---

## Errors clàssics del Scanner
### I els seus remeis

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Oblidar l'import</strong> — sense <code>import java.util.Scanner;</code>, Java no coneix la classe</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>No tancar-lo</strong> — <code>sc.close()</code> sempre en acabar</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><strong>Tipus equivocat</strong> — demanes int, escriuen lletres → 💥 <code>InputMismatchException</code></div>
    </div>
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content"><strong>Enter residual</strong> — nextLine() després de nextInt() (recordatori)</div>
    </div>
  </div>
  <div class="right">
    <h3 style="color:#16A34A;">El validador que no es trenca</h3>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">EdatSegura.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>int edat = -1;
while (edat == -1) {
    System.out.print("Quants anys tens? ");
    if (sc.hasNextInt()) {
        edat = sc.nextInt();
    } else {
        System.out.println("Això no és un enter.");
        sc.next(); // descarta la brossa
    }
}</code></pre>
    </div>
    <div class="info" style="margin-top:0.5rem;">
      <code>hasNextInt()</code> <strong>no consumeix</strong> la dada: si no és enter, consumix la brossa amb <code>sc.next()</code> abans de tornar a preguntar.
    </div>
  </div>
</div>

---
class: compact-slide
---

## Math.random(): el casino de Java
### La idea en una frase

<div class="key-idea" style="margin-top: 0.9rem; padding: 1rem 1.5rem 1rem 3.2rem;">
  <div class="key-idea-text" style="font-size: 1.18rem;">
    <code>Math.random()</code> retorna un nombre aleatori entre <strong>0.0 (inclòs) i 1.0 (exclòs)</strong>, i amb la fórmula <code>(int)(Math.random() * (max - min + 1)) + min</code> el converteixes en un dau, una loteria o qualsevol nombre que necessites.
  </div>
</div>

<div class="two-cols" style="margin-top: 1rem;">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Casino.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>double aleatorio = Math.random(); // 0.0–0.999...
int deCeroANueve = (int) (Math.random() * 10); // 0–9
int dado = (int) (Math.random() * 6) + 1; // 1–6</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><code>Math.random() * 6</code> → entre 0.0 i 5.999...</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><code>(int)</code> el trunca → entre 0 i 5</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><code>+ 1</code> el desplaça → entre <strong>1 i 6</strong> ✅</div>
    </div>
    <div class="info" style="margin-top:0.5rem;">
      És un mètode <strong>estàtic</strong>: es crida amb <code>Math.nombre</code>, sense crear objectes.
    </div>
  </div>
</div>

---
---

## La fórmula universal i la classe Math
### De 0.0–1.0 al que tu vulgues

<div class="two-cols">
  <div class="left">
    <h3 style="color:#3B82F6;">🎯 La fórmula universal</h3>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Formula.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>int numero = (int) (Math.random()
    * (max - min + 1)) + min;
// entre 5 i 10
int n = (int) (Math.random() * 6) + 5;</code></pre>
    </div>
    <div class="warning" style="margin-top:0.5rem;">
      <strong>Trunca abans de sumar</strong>: <code>(int)(... * 6) + 1</code>, mai <code>(int)(... * 6 + 1)</code>. Si sumes dins del casting, el rang canvia i els teus daus mentiran.
    </div>
  </div>
  <div class="right">
    <h3 style="color:#3B82F6;">🧰 La sala de màquines de Math</h3>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Math.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>Math.PI        // 3.14159...
Math.pow(2, 10) // 1024.0
Math.sqrt(144)  // 12.0
Math.abs(-7)    // 7.0
Math.round(4.6) // 5  (redonix)
Math.ceil(4.1)  // 5.0 (sostre)
Math.floor(4.9) // 4.0 (sòl)
Math.max(3, 9)  // 9
Math.min(3, 9)  // 3</code></pre>
    </div>
  </div>
</div>

---
---

## Exercici: el dau que menteix
### Quin rang produïx cada línia?

<div class="two-cols">
  <div class="left">
    <div class="question-card">
      <span class="question-icon">🎲</span>
      Quina de les tres és la que dona un dau de veritat (1 a 6)?
    </div>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Dauses.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>int a = (int) (Math.random() * 6);
int b = (int) (Math.random() * 6) + 1;
int c = (int) (Math.random() * 7);</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="answer-card">
      <strong>🔄 Solució</strong>
      <ul style="font-size:0.9rem;margin-top:0.4rem;">
        <li><strong>a</strong>: 0.0–5.999 truncat → <strong>0 a 5</strong></li>
        <li><strong>b</strong>: l'anterior + 1 → <strong>1 a 6</strong> ✅ el dau de veritat</li>
        <li><strong>c</strong>: 0.0–6.999 truncat → <strong>0 a 6</strong> (set cares, i el 0 no existeix!)</li>
      </ul>
    </div>
    <div class="info" style="margin-top:0.6rem;">
      La diferència entre b i c és subtil però decisiva: la <code>+ 1</code> ha d'anar <strong>fora</strong> del casting.
    </div>
  </div>
</div>

---
class: compact-slide
---

## Mètodes útils de String
### La idea en una frase

<div class="key-idea" style="margin-top: 0.6rem; padding: 0.8rem 1.4rem 0.8rem 3rem;">
  <div class="key-idea-text" style="font-size: 1.12rem;">
    <code>String</code> porta de sèrie una caixa de ferramentes per a <strong>mesurar, retallar, buscar i transformar text</strong>: <code>length()</code>, <code>trim()</code>, <code>toUpperCase()</code>, <code>substring()</code>, <code>replace()</code>...
  </div>
</div>

<div class="two-cols" style="margin-top: 0.4rem;align-items:start;">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Gimnas.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre style="font-size:0.66rem;"><code>String texto = " Programación DAW ";
texto.length();      // 20 (espais inclosos)
texto.trim();        // "Programación DAW"
texto.toUpperCase(); // MAJÚSCULES
texto.toLowerCase(); // minúscules
texto.contains("DAW");   // true
texto.indexOf("DAW");    // 15
texto.substring(2, 14);  // "Programación"
texto.replace("DAW", "DAM");</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Cerca.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre style="font-size:0.66rem;"><code>String email = "ana@instituto.edu";
email.contains("@");   // true
email.endsWith(".edu"); // true
email.indexOf("@");     // 3 (-1 si no és)
String sucio = " Ana ";
sucio.trim();           // "Ana"</code></pre>
    </div>
    <div class="warning" style="margin-top:0.5rem;">
      En <code>substring(inicio, fin)</code> el <strong>fin no s'inclou</strong> · <code>indexOf()</code> retorna <strong>-1</strong> si no troba.
    </div>
  </div>
</div>

---
class: compact-slide
---

## length() porta parèntesis i l'exemple guiat
### Mètodes d'objecte: texto.metodo()

<div class="two-cols">
  <div class="left">
    <div class="info">
      <code>length()</code> és un <strong>mètode</strong> (amb parèntesis). Escriure <code>texto.length</code> no compila. (Els arrays usen <code>.length</code> sense parèntesis — la U06.)
    </div>
    <h3 style="color:#3B82F6;">🏫 Exemple guiat: el nom de l'usuari</h3>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">ProcesaNombre.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre style="font-size:0.72rem;"><code>String nombre = " aNA ";
String limpio = nombre.trim();        // "aNA"
String mayus = limpio.toUpperCase();  // "ANA"
String primera = mayus.substring(0, 1); // "A"
String ultima = mayus.substring(mayus.length() - 1); // "A"</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="question-card">
      <span class="question-icon">👑</span>
      <strong>Exercici: la inicial d'una reina.</strong> Sense executar, què imprimeix?
    </div>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Reina.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre style="font-size:0.72rem;"><code>String nombre = " merida ";
String inicial = nombre.trim().toUpperCase().substring(0, 1);
String resto = nombre.trim().substring(1).toLowerCase();
System.out.println(inicial + ". " + resto);</code></pre>
    </div>
    <div class="answer-card" style="margin-top:0.4rem;font-size:0.88rem;">
      <strong>🔄 Solució:</strong> <code>M. erida</code> — trim → toUpperCase → substring(0,1) = "M"; trim → substring(1) = "erida". (La idea era normalitzar "M. erida"... encara que el resultat sona a princesa amb pressa.)
    </div>
  </div>
</div>

---
class: compact-slide
---

## Repàs: la caixa que no cabia
### Sense executar: què imprimeix?

<div class="two-cols" style="gap:1rem;align-items:start;">
  <div class="left">
    <div class="question-card">
      <span class="question-icon">🔍</span>
      <strong>Eres la JVM.</strong> Acaben de donar-te este programa per a executar. Què imprimeixes?
    </div>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Misterio.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>int nota = 7;
int sobre = 10;
System.out.println("Nota " + nota + sobre);
System.out.println("Nota " + (nota + sobre));
System.out.println(nota / 2 + " de nota media");</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="answer-card">
      <strong>🔄 Solució:</strong> Nota 710 · Nota 17 · 3 de nota media
      <ul style="font-size:0.9rem;margin-top:0.4rem;">
        <li>Quan un <code>+</code> mescla text i números, Java <strong>concatena</strong>: "Nota " + 7 + 10 → "Nota 710"</li>
        <li>Els parèntesis <code>(nota + sobre)</code> forcen la suma → "Nota 17"</li>
        <li><code>7 / 2</code> és divisió entera: <strong>3</strong>, no 3.5</li>
      </ul>
    </div>
    <div class="success" style="margin-top:0.6rem;">
      Tres trampes de la unitat en un sol programa: concatenació, parèntesis i divisió entera.
    </div>
  </div>
</div>

---
class: compact-slide
---

## Fireside chat: int vs double
### Dos caixes del magatzem discuteixen

<div class="two-cols">
  <div class="left">
    <div class="info">
      <strong>int:</strong> — Jo sóc la caixa de mudança. Compacta, exacta, sense decimals. 17 dividit entre 5 són <strong>3</strong> i s'ha acabat.
    </div>
    <div class="success">
      <strong>double:</strong> — <em>alça una cella</em> ¿3? Per a mi són <strong>3.4</strong>. Jo guarde els decimals de veritat: preus, notes mitjanes, temperatures...
    </div>
    <div class="info">
      <strong>int:</strong> — Per a contar, bucles i edats, em criden a mi. Contar amb decimals no té sentit.
    </div>
  </div>
  <div class="right">
    <div class="success">
      <strong>double:</strong> — I mesurar i calcular mitjanes, em criden a mi. Saps quantes voltes he vist a novats escriure <code>(int)(Math.random() * 6 + 1)</code> i plorar perquè el dau mai no eixia 6?
    </div>
    <div class="info">
      <strong>int:</strong> — <em>gruny</em> Un equip. Tu per al sencer, jo per al fi. I long per als astronòmics, char per a les lletres.
    </div>
  </div>
</div>

<div class="warning" style="margin-top:0.6rem;">
  <strong>La lliçó:</strong> int per al sencer, double per al decimal. Confondre'ls en una divisió (o en un casting mal posat) produïx els errors més clàssics d'esta unitat.
</div>

---
class: compact-slide
---

## Laboratori de tortura: el caixer que cobra malament
### 3 errors de compilació + 1 de lògica (30 min)

<div class="two-cols" style="gap:1rem;">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Tortura.java</div>
        <div class="code-card-badge">Pista: 4 errors</div>
      </div>      <pre style="font-size:0.66rem;"><code>import java.util.Scanner;
public class Tortura {
  public static void main(string[] args)
    Scanner sc = new Scanner(System.in);
    System.out.print("Cantidad a retirar: ");
    int cantidad = sc.nextInt()
    double billetes5 = cantidad / 5.0;
    System.out.println("Te dan " + billetes5 + " billetes de 5");
    sc.close();
  }
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="question-card" style="font-size:0.9rem;">
      <span class="question-icon">🧪</span>
      Fes que compile, que execute i que <strong>tota</strong> l'eixida siga correcta. Prova amb <code>cantidad = 17</code>: quants bitllets de 5 haurien de ser?
    </div>
    <div class="answer-card">
      <strong>🔄 Solució</strong>
      <ul style="font-size:0.85rem;margin-top:0.4rem;">
        <li><code>string[]</code> → <code>String[]</code> (majúscula)</li>
        <li>Falta la <code>{</code> del cos del main</li>
        <li>Falta el <code>;</code> de <code>sc.nextInt()</code></li>
        <li><strong>Lògica:</strong> <code>cantidad / 5.0</code> dona 3.4 bitllets — un caixer no dona 3.4 bitllets → <code>int billetes5 = cantidad / 5;</code></li>
      </ul>
    </div>
  </div>
</div>

---
class: compact-slide
---

## Atreveix-te a pensar
### Preguntes finals i d'entrevista

<div class="two-cols" style="gap:1rem;align-items:start;margin-top:-0.4rem;">
  <div class="left">
    <div class="step" style="margin-bottom:0.4rem;">
      <div class="step-number">1</div>
      <div class="step-content" style="font-size:0.9rem;"><strong>Sense executar:</strong> què imprimeix <code>System.out.println("a/b = " + 10 / 3);</code>? I amb <code>(double) 10 / 3</code>?</div>
    </div>
    <div class="step" style="margin-bottom:0.4rem;">
      <div class="step-number">2</div>
      <div class="step-content" style="font-size:0.9rem;"><strong>El preu que no quadra:</strong> <code>double total = precio * 0.21;</code> mostra 21.000000000000004. Com ho arregles amb ferramentes d'esta unitat?</div>
    </div>
    <div class="step" style="margin-bottom:0.4rem;">
      <div class="step-number">3</div>
      <div class="step-content" style="font-size:0.9rem;"><strong>Ternari encadenat:</strong> assigna "niño" / "adulto" / "jubilado" segons l'edat</div>
    </div>
    <div class="step" style="margin-bottom:0.4rem;">
      <div class="step-number">4</div>
      <div class="step-content" style="font-size:0.9rem;"><strong>V o F:</strong> "Math.random() * 5 pot retornar el número 5"</div>
    </div>
  </div>
  <div class="right">
    <div class="answer-card" style="font-size:0.85rem;">
      <strong>💡 Solucions</strong>
      <ul style="font-size:0.85rem;margin-top:0.4rem;">
        <li><code>a/b = 3</code> (entera) · <code>a/b real = 3.333...</code> (força decimal)</li>
        <li>Coma flotant binària: <code>Math.round(total * 100) / 100.0</code> o <code>printf %.2f</code></li>
        <li><code>edad < 12 ? "niño" : (edad < 65 ? "adulto" : "jubilado")</code></li>
        <li><strong>Fals</strong>: random() mai arriba a 1 → (int)(random()*5) dona 0–4</li>
      </ul>
    </div>
    <div class="info" style="margin-top:0.5rem;">
      Pregunta d'entrevista real: "explica'm, com si tinguera 8 anys, què és una variable i un tipus primitiu."
    </div>
  </div>
</div>

---
---

## Resum — Bloc 02 completat
### El que hem après

<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:0.8rem;">
  <div style="background:#EFF6FF;border:2px solid #3B82F6;border-radius:12px;padding:12px;">
    <div style="font-weight:700;color:#3B82F6;margin-bottom:4px;">⌨️ Scanner</div>
    <p style="font-size:0.82rem;">Importar, instanciar, next... · l'Enter residual i hasNextInt() com a guardià</p>
  </div>
  <div style="background:#F5F3FF;border:2px solid #8B5CF6;border-radius:12px;padding:12px;">
    <div style="font-weight:700;color:#8B5CF6;margin-bottom:4px;">🖨️ Eixida formatada</div>
    <p style="font-size:0.82rem;">printf / String.format / NumberFormat · %d, %s, %.2f, %n</p>
  </div>
  <div style="background:#F0FDF4;border:2px solid #22C55E;border-radius:12px;padding:12px;">
    <div style="font-weight:700;color:#22C55E;margin-bottom:4px;">🎲 Math.random()</div>
    <p style="font-size:0.82rem;">Fórmula universal (max - min + 1) + min · Math.round, pow, sqrt...</p>
  </div>
  <div style="background:#FFF7ED;border:2px solid #F59E0B;border-radius:12px;padding:12px;">
    <div style="font-weight:700;color:#F59E0B;margin-bottom:4px;">🧵 String + repàs</div>
    <p style="font-size:0.82rem;">length(), trim(), substring(), indexOf() · concatenació, divisió entera, ternari encadenat</p>
  </div>
</div>

<div class="success">
  <strong>Ja saps guardar dades, llegir del teclat, calcular i donar format!</strong> A la propera unitat: presa de decisions amb if/else. 🚀
</div>

---
layout: closing
---

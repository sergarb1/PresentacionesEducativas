---
layout: cover
---

# Unitat 04 — Estructures de control i excepcions bàsiques<br>Bloc 02

## 1r CFGS DAW · Programació

---
---

## Excepcions bàsiques
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Una excepció és un <strong>objecte que Java llança quan alguna cosa eix malament</strong>, i que hereta de <code>Throwable</code>. El teu programa pot estar o no preparat per a atrapar-lo: aprendre a llegir estos crits és aprendre a depurar.
  </div>
</div>

T'ha passat que un programa es "cau" amb un munt de text roig? Eixe text és una excepció — i és or: et diu **què**, **on** i en **quin mètode**.

---
class: compact-slide
---

## El crash: la teua primera excepció

<div class="code-card">
  <div class="code-card-header"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span><span class="code-card-title">Explosio.java</span></div>

```java
public class Explosio {
    public static void main(String[] args) {
        int[] numeros = { 1, 2, 3 };
        System.out.println(numeros[5]); // no existeix!
    }
}
```
</div>

<div class="terminal" style="margin-top:0.6rem;">
  <span class="prompt">$</span> java Explosio
  <span class="text-red">Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException:
        Index 5 out of bounds for length 3</span>
  <span class="text-red">        at Explosio.main(Explosio.java:5)</span>
</div>

<div class="info" style="margin-top:0.6rem;">
  Llig la primera línia: el nom de l'excepció et diu <strong>què</strong> ha passat, i la línia amb <code>at ...</code> et diu <strong>on</strong>. Un GPS amb acusacions.
</div>

---
class: compact-slide
---

## L'arbre genealògic de Throwable

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud04-prg-arbre-throwable.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---
class: compact-slide
---

## La família Throwable: detalls

<div class="code-card">
  <div class="code-card-header"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span><span class="code-card-title">RuntimeException típiques</span></div>

```java
int x = 10 / 0;                     // ArithmeticException
a[9] = 1;  // array de 3:           // ArrayIndexOutOfBounds
String s = null; s.length();        // NullPointerException
Integer.parseInt("Hola");           // NumberFormatException
```
</div>

<div class="two-cols" style="margin-top:0.6rem;">
  <div class="left">
    <div class="info">
      <strong>Error:</strong> problemes greus de la JVM — ignora'ls. <strong>Exception:</strong> ací viu el 99% de la teua vida.
    </div>
  </div>
  <div class="right">
    <div class="warning">
      <strong>RuntimeException</strong> = es llança en <strong>temps d'execució</strong>, no en compilar. El compilador no t'avisa — i no t'obliga a capturar-la.
    </div>
  </div>
</div>

---
class: compact-slide
---

## Les més comunes: la guia de camp

<table>
  <thead><tr><th>Excepció</th><th>Quan apareix</th></tr></thead>
  <tbody>
    <tr><td><strong>ArithmeticException</strong></td><td>Dividir entre 0</td></tr>
    <tr><td><strong>ArrayIndexOutOfBoundsException</strong></td><td>Índex fora de l'array</td></tr>
    <tr><td><strong>NullPointerException</strong></td><td>Tocar un objecte null</td></tr>
    <tr><td><strong>NumberFormatException</strong></td><td>Convertir text que no és nombre</td></tr>
    <tr><td><strong>InputMismatchException</strong></td><td>Scanner rep el tipus equivocat</td></tr>
  </tbody>
</table>

<div class="warning" style="margin-top:0.6rem;">
  La <strong>NullPointerException</strong> és el clàssic absolut de Java: apareix en tocar un objecte que no existia. La teua àvia, si programara, també la tindria.
</div>

---
---

## Mini-chequeig: excepcions

<div class="question-card">
  <span class="question-icon">🧠</span>
  El detectiu d'excepcions — quina llança cada línia?
</div>

```java
int a = 5 / 0;
String[] dies = {"L", "M", "X"};
System.out.println(dies[3]);
String text = null;
System.out.println(text.toUpperCase());
int b = Integer.parseInt("quaranta-dos");
```

<div class="answer-card">
  <strong>🔄 Respostes:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li><strong>ArithmeticException</strong> — divisió entre zero</li>
    <li><strong>ArrayIndexOutOfBoundsException</strong> — un array de 3 s'indexa 0, 1, 2</li>
    <li><strong>NullPointerException</strong> — text val null · <strong>NumberFormatException</strong> — eixe text no és un nombre</li>
  </ul>
</div>

---
---

## try, catch i finally
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    <code>try</code> protegix el codi perillós, <code>catch</code> atrapar l'excepció si apareix i <code>finally</code> s'executa <strong>sempre</strong>, ocorrega el que ocorrega. És l'airbag del codi: sense ell, la primera InputMismatchException mata el programa.
  </div>
</div>

---
---

## try/catch: el programa sobreviu

<div class="code-card">
  <div class="code-card-header"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span><span class="code-card-title">LectorBlindat.java</span></div>

```java
try {
    System.out.print("Quants anys tens? ");
    int edat = sc.nextInt();
    System.out.println("Vas nàixer fa " + edat + " anys.");
} catch (InputMismatchException e) {
    System.out.println("Això no és un nombre. No em faces això.");
}
System.out.println("El programa seguix viu. 🎉");
```
</div>

<div class="two-cols" style="margin-top:0.6rem;">
  <div class="left">
    <div class="success">
      Amb <strong>try/catch</strong> el catch atrapar l'error, imprimeix un missatge i <strong>el programa continua</strong>.
    </div>
  </div>
  <div class="right">
    <div class="warning">
      <strong>Catch buit = pecat mortal</strong>: et tragues l'error ni adonar-te'n. Com a mínim, imprimeix un missatge.
    </div>
  </div>
</div>

---
class: compact-slide
---

## Captura múltiple i finally

<div class="two-cols">
  <div class="left">
    <h3 style="color:#3B82F6;">🎯 Diversos catch en fila</h3>

```java
try {
    // codi perillós
} catch (ArithmeticException e) {
    // més específic primer
} catch (RuntimeException e) {
    // general al final
}
```
    <div class="warning" style="margin-top:0.5rem;">
      <strong>Del més específic al més general</strong>, com els else if. Un <code>catch (Exception e)</code> al principi es menja les específiques: <strong>no compila</strong>.
    </div>
  </div>
  <div class="right">
    <h3 style="color:#3B82F6;">🧽 finally i la variable e</h3>

```java
catch (Exception e) {
    System.out.println(e.getMessage());
    e.printStackTrace(); // per a depurar
} finally {
    // s'executa SEMPRE:
    // tancar Scanner, fitxers...
}
```
    <div class="info" style="margin-top:0.5rem;">
      El <code>finally</code> corre amb o sense excepció, fins i tot si el try tenia un <code>return</code>.
    </div>
  </div>
</div>

---
---

## Exemple guiat: el menú a prova de bombes

<div class="code-card">
  <div class="code-card-header"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span><span class="code-card-title">MenuBlindat.java</span></div>

```java
do {
    System.out.println("1. Jugar  2. Eixir");
    try {
        opcio = sc.nextInt();
        valida = (opcio == 1 || opcio == 2);
        if (!valida) System.out.println("Opció no vàlida.");
    } catch (InputMismatchException e) {
        System.out.println("Això no és un nombre.");
        sc.next(); // descarta el text brossa del buffer
    }
} while (!valida);
```
</div>

<div class="info" style="margin-top:0.6rem;">
  Fixa't en <code>sc.next()</code> dins del catch: sense ell, la porqueria seguix al buffer del Scanner i el següent <code>nextInt()</code> tornaria a fallar. Atrapar l'excepció i <strong>netejar el buffer</strong> són dos passos del mateix ball.
</div>

---
---

## Mini-chequeig: try/catch

<div class="question-card">
  <span class="question-icon">🧠</span>
  El detectiu de l'ordre — què passa ací?
</div>

```java
try {
    int[] numeros = {10, 20};
    System.out.println(numeros[3]);
} catch (Exception e) {
    System.out.println("Atrapat per Exception.");
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Atrapat per l'específica.");
}
```

<div class="answer-card">
  <strong>🔄 Resposta:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li><strong>No compila</strong>: el segon catch és inalcançable perquè <code>Exception</code> ja atrapar tot — subclasse davant del pare</li>
    <li>Els catch van <strong>del més específic al més general</strong>: primer ArrayIndexOutOfBounds, després Exception</li>
  </ul>
</div>

---
---

## throw i excepcions pròpies
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    <code>throw</code> llança una excepció <strong>quan tu decideixes</strong> que alguna cosa no ha de continuar, i creant la teua pròpia excepció (heretant de <code>RuntimeException</code> o <code>Exception</code>) pots posar-li <strong>nom propi</strong> al problema.
  </div>
</div>

---
---

## throw: llança la pedra

<div class="code-card">
  <div class="code-card-header"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span><span class="code-card-title">CompteBancari.java</span></div>

```java
double saldo = 10.0;
double retir = 500.0;

if (retir > saldo) {
    throw new ArithmeticException(
        "Saldo insuficient: " + saldo);
}

saldo -= retir;
```
</div>

<div class="two-cols" style="margin-top:0.6rem;">
  <div class="left">
    <div class="warning">
      <strong>throw ≠ throws</strong>: <code>throw</code> <strong>llança</strong> (al cos del mètode); <code>throws</code> <strong>anuncia</strong> en la signatura que el mètode pot llançar excepcions checked.
    </div>
  </div>
  <div class="right">
    <div class="info">
      El missatge del constructor és el que veuràs amb <code>e.getMessage()</code>. Una excepció primerenca val més que un bug dues setmanes després.
    </div>
  </div>
</div>

---
class: compact-slide
---

## Excepció pròpia a mida

<div class="code-card">
  <div class="code-card-header"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span><span class="code-card-title">ProducteEsgotatException.java</span></div>

```java
public class ProducteEsgotatException extends RuntimeException {
    public ProducteEsgotatException(String producte) {
        super("El producte " + producte + " està esgotat.");
    }
}
```
</div>

<div class="code-card" style="margin-top:0.6rem;">
  <div class="code-card-header"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span><span class="code-card-title">MaquinaExpenedora.java</span></div>

```java
try {
    if (stock == 0) {
        throw new ProducteEsgotatException("Refresc");
    }
    System.out.println("Ací tens el teu Refresc");
} catch (ProducteEsgotatException e) {
    System.out.println("Ho sentim: " + e.getMessage());
}
```
</div>

<div class="info" style="margin-top:0.6rem;">
  El throw llança la teua excepció, el catch l'atrapa <strong>pel seu nom propi</strong> i el programa sobreviu. Eixe nom converteix un error genèric en un missatge que fins i tot la teua cap entén.
</div>

---
---

## checked vs unchecked

<div class="two-cols">
  <div class="left">
    <div class="info">
      <strong>Checked (controlades)</strong>: el compilador <strong>t'obliga</strong> a capturar-les o declarar-les amb <code>throws</code>. Hereten d'<code>Exception</code> però no de RuntimeException. Exemple: <code>IOException</code>. Si no les gestiones, <strong>no compila</strong>.
    </div>
  </div>
  <div class="right">
    <div class="success">
      <strong>Unchecked (no controlades)</strong>: no t'obliguen a res. Són <code>RuntimeException</code> i les seues filles: ArithmeticException, NullPointerException, NumberFormatException...
    </div>
  </div>
</div>

<div class="info" style="margin-top:0.6rem;">
  Hereta d'<strong>Exception</strong> si vols <strong>obligar</strong> a capturar la teua excepció; de <strong>RuntimeException</strong> si prefereixes que no els obligue. Per a començar, RuntimeException és més còmoda.
</div>

---
---

## Mini-chequeig: throw

<div class="question-card">
  <span class="question-icon">🧠</span>
  El controlador de notes — nota = 15:
</div>

```java
public class NotaInvalidaException extends RuntimeException {
    public NotaInvalidaException(double nota) {
        super("La nota " + nota + " no està entre 0 i 10.");
    }
}
// al main: if (nota < 0 || nota > 10) { throw new NotaInvalidaException(nota); }
```

<div class="answer-card">
  <strong>🔄 Resposta:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li>El programa es talla amb <strong>NotaInvalidaException: La nota 15.0 no està entre 0 i 10.</strong></li>
    <li>Hereta de RuntimeException (→ Exception → Throwable): tot el comportament de llançar-se i capturar-se, el constructor amb <code>super(missatge)</code> i <code>getMessage()</code></li>
  </ul>
</div>

---
---

## Repàs: controla les estructures
### El joc de les decisions

<div class="two-cols">
  <div class="left">
    <div class="question-card">
      <span class="question-icon">🎮</span>
      Tria saviament:
    </div>
    <div class="step" style="margin-top:0.6rem;">
      <div class="step-number">1</div>
      <div class="step-content">nota = 6 amb <code>if (nota &gt;= 5) → "Aprovat"</code> primer... què imprimeix?</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">Quantes voltes fa <code>for (int i = 0; i &lt; 3; i++)</code>?</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content">case 1 i case 2 seguits sense break, variable = 1: què passa?</div>
    </div>
  </div>
  <div class="right">
    <div class="answer-card">
      <strong>🔄 Solucions:</strong>
      <ul style="font-size:0.9rem;margin-top:0.4rem;">
        <li><strong>"Aprovat"</strong>: guanya el primer if true — l'ordre mana, encara que 6 no arribe a 7</li>
        <li><strong>3 voltes</strong>: i val 0, 1 i 2 — amb &lt; 3 mai no entra amb i = 3</li>
        <li><strong>Fall-through</strong>: el case 1 es desborda al case 2</li>
      </ul>
    </div>
  </div>
</div>

---
class: compact-slide
---

## Fireside chat: if-else vs switch

<div class="two-cols">
  <div class="left">
    <div class="info">
      <strong>if-else:</strong> — Jo soc el clàssic. Condicions, rangs, comparacions... necessites decidir si és més gran que 5 o està entre 10 i 20? Crida'm. Jo compare el que siga.
    </div>
    <div class="info" style="margin-top:0.6rem;">
      <strong>switch:</strong> — I tu t'omplires d'else if fins que el codi sembla l'escala d'un edifici. Amb mi poses la variable una vegada i cada cas en la seua línia.
    </div>
  </div>
  <div class="right">
    <div class="warning">
      <strong>if-else:</strong> — Elegant fins que t'oblides un break i el teu switch es converteix en un tobogan.
      <strong>switch:</strong> — El fall-through s'usa a propòsit per a agrupar casos. I tu, amb trenta else if, saps quin va abans que quin?
    </div>
    <div class="success" style="margin-top:0.6rem;">
      <strong>La lliçó:</strong> no hi ha guanyador. switch per a <strong>valors concrets</strong>, if/else if per a <strong>rangs i mescles</strong>. Triar bé és la mitat de l'examen.
    </div>
  </div>
</div>

---
class: compact-slide
---

## Qui soc?

<div class="question-card">
  <span class="question-icon">🕵️</span>
  Endevina quin concepte de la unitat soc:
</div>

1. **Soc el semàfor**: si la meua condició és true, deixe passar; si és false, redirigix a l'altre carril.
2. **Soc el menú del restaurant**: mires la meua variable i executes el case que coincidisca.
3. **Soc la cinta que comprova abans de córrer**: si la condició és false d'entrada, no faig ni un pas.
4. **Soc el botó de parada**: talle el bucle sencer tan bon punt aparec.
5. **Soc l'avi de tots els errors**: tot el que es llança hereta de mi.
6. **Soc l'airbag**: atrapar l'error perquè el programa no muera.

<div class="answer-card">
  <strong>🔄 Respostes:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li>1 → <strong>l'if/else</strong> · 2 → <strong>el switch</strong> · 3 → <strong>el while</strong> (el do-while corre primer)</li>
    <li>4 → <strong>el break</strong> · 5 → <strong>Throwable</strong> · 6 → <strong>el catch</strong></li>
  </ul>
</div>

---
---

## Resum del bloc 02
### Tres frases per quedar-te

<div class="features-grid" style="margin-top:1rem;">
  <div class="feature-item">
    <span class="feature-icon">💥</span>
    <strong>Excepcions</strong>
    <p style="font-size:0.9rem;">Objectes que hereten de Throwable. Llig el missatge: què, on i en quin mètode. RuntimeException es llança en executar i no obliga a capturar.</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">🛡️</span>
    <strong>try/catch/finally</strong>
    <p style="font-size:0.9rem;">try protegix, catch atrapa (de l'específic al general, mai buit) i finally s'executa sempre: ideal per a tancar recursos.</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">🎳</span>
    <strong>throw i pròpies</strong>
    <p style="font-size:0.9rem;">throw llança quan tu decideixes; throws declara. Les teues excepcions hereten de RuntimeException o Exception i porten nom propi.</p>
  </div>
</div>

---
layout: closing
---

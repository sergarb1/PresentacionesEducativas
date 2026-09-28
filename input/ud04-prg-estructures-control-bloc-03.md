---
layout: cover
---

# Unitat 04 — Estructures de control i excepcions<br>Bloc 03

## 1r CFGS DAW · Programació

---
---

## try, catch i finally
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    <code>try</code> protegix el codi perillós, <code>catch</code> atrapa l'excepció si apareix i <code>finally</code> s'executa <strong>sempre</strong>, ocorrega el que ocorrega.
  </div>
</div>

En el punt 6 vas vore que una InputMismatchException mata el teu programa. Ara toca blindar-lo: el try/catch/finally és l'airbag del codi.

---
---

## L'estructura completa

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">LectorBlindat.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>try {
    System.out.print("Quants anys? ");
    int edat = sc.nextInt();
    System.out.println("Fa " + edat + " anys.");
} catch (InputMismatchException e) {
    System.out.println("Això no és un nombre.");
}
System.out.println("El programa seguix viu. 🎉");</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>try</strong>: el codi perillós, sota vigilància</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>catch</strong>: què fer si apareix eixa excepció</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><strong>finally</strong> (opcional): s'executa <strong>SEMPRE</strong>, amb o sense excepció, fins i tot amb un <code>return</code> al try. Ideal per a tancar Scanner i fitxers</div>
    </div>
  </div>
</div>

---
---

## Captura múltiple: l'ordre importa

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">MultiCatch.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>try {
    System.out.println(numeros[5] / 0);
} catch (ArithmeticException e) {
    System.out.println("Divisió entre zero.");
} catch (ArrayIndexOutOfBounds e) {
    System.out.println("Índex fora.");
} catch (RuntimeException e) {
    System.out.println("Alguna estranya.");
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="warning">
      Un <code>catch (Exception e)</code> al principi es menjaria les excepcions més específiques. Regla: <strong>del més concret al més general</strong>, com en els else if.
    </div>
    <div class="info" style="margin-top:0.6rem;">
      Des de Java 7, diversos tipus amb el mateix tractament caben en un sol catch: <code>catch (A | B e)</code>
    </div>
  </div>
</div>

---
---

## La variable e: el botí de l'error

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Boti.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>catch (Exception e) {
    System.out.println(
        "Missatge: " + e.getMessage());
    e.printStackTrace();
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">e</div>
      <div class="step-content">L'objecte excepció atrapat: <code>e.getMessage()</code> dona el missatge; <code>e.printStackTrace()</code> el rastre complet per a depurar</div>
    </div>
    <div class="warning" style="margin-top:0.6rem;">
      Un catch <strong>buit</strong> és un pecat mortal: te tragues l'error i ni tan sols saps que ha passat. Com a mínim, imprimix un missatge.
    </div>
  </div>
</div>

---
---

## Exemple guiat: el menú a prova de bombes

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">MenuBlindat.java</div>
    <div class="code-card-badge">Java</div>
  </div>
  <pre><code>do {
    System.out.println("1. Jugar  2. Eixir");
    System.out.print("Tria: ");
    try {
        opcio = sc.nextInt();
        valida = (opcio == 1 || opcio == 2);
    } catch (InputMismatchException e) {
        System.out.println("Això no és un nombre.");
        sc.next(); // descarta el text brossa
    }
} while (!valida);</code></pre>
</div>

<div class="info" style="margin-top:0.6rem;">
  Fixa't en <code>sc.next()</code> dins del catch: sense ell, el text brossa seguiria al buffer i el següent <code>nextInt()</code> tornaria a fallar. Atrapar l'excepció i <strong>netejar el buffer</strong> són dos passos del mateix ball.
</div>

---
---

## Mini-chequeig: try/catch

<div class="question-card">
  <span class="question-icon">🧠</span>
  Respon en 30 segons:
</div>

1. Què fa el bloc finally i quan s'executa?
2. En quin ordre han d'anar els catch?
3. Quin perill té un catch buit?
4. Per què convé cridar sc.next() després d'una InputMismatchException?

<div class="answer-card">
  <strong>🔄 Respostes:</strong>
  <ul style="font-size:0.9rem;margin-top:0.15rem;">
    <li>S'executa <strong>sempre</strong>, hi haja o no excepció; servix per a netejar recursos</li>
    <li><strong>Del més específic al més general</strong>; si no, el general "se menja" els altres i no compila</li>
    <li>Te tragues l'error sense assabentar-te'n: fallada oculta. Mínim: imprimix un missatge</li>
    <li>Perquè el text brossa es queda al buffer i el següent nextInt() tornaria a fallar</li>
  </ul>
</div>

---
---

## throw: llança la pedra
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    <code>throw</code> llança una excepció quan <strong>tu</strong> decideixes que alguna cosa no ha de continuar, i creant la teua pròpia excepció pots posar-li nom al problema.
  </div>
</div>

Fins ara Java llançava les excepcions per tu. Ara arriba el superpoder: decidir tu quan llançar-les, i inventar-te tipus d'error a la teua mesura.

---
---

## throw en acció

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">CompteBancari.java</div>
    <div class="code-card-badge">Java</div>
  </div>
  <pre><code>double saldo = 10.0;
double retir = 500.0;
if (retir &gt; saldo) {
    throw new ArithmeticException(
        "Saldo insuficient: " + saldo);
}
saldo -= retir;</code></pre>
</div>

<div class="info" style="margin-top:0.6rem;">
  El missatge que li passes al constructor és el que veuràs en <code>e.getMessage()</code>. I compte: <code>throw</code> <strong>llança</strong> (al cos del mètode); <code>throws</code> <strong>anuncia</strong> en la signatura que el mètode pot llançar excepcions controlades.
</div>

---
---

## Excepcions pròpies: el teu defecte a mida

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">SaldoInsuficientException.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>public class SaldoInsuficientException
        extends RuntimeException {
    public SaldoInsuficientException(
            String missatge) {
        super(missatge);
    }
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Caixer.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>if (retir &gt; saldo) {
    throw new SaldoInsuficientException(
        "Només tens " + saldo + "€.");
}</code></pre>
    </div>
  </div>
</div>

<div class="success" style="margin-top:0.6rem;">
  <strong>Hereta d'Exception</strong> si vols <strong>obligar</strong> a capturar-la (checked). <strong>De RuntimeException</strong> si prefereixes que no l'obligue (unchecked): per a començar, és la còmoda.
</div>

---
---

## Checked vs unchecked: la burocràcia

<div class="comparison-grid">
  <div class="comparison-item">
    <p><strong>📋 Checked (controlades)</strong></p>
    <ul>
      <li>El compilador <strong>t'obliga</strong> a capturar-les (try/catch) o a declarar-les (<code>throws</code>)</li>
      <li>Herenen d'Exception, però no de RuntimeException</li>
      <li>Exemple: <code>IOException</code></li>
    </ul>
  </div>
  <div class="comparison-item good">
    <p><strong>🆓 Unchecked (no controlades)</strong></p>
    <ul>
      <li>No t'obliguen a res: si no les gestiones, exploten en execució</li>
      <li>Són RuntimeException i les seues filles</li>
      <li>Exemples: NPE, ArithmeticException…</li>
    </ul>
  </div>
</div>

<div class="warning" style="margin-top:0.6rem;">
  Si una excepció és checked i no la gestiones, <strong>no compila</strong>. Si és unchecked, el compilador et deixa tranquil… i l'error explota en plena execució.
</div>

---
---

## Exemple guiat: la màquina expenedora

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">MaquinaExpenedora.java</div>
    <div class="code-card-badge">Java</div>
  </div>
  <pre><code>try {
    if (stock == 0) {
        throw new ProducteEsgotatException(producte);
    }
    System.out.println("Ací tens el teu " + producte);
} catch (ProducteEsgotatException e) {
    System.out.println("Ho sentim: " + e.getMessage());
}
System.out.println("La màquina seguix funcionant. 🤖");</code></pre>
</div>

<div class="terminal">
  <div class="output">Ho sentim: El producte Refresc està esgotat.</div>
  <div class="output">La màquina seguix funcionant. 🤖</div>
</div>

<div class="success" style="margin-top:0.6rem;">
  El throw llança la teua excepció, el catch l'atrapa pel seu <strong>nom propi</strong> i el programa sobreviu: un error genèric es converteix en un missatge que fins i tot la teua cap entén.
</div>

---
---

## Mini-chequeig: throw

<div class="question-card">
  <span class="question-icon">🧠</span>
  Respon sense mirar:
</div>

1. Què fa la paraula clau throw?
2. Com es crea una excepció pròpia?
3. Quina és la diferència entre throw i throws?
4. Quina diferència hi ha entre checked i unchecked?

<div class="answer-card">
  <strong>🔄 Respostes:</strong>
  <ul style="font-size:0.9rem;margin-top:0.15rem;">
    <li><strong>Llança</strong> una excepció on la col·loques: <code>throw new MiExcepcion("...")</code></li>
    <li>Heredant d'Exception o RuntimeException + constructor amb <code>super(missatge)</code></li>
    <li><code>throw</code> llança (cos del mètode); <code>throws</code> declara (signatura)</li>
    <li><strong>Checked</strong>: obliga a capturar o declarar; <strong>unchecked</strong>: no obliga (RuntimeException)</li>
  </ul>
</div>

---
---

## Repàs: qui té la raó?
### Fireside Chat: if-else vs switch

<div class="comparison-grid">
  <div class="comparison-item good">
    <p><strong>🚦 if-else diu:</strong></p>
    <ul>
      <li>"Jo soc el clàssic: rangs, comparacions, mescles"</li>
      <li>"Tu només servix per a valors exactes…"</li>
    </ul>
  </div>
  <div class="comparison-item">
    <p><strong>🍽️ switch diu:</strong></p>
    <ul>
      <li>"Amb mi poses la variable una vegada i cada cas en la seua línia"</li>
      <li>"I tu? Amb trenta else if, saps quin va abans que quin?"</li>
    </ul>
  </div>
</div>

<div class="success" style="margin-top:0.6rem;">
  <strong>La lliçó:</strong> no hi ha guanyador. <strong>switch per a valors concrets</strong> (dia, menú, talla) i <strong>if/else if per a rangs i mescles</strong>. Triar bé és la mitat de l'examen.
</div>

---
---

## Repàs: eres la JVM

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Misteri.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>int nota = 6;
if (nota &gt;= 5) {
    System.out.println("Aprovat");
} else if (nota &gt;= 7) {
    System.out.println("Notable");
} else {
    System.out.println("Suspés");
}</code></pre>
    </div>
  </div>
  <div class="right">
    <p>Què imprimix? a) Notable · b) Aprovat · c) Suspés</p>
    <div class="answer-card">
      <strong>🔄 Resposta: b)</strong> Java avalua de dalt a baix i es queda amb la <strong>primera</strong> condició true. 6 ≥ 5 → "Aprovat", encara que no arribe a 7. Si vols que un 6 siga "Notable", reordena de més exigent a més permissiva.
    </div>
  </div>
</div>

---
---

## Repàs: el joc de les decisions

<div class="question-card">
  <span class="question-icon">🎮</span>
  Tria la resposta correcta:
</div>

1. `int n = 4; String r = n &gt;= 5 ? "A" : "B";` → a) A · b) B
2. Quantes voltes fa `for (int i = 0; i &lt; 3; i++)`? → a) 3 · b) 4
3. switch sense break, la variable val 1 → a) només case 1 · b) case 1 i 2
4. Què dona `10 / 0`? → a) ArithmeticException · b) un nombre enorme

<div class="answer-card" style="font-size:0.92rem;">
  <strong>🔄 Solucions:</strong>
  <ul style="font-size:0.85rem;margin-top:0.15rem;">
    <li><strong>b)</strong> — 4 no és ≥ 5: el ternari retorna "B"</li>
    <li><strong>a)</strong> — i val 0, 1 i 2: tres voltes</li>
    <li><strong>b)</strong> — sense break, fall-through al case 2</li>
    <li><strong>a)</strong> — dividir entre zero llança ArithmeticException</li>
  </ul>
</div>

---
---

## CONRAD vs el món: "el bucle que no s'acaba"

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">Un while <strong>sense res que canvie la condició</strong> dins és un cotxe sense frens</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><code>while (x &gt; 0) { x = x + 1; }</code>: puja en comptes de baixar. "Com si volgueres buidar una piscina tirant-hi més aigua"</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><code>if (x = 5)</code> amb UN igual: no és una condició, és una <strong>assignació</strong>!</div>
    </div>
  </div>
  <div class="right">
    <div class="warning">
      Abans d'acusar l'ordinador de "congelar-se", mira el bucle: <strong>alguna cosa modifica la condició cap a false?</strong> El continue es salta l'actualització? Uses <code>==</code> o t'has quedat en <code>=</code>? El 90% dels programes "penjats" s'arreglen ací.
    </div>
  </div>
</div>

---
---

## Entrevista de treball
### Les preguntes que et faran

<div class="features-grid" style="grid-template-columns:repeat(3,1fr);gap:0.7rem;">
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">1️⃣</span><strong>Explica com si jo fóra la teua àvia la diferència entre if i switch</strong></div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">2️⃣</span><strong>Quina és la diferència entre break i continue?</strong></div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">3️⃣</span><strong>L'usuari escriu text on esperàvem un nombre i l'app es cau. Com ho arregles?</strong></div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">4️⃣</span><strong>Què és una NullPointerException i com l'evites?</strong></div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">5️⃣</span><strong>Per a què servix el bloc finally?</strong></div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">6️⃣</span><strong>Quan crearíes una excepció pròpia?</strong></div>
</div>

---
---

## No hi ha preguntes tontes

<div class="features-grid" style="grid-template-columns:repeat(3,1fr);gap:0.7rem;">
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;text-align:left;"><span class="feature-icon" style="font-size:1.3rem;margin-bottom:0.1rem;">🔢</span><strong>Puc usar switch amb un double?</strong><br>No: admet int, char, enum i String. Amb double, if/else if (els decimals no es comparen amb ==)</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;text-align:left;"><span class="feature-icon" style="font-size:1.3rem;margin-bottom:0.1rem;">♾️</span><strong>Per què veig while (true)?</strong><br>Es trenca des de dins amb break: "per sempre fins que passe alguna cosa". Molt comú en jocs i servidors</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;text-align:left;"><span class="feature-icon" style="font-size:1.3rem;margin-bottom:0.1rem;">🥅</span><strong>El catch pot capturar tot?</strong><br>catch (Exception e) atrapa totes les Exception (i RuntimeException). catch (Throwable e) és pescar amb dinamita</div>
</div>

---
---

## Resum de la unitat

<div class="features-grid" style="grid-template-columns:repeat(3,1fr);gap:0.7rem;">
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🚦</span><strong>if / switch</strong><br>Semàfor: guanya el primer true · Carta: case + break + default</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🔁</span><strong>while / do / for</strong><br>Comprova abans vs després · Comptador de sèrie · break/continue</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🛡️</span><strong>Excepcions</strong><br>try/catch/finally · throw i pròpies · checked vs unchecked</div>
</div>

---
layout: closing
---

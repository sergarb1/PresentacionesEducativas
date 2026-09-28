---
layout: cover
---

# Unitat 04 — Estructures de control i excepcions<br>Bloc 02

## 1r CFGS DAW · Programació

---
---

## Bucle for
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    <code>for</code> és un bucle amb <strong>comptador de sèrie</strong>: declara la variable, posa la condició i l'actualitza en la mateixa línia, ideal per a "repeteix N vegades".
  </div>
</div>

El while repetia "mentres passe alguna cosa". El for repeteix "un nombre exacte de vegades". És el bucle favorit per a recórrer coses i el que més usaràs en tota la teua carrera.

---
---

## L'anatomia del for

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Voltes.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>for (int i = 1; i &lt;= 5; i++) {
    System.out.println("Volta " + i);
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Inicialització</strong>: <code>int i = 1</code> — una sola vegada, en entrar</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Condició</strong>: <code>i &lt;= 5</code> — abans de cada volta</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><strong>Bloc</strong>: s'executa si la condició és true</div>
    </div>
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content"><strong>Actualització</strong>: <code>i++</code> — al final de cada volta</div>
    </div>
  </div>
</div>

<div class="warning" style="margin-top:0.6rem;">
  Una coma mal posada en el for és l'error d'examen més comú: <strong>tres parts, dos punts i coma, zero comes</strong>.
</div>

---
---

## Els tres bucles són el mateix acudit

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">TresBucles.java</div>
    <div class="code-card-badge">Java</div>
  </div>
  <pre><code>int i = 1;                  // while: les 3 parts repartides
while (i &lt;= 5) {
    System.out.println("Volta " + i);
    i++;
}
for (int j = 1; j &lt;= 5; j++) {  // for: les 3 parts en una línia
    System.out.println("Volta " + j);
}</code></pre>
</div>

<div class="success" style="margin-top:0.6rem;">
  Els dos imprimixen el mateix. El for guanya perquè junta les tres parts del control en una línia: és més difícil oblidar el <code>i++</code> (adéu, bucles infinits per descuit). <strong>Regla:</strong> saps quantes voltes → for; no ho saps → while.
</div>

---
---

## Bucles anidats: la graella d'exercicis

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Graella.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>for (int fila = 1; fila &lt;= 3; fila++) {
    for (int col = 1; col &lt;= 4; col++) {
        System.out.print("* ");
    }
    System.out.println();
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="terminal">
      <div class="output">* * * *</div>
      <div class="output">* * * *</div>
      <div class="output">* * * *</div>
    </div>
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">L'exterior controla les <strong>files</strong> (3)</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">L'interior controla les <strong>columnes</strong> (4)</div>
    </div>
  </div>
</div>

<div class="warning" style="margin-top:0.6rem;">
  Cada nivell d'anidament <strong>multiplica</strong> les voltes: 1000 × 1000 = 1.000.000 d'iteracions. Els bucles anidats són la fàbrica de programes lents.
</div>

---
---

## Exemple guiat: la taula de multiplicar

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">TaulaMultiplicar.java</div>
    <div class="code-card-badge">Java</div>
  </div>
  <pre><code>for (int i = 1; i &lt;= 10; i++) {
    System.out.println("7 x " + i + " = " + (7 * i));
}</code></pre>
</div>

<div class="terminal">
  <div class="output">7 x 1 = 7</div>
  <div class="output">7 x 2 = 14</div>
  <div class="output">7 x 3 = 21</div>
  <div class="output">…</div>
</div>

---
---

## El triangular: l'interior depén de l'exterior

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Triangle.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>for (int fila = 1; fila &lt;= 4; fila++) {
    for (int ast = 1; ast &lt;= fila; ast++) {
        System.out.print("*");
    }
    System.out.println();
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="terminal">
      <div class="output">*</div>
      <div class="output">**</div>
      <div class="output">***</div>
      <div class="output">****</div>
    </div>
    <div class="info" style="margin-top:0.6rem;">
      La condició de l'interior és <code>ast &lt;= fila</code>: cada fila imprimix tants asteriscs com número de fila. <strong>10 asteriscs</strong> en total (1+2+3+4). Que l'interior depenga de l'exterior és el cor dels bucles anidats.
    </div>
  </div>
</div>

---
---

## Mini-chequeig: for

<div class="question-card">
  <span class="question-icon">🧠</span>
  Respon en 30 segons:
</div>

1. Quines són les tres parts del for?
2. Quantes vegades s'executa la inicialització?
3. Què imprimix `for (int i = 0; i &lt; 5; i++)`? ¿5 o 4 voltes?
4. En un bucle anidat, què fa l'interior per cada volta de l'exterior?

<div class="answer-card">
  <strong>🔄 Respostes:</strong>
  <ul style="font-size:0.9rem;margin-top:0.15rem;">
    <li><strong>Inicialització</strong>, <strong>condició</strong> i <strong>actualització</strong>, separades per ;</li>
    <li><strong>Una sola vegada</strong>, en entrar en el bucle</li>
    <li><strong>5 voltes</strong>: amb i valent 0, 1, 2, 3 i 4 (compte amb l'off-by-one!)</li>
    <li>S'executa <strong>complet</strong> (totes les seues voltes) per cada volta de l'exterior</li>
  </ul>
</div>

---
---

## break: el botó de parada
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    <code>break</code> apaga el bucle sencer i <code>continue</code> es salta només la volta actual; amb <strong>etiquetes</strong> pots decidir a quin bucle anidat afecten.
  </div>
</div>

Ja saps repetir. Ara toca aprendre a <strong>eixir amb estil</strong>: interrompre, saltar i dirigir-te a un bucle concret quan n'hi ha diversos.

---
---

## break: acaba el bucle immediatament

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Parada.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>for (int i = 1; i &lt;= 10; i++) {
    if (i == 5) {
        break;
    }
    System.out.println(i);
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="terminal">
      <div class="output">1</div>
      <div class="output">2</div>
      <div class="output">3</div>
      <div class="output">4</div>
    </div>
    <div class="info" style="margin-top:0.6rem;">
      Tan bon punt i val 5, break talla: les voltes 6 a 10 no ocorren mai. Perfecte per a <strong>"troba alguna cosa i para de buscar"</strong>.
    </div>
  </div>
</div>

---
---

## continue: el botó de saltar

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Parells.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>int suma = 0;
for (int i = 1; i &lt;= 10; i++) {
    if (i % 2 != 0) {
        continue; // senars: no compten
    }
    suma += i;
}
System.out.println("Parells: " + suma);</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="terminal">
      <div><span class="prompt">$</span> java Parells</div>
      <div class="output">Parells: 30</div>
    </div>
    <div class="warning" style="margin-top:0.6rem;">
      En un <strong>while</strong>, si poses el continue <strong>abans</strong> d'actualitzar la variable, l'actualització es salta… i el bucle no avança: bug infinit assegurat. En un <strong>for</strong> no passa res: l'actualització és a la capçalera.
    </div>
  </div>
</div>

---
---

## Etiquetes: el GPS dels bucles anidats

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Exterior.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>exterior:
for (int i = 1; i &lt;= 3; i++) {
    for (int j = 1; j &lt;= 3; j++) {
        if (i * j &gt;= 6) {
            break exterior;
        }
        System.out.println(i + " x " + j);
    }
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="terminal">
      <div class="output">1 x 1</div>
      <div class="output">1 x 2</div>
      <div class="output">1 x 3</div>
      <div class="output">2 x 1</div>
      <div class="output">2 x 2</div>
    </div>
    <div class="info" style="margin-top:0.6rem;">
      Un break sol afecta <strong>només el bucle més intern</strong>. <code>break exterior;</code> ix dels <strong>dos bucles alhora</strong>.
    </div>
  </div>
</div>

<div class="warning" style="margin-top:0.6rem;">
  ⚠️ Les etiquetes són legals però <strong>poc usades</strong>: quasi sempre es pot redissenyar amb una variable booleana. Usa-les amb moderació: el teu company de projecte t'ho agrairà.
</div>

---
---

## Exemple guiat: el detector de nombres primers

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">EsPrimer.java</div>
    <div class="code-card-badge">Java</div>
  </div>
  <pre><code>int numero = 29;
boolean esPrimer = true;
for (int divisor = 2; divisor &lt; numero; divisor++) {
    if (numero % divisor == 0) {
        esPrimer = false;
        break; // trobat divisor: para de buscar
    }
}
System.out.println(numero + " és primer? " + esPrimer);</code></pre>
</div>

<div class="terminal">
  <div><span class="prompt">$</span> java EsPrimer</div>
  <div class="output">29 és primer? true</div>
</div>

---
---

## Mini-chequeig: break i continue

<div class="question-card">
  <span class="question-icon">🧠</span>
  Respon sense mirar:
</div>

1. Quina és la diferència entre break i continue en una frase?
2. A què afecten per defecte en bucles anidats?
3. Per a què servix una etiqueta?
4. Per què és perillós el continue en un while si va abans de l'actualització?

<div class="answer-card">
  <strong>🔄 Respostes:</strong>
  <ul style="font-size:0.9rem;margin-top:0.15rem;">
    <li>break <strong>acaba</strong> el bucle; continue <strong>salta només la volta actual</strong></li>
    <li>Al bucle <strong>més intern</strong></li>
    <li>Perquè un break o continue afecte un bucle exterior concret (<code>break etiqueta;</code>)</li>
    <li>Perquè l'actualització es salta i el bucle <strong>no avança</strong>: condició true per sempre</li>
  </ul>
</div>

---
---

## Excepcions bàsiques
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Una excepció és un <strong>avís que alguna cosa ha eixit malament</strong>: Java el llança com un objecte que hereta de <code>Throwable</code>, i el teu programa pot estar o no preparat per a atrapar-lo.
  </div>
</div>

T'ha passat que un programa es "cau" amb un munt de text roig? Eixe text és una excepció. En comptes de morir en silenci, Java crida amb tot el detall. Aprendre a llegir eixos crits és aprendre a depurar.

---
---

## El crash: la teua primera excepció

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Explosio.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>int[] numeros = { 1, 2, 3 };
System.out.println(numeros[5]); // no existix!</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="terminal">
      <div class="output">Exception in thread "main"</div>
      <div class="output">java.lang.ArrayIndexOutOfBoundsException:</div>
      <div class="output">Index 5 out of bounds for length 3</div>
      <div class="output">at Explosio.main(Explosio.java:5)</div>
    </div>
    <div class="info" style="margin-top:0.6rem;">
      Este text és or: et diu <strong>què</strong> (l'excepció), <strong>on</strong> (línia 5) i en <strong>quin mètode</strong>. Llegir-lo bé resol la mitat dels teus problemes.
    </div>
  </div>
</div>

---
---

## La família Throwable: l'arbre genealògic

<div class="two-cols">
  <div class="left">
    <div class="terminal">
      <div class="output">Object</div>
      <div class="output">└── Throwable</div>
      <div class="output">    ├── Error</div>
      <div class="output">    └── Exception</div>
      <div class="output">        └── RuntimeException</div>
    </div>
    <div class="warning" style="margin-top:0.6rem;">
      <strong>Error</strong>: problemes greus de la JVM (memòria esgotada). No els provoques tu i no has d'intentar atrapar-los.
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Throwable</strong>: la classe arrel de tot el que es llança</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Exception</strong>: fallades del programa. Ací viu el 99% de la teua vida</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><strong>RuntimeException</strong>: es llança en temps d'execució i <strong>no estàs obligat</strong> a capturar-la</div>
    </div>
  </div>
</div>

---
---

## Les excepcions més comunes: la guia de camp

| Excepció | Quan apareix | Frase típica |
| :--- | :--- | :--- |
| **ArithmeticException** | Dividir entre 0 | "Dividir entre zero, quin valent" |
| **ArrayIndexOutOfBounds** | Índex fora de l'array | "Eixe buit no existix" |
| **NullPointerException** | Cridar alguna cosa null | "El clàssic absolut" |
| **NumberFormatException** | Text que no és nombre | "Convertir 'Hola' en nombre, no" |
| **InputMismatchException** | Scanner rep el tipus equivocat | "Text on anava un nombre" |

<div class="warning" style="margin-top:0.6rem;">
  La <strong>NullPointerException</strong> és, amb diferència, l'excepció més comuna de la història de Java: apareix en tocar un objecte que val <code>null</code>.
</div>

---
---

## Mini-chequeig: excepcions

<div class="question-card">
  <span class="question-icon">🧠</span>
  Quina excepció llançaria cada línia?
</div>

1. `int a = 5 / 0;`
2. `dies[3]` amb un array de 3 elements
3. `text.toUpperCase()` amb `text = null`
4. `Integer.parseInt("quaranta-dos")`

<div class="answer-card">
  <strong>🔄 Respostes:</strong>
  <ul style="font-size:0.9rem;margin-top:0.15rem;">
    <li><strong>ArithmeticException</strong> (divisió entre zero)</li>
    <li><strong>ArrayIndexOutOfBoundsException</strong> (un array de 3 s'indexa 0, 1, 2)</li>
    <li><strong>NullPointerException</strong> (text és null)</li>
    <li><strong>NumberFormatException</strong> (eixe text no és un nombre)</li>
  </ul>
</div>

---
---

## Resum del bloc 02

<div class="features-grid" style="grid-template-columns:repeat(3,1fr);gap:0.7rem;">
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🔢</span><strong>for</strong><br>Inici; condició; avanç en una línia; anidats = multiplicar voltes</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🚪</span><strong>break / continue</strong><br>Apaga el bucle vs salta la volta; etiquetes per a anidats</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">💥</span><strong>Excepcions</strong><br>Throwable → Error / Exception → RuntimeException; llig el stack trace</div>
</div>

<div class="success" style="margin-top:0.5rem;">
  Bloc 03: <strong>try/catch/finally</strong> per a blindar el programa, <strong>throw</strong> i excepcions pròpies, i el repàs final.
</div>

---
layout: closing
---

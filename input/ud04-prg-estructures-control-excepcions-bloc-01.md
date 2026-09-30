---
layout: cover
---

# Unitat 04 — Estructures de control i excepcions bàsiques<br>Bloc 01

## 1r CFGS DAW · Programació

---
---

## Control del flux
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Fins ara els teus programes anaven de dalt a baix, una línia darrere l'altra. A partir d'ací <strong>decideixen</strong> (if, switch), <strong>repeteixen</strong> (while, for) i <strong>interrompen</strong> (break, continue): el flux deixa de ser una línia recta i es converteix en un mapa.
  </div>
</div>

En este bloc: les condicions, els bucles i les eixides anticipades. Les excepcions esperen al bloc 02.

---
class: compact-slide
---

## El semàfor del flux
### Com s'avalua una cadena d'if

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud04-prg-semafor-flux.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---
class: compact-slide
---

## if / else if / else: el semàfor del codi

<div class="code-card">
  <div class="code-card-header"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span><span class="code-card-title">Semafor.java</span></div>

```java
int nota = 7;

if (nota >= 9) {
    System.out.println("Excel·lent");
} else if (nota >= 7) {
    System.out.println("Notable");
} else if (nota >= 5) {
    System.out.println("Aprovat");
} else {
    System.out.println("Suspés");
}
```
</div>

<div class="info" style="margin-top:0.6rem;">
  Java avalua <strong>de dalt a baix</strong>: tan bon punt una condició done <code>true</code>, executa el seu bloc i <strong>salta la resta</strong>. El <code>else</code> final atrapa els que no entraren — i és opcional.
</div>

---
class: compact-slide
---

## L'ordre mana: del més exigent al més permissiu

<div class="comparison-grid">
  <div class="comparison-item bad">
    <h4>❌ Ordre invertit</h4>

```java
if (nota >= 5) {
    resultat = "Aprovat";
} else if (nota >= 7) {
    resultat = "Notable";
}
// amb nota = 8 → "Aprovat"
```
  </div>
  <div class="comparison-item good">
    <h4>✅ Ordre correcte</h4>

```java
if (nota >= 9) {
    resultat = "Excel·lent";
} else if (nota >= 7) {
    resultat = "Notable";
}
// amb nota = 8 → "Notable"
```
  </div>
</div>

<div class="warning" style="margin-top:0.6rem;">
  <strong>El primer if que es complix guanya</strong>, encara que no siga el que volies. Amb nota = 8, la versió invertida mai no arriba al "Notable": este és el 90% dels bugs de la unitat.
</div>

---
class: compact-slide
---

## If anidats i ternari

<div class="two-cols">
  <div class="left">
    <h3 style="color:#3B82F6;">🪆 If dins d'un if</h3>

```java
if (edat >= 18) {
    if (teCarnet) {
        System.out.println("Pots conduir.");
    } else {
        System.out.println("Et falta el carnet.");
    }
}
```
  </div>
  <div class="right">
    <h3 style="color:#3B82F6;">🎚️ El ternari: if de butxaca</h3>

```java
String msg = (edat >= 18)
    ? "Major d'edat"
    : "Menor d'edat";
```
    <div class="success" style="margin-top:0.6rem;">
      <strong>Regla d'or:</strong> ternari per a <strong>assignar un valor</strong> en una línia; if/else quan el bloc és llarg o fa més que assignar.
    </div>
    <div class="warning" style="margin-top:0.6rem;">
      Més de <strong>3 nivells</strong> d'anidament = Torres Kio: senyal que cal aplanar el codi.
    </div>
  </div>
</div>

---
---

## Mini-chequeig: if / else

<div class="question-card">
  <span class="question-icon">🧠</span>
  Sense executar, en 30 segons:
</div>

1. Què fa Java si un `if` és false i no hi ha `else`?
2. En quin ordre has d'encadenar les condicions d'un `else if`?
3. `int edat = 16; boolean acompanyat = true;` — què imprimeix: `edat >= 18 ? "Entra" : edat >= 16 && acompanyat ? "Amb acompanyant" : "Fora"`?

<div class="answer-card">
  <strong>🔄 Respostes:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li><strong>Continua la següent línia</strong>: l'if s'ignora en silenci</li>
    <li>De la més <strong>exigent</strong> a la més <strong>permissiva</strong>: el primer <code>true</code> es queda la decisió</li>
    <li><strong>"Amb acompanyant"</strong>: 16 no arriba a 18, però sí que compleix la segona condició — el ternari també s'avalua en ordre</li>
  </ul>
</div>

---
---

## switch: el menú del restaurant
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    <strong>switch</strong> és la carta d'un restaurant: mires <strong>el valor d'una variable</strong> i executes el <code>case</code> que coincidisca — sense encadenar vint <code>else if</code>. Ideal per a <strong>moltes opcions concretes</strong> (dia, talla, menú).
  </div>
</div>

Admet enters, `char`, `enum` i `String` (des de Java 7). Amb rangs o condicions combinades → if/else if.

---
class: compact-slide
---

## switch en acció

<div class="code-card">
  <div class="code-card-header"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span><span class="code-card-title">MenuDia.java</span></div>

```java
String dia = "dimecres";

switch (dia) {
    case "dilluns":  System.out.println("Llenties"); break;
    case "dimarts":  System.out.println("Paella");   break;
    case "dimecres": System.out.println("Macarrons");break;
    default:         System.out.println("Cap de setmana: no hi ha menú");
}
```
</div>

<div class="two-cols" style="margin-top:0.6rem;">
  <div class="left">
    <div class="warning">
      <strong>Sense break → fall-through</strong>: el codi es desborda al case següent fins a trobar un break. El clàssic bug del novell.
    </div>
  </div>
  <div class="right">
    <div class="success">
      <strong>default</strong> és el comodí ("cap dels anteriors") i és opcional, com l'else.
    </div>
  </div>
</div>

---
class: compact-slide
---

## Fall-through: error o superpoder?

<div class="comparison-grid">
  <div class="comparison-item bad">
    <h4>⚠️ Accidental</h4>

```java
switch (plat) {
    case 1:
        System.out.println("Amanida");
        // sense break:
        // es cau al següent
    case 2:
        System.out.println("Sopa");
        break;
}
// plat = 1 imprimeix les dues
```
  </div>
  <div class="comparison-item good">
    <h4>✅ Intencional</h4>

```java
switch (lletra) {
    case 'a': case 'e':
    case 'i': case 'o':
    case 'u':
        System.out.println("Vocal");
        break;
    default:
        System.out.println("Consonant");
}
```
  </div>
</div>

<div class="info" style="margin-top:0.6rem;">
  Agrupar casos sense break entre ells és <strong>elegant i compacte</strong>. Oblidar-lo sense voler és un tobogan: <strong>compta els break</strong>, un per cada case no compartit.
</div>

---
---

## Mini-chequeig: switch

<div class="question-card">
  <span class="question-icon">🧠</span>
  El switch oblidadís — què imprimeix si <code>numero = 2</code>?
</div>

```java
switch (numero) {
    case 1:  System.out.println("U");   // sense break
    case 2:  System.out.println("Dos"); // sense break
    case 3:  System.out.println("Tres"); break;
    default: System.out.println("Altre"); break;
}
```

<div class="answer-card">
  <strong>🔄 Resposta:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li>Imprimeix <strong>Dos</strong> i <strong>Tres</strong>: entra pel case 2, no troba break i <strong>es cau al case 3</strong>, on sí que hi ha break</li>
    <li>El case 1 mai no s'executa perquè numero no val 1 — el fall-through baixa, mai no puja</li>
  </ul>
</div>

---
---

## Bucles: while i do-while
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Un bucle és una cinta de córrer: executa el mateix bloc una vegada i una altra <strong>mentre la condició siga true</strong>. El <code>while</code> comprova <strong>abans</strong> de córrer; el <code>do-while</code> corre <strong>almenys una vegada</strong> i comprova després.
  </div>
</div>

Copiar i enganxar cent `println` és pecat: els bucles fan la faena bruta per tu.

---
class: compact-slide
---

## while vs do-while: el duel

<div class="two-cols">
  <div class="left">
    <h3 style="color:#3B82F6;">🏃 while: mira i després corre</h3>

```java
int intents = 3;
while (intents > 0) {
    System.out.println("Queden " + intents);
    intents = intents - 1;
}
```
    <div class="info" style="margin-top:0.5rem;">
      Si la condició és false d'entrada: <strong>zero execucions</strong>. Ideal per a llegir fins a un sentinella ("eixir").
    </div>
  </div>
  <div class="right">
    <h3 style="color:#3B82F6;">🏃‍♂️ do-while: corre i després mira</h3>

```java
int opcio;
do {
    System.out.println("1. Jugar  2. Eixir");
    System.out.print("Tria: ");
    opcio = sc.nextInt();
} while (opcio != 1 && opcio != 2);
```
    <div class="info" style="margin-top:0.5rem;">
      El menú es mostra <strong>sempre almenys una vegada</strong>: perfecte per a menús.
    </div>
  </div>
</div>

<div class="warning" style="margin-top:0.6rem;">
  ⚠️ <strong>Bucle infinit:</strong> si dins del bloc res no modifica la condició cap a <code>false</code>, el programa no acaba mai. La pregunta obligada: <em>la condició avança cap a false en algun moment?</em>
</div>

---
---

## Mini-chequeig: bucles while

<div class="question-card">
  <span class="question-icon">🧠</span>
  El comptador parat — quantes voltes fa o es penja?
</div>

```java
int x = 10;
while (x > 0) {
    System.out.println("Hola");
    x = x + 1;
}
```

<div class="answer-card">
  <strong>🔄 Resposta:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li><strong>Bucle infinit</strong>: x comença en 10 i <em>puja</em> en comptes de baixar — la condició <code>x &gt; 0</code> és true per sempre</li>
    <li>La correcció és <code>x = x - 1;</code>. Pista visual: un comptador que puja en un bucle que demana que baixe és fum a l'ordinador</li>
  </ul>
</div>

---
---

## for i bucles anidats
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    <strong>for</strong> és un bucle amb comptador de sèrie: inicialització, condició i actualització en la mateixa línia. Ideal per a <strong>"repeteix N vegades"</strong>. I un bucle dins d'un altre (<strong>anidat</strong>) és una graella: files × columnes.
  </div>
</div>

Si saps quantes vegades repetiràs → `for`. Si no ho saps → `while`.

---
class: compact-slide
---

## L'anatomia del for

<div class="code-card">
  <div class="code-card-header"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span><span class="code-card-title">TaulaMultiplicar.java</span></div>

```java
for (int i = 1; i <= 10; i++) {
    System.out.println("7 x " + i + " = " + (7 * i));
}
```
</div>

<div class="two-cols" style="margin-top:0.6rem;">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><code>int i = 1</code> — inicialització: <strong>una sola vegada</strong>, en entrar</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><code>i &lt;= 10</code> — condició: es comprova <strong>abans de cada volta</strong></div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><code>i++</code> — actualització: al final de cada volta</div>
    </div>
  </div>
  <div class="right">
    <div class="warning">
      La sintaxi és <strong>inici ; condició ; avanç</strong>: tres parts i dos punts i coma, zero comes. I compte amb l'<strong>off-by-one</strong>: <code>&lt;</code> fa 9 voltes on <code>&lt;=</code> en fa 10.
    </div>
    <div class="info" style="margin-top:0.6rem;">
      while, do-while i for fan el mateix: <strong>tria for quan sàpies les voltes</strong>.
    </div>
  </div>
</div>

---
class: compact-slide
---

## Bucles anidats: la graella

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span><span class="code-card-title">Triangle.java</span></div>

```java
for (int fila = 1; fila <= 4; fila++) {
    for (int ast = 1; ast <= fila; ast++) {
        System.out.print("*");
    }
    System.out.println();
}
```
    </div>
  </div>
  <div class="right">
    <div class="success">
      <strong>Eixida:</strong> <code>*</code>, <code>**</code>, <code>***</code>, <code>****</code> — en total <strong>10 asteriscs</strong> (1+2+3+4).
    </div>
    <div class="info" style="margin-top:0.6rem;">
      El truc: la condició de l'interior depén de l'exterior (<code>ast &lt;= fila</code>). Per cada volta de l'exterior, l'interior <strong>s'executa complet</strong>.
    </div>
    <div class="warning" style="margin-top:0.6rem;">
      Cada nivell <strong>multiplica</strong> les voltes: 1000 × 1000 = 1.000.000 d'iteracions. Els anidats són la fàbrica de programes lents.
    </div>
  </div>
</div>

---
---

## Mini-chequeig: for i anidats

<div class="question-card">
  <span class="question-icon">🧠</span>
  Resposta ràpida:
</div>

1. Quantes voltes fa `for (int i = 0; i < 3; i++)`?
2. Quantes vegades s'executa la inicialització d'un for?
3. El triangle amb `fila <= 4`: quants asteriscs imprimeix en total?

<div class="answer-card">
  <strong>🔄 Respostes:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li><strong>3 voltes</strong>: amb i valent 0, 1 i 2 — quan i arriba a 3 la condició falla</li>
    <li><strong>Una sola</strong>, en entrar en el bucle</li>
    <li><strong>10</strong> (1+2+3+4): cada fila imprimeix tants asteriscs com el seu número</li>
  </ul>
</div>

---
---

## break, continue i etiquetes
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    <strong>break</strong> apaga el bucle sencer; <strong>continue</strong> es salta només la volta actual. En bucles anidats afecten el <strong>més intern</strong>, i les <strong>etiquetes</strong> permeten apuntar a un bucle exterior.
  </div>
</div>

Un acaba la festa; l'altre només es perd una cançó.

---
class: compact-slide
---

## break i continue en acció

<div class="comparison-grid">
  <div class="comparison-item good">
    <h4>🚪 break: botó de parada</h4>

```java
for (int i = 1; i <= 10; i++) {
    if (i == 5) {
        break;  // apaga el bucle
    }
    System.out.println(i);
}
// eixida: 1 2 3 4
```
  </div>
  <div class="comparison-item good">
    <h4>⏭️ continue: botó de saltar</h4>

```java
for (int i = 1; i <= 5; i++) {
    if (i == 3) {
        continue;  // salta la volta
    }
    System.out.println(i);
}
// eixida: 1 2 4 5
```
  </div>
</div>

<div class="warning" style="margin-top:0.6rem;">
  En un <strong>while</strong>, un continue posat <strong>abans d'actualitzar</strong> la variable salta l'actualització... i el bucle no avança: bug infinit assegurat. En un for no passa res: l'actualització viu a la capçalera.
</div>

---
class: compact-slide
---

## El bucle psicodèlic

<div class="code-card">
  <div class="code-card-header"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span><span class="code-card-title">Psicodelic.java</span></div>

```java
for (int i = 1; i <= 8; i++) {
    if (i % 3 == 0) {
        continue;   // es salta el 3 i el 6
    }
    if (i == 7) {
        break;      // apaga el bucle en el 7
    }
    System.out.println(i);
}
```
</div>

<div class="info" style="margin-top:0.6rem;">
  <strong>Eixida: 1, 2, 4, 5</strong> — el continue es menja els múltiples de 3, el break talla en el 7 (que tampoc no s'imprimeix) i el 8 mai no s'avalua.
</div>

<div class="warning" style="margin-top:0.6rem;">
  Les <strong>etiquetes</strong> (<code>exterior:</code> davant d'un bucle + <code>break exterior;</code>) són legals però poc usades: quasi sempre es pot redissenyar amb una variable booleana. Moderació.
</div>

---
---

## Mini-chequeig: break i continue

<div class="question-card">
  <span class="question-icon">🧠</span>
  Últim chequeig del bloc:
</div>

1. break i continue en una frase?
2. En bucles anidats, a quin bucle afecten per defecte?
3. Per què és perillós un continue abans de l'actualització en un while?

<div class="answer-card">
  <strong>🔄 Respostes:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li><strong>break acaba</strong> el bucle; <strong>continue salta només la volta actual</strong></li>
    <li>Al <strong>més intern</strong>; per a eixir de dos alhora cal una etiqueta (<code>break etiqueta;</code>)</li>
    <li>L'actualització es salta i el bucle <strong>no avança</strong>: condició true per sempre</li>
  </ul>
</div>

---
---

## Resum del bloc 01
### Tres frases per quedar-te

<div class="features-grid" style="margin-top:1rem;">
  <div class="feature-item">
    <span class="feature-icon">🚦</span>
    <strong>Condicions</strong>
    <p style="font-size:0.9rem;">if/else if s'avaluen en ordre i guanya el primer true: ordena de més exigent a més permissiva. switch per a valors concrets, amb break per cas.</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">🔁</span>
    <strong>Bucles</strong>
    <p style="font-size:0.9rem;">while comprova abans, do-while almenys una volta, for compta les voltes. La condició ha d'avançar cap a false o tens un bucle infinit.</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">🚪</span>
    <strong>Eixides</strong>
    <p style="font-size:0.9rem;">break apaga el bucle, continue salta la volta; en anidats manen el més intern. Les etiquetes existeixen, però ús-les amb moderació.</p>
  </div>
</div>

---
layout: closing
---

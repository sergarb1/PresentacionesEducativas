---
layout: cover
---

# Unitat 04 — Estructures de control i excepcions<br>Bloc 01

## 1r CFGS DAW · Programació

---
---

## if: el semàfor del codi
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    <code>if</code> és el semàfor del codi: si la condició és <code>true</code>, deixa passar al bloc; si és <code>false</code>, el redirigeix al <code>else</code> (o continua com si res).
  </div>
</div>

En unitats anteriors els teus programes jutjaven amb operadors relacionals i ternaris, però eixa justícia durava una línia. Ara arriba la justícia de debò: **blocs sencers** de codi que s'executen o no segons el que decidisca Java.

---
---

## if i else: la estructura bàsica

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">Semafor.java</div>
    <div class="code-card-badge">Java</div>
  </div>
  <pre><code>int edat = 17;
if (edat &gt;= 18) {
    System.out.println("Pots votar.");
} else {
    System.out.println("Encara no pots votar.");
}</code></pre>
</div>

<div class="warning" style="margin-top:0.6rem;">
  El <code>else</code> és <strong>opcional</strong>: un <code>if</code> sol és perfectament legal. Si la condició falla, Java continua com si res.
</div>

---
---

## else if: quan hi ha més de dos camins

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">Notes.java</div>
    <div class="code-card-badge">Java</div>
  </div>
  <pre><code>int nota = 7;
if (nota &gt;= 9) {
    System.out.println("Excel·lent");
} else if (nota &gt;= 7) {
    System.out.println("Notable");
} else if (nota &gt;= 5) {
    System.out.println("Aprovat");
} else {
    System.out.println("Suspés");
}</code></pre>
</div>

<div class="info" style="margin-top:0.6rem;">
  Java avalua les condicions <strong>en ordre, de dalt a baix</strong>: quan una dona <code>true</code>, executa el seu bloc i <strong>es salta la resta</strong>. L'ordre importa: de la més <strong>exigent</strong> a la més <strong>permissiva</strong>.
</div>

---
---

## L'ordre està invertit: el semàfor confús

<div class="comparison-grid">
  <div class="comparison-item bad">
    <p>❌ Aquest programa imprimeix…</p>
    <p><code>if (nota &gt;= 5) → "Aprovat"</code><br><code>else if (nota &gt;= 7) → "Notable"</code><br><code>else if (nota &gt;= 9) → "Excel·lent"</code></p>
    <p>Amb nota = 8 imprimeix <strong>"Aprovat"</strong>: el primer if que es compleix guanya, encara que 8 també compliria 7 i 9.</p>
  </div>
  <div class="comparison-item good">
    <p>✅ La correcció: ordena al revés</p>
    <p><code>if (nota &gt;= 9)</code> primer,<br><code>else if (nota &gt;= 7)</code> després,<br><code>else if (nota &gt;= 5)</code> al final.</p>
    <p>De la més exigent a la més permissiva: eixe és el 90% dels bugs d'esta unitat.</p>
  </div>
</div>

---
---

## If anidats: semàfors dins de semàfors

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Conduir.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>if (edat &gt;= 18) {
    if (teCarnet) {
        System.out.println("Pots conduir.");
    } else {
        System.out.println("Et falta el carnet.");
    }
} else {
    System.out.println("Encara no pots conduir.");
}</code></pre>
    </div>
  </div>
  <div class="right">
    <p>Un if pot viure dins d'un altre: útil per a decidir <em>dins</em> d'una decisió.</p>
    <div class="warning" style="margin-top:0.6rem;">
      No convertesques els teus programes en les <strong>Torres Kio</strong>: més de <strong>3 nivells</strong> d'anidament és senyal que estàs fent les coses estrany.
    </div>
  </div>
</div>

---
---

## El ternari: el if de butxaca

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Ternari.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>// ✅ Bé: ternari per a triar valor
double preuFinal = (dia.equals("divendres"))
    ? preu * 0.9
    : preu;
// ✅ Bé: if quan hi ha varies línies
if (saldo &lt; 0) {
    System.out.println("Números rojos.");
    System.out.println("Revisa despeses.");
} else {
    System.out.println("Saldo sa.");
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">?</div>
      <div class="step-content"><code>condicio ? valor1 : valor2</code> — un if-else en una línia, per a <strong>assignar un valor</strong></div>
    </div>
    <div class="success" style="margin-top:0.6rem;">
      <strong>Regla d'or:</strong> ternari per a assignar en una línia; if/else quan el bloc és llarg o fa més que assignar.
    </div>
  </div>
</div>

---
---

## Exemple guiat: la discoteca municipal

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">Discoteca.java</div>
    <div class="code-card-badge">Java</div>
  </div>
  <pre><code>int edat = 16;
boolean acompanyat = true;
if (edat &gt;= 18) {
    System.out.println("Entra, major d'edat.");
} else if (edat &gt;= 16 &amp;&amp; acompanyat) {
    System.out.println("Entra, però amb el teu acompanyant.");
} else {
    System.out.println("Ho sent, torna en uns quants anys.");
}</code></pre>
</div>

<div class="terminal">
  <div><span class="prompt">$</span> java Discoteca</div>
  <div class="output">Entra, però amb el teu acompanyant.</div>
</div>

---
---

## Mini-chequeig: if, else if, ternari

<div class="question-card">
  <span class="question-icon">🧠</span>
  Respon en 30 segons:
</div>

1. Què fa Java si un if és false i no hi ha else?
2. En quin ordre has d'encadenar les condicions d'un else if?
3. Quan prefereixes un ternari a un if/else?
4. Què imprimix `String s = 5 &gt; 3 ? "A" : "B";`?

<div class="answer-card">
  <strong>🔄 Respostes:</strong>
  <ul style="font-size:0.9rem;margin-top:0.15rem;">
    <li>Seguix executant la següent línia: l'if s'ignora en silenci</li>
    <li>De la més <strong>exigent</strong> a la més <strong>permissiva</strong>: el primer true es queda amb la decisió</li>
    <li>Quan només vols <strong>assignar un valor</strong> en una línia i les dues branques són curtes</li>
    <li><strong>"A"</strong> — perquè 5 &gt; 3 és true</li>
  </ul>
</div>

---
---

## switch: el menú del restaurant
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    <code>switch</code> és la carta d'un restaurant: mires el valor d'una variable i executes el <code>case</code> que coincidisca, sense encadenar vint if.
  </div>
</div>

Quan has de triar entre moltes opcions amb un sol valor (dia de la setmana, talla, menú), una cadena d'else if funciona però és lletja. switch existeix per a això.

---
---

## switch: les peces del puzle

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Dies.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>int dia = 3;
switch (dia) {
    case 1:
        System.out.println("Dilluns");
        break;
    case 2:
        System.out.println("Dimarts");
        break;
    case 3:
        System.out.println("Dimecres");
        break;
    default:
        System.out.println("Desconegut");
        break;
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><code>switch (variable)</code>: admet int, char, enum i String (Java 7+)</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><code>case valor:</code> cada opció concreta a comparar</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><code>break;</code> "fins ací he arribat": talla el switch</div>
    </div>
    <div class="step">
      <div class="step-number">?</div>
      <div class="step-content"><code>default:</code> el comodí "cap dels anteriors" (opcional)</div>
    </div>
  </div>
</div>

---
class: compact-slide
---

## El fall-through: error o superpoder?

<div class="comparison-grid">
  <div class="comparison-item bad">
    <p>⚠️ <strong>Fall-through ACCIDENTAL</strong></p>
    <pre><code>switch (plat) {
case 1:
    System.out.println("Amanida");
    // sense break: es cau
case 2:
    System.out.println("Sopa");
    break;
}</code></pre>
    <p>Imprimeix <strong>els dos plats</strong>: un break oblidat converteix el switch en un tobogan.</p>
  </div>
  <div class="comparison-item good">
    <p>✅ <strong>Fall-through INTENCIONAL</strong></p>
    <pre><code>switch (lletra) {
case 'a': case 'e': case 'i':
case 'o': case 'u':
    System.out.println("Vocal");
    break;
}</code></pre>
    <p>Per a agrupar casos: si és qualsevol vocal, executa el bloc compartit. Elegant i compacte.</p>
  </div>
</div>

---
class: compact-slide
---

## switch vs else if: el duel

| Situació | Millor opció |
| :--- | :--- |
| Un valor i moltes opcions concretes (1..7, "S"/"M"/"L") | <strong>switch</strong> |
| Rangs o comparacions (&gt;= 18, entre 10 i 20) | <strong>if/else if</strong> |
| Combinar diverses variables | <strong>if/else if</strong> |
| Comprovar null | <strong>if</strong> |

<div class="info" style="margin-top:0.6rem;">
  💡 Nota de futur: en Java 14+ existix el switch amb fletxes (<code>-&gt;</code>) que no necessita break i retorna valors. Ací aprenem el clàssic, que és el dels exàmens.
</div>

---
---

## Exemple guiat: el menú del dia

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">MenuDia.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>switch (dia) {
    case "dilluns":
        System.out.println("Llenties");
        break;
    case "dimarts":
        System.out.println("Paella");
        break;
    case "dimecres":
        System.out.println("Macarrons");
        break;
    default:
        System.out.println("Cap de setmana");
        break;
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="terminal">
      <div><span class="prompt">$</span> java MenuDia   <span class="output">// dia = "dimecres"</span></div>
      <div class="output">Macarrons</div>
    </div>
    <div class="warning" style="margin-top:0.6rem;">
      🕶️ <strong>Don Tip:</strong> quan veges un switch, compta els <code>break</code>: n'hi ha d'haver un per cada case no compartit. Si en falta algun, el teu programa es converteix en un tobogan.
    </div>
  </div>
</div>

---
---

## Mini-chequeig: switch

<div class="question-card">
  <span class="question-icon">🧠</span>
  Respon sense mirar:
</div>

1. Què passa si un case no té break?
2. Què fa el default?
3. Quan prefereixes switch a una cadena d'else if?
4. Com agrupes diversos valors en el mateix bloc?

<div class="answer-card">
  <strong>🔄 Respostes:</strong>
  <ul style="font-size:0.9rem;margin-top:0.15rem;">
    <li>Es produïx el <strong>fall-through</strong>: el codi seguix amb els case següents fins a trobar un break</li>
    <li>És el comodí: s'executa si <strong>cap</strong> case coincideix. És opcional</li>
    <li>Quan compares <strong>un valor amb moltes opcions concretes</strong> (nombres, char, String)</li>
    <li>Escrivint els case seguits <strong>sense break</strong> entre ells i un sol bloc al final</li>
  </ul>
</div>

---
---

## Bucles: while i do-while
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Un bucle és una cinta de córrer: executa el mateix bloc una vegada i una altra <strong>mentre la condició siga true</strong>.
  </div>
</div>

T'imagines escriure "imprimeix de l'1 al 100" amb cent println? Copiar i enganxar és pecat. Els bucles fan la faena bruta per tu: repeteixen un bloc fins que els dius prou.

---
---

## while: comprova i després corre

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Intents.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>int intents = 3;
while (intents &gt; 0) {
    System.out.println("Queden " + intents);
    intents = intents - 1;
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="terminal">
      <div class="output">Queden 3</div>
      <div class="output">Queden 2</div>
      <div class="output">Queden 1</div>
    </div>
    <div class="warning" style="margin-top:0.6rem;">
      El while primer <strong>mira la condició</strong> i, si és true, executa el bloc. Si és false des del principi… <strong>no executa res</strong>.
    </div>
  </div>
</div>

---
---

## El bucle infinit (i com eixir-ne)

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Sentinela.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>while (true) {
    System.out.println("Socors");
}
// Ús legítim: sentinella
String resposta = "";
while (!resposta.equals("eixir")) {
    System.out.print("Digues: ");
    resposta = sc.nextLine();
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="warning">
      Si oblides la línia que modifica la condició, el programa <strong>no acaba mai</strong>: benvingut al bucle infinit, el cotxe sense frens de la programació. En l'IDE, el botó de parar (🟥) és el teu millor amic.
    </div>
    <div class="info" style="margin-top:0.6rem;">
      Per què existix <code>while (true)</code>? Perquè a vegades vols un bucle "per sempre" que es trenque <strong>des de dins</strong> amb <code>break</code> (punt 5). Un clàssic: llegir fins que l'usuari escriga "eixir" (el <strong>sentinella</strong>).
    </div>
  </div>
</div>

---
---

## do-while: corre i després comprova

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Menu.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>int opcio;
do {
    System.out.println("1. Jugar  2. Eixir");
    System.out.print("Tria: ");
    opcio = sc.nextInt();
} while (opcio != 1 &amp;&amp; opcio != 2);
System.out.println("Opció " + opcio);</code></pre>
    </div>
  </div>
  <div class="right">
    <p>La diferència amb while és l'<strong>ordre</strong>: el do-while executa el bloc <strong>almenys una vegada</strong> i comprova la condició al final.</p>
    <div class="success" style="margin-top:0.6rem;">
      El menú es mostra <strong>sempre almenys una vegada</strong> i es repeteix mentre l'usuari no trie 1 o 2: perfecte per a menús.
    </div>
  </div>
</div>

---
---

## while vs do-while: el duel ràpid

| Situació | Bucle ideal |
| :--- | :--- |
| No saps si tocarà executar el bloc | <strong>while</strong> |
| El bloc s'ha d'executar sí o sí una vegada | <strong>do-while</strong> |
| Llegir dades fins que l'usuari done el sentinella | <strong>while</strong> |
| Mostrar un menú fins que trie opció vàlida | <strong>do-while</strong> |

<div class="info" style="margin-top:0.6rem;">
  És la diferència entre <strong>"mira abans de creuar"</strong> (while) i <strong>"creua i després mira"</strong> (do-while).
</div>

---
---

## Exemple guiat: el compte arrere

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">CompteArrere.java</div>
        <div class="code-card-badge">Java</div>
      </div>
      <pre><code>int comptador = 5;
do {
    System.out.println(comptador);
    comptador--;
} while (comptador &gt;= 0);
System.out.println("Enlairament! 🚀");</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="terminal">
      <div class="output">5</div>
      <div class="output">4</div>
      <div class="output">3</div>
      <div class="output">2</div>
      <div class="output">1</div>
      <div class="output">0</div>
      <div class="output">Enlairament! 🚀</div>
    </div>
  </div>
</div>

---
---

## Mini-chequeig: bucles

<div class="question-card">
  <span class="question-icon">🧠</span>
  Respon en 30 segons:
</div>

1. Quantes vegades s'executa el bloc d'un while si la condició és false des del principi?
2. I en un do-while?
3. Què és un bucle infinit i com s'ix d'ell en l'IDE?
4. Quan usaríes un do-while per a un menú?

<div class="answer-card">
  <strong>🔄 Respostes:</strong>
  <ul style="font-size:0.9rem;margin-top:0.15rem;">
    <li><strong>Zero vegades</strong>: el while comprova abans d'executar</li>
    <li><strong>Almenys una vegada</strong>: el do-while executa i comprova després</li>
    <li>Un bucle la condició del qual mai no passa a false; es talla amb el botó 🟥 de l'IDE</li>
    <li>Quan vulgues mostrar el menú <strong>sempre almenys una vegada</strong> fins a triar opció vàlida</li>
  </ul>
</div>

---
---

## Resum del bloc 01

<div class="features-grid" style="grid-template-columns:repeat(3,1fr);gap:0.7rem;">
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🚦</span><strong>if / else if / else</strong><br>El semàfor: guanya el primer true; ordena de més exigent a més laxa</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🍽️</span><strong>switch</strong><br>Valors concrets; sense break → fall-through; default és el comodí</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🏃</span><strong>while / do-while</strong><br>Comprova abans vs després; la condició ha d'avançar cap a false</div>
</div>

<div class="success" style="margin-top:0.5rem;">
  Bloc 02: el bucle <strong>for</strong>, els bucles anidats, <strong>break i continue</strong>… i les <strong>excepcions</strong> fan la seua entrada.
</div>

---
layout: closing
---

---
layout: cover
---

# Unitat 02 — Introducció a Java<br>Bloc 2

## 1r CFGS DAW · Programació

---
---

## En aquesta sessió

### Aprofitem l'esquelet del Bloc 1: ara el codi es documenta, rep dades i aprende a fallar

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">Comentaris: <code>//</code>, <code>/* */</code> i <strong>Javadoc</strong>.</div>
</div>

<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><code>String[] args</code>: donar dades al programa <strong>abans</strong> que arranque.</div>
</div>

<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">El compilador i els seus errors: llegir el missatge, no temer-lo.</div>
</div>

<div class="step">
  <div class="step-number">4</div>
  <div class="step-content">El flux de treball diari en VS Code: <code>src</code>, <code>bin</code>, dreceres i autocompletat.</div>
</div>

<div class="step">
  <div class="step-number">5</div>
  <div class="step-content">Repàs: tu ets la JVM (altra volta), Conrad el compilador i el laboratori de tortura.</div>
</div>

<div class="info">
  Necessites el JDK instal·lat i VS Code amb l'extensió de Java (Bloc 1).
</div>

---
---

## Comentaris: missatges per a humans

<p>L'ordinador <strong>ignora completament</strong> els comentaris: són per a persones, no per a màquines.</p>

<div class="two-cols">
  <div class="left">
    <p>El codi explica <strong>què</strong> fa la màquina; els comentaris expliquen <strong>per què</strong> ho fa.</p>
    <p>I el perquè és or pur: sis mesos després, eixe comentari t'estalviarà hores de «què estava pensant quan vaig escriure açò?».</p>
  </div>
  <div class="right">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">comentaris.java</span>
      </div>
      <pre><code>    <span class="comment">// D'una línia: "Ací va la màgia"</span>
    <span class="block-comment">/*
      De bloc: "Si això funciona, no ho toques.
      Si no funciona, no ho toques tampoc.
      Ja cridarem algú."
    */</span>
    <span class="block-comment">/** Javadoc: l'elegant, genera documentació */</span></code></pre>
    </div>
  </div>
</div>

---
---

## Els tres tipus de comentaris

| Tipus | Sintaxi | Ús |
| ----- | ----- | ----- |
| **D'una línia** | `// text` | Notes ràpides al costat del codi, llistes de tasques |
| **De bloc** | `/* text */` | Explicacions llargues o desactivar codi temporalment |
| **Javadoc** | `/** text */` | Documentació formal de classes i mètodes |

<div class="info">
  Poden anar enmig d'una línia: <code>System.out.println(/* "Cuatro" */ "Cinco")</code> imprimix <strong>Cinco</strong> — el comentari s'ignora i la resta seguix viva.
</div>

<div class="success">
  <strong>El consell que t'estalviarà hores:</strong> comenta el <strong>per què</strong>, no el què. <code>// declaro i amb valor 0</code> és com posar «Obro la porta» en una porta.
</div>

---
---

## Comenta el per què, no el què

<div class="comparison-grid">
  <div class="comparison-item bad">
    <p>❌ <code>int temperatura = 30; // temperatura val 30</code></p>
    <p>Repetix el que el codi ja diu: no aporta res.</p>
  </div>
  <div class="comparison-item good">
    <p>✅ <code>int temperatura = 30; // refresca per davall de 25 segons el cap</code></p>
    <p>Context i intenció que el codi no pot expressar.</p>
  </div>
</div>

<div class="info">
  🧠 <strong>Truc de memòria:</strong> si el comentari descriu la mateixa acció que veus en el codi, esborra'l. El bon comentari respon a «per què?», mai a «què?».
</div>

---
---

## Javadoc: documentació que es genera sola

<p><strong>Javadoc</strong> (<code>/** ... */</code>) es col·loca <strong>just abans</strong> d'una classe o mètode. La ferramenta <code>javadoc</code> (en el JDK) ho converteix en pàgines HTML com les oficials de Java.</p>

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">SobreMi.java</span>
      </div>
      <pre><code><span class="block-comment">/**
 * Classe que representa un alumne del curs.
 * @author Sergi Garcia
 * @version 1.0
 */</span>
<span class="keyword">public class</span> <span class="class-name">SobreMi</span> {
    <span class="block-comment">/**
     * Punt d'entrada del programa.
     * @param args arguments de la línia d'ordres
     */</span>
    <span class="keyword">public static void</span> main(<span class="type">String</span>[] args) {
        <span class="type">System</span>.out.println(<span class="string">"Em dic Sergi"</span>);
    }
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">@</div>
      <div class="step-content"><code>@param</code> — per a què serveix cada paràmetre d'entrada.</div>
    </div>
    <div class="step">
      <div class="step-number">@</div>
      <div class="step-content"><code>@return</code> — què torna o calcula el mètode (si no és <code>void</code>).</div>
    </div>
    <div class="step">
      <div class="step-number">@</div>
      <div class="step-content"><code>@author</code> / <code>@version</code> — qui i en quin estat.</div>
    </div>
    <div class="info">
      Els IDEs ligen estos comentaris: en passar el cursor sobre un mètode veus tota la documentació en temps real. Per a generar-la: <code>javadoc SobreMi.java</code>.
    </div>
  </div>
</div>

---
---

## Comprovació ràpida 📝

<div class="question-card">
  <span class="question-icon">?</span> Què imprimix este programa? — <code>// println("Uno");</code> · <code>println("Dos");</code> · <code>/* println("Tres"); */</code> · <code>println(/* "Cuatro" */ "Cinco");</code>
</div>

<div class="question-card">
  <span class="question-icon">?</span> És bon comentari <code>// x = 10</code>?
</div>

<div class="answer-card">
  <strong>1.</strong> Imprimix <strong>Dos</strong> i <strong>Cinco</strong>: les línies comentades s'ignoren i, en l'última, el comentari intern s'elimina però <code>"Cinco"</code> seguix sent l'argument. · <strong>2.</strong> No: el codi ja mostra que <code>x</code> val 10. Comenta el perquè, no el què.
</div>

<div class="info">
  💡 En la vida real, els Javadoc dels mètodes solen «caure» en les rúbriques. I els que documenten dormen millor.
</div>

---
---

## Arguments de línia d'ordres: la butxaca d'args

<p>Recorda la firma del <code>main</code>: <code>public static void main(String[] args)</code>. <strong><code>args</code></strong> és una llista amb cada paraula que escrius <strong>després</strong> del nom del programa en executar.</p>

<div class="terminal">
  <div><span class="prompt">&gt;</span> java UsoDeArgumentos Java mola mucho</div>
  <div class="output">Has escrito 3 palabras:</div>
  <div class="output">Palabra 1: Java</div>
  <div class="output">Palabra 2: mola</div>
  <div class="output">Palabra 3: mucho</div>
</div>

<div class="info">
  En l'IDE: <em>Run → Edit Configurations → Program arguments</em>. En la terminal: simplement teclegeu-les després del nom de la classe.
</div>

---
---

## Com s'indexen les paraules?

| Índex | Valor |
| ----- | ----- |
| `args[0]` | "Java" |
| `args[1]` | "mola" |
| `args[2]` | "mucho" |
| `args.length` | 3 — quants n'hi ha en total |

<div class="warning">
  Compte amb l'error de l'aprenent: <code>args[0]</code> és el <strong>primer</strong> argument. Els índexs comencen en <strong>0</strong>, com les plantes d'un edifici: la baixa és la 0.
</div>

<div class="info">
  Sense arguments, <code>args.length</code> val <strong>0</strong> i l'array està buit. I si demanes un índex que no existix (p. ex. <code>args[5]</code> amb 3 arguments): <code>ArrayIndexOutOfBoundsException</code>.
</div>

---
---

## Per a què serveix passar arguments?

<div class="features-grid">
  <div class="feature-item">
    <span class="feature-icon">📥</span>
    <p><strong>Dades d'entrada</strong>: <code>java Calculadora 5 3</code> — rep 5 i 3 sense tocar el codi.</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">🎛️</span>
    <p><strong>Modes d'execució</strong>: <code>java App --verbose</code> o <code>--silencioso</code>.</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">📄</span>
    <p><strong>Arxius</strong>: <code>java Convertidor entrada.txt salida.txt</code>.</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">🖥️</span>
    <p><strong>Programes reals</strong>: <code>git status</code> o <code>ls -la</code> són exactament açò.</p>
  </div>
</div>

<div class="info">
  Els <code>args</code> són la via d'entrada <strong>abans</strong> d'executar-se. Més endavant, el <code>Scanner</code> demanarà dades <strong>durant</strong> l'execució.
</div>

---
---

## Exemple guiat: el programa que et saluda

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">SaludoPersonal.java</span>
      </div>
      <pre><code><span class="keyword">public class</span> <span class="class-name">SaludoPersonal</span> {
  <span class="keyword">public static void</span> main(<span class="type">String</span>[] args) {
    <span class="keyword">if</span> (args.length &gt; 0) {
      <span class="type">System</span>.out.println(
        <span class="string">"Hola, "</span> + args[0] + <span class="string">". ¡Benvingut!"</span>);
    } <span class="keyword">else</span> {
      <span class="type">System</span>.out.println(
        <span class="string">"Hola, desconegut. Has oblidat el nom?"</span>);
    }
  }
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="terminal">
      <div><span class="prompt">&gt;</span> java SaludoPersonal Sergi</div>
      <div class="output">Hola, Sergi. ¡Benvingut!</div>
      <div><span class="prompt">&gt;</span> java SaludoPersonal</div>
      <div class="output">Hola, desconegut. Has oblidat el nom?</div>
    </div>
    <div class="info">
      El <code>if</code> ací és un aperitiu de les estructures de control que veurem en futures unitats.
    </div>
  </div>
</div>

---
---

## Comprovació ràpida 🎒

<div class="question-card">
  <span class="question-icon">?</span> Amb <code>java MiPrograma uno dos tres</code>: quant val <code>args.length</code> i què conté <code>args[2]</code>?
</div>

<div class="question-card">
  <span class="question-icon">?</span> Com saludes a la primera paraula que reba el teu programa?
</div>

<div class="answer-card">
  <strong>1.</strong> <code>args.length</code> val <strong>3</strong> i <code>args[2]</code> conté <strong>"tres"</strong> (els índexs comencen en 0). · <strong>2.</strong> Amb <code>args[0]</code>: <code>System.out.println("Hola, " + args[0]);</code>
</div>

---
---

## Compilar ≠ executar

<p>El compilador no t'odia: és un professor de llengua puntillós que marca cada «coma mal ficada». Aprendre a llegir els seus missatges és aprendre a programar.</p>

<div class="two-cols">
  <div class="left">
    <h3>Compilar · <code>javac</code></h3>
    <div class="info">
      Tradueix el codi a bytecode. Si hi ha errors de <strong>sintaxi</strong>, es queixa ací i no genera el <code>.class</code>.
    </div>
    <p><strong>Error de lògica:</strong> tot «funciona», però el resultat és incorrecte. El més perillós: ni el compilador ni el runtime t'avisen → depurador.</p>
  </div>
  <div class="right">
    <h3>Executar · <code>java</code></h3>
    <div class="info">
      La JVM executa el bytecode. Ací poden aparéixer errors de <strong>runtime</strong> (p. ex. <code>ArrayIndexOutOfBoundsException</code>).
    </div>
    <p><strong>Errors de compilació:</strong> et diu la <strong>línia exacta</strong> i el motiu — aprén a llegir-los en lloc de temer-los.</p>
  </div>
</div>

---
---

## L'error de l'aprenent: 4 errors en un programa

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Calculadora.java</span>
        <span class="code-card-badge">4 errors</span>
      </div>
      <pre><code><span class="error-inline">Public</span> <span class="keyword">class</span> <span class="class-name">Calculadora</span> <span class="error-inline">␣</span>
    <span class="keyword">public static void</span> main(<span class="error-inline">string</span>[] args) {
        <span class="type">System</span>.out.println(<span class="string">"Suma: "</span> + 5 + 3)<span class="error-inline">␣</span>
        <span class="type">System</span>.out.println(<span class="string">"Resta: "</span> + (5 - 3));
    }
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><code>Public</code> → <code>public</code>: Java és sensible a majúscules.</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">Falta <code>{</code> després de <code>Calculadora</code>.</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><code>string</code> → <code>String</code> (és una classe: S majúscula).</div>
    </div>
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content">Falta el <code>;</code> final en el primer <code>println</code>.</div>
    </div>
  </div>
</div>

---
---

## Com llegir un error de javac

<div class="terminal">
  <div><span class="prompt">&gt;</span> javac Calculadora.java</div>
  <div class="error">Calculadora.java:3: error: ';' expected</div>
  <div class="output">  System.out.println("Suma: " + 5 + 3)</div>
  <div class="output">                                      ^</div>
  <div class="output">1 error</div>
</div>

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><strong>Arxiu i línia</strong>: <code>Calculadora.java:3</code> — mira la <code>^</code>.</div>
</div>

<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><strong>El què</strong>: <code>error: ';' expected</code> — esperava un punt i coma.</div>
</div>

<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><strong>El punt exacte</strong>: la fletxeta <code>^</code> assenyala el lloc.</div>
</div>

<div class="info">
  💡 L'error sol estar en la línia marcada, però de vegades és l'<strong>anterior</strong>: si falta un <code>{</code> o un <code>;</code>, javac de vegades se n'adona una línia més tard. Comença en la del <code>^</code> i, si no, puja una.
</div>

---
class: compact-slide
---

## Errors típics de l'aprenent (i remei)

| Error | Missatge típic | Remei |
| ----- | ----- | ----- |
| **Public** en lloc de public | class, interface, or enum expected | Paraules clau exactes: `public`, `String`, `System` |
| Falta **;** | ';' expected | Tota instrucció acaba en ; |
| Falta **{ o }** | reached end of file while parsing | Cada { ha de tindre el seu } |
| **string** en lloc de String | cannot find symbol | String és una classe: S majúscula |
| Classe ≠ nom de l'arxiu | should be declared in a file named X.java | La classe public es diu igual que l'arxiu .java |
| **system** en lloc de System | cannot find symbol: variable system | System amb S; out i println en minúscula |

<div class="success">
  🧠 Els noms de <strong>classes</strong> (String, System, Scanner…) comencen en majúscula; els de <strong>variables i mètodes</strong> (out, println, main), en minúscula.
</div>

---
---

## El lío: el codi remenat 🧩

<div class="two-cols">
  <div class="left">
    <p>El cap ha deixat este codi fet un desastre. Ordena les línies perquè siga un programa vàlid que imprimisca <strong>«La suma es: 8»</strong>.</p>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">CalculoLioso.java (desordre)</span>
      </div>
      <pre><code>    System.out.println(<span class="string">"La suma es: "</span> + (a + b));
    <span class="type">int</span> a = 5;
    <span class="keyword">public class</span> <span class="class-name">CalculoLioso</span> {
    <span class="type">System</span>.out.println(<span class="string">"Calculando..."</span>);
    <span class="keyword">public static void</span> main(<span class="type">String</span>[] args) {
    <span class="type">int</span> b = 3;</code></pre>
    </div>
    <p><em>Pista: busca primer on comença la classe i el mètode main.</em></p>
  </div>
  <div class="right">
    <div class="answer-card">
      <p><strong>Solució:</strong> la classe és el contenidor, el main la porta d'entrada i les instruccions van dins del main, en orde.</p>
    </div>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">CalculoLioso.java (solució)</span>
      </div>
      <pre><code><span class="keyword">public class</span> <span class="class-name">CalculoLioso</span> {
    <span class="keyword">public static void</span> main(<span class="type">String</span>[] args) {
        <span class="type">int</span> a = 5;
        <span class="type">int</span> b = 3;
        <span class="type">System</span>.out.println(<span class="string">"Calculando..."</span>);
        <span class="type">System</span>.out.println(<span class="string">"La suma es: "</span> + (a + b));
    }
}</code></pre>
    </div>
  </div>
</div>

---
---

## Comprovació ràpida 😤

<div class="question-card">
  <span class="question-icon">?</span> Què significa <code>Calculadora.java:3: error: ';' expected</code>?
</div>

<div class="question-card">
  <span class="question-icon">?</span> Per què <code>Public</code> (amb P majúscula) dona error?
</div>

<div class="question-card">
  <span class="question-icon">?</span> Diferència entre error de compilació i error de lògica?
</div>

<div class="answer-card">
  <strong>1.</strong> En la línia 3 de Calculadora.java, javac esperava un ; i no el va trobar (mira la ^). · <strong>2.</strong> Java és sensible a les majúscules: la paraula reservada és <code>public</code>, en minúscula exacta. · <strong>3.</strong> El de compilació impedeix generar el .class; el de lògica compila i executa, però el resultat és incorrecte i només el troba el depurador (o el sentit comú).
</div>

---
---

## Un projecte Java: src i bin

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">estructura del projecte</span>
      </div>
      <pre><code>    saludo_daw/
    ├── src/   ← EL TEU codi (.java) viu ací
    │   └── App.java
    └── bin/   ← bytecode (.class) compilat
        └── App.class</code></pre>
    </div>
    <div class="warning">
      No edites mai els <code>.class</code> de <code>bin</code>: es regeneren en compilar. <code>src</code> és l'única font de veritat (i l'única cosa que puges a Git).
    </div>
  </div>
  <div class="right">
    <h3>Manual, des de la terminal</h3>
    <div class="terminal">
      <div><span class="prompt">&gt;</span> javac -d bin src/App.java</div>
      <div class="output"># -d bin: guarda el .class en bin</div>
      <div><span class="prompt">&gt;</span> java -cp bin App</div>
      <div class="output"># -cp bin: la JVM busca ací les classes</div>
    </div>
    <div class="info">
      Amb VS Code l'eina compila <strong>en segon pla</strong> en guardar: ni t'enteres. Però és bo saber què passa per davall.
    </div>
  </div>
</div>

---
---

## El cicle de treball (el teu nou bucle de vida)

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><strong>Editar</strong>: escrius o canvies codi en <code>src</code>.</div>
</div>

<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><strong>Compilar</strong>: VS Code ho fa automàticament en guardar (<code>Ctrl + S</code>) — ací es marquen els errors de sintaxi en roig.</div>
</div>

<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><strong>Executar</strong>: <code>Ctrl + F5</code> o botó ▶ — ací apareixen els errors de runtime.</div>
</div>

<div class="step">
  <div class="step-number">4</div>
  <div class="step-content"><strong>Depurar</strong>: si la lògica falla, <code>F5</code> i a treballar com detectius.</div>
</div>

<div class="warning">
  Executar sense depurar (<code>Ctrl + F5</code>) i mode depuració (<code>F5</code>) <strong>NO són el mateix</strong>: Run ignora els breakpoints; Debug els respecta. Si poses un punt roig i executes sense depurar, el programa no es detindrà.
</div>

---
---

## El cicle, dibuixat

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud02-prg-cicle-desenvolupament.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<div class="success">
  Aquest bucle és el 90% del teu temps com a desenvolupador: domina'l i la resta ve sol.
</div>

---
class: compact-slide
---

## Dreceres de VS Code que et faran paréixer un pro

| Drecera | Acció |
| ----- | ----- |
| `main` + Tab (o psvm) | Escriu l'esquelet `public static void main(String[] args) {}` |
| `sysout` + Tab (o sout) | Escriu `System.out.println()` |
| Ctrl + F5 / F5 | Executar / executar en mode depuració |
| F10 / F11 | Step Over / Step Into (depurador) |
| Ctrl + / | Comentar o descomentar la línia seleccionada |
| Shift + Alt + ↓ | Duplicar la línia cap avall |
| F12 / F2 | Anar a la definició / renomenar un símbol en tot el projecte |

<div class="info">
  🧠 <code>main</code> i <code>sysout</code> són els dos snippets que més escriuràs: teclegeu-los i premeu Tab.
</div>

---
---

## Autocompletat (IntelliSense): el teu company silenciós

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">Escrius <code>Syste</code> i VS Code t'ofereix <code>System</code> (amb la S majúscula que tant costa al principi).</div>
</div>

<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">La bombeta 💡 (o <code>Ctrl + .</code>) arregla problemes amb un clic: imports, correccions ràpides…</div>
</div>

<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><code>F2</code> sobre una variable: la renomena en tot el projecte — açò és refactoritzar.</div>
</div>

<div class="success">
  <strong>L'autocompletat no és trampa</strong>: és la raó per la qual la gent usa un IDE en lloc d'un bloc de notes. El teu codi ix amb menys errors tontos perquè l'editor et corregeix mentre penses.
</div>

---
---

## De zero a executar en 60 segons

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><code>Ctrl + Shift + P</code> → <em>Java: Create Java Project</em> → <em>No build tools</em>.</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">Clic dret en <code>src</code> → New File → <code>HolaMundo.java</code>.</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content">Escrius <code>main</code> + Tab, dins <code>sysout</code> + Tab…</div>
    </div>
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content"><code>Ctrl + F5</code> i a mirar la Terminal.</div>
    </div>
  </div>
  <div class="right">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">HolaMundo.java</span>
      </div>
      <pre><code><span class="keyword">public class</span> <span class="class-name">HolaMundo</span> {
    <span class="keyword">public static void</span> main(<span class="type">String</span>[] args) {
        <span class="type">System</span>.out.println(<span class="string">"¡Hola des de VS Code!"</span>);
    }
}</code></pre>
    </div>
    <div class="step">
      <div class="step-number">5</div>
      <div class="step-content">Breakpoint en el <code>println</code> + <code>F5</code>: observa el panell de variables.</div>
    </div>
  </div>
</div>

---
---

## Repàs: tracta de pensar com el codi (altra volta)

<div class="two-cols">
  <div class="left">
    <p>Què imprimix este programa? Tria sàviament:</p>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Misterio.java</span>
      </div>
      <pre><code>    <span class="type">System</span>.out.println(<span class="string">"Café "</span> + 1 + 2);
    <span class="type">System</span>.out.println(<span class="string">"Café "</span> + (1 + 2));</code></pre>
    </div>
    <p>a) Café 3 i Café 3<br>
    b) Café 12 i Café 3<br>
    c) Café 1 2 i Café 12</p>
  </div>
  <div class="right">
    <div class="answer-card">
      <p><strong>L'opció b.</strong> Amb text, el <code>+</code> <strong>concatena</strong> d'esquerra a dreta: «Café » + 1 → «Café 1» → + 2 → «Café 12». Els parèntesis forcen la suma: «Café 3».</p>
      <p>El clàssic que separa els qui han treballat dels qui han dormit. 😈</p>
    </div>
  </div>
</div>

---
---

## Repàs: qui soc? 🕵️

<p>Endevina quin concepte soc:</p>

<div class="question-card">
  <span class="question-icon">1</span> Traduïsc el teu <code>.java</code> a bytecode. Molt puntillós amb comes i claus.
</div>

<div class="question-card">
  <span class="question-icon">2</span> Execute el bytecode igual en qualsevol sistema operatiu.
</div>

<div class="question-card">
  <span class="question-icon">3</span> Sóc la porta d'entrada: si canvien el meu nom, tot queda a les fosques.
</div>

<div class="question-card">
  <span class="question-icon">4</span> Et deixe parar el programa i espiar les variables pas a pas.
</div>

<div class="answer-card">
  1. El compilador (<code>javac</code>) · 2. La JVM · 3. El <code>main</code> · 4. El depurador
</div>

---
---

## Repàs: CONRAD vs el món 💬

<p><strong>CONRAD</strong>, el compilador cascarràbies, opina sobre el clàssic dels principiants:</p>

<div class="warning">
  «Ve un alumne i em diu: <em>CONRAD, no compila</em>. I jo pregunte: <em>què diu el missatge d'error?</em> I respon: <em>ah, no ho sé, no me l'he llegit</em>. Et done la línia exacta, el motiu i la fletxeta ^, i no ho llegeixes?»
</div>

<div class="info">
  «I el clàssic <strong>Public</strong> amb majúscula. PER QUÈ? La paraula clau és <code>public</code>, en minúscula. Fa dècades que compile i encara veig <code>string</code> en lloc de <code>String</code>…»
</div>

<div class="success">
  💡 <strong>La lliçó:</strong> abans de plorar sobre el teclat, llig el missatge d'error: arxiu, línia i motiu. El 90% dels errors dels principiants s'arreglen sols. <strong>El compilador no t'odia: t'està passant les respostes de l'examen.</strong>
</div>

---
---

## Repàs: el laboratori de tortura 🧪

<div class="two-cols">
  <div class="left">
    <p>Copia este programa en <code>Tortura.java</code> i fes que funcione: <strong>3 errors de compilació</strong> i <strong>1 error de lògica</strong>.</p>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Tortura.java</span>
        <span class="code-card-badge">3 + 1 errors</span>
      </div>
      <pre><code><span class="keyword">public class</span> <span class="class-name">Tortura</span> <span class="comment">// ①</span>
    <span class="keyword">public static void</span> main(<span class="type">string</span>[] args) {
        <span class="type">int</span> a = 3;
        <span class="type">int</span> b = 4;
        <span class="type">System</span>.out.println(<span class="string">"La suma es: "</span> + a + b)<span class="comment">// ②</span>
        <span class="type">System</span>.out.println(<span class="string">"El producto es: "</span> + (a * b));
    }
}</code></pre>
    </div>
    <p><em>① falta { · ② falta ; … i queda el <code>string</code> i la suma sense parèntesis (ix «34»).</em></p>
  </div>
  <div class="right">
    <div class="answer-card">
      <p><strong>Solució:</strong> clau <code>{</code>, <code>String</code> amb S, <code>;</code> final i parèntesis per a sumar.</p>
    </div>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Tortura.java (solució)</span>
      </div>
      <pre><code><span class="keyword">public class</span> <span class="class-name">Tortura</span> {
    <span class="keyword">public static void</span> main(<span class="type">String</span>[] args) {
        <span class="type">int</span> a = 3;
        <span class="type">int</span> b = 4;
        <span class="type">System</span>.out.println(<span class="string">"La suma es: "</span> + (a + b));
        <span class="type">System</span>.out.println(<span class="string">"El producto es: "</span> + (a * b));
    }
}</code></pre>
    </div>
    <p>Eixida: <code>La suma es: 7</code> · <code>El producto es: 12</code></p>
  </div>
</div>

---
---

## Repàs: preguntes d'entrevista de treball 💼

<div class="question-card">
  <span class="question-icon">1</span> Explica'm, com si jo fora la teua iaia, la diferència entre <strong>JDK, JRE i JVM</strong>.
</div>

<div class="question-card">
  <span class="question-icon">2</span> Què és el mètode <strong>main</strong> i per què té eixa firma exacta?
</div>

<div class="question-card">
  <span class="question-icon">3</span> Un programa compila, però fa el que no ha de fer. <strong>Quin és el teu procés</strong> per a arreglar-lo?
</div>

<div class="question-card">
  <span class="question-icon">4</span> Com li passes <strong>dades a un programa</strong> Java sense que te les demane per teclat?
</div>

<div class="info">
  Preguntes reals per a un programador Java júnior. Si saps respondre les quatre, la unitat està apresa.
</div>

---
---

## No hi ha preguntes tontes 🤷

<div class="two-cols">
  <div class="left">
    <div class="question-card">
      <p><strong>¿Java i JavaScript són el mateix?</strong></p>
      <p>Ni tan sols són del mateix planeta: Java és a JavaScript el que un gos és a un gosset calent (hot dog). Van compartir nom per pur <strong>màrqueting</strong> (Netscape, 1995).</p>
    </div>
    <div class="question-card">
      <p><strong>¿Puc escriure Java en un bloc de notes?</strong></p>
      <p>Pots — i és bon exercici d'humilitat —, però projectes grans amb bloc de notes és com tallar la gespa amb tisores de cuina.</p>
    </div>
  </div>
  <div class="right">
    <div class="question-card">
      <p><strong>¿Què és una versió LTS?</strong></p>
      <p><em>Long-Term Support</em>: les normals reben parches 6 mesos; les LTS (8, 11, 17, 21) anys. Per això empreses i cursos trien LTS.</p>
    </div>
    <div class="question-card">
      <p><strong>¿He esborrat bin/! He perdut el treball?</strong></p>
      <p>No: <code>bin</code> només té bytecode regenerable. El teu treball viu en <code>src</code> — l'única font de veritat.</p>
    </div>
  </div>
</div>

---
---

## Resum del bloc 2 en 5 frases

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">Els comentaris són per a humans: <code>//</code>, <code>/* */</code> i <code>/** */</code> segons el que necessites.</div>
</div>

<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">Comenta el <strong>per què</strong>, no el què — i <strong>Javadoc</strong> genera la documentació automàtica.</div>
</div>

<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><code>args</code> guarda les paraules rebudes en executar: índexs des de <strong>0</strong>, mida amb <code>args.length</code>.</div>
</div>

<div class="step">
  <div class="step-number">4</div>
  <div class="step-content">Compilar i executar són moments distints amb errors distints: llig <strong>arxiu, línia i motiu</strong>.</div>
</div>

<div class="step">
  <div class="step-number">5</div>
  <div class="step-content">El teu bucle diari: editar → compilar (auto) → executar → depurar, amb <code>src</code> com a única font de veritat.</div>
</div>

---
layout: closing
---

---
layout: cover
---

# Unitat 02 — Introducció a Java<br>Bloc 1

## 1r CFGS DAW · Programació

---
---

## En aquesta sessió

### Del zero a "Hola, món!" passant per la màquina de café

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">Què és Java i per què funciona igual a tot arreu (JVM, bytecode).</div>
</div>

<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">La trilogia del café: <strong>JVM, JRE i JDK</strong> — qui és qui.</div>
</div>

<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">Instal·lació del <strong>OpenJDK</strong> i verificació amb <code>java -version</code>.</div>
</div>

<div class="step">
  <div class="step-number">4</div>
  <div class="step-content">El teu primer programa: <code>HolaMundo</code> disseccionat línia a línia.</div>
</div>

<div class="step">
  <div class="step-number">5</div>
  <div class="step-content">El <strong>depurador</strong>: visió de raigs X per al teu codi.</div>
</div>

<div class="info">
  Cap experiència prèvia necessària: només un editor de text i curiositat.
</div>

---
layout: center
class: sparse-slide
---

## L'ordinador és molt llest, però té zero iniciatives

<p>No fa <strong>res</strong> fins que no li dones ordres precises, en orde i sense ometre cap detall. Programar és precisament això: donar-li eixes ordres en un idioma que entenga.</p>

<p>Per a això necessitem tres coses: un <strong>entorn de desenrotllament</strong>, un <strong>llenguatge</strong> i moltes ganes de compilar.</p>

<div class="info">
  Aquesta unitat et deixa a la porta del castell: JDK instal·lat, primer programa escrit i depurador a punt.
</div>

---
---

## Què és Java?

<div class="two-cols">
  <div class="left">
    <div class="info">
      Java és un llenguatge que s'executa dins d'una <strong>màquina virtual (JVM)</strong>: corre igual en Windows, Linux o macOS.
    </div>
    <p>Escrius una vegada i el mateix programa funciona en qualsevol lloc.</p>
    <p>La JVM és l'intèrpret que tradueix les teues ordres a l'idioma concret de cada màquina.</p>
  </div>
  <div class="right">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Write once, run anywhere</span>
      </div>
      <pre><code><span class="keyword">public class</span> <span class="class-name">Missatge</span> {
    <span class="keyword">public static void</span> main(<span class="type">String</span>[] args) {
        <span class="type">System</span>.out.println(<span class="string">"☕ Escriu-ho una vegada, corre en qualsevol lloc"</span>);
    }
}</code></pre>
    </div>
  </div>
</div>

---
---

## D'on ix Java?

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><strong>1995</strong>: naix en <strong>Sun Microsystems</strong>, inspirat en la màquina de café de l'oficina (d'ací el logo i el nom).</div>
</div>

<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">La idea: un llenguatge que funcione en <strong>qualsevol dispositiu</strong>, sense importar el sistema operatiu ni el maquinari.</div>
</div>

<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">La solució: no programar per a l'ordinador, sinó per a una <strong>màquina virtual</strong> que l'ordinador simula.</div>
</div>

<div class="info">
  💡 <strong>Dada freak:</strong> el llenguatge es deia primer <em>Oak</em> (roure), per un arbre que es veia des de l'oficina. Van canviar-lo per motius de marca registrada.
</div>

---
---

## El viatge del teu codi: el bytecode

<p>Quan escrius Java no escrius instruccions per a la CPU: les escrius per a la <strong>JVM</strong>.</p>

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">Escrius codi font en un arxiu <code>.java</code>.</div>
</div>

<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">El compilador <strong>javac</strong> el tradueix a <strong>bytecode</strong>: un idioma intermedi que entén la JVM (<code>.class</code>).</div>
</div>

<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">La <strong>JVM</strong> llig el bytecode i l'executa en la teua màquina concreta.</div>
</div>

<div class="terminal">
  <span class="prompt">$</span> el teu codi (.java) <span class="highlight">--javac--&gt;</span> bytecode (.class) <span class="highlight">--JVM--&gt;</span> ¡s'executa!
</div>

<div class="info">
  El <code>.class</code> és el mateix per a totes les plataformes: només canvia la JVM, no el teu programa.
</div>

---
class: compact-slide
---

## Qui conté què: JDK ⊃ JRE ⊃ JVM

<div class="diagram-frame diagram-medium">
  <Excalidraw drawFilePath="/diagrams/ud02-prg-jdk-jre-jvm.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<div class="info">
  Un JDK conté tot: si instal·les <strong>OpenJDK</strong> ja tens <code>javac</code>, el llançador <code>java</code>, el depurador <code>jdb</code> i la JVM dins.
</div>

---
---

## ☕ La trilogia del Café: qui és qui

| Concepte | Definició | Analogia |
| ----- | ----- | ----- |
| **JVM** | La màquina que executa el *bytecode* | La màquina de café: funciona igual en qualsevol lloc |
| **JRE** | Tot el necessari per a *executar* Java | La cafeteria sencera: màquina, gots, sucre… |
| **JDK** | Tot el necessari per a *crear* programes | El kit per a muntar la teua cafeteria: grans, molinet i manual de barista |

<div class="warning">
  El <strong>JDK inclou el JRE</strong>: instal·lant el JDK tens les dues coses. Instal·lar només el JRE et permet executar programes, però no crear-los.
</div>

<div class="info">
  <strong>JDK = el ganivet del xef</strong> · <strong>JRE = el plat servit</strong>
</div>

---
---

## El ritu de cada programa Java

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Cafe.java</span>
        <span class="code-card-badge">JDK 21</span>
      </div>
      <pre><code><span class="comment">// Comentari: el codi s'explica sol</span>
<span class="keyword">public class</span> <span class="class-name">Cafe</span> {
  <span class="keyword">public static void</span> main(<span class="type">String</span>[] args) {
    <span class="type">System</span>.out.println(<span class="string">"☕ ¡Café preparat!"</span>);
  }
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">El <strong>JDK</strong> compila el codi a bytecode.</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">El <strong>JRE</strong> ho passa per la JVM.</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content">Tachán! Café (text) en la teua pantalla.</div>
    </div>
    <div class="info">
      Aquesta estructura (classe + <code>main</code>) és l'esquelet de <strong>tot</strong> programa Java del curs.
    </div>
  </div>
</div>

---
class: compact-slide
---

## El ritu, dibuixat

<div class="diagram-frame diagram-medium">
  <Excalidraw drawFilePath="/diagrams/ud02-prg-ritu-java.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<div class="success" style="margin-top: 0.4rem;">
  ✍️ <strong>javac</strong> (JDK) compila el codi font a <strong>bytecode</strong> · ⚙️ <strong>java</strong> (JVM) l'executa: ☕ text a la consola. Retén el tub: <code>editar → compilar → executar</code>.
</div>

---
---

## Per què Java segueix viu tants anys després?

<div class="features-grid">
  <div class="feature-item">
    <span class="feature-icon">🌍</span>
    <p><strong>Multiplataforma</strong>: mòbils, servidors, caixers… fins i tot la rentadora intel·ligent.</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">🏢</span>
    <p><strong>Món empresarial</strong>: banca, assegurances i logística fa dècades que l'usen.</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">🤖</span>
    <p><strong>Android</strong>: el llenguatge històric del sistema operatiu més estès del món.</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">👥</span>
    <p><strong>Comunitat enorme</strong>: el teu error probablement ja el va resoldre algú fa deu anys.</p>
  </div>
</div>

<div class="success">
  És exigent, i això et fa millor: t'obliga a ser ordenat i a escriure codi més net.
</div>

---
---

## Comprovació ràpida ☕

<div class="question-card">
  <span class="question-icon">?</span> Quina és la diferència entre JDK i JRE en una frase?
</div>

<div class="question-card">
  <span class="question-icon">?</span> Què fa el compilador <code>javac</code> amb el teu codi <code>.java</code>?
</div>

<div class="question-card">
  <span class="question-icon">?</span> Per què el logo de Java és una tassa fumejant?
</div>

<div class="answer-card">
  <strong>1.</strong> El JDK crea programes (inclou el compilador); el JRE només els executa — el JDK conté el JRE. · <strong>2.</strong> El tradueix a bytecode (un arxiu <code>.class</code>) que la JVM pot executar. · <strong>3.</strong> Per la màquina de café de l'oficina de Sun: «escriu una vegada, corre en qualsevol lloc».
</div>

---
---

## Quin JDK instal·le?

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><strong>OpenJDK</strong> — el projecte de referència, lliure i de codi obert. <strong>La nostra opció recomanada</strong> (més senzill en Linux).</div>
</div>

<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><strong>Eclipse Temurin</strong> — distribució excel·lent basada en OpenJDK, lliure i mantinguda per la fundació Eclipse.</div>
</div>

<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><strong>Oracle JDK</strong> — la versió comercial, vàlida en entorns empresarials (més senzill d'instal·lar en Windows).</div>
</div>

<div class="two-cols">
  <div class="left">
    <div class="info">
      <strong>La versió:</strong> tria l'última <strong>LTS</strong> (suport a llarg termini): 17, 21 o superior. Tot el curs funciona igual en totes elles.
    </div>
  </div>
  <div class="right">
    <div class="info">
      <strong>El criteri:</strong> lliure i de referència → <code>openjdk.org</code>. No t'obsessions amb el número exacte.
    </div>
  </div>
</div>

---
---

## Instal·la i verifica

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><strong>Instal·la</strong> OpenJDK amb els valors per defecte. En Windows, marca l'opció d'afegir el JDK al <strong>PATH</strong> si l'instal·lador t'ho ofereix.</div>
</div>

<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><strong>Verifica</strong> obrint una terminal i comprovant l'executor i el compilador:</div>
</div>

<div class="terminal">
  <div><span class="prompt">&gt;</span> java -version</div>
  <div class="output">openjdk version "21.0.2" 2024-01-16</div>
  <div class="output">OpenJDK Runtime Environment (build 21.0.2+13-LTS)</div>
  <div><span class="prompt">&gt;</span> javac -version</div>
  <div class="output">javac 21.0.2</div>
</div>

<div class="success">
  Si veus una eixida pareguda: enhorabona, tens poders de compilació actius.
</div>

---
---

## Què és el PATH?

<p>El <strong>PATH</strong> és la llista de carpetes on el sistema operatiu busca els comandaments que escrius en la terminal.</p>

<div class="two-cols">
  <div class="left">
    <div class="success">
      Amb <code>...\jdk-26\bin</code> dins del PATH: escrius <code>java</code> i el sistema el troba a la primera.
    </div>
    <div class="warning">
      Sense eixa configuració: <em>«java no es reconeix com un comandament intern o extern»</em> — el sistema no sap on està el teu JDK.
    </div>
  </div>
  <div class="right">
    <p><strong>Remei ràpid en Windows:</strong></p>
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">Busca «Editar les variables d'entorn del sistema».</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">Afig la carpeta <code>bin</code> del teu OpenJDK a la variable <code>Path</code>.</div>
    </div>
  </div>
</div>

---
---

## Dos comandaments, dos papers

<div class="two-cols">
  <div class="left">
    <h3>javac — el compilador</h3>
    <p>Converteix el teu codi font <code>.java</code> en bytecode <code>.class</code>.</p>
    <div class="terminal">
      <div><span class="prompt">&gt;</span> javac HolaMundo.java</div>
      <div class="output">(apareix HolaMundo.class)</div>
    </div>
  </div>
  <div class="right">
    <h3>java — l'executor</h3>
    <p>Arranca la <strong>JVM</strong> per a executar el bytecode que has compilat.</p>
    <div class="terminal">
      <div><span class="prompt">&gt;</span> java HolaMundo</div>
      <div class="output">¡Hola, Mundo!</div>
    </div>
  </div>
</div>

<div class="info">
  <strong>Es necessiten els dos</strong>: primer <code>javac</code> tradueix, després <code>java</code> posa en marxa. Els veuràs treballar junts tot el curs.
</div>

---
---

## L'IDE: la teua navalla suïssa

| IDE / Editor | Punts forts |
| ----- | ----- |
| **VS Code** | L'opció recomanada: lleuger, modern i amb l'extensió *Extension Pack for Java* és un entorn complet |
| **IntelliJ IDEA (Community)** | El favorit del sector professional; autocompletat bestial, però una mica més pesat |
| **NetBeans** | Simple i oficial d'Oracle, perfecte per a començar |
| **Eclipse** | Clàssic, molt usat en empreses, un pèl més dens |

<div class="info">
  Un IDE reuneix: <strong>editor</strong> amb autocompletat + <strong>compilador i executor</strong> amb un botó + <strong>depurador</strong> + <strong>gestió de projectes</strong>. Tots valen: l'IDE és una ferramenta, no l'objectiu.
</div>

---
---

## Exemple guiat: primer projecte en VS Code

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><code>Ctrl + Shift + P</code> → <em>Java: Create Java Project</em> → <em>No build tools</em> → tria carpeta i nom.</div>
</div>

<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">Dins de <code>src</code>, crea <code>HolaMundo.java</code> amb el codi del costat.</div>
</div>

<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">Polsa el botó <strong>Run ▶</strong> (damunt del <code>main</code>) o prem <code>F5</code>.</div>
</div>

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">HolaMundo.java</span>
      </div>
      <pre><code><span class="keyword">public class</span> <span class="class-name">HolaMundo</span> {
    <span class="keyword">public static void</span> main(<span class="type">String</span>[] args) {
        <span class="type">System</span>.out.println(
            <span class="string">"¡Hola, Mundo! Porte anys esperant a que em creares."</span>
        );
    }
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="terminal">
      <div><span class="prompt">&gt;</span> java HolaMundo</div>
      <div class="highlight">¡Hola, Mundo! Porte anys esperant a que em creares.</div>
    </div>
    <div class="warning">
      No confongues la <strong>consola de l'IDE</strong> amb la terminal del sistema: ací s'imprimeixen els <code>System.out.println</code> (pestanya Terminal / Eixida).
    </div>
  </div>
</div>

---
---

## Dissecció d'Hola Món 🐸

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><code>public class HolaMundo</code> — declares una classe. <code>public</code>: accessible des de fora; el nom ha de coincidir amb el de l'arxiu.</div>
</div>

<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><code>public static void main(String[] args)</code> — el <strong>botó d'inici</strong>: Java busca esta línia i diu «per ací es comença!».</div>
</div>

<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><code>System.out.println(...)</code> — <strong>la veu</strong> del programa: imprimeix el text en la consola.</div>
</div>

<div class="info">
  Cada instrucció acaba amb <strong>;</strong> — el punt final de cada frase. Els <strong>{ }</strong> delimiten els blocs: els de la classe contenen la classe, els del <code>main</code> contenen les ordres.
</div>

---
---

## La firma del main: paraula per paraula

| Paraula | Què significa |
| ----- | ----- |
| **public** | Java pot trobar-lo des de fora: el botó és visible |
| **static** | Pot cridar-se sense necessitat de crear un objecte |
| **void** | No torna cap valor: fa el seu treball i es calla |
| **main** | El nom exacte que Java busca en arrancar. No en val un altre |
| **String[] args** | Una butxaca per a arguments en executar (Bloc 2) |

<div class="warning">
  El <code>main</code> és <strong>obligatori</strong> i la seua firma exacta. Si el reanomenes <code>inici</code>, Java no troba la porta d'entrada i el programa no fa res.
</div>

---
---

## print vs println

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">SaltsDeLinia.java</span>
      </div>
      <pre><code>  <span class="type">System</span>.out.print(<span class="string">"Hola"</span>);
  <span class="type">System</span>.out.print(<span class="string">"Mundo"</span>);
  <span class="comment">// ← sense salt final</span>
  <span class="type">System</span>.out.println(<span class="string">"Hola"</span>);
  <span class="type">System</span>.out.println(<span class="string">"Mundo"</span>);</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="terminal">
      <div class="output">HolaMundo</div>
      <div class="output">Hola</div>
      <div class="output">Mundo</div>
    </div>
    <p><code>print</code> imprimeix <strong>sense</strong> saltar de línia; <code>println</code> imprimeix <strong>i salta</strong>.</p>
  </div>
</div>

<div class="info">
  Pensa com la JVM: executa <strong>línia a línia, en orde</strong>. Cada <code>;</code> tanca una frase; els <code>{ }</code>, un bloc.
</div>

---
---

## El mètode que no es crida (trampa d'examen!)

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Saludos.java</span>
      </div>
      <pre><code><span class="keyword">public class</span> <span class="class-name">Saludos</span> {
    <span class="keyword">public static void</span> main(<span class="type">String</span>[] args) {
        <span class="type">System</span>.out.println(<span class="string">"¡Hola des del main!"</span>);
    }
    <span class="keyword">public static void</span> saludo() {
        <span class="type">System</span>.out.println(<span class="string">"Açò mai s'executa..."</span>);
    }
}</code></pre>
    </div>
  </div>
  <div class="right">
    <p>Compila i s'executa bé… però <strong>només imprimeix la primera línia</strong>.</p>
    <div class="info">
      <code>saludo()</code> existix, però mai el crides des del <code>main</code>: es queda fent el vague. És un actor amb el guió aprés que mai ix a l'escenari.
    </div>
    <p>🧠 <strong>Truc:</strong> el <code>main</code> és la porta d'entrada de la casa. Pot haver-hi moltes habitacions, però ningú entra per la finestra.</p>
  </div>
</div>

---
---

## Tracta de pensar com el codi: tu ets la JVM

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">Computadora.java</span>
      </div>
      <pre><code><span class="keyword">public class</span> <span class="class-name">Computadora</span> {
    <span class="keyword">public static void</span> main(<span class="type">String</span>[] args) {
        <span class="type">int</span> x = 5;
        <span class="type">int</span> y = 10;
        <span class="type">int</span> z = x + y;
        <span class="type">System</span>.out.println(<span class="string">"El resultado es: "</span> + z);
    }
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">Trobe la classe i busque el <code>main</code>.</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">Cree <code>x</code> (5) i <code>y</code> (10).</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content">Cree <code>z</code>, sume i guarde 15.</div>
    </div>
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content">Cride: <strong>«El resultado es: 15»</strong>.</div>
    </div>
  </div>
</div>

---
---

## El depurador: visió de raigs X 🔍

<p>El teu programa fa coses rares? No pegues a l'ordinador: usa el <strong>depurador</strong> (debugger).</p>

<div class="features-grid">
  <div class="feature-item">
    <span class="feature-icon">🛑</span>
    <p><strong>Breakpoint</strong>: parar el programa en una línia concreta.</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">👣</span>
    <p><strong>Step</strong>: avançar instrucció a instrucció.</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">🔍</span>
    <p><strong>Variables</strong>: inspeccionar cada valor en cada moment.</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">✏️</span>
    <p><strong>Editar</strong>: canviar valors sobre la marxa.</p>
  </div>
</div>

<div class="info">
  És com vore una sèrie de crims en càmera lenta: pauses, observes qui fa què i analitzes cada detall. <strong>El secret dels experts no és endevinar: és veure.</strong>
</div>

---
---

## Les quatre ferramentes del detectiu (VS Code)

| Ferramenta | Drecera | Què fa |
| ----- | ----- | ----- |
| **Breakpoint** | Clic a l'esquerra del nº de línia | «Para ACÍ, vull vore què passa» |
| **Step Over** | F10 | Executa la línia sense entrar en els detalls interns |
| **Step Into** | F11 | Entra dins d'eixa crida: «vull espiar» |
| **Variables / Watch** | Panell lateral | «Ensenya'm el valor de la variable ARA MATEIX» |

<div class="warning">
  Si entres sense voler en un mètode alié amb Step Into: <strong>Step Out</strong> (<code>Shift + F11</code>) et trau d'ací i et torna al punt de la crida.
</div>

<div class="info">
  Recorda: els errors de <strong>compilació</strong> els atrapa <code>javac</code>; els de <strong>lògica</strong> compilen bé però fan el que no han de fer — per a eixos, el depurador és l'arma.
</div>

---
---

## El cas del sospitós 🕵️

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <span class="code-card-title">DetectivesDeCodigo.java</span>
      </div>
      <pre><code><span class="keyword">public class</span> <span class="class-name">DetectivesDeCodigo</span> {
    <span class="keyword">public static void</span> main(<span class="type">String</span>[] args) {
        <span class="type">int</span> sospechoso = 0;
        <span class="keyword">for</span> (<span class="type">int</span> i = 0; i &lt; 10; i++) {
            sospechoso += i; <span class="comment">// ← breakpoint ací</span>
        }
        <span class="type">System</span>.out.println(<span class="string">"El culpable es: "</span> + sospechoso);
    }
}</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">Breakpoint en <code>sospechoso += i</code> (clic a l'esquerra del número → punt roig).</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">Executa en mode depuració (<code>F5</code> / icona del bitxo).</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content">La línia s'il·lumina en groc: observa el panell <strong>Variables</strong>.</div>
    </div>
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content">F10 diverses vegades: veus canviar <code>sospechoso</code> i <code>i</code> en cada volta.</div>
    </div>
  </div>
</div>

---
---

## Què hauries de vore?

<p>Valors de <code>sospechoso</code> en cada parada del bucle:</p>

<div class="terminal">
  <div class="output">0, 1, 3, 6, 10, 15, 21, 28, 36, 45 — i en acabar: <span class="highlight">55</span></div>
  <div><span class="prompt">&gt;</span> El culpable es: 55</div>
</div>

<div class="success">
  <strong>La regla d'or:</strong> quan alguna cosa falla, no endevines: observa. Reprodueix la fallada → breakpoint abans de la zona sospitosa → avança amb F10 → on es torça el valor, ací està el bug.
</div>

<div class="info">
  Si el programa no es deté mai: el breakpoint està en una línia que <strong>no s'executa</strong> (mètode no cridat, condició que no es complix). Una altra pista de detectiu.
</div>

---
layout: closing
---

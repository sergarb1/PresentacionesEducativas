---
title: "UD01 - Pensament Computacional - Bloc 01"
author: Sergi García Barea
layout: cover
---

# Unitat 01 — Introducció al pensament computacional<br>Bloc 01

## 1r CFGS DAW · Programació

---
---

## L'ordinador és extraordinàriament ràpid
### ... però absolutament ximple

<div class="step">
  <div class="step-number">💡</div>
  <div class="step-content">
    Un processador modern fa <strong>mil milions d'operacions</strong> per segon... però <strong>no entén</strong> ni tan sols una paraula en valencià.
  </div>
</div>

- El maquinari només entén **binari**: 0 i 1
- Cada 0 i 1 és un **senyal elèctric**: apagat o encès
- El conjunt de 0s i 1s que la màquina entén és el **codi màquina**
- Ningú programa en binari — per això inventem **llenguatges**

<div style="margin-top: 1rem;">
  La diferència entre un processador ràpid i un de lent és la <strong>velocitat</strong>, no la <strong>intel·ligència</strong>. L'ordinador no "pensa": executa ordres.
</div>

---
---

## Què és un llenguatge de programació?

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">El teu cervell té una <strong>idea</strong> (resoldre un problema)</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">El llenguatge és el <strong>pont</strong> entre eixa idea i el processador</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">Escrius el codi en el llenguatge → un <strong>traductor</strong> ho converteix en codi màquina</div>
</div>

> El llenguatge de programació és simplement el **vocabulari**. El repte real és saber **què li has de dir** a la màquina.

---
---

## Llenguatges alts vs baixos
### Quina diferència hi ha?

| Característica | Llenguatge Alt | Llenguatge Baix |
| :--- | :--- | :--- |
| **Proximitat al humà** | <span style="color:#16A34A">✅ Proper (sembla anglès)</span> | <span style="color:#DC2626">❌ Llunyà (només 0s i 1s)</span> |
| **Velocitat d'execució** | <span style="color:#DC2626">❌ Més lent</span> | <span style="color:#16A34A">✅ Més ràpid</span> |
| **Facilitat d'ús** | <span style="color:#16A34A">✅ Fàcil d'aprendre</span> | <span style="color:#DC2626">❌ Molt difícil</span> |
| **Exemples** | Java, Python, C#, JavaScript | Assembler, C (part) |
| **Portable?** | <span style="color:#16A34A">✅ Sí (funciona en qualsevol SO)</span> | <span style="color:#DC2626">❌ No (depèn del processador)</span> |

<div style="margin-top: 0.8rem;">
  Nosaltres treballarem amb <strong>Java</strong>: un llenguatge alt, portàtil i amb una comunitat enorme.
</div>

---
---

## El Traductor: Compiladors
### Tradueixen tot el codi d'una vegada

<div style="display:flex;gap:16px;justify-content:center;align-items:center;margin: 0.4rem 0;">
  <div style="background:#EFF6FF;border:2px solid #3B82F6;border-radius:12px;padding:8px 14px;text-align:center;min-width:160px;">
    <div style="font-weight:700;color:#3B82F6;">📄 Codi Font</div>
    <div style="font-size:0.72rem;color:#666;">int main() { ... }</div>
  </div>
  <div style="font-size:1.6rem;color:#94A3B8;">→</div>
  <div style="background:#F5F3FF;border:2px solid #8B5CF6;border-radius:12px;padding:8px 14px;text-align:center;min-width:160px;">
    <div style="font-weight:700;color:#8B5CF6;">⚙️ Compilador</div>
    <div style="font-size:0.72rem;color:#666;">Tradueix tot</div>
  </div>
  <div style="font-size:1.6rem;color:#94A3B8;">→</div>
  <div style="background:#F0FDF4;border:2px solid #22C55E;border-radius:12px;padding:8px 14px;text-align:center;min-width:160px;">
    <div style="font-weight:700;color:#22C55E;">📦 Executable</div>
    <div style="font-size:0.72rem;color:#666;">program.exe</div>
  </div>
</div>

<p style="font-size:0.92rem;"><strong>C, C++, Go:</strong> compilen tot el codi → executable independent · <strong>Avantatge:</strong> execució ràpida · <strong>Inconvenient:</strong> cal recompilar per a cada plataforma</p>

<div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:10px 14px;margin-top:0.5rem;">
  <div style="font-weight:700;color:#3B82F6;margin-bottom:4px;font-size:0.9rem;">📝 Exemple real: C</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
    <pre style="margin:0;font-size:0.72rem;"><code class="language-c">/* hello.c */
#include &lt;stdio.h&gt;
int main() {
    printf("Hola món!");
    return 0;
}</code></pre>
    <pre style="margin:0;font-size:0.72rem;"><code>$ gcc hello.c -o hello
$ ./hello
Hola món!</code></pre>
  </div>
</div>

---
---

## El Traductor: Intérprets
### Tradueixen línia per línia

<div style="display:flex;gap:16px;justify-content:center;align-items:center;margin: 0.4rem 0;">
  <div style="background:#EFF6FF;border:2px solid #3B82F6;border-radius:12px;padding:8px 14px;text-align:center;min-width:160px;">
    <div style="font-weight:700;color:#3B82F6;">📄 Codi Font</div>
    <div style="font-size:0.72rem;color:#666;">print("Hola")</div>
  </div>
  <div style="font-size:1.6rem;color:#94A3B8;">→</div>
  <div style="background:#FEF3C7;border:2px solid #F59E0B;border-radius:12px;padding:8px 14px;text-align:center;min-width:160px;">
    <div style="font-weight:700;color:#F59E0B;">🔍 Intérpret</div>
    <div style="font-size:0.72rem;color:#666;">Línia per línia</div>
  </div>
  <div style="font-size:1.6rem;color:#94A3B8;">→</div>
  <div style="background:#F0FDF4;border:2px solid #22C55E;border-radius:12px;padding:8px 14px;text-align:center;min-width:160px;">
    <div style="font-weight:700;color:#22C55E;">▶️ Executa</div>
    <div style="font-size:0.72rem;color:#666;">"Hola" a pantalla</div>
  </div>
</div>

<p style="font-size:0.92rem;"><strong>Python, JavaScript, Ruby:</strong> l'intérpret executa directament el codi font · <strong>Avantatge:</strong> no cal compilar, provatura ràpida · <strong>Inconvenient:</strong> més lent (traduïx cada vegada)</p>

<div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:10px 14px;margin-top:0.5rem;">
  <div style="font-weight:700;color:#F59E0B;margin-bottom:4px;font-size:0.9rem;">📝 Exemple real: Python</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
    <pre style="margin:0;font-size:0.72rem;"><code class="language-python"># hello.py
print("Hola món!")
nom = input("Com et dius? ")
print("Hola, " + nom + "!")</code></pre>
    <pre style="margin:0;font-size:0.72rem;"><code>$ python hello.py
Hola món!
Com et dius? Maria
Hola, Maria!</code></pre>
  </div>
</div>

---
---

## Java: el millor dels dos mons
### El model híbrid

<div style="display:flex;gap:14px;justify-content:center;align-items:center;flex-wrap:wrap;margin: 0.8rem 0;">
  <div style="background:#EFF6FF;border:2px solid #3B82F6;border-radius:12px;padding:10px;text-align:center;min-width:140px;">
    <div style="font-weight:700;color:#3B82F6;">📄 Codi Font</div>
    <div style="font-size:0.75rem;">HolaMón.java</div>
  </div>
  <div style="font-size:1.5rem;color:#94A3B8;">→</div>
  <div style="background:#F5F3FF;border:2px solid #8B5CF6;border-radius:12px;padding:10px;text-align:center;min-width:140px;">
    <div style="font-weight:700;color:#8B5CF6;">⚙️ javac</div>
    <div style="font-size:0.75rem;">Compilador</div>
  </div>
  <div style="font-size:1.5rem;color:#94A3B8;">→</div>
  <div style="background:#FEF3C7;border:2px solid #F59E0B;border-radius:12px;padding:10px;text-align:center;min-width:140px;">
    <div style="font-weight:700;color:#F59E0B;">📦 Bytecode</div>
    <div style="font-size:0.75rem;">HolaMón.class</div>
  </div>
  <div style="font-size:1.5rem;color:#94A3B8;">→</div>
  <div style="background:#F0FDF4;border:2px solid #22C55E;border-radius:12px;padding:10px;text-align:center;min-width:140px;">
    <div style="font-weight:700;color:#22C55E;">🖥️ JVM</div>
    <div style="font-size:0.75rem;">Màquina Virtual Java</div>
  </div>
</div>

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><strong>Compiles</strong> el codi font → bytecode (format intermedi)</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><strong>L'JVM interpreta</strong> el bytecode i l'executa en qualsevol ordinador</div>
</div>

<div style="margin-top: 0.8rem;">
  <strong>"Write once, run anywhere"</strong> — Escrius una vegada, executes a qualsevol lloc. 🎯
</div>

---
---

## Conceptes Clau: Codi Font i Sintaxi

<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;">
  <div style="background:#EFF6FF;border:2px solid #3B82F6;border-radius:12px;padding:16px;">
    <div style="font-weight:700;color:#3B82F6;font-size:1.05rem;margin-bottom:10px;">📄 Codi Font</div>
    <p style="font-size:0.85rem;">El <strong>text</strong> que escrius en un editor de codi. És el teu "original".</p>
    <pre style="margin-top:8px;"><code class="language-java">public class HolaMón {
    public static void main(String[] args) {
        System.out.println("Hola!");
    }
}</code></pre>
  </div>
  <div style="background:#F5F3FF;border:2px solid #8B5CF6;border-radius:12px;padding:16px;">
    <div style="font-weight:700;color:#8B5CF6;font-size:1.05rem;margin-bottom:10px;">📝 Sintaxi</div>
    <p style="font-size:0.85rem;">Les <strong>regles</strong> del llenguatge. Si la sintaxi és incorrecta, el compilador dona error.</p>
    <ul style="font-size:0.82rem;">
      <li>Cada instrucció acaba amb <code>;</code></li>
      <li>Blocs entre <code>{ }</code></li>
      <li>Distingeix majúscules: <code>String</code> ≠ <code>string</code></li>
    </ul>
  </div>
</div>

---
---

## Conceptes Clau: IDE i Algorisme

<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;">
  <div style="background:#F0FDF4;border:2px solid #22C55E;border-radius:12px;padding:16px;">
    <div style="font-weight:700;color:#22C55E;font-size:1.05rem;margin-bottom:10px;">💻 IDE</div>
    <p style="font-size:0.85rem;"><strong>Integrated Development Environment</strong> — L'editor de codi on treballes.</p>
    <ul style="font-size:0.82rem;">
      <li>Escriure codi amb color</li>
      <li>Detectar errors abans de compilar</li>
      <li>Executar i depurar</li>
      <li><strong>Exemple:</strong> IntelliJ IDEA, VS Code</li>
    </ul>
  </div>
  <div style="background:#FFFBEB;border:2px solid #F59E0B;border-radius:12px;padding:16px;">
    <div style="font-weight:700;color:#F59E0B;font-size:1.05rem;margin-bottom:10px;">🧠 Algorisme</div>
    <p style="font-size:0.85rem;">Una <strong>seqüència finita de passos</strong> per resoldre un problema.</p>
    <ul style="font-size:0.82rem;">
      <li>Recepta de cuina = algorisme</li>
      <li>Instruccions de muntatge = algorisme</li>
      <li>El cor del programador</li>
      <li><strong>Important:</strong> Es pot escriure en qualsevol idioma</li>
    </ul>
  </div>
</div>

<div style="margin-top: 0.8rem;">
  <strong>Resum:</strong> Programar = escriure un <strong>algorisme</strong> en un <strong>llenguatge</strong> utilitzant un <strong>IDE</strong>, respectant la <strong>sintaxi</strong>.
</div>

---
---

## Programar NO és memoritzar codi

<div style="display:flex;gap:24px;justify-content:center;margin: 0.8rem 0;">
  <div style="background:#FEE2E2;border:2px solid #DC2626;border-radius:12px;padding:16px;flex:1;max-width:380px;">
    <div style="font-weight:700;color:#DC2626;font-size:1.05rem;margin-bottom:6px;">❌ MENTIDA</div>
    <p style="font-size:0.88rem;">"Programar és memoritzar comandaments i codi"</p>
  </div>
  <div style="background:#DCFCE7;border:2px solid #16A34A;border-radius:12px;padding:16px;flex:1;max-width:380px;">
    <div style="font-weight:700;color:#16A34A;font-size:1.05rem;margin-bottom:6px;">✅ VERITAT</div>
    <p style="font-size:0.88rem;">"Programar és <strong>entrenar la capacitat de resoldre problemes</strong>"</p>
  </div>
</div>

- Un bon programador **no té tot el codi memoritzat** — sap on buscar-lo
- El que importa és la **capacitat lògica**, no la memòria
- Google ens dóna respostes, però **no sap quin problema estàs resolent**

<div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:14px;margin-top:0.6rem;">
  <div style="font-weight:700;color:#3B82F6;margin-bottom:4px;">💡 Analogia: El metge</div>
  <p style="font-size:0.85rem;">Un metge <strong>no memoritza tots els llibres de medicina</strong>. Sap on buscar la informació, però el que realment importa és la seua <strong>capacitat de diagnosticar</strong> — connectar símptomes amb causes, pensar en el pacient concret, prendre decisions. Programar és igual: la lògica és la clau, no la memòria.</p>
</div>

---
class: compact-slide
---

## El Miratge de la Comprensió
### L'Il·lusió de la Competència

<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;">
  <div style="background:#EFF6FF;border:2px solid #3B82F6;border-radius:12px;padding:16px;">
    <div style="font-weight:700;color:#3B82F6;font-size:1.05rem;margin-bottom:6px;">🛋️ Mode Espectador</div>
    <p style="font-size:0.85rem;">Mires un vídeo o llegeixes un exemple resolt.</p>
    <p style="font-size:0.85rem;"><strong>"Això és fàcil, ho entenc!"</strong></p>
    <p style="font-size:0.78rem;color:#64748B;margin-top:6px;">El cervell està en <strong>mode reconeixement</strong>: passiu, còmode, sense esforç.</p>
  </div>
  <div style="background:#F0FDF4;border:2px solid #22C55E;border-radius:12px;padding:16px;">
    <div style="font-weight:700;color:#22C55E;font-size:1.05rem;margin-bottom:6px;">🏋️ Mode Generador</div>
    <p style="font-size:0.85rem;">T'asseus davant la pantalla buida i intentes fer-ho.</p>
    <p style="font-size:0.85rem;"><strong>"On comence?..."</strong></p>
    <p style="font-size:0.78rem;color:#64748B;margin-top:6px;">El cervell està en <strong>mode generació</strong>: actiu, difícil, però és on aprens de veritat.</p>
  </div>
</div>

<div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:12px;margin-top:0.6rem;">
  <div style="font-weight:700;color:#8B5CF6;margin-bottom:6px;">📝 Exemples quotidians</div>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
    <div style="background:#EFF6FF;border:1px solid #3B82F6;border-radius:8px;padding:10px;text-align:center;">
      <div style="font-weight:700;color:#3B82F6;font-size:0.8rem;">🎵 Música</div>
      <p style="font-size:0.72rem;">Mires un pianista → "És fàcil!"<br>T'asseus al piano → "Què és açò?"</p>
    </div>
    <div style="background:#FEF3C7;border:1px solid #F59E0B;border-radius:8px;padding:10px;text-align:center;">
      <div style="font-weight:700;color:#F59E0B;font-size:0.8rem;">🍳 Cuina</div>
      <p style="font-size:0.72rem;">Mires un xef → "Ho faig!"<br>Llances oli → "On era el foc?"</p>
    </div>
    <div style="background:#F0FDF4;border:1px solid #22C55E;border-radius:8px;padding:10px;text-align:center;">
      <div style="font-weight:700;color:#22C55E;font-size:0.8rem;">💻 Programació</div>
      <p style="font-size:0.72rem;">Mires un tutorial → "Ho entenc!"<br>Pantalla buida → "On comence?"</p>
    </div>
  </div>
</div>

<div style="margin-top: 0.6rem;">
  Entendre l'exemple d'un altre <strong>no és el mateix</strong> que poder fer-ho tu sol. Són dos circuits cerebrals completament diferents.
</div>

---
---

## L'Analogia del Pianista

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><strong>Mires un piano</strong> i penses: "Això no és tan complicat. Prem les tecles en l'ordre correcte."</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><strong>Et poses davant</strong> i intentes... però les mans no obeeixen. Prems les tecles equivocades.</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><strong>Tornes a mirar</strong> el vídeo del pianista. "Jo sí que sé quines tecles són!"</div>
</div>
<div class="step">
  <div class="step-number">4</div>
  <div class="step-content"><strong>La realitat:</strong> Saber què fer i saber-ho fer són habilitats completament diferents.</div>
</div>

<div class="info" style="margin-top: 1rem;">
  <strong>Consell:</strong> No mires més vídeos de com programar. <strong>Asseu-te i intenta fer-ho.</strong> És l'única manera d'aprendre de veritat.
</div>

---
---

## La pantalla buida és el teu hàbitat natural

<div class="step">
  <div class="step-number">😊</div>
  <div class="step-content">
    Quan et sents davant d'una pantalla buida i no saps com començar, <strong>no és un senyal d'error</strong>. És el moment normal de tot programador.
  </div>
</div>

- La **pantalla buida** = el punt de partida de tot projecte real
- Fins i tot els programadors professionals **no saben com començar** al principi
- La diferència: ells **proven i fallen** fins que troben el camí

<div style="margin: 0.6rem 0;">
  <strong>La sensació de no saber què fer és completament normal.</strong> Si sempre sabesses què fer, no estaries aprenent res de nou.
</div>

<div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:12px;">
  <div style="font-weight:700;color:#3B82F6;margin-bottom:6px;">💡 El procés real d'un programador</div>
  <div style="display:flex;gap:8px;align-items:center;justify-content:center;flex-wrap:wrap;">
    <div style="background:#EFF6FF;border:1px solid #3B82F6;border-radius:8px;padding:6px 12px;font-size:0.75rem;text-align:center;">
      <div>🤔</div><div>Pensar</div>
    </div>
    <div style="color:#94a3b8;">→</div>
    <div style="background:#FEF3C7;border:1px solid #F59E0B;border-radius:8px;padding:6px 12px;font-size:0.75rem;text-align:center;">
      <div>✍️</div><div>Provar</div>
    </div>
    <div style="color:#94a3b8;">→</div>
    <div style="background:#FEE2E2;border:1px solid #DC2626;border-radius:8px;padding:6px 12px;font-size:0.75rem;text-align:center;">
      <div>💥</div><div>Error</div>
    </div>
    <div style="color:#94a3b8;">→</div>
    <div style="background:#F5F3FF;border:1px solid #8B5CF6;border-radius:8px;padding:6px 12px;font-size:0.75rem;text-align:center;">
      <div>🔍</div><div>Depurar</div>
    </div>
    <div style="color:#94a3b8;">→</div>
    <div style="background:#DCFCE7;border:1px solid #16A34A;border-radius:8px;padding:6px 12px;font-size:0.75rem;text-align:center;">
      <div>✅</div><div>Funciona!</div>
    </div>
  </div>
</div>

---
---

## L'Infern del Tutorial
### Tutorial Hell

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><strong>Fases de l'infern:</strong> Mires un tutorial → Entens cada pas → Penses "jo puc fer-ho"</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><strong>El parany:</strong> Tanques el tutorial i intentes fer-ho tu... i <strong>no recordes res</strong></div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><strong>El cicle viciós:</strong> Tornes a obrir el tutorial, copies el codi, canvies unes paraules... <strong>progrés fals</strong></div>
</div>
<div class="step">
  <div class="step-number">4</div>
  <div class="step-content"><strong>La solució:</strong> No copies. <strong>Entén</strong> el concepte → Tanca'l → Intenta fer-ho sol → Si et bloques, busca <strong>una pista</strong>, no la resposta completa</div>
</div>

<div class="warning" style="margin-top: 1rem;">
  Copiar codi sense entendre'l és com <strong>copiar els deures d'un company</strong>: el professor veu que no ho has fet tu.
</div>

---
---

## Regla de la Pantalla Coberta

<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
  <div style="background:#FEE2E2;border:2px solid #DC2626;border-radius:12px;padding:18px;">
    <div style="font-weight:700;color:#DC2626;font-size:1.05rem;margin-bottom:8px;">❌ MÈTODE INCORRECTE</div>
    <ol style="font-size:0.85rem;">
      <li>Llegeixes l'exemple</li>
      <li>Mires el codi mentre tentes fer-ho</li>
      <li>Cada vegada que et bloques, mires</li>
      <li><strong>Resultat:</strong> No aprens res</li>
    </ol>
  </div>
  <div style="background:#DCFCE7;border:2px solid #16A34A;border-radius:12px;padding:18px;">
    <div style="font-weight:700;color:#16A34A;font-size:1.05rem;margin-bottom:8px;">✅ MÈTODE CORRECTE</div>
    <ol style="font-size:0.85rem;">
      <li>Llegeixes l'exemple fins que l'entens</li>
      <li><strong>Cobreixes la pantalla</strong> (literalment)</li>
      <li>Intentes reescriure-ho de memòria</li>
      <li><strong>Resultat:</strong> realment aprens</li>
    </ol>
  </div>
</div>

<div class="success" style="margin-top: 1rem;">
  <strong>Prova-ho ara mateix:</strong> Llegeix 5 línies de codi → Cobreix la pantalla → Intenta reescriure-les. Funciona sempre.
</div>

---
class: compact-slide
---

## El Miratge de la Literalitat
### L'ordinador no entén matisos

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">Si li dius <strong>"posa la sal"</strong>, l'ordinador no sap <strong>quanta sal</strong> ni <strong>a on</strong> posar-la</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">Si li dius <strong>"prepara una truita"</strong>, no sap si vols de patata, de confitura, o si has de comprar els ingredients</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">L'ordinador fa <strong>EXACTAMENT</strong> el que li dius, ni més ni menys</div>
</div>

<div style="margin: 0.6rem 0;">
  Els programadors novells donen per <strong>enteses</strong> molts passos que l'ordinador <strong>no pot endevinar</strong>. Cal ser <strong>explícit</strong> fins a l'extrem.
</div>

<div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:12px;">
  <div style="font-weight:700;color:#8B5CF6;margin-bottom:6px;">📝 Exemples de literalitat</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
    <div>
      <div style="font-size:0.75rem;color:#DC2626;margin-bottom:2px;">❌ El que dius (humà):</div>
      <ul style="font-size:0.75rem;">
        <li>"Posa-ho en un lloc adequat"</li>
        <li>"Fes-me un café"</li>
        <li>"Neteja l'habitació"</li>
      </ul>
    </div>
    <div>
      <div style="font-size:0.75rem;color:#16A34A;margin-bottom:2px;">✅ El que l'ordinador necessita:</div>
      <ul style="font-size:0.75rem;">
        <li>"Posa el llibre a l'estanteria A, prestatge 3"</li>
        <li>"Prem el botó de café, espera 10s, agafa la tassa"</li>
        <li>"Agafa les peces de roba del terra, posa-les en la cistella"</li>
      </ul>
    </div>
  </div>
</div>

---
---

## El Camí Sagrat del Programador
### 4 passos abans de tocar el teclat

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><strong>Entén el problema</strong> — Explica'l amb les teues paraules. Si no el pots explicar, no l'entens.</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><strong>Pensa els passos</strong> — Què ha de fer l'ordinador, pas a pas, en llenguatge humà (= Algorisme)</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><strong>Escriu en paper</strong> — Resol el problema en el teu llenguatge, sense cap sintaxi de programació</div>
</div>
<div class="step">
  <div class="step-number">4</div>
  <div class="step-content"><strong>Tradueix a Java</strong> — Només ara, preocupa't per la sintaxi. El difícil ja està fet!</div>
</div>

<div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:10px;margin-top:0.5rem;">
  <div style="font-weight:700;color:#8B5CF6;margin-bottom:4px;">💡 Per què funciona aquest mètode?</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
    <div>
      <div style="font-size:0.72rem;color:#DC2626;margin-bottom:2px;">❌ Sense el Camí Sagrat:</div>
      <ul style="font-size:0.72rem;">
        <li>Barreges lògica i sintaxi alhora</li>
        <li>Trobes 3 errors alhora</li>
        <li>No saps quin és de lògica i quin de sintaxi</li>
      </ul>
    </div>
    <div>
      <div style="font-size:0.72rem;color:#16A34A;margin-bottom:2px;">✅ Amb el Camí Sagrat:</div>
      <ul style="font-size:0.72rem;">
        <li>Lògica primer, sintaxi després</li>
        <li>Quan programes, ja saps QUÈ fer</li>
        <li>El 80% del problema ja està resolt en paper</li>
      </ul>
    </div>
  </div>
</div>

---
---

## Exemple: El Camí Sagrat
### Problema: Sumar dos números

<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:0.6rem;">
  <div style="background:#EFF6FF;border:2px solid #3B82F6;border-radius:12px;padding:12px;">
    <div style="font-weight:700;color:#3B82F6;margin-bottom:4px;">1️⃣ Entén</div>
    <p style="font-size:0.78rem;">"El programa demana dos nombres a l'usuari i mostra la seua suma"</p>
  </div>
  <div style="background:#F5F3FF;border:2px solid #8B5CF6;border-radius:12px;padding:12px;">
    <div style="font-weight:700;color:#8B5CF6;margin-bottom:4px;">2️⃣ Pensa</div>
    <p style="font-size:0.78rem;">Demana A → Demana B → Calcula A+B → Mostra resultat</p>
  </div>
  <div style="background:#F0FDF4;border:2px solid #22C55E;border-radius:12px;padding:12px;">
    <div style="font-weight:700;color:#22C55E;margin-bottom:4px;">3️⃣ Paper</div>
    <pre style="font-size:0.68rem;margin:0;"><code>Demana número A
Demana número B
Suma = A + B
Mostra "La suma és: " + Suma</code></pre>
  </div>
</div>

<div style="background:#FEF3C7;border:2px solid #F59E0B;border-radius:12px;padding:12px;">
  <div style="font-weight:700;color:#F59E0B;margin-bottom:4px;">4️⃣ Tradueix a Java</div>
  <pre style="font-size:0.72rem;margin:0;"><code class="language-java">Scanner teclat = new Scanner(System.in);
System.out.print("Introdueix un número: ");
int A = teclat.nextInt();
System.out.print("Introdueix un altre: ");
int B = teclat.nextInt();
int suma = A + B;
System.out.println("La suma és: " + suma);</code></pre>
</div>

---
---

## Exercici: El Robot Literal — Fer café

<div class="question-card">
  <span class="question-icon">🤖</span>
  Dona les instruccions a un robot que <strong>NO entén conceptes abstractes</strong>. Només entén accions físiques concretes.
</div>

<div style="margin-top: 0.8rem;">
  <strong>Intent humà (incorrecte):</strong> "Fes-me un café."
  <div style="margin-top: 0.5rem;">
    <strong>Intent robot (correcte):</strong>
    <pre style="margin: 0.4rem 0;"><code>1. Agafa la tassa de l'armari
2. Posa-la sota l'obrador de café
3. Prem el botó "café sol"
4. Espera 10 segons
5. Agafa la tassa
6. Porta-la a la taula</code></pre>
  </div>
</div>

---
---

## Exercici: El Robot Literal — Motxilla

<div class="question-card">
  <span class="question-icon">🎒</span>
  Instruccions perquè el robot prepare la motxilla de classe. Que no es quede res!
</div>

<div style="margin-top: 0.8rem;">
  <strong>Intent humà:</strong> "Prepara la motxilla."
  <div style="margin-top: 0.5rem;">
    <strong>Intent robot (exemple):</strong>
    <pre style="margin: 0.4rem 0;"><code>1. Obri l'armari
2. Agafa el llibre de Matemàtiques
3. Posa'l dins la motxilla
4. Agafa el llibre de Programació
5. Posa'l dins la motxilla
6. Agafa el llapis i el bolígraf
7. Posa'ls dins l'estoig
8. Tanca l'armari
9. Comprova que la motxilla té: 2 llibres, 2 bolígrafs, 1 llapis</code></pre>
  </div>
</div>

---
---

## Exercici: El Robot Literal — Truita

<div class="question-card">
  <span class="question-icon">🍳</span>
  Això és més complicat: cal <strong>comprar, pelar, tallar, fregir, batre, girar</strong>. I cal decidir QUANTITATS.
</div>

<div style="margin-top: 0.8rem;">
  <strong>Exemple (parcial):</strong>
  <pre style="margin: 0.4rem 0;"><code>1. Agafa 4 patates de la nevera
2. Pela-les
3. Talla-les en rodanxes fines (2mm)
4. Agafa una paella gran
5. Posa-hi oli fins a cobrir el fons
6. Encén el foc a mitjana potència
7. Espera 2 minuts (fins que l'oli estiga calent)
8. Afig les patates
9. Fregir 15 minuts (remenant cada 3 minuts)
... (continua)</code></pre>
</div>

---
class: compact-slide
---

## Els 5 Dimonis de la Lògica
### Errors que tot programador comet

<div class="features-grid" style="grid-template-columns:repeat(5,1fr);gap:0.7rem;">
  <div class="feature-item" style="border-top:3px solid #DC2626;padding:0.6rem 0.5rem">
    <div class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">😈</div>
    <div><strong>1. Falten passos</strong></div>
    <div style="color:#64748B;font-size:0.75rem">Donar per fet alguna cosa</div>
  </div>
  <div class="feature-item" style="border-top:3px solid #F59E0B">
    <div class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">😈</div>
    <div><strong>2. Ordre incorrecte</strong></div>
    <div style="color:#64748B;font-size:0.75rem">Passos fora de seqüència</div>
  </div>
  <div class="feature-item" style="border-top:3px solid #8B5CF6">
    <div class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">😈</div>
    <div><strong>3. Ambigüitat</strong></div>
    <div style="color:#64748B;font-size:0.75rem">Instruccions vagues</div>
  </div>
  <div class="feature-item" style="border-top:3px solid #3B82F6">
    <div class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">😈</div>
    <div><strong>4. Info implícita</strong></div>
    <div style="color:#64748B;font-size:0.75rem">Assumir coneixement previ</div>
  </div>
  <div class="feature-item" style="border-top:3px solid #22C55E">
    <div class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">😈</div>
    <div><strong>5. Decisions no considerades</strong></div>
    <div style="color:#64748B;font-size:0.75rem">No pensar en "i si..."</div>
  </div>
</div>

<div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:10px 14px;margin-top:0.5rem;">
  <div style="font-weight:700;color:#8B5CF6;margin-bottom:4px;font-size:0.9rem;">📝 Exemple real: Fer una truita</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
    <div>
      <div style="font-size:0.75rem;color:#DC2626;margin-bottom:2px;">❌ Amb els 5 dimonis:</div>
      <p style="font-size:0.74rem;margin:2px 0;">"Pela les patates, talla-les, posa oli, fregix-les..." <span style="color:#64748B;">— Quantes? Quant d'oli? Temperatura?</span></p>
    </div>
    <div>
      <div style="font-size:0.75rem;color:#16A34A;margin-bottom:2px;">✅ Sense dimonis:</div>
      <p style="font-size:0.74rem;margin:2px 0;">"Pela 4 patates, talla-les en rodanxes de 2mm, posa 200ml d'oli, foc mitjà..." <span style="color:#64748B;">— Tot explícit i concret.</span></p>
    </div>
  </div>
</div>

---
---

## Dimoni 1 i 2

<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;">
  <div style="background:#FEE2E2;border:2px solid #DC2626;border-radius:12px;padding:16px;">
    <div style="font-weight:700;color:#DC2626;margin-bottom:6px;">❌ Falta un pas</div>
    <p style="font-size:0.85rem;"><strong>"Obri el microones, posa el plat, tanca la porta"</strong></p>
    <p style="font-size:0.78rem;color:#64748B;">On està <strong>prémer el botó</strong>? On està <strong>el temps</strong>?</p>
  </div>
  <div style="background:#FEF3C7;border:2px solid #F59E0B;border-radius:12px;padding:16px;">
    <div style="font-weight:700;color:#F59E0B;margin-bottom:6px;">❌ Ordre incorrecte</div>
    <p style="font-size:0.85rem;"><strong>"Tanca la porta, obri el microones, posa el plat"</strong></p>
    <p style="font-size:0.78rem;color:#64748B;">No pots tancar la porta <strong>abans</strong> d'obrir-la!</p>
  </div>
</div>

<div class="info" style="margin-top: 1rem;">
  <strong>Consell:</strong> Llig les instruccions en veu alta. Si et sonen estranyes, probablement hi ha un error de lògica.
</div>

---
---

## Dimonis 3 i 4

<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;">
  <div style="background:#F5F3FF;border:2px solid #8B5CF6;border-radius:12px;padding:16px;">
    <div style="font-weight:700;color:#8B5CF6;margin-bottom:6px;">❌ Ambigüitat</div>
    <p style="font-size:0.85rem;"><strong>"Posa-ho en un lloc adequat"</strong></p>
    <p style="font-size:0.78rem;color:#64748B;">Quin lloc? La taula? L'armari? El terra? L'ordinador no pot decidir.</p>
  </div>
  <div style="background:#EFF6FF;border:2px solid #3B82F6;border-radius:12px;padding:16px;">
    <div style="font-weight:700;color:#3B82F6;margin-bottom:6px;">❌ Info implícita</div>
    <p style="font-size:0.85rem;"><strong>"Afegeix la sal"</strong></p>
    <p style="font-size:0.78rem;color:#64748B;">Quina sal? Quantitat? On la poses? L'ordinador no sap que tens sal a la cuina.</p>
  </div>
</div>

<div style="margin-top: 1rem;">
  Els programadors <strong>assumeixen</strong> molta informació que l'ordinador <strong>no té</strong>. Cal ser explícit amb tot.
</div>

---
---

## Dimoni 5

<div class="step">
  <div class="step-number">🤔</div>
  <div class="step-content">Quan escrivim un algorisme, sovint <strong>no pensem en el que pot fallar</strong>.</div>
</div>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;margin: 0.8rem 0;">
  <div style="background:#FEE2E2;border:2px solid #DC2626;border-radius:12px;padding:16px;">
    <div style="font-weight:700;color:#DC2626;margin-bottom:6px;">❌ Sense decidir</div>
    <p style="font-size:0.85rem;">"Divideix A entre B"</p>
    <p style="font-size:0.78rem;color:#64748B;"><strong>I si B és zero?</strong> No ho has considerat!</p>
  </div>
  <div style="background:#DCFCE7;border:2px solid #16A34A;border-radius:12px;padding:16px;">
    <div style="font-weight:700;color:#16A34A;margin-bottom:6px;">✅ Amb decisió</div>
    <p style="font-size:0.85rem;">"Si B = 0, mostra error. Sinó, divideix A entre B."</p>
    <p style="font-size:0.78rem;color:#64748B;">Has previst el cas problemàtic!</p>
  </div>
</div>

<div class="success">
  <strong>Regla d'or:</strong> Per cada acció, pregunta't: <strong>"I si...?</strong>" (i si és zero? i si és negatiu? i si no existeix? i si és buit?)
</div>

---
---

## Com es menja un elefant?
### Boca per boca! 🐘

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">Un <strong>problema enorme</strong> és simplement una col·lecció de <strong>problemes xicotets</strong></div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">Si resols cada problema xicotet <strong>un per un</strong>, al final has resolt el problema sencer</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">La <strong>descomposició</strong> és l'habilitat més important d'un programador</div>
</div>

<div class="info" style="margin-top: 1rem;">
  <strong>Exemple real:</strong> "Crear una app de biblioteca" sembla impossible. Però "fer un botó de cercar" és fàcil. I "emmagatzemar un llibre en una llista" també. <strong>Són només peces!</strong>
</div>

---
---

## Exemple: Biblioteca Municipal
### Descomposició en subsistemes

<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:0.8rem;">
  <div style="background:#EFF6FF;border:2px solid #3B82F6;border-radius:12px;padding:12px;text-align:center;">
    <div style="font-weight:700;color:#3B82F6;">👤 Gestió d'Usuaris</div>
    <div style="font-size:0.72rem;color:#64748B;margin-top:4px;">Alta, baixa, cerca, dades personals</div>
  </div>
  <div style="background:#F5F3FF;border:2px solid #8B5CF6;border-radius:12px;padding:12px;text-align:center;">
    <div style="font-weight:700;color:#8B5CF6;">📚 Catàleg de Llibres</div>
    <div style="font-size:0.72rem;color:#64748B;margin-top:4px;">Afegir, eliminar, cercar per títol/autor</div>
  </div>
  <div style="background:#F0FDF4;border:2px solid #22C55E;border-radius:12px;padding:12px;text-align:center;">
    <div style="font-weight:700;color:#22C55E;">📖 Sistema de Préstec</div>
    <div style="font-size:0.72rem;color:#64748B;margin-top:4px;">Prestar, tornar, multes, dates</div>
  </div>
  <div style="background:#FEF3C7;border:2px solid #F59E0B;border-radius:12px;padding:12px;text-align:center;">
    <div style="font-weight:700;color:#F59E0B;">🔍 Cerca i Filtres</div>
    <div style="font-size:0.72rem;color:#64748B;margin-top:4px;">Per gènere, autor, estat, disponibilitat</div>
  </div>
  <div style="background:#ECFEFF;border:2px solid #14B8A6;border-radius:12px;padding:12px;text-align:center;">
    <div style="font-weight:700;color:#14B8A6;">📊 Informes</div>
    <div style="font-size:0.72rem;color:#64748B;margin-top:4px;">Préstecs del mes, llibres més prestats</div>
  </div>
  <div style="background:#FDF2F8;border:2px solid #EC4899;border-radius:12px;padding:12px;text-align:center;">
    <div style="font-weight:700;color:#EC4899;">💳 Pagament de Multes</div>
    <div style="font-size:0.72rem;color:#64748B;margin-top:4px;">Calcular, cobrar, historial</div>
  </div>
</div>

<div class="success">
  <strong>Clau:</strong> Cap dels subsistemes és "impossible". Cadascun es pot programar <strong>independentment</strong> i després unir-los.
</div>

---
---

## Subsistema de Préstec
### Descomposició detallada (6 passos)

<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
  <div>
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Identificar l'usuari</strong> — Introduir DNI o número de targeta</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Identificar el llibre</strong> — Escanejar codi de barres o cercar per títol</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><strong>Comprovar multes pendents</strong> — Si en té, no pot prestar</div>
    </div>
  </div>
  <div>
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content"><strong>Comprovar disponibilitat</strong> — El llibre ha d'estar "lliure", no "prestat"</div>
    </div>
    <div class="step">
      <div class="step-number">5</div>
      <div class="step-content"><strong>Registrar dates</strong> — Data de préstec i data de tornada (15 dies)</div>
    </div>
    <div class="step">
      <div class="step-number">6</div>
      <div class="step-content"><strong>Canviar estat del llibre</strong> — De "lliure" a "prestat" al catàleg</div>
    </div>
  </div>
</div>

<div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:9px 12px;margin-top:0.45rem;">
  <div style="font-weight:700;color:#3B82F6;margin-bottom:3px;font-size:0.88rem;">🔍 Flux visual del procés</div>
  <div style="display:flex;gap:8px;align-items:center;justify-content:center;flex-wrap:wrap;">
    <div style="background:#EFF6FF;border:1px solid #3B82F6;border-radius:8px;padding:6px 10px;font-size:0.75rem;text-align:center;">
      <div>👤</div><div>DNI</div>
    </div>
    <div style="color:#94a3b8;">→</div>
    <div style="background:#F5F3FF;border:1px solid #8B5CF6;border-radius:8px;padding:6px 10px;font-size:0.75rem;text-align:center;">
      <div>📚</div><div>Llibre</div>
    </div>
    <div style="color:#94a3b8;">→</div>
    <div style="background:#FEF3C7;border:1px solid #F59E0B;border-radius:8px;padding:6px 10px;font-size:0.75rem;text-align:center;">
      <div>⚠️</div><div>Multes?</div>
    </div>
    <div style="color:#94a3b8;">→</div>
    <div style="background:#ECFEFF;border:1px solid #14B8A6;border-radius:8px;padding:6px 10px;font-size:0.75rem;text-align:center;">
      <div>✅</div><div>Lliure?</div>
    </div>
    <div style="color:#94a3b8;">→</div>
    <div style="background:#F0FDF4;border:1px solid #22C55E;border-radius:8px;padding:6px 10px;font-size:0.75rem;text-align:center;">
      <div>📅</div><div>Dates</div>
    </div>
    <div style="color:#94a3b8;">→</div>
    <div style="background:#FDF2F8;border:1px solid #EC4899;border-radius:8px;padding:6px 10px;font-size:0.75rem;text-align:center;">
      <div>📦</div><div>Estat</div>
    </div>
  </div>
</div>

---
---

## Exemple pràctic
### Descomposar "Fer una truita"

<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
  <div style="background:#EFF6FF;border:2px solid #3B82F6;border-radius:12px;padding:12px;">
    <div style="font-weight:700;color:#3B82F6;margin-bottom:4px;">📦 Bloc: Compra</div>
    <ul style="font-size:0.78rem;">
      <li>Llistar ingredients</li>
      <li>Anar al supermercat</li>
      <li>Comprar patates, ous, oli, sal</li>
      <li>Pagar</li>
    </ul>
  </div>
  <div style="background:#F5F3FF;border:2px solid #8B5CF6;border-radius:12px;padding:12px;">
    <div style="font-weight:700;color:#8B5CF6;margin-bottom:4px;">🔪 Bloc: Preparació</div>
    <ul style="font-size:0.78rem;">
      <li>Pelar les patates</li>
      <li>Tallar-les en rodanxes</li>
      <li>Batre els ous amb sal</li>
    </ul>
  </div>
  <div style="background:#F0FDF4;border:2px solid #22C55E;border-radius:12px;padding:12px;">
    <div style="font-weight:700;color:#22C55E;margin-bottom:4px;">🍳 Bloc: Cocció</div>
    <ul style="font-size:0.78rem;">
      <li>Fregir les patates (oli, foc mitjà)</li>
      <li>Escórrer l'excés d'oli</li>
      <li>Mesclar patates amb ou batut</li>
      <li>Cuinar la truita per les dues cares</li>
    </ul>
  </div>
  <div style="background:#FEF3C7;border:2px solid #F59E0B;border-radius:12px;padding:12px;">
    <div style="font-weight:700;color:#F59E0B;margin-bottom:4px;">🍽️ Bloc: Servir</div>
    <ul style="font-size:0.78rem;">
      <li>Emportar-la al plat</li>
      <li>Deixar refredar 2 minuts</li>
      <li>Servir</li>
    </ul>
  </div>
</div>

---
---

## Les 3 Regles d'Or de la Descomposició

| # | Regla | Exemple |
| :---: | :--- | :--- |
| **1** | **Mai no resolgues dos sub-problemes alhora** | No intentes "comprar i cuinar" alhora. Primer compra, després cuina. |
| **2** | **Si un sub-pas encara és difícil, torna a dividir-lo** | "Cuinar la truita" és massa ampli → divideix en fregir, mesclar, girar. |
| **3** | **Celebra les xicotetes victòries** | Cada pas que funciona et dona seguretat per al següent. |

> Si una tasca et fa por, és simplement perquè **no l'has dividit en peces prou xicotetes**. ✂️🧩

---
---

## Regles 1 i 2 en acció

<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;">
  <div>
    <h3 style="color:#3B82F6;">Regla 1: Un pas a la vegada</h3>
    <div style="background:#FEE2E2;border:2px solid #DC2626;border-radius:12px;padding:12px;margin-bottom:10px;">
      <div style="font-weight:700;color:#DC2626;font-size:0.85rem;">❌ Incorrecte</div>
      <p style="font-size:0.78rem;">"Llig el llibre, compra els ingredients, pela les patates i cuina la truita tot alhora"</p>
    </div>
    <div style="background:#DCFCE7;border:2px solid #16A34A;border-radius:12px;padding:12px;">
      <div style="font-weight:700;color:#16A34A;font-size:0.85rem;">✅ Correcte</div>
      <p style="font-size:0.78rem;">Primer: llig la recepta. Després: compra. Després: pela. Després: cuina.</p>
    </div>
  </div>
  <div>
    <h3 style="color:#8B5CF6;">Regla 2: Divideix més si cal</h3>
    <div style="background:#FEE2E2;border:2px solid #DC2626;border-radius:12px;padding:12px;margin-bottom:10px;">
      <div style="font-weight:700;color:#DC2626;font-size:0.85rem;">❌ Massa ampli</div>
      <p style="font-size:0.78rem;">"Cuinar la truita" — Encara és massa complicat!</p>
    </div>
    <div style="background:#DCFCE7;border:2px solid #16A34A;border-radius:12px;padding:12px;">
      <div style="font-weight:700;color:#16A34A;font-size:0.85rem;">✅ Dividit</div>
      <p style="font-size:0.78rem;">1. Fregir patates → 2. Escórrer → 3. Mesclar amb ou → 4. Cuinar per les dues cares</p>
    </div>
  </div>
</div>

---
---

## Regla 3: Celebra les victòries

<div class="step">
  <div class="step-number">🎉</div>
  <div class="step-content">Cada sub-problema que resols és un <strong>pas endavant</strong>. Celebra'l!</div>
</div>

- Has fet que el botó de "cercar" funcione? **Victòria!** 🎯
- Has emmagatzemat un llibre en una llista? **Victòria!** 🎯
- Has comprovat que un DNI és vàlid? **Victòria!** 🎯

<div class="info" style="margin-top: 1rem;">
  <strong>Per què?</strong> Perquè cada victòria et dona <strong>confiança</strong> i <strong>momentum</strong> per al següent pas. Programar és una marató, no un sprint.
</div>

---
---

## Resum — Bloc 01 Completat!
### El que hem après

<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:0.8rem;">
  <div style="background:#EFF6FF;border:2px solid #3B82F6;border-radius:12px;padding:12px;">
    <div style="font-weight:700;color:#3B82F6;margin-bottom:4px;">🖥️ Secció 0</div>
    <p style="font-size:0.82rem;"><strong>Fonaments tècnics</strong><br>Binari, llenguatges, compiladors, JVM, IDE, algorisme</p>
  </div>
  <div style="background:#F5F3FF;border:2px solid #8B5CF6;border-radius:12px;padding:12px;">
    <div style="font-weight:700;color:#8B5CF6;margin-bottom:4px;">🧠 Secció 1</div>
    <p style="font-size:0.82rem;"><strong>Mentalitat</strong><br>No memoritzar, miratge comprensió, pantalla coberta</p>
  </div>
  <div style="background:#F0FDF4;border:2px solid #22C55E;border-radius:12px;padding:12px;">
    <div style="font-weight:700;color:#22C55E;margin-bottom:4px;">🛤️ Secció 2</div>
    <p style="font-size:0.82rem;"><strong>El Camí Sagrat</strong><br>Literalitat, 4 passos, robot literal, 5 dimonis</p>
  </div>
  <div style="background:#FEF3C7;border:2px solid #F59E0B;border-radius:12px;padding:12px;">
    <div style="font-weight:700;color:#F59E0B;margin-bottom:4px;">✂️ Secció 3</div>
    <p style="font-size:0.82rem;"><strong>Descomposició</strong><br>Dividir problemes, biblioteca, 3 regles d'or</p>
  </div>
</div>

<div class="success">
  <strong>Ja tens la mentalitat del programador!</strong> Ara toca posar-la en pràctica amb codi real. 🚀
</div>

---
layout: closing
---

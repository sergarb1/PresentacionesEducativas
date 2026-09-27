---
title: "UD01 - Pensament Computacional - Bloc 02"
author: Sergi García Barea
layout: cover
---

# Unitat 01 — Introducció al pensament computacional<br>Bloc 02

## 1r CFGS DAW · Programació

---
---

## El text vermell és el teu amic
### No tingues por dels errors!

<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;margin:0.8rem 0;">
  <div style="background:#FEE2E2;border:2px solid #DC2626;border-radius:12px;padding:16px;">
    <div style="font-weight:700;color:#DC2626;font-size:1.05rem;margin-bottom:8px;">❌ ERROR</div>
    <pre style="font-size:0.75rem;background:#1a1a2e;color:#f8f8f2;padding:12px;border-radius:8px;margin:0;"><code>Exception in thread "main"
  java.lang.ArithmeticException:
    / by zero
    at Main.main(Main.java:5)</code></pre>
  </div>
  <div style="background:#DCFCE7;border:2px solid #16A34A;border-radius:12px;padding:16px;">
    <div style="font-weight:700;color:#16A34A;font-size:1.05rem;margin-bottom:8px;">✅ EL QUE ET DÓNA</div>
    <ul style="font-size:0.85rem;">
      <li><strong>Què</strong> ha passat: ArithmeticException</li>
      <li><strong>On</strong>: Main.java, línia 5</li>
      <li><strong>Causa</strong>: Divisió per zero</li>
    </ul>
  </div>
</div>

<div class="info">
  <strong>L'error no t'ataca — t'informa.</strong> És com un GPS que et diu "has girat malament": millor saber-ho que seguir perdut.
</div>

---
class: compact-slide
---

## Anatomia d'un Stack Trace
### Com llegir un error com un professional

<pre style="font-size:0.75rem;background:#1a1a2e;color:#f8f8f2;padding:14px;border-radius:12px;"><code><span style="color:#f87171;">Exception in thread "main"</span>                          <span style="color:#fbbf24;">← Què ha fallat</span>
  <span style="color:#f87171;">java.lang.NullPointerException</span>
    <span style="color:#CBD5E1;">at Student.getName(Student.java:15)</span>              <span style="color:#fbbf24;">← On ha fallat (classe:línia)</span>
    <span style="color:#CBD5E1;">at Main.printStudent(Main.java:22)</span>               <span style="color:#fbbf24;">← Qui ha cridat eixe mètode</span>
    <span style="color:#CBD5E1;">at Main.main(Main.java:8)</span>                        <span style="color:#fbbf24;">← Punt d'entrada</span></code></pre>

<div class="step" style="margin-top:0.5rem;">
  <div class="step-number">1</div>
  <div class="step-content"><strong>Llegeix de baix cap amunt</strong> — El punt d'entrada és l'última línia</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><strong>Busca la primera línia del teu codi</strong> — Les altres són de biblioteques</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><strong>Obre eixa línia</strong> — Allí està la causa de l'error</div>
</div>

<div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:10px;margin-top:0.5rem;">
  <div style="font-weight:700;color:#3B82F6;margin-bottom:4px;">📝 Exemple real: Exercici 1.2</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
    <div>
      <div style="font-size:0.72rem;color:#DC2626;margin-bottom:2px;">❌ Error: NullPointerException</div>
      <ul style="font-size:0.72rem;">
        <li><strong>Línia 15:</strong> <code>String nom = alumne.getNom();</code></li>
        <li><strong>Problema:</strong> <code>alumne</code> és <code>null</code></li>
        <li><strong>Causa:</strong> No has creat l'objecte</li>
      </ul>
    </div>
    <div>
      <div style="font-size:0.72rem;color:#16A34A;margin-bottom:2px;">✅ Solució:</div>
      <pre style="font-size:0.7rem;background:#1a1a2e;color:#f8f8f2;padding:6px;border-radius:6px;"><code>Alumne alumne = new Alumne();  // Crea l'objecte!
String nom = alumne.getNom();   // Ara funciona</code></pre>
    </div>
  </div>
</div>

---
---

## Tipus d'errors comuns

| Error | Què significa | Exemple |
| :--- | :--- | :--- |
| `SyntaxError` | Falta un ';', '{', o parèntesi | `int x = 5` (falta ;) |
| `NullPointerException` | Intentes usar algo que no existeix | `String s = null; s.length()` |
| `ArithmeticException` | Operació matemàtica invàlida | `10 / 0` |
| `IndexOutOfBoundsException` | Accedeix a una posició que no existeix | `int[] a = {1,2}; a[5]` |
| `ClassNotFoundException` | No troba una classe necessària | Falta un import o un jar |

<div class="info" style="margin-top: 0.8rem;">
  <strong>💡 Consell pràctic:</strong> Quan veges un error <strong>SyntaxError</strong>, és el més fàcil de solucionar: el compilador t'indica exactament la línia i el problema. Els errors <strong>NullPointerException</strong> i <strong>IndexOutOfBoundsException</strong> són els més habituals en Java — aprèn a reconèixer-los!
</div>

---
---

## Exemple: NullPointerException
### L'error més habitual en Java

<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
  <div>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Student.java</div>
      </div>
      <pre style="font-size:0.72rem;"><code class="language-java">public class Student {
    String name; // per defecte: null
    public String getName() {
        return name; // pot ser null!
    }
}
// En Main.java:
Student s = new Student();
// s.name NO s'ha assignat → és null
System.out.println(s.getName().length());
// ↑ getName() retorna null
// ↑ null.length() → ERROR!</code></pre>
    </div>
  </div>
  <div>
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Causa:</strong> La variable <code>name</code> no s'ha assignat</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Solució:</strong> Assignar un valor o comprovar abans</div>
    </div>
    <div class="code-card" style="margin-top:10px;">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">Solució</div>
      </div>
      <pre style="font-size:0.72rem;"><code class="language-java">// Opció 1: Assignar valor
s.name = "Anna";
// Opció 2: Comprovar
if (s.name != null) {
    System.out.println(s.name.length());
}</code></pre>
    </div>
  </div>
</div>

---
class: compact-slide
---

## Casos límit
### La ment que separa el professional del novell

<div class="question-card" style="padding:0.55rem 1rem;">
  <span class="question-icon" style="font-size:1.3rem;">🤔</span>
  Problema: "Donat un número, indica si és parell o senar."
</div>

- ✅ El novell prova: **8 → parell, 3 → senar**. Funciona!
- ⚠️ El professional prova **AÇÒ** també:

| Cas | Entrada | Resultat esperat | Per què? |
| :--- | :--- | :--- | :--- |
| Bàsic | 8 | parell | Cas normal |
| Límit | 0 | parell | Zero és parell? |
| Negatiu | -4 | parell | Funciona amb negatius? |
| Gran | 2147483647 | senar | Integer.MAX_VALUE |

<div class="info" style="margin-top: 0.4rem;padding:0.55rem 1rem;">
  <strong>💡 Per què importen els casos límit?</strong> El 90% dels errors en programació passen en <strong>dades extremes</strong>: zeros, negatius, cadenes buides, valors màxims. Provar només el cas "normal" et dona una <strong>falsa sensació de seguretat</strong>.
</div>

---
---

## Quins casos límit provar?

| Tipus | Exemple | Per què? |
| :--- | :--- | :--- |
| **Zero** | `0` | Sovint causa errors de divisió o buit |
| **Negatiu** | `-5` | Molts càlculs assumeixen positius |
| **Buit/null** | `""` o `null` | String buit ≠ null |
| **Màxim** | `2147483647` | Desbordament d'enter |
| **Límit exacte** | `17` (si edat ≥ 18) | El número just al límit |
| **Fora de rang** | `-1`, `200` | Dades impossibles o absurdes |

<div class="success" style="margin-top: 0.8rem;">
  <strong>Regla:</strong> Si el teu programa funciona amb <strong>8, 0, -5, buit i Integer.MAX_VALUE</strong>, probablement funciona amb tot.
</div>

---
---

## El Protocol de la Pau
### 4 passos abans de demanar ajuda

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><strong>Llig l'error en veu alta</strong> — Moltes vegades, en dir-ho, entens la causa</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><strong>Ves a la línia exacta</strong> — El stack trace t'indica on. Obre eixe fitxer i mira la línia</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><strong>Regla dels 15 minuts</strong> — Intenta <strong>una cosa</strong>. Si no funciona, fes un pas enrere i prova una altra cosa. Si en 15 minuts no ho soluciones, para.</div>
</div>
<div class="step">
  <div class="step-number">4</div>
  <div class="step-content"><strong>Demana ajuda amb dades</strong> — No digues "no funciona". Digues: "estic intentant X, espere Y, però el resultat és Z. L'error és A a la línia B"</div>
</div>

<div class="info" style="margin-top: 1rem;">
  <strong>Important:</strong> Demanar ajuda <strong>no és rendir-se</strong>. És usar un recurs. Però primer intenta-ho tu!
</div>

---
---

## L'Analogia de la Natació

<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:0.8rem 0;">
  <div style="background:#EFF6FF;border:2px solid #3B82F6;border-radius:12px;padding:18px;">
    <div style="font-weight:700;color:#3B82F6;font-size:1.05rem;margin-bottom:8px;">📖 Nedar llegint</div>
    <ul style="font-size:0.85rem;">
      <li>Llegeixes 500 pàgines sobre natació</li>
      <li>Entens la tècnica braçada</li>
      <li>Saps quins músculs has d'usar</li>
      <li><strong>Però quan et llences a l'aigua...</strong></li>
      <li style="color:#DC2626;font-weight:700;">...no saps nedar! 🏊</li>
    </ul>
  </div>
  <div style="background:#F0FDF4;border:2px solid #22C55E;border-radius:12px;padding:18px;">
    <div style="font-weight:700;color:#22C55E;font-size:1.05rem;margin-bottom:8px;">💻 Programació llegint</div>
    <ul style="font-size:0.85rem;">
      <li>Mires tutorials de Java</li>
      <li>Entens els bucles</li>
      <li>Saps què és un if/else</li>
      <li><strong>Però quan t'asseus davant...</strong></li>
      <li style="color:#DC2626;font-weight:700;">...no saps programar! 🖥️</li>
    </ul>
  </div>
</div>

<div class="warning">
  <strong>La natació s'aprèn nedant. La programació s'aprèn programant.</strong> No hi ha dreceres.
</div>

---
---

## La farsa de "M'ho he entès"
### Dues fases que tot programador viu

<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin: 0.8rem 0;">
  <div style="background:#DCFCE7;border:2px solid #16A34A;border-radius:12px;padding:18px;">
    <div style="font-weight:700;color:#16A34A;font-size:1.05rem;margin-bottom:8px;">😊 Fase A: Mode Espectador</div>
    <p style="font-size:0.85rem;">Mires un exemple o un vídeo.</p>
    <p style="font-size:0.85rem;font-weight:700;">"Això és fàcil! Ho entenc perfectament!"</p>
    <p style="font-size:0.78rem;color:#64748B;margin-top:8px;">És la sensació de <strong>confort</strong>. No estàs aprenent, estàs consumint.</p>
  </div>
  <div style="background:#FEE2E2;border:2px solid #DC2626;border-radius:12px;padding:18px;">
    <div style="font-weight:700;color:#DC2626;font-size:1.05rem;margin-bottom:8px;">😰 Fase B: Pantalla Buida</div>
    <p style="font-size:0.85rem;">Tanques el vídeo i intentes fer-ho.</p>
    <p style="font-size:0.85rem;font-weight:700;">"On comence?... No recorde res!"</p>
    <p style="font-size:0.78rem;color:#64748B;margin-top:8px;">És la sensació de <strong>desconfort</strong>. És on realment aprens.</p>
  </div>
</div>

<div class="info">
  <strong>La Fase A és una mentida.</strong> Si no has intentat fer-ho tu sol, no ho entens de veritat. Menys Fase A, més Fase B.
</div>

---
class: compact-slide
---

## La Regla 80/20
### Per a FP a distància

<div style="display:grid;grid-template-columns:1fr 3fr;gap:20px;align-items:center;margin: 0.45rem 0;">
  <div style="background:#FEE2E2;border:2px solid #DC2626;border-radius:12px;padding:16px;text-align:center;">
    <div style="font-size:2.1rem;font-weight:800;color:#DC2626;line-height:1;">20%</div>
    <div style="font-weight:700;color:#DC2626;margin-top:4px;">Teoria</div>
    <div style="font-size:0.75rem;color:#666;margin-top:4px;">Llegir, mirar vídeos, entendre conceptes</div>
  </div>
  <div style="background:#DCFCE7;border:2px solid #16A34A;border-radius:12px;padding:16px;text-align:center;">
    <div style="font-size:2.1rem;font-weight:800;color:#16A34A;line-height:1;">80%</div>
    <div style="font-weight:700;color:#16A34A;margin-top:4px;">Pràctica</div>
    <div style="font-size:0.75rem;color:#666;margin-top:4px;">Exercicis, fallar, intentar, programar, provar</div>
  </div>
</div>

<div class="warning">
  Si passes el 80% del temps llegint i el 20% programant, <strong>estàs fent-ho al revés</strong>. Inverteix les proporcions!
</div>

<div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:10px;margin-top:0.6rem;">
  <div style="font-weight:700;color:#16A34A;margin-bottom:4px;">📝 Com aplicar-ho en el dia a dia</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
    <div>
      <div style="font-size:0.75rem;color:#DC2626;margin-bottom:2px;">❌ Error habitual:</div>
      <ul style="font-size:0.72rem;">
        <li>Llegir 3 hores de teoria</li>
        <li>Intentar 1 exercici 10 min</li>
        <li>Perdre's i tornar a llegir</li>
      </ul>
    </div>
    <div>
      <div style="font-size:0.75rem;color:#16A34A;margin-bottom:2px;">✅ Mètode correcte:</div>
      <ul style="font-size:0.72rem;">
        <li>Llegir 30 min la teoria</li>
        <li>Intentar l'exercici 1 hora</li>
        <li>Si et bloques, busca pista concreta</li>
      </ul>
    </div>
  </div>
</div>

---
---

## 3 Hàbits Diaris
### Com entrenar cada dia

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><strong>"Fes-ho abans de mirar"</strong> — Intenta-ho 5 minuts en paper abans de veure la solució. Encara que no ho resolgues, ja estàs "escalfant" el cervell.</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><strong>"El canvi del 5%"</strong> — Agafa codi que funciona i canvia una cosa: multiplica en lloc de sumar, afig una entrada més, canvia l'ordre. Observa què passa.</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><strong>"No tingues por de tancar el tutorial"</strong> — Deixa de ser un copista medieval. Entén el concepte → Tanca'l → Intenta-ho sol.</div>
</div>

<div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:12px;margin-top:0.8rem;">
  <div style="font-weight:700;color:#16A34A;margin-bottom:6px;">📝 Com aplicar-los avui mateix</div>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
    <div style="background:#EFF6FF;border:1px solid #3B82F6;border-radius:8px;padding:10px;text-align:center;">
      <div style="font-weight:700;color:#3B82F6;font-size:0.8rem;">Hàbit 1</div>
      <p style="font-size:0.72rem;">Llig l'exercici → Tapa la pantalla → Intenta 5 min</p>
    </div>
    <div style="background:#F0FDF4;border:1px solid #22C55E;border-radius:8px;padding:10px;text-align:center;">
      <div style="font-weight:700;color:#22C55E;font-size:0.8rem;">Hàbit 2</div>
      <p style="font-size:0.72rem;">Agafa un codi → Canvia una línia → Observa el resultat</p>
    </div>
    <div style="background:#FEF3C7;border:1px solid #F59E0B;border-radius:8px;padding:10px;text-align:center;">
      <div style="font-weight:700;color:#F59E0B;font-size:0.8rem;">Hàbit 3</div>
      <p style="font-size:0.72rem;">Mira 2 min → Tanca → Intenta-ho sol 10 min</p>
    </div>
  </div>
</div>

---
---

## Hàbit 1: "Fes-ho abans de mirar"

<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:1rem;">
  <div>
    <h3 style="color:#DC2626;">❌ Sense l'hàbit</h3>
    <div class="step">
      <div class="step-number" style="background:#DC2626;">1</div>
      <div class="step-content">Llegeixes l'exercici</div>
    </div>
    <div class="step">
      <div class="step-number" style="background:#DC2626;">2</div>
      <div class="step-content">Mires la solució immediatament</div>
    </div>
    <div class="step">
      <div class="step-number" style="background:#DC2626;">3</div>
      <div class="step-content">Penses "ja ho entenc"</div>
    </div>
    <div class="step">
      <div class="step-number" style="background:#DC2626;">4</div>
      <div class="step-content">L'endemà no recordes res</div>
    </div>
  </div>
  <div>
    <h3 style="color:#16A34A;">✅ Amb l'hàbit</h3>
    <div class="step">
      <div class="step-number" style="background:#16A34A;">1</div>
      <div class="step-content">Llegeixes l'exercici</div>
    </div>
    <div class="step">
      <div class="step-number" style="background:#16A34A;">2</div>
      <div class="step-content"><strong>Intentes 5 minuts en paper</strong></div>
    </div>
    <div class="step">
      <div class="step-number" style="background:#16A34A;">3</div>
      <div class="step-content">Mires la solució i compares</div>
    </div>
    <div class="step">
      <div class="step-number" style="background:#16A34A;">4</div>
      <div class="step-content"><strong>Recordes el que vas intentar</strong></div>
    </div>
  </div>
</div>

---
---

## Hàbit 2: "El canvi del 5%"

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">Codi original</div>
  </div>
  <pre style="font-size:0.8rem;"><code class="language-java">int a = 5;
int b = 3;
int suma = a + b;
System.out.println("Suma: " + suma);</code></pre>
</div>

<div class="code-card" style="margin-top:0.8rem;">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">Canvi del 5% — Multiplica en lloc de sumar</div>
  </div>
  <pre style="font-size:0.8rem;"><code class="language-java">int a = 5;
int b = 3;
int producte = a * b;  // ← Canvi ací
System.out.println("Producte: " + producte);</code></pre>
</div>

<div class="success" style="margin-top: 1rem;">
  <strong>Per què funciona?</strong> Perquè estàs <strong>modificant</strong> codi existent, no creant-ne de zero. És menys por i més aprenentatge.
</div>

---
---

## La IA és ací per a quedar-se

<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:0.8rem;">
  <div style="background:#FEE2E2;border:2px solid #DC2626;border-radius:12px;padding:16px;">
    <div style="font-weight:700;color:#DC2626;font-size:1rem;margin-bottom:6px;">❌ Incorrecte: Ignorar-la</div>
    <p style="font-size:0.82rem;">"La IA és fer trampes. No la use."</p>
    <p style="font-size:0.75rem;color:#64748B;margin-top:4px;">El món real la fa servir. Negar-la és pitjor que usar-la malament.</p>
  </div>
  <div style="background:#FEE2E2;border:2px solid #DC2626;border-radius:12px;padding:16px;">
    <div style="font-weight:700;color:#DC2626;font-size:1rem;margin-bottom:6px;">❌ Incorrecte: Dependent</div>
    <p style="font-size:0.82rem;">"ChatGPT, resol-me l'exercici."</p>
    <p style="font-size:0.75rem;color:#64748B;margin-top:4px;">No aprens res. És com pagar a algú perquè et faça les flexions.</p>
  </div>
</div>

<div style="background:#DCFCE7;border:2px solid #16A34A;border-radius:12px;padding:16px;">
  <div style="font-weight:700;color:#16A34A;font-size:1.05rem;margin-bottom:6px;">✅ Correcte: Tutor Socràtic</div>
  <p style="font-size:0.85rem;">Usar la IA perquè et faça <strong>preguntes</strong> que t'ajuden a pensar, no perquè et done les respostes.</p>
  <p style="font-size:0.78rem;color:#64748B;margin-top:4px;"><strong>"Tutor Socràtic"</strong> — Sòcrates mai no donava respostes. Feia preguntes.</p>
</div>

---
---

## L'Analogia del Gimnàs

<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:0.6rem;">
  <div style="background:#FEE2E2;border:2px solid #DC2626;border-radius:12px;padding:16px;">
    <div style="font-weight:700;color:#DC2626;font-size:1rem;margin-bottom:6px;">🤖 Pagar al robot</div>
    <p style="font-size:0.82rem;">"Robot, fes-me 100 flexions."</p>
    <p style="font-size:0.82rem;">El robot les fa. Tu et quedes al sofà.</p>
    <p style="font-size:0.82rem;font-weight:700;color:#DC2626;margin-top:6px;">Els teus músculs no creixen. 😔</p>
  </div>
  <div style="background:#DCFCE7;border:2px solid #16A34A;border-radius:12px;padding:16px;">
    <div style="font-weight:700;color:#16A34A;font-size:1rem;margin-bottom:6px;">🏋️ Usar-la com a entrenador</div>
    <p style="font-size:0.82rem;">"Robot, com puc fer esta flexió? Quins músculs use?"</p>
    <p style="font-size:0.82rem;">Ell t'explica. Tu les fas.</p>
    <p style="font-size:0.82rem;font-weight:700;color:#16A34A;margin-top:6px;">Els teus músculs creixen! 💪</p>
  </div>
</div>

<div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:10px;">
  <div style="font-weight:700;color:#8B5CF6;margin-bottom:4px;">📝 Exemples pràctics de prompts</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
    <div>
      <div style="font-size:0.75rem;color:#DC2626;margin-bottom:2px;">❌ Males preguntes:</div>
      <ul style="font-size:0.72rem;">
        <li>"Fes-me l'exercici 3"</li>
        <li>"Quina és la resposta?"</li>
        <li>"Resol-me este problema"</li>
      </ul>
    </div>
    <div>
      <div style="font-size:0.75rem;color:#16A34A;margin-bottom:2px;">✅ Bones preguntes:</div>
      <ul style="font-size:0.72rem;">
        <li>"Per què el meu bucle no acaba?"</li>
        <li>"Quina diferència hi ha entre...?"</li>
        <li>"Pots explicar-me el pas 3?"</li>
      </ul>
    </div>
  </div>
</div>

---
---

## Tutor Socràtic
### El prompt que canviarà la teua forma d'aprendre

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">Prompt per copiar i enganxar</div>
    <div class="code-card-badge">prompt</div>
  </div>
  <pre style="font-size:0.75rem;"><code>Ets un tutor socràtic de programació. No em doneu la resposta directament.
En lloc d'això, fes-me preguntes perquè jo arribe a la solució pel meu compte.
Si m'equivoc, explica'm PER QUÈ està malament però no doneu la solució completa.
Si estic perdut, dona'm UNA PISTA, no la resposta sencera.
Context del problema: (Ací pegues l'enunciat o el teu codi)</code></pre>
</div>

<div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:10px;margin-top:0.6rem;">
  <div style="font-weight:700;color:#8B5CF6;margin-bottom:4px;">💬 Exemples de conversa amb el tutor</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
    <div>
      <div style="font-size:0.72rem;color:#3B82F6;">Tu: "Tinc un bucle que no para. Què faig?"</div>
      <div style="font-size:0.72rem;color:#16A34A;margin-top:2px;">Tutor: "Quina és la condició del bucle? Quines variables canvien a dins?"</div>
    </div>
    <div>
      <div style="font-size:0.72rem;color:#3B82F6;">Tu: "El meu array ix fora de rang."</div>
      <div style="font-size:0.72rem;color:#16A34A;margin-top:2px;">Tutor: "Quina és la mida de l'array? Recorda que l'últim índex és mida - 1."</div>
    </div>
  </div>
</div>

---
---

## Mode Vague vs Mode Pro
### Com preguntar a la IA

| Mode Vague ❌ | Mode Pro ✅ |
| :--- | :--- |
| `"El meu codi no funciona"` | `"Tinc un NullPointerException a la línia 15 de Student.java. La variable name és null quan cride getName(). Com ho solucione?"` |
| `"Fes-me un CRUD"` | `"Necessite afegir, modificar i eliminar estudiants en una ArrayList. Pots explicar-me pas a pas com fer l'eliminar?"` |
| `"Explica'm Java"` | `"Quina és la diferència entre == i .equals() per a Strings?"` |

<div class="info" style="margin-top: 1rem;">
  <strong>Clau:</strong> Com més <strong>específic</strong> sigues, més útil serà la resposta. La IA no pot llegir el teu cap.
</div>

---
---

## Al·lucinacions de la IA
### Tingues sempre el criteri!

<div class="step">
  <div class="step-number">⚠️</div>
  <div class="step-content">La IA pot <strong>inventar</strong> mètodes que no existixen en Java</div>
</div>
<div class="step">
  <div class="step-number">⚠️</div>
  <div class="step-content">Pot proposar solucions <strong>massa complicades</strong> per a problemes senzills</div>
</div>
<div class="step">
  <div class="step-number">⚠️</div>
  <div class="step-content">Pot <strong>confirmar errors</strong> amb confiança (dir-te que està bé quan està malament)</div>
</div>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:0.8rem;">
  <div style="background:#FEE2E2;border:2px solid #DC2626;border-radius:12px;padding:14px;">
    <div style="font-weight:700;color:#DC2626;margin-bottom:4px;">❌ IA diu:</div>
    <p style="font-size:0.85rem;">"Sí, <code>String.sort()</code> és un mètode vàlid de Java"</p>
    <p style="font-size:0.75rem;color:#64748B;"><strong>No existeix!</strong> La IA l'ha inventat.</p>
  </div>
  <div style="background:#DCFCE7;border:2px solid #16A34A;border-radius:12px;padding:14px;">
    <div style="font-weight:700;color:#16A34A;margin-bottom:4px;">✅ Tu hauries de:</div>
    <p style="font-size:0.85rem;">Provar <code>String.sort()</code> → Error → Entendre la fallada</p>
    <p style="font-size:0.75rem;color:#64748B;"><strong>Confia sempre en el compilador,</strong> no en la IA.</p>
  </div>
</div>

---
---

## El Comparador de Nombres
### El nostre primer problema complet

<div class="question-card">
  <span class="question-icon">📋</span>
  <strong>Enunciat:</strong> Un programa ha de demanar a l'usuari dos enters i mostrar quin és més gran, o si són iguals.
</div>

<div class="step" style="margin-top:0.8rem;">
  <div class="step-number">1</div>
  <div class="step-content"><strong>Entrada:</strong> 2 nombres enters (A, B)</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><strong>Sortida:</strong> Missatge indicant quin és més gran o si són iguals</div>
</div>

<div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:12px;margin-top:0.8rem;">
  <div style="font-weight:700;color:#3B82F6;margin-bottom:4px;">🔍 Per què aquest problema?</div>
  <p style="font-size:0.85rem;">És el primer pas real perquè combina <strong>entrada de dades</strong> (teclat), <strong>decisió lògica</strong> (if/else) i <strong>sortida</strong> (pantalla). Tots els programes fan alguna cosa similar: llegir, processar, escriure.</p>
</div>

---
---

## Pas 1: Descomposició E/S
### Entrada i Sortida

<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:1rem;">
  <div style="background:#EFF6FF;border:2px solid #3B82F6;border-radius:12px;padding:20px;">
    <div style="font-weight:700;color:#3B82F6;font-size:1.1rem;margin-bottom:10px;">📥 ENTRADA (Input)</div>
    <ul style="font-size:0.88rem;">
      <li><strong>Variable A:</strong> enter (int)</li>
      <li><strong>Variable B:</strong> enter (int)</li>
      <li>Font: teclat de l'usuari</li>
    </ul>
  </div>
  <div style="background:#F0FDF4;border:2px solid #22C55E;border-radius:12px;padding:20px;">
    <div style="font-weight:700;color:#22C55E;font-size:1.1rem;margin-bottom:10px;">📤 SORTIDA (Output)</div>
    <ul style="font-size:0.88rem;">
      <li>Missatge de text</li>
      <li>Un de tres possibles:</li>
      <li>"A és més gran que B"</li>
      <li>"B és més gran que A"</li>
      <li>"A i B són iguals"</li>
    </ul>
  </div>
</div>

---
---

## Pas 2: Algorisme en Pseudocodi
### Lògica en llenguatge humà

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">Pseudocodi</div>
    <div class="code-card-badge">pseudocodi</div>
  </div>
  <pre style="font-size:0.85rem;"><code>INICI
    Demanar valor de A
    Demanar valor de B
    SI A &gt; B LLAVORS
        Mostrar "A és més gran que B"
    SINO SI B &gt; A LLAVORS
        Mostrar "B és més gran que A"
    SINO
        Mostrar "A i B són iguals"
    FI SI
FI</code></pre>
</div>

---
---

## Pas 3: Test de Casos Límit
### Provar l'algorisme abans de codificar

| Cas | A | B | Resultat esperat | Passa? |
| :--- | :---: | :---: | :--- | :---: |
| Normal (A > B) | 8 | 3 | A és més gran | <span style="color:#16A34A;">✅</span> |
| Normal (B > A) | 2 | 10 | B és més gran | <span style="color:#16A34A;">✅</span> |
| Iguals | 5 | 5 | Són iguals | <span style="color:#16A34A;">✅</span> |
| Negatius | -3 | -7 | A és més gran | <span style="color:#16A34A;">✅</span> |
| Zero | 0 | 0 | Són iguals | <span style="color:#16A34A;">✅</span> |

<div class="success" style="margin-top: 1rem;">
  <strong>Tots passen!</strong> Ara podem confiar en el nostre algorisme i passar a Java.
</div>

---
class: compact-slide
---

## Pas 4: Pont cap a Java
### De pseudocodi a codi real

<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
  <div style="background:#F5F3FF;border:2px solid #8B5CF6;border-radius:12px;padding:14px;">
    <div style="font-weight:700;color:#8B5CF6;margin-bottom:6px;">📝 Pseudocodi</div>
    <pre style="font-size:0.75rem;"><code>Demanar valor de A
Demanar valor de B
SI A &gt; B LLAVORS
    Mostrar "A és més gran"
SINO SI B &gt; A LLAVORS
    Mostrar "B és més gran"
SINO
    Mostrar "Són iguals"
FI SI</code></pre>
  </div>
  <div style="background:#F0FDF4;border:2px solid #22C55E;border-radius:12px;padding:14px;">
    <div style="font-weight:700;color:#22C55E;margin-bottom:6px;">☕ Java</div>
    <pre style="font-size:0.75rem;"><code class="language-java">Scanner t = new Scanner(System.in);
System.out.print("A: ");
int A = t.nextInt();
System.out.print("B: ");
int B = t.nextInt();
if (A &gt; B) {
    System.out.println("A és més gran");
} else if (B &gt; A) {
    System.out.println("B és més gran");
} else {
    System.out.println("Són iguals");
}</code></pre>
  </div>
</div>

<div class="info" style="margin-top: 0.45rem;padding:0.55rem 1rem;">
  <strong>Fixa't:</strong> L'<strong>estructura lògica</strong> és idèntica. Només canvia la <strong>sintaxi</strong>. Per això primer pensem en pseudocodi!
</div>

---
---

## Pseudocodi vs Java
### La traducció és directa

| Pseudocodi | Java | Notes |
| :--- | :--- | :--- |
| `Demanar valor de A` | `int A = t.nextInt();` | Necessitem Scanner |
| `Mostrar "text"` | `System.out.println("text");` | println afegeix salt de línia |
| `SI ... LLAVORS` | `if (...) {` | Cal { } |
| `SINO SI` | `} else if (...) {` | Tancar el if anterior |
| `SINO` | `} else {` | Sense condició |
| `FI SI` | `}` | Tancar l'últim bloc |

<div class="success" style="margin-top: 0.8rem;">
  <strong>Conclusió:</strong> Ja saps programar! Només et falta aprendre el <strong>vocabulari</strong> de Java. El pensament ja el tens.
</div>

---
---

## Glossari — Infraestructura Tècnica

| Terme | Definició | Exemple |
| :--- | :--- | :--- |
| **Codi Font** | El text que escrius en un editor de programació | `Main.java` |
| **Sintaxi** | Les regles gramaticals del llenguatge | Cada instrucció amb `;` |
| **Compilador** | Tradueix tot el codi font a codi màquina de cop | `javac` en Java |
| **IDE** | Editor integrat amb depurador, auto-completat, etc. | IntelliJ IDEA, VS Code |

---
---

## Glossari — Lògica i Procés

| Terme | Definició | Exemple |
| :--- | :--- | :--- |
| **Algorisme** | Seqüència finita de passos per resoldre un problema | Recepta de cuina |
| **Pseudocodi** | Algorisme escrit en llenguatge proper al natural | `SI A > B LLAVORS...` |
| **Descomposició** | Dividir un problema gran en problemes xicotets | Biblioteca → 6 subsistemes |
| **Abstracció** | Amagar detalls innecessaris per a centrar-se en l'essencial | Botó "Imprimir" amaga el codi |

---
---

## Glossari — Gestió d'Errors

| Terme | Definició | Exemple |
| :--- | :--- | :--- |
| **Bug** | Un error en el codi que fa que el programa es comporte malament | Divisió per zero no controlada |
| **Debugging** | El procés de buscar i corregir errors (depuració) | Usar `System.out.println` per a veure valors |
| **Stack Trace** | Text que apareix quan el programa falla, amb la pila de crides | `at Main.main(Main.java:5)` |
| **Casos Límit** | Situacions extremes on el programa té més risc de fallar | Zero, negatiu, null, Integer.MAX_VALUE |

---
---

## Glossari — Treball i Metodologia

| Terme | Definició | Exemple |
| :--- | :--- | :--- |
| **Miratge de la Comprensió** | Sensació falsa d'entendre quelcom només per haver-lo vist | Mirar un vídeo i pensar "jo puc" |
| **Tutor Socràtic** | Usar la IA fent-li preguntes perquè t'ajude a pensar | "Per què creus que esta línia falla?" |
| **Entrada/Sortida (I/O)** | Dades que entren al programa (input) i les que n'ixen (output) | Teclat → Programa → Pantalla |

<div class="info" style="margin-top: 0.8rem;">
  <strong>Guarda este glossari!</strong> T'ajudarà a recordar els conceptes clau quan els necessites.
</div>

---
---

## Resum — Unitat 01 Completada!
### El que hem après en els dos blocs

<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:0.8rem;">
  <div style="background:#EFF6FF;border:2px solid #3B82F6;border-radius:12px;padding:14px;">
    <div style="font-weight:700;color:#3B82F6;margin-bottom:6px;">🖥️ Bloc 01 — Fonaments</div>
    <ul style="font-size:0.75rem;">
      <li>Ordinador: ràpid però ximple</li>
      <li>Llenguatges: alts vs baixos</li>
      <li>Java: compilador + JVM</li>
      <li>No memoritzar, miratge comprensió</li>
      <li>Camí Sagrat: Entén → Pensa → Paper → Java</li>
      <li>Descomposició: dividir per conquerir</li>
    </ul>
  </div>
  <div style="background:#F5F3FF;border:2px solid #8B5CF6;border-radius:12px;padding:14px;">
    <div style="font-weight:700;color:#8B5CF6;margin-bottom:6px;">🔧 Bloc 02 — Eines</div>
    <ul style="font-size:0.75rem;">
      <li>Errors: t'informen, no t'ataquen</li>
      <li>Casos límit: zero, negatiu, buit</li>
      <li>Protocol de la Pau: 4 passos</li>
      <li>Pràctica: 80/20, 3 hàbits</li>
      <li>IA: tutor socràtic, no dependent</li>
      <li>Primer problema: pseudocodi → Java</li>
    </ul>
  </div>
</div>

<div class="success">
  <strong>Ja estàs preparat/da per a programar en Java!</strong> Benvingut/da al món real de la programació. ☕💻
</div>

---
layout: closing
---

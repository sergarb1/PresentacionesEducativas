LICENCIA

**Reconocimiento \- No comercial \- CompartirIgual (BY-NC-SA):** No se permite un uso comercial de la obra original ni de las posibles obras derivadas, la distribución de las cuales se ha de hacer con una licencia igual a la que regula la obra original.

**ÍNDICE**

[**1\. Variables i tipus primitius	3**](#1.-variables-i-tipus-primitius)

[**2\. String, constants i final	6**](#2.-string,-constants-i-final)

[**3\. Operadors aritmètics	9**](#3.-operadors-aritmètics)

[**4\. Relacionals, lògics i ternari	12**](#4.-relacionals,-lògics-i-ternari)

[**5\. Casting i conversions	16**](#5.-casting-i-conversions)

[**6\. Scanner: llegir pel teclat	19**](#6.-scanner:-llegir-pel-teclat)

[**7\. Consola: eixida amb format i errors d'entrada	23**](#7.-consola:-eixida-amb-format-i-errors-d'entrada)

[**8\. Math.random() i nombres aleatoris	27**](#8.-math.random\(\)-i-nombres-aleatoris)

[**9\. Mètodes útils de String	30**](#9.-mètodes-útils-de-string)

[**10\. Repàs: la caixa que no cabia	33**](#10.-repàs:-la-caixa-que-no-cabia)

# 

# **1\. Variables i tipus primitius** {#1.-variables-i-tipus-primitius}

## **📬 La idea en una frase**

Les variables són caixes etiquetades en la memòria de l'ordinador, i Java et oferix 8 tamanys de caixa (els tipus primitius) perquè tries el que millor li va a cada dada.

En unitats anteriors, el teu programa només cridava text per la consola. Ara li donaràs memòria: guardarà la teua edat, el teu nom, la teua nota mitjana i fins i tot si tens gana. I per a triar bé la caixa de cada dada, primer has de conéixer el catàleg del magatzem.

## **📦 La declaració: la recepta d'una caixa**

Per a crear una caixa (una variable) li dius a Java tres coses: el **tipus** (tamany i forma de la caixa), el **nom** (l'etiqueta) i el **valor** (el que fiques dins). La recepta és:

| tipo nombreDeLaCaja \= valorQueMetoDentro; |
| :---- |

Exemples reals:

| *int edad \= 25; // Caixa etiquetada "edad" amb un 25 dinsdouble precio \= 19.99; // Caixa amb decimalsString nombre \= "María"; // Caixa màgica que guarda textboolean hambre \= true; // Caixa de vertader/fals (ara mateix: true)* |
| :---- |

💡 **Detall pràctic:** les variables es diuen així perquè... ¡varien\! Pots canviar el seu contingut quan vulgues. int edad \= 25; i, el dia del teu aniversari, edad \= 26;. L'etiqueta és la mateixa, el contingut canvia.

## **🏷️ Les regles de nomenclatura (o com no ficar-la)**

Java és tiquismiquis amb els noms de les caixes. Estes són les regles d'or:

* Poden portar lletres, números, \_ i \$. **Res d'espais**. (Java admet molts caràcters Unicode, però per convenció i per a evitar embolics s'usen lletres ASCII: evita ñ, ç o accents en els noms.)  
* **No poden començar amb número.** 1numero és il·legal; numero1 és legal. Com les matrícules dels cotxes.  
* **Les majúscules importen**: edad, Edad i EDAD són tres caixes distintes. Com etiquetar "Zapatos", "zapatos" i "ZAPATOS".  
* **No uses paraules reservades**: int, class, if, while... són de Java, no teues.  
* Usa **camelCase** per a les variables: miVariableEjemplo. Com un camell, amb gepa enmig.

| *// ✅ Correcte int numeroAlumnos \= 30; double notaMedia \= 7.5; // ❌ Incorrecte int 1numero \= 30; // comença per número double nota media \= 7.5; // espai en el nom int class \= 30; // paraula reservada* |
| :---- |

## **📐 Els 8 primitius: el catàleg de caixes**

Java té **8 tipus primitius**. Pensa en ells com caixes de distints tamanys al teu magatzem:

| Tipus | Mida | El que cap | Analogia |
| ----- | ----- | ----- | ----- |
| **byte** | 8 bits | \-128 a 127 | Caixa de llumins |
| **short** | 16 bits | \-32.768 a 32.767 | Caixa de sabates |
| **int** | 32 bits | \-2.147M a 2.147M | Caixa de mudança (la que més usaràs) |
| **long** | 64 bits | \-9 trilions a \+9 trilions | Contenidor de vaixell |
| **float** | 32 bits | Decimals de precisió simple | Got d'aigua |
| **double** | 64 bits | Decimals de precisió doble | Cubell d'aigua |
| **char** | 16 bits | Un sol caràcter Unicode | Una lletra en una caixa de sabates |
| **boolean** | 1 bit | true o false | Interruptor de llum |

I així es declaren cada un:

| *byte nivel \= 100;short poblacion \= 30000;int habitantes \= 1500000; // El más usadolong distancia \= 384400000L; // La L al final es obligatoriafloat precio \= 12.99f; // La f al final es obligatoriadouble pi \= 3.14159265359;char letra \= 'A'; // Comillas SIMPLES para charboolean esJavaDivertido \= true; // Esto es opinable* |
| :---- |

📝 **Nota:** usa int per a quasi tot el numèric enter. Només passa a long si vas a contar estrelles. Usa double per a decimals, a menys que estalviar memòria siga el teu fetitxe.

## **🎒 Quina caixa use per a cada dada?**

Triar el tipus correcte és com triar la maleta del viatge: ni un microbus per a dos persones, ni un Smart per a una família de cinc. La pràctica fa el mestre:

* **int**: edats, comptadors, puntuacions, quasi tot enter.  
* **double**: preus, notes mitjanes, temperatures, qualsevol decimal.  
* **boolean**: respostes de sí/no: "ha aprovat?", "hi ha connexió?".  
* **char**: una sola lletra: la inicial d'un nom, una qualificació 'A', 'B', 'C'.  
* **long**: nombres astronòmics, mil·lisegons, identificadors gegants.

⚠️ **Advertència:** quan dubtes entre int i double, pensa: *esta dada pot portar decimals?* Si sí → double. Si no → int. Simple.

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** abans d'escriure codi, fes-te sempre la mateixa pregunta: *quina mena de dada és això i en quina caixa cap?* El 90% dels errors d'esta unitat vénen de ficar malament la caixa.

**Exercici: El guarda del magatzem**

Eres el guarda d'un magatzem de dades. Et donen estes declaracions i et pregunten: **quines compilen i quines no?** Marca les que fallarien i per què:

| *int a \= 150; // ¿compila?int b \= 10.5; // ¿compila?double c \= 7; // ¿compila?char d \= "A"; // ¿compila?boolean e \= "true"; // ¿compila?long f \= 3000000000L; // ¿compila?int g \= 3000000000; // ¿compila?* |
| :---- |

**🔄 Solució**

* int a \= 150; ✅ Compila. Un 150 cap de sobres en un int.  
* int b \= 10.5; ❌ **No compila.** Un int no admet decimals; això seria un double.  
* double c \= 7; ✅ Compila. Un enter cap dins d'un double (conversió implícita, ho veuràs en el punt 5).  
* char d \= "A"; ❌ **No compila.** char usa cometes simples 'A'; les dobles són per a String.  
* boolean e \= "true"; ❌ **No compila.** true sense cometes és el booleà; "true" amb cometes és text.  
* long f \= 3000000000L; ✅ Compila. La L li diu a Java "això és un long, no un int".  
* int g \= 3000000000; ❌ **No compila.** Tres mil milions no cap en un int (tope: 2.147M). Seria un long.

## **🎯 Mini-chequeig**

Posat a prova en 30 segons (les respostes estan amagades):

1. Quin tamany de caixa usaríes per a guardar el nombre d'habitants de la Terra (més de 8.000 milions)?  
2. Per què char letra \= "A"; no compila i char letra \= 'A'; sí?  
3. Quina és la diferència entre float i double en una frase?  
4. Per què Edad, edad i EDAD són tres variables distintes?

**🔄 Respostes**

1. **long** — més de 2.147 milions no cap en un int.  
2. Perquè char va amb **cometes simples** 'A' (un sol caràcter); les cometes dobles són per a String.  
3. El double té **doble precisió** (64 bits) i el float precisió simple (32 bits): el double guarda més decimals exactes.  
4. Perquè **les majúscules importen**: cada variació del nom és una caixa distinta al magatzem.

## **✅ Resum en 3 frases**

1. Una variable és una **caixa etiquetada** en memòria: tipus (tamany), nom (etiqueta) i valor (contingut).  
2. Java té **8 tipus primitius**, i triar el correcte (normalment int o double) és mitat examen.  
3. Les regles de nomenclatura (camelCase, sense espais, sense paraules reservades, majúscules que importen) t'estalvien errors de compilació tontos.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| Variable | Caixa etiquetada on guardes una dada que pot canviar |
| Tipus primitiu | Un dels 8 tipus bàsics de dades de Java |
| Declarar | Crear la variable: tipo nombre \= valor; |
| Literal | El valor escrit tal qual: 25, "María", true |
| camelCase | Convenció de noms: miVariableEjemplo |
| Paraula reservada | Paraula de Java que no pots usar com a nom |

# **2\. String, constants i final** {#2.-string,-constants-i-final}

## **📬 La idea en una frase**

String és una classe (no un primitiu) que guarda text, és immutable com una foto, i final és el superglue que converteix qualsevol caixa en una constant que no es pot tocar.

Abans vas vore les 8 caixes primitives. Però els programes també guarden text: noms, missatges, contrasenyes... Per a això existeix String. I quan vulgues que un valor no canvie mai, el declares final. Anem a les dos.

## **🔤 String: la caixa màgica que no és una caixa**

String **no és primitiu**: és una **classe**. Però es comporta tan natural que pareix primitiu. És com un amic que encaixa tan bé en el teu grup que jurares que és de la família.

| *String saludo \= "Hola, DAM"; // La forma normalString nombre \= new String("Ana"); // També es pot crear així (usa un constructor)* |
| :---- |

Fixa't en la segona línia: new String(...) és un **constructor**. Encara no estudies POO a fons (això arriba en posterior unitats), però ja pots instanciar objectes de classes predefinides com String. La primera línia és una drecera que Java et dona per a no escriure new String(...) cada volta.

💡 **Detall pràctic:** String va amb **cometes dobles** "...". Les cometes simples '...' són només per a char, un únic caràcter.

## **🧊 La immutabilitat: no toques, que es trenca**

Els String són **immutables**: una volta creats, no es poden canviar. Quan fas això:

| *String texto \= "Hola";texto \= texto \+ " mundo"; // Java NO modifica "Hola"* |
| :---- |

...en realitat Java tira el "Hola" a la brossa i crea un "Hola mundo" nou. El text original seguix ahí, congelat, per sempre. És com si cada volta que volgueres posar un cartell nou hagueres de cremar l'anterior.

⚠️ **Advertència:** esta immutabilitat és la raó per la qual comparar String amb \== és perillós. Comparar amb \== pregunta *"són el mateix objecte?"*, no *"tenen el mateix text?"*. Per a comparar contingut usa .equals().

## **🧲 \== vs .equals(): la trampa clàssica**

| *String a \= "Hello";String b \= "Hello";String c \= new String("Hello");System.out.println(a \== b); // trueSystem.out.println(a \== c); // falseSystem.out.println(a.equals(c)); // true* |
| :---- |

Per què a \== b dona true i a \== c dona false, si els tres textos són "Hello"?

* a i b apunten al **mateix objecte** en el "pool de Strings": Java reutilitza literals iguals.  
* c es va crear amb new String(...), així que és un objecte **nou i distint**.  
* \== compara **referències** (són la mateixa caixa?); .equals() compara **contingut** (tenen el mateix dins?).

⚠️ **Advertència:** regla d'or: **els String sempre es comparen amb .equals()**. Si uses \==, tard o d'hora et mossegarà en un examen.

## **🔒 Constants amb final: caixes amb superglue**

Les constants es declaren amb final. Una volta que fiques alguna cosa ahí dins, no ix ni amb palanca:

| *final double IVA \= 0.21;final int MAXIMO\_INTENTOS \= 3;final String NOMBRE\_APP \= "Gestión DAW";IVA \= 0.10; // ERROR de compilació: ¡no pots reasignar una constant\!* |
| :---- |

Per convenció, les constants s'escriuen **EN\_MAJÚSCULES\_AMB\_GUIONS\_BAIXOS**, com si estigueren cridant "¡SOC IMMUTABLE\!". Això li diu a qualsevol programador (inclòs el teu jo del futur) que eixe valor no s'ha de tocar.

💡 **Detall pràctic:** per què usar constants i no escriure el número directament? Perquè si l'IVA canvia demà, edites **una línia**, no les 50 on vas usar el 0.21. Això és el que s'anomena *mantindre el codi*.

## **🏫 Exemple guiat: la factura que no es pot tocar**

Anem a muntar un mini-programa que calcula el preu final d'un producte amb IVA. La màgia: l'IVA és final i el nom de l'app també.

| public class Factura {  public static void main(String\[\] args) {    final double IVA \= 0.21;    final String NOMBRE\_APP \= "Factura Express";    double precioBase \= 50.0;    double ivaAplicado \= precioBase \* IVA;    double precioFinal \= precioBase \+ ivaAplicado;    System.out.println(NOMBRE\_APP \+ " \-- precio base: " \+ precioBase \+ "€");    System.out.println("IVA (" \+ (IVA \* 100) \+ "%): " \+ ivaAplicado \+ "€");    System.out.println("Total: " \+ precioFinal \+ "€");  }} |
| :---- |

**Eixida:**

| Factura Express \-- precio base: 50.0€IVA (21.0%): 10.5€Total: 60.5€ |
| :---- |

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** quan vages \== amb dos String, sospita. Pregunta't primer: *estan comparant referències o contingut?*

**Exercici: Què imprimeix este embolic de Strings?**

Sense executar, digues què imprimeix exactament este codi:

| String x \= "Java";String y \= "Java";String z \= new String("Java");System.out.println(x \== y);System.out.println(x \== z);System.out.println(x.equals(z)); |
| :---- |

**🔄 Solució**

Imprimeix true, false i true.

* x \== y → **true**: els dos literals apunten al mateix objecte del pool de Strings.  
* x \== z → **false**: z és un objecte nou creat amb new, no compartix referència.  
* x.equals(z) → **true**: el contingut és el mateix. equals compara text, no referències.

Clàssic d'examen. Si l'encertes a la primera, esta unitat la portes bé.

## **🎯 Mini-chequeig**

1. És String un tipus primitiu? Per què?  
2. Què significa que un String siga immutable?  
3. Què passa si intentes reasignar una variable declarada com final?  
4. Per què es comparen els String amb .equals() i no amb \==?

**🔄 Respostes**

1. **No**, és una **classe**. Es comporta com primitiu però té mètodes i es crea amb new (encara que Java et dona la drecera dels literals).  
2. Que una volta creat, el seu valor **no es pot modificar**: cada "canvi" crea un String nou.  
3. Error de **compilació**. final és el superglue: el que entra, no ix.  
4. Perquè \== compara **referències** (mateix objecte?) i .equals() compara **contingut** (mateix text?), que és el que normalment vols.

## **✅ Resum en 3 frases**

1. String és una **classe** que guarda text entre cometes dobles i és **immutable**: cada canvi crea un objecte nou.  
2. Els String es comparen amb **.equals()**, mai amb \== (que només compara referències i et dona sorpreses).  
3. final converteix una variable en **constant** (per convenció, en MAJÚSCULES), i el compilador s'enfada si intentes canviar-la.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| String | Classe de Java que guarda cadenes de text |
| Immutable | Que no es pot modificar una volta creat |
| final | Modificador que converteix una variable en constant |
| Constructor | El mecanisme que crea un objecte (new String(...)) |
| Pool de Strings | Zona on Java reutilitza literals iguals |
| .equals() | Mètode que compara el contingut de dos objectes |

# **3\. Operadors aritmètics** {#3.-operadors-aritmètics}

## **📬 La idea en una frase**

Els operadors aritmètics (+, \-, \*, /, %) són les màquines de pesos del gimnàs de dades: transformen les teues variables, i la divisió entera i la precedència són les trampes que separen els que saben dels que improvisen.

Tindre variables està molt bé, però no serveixen de res si no fas coses amb elles. Benvingut al gimnàs: suaràs amb els cinc exercicis bàsics i descobriràs per què 10 / 3 no és el que tu creus.

## **💪 El dia al gimnàs: els 5 exercicis bàsics**

| Operador | Exercici | Exemple |
| ----- | ----- | ----- |
| \+ | Press de banca | 5 \+ 3 \= 8 |
| \- | Curl de bíceps | 5 \- 3 \= 2 |
| \* | Sentadilla | 5 \* 3 \= 15 |
| / | Pes mort | 10 / 3 \= 3 (enters) o 10.0 / 3 \= 3.333... |
| % | L'odiat abdominal | 10 % 3 \= 1 (el reste de 10/3) |

| *int a \= 10;int b \= 3;double c \= 10.0;System.out.println(a / b); // 3 (divisió entera)System.out.println(a % b); // 1 (el reste)System.out.println(c / b); // 3.333... (divisió real)System.out.println((double) a / b); // 3.333... (obligues decimal)* |
| :---- |

💡 **Detall pràctic:** el **mòdul** (%) no és per a avorrits: et diu si un nombre és parell (numero % 2 \== 0), repartix torns, dona voltes als rellotges i alimenta un munt de jocs. Sense % no existiria res cíclic.

## **⚠️ La divisió entera mata**

**Si divideixes dos enters, Java et retorna un enter.** Punt. Els decimals es truncaren sense pietat:

| *int alumnos \= 17;int grupos \= 5;System.out.println(alumnos / grupos); // 3 \-- Java diu que cada grup té 3 alumnes* |
| :---- |

Per a Java, 17 dividit entre 5 són **3**. Ni 3.4 ni 3.5: 3\. Si vols decimals, almenys un dels dos operands ha de ser double (o fer un casting, que veuràs en el punt 5).

⚠️ **Advertència:** este és un dels errors més rendibles per a un examen. 5 / 2 és 2\. 5 / 2.0 és 2.5. (double) 5 / 2 és 2.5. Memoritza-ho com un mantra.

## **🎭 Precedència: la llei del menjador**

Qui se serveix primer en el menjador de les expressions? Hi ha un ordre estricte:

| *int resultado \= 2 \+ 3 \* 4; // 14 \-- la multiplicació es cola abansint conParentesis \= (2 \+ 3) \* 4; // 20 \-- els parèntesis tenen passe VIP* |
| :---- |

**La llei del menjador:**

1. **Parèntesis ()** — passe VIP, van els primers.  
2. **Multiplicació, divisió i mòdul \* / %** — els populars.  
3. **Suma i resta \+ \-** — els normals, els últims.

📝 **Nota:** i quan dubtes, **posa parèntesis**. (a \+ b) \* (c \- d) és molt més llegible que confiar en la teua memòria de la precedència. Els parèntesis no dolen i el que llegeix el teu codi (el teu jo del futur) t'ho agrairà.

## **🌀 Assignació composta: la drecera peresosa**

Escriure x \= x \+ 5 és tan verbós... Per sort, Java té els **operadors d'assignació composta**, una aixeta d'aigua al sofà per a no anar a la cuina:

| *int x \= 10;x \+= 5; // x \= 15 (x \= x \+ 5, però més cool)x \-= 3; // x \= 12x \*= 2; // x \= 24x /= 4; // x \= 6x %= 3; // x \= 0* |
| :---- |

## **💪 \++ i \--: flexions per a variables**

Sumar o restar 1 és tan comú que Java té el seu propi operador: \++ (increment) i \-- (decrement). Però compte, que tenen dos cares:

| *int a \= 5;int b \= a++; // POST: primer usa a (5), després incrementa → b \= 5, a \= 6int c \= \++a; // PRE: primer incrementa, després usa → a \= 7, c \= 7* |
| :---- |

* **Post-increment (a++)**: "usa i després puja".  
* **Pre-increment (++a)**: "puja i després usa".

⚠️ **Advertència:** regla d'or: si uses \++ o \-- *dins* d'una expressió complicada, estaràs escrivint codi que ni tu entendràs en una setmana. Usa'ls sols, en la seua pròpia línia. En els exàmens apareixen les trampes, i ací tens la prova.

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** desglossa l'expressió pas a pas. Quin valor té cada variable en cada moment? Anota-ho, no ho faces de memòria.

**Exercici: l'acròbata de les variables**

Sense executar, calcula quant val tot ací:

| int x \= 3;int y \= x++ \+ \++x;System.out.println("x \= " \+ x \+ ", y \= " \+ y); |
| :---- |

**🔄 Solució**

Imprimeix x \= 5, y \= 8\. Pas a pas:

1. x \= 3\.  
2. x++ — POST: usa x (3), després incrementa x a 4\. El valor de x++ és **3**.  
3. \++x — PRE: x val 4 ara; l'incrementa a **5** i eixe és el seu valor.  
4. y \= 3 \+ 5 \= 8\.  
5. Resultat: x \= 5, y \= 8\.

Als programadors professionals també els costa. Per això quasi ningú escriu això en producció... però en els exàmens, ¡ai, apareix\!

## **🎯 Mini-chequeig**

1. Quant val int r \= 10 / 3? I double r \= 10 / 3?  
2. Què fa l'operador % i per a què serveix saber si n % 2 \== 0?  
3. Quin és el resultat de 2 \+ 3 \* 4 \- 1?  
4. Diferència entre a++ i \++a en una frase.

**🔄 Respostes**

1. int r \= 10 / 3 val **3** (divisió entera trunca). double r \= 10 / 3 també val **3.0**: la divisió es fa primer amb enters i després es guarda. Per a decimals necessites 10 / 3.0 o (double) 10 / 3\.  
2. El % dona el **reste** de la divisió. n % 2 \== 0 és la prova universal de paritat: si el reste és 0, n és parell.  
3. **13**: primer 3 \* 4 \= 12, després 2 \+ 12 \- 1 \= 13\. La multiplicació mana.  
4. a++ **usa** el valor actual i després incrementa; \++a **incrementa** primer i després usa el nou.

## **✅ Resum en 3 frases**

1. Els operadors \+ \- \* / % transformen les teues dades, i la **divisió entera** trunca els decimals si tots dos operands són enters.  
2. La **precedència** seguix la llei del menjador (parèntesis → \* / % → \+ \-), i els parèntesis sempre són el pla B segur.  
3. \+=, \-=, \++ i \-- són dreceres perillosament còmodes: usa-les soles i no dins d'expressions enrevessades.

 🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| Operador aritmètic | \+ \- \* / %: les operacions matemàtiques de Java |
| Divisió entera | Divisió de dos enters que trunca els decimals |
| Mòdul | %, el reste d'una divisió |
| Precedència | L'ordre en què Java avalua els operadors |
| Assignació composta | Drecera com x \+= 5 (= x \= x \+ 5\) |
| Increment | \++/--: sumar o restar 1, amb cara pre i post |

# **4\. Relacionals, lògics i ternari** {#4.-relacionals,-lògics-i-ternari}

## **📬 La idea en una frase**

Els operadors relacionals (==, \!=, \<, \>, \<=, \>=) comparen valors i retornen un boolean; els lògics (&&, ||, \!) combinen booleans; i el ternari (? :) resumix una decisió en una sola línia.

Les teues variables ja saben sumar i restar. Ara aprendran a **jutjar**: "eres major d'edat?", "tens entrada I diners?", "eres el amo O un convidat?". Benvingut al club de les decisions.

## 

## **⚖️ Relacionals: el jutge de la discussió**

Els operadors relacionals sempre retornen un boolean: true o false. Són el jutge que dicta sentència sobre la relació entre dos valors:

| *int edad \= 18;boolean puedeVotar \= edad \>= 18; // trueboolean tieneDescuento \= edad \< 12 || edad \> 65; // falseboolean noEsEl \= edad \!= 18; // false* |
| :---- |

| Operador | Significat | Exemple (edad \= 18\) |
| ----- | ----- | ----- |
| \== | Igual que | edad \== 18 → true |
| \!= | Distint de | edad \!= 18 → false |
| \> | Major que | edad \> 21 → false |
| \< | Menor que | edad \< 21 → true |
| \>= | Major o igual | edad \>= 18 → true |
| \<= | Menor o igual | edad \<= 18 → true |

⚠️ **Advertència:** **\= no és \==.** \= assigna ("guarda este valor en esta caixa"), \== compara ("són iguals?"). Confondre'ls és l'error més clàssic de la història de la programació. És com confondre "posa la taula" amb "està posada la taula?".

## **🚪 Lògics: el porter del club**

Els operadors lògics combinen booleans per a prendre decisions compostes. Són el porter del club nocturn:

* **&& (AND)**: Tens més de 18 **I** tens entrada? Les dos condicions s'han de complir.  
* **|| (OR)**: Tens més de 18 **O** eres l'amo? Basta que es complisca una.  
* **\! (NOT)**: **NO** tens menys de 18? Niega la condició.

| *int edad \= 18;boolean mayorEdad \= true;boolean tieneEntrada \= false;boolean entra \= mayorEdad && tieneEntrada; // false (falta l'entrada)boolean entraVip \= mayorEdad || tieneEntrada; // true (basta ser major d'edat)boolean noEsMenor \= \!(edad \< 18); // true (nega que siga menor)* |
| :---- |

## **⚡ Curtcircuit: el porter que no mira**

Ací ve el truc del club més rendible de Java: el **curtcircuit**.

* Amb &&, si el primer és false, l'expressió ja és false i **Java ni es molesta a avaluar el segon**.  
* Amb ||, si el primer és true, l'expressió ja és true i tampoc mira el segon.

| *int x \= 5;boolean resultado \= (x \> 10) && (++x \> 0); // false, i x seguix sent 5System.out.println(x); // 5 \-- el \++x mai no es va executar* |
| :---- |

💡 **Detall pràctic:** el curtcircuit també et protegix. Si escrius (algo \!= null) && algo.metodo(), Java no cridarà el mètode si algo és null, evitant un crash al teu programa.

## **🎚️ El ternari: el bouncer del club**

Quan la decisió és "si passa això, missatge A; si no, missatge B", el **operador ternari** ho resumix en una línia. És un if-else de butxaca (els if de veritat arriben en la U04):

| int edad \= 17;String mensaje \= (edad \>= 18) ? "Pasa, joven" : "Vuelve cuando crezcas"; |
| :---- |

L'estructura és: condició ? valorSiTrue : valorSiFalse.

| int nota \= 7;String resultado \= nota \>= 5 ? "Aprobado" : "Suspenso"; |
| :---- |

## **🏫 Exemple guiat: el porter del club**

Anem a muntar el control d'accés d'un club amb tot el que has après:

| public class ClubNoche {  public static void main(String\[\] args) {    int edad \= 19;    boolean tieneEntrada \= true;    boolean esVip \= false;    boolean puedeEntrar \= (edad \>= 18) && (tieneEntrada || esVip);    String mensaje \= puedeEntrar ? "¡Pasa, disfruta\!" : "Fuera de aquí, pequeñín";    System.out.println(mensaje);    int golesLocal \= 2;    int golesVisitante \= 2;    String resultado \= golesLocal \> golesVisitante ? "Gana el local"        : golesLocal \< golesVisitante ? "Gana el visitante" : "Empate";    System.out.println("Resultado: " \+ resultado);  }} |
| :---- |

**Eixida**:

| ¡Pasa, disfruta\!Resultado: Empate |
| :---- |

Fixa't en la segona decisió: els ternaris es poden **encadenar** (un ternari dins d'un altre) per a gestionar tres casos. Llegible i compacte.

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** en una expressió amb && i ||, pregunta sempre: *i si el primer ja decideix?* Eixe és el curtcircuit.

**Exercici: el detectiu de booleans**

Sense executar, calcula el valor de cada variable:

| int n \= 10;boolean a \= (n \> 5) && (n \< 20); *// ¿?*boolean b \= (n \> 15) || (++n \== 11); *// ¿?*boolean c \= \!(n \== 10) && (n % 2 \== 0); *// ¿?*System.out.println(a);System.out.println(b);System.out.println(c);System.out.println(n); |
| :---- |

**🔄 Solució**

Imprimeix true, true, false i 11\.

1. a: 10 és major que 5 **i** menor que 20 → **true**.  
2. b: 10 no és major que 15, així que Java avalua el || amb la segona part: \++n \== 11 → incrementa n a 11 i compara: 11 \== 11 → **true**. (El || només curtcircuita quan la primera és true; ací era false.)  
3. c: \!(n \== 10\) amb n \= 11 → \!false → true; && amb 11 % 2 \== 0 → false. Resultat: **false**.  
4. n va acabar en **11** pel \++n de la línia 2\.

## **🎯 Mini-chequeig**

1. Què retorna sempre un operador relacional?  
2. Quina és la diferència entre && i || en una frase?  
3. Què és el curtcircuit i quan s'activa?  
4. Escriu el ternari que assigne "major" o "menor" a una variable segons una edat.

**🔄 Respostes**

1. Un **boolean**: true o false.  
2. && exigeix que **totes** les condicions es complisquen; || es conforma amb **una sola**.  
3. Quan la primera condició ja decideix el resultat, Java **no avalua les altres**: amb && si la primera és false, amb || si la primera és true.  
4. String resultado \= edad \>= 18 ? "major" : "menor";

## **✅ Resum en 3 frases**

1. Els **relacionals** (==, \!=, \<, \>, \<=, \>=) comparen i retornen un boolean, i \= mai no s'usa per a comparar.  
2. Els **lògics** (&&, ||, \!) combinen condicions i pateixen **curtcircuit**: si la primera ja decideix, no miren les altres.  
3. El **ternari** (condició ? A : B) resumix una decisió de dos camins en una línia.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| Operador relacional | Compara dos valors i dona true/false |
| Operador lògic | Combina booleans: &&, ||, \! |
| Curtcircuit | Deixar d'avaluar quan la primera condició ja decideix |
| Ternari | condició ? valor1 : valor2, un if-else en una línia |
| Booleà | Tipus amb només dos valors: true o false |

# **5\. Casting i conversions** {#5.-casting-i-conversions}

## **📬 La idea en una frase**

El casting converteix un valor d'un tipus a un altre: la conversió implícita (widening) la fa Java sol i sense pèrdues, mentre que l'explícita (narrowing) la forces tu amb (tipo) i pots perdre dades pel camí.

Al magatzem de la memòria tens caixes de tots els tamanys. A voltes necessites ficar el contingut d'una caixa gran en una de menuda... i això, o ho fas amb compte, o perds coses pel camí. Benvingut a l'art d'apretar.

## **🪜 Conversió implícita (widening): mudar-se a una caixa més gran**

Quan el destí és una caixa **més gran**, Java ho fa sol, sense preguntar. És com canviar d'un pis a una mansió: et mudes i no perds res. Això s'anomena *widening* (eixamplar):

| *int num \= 100;long numLong \= num; // Cap de sobres, sense pèrduesdouble numDouble \= num; // 100 → 100.0, també sense problemes* |
| :---- |

La cadena natural d'eixamplament entre tipus numèrics és:

**byte → short → int → long → float → double**

Qualsevol tipus pot passar al que està a la seua dreta sense que es perda ni un bit. Java somriu i et deixa.

## **📉 Conversió explícita (narrowing): la maleta XXL en un Smart**

Quan el destí és una caixa **més menuda**, Java es nega. Has d'empènyer a la força amb un casting explícit: poses el (tipo) davant i reses:

| *double precio \= 19.99;int entero \= (int) precio; // Apretes 19.99 en un intSystem.out.println(entero); // 19 \-- els cèntims desapareixen en l'oblit* |
| :---- |

Això s'anomena *narrowing* (estrényer). Java t'obliga a escriure el (tipo) perquè és perillós: estàs dient "confia en mi, sé el que faig". I si t'equivoques, les dades es perden en silenci.

💡 **Detall pràctic:** el casting sobre un double **trunca**, no redoniga. (int) 19.99 dona 19 i (int) 19.5 també dona 19\. Si vols redonir, usa Math.round() (ho veuràs en el punt 7).

## **🪓 El truncament: el cèntim oblidat**

L'exemple del preu és l'advertència clàssica:

| *double precio \= 9.99;int precioEntero \= (int) precio;System.out.println(precioEntero); // 9 \-- t'acaben de llevar 0.99€* |
| :---- |

No és redonir: és **tallar amb destral**. Java tira la part decimal sense mirar si era 0.1 o 0.9.

⚠️ **Advertència:** abans d'estrényer una caixa, pregunta't sempre: *cap el valor?* Si el número és major que el màxim de la caixa destí, no només perdràs decimals: el valor es **desbordarà** a una cosa completament absurda.

## **💥 El desbordament: quan apretes de més**

Què passa si intentes ficar un elefant (300) en una caixa de llumins (byte, màxim 127)?

| *int grande \= 300;byte pequeno \= (byte) grande;System.out.println(pequeno); // 44 \-- ¡quaranta-quatre\!?* |
| :---- |

D'on ix el 44? En binari, 300 és 100101100\. Un byte només guarda 8 bits, així que es truncaren els sobrants i es queda amb 00101100, que és... 44\. És com ficar un elefant en un Mini Cooper i que isca un gos salchicha: el resultat tècnicament és un animal, però no el que vas ficar.

⚠️ **Advertència:** el desbordament no dona error. Java no t'avisa. El programa seguix corrent amb un valor absurd. Per això el casting explícit és responsabilitat teua: comprova sempre que el valor cap.

## **🏫 Exemple guiat: el guarda del magatzem**

Este mini-programa recorre tota la cadena de conversions, perquè vages quan Java t'acompanya i quan t'obliga a firmar:

| public class CadenaDeCajas {  public static void main(String\[\] args) {    int a \= 10;    double b \= a; *// implícita: int → double, sense llàgrimes*    int c \= (int) b; *// explícita: double → int, forçada*    byte d \= (byte) c; *// explícita: int → byte, cap de sobres*    System.out.println(b); *// 10.0*    System.out.println(c); *// 10*    System.out.println(d); *// 10*  }}public class Perdidas {  public static void main(String\[\] args) {    double nota \= 9.9;    int notaEntera \= (int) nota; *// 9 \-- adéu, dècimes*    int enorme \= 400;    byte pequeno \= (byte) enorme; *// desbordament silenciós*    System.out.println(notaEntera); *// 9*    System.out.println(pequeno); *// \-112 (¡ni tan sols és 400\!)*  }} |
| :---- |

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** el casting amb (tipo) pot truncar i desbordar. Comprova sempre si el valor cap abans de forçar-lo.

**Exercici: seguix el guarda**

Sense executar, determina què imprimeix este programa:

| int a \= 10;double b \= a;int c \= (int) b;byte d \= (byte) c;System.out.println(d);int grande \= 300;byte pequeno \= (byte) grande;System.out.println(pequeno); |
| :---- |

**🔄 Solució**

Imprimeix 10 i 44\.

* El primer bloc és una cadena de conversions sense pèrdua: 10 → 10.0 → 10 → 10\. Imprimeix **10**.  
* El segon és el desbordament clàssic: 300 no cap en un byte (tope 127), es truncaren els bits sobrants i queda **44**. Com ficar un elefant en un Mini i que isca un gos salchicha.

## **🎯 Mini-chequeig**

1. Per què long x \= 100000; compila sense casting i int y \= (int) 100000.5; sí que necessita el (int)?  
2. Quant val (int) 7.99? I (int) 7.1?  
3. Què passa si converteixes 300 a byte?  
4. És el truncament el mateix que redonir?

**🔄 Respostes**

1. Perquè 100000 (un int) cap en un long sense pèrdues: és conversió **implícita**. Ficar un double amb decimals en un int és **estrényer** (narrowing), i Java t'obliga a escriure-ho amb (int).  
2. (int) 7.99 → **7** i (int) 7.1 → **7**. Trunca, no redoniga: la part decimal es tira sencera.  
3. Es **desborda** silenciosament i val **44**, sense error ni avís.  
4. **No.** El truncament talla la part decimal sempre; redonir puja o baixa segons el valor.

## **✅ Resum en 3 frases**

1. La conversió **implícita** (widening) cap a caixes més grans la fa Java sol i sense pèrdues.  
2. La conversió **explícita** (narrowing) la forces amb (tipo) i pot **truncar** els decimals o **desbordar** el valor.  
3. Abans d'estrényer, comprova sempre que el valor cap: Java no t'avisarà de les pèrdues.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| Casting | Convertir un valor d'un tipus a un altre |
| Widening | Eixamplar: a caixa més gran, sense pèrdues, automàtic |
| Narrowing | Estrényer: a caixa més menuda, amb (tipo) i possibles pèrdues |
| Truncament | Tallar la part decimal, sense redonir |
| Desbordament | El valor no cap i es converteix en una cosa absurda en silenci |
| (int) | El casting que força un valor decimal a enter |

# **6\. Scanner: llegir pel teclat** {#6.-scanner:-llegir-pel-teclat}

## **📬 La idea en una frase**

Scanner és la classe de Java que llegeix el que escrius pel teclat: instancies un objecte amb new Scanner(System.in) i li demanes dades amb nextInt(), nextDouble() o nextLine().

Fins ara, els teus programes eren uns cridaners: només escopien text a la consola. A partir d'este punt tindran oïdes. I amb oïdes arriben els programes de veritat: un conversor de temperatures que et pregunta els graus, una calculadora que rep números...

## **📖 El paquet: importar la llibreria**

Scanner no viu al centre de Java: viu en una llibreria (java.util). Per a usar-lo, la primera línia del teu archiu ha de ser:

| import java.util.Scanner; |
| :---- |

És com demanar en la biblioteca el llibre que vas a usar. Sense el import, Java et dirà que no coneix Scanner.

## **🏗️ Instanciar: el constructor**

Per a tindre un lector de teclat necessites **crear un objecte** de la classe Scanner. Això es fa amb new i un **constructor** (recorda el new String(...) del punt 2):

| Scanner sc \= new Scanner(System.in); |
| :---- |

* Scanner és la classe (el motle).  
* new Scanner(...) crea l'objecte (el constructor).  
* System.in és l'argument que li passes: "llegeix del teclat estàndard".

💡 **Detall pràctic:** el nom de la variable sol ser sc o teclado, per pura costum. Quan acabis d'usar el Scanner, és bona pràctica tancar-lo amb sc.close(), sobretot si el programa va a continuar fent coses rares.

## **🔢 Demanar dades: els mètodes next**

Una volta tens l'objecte sc, li demanes dades amb els seus mètodes. Cada mètode espera que escrigues i pulses Enter:

| import java.util.Scanner;public class PrimerEscucha {  public static void main(String\[\] args) {    Scanner sc \= new Scanner(System.in);    System.out.print("¿Cómo te llamas? ");    String nombre \= sc.nextLine(); *// llig una línia de text completa*    System.out.print("¿Cuántos años tienes? ");    int edad \= sc.nextInt(); *// llig un número enter*    System.out.print("¿Cuál es tu nota media? ");    double nota \= sc.nextDouble(); *// llig un número amb decimals*    System.out.println("Hola, " \+ nombre \+ ". Con " \+ edad \+ " años y un " \+ nota \+ " de media, vas sobrado.");    sc.close();  }} |
| :---- |

**Eixida d'exemple:**

¿Cómo te llamas? Ana  
¿Cuántos años tienes? 18  
¿Cuál es tu nota media? 9.5  
Hola, Ana. Con 18 años y un 9.5 de media, vas sobrado.

Els mètodes més usats:

| Mètode | Llig | Exemple |
| ----- | ----- | ----- |
| nextLine() | Una línia de text completa | String nombre \= sc.nextLine(); |
| next() | Només la següent paraula | String palabra \= sc.next(); |
| nextInt() | Un número enter | int edad \= sc.nextInt(); |
| nextDouble() | Un número amb decimals | double nota \= sc.nextDouble(); |
| nextBoolean() | true o false | boolean ok \= sc.nextBoolean(); |

## 

## **⚠️ El embolic de nextLine() després de nextInt()**

Este és l'error més odiat del Scanner, i apareix en tots els exàmens. Quan fas nextInt(), l'Enter que vas pulsar es queda *guardat* al buffer. Si després crides a nextLine(), eixa crida es menja l'Enter residual i et retorna una línia buida:

| *Scanner sc \= new Scanner(System.in);System.out.print("Edad: ");int edad \= sc.nextInt(); // escrius 18 i pulses EnterSystem.out.print("Nombre: ");String nombre \= sc.nextLine(); // ¡es salta la pregunta\! retorna ""* |
| :---- |

**La solució:** afegix un nextLine() extra (o usa next() per al text) just després del número:

| *int edad \= sc.nextInt();sc.nextLine(); // es menja l'Enter sobrantString nombre \= sc.nextLine(); // ara sí, llig el nom* |
| :---- |

⚠️ **Advertència:** memoritza el truc: *després d'un nextInt() / nextDouble(), inserta un nextLine() buit abans del següent nextLine().* És el guardià del buffer.

## **🏫 Exemple guiat: la calculadora de la propina**

Anem a usar el teclat per a una cosa útil: calcular quant deixar de propina.

| import java.util.Scanner;public class Propina {  public static void main(String\[\] args) {    Scanner sc \= new Scanner(System.in);    System.out.print("¿Cuánto vale la cuenta? ");    double cuenta \= sc.nextDouble();    System.out.print("¿Qué porcentaje de propina? ");    int porcentaje \= sc.nextInt();    double propina \= cuenta \* porcentaje / 100;    double total \= cuenta \+ propina;    System.out.println("Propina: " \+ propina \+ "€");    System.out.println("Total a pagar: " \+ total \+ "€");    sc.close();  }} |
| :---- |

**Eixida d'exemple:**

¿Cuánto vale la cuenta? 45.5  
¿Qué porcentaje de propina? 15  
Propina: 6.825€  
Total a pagar: 52.325€

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** quan combines nextInt() i nextLine(), recorda sempre l'Enter residual. Escriu-ho com un reflex: número → nextLine() buit → text.

**Exercici: el presentador amb trampa**

Este programa intenta saludar l'usuari... però alguna cosa falla. Sense executar, digues què ocorre i com ho arreglaries:

| Scanner sc \= new Scanner(System.in);System.out.print("Edad: ");int edad \= sc.nextInt();System.out.print("Nombre: ");String nombre \= sc.nextLine();System.out.println(nombre \+ " tiene " \+ edad \+ " años."); |
| :---- |

**🔄 Solució**

El problema és l'**Enter residual**: després de nextInt(), el nextLine() es menja l'Enter i nombre queda com text buit. El programa imprimiria una cosa com tiene 18 años.

La solució és afegir un nextLine() buit entre el número i el text:

| *int edad \= sc.nextInt();sc.nextLine(); // es menja l'Enter sobrantString nombre \= sc.nextLine(); // ara sí que llig el nom* |
| :---- |

## **🎯 Mini-chequeig**

1. Què fa la línia import java.util.Scanner;?  
2. Què fa new Scanner(System.in)?  
3. Quina és la diferència entre next() i nextLine()?  
4. Per què després d'un nextInt() cal posar un nextLine() buit?

**🔄 Respostes**

1. Importa la classe Scanner des de la llibreria java.util, per a poder usar-la.  
2. **Crea un objecte** de tipus Scanner que llegeix del teclat (System.in). És el constructor de la classe.  
3. next() llegeix **una sola paraula** (fins a un espai); nextLine() llegeix **tota la línia** fins a l'Enter.  
4. Perquè l'Enter que vas pulsar en nextInt() queda al buffer i el següent nextLine() se'l menja, retornant text buit.

## **✅ Resum en 3 frases**

1. Scanner és la classe per a llegir del teclat: la importes amb import, la instancies amb new Scanner(System.in) i demanes dades amb mètodes next....  
2. Cada tipus de dada té el seu mètode: nextInt(), nextDouble(), nextLine() per a text.  
3. Després d'un nextInt() o nextDouble(), un nextLine() buit es menja l'Enter residual: sense ell, la teua següent pregunta es saltarà.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| Scanner | Classe de java.util per a llegir dades de teclat |
| import | Línia que porta una classe des de la seua llibreria |
| Constructor | Mecanisme que crea l'objecte (new Scanner(...)) |
| System.in | El teclat estàndard, la font d'entrada |
| Buffer | Zona de memòria on queda l'Enter residual |
| Instanciar | Crear un objecte a partir d'una classe |

# **7\. Consola: eixida amb format i errors d'entrada** {#7.-consola:-eixida-amb-format-i-errors-d'entrada}

## **📬 La idea en una frase**

printf i String.format donen format a la teua eixida (decimals, amplària, alineació) en una línia, i conéixer els errors típics del Scanner t'estalvia els bugs més odiats de la unitat.

Anteriorment vas aprendre a llegir del teclat. Ara donaràs bellesa al que escrius i, de passada, blindaràs els teus programes contra les fallades més típiques d'entrada. Amb això tanques el cercle de la consola.

## **🖨️ Eixida amb format: System.out.printf**

System.out.println imprimeix tal qual. Per a controlar **com** es veu (decimals, amplària, farcit) tens printf (print formatted):

| *String nom \= "Ana";int edat \= 20;double nota \= 9.5;System.out.printf("Nom: %s, Edat: %d, Nota: %.2f%n", nom, edat, nota);// Nom: Ana, Edat: 20, Nota: 9,50* |
| :---- |

Cada %alguna\_cosa és un **forat** que s'ompli amb el valor que li segueix, en ordre. Els especificadors bàsics:

| Especificador | Tipus | Exemple |
| ----- | ----- | ----- |
| %s | String | "Hola %s" → "Hola Mario" |
| %d | Enter | "Edat: %d" → "Edat: 25" |
| %f | Decimal | "%.2f" → "19,99" |
| %c | Caràcter | "Inicial: %c" |
| %n | Salt de línia | (independent del sistema) |
| %b | boolean | "%b" → true |

💡 **Consell:** %n per als salts de línia en printf (no \\n): funciona igual a Windows, Linux i Mac. El \\n també val, però %n és l'opció "oficial".

### **Controlar els decimals i l'amplària**

| *double pi \= Math.PI;System.out.printf("2 decimals: %.2f%n", pi); // 3,14System.out.printf("4 decimals: %.4f%n", pi); // 3,1416System.out.printf("Amplària 10: %10.2f%n", pi); // 3,14System.out.printf("Esquerra: %-10.2f%n", pi); // 3,14* |
| :---- |

* %.2f → dos decimals.  
* %10.2f → amplària mínima de 10 caràcters, alineat a la dreta.  
* %-10.2f → el guió l'alinea a l'esquerra.

⚠️ **Advertència:** els decimals de printf utilitzen la **configuració regional** del teu sistema. En un ordinador amb locale espanyol, %.2f escriu 3,14 (coma); en un amb locale anglés, 3.14 (punt). No t'espantes si el resultat varia: és la màquina parlant en el seu idioma.

## **🧵 String.format: el mateix, però sense imprimir**

A vegades no vols imprimir en el moment, sinó **construir un text** amb format per a utilitzar-lo després (guardar-lo, concatenar-lo...). String.format fa exactament el mateix que printf, però **torna** la cadena en comptes d'imprimir-la:

| *String msg \= String.format("Benvingut, %s. Tens %d missatges nous.", "Carles", 3);System.out.println(msg);// Benvingut, Carles. Tens 3 missatges nous.* |
| :---- |

💡 **Consell:** utilitza String.format quan vulgues un text amb format com a **valor** (per a guardar-lo o usar-lo diverses vegades), i printf quan només vulgues escriure'l en pantalla.

## **💶 Números grans: NumberFormat**

Imprimir 1234567.89 sense format és lleig i difícil de llegir. NumberFormat aplica els separadors de milers i decimals del teu idioma:

| *import java.text.NumberFormat;import java.util.Locale;NumberFormat nf \= NumberFormat.getInstance(new Locale("es", "ES"));System.out.println(nf.format(1234567.89)); // 1.234.567,89NumberFormat moneda \= NumberFormat.getCurrencyInstance(new Locale("es", "ES"));System.out.println(moneda.format(12345.67)); // 12.345,67 €* |
| :---- |

* getInstance(locale) → format numèric amb separadors.  
* getCurrencyInstance(locale) → format de moneda (amb el símbol €).

📝 **Nota:** el Locale("es", "ES") li diu "parla com a Espanya": punt per als milers, coma per als decimals. Si no li passes locale, utilitza el del teu sistema.

## **🚨 Errors clàssics del Scanner (i els seus remeis)**

El Scanner és traïdor. Aquestes són les fallades que es repeteixen en cada examen i en cada programa de pràctiques:

### **1\. Oblidar el import java.util.Scanner;**

Sense la línia d'import, Java no coneix la classe i et llança un error de compilació. És la fallada més ximple i la més comuna.

### **2\. No tancar el Scanner: sc.close()**

Deixar el Scanner obert és de mala educació (i en programes llargs, pot deixar recursos sense alliberar). Tanca sempre en acabar:

| Scanner sc \= new Scanner(System.in); *// ... tot el teu codi ...* sc.close(); |
| :---- |

### **3\. Demanar un tipus i escriure'n un altre: InputMismatchException**

Si demanes un int i l'usuari escriu lletres, el programa **explota** amb InputMismatchException:

| *int edat \= sc.nextInt(); // l'usuari escriu "hola" → 💥 InputMismatchException* |
| :---- |

La solució robusta és **preguntar abans** amb hasNextInt() (o hasNextDouble(), hasNext()...):

| if (sc.hasNextInt()) {  int edat \= sc.nextInt();} else {  System.out.println("Això no és un número enter.");  sc.next(); *// descarta el text mal escrit*} |
| :---- |

⚠️ **Advertència:** hasNextInt() **no consumeix** la dada: només mira si el següent és un enter. Si no ho és, has de consumir el text brossa amb sc.next() abans de tornar a preguntar, o es quedarà allà per sempre.

### **4\. El problema del nextLine() després del nextInt() (RECORDATORI)**

L'Enter residual es queda en el buffer. Després d'un número, posa un nextLine() buit abans de demanar text.

## **🏫 Exemple guiat: el validador que no es trenca**

Un programa que demana una edat i no cau per molt que l'usuari escriga brossa:

| import java.util.Scanner;public class EdatSegura {  public static void main(String\[\] args) {    Scanner sc \= new Scanner(System.in);    int edat \= \-1;    while (edat \== \-1) {      System.out.print("Quants anys tens? ");      if (sc.hasNextInt()) {        edat \= sc.nextInt();      } else {        System.out.println("Això no és un número enter, intenta-ho una altra vegada.");        sc.next();      }    }    System.out.printf("Genial, %d anys i llest per a programar.%n", edat);    sc.close();  }} |
| :---- |

El bucle while repeteix la pregunta fins que l'usuari dona un enter. Amb hasNextInt() \+ sc.next() per a descartar la brossa, el programa és **a prova de bombes**.

## **⭐ Sé el Codi, my friend...**

🕶️ **Don Tip:** la regla d'or: printf per a imprimir amb format, String.format per a guardar el text amb format, hasNextInt() abans de cada nextInt() si l'usuari pot equivocar-se.

**Exercici: el formatador misteriós**

Què imprimeix exactament aquest programa?

| public class Formatacio {    public static void main(String\[\] args) {        int hores \= 5;        double preu \= 12.5;        System.out.printf("Treball: %d hores a %.1f €/hora \= %.2f €%n",                hores, preu, hores \* preu);    }} |
| :---- |

**🔄 Solució**

Imprimeix:

| Treball: 5 hores a 12,5 €/hora \= 62,50 € |
| :---- |

El %d ompli amb l'enter, %.1f amb un decimal, i %.2f amb dos. Els tres valors (5, 12.5 i 62.5) es col·loquen en els forats en ordre. El %n afig el salt de línia final. (Els decimals amb coma o punt depenen del locale del sistema.)

## **🎯 Mini-chequeig**

1. Quina diferència hi ha entre System.out.printf i String.format?  
2. Quin especificador utilitzaries per a un double amb dos decimals?  
3. Quina excepció llança sc.nextInt() si l'usuari escriu lletres?  
4. Com evites que sc.nextInt() explote amb una entrada incorrecta?

**🔄 Respostes**

1. Tots dos apliquen el mateix format, però printf ho imprimeix en pantalla i String.format **torna** el text format per a utilitzar-lo com a valor.  
2. %.2f.  
3. InputMismatchException.  
4. Comprovant abans amb sc.hasNextInt() i, si no és enter, descartant la brossa amb sc.next() abans de tornar a preguntar.

## **✅ Resum en 3 frases**

1. **printf i String.format** donen format a l'eixida amb especificadors (%d, %s, %.2f) i control de decimals i amplària.  
2. **NumberFormat** formateja números grans i monedes amb els separadors del teu idioma.  
3. El Scanner es trenca amb InputMismatchException si l'usuari escriu malament: pregunta abans amb **hasNextInt()** i tanca sempre amb sc.close().

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| printf | Imprimeix amb format (%d, %s, %.2f...) |
| String.format | Torna un text amb format, sense imprimir-lo |
| Especificador | El %alguna\_cosa que marca on i com es col·loca un valor |
| NumberFormat | Formateja números i monedes amb separadors locals |
| InputMismatchException | Explosió en demanar un tipus i rebre'n un altre |
| hasNextInt() | Pregunta si el que ve és un enter, sense consumir-lo |

# **8\. Math.random() i nombres aleatoris** {#8.-math.random()-i-nombres-aleatoris}

## **📬 La idea en una frase**

Math.random() retorna un nombre aleatori entre 0.0 (inclòs) i 1.0 (exclòs), i amb la fórmula (int)(Math.random() \* (max \- min \+ 1)) \+ min el converteixes en un dau, una loteria o qualsevol nombre que necessites.

Els teus programes ja escolten (Scanner) i calculen (operadors). Ara jugaran: als daus, a la loteria, a endevinar nombres. I per a això necessites el casino de Java: Math.random().

## **🎲 El casino: què retorna Math.random()**

Math.random() és un **mètode estàtic** de la classe Math. Retorna un nombre entre 0.0 i 1.0... amb un detall important: **l'1.0 no està inclòs**. És com quan et toca la loteria però no.

| *double aleatorio \= Math.random(); // Entre 0.0 y 0.999999...System.out.println(aleatorio); // Per exemple: 0.473821...* |
| :---- |

💡 **Detall pràctic:** Math.random() és un mètode **estàtic**: no necessites crear un objecte de Math per a cridar-lo. Escrius Math.random() directament i ja està. És una crida de classe, no d'objecte.

## **🎯 La fórmula: de 0.0-1.0 al que tu vulgues**

Un nombre entre 0 i 1 està molt bé, però tu vols un dau, un número de la loteria, un percentatge... Ací va l'escala:

| *double aleatorio \= Math.random(); // Entre 0.0 y 0.999999...int deCeroANueve \= (int) (Math.random() \* 10); // Entre 0 y 9int dado \= (int) (Math.random() \* 6) \+ 1; // Entre 1 y 6 (como un dado)* |
| :---- |

Veus el patró? El truc està en multiplicar i sumar:

* Math.random() \* 6 → nombre entre 0.0 i 5.999...  
* (int) el trunca → entre 0 i 5  
* \+ 1 el desplaça → entre 1 i 6 ✅

**La fórmula universal** per a un nombre entre min i max (tots dos inclosos):

| int numero \= (int) (Math.random() \* (max \- min \+ 1)) \+ min; |
| :---- |

Exemple del 5 al 10:

| *int entreCincoYDiez \= (int) (Math.random() \* 6) \+ 5; // 5, 6, 7, 8, 9 o 10* |
| :---- |

📝 **Nota:** memoritza la fórmula com un mantra: (max \- min \+ 1\) dona la mida del ventall, i \+ min el col·loca on comença. No hi ha més secret.

## **🧰 Altres ferramentes del casino: la classe Math**

Math no és només la ruleta: és tota la sala de màquines. Algunes joies que usaràs a diari:

| *double pi \= Math.PI; // 3.141592653589793 \-- constantdouble potencia \= Math.pow(2, 10); // 1024.0 \-- 2 elevat a 10double raiz \= Math.sqrt(144); // 12.0double absoluto \= Math.abs(-7); // 7.0double redondeo \= Math.round(4.6); // 5.0double techo \= Math.ceil(4.1); // 5.0double suelo \= Math.floor(4.9); // 4.0int maximo \= Math.max(3, 9); // 9int minimo \= Math.min(3, 9); // 3* |
| :---- |

💡 **Detall pràctic:** tots estos són **mètodes estàtics** de la classe Math (i Math.PI una constant estàtica): es criden amb Math.nombre, sense crear objectes. A l'examen, la pregunta típica és "com redoneix 4.6 sense truncar-lo?" → Math.round(4.6).

## **🏫 Exemple guiat: el joc dels daus**

Anem a muntar un dau de veritat, amb dos tirades, suma i veredicte:

| public class JuegoDeDados {    public static void main(String\[\] args) {        int dado1 \= (int) (Math.random() \* 6) \+ 1;        int dado2 \= (int) (Math.random() \* 6) \+ 1;        int suma \= dado1 \+ dado2;        System.out.println("Dado 1: " \+ dado1);        System.out.println("Dado 2: " \+ dado2);        System.out.println("Suma: " \+ suma);        boolean esPar \= suma % 2 \== 0;        String mensaje \= esPar ? "Suma par \-- ganas" : "Suma impar \-- pierdes";        System.out.println(mensaje);    }} |
| :---- |

**Eixida possible:**

Dado 1: 4  
Dado 2: 6  
Suma: 10  
Suma par — ganas

Cada execució dona un resultat distint: això és el divertit (i a voltes frustrant) dels aleatoris.

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** recorda sempre *truncar abans de sumar*: (int)(... \* 6\) \+ 1, mai (int)(... \* 6 \+ 1). Si sumes abans del casting, el rang canvia i els teus daus mentiran.

**Exercici: el dau que menteix**

Quin rang de nombres produïx cadascuna d'estes tres línies? Quina és la que dona un dau de veritat (1 a 6)?

| int a \= (int) (Math.random() \* 6);int b \= (int) (Math.random() \* 6) \+ 1;int c \= (int) (Math.random() \* 7); |
| :---- |

**🔄 Solució**

* a: Math.random() \* 6 va de 0.0 a 5.999... → després del (int), **0 a 5**.  
* b: la línia anterior més 1 → **1 a 6**. ✅ És el dau de veritat.  
* c: Math.random() \* 7 va de 0.0 a 6.999... → després del (int), **0 a 6** (¡set cares, i el 0 no existeix en un dau\!).

La diferència entre b i c és subtil però decisiva: la \+ 1 ha d'anar **fora** del casting.

## **🎯 Mini-chequeig**

1. Quin rang exacte retorna Math.random()?  
2. Escriu la línia per a obtindre un nombre aleatori entre 5 i 10\.  
3. Què retorna (int) (Math.random() \* 100)? I si li sumes 1?  
4. És Math.PI un mètode o una constant? I Math.round?

**🔄 Respostes**

1. Entre 0.0 (inclòs) i 1.0 (**exclòs**): de 0.0 a 0.999....  
2. int numero \= (int) (Math.random() \* 6\) \+ 5; — ventall de 6 valors començant en 5\.  
3. (int) (Math.random() \* 100\) dona **0 a 99**; amb \+ 1 dona **1 a 100**.  
4. Math.PI és una **constant** (sense parèntesis); Math.round és un **mètode** (amb parèntesis).

## **✅ Resum en 3 frases**

1. Math.random() retorna un nombre entre 0.0 i 1.0 (sense incloure l'1), i es combina amb multiplicacions i casting per a generar el rang que vulgues.  
2. La fórmula (int)(Math.random() \* (max \- min \+ 1)) \+ min és la teua navalla suïssa per a qualsevol nombre aleatori.  
3. Math és la sala de màquines estàtica: PI, pow, sqrt, abs, round... tots es criden amb Math.nombre, sense crear objectes.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| Math.random() | Nombre aleatori entre 0.0 i 1.0 (l'1 exclòs) |
| Mètode estàtic | Es crida amb Math.nombre(...), sense crear objectes |
| Math.pow | Potència: Math.pow(base, exponent) |
| Math.round | Redonix (a diferència del truncament del casting) |
| Math.PI | Constant amb el número π |
| Truncar | Tallar els decimals amb (int) |

# **9\. Mètodes útils de String** {#9.-mètodes-útils-de-string}

## **📬 La idea en una frase**

String porta de sèrie una caixa de ferramentes amb mètodes per a mesurar, retallar, buscar i transformar text (length(), trim(), toUpperCase(), substring(), replace()…).

Anteriorment vas conéixer el String com la caixa màgica del text. Ara obriràs la seua caixa de ferramentes: perquè els programes no només guarden text, també el mesuren, el netegen, el posen en majúscules i el trocegen.

## **🪄 El gimnàs del text: els mètodes que mesuraràs**

Ací està l'arsenal complet. Fixa't en com es crida un mètode d'objecte: texto.metodo(), amb un punt entre la variable i el mètode (no com Math.random(), que era estàtic):

| *String texto \= " Programación DAW ";texto.length(); // 20 \-- quants caràcters hi ha (espais inclosos)texto.trim(); // "Programación DAW" \-- sense espais als costatstexto.toUpperCase(); // " PROGRAMACIÓN DAM "texto.toLowerCase(); // " programación dam "texto.contains("DAM"); // true \-- conté eixe text?texto.startsWith(" "); // true \-- comença per...?texto.endsWith("AM "); // true \-- acaba per...?texto.indexOf("DAW"); // 15 \-- en quina posició comença "DAW"?texto.substring(2, 14); // "Programación" \-- retalla del caràcter 2 al 13texto.replace("DAW", "DAM"); // " Programación DAM " \-- substitueix text* |
| :---- |

💡 **Detall pràctic:** length() és un **mètode** (amb parèntesis). És l'error clàssic del novat escriure texto.length sense parèntesis i que no compile. En canvi, per a un array (la U06) s'usa .length sense parèntesis. Els String porten parèntesis; els arrays, no.

## **🔍 Els mètodes que busquen**

Quan necessites saber si alguna cosa està dins del text:

| *String email \= "ana@instituto.edu";boolean tieneArroba \= email.contains("@"); // trueboolean esDeEdu \= email.endsWith(".edu"); // trueboolean empiezaPorAna \= email.startsWith("ana"); // trueint posicionArroba \= email.indexOf("@"); // 3 \-- el @ està en la posició 3* |
| :---- |

📝 **Nota:** indexOf() retorna la **posició** (començant en 0\) on troba el text, o **\-1** si no el troba. És el "buscar" de Java.

## **✂️ Els mètodes que retallen**

El clàssic: netejar espais i trocejar. trim() és l'heroi silenciós dels formularis mal omplits:

| *String sucio \= " Ana ";String limpio \= sucio.trim(); // "Ana" \-- sense espais al voltantString nombreCompleto \= "Ana Martínez";String nombre \= nombreCompleto.substring(0, 3); // "Ana" \-- del 0 al 3 (sense incloure el 3\)String apellido \= nombreCompleto.substring(4); // "Martínez" \-- des del 4 fins al final* |
| :---- |

⚠️ **Advertència:** en substring(inicio, fin), el fin **no s'inclou**. substring(0, 3\) et dona els caràcters 0, 1 i 2\. És un error típic demanar un caràcter de més (o de menys).

## **🏫 Exemple guiat: el nom de l'usuari**

Anem a construir un programa que processe un nom com ho faria un formulari seriós: netejant espais i mostrant dades:

| public class ProcesaNombre {    public static void main(String\[\] args) {        String nombre \= " aNA ";        String limpio \= nombre.trim(); *// "aNA"*        String enMayusculas \= limpio.toUpperCase(); *// "ANA"*        String enMinusculas \= limpio.toLowerCase(); *// "ana"*        String primera \= enMayusculas.substring(0, 1); *// "A"*        String ultima \= enMayusculas.substring(enMayusculas.length() \- 1); *// "A"*        System.out.println("Nombre limpio: " \+ limpio);        System.out.println("Longitud: " \+ limpio.length());        System.out.println("En mayúsculas: " \+ enMayusculas);        System.out.println("Primera letra: " \+ primera);        System.out.println("Última letra: " \+ ultima);    }} |
| :---- |

**Eixida:**

Nombre limpio: aNA  
Longitud: 3  
En mayúsculas: ANA  
Primera letra: A  
Última letra: A

Fixa't en l'última lletra: enMayusculas.length() \- 1 és l'última posició, perquè les posicions comencen en 0\.

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** encadena els mètodes per a expressions potents: texto.trim().toUpperCase().substring(0, 1\) fa tres coses en una línia. Java les executa d'esquerra a dreta.

**Exercici: la inicial d'una reina**

Sense executar, digues què imprimeix este codi:

| String nombre \= " merida ";String inicial \= nombre.trim().toUpperCase().substring(0, 1);String resto \= nombre.trim().substring(1).toLowerCase();System.out.println(inicial \+ ". " \+ resto); |
| :---- |

**🔄 Solució**

Imprimeix M. erida.

* nombre.trim() → "merida" (fora espais).  
* .toUpperCase() → "MERIDA".  
* .substring(0, 1\) → "M". Eixe és el inicial.  
* Per al resto: "merida".substring(1) → "erida", i .toLowerCase() ho deixa igual. Resultat: M. erida.

(La idea era normalitzar un nom estil "M. erida"... encara que el resultat sona a princesa amb pressa.)

## **🎯 Mini-chequeig**

1. Porta String.length() parèntesis o no? Per què?  
2. Què fa trim() i quan és imprescindible?  
3. Què retorna indexOf("@") si el text no conté @?  
4. Què retorna "Hola".substring(1, 3)?

**🔄 Respostes**

1. **Porta parèntesis**: length() és un mètode de la classe String. (Els arrays usen .length sense parèntesis, però això és la U06.)  
2. trim() elimina els **espais del principi i del final**. És imprescindible en netejar entrades d'usuari que solen portar espais de més.  
3. **\-1**, el sentinella de "no trobat".  
4. "ol" — el caràcter 1 ('o') i el 2 ('l'); el 3 no s'inclou.

## **✅ Resum en 3 frases**

1. Els mètodes de String es criden sobre la variable (texto.metodo()) i transformen el text en alguna cosa nova.  
2. length(), trim(), toUpperCase(), contains(), indexOf(), substring() i replace() cobreixen el 90% del que faràs amb text.  
3. En substring(inicio, fin) el fin no s'inclou, i indexOf() retorna \-1 quan no troba res.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| length() | Nº de caràcters d'un String (amb parèntesis) |
| trim() | Lleva els espais dels extrems |
| substring() | Retalla una porció del text |
| indexOf() | Posició de la primera aparició (o \-1) |
| replace() | Substituïx una part del text per una altra |
| Encadenar mètodes | Aplicar diversos mètodes seguits amb punts |

# 

# **10\. Repàs: la caixa que no cabia** {#10.-repàs:-la-caixa-que-no-cabia}

## **📬 La idea en una frase**

En este punt no aprenem res de nou: ho convertim tot en pràctica. I, com sempre, alguna cosa no funcionarà. 😈

## **⭐ Sé el Código, my friend...**

*Eres la JVM. Acaben de donar-te este programa per a executar:*

**public** **class** Misterio {  
 **public** static void main(String\[\] args) {  
 int nota \= 7;  
 int sobre \= 10;  
 System.out.println("Nota " \+ nota \+ sobre);  
 System.out.println("Nota " \+ (nota \+ sobre));  
 System.out.println(nota / 2 \+ " de nota media");  
 }  
 }

**Què imprimeixes per pantalla? Tria sàviament:**

1. **Nota 710, Nota 17 i 3 de nota media** → ✅ Correcte\! En la primera línia, en vore text abans del \+, Java concaten: "Nota " \+ 7 és "Nota 7" i després \+ 10 dona "Nota 710". En la segona, els parèntesis forcen la suma: Nota 17\. I 7 / 2 és divisió entera: 3\.  
2. **Nota 17, Nota 17 i 3.5 de nota media** → Els parèntesis no canvien res i la divisió entera es redoneix. ❌  
3. **Nota 710, Nota 17 i 3.5 de nota media** → La divisió de dos enters dona decimals. ❌

L'opció **1**. Quan un \+ mescla text i números, Java concaten. Els parèntesis (nota \+ sobre) obliguen a sumar primer. I 7 / 2 amb enters trunca: **3**, no 3.5. Tres trampes de la unitat en un sol programa. Brutal.

## **🔥 Fireside Chat: int vs double**

*Dos caixes del magatzem discuteixen al costat de la prestatgeria de les dades.*

**int:** — Jo sóc la caixa de mudança. Compacta, exacta, sense decimals. En mi no hi ha lloc per a tonteries. 17 dividit entre 5 són 3 i s'ha acabat.

**double:** — *alça una cella* ¿3? De veres? Per a mi són 3.4. Jo guarde els decimals de veritat. Els preus, les notes mitjanes, les temperatures... tot això viu a casa meua.

**int:** — Sí, i quan intentes ficar un número meu a la teua caixa, va tot bé. Però quan intentes ficar tu el teu a la meua... ¡has de demanar permís amb (int) i encara perds cèntims pel camí\!

**double:** — *arronsant les espatles* És el preu de la precisió. Jo guarde més dígits que tu. Saps quantes voltes he vist a novats escriure (int)(Math.random() \* 6 \+ 1\) i plorar perquè el dau mai no eixia 6?

**int:** — Val, val... I per a contar? Per a un bucle? Per a una edat? A mi em criden a mi. Contar amb decimals no té sentit.

**double:** — I mesurar, calcular mitjanes i preus, em criden a mi. Som un equip: tu per al sencer, jo per al fi.

**int:** — *gruny* Un equip. Bah. Però... val. Tu i jo, i long per als astronòmics i char per a les lletres. Tots al mateix magatzem.

La lliçó: **int és per al sencer, double per al decimal**. Confondre'ls en una divisió (o en un casting mal posat) produïx els errors més clàssics d'esta unitat.

## **🕵️ Qui Soc?**

Endevina quin concepte de la unitat sóc:

1. **Sóc el superglue del magatzem: una volta que fiques alguna cosa en mi, no ix ni amb palanca. M'escriuen en MAJÚSCULES perquè tots em respecten.**  
2. **Compare dos valors i només sé dir dos paraules: true i false. Sóc el jutge de la discussió.**  
3. **Sóc la caixa màgica del text: no sóc primitiu, sóc una classe, i si intentes canviar-me, tire el vell i en cree un de nou.**  
4. **Sóc l'orella del programa: esper que escrigues pel teclat i després passe el que has llegit a una variable.**  
5. **Sóc el casino: et done un nombre entre 0 i 1, i si em multipliques i em converteixes a int, et faig un dau.**

**🔄 Respostes**

1. **final** — El modificador que converteix una variable en constant.  
2. **Un operador relacional** (==, \<, \>, ...) — Sempre retorna un boolean.  
3. **String** — Classe immutable que guarda text.  
4. **Scanner** — Llegix del teclat amb mètodes next....  
5. **Math.random()** — El generador de nombres aleatoris.

## **🤬 CONRAD VS EL MÓN: "El compilador odia la teua memòria"**

*CONRAD, el nostre compilador cascarrabias, opina sobre els clàssics del novat en esta unitat.*

**CONRAD:** — ALTRA VEGADA\! Ve un alumne i em dona això: long distancia \= 3000000000; sense la L. I jo: *això és un int, i no cap, collons.* Però ell no m'escolta. Per què? ¡Perquè creu que ja ho sap tot\!

*I després el preu:* float precio \= 19.99;. Un double solt dins d'una caixa float... i li falta la f. ¡LA F, HOME\! És una lletra, una sola. Tan difícil és? I char letra \= "A" amb cometes dobles. ¡Les simples, les simples\! És com confondre un pis amb una escala.

*I el rei del mambo:* String nombre \= "Ana"; i després if (nombre \== "Ana"). PERÒ T'HAS LLEGIT EL PUNT 2? \== compara referències, no text. És que t'estic donant l'examen amb les respostes i me'l retornes en blanc.

**La lliçó:** en esta unitat, el compilador és el teu millor amic: long necessita L, float necessita f, char usa cometes simples i els String es comparen amb .equals(). Aprén la llista de quatre i t'estalviaràs el 80% de les bronques.

## **⚡ Laboratori de Tortura: el programa que cobra malament**

**Duració estimada:** 30 minuts **Ferramenta:** el teu IDE i un archiu nou

**L'escenari:** copia este programa al teu IDE i fes que funcione. És un caixer que calcula quants bitllets de 5 € et dona el banc per un reintegrament. Té **3 errors** que impedeixen que compile i 1 error de lògica que fa que el resultat siga incorrecte quan l'arregles.

**import** **java**.**util**.**Scanner**;

 **public** **class** Tortura {  
 **public** static void main(string\[\] args)  
 Scanner sc \= **new** Scanner(System.in);  
 System.out.print("Cantidad a retirar: ");  
 int cantidad \= sc.nextInt()  
 double billetes5 \= cantidad / 5.0;  
 System.out.println("Te dan " \+ billetes5 \+ " billetes de 5");  
 sc.close();  
 }  
 }

**Fallada intencionada:** un dels errors pareix correcte a simple vista perquè "es veu bé", però canvia per complet l'eixida del programa.

**La teua tasca:** aconseguir que compile, que execute i que **tota** l'eixida siga correcta. Prova amb cantidad \= 17: quants bitllets de 5 haurien de ser?

**Pistes per quan et frustres (no abans):**

1. Hi ha algun ; que falte? *no → seguix buscant.*  
2. Ja compila? *no → mira el missatge d'error i les majúscules.*  
3. Executa però el número de bitllets ix amb decimals? *És l'error de lògica: mescla de tipus.*

Els **3 errors de compilació**:

1. string\[\] args → String\[\] args (la classe String amb majúscula).  
2. Falta la { que obri el cos del main després de main(string\[\] args).  
3. Falta el ; al final de int cantidad \= sc.nextInt().

L'**error de lògica**: double billetes5 \= cantidad / 5.0; compila, però amb cantidad \= 17 imprimeix **3.4** bitllets... i un caixer no et pot donar 3.4 bitllets. La solució és usar **divisió entera**: int billetes5 \= cantidad / 5;

**import** **java**.**util**.**Scanner**;

 **public** **class** Tortura {  
 **public** static void main(String\[\] args) {  
 Scanner sc \= **new** Scanner(System.in);  
 System.out.print("Cantidad a retirar: ");  
 int cantidad \= sc.nextInt();  
 int billetes5 \= cantidad / 5;  
 System.out.println("Te dan " \+ billetes5 \+ " billetes de 5");  
 sc.close();  
 }  
 }

Per a cantidad \= 17: 17 / 5 amb enters dona **3** bitllets (i sobren 2 €). Amb la versió trencada, cantidad / 5.0 donava 3.4, que com a double sí que s'imprimeix tal qual: el caixer "et donava 3.4 bitllets". La divisió entera és la que fa el treball net.

## **🧠 Atreveix-te a Pensar**

1. **Sense executar:** què imprimeix este programa?

**public** **class** Misterio2 {  
 **public** static void main(String\[\] args) {  
 int a \= 10;  
 int b \= 3;  
 System.out.println("a/b \= " \+ a / b);  
 System.out.println("a/b real \= " \+ (double) a / b);  
 System.out.println("a%b \= " \+ a % b);  
 }  
 }

2. **El preu que no quadra:** un programa calcula double total \= precio \* 0.21; amb precio \= 100 i mostra 21.000000000000004. Què li passa a Java? Com ho arreglaries només amb ferramentes d'esta unitat?  
3. **El ternari encadenat:** escriu un ternari (o diversos encadenats) que assigne a categoria el valor "niño", "adulto" o "jubilado" segons si l'edat és \< 12, \< 65 o \>= 65\.  
4. **Vertader o fals:** "Math.random() \* 5 pot retornar el número 5." Justifica.

**💡 Solucions**

a/b \= 3  
 a/b real \= 3.3333333333333335  
 a%b \= 1

La primera és divisió entera (trunca). La segona força decimal amb (double) a abans de dividir.

2. Java usa **coma flotant binària**: 0.21 no es pot representar exactament en binari, així que queden residus com 21.000000000000004. Pots deixar-ho visualment net redonint amb Math.round(total \* 100\) / 100.0, o usar printf (ho vas vore en el punt 7\) per a donar format a l'eixida sense tocar el número.

String categoria \= edad \< 12 ? "niño" : (edad \< 65 ? "adulto" : "jubilado");

Els ternaris es poden encadenar: si la primera condició és falsa, avaluem la segona.

4. **Fals.** Math.random() retorna entre 0.0 i 0.999... (l'1 mai no s'inclou). En multiplicar per 5, el màxim és 4.999..., que després del (int) dona 4\. (int)(Math.random() \* 5\) dona de **0 a 4**.

## **💬 Preguntes d'Entrevista de Treball**

Preguntes reals que et farien per a programador Java júnior.

1. **"Explica'm, com si jo tinguera huit anys, què és una variable i què és un tipus primitiu."**  
2. **"Per què double nota \= 7/2; dona 3.0 i no 3.5? I com ho arreglaries?"**  
3. **"Quan usaríes int i quan long? Posa un exemple de cada un."**  
4. **"Què és un casting i quins riscos té fer un casting de double a int?"**  
5. **"Com llegeixes un número enter i una línia de text des del teclat sense que el text es quede buit?"**

## **🤷 No hi ha preguntes tontes**

❓ **Per què a voltes pose L al final d'un long i altres voltes no?**

Perquè depén del número. Si el número cap en un int (màxim 2.147 milions), long x \= 100; va sense L (Java el promociona sol). Si supera eixe límit, long x \= 3000000000; necessita la L perquè Java no intente ficar-lo en un int i es queixe.

❓ **És Math.random() un mètode de l'objecte Math?**

No exactament: Math és una **classe**, i random(), pow(), round()... són **mètodes estàtics**. No crees cap objecte de Math; crides directament Math.random(). És la diferència entre "cridar la classe" i "cridar l'objecte", que veuràs a fons en la U10.

❓ **Si escric int nota \= (int) 7.99;, em dona 8 per redoniment?**

No. El casting **trunca**, no redoneix: (int) 7.99 dona **7**. Per a redonir de veritat usa Math.round(7.99). El truncament talla amb destral; el redoniment negocia.

❓ **Puc sumar un String i un número així, sense més?**

Sí: "Resultado: " \+ 5 dona "Resultado: 5". Java converteix el número a text i el concaten. Això s'anomena **concatenació**. El problema ve quan t'oblides dels parèntesis: "Suma: " \+ 5 \+ 3 dona "Suma: 53". ¡Els parèntesis són vida\!
LICENCIA

**Reconocimiento \- No comercial \- CompartirIgual (BY-NC-SA)**: No se permite un uso comercial de la obra original ni de las posibles obras derivadas, la distribución de las cuales se ha de hacer con una licencia igual a la que regula la obra original.

**ÍNDEX**

[**1\. if, else if i else: el semàfor del codi	4**](#1.-if,-else-if-i-else:-el-semàfor-del-codi)

[**2\. switch: el menú del restaurant	7**](#2.-switch:-el-menú-del-restaurant)

[**3\. Bucles: while i do-while	12**](#3.-bucles:-while-i-do-while)

[**4\. Bucle for i bucles anidats	15**](#4.-bucle-for-i-bucles-anidats)

[**5\. break, continue i etiquetes	19**](#5.-break,-continue-i-etiquetes)

[**6\. Excepcions bàsiques	23**](#6.-excepcions-bàsiques)

[**7\. try, catch i finally	26**](#7.-try,-catch-i-finally)

[**8\. throw i excepcions pròpies	30**](#8.-throw-i-excepcions-pròpies)

[**9\. Repàs: controla les estructures	34**](#9.-repàs:-controla-les-estructures)

# 

**Unitat 04 \- Estructures de control i excepcions bàsiques**

# **1\. if, else if i else: el semàfor del codi** {#1.-if,-else-if-i-else:-el-semàfor-del-codi}

## **📬 La idea en una frase**

if és el semàfor del codi: si la condició és true, deixa passar al bloc; si es false, el redirigeix al else (o es queda esperant).

En unitats anterios els teus programes jutjaven amb operadors relacionals i ternaris, però eixa justícia durava una línia. Ara arriba la justícia de debò: blocs sencers de codi que s'executen o no segons el que decidisca Java.

## **🚦 El semàfor: if i else**

L'estructura bàsica és esta:

| if (condicio) {    *// codi que s'executa si condicio és true*} else {    *// codi que s'executa si condicio és false*}int edat \= 17;if (edat \>= 18) {    System.out.println("Pots votar.");} else {    System.out.println("Encara no pots votar.");} |
| :---- |

⚠️ **Advertència:** el else és **opcional**. Un if sol, sense else, és perfectament legal: si la condició falla, Java continua com si res.

## **🔀 else if: quan hi ha més de dos camins**

I si el semàfor té tres colors? Ací entra el else if, que s'encadena:

| int nota \= 7;if (nota \>= 9) {    System.out.println("Excel·lent");} else if (nota \>= 7) {    System.out.println("Notable");} else if (nota \>= 5) {    System.out.println("Aprovat");} else {    System.out.println("Suspés");} |
| :---- |

Java avalua les condicions **en ordre, de dalt a baix**. Tan bon punt una dona true, s'executa el seu bloc i **es salta la resta**. El else final atrapa tots els que no entraren.

💡 **Detall pràctic:** l'ordre importa. Si començares per nota \>= 5, la nota 7 entraria en l'"Aprovat" i mai no arribaria al "Notable". Ordena les condicions de la més exigent a la més permissiva.

## **🪆 If anidats: semàfors dins de semàfors**

Un if pot viure dins d'un altre. Útil quan vols decidir *dins* d'una decisió:

| int edat \= 20;boolean teCarnet \= true;if (edat \>= 18) {    if (teCarnet) {        System.out.println("Pots conduir.");    } else {        System.out.println("Et falta el carnet.");    }} else {    System.out.println("Encara no pots conduir.");} |
| :---- |

⚠️ **Advertència:** no converteixques els teus programes en les Torres Kio. Més de 3 nivells d'anidament és senyal que estàs fent les coses estrany: en la U07 aprendràs a aplanar-ho.

## **🎚️ El ternari: el if de butxaca**

Anteriorment, això s’ha vist com "un if-else en una línia". Ací està el seu moment de glòria:

| int edat \= 21;String missatge \= (edat \>= 18) ? "Major d'edat" : "Menor d'edat";System.out.println(missatge); |
| :---- |

La regla d'or: ternari per a **assignar un valor** en una línia; if/else quan el bloc és llarg o fa més que assignar.

| *// ✅ Bé: ternari per a triar valor*double preuFinal \= (dia.equals("divendres")) ? preu \* 0.9 : preu; *// ✅ Bé: if quan hi ha diverses línies per branca*if (saldo \< 0) {    System.out.println("Estàs en números rojos.");    System.out.println("Revisa les teues despeses.");} else {    System.out.println("Saldo sa.");} |
| :---- |

## **🏫 Exemple guiat: la discoteca municipal**

Anem a muntar el control d'accés d'una discoteca amb entrada reduïda:

| public class Discoteca {    public static void main(String\[\] args) {        int edat \= 16;        boolean acompanyat \= true;        if (edat \>= 18) {            System.out.println("Entra, major d'edat.");        } else if (edat \>= 16 && acompanyat) {            System.out.println("Entra, però amb el teu acompanyant.");        } else {            System.out.println("Ho sent, torna en uns quants anys.");        }    }} |
| :---- |

**Eixida:**

| Entra, però amb el teu acompanyant. |
| :---- |

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** quan veges una cadena d'if/else if, pregunta't sempre: *l'ordre és de la condició més estricta a la més laxa?* Eixe és el 90% dels bugs d'esta unitat.

**Exercici: el semàfor confús**

Sense executar, calcula què imprimeix este programa:

| public class Semafor {    public static void main(String\[\] args) {        int nota \= 8;        String resultat;        if (nota \>= 5) {            resultat \= "Aprovat";        } else if (nota \>= 7) {            resultat \= "Notable";        } else if (nota \>= 9) {            resultat \= "Excel·lent";        } else {            resultat \= "Suspés";        }        System.out.println(resultat);    }} |
| :---- |

**🔄 Solució**

Imprimeix **Aprovat**. L'ordre està invertit: com que el primer if demana nota \>= 5 i 8 ho compleix, Java entra ací i no mira les altres condicions, encara que 8 també compliria nota \>= 7 i nota \>= 9\. Les condicions correctes anirien de la més exigent (9) a la més permissiva (5). La lliçó: **el primer if que es compleix guanya**, encara que no siga el que volies.

## **🎯 Mini-chequeig**

Posat a prova en 30 segons (les respostes estan amagades):

1. Què fa Java si un if és false i no hi ha else?  
2. En quin ordre has d'encadenar les condicions d'un else if?  
3. Quan prefereixes un ternari a un if/else?  
4. Què imprimiria String s \= 5 \> 3 ? "A" : "B";?

**🔄 Respostes**

1. Seguix executant la següent línia: l'if s'ignora en silenci.  
2. De la més **exigent** a la més **permissiva**, perquè el primer true es queda amb la decisió.  
3. Quan només vols **assignar un valor** en una línia i les dues branques són curtes.  
4. **"A"** — perquè 5 \> 3 és true.

## **✅ Resum en 3 frases**

1. if / else if / else són el **semàfor** del codi: executen un bloc o un altre segons una condició booleana.  
2. Les condicions s'avaluen **en ordre** i guanya la primera que done true, així que ordena de la més estricta a la més laxa.  
3. El **ternari** resumeix un if-else de dos valors en una línia, però per a blocs llargs usa l'if clàssic.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| Condició | Expressió booleana que decideix: edat \>= 18 |
| Branca | Cada un dels camins possibles (if, else) |
| Anidar | Ficar un if dins d'un altre if |
| Ternari | condició ? valor1 : valor2, un if-else en una línia |
| Curtcircuit | Java deixa d'avaluar quan la primera condició ja decideix |

# **2\. switch: el menú del restaurant** {#2.-switch:-el-menú-del-restaurant}

## **📬 La idea en una frase**

switch és la carta d'un restaurant: mires el valor d'una variable i executes el case que coincidisca, sense encadenar vint if.

Quan has de triar entre moltes opcions amb un sol valor (dia de la setmana, talla, menú), una cadena d'else if funciona però és lletja. switch existeix per a això.

## 

## 

## **🍽️ La carta del restaurant**

| int dia \= 3;switch (dia) {    case 1:        System.out.println("Dilluns");        break;    case 2:        System.out.println("Dimarts");        break;    case 3:        System.out.println("Dimecres");        break;    default:        System.out.println("Dia desconegut");        break;} |
| :---- |

⚠️ **Advertència:** el **break és obligatori** (a menys que vulgues "fall-through", que veurem a baix). Sense ell, Java entra en el case correcte i seguix executant tots els següents fins a trobar un break. És el clàssic bug del novell.

## **🧱 Les peces del puzle**

* **switch (variable)**: la variable que s'examina. Admet tipus enters, char i enum; a partir de Java 7 també String.  
* **case valor:**: cada opció possible. Si la variable coincideix, s'executa eixe bloc.  
* **break;**: "fins ací he arribat, ix del switch". Sense ell, tot es desborda cap avall.  
* **default:**: el comodí, el "cap dels anteriors". És opcional, com l'else.

| String talla \= "M";switch (talla) {    case "S":        System.out.println("Xicoteta");        break;    case "M":        System.out.println("Mitjana");        break;    case "L":        System.out.println("Gran");        break;    default:        System.out.println("Talla no vàlida");        break;} |
| :---- |

💡 **Detall pràctic:** usa switch quan compares **una variable amb molts valors concrets**. Usa if/else if quan les condicions siguen rangs ("més gran que 5", "entre 10 i 20") o mesclen variables.

## **🌀 El fall-through: error o superpoder?**

El famós "caure a través" ocorre quan oblides el break. En la majoria dels casos és un bug:

| *// ⚠️ Fall-through ACCIDENTAL: imprimeix els tres plats*int plat \= 1;switch (plat) {    case 1:        System.out.println("Amanida");        *// sense break: es cau al següent*    case 2:        System.out.println("Sopa");        break;} |
| :---- |

Però a vegades s'usa a propòsit, per a agrupar casos:

| *// ✅ Fall-through INTENCIONAL: diversos casos comparteixen bloc*char lletra \= 'a';switch (lletra) {    case 'a':    case 'e':    case 'i':    case 'o':    case 'u':        System.out.println("Vocal");        break;    default:        System.out.println("Consonant");        break;} |
| :---- |

Ací, si lletra és qualsevol vocal, executa el bloc compartit. Elegant i compacte.

## **🆚 switch vs else if: el duel**

| Situació | Millor opció |
| ----- | ----- |
| Un valor i moltes opcions concretes (1..7, "S"/"M"/"L") | switch |
| Rangs o comparacions (\>= 18, entre 10 i 20\) | if/else if |
| Combinar diverses variables | if/else if |
| Comprovar null | if |

💡 **Nota de futur:** en Java 14+ existeix el switch amb fletxes (-\>) que no necessita break i retorna valors. Ho veuràs com a curiositat avançada; ací aprenem el clàssic, que és el de tots els exàmens.

## **🏫 Exemple guiat: el menú del dia**

Muntem una carta que diga el plat segons el dia, amb un default que caça els despistats:

| public class MenuDia {    public static void main(String\[\] args) {        String dia \= "dimecres";        switch (dia) {            case "dilluns":                System.out.println("Llenties");                break;            case "dimarts":                System.out.println("Paella");                break;            case "dimecres":                System.out.println("Macarrons");                break;            case "dijous":                System.out.println("Fabada");                break;            case "divendres":                System.out.println("Peix");                break;            default:                System.out.println("Cap de setmana: no hi ha menú");                break;        }    }} |
| :---- |

**Eixida**:

| Macarrons |
| :---- |

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** quan veges un switch, compta els break: **n'hi ha d'haver un per cada case no compartit**. Si en falta algun, el teu programa es converteix en un tobogan.

**Exercici: el switch oblidadís**

Sense executar, calcula què imprimeix este programa:

| public class Tobogan {    public static void main(String\[\] args) {        int numero \= 2;        switch (numero) {            case 1:                System.out.println("U");            case 2:                System.out.println("Dos");            case 3:                System.out.println("Tres");                break;            default:                System.out.println("Altre");                break;        }    }} |
| :---- |

**🔄 Solució**

Imprimeix:

| DosTres |
| :---- |

El case 2 no té break, així que després d'imprimir "Dos" es cau al case 3 ("Tres") i allà sí que troba el break i es deté. Fixa't: el case 1 no imprimeix res perquè nombre no val 1\. Un sol break oblidat converteix el switch en un tobogan.

## **🎯 Mini-chequeig**

1. Què passa si un case no té break?  
2. Què fa el default?  
3. Quan prefereixes switch a una cadena d'else if?  
4. Com agrupes diversos valors en el mateix bloc de switch?

**🔄 Respostes**

1. Es produïx el **fall-through**: el codi seguix executant els case següents fins a trobar un break.  
2. És el comodí: s'executa si **cap** case coincideix. És opcional.  
3. Quan compares **un valor amb moltes opcions concretes** (nombres, char, String).  
4. Escrivint els case seguits sense break entre ells i un sol bloc al final.

## **✅ Resum en 3 frases**

1. switch tria entre **moltes opcions concretes** d'una variable, amb case, break i default.  
2. Sense break es produïx el **fall-through** (el codi es desborda), que pot ser un bug o un truc per a agrupar casos.  
3. Usa switch per a valors exactes i if/else if per a **rangs** i condicions combinades.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| switch | Estructura que tria entre diversos case segons un valor |
| case | Cada opció concreta a comparar |
| break | Ordre d'eixida: talla el switch |
| default | El "cap dels anteriors", opcional |
| Fall-through | Que el codi es desborde d'un case al següent |

# **3\. Bucles: while i do-while** {#3.-bucles:-while-i-do-while}

## **📬 La idea en una frase**

Un bucle és una cinta de córrer: executa el mateix bloc una vegada i una altra mentre la condició siga true.

T'imagines escriure "imprimeix de l'1 al 100" amb cent println? Copiar i enganxar és pecat. Els bucles fan la faena bruta per tu: repeteixen un bloc fins que els dius prou.

## **🏃 while: comprova i després corre**

| while (condicio) {    *// bloc que es repeteix*} |
| :---- |

El while primer **mira la condició** i, si és true, executa el bloc. En acabar, torna a mirar. Si és false des del principi... **no executa res**.

| int intents \= 3;while (intents \> 0) {    System.out.println("Reintentant... queden " \+ intents);    intents \= intents \- 1;}i |
| :---- |

**Eixida:**

| Reintentant... queden 3Reintentant... queden 2Reintentant... queden 1 |
| :---- |

⚠️ **Advertència:** si oblides la línia que modifica la condició (intents \= intents \- 1;), la condició és true per sempre i el teu programa **no acaba mai**. Benvingut al bucle infinit, el cotxe sense frens de la programació.

## **♾️ El bucle infinit (i com eixir-ne)**

| while (true) {    System.out.println("Socors");} |
| :---- |

Este programa imprimiria "Socors" fins que l'univers es congele. En l'IDE, el botó de parar (🟥) és el teu millor amic. Per què existeix while (true)? Perquè a vegades vols un bucle "per sempre" que es trenque a l'interior amb break (ja ho veuràs en el punt 5).

💡 **Detall pràctic:** la sentència sentinella. Un clàssic és llegir dades fins que l'usuari escriga "eixir":

| String resposta \= "";Scanner sc \= new Scanner(System.in);while (\!resposta.equals("eixir")) {    System.out.print("Digues una cosa (o 'eixir'): ");    resposta \= sc.nextLine();}System.out.println("Adéu."); |
| :---- |

## **🏃‍♂️ do-while: corre i després comprova**

| do {    *// bloc*} while (condicio); |
| :---- |

La diferència amb while és l'**ordre**: el do-while executa el bloc **almenys una vegada** i comprova la condició al final. Útil quan necessites preguntar sí o sí abans de decidir:

| int opcio;Scanner sc \= new Scanner(System.in);do {    System.out.println("1. Jugar 2\. Eixir");    System.out.print("Tria: ");    opcio \= sc.nextInt();} while (opcio \!= 1 && opcio \!= 2);System.out.println("Has triat l'opció " \+ opcio); |
| :---- |

Ací el menú es mostra **sempre almenys una vegada**, i es repeteix mentre l'usuari no trie 1 o 2\. Perfecte per a menús.

⚠️ **Advertència:** no confongues els dos. Amb while, si la condició és false d'entrada, **zero execucions**. Amb do-while, **almenys una**. És com la diferència entre "mira abans de creuar" i "creua i després mira".

## **🆚 while vs do-while: el duel ràpid**

| Situació | Bucle ideal |
| ----- | ----- |
| No saps si tocarà executar el bloc | while |
| El bloc s'ha d'executar sí o sí una vegada | do-while |
| Llegir dades fins que l'usuari done el sentinella | while |
| Mostrar un menú fins que trie una opció vàlida | do-while |

## **🏫 Exemple guiat: el compte arrere**

Anem a llançar un coet amb un compte arrere. Com que s'ha d'imprimir el "Enlairament\!" encara que el comptador comence en 0... usem do-while:

| public class CompteArrere {    public static void main(String\[\] args) {        int comptador \= 5;        do {            System.out.println(comptador);            comptador--;        } while (comptador \>= 0);        System.out.println("Enlairament\! 🚀");    }} |
| :---- |

**Eixida:**

| 543210Enlairament\! 🚀 |
| :---- |

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** quan veges un bucle, pregunta't: *la condició avança cap a false en algun moment?* Si la resposta és "no", tens un bucle infinit.

**Exercici: el comptador parat**

Sense executar, calcula quantes vegades imprimeix "Hola" este programa... o si es penja:

| public class Comptador {    public static void main(String\[\] args) {        int x \= 10;        while (x \> 0) {            System.out.println("Hola");            x \= x \+ 1;        }    }} |
| :---- |

**🔄 Solució**

**Bucle infinit.** x comença en 10 i en comptes de disminuir, s'incrementa (x \= x \+ 1): la condició x \> 0 és true per sempre i el programa imprimeix "Hola" eternament. La correcció seria x \= x \- 1;. Pista visual: un comptador que puja en un while que demana que baixe és fum a l'ordinador.

## **🎯 Mini-chequeig**

1. Quantes vegades s'executa el bloc d'un while si la condició és false des del principi?  
2. I en un do-while?  
3. Què és un bucle infinit i com s'ix d'ell en l'IDE?  
4. Quan usaríes un do-while per a un menú?

**🔄 Respostes**

1. **Zero vegades**: el while comprova abans d'executar.  
2. **Almenys una vegada**: el do-while executa i comprova després.  
3. Un bucle la condició del qual mai no passa a false. Es talla amb el botó de **parar (🟥)** de l'IDE, i s'evita assegurant que alguna cosa modifique la condició dins.  
4. Quan vulgues mostrar el menú **sempre almenys una vegada** i repetir-lo fins que l'usuari trie una opció vàlida.

## **✅ Resum en 3 frases**

1. while comprova la condició **abans** d'executar i do-while **després**: el segon garanteix almenys una execució.  
2. Un bucle necessita que la condició **avance cap a false**; si no, tens un bucle infinit.  
3. Usa while per a llegir fins a un sentinella i do-while per a menús que s'han de mostrar sí o sí.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| Bucle | Bloc que es repeteix mentre una condició siga true |
| Iteració | Una volta completa del bucle |
| Condició | L'expressió booleana que decideix si es continua |
| Sentinella | Valor especial que acaba la lectura ("eixir") |
| Bucle infinit | Bucle que no s'acaba mai per descuit |
| do-while | Bucle que executa almenys una volta i comprova al final |

# **4\. Bucle for i bucles anidats** {#4.-bucle-for-i-bucles-anidats}

## **📬 La idea en una frase**

for és un bucle amb comptador de sèrie: declara la variable, posa la condició i l'actualitza en la mateixa línia, ideal per a "repeteix N vegades".

El while repetia "mentres passe alguna cosa". El for repeteix "un nombre exacte de vegades". És el bucle favorit per a recórrer coses i el que més usaràs en tota la teua carrera.

## **🔢 L'anatomia del for**

| for (inicialitzacio; condicio; actualitzacio) {    *// bloc*} |
| :---- |

**Exemple:**

| for (int i \= 1; i \<= 5; i++) {    System.out.println("Volta " \+ i);} |
| :---- |

**Eixida:**

| Volta 1Volta 2Volta 3Volta 4Volta 5 |
| :---- |

**El cicle de vida de i:**

1. **Inicialització**: int i \= 1 — s'executa una sola vegada, en entrar.  
2. **Condició**: i \<= 5 — es comprova abans de cada volta.  
3. **Bloc**: s'executa si la condició és true.  
4. **Actualització**: i++ — s'executa al final de cada volta.  
5. Tornada al pas 2\.

⚠️ **Advertència:** una coma mal posada en el for és l'error d'examen més comú. La sintaxi és: inicialització **;** condició **;** actualització. Tres parts, dos punts i coma, zero comes entre elles.

## **🔁 Els tres bucles són el mateix acudit**

Això és while, do-while i for fent exactament el mateix:

| int i \= 1; *// inicialització*while (i \<= 5) { *// condició*    System.out.println("Volta " \+ i);    i++; *// actualització*}int i \= 1;do {    System.out.println("Volta " \+ i);    i++;} while (i \<= 5); for (int i \= 1; i \<= 5; i++) {    System.out.println("Volta " \+ i);} |
| :---- |

Els tres imprimeixen el mateix. El for guanya perquè junta les tres parts del control en una línia: és més difícil oblidar el i++ (adéu, bucles infinits per descuit).

💡 **Detall pràctic:** si saps quantes vegades repetiràs → for. Si no ho saps → while. Regla que et salvarà la vida en l'examen.

## **🧩 Bucles anidats: la graella d'exercicis**

Un bucle dins d'un altre. Per cada volta del bucle **exterior**, el **interior** s'executa complet.

| for (int fila \= 1; fila \<= 3; fila++) {    for (int columna \= 1; columna \<= 4; columna++) {        System.out.print("\* ");    }    System.out.println();} |
| :---- |

**Eixida:**

| \* \* \* \*\* \* \* \*\* \* \* \* |
| :---- |

* El bucle exterior controla les **files** (3).  
* El interior controla les **columnes** (4).  
* El println() sense text després de l'interior salta de línia en acabar cada fila.

⚠️ **Advertència:** cada nivell d'anidament multiplica les voltes. Amb 1000 files i 1000 columnes són 1.000.000 d'iteracions. Els bucles anidats són potents, però també la fàbrica de programes lents.

## **🏫 Exemple guiat: la taula de multiplicar**

| public class TaulaMultiplicar {    public static void main(String\[\] args) {        for (int i \= 1; i \<= 10; i++) {            System.out.println("7 x " \+ i \+ " \= " \+ (7 \* i));        }    }} |
| :---- |

**Eixida (primeres línies):**

7 x 1 \= 7  
 7 x 2 \= 14  
 7 x 3 \= 21  
 ...

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** quan uses un for, pregunta: *la condició usa \< o \<=?* Un descuit d'un dígit (repetir 9 voltes en comptes de 10\) és el bug de l'off-by-one, el més famós de la història.

**Exercici: el triangular**

Sense executar, calcula quants asteriscs imprimeix en total este programa:

| public class Triangle {    public static void main(String\[\] args) {        for (int fila \= 1; fila \<= 4; fila++) {            for (int ast \= 1; ast \<= fila; ast++) {                System.out.print("\*");            }            System.out.println();        }    }} |
| :---- |

**🔄 Solució**

Imprimeix:

| \*\*\*\*\*\*\*\*\*\* |
| :---- |

En total, **10 asteriscs** (1 \+ 2 \+ 3 \+ 4). Fixa't en el truc: la condició de l'interior és ast \<= fila, així que cada fila imprimeix tants asteriscs com número de fila. El bucle interior depén del valor de l'exterior: això és el cor dels bucles anidats.

## **🎯 Mini-chequeig**

1. Quines són les tres parts del for?  
2. Quantes vegades s'executa la inicialització?  
3. Què imprimeix for (int i \= 0; i \< 5; i++)? 5 o 4 voltes?  
4. En un bucle anidat, què fa el bucle interior per cada volta de l'exterior?

**🔄 Respostes**

1. **Inicialització**, **condició** i **actualització**, separades per ;.  
2. **Una sola vegada**, en entrar en el bucle.  
3. **5 voltes**: amb i valent 0, 1, 2, 3 i 4 (quan i arriba a 5, la condició falla).  
4. S'executa **complet** (totes les seues voltes) per cada volta de l'exterior.

## **✅ Resum en 3 frases**

1. for junta **inicialització, condició i actualització** en una línia: ideal per a repetir un nombre conegut de vegades.  
2. while, do-while i for són intercanviables; tria for quan sàpies les voltes.  
3. En els **bucles anidats**, per cada volta de l'exterior el interior s'executa complet, i això multiplica el treball.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| for | Bucle amb comptador: for (inici; condicio; avanc) |
| Comptador | Variable que compta les voltes (normalment i) |
| Bucle anidat | Un bucle dins d'un altre |
| Off-by-one | Fallar per un en la condició (\< vs \<=) |
| Iteració | Una volta del bucle |

# **5\. break, continue i etiquetes** {#5.-break,-continue-i-etiquetes}

## **📬 La idea en una frase**

break apaga el bucle sencer i continue es salta només la volta actual; amb etiquetes pots decidir a quin bucle anidat afecten.

Ja saps repetir. Ara toca aprendre a **eixir amb estil**: interrompre, saltar i dirigir-te a un bucle concret quan n'hi ha diversos.

## **🚪 break: el botó de parada**

break acaba el bucle **immediatament**, sense comprovar la condició:

| for (int i \= 1; i \<= 10; i++) {    if (i \== 5) {        break;    }    System.out.println(i);} |
| :---- |

**Eixida:**

| 1234 |
| :---- |

Tan bon punt i val 5, break talla el bucle: les voltes 6 a 10 no ocorren mai. És perfecte per a "troba alguna cosa i para de buscar".

💡 **Detall pràctic:** el break dins d'un switch (punt 2\) tallava el switch. El break dins d'un bucle talla el bucle. Mateix botó, diferent aparell.

## **⏭️ continue: el botó de saltar**

continue no acaba el bucle: **salta directament a la següent volta**, ignorant la resta del bloc:

| for (int i \= 1; i \<= 5; i++) {    if (i \== 3) {        continue;    }    System.out.println(i);} |
| :---- |

**Eixida**:

| 1245 |
| :---- |

El 3 es salta, però el bucle continua. Útil per a "no processis estos valors, però seguix amb els altres":

| *// Suma només els nombres parells de l'1 al 10int suma \= 0;for (int i \= 1; i \<= 10; i++) {    if (i % 2 \!= 0) {        continue; // senars: no compten    }    suma \+= i;}System.out.println("Suma de parells: " \+ suma); // 2+4+6+8+10 \= 30* |
| :---- |

⚠️ **Advertència:** en un while, si poses el continue **abans** d'actualitzar la variable del bucle, l'actualització es salta... i el bucle no avança. Bug infinit assegurat. En un for l'actualització és a la capçalera i no passa res.

## **🏷️ Etiquetes: el GPS dels bucles anidats**

Un break o continue solts afecten **només el bucle més intern**. I si vols eixir de dos bucles alhora? Ací naixen les **etiquetes**:

| exterior:for (int i \= 1; i \<= 3; i++) {    for (int j \= 1; j \<= 3; j++) {        if (i \* j \>= 6) {            break exterior; *// eix dels DOS bucles*        }        System.out.println(i \+ " x " \+ j);    }} |
| :---- |

**Eixida:**

| 1 x 11 x 21 x 32 x 12 x 2 |
| :---- |

Quan i \* j \>= 6, el break exterior salta fora de l'etiqueta, acabant els dos bucles alhora. Sense etiqueta, el break només hauria eixit del bucle de j.

| exterior:for (int i \= 1; i \<= 3; i++) {    for (int j \= 1; j \<= 3; j++) {        if (j \== 2) {            continue exterior; *// salta a la següent i*        }        System.out.println(i \+ "-" \+ j);    }} |
| :---- |

**Eixida:**

| 1\-12\-13\-1 |
| :---- |

⚠️ **Advertència IMPORTANT:** les etiquetes són legals però poc usades. Davant el dubte, quasi sempre es pot redissenyar amb una variable booleana. Usa etiquetes amb moderació: el teu company de projecte t'ho agrairà.

## **🏫 Exemple guiat: el detector de nombre primer**

Usem break per a comprovar si un nombre és primer de manera eficient:

| public class EsPrimer {    public static void main(String\[\] args) {        int numero \= 29;        boolean esPrimer \= true;        for (int divisor \= 2; divisor \< numero; divisor++) {            if (numero % divisor \== 0) {                esPrimer \= false;                break; *// trobat divisor: para de buscar*            }        }        System.out.println(numero \+ " és primer? " \+ esPrimer);    }} |
| :---- |

**Eixida**:

| 29 és primer? true |
| :---- |

Amb break, tan bon punt apareix un divisor deixem de comprovar. Per al 29 no hi ha divisors, així que el bucle es recorre sencer i esPrimer continua sent true.

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** per a distingir-los d'un cop d'ull: break \= **apaga** el bucle; continue \= **salta** esta volta. Un acaba la festa, l'altre només es perd una cançó.

**Exercici: el bucle psicodèlic**

Sense executar, escriu l'eixida exacta:

| public class Psicodelic {    public static void main(String\[\] args) {        for (int i \= 1; i \<= 8; i++) {            if (i % 3 \== 0) {                continue;            }            if (i \== 7) {                break;            }            System.out.println(i);        }    }} |
| :---- |

**🔄 Solució**

| 1245 |
| :---- |

Pas a pas: de l'1 al 8, continue es salta els múltiples de 3 (3 i 6), i break talla en el 7 (que tampoc no arribaria a imprimir-se). Queden l'1, el 2, el 4 i el 5\. El 8 mai no s'avalua perquè el break de i \== 7 va apagar el bucle abans.

## **🎯 Mini-chequeig**

1. Quina és la diferència entre break i continue en una frase?  
2. A què afecten per defecte en bucles anidats?  
3. Per a què serveix una etiqueta?  
4. Per què és perillós el continue en un while si va abans de l'actualització?

**🔄 Respostes**

1. break **acaba** el bucle; continue **salta només la volta actual**.  
2. Al bucle **més intern**.  
3. Perquè un break o continue afecte un bucle exterior concret (break etiqueta;).  
4. Perquè l'actualització es salta i el bucle **no avança**: condició true per sempre.

## **✅ Resum en 3 frases**

1. break apaga el bucle sencer i continue es salta només la volta actual.  
2. En bucles anidats afecten el més intern; les **etiquetes** et deixen apuntar a un bucle exterior.  
3. Compte amb continue abans de l'actualització en while: és un bucle infinit en potència.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| break | Acaba el bucle (o el switch) immediatament |
| continue | Salta a la següent volta del bucle |
| Etiqueta | Nom que poses a un bucle per a saltar-hi |
| break etiqueta | Eix del bucle etiquetat, no del més intern |
| Bucle infinit | Risc si continue es salta l'actualització d'un while |

# **6\. Excepcions bàsiques** {#6.-excepcions-bàsiques}

## **📬 La idea en una frase**

Una excepció és un avís que alguna cosa ha eixit malament; Java el llança com un objecte que hereta de Throwable, i el teu programa pot estar o no preparat per a atrapar-lo.

T'ha passat que un programa es "cau" amb un munt de text roig? Eixe text és una excepció. En comptes de morir en silenci, Java crida amb tot el detall. Aprendre a llegir eixos crits és aprendre a depurar.

## **💥 El crash: la teua primera excepció**

Executa això:

| public class Explosio {    public static void main(String\[\] args) {        int\[\] numeros \= { 1, 2, 3 };        System.out.println(numeros\[5\]); *// no existeix\!*    }} |
| :---- |

Java no es calla. Apareix una cosa així:

| Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 3 at Explosio.main(Explosio.java:5) |
| :---- |

Este text és or: et diu **què** excepció (ArrayIndexOutOfBoundsException), **on** (línia 5\) i en **quin mètode**. Llegir-lo bé resol la mitat dels teus problemes.

## **🌳 La família Throwable: l'arbre genealògic**

Totes les excepcions hereten d'una classe mare:

Object  
 └── Throwable  
 ├── Error (coses que no hauries d'intentar arreglar)  
 └── Exception (el que de veritat ens interessa)  
 ├── RuntimeException (excepcions en temps d'execució)  
 └── (altres excepcions "controlades")

* **Error**: problemes greus de la JVM (memòria esgotada, per exemple). No els provoques tu i no has d'intentar atrapar-los. Ignora'ls.  
* **Exception**: fallades del programa. Ací viu el 99% de la teua vida.  
* **RuntimeException**: subfamília d'Exception que es llança en **temps d'execució** i que **no estàs obligat** a capturar. Ací viuen les més famoses.

| *// Totes estes són RuntimeException (no necessites try perquè compile):int x \= 10 / 0; // ArithmeticExceptionint\[\] a \= new int\[3\]; a\[9\] \= 1; // ArrayIndexOutOfBoundsExceptionString s \= null; s.length(); // NullPointerExceptionint num \= Integer.parseInt("Hola"); // NumberFormatException* |
| :---- |

💡 **Detall pràctic:** "RuntimeException" significa que l'error apareix quan el programa **corre**, no en compilar. El compilador no t'avisa: només ho descobreixes en plena execució.

## **🗺️ Les excepcions més comunes: la guia de camp**

| Excepció | Quan apareix | Frase típica |
| ----- | ----- | ----- |
| ArithmeticException | Dividir entre 0 | "Dividir entre zero, quin valent" |
| ArrayIndexOutOfBoundsException | Índex fora de l'array | "Eixe buit no existeix" |
| NullPointerException | Cridar alguna cosa null | "El clàssic absolut" |
| NumberFormatException | Convertir text que no és nombre | "Convertir 'Hola' en nombre, no" |
| StringIndexOutOfBoundsException | Índex fora d'un String | "substring() més enllà del final" |
| InputMismatchException | Scanner rep el tipus equivocat | "Vas posar text on anava un nombre" |

⚠️ **Advertència:** la NullPointerException (NPE) és, amb diferència, l'excepció més comuna de la història de Java. La teua àvia, si programara, també la tindria. El missatge sol ser un críptic "null" seguit de la línia on vas tocar un objecte que no existia.

## **🏫 Exemple guiat: el lector d'edats**

Un programa que demana una edat per teclat pot explotar si l'usuari escriu lletres. Vegem el crash i després l'arreglarem mes avant:

| import java.util.Scanner;public class LectorEdat {    public static void main(String\[\] args) {        Scanner sc \= new Scanner(System.in);        System.out.print("Quants anys tens? ");        int edat \= sc.nextInt();        System.out.println("Vas nàixer fa " \+ edat \+ " anys.");        sc.close();    }} |
| :---- |

Si escrius hola, obtens una InputMismatchException. El programa mor. La solució és atrapar l'excepció amb try/catch... que és justament el punt 7\.

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** quan un programa explote, llig la primera línia de l'error: el nom de l'excepció et diu *què* ha passat, i la línia amb at ... et diu *on*. És un GPS amb acusacions.

**Exercici: el detectiu d'excepcions**

Digues quina excepció llançaria cada línia (o si no llançaria cap):

| int a \= 5 / 0;String\[\] dies \= {"L", "M", "X"};System.out.println(dies\[3\]);String text \= null;System.out.println(text.toUpperCase());int b \= Integer.parseInt("42");int c \= Integer.parseInt("quaranta-dos"); |
| :---- |

**🔄 Solució**

* 5 / 0 → **ArithmeticException** (divisió entre zero).  
* dies\[3\] → **ArrayIndexOutOfBoundsException** (un array de 3 buits s'indexa 0, 1, 2).  
* text.toUpperCase() → **NullPointerException** (text és null).  
* parseInt("42") → **Sense excepció**: 42 sí que és un nombre.  
* parseInt("quaranta-dos") → **NumberFormatException** (eixe text no és un nombre).

## **🎯 Mini-chequeig**

1. Quina classe està a l'arrel de totes les excepcions?  
2. Quina diferència hi ha entre Error i Exception?  
3. Què significa que siga una RuntimeException?  
4. Quina és l'excepció més famosa de la història i quan apareix?

**🔄 Respostes**

1. **Throwable**.  
2. Error són problemes greus de la JVM que no has d'intentar arreglar; Exception són fallades del programa que sí que pots capturar.  
3. Que es llança **en temps d'execució** (no en compilar) i que **no estàs obligat** a capturar-la.  
4. La **NullPointerException**: apareix en tocar un objecte que val null.

## **✅ Resum en 3 frases**

1. Una excepció és un **objecte** que Java llança quan alguna cosa eix malament i que hereta de Throwable.  
2. La família es divideix en Error (greus, no tocar), Exception (capturables) i RuntimeException (es llancen en executar, sense obligació de capturar-les).  
3. Llegir el missatge de l'excepció (què, on, en quin mètode) és la primera habilitat d'un bon depurador.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| Excepció | Objecte que representa un error en el programa |
| Throwable | Classe arrel d'errors i excepcions |
| Error | Fallada greu de la JVM, no capturable |
| Exception | Fallada del programa, capturable |
| RuntimeException | Excepció d'execució, sense captura obligatòria |
| Trace | El "stack trace": la llista de crides fins al fallo |

# **7\. try, catch i finally** {#7.-try,-catch-i-finally}

## **📬 La idea en una frase**

try protegix el codi perillós, catch atrapar l'excepció si apareix i finally s'executa sempre, ocorrega el que ocorrega.

En el punt 6 vas vore que una InputMismatchException mata el teu programa. Ara toca blindar-lo: el try/catch/finally és l'airbag del codi.

## **🛡️ L'estructura completa**

| try {    *// codi perillós*} catch (TipusDExcepcio e) {    *// què fer si apareix eixa excepció*} finally {    *// s'executa SEMPRE, amb o sense excepció*} |
| :---- |

Exemple:

| import java.util.InputMismatchException;import java.util.Scanner;public class LectorBlindat {    public static void main(String\[\] args) {        Scanner sc \= new Scanner(System.in);        try {            System.out.print("Quants anys tens? ");            int edat \= sc.nextInt();            System.out.println("Vas nàixer fa " \+ edat \+ " anys.");        } catch (InputMismatchException e) {            System.out.println("Això no és un nombre. No em faces això.");        }        System.out.println("El programa seguix viu. 🎉");        sc.close();    }} |
| :---- |

Si escrius hola, ja no explota: el catch atrapar l'error, imprimeix un missatge simpàtic i **el programa continua**.

💡 **Detall pràctic:** el finally és opcional i sol usar-se per a netejar recursos (tancar Scanner, fitxers...). S'executa **sempre**: si hi hagué excepció, si no n'hi hagué, i fins i tot si el try tenia un return.

## **🎯 Captura múltiple: diversos catch en fila**

Pots capturar diversos tipus d'excepció, cada un amb el seu tractament. **L'ordre importa: primer les més específiques, després les generals.**

| try {    int\[\] numeros \= {1, 2};    int indice \= 5;    int divisor \= 0;    System.out.println(numeros\[indice\] / divisor);} catch (ArithmeticException e) {    System.out.println("Divisió entre zero.");} catch (ArrayIndexOutOfBoundsException e) {    System.out.println("Índex fora de l'array.");} catch (RuntimeException e) {    System.out.println("Alguna cosa estranya va passar en temps d'execució.");} |
| :---- |

En Java a partir de la versió 7 existeix una forma compacta per a diversos tipus amb el mateix tractament, separats per |:

| } catch (ArithmeticException | ArrayIndexOutOfBoundsException e) {    System.out.println("Matemàtica o índex: vas fallar per ací.");} |
| :---- |

⚠️ **Advertència:** un catch (Exception e) al principi es menjaria les excepcions més específiques. Regla: del més concret al més general, com en els else if.

## **🧽 La variable e: el botí de l'error**

L'e del catch és l'objecte excepció atrapat. Pots preguntar-li coses:

| catch (Exception e) {    System.out.println("Missatge: " \+ e.getMessage());    e.printStackTrace(); *// imprimeix el stack trace complet (per a depurar)*} |
| :---- |

⚠️ **Advertència:** un catch **buit** (sense res a dins) és un pecat mortal: te tragues l'error i ni tan sols te n'adones que ha passat. Com un testimoni que no parla en un judici. Com a mínim, imprimeix un missatge.

## **🏫 Exemple guiat: el menú a prova de bombes**

Reunim do-while, try i catch: un menú que repeteix fins a triar bé i que no explota si escrius porqueria:

| import java.util.InputMismatchException;import java.util.Scanner;public class MenuBlindat {    public static void main(String\[\] args) {        Scanner sc \= new Scanner(System.in);        int opcio \= 0;        boolean valida \= false;        do {            System.out.println("1. Jugar 2\. Eixir");            System.out.print("Tria: ");            try {                opcio \= sc.nextInt();                valida \= (opcio \== 1 || opcio \== 2);                if (\!valida) {                    System.out.println("Opció no vàlida, torna-ho a intentar.");                }            } catch (InputMismatchException e) {                System.out.println("Això no és un nombre.");                sc.next(); *// descarta el text brossa del buffer*            }        } while (\!valida);        System.out.println("Has triat l'opció " \+ opcio);        sc.close();    }} |
| :---- |

💡 **Detall pràctic:** fixa't en sc.next() dins del catch: sense ell, el text brossa seguiria al buffer del Scanner i el següent nextInt() tornaria a fallar. Atrapar l'excepció i **netejar el buffer** són dos passos del mateix ball.

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** la pregunta clau davant d'un try és: *què pot fallar ací i com ho manege?* Un catch que només existeix "per si de cas" però no fa res és fum.

**Exercici: el detectiu de l'ordre**

Este codi té un problema d'ordre en els catch. Sense executar, explica què ocorre:

| try {    int\[\] numeros \= {10, 20};    System.out.println(numeros\[3\]);} catch (Exception e) {    System.out.println("Atrapat per Exception.");} catch (ArrayIndexOutOfBoundsException e) {    System.out.println("Atrapat per ArrayIndexOutOfBoundsException.");} |
| :---- |

**🔄 Solució**

**No compila.** Java es queixa en el segon catch: com que ArrayIndexOutOfBoundsException és una subclasse d'Exception, el primer catch ja l'atraparia tot, i Java no permet un catch "inalcançable". Els catch han d'anar **del més específic al més general**: primer ArrayIndexOutOfBoundsException, després Exception.

## **🎯 Mini-chequeig**

1. Què fa el bloc finally i quan s'executa?  
2. En quin ordre han d'anar els catch?  
3. Quin perill té un catch buit?  
4. Per què convé cridar sc.next() després d'una InputMismatchException?

**🔄 Respostes**

1. S'executa **sempre**, hi haja o no excepció; serveix per a netejar recursos.  
2. **Del més específic al més general**; si no, el general "se menja" els altres i no compila.  
3. Te tragues l'error sense assabentar-te'n: el programa continua, però amb una fallada oculta. Mínim: imprimeix un missatge.  
4. Perquè el text brossa es queda al buffer del Scanner i el següent nextInt() tornaria a fallar.

## **✅ Resum en 3 frases**

1. try protegix el codi perillós i catch atrapar l'excepció perquè el programa **no muera**.  
2. Els catch van **del més específic al més general**, i mai no deixes un catch buit.  
3. finally s'executa sempre, ideal per a tancar Scanner, fitxers i altres recursos.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| try | Bloc amb codi que pot llançar excepcions |
| catch | Bloc que atrapar una excepció i la maneja |
| finally | Bloc que s'executa sempre |
| Captura múltiple | Diversos catch seguits, de l'específic al general |
| e.getMessage() | Missatge de l'error atrapat |
| Stack trace | Rastre de crides on va ocórrer el fallo |

# **8\. throw i excepcions pròpies** {#8.-throw-i-excepcions-pròpies}

## **📬 La idea en una frase**

throw llança una excepció quan tu decideixes que alguna cosa no ha de continuar, i creant la teua pròpia excepció pots posar-li el nom que vulgues al problema.

Fins ara Java llançava les excepcions per tu. Però hi ha un superpoder millor: **tu** decideixes quan llançar-les, i pots inventar-te tipus d'error a la teua mesura.

## **🎳 throw: llança la pedra**

throw crea i llança una excepció on vulgues. És com dir "ací alguna cosa està mal, que ho sàpia tot el món":

| public class CompteBancari {    public static void main(String\[\] args) {        double saldo \= 10.0;        double retir \= 500.0;        if (retir \> saldo) {            throw new ArithmeticException("Saldo insuficient: " \+ saldo);        }        saldo \-= retir;        System.out.println("Nou saldo: " \+ saldo);    }} |
| :---- |

Eixe throw new ArithmeticException("...") deté el programa amb eixa excepció. I el missatge que li passes al constructor és el que veuràs en e.getMessage().

💡 **Detall pràctic:** throw i throws no són cosins: són bessons diferents. throw **llança** una excepció (ho veus ací). throws **anuncia** en la signatura del mètode que pot llançar excepcions controlades. throw va al cos; throws, a la capçalera.

## **🏗️ Excepcions pròpies: el teu defecte a mida**

Per què conformar-te amb ArithmeticException quan pots tindre una SaldoInsuficientException amb nom de pel·lícula? Crear la teua pròpia excepció és **heretar d'Exception** (o de RuntimeException) i llest:

| public class SaldoInsuficientException extends RuntimeException {    public SaldoInsuficientException(String missatge) {        super(missatge);    }} |
| :---- |

I ara la uses:

| public class Caixer {    public static void main(String\[\] args) {        double saldo \= 10.0;        double retir \= 500.0;        if (retir \> saldo) {            throw new SaldoInsuficientException("Només tens " \+ saldo \+ "€.");        }        System.out.println("Retirat: " \+ retir);    }} |
| :---- |

**Eixida (amb el programa tallant-se):**

| Exception in thread "main" SaldoInsuficientException: Només tens 10.0€. at Caixer.main(Caixer.java:9) |
| :---- |

💡 **Detall pràctic:** hereta d'Exception si vols **obligar** els qui la usen a capturar-la (excepció controlada). Hereda de RuntimeException si prefereixes que no els obligue (com les que vas vore en el punt 6). Per a començar, RuntimeException és més còmoda.

## **⚖️ checked vs unchecked: la burocràcia de les excepcions**

* **Checked (controlades)**: el compilador **t'obliga** a capturar-les o a declarar-les amb throws. Hereden d'Exception però no de RuntimeException. Exemple: IOException.  
* **Unchecked (no controlades)**: no t'obliguen a res. Són RuntimeException i les seues filles.

| import java.io.IOException;public class Mussol {    public static void main(String\[\] args) throws IOException {        *// com que IOException és checked, HA d'anar en el throws*        *// o estar dins d'un try/catch*    }} |
| :---- |

Si una excepció és checked i no la gestiones, **no compila**. Si és unchecked, el compilador et deixa tranquil (i l'error explota en execució).

## **🏫 Exemple guiat: la màquina expenedora**

Anem a crear una excepció pròpia i un programa que la llance i l'atrabe:

| public class ProducteEsgotatException extends RuntimeException {    public ProducteEsgotatException(String producte) {        super("El producte " \+ producte \+ " està esgotat.");    }}public class MaquinaExpenedora {    public static void main(String\[\] args) {        int stock \= 0;        String producte \= "Refresc";        try {            if (stock \== 0) {                throw new ProducteEsgotatException(producte);            }            System.out.println("Ací tens el teu " \+ producte);        } catch (ProducteEsgotatException e) {            System.out.println("Ho sentim: " \+ e.getMessage());        }        System.out.println("La màquina seguix funcionant. 🤖");    }} |
| :---- |

**Eixida:**

| Ho sentim: El producte Refresc està esgotat.La màquina seguix funcionant. 🤖 |
| :---- |

Veus la màgia? El throw llança la teua excepció, el catch l'atrapar pel seu **nom propi** i el programa sobreviu. Eixe nom converteix un error genèric en un missatge que fins i tot la teua cap entén.

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** si una condició "impossible" ocorre al teu codi, és millor throw que deixar que el programa continue amb dades trencades. Una excepció primerenca val més que un bug que apareix dues setmanes després.

**Exercici: el controlador de notes**

Crea (en paper o a l'IDE) una excepció pròpia NotaInvalidaException que herete de RuntimeException, i un mètode que la llance si una nota no està entre 0 i 10\. Què hereta la teua excepció del seu pare?

**🔄 Solució**

| public class NotaInvalidaException extends RuntimeException {    public NotaInvalidaException(double nota) {        super("La nota " \+ nota \+ " no està entre 0 i 10.");    }} |
| :---- |

Ús:

| public class Notes {    public static void main(String\[\] args) {        double nota \= 15;        if (nota \< 0 || nota \> 10) {            throw new NotaInvalidaException(nota);        }        System.out.println("Nota vàlida: " \+ nota);    }} |
| :---- |

La teua excepció hereta de RuntimeException (que al seu torn hereta d'Exception i de Throwable) tot el comportament de llançar-se i capturar-se, el constructor que rep un missatge (amb super(missatge)) i el mètode getMessage(). Tu només poses el nom i el missatge.

## **🎯 Mini-chequeig**

1. Què fa la paraula clau throw?  
2. Com es crea una excepció pròpia?  
3. Quina és la diferència entre throw i throws?  
4. Quina diferència hi ha entre checked i unchecked?

**🔄 Respostes**

1. **Llança** una excepció en el punt del codi on la col·loques: throw new MiExcepcion("...");.  
2. Heredant d'Exception o de RuntimeException i afegint (opcionalment) un constructor que cride a super(missatge).  
3. throw llança una excepció (al cos del mètode); throws declara en la signatura que el mètode pot llançar excepcions checked.  
4. Les **checked** t'obliguen a capturar-les o declarar-les (throws); les **unchecked** (RuntimeException i filles) no t'obliguen.

## **✅ Resum en 3 frases**

1. throw llança una excepció on tu decideixes, amb el missatge que vulgues.  
2. Crear la teua pròpia excepció és **heretar d'Exception o RuntimeException** i posar-li un constructor amb missatge.  
3. throw (llançar) ≠ throws (declarar), i les excepcions **checked** obliguen a gestionar-les mentre les **unchecked** no.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| throw | Llança una excepció: throw new MiExcepcion() |
| throws | Declara en la signatura que el mètode pot llançar alguna cosa |
| Excepció pròpia | Classe que hereta d'Exception o RuntimeException |
| Checked | Excepció que el compilador t'obliga a gestionar |
| Unchecked | Excepció sense obligació de captura (RuntimeException) |
| super(missatge) | Passa el missatge a la classe pare |

# **9\. Repàs: controla les estructures** {#9.-repàs:-controla-les-estructures}

## **📬 La idea en una frase**

En este punt no aprenem res de nou: ho convertim tot en pràctica. I, com sempre, alguna cosa no funcionarà. 😈

## **⭐ Sé el Código, my friend...**

*Eres la JVM. Acaben de donar-te este programa per a executar:*

| public class Misteri {    public static void main(String\[\] args) {        int nota \= 6;        if (nota \>= 5) {            System.out.println("Aprovat");        } else if (nota \>= 7) {            System.out.println("Notable");        } else {            System.out.println("Suspés");        }    }} |
| :---- |

**Què imprimeixes per pantalla? Tria saviament:**

1. **Notable** → La nota 6 és més gran que 5, i quasi també que 7, així que Java tria la millor. ❌  
2. **Aprovat** → ✅ Correcte\! Java avalua de dalt a baix i es queda amb la **primera** condició que done true. Com que nota \>= 5 es compleix, entra ací i s'oblida de la resta, encara que 6 no arribe a 7\.  
3. **Suspés** → L'else només s'executa si cap condició anterior es compleix, i ací sí que es compleix la primera. ❌

L'opció **2**. L'ordre de les condicions mana: guanya el primer if que siga true. Si vols que un 6 siga "Notable", hauries de reordenar de la condició més exigent (7) a la més permissiva (5).

## **🔥 Fireside Chat: if-else vs switch**

*Dos veterans del control de flux discuteixen al costat de la màquina de cafè.*

**if-else:** — Jo soc el clàssic. Condicions, rangs, comparacions... necessites decidir si alguna cosa és més gran que 5 o està entre 10 i 20? Crida'm a mi. Jo compare el que siga.

**switch:** — Clar, i t'omplires d'else if fins que el codi sembla l'escala d'un edifici. Amb mi poses la variable una vegada i cada cas en la seua línia. Net, directe, elegant.

**if-else:** — Elegant fins que t'oblides un break i el teu switch es converteix en un tobogan. Saps què és el fall-through? Una malson amb nom.

**switch:** — El fall-through s'usa a propòsit quan vull agrupar casos. I tu? Amb trenta else if, saps almenys quin va abans que quin?

**if-else:** — Jo suporte rangs\! \>= 18, \< 65... Tu només serveixes per a valors exactes. Un dia has de decidir per edat i aniràs a plorar.

**switch:** — Millor plorar que repetir una variable vint vegades. Cada un al seu terreny, no?

**if-else:** — Fet. Tu, valors exactes. Jo, rangs i condicions combinades. Així ningú no es fa mal.

La lliçó: no hi ha guanyador. **switch per a valors concrets** (dia, menú, talla) i **if/else if per a rangs i mescles**. Triar bé és la mitat de l'examen.

## **🕵️ Qui Soc?**

Endevina quin concepte de la unitat soc:

1. **Soc el semàfor: si la meua condició és true, deixe passar; si és false, redirigix a l'altre carril.**  
2. **Soc el menú del restaurant: mires la meua variable i executes el case que coincidisca.**  
3. **Soc la cinta de córrer que comprova abans de córrer: si la condició és false d'entrada, no faig ni un pas.**  
4. **Soc el botó de parada: talle el bucle sencer tan bon punt aparec.**  
5. **Soc l'avi de tots els errors: tot el que es llança hereta de mi.**  
6. **Soc l'airbag: atrapar l'error perquè el programa no muera.**

**🔄 Respostes**

1. **L'if/else** — decideix entre dos camins segons una condició booleana.  
2. **El switch** — tria entre diversos case segons el valor d'una variable.  
3. **El while** — comprova abans d'executar (el do-while és el que corre primer).  
4. **El break** — acaba el bucle (i també el switch).  
5. **Throwable** — la classe arrel d'Error i Exception.  
6. **El catch** — atrapar l'excepció perquè el programa sobrevisca.

## **🤬 CONRAD VS EL MÓN: "El bucle que no s'acaba"**

*CONRAD, el nostre compilador cascarrabutxes, opina sobre el clàssic del novell.*

**CONRAD:** — UNA ALTRA VEGADA\! Ve un alumne i em diu: *CONRAD, el meu programa es queda penjat*. I jo: val, què té el bucle? *Pues no ho sé, no l'he mirat.* AI, MARE MEUA\! Un while sense res que canvie la condició dins és un cotxe sense frens, t'ho explique amb plastilina?

*I després està el que escriu* while (x \> 0\) { x \= x \+ 1; } *quan volia restar. Puja en comptes de baixar. No és un bucle infinit, és un bucle que ascendix fins a l'infinit. Com si volgueres buidar una piscina tirant-hi més aigua.*

*I el colmo:* if (x \= 5). Amb UN igual. Això no és una condició, és una assignació\! T'ho dic des de la U03 i ho continuec veient. El doble igual \== es queda a casa quan toca comparar.

**La lliçó:** abans d'acusar l'ordinador de "congelar-se", mira el bucle: alguna cosa modifica la condició cap a false? El continue es salta l'actualització? Uses \== o t'has quedat en \=? El 90% dels programes "penjats" s'arreglen amb un cop d'ull a estes tres preguntes.

## **🎮 El Joc de les Decisions**

Tria la resposta correcta per a cada decisió (respostes al final):

1. Què imprimeix int n \= 4; String r \= n \>= 5 ? "A" : "B";?  
   * a) A b) B  
2. Quantes voltes fa for (int i \= 0; i \< 3; i++)?  
   * a) 3 b) 4  
3. Què imprimeix un switch amb case 1 i case 2 seguits sense break entre ells, si la variable val 1?  
   * a) Només el case 1 b) El case 1 i després el case 2  
4. Quin és el resultat de 10 / 0?  
   * a) ArithmeticException b) Un nombre enorme

**🔄 Solucions**

1. **b)** — 4 no és més gran o igual que 5, així que el ternari retorna "B".  
2. **a)** — i val 0, 1 i 2: tres voltes. Amb \< 3 mai no entra amb i \= 3\.  
3. **b)** — Sense break, el case 1 es desborda al case 2 (fall-through).  
4. **a)** — Dividir entre zero llança ArithmeticException en temps d'execució.

## **🧠 Atreveix-te a Pensar**

1. **Sense executar:** què imprimeix este programa?

| public class Misteri2 {    public static void main(String\[\] args) {        for (int i \= 1; i \<= 6; i++) {            if (i % 2 \!= 0)                continue;            System.out.println(i);        }    }} |
| :---- |

2. **El nombre invisible:** amb el while del punt 3, com faries per a contar quants dígits té un nombre sense usar String?  
3. **El detectiu:** el teu programa llança InputMismatchException en la línia del nextInt(). Quina eina uses i què mires primer en el stack trace?  
4. **Vertader o fals:** "un catch (Exception e) atrapar també les RuntimeException".

**💡 Solucions**

1. Imprimeix 2, 4, 6: el continue salta els senars i només s'imprimeixen els parells de l'1 al 6\.  
2. Repetint while (numero \> 0\) { numero /= 10; comptador++; }: cada divisió entre 10 li lleva un dígit al nombre fins que arriba a 0\. Amb 123 → 3 dígits.  
3. El **depurador**: posa un breakpoint en el nextInt() i mira el valor que està arribant pel buffer. O, més ràpid, llig el stack trace: la línia at ... et diu exactament on es va llançar.  
4. **Vertader.** RuntimeException hereta d'Exception, així que un catch (Exception e) les atrapar totes.

## **💬 Preguntes d'Entrevista de Treball**

Preguntes reals que et farien per a programador Java júnior.

1. **"Explica'm, com si jo fóra la teua àvia, la diferència entre if i switch."**  
2. **"Quina és la diferència entre break i continue en un bucle?"**  
3. **"Un usuari escriu text on el teu programa espera un nombre i l'aplicació es cau. Com ho arreglaries?"**  
4. **"Què és una NullPointerException i com l'evites?"**  
5. **"Per a què serveix el bloc finally?"**  
6. **"Quan crearíes una excepció pròpia en comptes d'usar les de Java?"**

## **🤷 No hi ha preguntes tontes**

❓ **Puc usar switch amb un double?**

No. switch admet int i enters afins, char, enum i String (des de Java 7). Amb double usa if/else if, perquè els decimals quasi mai no es comparen amb igualtat exacta.

❓ **Per què a vegades veig while (true) si és un bucle infinit?**

Perquè es trenca des de dins amb break: while (true) { if (condicio) break; ... }. És la forma d'escriure "bucle per sempre fins que passe alguna cosa". Ho veuràs molt en jocs i servidors.

❓ **El catch pot capturar qualsevol excepció?**

Si poses catch (Exception e), captures totes les Exception i les seues filles (incloses les RuntimeException). Si vols capturar-ho absolutament tot, existeix catch (Throwable e), però això és com pescar amb dinamita: també atrapa errors greus de la JVM que no hauries de tocar.


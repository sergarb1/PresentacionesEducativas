LICENCIA

**Reconocimiento \- No comercial \- CompartirIgual (BY-NC-SA):** No se permite un uso comercial de la obra original ni de las posibles obras derivadas, la distribución de las cuales se ha de hacer con una licencia igual a la que regula la obra original.

**ÍNDICE**

[**1\. Arrays: l'aparcament de dades	3**](#1.-arrays:-l'aparcament-de-dades)

[**2\. Recórrer arrays: for i for-each	6**](#2.-recórrer-arrays:-for-i-for-each)

[**3\. Arrays multidimensionals	9**](#3.-arrays-multidimensionals)

[**4\. La classe Arrays: la teua navalla suïssa	13**](#4.-la-classe-arrays:-la-teua-navalla-suïssa)

[**5\. Arrays i mètodes	17**](#5.-arrays-i-mètodes)

[**6\. Aplicacions dels arrays	21**](#6.-aplicacions-dels-arrays)

[**7\. Be the Code: l'aparcament es gestiona	25**](#7.-be-the-code:-l'aparcament-es-gestiona)

[**8\. Array-revelde: errors comuns i depuració	29**](#8.-array-revelde:-errors-comuns-i-depuració)

[**9\. Repàs: l'aparcament a examen	32**](#9.-repàs:-l'aparcament-a-examen)

# 

**Unitat 06 \- Arrays**

# **1\. Arrays: l'aparcament de dades** {#1.-arrays:-l'aparcament-de-dades}

## **📬 La idea en una frase**

Un array és un aparcament de grandària fixa: guarda moltes dades del mateix tipus sota un sol nom, i cada plaça té un número (l'índex) que comença en 0\.

Fins ara guardaves una cosa per variable. Amb els arrays en guardes 100 sota el mateix cartell. És la primera ferramenta "de veritat" per a gestionar quantitats, i d'ella penja tot el que ve després.

## **🐱 El problema: tens 100 gats i un sol nom**

Imagina que tens 100 gats i necessites guardar els seus noms. Podries fer això:

| String gato1 \= "Bigotes";String gato2 \= "Garfield";String gato3 \= "Misifú";*// ... 97 líneas después ...*String gato100 \= "Calcetines"; |
| :---- |

Però aleshores arriba el gat 101 i el teu programa es cau. O pitjor: vols saber quants gats comencen amb "M" i has d'escriure 100 if. L'esquena ja et fa mal només de pensar-ho.

⚠️ **Advertència:** si alguna volta escrius gato1, gato2, gato3... gatoN al teu codi, en algun lloc un programador sènior plora. Els arrays existeixen exactament per a això.

## **🅿️ L'array: el teu primer aparcament**

Un array és com un aparcament de diverses plantes. Cada plaça té un número (l'**índex**) i en cada plaça només caben cotxes del mateix tipus (bé, i les seues subclasses).

| *String\[\] gatos \= new String\[100\];// Has creat un aparcament amb 100 places per a Strings* |
| :---- |

Hi ha dues formes de declarar-lo i crear-lo:

| *int\[\] numeros \= new int\[5\]; // 5 places, totes buides (0)int\[\] directo \= {10, 20, 30}; // 3 places, ja ocupades* |
| :---- |

La primera plaça és la **0**, no la 1\. Això confon tothom al principi. Accepta-ho.

💡 **Consell:** pensa en els índexs com a distàncies des de la primera posició. La primera casa és a 0 passes de tu, no a 1\.

### **Els valors per defecte**

Quan crees un array amb new, cada plaça s'ompli amb el valor per defecte del tipus:

| Tipus | Valor per defecte |
| ----- | ----- |
| int, long, short, byte | 0 |
| double, float | 0.0 |
| boolean | false |
| char | '\\U0100' |
| Objectes (String, Persona...) | null |

Eixe últim és el que mossega: un array de String acabat de crear està ple de null, no de "". Si intentes cridar un mètode sobre una plaça null, et portes un NullPointerException a l'acte.

## **🚗 Com ficar coses a l'aparcament**

S'accedeix a una plaça amb claudàtors i el número d'índex:

| *String\[\] gatos \= new String\[3\];gatos\[0\] \= "Bigotes";gatos\[1\] \= "Garfield";gatos\[2\] \= "Misifú";gatos\[3\] \= "Calcetines"; // ¡BOOM\!* |
| :---- |

Què passa a l'última línia? Et vas a estavellar.

### **¡BOOM\! La ArrayIndexOutOfBoundsException**

| *int\[\] numeros \= new int\[5\];numeros\[0\] \= 10;numeros\[1\] \= 20;numeros\[2\] \= 30;numeros\[3\] \= 40;numeros\[4\] \= 50;numeros\[5\] \= 60; // Index 5 out of bounds for length 5* |
| :---- |

L'array té places del 0 al 4\. Demanar la 5 és com intentar aparcar on no hi ha plaça. Java et respon amb ArrayIndexOutOfBoundsException i el teu programa mor a l'acte. És **la** excepció més típica d'esta unitat i la primera que quasi tothom pateix.

📝 **Nota:** els índexs vàlids van de 0 a length \- 1\. L'últim element sempre és **arr\[arr.length \- 1\]**. No t'ho penses dues voltes: memoritza-ho.

### **La longitud: length sense parèntesis**

Per a saber quantes places té l'aparcament:

| *int\[\] numeros \= new int\[10\];System.out.println(numeros.length); // 10 (sense parèntesis)* |
| :---- |

**Fixa't**: array.length NO porta parèntesis. No és un mètode, és un atribut. Els String usen length(). Els arrays usen length. És una trampa mortal als exàmens.

⚠️ **Advertència:** l'array és un objecte (és al heap), però la variable que el referencia és a la pila (stack). Quan passes un array a un mètode, passes la referència, no les dades. Ho veuràs en detall al punt 5, però ja ho saps: si modifiques l'array dins d'un mètode, els canvis afecten l'original.

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** els arrays tenen grandària fixa. Una vegada creats, no pots afegir ni traure elements. Si ho necessites, se'n crea un altre i es copia. En la U12 veuràs les col·leccions, que solucionen això.

**Exercici: l'array que es duplica**

| public class BeTheArray {    public static void main(String\[\] args) {        int\[\] arr \= new int\[4\];        arr\[0\] \= 2;        arr\[1\] \= 4;        arr\[2\] \= 6;        arr\[3\] \= 8;        for (int i \= 0; i \< arr.length; i++) {            arr\[i\] \= arr\[i\] \* 2;        }        System.out.println(arr\[2\]);    }} |
| :---- |

**Què imprimeix?**

* (A) 6  
* (B) 8  
* (C) 12  
* (D) 16

**🔄 Solució**

La **C**. L'array original és {2, 4, 6, 8}. Després del bucle, cada element es multiplica per 2: {4, 8, 12, 16}. Per tant, arr\[2\] \= 12\. El for recorre totes les places i les sobreescriu al lloc: no necessites un altre array.

## **🎯 Mini-chequeig**

Posat a prova en 30 segons (les respostes estan amagades):

1. Quantes places té int\[\] a \= new int\[7\] i quins són els índexs vàlids?  
2. Quin valor té boolean\[\] b \= new boolean\[3\] a cada plaça?  
3. Quina excepció llança arr\[arr.length\]?  
4. numeros.length o numeros.length()? I per a un String?

**🔄 Respostes**

1. 7 places. Índexs del 0 al 6 (length \- 1).  
2. false a totes: és el valor per defecte de boolean.  
3. ArrayIndexOutOfBoundsException: la plaça length no existeix, les vàlides acaben en length \- 1\.  
4. numeros.length (atribut, sense parèntesis) per a arrays; texto.length() (mètode, amb parèntesis) per a String.

## **✅ Resum en 3 frases**

1. Un **array** guarda molts valors del mateix tipus sota un sol nom, en un aparcament de **grandària fixa**.  
2. S'accedeix per **índex** des de 0 fins a length \- 1; passar-te provoca ArrayIndexOutOfBoundsException.  
3. La **longitud** es pregunta amb length (sense parèntesis) i les places acabades de crear s'omplin amb els valors per defecte (0, false, null...).

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| Array | Aparcament de dades del mateix tipus, grandària fixa |
| Índex | Número de la plaça; comença en 0 |
| length | Grandària de l'array (atribut, sense parèntesis) |
| ArrayIndexOutOfBoundsException | Error per eixir-te de les places vàlides |
| Valor per defecte | El que ocupa una plaça acabada de crear (0, false, null...) |

# **2\. Recórrer arrays: for i for-each** {#2.-recórrer-arrays:-for-i-for-each}

## **📬 La idea en una frase**

Un array sense un bucle és un aparcament que ningú no visita: el for recorre plaça a plaça per índex, i el for-each fa el mateix però sense índex i només per a llegir.

Al punt 1 vas aprendre a crear l'aparcament. Ara toca el divertit: passejar per totes les places i fer alguna cosa amb cada cotxe. I ací mana un duo tan inseparable com el pa i la mantega.

## **🔗 El duo inseparable: for \+ array**

Els arrays i els bucles for es veuen sempre junts. No és casualitat: el for té un comptador natural (i) que encaixa perfecte amb els índexs de l'array.

| String\[\] gatos \= {"Bigotes", "Garfield", "Misifú", "Calcetines"};for (int i \= 0; i \< gatos.length; i++) {    System.out.println("Gato " \+ i \+ ": " \+ gatos\[i\]);} |
| :---- |

**Eixida:**

| Gato 0: BigotesGato 1: GarfieldGato 2: MisifúGato 3: Calcetines |
| :---- |

Fixa't en la condició: i \< gatos.length. Si escrigueres i \<= gatos.length, a l'última volta demanaries la plaça length i... ¡BOOM\! ArrayIndexOutOfBoundsException. És l'error de bucle més comés de l'univers.

### **Patrons clàssics amb for**

El for amb índex no només serveix per a imprimir. Estos tres patrons es repeteixen a cada exercici del curs:

**Sumar tots els elements:**

| int\[\] notas \= {7, 8, 5, 9, 6};int suma \= 0;for (int i \= 0; i \< notas.length; i++) {   suma \+= notas\[i\];}System.out.println("Media: " \+ (double) suma / notas.length); |
| :---- |

**Buscar un valor (cerca lineal):**

| int\[\] edades \= {12, 45, 7, 34, 89};int buscado \= 34;int posicion \= \-1;for (int i \= 0; i \< edades.length; i++) {    if (edades\[i\] \== buscado) {       posicion \= i;       break;   }}System.out.println(posicion \>= 0 ? "Encontrado en " \+ posicion : "No encontrado"); |
| :---- |

**Modificar l'array al lloc** (això només es pot amb índex):

| *int\[\] numeros \= {1, 2, 3, 4, 5};for (int i \= 0; i \< numeros.length; i++) {   numeros\[i\] \= numeros\[i\] \* 10;}// {10, 20, 30, 40, 50}* |
| :---- |

## **🛋️ for-each: la variant peresosa**

Si no necessites l'índex (només vols llegir els valors), hi ha una sintaxi més curta:

| String\[\] gatos \= {"Bigotes", "Garfield", "Misifú"};for (String gato : gatos) {   System.out.println("Miau: " \+ gato);} |
| :---- |

Es llig: "per a cada String gato en gatos, fes això". La variable gato va prenent el valor de cada plaça una a una, sense que tu gestiones comptadors ni claudàtors.

📝 **Nota:** el for-each és **només de lectura**. No pots modificar l'array original dins del bucle. Bé, pots intentar-ho, però el canvi es perd en l'èter: gato \= "Nuevo" només canvia la variable local, no la plaça de l'array. Per a modificar, usa el for amb índex.

### **Quan use cada un?**

| Situació | Bucle recomanat |
| ----- | ----- |
| Només llegir i no m'importa la posició | for-each |
| Necessite l'índex (posicions, comparar veïns) | for clàssic |
| Vull modificar els elements de l'array | for clàssic |
| Recórrer cap arrere o de dos en dos | for clàssic |
| Recórrer una col·lecció (ArrayList, HashSet...) | for-each (U12 Col·leccions) |

💡 **Consell:** si no necessites l'índex, usa for-each. És més curt, més llegible i t'estalvia una classe sencera d'errors (oblidar el \++, començar en 1, escriure \<=...).

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** el for-each és com un robot que va per l'aparcament llegint les matrícules. Només llig: no pot repintar els cotxes.

**Exercici: la suma dels pacients**

| public class BeTheForEach {   public static void main(String\[\] args) {       int\[\] numeros \= { 10, 20, 30, 40, 50 };       int total \= 0;       for (int n : numeros) {           if (n % 20 \== 0) {               total \+= n;           }       }       System.out.println(total);   }} |
| :---- |

**Què imprimeix?**

* (A) 60  
* (B) 90  
* (C) 120  
* (D) 150

**🔄 Solució**

La **A**. El for-each recorre cada element: 10, 20, 30, 40, 50\. El if només suma els múltiples de 20, que són 20 i 40\. 20 \+ 40 \= 60\. Els altres s'ignoren.

## **🎯 Mini-chequeig**

Posat a prova en 30 segons (les respostes estan amagades):

1. Què imprimeix for (int i \= 0; i \< a.length; i++) sobre {1,2,3} si imprimeixes a\[i\]?  
2. Per què for (int i \= 0; i \<= a.length; i++) llança excepció?  
3. Es pot modificar un array amb for-each?  
4. Quin bucle usaríes per a imprimir l'array al revés?

**🔄 Respostes**

1. 1 2 3\. El bucle recorre les places 0, 1 i 2\.  
2. Perquè a l'última volta (i \== a.length) demana una plaça que no existeix: els índexs vàlids acaben en length \- 1\.  
3. No. El for-each és de només lectura: la variable del bucle és una còpia del valor, no la plaça.  
4. Un for clàssic cap arrere: for (int i \= a.length \- 1; i \>= 0; i--).

## **✅ Resum en 3 frases**

1. El **for clàssic** recorre l'array amb un índex (i) des de 0 fins a length \- 1, i és l'únic que permet **modificar** elements.  
2. El **for-each** llig tots els valors sense índex: perfecte per a sumar, comptar o imprimir, però és **només de lectura**.  
3. La condició del bucle és i \< length; si escrius \<=, et estavelles contra ArrayIndexOutOfBoundsException.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| Recórrer | Visitar cada element de l'array, un a un |
| for clàssic | Bucle amb índex per a llegir, modificar o buscar |
| for-each | Bucle de només lectura: "per a cada X en Y" |
| Cerca lineal | Recórrer de principi a fi buscant un valor |
| break | Tallar el bucle en el moment en què trobes allò que busques |

# **3\. Arrays multidimensionals** {#3.-arrays-multidimensionals}

## **📬 La idea en una frase**

Un array multidimensional és un array els elements del qual són altres arrays: un aparcament de diverses plantes, on cada plaça es localitza per planta i número.

Fins ara cada plaça guardava una dada. I si la dada en si és un altre aparcament? Aleshores tens una taula amb files i columnes. Això és el que uses per a representar taulers, matrius, mapes i qualsevol cosa amb dues (o més) dimensions.

## **🏢 L'aparcament de diverses plantes**

Un array bidimensional és "un array de arrays". Es declara amb doble claudàtor:

| *int\[\]\[\] tabla \= new int\[3\]\[4\]; // 3 files, 4 columnes* |
| :---- |

Pensa-ho com un aparcament amb **3 plantes** i **4 places** per planta. Per a accedir a una plaça necessites dos números: el de la planta (fila) i el de la plaça dins d'ella (columna).

| *tabla\[0\]\[0\] \= 1; // fila 0, columna 0tabla\[1\]\[2\] \= 5; // fila 1, columna 2* |
| :---- |

També pots crear-lo ja ple:

| int\[\]\[\] matriz \= {   {1, 2, 3},   {4, 5, 6},   {7, 8, 9}}; |
| :---- |

matriz.length és el nombre de files (3). matriz\[0\].length és el nombre de columnes de la fila 0 (3).

💡 **Consell:** anomena els índexs dels arrays multidimensionals com a fila i col, o i i j. NO uses x i y tret que realment treballes amb coordenades. El teu jo del futur t'ho agrairà.

## **🎲 Arrays de arrays irregulars**

Java permet "arrays de arrays" on cada fila té un nombre diferent de columnes (els anomenats *jagged arrays*, arrays dentats):

| int\[\]\[\] irregular \= new int\[3\]\[\];irregular\[0\] \= new int\[2\];irregular\[1\] \= new int\[5\];irregular\[2\] \= new int\[3\]; |
| :---- |

La fila 0 té 2 columnes, la fila 1 en té 5 i la fila 2 en té 3\. Per a què serveix? Triangles, piràmides o simplement dades que no formen un rectangle perfecte (per exemple, els dies de cada mes: febrer en té menys).

| int\[\]\[\] diasPorMes \= {   {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31}, *// un sol mes per fila*   {1, 2, 3}, *// exemple de fila curta*}; |
| :---- |

En un array irregular, irregular\[i\].length pot ser diferent per a cada i. Per això els recorreguts usen matriz\[i\].length dins del bucle, mai un número fix.

## 

## 

## **🔁 Recórrer un array 2D: els bucles niats**

Per a recórrer un rectangle perfecte necessites dos bucles: un per a les files i un altre per a les columnes.

| int\[\]\[\] matriz \= {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};for (int i \= 0; i \< matriz.length; i++) { *// files*   for (int j \= 0; j \< matriz\[i\].length; j++) { *// columnes*       System.out.print(matriz\[i\]\[j\] \+ " ");   }   System.out.println();} |
| :---- |

**Eixida:**

| 1 2 34 5 67 8 9 |
| :---- |

El bucle exterior va fila a fila; l'interior recorre cada columna d'eixa fila. Fixa't que l'interior usa matriz\[i\].length: així funciona també amb arrays irregulars.

I la versió peresosa amb for-each (només lectura):

| for (int\[\] fila : matriz) {   for (int valor : fila) {       System.out.print(valor \+ " ");   }   System.out.println();} |
| :---- |

Cada fila és un int\[\], i sobre ell tornes a usar for-each. Arrays de arrays, bucles de bucles.

## **🧮 Per a què serveix de veritat**

Els arrays 2D no són un caprici acadèmic. Són la forma natural de representar:

| Situació | Array |
| ----- | ----- |
| Tauler de joc (escacs, busca-mines, tres en ratlla) | char\[\]\[\] o boolean\[\]\[\] |
| Notes per alumne i assignatura | double\[\]\[\] |
| Mapa de píxels d'una imatge | int\[\]\[\] |
| Matrius matemàtiques | int\[\]\[\], double\[\]\[\] |

Un busca-mines simplificat, per exemple, és un boolean\[\]\[\]:

| *boolean\[\]\[\] minas \= new boolean\[5\]\[5\];minas\[2\]\[3\] \= true; // hi ha una mina en fila 2, columna 3* |
| :---- |

I per a saber si una posició existeix, sempre preguntes abans de tocar: l'índex de fila va de 0 a length \- 1 i el de columna de 0 a matriz\[fila\].length \- 1\. Eixir-te d'allí torna a ser ArrayIndexOutOfBoundsException, però ara amb dues coordenades.

⚠️ **Advertència:** matriz.length i matriz\[0\].length NO són el mateix. El primer són les files; el segon, les columnes de la fila 0\. Confondre'ls és l'error clàssic dels principiants amb matrius.

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** quan recórres una matriu amb dos bucles, l'ordre importa: i per a files, j per a columnes. Si els intercanvies, estàs recorrent la matriu transposada.

**Exercici: la diagonal que no es veu**

| public class BeTheDiagonal {   public static void main(String\[\] args) {       int\[\]\[\] m \= {               { 1, 2, 3 },               { 4, 5, 6 },               { 7, 8, 9 }       };       int suma \= 0;       for (int i \= 0; i \< m.length; i++) {           suma \+= m\[i\]\[i\];       }       System.out.println(suma);   }} |
| :---- |

**Què imprimeix?**

* (A) 12  
* (B) 15  
* (C) 18  
* (D) 45

**🔄 Solució**

La **B**. El bucle suma m\[0\]\[0\] \+ m\[1\]\[1\] \+ m\[2\]\[2\] \= 1 \+ 5 \+ 9 \= 15\. És la **diagonal principal**: quan fila i columna són el mateix número, camines per la diagonal de dalt-esquerra a baix-dreta. Un sol bucle, no dos.

## **🎯 Mini-chequeig**

Posat a prova en 30 segons (les respostes estan amagades):

1. Quantes files i columnes té int\[\]\[\] a \= new int\[3\]\[4\]?  
2. Com accedixes a l'element de la fila 2, columna 1?  
3. Què representa a.length i què representa a\[0\].length?  
4. Per què en un array irregular el bucle interior usa a\[i\].length?

**🔄 Respostes**

1. 3 files i 4 columnes.  
2. a\[2\]\[1\]. Recorda: primer la fila, després la columna, tots dos començant en 0\.  
3. a.length és el nombre de files; a\[0\].length, el nombre de columnes de la primera fila.  
4. Perquè cada fila pot tindre una grandària diferent. Usar a\[i\].length garanteix que recorres exactament les columnes d'eixa fila, ni més ni menys.

## **✅ Resum en 3 frases**

1. Un array **bidimensional** és un array de arrays: s'accedeix amb dos índexs \[fila\]\[columna\].  
2. Es **recorre amb dos bucles niats**: l'exterior per a files i l'interior per a columnes, usant matriz\[i\].length.  
3. Java admet **arrays irregulars** on cada fila té la seua longitud, i matriz.length i matriz\[i\].length no són el mateix.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| Array multidimensional | Array els elements del qual són altres arrays |
| Fila | Primera dimensió (l'índex i) |
| Columna | Segona dimensió (l'índex j) |
| Array irregular | Cada fila amb diferent nombre de columnes |
| Diagonal principal | Els elements on fila \== columna |

# **4\. La classe Arrays: la teua navalla suïssa** {#4.-la-classe-arrays:-la-teua-navalla-suïssa}

## **📬 La idea en una frase**

java.util.Arrays és una classe plena de mètodes estàtics per a treballar amb arrays: imprimir, ordenar, copiar, buscar i omplir sense escriure tu el bucle.

Els arrays tenen un problema: no tenen mètodes. numeros.sort() no existeix. Per això Java et regala una classe de ferramentes, totes estàtiques, perquè no hagis de reinventar el bucle cada volta. És el més paregut a una navalla suïssa que existeix en el món dels arrays.

## **🧰 La classe Arrays**

S'importa amb import java.util.Arrays; i els seus mètodes es criden passant-li l'array:

| import java.util.Arrays;public class EjemploArrays {   public static void main(String\[\] args) {       int\[\] numeros \= { 5, 2, 8, 1, 9 };       Arrays.sort(numeros); *// {1, 2, 5, 8, 9}*       String texto \= Arrays.toString(numeros); *// "\[1, 2, 5, 8, 9\]"*       System.out.println(texto);   }} |
| :---- |

Recorda: com són mètodes static (ho vas vore en la U09), es criden amb el nom de la classe: Arrays.xxx(array). No cal crear cap objecte Arrays — de fet, no pots.

### **🔍 Arrays.toString: imprimir bonic**

El mètode més socorregut. Sense ell, imprimir un array mostra escombraries:

| *int\[\] numeros \= {1, 2, 3};System.out.println(numeros); // \[I@6d06d69c o paregut (adreça de memòria, inútil)System.out.println(Arrays.toString(numeros)); // \[1, 2, 3\]* |
| :---- |

Sense toString, Java imprimeix l'adreça de memòria de l'objecte (\[I@6d06d69c), no les dades. Amb ell, obtens alguna cosa llegible. Per a arrays 2D existeix Arrays.deepToString().

⚠️ **Advertència:** numeros.toString() tampoc no funciona: els arrays no sobreescriuen toString(). Sempre Arrays.toString(numeros).

### **📊 Arrays.sort: ordenar d'un buf**

Ordena l'array al lloc, de menor a major (segons l'ordre natural del tipus):

| *int\[\] notas \= {7, 3, 9, 5};Arrays.sort(notas);System.out.println(Arrays.toString(notas)); // \[3, 5, 7, 9\]* |
| :---- |

Amb String ordena alfabèticament. Compte amb les majúscules: "Zebra" va abans que "abc" perquè les majúscules tenen menor valor Unicode. És ordenació lexicogràfica, no "de diccionari humà".

### **🔎 Arrays.binarySearch: buscar ràpid (però només ordenat)**

La cerca binària partix l'array per la meitat a cada pas. És rapidíssima, però **exigeix que l'array estiga ordenat abans**.

| *int\[\] numeros \= {3, 5, 7, 9, 11};int pos \= Arrays.binarySearch(numeros, 7);System.out.println(pos); // 2* |
| :---- |

Si el valor no hi és, torna un número negatiu (-(puntDInsercio) \- 1). Compte: si l'array no està ordenat, el resultat és impredictible. Ordena abans de buscar, sempre.

### **📋 Arrays.copyOf: copiar amb talla nova**

Crea un **nou** array amb els primers n elements (o tots més zeros si demanes més dels que hi ha):

| *int\[\] original \= {1, 2, 3, 4, 5};int\[\] retallat \= Arrays.copyOf(original, 3); // {1, 2, 3}int\[\] allargat \= Arrays.copyOf(original, 8); // {1, 2, 3, 4, 5, 0, 0, 0}* |
| :---- |

És la forma civilitzada de "canviar la grandària" d'un array, que com saps és fixa: en crees un de nou i copies.

### **🧽 Arrays.fill: omplir-ho tot d'un colp**

Posa el mateix valor a totes les places:

| *int\[\] tabla \= new int\[10\];Arrays.fill(tabla, 0); // tot a zerosArrays.fill(tabla, 7); // tot a sets* |
| :---- |

Útil per a inicialitzar taulers, reiniciar marcadors o preparar un array abans d'usar-lo.

### **⚖️ Arrays.equals: comparar contingut, no referències**

Este és el que més bugs evita. array1.equals(array2) NO compara els elements: compara si són el MATEIX objecte en memòria. Usa SEMPRE Arrays.equals():

| *int\[\] a \= {1, 2, 3};int\[\] b \= {1, 2, 3};System.out.println(a.equals(b)); // false (objectes diferents en memòria)System.out.println(Arrays.equals(a, b)); // true (mateix contingut)* |
| :---- |

El teu cap t'ho agrairà.

## **🧭 El mapa de la navalla**

| Mètode | Què fa | Compte amb |
| ----- | ----- | ----- |
| **Arrays.toString(arr)** | Imprimeix l'array llegible | No usar arr.toString() |
| **Arrays.sort(arr)** | Ordena al lloc | Modifica l'original |
| **Arrays.binarySearch(arr, v)** | Busca per índex | Requerix array ordenat |
| **Arrays.copyOf(arr, n)** | Nou array amb n elements | Crea còpia, no toca l'original |
| **Arrays.fill(arr, v)** | Ompli tot amb v | Servix per a inicialitzar |
| **Arrays.equals(a, b)** | Compara contingut | No confondre amb \== |
| **Arrays.deepToString(arr2d)** | Imprimeix arrays 2D | Versió profunda del toString |

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** Arrays.binarySearch() requerix l'array ORDENAT. Si no, el resultat és impredictible. És com buscar en un diccionari que no està alfabètic: no trobaràs res fiable.

**Exercici: la cerca que ho tenia tot**

| import java.util.Arrays;public class BeTheSort {   public static void main(String\[\] args) {       int\[\] datos \= { 42, 17, 8, 99, 3 };       Arrays.sort(datos);       int indice \= Arrays.binarySearch(datos, 42);       System.out.println(indice);   }} |
| :---- |

**Què imprimeix?**

* (A) 0  
* (B) 3  
* (C) 4  
* (D) 99

**🔄 Solució**

La **B**. Després d'ordenar, l'array és {3, 8, 17, 42, 99}. El 42 està a l'índex 3\. Si no hagueres ordenat abans, binarySearch podria haver-te tornat qualsevol cosa, inclòs un negatiu fals.

## **🎯 Mini-chequeig**

Posat a prova en 30 segons (les respostes estan amagades):

1. Què torna Arrays.binarySearch si el valor no està a l'array?  
2. a.equals(b) i Arrays.equals(a, b) fan el mateix?  
3. Què fa Arrays.copyOf(arr, 10\) si arr té 4 elements?  
4. Per què System.out.println(arr) no imprimeix les dades?

**🔄 Respostes**

1. Un número negatiu (-(puntDInsercio) \- 1). És una forma compacta de dir "no hi és, però ací aniria".  
2. No. a.equals(b) compara referències (és el mateix objecte?); Arrays.equals(a, b) compara el contingut element a element.  
3. Crea un nou array de 10 places amb els 4 valors i la resta a 0\. És el truc per a "engrandir" un array.  
4. Perquè arr és un objecte i el seu toString() heretat imprimeix l'adreça de memòria (\[I@...). Per a vore les dades usa Arrays.toString(arr).

## **✅ Resum en 3 frases**

1. java.util.Arrays és la caixa de ferramentes **estàtica** dels arrays: s'importa i s'usa sense crear objectes.  
2. Els cinc imprescindibles: toString (imprimir), sort (ordenar), copyOf (copiar), binarySearch (buscar, requerix ordre) i fill (omplir).  
3. Per a **comparar contingut** usa Arrays.equals, mai equals ni \==, que comparen referències.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| Classe utilitària | Classe amb mètodes estàtics que no s'instancia (com Math) |
| Ordre natural | L'ordre que el tipus defineix per defecte (numèric, alfabètic) |
| Cerca binària | Cerca que partix l'array per la meitat; requerix ordre |
| Ordenació lexicogràfica | Ordre alfabètic segons el valor dels caràcters |
| Còpia | Nou array independent amb els mateixos valors |

# **5\. Arrays i mètodes** {#5.-arrays-i-mètodes}

## **📬 La idea en una frase**

Quan passes un array a un mètode, passes la referència, no les dades: el mètode compartix el teu aparcament i, si toca un cotxe, el canvi es veu fora.

Ací se't cauran les ulleres (o se't posaran de moda). Java passa els arguments **per valor**. Però els arrays semblen arribar per referència... La clau: es passa per valor la **còpia de la referència**. **L'array no es copia; només es copia l'adreça on és.**

## **🏃 Passant el testimoni**

Mira este programa i la seua eixida:

| public class ArraysMetodos {   public static void main(String\[\] args) {       int\[\] edades \= { 10, 20, 30 };       modificar(edades);       System.out.println(edades\[0\]); *// 99*   }   public static void modificar(int\[\] arr) {       arr\[0\] \= 99;   }} |
| :---- |

Imprimeix 99, no 10\. El mètode modificar ha canviat la plaça 0 de l'array edades... encara que l'array es va crear en main. Com és possible si Java passa per valor?

L'explicació: **la referència** (l'adreça de memòria on viu l'array) es copia en passar al mètode. La còpia i l'original apunten al **mateix aparcament**. Quan el mètode fa arr\[0\] \= 99, no canvia la seua còpia de la referència: canvia el contingut de l'objecte al qual tots dos apunten.

📝 **Nota:** això NO és un pas per referència de veritat. Java mai passa la variable per referència. Passa una còpia de la referència (per això es diu *pass-by-value*). Però com l'array és un objecte, eixa còpia apunta al mateix lloc.

## **🆚 Primitius vs arrays: la diferència clau**

Compara el comportament:

| public class PasoDeDatos {   public static void main(String\[\] args) {       int numero \= 5;       cambiarNumero(numero);       System.out.println(numero); *// 5 (el primitiu NO canvia)*       int\[\] arr \= { 1, 2, 3 };       cambiarArray(arr);       System.out.println(arr\[0\]); *// 99 (l'array SÍ canvia)*   }   static void cambiarNumero(int n) {       n \= 99; *// canvia la còpia, l'original seguix en 5*   }   static void cambiarArray(int\[\] a) {       a\[0\] \= 99; *// canvia el contingut de l'objecte compartit*   }} |
| :---- |

| Tipus | Què rep el mètode | Es modifica fora? |
| ----- | ----- | ----- |
| int, double, boolean... | Una còpia del valor | No |
| String | Una còpia de la referència (String és immutable) | No (per immutable) |
| Array (int\[\], String\[\]...) | Una còpia de la referència | Sí, si es modifiquen elements |
| Objectes | Una còpia de la referència | Sí, si es modifiquen atributs |

⚠️ **Advertència:** si dins del mètode fas arr \= otroArray, NO canvies l'array original: només reassignes la teua còpia de la referència. Per a modificar l'original, toca elements (arr\[i\] \= ...) o atributs de l'objecte, mai la variable.

## **🧪 Mètodes que usen arrays**

### **Rebre un array per a calcular**

| public static double media(int\[\] notas) {   int suma \= 0;   for (int n : notas) {       suma \+= n;   }   return (double) suma / notas.length;} |
| :---- |

### **Modificar un array (el canvi es veu fora de la funció, sense return)**

| public static void duplicar(int\[\] arr) {   for (int i \= 0; i \< arr.length; i++) {       arr\[i\] \*= 2;   }} |
| :---- |

### **Tornar un array nou**

Els mètodes també poden **tornar** arrays. Ací se'n crea un de nou i s'ompli:

| *public static int\[\] primerosCuadrados(int n) {   int\[\] resultado \= new int\[n\];   for (int i \= 0; i \< n; i++) {       resultado\[i\] \= (i \+ 1) \* (i \+ 1);   }   return resultado;}// Al main:int\[\] cuadrados \= primerosCuadrados(4);System.out.println(Arrays.toString(cuadrados)); // \[1, 4, 9, 16\]* |
| :---- |

Quan tornes un array, tornes una **referència** a un objecte del heap. Qui la rep pot usar i modificar eixe objecte. Per això, si no vols que te'l toquen, torna una còpia (Arrays.copyOf).

## **🏁 El famós main(String\[\] args)**

**Des de la U02 portes escrivint main(String\[\] args) sense parar-te a pensar.** És un mètode que rep un array de Strings\! Eixos són els arguments de línia de comandes:

| public class Saludo {   public static void main(String\[\] args) {       System.out.println("Hola, " \+ args\[0\]);   }} |
| :---- |

Si l'executes amb java Saludo Ana, args serà {"Ana"} i imprimirà Hola, Ana. Si l'executes sense arguments i accedixes a args\[0\], ArrayIndexOutOfBoundsException — el mateix error del punt 1, ara amb la cara de args.

💡 **Consell:** args.length et diu quants arguments t'han passat. Comprova sempre abans d'accedir: if (args.length \> 0\) { ... }.

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** els arrays es passen per referència (còpia de la referència). Les variables primitives es passen per valor. Si ho entens ací, entens el 90% dels bugs rars del curs.

**Exercici: l'array al quadrat**

| import java.util.Arrays;public class BeTheArrayRevelde {   public static void main(String\[\] args) {       int\[\] nums \= { 1, 2, 3, 4, 5 };       for (int i \= 0; i \< nums.length; i++) {           nums\[i\] \= nums\[i\] \* nums\[i\];       }       System.out.println(nums\[2\]);   }} |
| :---- |

**Què imprimeix?**

* (A) 3  
* (B) 6  
* (C) 9  
* (D) 25

**🔄 Solució**

La **C**. Es fa el quadrat de cada número al lloc: {1, 4, 9, 16, 25}. nums\[2\] \= 9\. No hi ha trampa de referències ací perquè tot passa al mateix mètode, però el patró (arr\[i\] \= ...) és el mateix que usaríes per a modificar un array passat a un mètode.

## **🎯 Mini-chequeig**

Posat a prova en 30 segons (les respostes estan amagades):

1. Què imprimeix este codi: int\[\] a \= {1,2,3}; cambiar(a); on cambiar(int\[\] x) { x\[0\] \= 7; }?  
2. I si el mètode fa x \= new int\[\]{9,9,9} en comptes de tocar x\[0\]?  
3. String es comporta com un array o com un primitiu al passar-lo a un mètode?  
4. Què guarda realment la variable args de main?

**🔄 Respostes**

1. 7\. El mètode modifica el contingut de l'objecte compartit, i el canvi es veu en main.  
2. Res: l'array original seguix {1, 2, 3}. x \= new int\[\]{...} només reassigna la còpia local de la referència.  
3. Com un primitiu "especial": la referència es copia, però String és immutable, així que cap mètode no pot canviar el seu contingut. L'original mai canvia.  
4. Un array de String amb els arguments de línia de comandes. args\[0\] és el primer, args.length quants n'hi ha.

## **✅ Resum en 3 frases**

1. Els **arrays es passen per referència** (una còpia de la referència a l'objecte compartit): modificar-los dins d'un mètode es veu fora.  
2. Els **primitius es passen per valor**: el mètode rep una còpia i l'original no canvia; els String, per ser immutables, es comporten com ells.  
3. Els mètodes poden **tornar arrays** (una referència a un objecte nou) i main(String\[\] args) és, en realitat, un mètode que rep un array.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| Pas per valor | Es copia la dada (primitius, referències) |
| Pas per referència | Es compartix l'objecte (efecte visible en arrays) |
| Referència | Adreça de memòria on viu l'objecte |
| Àlies | Dues variables que apunten al mateix objecte |
| Arguments de main | L'array args amb els paràmetres de la línia de comandes |

# **6\. Aplicacions dels arrays** {#6.-aplicacions-dels-arrays}

## **📬 La idea en una frase**

Els arrays no són només per a números: guardes noms, paraules, caràcters, objectes i fins i tot taules senceres. Tot el que es puga comptar, es pot ficar en un aparcament.

Fins ara has aparcat números. Però en la vida real les dades tenen noms: alumnes, assignatures, temperatures, pel·lícules... Este punt t'ensenya a guardar **coses** (no només números) en els teus arrays, i a donar-los un ús de veritat.

## **📝 Arrays de String: la llista de la classe**

L'array més humà que existeix: una llista de noms.

| String\[\] clase \= {"Ana", "Bruno", "Carla", "Diego"};for (String alumno : clase) {   System.out.println("Hola, " \+ alumno);} |
| :---- |

Cada plaça guarda una String. Res de nou en la sintaxi: el que canvia és el que guardes. I amb ells pots fer coses pròpies del text:

| String\[\] frutas \= {"pera", "manzana", "pera", "uva"};int peras \= 0;for (String fruta : frutas) {   if (fruta.equals("pera")) {       peras++;   }}System.out.println("Hay " \+ peras \+ " peras."); |
| :---- |

⚠️ **Advertència:** amb String mai no compares amb \==. Usa .equals(). Ho vas vore en la U03 i en els arrays és igual d'obligatori: fruta \== "pera" compara referències, no text.

### **El més famós de tots: args**

L'array de String més usat del curs el portes escrivint des de la U02: main(String\[\] args). En el punt 5 vas vore que conté els arguments de la línia de comandes. Doncs això: un String\[\] de veritat, com el de la teua classe.

## **🔤 char\[\] vs String**

Un char\[\] és un array de caràcters. I compte: s'assembla moltíssim a una String... però no és el mateix.

| char\[\] vocales \= {'a', 'e', 'i', 'o', 'u'};for (int i \= 0; i \< vocales.length; i++) {   System.out.print(vocales\[i\] \+ " ");} |
| :---- |

| Cosa | String | char\[\] |
| ----- | ----- | ----- |
| Immutable? | Sí: no es pot canviar | No: pots tocar cada plaça |
| Mètodes | length(), charAt(), substring()... | No en té (uses bucles) |
| Es pot modificar una lletra? | No (en crees una altra) | Sí: vocales\[0\] \= 'A'; |
| Passar a mètode | Es comporta com immutable | Es compartix com qualsevol objecte |

💡 **Consell:** si necessites "canviar una lletra", amb String no pots. Una opció és passar-la a char\[\], modificar-la i tornar a construir la String. En la U14 (fitxers i regex) esta idea eixirà diverses voltes.

## **🧍 Arrays d'objectes: l'aparcament de persones**

Ací és on l'aparcament brilla de veritat. Els arrays no només guarden primitius o String: guarden **objectes** de qualsevol classe. Com encara no has creat les teues pròpies classes (això és la U08), usa una senzilla per a l'exemple:

| class Alumno {   String nombre;   int nota;   Alumno(String nombre, int nota) {       this.nombre \= nombre;       this.nota \= nota;   }}class Ejercicio {   public static void main(String\[\] args) {       Alumno\[\] alumnos \= new Alumno\[3\];       alumnos\[0\] \= new Alumno("Ana", 8);       alumnos\[1\] \= new Alumno("Bruno", 5);       alumnos\[2\] \= new Alumno("Carla", 10);       int aprobados \= 0;       for (Alumno a : alumnos) {           if (a.nota \>= 5) {               aprobados++;           }       }       System.out.println("Aprobados: " \+ aprobados);   }} |
| :---- |

⚠️ **Advertència:** un Alumno\[\] acabat de crear està ple de null, no d'alumnes. new Alumno\[3\] crea 3 places buides; si accedixes a alumnos\[0\].nombre sense crear l'objecte abans, NullPointerException a l'acte. Primer new Alumno(...), després usar.

El bucle és idèntic al dels números: canvia el contingut, no la mecànica. Això es diu **recórrer una col·lecció d'objectes**, i ho faràs moltíssim la resta del curs.

## **🗂️ Arrays de arrays: les dades en taula**

L'últim clàssic: guardar diverses llistes a la vegada. Si tens les notes de diversos alumnes en diverses assignatures, una taula double\[\]\[\] és la forma natural:

| double\[\]\[\] notas \= {    {8.0, 7.5, 9.0}, *// Ana: Matemàtiques, Llengua, Anglés*    {5.0, 6.0, 4.5}, *// Bruno*    {9.5, 8.0, 10.0}, *// Carla*};for (int i \= 0; i \< notas.length; i++) {   double suma \= 0;   for (int j \= 0; j \< notas\[i\].length; j++) {       suma \+= notas\[i\]\[j\];   }   System.out.println("Alumne " \+ i \+ ": mitjana " \+ (suma / notas\[i\].length));} |
| :---- |

Cada fila és un alumne i cada columna una assignatura. Amb dos bucles niats (els del punt 3\) recorres tota la taula i calcules el que necessites. Els programes que "porten el compte" de la vida real són, en el fons, això.

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** quan un array guarda objectes, el bucle no canvia res: recorre, pregunta, acumula. L'únic que és nou és que preguntes per **atributs** (a.nota), no per valors solts.

**Exercici: la cerca de la pel·lícula**

| public class BeTheCatalogo {   public static void main(String\[\] args) {       String\[\] peliculas \= { "Alien", "Matrix", "Gladiator", "Matrix", "Coco" };       String buscada \= "Matrix";       int cuantas \= 0;       for (String p : peliculas) {           if (p.equals(buscada)) {               cuantas++;           }       }       System.out.println(cuantas);   }} |
| :---- |

**Què imprimeix?**

* (A) 1  
* (B) 2  
* (C) 3  
* (D) Matrix

**🔄 Solució**

La **B**. El for-each recorre les 5 pel·lícules i el if compta quantes voltes apareix "Matrix". Apareix en les posicions 1 i 3: dues voltes. Fixa't en el .equals(): amb \== compararies referències i "Matrix" no seria igual a cap, perquè són objectes diferents en memòria.

## **🎯 Mini-chequeig**

Posat a prova en 30 segons (les respostes estan amagades):

1. Què hi ha a les places d'un Alumno\[\] acabat de crear?  
2. Per què fruta \== "pera" és un error amb String?  
3. Pots modificar una lletra d'una String? I d'un char\[\]?  
4. Quin bucle usaríes per a sumar una fila d'una taula double\[\]\[\]?

**🔄 Respostes**

1. null. new Alumno\[3\] crea 3 places buides; cal crear els objectes amb new Alumno(...).  
2. Perquè \== compara referències (és el mateix objecte?), no el contingut. Amb String cal usar .equals().  
3. No, String és immutable. Sí, char\[\] no ho és: vocales\[0\] \= 'A' funciona.  
4. Un for niat, o un for per la fila concreta: for (int j \= 0; j \< notas\[i\].length; j++).

## **✅ Resum en 3 frases**

1. Els arrays guarden **el que siga**: String, char, objectes propis i taules senceres, amb la mateixa mecànica de sempre.  
2. Amb String usa **.equals()** i recorda que un array d'objectes acabat de crear està ple de **null**.  
3. Els **arrays d'objectes** (recorres atributs) i els **arrays 2D** (recorres files i columnes) són la base dels programes que gestionen dades de la vida real.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| Array d'objectes | Aparcament on cada plaça guarda un objecte (Alumno, String...) |
| null | El valor per defecte de les places d'objectes acabades de crear |
| Immutable | Que no es pot canviar; la String ho és |
| char\[\] | Array de caràcters, modificable, sense mètodes propis |
| Taula de dades | double\[\]\[\]: files i columnes per a dades reals |

# **7\. Be the Code: l'aparcament es gestiona** {#7.-be-the-code:-l'aparcament-es-gestiona}

## **📬 La idea en una frase**

Este punt no té teoria nova: té tres reptes. Invertir un array sense mirar apunts, buscar totes les posicions d'un valor i caçar els errors d'un array que es rebel·la.

La classe Arrays t'ho dona tot fet: ordena, copia, busca... Però quan et demanen "inverteix este array" en una entrevista, ningú et deixa usar Arrays.sort(). Cal saber-ho fer a mà. Este punt és el teu gimnàs.

## **🕶️ Don Tip: la recepta mental de l'invers al lloc**

Invertir un array és el clàssic de les entrevistes. La recepta mental:

1. Dos punters: izquierda \= 0 i derecha \= array.length \- 1\.  
2. Mentre izquierda \< derecha: intercanvia array\[izquierda\] i array\[derecha\].  
3. izquierda++ i derecha--.  
4. Quan es creuen, ja està.

L'error més comú: crear un **array auxiliar** quan no cal. Al lloc, amb dos punters i una variable temporal, és O(n) de temps i O(1) de memòria. Això és el que impressiona en una entrevista.

## **🧩 REPTE 1: Invertir l'array al lloc**

Completa el mètode invertir perquè done la volta a l'array **sense crear un altre array**. Ha de mostrar 5 4 3 2 1:

| public class RetoInverso {   public static void invertir(int\[\] array) {       *// 🧠 EL TEU CODI ACÍ*   }   public static void main(String\[\] args) {       int\[\] datos \= { 1, 2, 3, 4, 5 };       invertir(datos);       for (int n : datos) {           System.out.print(n \+ " ");       }   }} |
| :---- |

**Passos guiats (resisteix a llegir-los tots de colp):**

1. Declara els dos punters.  
2. Escriu el while amb la condició correcta.  
3. Intercanvia els dos elements amb una variable temporal.  
4. Mou els punters cap al centre.

**🔄 Solució completa**

| public static void invertir(int\[\] array) {   int izquierda \= 0;   int derecha \= array.length \- 1;   while (izquierda \< derecha) {       int temp \= array\[izquierda\];       array\[izquierda\] \= array\[derecha\];       array\[derecha\] \= temp;       izquierda++;       derecha--;   }} |
| :---- |

## **🧩 REPTE 2: Buscar totes les posicions**

binarySearch et dona una posició. Este repte et demana **totes**. Escriu un mètode que torne un array amb tots els índexs on apareix un valor (buit si no apareix):

| public class RetoBusqueda {   public static int\[\] posiciones(int\[\] datos, int buscado) {       *// 🧠 EL TEU CODI ACÍ*       return new int\[0\];   }   public static void main(String\[\] args) {       int\[\] datos \= { 3, 7, 2, 7, 9, 7, 1 };       System.out.println(java.util.Arrays.toString(posiciones(datos, 7)));       System.out.println(java.util.Arrays.toString(posiciones(datos, 5)));   }} |
| :---- |

Ha de mostrar \[1, 3, 5\] i \[\].

**Passos guiats:**

1. Primera passada: compta quantes voltes apareix.  
2. Crea l'array de resultats amb eixa grandària.  
3. Segona passada: ompli les posicions.

💡 **Consell de depuració:** este "comptar primer, crear després" és un patró que es repeteix: no pots crear l'array de resultats fins a saber quantes places necessita. Quan la grandària depén de les dades, es fa en dues passades.

**🔄 Solució completa**

| public static int\[\] posiciones(int\[\] datos, int buscado) {   int cuantas \= 0;   for (int i \= 0; i \< datos.length; i++) {       if (datos\[i\] \== buscado) {           cuantas++;       }   }   int\[\] resultado \= new int\[cuantas\];   int k \= 0;   for (int i \= 0; i \< datos.length; i++) {       if (datos\[i\] \== buscado) {           resultado\[k++\] \= i;       }   }   return resultado;} |
| :---- |

## **🧩 EL LÍO: l'aparcament que es va rebel·lar**

L'encarregat de l'aparcament ha escrit això per a "deixar les places imparelles buides". Alguna cosa fa mala olor. Troba els errors:

| public class ParkingLioso {   public static void vaciarImpares(int\[\] arr) {       for (int i \= 0; i \< arr.length; i++) {           if (arr\[i\] % 2 \== 1) {               arr\[i\] \= null; *// 🚨 compila això?*           }       }   }} |
| :---- |

🕶️ **Don Tip:** pregunta sempre: quin tipus de dada guarda este array? Un int no pot valer null; un Integer sí (però això és un objecte).

**🔄 Solució**

**No compila.** arr és un int\[\], i int és un tipus primitiu: **no pot valer null**. null només cap en variables de tipus objecte (String, Integer, Alumno...).

Si volgueres "buidar" un int\[\], hauríes de posar un valor de sentinella, per exemple 0 o \-1. I si de veritat necessites places buides de veritat, hauríes de usar un array d'objectes (Integer\[\]), que veuràs en la U12 amb les col·leccions.

## **🎯 Mini-chequeig**

Posat a prova en 30 segons (les respostes estan amagades):

1. Quina condició usa el while de l'invers al lloc: \< o \<=?  
2. Què passa si uses \<= en l'invers amb un array de longitud senar?  
3. Per què el patró "comptar primer, crear després" necessita dues passades?  
4. Pot un int\[\] guardar null? I un String\[\]?

**🔄 Respostes**

1. izquierda \< derecha. Amb \<= et sobraria el pas en què tots dos punters apunten al mateix element (amb longitud senar), que a més intercanviaria un element amb si mateix.  
2. Amb longitud senar, a la volta central izquierda \== derecha: intercanvies l'element amb si mateix (inútil però inofensiu). Amb \< ni tan sols entres ací.  
3. Perquè no saps quantes places necessita l'array de resultats fins a comptar les coincidències. Els arrays tenen grandària fixa: cal saber-la abans de crear-los.  
4. No: int és primitiu i no accepta null. Sí: String és un objecte i el seu valor per defecte és null.

## **✅ Resum en 3 frases**

1. **Invertir al lloc** és el clàssic de les entrevistes: dos punters (izquierda/derecha), intercanvi amb temp, i while (izquierda \< derecha).  
2. Quan la grandària del resultat **depén de les dades**, es fa servir el patró de **dues passades**: comptar primer, crear i omplir després.  
3. null no cap en un array de **primitius**: només en arrays d'objectes. Amb int\[\] s'usen valors de sentinella.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| Invertir al lloc | Donar la volta a l'array sense crear-ne un altre, amb dos punters |
| Variable temporal | El temp que guarda un valor durant l'intercanvi |
| Dues passades | Comptar primer i crear/omplir després (grandària dependent de les dades) |
| Valor de sentinella | Un valor especial (-1, 0\) que significa "buit" en primitius |
| Punter | Índex que delimita una zona (izquierda, derecha) |

# **8\. Array-revelde: errors comuns i depuració** {#8.-array-revelde:-errors-comuns-i-depuració}

## **📬 La idea en una frase**

Els arrays no es rebel·len per maldat: es rebel·len perquè oblides els límits. Conéixer els 6 monstres típics és la mitat de la batalla; saber depurar és l'altra mitat.

A aquestes alçades ja has escrit els teus primers arrays. I, si ets humà, ja t'has estavellat una volta (o dos, o cinquanta). Este punt recopila els errors més comuns de l'univers array perquè els reconegues a l'instant i deixes de plorar sobre el teclat.

## **👹 La galeria de monstres**

### **Monstre 1: la ArrayIndexOutOfBoundsException**

El rei del mambo. Eixes de les places vàlides (0 a length \- 1).

| *int\[\] a \= {10, 20, 30};System.out.println(a\[3\]); // Index 3 out of bounds for length 3* |
| :---- |

🔍 **Diagnòstic:** el missatge et diu l'índex i la longitud. Si demanes a\[3\] i hi ha 3 places (0, 1, 2), el problema és el \<= del teu bucle o un índex calculat malament. Llig el missatge: no és un misteri, és una pista.

### **Monstre 2: la NullPointerException**

Recorres un array d'objectes acabat de crear i toques una plaça sense objecte.

| *String\[\] nombres \= new String\[3\];System.out.println(nombres\[0\].toUpperCase()); // BOOM: null no té mètodes* |
| :---- |

🔍 **Diagnòstic:** les places d'un String\[\] nou estan plenes de null. Pregunta abans: if (nombres\[i\] \!= null) { ... } o crea els objectes al principi.

### **Monstre 3: imprimir sense Arrays.toString**

| *int\[\] a \= {1, 2, 3};System.out.println(a); // \[I@6d06d69c o alguna cosa similar* |
| :---- |

🔍 **Diagnòstic:** imprimeix l'adreça de memòria, no les dades. Sempre Arrays.toString(a) (o Arrays.deepToString per a 2D). Ho vas vore en el punt 4 i no et cansaràs de vore-ho.

### **Monstre 4: comparar amb \==**

| *int\[\] a \= {1, 2, 3};int\[\] b \= {1, 2, 3};System.out.println(a \== b); // false: són el MATEIX objecte?System.out.println(a.equals(b)); // false també: els arrays no sobreescriuen equalsSystem.out.println(Arrays.equals(a, b)); // true: això compara contingut* |
| :---- |

🔍 **Diagnòstic:** \== i equals comparen **referències**. Per a comparar contingut: Arrays.equals(a, b).

### 

### **Monstre 5: confondre length, length() i size()**

| *int\[\] a \= {1, 2, 3};String s \= "Hola";System.out.println(a.length()); // no compila: array usa length (atribut)System.out.println(s.length); // no compila: String usa length() (mètode)* |
| :---- |

🔍 **Diagnòstic:** la regla d'or: **array → length** (sense parèntesis), **String → length()**, **col·lecció → size()**. Els exàmens adoren esta trampa.

### **Monstre 6: intentar modificar amb for-each**

| *int\[\] a \= {1, 2, 3};for (int n : a) {   n \= n \* 10; // pugen els valors? NO: canvia una còpia}System.out.println(Arrays.toString(a)); // \[1, 2, 3\]* |
| :---- |

🔍 **Diagnòstic:** el for-each és de només lectura. La variable n és una còpia del valor de la plaça. Per a modificar, for amb índex: a\[i\] \= a\[i\] \* 10;.

## **🤬 CONRAD VS EL MÓN: "L'array que no es calla"**

*CONRAD, el nostre compilador rondinaire, té la tassa plena i els arrays trencats sobre la taula.*

**CONRAD:** — ¡ALTRES VEGADES\! Em porten un programa i em diuen: *CONRAD, em dona ArrayIndexOutOfBoundsException*. I jo: i tu què has fet? *Doncs recórrer l'array.* AMB QUÈ? *Doncs amb un for... crec.* ¡AI, MARE MEUA\! Un for amb quina condició? *Doncs i \<= numeros.length...* ¡¿\<=?\! ¡PERÒ SI T'HO VAIG DIR EN EL PUNT 2\! L'últim índex vàlid és length \- 1\. \<= et porta a la plaça fantasma i d'allí no torna ningú.

*I després estan els que pregunten per què els ix null. Pregunta: què tens a la plaça?* No ho sé, la vaig crear amb new String\[10\]. *I quantes places has omplit?* Doncs... bé... ¡AH\! ¡CAP\! Un String\[\] acabat de crear és una fila de null. Si no fiques objectes, no hi ha objectes. És tan difícil?

*I el favorit de tots:* no em funciona el bucle que duplica. *Ensenya-me'l.* 

És un for-each que fa n \= n \* 2\. *I esperaves canviar l'array?* Doncs sí. ¡EL for-each NO MODIFICA\! És com un robot lector de matrícules: llig, però no repinta. Per a repintar, índex i claudàtors.

**La lliçó:** els sis monstres tenen nom, missatge i cura. El 90% dels "arrays rebel·les" s'arreglen mirant el missatge d'error amb calma i recordant les regles d'or: límits (0 a length-1), null en objectes, Arrays.toString per a imprimir, Arrays.equals per a comparar, length sense parèntesis i for amb índex per a modificar.

## **🐛 Depurar arrays sense perdre el cap**

Quan un array es porta malament, seguix este ordre:

1. **Imprimeix l'array complet** amb Arrays.toString() a cada pas. Vore les dades a la vista arregla la mitat dels misteris.  
2. **Comprova els límits abans de tocar.** Si vas a accedir a a\[i \+ 1\], que i no arribe a length \- 1\. Pregunta sempre: pot eixir-se?  
3. **Usa el depurador de l'IDE.** Posa un *breakpoint* al bucle i observa i a cada volta. Si es passa de length \- 1, ho veus a la primera.  
4. **Paper i boli.** Amb un array de 3 elements i un objectiu que no hi siga, simula el bucle a mà. Sí, en ple segle XXI, i seguix funcionant.  
5. **Aïlla l'error.** Dividix el problema: primer ompli i comprova que el contingut és correcte; després el bucle; després el càlcul. Si alguna cosa falla, sabràs quin tram és.

💡 **Consell:** el missatge d'excepció de Java no és el teu enemic: és un detectiu que et diu la línia i el motiu. Index 5 out of bounds for length 5 no deixa lloc a dubtes. LLEGEIX-LO abans de tocar res.

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** quan alguna cosa falle, pregunta abans "què esperava?" i després "què he escrit?". El 90% de les voltes la diferència entre les dues respostes és un \<=, un null o un \==.

**Exercici: el caçador de monstres**

| public class CazaMonstruos {   public static void main(String\[\] args) {       int\[\] datos \= new int\[5\];       for (int i \= 1; i \<= datos.length; i++) {           datos\[i\] \= i \* 10;       }       System.out.println(java.util.Arrays.toString(datos));   }} |
| :---- |

**Què ocorre?**

* (A) Imprimeix \[10, 20, 30, 40, 50\]  
* (B) Imprimeix \[0, 10, 20, 30, 40\]  
* (C) ArrayIndexOutOfBoundsException  
* (D) NullPointerException

**🔄 Solució**

La **C**. El bucle va de i \= 1 a i \= 5 inclòs (\<=). Quan i val 5, fa datos\[5\] \= 50, però les places vàlides van de 0 a 4\. Monstre 1 en acció. I de passada, la plaça 0 es queda sense tocar (a 0), perquè el bucle comença en 1: un altre ensurt per als despistats.

## **🎯 Mini-chequeig**

Posat a prova en 30 segons (les respostes estan amagades):

1. Quina excepció llançes en accedir a a\[a.length\]?  
2. Què hi ha en String\[\] s \= new String\[3\] a cada plaça?  
3. Com compares dos arrays per a saber si tenen el mateix contingut?  
4. Amb quin bucle pots modificar els elements d'un array?

**🔄 Respostes**

1. ArrayIndexOutOfBoundsException: l'índex length no existeix, les places acaben en length \- 1\.  
2. null a les tres. Les places d'objectes acabades de crear estan buides fins que les omplis amb new.  
3. Amb Arrays.equals(a, b). \== i a.equals(b) comparen referències, no contingut.  
4. Amb el for clàssic amb índex (a\[i\] \= ...). El for-each és de només lectura.

## **✅ Resum en 3 frases**

1. Els **sis monstres** dels arrays són: índex fora de rang, null, imprimir sense toString, comparar amb \==, confondre length/length()/size() i modificar amb for-each.  
2. El **missatge de l'excepció és una pista**: et diu la línia i el motiu. Llegeix-lo abans de tocar res.  
3. Depurar un array és **vore les dades** (Arrays.toString), **respectar els límits** i aïllar el tram que falla, amb boli o amb *breakpoint*.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| Monstre | Error típic amb nom i cura (ArrayIndexOutOfBounds, NullPointer...) |
| Arrays.toString | La forma d'imprimir un array llegible |
| Arrays.equals | Comparar contingut de dos arrays |
| Valor de sentinella | Valor especial que representa "buit" en primitius |
| *Breakpoint* | Punt de parada del depurador per a inspeccionar variables |

# **9\. Repàs: l'aparcament a examen** {#9.-repàs:-l'aparcament-a-examen}

## **📬 La idea en una frase**

En este punt no aprenem res de nou: ho convertim tot en pràctica. I, com sempre, alguna cosa no funcionarà. 😈

## **⭐ Sé el Código, my friend...**

*Eres la JVM. Acaben de donar-te este programa per a executar:*

| public class Misterio {   public static void main(String\[\] args) {       int\[\] datos \= { 3, 1, 4, 1, 5, 9 };       int total \= 0;       for (int i \= 0; i \< datos.length; i \+= 2) {           total \+= datos\[i\];       }       System.out.println(total);   }} |
| :---- |

**Què imprimeixes per pantalla? Tria saviament:**

1. **23** → Sumes tots els elements, però el bucle va de dos en dos. ❌  
2. **12** → ✅ Correcte\! El bucle salta de 2 en 2: i \= 0, 2, 4\. Suma datos\[0\] \+ datos\[2\] \+ datos\[4\] \= 3 \+ 4 \+ 5 \= **12**. La plaça 1 (l'1) i la 3 (l'1) es queden sense visitar.  
3. **13** → Sumes els índexs en lloc dels valors. ❌  
4. **9** → Només et quedes amb datos\[4\], l'últim del salt. ❌

L'opció **2**. i \+= 2 recorre les posicions parells 0, 2 i 4\. Els seus valors són 3, 4 i 5\. 3 \+ 4 \+ 5 \= 12\. El for amb índex et dona el control del pas: una cosa que el for-each no pot fer.

## **🔥 Fireside Chat: for clàssic vs for-each**

*Dos veterans del recorregut discuteixen al costat de la màquina de cafè.*

* **For-each:** — Jo soc el modern. "Per a cada X en Y": curt, net, impossible equivocar-se amb l'índex. Qui vol comptar places a mà?  
* **For clàssic:** — I quan em necessites a mi? Quan cal **modificar**, quan cal **saber la posició**, quan cal anar **cap arrere** o **de dos en dos**. Eixes quatre coses són el 80% dels exercicis del curs, i les faig totes. Tu, en canvi, lliges i et calles.  
* **For-each:** — Llegir és el que es fa quasi sempre: sumar, comptar, imprimir. El 80% de les voltes no et necessite, i si t'use sense necessitar-te, arriben els errors: el \<=, el fet de començar en 1, oblidar el \++...  
* **For clàssic:** — Això és perquè no m'uses bé. Amb mi tens el control total. Tu ets... la variant peresosa.  
* **For-each:** — La variant **segura**. I no em digues peresosa: digues-me "sense índex, sense excuses".  
* **For clàssic:** — Val, treva. Tu per a llegir sense posicions; jo per a tot lo altre. Tracte?  
* **For-each:** — Tracte. Però que sàpies que en el bucle de la mitjana et guanye fins i tot amb els ulls tancats.

La lliçó: **for-each** si només lliges i no t'importa la posició; **for amb índex** si modifiques, busques posicions o recorres de forma especial. El context decideix, no la moda.

## **🕵️ Qui soc?**

Endevina quin concepte de la unitat soc:

1. **Soc un aparcament de grandària fixa: guarde moltes dades del mateix tipus sota un sol nom.**  
2. **Soc el número de cada plaça, i comence en 0, per a confusió general.**  
3. **Soc l'excepció favorita del novell: em llancen quan demanen la plaça que no existeix.**  
4. **Soc el bucle de només lectura: "per a cada X en Y", sense índex i sense presses.**  
5. **Soc la classe utilitària amb toString, sort, binarySearch, copyOf i fill.**  
6. **Soc l'atribut que diu quantes places hi ha, sense parèntesis, per a no confondre'm amb els String.**

**🔄 Respostes**

1. **L'array** — aparcament de dades del mateix tipus, grandària fixa.  
2. **L'índex** — número de la plaça; les vàlides van de 0 a length \- 1\.  
3. **La ArrayIndexOutOfBoundsException** — en demanar la plaça length o més.  
4. **El for-each** — només llig, no modifica.  
5. **La classe Arrays** — la navalla suïssa dels arrays.  
6. **length** — atribut de l'array, sense parèntesis (els String usen length()).

## **🤬 CONRAD VS EL MÓN: "L'array que no para"**

*CONRAD, el nostre compilador rondinaire, ha trobat una nota en la safata d'errors.*

**CONRAD:** — ¡ALTRES VEGADES\! Un alumne em diu: *CONRAD, el meu bucle eix de l'array*. I jo: amb quina condició l'has escrit? *Doncs... i \<= notas.length.* ¡¡PERÒ SI AIXÒ ÉS EL PRIMER QUE S'APRÉN EN ESTA UNITAT\!\! L'últim índex és length \- 1\. \<= vol dir que demanaràs la plaça length, que no existeix. És com cridar a la planta 5 d'un aparcament de 5 plantes (que van de la 0 a la 4): no hi és, i el porter et llança la ArrayIndexOutOfBoundsException.

*I després el clàssic del for-each:* *el meu array no es modifica*. I com el recorres? *Amb for-each.* ¡CLAR\! El for-each és un robot que LIG les matrícules. No repinta cotxes. Si vols canviar valors, índex i claudàtors: notas\[i\] \= notas\[i\] \+ 1;. Quantes voltes ho he de dir?

*I el dels String:* *compare dos noms i no em dona igual*. Amb què? *Amb \==.* ¿QUANTES VEGADES? Amb String s'usa .equals(). \== compara referències: són el MATEIX objecte? Encara que tinguen el mateix text, si són dos objectes diferents, \== diu false. ¡LLIG-T'HO EN EL PUNT 6, PER FAVOR\!

**La lliçó:** els tres mals del novell amb arrays tenen nom: **\<= fora de rang**, **for-each que no modifica** i **\== que no compara text**. Abans de plorar sobre el teclat, comprova eixes tres coses. El 90% dels "arrays rebel·les" s'arreglen amb una ullada.

## **🎮 El joc de les decisions**

Tria la resposta correcta per a cada decisió (respostes al final):

1. Quin és l'últim índex vàlid de int\[\] a \= new int\[8\]?  
   * a) 7 b) 8 c) 9  
2. Quin valor té cada plaça de boolean\[\] b \= new boolean\[4\]?  
   * a) true b) false c) null  
3. Què fa Arrays.binarySearch sobre un array **desordenat**?  
   * a) Llança una excepció b) Torna un resultat impredictible c) Ordena primer  
4. Què imprimeix System.out.println(a.length); per a int\[\] a \= new int\[10\]?  
   * a) 9 b) 10 c) \[10\]  
5. Quin bucle uses per a recórrer un array **cap arrere**?  
   * a) for-each b) for amb índex c) qualsevol

**🔄 Solucions**

1. **a)** — 7\. Les places van de 0 a length \- 1, és a dir, de 0 a 7\.  
2. **b)** — false. És el valor per defecte de boolean.  
3. **b)** — Un resultat impredictible, sense avisar. Exigix array ordenat, sempre.  
4. **b)** — 10\. length és el nombre de places, sense parèntesis.  
5. **b)** — for (int i \= a.length \- 1; i \>= 0; i--). El for-each només avança de principi a fi.

## **🧠 Atreveix-te a pensar**

1. **Sense executar:** què imprimeix este programa?

| public class Misterio2 {   public static void main(String\[\] args) {       int\[\] datos \= { 4, 2, 8, 1, 6 };       int mayor \= datos\[0\];       for (int i \= 1; i \< datos.length; i++) {           if (datos\[i\] \> mayor) {               mayor \= datos\[i\];           }       }       System.out.println(mayor);   }} |
| :---- |

2. **El truc de l'índex:** què passa si en el bucle de la mitjana de {8, 7, 9, 6} uses i \<= notas.length \- 1 en lloc de i \< notas.length? Funciona? Per què?  
3. **El doble:** int\[\] a \= {1, 2, 3}; int\[\] b \= a; b\[0\] \= 99; quant val a\[0\] després? (Pista: és el punt 5.)  
4. **Vertader o fals:** "Arrays.sort modifica l'array original, així que convé copiar-lo abans si no vols perdre l'ordre inicial".

**💡 Solucions**

1. Imprimeix **8**. El patró del màxim: comença amb datos\[0\] (4) i va comparant; quan arriba al 8, el guarda; l'1 i el 6 no li guanyen.  
2. **Funciona.** i \<= notas.length \- 1 és exactament el mateix que i \< notas.length: en tots dos casos l'últim valor de i és length \- 1\. Són dues formes d'escriure el mateix, però i \< notas.length és la que no convida a l'error.  
3. **99\.** b \= a no copia l'array: copia la referència. a i b apunten al mateix aparcament, així que tocar per b es veu per a. Per a copiar de veritat, Arrays.copyOf.  
4. **Vertader.** Arrays.sort ordena "al lloc" (modifica l'original). Si necessites conservar l'ordre inicial, copia abans amb Arrays.copyOf.

## 

## **💬 Preguntes d'entrevista de treball**

Preguntes reals que et farien per a programador Java júnior.

1. **"Explícam'ho, com si jo fóra la teua àvia, què és un array."**  
2. **"Inverteix este array sense crear-ne un altre. Ara digues-me quanta memòria extra necessites."**  
3. **"Quina és la diferència entre length, length() i size()?"**  
4. **"Quan usaríes for-each i quan un for amb índex?"**  
5. **"Com compares dos arrays per a saber si tenen el mateix contingut?"**  
6. **"Escriu el codi que torna la nota més alta d'un array."**

## **🤷 No hi ha preguntes tontes**

❓ **Per què el primer índex és 0 i no 1?**

Perquè l'índex és una **distància** des del principi, no un número de plaça. La primera casa és a 0 passes de tu, no a 1\. En programació, contar des de 0 evita l'off-by-one en milers de càlculs (i és una convenció heretada dels llenguatges més antics). Et pareixerà rar fins que deixe de pareixer-t'ho, i aleshores ho defendràs amb ungles i dents.

❓ **Puc usar Arrays.sort i Arrays.binarySearch en lloc d'escriure els algoritmes a mà?**

En els teus programes reals, sí: són ràpids i provats, i els veuràs per tot arreu. Però en la U07 aprendràs **com funcionen per dins** (bombolla, cerca binària...) perquè entendre la idea és el que et diferencia d'algú que només importa llibreries. I en una entrevista, et demanaran l'algoritme a mà. Primer s'aprén a sumar sense calculadora, no?

❓ **Un array pot canviar de grandària?**

No. És **grandària fixa** per sempre. Quan necessites "més places", es crea un array nou i es copia (Arrays.copyOf). Si això et sembla un incordi, tens raó: per això existeixen les col·leccions (ArrayList i companyia), que creixen soles. Les veuràs en detall més avant en el temari.


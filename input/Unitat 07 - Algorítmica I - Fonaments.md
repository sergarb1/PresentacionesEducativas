LICENCIA

**Reconocimiento \- No comercial \- CompartirIgual (BY-NC-SA)**: No se permite un uso comercial de la obra original ni de las posibles obras derivadas, la distribución de las cuales se ha de hacer con una licencia igual a la que regula la obra original.

**ÍNDICE**

[**1\. Què és un algoritme	3**](#1.-què-és-un-algoritme)

[**2\. Cerca lineal	5**](#2.-cerca-lineal)

[**3\. Cerca binària	8**](#3.-cerca-binària)

[**4\. Ordenació bombolla	12**](#4.-ordenació-bombolla)

[**5\. Ordenació per inserció	15**](#5.-ordenació-per-inserció)

[**6\. Complexitat algorísmica: Big O	18**](#6.-complexitat-algorísmica:-big-o)

[**7\. Triar l'algoritme adequat	22**](#7.-triar-l'algoritme-adequat)

[**8\. Be the Code: cerca binària des de zero	25**](#8.-be-the-code:-cerca-binària-des-de-zero)

[**9\. Repàs: ordena i busca com un professional	29**](#9.-repàs:-ordena-i-busca-com-un-professional)

# 

**Unitat 07 \- Algorítmica I \- Fonaments**

# **1\. Què és un algoritme** {#1.-què-és-un-algoritme}

## **📬 La idea en una frase**

Un algoritme és una recepta de cuina per al teu ordinador: una seqüència finita, ordenada i sense ambigüitats de passos que resol un problema.

Quan cuines una truita de creïlles, seguixes un algoritme mental:

1. Pelar les creïlles.  
2. Tallar-les a rodanxes fines.  
3. Fregir-les amb oli abundant.  
4. Batre els ous.  
5. Barrejar-ho tot i quallar.

**Però compte:** "posa sal al gust" no val com a pas d'algoritme. Quant és "al gust"? Un pessic? Un grapat? Cada persona interpretaria la recepta de manera diferent. Un algoritme de veritat **no deixa espai a la interpretació**: cada pas ha de ser precís i determinista. Si li passes la mateixa entrada, sempre produïx la mateixa eixida. Com una màquina expenedora: fiques la moneda, polses el botó, i sempre ix el mateix batut.

## **🏛️ Les propietats d'un algoritme**

Perquè una seqüència de passos mereca el nom d'algoritme, ha de complir cinc propietats:

1. **Finit**: ha d'acabar en algun moment. Si s'executa per sempre, no és un algoritme, és un malson.  
2. **Precís**: cada pas està definit sense ambigüitat. Res de "al gust" ni "quan estiga llest".  
3. **Entrada**: rep zero o més valors d'entrada.  
4. **Eixida**: produïx almenys un valor d'eixida.  
5. **Eficaç**: resol el problema en temps finit i de manera correcta.

📝 **Nota històrica:** la paraula "algoritme" ve del matemàtic persa **Al-Juarismi** (segle IX), que va escriure un llibre sobre com fer càlculs amb els nombres indis. Segles després, els informàtics li vam robar la paraula. Som així.

## **🧠 La idea vs. el codi**

Este és un moment important, així que puja el volum mental:

⚠️ **Advertència:** **no tot codi és un algoritme.** L'algoritme és la *idea*: la seqüència de passos. El codi és la seua *materialització* en un llenguatge concret. Pots implementar el mateix algoritme en Java, en Python o en ensamblador, i l'essència serà la mateixa.

Mira este exemple. L'algoritme de "sumar dos nombres" es materialitza així en Java:

| public class AlgoritmeSimple {   public static void main(String\[\] args) {       int a \= 5;       int b \= 3;       int resultat \= a \+ b; *// la idea: sumar. El codi: la materialització*       System.out.println("5 \+ 3 \= " \+ resultat);   }} |
| :---- |

La *idea* (sumar dos nombres) és la mateixa en qualsevol llenguatge. El *codi* és només el disfressa. Per això els algoritmes s'estudien independentment del llenguatge: són les receptes, i Java només és una de les teues cuines.

## **📦 Les dues grans famílies**

En esta unitat (i en la pròxima) viuràs amb dues famílies d'algoritmes:

* **Cerca**: trobar un element dins d'un conjunt de dades. El nombre 23 és en este array?  
* **Ordenació**: posar un conjunt de dades en un ordre determinat. Pots deixar este array ordenat de menor a major?

Són les dues habilitats bàsiques de qualsevol programa que maneja dades, i apareixen pertot arreu: en una llista de reproducció, en una base de dades, en un cercador. Sense ordenar ni buscar, la teua app és un calaix desordenat on les coses només estan "per ací".

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** quan escrigues passos "a la babalà" en un paper, pregunta't sempre: *podria la meua àvia executar estos passos sense preguntar-me res?* Si la resposta és "no", tens ambigüitat.

**Exercici: la truita ordenada**

Els passos d'esta recepta estan desordenats. Ordena'ls perquè formen un algoritme vàlid i explica quina de les propietats de l'algoritme fallaria si els deixares en l'ordre original:

1. Batre els ous.  
2. Menjar la truita.  
3. Posar sal "al gust" sobre les creïlles fregides.  
4. Fregir les creïlles amb oli abundant.  
5. Pelar i tallar les creïlles a rodanxes.  
6. Barrejar les creïlles amb l'ou batut i quallar a la paella.

**🔄 Solució**

Ordre correcte: **5 → 4 → 1 → 6 → 2** (pelar i tallar, fregir, batre, barrejar i quallar, menjar).

El pas 3 ("posar sal al gust") sobra com a algoritme **precís**: és ambigu, cada persona interpretaria una quantitat diferent. Si el deixares en l'ordre original, la recepta no seria **precisa** ni **eficaç**, perquè no hi ha una única manera correcta d'executar-la. Nota extra: el pas 2 (menjar) podria estar en un altre ordre, però el lògic és al final.

## **🎯 Mini-chequeig**

Posat a prova en 30 segons (les respostes estan amagades):

1. Quina és la diferència entre un algoritme i un programa?  
2. Per què "posa sal al gust" no pot ser un pas d'algoritme?  
3. Un algoritme pot rebre zero entrades?  
4. Què passaria si un algoritme mai no acabara?

**🔄 Respostes**

1. L'algoritme és la **idea** (la seqüència de passos); el programa és la seua **materialització** en un llenguatge (Java, Python…).  
2. Perquè és **ambigu**: no defineix una quantitat exacta, i dos persones l'interpretarien de manera diferent.  
3. Sí, un algoritme pot rebre **zero o més** entrades. Per exemple, "imprimeix els nombres de l'1 al 10".  
4. Deixaria de ser un algoritme: incompleix la propietat de ser **finit**. Es convertiria en un malson en bucle.

## **✅ Resum en 3 frases**

1. Un algoritme és una **seqüència finita, precisa i sense ambigüitats de passos** que resol un problema: una recepta de cuina per a l'ordinador.  
2. Ha de ser **finit, precís, amb entrades, amb eixida i eficaç**, i no deixa espai a la interpretació.  
3. L'algoritme és la **idea** i el codi la seua materialització: el mateix algoritme s'escriu igual de bé en qualsevol llenguatge.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| Algoritme | Seqüència finita i precisa de passos que resol un problema |
| Determinista | Mateixa entrada → sempre mateixa eixida |
| Ambigüitat | Pas que es pot interpretar de diverses maneres ("al gust") |
| Cerca | Trobar un element dins d'un conjunt de dades |
| Ordenació | Posar les dades en un ordre determinat (numèric, alfabètic…) |
| Materialitzar | Traduir la idea de l'algoritme a codi d'un llenguatge |

# **2\. Cerca lineal** {#2.-cerca-lineal}

## **📬 La idea en una frase**

La cerca lineal recorre l'array element per element fins a trobar l'objectiu (o fins a comprovar que no hi és). Simple, directa i funciona encara que les dades estiguen desordenades.

Imagina que perds una sabatilla en la teua habitació. Què fas? Mires davall del llit, darrere de la porta, en l'armari... bàsicament **revises cada lloc fins a trobar-la**. Doncs això és la cerca lineal: vas un a un, sense dreceres.

## **👟 L'algoritme**

| public class CercaLiniaal {   public static int buscar(int\[\] array, int objectiu) {       for (int i \= 0; i \< array.length; i++) {           if (array\[i\] \== objectiu) {               return i; *// Trobat\! Retorna la posició*           }       }       return \-1; *// No és en l'array*   }   public static void main(String\[\] args) {       int\[\] numeros \= { 34, 12, 56, 78, 23, 9, 45, 67 };       int resultat \= buscar(numeros, 23);       if (resultat \!= \-1) {           System.out.println("Trobat el 23 en la posició " \+ resultat \+ "\!");       } else {           System.out.println("El 23 no és en l'array.");       }       resultat \= buscar(numeros, 99);       if (resultat \== \-1) {           System.out.println("El 99 no hi és. Com unes sabatilles que mai no apareixen.");       }   }} |
| :---- |

**Eixida:**

| Trobat el 23 en la posició 4\!El 99 no hi és. Com unes sabatilles que mai no apareixen. |
| :---- |

Detalls del mètode buscar:

* Recorre l'array amb un for des de la posició 0 fins a array.length \- 1\.  
* Si troba l'objectiu, **retorna el seu índex** i para: el return talla el mètode sencer.  
* Si acaba el bucle sense trobar res, retorna \-1, el "índex impossible" que usem com a senyal de *no trobat*.

💡 **Detall pràctic:** retornar \-1 és la convenció clàssica de "no hi és". No retornes mai 0 per a dir "no trobat", perquè 0 és una posició vàlida: la primera. Eixe error és el clàssic "bug de l'índex zero".

## **⏱️ Com de ràpida és?**

* En el **millor cas**, l'element és en la primera posició → 1 pas.  
* En el **pitjor cas**, l'element és al final, o no existeix → recorres els n elements sencers.

Diem que la seua complexitat és **O(n)**, lineal. Si l'array té 10 elements, tardes \~10 passos; si en té 10.000, tardes \~10.000. Creix al mateix ritme que les dades.

💡 **Consell:** la cerca lineal és com buscar en la teua nevera: si és xicoteta, tant li fa el mètode. Però si tens un magatzem de 10.000 productes, necessites alguna cosa millor... i en el pròxim punt la trobes.

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** quan un mètode retorna un índex, els dos camins d'eixida són: return quan el trobes, return \-1 quan el bucle acaba. Si mescles això, el programa es comporta com una gavina: confon els llocs.

**Exercici: el cercador que es perd**

Sense executar, calcula quantes comparacions fa este programa i què imprimeix:

| public class Cerca2 {   public static int buscar(int\[\] array, int objectiu) {       int passos \= 0;       for (int i \= 0; i \< array.length; i++) {           passos++;           if (array\[i\] \== objectiu) {               System.out.println("He necessitat " \+ passos \+ " passos.");               return i;           }       }       System.out.println("He necessitat " \+ passos \+ " passos.");       return \-1;   }   public static void main(String\[\] args) {       int\[\] dades \= { 3, 8, 1, 9, 5, 2 };       int resultat \= buscar(dades, 9);       System.out.println("Posició: " \+ resultat);   }} |
| :---- |

**🔄 Solució**

El 9 és en la posició 3 (índex 3, el quart element). El bucle compara: 3 (pas 1), 8 (pas 2), 1 (pas 3), 9 (pas 4\) → el troba. Imprimeix:

| He necessitat 4 passos.Posició: 3 |
| :---- |

Fixa't que el for **no** recorre tot l'array: s'atura tan bon punt el return talla el mètode. Eixe és el poder del return com a "break" d'emergència.

## **🎯 Mini-chequeig**

Posat a prova en 30 segons (les respostes estan amagades):

1. Què retorna la cerca lineal quan l'element no és en l'array?  
2. Funciona la cerca lineal amb arrays desordenats?  
3. Per què es diu que és O(n)?  
4. Què imprimiria buscar(new int\[\]{5, 5, 5}, 5)? Quina posició retorna?

**🔄 Respostes**

1. Retorna \-1, la senyal clàssica de "no trobat".  
2. **Sí.** Eixa és la seua gran avantatge: no exigeix cap ordre previ.  
3. Perquè en el pitjor cas recorre els n elements de l'array: el temps creix en proporció directa amb les dades.  
4. Retorna la posició **0** (el primer 5), perquè el return talla tan bon punt troba el primer. La posició 0 és vàlida i diferent de "no trobat".

## **✅ Resum en 3 frases**

1. La cerca lineal recorre l'array **element per element** fins a trobar l'objectiu o esgotar la llista.  
2. Retorna l'**índex** de l'element, o \-1 si no existeix, i funciona amb dades **desordenades**.  
3. La seua complexitat és **O(n)**: perfecta per a arrays xicotets, lenta per als grans.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| Índex | Posició d'un element dins de l'array (comença en 0\) |
| Recórrer | Visitar cada element de l'array un a un |
| \-1 | L'"índex impossible": senyal que l'element no hi és |
| O(n) | El temps creix en proporció directa al nombre d'elements |
| Millor cas | L'element és el primer: 1 sol pas |

# **3\. Cerca binària** {#3.-cerca-binària}

## **📬 La idea en una frase**

La cerca binària obri el "diccionari" per la meitat, compara, i descarta mitja tona de paper en cada intent. Només funciona si l'array està ordenat.

Buscar una paraula en un diccionari és un ritual molt concret: no obres per la pàgina 1 i passes d'una en una. Obres per la meitat, veus si la paraula està abans o després, i descartes la meitat del llibre en un gest. I repeteix. Això és la cerca binària.

## **⚠️ El requisit imprescindible**

**L'array ha d'estar ordenat.** Si no, este mètode no funciona.

I el pitjor de tot: no t'avisa. No hi ha error de compilació, no hi ha excepció, no hi ha "ei, m'has donat escombraria". Simplement obtens la resposta equivocada. És com buscar "berenar" en un diccionari les paraules del qual estan a l'atzar: obrir per la meitat no et serveix de res.

## **🕯️ L'algoritme**

| public class CercaBinaria {   public static int buscar(int\[\] array, int objectiu) {       int esquerra \= 0;       int dreta \= array.length \- 1;       while (esquerra \<= dreta) {           int mig \= esquerra \+ (dreta \- esquerra) / 2; *// meitat del segment*           System.out.println("esquerra=" \+ esquerra \+ " dreta=" \+ dreta \+ " mig=" \+ mig);           if (array\[mig\] \== objectiu) {               return mig; *// Bingo\!*           }           if (array\[mig\] \< objectiu) {               esquerra \= mig \+ 1; *// descartem la meitat esquerra*           } else {               dreta \= mig \- 1; *// descartem la meitat dreta*           }       }       return \-1; *// no trobat*   }   public static void main(String\[\] args) {       *// COMPTE: ha d'estar ORDENAT*       int\[\] numeros \= { 2, 5, 8, 12, 19, 24, 31, 37, 42, 50, 58, 63 };       int resultat \= buscar(numeros, 31);       System.out.println("31 trobat en posició: " \+ resultat); *// 6*       resultat \= buscar(numeros, 3);       System.out.println("3 trobat en: " \+ resultat); *// \-1*   }} |
| :---- |

Anem a traçar la cerca del 31 sobre l'array {2, 5, 8, 12, 19, 24, 31, 37, 42, 50, 58, 63} (12 elements):

| Volta | esquerra | dreta | mig | array\[mig\] | Què passa? |
| ----- | ----- | ----- | ----- | ----- | ----- |
| 1 | 0 | 11 | 5 | 24 | 24 \< 31 → esquerra \= 6 |
| 2 | 6 | 11 | 8 | 42 | 42 \> 31 → dreta \= 7 |
| 3 | 6 | 7 | 6 | 31 | Bingo\! → retorna 6 |

Tres comparacions. La cerca lineal n'hauria necessitat set. I en un array d'un milió d'elements, la diferència encara és més escandalosa.

## **🧮 Per què esquerra \+ (dreta \- esquerra) / 2 i no (esquerra \+ dreta) / 2?**

Perquè si l'array és molt gran (a prop de Integer.MAX\_VALUE elements), esquerra \+ dreta pot **desbordar-se**: el resultat ja no cap en un int i es converteix en un nombre negatiu de sobte. La fórmula alternativa esquerra \+ (dreta \- esquerra) / 2 evita eixe problema.

⚠️ **Advertència:** este és un bug tan famós que va aparéixer fins i tot en la biblioteca de Java original. Du anys col·leccionant trofeus: Bug de l'any, Bug de la dècada, Bug favorit del públic...

## **⏱️ L'anàlisi: O(log n)**

En cada pas, la cerca binària **descartar la meitat** de l'array restant. Mira com creix el nombre de passos:

* Array de 16 elements → 4 passos màxims  
* Array de 32 elements → 5 passos  
* Array de 1.024 elements → 10 passos  
* Array d'1.000.000 d'elements → 20 passos

Això és **O(log n)**, complexitat logarítmica. Creix molt a poc a poc fins i tot amb dades enormes. És la diferència entre preguntar a mil persones una per una, o preguntar "és a l'esquerra o a la dreta?" i descartar-ne 500 de cop. Amb un milió d'elements, la lineal necessita un milió de passos i la binària només **20**. Torna a llegir-ho. Vint.

📝 **Nota:** quan un informàtic diu "log n", pensa en **base 2**: és "meitat, meitat, meitat...". No és el logaritme decimal de tota la vida. Un logaritme en base 2 respon a la pregunta "quantes vegades puc partir entre 2 abans d'arribar a 1?".

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** la cerca binària té una regla d'or: si el mig és menor que l'objectiu, esquerra \= mig \+ 1; si és major, dreta \= mig \- 1\. El \+1 i el \-1 són sagrats: sense ells, el bucle es pot quedar donant voltes per sempre.

**Exercici: el cercador que no avança**

Sense executar, traça la cerca del nombre **8** en este array ordenat i escriu els valors d'esquerra, dreta i mig en cada volta:

| public class Traça {   public static int buscar(int\[\] array, int objectiu) {       int esquerra \= 0;       int dreta \= array.length \- 1;       while (esquerra \<= dreta) {           int mig \= esquerra \+ (dreta \- esquerra) / 2;           System.out.println("esquerra=" \+ esquerra \+ " dreta=" \+ dreta \+ " mig=" \+ mig);           if (array\[mig\] \== objectiu)               return mig;           if (array\[mig\] \< objectiu) {               esquerra \= mig \+ 1;           } else {               dreta \= mig \- 1;           }       }       return \-1;   }   public static void main(String\[\] args) {       int\[\] dades \= { 1, 4, 8, 12, 20, 33 };       System.out.println("Resultat: " \+ buscar(dades, 8));   }} |
| :---- |

 **Solució**

| Volta | esquerra | dreta | mig | array\[mig\] | Acció |
| ----- | ----- | ----- | ----- | ----- | ----- |
| 1 | 0 | 5 | 2 | 8 | Bingo\! → retorna 2 |

Imprimeix:

| esquerra=0 dreta=5 mig=2Resultat: 2 |
| :---- |

El 8 és just en el mig de la primera passada, així que l'algoritme fa **una sola comparació**. Este és el millor cas de la cerca binària: trobar l'objectiu en el centre a la primera.

## **🎯 Mini-chequeig**

Posat a prova en 30 segons (les respostes estan amagades):

1. Quin requisit imprescindible té la cerca binària?  
2. Què passa si l'incompleixes?  
3. Quants passos màxims necessita per a un array d'1.000.000 d'elements?  
4. Per què s'usa esquerra \+ (dreta \- esquerra) / 2 en comptes de (esquerra \+ dreta) / 2?

**🔄 Respostes**

1. Que l'array estiga **ordenat**.  
2. Retorna la resposta equivocada **sense avisar**: no hi ha error ni excepció. Silenci i escombraria.  
3. **20 passos** — log₂(1.000.000) ≈ 20\.  
4. Per a evitar el **desbordament**: esquerra \+ dreta pot no cabre en un int amb arrays gegants.

## **✅ Resum en 3 frases**

1. La cerca binària **divideix el problema a la meitat en cada pas**, comparant l'objectiu amb l'element central.  
2. Exigix un array **ordenat**; si no ho està, retorna escombraria sense avisar.  
3. La seua complexitat és **O(log n)**: amb un milió d'elements basten \~20 passos, mentre que la lineal necessita un milió.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| Meitat | L'element central del segment actual (mig) |
| Descartar | Eliminar la meitat esquerra o dreta del segment |
| O(log n) | El temps creix molt a poc a poc: cada pas descarta la meitat |
| Off-by-one | Error de "per un": confondre \<= amb \< o mig+1 amb mig |
| Desbordament | Quan una suma supera el màxim que cap en un int |

# **4\. Ordenació bombolla** {#4.-ordenació-bombolla}

## **📬 La idea en una frase**

La bombolla recorre l'array comparant parelles veïnes: si el de l'esquerra és major, els intercanvia. Repetix fins que en una passada no hi haja cap intercanvi. Els grans "pugen" cap al final com bombolles en una copa.

És l'algoritme d'ordenació més senzill d'entendre... i el més lent dels que mereixen la pena. Però abans d'aprendre a córrer, cal aprendre a caminar. La bombolla és el teu caminador.

## **🫧 L'algoritme**

| public class Bombolla {   public static void ordenar(int\[\] array) {       int n \= array.length;       boolean hiHaIntercanvi;       for (int i \= 0; i \< n \- 1; i++) {           hiHaIntercanvi \= false;           for (int j \= 0; j \< n \- 1 \- i; j++) {               if (array\[j\] \> array\[j \+ 1\]) {                   *// intercanvi*                   int temp \= array\[j\];                   array\[j\] \= array\[j \+ 1\];                   array\[j \+ 1\] \= temp;                   hiHaIntercanvi \= true;               }           }           *// si no hi va haver intercanvi, l'array ja està ordenat*           if (\!hiHaIntercanvi)               break;       }   }   public static void main(String\[\] args) {       int\[\] dades \= { 64, 34, 25, 12, 22, 11, 90 };       System.out.print("Abans: ");       for (int nombre : dades)           System.out.print(nombre \+ " ");       ordenar(dades);       System.out.print("\\nDesprés: ");       for (int nombre : dades)           System.out.print(nombre \+ " ");       *// 11 12 22 25 34 64 90*   }} |
| :---- |

Anem a traçar la primera passada amb un array xicotet, {5, 2, 9, 1}:

| Pas | Què compara? | Intercanvia? | Array |
| ----- | ----- | ----- | ----- |
| 1 | 5 vs 2 | Sí | 2 5 9 1 |
| 2 | 5 vs 9 | No | 2 5 9 1 |
| 3 | 9 vs 1 | Sí | 2 5 1 9 |

El 9, el major, "va pujar" fins al final. En cada passada, el major dels que queden queda col·locat en el seu lloc: el 9, després el 5, després el 2, després el 1\. Per això el bucle interior arriba només fins a n \- 1 \- i: ja no cal mirar els elements que van quedar col·locats al final.

## **🏎️ Per què és tan lenta?**

Dos bucles anidats. Per a un array de n elements:

* Primer bucle: n vegades.  
* Segon bucle: \~n vegades (en realitat n-i-1, però a grans trets n).

**Total: \~n × n \= n² operacions.** Complexitat **O(n²)**.

* Per a 10 elements → 100 operacions (bé).  
* Per a 1.000 elements → 1.000.000 d'operacions (comença a doldre).  
* Per a 1.000.000 d'elements → 1.000.000.000.000 d'operacions (el teu ordinador demana la jubilació).

💡 **Consell:** la bombolla només s'usa en dos situacions: (1) estàs aprenent, i (2) saps que l'array tindrà menys de 50 elements. Per a tot lo demés hi ha alternatives millors (les veuràs en la U08).

## **🚩 L'optimització del flag**

Fixa't en la variable hiHaIntercanvi. Si en una passada completa no intercanviem res, és que l'array ja està ordenat i podem parar: break. Sense este flag, la bombolla faria totes les passades encara que l'array arribara ordenat en la primera.

Esta optimització **no millora el pitjor cas** (array invertit: cal intercanviar-ho tot), però converteix el millor cas (array ja ordenat) en O(n): una sola passada de comprovació i llest.

💡 **Detall pràctic:** el patró del flag ("marca si ha passat alguna cosa; si no, para") apareix en moltíssims algoritmes reals. És una d'eixes idees que et faran semblar programador sènior encara que només portes quatre unitats.

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** quan veges array\[j\] \> array\[j \+ 1\], pensa "estic ordenant **de menor a major**". Si vols el contrari, canvia la fletxa. La resta de l'algoritme no canvia ni una coma.

**Exercici: la bombolla que es queda curta**

Sense executar, escriu l'eixida exacta d'este programa:

| public class BombollaCurta {   public static void main(String\[\] args) {       int\[\] dades \= { 3, 1, 2 };       for (int i \= 0; i \< dades.length \- 1; i++) {           for (int j \= 0; j \< dades.length \- 1 \- i; j++) {               if (dades\[j\] \> dades\[j \+ 1\]) {                   int temp \= dades\[j\];                   dades\[j\] \= dades\[j \+ 1\];                   dades\[j \+ 1\] \= temp;               }           }       }       for (int nombre : dades) {           System.out.print(nombre \+ " ");       }   }} |
| :---- |

**🔄 Solució**

Imprimeix

| 1 2 3 |
| :---- |

Traça sense el flag (este programa no té hiHaIntercanvi):

| Passada | j | Compara? | Array |
| ----- | ----- | ----- | ----- |
| 1 | 0 | 3 vs 1 → sí | 1 3 2 |
| 1 | 1 | 3 vs 2 → sí | 1 2 3 |
| 2 | 0 | 1 vs 2 → no | 1 2 3 |

Sense el flag, la bombolla fa una passada extra de comprovació. El resultat és el mateix, però en un array ja ordenat de 1.000 elements faria totes les passades sense necessitat. Ahí guanya la versió amb break.

## **🎯 Mini-chequeig**

Posat a prova en 30 segons (les respostes estan amagades):

1. Per què el bucle interior de la bombolla només arriba fins a n \- 1 \- i?  
2. Quina és la complexitat de la bombolla en el pitjor cas?  
3. Què fa la variable hiHaIntercanvi?  
4. Quan està justificat usar la bombolla en un programa real?

**🔄 Respostes**

1. Perquè després de cada passada, el major dels elements restants ja va quedar **col·locat al final**, i no cal tornar-lo a mirar.  
2. **O(n²)** — dos bucles anidats.  
3. Detecta si en la passada hi va haver intercanvis: si no n'hi va haver cap, l'array ja està ordenat i es fa break.  
4. Només per a aprendre, o amb arrays de **menys de \~50 elements**. Per a la resta, espera a la U08.

## **✅ Resum en 3 frases**

1. La bombolla compara **parelles veïnes** i intercanvia les que estan desordenades, passada rere passada.  
2. La seua complexitat és **O(n²)**: funciona, però és lenta amb dades grans.  
3. El flag hiHaIntercanvi l'optimitza per a arrays quasi ordenats, convertint el millor cas en O(n).

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| Intercanvi | Canviar dos elements entre si usant una variable temporal |
| Passada | Un recorregut complet del bucle interior |
| Flag | Variable booleana que marca si alguna cosa va ocórrer durant la passada |
| O(n²) | El temps creix al quadrat: dos bucles anidats |
| In-place | Ordena modificant el mateix array, sense memòria extra |

# **5\. Ordenació per inserció** {#5.-ordenació-per-inserció}

## **📬 La idea en una frase**

La inserció pren cada element com una carta nova i el col·loca en el seu lloc dins de les que ja tens ordenades a la mà. Com ordenar cartes en el pòquer.

Quan et reparteixen cartes, no les tires totes sobre la taula i comences de zero: vas col·locant cada carta nova en el seu buit dins de la mà que ja tens ordenada. El 7 entre el 5 i el 9, el 3 al principi, la K al final. Doncs això, però en Java.

## **🃏 L'algoritme**

| public class Insercio {   public static void ordenar(int\[\] array) {       for (int i \= 1; i \< array.length; i++) {           int clau \= array\[i\]; *// la carta que anem a col·locar*           int j \= i \- 1;           *// desplaçar els majors cap a la dreta*           while (j \>= 0 && array\[j\] \> clau) {               array\[j \+ 1\] \= array\[j\];               j--;           }           array\[j \+ 1\] \= clau; *// col·locar la carta en el seu lloc*       }   }   public static void main(String\[\] args) {       int\[\] dades \= { 9, 5, 1, 4, 3 };       System.out.print("Abans: ");       for (int nombre : dades)           System.out.print(nombre \+ " ");       ordenar(dades);       System.out.print("\\nDesprés: ");       for (int nombre : dades)           System.out.print(nombre \+ " ");       *// 1 3 4 5 9*   }} |
| :---- |

El truc està en el while interior: guardes la clau (la carta nova), i mentre hi haja cartes majors que ella a la seua esquerra, les desplaces una posició a la dreta. Quan trobes una menor (o arribes al principi), eixa és la posició de la clau. La "mà" esquerra sempre està ordenada.

## **👣 Pas a pas**

Donat {9, 5, 1, 4, 3}, mira com creix la "mà" (el que hi ha a l'esquerra de la barra):

| Pas 0: \[9\] | 5 1 4 3 → la mà comença amb el 9Pas 1: \[5 9\] | 1 4 3 → el 5 es col·loca a l'esquerra del 9Pas 2: \[1 5 9\] | 4 3 → l'1 es cola al principiPas 3: \[1 4 5 9\] | 3 → el 4 entra entre l'1 i el 5Pas 4: \[1 3 4 5 9\] → el 3 entra entre l'1 i el 4 |
| :---- |

Cada element nou s'"inserta" en el seu lloc. D'ací el nom. La mà esquerra sempre està ordenada; la resta de l'array espera el seu torn.

## **📊 L'anàlisi: quan és bona?**

També és **O(n²)** en el pitjor cas (array invertit: cada element ha de viatjar fins al principi). Però té truc:

* **Millor cas (array quasi ordenat):** O(n). Només fa una passada de comprovació. És rapidíssima.  
* És **estable**: manté l'ordre relatiu dels elements iguals.  
* **No necessita memòria extra**: ordena in-place, modificant el mateix array.  
* En la pràctica, és **més ràpida que la bombolla**, encara que totes dos siguen O(n²).

💡 **Consell:** la inserció és la reina de les dades **quasi ordenades**. Si saps que el teu array té 100 elements i ja està "quasi bé" (només un parell d'elements fora de lloc), la inserció et sorprendrà. De fet, s'usa com a pas final en algoritmes avançats (TimSort, el que usa Java per defecte en les seues col·leccions).

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** en la inserció, la variable clau és l'única que "sobreviu" al desplaçament. Si la usares per a una altra cosa, la perdries en sobrescriure array\[j \+ 1\]. Guarda-la com un tresor: és la teua carta.

**Exercici: la mà que es desordena**

Sense executar, escriu l'eixida exacta d'este programa:

| public class Insercio2 {   public static void main(String\[\] args) {       int\[\] dades \= { 4, 2 };       for (int i \= 1; i \< dades.length; i++) {           int clau \= dades\[i\];           int j \= i \- 1;           while (j \>= 0 && dades\[j\] \> clau) {               dades\[j \+ 1\] \= dades\[j\];               j--;           }           dades\[j \+ 1\] \= clau;       }       System.out.println(dades\[0\] \+ " " \+ dades\[1\]);   }} |
| :---- |

**🔄 Solució**

**Imprimeix** 

| 2 4 |
| :---- |

Amb només dos elements, la inserció és quasi ridícula de simple: clau \= 2, j \= 0\. Com que 4 \> 2, desplaça el 4 a la posició 1 i j passa a \-1. El while acaba (perquè j \>= 0 ja no es compleix) i la clau es col·loca en dades\[0\]. Resultat: {2, 4}. La clau va viatjar fins al principi: eixe és el mecanisme exacte que, repetit, ordena arrays sencers.

## **🎯 Mini-chequeig**

Posat a prova en 30 segons (les respostes estan amagades):

1. En què es diferencia la inserció de la bombolla a l'hora d'ordenar?  
2. Quina és la complexitat de la inserció en el seu millor cas i per què?  
3. Què significa que siga "estable"?  
4. Per què es diu que no necessita memòria extra?

**🔄 Respostes**

1. La bombolla intercanvia **veïns** en cada passada; la inserció **col·loca cada element en el seu lloc** desplaçant els majors una posició.  
2. **O(n)** — amb un array quasi ordenat, cada element només necessita una comprovació i es queda on està.  
3. Que manté l'**ordre relatiu** dels elements iguals entre si (si "Anna" venia abans que "Lluís" i tenen la mateixa edat, continua venint abans).  
4. Perquè ordena **in-place**: modifica l'array original, sense crear estructures auxiliars.

## **✅ Resum en 3 frases**

1. La inserció pren cada element com una **carta nova** i el col·loca en el seu lloc dins de la part ja ordenada.  
2. És **O(n²)** en el pitjor cas, però **O(n)** amb dades quasi ordenades: la reina dels arrays quasi llestos.  
3. És **estable**, no usa memòria extra i en la pràctica supera la bombolla.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| Clau | L'element actual que estem col·locant en el seu lloc |
| Desplaçar | Moure un element una posició cap a la dreta |
| Mà | La part de l'array ja ordenada (a l'esquerra) |
| Estable | Respecta l'ordre relatiu dels elements iguals |
| In-place | Ordena sense necessitat d'arrays auxiliars |

# **6\. Complexitat algorísmica: Big O** {#6.-complexitat-algorísmica:-big-o}

## **📬 La idea en una frase**

Big O no et diu quants segons tarda un algoritme: et diu com creix el seu temps quan creix la quantitat de dades. La tendència, no el cronòmetre.

Dos ordinadors, un de 2024 i un altre de 2004\. El modern guanya sempre en una prova ràpida, però això no ens diu res de l'*algoritme*. Per a comparar algoritmes de manera justa, mirem la seua **taxa de creixement**: què passa quan el nombre de dades n es fa MOLT gran? Això és Big O.

## **📈 Les complexitats més comunes**

| Notació | Nom | Exemple | Per a n \= 1.000 |
| ----- | ----- | ----- | ----- |
| **O(1)** | Constant | Accedir a array\[0\] | 1 operació |
| **O(log n)** | Logarítmica | Cerca binària | \~10 operacions |
| **O(n)** | Lineal | Cerca lineal | 1.000 operacions |
| **O(n log n)** | Quasi lineal | Ordenacions avançades (ho veuràs en la U08) | \~10.000 operacions |
| **O(n²)** | Quadràtica | Bombolla, inserció | 1.000.000 d'operacions |
| **O(2ⁿ)** | Exponencial | Fibonacci sense optimitzar | inviable\! |

Fixa't en l'últim. Per a n \= 1.000, O(2ⁿ) no és "molt lent": és que no acaba ni en l'era dels dinosaures. La diferència entre O(n) i O(n²) amb dades grans és la diferència entre "faig un cafè mentre carrega" i "em jubile abans que acabe".

## **🧪 Big O en codi**

Anem a veure les tres més habituals amb exemples en Java:

| public class ExemplesComplexitat {   *// O(1) \-- CONSTANT: sempre igual, no importa la mida*   public static int obtenirPrimer(int\[\] array) {       return array\[0\]; *// un sol pas, sempre*   }   *// O(n) \-- LINEAL: creix en proporció a n*   public static int sumar(int\[\] array) {       int suma \= 0;       for (int nombre : array) {           suma \+= nombre; *// n passos*       }       return suma;   }   *// O(n²) \-- QUADRÀTICA: dos bucles anidats*   public static void imprimirParells(int\[\] array) {       for (int i \= 0; i \< array.length; i++) {           for (int j \= 0; j \< array.length; j++) {               System.out.println(array\[i\] \+ ", " \+ array\[j\]); *// n × n passos*           }       }   }   public static void main(String\[\] args) {       int\[\] dades \= { 10, 20, 30, 40, 50 };       System.out.println("O(1): " \+ obtenirPrimer(dades));       System.out.println("O(n): " \+ sumar(dades));       System.out.println("O(n²): mira la consola omplint-se de parells...");       imprimirParells(dades);   }} |
| :---- |

La regla del polze: **un bucle sol → O(n). Un bucle dins d'un altre → O(n²).** I si el bucle només recorre la meitat de les dades... continua sent O(n), no O(n/2). Les constants no conten.

## **📏 Les regles pràctiques de Big O**

1. **Ignora les constants**: O(2n) és el mateix que O(n). El 2 no importa quan n tendix a l'infinit.  
2. **Queda't amb el terme dominant**: O(n² \+ n) → O(n²). El n² es menja el n quan n creix.  
3. **Els bucles anidats multipliquen**: un bucle dins d'un altre → n × n → O(n²).  
4. **Els bucles seqüencials sumen**: un bucle i després un altre → O(n \+ n) → O(2n) → O(n).

| public class ReglesBigO {   public static void main(String\[\] args) {       *// REGLA 1: les constants no importen*       *// O(2n) → O(n)*       *// O(100n) → O(n)*       *// REGLA 2: el terme dominant es queda*       *// O(n² \+ 5n \+ 1\) → O(n²)*       *// O(n \+ log n) → O(n)*       *// REGLA 3: bucles anidats → multipliquen*       *// for (i...) { for (j...) { } } → O(n × n) → O(n²)*       *// REGLA 4: bucles seqüencials → sumen*       *// for (i...) { } for (i...) { } → O(n \+ n) → O(2n) → O(n)*       System.out.println("Big O no és màgia, és simplificar.");       System.out.println("Pregunta't: què passa quan n es fa MOLT gran?");   }} |
| :---- |

📝 **Nota:** Big O descriu el **pitjor cas** (la cota superior): "com a molt, tardarà això". Existixen també Big Omega Ω (millor cas) i Big Theta Θ (cas mitjà), però amb Big O tens suficient per a començar. I per a aprovar, també.

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** per a calcular Big O de memòria: compta bucles i mira si s'aniden o se succeïxen. Si tens dubtes entre O(n) i O(n²), pensa en un array d'un milió: recorre una vegada (un milió de passos) o un milió de vegades (un bilió)?

**Exercici: l'analista de complexitats**

Digues la complexitat Big O de cada mètode (les respostes, amagades):

| public class Analisi {   public static int metodeA(int\[\] array) {       int total \= 0;       for (int i \= 0; i \< array.length; i++) {           total \+= array\[i\];       }       for (int i \= 0; i \< array.length; i++) {           total \+= array\[i\] \* 2;       }       return total;   }   public static void metodeB(int\[\] array) {       for (int i \= 0; i \< array.length; i++) {           for (int j \= 0; j \< array.length; j++) {               System.out.println(array\[i\] \+ " " \+ array\[j\]);           }       }   }   public static int metodeC(int\[\] array) {       return array\[array.length \- 1\];   }} |
| :---- |

**🔄 Solució**

* **metodeA → O(n)**: dos bucles **seqüencials** sumen: O(n \+ n) \= O(2n) \= O(n).  
* **metodeB → O(n²)**: dos bucles **anidats** multipliquen: n × n.  
* **metodeC → O(1)**: accés directe per índex, sense bucles. Un sol pas, sempre.

## **🎯 Mini-chequeig**

Posat a prova en 30 segons (les respostes estan amagades):

1. Què mesura exactament Big O?  
2. Quina és la complexitat d'un bucle anidat?  
3. O(2n) i O(n) són el mateix?  
4. Ordena de menor a major: O(1), O(n²), O(n), O(log n), O(2ⁿ).

**🔄 Respostes**

1. La **taxa de creixement** del temps d'execució quan creix n. No els segons exactes.  
2. **O(n²)** — els bucles anidats multipliquen.  
3. **Sí** — les constants s'ignoren: O(2n) \= O(n).  
4. **O(1) \< O(log n) \< O(n) \< O(n²) \< O(2ⁿ)**.

## **✅ Resum en 3 frases**

1. Big O descriu **com creix el temps** d'un algoritme quan creix la quantitat de dades, no els segons exactes.  
2. Les regles d'or: ignora constants, queda't amb el terme dominant, **anidar multiplica** i **seqüenciar suma**.  
3. Amb dades grans, la diferència entre O(n) i O(n²) és la diferència entre un cafè i una jubilació.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| Big O | Notació per a la cota superior de creixement d'un algoritme |
| Terme dominant | El que mana quan n és enorme (el n² de n² \+ n) |
| Anidar | Ficar un bucle dins d'un altre → multiplica la complexitat |
| O(1) | Constant: sempre el mateix nombre de passos |
| O(log n) | Cada pas descarta la meitat: creix molt a poc a poc |
| Exponencial | O(2ⁿ): creix tan ràpid que és inviable amb dades mitjanes |

# **7\. Triar l'algoritme adequat** {#7.-triar-l'algoritme-adequat}

## **📬 La idea en una frase**

El millor algoritme no és el més famós ni el més ràpid en teoria: és el que encaixa amb la mida de les teues dades, el seu ordre inicial i el que necessites. Triar bé és la mitat de la faena.

Per a obrir una nou faries servir una excavadora? Doncs això. Hi ha qui clava una cerca binària en un array de 5 elements, i qui ordena un milió de dades amb bombolla. Els dos estan malament: un malgasta esforç, l'altre malgasta el seu temps de vida. Triar l'algoritme adequat és part de l'ofici.

## **📋 La taula de resum**

| Algoritme | Complexitat | Quan usar-lo? | Quan NO? |
| ----- | ----- | ----- | ----- |
| Cerca lineal | O(n) | Arrays xicotets o desordenats | Arrays grans i ordenats (la binària guanya) |
| Cerca binària | O(log n) | Arrays grans ordenats, amb moltes cerques | Arrays desordenats (escombraria sense avís\!) |
| Bombolla | O(n²) | Aprendre i arrays molt xicotets (\< 50\) | Qualsevol cosa que merega la pena |
| Inserció | O(n²) / O(n) | Arrays xicotets o quasi ordenats | Arrays grans i desordenats |

## **🧮 La pregunta clau: ¿ordenar abans de buscar?**

Val, la cerca binària és rapidíssima... però exigeix un array ordenat. I ordenar també costa. Llavors: mereix la pena ordenar primer?

La regla del bon administrador:

* Si **ordenes una vegada i busques moltes vegades** → ordena amb alguna cosa decent i després usa binària. La inversió s'amortitza.  
* Si **busques una sola vegada** en un array desordenat → cerca lineal directa. Ordenar només per a una cerca és regar el jardí amb xampany.

I una curiositat: per a arrays **molt xicotets** (menys de \~50 elements), la cerca lineal sol guanyar fins i tot amb dades ordenades, perquè la sobrecàrrega de la binària no compensa. La teoria importa, però el context mana.

## **🏫 Exemple guiat: el catàleg de la botiga**

Tens una botiga amb notes de clients i vols saber la nota de "Lluís". El catàleg està en un int\[\] notes amb els valors desordenats i només preguntaràs una vegada. Què uses?

| public class Botiga {   *// Una sola cerca sobre dades desordenades → cerca lineal*   public static int buscarNota(int\[\] notes, int objectiu) {       for (int i \= 0; i \< notes.length; i++) {           if (notes\[i\] \== objectiu) {               return i;           }       }       return \-1;   }   public static void main(String\[\] args) {       int\[\] notes \= { 7, 9, 5, 8, 6, 4 };       int posicio \= buscarNota(notes, 8);       System.out.println("El 8 està en la posició " \+ posicio);   }} |
| :---- |

I si la teua botiga rebera **milers de consultes al dia** sobre el mateix catàleg? Llavors mereix la pena ordenar l'array una vegada (costa O(n²) amb el que saps hui, i usar cerca binària en cada consulta. **Ordenar una vegada, buscar-ne mil.**

## **📊 Regles d'or per a decidir**

1. **És xicotet (\< 50)?** → Qualsevol val: usa lineal o inserció per simplicitat.  
2. **És gran i desordenat?** → No uses bombolla ni inserció. Espera a la U08 (QuickSort, MergeSort).  
3. **És gran i ordenat?** → Cerca binària, sense pensar-ho.  
4. **Està quasi ordenat?** → Inserció arrasa: O(n) en la pràctica.  
5. **Vaig a buscar moltes vegades?** → Inverteix en ordenar bé i busca amb binària.  
6. **Vaig a buscar una sola vegada?** → Lineal directa, sense drames.

⚠️ **Advertència:** la tria de l'algoritme també dependrà d'altres factors que veuràs més avant: l'**estabilitat** (mantindre l'ordre dels iguals?), la **memòria** disponible i si les dades caben en memòria. Per ara, amb estes regles d'or sobreviu a qualsevol examen i a quasi qualsevol app.

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** abans d'escriure una línia, pregunta't: *quina mida té el meu array? Està ordenat? Quantes vegades faré esta operació?* Tres preguntes, tres respostes, i l'algoritme es tria sol.

**Exercici: el cap de magatzem**

Per a cada escenari, tria l'algoritme més adequat i justifica en una línia:

1. Un array de **8** notes desordenat, buscar la nota d'un alumne una sola vegada.  
2. Una agenda de **10.000** contactes ordenada alfabèticament, on buscaràs noms constantment.  
3. Un array de **60.000** mesuraments desordenats que cal deixar ordenats de menor a major.  
4. Un array de **200** nombres ja quasi ordenats (només un parell de despistats fora de lloc).

**🔄 Solució**

1. **Cerca lineal**: array xicotet, una sola cerca, i a més està desordenat. La binària ni es planteja.  
2. **Cerca binària**: està ordenat i busques moltes vegades: O(log n) en cada consulta.  
3. **Ni bombolla ni inserció**: amb 60.000 elements, O(n²) és un martiri. Toca esperar a la U08 (QuickSort/MergeSort, O(n log n)).  
4. **Inserció**: amb dades quasi ordenades és O(n) en la pràctica, molt millor que la bombolla.

## **🎯 Mini-chequeig**

Posat a prova en 30 segons (les respostes estan amagades):

1. Quan guanya la cerca lineal a la binària encara que l'array estiga ordenat?  
2. Quan mereix la pena ordenar abans de buscar?  
3. Quin algoritme tries per a un array quasi ordenat?  
4. Quina regla d'or usaries per a un array de 100.000 elements desordenat?

**🔄 Respostes**

1. Amb arrays **molt xicotets** (\< \~50) o quan només vas a buscar **una vegada**: la sobrecàrrega de la binària no compensa.  
2. Quan **ordenes una vegada i busques moltes vegades**; la inversió s'amortitza amb les consultes.  
3. **Inserció** — és O(n) en la pràctica amb dades quasi ordenades.  
4. No usar bombolla ni inserció: el seu O(n²) seria un calvari. Espera a la U08 per a ordenar com cal.

## **✅ Resum en 3 frases**

1. L'algoritme adequat depén de la **mida**, l'**ordre inicial** i la **freqüència de les operacions**.  
2. **Ordenar una vegada i buscar moltes** amortitza la inversió; buscar una sola vegada no mereix ordenar.  
3. Regla ràpida: xicotet o desordenat → lineal; gran i ordenat → binària; quasi ordenat → inserció; gran i desordenat → espera a la U08.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| Context | Mida, ordre inicial i freqüència d'ús de les teues dades |
| Amortitzar | Recuperar una inversió inicial amb l'ús repetit |
| Sobrecàrrega | El cost fix extra d'un algoritme sofisticat en dades xicotetes |
| Trade-off | Compromís: guanyar en alguna cosa pagant alguna cosa a canvi |
| Estabilitat | Mantindre l'ordre relatiu dels elements iguals |

# **8\. Be the Code: cerca binària des de zero** {#8.-be-the-code:-cerca-binària-des-de-zero}

## **📬 La idea en una frase**

Este punt no té teoria nova: té dos reptes. Programar cerca binària i bombolla a mà, pas a pas, sense mirar els apunts. Si algun dia vols treballar en una FAANG, això ho has de saber escriure dormit.

La cerca binària és un clàssic de les entrevistes tècniques de Google, Amazon i companyia. No perquè siga difícil, sinó perquè l'**off-by-one** castiga sense pietat qui confia de més. Anem a entrenar-te perquè no sigues eixa víctima.

## **🕶️ Don Tip: la recepta mental de la binària**

Abans d'escriure codi, memoritza la recepta:

1. Dos punters: esquerra \= 0 i dreta \= array.length \- 1\.  
2. Mentre esquerra \<= dreta: calcula mig \= esquerra \+ (dreta \- esquerra) / 2\.  
3. Si array\[mig\] \== objectiu → retorna mig.  
4. Si array\[mig\] \< objectiu → esquerra \= mig \+ 1\.  
5. Si no → dreta \= mig \- 1\.  
6. Fi del bucle → retorna \-1.

L'error més comú (fins i tot amb 10 anys d'experiència) és l'**off-by-one**: ¿\<= o \<? ¿mig \+ 1 o mig? La resposta: \<= en la condició, i mig \+ 1 / mig \- 1 en moure els punters. Sense el \+1/-1, si l'objectiu no hi és, el bucle es pot quedar girant per sempre.

## **🧩 REPTE 1: Cerca binària des de zero**

Ací tens l'esquelet. Completa'l. **Sense mirar els apunts.** El teu cervell ha de recordar, no copiar:

| public class RepBbinaria {   public static int cercaBinaria(int\[\] array, int objectiu) {       *// 🧠 EL TEU CODI ACÍ*       return \-1;   }   public static void main(String\[\] args) {       int\[\] proves \= { 1, 3, 5, 7, 9, 11, 13, 15, 17, 19 };       System.out.println("El 7 està en posició: " \+ cercaBinaria(proves, 7)); *// 3*       System.out.println("El 13 està en posició: " \+ cercaBinaria(proves, 13)); *// 6*       System.out.println("El 8 està en posició: " \+ cercaBinaria(proves, 8)); *// \-1*       System.out.println("El 19 està en posició: " \+ cercaBinaria(proves, 19)); *// 9*       System.out.println("L'1 està en posició: " \+ cercaBinaria(proves, 1)); *// 0*       System.out.println("Array buit: " \+ cercaBinaria(new int\[\] {}, 5)); *// \-1*   }} |
| :---- |

**Passos guiats (resistix a llegir-los tots de cop):**

1. Declara esquerra i dreta.  
2. Escriu el while amb la condició correcta.  
3. Calcula el mig.  
4. Compara i decideix els tres casos.  
5. Fora del bucle, retorna el "no trobat".

💡 **Consell de depuració:** si alguna cosa falla, dibuixa l'array en un paper amb 3 elements i simula els passos amb un objectiu que no hi siga. El paper i el bolígraf són les teues millors ferramentes de depuració. Sí, en ple 2026, i sí, funcionen.

**🔄 Solució completa**

| public static int cercaBinaria(int\[\] array, int objectiu) {   if (array \== null || array.length \== 0)       return \-1;   int esquerra \= 0;   int dreta \= array.length \- 1;   while (esquerra \<= dreta) {       int mig \= esquerra \+ (dreta \- esquerra) / 2;       if (array\[mig\] \== objectiu) {           return mig;       } else if (array\[mig\] \< objectiu) {           esquerra \= mig \+ 1;       } else {           dreta \= mig \- 1;       }   }   return \-1;} |
| :---- |

## **🧩 REPTE 2: Bombolla a mà**

Ara toca la bombolla. Mateixa regla: sense mirar. Completa el mètode ordenar perquè deixe l'array de menor a major. Ha de mostrar 11 12 22 25 34 64 90:

| public class RepBombolla {   public static void ordenar(int\[\] array) {       *// 🧠 EL TEU CODI ACÍ*   }   public static void main(String\[\] args) {       int\[\] dades \= { 64, 34, 25, 12, 22, 11, 90 };       ordenar(dades);       for (int nombre : dades) {           System.out.print(nombre \+ " ");       }   }} |
| :---- |

**Passos guiats:**

1. Dos bucles anidats: l'exterior repeteix passades.  
2. L'interior compara parelles veïnes, arribant cada vegada un element menys.  
3. Si estan desordenades, intercanvia amb una variable temporal.  
4. Extres de nivell: afegix el flag hiHaIntercanvi amb el seu break.

**🔄 Solució completa**

| public static void ordenar(int\[\] array) {   int n \= array.length;   boolean hiHaIntercanvi;   for (int i \= 0; i \< n \- 1; i++) {       hiHaIntercanvi \= false;       for (int j \= 0; j \< n \- 1 \- i; j++) {           if (array\[j\] \> array\[j \+ 1\]) {               int temp \= array\[j\];               array\[j\] \= array\[j \+ 1\];               array\[j \+ 1\] \= temp;               hiHaIntercanvi \= true;           }       }       if (\!hiHaIntercanvi)           break;   }} |
| :---- |

## **🧩 EL LIO: la bombolla que apesta**

El departament de qualitat ha rebut este algoritme. Alguna cosa fa mala olor. Identifica els errors i explica per què no funciona:

| public class BombollaLiosa {   public static void ordenar(int\[\] arr) {       for (int i \= 0; i \< arr.length; i++) {           for (int j \= 0; j \< arr.length; j++) {               if (arr\[j\] \> arr\[j \+ 1\]) {                   int temp \= arr\[j\];                   arr\[j\] \= arr\[j \+ 1\];                   arr\[j \+ 1\] \= temp;               }           }       }   }} |
| :---- |

🕶️ **Don Tip:** quan un bucle accedix a arr\[j \+ 1\], assegura't que j \+ 1 no isca de l'array. I pregunta't: recórrec menys elements en cada passada?

**🔄 Solució**

Hi ha **dos errors**:

1. **Error d'índexs (i de càstig segur):** el bucle interior va j \< arr.length, així que quan j \= arr.length \- 1, accedix a arr\[j \+ 1\] \= arr\[arr.length\], que **no existeix** → ArrayIndexOutOfBoundsException. L'interior ha d'anar fins a arr.length \- 1 \- i.  
2. **Error de rendiment:** el bucle exterior recorre arr.length vegades i l'interior **sempre** recorre tot l'array, sense aprofitar que cada passada deixa un element col·locat al final. A més, sense el flag hiHaIntercanvi, continua fent passades encara que l'array ja estiga ordenat. És bombolla "sense polir", i es nota.

## **🎯 Mini-chequeig**

Posat a prova en 30 segons (les respostes estan amagades):

1. En la cerca binària, quina condició usa el while: esquerra \<= dreta o esquerra \< dreta?  
2. Per què esquerra \= mig (sense el \+1) pot penjar el bucle?  
3. Què passa si fas la bombolla amb j \< array.length en el bucle interior?  
4. Per a què serveix el flag hiHaIntercanvi en la bombolla?

**🔄 Respostes**

1. esquerra \<= dreta. Amb \<, et pots perdre l'element que queda just en mig quan els punters es creuen.  
2. Perquè si mig no és l'objectiu, en reassignar esquerra \= mig (o dreta \= mig) el segment **no es reduïx** i el bucle es repeteix amb els mateixos límits per sempre.  
3. ArrayIndexOutOfBoundsException: en arribar a j \= array.length \- 1, arr\[j \+ 1\] està fora de l'array.  
4. Detectar que l'array ja està ordenat per a parar (break) en comptes de seguir fent passades inútils.

## **✅ Resum en 3 frases**

1. La cerca binària s'escriu amb **dos punters**, el **mig anti-desbordament** i els **\+1/-1 sagrats**; amb això, no hi ha off-by-one que valga.  
2. La bombolla es construïx amb **dos bucles anidats**, un intercanvi amb variable temporal i, si eres llest, un **flag** que talla quan ja està ordenat.  
3. Escriure tots dos **a mà** (sense mirar) és l'exercici de la unitat: si ho aconsegueixes, et portes la medalla al cinturó.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| Off-by-one | Error de "per un": \<= vs \<, mig+1 vs mig |
| Punter | Índex que delimita el segment actual (esquerra, dreta) |
| Anti-desbordament | esquerra \+ (dreta \- esquerra) / 2 en comptes de (esquerra+dreta)/2 |
| Variable temporal | El temp que guarda un valor durant l'intercanvi |
| Flag | Booleà que avisa de si va passar alguna cosa en la passada |

# **9\. Repàs: ordena i busca com un professional** {#9.-repàs:-ordena-i-busca-com-un-professional}

## **📬 La idea en una frase**

En este punt no aprenem res de nou: ho convertim tot en pràctica. I, com sempre, alguna cosa no funcionarà. 😈

## **⭐ Sé el Código, my friend...**

*Eres la JVM. Acaben de donar-te este programa per a executar:*

| public class Misteri {   public static void main(String\[\] args) {       int\[\] dades \= { 10, 20, 30, 40, 50, 60 };       int esquerra \= 0;       int dreta \= dades.length \- 1;       int objectiu \= 40;       int passos \= 0;       while (esquerra \<= dreta) {           int mig \= esquerra \+ (dreta \- esquerra) / 2;           passos++;           if (dades\[mig\] \== objectiu) {               System.out.println("Trobat en " \+ mig \+ " amb " \+ passos \+ " passos.");               return;           }           if (dades\[mig\] \< objectiu) {               esquerra \= mig \+ 1;           } else {               dreta \= mig \- 1;           }       }       System.out.println("No hi és. Passos: " \+ passos);   }} |
| :---- |

**Què imprimeixes per pantalla? Tria saviament:**

1. **Trobat en 3 amb 1 passos.** → Confons el nombre de passos amb la posició: la cerca no arriba en una sola volta. ❌  
2. **Trobat en 3 amb 3 passos.** → ✅ Correcte\! Amb 6 elements, mig és 0 \+ (5-0)/2 \= 2 → dades\[2\] \= 30, que és menor que 40, així que esquerra \= 3\. Segona volta: mig \= 3 \+ (5-3)/2 \= 4 → dades\[4\] \= 50, que és major, així que dreta \= 3\. Tercera volta: mig \= 3 \+ (3-3)/2 \= 3 → dades\[3\] \= 40\. Bingo en 3 passos\! Amb return (estem en main) el programa acaba ací.  
3. **No hi és. Passos: 4\.** → El 40 és en l'array, només que la cerca binària no el caça a la primera. ❌

L'opció **2**. Traça: mig=2 (30\<40) → esq=3, mig=4 (50\>40) → der=3, mig=3 → 40\!. Són **3 passos** en la posició **3**. El return dins de main acaba el programa sense arribar a la línia del "No hi és".

## **🔥 Fireside Chat: cerca lineal vs cerca binària**

*Dos veterans de la cerca discuteixen al costat de la màquina de cafè.*

* **Lineal:** — Jo soc la bàsica. Recórrec element per element, sense exigir-li res a ningú. Desordenat? Sense problema. Cinc elements? Un moment. Un milió? Uns milions de passos, però vaig.  
* **Binària:** — Uns milions de passos. Quina generositat. Jo amb un milió tarde vint passos. Vint. Mentre tu sues, jo ja he acabat i estic demanant un altre cafè.  
* **Lineal:** — I qui t'ha donat permís per a ser tan intel·ligent? L'array **ordenat**. Si les dades arriben desordenades, tu no serveixes ni per a obrir la porta. Jo, en canvi, funcione sempre. És la vida: sense exigir res, però sense grans alegries.  
* **Binària:** — Ordenar una vegada i buscar mil, i veuràs. Jo soc la que salva les apps amb milions d'usuaris. Tu eres... el pla B.  
* **Lineal:** — El pla B que no s'estavella. Quan el teu array està desordenat i a ningú li apeteix ordenar-lo, a mi em criden. I no em queixe.  
* **Binària:** — Val, cadascuna al seu terreny: tu, el xicotet i desordenat; jo, el gran i ordenat amb moltes cerques. ¿Tregua?  
* **Lineal:** — Tregua. Però que sàpies que en els arrays de 5 elements et guanye fins i tot a tu, amb els teus aires d'esquerra \+ (dreta \- esquerra) / 2\.

La lliçó: cap no és millor "en general". **Lineal** per a dades xicotetes o desordenades; **binària** per a dades grans i ordenades amb moltes cerques. El context decideix.

## **🕵️ Qui Soc?**

Endevina quin concepte de la unitat soc:

1. **Soc una recepta de cuina per a l'ordinador: finita, precisa i sense ambigüitats.**  
2. **Recórrec l'array element per element fins a trobar l'objectiu. No exigisc ordre, però soc lenta amb dades grans.**  
3. **Obric el diccionari per la meitat i descarte mitja tona de paper en cada intent. Exigisc ordre, o et torne escombraria sense avisar.**  
4. **Soc el patós de l'ordenació: compare veïns i intercanvie, una vegada i una altra, fins que els grans pugen com bombolles.**  
5. **Ordene com en el pòquer: col·loque cada carta nova en el seu lloc dins de la mà que ja tinc ordenada.**  
6. **No mesure segons: mesure com creix el temps quan creixen les dades.**

**🔄 Respostes**

1. **L'algoritme** — seqüència finita, precisa i sense ambigüitat de passos.  
2. **La cerca lineal** — O(n), no exigeix ordre.  
3. **La cerca binària** — O(log n), exigeix array ordenat.  
4. **L'ordenació bombolla** — intercanvia veïns, O(n²).  
5. **L'ordenació per inserció** — col·loca cada element en el seu lloc, O(n²) amb O(n) en quasi ordenats.  
6. **La notació Big O** — descriu la taxa de creixement del temps d'execució.

## **🤬 CONRAD VS EL MÓN: "L'algoritme que no s'acaba"**

*CONRAD, el nostre compilador cascarrabutxes, opina sobre el clàssic del novell.*

**CONRAD:** — UNA ALTRA VEGADA\! Ve un alumne i em diu: *CONRAD, la meua cerca binària es queda penjada*. I jo: val, què té el bucle? *Pues no ho sé, no l'he mirat.* AI, MARE MEUA\! Un while (esquerra \<= dreta) que en lloc d'esquerra \= mig \+ 1 posa esquerra \= mig... saps què passa? El segment no es reduïx. esquerra es queda atascada i el bucle dona voltes com un gat perseguint-se la cua. Ensenyant-li l'algoritme a un robot aspirador amb direcció pròpia.

*I després està el de la bombolla:* for (int j \= 0; j \< array.length; j++) i dins array\[j \+ 1\]. DE VERITAT? Quan j arriba al final, j \+ 1 ix de l'array. A què esperes, que et llance l'ArrayIndexOutOfBoundsException per a llegir el missatge? El missatge ja t'està dient l'índex, la línia i el motiu. LLEGIX-LO.

*I el clàssic:* *el meu algoritme ordena però molt a poc a poc*. Ja. I què vas usar? *Bombolla*. Amb un array de mig milió. Saps quants intercanvis són? Els que són. I no és culpa de l'algoritme, que avisa en l'etiqueta: "O(n²), per a arrays xicotets". L'algoritme no té la culpa que no llegires l'etiqueta.

**La lliçó:** els bucles dels algoritmes es pengen per dos motius: o la condició mai no avança cap a false, o l'índex ix de l'array. Abans de plorar sobre el teclat, comprova eixes dos coses. El 90% dels "algoritmes penjats" s'arreglen amb un cop d'ull.

## **🎮 El Joc de les Decisions**

Tria la resposta correcta per a cada decisió (respostes al final):

1. Quina és la complexitat de la cerca binària?  
   * a) O(n) b) O(log n) c) O(1)  
2. Quants passos màxims necessita la cerca binària per a un array de 1.024 elements?  
   * a) 10 b) 1.024 c) 11  
3. Què retorna buscar(new int\[\]{}, 5\) amb una cerca binària ben feta?  
   * a) \-1 b) 0 c) Exception  
4. Quina d'estes és O(n²)?  
   * a) Un bucle seqüencial b) Dos bucles anidats c) Accedir a array\[0\]

**🔄 Solucions**

1. **b)** — O(log n): descartar la meitat en cada pas.  
2. **a)** — 10 passos: log₂(1.024) \= 10\.  
3. **a)** — \-1: el bucle ni tan sols entra (0 \<= \-1 és false) i retorna el "no trobat".  
4. **b)** — Dos bucles anidats multipliquen: n × n.

## **🧠 Atreveix-te a Pensar**

1. **Sense executar:** què imprimeix este programa?

| public class Misteri2 {   public static void main(String\[\] args) {       int\[\] dades \= { 2, 4, 6, 8 };       int comptador \= 0;       for (int i \= 0; i \< dades.length; i++) {           for (int j \= i \+ 1; j \< dades.length; j++) {               if (dades\[i\] \< dades\[j\]) {                   comptador++;               }           }       }       System.out.println(comptador);   }} |
| :---- |

2. **La còpia que es desordena:** què li passa a la bombolla si en lloc de comparar \> compares \>=? Afecta l'estabilitat de l'algoritme?  
3. **El detectiu:** la teua cerca binària retorna \-1 per a un nombre que SÍ és en l'array. Quina ferramenta uses i quines variables mires primer?  
4. **Vertader o fals:** "la cerca binària funciona amb qualsevol array, només que a vegades és més lenta".

**💡 Solucions**

1. Imprimeix **6**. El bucle doble compta les parelles (i, j) amb i \< j on dades\[i\] \< dades\[j\]. Amb {2,4,6,8} totes les parelles compleixen: 4 · 3 / 2 \= 6\.  
2. Amb \>= la bombolla seguiria ordenant, però **romp l'estabilitat**: dos elements iguals podrien intercanviar-se, canviant el seu ordre relatiu. La versió amb \> (estricte) manté l'ordre dels iguals.  
3. El **depurador**: posa un breakpoint en el while i observa esquerra, dreta i mig en cada volta. Si dreta mai no baixa o esquerra no avança amb mig \+ 1, eixe és el fall. El clàssic off-by-one.  
4. **Fals.** Amb un array desordenat no és que siga lenta: retorna **resultats incorrectes sense avisar**. No hi ha error, hi ha escombraria silenciosa.

## **💬 Preguntes d'Entrevista de Treball**

Preguntes reals que et farien per a programador Java júnior.

1. **"Explica'm, com si jo fóra la teua àvia, la diferència entre cerca lineal i cerca binària."**  
2. **"Què és la notació Big O i per què és important?"**  
3. **"Escriu una cerca binària en la pissarra. Ara digues-me què passa si l'array no està ordenat."**  
4. **"Quan usaries l'ordenació per inserció en comptes de la bombolla?"**  
5. **"Què és l'off-by-one i com l'evites en la cerca binària?"**  
6. **"Un algoritme O(n²) tarda 1 segon amb 1.000 elements. Quant tardarà amb 2.000? I amb 10.000?"**

## **🤷 No hi ha preguntes tontes**

❓ **Puc usar Arrays.sort() i Arrays.binarySearch() de Java en comptes d'escriure els algoritmes?**

En els teus programes reals, sí: Java porta utilitats ordenades, eficients i provades, i veuràs Arrays.sort() prompte. Però en esta unitat l'objectiu és **entendre la idea** que hi ha davall. És com aprendre a fer una suma a mà abans d'usar la calculadora: no és que la calculadora siga dolenta, és que necessites saber què estàs fent. I en una entrevista, l'entrevistador vol veure que ho entens, no que saps importar java.util.Arrays.

❓ **Per què cal dir "log n" i no simplement "pocs passos"?**

Perquè "pocs passos" no serveix per a comparar: pocs comparats amb què. El logaritme en base 2 et diu exactament **quantes vegades pots partir per la meitat** abans d'arribar a 1\. I quan algú et diu "és O(log n)", tu saps exactament què significa. La precisió és el sou del programador.

❓ **Si bombolla i inserció són totes dues O(n²), per què es diu que la inserció és millor?**

Per dos motius: en el **cas mitjà** fa menys intercanvis (desplaça, no intercanvia de tres en tres), i en **arrays quasi ordenats** és O(n) de veritat, mentre que la bombolla sense flag continua fent passades senceres. En la pràctica, amb arrays xicotets, la inserció nota la diferència. Amb arrays grans, cap de les dues: ací arriba la U08.


**Reconocimiento \- No comercial \- CompartirIgual (BY-NC-SA)**: No se permite un uso comercial de la obra original ni de las posibles obras derivadas, la distribución de las cuales se ha de hacer con una licencia igual a la que regula la obra original.

**ÍNDEX**

[**1\. Què és una funció?	3**](#1.-què-és-una-funció?)

[**2\. El teu primer mètode	6**](#2.-el-teu-primer-mètode)

[**3\. Paràmetres: l'entrada	9**](#3.-paràmetres:-l'entrada)

[**4\. return: l'eixida	12**](#4.-return:-l'eixida)

[**5\. Àmbit de variables	15**](#5.-àmbit-de-variables)

[**6\. Errors freqüents	19**](#6.-errors-freqüents)

[**7\. Divideix el problema	22**](#7.-divideix-el-problema)

[**8\. Repàs: Be the Code	25**](#8.-repàs:-be-the-code)

[**9\. Repàs general	29**](#9.-repàs-general)

**Unitat 05 \- Funcions i mètodes**

# **1\. Què és una funció?** {#1.-què-és-una-funció?}

## **📬 La idea en una frase**

Una funció és una recepta amb nom: rep dades per la porta, fa una cosa ben explicada i torna el resultat; tu només l'invites pel seu nom.

## **🍳 El problema: el paràgraf infinit**

Mira este main d'un quadern de notes:

| public class Notas {    public static void main(String\[\] args) {        *// Calcular la mitjana de 3 notes*        double media \= (8 \+ 7 \+ 9) / 3.0;        System.out.println("Mitjana 1: " \+ media);        *// Calcular la mitjana d'altres 3 notes... una altra volta*        double media2 \= (6 \+ 5 \+ 10) / 3.0;        System.out.println("Mitjana 2: " \+ media2);        *// I demà, amb 30 alumnes, copiar i pegar 30 voltes*    }} |
| :---- |

El càlcul està escrit **dues voltes**. Si demà canvies la fórmula (¿i si les notes tenen pes?), hauràs de buscar i arreglar totes les còpies: una oblidada i el programa ja ment. Programar copiant i enganxant és com cuinar repetint cada pas del receptari en veu alta en cada plat: funciona... fins que tens comensals.

⚠️ **Advertència:** si alguna volta escrius // Calcular la mitjana més d'un programa en el mateix fitxer, en algun lloc un programador sènior torna a plorar. El codi repetit no és codi: és deute amb interessos.

## **📖 La recepta amb nom**

Una **funció** (en argot: un **mètode**) és exactament això: una recepta amb nom en el receptari.

| Recepta de cuina | Funció en Java |
| ----- | ----- |
| El nom ("Truita de patates") | El nom del mètode (calcularMedia) |
| els ingredients que et passen | Els paràmetres (les dades d'entrada) |
| Els passos dins de la recepta | El cos (el codi entre { i }) |
| El plat que ix | El valor que torna (o res, si només fa alguna cosa) |

No recites la recepta sencera cada volta: dius **"truita"** i la cuina treballa. El mateix: dius calcularMedia(...) i el programa executa eixe tros de codi en el seu lloc.

| double notaMedia \= calcularMedia(8, 7, 9);System.out.println("Mitjana 1: " \+ notaMedia); |
| :---- |

Dues línies on abans n'hi havia tres... i el millor: la fórmula **només està escrita una volta**. Quan canvie, canviarà en un sol lloc.

## **🔧 Funció o mètode? (no, no és el mateix... bé, sí)**

Curs honest sobre la terminologia:

* **Funció** és el concepte general: entrades → procés → eixides. En Python, JavaScript o C les anomenes funcions.  
* **Mètode** és eixa mateixa idea **vivint dins d'una classe**, que és on viu tot en Java (ja ho vas veure en la U02: fins i tot main està dins d'una classe).

En la pràctica, tothom usa els dos noms per al mateix, i en este curs també ho farem. Si en una entrevista et pregunten la diferència, ací tens la resposta exacta: **en Java, les funcions són mètodes d'una classe**.

💡 **Consell:** "mètode" és la paraula que veuràs en la documentació de Java i en els errors del compilador. "Funció" és la que escoltaràs en les converses. Saber les dos t'evita quedar-te fora de la conversa.

## **🧰 Què guanya el teu programa al tallar-lo**

1. **No repeteixes codi.** La fórmula s'escriu una volta i s'usa 30\.  
2. **Es llig millor.** mostrarMedia(...) explica què passa; cinc línies d'aritmètica a mitges no.  
3. **Es prova per parts.** Pots comprovar que calcularMedia funciona sense executar el programa sencer.  
4. **Es repara sense por.** Arregles el tros trencat (el mètode) i la resta no s'assabenta.

És el mateix instint de la descomposició de la U01, però esta vegada amb ferramenta: abans **pensaves** el problema per parts; ara el llenguatge et deixa **escriure** cada part per separat.

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** el nom del mètode és documentació. Un mètode anomenat hacerCosas és una confessió; un anomenat calcularIVA és un pla.

**Exercici: el vident d'eixides**

| public class Vidente {    static void saludar() {        System.out.println("Hola, món");    }    public static void main(String\[\] args) {        saludar();        saludar();    }} |
| :---- |

**Què imprimeix?**

* (A) Hola, món una volta  
* (B) Hola, món dues voltes  
* (C) Res: els mètodes no s'executen sols

**🔄 Solució**

La **B**. saludar() es crida dos voltes des de main, i cada crida executa el seu cos: dos Hola, món. Un mètode no s'executa sol en declarar-se: només quan algú el crida. (La C és la trampa clàssica de "si està escrit, s'executa".)

## **🎯 Mini-chequeig**

Posat a prova en 30 segons (les respostes estan amagades):

1. Quines tres coses "típiques" té una funció (segons la taula de la recepta)?  
2. S'executa el cos d'un mètode pel sol fet d'estar escrit en el fitxer?  
3. main és una funció? I saludar() del teu propi programa?  
4. Menciona dues avantatges de tallar el codi en mètodes.

**🔄 Respostes**

1. Un **nom**, unes **entrades** (paràmetres) i un **resultat** que torna (o res).  
2. No. S'executa quan algú el **crida**.  
3. main és el mètode especial per on arranca el programa; saludar() és un mètode normal. En Java, els dos són mètodes (funcions dins d'una classe).  
4. Qualsevol de: no repetir codi, llegibilitat, provar per parts, reparar sense trencar la resta (i la quarta corona: canviar la fórmula en un sol lloc).

## **✅ Resum en 3 frases**

1. Una **funció/mètode** és una recepta: rep dades, fa una cosa i torna (o no) alguna cosa.  
2. El seu avantatge és **escriure una volta, usar moltes**: el codi repetit desapareix i el canvi afecta un sol lloc.  
3. En Java tot mètode viu dins d'una classe, per això "funció" i "mètode" són la mateixa ferramenta amb dos noms.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| Funció / Mètode | Recepta amb nom: entrades → procés → eixida |
| Paràmetre | Dada que la funció rep per la porta |
| Retorn | Valor que la funció torna en acabar |
| Crida | Executar un mètode: nom(...) |
| Cos | El codi entre { i } del mètode |

# 

# **2\. El teu primer mètode** {#2.-el-teu-primer-mètode}

## **📬 La idea en una frase**

Declarar un mètode és escriure la seua recepta (public static void nom() { ... }); cridar-lo és dir el seu nom amb parèntesis i punt i coma perquè execute el seu cos.

## **✍️ La primera recepta**

Este és un programa complet amb un mètode propi:

| public class Saludo {    public static void saludar() {        System.out.println("Hola, classe\!");    }    public static void main(String\[\] args) {        saludar();        saludar();    }} |
| :---- |

**Eixida:**

| Hola, classe\!Hola, classe\! |
| :---- |

Dos parts: **saludar()** és la recepta (declarada amunt), i en main la **cridem** dues voltes. Fixa't en els dos detalls d'escriptura:

* La **declaració** no porta punt i coma al final: acaba amb el seu bloc { ... }.  
* La **crida** sí porta ;, perquè és una sentència, igual que int x \= 5;.

## **🔍 La firma, paraula per paraula**

| public static void saludar() { |
| :---- |

| Paraula | Què significa | Quan la veuràs explicada |
| ----- | ----- | ----- |
| public | Visible des de qualsevol lloc | U10 (visibilitat) |
| static | Pertany a la classe, no a un objecte | U10 (mètodes static) |
| void | No torna res | Punt 4 d'esta unitat |
| saludar() | El nom i els seus parèntesis | Hui |

De moment escrius **sempre** public static davant dels teus mètodes. No els oblides: sense static, main no podrà cridar-los (l'explicació completa arriba en la U10, quan ja sàpigues què és un objecte).

📝 **Nota:** el nom segueix la convenció camelCase: calcularMedia, mostrarMenu, esPar. Sense espais, sense accents, i la primera paraula en minúscula. Java és mandrós amb els accents i puntual amb les majúscules.

### **Les regles del joc**

1. Els mètodes es declaren **dins de la classe**, mai dins d'un altre mètode (ni tan sols dins de main).  
2. L'**ordre no importa**: pots cridar a un mètode declarat més baix de tot. Java no llig d'amunt a avall; busca per nom.  
3. Cada mètode és una illa amb el seu propi nom: dos mètodes no poden cridar-se igual **amb els mateixos paràmetres** (això ho veuràs en la U09, amb la sobrecàrrega).

⚠️ **Advertència:** l'error de compilació cannot find symbol en cridar un mètode gairebé sempre vol dir que li has posat un nom diferent del que té, o que el crides des de fora de la classe.

## **🎬 main també és un mètode**

Ací està la revelació del dia: main no és especial perquè siga màgic, sinó perquè la JVM **el busca per eixe nom exacte** per a arrancar el teu programa:

| public static void main(String\[\] args) { |
| :---- |

* public → la JVM ha de poder veure'l.  
* static → la JVM el crida **sense crear un objecte** de la teua classe.  
* void → torna res (només executa).  
* String\[\] args → l'array d'arguments de la línia d'ordres (ho vas vore en la U02).

Tot el que has anat usant des de les primeres unitats era... un mètode més. La diferència és que tu només cridaves a un sense adonar-te'n. Ara crides a tots els que et vinga de gust.

| public class Reencuentro {    public static void main(String\[\] args) {        saludar(); *// cridem a un mètode nostre*        System.out.println("Continuar amb el programa...");    }    public static void saludar() {        System.out.println("Hola una altra volta");    }} |
| :---- |

Funciona encara que saludar estiga **baix** de main. Regla 2: l'ordre no importa.

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** si main necessita cridar a un mètode, eixe mètode gairebé sempre necessita static. Sense static, hauràs d'esperar a la U10 perquè les coses encaixen.

**Exercici: la firma trencada**

Quin d'estos mètodes **compila**?

| *// Opció A* static public void contar() {    System.out.println("1"); } *// Opció B* public static contar() {    System.out.println("1"); } *// Opció C* public static void contar {     System.out.println("1"); } *// Opció D* public static void contar() System.out.println("1"); |
| :---- |

**🔄 Solució**

La **A**. static i public poden anar en qualsevol ordre: les dos són modificadors. La B oblida el tipus de retorn (void). La C oblida els parèntesis (). La D oblida les claus { }: el cos **sempre** va entre claus.

## **🎯 Mini-chequeig**

Posat a prova en 30 segons (les respostes estan amagades):

1. Escriu la firma completa d'un mètode anomenat acomiadar que no torne res.  
2. Quina línia (i en quin lloc) executa el cos de acomiadar()?  
3. Pot main estar declarat DESPRÉS d'acomiadar en la classe? I a l'inrevés?  
4. Quina és la diferència de puntuació entre declarar i cridar?

**🔄 Respostes**

1. public static void acomiadar() { ... }  
2. Una **crida** com acomiadar(); (amb punt i coma), per exemple dins de main.  
3. Sí a les dos: l'ordre dels mètodes dins de la classe no importa.  
4. Declarar acaba en { ... } **sense** ;; cridar és una sentència i porta ;.

## **✅ Resum en 3 frases**

1. Un mètode es declara amb la seua firma (public static void nom() {...}) dins de la classe i **s'executa només quan el cries**.  
2. public static void main(String\[\] args) és un mètode més: la JVM el crida en arrancar perquè té eixe nom exacte.  
3. L'ordre dels mètodes no importa; el que importa és el nom correcte i no declarar un mètode dins d'un altre.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| Firma | La línia completa: modificadors \+ retorn \+ nom \+ paràmetres |
| Declaració | Definir la recepta (amb el seu cos {...}) |
| Crida | Executar el mètode: nom(args); |
| static | De classe: s'usa sense crear objectes (detall en U10) |
| void | "No torne res" |
| camelCase | calcularMedia: minúscula a l'inici, majúscules entre paraules |

# **3\. Paràmetres: l'entrada** {#3.-paràmetres:-l'entrada}

## **📬 La idea en una frase**

Els paràmetres són les variables que un mètode rep en ser cridat: tu passes valors en els parèntesis i el mètode treballa amb ells com si els haguera escrit ell mateix.

## **🔁 El problema: el mètode de sempre**

El nostre saludar() només sap dir una cosa:

| static void saludar() {   System.out.println("Hola, classe\!");} |
| :---- |

Si demà s'ha de saludar a "Marta", a "Youssef" i a tota la classe un a un, toca copiar i enganxar amb noms diferents... o donar-li **entrades** al mètode:

| public class Saludos {   public static void saludar(String nombre) {      System.out.println("Hola, " \+ nombre \+ "\!");   }   public static void main(String\[\] args) {      saludar("Marta");      saludar("Youssef");      saludar("la classe sencera");   }} |
| :---- |

**Eixida:**

| Hola, Marta\!Hola, Youssef\!Hola, la classe sencera\! |
| :---- |

Una sola recepta, tres plats. El mètode ja no decideix quines dades usa: **se les passes**.

## 

## **📥 Com es declaren**

| *public static void saludar(String nombre) { // ^^^^^^^^^^^^ // paràmetre: tipus \+ nom* |
| :---- |

* Cada paràmetre porta **tipus** i **nom**, com una variable: String nombre, int edad, double nota.  
* Varios paràmetres se separen amb **coma**, i cadascú repeteix el seu tipus: String nombre, int edad.  
* Dins del cos, els paràmetres s'usen **com variables normals**: es llegeixen, es concatenen, es comparen.

| public static void presentar(String nombre, int edad) {	System.out.println(nombre \+ " té " \+ edad \+ " anys.");}public static double areaRectangulo(double base, double altura) {	return base \* altura; *// ja sabem tornar\! detall en el punt 4*} |
| :---- |

💡 **Consell:** nomena els paràmetres per el que **són**, no per l'ordre: double base, double altura s'entén; double x, double y obliga a llegir el cos cada volta.

### **Paràmetre ≠ argument**

Dos paraules, dos moments, la mateixa confusió eterna:

| *// paràmetres (en la declaració)*static int sumar(int a, int b) { return a \+ b; }*// arguments (en la crida)*int r \= sumar(3, 4); |
| :---- |

| Moment | Nom | Exemple |
| ----- | ----- | ----- |
| Declarar el mètode | Paràmetres | int a, int b |
| Cridar el mètode | Arguments | 3, 4 |

En les converses de passadís tot el món diu "paràmetres" per als dos. En un examen o en una entrevista, la distinció et fa sonar a professional.

## **🎯 Regles de les entrades**

1. **L'ordre importa:** presentar("Ana", 20\) no és el mateix que presentar(20, "Ana") (aquesta última ni compila: Java espera un String primer).  
2. **El nombre importa:** sumar(3) i sumar(3, 4, 5\) no coincideixen amb la firma → error de compilació.  
3. **El tipus ha d'encaixar:** un int s'accepta on es demana double (ampliació automàtica), però un String on es demana int és un mur: incompatible types: String cannot be converted to int.  
4. Cada crida crea **les seues pròpies còpies** dels arguments: sumar(3, 4\) i sumar(10, 20\) viatgen amb els seus valors, sense pisar-se (per a primitius i valors simples, és així; els objectes guarden alguna sorpresa per a la U09).

⚠️ **Advertència:** si crides saludar(); a un mètode que espera un String, no hi ha "evitació elegant": error: method saludar in class ... cannot be applied to given types. Els paràmetres no són opcionals.

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** quan un mètode té molts paràmetres del mateix tipus (int fila, int columna), comet el crim de canviar l'ordre i veuràs com tot el programa comença a apuntar a la casella equivocada. Per això es nomenen bé i es passen en ordre.

**Exercici: la crida confusa**

| public class Confusion {   static void pintar(String color, int veces) {      for (int i \= 0; i \< veces; i++) {         System.out.print(color);      }      System.out.println();   }   public static void main(String\[\] args) {      pintar("verd", 3);      pintar(2, "blau");   }} |
| :---- |

**Què passa?**

* (A) Imprimeix verdverdverd i després blaublaublau  
* (B) Compila i imprimeix verdverdverd i 2222... (bucle rar)  
* (C) No compila: en la segona crida, arguments en ordre incorrecte  
* (D) No compila: pintar necessita return

**🔄 Solució**

La **C**. El primer paràmetre és String i el segon int; en pintar(2, "blau") arriba un int on ha d'anar el String → incompatible types. L'ordre dels arguments és part de la firma.

## **🎯 Mini-chequeig**

Posat a prova en 30 segons (les respostes estan amagades):

1. En static void log(String mensaje, int nivel), quins són els paràmetres i què li passes en log("Fallo", 3)?  
2. Per què sumar(1, 2, 3\) no compila si sumar(int a, int b) està ben escrit?  
3. Quina paraula descriu a 3 i 4 en sumar(3, 4): paràmetre o argument?  
4. Es pot cridar a un mètode sense parèntesis, com saludar;?

**🔄 Respostes**

1. Paràmetres: String mensaje i int nivel. Arguments: "Fallo" i 3\.  
2. Perquè la firma admet **2** arguments i la crida n'envia **3**: wrong number of arguments.  
3. **Arguments** (els paràmetres viuen en la declaració).  
4. No. Sense () no és una crida: saludar; és una expressió sense efecte (i ni això compila com t'esperes). Crida \= saludar();.

## **✅ Resum en 3 frases**

1. Els **paràmetres** (tipus \+ nom) es declaren entre parèntesis i dins del mètode s'usen com variables.  
2. En la crida passes **arguments** amb un **ordre, nombre i tipus** que han d'encaixar amb la firma.  
3. Varios paràmetres se separen per coma i cadascú porta el seu tipus: String nombre, int edad.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| Paràmetre | Variable de l'entrada, en la declaració |
| Argument | Valor que passes en la crida |
| Firma | Nom \+ tipus dels paràmetres |
| Ampliació | int cap en double sense avisar |
| Còpia de l'argument | Cada crida treballa amb el seu propi valor |

# **4\. return: l'eixida** {#4.-return:-l'eixida}

## **📬 La idea en una frase**

Un mètode amb return calcula i lliura un valor a qui l'ha cridat; un mètode void només executa alguna cosa i s'calla. La firma promet el tipus i return compleix la promesa.

## **📤 Dos oficis, dos firmes**

Fins ara els teus mètodes **feien** coses (imprimien). Ara aniran a **entregar** coses:

| *public static int sumar(int a, int b) {	return a \+ b;} // ^^^ // la firma diu "torne int" i return ho compleix* |
| :---- |

Qui crida rep el valor **i pot usar-lo**:

| *int total \= sumar(3, 4); // 7 en una variableSystem.out.println(sumar(3, 4)); // 7 directe al printlnint doble \= sumar(sumar(1, 2), 3); // tornat com a argument: 6* |
| :---- |

La regla d'or: **el tipus del return ha d'encaixar amb el tipus de la firma**. int amb int, double amb double, String amb String. Si la firma diu double i tornes 7, Java ho accepta (l'enter s'amplia). Si diu String i tornes 7, és un mur: incompatible types: int cannot be converted to String.

### **void: la firma que no promet res**

| public static void imprimirResultado(int x) {	System.out.println("Resultat: " \+ x);	*// sense return (o amb un return; buit opcional)*} |
| :---- |

void \= "no torne res, només faig el meu treball". Com tries?

| Usa retorn quan... | Usa void quan... |
| ----- | ----- |
| Un altre mètode necessita el resultat | Només s'ha de produir un efecte (imprimir, guardar, pintar) |
| La tasca és "calcular" | La tasca és "fer" |
| Vols provar el valor per separat | El resultat ja es veu en pantalla o en fitxer |

💡 **Consell:** si el teu mètode es diu calcular..., get..., es... o devolver..., gairebé segur que ha de **tornar**. Si es diu imprimir..., mostrar... o guardar..., gairebé segur que és void. El nom del mètode i la seua firma conten la mateixa història.

## **🛤️ return talla l'execució**

El primer return que s'executa **acaba el mètode a l'instant**: el que hi haja davall no s'executa mai.

| public static String clasificar(int nota) {	if (nota \>= 5) {		return "Aprovat";	} 	return "Suspès"; *// només s'assolix si la línia anterior no s'executa*} |
| :---- |

Dos return en el mateix mètode són legals (i molt útils), sempre que **tots els camins possibles acaben en un**:

| public static int maximo(int a, int b) {   if (a \> b) {      return a;   } else {      return b; *// tots els camins tanquen ✓*   }} |
| :---- |

Si un camí arriba al final sense return:

| public static int peligro(int a) {   if (a \> 0) {      return a;   }   *// ¿i si a \<= 0? → error: missing return statement*} |
| :---- |

Error: missing return statement. Java no endevina: **exigeix** que la firma no puga quedar sense complir.

⚠️ **Advertència:** codi després d'un return incondicional no s'executa mai (unreachable statement és la seua forma de protesta). I si una branca torna int i una altra double... la firma només admet un: decideix.

## **🎭 El pecat d'imprimir quan has de tornar**

L'error conceptual més comú de la unitat:

| *// ❌ Imprimeix la mitjana... però qui crida no s'assabenta*public static void media(int a, int b) {   System.out.println((a \+ b) / 2.0);}*// ✅ Torna la mitjana; qui crida decideix què fer*public static double media(int a, int b) {   return (a \+ b) / 2.0;} |
| :---- |

Amb la versió void, main no pot guardar la mitjana, comparar-la ni reutilitzar-la: es va imprimir i va desaparèixer. Amb return, el valor entra en el programa com a dades de veritat.

Pràctica: **System.out.println és per a main (o per als mètodes l'ofici dels quals siga mostrar), no per als mètodes que calculen**. Qui calcula calcula; qui decideix imprimeix.

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** return true; / return false; en un mètode que comença per es, te o pot és el patró més rendible del llenguatge: converteix preguntes en booleanes reutilitzables.

**Exercici: l'endevinalla del retorn**

| public static int truco(int x) {   if (x \> 10) {      return x \* 2;   } else if (x \> 5) {      return x \+ 3;   }   return 1;} |
| :---- |

**Què torna truco(7) i truco(12)?**

* (A) 10 i 24  
* (B) 14 i 24  
* (C) 10 i 12  
* (D) Compila, però truco(7) no torna res

**🔄 Solució**

La **A**: 10 i 24\. truco(7) no compleix x \> 10, cau en x \> 5 i torna 7 \+ 3 \= 10\. truco(12) compleix la primera branca i torna 12 \* 2 \= 24\. Traça el camí línia a línia sense donar-te les ganes: això és exactament el que fa el truc.

## **🎯 Mini-chequeig**

Posat a prova en 30 segons (les respostes estan amagades):

1. En public static boolean esPar(int n), quines dues línies ha de tindre com a mínim el cos?  
2. Quin error dona un mètode int sense return en alguns camins?  
3. Quina és la diferència entre void imprimir(int x) i int devolver(int x) per a qui crida?  
4. Es pot fer return sense valor en un mètode int?

**🔄 Respostes**

1. Almenys un return amb booleà: return n % 2 \== 0; (pot tindre més branques amb if).  
2. missing return statement (error de compilació).  
3. void només produeix un efecte (imprimir); int entrega un valor que qui crida pot guardar, comparar o reutilitzar.  
4. No. return; (buit) només val en mètodes void; un int necessita return expressió;.

## **✅ Resum en 3 frases**

1. La firma promet un tipus de retorn i cada camí del cos el compleix amb return expressió;.  
2. return **acaba el mètode** en executar-se; si algun camí arriba al final sense return (i no és void), no compila.  
3. Els mètodes **calculen** tornant; imprimir és ofici de qui decideix (normalment main).

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| return | Entrega un valor i tanca el mètode |
| void | Firma sense retorn: només executa |
| missing return statement | Algun camí no compleix la firma |
| Predicat | Mètode que torna boolean (esPar) |
| Ampliació | int cap en double en tornar |

# **5\. Àmbit de variables** {#5.-àmbit-de-variables}

## **📬 La idea en una frase**

L'àmbit (scope) és el tros de codi on una variable existeix: dins d'un mètode només viuen els seus paràmetres i els seus locals, i el que naix ahí mor ahí.

## **🏠 Cada mètode és una casa**

| public class Casas {   public static void sumar() {      int total \= 10;      total \+= 5;      System.out.println(total); *// 15*   }   public static void restar() {      int total \= 100;      total \-= 5;      System.out.println(total); *// 95*   }   public static void main(String\[\] args) {      sumar();      restar();      *// System.out.println(total); → ¡error\!*   }} |
| :---- |

Dos mètodes amb una variable anomenada total **alhora**: zero problemes, perquè són dos total diferents, una en cada casa. En canvi, si main intenta usar total sense declarar-la:

| error: cannot find symbol: variable total |
| :---- |

Java no la troba perquè **no existeix** fora de sumar(). El mètode ha acabat, la seua pila d'execució s'ha desfet i total ja no està.

💡 **Consell:** quan veges cannot find symbol en una variable, gairebé sempre és una de dos: l'has escrit malament (typo) o estàs intentant usar-la **fora de la seua casa**.

## **📏 Les regles de l'àmbit**

1. **Paràmetres i locals** d'un mètode es veuen **dins d'eixe mètode** (de la seua firma a la seua clau de tancament).  
2. **Un bloc també és una casa menuda:** una variable declarada dins d'un if o d'un for no existeix fora de les seues claus (ja ho vas vore en la U04).

| *for (int i \= 0; i \< 10; i++) { ... }// System.out.println(i); → cannot find symbol: variable i* |
| :---- |

3. **L'ordre importa dins del mètode:** només pots usar una variable **després** de declarar-la.  
4. **Dues germanes no es barallen:** cada mètode té el seu propi espai; repetir noms entre mètodes és normal i sa.  
5. En acabar el mètode, les seues variables **moren**: els seus valors no sobreviuen (salvo el que el mètode torne amb return o el que imprima).

main: sumar:  
 ┌──────────┐ ┌──────────────┐  
 │ (res)    │ │ total \= 10   │ ← existeix només ací  
 └──────────┘ │ total \= 15   │  
              └──────────────┘ ← i ací desapareix

## **🚪 El que entra per la porta també és de la casa**

Els **paràmetres** són variables com les altres: es declaren a l'inici del mètode i moren amb ell.

| public static int triplicar(int numero) {   int resultado \= numero \* 3; *// dos variables de la casa*   return resultado;} |
| :---- |

I ací arriba la conseqüència bonica: com Java copia els arguments en entrar, **el teu mètode pot usar el valor que li passes, però no reescriure la variable de qui crida**:

| *int puntos \= 10;triplicar(puntos);System.out.println(puntos); // continua sent 10* |
| :---- |

triplicar va treballar amb la seua **còpia** de puntos. Per a "tornar" canvis, el mètode torna el nou valor amb return i qui crida el guarda. (¿I què passa amb els arrays, que sí es modifiquen des de dins? Eixe misteri ho resols en la U06, punt 5\. I la versió completa, amb objectes, en la U09.)

⚠️ **Advertència:** no intentes "guardar" el resultat d'un mètode en una variable d'un altre mètode. Els mètodes només comparteixen el que es **passen** (arguments) o el que es **torna** (return). No hi ha ventanetes laterals.

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** si necessites recordar alguna cosa d'un mètode a un altre, no amagues una variable: **torna-la** amb return i que la decisió la prenga qui crida.

**Exercici: existeix esta variable?**

| public class Alcance {   public static void a() {      int x \= 1;   }   public static void b() {      System.out.println(x);   }   public static void main(String\[\] args) {      b();   }} |
| :---- |

**Què passa?**

* (A) Imprimeix 1  
* (B) Imprimeix 0  
* (C) No compila: x no existeix en b()  
* (D) Compila, però llança excepció en executar

**🔄 Solució**

La **C**. x viu i mor dins de a(). El mètode b() no la coneix: és un cannot find symbol de compilació, ni tan sols arriba a executar-se. Les variables no viatgen entre mètodes per art d'engany.

## **🎯 Mini-chequeig**

Posat a prova en 30 segons (les respostes estan amagades):

1. Poden dos mètodes tindre una variable local anomenada contador alhora?  
2. Existeix i del for fora de les seues claus?  
3. Sobreviu resultado a l'acabar el mètode que la declara?  
4. El meu mètode no canvia el saldo que li he passat. És un bug?

**🔄 Respostes**

1. Sí: cadascuna viu en el seu mètode, són dos variables diferents.  
2. No. El seu àmbit acaba en la clau de tancament del for.  
3. No. Les locals moren en eixir del mètode; només sobreviu el que tornes.  
4. No és un bug: els arguments primitius arriben **copiats**. Si necessites el resultat, torna'l amb return.

## **✅ Resum en 3 frases**

1. L'**àmbit** d'una variable és el tros de codi on existeix: el seu mètode (o el seu bloc if/for) i res més.  
2. Dins caben **paràmetres** i **locals**; en acabar el mètode desapareixen i un altre mètode no pot veure-les.  
3. Entre mètodes només viatja el que es **passa** (arguments copiats) o el que es **torna** (return).

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| Àmbit / scope | Regió on una variable existeix |
| Variable local | Declarada dins d'un mètode o bloc |
| Paràmetre | Variable d'entrada del mètode |
| cannot find symbol | Estàs usant una variable fora de la seua casa |
| Còpia de l'argument | El mètode treballa amb el seu propi duplicat |

# 

# **6\. Errors freqüents** {#6.-errors-freqüents}

## **📬 La idea en una frase**

Els errors amb mètodes no són aleatoris: tenen nom, missatge i arregla. Apren els set i el 90% de les teues hores de frustració s'evaporen.

## **🧯 La galeria dels 7 entrebancs**

### **1\. Falta el return (o no tots els camins tanquen)**

| public static int doble(int n) {   if (n \> 0) {      return n \* 2;   }   *// ¿i si n \<= 0?*} |
| :---- |

error: missing return statement. **Arregla:** tanca tots els camins amb return.

### **2\. Arguments en ordre o tipus incorrecte**

| static void pintar(String color, int veces) { ... }pintar(3, "roig"); |
| :---- |

error: incompatible types: int cannot be converted to String. **Arregla:** respecta l'ordre i el tipus de la firma; repassa la crida amb els ulls en la declaració.

### **3\. Nombre d'arguments que no quadra**

| static int suma(int a, int b) { return a \+ b; }int r \= suma(1, 2, 3); |
| :---- |

error: wrong number of arguments. **Arregla:** la firma mana: 2 paràmetres \= 2 arguments, ni un de més ni un de menys.

### **4\. Imprimir quan has de tornar**

| *static void media(int a, int b) {   System.out.println((a \+ b) / 2.0); // void, sense retorn}double m \= media(3, 4); // ← això no compila: void no és un valor* |
| :---- |

error: incompatible types: void cannot be converted to double. **Arregla:** que el mètode return el resultat; imprimir és cosa de qui crida.

### **5\. Oblidar static en cridar des de main**

| void saludar() { ... } *// sense static*public static void main(String\[\] a) {   saludar(); *// ← ¡PROHIBIT de moment\!*} |
| :---- |

error: non-static method saludar() cannot be referenced from a static context. **Arregla:** d'esta unitat, els teus mètodes porten static. L'explicació completa (i l'alternativa amb objectes) viu en la U10.

### **6\. Cridar com si fora sentència solta**

| *saludar // falten () i ;saludar() // falta el ;* |
| :---- |

**Arregla:** la crida és saludar(); — amb parèntesis (encara que no porte arguments) i amb punt i coma.

### **7\. Copiar i enganxar... el mètode equivocat**

| *mostrarTotal();mostrarTotal(); // volies cridar a mostrarMedia()* |
| :---- |

Sense error de compilació: **el més perillós dels set**. Compila, executa i ment. **Arregla:** llegeix el nom de cada crida com si l'escriguera un desconegut (perquè d'ací a dos setmanes ho seràs).

📝 **Nota:** els errors 1-6 els veu CONRAD en roig abans d'executar. El 7 és d'execució: per això el nom del mètode i la prova manual importen tant.

## **🩺 Com diagnosticar sense perdre't**

Quan fallen un mètode, fes les preguntes en este ordre:

1. **¿Compila?** → Llegeix el missatge de CONRAD: cannot find symbol (mal escrit o fora d'àmbit), wrong number of arguments, incompatible types (tipus/ordre), missing return statement.  
2. **¿Compila però no fa el que esperaves?** → Has cridat al mètode correcte (7)? Li passes els arguments en l'ordre que creus (2)?  
3. **¿Imprimeix alguna cosa rara?** → Traça la crida: qui imprimeix i qui torna? Estàs usant la còpia que arriba per paràmetre?

⚠️ **Advertència:** no pegues l'error en el buscador abans de llegir-lo sencer. El 95% dels errors d'esta unitat diuen en la primera línia **què** està mal i en la segona **on**.

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** quan tot compile i el resultat continue sense quadrar, imprimeix (o millor: torna) els valors a mig camí. Depurar és mirar, no endevinar.

**Exercici: el taller d'arregles**

Este mètode hauria de tornar el major de dos nombres, però té **2 errors** (un de compilació i un de lògica):

| public static int mayor(int a, int b) {   if (a \> b) {      return a   }   return 0;} |
| :---- |

**Quins són i com queden?**

**🔄 Solució**

1. **Compilació:** falta ; després de return a → return a;.  
2. **Lògica:** el segon camí torna 0 en lloc de b: quan a \<= b, el major és b.

**Versió correcta:**

| public static int mayor(int a, int b) {   if (a \> b) {      return a;   }   return b;} |
| :---- |

## **🎯 Mini-chequeig**

Posat a prova en 30 segons (les respostes estan amagades):

1. Quin error dona int r \= media(3, 4); si media és void i només imprimeix?  
2. Quins tres missatges busques primer en no compilar una crida?  
3. Per què l'error 7 (cridar al mètode equivocat) no el detecta el compilador?  
4. Quina paraula falta en void log(String s) { System.out.println(s) }?

**🔄 Respostes**

1. void cannot be converted to int: res de void pot guardar-se en una variable.  
2. cannot find symbol, wrong number of arguments, incompatible types (i missing return statement si el fall està en el cos).  
3. Perquè el nom i els arguments són correctes **sintàcticament**: només el programador sap que volies l'altre mètode.  
4. El ; després del println (i eixe error apareix en compilar la classe, no només en cridar).

## **✅ Resum en 3 frases**

1. Els errors de mètodes són **set famílies**: return, ordre/tipus d'arguments, nombre d'arguments, void-vs-retorn, static, puntuació de la crida i nom equivocat.  
2. Els sis primers els atrapa el compilador; el setè el detecta **el teu cervell** llegint noms en veu alta.  
3. Diagnosticar sempre en ordre: compila → missatge d'error → traça de la crida.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| missing return statement | Algun camí no torna el que la firma promet |
| wrong number of arguments | Arguments ≠ paràmetres |
| incompatible types | El tipus no encaixa (ordre inclòs) |
| static context | Cridar a algo de classe des de main (detalls en U10) |
| Error de lògica | Compila i executa, però ment |

# **7\. Divideix el problema** {#7.-divideix-el-problema}

## **📬 La idea en una frase**

Dividir és escriure un main que es llija com un resum en anglés clar ("llegir dades, calcular mitjana, mostrar informe") i amagar cada frase en un mètode amb el seu nom.

## **🎼 El director no toca els instruments**

Un bon main pareix això:

| public static void main(String\[\] args) {    double\[\] notas \= leerNotas();    double media \= calcularMedia(notas);    String informe \= formatearInforme(media);    System.out.println(informe);} |
| :---- |

Quatre línies, quatre verbs, zero aritmètica. Vols saber com es llegeixen les notes? Obres leerNotas(). Com es calcula la mitjana? calcularMedia(). Cada detall viu al seu lloc i main continua sent un **índex del programa**, no un full de receptes.

Si eixe mateix programa vivira tot en main, tindries 40 línies barrejant lectura, càlcul i format on cap comentari et salva. El director d'orquestra no toca els instruments: **coordina**.

## **🔪 Com trossegar: el mètode dels verbs**

Mira un main de taller i encén els verbs:

| public static void main(String\[\] args) {   *// 1\. llegir les notes del teclat → leerNotas()*   *// 2\. comprovar si hi ha alguna suspesa → tieneSuspensa(notas)*   *// 3\. calcular la mitjana → calcularMedia(notas)*   *// 4\. imprimir el resultat bonic → mostrarResultado(media, notas)*} |
| :---- |

Cada verb amb parèntesis en el comentari és **un candidat a mètode**. El patró es repeteix:

1. **Escriu el comentari-objectiu** (o llig-lo si ja està).  
2. **Crea el mètode** amb eixe nom, public static, paràmetres si necessita dades, retorn si torna alguna cosa.  
3. **Mou el codi** d'eixe pas al cos.  
4. **Deixa una crida** en main i **executa**: si feia el mateix que abans, has trossejat bé.  
5. Repeteix amb el següent verb. **Un mètode cada volta.**

💡 **Consell:** si necessites un comentari per a explicar un bloc de 5 línies, eixe bloc ja té nom: fes-lo mètode i que el nom parle per ell.

### **On està el límit?**

| Es queda en main | Va al seu mètode |
| ----- | ----- |
| La seqüència de passos | Un pas amb nom propi |
| Un if de dues línies que decideix flux | Un bloc que repeteixes o que "fa una cosa" |
| La crida final d'impressió | El compte, la lectura, la cerca, el format |

No hi ha llei universal de "més de N línies", sí una brúixola: **una responsabilitat per mètode**. calcularMediaYMostrarYGuardar són tres mètodes disfressats d'un.

## **🧪 Abans i després: l'informe de notes**

**Abans** (tot en main):

| public static void main(String\[\] args) {   Scanner teclado \= new Scanner(System.in);   double suma \= 0;   for (int i \= 0; i \< 5; i++) {      System.out.print("Nota " \+ (i \+ 1) \+ ": ");      suma \+= teclado.nextDouble();   }   double media \= suma / 5;   System.out.println("Mitjana: " \+ media);   if (media \>= 5) {      System.out.println("¡APROVAT\!");   } else {      System.out.println("Suspès. A per ell.");   }} |
| :---- |

**Després** (un resum i dos receptes):

| *public static void main(String\[\] args) {   double\[\] notas \= leerNotas(5);   double media \= calcularMedia(notas);   mostrarVeredicto(media);}static double\[\] leerNotas(int cantidad) { ... } // llegirstatic double calcularMedia(double\[\] notas) { ... } // calcularstatic void mostrarVeredicto(double media) { ... } // contar* |
| :---- |

Mateix programa, dos vides distintes: en la segona, demà afegixes el màxim sense tocar res més (bé, gairebé: leerNotas ja torna un array... que veus de veritat en la U06).

📝 **Nota:** l'ordre de declaració no importa (ho vas vore en el punt 2), així que main pot llegir-se amunt com un resum encara que els seus ajudants estiguen davall.

## **⭐ Sé el Código, my friend...**

🕶️ **Don Tip:** si dubtes entre trossejar o no, escriu la crida que **volgueres** tindre (int max \= encontrarMaximo(notas);) i després fes que existisca. El codi es dissenya cap avant, com es demana en un restaurant.

**Exercici: el verb amagat**

Quin mètode (nom i firma) treguries d'este main? Torna true si tots els nombres són positius:

| public static void main(String\[\] args) {   int\[\] datos \= { 3, 7, 2 };   boolean todoPositivo \= true;   for (int i \= 0; i \< datos.length; i++) {      if (datos\[i\] \<= 0) {         todoPositivo \= false;      }   }   System.out.println("¿Tot positiu? " \+ todoPositivo);} |
| :---- |

**🔄 Solució**

| public static boolean todosPositivos(int\[\] datos) {   for (int i \= 0; i \< datos.length; i++) {      if (datos\[i\] \<= 0) {         return false;      }   }   return true;} |
| :---- |

Verb: "tots positius" → nom todosPositivos. Necessita dades? Sí → int\[\] datos. Torna alguna cosa? Sí, un judici → boolean. main queda en: boolean ok \= todosPositivos(datos);. (Que el bucle use arrays no et distraga: la idea del trosseig és la mateixa en qualsevol terreny.)

## **🎯 Mini-chequeig**

Posat a prova en 30 segons (les respostes estan amagades):

1. Quines tres preguntes et fas en dissenyar un mètode? (pista: nom, entrades, eixides)  
2. Quin és l'ofici de main en un programa ben trossejat?  
3. Quina senyal diu "este bloc demana mètode"?  
4. Quants blocs trosseges d'una volta quan refactoritzes?

**🔄 Respostes**

1. Com es diu (quin verb fa)? Quines dades necessita (paràmetres)? Què torna (retorn o void)?  
2. Coordinar: llegir → calcular → mostrar, en crides llegibles.  
3. Necessitar un comentari per a explicar-lo, repetir-se en un altre lloc o contenir "una cosa amb nom".  
4. Un sol, executant després de cada extracció: si algo es trenca, saps què va ser.

## **✅ Resum en 3 frases**

1. Un main ben trossejat es llig com un **resum** de verbs; cada verb viu en un mètode amb una responsabilitat.  
2. El mètode dels verbs: **comentari → nom → firma → moure codi → cridar i provar**, un mètode cada volta.  
3. La brúixola no és la longitud, és la **responsabilitat**: si el nom del mètode necessita "i", són dos mètodes.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| Orquestració | main coordina; els mètodes treballen |
| Responsabilitat única | Un mètode, una cosa ben feta |
| Extraure mètode | Moure un bloc a un mètode nou |
| Refactoritzar | Reorganitzar sense canviar el que fa |
| Mètode helper | Ajudant menut al servei d'un altre pas |

# **8\. Repàs: Be the Code** {#8.-repàs:-be-the-code}

## **📬 La idea en una frase**

Este punt no té teoria nova: té un programa de 30 línies que has de trossejar amb les teues mans. Només demanes pistes quan t'atuesques de veritat.

El programa d'abans (tot en main) és el teu taller de hui. La teua missió: convertir-lo en una orquestra de mètodes sense canviar el que imprimeix. Si ho has fet a mà, domines la unitat sencera.

## **🛠️ El teu punt de partida**

| import java.util.Scanner;public class InformeNotas {   public static void main(String\[\] args) {      Scanner teclado \= new Scanner(System.in);      double suma \= 0;      boolean haySuspensa \= false;      for (int i \= 0; i \< 5; i++) {         System.out.print("Nota " \+ (i \+ 1) \+ ": ");         double nota \= teclado.nextDouble();         suma \+= nota;         if (nota \< 5) {            haySuspensa \= true;         }      }      double media \= suma / 5;      System.out.println("Mitjana: " \+ media);      if (haySuspensa) {         System.out.println("Hi ha suspesa: a per ella.");      } else if (media \>= 7) {         System.out.println("¡Qué nota\!");      } else {         System.out.println("Aprovat amb genolls.");      }   }} |
| :---- |

Abans d'escriure res, respon en paper (en serio, en paper):

1. Quants **verbs amb nom propi** veus? (pista: tres: llegir, calcular, mostrar)  
2. Quines dades necessita cadascun i **què torna** cadascun?  
3. Què queda en main després de trossejar?

## **🪜 Pas a pas (pistes que no regalen el final)**

1. Crea static double\[\] leerNotas(int cantidad) davall de main.  
2. Crea static double calcularMedia(double\[\] notas).  
3. Crea static boolean tieneSuspensa(double\[\] notas).  
4. Crea static void mostrarVeredicto(double media, boolean suspensa).  
5. Reescriu main com a resum: llegir → mitjana → suspesa → mostrar.

**🔄 Solució completa**

| import java.util.Scanner;public class InformeNotas {   public static void main(String\[\] args) {      double\[\] notas \= leerNotas(5);      double media \= calcularMedia(notas);      boolean suspensa \= tieneSuspensa(notas);      mostrarVeredicto(media, suspensa);   }   static double\[\] leerNotas(int cantidad) {      Scanner teclado \= new Scanner(System.in);      double\[\] notas \= new double\[cantidad\];      for (int i \= 0; i \< cantidad; i++) {         System.out.print("Nota " \+ (i \+ 1) \+ ": ");         notas\[i\] \= teclado.nextDouble();      }      return notas;   }   static double calcularMedia(double\[\] notas) {      double suma \= 0;      for (int i \= 0; i \< notas.length; i++) {         suma \+= notas\[i\];      }      return suma / notas.length;   }   static boolean tieneSuspensa(double\[\] notas) {      for (int i \= 0; i \< notas.length; i++) {         if (notas\[i\] \< 5) {            return true;         }      }      return false;   }   static void mostrarVeredicto(double media, boolean suspensa) {      System.out.println("Mitjana: " \+ media);      if (suspensa) {         System.out.println("Hi ha suspesa: a per ella.");      } else if (media \>= 7) {         System.out.println("¡Qué nota\!");      } else {         System.out.println("Aprovat amb genolls.");      }   }} |
| :---- |

⚠️ **Advertència:** l'eixida ha de ser **idèntica** abans i després. Si canvia, has mogut una línia de més: torne al pas anterior (refactoritzar és canviar la forma, mai el comportament).

## **🧪 El Lío: el refactor malograt**

El teu company va refactoritzar i ara això **no compila**:

| public class MalRefactor {   public static void main(String\[\] args) {      double m \= media(3, 4, 5);      System.out.println(m);   }   static void media(int a, int b, int c) {      double resultado \= (a \+ b \+ c) / 3.0;      System.out.println(resultado);   }} |
| :---- |

**Pistes (no mires la solució encara):**

1. Què vol fer main amb el resultat de media?  
2. Què diu la firma que torna...?  
3. Què passa amb el println de dins: és ofici de media o de qui crida?

**🔄 Solució**

main intenta guardar en double m el resultat d'un mètode void: void cannot be converted to double. Dos arregles possibles; el correcte és:

| static double media(int a, int b, int c) {   return (a \+ b \+ c) / 3.0;} |
| :---- |

i llevada el println de dins (o deixar-lo si media és de veritat "mostrar mitjana"... però llavors no s'anomenaria media). Calcula → torna; qui crida imprimeix.

## **🎯 Mini-chequeig**

Posat a prova en 30 segons (les respostes estan amagades):

1. Quines dues preguntes et fas de cada verb abans de crear el seu mètode? (entrades i eixides)  
2. Per què leerNotas torna double\[\] i no imprimeix les notes?  
3. Què ha de passar si trosseges bé i executes?  
4. Quina és la senyal que has trossejat malament?

**🔄 Respostes**

1. Quins **paràmetres** necessita? Quin **retorn** té (o és void)?  
2. Perquè main decidisca després: calcular mitjana, buscar suspeses… les dades viuen més enllà del llegir.  
3. L'eixida és idèntica al programa original.  
4. Va canviar el comportament, o main continua amb bucles dins (no l'has convertit en resum).

## **✅ Resum en 3 frases**

1. Trossejar \= **verb → mètode** amb firma clara, moure el codi i deixar una crida en main.  
2. El main final es llig com un resum: llegir → calcular → mostrar, sense un sol for.  
3. Refactoritzar **mai** canvia l'eixida: si canvia, es revertix el pas.

🐛 **Vocabulari ràpid**

| Terme | Idea general |
| ----- | ----- |
| Refactoritzar | Reorganitzar sense canviar el comportament |
| Extraure mètode | Sacar un bloc a la seua pròpia funció |
| Resum en main | Línies que es llegeixen com el pla del programa |
| Firma clara | Nom \+ paràmetres \+ retorn que s'entenen sols |
| Abans/després | Prova que la refactorització va neta |

# **9\. Repàs general** {#9.-repàs-general}

## **📬 La idea en una frase**

Este punt no ensenya res nou: destrossa l'après amb preguntes, errors aliens i un laboratori fins que ho tingues a les mans.

## **⭐ Sé el Código, my friend...**

**Pregunta 1 — la firma**

| public static double promedio(int a, int b, int c) {   return (a \+ b \+ c) / 3;} |
| :---- |

**Què li passa a este mètode?**

* (A) Res: compila i torna bé  
* (B) Compila, però torna un int amb la part decimal perduda  
* (C) No compila: double no pot rebre la suma de tres int

La **B**. (a \+ b \+ c) és int i / 3 també: divisió entera (7 en lloc de 7,33...). Java **no** canvia a double perquè la firma ho diga. Arregla: return (a \+ b \+ c) / 3.0;.

**Pregunta 2 — l'ordre**

| static void pintar(String texto, int veces) { ... }pintar(3, "OK"); |
| :---- |

**Què passa?**

* (A) Imprimeix OK tres voltes  
* (B) Imprimeix 3 tres voltes  
* (C) No compila: tipus al revés

La **C**. El primer paràmetre és String i arriba un int: incompatible types. Els arguments viatgen en el mateix ordre que els paràmetres, sense excepcions.

**Pregunta 3 — el pecat**

| static void doble(int n) {   System.out.println(n \* 2);}int r \= doble(5); |
| :---- |

Tria amb saviesa:

1) 10 — ¡correcte\! ... no: void no es guarda en res ✗  
2) **No compila** — main intenta guardar un void en un int ✓  
3) 0 — Java ompli amb zeros el que falta ✗ (això només passa en arrays)  
4) **Imprimeix 10 i r queda en 0** — sona lògic, però void no és un valor ✗

La **b**: la línia int r \= doble(5); dona incompatible types: void cannot be converted to int. El mètode void no produïx valor: si vols el doble en una variable, que el **torne** (static int doble(...) amb return n \* 2;) i el println el poses tu on faça falta.

## **🔥 Fireside Chat: void vs return**

*Dos veterans del recorregut discutixen junt a la màquina de cafè.*

**void:** \- Jo faig i m'assabente. Imprimir, guardar, borrar: efectes purs. El món em veu canviar i no em necessita tornar res.

**return:** \- I per això quan et necessiten per a **calcular**, es perden. Em guarden en variables, em comparen, em passen com a argument a altres deu mètodes. Són dades de veritat.

**void:** \- Els efectes també són dades... bé, efectes.

**return:** \- ¿I què passa quan un novell et usa a mi però et posa System.out.println dins? Resultat: ningú rep el valor, s'imprimeix en l'instant exacte en que a vegades **no toca**, i qui crida no pot fer res amb ell.

**void:** \- Això no és culpa meua, és culpa de barrejar els oficis.

**return:** \- Exacte. Calcules → tornes. Decideixes → imprimix. Si el teu mètode comença per calcular, obtener o es, vine a ma casa.

**void:** \- Tractat. Jo per a imprimir i guardar; tu per a tot el que un altre mètode vaja a necessitar. Que main siga l'únic que parle en veu alta.

La lliçó: **void per a efectes, return per a valors.** Qui calcula torna; qui decideix imprimeix.

## **🕵️ Qui soc?**

Endevina quin concepte de la unitat soc:

1. **Soc la variable que un mètode rep en ser cridat, declarada en la seua firma.**  
2. **Soc el valor que arriba en la crida, en lloc exacte on polses el gatell.**  
3. **Soc la regió on una variable existeix: de la firma a la clau de tancament.**  
4. **Soc el final del mètode: tanque l'execució i entregue el valor promés.**  
5. **Soc la firma completa: nom \+ tipus dels paràmetres, la meua targeta de visita.**  
6. **Soc un mètode que torna true o false: esPar, tieneSuspensa, todoPositivo.**

**🔄 Respostes**

1. **El paràmetre** — viu en la declaració i s'usa com a variable dins del mètode.  
2. **L'argument** — el paràmetre és la cadira; l'argument és qui se senta.  
3. **L'àmbit (scope)** — fora d'ell, cannot find symbol.  
4. **return** — i si algun camí d'una firma amb retorn no l'alcança: missing return statement.  
5. **La firma del mètode** — canvien els noms de variables, no la firma.  
6. **El predicat** — el patró boolean que decora tota la POO futura.

## **🤖 CONRAD VS EL MÓN: "El main que es va fer el llist"**

*CONRAD, el nostre compilador mala llet, ha trobat una nota en la safata d'errors.*

**CONRAD:** \- ¡UNA ALTRA VOLTA\! Un alumne em diu: *CONRAD, vull cridar al meu mètode des de main*. I jo: *¿i el static?* *Doncs... el vaig llevar, que em paregia repetir.* SENSE static NO HI HA main\! non-static method cannot be referenced from a static context. El main és estàtic de naixement; fins que no aprengues a crear objectes en futures unitats, tots els teus mètodes porten static. No és decoració, és l'entrada obligatòria.

*I el clàssic del retorn:* *el meu mètode calcula bé però em dona missing return statement.* ¿I els camins? *¿Camins?* És clar\! Si el if torna en una branca i l'else no, hi ha un sender que arriba al final amb la firma sense complir. Java no endevina la teua intenció: **tots els camins tanquen**.

*I el de la variable fantasma:* *en main em diu cannot find symbol: variable total... però la vaig declarar en sumar().* PERQUÈ ÉS DE sumar()\! Les locals moren amb el seu mètode. No hi ha ventanetes laterals entre cases: només arguments que entren i return que ix.

*I el que m'empipa:* criden saludar()... **sense static**... **sense ()**... des d'un altre mètode... ¡LLEGIU EL MISSATGE ENTER, QUE LA PRIMERA LÍNIA DÍA QUÈ I LA SEGONA ON\!

CONRAD afegix: si el teu error desapareix en canviar **una lletra**, era un typo; si desapareix en afegir (), era la crida; si desapareix en afegir static, era el context. El compilador et dona classes gratis: llig-les.

## **🎮 El joc de les decisions**

Tria la resposta correcta per a cada decisió (respostes al final):

1. Quina és la diferència real entre paràmetre i argument?  
   * a) Cap, són sinònims b) Declaració vs crida c) Un és de int i l'altre de String  
2. Què imprimeix System.out.println(truco(7)); amb truco del punt 4?  
   * a) 10 b) 14 c) 12  
3. Poden a() i b() tindre totes dues una variable x?  
   * a) No: xoca b) Sí, són cases distintes c) Només si són static  
4. Quin error dona int r \= suma(1, 2); si suma(int a, int b, int c)?  
   * a) wrong number of arguments b) Res, el tercer queda a 0 c) missing return statement  
5. Quan uses void?  
   * a) Quan no tornes res útil, només fas un efecte b) Quan no saps què tornar c) Quan hi ha un sol paràmetre  
6. Què fa return; dins d'un mètode int?  
   * a) Torna 0 b) No compila c) Torna null

**🔄 Solucions**

1. **b)** — paràmetre en la declaració, argument en la crida.  
2. **a)** — 10: cau en la branca x \> 5 i torna 7 \+ 3\.  
3. **b)** — cada mètode té el seu propi àmbit; dos x diferents.  
4. **a)** — la firma demana 3 arguments i n'arriben 2\.  
5. **a)** — void \= només efecte (imprimir, guardar); no hi ha valor que entregar.

## **🤔 Atreveix-te a pensar**

1. **Sense executar:** què imprimeix?

| public class Misterio {   static int f(int x) {      if (x \> 2) {         return x \+ 1;      }      return f(x \+ 1);   }   public static void main(String\[\] args) {      System.out.println(f(0));   }} |
| :---- |

**🔄 Resposta**

**4\.** Cadena de crides: f(0) → f(1) → f(2) → f(3) → 3 \> 2 és cert → 3 \+ 1 \= 4\. Fixa't en que 2 \> 2 és fals, així que continua encadenant. Compte: estàs mirant **recursió**, el plat fort de la U08.

2. Per què diem que main ha de llegir-se "com un resum" i no com una recepta?  
3. Si tots els teus mètodes imprimeixen, què li falta al teu programa per a ser reutilitzable?  
4. Se't ocurren un cas legítim en què un mètode void cride a un altre void i el programa complet tinga sentit sense un sol return amb valor?

## **💬 Preguntes d'entrevista de treball**

Preguntes reals que et farien per a programador Java junior.

1. **"Explíca'm, com si jo fora ta àvia, la diferència entre un paràmetre i un argument."**  
2. **"Escriu un mètode que torne true si tots els nombres d'una llista són positius. Per què boolean i no un println?"**  
3. **"Què és l'àmbit d'una variable i per què existeix?"**  
4. **"El teu mètode compila però el resultat no arriba a main. Per què pot ser?"**  
5. **"Quan faries un mètode void i quan amb retorn? Dona'm un exemple de cada un."**  
6. **"Refactoritza un main de 40 línies. Per on comences i com comproves que no l'has trencat?"**

## **🤷 No hi ha preguntes tontes**

❓ **¿Per què Java m'obliga a posar static si jo només vull cridar al meu mètode?**

Perquè main és estàtic: s'executa **sense** crear cap objecte. Un mètode no estàtic pertany a un objecte, i no hi ha objecte al qual pertànyer. De moment tots els teus mètodes són de classe (static); quan cregues el teu primer objecte en la U09 i veges static en detall en la U10, això farà *clic* i no tornaràs a dubtar.

❓ **Puc cridar a un mètode des d'un altre mètode que estiga damunt o baix?**

Sí, sense restriccions d'ordre: tots es coneixen dins d'una classe. main pot cridar a calcularMedia encara que estiga escrita 50 línies més avall.

❓ **Si passe x per paràmetre, per què el meu mètode no pot canviar el meu x?**

Perquè rep una **còpia** (per a tipus primitius). És un disseny deliberat: els mètodes no reescriven res de ningú d'amagades; si hi ha un resultat nou, el **tornen** amb return. Amb els arrays la cosa canvia (es passa la referència) i ho veuràs en la U06.

❓ **Un mètode pot cridar a si mateix?**

Pot, i se'n diu **recursió**. És potent i perillós: si no arriba mai al seu cas base, s'acaba la pila i explota. Toca en la U08, Algorítmica II, amb guants.


> [!TIP] Analogía de arranque: la biblioteca y el bibliotecario
> Piensa en una biblioteca sin catálogo ni estanterías (un almacén de cajas sueltas) y sin bibliotecario (nadie que sepa dónde está nada). El **SGD** son las estanterías, el catálogo y las normas de prestamo; el **Knowledge Manager** es el bibliotecario: sabe qué tiene valor, enseña a buscar y se asegura de que la gente devuelve lo prestado. Una organización solo funciona bien cuando tiene ambos.

# SGC + Knowledge Manager = Conocimiento que genera valor

**Tecnología y estrategia, un tándem clave para gestionar, aprovechar y compartir el conocimiento.**

Esta sesión responde a una pregunta molesta: *¿por qué organizations que invierten mucho en software siguen perdiendo información y repitiendo errores?* La respuesta casi nunca es la herramienta: es la falta de la otra mitad.

## 1. El problema: la información existe, el conocimiento no circula

Cualquier empresa ya «tiene» la información: está en correos, carpetas `Comunes`, discos externos y chats. El problema no es *tenerla*, es que:

*   nadie puede **encontrarla** cuando hace falta (búsqueda por humano, no por máquina),
*   nadie sabe **qué versión** es la buena (`final_v2_bueno_OK-ahora-si.docx`),
*   y lo que sabe el equipo **vive en cabezas** que pueden irse de vacaciones… o de la empresa.

```mermaid
flowchart LR
    A[El equipo trabaja] --> B[Documentos y experiencia]
    B --> C{¿Hay SGD + KM?}
    C -- No --> D[Silos: correos, discos, cabezas]
    D --> E[Duplicar trabajo · perder clientes · fallar auditorías]
    C -- Sí --> F[Ciclo de vida gestionado + cultura de compartir]
    F --> G[Aprende de su pasado · innova · escala]
```

> [!TIP] Batallita: la prueba de la factura
> En una PyME con 12 personas les pedí **la factura del proveedor de diciembre del año pasado**. Opciones reales: (A) 10 s buscándola, (B) 2 min navegando a la carpeta del proyecto, (C) email a contabilidad y esperar, (D) «estaba escaneada en un CD del despacho de Mercedes… que se jubiló». Si tu organización responde C o D, ya tienes el material de esta sesión.

## 2. SGD: la infraestructura tecnológica y normativa

El **Sistema de Gestión Documental** (SGD, también EDMS/ECM) es la infraestructura tecnológica y normativa para gestionar el **ciclo de vida de la información**: desde que un documento entra (escáner, correo, ERP) hasta que se destruye (o se retiene) según la ley.

```mermaid
flowchart LR
    A[Captura<br/>escáner · correo · ERP] --> B[Clasificación<br/>metadatos · etiquetas]
    B --> C[Almacenamiento versionado<br/>trazabilidad · permisos]
    C --> D[Consulta y uso<br/>búsqueda · compartición]
    D --> E[Vigilancia<br/>DLP · auditoría]
    E --> F[Retención / Destrucción<br/>RGPD · ISO 15489]
    F -. nueva versión entra por Captura .-> A
```

Las cinco funciones clave:

| # | Función | Qué garantiza |
| :-- | :--- | :--- |
| 1 | **Captura e ingesta** | Todo entra por el mismo canal (escáner, correo, ERPs, CRMs), nada por las bandas. |
| 2 | **Metadatos y clasificación** | Encontrar cualquier documento en segundos (autor, fecha, tipo, proyecto). |
| 3 | **Control de versiones y trazabilidad** | Quién cambió qué, cuándo y por qué: el historial nunca se pierde. |
| 4 | **Preservación y retención** | Qué se archiva, cuánto se conserva y cuándo se destruye (RGPD, ISO 15489). |
| 5 | **Seguridad** | Cifrado, permisos granulares, DLP: quién ve, edita, exporta o borra. |

::: details Batallita: el vertedero «Comunes»
En una PyME de 12 personas, el servidor compartido acabó en una sola carpeta `Comunes`: **40 GB sin estructura** y documentos tipo `presupuesto-FINAL_v3_bueno_ahora-si.docx`. Nadie sabía qué era lo vigente; se había pagado dos veces el mismo trabajo porque dos equipos lo prepararon en paralelo sin saberlo.

Lecciones:

1.  El vertedero no se limpia: **se coloniza** (se migra solo lo vivo, con fecha < 2 años; el resto se congela y se archiva).
2.  Se arregla con **reglas y un sprint pequeño** (Nextcloud + carpeta por proyecto + nomenclatura), no con heroísmo de tres semanas.
3.  El coste real no fue el desorden: fue el **trabajo duplicado**.
:::

::: details Batallita: la auditoría y el portátil del cajón
Llegó la auditoría de facturas, contratos y actas, y apareció una factura de **2012** en el escritorio de un portátil que estaba **en un cajón**: «así nadie la borra». La prudencia era real, pero la técnica era grave: un documento sin índice, sin copia y sin dueño no es un archivo, es una **anécdota** hasta que falla.

Lecciones:

1.  La seguridad por **ocultación** es la más caras: no se audita, no se respalda, no se transfiere.
2.  Las normativas (RGPD, ISO 15489) no llegaron a castigar: llegaron a **orientar la supervivencia** del negocio.
3.  Tras ese día, el SGD pasó de «deseable» a «sí o sí».
:::

## 3. Knowledge Manager: la visión estratégica, cultural y metodológica

El **Knowledge Manager (KM)** no es una herramienta ni un programa: es un **rol humano** con cuatro funciones concretas.

```mermaid
flowchart TB
    KM(("🧠<br/>KM")) --- F1["1 · Estrategia y IA<br/>¿qué, cómo y dónde?"]
    KM --- F2["2 · Captura del know-how<br/>de la cabeza al papel"]
    F2 --- F3["3 · Transformación cultural<br/>compartir = lo normal"]
    F3 --- F4["4 · Gobernanza<br/>calidad, vida útil y ROI"]
```

| # | Función | De qué se encarga |
| :-- | :--- | :--- |
| 1 | **Estrategia y Arquitectura de la Información** | Diseña **qué** conocimiento se captura, **cómo** se organiza y **dónde** vive (taxonomías, plantillas, cadena de custodia). |
| 2 | **Captura y Conversión del Conocimiento** | Saca el **know-how** de la cabeza de los veterans y lo convierte en base de conocimiento (guías, wiki, plantillas, post-mortems). |
| 3 | **Transformación Cultural y Adopción** | Cambia el hábito: compartir y colaborar pasa a ser **lo normal** (mentores, admisión, formación). |
| 4 | **Gobernanza y Mantenimiento** | Mide la **calidad**, la **vida útil** y el **ROI** de lo escrito; retira lo caducado antes de que engañe a nadie. |

::: details Batallita: el campeón silencioso
Un departamento técnico usaba una wiki de hace 3 años, pero el conocimiento real lo sostenía **una persona** («la que siempre está»). En vacaciones largas descubrieron quién era el campeón silencioso: **el otro KB** — la wiki no se había tocado en un año.

Lo arreglaron con un protocolo de captura: cada vez que alguien preguntaba a la experta, **la respuesta la escribía el preguntador en la wiki**. Y el KM se encargó de que se usara. Lecciones:

1.  El **tácito** no se archiva con copiar-pegar: se captura en el momento en que circula.
2.  El KM es la persona que **diseña el hábito** — «lo que aprendimos, a la wiki».
3.  En tu proyecto de aula: **documenta mientras aprendes**, no después.
:::

::: details Batallita: 40 notas трагmélicas y el grapho que nadie visitaba?
(esta la dejo para el aula: el intento fallido de KM en ingeniería) — bre lateral?
:::

## 4. La tabla de sinergia: dos mitades de algo grande

| Dimensión | Sistema de Gestión Documental (SGD) | Knowledge Manager (KM) |
| :--- | :--- | :--- |
| **Naturaleza** | Herramienta tecnológica / Proceso estructurado | Rol humano / Estratégico y cultural |
| **Foco principal** | Conocimiento explícito (archivos, facturas, actas, contratos) | Conocimiento tácito + explícito (experiencia, buenas prácticas) |
| **Objetivo** | Control, seguridad, trazabilidad y recuperabilidad | Transferencia de aprendizaje, innovación y eficiencia operativa |
| **Pregunta clave** | ¿Dónde está el documento y quién tiene permiso para verlo? | ¿Qué aprendizaje obtuvimos y cómo evitamos reinventar la rueda? |

> [!TIP] Analogía: el almacén y el encargado de compras
> El SGD es el **almacén** (estanterías, cajas rotuladas, registro de entradas/salidas). El KM es el **encargado** que sabe qué merece la pena comprar, qué caduca, qué se comparte entre semana. Un almacén sin encargado llena la caja; un encargado sin almacén es un inconformista con móvil. Para inventario de valor, se necesitan los dos.

::: warning Elije la lección del impacto de la ausencia
*   **Sin un SGD**: el KM carece de la **plataforma centralizada** donde consolidar la información: el conocimiento tácito queda disperso en correo, chats y cabezas.
*   **Sin un KM**: el SGD degenera en **vertedero digital** de archivos desordenados y poco usados; nadie encuentra nada y la experiencia de los equipos no se comparte.
:::

## 5. Software recomendado (casi todo libre, casi todo en Docker)

::: tip ¿Primera elección rápida?
*   **Papel → PDF buscable**, PYME con zumbido papelero: **Paperless-ngx**.
*   **Colaboración + control**: **Nextcloud** (archivos, versiones, calendario) + **DokuWiki** (wiki ligera sin BD).
*   **Equipo pequeño que vive de notas**: **Obsidian** (gratis, propietaria, local) — el conocimiento individual.
*   **Organización con requisitos legales**: **Mayan EDMS** (Apache-2.0) o **OpenKM**.
:::

SGD/EDMS (la parte tecnológica):

| Herramienta | Qué es | Licencia | Cuándo elegirlo |
| :--- | :--- | :--- | :--- |
| **Paperless-ngx** | Digitaliza, etiqueta (OCR) y archiva: «todo papel → PDF buscable» | GPL-3.0 | El punto de partida ideal en PYME y en clase (Docker sencillo). |
| **Mayan EDMS** | EDMS completo: workflows, versiones, permisos por grupo, custodia | Apache-2.0 | Cuando quieres procesos documentales formales. |
| **OpenKM** | EDMS clásico con expedientes y firmas | GPL / comercial | Despachos y organismos con requisitos de expediente. |
| **Nextcloud** | La nube de casa: archivos, versiones, Calendar, Text | AGPL-3.0 | El escalón de entrada en cualquier aula o PYME. |
| **SharePoint** | El EDMS corporativo de facto (Microsoft 365) | comercial | Cuando ya vives dentro del ecosistema M365 y Teams. |

KM (la parte humana, con soporte tecnológico):

| Herramienta | Qué es | Licencia | Cuándo elegirlo |
| :--- | :--- | :--- | :--- |
| **MediaWiki** | El motor de Wikipedia, probado a escala planetaria | GPL-2.0+ | Base de conocimiento colectiva, grande y navegable. |
| **DokuWiki** | Wiki ligera sin base de datos, fácil de respaldar | GPL-2.0 | Equipos pequeños y servidores humildes (o escolares). |
| **XWiki** | Wiki «empresarial» con aplicaciones, flujos y macros | LGPL-2.1 | Cuando la wiki necesita procesos y permisos por equipo. |
| **Obsidian** | Bóveda local de notas con enlaces y grafo | propietaria (personal gratis) | El conocimiento individual; la sincronía de equipo es de pago. |
| **Notion** | Todo-en-uno SaaS (wiki + bases de datos + tareas) | freemium | Equipos que prefieren interfaces cuidadas a auto-organización. |
| **Discourse** | Foro moderno con reputación y etiquetas | GPL-2.0 | Cuando el conocimiento viene de *conversaciones* (soporte, comunidad). |

> [!WARNING] Ojo con el «gratis» de los SaaS
> Obsidian es propietaria (pero tus notas son ficheros Markdown cómodamente tuyos). Notion es freemium: tu conocimiento vive en su nube y a cambio. Con las wiki y EDMS de licencia libre, **tu contenido vive en tu servidor** — y eso, para una PyME, es una garantía de supervivencia.

## 6. Trucos de oro (aprendidos en el campo)

1.  **Nomenclatura `AAAA-MM-DD_proyecto_asunto`**: el nombre ordena por fecha y tema sin disciplina ninguna; es el hack más rentable.
2.  **Un documento, un dueño**: quien lo cambia deja rastro; si nadie lo reclama, es un huérfano y se va al cementerio.
3.  **Taxonomía ≤ 10 ramas**: la clasificación de 40 categorías nunca se mantiene; 10 sí.
4.  **Regla de los 2 minutos**: si archivarlo cuesta menos de 2 min, se archiva **ahora** (no inbox del viernes).
5.  **Busca antes de crear**: «¿ya lo escribimos?» es la pregunta más rentable del equipo.
6.  **Revisión trimestral**: lo no tocado en 6 meses, con etiqueta de caducidad visible.
7.  **La wiki gana su vida**: se mide en *búsquedas resueltas por semana* — si esto crece, la adopción crece.
8.  **IA para lo aburrido (2026)**: etiquetar y resumir documentos in-bulk está bien resuelto; para **decidir**, en el loop humano.
9.  **El chat no es un archivo**: lo importante del chat se mueve pendiente → wiki/SGD con enlace cruzado.
10. **Empieza chico, y semanal**: una carpeta por proyecto + naming + wiki (`Idea→Sección`) renta más que un gran proyecto de conocimiento inaugurado y muerto.

::: details Truco para el aula: tu PI como mini-SGC
Aplica el tándem a tu proyecto de ciclo: **Nextcloud** como SGD casero (dossier, capturas, facturas del proyecto… con estructura `AAAA-MM-DD_proyecto_…`), **DokuWiki/MediaWiki** como KM (decisiones, errores y soluciones, glosario), y **una revisión trimestral en el calendario**. Entregable visible desde la semana 1, y encima ensayas las dos caras del tándem.
:::

## 7. Checklist final

*   ¿Es conocimiento **explícito**? → SGD. ¿Es **tácito**? → KM (y lo ideal es el tándem).
*   ¿Hay **normativa** que obligue (RGPD, ISO 15489, auditoría)? → el EDMS es *sí o sí*.
*   ¿Qué **tamaño**? persona → Obsidian; equipo → Nextcloud + wiki; organización → EDMS completo.
*   ¿Puedes **mantenerlo** (Docker, una BD, backups)? Si no, «potente» no basta.
*   ¿Qué **licencia**? Libre (GPL/MIT/Apache) para el PI; cuidado con lo propietario y el SaaS.
*   ¿Quién es el **campeón**? Sin una persona responsable de revisión y adopción, en 6 meses la herramienta muere.

**En resumen:** el SGD da **orden y seguridad**; el KM da **propósito y cultura**. Juntos, multiplican el valor: una organización más eficiente, innovadora y preparada para el futuro.

---
layout: cover
---

# Unidad 08 — Enrutamiento<br>Bloque 2: rutas estáticas y por defecto

## 1r CFGS ASIR · Planificación y Administración de Redes

---
class: sparse-slide
---

## Rutas estáticas: la idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Una <strong>ruta estática</strong> es una fila que escribes <strong>a mano</strong> en la tabla: «la red X se alcanza pasando por Y». La escribes tú con <code>ip route</code> porque la subred <strong>no toca</strong> al router y este no la descubre solo.
  </div>
</div>

En el bloque 1 vimos que las C y L nacen solas, pero solo cubren lo conectado. El resto del mundo — otra planta, la sede remota, Internet — entra en la tabla con una <strong>S</strong> escrita por el administrador. En este bloque: la sintaxis, las dos formas de apuntar la salida, la ruta por defecto y el clásico error del ping que «ida sí, vuelta no».

---
---

## El escenario: dos routers, cuatro redes

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud08-par-rutas-estaticas.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---

## Sin rutas estáticas: el ping muere en casa

<div class="step"><div class="step-number">1</div><div class="step-content">El PC de la red 192.168.10.0/24 hace ping a un host de 192.168.30.0/24. Su destino está <strong>en otra subred</strong>: envía el paquete a su gateway, R1.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content">R1 consulta su tabla: la 30.0 <strong>no está conectada</strong> y no hay ruta por defecto. Sin coordenadas: <strong>descarta el paquete</strong> y devuelve un ICMP inalcanzable hacia el emisor.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content">R2, eso sí, responde perfectamente los pings a <em>su</em> red 30.0: el problema no es el enlace — es que <strong>nadie le contó a R1 el camino</strong>.</div></div>

<div class="warning" style="margin-top:0.5rem;">
  El router no «probaría suerte» ni preguntaría: con la tabla como única estrella, <strong>sin ruta, no hay envío</strong>. La solución es escribir el camino a mano.
</div>

---
---

## La sintaxis: ip route y sus tres formas

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">R1(config)# ip route</div>
  </div>
  <pre><code>R1(config)# ip route 192.168.30.0 255.255.255.0 10.0.0.2
                                    ↑ destino  ↑ máscara  ↑ next-hop

R1(config)# ip route 192.168.30.0 255.255.255.0 GigabitEthernet0/1
                                                 ↑ interfaz de salida

R1(config)# ip route 192.168.30.0 255.255.255.0 GigabitEthernet0/1 10.0.0.2
                                                 ↑ ambas: la forma más robusta</code></pre>
</div>

<div class="info" style="margin-top:0.4rem;">
  Se escribe <strong>en el origen</strong>, no en la red de destino: la ruta se crea en el router que <em>necesita saber</em>, con la tabla de <em>ese</em> router.
</div>

---
---

## Next-hop o interfaz: cuándo usar cada una

<div class="comparison-grid">
  <div class="comparison-item good">
    <strong>Next-hop (IP del otro router)</strong>
    <p>En enlaces <strong>Ethernet</strong> (giga, trunks…): el router debe saber <strong>qué MAC ARPea</strong> al vecino. Es la forma recomendada en aula.</p>
  </div>
  <div class="comparison-item">
    <strong>Interfaz de salida</strong>
    <p>Natural en enlaces <strong>punto a punto</strong> (serial): ahí no hay tabla ARP — el paquete sale directo por el cable y el vecino lo pilla solo.</p>
  </div>
</div>

<div class="info" style="margin-top:0.6rem;">
  Ambas: la combinación <strong>más robusta</strong> — el router sabe qué interfaz usar <em>y</em> a qué vecino ARPear. En Ethernet pura con solo interfaz, el router tendría que ARPear «a la red entera»: se adivina mal y falla.
</div>

---
class: compact-slide
---

## La ruta de vuelta: la mitad olvidada

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">Ida y vuelta: cuatro rutas para dos redes</div>
  </div>
  <pre><code>R1(config)# ip route 192.168.30.0 255.255.255.0 10.0.0.2
R2(config)# ip route 192.168.10.0 255.255.255.0 10.0.0.1
R2(config)# ip route 192.168.20.0 255.255.255.0 10.0.0.1</code></pre>
</div>

<div class="warning" style="margin-top:0.6rem;">
  Si solo configuras la ida: el ping <strong>sale del PC</strong>, R1 lo entrega a 30.7… pero la respuesta del host 30.7 muere en R2 (o incluso en el propio host, sin ruta hacia 10.0). <strong>Ida sí, vuelta no</strong>. Enrutamiento sin retorno no es enrutamiento.
</div>

<div class="info" style="margin-top:0.5rem;">
  Regla de auditoría: <strong>por cada red remota que apuntes en R1, apunta también las redes de la otra punta en R2</strong>. La tabla no se carga de la mitad del trabajo: <strong>todo cruce necesita sus dos direcciones explicadas</strong>.
</div>

---
---

## La ruta por defecto: para todo lo demás

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">R2 → hacia el ISP (203.0.113.0/30)</div>
  </div>
  <pre><code>R2(config)# ip route 0.0.0.0 0.0.0.0 203.0.113.2
R2(config)# ip route 192.168.0.0 255.255.0.0 10.0.0.1</code></pre>
</div>

<div class="step"><div class="step-number">1</div><div class="step-content"><code>0.0.0.0/0</code> — cero bits de máscara — casa con <strong>todo</strong>. Es el «si no es nada de lo que conozco, ve por aquí».</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content">Aparece como <strong>S\*</strong> en <code>show ip route</code> y solo se consulta <strong>tras agotar</strong> la doble ronda de C y S: es la última apuesta.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content">Es la típica del <strong>router de acceso</strong>: la única flecha hacia el ISP; las redes internas, escritas a mano — y todo lo que no sea de la casa sale por la S*.</div></div>

<div class="info" style="margin-top:0.4rem;">
  En tu PC funciona igual: la «puerta de enlace predeterminada» que llega por DHCP es la ruta por defecto de tu red doméstica.
</div>

---
class: compact-slide
---

## Rutas flotantes: el plan B con [AD]

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">Backup: la ruta solo salta si la principal muere</div>
  </div>
  <pre><code>R1(config)# ip route 192.168.30.0 255.255.255.0 10.0.0.2
R1(config)# ip route 192.168.30.0 255.255.255.0 192.168.20.2 90
                                                             ↑
                                                        AD mayor (90)</code></pre>
</div>

| Ruta | Aparece como | ¿Se usa? |
|---|---|---|
| [<strong>1</strong>/0] | S activa | Sí — menor AD = <strong>la creíble</strong> en la tabla |
| [<strong>90</strong>/0] | «floating» | <strong>Dormida</strong>: solo despierta si muere la de AD 1 |

<div class="info" style="margin-top:0.4rem;">
  La <strong>distancia administrativa</strong> desempata entre <em>fuentes</em> (manual vs OSPF vs EIGRP…): cuanto <strong>más baja</strong>, más fe se la arroja. El AD por defecto de la estática es 1.
</div>

---
---

## Mini-chequeo: estáticas y por defecto

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde rápido:
</div>

1. ¿Dónde se escribe una ruta estática: en el router destino o en el del emisor?
2. Ping PC → 30.7: sale la ida, muere la vuelta. ¿Qué falta y en qué lado?
3. ¿En qué orden se consultan C, S y S\*? ¿Qué significa el \*?

<div class="answer-card" style="margin-top:0.7rem;">
  <strong>1.</strong> En el router del emisor: la ruta entra en la tabla de quien <em>necesita saber</em> cómo llegar.· <strong>2.</strong> Falta la ruta de vuelta en el lado remoto: R2 no sabe cómo regresar a 192.168.10.0/24. · <strong>3.</strong> C primero (conectada), luego S (estáticas), y S\* al final: la por defecto solo si nada encaja; el \* marca el «escape definitivo».
</div>

---
---

## Logros y siguientes pasos

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 <strong>Albañil de rutas</strong> | De dos routers aislados a ping bidireccional solo con <code>ip route</code> |
| 🏅 <strong>Abogado del vecino</strong> | Elegir con criterio next-hop o interfaz según el tipo de enlace |
| 🏅 <strong>Flashero de default</strong> | S\* hacia el ISP y pings a 203.0.113.2 que cruzan la LAN |
| 🏅 <strong>Previsor del apagón</strong> | Ruta flotante que activa un plan B AD mayor |

<div class="info" style="margin-top:0.6rem;">
  <strong>Bloque 3:</strong> diagnóstico y cierre — qué hacer cuando la ruta está escrita <em>mal</em> o el ping se corta a mitad de camino. Para practicar: boletines U08 en Packet Tracer.
</div>

---
layout: closing
---

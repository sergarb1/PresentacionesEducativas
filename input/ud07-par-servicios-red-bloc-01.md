---
layout: cover
---

# Unidad 07 — Servicios de red<br>Bloque 1: DHCP, el conserje de las IPs

## 1r CFGS ASIR · Planificación y Administración de Redes

---
class: sparse-slide
---

## DHCP: la idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Un <strong>servidor DHCP</strong> es el conserje de la red: cuando un equipo se conecta <strong>le alquila una IP</strong> (y máscara, gateway y DNS) <strong>por un tiempo pactado</strong> — el <em>lease</em>. Todo por UDP, puertos <strong>67</strong> (servidor) y <strong>68</strong> (cliente).
  </div>
</div>

Cuando alguien visita un hotel no negocia el número de habitación: le asignan una llave con un plazo de devolución. Igual un PC al arrancar: pregunta, el conserje le presta la 192.168.10.50 hasta mañana y deja la reserva anotada en su libro. En este bloque: cómo es el intercambio completo, cómo configura el router como servidor y qué pasa cuando el conserje no está.

---
class: compact-slide
---

## La mochila que entrega el conserje

No solo la IP: una respuesta DHCP lleva <strong>toda la config de red del cliente</strong>:

| Dato que entrega | Ejemplo | Qué hace con ello |
|---|---|---|
| <strong>IP alquilada</strong> | `192.168.10.50` | Su identidad en la red |
| <strong>Máscara</strong> | `255.255.255.0` | El tamaño de su subred |
| <strong>Router/puerta</strong> | `192.168.10.1` | Por dónde salir a otros mundos |
| <strong>DNS</strong> | `1.1.1.1, 192.168.10.2` | A quién preguntar los nombres |
| <strong>Dominio</strong> | `ceedcv.local` | Para nombres cortos («web1») |
| <strong>Lease</strong> | 24 h (o 8 días…) | El plazo del alquiler |
| <strong>NTP / TFTP / VoIP…</strong> | opciones extra | El reloj, el arranque PXE, el teléfono |

<div class="info" style="margin-top:0.4rem;padding:0.8rem 1rem;font-size:0.95rem;line-height:1.4;">
  Beneficiario silencioso: el <strong>Técnico</strong>. Cambiar el DNS de la red es tocar <strong>una línea del conserje</strong>, no repasar 200 PCs uno por uno.
</div>

---
class: compact-slide
---

## El intercambio completo: DORA

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud07-par-dhcp-dora.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---

## Todo empieza por broadcast

<div class="step"><div class="step-number">1</div><div class="step-content">El cliente aún <strong>no tiene IP</strong>: no puede hablar «por teléfono» con nadie. <strong>Descubre gritando</strong> a la IP <code>255.255.255.255</code> y a la MAC <code>FF:FF:FF:FF:FF:FF</code>.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content">Los <strong>pasos 1 (Discover) y 3 (Request) van por broadcast</strong>; los pasos 2 y 4 (Offer y Ack) llegan <strong>en unicast</strong>, a la MAC del cliente.</div></div>

<div class="two-cols">
  <div class="left">
    <div class="info">
      <p><strong>Los números del intercambio</strong></p>
      <p>UDP <strong>67</strong> escucha el servidor; UDP <strong>68</strong> escucha el cliente. Si un firewall bloquea uno de los dos, el alquiler no se cierra jamás.</p>
    </div>
  </div>
  <div class="right">
    <div class="info">
      <p><strong>Y al final, un ARP gratis</strong></p>
      <p>Tras el Ack, el cliente asegura su IP con un <strong>ARP gratuito</strong>: pregunta «¿quién tiene esta IP?» y si alguien responde, <strong>está duplicada</strong> y declina el alquiler.</p>
    </div>
  </div>
</div>

---

## El Offer deja una reserva mesa por mesa

Mientras el lease dura, el servidor <strong>mantiene el asiento reservado</strong>: en su libro (binding table) anota qué dirección asignó a qué MAC.

| MAC del cliente | IP asignada | Expira | Estado |
|---|---|---|---|
| `00:1A:2B` | `192.168.10.50` | +24 h | <strong>Reservada (Offer)</strong> |
| `00:4F:CA` | `192.168.10.51` | +23 h 55 m | Lease activo |
| `00:DE:AD` | — | — | APIPA: sin oferta |

<div class="warning" style="margin-top:0.5rem;">
  Si <strong>varios</strong> conserjes gritan su Offer, el cliente <strong>elige el primero en llegar</strong> y lo confirma por broadcast en el paso 3 — los demás servidores lo oyen y <strong>retiran su reserva</strong>: esa IP ya salió del mercado.
</div>

---
class: sparse-slide
---

## El alquiler no se acaba sin avisar

<div class="step"><div class="step-number">50%</div><div class="step-content"><strong>T1: renovación</strong> a mitad del lease. El cliente pregunta <strong>por unicast</strong> a su conserje: «renueva la 192.168.10.50».</div></div>
<div class="step"><div class="step-number">87%</div><div class="step-content"><strong>T2: <em>rebinding</em></strong>, si el conserje no contesta. Toca gritar de nuevo: <strong>broadcast</strong> a cualquier servidor DHCP disponible.</div></div>
<div class="step"><div class="step-number">100%</div><div class="step-content"><strong>Expire</strong>: suelta la IP y <strong>vuelve a arrancar el ciclo enseguida</strong> (Discover → Offer → …), porque ya no tiene dirección y no le queda nada que renovar.</div></div>

<div class="info" style="margin-top:0.6rem;">
  Un lease <strong>corto</strong> (horas) recicla direcciones rápido — módulos efímeros, invitados. Uno <strong>largo</strong> (días) para empresas: estabilidad y menos tráfico de renovación.
</div>

---

## Sin conserje: la crisis del APIPA

El cliente <strong>se auto-asigna</strong> una dirección del rango <code>169.254.0.0/16</code> (link-local, RFC 3927): comprueba con ARP que está libre y se apaña con hablar solo dentro de su cable.

<div class="warning" style="margin-top:0.6rem;">
  Síntoma inconfundible: PCs que <strong>se ven entre sí</strong> pero no salen a Internet ni alcanzan el gateway. En <code>ipconfig</code>, IP <code>169.254.x.x</code>. Causas: servidor caído, <strong>puerto UDP 67 filtrado</strong>, un puerto access en la VLAN equivocada… o el pool agotado.
</div>

<div class="info" style="margin-top:0.5rem;">
  No todo es drama: <strong>APIPA está pensado</strong> (RFC 3927) para redes improvisadas de dos PCs con un cable. Pero en una red de verdad es señal <strong>roja</strong> de infraestructura rota.
</div>

---

## DHCP frente a IP estática: cuándo cada una

<div class="comparison-grid">
  <div class="comparison-item good">
    <strong>DHCP ✅</strong>
    <p>PCs, portátiles, móviles, cámaras, invitados: <strong>todo lo que no da soporte a otros</strong> y puede cambiar de enchufe sin culpa.</p>
  </div>
  <div class="comparison-item bad">
    <strong>Estática a mano ❌</strong>
    <p>Servidores, routers, impresoras compartidas, DNS… <strong>cualquier equipo al que se le apunta por nombre o IP</strong>: si cambia su IP, «la red se rompe» para todos.</p>
  </div>
</div>

<div class="info" style="margin-top:0.6rem;">
  Y el compromiso profesional: <strong>reservas DHCP</strong> — la impresora recibe siempre la misma IP a mano del conserje, pero sigue <strong>siendo adminsitrada por él</strong>.
</div>

---

## DHCP en el router Cisco: un pool por VLAN

El router del aula puede hacer de conserje. Un <strong>pool por subred</strong>:

```
Router(config)# ip dhcp pool VLAN10
Router(dhcp-config)# network 192.168.10.0 255.255.255.0
Router(dhcp-config)# default-router 192.168.10.1
Router(dhcp-config)# dns-server 1.1.1.1
Router(dhcp-config)# domain-name ceedcv.local
```

<div class="info" style="margin-top:0.5rem;">
  El propio <code>network</code> decide la subred atendida: PCs en la 192.168.20.0 «caen» al pool de la 20 sin configurar nada más — un pool por subred y el router escucha en cada gateway.
</div>

---

## No regalar lo que está ocupado: exclusiones y reservas

Lo primero del pool: <strong>sacar del reparto</strong> lo que ya es fijo (gateways, servidores, impresoras):

```
Router(config)# ip dhcp excluded-address 192.168.10.1 192.168.10.9
```

Y reservar por MAC cuando hace falta una mano fija:

```
Router(config)# ip dhcp pool IMPRESORA-VENTAS
Router(dhcp-config)# host 192.168.10.40 255.255.255.0
Router(dhcp-config)# client-identifier 01bc.aea9.1673.d0
Router(dhcp-config)# default-router 192.168.10.1
```

<div class="warning" style="margin-top:0.5rem;">
  <strong>client-identifier</strong> ≠ MAC: lleva delante <code>01</code> (tipo de hardware). La MAC `bcaea91673d0` de una impresora escribe <strong><code>01</code>bc.aea9.1673.d0</strong> — el tropezón clásico del examen.
</div>

---

## Para otra VLAN: el relay que ya conoces

De la UD06 lo tenías a la vista; ahora sabes <strong>por qué existe</strong>: el Discover es un broadcast, y las radios (los routers) <strong>no permiten broadcasts</strong> entre VLANs.

<div class="step"><div class="step-number">1</div><div class="step-content">Switch/router de la VLAN 10 recibe el Discover broadcast y <strong>lo marca de relay</strong> con <code>ip helper-address 192.168.30.2</code>.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content">Se lo envía <strong>en unicast</strong> al servidor (en la VLAN 30), diciendo «vengo de la VLAN 10» (giaddr).</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content">El servidor responde al relay con un lease <strong>de la pool correcta</strong>, y el relay lo entrega al cliente en su VLAN.</div></div>

<div class="info" style="margin-top:0.5rem;">
  <code>giaddr</code> es la clave: por la IP de entrada el conserje decide <strong>qué pool tocar</strong>. Sin relay, cada VLAN necesitaría su propio servidor.
</div>

---

## Laboratorio: conserje central, clientes en dos VLANs

<div class="two-cols" style="font-size:0.95rem;line-height:1.4;">
  <div class="left">
    <div class="info" style="padding:0.85rem 1rem;">
      <p><strong>Montaje</strong> (Packet Tracer, 45 min): router 2911 + switch 2960 + 4 PCs en las VLANs 10 (Ventas) y 20 (RRHH) de la UD06; el router, con pool para ambas.</p>
      <p>A. Cada PC toma su IP del pool correcto (aquí no hace falta relay: el router vive en ambas VLANs).<br>
      B. Exclusiones: verificar que <code>.1-.9</code> nunca salen.<br>
      C. Reserva fija para una «impresora» y comprobar que sí salta al arrancar.</p>
    </div>
  </div>
  <div class="right">
    <div class="info" style="height:100%;padding:0.85rem 1rem;display:flex;flex-direction:column;justify-content:center;">
      <p><strong>Qué verificar</strong></p>
      <p><code>show ip dhcp binding</code>: asignaciones MAC ↔ IP y su plazo.<br>
      <code>show ip dhcp pool</code>: uso y cabida de cada pool.<br>
      Cliente: <code>ipconfig /all</code> tras <code>/release</code> y <code>/renew</code>; con un lease de 2 h verás la renovación en vida.</p>
    </div>
  </div>
</div>

---
class: compact-slide
---

## El kit de verificación de DHCP

| Comando | Dónde | Qué te dice |
|---|---|---|
| `show ip dhcp binding` | Router/cliente | Los leases en vigor: MAC, IP, expiración |
| `show ip dhcp pool` | Router | Uso del pool por subred |
| `ipconfig /all` | Cliente Windows | IP recibida, gateway, DNS, lease |
| `ipconfig /release` + `/renew` | Cliente | Repite DORA completo a mano |
| `ipconfig /showclassid` | Cliente | (avanzado) clases DHCP para perfil por equipo |

<div class="info" style="margin-top:0.5rem;">
  Ruta de diagnóstico: <strong>① del cliente</strong> (¿169.254.x.x? → no llega servidor) → <strong>② relay/pool</strong> → <strong>③ server</strong>. El 80% de las «no tengo Internet» arranca por una IP del grupo 169.254.
</div>

---

## Mini-chequeo: DORA y leases

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde rápido:
</div>

1. ¿Cuáles son los 4 pasos de DORA y cuáles van por broadcast?
2. ¿Qué dos roles tienen los puertos UDP 67 y 68?
3. Un PC enseña `169.254.12.8`: ¿qué diagnóstico haces y qué mides primero?

<div class="answer-card" style="margin-top:0.7rem;">
  <strong>1.</strong> Discover y Request van broadcast; Offer y Ack responden a cliente «conociendo su MAC» (o relay). · <strong>2.</strong> UDP 67 escucha el servidor, UDP 68 el cliente. · <strong>3.</strong> APIPA: no hubo oferta. Primero comprueba el pool y el estado del servidor, y en el aula el más común es el <em>puerto trunk/access en la VLAN equivocada</em>.
</div>

---
layout: closing
---

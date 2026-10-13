---
layout: cover
---

# Unidad 06 — Trunking y enrutamiento inter-VLAN<br>Bloque 2: inter-VLAN routing, switch capa 3, VTP y DTP

## 1r CFGS ASIR · Planificación y Administración de Redes

---
class: sparse-slide
---

## Inter-VLAN routing
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Las VLANs aíslan en <strong>capa 2</strong>, pero los departamentos necesitan hablarse. La solución es el <strong>inter-VLAN routing</strong>: un router (o switch de capa 3) enruta el tráfico entre VLANs en <strong>capa 3</strong>.
  </div>
</div>

En la unidad de switching aislaste el tráfico: Ventas no ve a RRHH. Pero una oficina real necesita que RRHH consulte el servidor de Ventas: <strong>aislar sin un plan de interconexión es dispararse en el pie</strong>.

---

## ¿Por qué las VLANs «no se ven»?

<div class="two-cols">
  <div class="left">
    <div class="info">
      <p><strong>La regla de oro:</strong> el switch no reenvía tramas entre VLANs. Decide solo mirando MACs (capa 2), y la MAC no tiene concepto de «VLAN 10 quiere hablar con la 20».</p>
      <p>Cada VLAN es un <strong>dominio de broadcast cerrado</strong>. Cruzar entre ellas exige un dispositivo de <strong>capa 3</strong> que reencapsule con la nueva etiqueta.</p>
    </div>
  </div>
  <div class="right">
    <div class="diagram-frame diagram-medium" style="height:280px;">
      <Excalidraw drawFilePath="/diagrams/ud06-par-router-on-a-stick.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
    </div>
  </div>
</div>

---

## El viaje de una trama entre VLANs

<div class="step"><div class="step-number">1</div><div class="step-content">El PC de Ventas quiere hablar con RRHH: tráfico «hacia fuera» → lo manda a su <strong>gateway</strong> (la IP del router en esa VLAN).</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content">El router recibe la trama etiquetada VLAN 10, la <strong>reencapsula</strong> como VLAN 20 y la reenvía por el mismo cable.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content">El switch la entrega al PC de RRHH de la VLAN 20.</div></div>

<div class="info" style="margin-top:0.6rem;">
  <strong>Analogía del pasaporte:</strong> salir de tu VLAN es cruzar una frontera — necesitas una aduana (el router) que te selle el nuevo pasaporte (la etiqueta VLAN 20).
</div>

---

## Router-on-a-stick: un cable, muchos sombreros

<div class="two-cols">
  <div class="left">
    <p>Una sola <strong>interfaz física</strong> del router atiende todas las VLANs: sobre <code>Fa0/0</code> montas una <strong>subinterfaz lógica por VLAN</strong> (`.10`, `.20`, `.30`…), cada una con su etiqueta 802.1Q y su IP de gateway.</p>
    <div class="success">
      ✅ Mínimo hardware, fácil de entender, perfecto para redes pequeñas.
    </div>
    <div class="warning" style="margin-top:0.5rem;">
      ⚠️ Una sola interfaz es un <strong>cuello de botella</strong>: todo el tráfico inter-VLAN atraviesa el mismo cable.
    </div>
  </div>
  <div class="right">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">configuración inter-VLAN</div>
      </div>
      <pre><code>Router(config)# interface fa0/0
Router(config-if)# no shutdown
Router(config)# interface fa0/0.10
Router(config-subif)# encapsulation dot1Q 10
Router(config-subif)# ip address 192.168.10.1 255.255.255.0
Router(config)# interface fa0/0.20
Router(config-subif)# encapsulation dot1Q 20
Router(config-subif)# ip address 192.168.20.1 255.255.255.0</code></pre>
    </div>
  </div>
</div>

---
class: compact-slide
---

## Las trampas del router-on-a-stick

| Comando | Qué hace |
|---|---|
| `interface fa0/0.10` | Crea la subinterfaz lógica `.10` |
| `encapsulation dot1Q 10` | Etiqueta la subinterfaz con la VLAN 10 |
| `ip address 192.168.10.1 255.255.255.0` | El gateway de esa VLAN |
| `no shutdown` | Activa la <strong>interfaz física</strong> (¡no vale solo con las subinterfaces!) |

<div class="warning" style="margin-top:0.5rem;">
  Dos fallos que hunden medio examen: olvidar <code>no shutdown</code> en la física (las subinterfaces «mueren» con ella) y poner la IP <strong>antes</strong> de `encapsulation dot1Q` (el orden manda: primero la etiqueta, luego la IP).
</div>

---

## El gateway de cada PC apunta a su subinterfaz

| VLAN | Subred | Gateway (router) |
|---|---|---|
| 10 Ventas | 192.168.10.0/24 | 192.168.10.1 (`Fa0/0.10`) |
| 20 RRHH | 192.168.20.0/24 | 192.168.20.1 (`Fa0/0.20`) |
| 30 IT | 192.168.30.0/24 | 192.168.30.1 (`Fa0/0.30`) |

<div class="warning" style="margin-top:0.5rem;">
  El gateway y la etiqueta dot1Q deben <strong>corresponder exactamente</strong>: si el PC apunta a 192.168.10.1 pero no existe la subinterfaz `.10` con `encapsulation dot1Q 10`, el tráfico sale de la VLAN y no encuentra puerta.
</div>

---

## Verificación del router

```
Router# show ip interface brief
Router# show ip route
```

| Comando | Qué te dice |
|---|---|
| `show ip interface brief` | Subinterfaces UP/UP y sus IPs |
| `show ip route` | Las rutas conectadas: 192.168.10.0/24, 20.0/24, 30.0/24 |

<span>&nbsp;</span>

<div class="info" style="margin-top:0.4rem;">
  Prueba final: `ping` desde un PC de VLAN 10 a otro de VLAN 20 — debe responder <strong>atravesando el router</strong>.
</div>

---

## Switch capa 3: el propio switch se convierte en router

<div class="key-idea">
  <div class="key-idea-text">
    Un <strong>switch de capa 3</strong> (multicapa) enruta entre VLANs <strong>sin router externo</strong>: crea una interfaz virtual por VLAN —la <strong>SVI</strong>— y activa `ip routing`. Routing a <strong>velocidad de hardware</strong>.
  </div>
</div>

| Función | Qué hace | Cómo |
|---|---|---|
| <strong>Switch (capa 2)</strong> | Reenvía tramas entre puertos de la misma VLAN | Hardware de forwarding por MAC |
| <strong>Router (capa 3)</strong> | Reenvía paquetes entre VLANs | Hardware de forwarding por IP (ASIC) |

---
class: compact-slide
---

## SVI y configuración del switch capa 3

```
Switch(config)# ip routing
Switch(config)# interface vlan 10
Switch(config-if)# ip address 192.168.10.1 255.255.255.0
Switch(config-if)# no shutdown
Switch(config)# interface vlan 20
Switch(config-if)# ip address 192.168.20.1 255.255.255.0
Switch(config-if)# no shutdown
```

| Comando | Efecto |
|---|---|
| `ip routing` | Enciende el motor de enrutamiento del switch |
| `interface vlan 10` | Crea el SVI de la VLAN 10 (su «gateway interno») |
| `no shutdown` | Levanta el SVI (necesita al menos un puerto UP de esa VLAN) |

<div class="warning" style="margin-top:0.5rem;">
  <strong>La trampa clásica:</strong> sin <code>ip routing</code>, los SVIs están up/up pero <strong>NO enrutan</strong> entre VLANs. Es el fallo n.º 1 del laboratorio.
</div>

---

## Router-on-a-stick vs switch capa 3

| Aspecto | Router-on-a-stick | Switch capa 3 (SVIs) |
|---|---|---|
| Hardware extra | Un router | <strong>Ninguno</strong> (el switch lo hace) |
| Rendimiento | Limitado por la interfaz única | <strong>Routing en hardware</strong>, sin cuello |
| N.º de VLANs | 2–6 con comodidad | Decenas o cientos |
| Ideal para | Oficinas pequeñas, labs | <strong>Campus y core de red</strong> |

<div class="info" style="margin-top:0.6rem;">
  <strong>Resuma CONRAD:</strong> ¿oficina de 15 personas? Router-on-a-stick. ¿Campus con mil usuarios? Switch capa 3 en el core — 4 VLANs generando 120 Mbps por una interfaz de 100 Mbps se ahoga.
</div>

---

## Bonus: el SVI de gestión

El SVI de una VLAN de gestión es donde pones la <strong>IP del switch</strong> para administrarlo (SSH, monitorización):

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">SVI de gestión</div>
      </div>
      <pre><code>Switch(config)# interface vlan 999
Switch(config-if)# ip address 10.0.99.2 255.255.255.0
Switch(config-if)# no shutdown</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">solo switches capa 2</div>
      </div>
      <pre><code>Switch(config)# ip default-gateway 10.0.99.1</code></pre>
    </div>
    <div class="info" style="margin-top:0.4rem;">
      Un switch capa 3 rutea por sus rutas conectadas: no necesita default-gateway.
    </div>
  </div>
</div>

<span>&nbsp;</span>

<div class="info" style="margin-top:0.3rem;">
  Además, un switch capa 3 acepta <strong>rutas estáticas y dinámicas</strong> hacia otros routers: por eso han jubilado al router en muchas redes de distribución.
</div>

---

## VTP: el repartidor (peligroso) de VLANs

<div class="key-idea">
  <div class="key-idea-text">
    <strong>VTP</strong> propaga la base de datos de VLANs entre switches automáticamente y <strong>DTP</strong> negocia si un puerto es trunk o access. Ambos prometen comodidad… y ambos son puertas a desastres.
  </div>
</div>

| Modo VTP | ¿Crea/modifica VLANs? | ¿Recibe anuncios? | ¿Propaga? |
|---|---|---|---|
| <strong>Server</strong> | ✅ Sí | Sí | Sí |
| <strong>Client</strong> | ❌ (solo copia) | Sí | Sí (reenvía) |
| <strong>Transparent</strong> | ✅ (locales) | No (los ignora) | Los deja pasar |

---
class: compact-slide
---

## El revision number: la bomba de relojería

<div class="step"><div class="step-number">1</div><div class="step-content">Cada switch VTP lleva un <strong>revision number</strong> que sube con cada cambio de su base de datos.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content">La regla implacable: <strong>el switch con el número más alto impone su base de datos</strong> a toda la red.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content">Un switch «usado» con revisión 500 y base <strong>vacía</strong>, conectado por un trunk… borra las VLANs de <strong>toda la red</strong> en segundos.</div></div>

<div class="warning" style="margin-top:0.6rem;">
  <strong>Recomendación de la industria: no usar VTP.</strong> Alternativas: `vtp mode transparent`, o VTPv3 en <em>mode off</em> (no procesa ni propaga nada). Antes de enchufar cualquier switch: `show vtp status` y, si viene de segunda mano, `delete flash:vlan.dat`.
</div>

---

## DTP: el negociador de trunks

| Modo de puerto | ¿Negocia con DTP? | ¿Puede volverse trunk? |
|---|---|---|
| `switchport mode access` | No | No |
| `switchport mode dynamic desirable` | Sí (propone) | Sí, de forma activa |
| `switchport mode dynamic auto` | Sí (acepta) | Sí, si el otro propone |
| `switchport nonegotiate` | No (nunca) | Solo si se declara a mano |

<div class="warning" style="margin-top:0.5rem;">
  <strong>El riesgo:</strong> un portátil malintencionado en un puerto `dynamic desirable` puede <strong>negociar un trunk</strong> y oler el tráfico de todas las VLANs (el vector del <em>VLAN hopping</em>, que veremos en el bloque 3).
</div>

---

## Neutralizar DTP en una línea

```
Switch(config-if)# switchport mode access
Switch(config-if)# switchport nonegotiate
```

<span>&nbsp;</span>

<div class="success" style="margin-top:0.4rem;">
  <strong>Regla de oro operativa:</strong> `vtp mode transparent` + `switchport nonegotiate` en los trunks + `switchport mode access` en los puertos de usuario. Cero protocolos negociadores, cero sorpresas.
</div>

---

## Mini-chequeo: inter-VLAN, L3 y automatismos

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde rápido:
</div>

1. ¿Por qué un switch normal no reenvía tráfico entre dos VLANs?
2. ¿Qué dos líneas son imprescindibles para rutear con un switch capa 3?
3. ¿Por qué un switch «usado» con revision number alto puede arrasar la red?

<div class="answer-card" style="margin-top:0.7rem;">
  <strong>1.</strong> Trabaja en capa 2 mirando MACs; cruzar VLANs exige capa 3 que reencapsule. · <strong>2.</strong> `ip routing` + un `interface vlan X` con su IP por VLAN. · <strong>3.</strong> VTP impone la base del switch con mayor revisión: la suya (vacía) borra las VLANs de todos.
</div>

---
layout: closing
---

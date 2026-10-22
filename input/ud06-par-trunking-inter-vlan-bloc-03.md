---
layout: cover
---

# Unidad 06 — Trunking y enrutamiento inter-VLAN<br>Bloque 3

## 1r CFGS ASIR · Planificación y Administración de Redes

---
class: sparse-slide
---

## Seguridad en VLANs
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Las VLANs separan el tráfico por diseño, pero un atacante puede <strong>saltar de VLAN en VLAN</strong> si le dejas negociar trunks o etiquetar tramas. La defensa: <strong>VACL y PVLAN</strong>, más un <strong>hardening básico</strong> del switch.
  </div>
</div>

El <em>VLAN hopping</em> es real y aparece en cualquier pentest de red interna. Un administrador decente lo previene.

---

## VACL: el filtro que vive en el switch

<div class="two-cols">
  <div class="left">
    <div class="comparison-grid">
      <div class="comparison-item">
        <strong>ACL de router</strong>
        <p>Filtra en <strong>capa 3</strong>, entre subredes, cuando el tráfico <em>ya llega</em> al router.</p>
      </div>
      <div class="comparison-item">
        <strong>VACL</strong>
        <p>Filtra <strong>dentro de la propia VLAN</strong>, en el switch: bloquea hosts de la misma VLAN que el router <strong>nunca verá</strong>.</p>
      </div>
    </div>
  </div>
  <div class="right">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">VACL que bloquea</div>
      </div>
      <pre><code>Switch(config)# vlan access-map BLOQUEA 10
Switch(config-access-map)# match ip address 102
Switch(config-access-map)# action drop
Switch(config)# vlan filter BLOQUEA vlan-list 10</code></pre>
    </div>
    <div class="info" style="margin-top:0.4rem;">
      `vlan access-map` crea reglas <strong>secuenciales</strong> (se prueban en orden); `vlan filter` las aplica a una VLAN.
    </div>
  </div>
</div>

---

## PVLAN: aislar puertos dentro de la VLAN

Las <strong>Private VLAN</strong> dividen una VLAN en subgrupos de puertos para que <strong>no todos los miembros se vean entre sí</strong>. Es la joya de los entornos ISP y DMZ: cada cliente ve solo su servidor, no los vecinos.

| Tipo de puerto PVLAN | Qué puede hacer |
|---|---|
| <strong>Promiscuous</strong> | Habla con todos (normalmente el gateway o el router) |
| <strong>Isolated</strong> | Solo habla con el promiscuous (nada con otros isolated) |
| <strong>Community</strong> | Habla con su comunidad y con el promiscuous |

<div class="info" style="margin-top:0.6rem;">
  Analogía: los <em>isolated</em> son celdas que solo hablan con el bibliotecario; los <em>community</em>, aulas que se hablan entre sí sin tratar con otras aulas.
</div>

---

## VLAN hopping: cómo salta el atacante

| Vector | Cómo funciona | Defensa |
|---|---|---|
| <strong>Trunk negociado (DTP)</strong> | El atacante pide trunk por DTP y recibe todas las VLANs | `switchport mode access` + `nonegotiate`; `shutdown` en libres |
| <strong>Double tagging</strong> | Trama con <strong>dos etiquetas</strong>: el primer switch la desetiqueta (¿native?) y el segundo lee la etiqueta interior: VLAN objetivo | Native VLAN cambiada y <strong>sin datos en la native</strong> |

<div class="step"><div class="step-number">1</div><div class="step-content">El atacante (VLAN nativa) envía una trama con dos etiquetas: «native» por fuera y «VLAN 20» por dentro.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content">El primer switch quita la primera etiqueta y reenvía por el trunk… con la etiqueta de la VLAN 20 <strong>intacta</strong>.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content">El segundo switch la lee como tráfico legítimo de VLAN 20 y la entrega al objetivo.</div></div>

---
class: compact-slide
---

## Checklist de hardening de VLANs (9 pasos)

| # | Medida | Comando |
|---|---|---|
| 1 | Puertos de usuario <strong>access + sin DTP</strong> | `switchport mode access` + `nonegotiate` |
| 2 | Puertos libres <strong>apagados</strong> | `interface range fa0/1-12` → `shutdown` |
| 3 | Native VLAN a un número <strong>alto</strong> | `switchport trunk native vlan 99` |
| 4 | <strong>Nunca VLAN 1</strong> para datos | `switchport access vlan 10` |
| 5 | Limitar VLANs del trunk | `switchport trunk allowed vlan 10,20,30` |
| 6 | <strong>VACL</strong> para tráfico sensible | `vlan access-map` + `vlan filter` |
| 7 | <strong>PVLAN</strong> en hoteles/campus/ISP | `private-vlan` |
| 8 | VTP apagado (o v3 <em>off</em>) | `vtp mode transparent` / `off` |
| 9 | VLAN de <strong>gestión dedicada</strong> | `interface vlan 999` + IP + default-gateway |

<div class="info" style="margin-top:0.4rem;">
  «El mejor firewall de VLANs es configurar bien el switch»: la mayoría de los ataques mueren con access + nonegotiate + native cambiada + VTP apagado.
</div>

---

## Mini-chequeo: seguridad

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde rápido:
</div>

1. ¿Qué filtra una VACL que una ACL de router no puede?
2. En una PVLAN, ¿con quién habla un puerto <em>isolated</em>? ¿Y un <em>community</em>?
3. Double tagging en dos líneas: ¿ataque y mitigación?

<div class="answer-card" style="margin-top:0.7rem;">
  <strong>1.</strong> Tráfico <em>dentro</em> de la misma VLAN, que no pasa por el router. · <strong>2.</strong> Isolated: solo con el promiscuous; community: con su comunidad y el promiscuous. · <strong>3.</strong> Dos etiquetas: la exterior se descarta como native y la interior pasa por legítima; se mitiga cambiando la native y sin datos en ella.
</div>

---

## DHCP por VLAN: un VLAN = una subred = un pool

<div class="key-idea">
  <div class="key-idea-text">
    Cada VLAN es una <strong>subred distinta</strong> con su propio dominio de broadcast: cada una necesita su <strong>propio pool DHCP</strong>.
  </div>
</div>

El baile DORA ya lo conoces de la unidad de direccionamiento IP. La diferencia es el escenario: los PCs de otras VLANs lanzan un DISCOVER que es <strong>broadcast</strong>… y el broadcast no cruza un router.

---

## DORA en 30 segundos: el reparto paso a paso

| # | Mensaje | Quién | Qué pasa | ¿Broadcast? |
|---|---|---|---|---|
| 1 | <strong>DISCOVER</strong> | Cliente | «¿Hay algún DHCP por aquí? Necesito una IP» | <strong>Sí</strong> (toda la VLAN lo ve) |
| 2 | <strong>OFFER</strong> | Servidor | Propone una IP libre de su pool: lease, máscara, gateway, DNS | Sí |
| 3 | <strong>REQUEST</strong> | Cliente | «Me quedo con esa oferta» (acepta la primera que llegó) | Sí |
| 4 | <strong>ACK</strong> | Servidor | Concede la IP y la arrienda por el tiempo del lease | Sí |

<div class="info" style="margin-top:0.6rem;">
  Los cuatro mensajes viven <strong>dentro de una misma VLAN</strong> (son broadcast). Por eso cada VLAN necesita su pool… y por eso, si el servidor DHCP vive en otra VLAN, hace falta un <em>relay</em> — lo vemos en un rato.
</div>

---

## Los pools: tres líneas por VLAN

```
Router(config)# ip dhcp excluded-address 192.168.10.1 192.168.10.10
Router(config)# ip dhcp pool VENTAS
Router(dhcp-config)# network 192.168.10.0 255.255.255.0
Router(dhcp-config)# default-router 192.168.10.1
Router(dhcp-config)# dns-server 8.8.8.8 1.1.1.1
```

| Comando | Qué aporta |
|---|---|
| `network 192.168.10.0/24` | Debe coincidir <strong>exactamente</strong> con la subred de esa VLAN |
| `default-router 192.168.10.1` | La IP de la subinterfaz/SVI de esa VLAN |
| `ip dhcp excluded-address` | Aparta gateways y servidores del reparto |

---

## ¿Cómo sabe el router qué pool usar?

<div class="step"><div class="step-number">1</div><div class="step-content">El DISCOVER del PC de Ventas es broadcast para los PCs, pero entra al router <strong>por una puerta concreta</strong>: la subinterfaz <code>fa0/0.10</code> (o la SVI <code>vlan 10</code>).</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content">El router elige el pool cuya <code>network</code> coincide con la subred de <strong>esa puerta</strong>: 192.168.10.0/24 → pool VENTAS.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content">La OFFER sale por <strong>la misma puerta</strong>, con una IP del rango del pool, la máscara y el <code>default-router</code> (192.168.10.1) como gateway.</div></div>

<div class="warning" style="margin-top:0.6rem;">
  Piénsalo al revés: si la petición entra por la puerta de la VLAN 10 pero el pool dice <code>network 192.168.20.0</code>, ofrecería IP de la 20 «por la ventana» de la 10 — un disparate que desde el PC no puedes arreglar.
</div>

---
class: compact-slide
---

## El error clásico: pool copiado y network olvidada

<div class="warning">
  Si el pool VENTAS reparte <code>192.168.20.x</code> en la VLAN 10: los PCs reciben IP de la subred equivocada, su gateway no está en esa subnet y <strong>no salen ni a la puerta</strong>.
</div>

<div class="success" style="margin-top:0.6rem;">
  Regla de oro: <strong>subred del pool = subred de la VLAN = rango del excluded-address</strong>. Las tres, la misma.
</div>

<div class="info" style="margin-top:0.6rem;">
  En un switch capa 3 el proceso es idéntico: mismo `ip dhcp pool`, misma `network`, y el `default-router` apunta a la <strong>SVI</strong> correspondiente.
</div>

---

## DHCP relay: cuando el servidor vive en otra VLAN

<div class="two-cols">
  <div class="left">
    <div class="info">
      <p>Si el servidor DHCP está en la VLAN 30 y un PC de la VLAN 10 grita su DISCOVER, ese broadcast <strong>se queda en la VLAN 10</strong>: el router no reenvía broadcasts.</p>
      <p>El PC acaba en <strong>APIPA</strong> (169.254.x.x).</p>
    </div>
    <div class="success" style="margin-top:0.5rem;">
      <strong>El conserje:</strong> el relay es el administrador que oye el grito del pasillo de tu VLAN, cruza el edificio y se lo transmite al servidor por el pasillo de atrás — en <strong>unicast</strong>.
    </div>
  </div>
  <div class="right">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">ip helper-address</div>
      </div>
      <pre><code>Router(config)# interface fa0/0.10
Router(config-subif)# ip helper-address 192.168.30.10</code></pre>
    </div>
    <div class="info" style="margin-top:0.4rem;">
      Una línea por interfaz/subinterfaz/SVI desde la que quieras alcanzar el servidor.
    </div>
  </div>
</div>

---

## Verificación de DHCP

| Comando | Qué te dice |
|---|---|
| `show ip dhcp binding` | Qué IPs ha repartido y a qué MAC |
| `show ip dhcp pool` | IPs usadas/libres y config del pool |
| `ipconfig /all` (en el PC) | Que IP, máscara y gateway son de <strong>su</strong> subred |

<div class="warning" style="margin-top:0.6rem;">
  ¿Sale <code>169.254.x.x</code> (APIPA)? Revisa la cadena: ① ¿existe el pool con `network` correcto? ② ¿la interfaz del router de esa VLAN está UP/UP? ③ ¿el PC está en la VLAN correcta? ④ ¿el servidor está en otra VLAN sin `ip helper-address`?
</div>

---

## Cierre: sé el paquete

> Eres un paquete de la VLAN 20 (RRHH) que necesita imprimir en la impresora de la VLAN 30.

<div class="step"><div class="step-number">1</div><div class="step-content">Salgo del portátil: mi destino está en otra subred → voy a mi <strong>gateway</strong> (la SVI de la VLAN 20).</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content">Llego por el trunk etiquetado VLAN 20; la SVI mira sus rutas: 192.168.30.0/24 está <strong>conectada</strong>, por la SVI de la VLAN 30.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content"><strong>Reencapsulado</strong> con nueva MAC y misma IP destino, bajo por el trunk y llego a la impresora.</div></div>

<div class="info" style="margin-top:0.6rem;">
  <strong>Moraleja:</strong> cruzar VLANs exige <strong>capa 3</strong> — subinterfaces (router-on-a-stick) o SVIs (switch L3). El trunk lleva las etiquetas; el enrutamiento es la frontera con su aduana.
</div>

---
class: compact-slide
---

## ¿Quién soy? (4 adivinanzas)

1. Transporto tramas de todas las VLANs por un solo cable y me presento con `encapsulation dot1Q`.
2. Soy la VLAN que viaja <strong>sin etiqueta</strong> en un trunk… y cámbiame en ambos extremos.
3. Soy una interfaz virtual del switch: tengo IP, actúo de gateway y ruto como un router.
4. Me llamo <strong>subinterfaz</strong> y soy el truco del router para varias VLANs por un único cable.

<div class="answer-card" style="margin-top:0.7rem;">
  1. El trunk (802.1Q) · 2. La native VLAN · 3. La SVI (`interface vlan X`) · 4. Router-on-a-stick (`.10`, `.20`… con dot1Q)
</div>

---
layout: closing
---

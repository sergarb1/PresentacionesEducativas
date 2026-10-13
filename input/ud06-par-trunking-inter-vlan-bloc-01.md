---
layout: cover
---

# Unidad 06 — Trunking y enrutamiento inter-VLAN<br>Bloque 1: trunks y 802.1Q

## 1r CFGS ASIR · Planificación y Administración de Redes

---
class: sparse-slide
---

## Trunks y 802.1Q
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Un <strong>trunk</strong> es un enlace que transporta tráfico de <strong>múltiples VLANs</strong>; el estándar <strong>802.1Q</strong> inserta <strong>4 bytes</strong> de etiqueta en cada trama para que el switch de destino sepa a qué VLAN pertenece.
  </div>
</div>

Sin trunks, cada VLAN necesitaría su propio cable entre switches: con diez VLANs, diez cables. Con un trunk, un único enlace las lleva todas: cada trama viaja etiquetada («soy de la VLAN 10») y el otro extremo la entrega al puerto correcto.

---
class: compact-slide
---

## Sin trunk, cada VLAN es un cable

<div class="two-cols">
  <div class="left">
    <div class="comparison-grid">
      <div class="comparison-item bad">
        <strong>Sin trunk ❌</strong>
        <p>Un cable dedicado <strong>por cada VLAN</strong> entre switches. 10 VLANs = 10 enlaces: hardware multiplicado y puertos acabados.</p>
      </div>
      <div class="comparison-item good">
        <strong>Con trunk ✅</strong>
        <p>Un único cable transporta <strong>todas las VLANs permitidas</strong>. El switch destino lee la etiqueta y entrega cada trama en su VLAN.</p>
      </div>
    </div>
  </div>
  <div class="right">
    <div class="diagram-frame diagram-medium" style="height:250px;">
      <Excalidraw drawFilePath="/diagrams/ud06-par-trunk-8021q.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
    </div>
    <div class="info" style="margin-top:0.4rem;">
      Todas las VLANs etiquetadas cruzan el trunk; <strong>solo la native viaja sin etiqueta</strong>.
    </div>
  </div>
</div>

---

## La trama 802.1Q: 4 bytes en el sitio justo

El switch inserta la etiqueta entre la MAC origen y el EtherType; luego <strong>recalcula el FCS</strong> (el checksum de cola) porque la trama ha cambiado.

| Campo | Tamaño | Valor | Qué hace |
|---|---|---|---|
| <strong>TPID</strong> | 2 bytes | `0x8100` | Marca que la trama está etiquetada 802.1Q |
| <strong>PRI</strong> | 3 bits | 0–7 | Prioridad QoS (voz suele llevar 5) |
| <strong>CFI/DEI</strong> | 1 bit | 0 | Formato canónico (casi siempre 0 en Ethernet) |
| <strong>VLAN ID</strong> | 12 bits | 1–4094 | Identifica la VLAN de la trama |

<div class="info" style="margin-top:0.5rem;">
  El VLAN ID de 12 bits permite <strong>4096</strong> IDs, pero 0 y 4095 están reservados: máximo usable <strong>4094 VLANs</strong> — y los switches baratos soportan muchas menos.
</div>

---

## Trunk vs access: dos papeles muy distintos

| Característica | Puerto access | Puerto trunk |
|---|---|---|
| ¿Cuántas VLANs? | <strong>Una</strong> (la de su departamento) | <strong>Todas las permitidas</strong> |
| Etiquetado | Sin etiqueta (el switch la pone al entrar) | Todas etiquetadas, salvo native |
| ¿Dónde va? | A PCs, impresoras, servidores | Entre switches, o switch ↔ router |
| Qué aporta | Simplicidad al usuario | El «transporte» de la red |

<div class="warning" style="margin-top:0.5rem;">
  El PC no sabe nada de VLANs: el switch pone la etiqueta cuando el tráfico <strong>entra por su puerto</strong>. Al PC le da igual: ve una IP y un gateway normales.
</div>

---

## Configurar un trunk en Cisco IOS

En el switch, el puerto que mira al otro extremo:

```
Switch1(config)# interface fa0/24
Switch1(config-if)# switchport mode trunk
Switch1(config-if)# switchport trunk native vlan 99
Switch1(config-if)# switchport trunk allowed vlan 10,20,30
```

| Comando | Efecto |
|---|---|
| `switchport mode trunk` | Fuerza trunk (sin negociar) |
| `switchport trunk native vlan 99` | Cambia la native VLAN (¡no dejarla en 1!) |
| `switchport trunk allowed vlan 10,20,30` | Limita qué VLANs cruzan el trunk |

---
class: compact-slide
---

## La native VLAN: la que viaja sin etiqueta

| Característica | Valor típico |
|---|---|
| VLAN por defecto | VLAN 1 |
| ¿Se etiqueta? | <strong>No</strong> (las demás sí) |
| ¿Debe coincidir en ambos extremos? | <strong>Sí, obligatorio</strong> |
| Recomendado | Un número alto y dedicado (99 o 999), nunca VLAN 1 |

Sirve para tráfico de <strong>control</strong> (CDP, VTP, DTP) y para compatibilidad con equipo antiguo que no entiende 802.1Q.

<div class="warning" style="margin-top:0.6rem;">
  `allowed vlan` es una <strong>lista blanca</strong>: si creas la VLAN 40 y no la añades a `allowed`, no cruzará el trunk. Y `allowed 10,20` en un extremo con `10,20,30` en el otro = la 30 de un lado no viaja jamás.
</div>

---

## El fallo clásico: native VLAN distinta en cada extremo

<div class="step"><div class="step-number">1</div><div class="step-content">A manda una trama de control <strong>sin etiqueta</strong> pensando que va a la VLAN 99.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content">B la recibe sin etiqueta… y como <strong>su</strong> native es la 1, la interpreta como VLAN 1.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content">El tráfico de la 99 de A y el de la 1 de B <strong>se mezclan</strong>: conectividad rara y puerta a ataques de doble etiquetado.</div></div>

<div class="warning" style="margin-top:0.6rem;">
  Síntoma: el switch ladra por el log <em>«Native VLAN mismatch discovered on Fa0/24»</em> y el DHCP/ARP «va y viene a ratos». Solución: la <strong>misma</strong> native en ambos extremos.
</div>

---

## Verificación rápida de trunks

| Comando | Qué te dice |
|---|---|
| `show interfaces trunk` | Trunks activos, native VLAN, VLANs permitidas, mismatch |
| `show vlan brief` | Qué puertos están en cada VLAN (access) |
| `show running-config interface fa0/24` | La config exacta de un puerto |

<div class="info" style="margin-top:0.6rem;">
  `show interfaces trunk` es el pescaíto: en una sola pantalla ves <em>allowed</em>, <em>native</em> y hay discordancia entre extremos.
</div>

---

## Mini-chequeo: 802.1Q y trunks

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde rápido:
</div>

1. ¿Cuántos bytes añade 802.1Q y qué campos transporta la etiqueta?
2. ¿Qué diferencia hay entre un puerto access y un trunk?
3. Native VLAN 99 en un extremo y 1 en el otro: ¿qué ocurre y qué comando lo detecta?

<div class="answer-card" style="margin-top:0.7rem;">
  <strong>1.</strong> 4 bytes: TPID (0x8100) + PRI (3 bits) + CFI (1 bit) + VLAN ID (12 bits). · <strong>2.</strong> Access = una VLAN, sin etiquetar; trunk = varias VLANs, todas etiquetadas salvo native. · <strong>3.</strong> «Native VLAN mismatch»: las tramas sin etiqueta caen en la VLAN equivocada; se ve con `show interfaces trunk` y se arregla declarando la misma native en ambos extremos.
</div>

---

## El escenario departamental de esta unidad

<div class="two-cols">
  <div class="left">
    <div class="step"><div class="step-number">1</div><div class="step-content"><strong>Dos switches</strong> (Switch1 y Switch2) unidos por trunk Fa0/24.</div></div>
    <div class="step"><div class="step-number">2</div><div class="step-content"><strong>Router-on-a-stick</strong> colgado de Switch1 por Fa0/23 (trunk también).</div></div>
    <div class="step"><div class="step-number">3</div><div class="step-content"><strong>Cuatro PCs</strong>: Ventas (VLAN 10) y RRHH (VLAN 20), en ambos switches.</div></div>
  </div>
  <div class="right">
    <div class="info" style="height:100%;display:flex;flex-direction:column;justify-content:center;">
      <p><strong>Objetivo</strong></p>
      <p>Que un PC de la VLAN 10 (Ventas) hable con uno de la VLAN 20 (RRHH) <strong>a través del router</strong>, y que las VLANs crucen el trunk entre switches.</p>
    </div>
  </div>
</div>

---

## Paso 1 y 2: VLANs y puertos access

```
Switch1(config)# vlan 10
Switch1(config-vlan)# name Ventas
Switch1(config)# vlan 20
Switch1(config-vlan)# name RRHH

Switch1(config)# interface range fa0/1-5
Switch1(config-if-range)# switchport mode access
Switch1(config-if-range)# switchport access vlan 10

Switch1(config)# interface range fa0/6-10
Switch1(config-if-range)# switchport mode access
Switch1(config-if-range)# switchport access vlan 20
```

---

## Paso 3: el trunk entre switches (ambos extremos)

```
Switch1(config)# interface fa0/24
Switch1(config-if)# switchport mode trunk
Switch1(config-if)# switchport trunk native vlan 99
Switch1(config-if)# switchport trunk allowed vlan 10,20
```
(lo mismo en Switch2)

<div class="warning" style="margin-top:0.6rem;">
  <strong>El fallo intencionado de esta unidad:</strong> dejamos <em>native 99</em> en Switch1 y <em>native 1</em> en Switch2. Resultado: <em>Native VLAN mismatch</em> en `show interfaces trunk`, DHCP/ARP «a ratos» y logs que ladran. La native VLAN debe coincidir en los dos extremos.
</div>

---

## Paso 4: el puerto hacia el router también es trunk

El router llega con la configuración del siguiente bloque (router-on-a-stick), pero <strong>el puerto del switch que lo recibe debe ser trunk</strong>:

```
Switch1(config)# interface fa0/23
Switch1(config-if)# switchport mode trunk
Switch1(config-if)# switchport trunk allowed vlan 10,20
```

<div class="warning" style="margin-top:0.6rem;">
  Si ese puerto queda en access, el router <strong>solo verá la native VLAN</strong>: las demás nunca llegarán.
</div>

---

## Paso 5: IPs en los PCs

| PC | VLAN | IP | Gateway |
|---|---|---|---|
| PC-A | 10 | 192.168.10.10 | 192.168.10.1 |
| PC-B | 20 | 192.168.20.10 | 192.168.20.1 |
| PC-C | 10 | 192.168.10.11 | 192.168.10.1 |
| PC-D | 20 | 192.168.20.11 | 192.168.20.1 |

<div class="warning" style="margin-top:0.6rem;">
  Error típico: subred mal puesta o gateway apuntando a la subinterfaz equivocada. <strong>Cada VLAN, su subred y su gateway.</strong>
</div>

---
class: compact-slide
---

## El kit de verificación: los 5 shows de oro

| Comando | Qué te dice |
|---|---|
| `show vlan brief` | VLANs existentes y sus puertos access |
| `show interfaces trunk` | Trunks, native VLAN, allowed e invariantes |
| `show ip interface brief` | Estado Up/Up de las subinterfaces del router |
| `show running-config interface fa0/24` | La config exacta del puerto |
| `show mac address-table` | Qué MACs han aprendido los puertos de cada VLAN |

<div class="info" style="margin-top:0.5rem;">
  Diagnóstico: ① VLANs y puertos correctos → ② trunk correcto → ③ router. <strong>El 90% de los «no me veo» viven en los dos primeros.</strong>
</div>

---

## Mini-chequeo: el escenario

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde rápido:
</div>

1. ¿Qué tres pasos resumen la configuración de una VLAN en un switch?
2. ¿Qué comando descubre el <em>native VLAN mismatch</em>?
3. VLANs 10 y 20 bien, trunk sin mismatch… y aún no se ven. ¿Dónde miras?

<div class="answer-card" style="margin-top:0.7rem;">
  <strong>1.</strong> Crear la VLAN, asignar puertos access y montar el trunk si toca. · <strong>2.</strong> `show interfaces trunk`. · <strong>3.</strong> Subes a capa 3: `show ip interface brief` del router y el gateway de los PCs (192.168.10.1 / 192.168.20.1).
</div>

---
layout: closing
---

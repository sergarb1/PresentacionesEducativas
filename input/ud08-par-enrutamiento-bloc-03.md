---
layout: cover
---

# Unidad 08 — Enrutamiento<br>Bloque 3: diagnóstico y cierre

## 1r CFGS ASIR · Planificación y Administración de Redes

---
class: sparse-slide
---

## Diagnosticar routing: la idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Las rutas no se apagan solas: se escriben <strong>mal</strong>. Un ping roto siempre se puede acorralar con el mismo método: <strong>avanzar paso a paso</strong> hasta el último saltito que responde — ahí está el fallo.
  </div>
</div>

Ya sabes leer la tabla y escribir rutas. Ahora toca la parte profesional: cuando el jefe te dice «no llego al servidor de RRHH», tu trabajo es <strong>acorralar la causa</strong> con comandos, no reconfigurar a lo loco. En este bloque: el kit de diagnóstico, el método y el laboratorio final con fallos escondidos.

---
---

## Kit de diagnóstico: los cuatro comandos

| Comando | Dónde | Qué te dice |
|---|---|---|
| `ping <IP>` | PC y router | ¿Llega? El <strong>primer filtro</strong>: sí/no |
| `tracert` / `traceroute` | PC y router | <strong>Hasta dónde</strong> llega el paquete y dónde muere |
| `show ip route` | Router | ¿Existe la ruta hacia el destino? ¿Apunta al <strong>next-hop correcto</strong>? |
| `show ip interface brief` | Router | ¿La interfaz de esa ruta está <strong>up/up</strong>? |

<div class="info" style="margin-top:0.5rem;">
  Orden mental: <strong>ping → tracert → show ip route en el router donde muere</strong>. El tracert te señala la casa; la tabla te dice qué le falta al vecino.
</div>

---

## El método: avanzar hasta el último salto respondiente

<div class="step"><div class="step-number">1</div><div class="step-content"><strong>Ping a tu gateway</strong> (192.168.10.1). Si no responde: cable, VLAN o DC — el problema es <strong>de capa 1-2</strong>, ni siquiera ha empezado el routing.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content"><strong>Ping al destino real</strong> (192.168.30.7). Sí, el gateway responde y el destino no: el fallo está <strong>en medio</strong> — routing.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content"><strong>tracert al destino</strong>: los saltos que responde te dibujan el camino; el <strong>primer salto que calla</strong> es el router con el problema.</div></div>
<div class="step"><div class="step-number">4</div><div class="step-content"><strong>show ip route en ese router</strong>: ¿conoce la red siguiente? ¿A qué next-hop apunta? ¿Está <em>up</em> su interfaz?</div></div>

---

## El árbol de decisión del diagnóstico

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud08-par-diagnostico.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---
class: compact-slide
---

## ¿Culpa de quién? Tres escenarios clásicos

| Síntoma | Dónde muere | Causa típica |
|---|---|---|
| No responde <strong>nada</strong>, ni el gateway | En el primer cable | Cable, VLAN mal asignada o gateway mal puesto en el PC — el paquete no sale del tramo local |
| Responde el gateway, <strong>nada más</strong> | En tu router | Falta o error en la <strong>ruta de ida</strong> en tu router (destino desconocido) |
| El tracert responde <strong>hasta el punto N</strong> y calla | En el router N+1 | Falta la ruta <strong>de vuelta</strong> en la otra punta, o un next-hop mal escrito |

<div class="warning" style="margin-top:0.6rem;">
  El caso envenenado: <strong>ping saliente que contesta con ICMP inalcanzable</strong>: el paquete sale, muere en algún router «sin ruta de vuelta» y el mensaje de error regresa al emisor — el ping parece pensar, pero no comunica.
</div>

---

## El clásico: falta la ruta de retorno

<div class="step"><div class="step-number">1</div><div class="step-content">R1 tiene su <code>ip route 192.168.30.0 ↔ 10.0.0.2</code> en hora: el paquete <strong>cruza</strong> a la red 30. El host 30.7 oye el ping y contesta.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content">La respuesta regresa a R2… que <strong>no tiene ruta</strong> hacia 192.168.10.0/24. La descarta y avisa con ICMP.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content">Síntoma inequívoco: el emisor <strong>sí recibe error</strong> («host unreachable») en vez de un silencio total — y <code>show ip route</code> en R2 no lista ninguna ruta hacia 192.168.10.0/24.</div></div>

<div class="success" style="margin-top:0.6rem;">
  Regla de auditoría (ya la del bloque 2): <strong>cada ruta que configures en una punta, pregúntate ¿y cómo vuelve?</strong> La mitad de los «fallos misteriosos» de Packet Tracer son retornos sin escribir.
</div>

---
---

## Sé el paquete: tres routers, dos reencapsulados

> Viaja un paquete del PC (192.168.10.20) al servidor web (192.168.30.7), a otra planta con un router intermedio.

<div class="step"><div class="step-number">1</div><div class="step-content"><strong>Tramo 1</strong>: trama con MAC origen = PC → MAC destino = gateway R1. Dentro va el paquete <strong>del PC al 30.7</strong>, con TTL 64.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content"><strong>Salto R1</strong>: consulta tabla → next-hop 10.0.0.2. Trama nueva (MAC R1 → MAC R2); TTL baja a 63; el paquete <strong>ni se entera</strong>.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content"><strong>Salto R2 → entrega</strong>: trama final (MAC R2 → MAC del servidor, resuelta con ARP). TTL 62. IP origen e IP destino: <strong>exactamente las mismas</strong> que en el paso 1.</div></div>

<div class="info" style="margin-top:0.6rem;">
  Cualquier router del camino que <strong>no conozca ninguna de las dos redes</strong> — origen o destino — romperá el ida o la vuelta. Por eso el diagnóstico es bidireccional.
</div>

---
class: compact-slide
---

## ⚡ Laboratorio: dos routers con fallos escondidos

<div class="two-cols">
  <div class="left">
    <div class="info" style="padding:0.85rem 1rem;font-size:0.95rem;line-height:1.45;">
      <p><strong>Montaje</strong> (1,5 h, Packet Tracer): dos routers 2911 unidos por G0/1 (10.0.0.0/30), PC en 192.168.10.0/24 detrás de R1 y servidor en 192.168.30.0/24 detrás de R2.</p>
      <p><strong>Tus tres fallos:</strong></p>
      <p><strong>A.</strong> La ruta en R1 apunta a un next-hop <code>10.0.0.3</code> inexistente<br>
      <strong>B.</strong> En R2, máscara de ruta mal escrita (<code>/30</code> en vez de <code>/24</code>)<br>
      <strong>C.</strong> Falta la ruta de vuelta en R2</p>
    </div>
  </div>
  <div class="right">
    <div class="info" style="height:100%;padding:0.85rem 1rem;font-size:0.95rem;line-height:1.45;display:flex;flex-direction:column;justify-content:center;">
      <p><strong>Pistas:</strong></p>
      <p><em>A:</em> con interfaz, la ruta aparece pero nunca resolve el ARP del next-hop; el tracert muere en R1.</p>
      <p><em>B:</em> <code>show ip route</code> en R2 lista la ruta… «demasiado estrecha» para cubrir la red; pings de hosts concretos fallan según su IP.</p>
      <p><em>C:</em> el ping sale, el host contesta, R2 descarta la respuesta.</p>
      <p>Documenta: síntoma → causa → comando que lo delató.</p>
    </div>
  </div>
</div>

---
---

## ¿Quién soy? (4 adivinanzas)

1. Aparezco como <strong>C</strong> en la tabla sin que nadie me configure y muero si le quito la IP a la interfaz.
2. Casa con <strong>todo</strong> destino y salgo solo cuando nada antes que yo encaja.
3. Aunque nunca reciba paquetes, el router me mantiene en su tabla con AD 90… esperando a que muera mi hermana mayor.
4. Soy el «a quién delego»: el router reencapsula la trama <strong>hacia mi MAC</strong>, pero el paquete destino no soy yo.

<div class="answer-card" style="margin-top:0.7rem;">
  1. La ruta conectada · 2. La ruta por defecto (S*) · 3. La ruta flotante (plan B) · 4. El next-hop
</div>

---
---

## Logros y siguientes pasos

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 <strong>Acorralador</strong> | De «no ping» a diagnóstico completo en menos de 5 minutos |
| 🏅 <strong>Lector de tracert</strong> | Señalar el router culpable exacto con una sola prueba |
| 🏅 <strong>Auditor de retornos</strong> | Detectar el «ida sí, vuelta no» antes de que el alumnado lo sufra |
| 🏅 <strong>Cartógrafo</strong> | Dibujar una topología de 3 redes + 2 routers a mano y escribir sus 4 rutas con máscara correcta |

<div class="info" style="margin-top:0.6rem;">
  <strong>Para practicar:</strong> boletines U08 en Packet Tracer. Con la tabla dominada — leerla, escribirla, diagnosticarla — ya mueves tráfico entre redes profesionales: el bloque antes de cualquier red real con más de una subred.
</div>

---
layout: closing
---

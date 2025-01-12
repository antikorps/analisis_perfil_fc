/**
 * @typedef {Object} UsuarioAnalizado
 * @property {Perfil} perfil
 * @property {UsuarioHilos} hilos
 * @property {UsuarioMensajes} mensajes
 */

/**
 * @typedef {Object} Selectores
 * @property {string} usuario
 * @property {string} descripcion
 * @property {string} firma
 * @property {string} registro
 * @property {string} hilos
 * @property {string} mensajes
 * @property {string} coche
 * @property {string} ubicacion
 * @property {string} intereses
 * @property {string} ocupacion
 * @property {string} hilosEnlaces
 * @property {string} hiloPrimerMensaje
 * @property {string} mensajeEnlaces
 * @property {string} mensajeTexto
 */

/**
 * @typedef {Object} Perfil
 * @property {string} usuario
 * @property {string} descripcion
 * @property {string} firma
 * @property {string} registro
 * @property {string} hilos
 * @property {string} mensajes
 * @property {string} coche
 * @property {string} ubicacion
 * @property {string} intereses
 * @property {string} ocupacion
 */

/**
 * @typedef {Object} Mensaje
 * @property {string} enlace
 * @property {string} contenido
 */

/**
 * @typedef {Array<Mensaje>} UsuarioHilos
 */

/**
 * @typedef {Array<Mensaje>} UsuarioMensajes
 */

var ESPERA_SEGUNDOS = 2000;
var SIMULTANEIDAD = 3;

/**
 * @param {temaNuevo} bool
 * @return {Selectores}
 */
function definirSelectores(temaNuevo) {
  /**
   * @type {Selectores}
   */
  const selectores = {};
  if (temaNuevo) {
    selectores.usuario =
      "#container > section:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > h2:nth-child(1)";
    selectores.descripcion =
      "#container > section:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > h4:nth-child(2)";
    selectores.firma =
      "#container > section:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > p:nth-child(1)";
    selectores.registro =
      "#container > section:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > span:nth-child(2)";
    selectores.hilos =
      "#container > section:nth-child(2) > div:nth-child(2) > div:nth-child(2) > a:nth-child(1) > div:nth-child(1) > span:nth-child(1)";
    selectores.mensajes =
      "#container > section:nth-child(2) > div:nth-child(2) > div:nth-child(2) > a:nth-child(2) > div:nth-child(1) > span:nth-child(1)";
    selectores.coche =
      "#collapseobj_aboutme > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)";
    selectores.ubicacion =
      "#collapseobj_aboutme > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > span:nth-child(1)";
    selectores.intereses =
      "#collapseobj_aboutme > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > span:nth-child(1)";
    selectores.ocupacion =
      "#collapseobj_aboutme > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(2) > span:nth-child(1)";

    selectores.hilosEnlaces = `a[id^="thread_title_"]`;
    selectores.hiloPrimerMensaje = `#posts div[id^="post_message_`;
    selectores.mensajeEnlaces = `a[id^="post_title_"]`;
    selectores.mensajeTexto = "#post_message_";
  } else {
    // TODO
  }
  return selectores;
}

// FileSaver https://github.com/eligrey/FileSaver.js
(function (a, b) {
  if ("function" == typeof define && define.amd) define([], b);
  else if ("undefined" != typeof exports) b();
  else {
    b(), (a.FileSaver = { exports: {} }.exports);
  }
})(this, function () {
  "use strict";
  function b(a, b) {
    return (
      "undefined" == typeof b
        ? (b = { autoBom: !1 })
        : "object" != typeof b &&
          (console.warn("Deprecated: Expected third argument to be a object"),
          (b = { autoBom: !b })),
      b.autoBom &&
      /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(
        a.type
      )
        ? new Blob(["\uFEFF", a], { type: a.type })
        : a
    );
  }
  function c(a, b, c) {
    var d = new XMLHttpRequest();
    d.open("GET", a),
      (d.responseType = "blob"),
      (d.onload = function () {
        g(d.response, b, c);
      }),
      (d.onerror = function () {
        console.error("could not download file");
      }),
      d.send();
  }
  function d(a) {
    var b = new XMLHttpRequest();
    b.open("HEAD", a, !1);
    try {
      b.send();
    } catch (a) {}
    return 200 <= b.status && 299 >= b.status;
  }
  function e(a) {
    try {
      a.dispatchEvent(new MouseEvent("click"));
    } catch (c) {
      var b = document.createEvent("MouseEvents");
      b.initMouseEvent(
        "click",
        !0,
        !0,
        window,
        0,
        0,
        0,
        80,
        20,
        !1,
        !1,
        !1,
        !1,
        0,
        null
      ),
        a.dispatchEvent(b);
    }
  }
  var f =
      "object" == typeof window && window.window === window
        ? window
        : "object" == typeof self && self.self === self
        ? self
        : "object" == typeof global && global.global === global
        ? global
        : void 0,
    a =
      /Macintosh/.test(navigator.userAgent) &&
      /AppleWebKit/.test(navigator.userAgent) &&
      !/Safari/.test(navigator.userAgent),
    g =
      f.saveAs ||
      ("object" != typeof window || window !== f
        ? function () {}
        : "download" in HTMLAnchorElement.prototype && !a
        ? function (b, g, h) {
            var i = f.URL || f.webkitURL,
              j = document.createElement("a");
            (g = g || b.name || "download"),
              (j.download = g),
              (j.rel = "noopener"),
              "string" == typeof b
                ? ((j.href = b),
                  j.origin === location.origin
                    ? e(j)
                    : d(j.href)
                    ? c(b, g, h)
                    : e(j, (j.target = "_blank")))
                : ((j.href = i.createObjectURL(b)),
                  setTimeout(function () {
                    i.revokeObjectURL(j.href);
                  }, 4e4),
                  setTimeout(function () {
                    e(j);
                  }, 0));
          }
        : "msSaveOrOpenBlob" in navigator
        ? function (f, g, h) {
            if (((g = g || f.name || "download"), "string" != typeof f))
              navigator.msSaveOrOpenBlob(b(f, h), g);
            else if (d(f)) c(f, g, h);
            else {
              var i = document.createElement("a");
              (i.href = f),
                (i.target = "_blank"),
                setTimeout(function () {
                  e(i);
                });
            }
          }
        : function (b, d, e, g) {
            if (
              ((g = g || open("", "_blank")),
              g &&
                (g.document.title = g.document.body.innerText =
                  "downloading..."),
              "string" == typeof b)
            )
              return c(b, d, e);
            var h = "application/octet-stream" === b.type,
              i = /constructor/i.test(f.HTMLElement) || f.safari,
              j = /CriOS\/[\d]+/.test(navigator.userAgent);
            if ((j || (h && i) || a) && "undefined" != typeof FileReader) {
              var k = new FileReader();
              (k.onloadend = function () {
                var a = k.result;
                (a = j
                  ? a
                  : a.replace(/^data:[^;]*;/, "data:attachment/file;")),
                  g ? (g.location.href = a) : (location = a),
                  (g = null);
              }),
                k.readAsDataURL(b);
            } else {
              var l = f.URL || f.webkitURL,
                m = l.createObjectURL(b);
              g ? (g.location = m) : (location.href = m),
                (g = null),
                setTimeout(function () {
                  l.revokeObjectURL(m);
                }, 4e4);
            }
          });
  (f.saveAs = g.saveAs = g),
    "undefined" != typeof module && (module.exports = g);
});

/**
 *
 * @param {number} milisegundos
 * @returns
 */
function sleep(milisegundos) {
  return new Promise((resolver) => setTimeout(resolver, milisegundos));
}

/**
 *
 * @param {Array<string>} arr
 * @param {number} size
 * @returns
 */
function dividirLotes(arr, size) {
  let result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 *
 * @param {string} mensaje
 * @param {string} color
 * @param {bool} critico
 */
function informarProgreso(mensaje, color, critico) {
  document.write(`<p style="color: ${color}">${mensaje}</p>`);
  if (critico) {
    throw new Error(mensaje);
  }
}

/**
 *
 * @param {string} endpoint
 * @returns {Promise<Document>}
 */
async function parsearDocumentoTrasPeticion(endpoint) {
  const f = await fetch(endpoint);
  if (f.status != 200) {
    informarProgreso(
      `se ha recibido un status code incorrecto al hacer la petición a ${endpoint}: ${f.statusText}`,
      "red",
      true
    );
  }
  const t = await f.text();
  const parser = new DOMParser();
  return parser.parseFromString(t, "text/html");
}

/**
 * @param {Document} doc
 * @param {boolean} temaNuevo
 * @returns {string}
 */
function extraerUsuarioId(doc, temaNuevo) {
  if (temaNuevo) {
    // Selector con el usuarioId <a class="menu-item" style="padding-top: 24px" href="/foro/member.php?u=597236" title="Ver mi perfil">
    const selectorUsuarioId = `a.menu-item[title="Ver mi perfil"]`;
    const $usuarioId = doc.querySelector(selectorUsuarioId);
    if ($usuarioId == null) {
      throw new Error(
        `ha fallado el selector ${selectorUsuarioId} y no se ha podido encontrar el usuarioId`
      );
    }
    const usuarioIdHref = $usuarioId.getAttribute("href");
    if (usuarioIdHref == null) {
      throw new Error(
        `no se ha podido obtener el selector href de ${selectorUsuarioId}`
      );
    }
    return usuarioIdHref.replace("/foro/member.php?u=", "");
  }
  // TODO: selector tema antiguo
}

/**
 * @param {Document} doc
 * @returns {boolean}
 */
function usoTemaNuevo(doc) {
  // Con el tema nuevo existe este botón: <a class="menu-item" title="Versión antigua" onclick="setOldDesign()">
  const $enlaceVersionAntiguo = doc.querySelector(`a[title="Versión antigua"]`);
  if ($enlaceVersionAntiguo != null) {
    return true;
  }
  return false;
}

/**
 * @return {Promise<{usuarioId: string, temaNuevo: boolean}>}
 */
async function usuarioIdTema() {
  const endpoint = "https://forocoches.com/foro/";
  const doc = await parsearDocumentoTrasPeticion(endpoint);

  const temaNuevo = usoTemaNuevo(doc);
  if (!temaNuevo) {
    informarProgreso(
      "el tema antiguo no está todavía implementado, cambia al tema nuevo para poder usar el script",
      "red",
      true
    );
  }
  const usuarioId = extraerUsuarioId(doc, temaNuevo);
  informarProgreso(
    `✅ el usuario ${usuarioId} está utilizando un tema válido`,
    "green",
    false
  );
  return {
    usuarioId: usuarioId,
    temaNuevo: temaNuevo,
  };
}

/**
 * @param {string} usuarioId
 * @param {Selectores} selectores
 * @return {Promise<Perfil>}
 */
async function extraerDescripcion(usuarioId, selectores) {
  const endpoint = `https://forocoches.com/foro/member.php?u=${usuarioId}`;
  const doc = await parsearDocumentoTrasPeticion(endpoint);

  /**
   * @type {Perfil}
   */
  const perfil = {
    usuario: doc.querySelector(selectores.usuario)?.textContent ?? "",
    descripcion: doc.querySelector(selectores.descripcion)?.textContent ?? "",
    firma: doc.querySelector(selectores.firma)?.textContent ?? "",
    registro: doc.querySelector(selectores.registro)?.textContent ?? "",
    hilos: doc.querySelector(selectores.hilos)?.textContent ?? "",
    mensajes: doc.querySelector(selectores.mensajes)?.textContent ?? "",
    coche: doc.querySelector(selectores.coche)?.textContent ?? "",
    ubicacion: doc.querySelector(selectores.ubicacion)?.textContent ?? "",
    intereses: doc.querySelector(selectores.intereses)?.textContent ?? "",
    ocupacion: doc.querySelector(selectores.ocupacion)?.textContent ?? "",
  };

  informarProgreso(
    `✅ se ha incorporado al informe el perfil de usuario <pre>${JSON.stringify(
      perfil
    )}</pre>`,
    "green",
    false
  );

  return perfil;
}

/**
 * @param {string} usuario
 * @param {Selectores} selectores
 * @return {Promise<UsuarioHilos>}
 *
 */
async function extraerHilos(usuario, selectores) {
  const parametros = {
    do: "process",
    searchuser: usuario,
    starteronly: 1,
    exactname: 1,
  };
  const parametrosBusqueda = new URLSearchParams(parametros);

  const endpoint = `https://forocoches.com/foro/search.php?${parametrosBusqueda}`;
  const doc = await parsearDocumentoTrasPeticion(endpoint);

  const $hilos = doc.querySelectorAll(selectores.hilosEnlaces);
  const hilosEnlaces = [];
  for (const $hilo of $hilos) {
    const href = $hilo.getAttribute("href");
    if (href == null) {
      continue;
    }
    hilosEnlaces.push(
      "https://forocoches.com/foro/" + href.replace("&highlight=", "")
    );
  }

  /**
   * @type {UsuarioHilos}
   */
  const usuarioHilos = [];

  informarProgreso(
    "⏳ buscando entre los últimos 25 hilos del usuario",
    "green",
    false
  );
  for (const hiloEnlace of hilosEnlaces) {
    const doc = await parsearDocumentoTrasPeticion(hiloEnlace);

    const primerMensaje =
      doc.querySelector(selectores.hiloPrimerMensaje)?.textContent ?? "";

    /**
     * @type {Mensaje}
     */
    const usuarioMensaje = {
      enlace: hiloEnlace,
      contenido: primerMensaje.trim(),
    };
    usuarioHilos.push(usuarioMensaje);
  }
  informarProgreso(
    `✅ se ha incorporar al informe los últimos <strong>${usuarioHilos.length}</strong> hilos creados por el usuario`,
    "green",
    false
  );
  return usuarioHilos;
}

/**
 * @param {string} usuario
 * @param {Selectores} selectores
 * @return {Promise<Array<string>>}
 *
 */
async function extraerEnlacesMensajes(usuario, selectores) {
  const parametros = {
    do: "process",
    searchuser: usuario,
    exactname: 1,
    showposts: 1,
  };
  const parametrosBusqueda = new URLSearchParams(parametros);

  const endpoint = `https://forocoches.com/foro/search.php?${parametrosBusqueda}`;

  // Devuelve un searchid necesario para la paginación
  const f = await fetch(endpoint);
  if (f.status != 200) {
    throw new Error(
      `se ha recibido un status code incorrecto al hacer la petición a ${endpoint}: ${f.statusText}`
    );
  }
  const locationUrl = new URL(f.url);
  const parametrosLocation = new URLSearchParams(locationUrl.search);
  const searchId = parametrosLocation.get("searchid");
  if (searchId == null) {
    throw new Error(
      `no se ha encontrado el searchid en el location ${location}`
    );
  }

  const t = await f.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(t, "text/html");

  /**
   * @type {Array<string>}
   */
  const usuarioMensajes = [];
  const $mensajesBusqueda = doc.querySelectorAll(selectores.mensajeEnlaces);
  for (const $mensajeBusqueda of $mensajesBusqueda) {
    const href = $mensajeBusqueda.getAttribute("href");
    if (href == null) {
      continue;
    }
    const mensajeEnlace = `https://forocoches.com/foro/${href}`;
    usuarioMensajes.push(mensajeEnlace);
  }

  informarProgreso(
    "⏳ buscando los enlaces de los mensajes del usuario correspondientes a la página 1",
    "green",
    false
  );
  if (usuarioMensajes.length < 25) {
    return usuarioMensajes;
  }

  const limitePagina = 2;
  for (let pagina = 2; pagina <= limitePagina; pagina++) {
    informarProgreso(
      `⏳ buscando los enlaces de los mensajes del usuario correspondientes a la página ${pagina}`,
      "green",
      false
    );

    const endpointPaginacion = `https://forocoches.com/foro/search.php?searchid=${searchId}&pp=25&page=${pagina}`;
    const f = await fetch(endpointPaginacion);
    if (f.status != 200) {
      informarProgreso(
        `se ha recibido un status code incorrecto al hacer la petición a ${endpointPaginacion}: ${f.statusText}`,
        "red",
        true
      );
    }
    const t = await f.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(t, "text/html");

    const $mensajesPagina = doc.querySelectorAll(selectores.mensajeEnlaces);
    for (const $mensajePagina of $mensajesPagina) {
      const href = $mensajePagina.getAttribute("href");
      if (href == null) {
        continue;
      }
      const mensajeEnlace = `https://forocoches.com/foro/${href}`;
      usuarioMensajes.push(mensajeEnlace);
    }

    if ($mensajesPagina < 25) {
      break;
    }
  }
  return usuarioMensajes;
}

/**
 *
 * @param {string} url
 * @param {Selectores} selectores
 * @returns {Promise<Mensaje>}
 */
async function peticionMensajeExtraccion(url, selectores) {
  /**
   * @type {Mensaje}
   */
  const mensaje = {
    enlace: url,
    contenido: "",
  };

  const selectorId = url.replace(/.*&highlight=#post/gm, "");
  const selectorPersonalizado = `${selectores.mensajeTexto}${selectorId}`;

  const doc = await parsearDocumentoTrasPeticion(url);

  // Eliminar las quotes
  const mensajeAutor = doc.querySelector(selectorPersonalizado);
  let $selectorCita = mensajeAutor.querySelectorAll("div.squote");

  for (let i = 0; i < $selectorCita.length; i++) {
    $selectorCita[i].remove();
  }

  let contenido = doc.querySelector(selectorPersonalizado)?.textContent ?? "";
  mensaje.contenido = contenido.trim();
  return mensaje;
}

/**
 * @param {Array<string>} mensajes
 * @param {Selectores} selectores
 * @return {Promise<UsuarioMensajes>}
 *
 */
async function extraerMensajes(mensajes, selectores) {
  const lotes = dividirLotes(mensajes, SIMULTANEIDAD);
  const totalLotes = lotes.length;
  /**
   * @type {UsuarioMensajes}
   */
  const usuarioMensajes = [];
  for (const [indice, lote] of lotes.entries()) {
    informarProgreso(
      `⏳ buscando mensajes de usuario por lotes. ${
        indice + 1
      } de ${totalLotes}`,
      "green",
      false
    );
    const promesas = [];
    for (const enlace of lote) {
      promesas.push(peticionMensajeExtraccion(enlace, selectores));
    }
    const resultados = await Promise.all(promesas);
    for (const r of resultados) {
      usuarioMensajes.push(r);
    }
    await sleep(ESPERA_SEGUNDOS);
  }
  return usuarioMensajes;
}

/**
 *
 * @param {Perfil} perfil
 * @param {UsuarioHilos} hilos
 * @param {UsuarioMensajes} mensaje
 * @param {string} usuarioId
 */
function guardarInforme(perfil, hilos, mensajes, usuarioId) {
  /**
   * @type {UsuarioAnalizado}
   */
  const usuarioAnalizado = {
    perfil: perfil,
    hilos: hilos,
    mensajes: mensajes,
  };

  const informeJSON = JSON.stringify(usuarioAnalizado);
  informarProgreso(
    `Informe en formato JSON generado correctamente <pre>${informeJSON}</pre>`,
    "green",
    false
  );
  try {
    const blob = new Blob([informeJSON], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `fc_informe_${usuarioId}.json`);
  } catch (error) {
    informarProgreso(
      `error intentando guardar el archivo con el informe ${error}`,
      "red",
      false
    );
  }
  informarProgreso("🏆 informe generado correctamente", "green", false);
}

async function analizarPerfilForocoches() {
  const usuarioIdTemaNuevo = await usuarioIdTema();
  // usuarioIdTemaNuevo.usuarioId = "" // Modificar para crear informes de otros usuarios
  const selectores = definirSelectores(usuarioIdTemaNuevo.temaNuevo);
  const perfil = await extraerDescripcion(
    usuarioIdTemaNuevo.usuarioId,
    selectores
  );

  const hilos = await extraerHilos(perfil.usuario, selectores);
  const enlacesMensajes = await extraerEnlacesMensajes(
    perfil.usuario,
    selectores
  );
  const mensajes = await extraerMensajes(enlacesMensajes, selectores);
  guardarInforme(perfil, hilos, mensajes, usuarioIdTemaNuevo.usuarioId);
}

analizarPerfilForocoches();

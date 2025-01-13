var ESPERA = 2000;
var SIMULTANEIDAD = 3;
var USUARIOID = "";
var PAGINAS = 2;

/**
 * @typedef {Object} Perfil
 * @property {string} usuario
 * @property {string} descripcion
 * @property {string} firma
 * @property {string} registro
 * @property {string} totalHilos
 * @property {string} totalMensajes
 * @property {string} coche
 * @property {string} ubicacion
 * @property {string} intereses
 * @property {string} ocupacion
 */

/**
 * @typedef {Object} Intervencion
 * @property {string} enlace
 * @property {string} titulo
 * @property {string} contenido
 */

/**
 * @typedef {Array<Intervencion>} Hilos
 */

/**
 * @typedef {Array<Intervencion>} Mensajes
 */

/**
 * Divide en lotes o chunks un array
 *
 * @param {Array<*>} arr
 * @param {number} tamaño
 * @returns {Array<*>}
 */
function dividirLotes(arr, tamaño) {
  let r = [];
  for (let i = 0; i < arr.length; i += tamaño) {
    r.push(arr.slice(i, i + tamaño));
  }
  return r;
}

/**
 * Pausa la ejecución del código durante un tiempo determinado en milisegundos.
 *
 * @param {number} milisegundos
 * @returns {Promise}
 */
function sleep(milisegundos) {
  return new Promise((resolver) => setTimeout(resolver, milisegundos));
}

class UsuarioFC {
  /**
   *
   * @param {number} espera
   * @param {number} simultaneidad
   * @param {string} usuarioId
   * @param {number} limitePagina
   */
  constructor(espera, simultaneidad, usuarioId, limitePagina) {
    this.espera = espera;
    this.simultaneidad = simultaneidad;
    this.usuarioId = usuarioId;
    this.temaNuevo = true;
    this.limitePagina = limitePagina;

    /**
     * @type {Perfil}
     */
    this.perfil = {};

    /**
     * @type {Hilos}
     */
    this.hilos = [];

    /**
     * @type {Mensajes}
     */
    this.mensajes = [];

    this.selectorUsuario =
      "#container > section:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > h2:nth-child(1)";
    this.selectorDescripcion =
      "#container > section:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > h4:nth-child(2)";
    this.selectorFirma =
      "#container > section:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > p:nth-child(1)";
    this.selectorRegistro =
      "#container > section:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > span:nth-child(2)";
    this.selectorTotalHilos =
      "#container > section:nth-child(2) > div:nth-child(2) > div:nth-child(2) > a:nth-child(1) > div:nth-child(1) > span:nth-child(1)";
    this.selectorTotalMensajes =
      "#container > section:nth-child(2) > div:nth-child(2) > div:nth-child(2) > a:nth-child(2) > div:nth-child(1) > span:nth-child(1)";
    this.selectorCoche =
      "#collapseobj_aboutme > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)";
    this.selectorUbicacion =
      "#collapseobj_aboutme > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > span:nth-child(1)";
    this.selectorIntereses =
      "#collapseobj_aboutme > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > span:nth-child(1)";
    this.selectorOcupacion =
      "#collapseobj_aboutme > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(2) > span:nth-child(1)";

    this.selectorHilosEnlaces = `a[id^="thread_title_"]`;
    this.selectorHiloIntervencion = `#posts div[id^="post_message_`;
    this.selectorMensajesEnlaces = `a[id^="post_title_"]`;
    this.selectorMensajesTitulos = ``
    this.selectorMensajeIntervencion = "#post_message_";
  }
  /**
   * Utilidad para informar del progreso
   * Salida en el document de la web
   * Arroja excepción en caso de error crítico
   *
   * @param {string} mensaje
   * @param {string} color
   * @param {string} critico
   */
  informarProgreso(mensaje, color, critico) {
    document.write(`<p style="color:${color}">${mensaje}</p>`);
    if (critico) {
      throw new Error(mensaje);
    }
  }
  /**
   * Parsea en HTML la respuesta a un get
   *
   * @param {string} endpoint
   * @returns {Promise<Document>}
   */
  async parsearDocumentoTrasPeticion(endpoint) {
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
   * Identifica el tema que está utilizando el usuario
   *
   * POR HACER: selectores para el tema antiguo
   *
   * @param {Document} doc
   */
  identificarTema(doc) {
    const $enlaceVersionAntiguo = doc.querySelector(
      `a[title="Versión antigua"]`
    );
    if ($enlaceVersionAntiguo != null) {
      return;
    }

    this.informarProgreso(
      "El uso del tema antiguo no está implementado, para usar el script deberás cambiar al tema actual",
      "red",
      true
    );

    this.temaNuevo = false;
    
    this.selectorUsuario = "";
    this.selectorDescripcion = "";
    this.selectorFirma = "";
    this.selectorRegistro = "";
    this.selectorTotalHilos = "";
    this.selectorTotalMensajes = "";
    this.selectorCoche = "";
    this.selectorUbicacion = "";
    this.selectorIntereses = "";
    this.selectorOcupacion = "";

    this.selectorHilosEnlaces = "";
    this.selectorHiloIntervencion = "";
    this.selectorMensajesEnlaces = "";
    this.selectorMensajeIntervencion = "";
  }
  /**
   * Localiza el usuarioid o identificador del usuario
   *
   * @param {Document} doc
   */
  identificarUsuario(doc) {
    if (this.temaNuevo) {
      this.buscarUsuarioIdTemaNuevo(doc);
      return;
    }
    this.buscarUsuarioIdTemaAntiguo(doc);
  }
  /**
   * Búsqueda del usuarioid en el tema nuevo
   *
   * @param {Document} doc
   */
  buscarUsuarioIdTemaNuevo(doc) {
    if (this.usuarioId != "") {
      return;
    }
    const selectorUsuarioId = `a.menu-item[title="Ver mi perfil"]`;
    const $usuarioId = doc.querySelector(selectorUsuarioId);
    if ($usuarioId == null) {
      const mensajeError = `ha fallado el selector ${selectorUsuarioId} y no se ha podido encontrar el usuarioId`;
      this.informarProgreso(mensajeError, "red", true);
    }
    const usuarioIdHref = $usuarioId.getAttribute("href");
    if (usuarioIdHref == null) {
      const mensajeError = `no se ha podido obtener el selector href de ${selectorUsuarioId}`;
      this.informarProgreso(mensajeError, "red", true);
    }
    const usuarioId = usuarioIdHref.replace("/foro/member.php?u=", "");
    this.usuarioId = usuarioId;
    const mensajeProgreso = `✅ usuarioId encontrado ${usuarioId}`;
    this.informarProgreso(mensajeProgreso, "green", false);
  }
  /**
   * Búsqueda del usuarioid en el tema antiguo
   *
   * @param {Document} doc
   */
  buscarUsuarioIdTemaAntiguo(doc) {
    if (this.usuarioId != "") {
      return;
    }
    // POR HACER
  }
  /**
   * Permite determinar el tema utilizado y localizar el usuarioid (identificador del usuario)
   */
  async peticionPaginaPrincipal() {
    const doc = await this.parsearDocumentoTrasPeticion(
      "https://forocoches.com/foro/"
    );
    this.identificarTema(doc);
    this.identificarUsuario(doc);
  }
  /**
   * Extracción de los datos del usuario de la página de su perfil
   *
   * usuario, descripcion, firma, registro, total hilos,
   * total mensajes, coche, ubicacion, intereses, ocupacion
   */
  async extraerDescripcion() {
    const endpoint = `https://forocoches.com/foro/member.php?u=${this.usuarioId}`;
    const doc = await this.parsearDocumentoTrasPeticion(endpoint);

    this.perfil.usuario = doc.querySelector(this.selectorUsuario)?.textContent ?? "";
    this.perfil.descripcion =
      doc.querySelector(this.selectorDescripcion)?.textContent ?? "";
    this.perfil.firma = doc.querySelector(this.selectorFirma)?.textContent ?? "";
    this.perfil.registro = doc.querySelector(this.selectorRegistro)?.textContent ?? "";
    this.perfil.totalHilos =
      doc.querySelector(this.selectorTotalHilos)?.textContent ?? "";
    this.perfil.totalMensajes =
      doc.querySelector(this.selectorTotalMensajes)?.textContent ?? "";
    this.perfil.coche = doc.querySelector(this.selectorCoche)?.textContent ?? "";
    this.perfil.ubicacion =
      doc.querySelector(this.selectorUbicacion)?.textContent ?? "";
    this.perfil.intereses =
      doc.querySelector(this.selectorIntereses)?.textContent ?? "";
    this.perfil.ocupacion =
      doc.querySelector(this.selectorOcupacion)?.textContent ?? "";

    this.informarProgreso(
      `✅ se ha incorporado al informe la descripción del usuario <pre>${JSON.stringify(
        this.perfil
      )}</pre>`,
      "green",
      false
    );
  }
  /**
   * Búsqueda de los enlaces de los últimos hilos creados por el usuario
   */
  async buscarHilos() {
    this.informarProgreso(
      `⏳ buscando los enlaces de los últimos 25 posibles hilos del usuario `,
      "green",
      false
    );
    const parametros = {
      do: "process",
      searchuser: this.perfil.usuario,
      starteronly: 1,
      exactname: 1,
    };
    const parametrosBusqueda = new URLSearchParams(parametros);

    const endpoint = `https://forocoches.com/foro/search.php?${parametrosBusqueda}`;
    const doc = await this.parsearDocumentoTrasPeticion(endpoint);

    const $hilos = doc.querySelectorAll(this.selectorHilosEnlaces);

    for (const $hilo of $hilos) {
      const href = $hilo.getAttribute("href");
      if (href == null) {
        continue;
      }
      this.hilos.push({
        enlace: href,
        titulo: $hilo.textContent.trim(),
        contenido: "",
      });
    }
    this.informarProgreso(
      `✅ se han encontrado los enlaces para ${this.hilos.length} hilos creados por el usuario de un máximo analizable de 25`,
      "green",
      false
    );
  }
  /**
   * Búsqueda de los enlaces de los últimos mensajes enviados por el usuario
   */
  async buscarMensajes() {
    this.informarProgreso(
      "⏳ buscando los enlaces de los mensajes del usuario correspondientes a la página 1",
      "green",
      false
    );
    const parametros = {
      do: "process",
      searchuser: this.perfil.usuario,
      exactname: 1,
      showposts: 1,
    };
    const parametrosBusqueda = new URLSearchParams(parametros);

    const endpoint = `https://forocoches.com/foro/search.php?${parametrosBusqueda}`;

    // Devuelve un searchid necesario para la paginación
    const f = await fetch(endpoint);
    if (f.status != 200) {
      this.informarProgreso(
        `se ha recibido un status code incorrecto al hacer la petición a ${endpoint}: ${f.statusText}`,
        "red",
        true
      );
    }
    const finalUrl = new URL(f.url);
    const parametrosLocation = new URLSearchParams(finalUrl.search);
    const searchId = parametrosLocation.get("searchid");
    if (searchId == null) {
      this.informarProgreso(
        `no se ha encontrado el searchid en el location ${f.url}`,
        "red",
        true
      );
    }

    const t = await f.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(t, "text/html");

    const $mensajesBusqueda = doc.querySelectorAll(this.selectorMensajesEnlaces);
    for (const $mensajeBusqueda of $mensajesBusqueda) {
      const href = $mensajeBusqueda.getAttribute("href");
      if (href == null) {
        continue;
      }
      this.mensajes.push({
        enlace: href,
        titulo: $mensajeBusqueda.textContent.trim(),
        contenido: "",
      });
    }

    if (this.mensajes.length < 25) {
      return usuarioMensajes;
    }

    for (let pagina = 2; pagina <= this.limitePagina; pagina++) {
      this.informarProgreso(
        `⏳ buscando los enlaces de los mensajes del usuario correspondientes a la página ${pagina}`,
        "green",
        false
      );

      const endpointPaginacion = `https://forocoches.com/foro/search.php?searchid=${searchId}&pp=25&page=${pagina}`;
      const f = await fetch(endpointPaginacion);
      if (f.status != 200) {
        this.informarProgreso(
          `se ha recibido un status code incorrecto al hacer la petición a ${endpointPaginacion}: ${f.statusText}`,
          "red",
          true
        );
      }
      const t = await f.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(t, "text/html");

      const $mensajesPagina = doc.querySelectorAll(this.selectorMensajesEnlaces);
      for (const $mensajePagina of $mensajesPagina) {
        const href = $mensajePagina.getAttribute("href");
        if (href == null) {
          continue;
        }
        const mensajeEnlace = `https://forocoches.com/foro/${href}`;
        this.mensajes.push({
          enlace: mensajeEnlace,
          titulo: $mensajePagina.textContent.trim(),
          contenido: "",
        });
      }

      if ($mensajesPagina < 25) {
        break;
      }
    }
  }

  /**
   * Recuperar el contenido textual de la intervención del usuario
   *
   * @param {Intervencion} intervencion
   * @param {string} selector
   * @returns {Promise<Intervencion>}
   */
  async buscarContenidoIntervencion(intervencion, selector) {
    const f = await fetch(intervencion.enlace);
    if (f.status != 200) {
      this.informarProgreso(
        `se ha recibido un status code incorrecto al hacer la petición a ${endpoint}: ${f.statusText}`,
        "red",
        true
      );
    }
    const t = await f.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(t, "text/html");

    const mensajeAutor = doc.querySelector(selector);
    let $selectorCita = mensajeAutor.querySelectorAll("div.squote");

    for (let i = 0; i < $selectorCita.length; i++) {
      $selectorCita[i].remove();
    }

    let contenido = doc.querySelector(selector)?.textContent ?? "";
    return {
      enlace: intervencion.enlace,
      titulo: intervencion.titulo,
      contenido: contenido.trim(),
    };
  }
  /**
   * Extrae el contenido textual de la intervención del usuario
   * 
   * @param {string} identificador 
   * @return {Promise}
   */
  async extraerIntervencion(identificador) {
    /**
     * @type {Array<Array<Intervencion>>}
     * 
     */
    let lotes = [];
    let selector = "";
    if (identificador == "hilos") {
      lotes = dividirLotes(this.hilos, this.simultaneidad);
      selector = this.selectorHiloIntervencion;
    } else {
      lotes = dividirLotes(this.mensajes, this.simultaneidad);
    }
    
    const totalLotes = lotes.length;
    /**
     * @type {Array<Intervencion>}
     */
    const intervencionesActualizadas = [];
    for (const [indice, lote]of lotes.entries()) {
      this.informarProgreso(
        `⏳ buscando las intervenciones del usuario en sus ${identificador}. Progreso lote ${
          indice + 1
        } de ${totalLotes}`,
        "green",
        false
      );
      const promesas = [];
      for (const intervencion of lote) {
        if (identificador == "mensajes") {
          const selectorId = intervencion.enlace.replace(
            /.*&highlight=#post/gm,
            ""
          );
          selector = `${this.selectorMensajeIntervencion}${selectorId}`;
        }

        promesas.push(this.buscarContenidoIntervencion(intervencion, selector));
      }
      const resultados = await Promise.all(promesas);
      for (const r of resultados) {
        intervencionesActualizadas.push(r);
      }
      await sleep(this.espera);
    }
    if (identificador == "hilos") {
      this.hilos = intervencionesActualizadas;
    } else {
      this.mensajes = intervencionesActualizadas;
    }
  }

  
  /**
   * Serialización en JSON de la descripción,
   * los hilos creados y los mensajes enviados
   * para su posterior análisis por IA
   */
  serializarDatos() {
    const data = {
      perfil: this.perfil,
      hilos_creados: this.hilos,
      mensajes_enviados: this.mensajes,
    };
    const informeJSON = JSON.stringify(data);
    this.informarProgreso(
      `Informe en formato JSON generado correctamente <pre>${informeJSON}</pre>`,
      "green",
      false
    );
    const blob = new Blob([informeJSON], { type: "application/json" });

    const linkDescarga = document.createElement("a");
    linkDescarga.href = URL.createObjectURL(blob);
    linkDescarga.download = `fc_informe_${this.usuarioId}.json`;
    linkDescarga.click();

    this.informarProgreso("🏆 informe generado correctamente", "green", false);
  }
}

/**
 * Genera el archivo JSON del usuario que debe analizarse para crear el perfil.
 *
 * Se incorpora la descripción junto a su actividad más reciente (últimos 25 hilos, últimos 50 mensajes)
 *
 * @param {number} espera
 * @param {number} simultaneidad
 * @param {string} usuarioId
 * @param {number} limitePagina
 */
async function elaborarPerfil(espera, simultaneidad, usuarioId, limitePagina) {
  const usuarioFC = new UsuarioFC(
    espera,
    simultaneidad,
    usuarioId,
    limitePagina
  );
  await usuarioFC.peticionPaginaPrincipal();
  await usuarioFC.extraerDescripcion();
  await usuarioFC.buscarHilos();
  
  await usuarioFC.buscarMensajes();
  await usuarioFC.extraerIntervencion("hilos");
  await usuarioFC.extraerIntervencion("mensajes");
  usuarioFC.serializarDatos();
}

elaborarPerfil(ESPERA, SIMULTANEIDAD, USUARIOID, PAGINAS);

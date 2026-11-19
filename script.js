// ENLACES OFICIALES DE INCRUSTACIÓN (EMBED) DE GOOGLE MAPS
const mapaIglesia = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2606.618409090871!2d-57.5326091195353!3d-25.2418409797619!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945da5c81c628c3d%3A0x66b5a4693aba3ed2!2sParroquia%20San%20Blas%20Loma%20Pyta!5e1!3m2!1ses!2spy!4v1792506705922!5m2!1ses!2spy" ;
const mapaFiesta = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4383.4059660717185!2d-57.54210544646785!3d-25.25254487186527!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945da5dd2440d111%3A0x51e1afa209c9a3f6!2sQuincho%20Concordia!5e1!3m2!1ses!2spy!4v1792508341324!5m2!1ses!2spy";

// FUNCIONA PARA MOSTRAR LA INVITACIÓN
// FUNCIONA PARA MOSTRAR LA INVITACIÓN E INICIAR MÚSICA EN MÓVILES
// FUNCIONA PARA MOSTRAR LA INVITACIÓN E INICIAR MÚSICA EN MÓVILES

// let sobreAbriendose = false;



function mostrarInvitacion() {
    console.log("Se hizo clic en la portada");

    const portada = document.getElementById('pantallaSobre');
    const invitacion = document.getElementById('tarjetaInvitacion');
    const musica = document.getElementById('musicaBoda');
    const icono = document.getElementById('iconoMusica');

    if (!portada || !invitacion) {
        console.error("No se encontró la portada o la invitación");
        return;
    }

    // Ocultar la portada
    portada.style.display = 'none';

    // Mostrar la invitación
    invitacion.style.display = 'block';

    // Volver al inicio de la página
    window.scrollTo(0, 0);

    // Iniciar la música
    if (musica) {
        musica.volume = 1.0;

        const reproduccion = musica.play();

        if (reproduccion) {
            reproduccion.then(() => {
                console.log("Música iniciada correctamente");

                if (icono) {
                    icono.classList.add('girar');
                    icono.classList.remove('pausado');
                }
            }).catch(error => {
                console.log("El navegador bloqueó la reproducción:", error);
            });
        }
    }
}


//     // Inicia la animación del sobre
//     sobre.classList.add('abriendo');
//     sobre.disabled = true;

//     // Inicia la música desde la interacción del invitado
//     if (musica) {
//         musica.volume = 1.0;

//         const reproduccion = musica.play();

//         if (reproduccion && typeof reproduccion.then === 'function') {
//             reproduccion.then(() => {
//                 if (icono) {
//                     icono.classList.add('girar');
//                     icono.classList.remove('pausado');
//                 }
//             }).catch(() => {
//                 console.log('El navegador no permitió iniciar la música.');
//             });
//         }
//     }

//     // Espera a que termine la apertura
//     const tiempoAnimacion = window.matchMedia(
//         '(prefers-reduced-motion: reduce)'
//     ).matches ? 50 : 1700;

//     setTimeout(() => {
//         pantalla.style.display = 'none';
//         tarjeta.style.display = 'block';
//         tarjeta.scrollIntoView({ block: 'start' });
//     }, tiempoAnimacion);
// }



// FUNCIONES PARA CONTROLAR EL MAPA FLOTANTE INTELIGENTE
function abrirMapa(tipo) {
    const modal = document.getElementById('modalMapa');
    const iframe = document.getElementById('iframeMapa');
    const titulo = document.getElementById('tituloModalMapa');
    
    if (tipo === 'Iglesia') {
        titulo.innerText = " Parroquia San Blas - Loma Pytã";
        iframe.src = mapaIglesia;
    } else if (tipo === 'Fiesta') {
        titulo.innerText = "🥂 Quincho Concordia";
        iframe.src = mapaFiesta;
    }
    
    modal.style.display = 'flex';
}

function cerrarMapa() {
    document.getElementById('modalMapa').style.display = 'none';
    document.getElementById('iframeMapa').src = "";
}


/* CUENTA REGRESIVA DE NUESTRA BODA */

// 13 de febrero de 2027, 18:30 - Paraguay
const fechaBoda = new Date("2027-02-13T18:30:00-03:00").getTime();

function actualizarContador() {
    const ahora = Date.now();
    const distancia = Math.max(0, fechaBoda - ahora);

    const dias = Math.floor(distancia / 86400000);
    const horas = Math.floor((distancia / 3600000) % 24);
    const minutos = Math.floor((distancia / 60000) % 60);
    const segundos = Math.floor((distancia / 1000) % 60);

    const valores = { dias, horas, minutos, segundos };

    Object.entries(valores).forEach(([id, valor]) => {
        const elemento = document.getElementById(id);

        if (elemento) {
            elemento.textContent = String(valor).padStart(2, "0");
        }
    });
}

// Mostrar los números inmediatamente
actualizarContador();

// Actualizar cada segundo
setInterval(actualizarContador, 1000);


// FUNCIÓN PARA REPRODUCIR O PAUSAR CON EL BOTÓN ESTÉTICO
function alternarMusica() {
    const musica = document.getElementById('musicaBoda');
    const icono = document.getElementById('iconoMusica');
    
    if (musica.paused) {
        musica.play();
        icono.classList.remove('pausado');
        icono.innerText = "🎵";
    } else {
        musica.pause();
        icono.classList.add('pausado');
        icono.innerText = "🔇";
    }
}


/* ANIMACIONES DE LAS SECCIONES AL DESPLAZARSE */

function iniciarAnimacionesScroll() {
    const secciones = document.querySelectorAll(
        "#tarjetaInvitacion .seccion"
    );

    if (!("IntersectionObserver" in window)) {
        return;
    }

    const observador = new IntersectionObserver(
        (entradas, observer) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visible");
                    observer.unobserve(entrada.target);
                }
            });
        },
        {
            threshold: 0.08,
            rootMargin: "0px 0px -20px 0px"
        }
    );

    secciones.forEach(seccion => {
        seccion.classList.add("animacion-scroll");
        observador.observe(seccion);
    });
}

document.addEventListener(
    "DOMContentLoaded",
    iniciarAnimacionesScroll
);


/* ABRIR Y CERRAR FOTOGRAFÍAS */



function abrirFoto(ruta) {
    console.log("Se hizo clic en la fotografía:", ruta);

    const visor = document.getElementById('visorFotos');
    const imagen = document.getElementById('fotoAmpliada');

    if (!visor || !imagen) {
        console.error('No se encontró el visor o la imagen.');
        return;
    }

    // Mover el visor fuera de la invitación
    // para que ocupe toda la pantalla
    if (visor.parentElement !== document.body) {
        document.body.appendChild(visor);
    }

    // Comprobar si la fotografía carga correctamente
    imagen.onload = function() {
        console.log('Fotografía cargada correctamente:', ruta);
    };

    imagen.onerror = function() {
        console.error('Error al cargar la fotografía:', ruta);
    };

    // Mostrar la fotografía seleccionada
    imagen.src = ruta;

    // Activar el visor
    visor.classList.add('activo');
    visor.setAttribute('aria-hidden', 'false');

    // Evitar que la página se desplace
    document.body.style.overflow = 'hidden';
}





function cerrarFoto() {
    const visor = document.getElementById('visorFotos');
    const imagen = document.getElementById('fotoAmpliada');

    if (!visor || !imagen) {
        return;
    }

    // Quitar el foco antes de cerrar
    if (visor.contains(document.activeElement)) {
        document.activeElement.blur();
    }

    // Ocultar el visor
    visor.classList.remove('activo');
    visor.setAttribute('aria-hidden', 'true');

    // Detener el manejo de eventos de carga
    imagen.onload = null;
    imagen.onerror = null;

    // Limpiar la fotografía
    imagen.removeAttribute('src');

    // Permitir nuevamente el desplazamiento
    document.body.style.overflow = '';
}



// Cerrar con la tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        cerrarFoto();
    }
});



async function copiarAliasRegalos() {
    const alias = document.getElementById('aliasRegalos');
    const mensaje = document.getElementById('mensajeAlias');

    if (!alias || !mensaje) return;

    try {
        await navigator.clipboard.writeText(alias.textContent.trim());
        mensaje.textContent = '¡Alias copiado!';
    } catch (error) {
        mensaje.textContent = 'No se pudo copiar. Seleccioná el alias manualmente.';
    }
}


// ==================================
// CONFIRMACIÓN POR WHATSAPP
// ==================================

const numeroConfirmacion = "595XXXXXXXXX";

const mensajeConfirmacion =
    "¡Hola! Confirmo mi asistencia a la boda de Tatiana y Juan el 13 de febrero de 2027.";

const botonConfirmacion =
    document.getElementById("botonConfirmacion");

if (botonConfirmacion) {
    botonConfirmacion.href =
        "https://wa.me/" +
        numeroConfirmacion +
        "?text=" +
        encodeURIComponent(mensajeConfirmacion);
}

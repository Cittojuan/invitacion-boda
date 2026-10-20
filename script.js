// ENLACES OFICIALES DE INCRUSTACIÓN (EMBED) DE GOOGLE MAPS
const mapaIglesia = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2606.618409090871!2d-57.5326091195353!3d-25.2418409797619!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945da5c81c628c3d%3A0x66b5a4693aba3ed2!2sParroquia%20San%20Blas%20Loma%20Pyta!5e1!3m2!1ses!2spy!4v1792506705922!5m2!1ses!2spy" ;
const mapaFiesta = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4383.4059660717185!2d-57.54210544646785!3d-25.25254487186527!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945da5dd2440d111%3A0x51e1afa209c9a3f6!2sQuincho%20Concordia!5e1!3m2!1ses!2spy!4v1792508341324!5m2!1ses!2spy";

// FUNCIONA PARA MOSTRAR LA INVITACIÓN
function mostrarInvitacion() {
    document.getElementById('pantallaSobre').style.display = 'none';
    document.getElementById('tarjetaInvitacion').style.display = 'block';
    
    const musica = document.getElementById('musicaBoda');
    if (musica) {
        musica.play().catch(error => console.log("Autoplay interactivo activo."));
    }
}

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

// CUENTA REGRESIVA EXACTA AL 13/02/2027
const fechaBoda = new Date(2027, 1, 13, 18, 0, 0).getTime();
setInterval(function() {
    const ahora = new Date().getTime();
    const distancia = fechaBoda - ahora;

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    if (document.getElementById("dias")) {
        document.getElementById("dias").innerHTML = dias < 10 ? "0" + dias : dias;
        document.getElementById("horas").innerHTML = horas < 10 ? "0" + horas : horas;
        document.getElementById("minutos").innerHTML = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("segundos").innerHTML = segundos < 10 ? "0" + segundos : segundos;
    }
}, 1000);


// Variables y constantes
const ATAQUES = {
    FUEGO: 'FUEGO',
    AGUA: 'AGUA',
    TIERRA: 'TIERRA'
  };
  
  const MASCOTAS = ['Hipodoge', 'Capipepo', 'Ratigueya'];
  
  let estadoJuego = {
    ataqueJugador: null,
    ataqueEnemigo: null,
    vidasJugador: 3,
    vidasEnemigo: 3
  };
  
  // Función para inicializar el juego
  function iniciarJuego() {
    // Ocultar secciones
    document.getElementById("seleccionar-ataque").style.display = 'none';
    document.getElementById("reiniciar").style.display = 'none';
    
    // Asignar eventos directamente a los botones
    document.getElementById("boton-mascota").onclick = seleccionarMascotaJugador;
    document.getElementById("boton-fuego").onclick = function() { seleccionarAtaque(ATAQUES.FUEGO); };
    document.getElementById("boton-agua").onclick = function() { seleccionarAtaque(ATAQUES.AGUA); };
    document.getElementById("boton-tierra").onclick = function() { seleccionarAtaque(ATAQUES.TIERRA); };
    document.getElementById("boton-reiniciar").onclick = reiniciarJuego;
    
    console.log("Juego iniciado correctamente");
  }
  
  // Función para seleccionar ataque
  function seleccionarAtaque(ataque) {
    console.log("Ataque seleccionado:", ataque); // Para depuración
    
    estadoJuego.ataqueJugador = ataque;
    estadoJuego.ataqueEnemigo = MASCOTAS[Math.floor(Math.random() * 3)];
    
    combate();
  }
  
  // Funciones restantes (se mantienen iguales que en tu versión original)
  function seleccionarMascotaJugador() {
    let sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");
    sectionSeleccionarMascota.style.display = "none";
  
    let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
    sectionSeleccionarAtaque.style.display = "flex";
  
    let hipodogeSeleccionado = document.getElementById("hipodoge").checked;
    let capipepoSeleccionado = document.getElementById("capipepo").checked;
    let ratigueyaSeleccionado = document.getElementById("ratigueya").checked;
  
    let spanMascotaJugador = document.getElementById("mascota-jugador");
  
    if (hipodogeSeleccionado) {
      spanMascotaJugador.innerHTML = "Hipodoge";
    } else if(capipepoSeleccionado) {
      spanMascotaJugador.innerHTML = "Capipepo";
    } else if(ratigueyaSeleccionado) {
      spanMascotaJugador.innerHTML = "Ratigueya";
    } else {
      alert("Debes seleccionar una Mascota");
      sectionSeleccionarMascota.style.display = "flex";
      sectionSeleccionarAtaque.style.display = "none";
      return;
    }
  
    seleccionarMascotaEnemigo();
  }
  
  function seleccionarMascotaEnemigo() {
    let mascotaAleatorio = Math.floor(Math.random() * 3);
    let spanMascotaEnemigo = document.getElementById("mascota-enemigo");
  
    spanMascotaEnemigo.innerHTML = MASCOTAS[mascotaAleatorio];
  }
  
  function combate() {
    let spanVidasJugador = document.getElementById("vidas-jugador");
    let spanVidasEnemigo = document.getElementById("vidas-enemigo");
  
    if(estadoJuego.ataqueEnemigo == estadoJuego.ataqueJugador) {
      crearMensaje("EMPATE");
    } else if(
      (estadoJuego.ataqueJugador == ATAQUES.FUEGO && estadoJuego.ataqueEnemigo == "Tierra") ||
      (estadoJuego.ataqueJugador == ATAQUES.AGUA && estadoJuego.ataqueEnemigo == "Fuego") ||
      (estadoJuego.ataqueJugador == ATAQUES.TIERRA && estadoJuego.ataqueEnemigo == "Agua")
    ) {
      crearMensaje("GANASTE");
      estadoJuego.vidasEnemigo--;
      spanVidasEnemigo.innerHTML = estadoJuego.vidasEnemigo;
    } else {
      crearMensaje("PERDISTE");
      estadoJuego.vidasJugador--;
      spanVidasJugador.innerHTML = estadoJuego.vidasJugador;
    }
  
    revisarVidas();
  }
  
  function revisarVidas() {
    if(estadoJuego.vidasEnemigo == 0) {
      crearMensajeFinal("FELICITACIONES GANASTE");
    } else if(estadoJuego.vidasJugador == 0) {
      crearMensajeFinal("LO SIENTO PERDISTE");
    }
  }
  
  function crearMensaje(resultado) {
    let sectionMensajes = document.getElementById("resultado");
    let ataquesDelJugador = document.getElementById("ataques-del-jugador");
    let ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");
  
    sectionMensajes.innerHTML = resultado;
    ataquesDelJugador.innerHTML = estadoJuego.ataqueJugador;
    ataquesDelEnemigo.innerHTML = estadoJuego.ataqueEnemigo;
  }
  
  function crearMensajeFinal(resultadoFinal) {
    let sectionMensajes = document.getElementById("resultado");
    sectionMensajes.innerHTML = resultadoFinal;
  
    document.getElementById("boton-fuego").disabled = true;
    document.getElementById("boton-agua").disabled = true;
    document.getElementById("boton-tierra").disabled = true;
  
    document.getElementById("reiniciar").style.display = "block";
  }
  
  function reiniciarJuego() {
    location.reload();
  }
  
  // Iniciar el juego cuando el DOM esté listo
  document.addEventListener("DOMContentLoaded", iniciarJuego);
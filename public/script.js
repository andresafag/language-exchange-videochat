// Inicialización del efecto de texto dinámico
var typed = new Typed('#typed-text', {
  strings: ['English', 'Hindi', 'Chinese', 'Spanish', 'French'],
  typeSpeed: 80,
  backSpeed: 50,
  backDelay: 1500,
  loop: true,
  showCursor: true,
  cursorChar: '|'
});

// Variables globales para controlar el estado del modal
let salaSeleccionada = null;
const modal = document.getElementById('nameModal');
const inputNombre = document.getElementById('userInput');

function abrirModal(id) {
  salaSeleccionada = id;
  modal.classList.add('active');
  inputNombre.focus();
}

function cerrarModal() {
  modal.classList.remove('active');
  inputNombre.value = "";
  salaSeleccionada = null;
}

function confirmarIngreso() {
  const nombre = inputNombre.value.trim();
  
  if (!nombre) {
    alert("Por favor, escribe un nombre antes de continuar.");
    return;
  }

  // Guardamos en sessionStorage por si lo necesitas en el front de la sala
  sessionStorage.setItem('userName', nombre);
  
  // Redirección segura adjuntando el parámetro a tu Express en app.js
  window.location.href = `/sala/${salaSeleccionada}?name=${encodeURIComponent(nombre)}`;
}

// Permite al usuario enviar el formulario presionando 'Enter'
inputNombre.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    confirmarIngreso();
  }
});

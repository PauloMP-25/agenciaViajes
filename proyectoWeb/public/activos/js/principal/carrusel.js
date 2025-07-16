// =============================
// carrusel.js (modularizado)
// Controla el carrusel de imágenes
// =============================
export function iniciarCarrusel() {
  const slides = document.querySelectorAll(".slide");
  let currentIndex = 0;
  let intervalo;

  if (slides.length === 0) return; // No hay slides, no hace nada

  // Muestra el slide actual y oculta los demás
  function mostrarSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  // Cambia manualmente al siguiente o anterior slide
  function cambiarSlide(n) {
    currentIndex = (currentIndex + n + slides.length) % slides.length;
    mostrarSlide(currentIndex);
    reiniciarAuto(); // Reinicia el temporizador si el usuario interactúa
  }

  // Cambia automáticamente al siguiente slide cada 5 segundos
  function autoSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    mostrarSlide(currentIndex);
  }

  // Reinicia el temporizador del autoSlide
  function reiniciarAuto() {
    clearInterval(intervalo); // Detiene el intervalo actual
    intervalo = setInterval(autoSlide, 5000); // Lo reinicia
  }

  // Inicializa el carrusel
  mostrarSlide(currentIndex); // Muestra el primer slide
  intervalo = setInterval(autoSlide, 5000); // Empieza el cambio automático

  // Hace la función cambiarSlide accesible desde botones en HTML
  window.cambiarSlide = cambiarSlide;
}

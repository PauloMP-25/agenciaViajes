// public/activos/js/global/navbar.js

//CARGA EL DOOM
document.addEventListener("DOMContentLoaded", function () {
  cargarHeaderPorRol();  // Carga el header según el rol del usuario
  cargarFooter();        // Carga el footer general
});

/* ============================
    Cargar Header según rol
============================ */
function cargarHeaderPorRol() {
  const rol = localStorage.getItem("rol") || "publico"; // Default: público
  let rutaHeader = "/componentes/header.html";

  if (rol === "admin") {
    rutaHeader = "/componentes/headerAdmin.html"; // Header para administradores
  }

  fetch(rutaHeader)
    .then(response => response.text())
    .then(data => {
      document.getElementById("navbar").innerHTML = data;
      activarMenuDesplegable();     // Lógica de menú desplegable
      resaltarEnlaceActivo();       // Resalta la página activa
    })
    .catch(err => console.error("❌ Error al cargar el header:", err));
}

/* ============================
   Cargar Footer común
============================ */
function cargarFooter() {
  fetch("/componentes/footer.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;
    })
    .catch(err => console.error("❌ Error al cargar el footer:", err));
}

/* ============================
  Menú hamburguesa (responsive)
============================ */
function activarMenuDesplegable() {
  const toggleBtn = document.querySelector(".menu-toggle");
  const menu = document.getElementById("encabezadoMenu");

  if (toggleBtn && menu) {
    toggleBtn.addEventListener("click", () => {
      menu.classList.toggle("active");
    });

    // Cierra el menú al hacer clic en cualquier enlace
    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("active");
      });
    });
  }
}

/* ============================
  Resaltar el enlace activo del navbar
============================ */
function resaltarEnlaceActivo() {
  const links = document.querySelectorAll(".encabezado-links a");
  const rutaActual = window.location.pathname.split("/").pop();

  links.forEach(link => {
    const href = link.getAttribute("href").split("/").pop();
    if (rutaActual === href) {
      link.classList.add("activo"); // Le pone la clase 'activo' al enlace actual
    }
  });
}

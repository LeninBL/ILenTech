const abrirMenu = document.getElementById("abrir");
const cerrarMenu = document.getElementById("cerrar");
const nav = document.getElementById("nav");
const body = document.body;
const overlay = document.createElement("div"); // Creamos un overlay

// Establecemos una clase para el overlay
overlay.classList.add("overlay");

// Añadimos el overlay al body cuando el menú se abre
abrirMenu.addEventListener("click", () => {
  nav.classList.add("visible");
  body.appendChild(overlay); // Agregamos el overlay al body
});

// Cuando el menú se cierra, eliminamos el overlay
cerrarMenu.addEventListener("click", () => {
  nav.classList.remove("visible");
  body.removeChild(overlay); // Removemos el overlay
});

// Cerrar el menú si se hace clic en el overlay
overlay.addEventListener("click", () => {
  nav.classList.remove("visible");
  body.removeChild(overlay); // Eliminar el overlay
});

// Cuando el tamaño de la ventana cambia, reiniciamos el estado
window.addEventListener("resize", () => {
  // Si la ventana es más ancha que 991
  if (window.innerWidth > 991) {
    // Aseguramos que el menú esté oculto y el overlay eliminado cuando se pase a vista grande
    nav.classList.remove("visible");
    if (body.contains(overlay)) {
      body.removeChild(overlay);
    }
  }
});
//-----------------------------------------------PARA QUE CAMBIE DE COLOR EL HEADER SELECCIONADO Y CAMBIAR DE SECCION------------------------------------

function presentarSeccion(sectionId) {
  // Ocultar todas las secciones
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => (section.style.display = "none"));

  // Mostrar la sección seleccionada
  document.getElementById(sectionId).style.display = "block";
    // Eliminar la clase 'active' de todos los enlaces
  const enlaces = document.querySelectorAll("nav a");
  enlaces.forEach((enlace) => enlace.classList.remove("active"));

  // Añadir la clase 'active' al enlace correspondiente
  const enlaceActivo = document.querySelector(`a[href="#${sectionId}"]`);
  if (enlaceActivo) {
    enlaceActivo.classList.add("active");
  }
}
// -------------------------------------Para mostrar la sección de inicio por defecto cada vez que se cargue la página---------------------------------------
document.addEventListener("DOMContentLoaded", function (sectionId) {
  presentarSeccion("home");

    // Asegurar que el modal esté oculto al cargar la página
    modal.style.display = "none";
  // Eliminar la clase 'active' de todos los enlaces

  const enlaces = document.querySelectorAll("nav a");
  enlaces.forEach((enlace) => enlace.classList.remove("active"));

  // Añadir la clase 'active' al enlace correspondiente
  const enlaceActivo = document.querySelector(`a[href="#${sectionId}"]`);
  if (enlaceActivo) {
    enlaceActivo.classList.add("active");
  }
});

//---------------------------------------------------------------PARA LOS CERTIFICADOS-----------------------------------------------
// Seleccionar elementos
const miniaturas = document.querySelectorAll('.miniatura');
const modal = document.createElement('div');
modal.classList.add('modal');
document.body.appendChild(modal);


// Crear imagen dentro del modal
const modalImg = document.createElement('img');
modal.appendChild(modalImg);

// Crear botón de cerrar
const closeBtn = document.createElement('span');
closeBtn.innerHTML = '&times;';
closeBtn.classList.add('close');
modal.appendChild(closeBtn);

// Evento para abrir modal al hacer clic en una miniatura
miniaturas.forEach(img => {
    img.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImg.src = img.src;
    });
});

// Cerrar modal al hacer clic en el botón
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Cerrar modal si se hace clic fuera de la imagen
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

/*-------------------------------------------------------------------------Cambio de Flechas-----------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", function () {
  const contenedor = document.querySelector(".contenedor-functions");
  const textos = contenedor.querySelectorAll(".divTextoServicios");
  const btnIzq = document.querySelector(".flecha-izq");
  const btnDer = document.querySelector(".flecha-der");
  let indiceActual = 0;

  function mostrarTexto(indice) {
      textos.forEach((texto, i) => {
          texto.classList.remove("active");
          if (i === indice) {
              texto.classList.add("active");
          }
      });
  }

  // Inicializa mostrando el primer div
  mostrarTexto(indiceActual);

  // Evento para cambiar al siguiente
  btnDer.addEventListener("click", function () {
      indiceActual = (indiceActual + 1) % textos.length;
      mostrarTexto(indiceActual);
  });

  // Evento para cambiar al anterior
  btnIzq.addEventListener("click", function () {
      indiceActual = (indiceActual - 1 + textos.length) % textos.length;
      mostrarTexto(indiceActual);
  });
});





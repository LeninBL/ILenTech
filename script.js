// Autor: ILenTech
// -------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------PARA EL MENU HAMBURGUESA-------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------
const abrirMenu = document.getElementById("abrir");
const cerrarMenu = document.getElementById("cerrar");
const nav = document.getElementById("nav");
const body = document.body;
const overlay = document.createElement("div"); // Creamos un overlay para poner la pagina en gris cuando se abre el menú

// Establecemos una clase para el overlay
overlay.classList.add("overlay"); //poner nombre de clase para el overlay en css

// Añadimos el overlay al body cuando el menú se abre
abrirMenu.addEventListener("click", () => {
  nav.classList.add("visible"); // Esto sirve para agregar una clase mas al nav
  body.appendChild(overlay); // Agregamos el overlay al body
});

// Cuando el menú se cierra, eliminamos el overlay
cerrarMenu.addEventListener("click", () => {
  nav.classList.remove("visible"); // Esto sirve para quitar la clase al nav
  body.removeChild(overlay); // Removemos el overlay
});

// Cerrar el menú si se hace clic en el overlay
overlay.addEventListener("click", () => {
  nav.classList.remove("visible"); // Quitar la clase al nav
  body.removeChild(overlay); // Eliminar el overlay
});

// Cuando el tamaño de la ventana cambia, reiniciamos el estado
window.addEventListener("resize", () => {
  // Cuando se redimensiona la ventana, resize sirve para detectar el cambio de tamaño
  // Si la ventana es más ancha que 991
  if (window.innerWidth > 991) {
    // Aseguramos que el menú esté oculto y el overlay eliminado cuando se pase a vista grande
    nav.classList.remove("visible");
    if (body.contains(overlay)) {
      // Si el body contiene el overlay lo eliminamos, siempre y cuando la ventana sea mas grande que 991
      body.removeChild(overlay);
    }
  }
});
// ------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------PARA QUE CAMBIE DE COLOR EL HEADER SELECCIONADO Y CAMBIAR DE SECCION------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------------------------

function presentarSeccion(sectionId) {
  
  // esta funcion sirve para mostrar la seccion seleccionada, es decir, la que se le pase como parametro en la funcion el id de la seccion
  // Ocultar todas las secciones
  const sections = document.querySelectorAll(".section"); // Seleccionamos todas las secciones
  sections.forEach((section) => {
    section.classList.remove("visible");  // Eliminar la clase 'visible' de todas las secciones
    section.style.display = "none";
  });

  // Mostrar la sección seleccionada
  const selectedSection = document.getElementById(sectionId);
  if (selectedSection) {
    selectedSection.classList.add("visible");  // Añadir la clase 'visible' para mostrarla con transición
    selectedSection.style.display = "block"; 
  }

  // Eliminar la clase 'active' de todos los enlaces
  const enlaces = document.querySelectorAll(".header__nav-link");
  enlaces.forEach((enlace) => enlace.classList.remove("active")); // Recorremos todos los enlaces y eliminamos la clase active

  // Añadir la clase 'active' al enlace correspondiente
  const enlaceActivo = document.querySelector(`a[href="#${sectionId}"]`); // Seleccionamos el enlace que tenga el href(ruta de enlace) con el id de la seccion seleccionada
  if (enlaceActivo) {
    // Si el enlace activo existe, le agregamos la clase active
    enlaceActivo.classList.add("active"); // Agregamos la clase active al enlace activo, servira para cambiar de color el header seleccionado
  }

    // Actualizar el hash de la URL para reflejar la sección mostrada
    window.location.hash = `#${sectionId}`;
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------PARA LOS CERTIFICADOS---------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------

// Seleccionar elementos
const miniaturas = document.querySelectorAll(".about__thumbnail");
// Crear elemento div con clase 'modal', luego agregarlo al body
// El modal contendrá la imagen y el botón de cerrar en tamaño panalla completa
const modal = document.createElement("div");
modal.classList.add("modal");
document.body.appendChild(modal);

// Crear imagen y agregarla al modal
const modalImg = document.createElement("img");
modal.appendChild(modalImg);

// Crear botón de cerrar y agregarlo al modal
const closeBtn = document.createElement("span");
closeBtn.innerHTML = "&times;"; // Agregar una X al botón
closeBtn.classList.add("close"); // Agregar clase 'close' al botón
modal.appendChild(closeBtn); // Agregar el botón al modal

// Evento para abrir modal al hacer clic en una miniatura imagen
miniaturas.forEach((img) => {
  img.addEventListener("click", () => {
    // Cuando se hace clic en cada imagen miniatura se abre el modal en pantalla completa
    modal.style.display="flex"
    modal.style.visibility = 'visible'; // Hacer visible el modal si es necesario
    modal.style.opacity = 1;  // Hacerlo visible
    modalImg.src = img.src; // EL src CONTIENE LA RUTA DE LA IMAGEN, por lo que se le asigna la ruta de la imagen seleccionada al modal para mostrar en tamaño pantalla completa
  });
});

// Cerrar modal al hacer clic en el botón
closeBtn.addEventListener("click", () => {
  modal.style.visibility = 'hidden';
  modal.style.opacity = 0;  
  modal.style.display = "none";
});

// Cerrar modal si se hace clic fuera de la imagen
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    // Si el objetivo del evento es el modal, se cierra el modal
    modal.style.visibility = 'hidden';
    modal.style.opacity = 0;  
    modal.style.display = "none";
  }
});

// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------Para mostrar la sección de inicio por defecto cada vez que se cargue la página---------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
   // Asegurar que el modal esté oculto al cargar la página
   modal.style.visibility = 'hidden';
   modal.style.opacity = 0;  
   modal.style.display = "none";
  // Eliminar la clase 'active' de todos los enlaces al cargar la página
  const enlaces = document.querySelectorAll(".header__nav-link");
  enlaces.forEach((enlace) => enlace.classList.remove("active"));
  // Verifica el hash de la URL y llama a la función correspondiente
  const hash = window.location.hash.substring(1); // Obtener el hash sin el '#'
  
  // Si hay un hash, mostramos la sección correspondiente
  if (hash) {
    presentarSeccion(hash);
  } else {
    // Si no hay hash, mostramos la sección de inicio por defecto
    presentarSeccion("home");
  }



  // Si hay un hash, aseguramos que el enlace correspondiente tenga la clase 'active'
  if (hash) {
    const enlaceActivo = document.querySelector(`.header__nav-link[href="#${hash}"]`);
    if (enlaceActivo) {
      enlaceActivo.classList.add("active");
    }
  }
});

// ----------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------Cambio de Flechas-----------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Seleccionar elementos
  const contenedor = document.querySelector(".functions__container");
  const textos = contenedor.querySelectorAll(".functions__text");
  const btnIzq = document.querySelector(".functions__arrow--left");
  const btnDer = document.querySelector(".functions__arrow--right");
  // establecer el indice actual, nos servira para saber en que div estamos
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
    indiceActual = (indiceActual + 1) % textos.length; // ESTO AYUDA A UBICAR EL INDICE EN EL DIV SIGUIENTE(MODULO DE RESIDUO)
    mostrarTexto(indiceActual);
  });

  // Evento para cambiar al anterior
  btnIzq.addEventListener("click", function () {
    indiceActual = (indiceActual - 1 + textos.length) % textos.length;
    mostrarTexto(indiceActual);
  });
});

// ----------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------Contacto-----------------------------------------------------------------
document.getElementById("contact-form").addEventListener("submit", function (event) { 
  event.preventDefault(); // Evita el envío estándar

  const form = this;
  const formData = new FormData(form);
  const honeypotField = document.querySelector("input[name='_honey']");
  const inputs = form.querySelectorAll("input, textarea, button");

  // Validación de honeypot
  if (honeypotField.value) {
      alert("Formulario rechazado debido a un bot detectado.");
      return;
  }

  // Deshabilitar los campos mientras se envía el formulario
  inputs.forEach((input) => (input.disabled = true));

  // Enviar formulario con fetch a FormSubmit
  fetch("https://formsubmit.co/ajax/dany20bl69@gmail.com", {
      method: "POST",
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          alert("✅ ¡Mensaje enviado con éxito!");
          form.reset();
      } else {
          alert("❌ Error al enviar el mensaje.");
      }
  })
  .catch(error => {
      console.error("Error:", error);
      alert("❌ Hubo un problema al enviar el mensaje.");
  })
  .finally(() => {
      // Habilitar los campos nuevamente
      inputs.forEach((input) => (input.disabled = false));
  });
});



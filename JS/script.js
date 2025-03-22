class AgregarTarea1{

  constructor(Titulo,Descripcion,contador){
    this.title = Titulo;
    this.description = Descripcion;
    this.contador = contador;
  }

  crearTarea(){
      return `
      <div class="contenedores"> 
        <input class="nota" type="text" placeholder="Titulo..." required value="${this.title}">
  
      </div>
      
      <div class="contenedores"> 
        <textarea class="nota text1" placeholder="Descripción..." required>${this.description}</textarea>
  
      </div>
  
      <div class="contenedores btn_options">
        <button class="delete_note${this.contador} btn-delete">Eliminar</button>
        <label class="check1"> Completado:<input class="comprobador" type="checkbox"> </label>
      </div>`;

  }

}

const contenedorPadreT = document.querySelector(".contenedorPadreTotal");
// Funcionalidad "Crear nueva tarea".
const agregarTareaFuncion = (contador) => {

  const titulo = document.getElementById("input0").value;
  const texto = document.getElementById("input1").value;

  if(titulo.length == "" || texto.length == ""){
    
    alert("Ingresa valores en los dos campos.");

  } else{
  const crearTarea1 = document.createElement("DIV");
  crearTarea1.classList.add("item_tarea");

  const nuevaTarea = new AgregarTarea1(titulo,texto,contador);

  crearTarea1.innerHTML = nuevaTarea.crearTarea();

  contenedorPadreT.appendChild(crearTarea1);

  console.log(contenedorPadreT.outerHTML);

  // Guardandolo en el navegador

  localStorage.setItem("TareasGuardadas123",contenedorPadreT.innerHTML)
  }
  
}

// Activador para que funcione la funcionalidad "crear tarea".
const agregarTarea = document.getElementById("input2");
let contadorTareasCreadas = 0;
agregarTarea.addEventListener("click",() => {

  contadorTareasCreadas++;
  agregarTareaFuncion(contadorTareasCreadas);
  NotasPendientes();

})


let tareasCompletadas = 0;

// Funciolidad Eliminar:
const EliminarNota1 = (evento) => {
  const check1 = evento.target.nextElementSibling.children[0];
  if(check1.checked){
    tareasCompletadas--;
  }
  const tareaEliminar = evento.target.parentElement.parentElement;

  contadorTareasCreadas--;
  tareaEliminar.remove();
  NotasPendientes();

  localStorage.setItem("TareasGuardadas123",contenedorPadreT.innerHTML)
}

// Funcionalidad tarea Completada
const tareaCompletada = (evento) => {
  if(evento.target.checked){
    tareasCompletadas++;
    evento.target.parentElement.parentElement.parentElement.classList.add("completado2");
    evento.target.classList.add("completado");
    NotasPendientes();
  } else if(!evento.target.checked){
    tareasCompletadas--;
    evento.target.parentElement.parentElement.parentElement.classList.remove("completado2");
    evento.target.classList.remove("completado");
    NotasPendientes();
  }
}

// Contenedor padre total(donde se almacenan todas las tareas)
const contenedor = document.querySelector(".contenedorPadreTotal");

// Activador de tareaCompletada y EliminarNota
contenedor.addEventListener("click",(evento) => {

  // Verifica si el evento viene del boton con clase "btn-delete"
  if(evento.target.classList.contains("btn-delete")){
    EliminarNota1(evento);
  }

  // Para ver si la tarea esta completada
  if(evento.target.classList.contains("comprobador")){
    tareaCompletada(evento)
  }

})

// Funcionalidad "Contador de notas pendientes"
const contadorTareasPendiente = document.querySelector(".contadorTareasPendientes");
const NotasPendientes = () => {
  const contenedorPadreT = document.querySelector(".contenedorPadreTotal");
  let contador = 0;
  contador = contenedorPadreT.childElementCount - tareasCompletadas;
  contadorTareasPendiente.innerHTML = `Tareas pendientes: ${contador}`;

  localStorage.setItem("contadorGuardado12",contadorTareasPendiente.innerHTML)  

} 

//Funcionalidad de filtro
const Filtro = () => {

  const selector = btnFiltro.previousElementSibling.value;
  console.log(selector);

  // Linea 98, esta el selector del contenedor padre total

  // Seleccion de todos las tareas.
  let notas = contenedor.childNodes;
  console.log(notas);

  if(selector == "Completadas"){

    for(const nt of notas){
      nt.classList.remove("desaparecer");

      if(!nt.classList.contains("completado2")){

          nt.classList.add("desaparecer")
        
      }
    }

  } else if(selector == "Pendientes"){

    for(const nt of notas){
      nt.classList.remove("desaparecer");

      if(nt.classList.contains("completado2")){
        nt.classList.add("desaparecer");
      }
    }

  } else if(selector == "N/A"){

    for(const nt of notas){
      nt.classList.remove("desaparecer");
    }

  }

}

// Activador del filtro
const btnFiltro = document.querySelector(".iniciarBusqueda");

btnFiltro.addEventListener("click",() => {

  Filtro()

})

// Recuperando el progreso con localStorage

const tareaGuardadas = localStorage.getItem("TareasGuardadas123");
// localStorage.clear();
contenedor.innerHTML = tareaGuardadas;

const contadorGuardado = localStorage.getItem("contadorGuardado12");
contadorTareasPendiente.innerHTML = contadorGuardado

//Validaciones para inputs
var fecha = new Date();
document.getElementById('fecha_ini').max = fecha.toISOString().split('T')[0];

var VEstudiante = document.getElementById('VEstudiante');
var VProfesor = document.getElementById('VProfesor');
var datosDeestudiante = document.getElementById('datosDeestudiante');
var datosProfesor = document.getElementById('datosProfesor');
var inputTipoPersona = null;
var inputDatoPersona = null;

VEstudiante.addEventListener('input', (e) => {
    inputTipoPersona = VEstudiante;
    inputDatoPersona = document.getElementById('semestre');
    datosDeestudiante.classList.remove('hidden');
    datosProfesor.classList.add('hidden');
});

VProfesor.addEventListener('input', (e)=>{
    inputTipoPersona = VProfesor;
    inputDatoPersona = document.getElementById('tipo_profesor');
    datosDeestudiante.classList.add('hidden');
    datosProfesor.classList.remove('hidden');
});

//Validación para registro
function verificarNombre(nombre){
    let especiales = String(".-,_<>#$%&/@=+*?¡¿?!{}[]\\|\"'`~`×¥¥¥´¶öµ;:ü®åäßð©æ¾");
    for(let i=0;i<especiales.length;i++){
    if (nombre.indexOf(especiales.charAt(i))!=-1) {
        return true;
    }
  }
  return false;
}

var inputNombre = document.getElementById('nombre');
var spanErrorNombre = document.getElementById('errorNombre');
function validarNombre(){
    if(verificarNombre(inputNombre.value)){
        spanErrorNombre.classList.remove('hidden');
        return false;
    } else {
        spanErrorNombre.classList.add('hidden');
        return true;
    }
}

var inputResponsable = document.getElementById('responsable');
var spanErrorResponsable = document.getElementById('errorResponsable');
function validarResponsable(){
    if(verificarNombre(inputResponsable.value)){
        spanErrorResponsable.classList.remove('hidden');
        return false;
    } else {
        spanErrorResponsable.classList.add('hidden');
        return true;
    }
}

var inputPresupuesto = document.getElementById('presupuesto');
function validarPresupuesto(){
    let error = document.getElementById('errorPresupuesto');
    let estado = false;
    if(inputPresupuesto.value<10000000){
        error.classList.remove('hidden');
        error.innerText = 'El presupuesto es menor de $10.000.000';
    } else if(inputPresupuesto.value>50000000){
        error.classList.remove('hidden');
        error.innerText = 'El presupuesto es mayor a $50.000.000';
    } else {
        error.classList.add('hidden');
        estado = true;
    }
    return estado;
}

//Creación del objeto y Array
misProyectos = [];
var ubicacion = 0;

//Registrar proyecto
var inputCodigo = document.getElementById('codigo');
var inputTipo = document.getElementById('tipo');
var inputFechaIni = document.getElementById('fecha_ini');
var inputFechaFin = document.getElementById('fecha_fin');

function contarDias(pos){
    let inicio = new Date(misProyectos[pos].fechaInicio);
    let fin = new Date(misProyectos[pos].fechaFin)
    let diasDif = fin.getTime()-inicio.getTime();
    console.log(diasDif);
    // 1 día = 24 horas, 1 hora = 60 min, 1 min = 60 seg, 1 seg = 1000ms
    return Math.round(diasDif/(1000*60*60*24))
}


function listarProyectos(){
    let texto = "";
    for (i in misProyectos) {
        texto += `
            <tr class="odd:bg-white even:bg-slate-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    ${misProyectos[i].nom}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    ${misProyectos[i].responsable}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    ${misProyectos[i].fechaInicio}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    ${misProyectos[i].fechaFin}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    ${contarDias(i)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">                                    
                    <input type="button" onclick="editar(${i})" value="Editar" class="cursor-pointer bg-green-600 text-green-200 text-sm p-1 border border-green-800">
                    <input type="button" onclick="eliminar(${i})" value="Eliminar" class="cursor-pointer bg-red-600 text-red-200 text-sm p-1 border border-red-800">
                    <input type="button" onclick="mostrar(${i})" value="Vista Rápida" class="cursor-pointer bg-yellow-600 text-yellow-200 text-sm p-1 border border-yellow-800">
                </td>
            </tr>
        `
    }

    document.getElementById('cuerpo').innerHTML = texto;
}

function limpiar(){
        inputCodigo.value = "";
        inputNombre.value = "";
        inputTipo.value = "";
        inputFechaIni.value = "";
        inputFechaFin.value = "";
        inputResponsable.value = "";
        inputPresupuesto.value = "";
        inputTipoPersona.value = "";
        inputDatoPersona.value = "";
}

function agregarProyecto() {
    persona = {
        cod: '',
        nom: '',
        tipo: '',
        fechaInicio: '',
        fechaFin: '',
        responsable: '',
        presupuesto: 0,
        tipo_persona: '',
        dato_persona: ''
    }
    if(validarNombre() && validarResponsable() && validarPresupuesto()){
        persona.cod = inputCodigo.value;
        persona.nom = inputNombre.value;
        persona.tipo = inputTipo.value;
        persona.fechaInicio = inputFechaIni.value;
        persona.fechaFin = inputFechaFin.value;
        persona.responsable = inputResponsable.value;
        persona.presupuesto = inputPresupuesto.value;
        persona.tipo_persona = inputTipoPersona.value;
        persona.dato_persona = inputDatoPersona.value;
        misProyectos.push(persona);
        listarProyectos();
        limpiar();
        alert('Proyecto registrado correctamente.')
    }
}
var btnAgregar = document.getElementById("btnAgregar");
btnAgregar.addEventListener('click', agregarProyecto);

var btnActualizar = document.getElementById("btnActualizar");
function editar(pos){
    ubicacion = pos;
    inputCodigo.value = misProyectos[pos].cod;
    inputNombre.value = misProyectos[pos].nom;
    inputTipo.value = misProyectos[pos].tipo;
    inputFechaIni.value = misProyectos[pos].fechaInicio;
    inputFechaFin.value = misProyectos[pos].fechaFin;
    inputResponsable.value = misProyectos[pos].responsable;
    inputPresupuesto.value = misProyectos[pos].presupuesto;
    inputTipoPersona.value = misProyectos[pos].tipo_persona;
    inputDatoPersona.value = misProyectos[pos].dato_persona;
    btnActualizar.classList.remove('hidden');
    btnAgregar.classList.add('hidden');
}

function actualizarDatos(){
    misProyectos[ubicacion].cod = inputCodigo.value;
    misProyectos[ubicacion].nom = inputNombre.value;
    misProyectos[ubicacion].tipo = inputTipo.value;
    misProyectos[ubicacion].fechaInicio = inputFechaIni.value;
    misProyectos[ubicacion].fechaFin = inputFechaFin.value;
    misProyectos[ubicacion].responsable = inputResponsable.value;
    misProyectos[ubicacion].presupuesto = inputPresupuesto.value;
    misProyectos[ubicacion].tipo_persona = inputTipoPersona.value;
    misProyectos[ubicacion].dato_persona = inputDatoPersona.value;
    btnActualizar.classList.add('hidden');
    btnAgregar.classList.remove('hidden');
    listarProyectos();
    limpiar();
}
btnActualizar.addEventListener('click', actualizarDatos);

function eliminar(pos){
    misProyectos.splice(pos, 1);
    listarProyectos();
}

function mostrar(pos){
    let texto = `
        Código: ${misProyectos[pos].cod}
        Nombre: ${misProyectos[pos].nom}
        Tipo: ${misProyectos[pos].tipo}
        Fecha Inicio: ${misProyectos[pos].fechaInicio}
        Fecha Fin: ${misProyectos[pos].fechaFin}
        Responsable: ${misProyectos[pos].responsable}
        Presupuesto: ${misProyectos[pos].presupuesto}
        Tipo persona: ${misProyectos[pos].tipo_persona}
    `;
    if(misProyectos[pos].tipo_persona=="estudiante"){
        texto += '   Semestre: '+ misProyectos[pos].dato_persona;
    } else {
        texto += '   Tipo profesor: '+ misProyectos[pos].dato_persona;
    }

    alert(texto);
}
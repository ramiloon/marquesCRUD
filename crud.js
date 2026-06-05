let listaInscripciones = []
let indiceEdicion = null

const campoNombrePersona = document.getElementById('nombrePersona')
const campoActividadSeleccionada = document.getElementById('actividadSeleccionada')
const botonGuardar = document.getElementById('botonGuardar')
const cuerpoTablaInscripciones = document.getElementById('cuerpoTablaInscripciones')

botonGuardar.addEventListener('click', guardarInscripcion)

function guardarInscripcion(){
    const nombrePersona = campoNombrePersona.value.trim() 
    const actividadSeleccionada = campoActividadSeleccionada.value
    const turnoMarcado = document.querySelector('input[name="turnoActividad"]:checked')

    if(nombrePersona === "" || actividadSeleccionada === "" || !turnoMarcado){
        alert("Debes completar todos los campos")
        return
    }

    const nuevaInscripcion = {
        nombre: nombrePersona,
        actividad: actividadSeleccionada,
        turno: turnoMarcado.value
    }

    listaInscripciones.push(nuevaInscripcion)
    mostrarInscripciones()
    limpiarFormulario()
}

function mostrarInscripciones(){
    cuerpoTablaInscripciones.innerHTML = ""

    listaInscripciones.forEach((inscripcion, index) => {
        cuerpoTablaInscripciones.innerHTML += `
            <tr>
                <td>${inscripcion.nombre}</td>
                <td>${inscripcion.actividad}</td>
                <td>${inscripcion.turno}</td>
                <td>
                    <button onclick="editarInscripcion(${index})">Editar</button>
                    <button onclick="eliminarInscripcion(${index})">Eliminar</button>
                </td>
            </tr>
        `
    })
}

function limpiarFormulario(){
    campoNombrePersona.value = ""
    campoActividadSeleccionada.value = ""
    document.querySelectorAll('input[name="turnoActividad"]').forEach(radio => radio.checked = false)
}

function eliminarInscripcion(index){
    listaInscripciones.splice(index, 1)
    mostrarInscripciones()
    limpiarFormulario()
}

function editarInscripcion(index){
    const inscripcion = listaInscripciones[index]

    campoNombrePersona.value = inscripcion.nombre
    campoActividadSeleccionada.value = inscripcion.actividad

    const turnoRadio = document.querySelector(`input[name="turnoActividad"][value="${inscripcion.turno}"]`)
    if(turnoRadio){
        turnoRadio.checked = true
    }

    indiceEdicion = index
    botonGuardar.textContent = "Actualizar Inscripción"

    botonGuardar.removeEventListener('click', guardarInscripcion)
    botonGuardar.addEventListener('click', actualizarInscripcion)
}

function actualizarInscripcion(){
    const nombrePersona = campoNombrePersona.value.trim() 
    const actividadSeleccionada = campoActividadSeleccionada.value
    const turnoMarcado = document.querySelector('input[name="turnoActividad"]:checked')

    if(nombrePersona === "" || actividadSeleccionada === "" || !turnoMarcado){
        alert("Debes completar todos los campos")
        return
    }

    listaInscripciones[indiceEdicion] = {
        nombre: nombrePersona,
        actividad: actividadSeleccionada,
        turno: turnoMarcado.value
    }

    mostrarInscripciones()
    limpiarFormulario()

    botonGuardar.textContent = "Guardar Inscripción"
    botonGuardar.removeEventListener('click', actualizarInscripcion)
    botonGuardar.addEventListener('click', guardarInscripcion)

    indiceEdicion = null
}

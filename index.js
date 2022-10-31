//Agrupar discos
let discosCargados = [];

//Define la pista con mayor duración de todos los discos 
let duracionMaxima = [];

//Validaciones 

//Validar Stings 

function validarTexto (datosTexto) {

    if (datosTexto != null) {
        datosTexto = datosTexto.trim ();  //Elimina espacios en blanco 
    }
    if (datosTexto == "" || datosTexto == null || datosTexto == undefined){
        alert (" Se ha ingresado un dato erróneo, por favor volver a cargar los datos.");
        return true;
    }
    return false;
}

//Validar que no se repita el código de la canción  

function validarCodigo (codigo) {
    let flag = false;
    if (discosCargados.length > 0){
        for (let disco of discosCargados){
            if (disco.codigo == codigo){
                alert ("El código ingresado corresponde a otro disco, por favor cargar un código diferente");
                flag = true;
            }
        }   
    }
    if (codigo <= 0 || codigo > 999 || isNaN (codigo) || codigo == ""){
        alert ("El código ingresado es un dato erróneo. Recuerde que el código debe ser un numero entre el 1 y el 999");
        flag = true;
    }
    return flag;
}

//Validar la duración de la canción 

function validarDuracion (duracion) {
    let flag = false
    if (duracion <= 0 || duracion > 7200 || isNaN (duracion)){
        alert ("La duración ingresada es errónea. Recuerde que la duración debe estar expresada en segundos y no puede ser mayor a 7200 segundos");
        flag = true;
    }
    return flag ;
}

// Acumuladores

//Mostrar cantidad de discos cargados
/**
 * 
 * @param {Discos} cantidadDiscos 
 */

 function acumulacionDiscos (cantidadDiscos) {

    let acc = 0;

    for(let i = 0; i < cantidadDiscos.length; i++){

        acc += discosCargados[i];
    }

};

//Mostrar cantidad de canciones en disco
/**
 * @param {Canciones} cantidadCanciones
 */

function acumulacionCanciones (cantidadCanciones) {

    let acc = 0;

    for (let i = 0; i < cantidadCanciones.length; i++) {

        acc += discoNuevo.pistas [i];
    }
}

// Función cargar  

const cargar = () => {

    let cargaDisco = {};

    do{
    cargaDisco.nombre = prompt ("Ingrese el nombre del disco");
    }while (validarTexto(cargaDisco.nombre));

    do{
    cargaDisco.autor = prompt (`Ingrese el autor del disco "${cargaDisco.nombre}"`);
    } while (validarTexto(cargaDisco.autor));

    do {
    cargaDisco.codigo = prompt (`Ingrese el código de identificación del disco "${cargaDisco.nombre}" `);
    } while (validarCodigo(cargaDisco.codigo));

    cargaDisco.pistas = [];
    cargaDisco.duracionesCanciones = [];
    cargaDisco.duracionTotal;
 
    do {
        let pistasDisco = {};

        do{
            pistasDisco.nombre = prompt (`Ingrese nombre de la canción del disco "${cargaDisco.nombre}"`);
        }while (validarTexto(pistasDisco.nombre));

        do {    pistasDisco.duracion = prompt (`Ingrese la duración en segundo de la canción ${pistasDisco.nombre}`);
        } while (validarDuracion(pistasDisco.duracion));

        // Acumular duraciones de cada pistas del disco 

        cargaDisco.duracionesCanciones.push(parseInt(pistasDisco.duracion));     
        
        const valorinicial = 0;
        function reducir (previous, current) {
            return  (previous + current);
        }
    
         cargaDisco.duracionTotal =  cargaDisco.duracionesCanciones.reduce(reducir,valorinicial);

         //Definir duración maxima 

         duracionMaxima = cargaDisco.duracionesCanciones.reduce((reducir, valorinicial) => {

            return Math.max(reducir, valorinicial);
         });

        cargaDisco.pistas.push(pistasDisco);
        
    } while (confirm(`¿Desea agregar más canciones al disco ${cargaDisco.nombre}?`));
    
    discosCargados.push(cargaDisco);
};

// Función mostrar  

const mostrar = () => {

    let contenedorUno = document.getElementById('discos');
    let contenedorDos = document.getElementById('info');

    contenedorUno.innerHTML = `<h3> Cantidad discos cargados: ${discosCargados.length}</h3> </br> <h3> La cancion mas larga de todos los discos dura : ${duracionMaxima} segundos </h3>` ; 

    contenedorDos.innerHTML = ""; //Borra los datos del contenedor para que no se dupliquen al mostrarlo 

    for(let discoNuevo of discosCargados) {

        let color = "";
        let html = '<div>';

        html += `\n   <h2> Disco: ${discoNuevo.nombre}</h2>`;
        html += `\n   <h3> Código: ${discoNuevo.codigo}</h3>`;
        html += `\n   <h3> Autor: ${discoNuevo.autor}</h3>`;
        html +=`\n <h3> La duración total del disco es : ${discoNuevo.duracionTotal} segundos </h3>`; 

        let pistas = discoNuevo.pistas;

        for(let pistasDelDisco of pistas) {

            if (pistasDelDisco.duracion > 180){
                color="modificacionColor";
            }else {
                color="sinModificacionColor";
            }   

            html += `\n    <h3> Canción: ${pistasDelDisco.nombre}</h3>`;
            html += `\n    <p class=${color}> Duración: ${pistasDelDisco.duracion} segundos </p>`;
 
        }
        
        html += `\n <h3> Cantidad de canciones: ${pistas.length}</h3>`;

        let promedioDuracion = discoNuevo.duracionTotal / pistas.length;

        html += `\n <h3> Promedio de canciones: ${promedioDuracion} segundos </>`;

        html += '\n</div>';
        contenedorDos.innerHTML += html;    
    };
};

//Función borrar

const borrar = () => {

     discosCargados = [];
     duracionMaxima = [];

     let contenedorUno = document.getElementById('discos');
     let contenedorDos = document.getElementById('info');

     contenedorUno.innerHTML = "";
     contenedorDos.innerHTML = "";

};


const formularioCalculadora = document.getElementById('formulario-calculadora');
const resultado = document.getElementById('resultado');

formularioCalculadora.addEventListener('submit', (evento) =>{
    evento.preventDefault();  //previene que el formulario se actualice y se pierda la información escrita
    calcularCalorias();
    formularioCalculadora.reset();
})

function calcularCalorias() {

    aparecerResultado();

    const edad = document.querySelector ('#edad');  //querySelector es como getElementById pero permite elegir 
    //cualquier etiqueta en este caso en formato css el id
    const peso = document.querySelector ('#peso');
    const altura = document.querySelector ('#altura');
    const actividad = document.querySelector ('#actividad');
    const genero = document.querySelector ('input[name = "genero"]:checked');
    const nombre = document.querySelector ('#nombre');
    const documento = document.querySelector ('input[name = "documento"]:checked');
    const numeroDocumeno = document.querySelector ('#numeroDocumento');

    console.log(edad.value)

    const multiplicadorTMB = {
        peso: 10,
        altura: 6.25,
        edad: 5
    }

    const formula = actividad.value * ((multiplicadorTMB.peso * peso.value) +
                    (multiplicadorTMB.altura * altura.value) -
                    (multiplicadorTMB.edad * edad.value));

    if (!(edad.value && peso.value && altura.value)){
        mostrarMensajeDeError('Por favor asegurese de llenar todos los campos')
        return;
    }

    if (edad.value > 18 && documento.value === "TI"){
        mostrarMensajeDeError('Por favor ingrese edad menor o igual a 18 años si es tarjeta de identidad')
        return;
    }

    let calculoCalorias;
    let grupoPoblacional;

    (genero.id === "masculino") ? (calculoCalorias = formula + 5) : (calculoCalorias = formula - 161);
        //Formula hombres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5
        //Formula mujeres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161
        

    if (edad.value > 14 && edad.value < 30){
        grupoPoblacional = "Jovenes";
    }else if (edad.value > 29 && edad.value < 60){
        grupoPoblacional = "Adultos";
    }else{
        grupoPoblacional = "Adultos Mayores";
    }

    console.log(calculoCalorias);
    
    // totalCalorias.value = `${Math.floor(calculoCalorias)} kcal`;
    
    resultado.innerHTML = `
            <div class=" card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
                <p class = "fs-2">
                    El paciente ${nombre.value} identificado con ${documento.value}
                    NO. ${numeroDocumeno.value}, requiere un total de ${Math.floor(calculoCalorias)} kcal
                    para el sostenimiento de su TBM
                    <br/>
                    <br/>
                    El paciente pertenece al grupo poblacional de los ${grupoPoblacional}
                </p>
            </div>
    `

}

function mostrarMensajeDeError(msg) {
    const calculo = document.querySelector('#calculo');
    if (calculo) {
        calculo.remove();
    }

    const divError = document.createElement('div');
    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

    resultado.appendChild(divError);

    setTimeout(() => {
        divError.remove();
        desvanecerResultado();
    }, 5000);
}


// Animaciones
function aparecerResultado() {       //Es como un ciclo for de 10 ms
    resultado.style.top = '100vh';
    resultado.style.display = 'block';
    
    let distancia = 100;
    let resta = 0.3;
    let id = setInterval(() => {
        resta *= 1.1;
        resultado.style.top = `${distancia - resta}vh`;
        if (resta > 100) {
            clearInterval(id);
        }
    }, 10)
}

function desvanecerResultado() {
    let distancia = 1;

    let id = setInterval(() => {
        distancia *= 2;
        resultado.style.top = `${distancia}vh`;
        if (distancia > 100) {
            clearInterval(id);
            resultado.style.display = 'none';
            resultado.style.top = 0;
        }
    }, 10)
}
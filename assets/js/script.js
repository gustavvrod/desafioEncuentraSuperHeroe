//esconder contenido en main__resultado
$('#mainResultado').hide();
//iniciar evento click en mainButton para generar consulta()
$('#mainButton').click('submit', (event) => {
    event.preventDefault();
    $('#mainResultado').show();
    hero = parseInt($("#mainEntrada").val());
    consulta(hero);
}); //fin evento click del boton

//variable para comprobar que sean digitos los ingresados en la consulta
var variablerecepcionnumero = /\d$/gmi;
//funcion de la consulta
let consulta = (hero) => {
    if (hero && variablerecepcionnumero.test(hero) && (hero < 732)) {
        $.ajax(
            //objeto ajax
            {
                type: 'GET',
                url: `https://www.superheroapi.com/api.php/252341296710884/${hero}`,
                dataType: 'json',
                success: function(datosAPI) {
                    console.log(datosAPI);
                    tarjetaHeroe(datosAPI);
                    graficoHeroe(datosAPI)

                }, //fin success

                error: function(datosAPI) {
                    if (datosAPI.response == "error") {
                        console.log(datosAPI.response);
                        alert('ERROR CONSUMIENDO LA API');
                    }
                }, //fin error
                async: true,
            } //fin objeto AJAX
        ); //fin accion AJAX
    } //alertar al usuario que ingreso valor incorrecto 
    else {
        alert("Ingrese un valor numérico menor a 732, el campo no debe contener letras, caracteres especiales o estar vacío.")
    };
}; //fin consulta()

//bootstrap tarjeta heroe
let tarjetaHeroe = (datosAPI) => {
        //propiedad data de la respuesta datosAPI
        document.getElementById('superName').innerHTML = `Nombre: ${datosAPI.name}`;
        document.getElementById('cardImage').innerHTML = `<img class="main__card__image" src="${datosAPI.image.url}">`;
        document.getElementById('superConexiones').innerHTML = `Conexiones: ${Object.values(datosAPI.connections)}`;
        document.getElementById('superPublicado').innerHTML = `Publicado por: ${datosAPI.biography.publisher}`;
        document.getElementById('superOcupacion').innerHTML = `Ocupación: ${datosAPI.work.occupation}`;
        document.getElementById('superPrimeraAparicion').innerHTML = `Primera Aparición: ${Object.values(datosAPI.biography)[4]}`;
        document.getElementById('superAltura').innerHTML = `Altura: ${Object.values(datosAPI.appearance.height)[0]}`;
        document.getElementById('superPeso').innerHTML = `Peso: ${Object.values(datosAPI.appearance.weight)[1]}`;
        document.getElementById('superAlianzas').innerHTML = `Alianzas: ${Object.values(datosAPI.biography.aliases)}`;
    } //fin funcion tarjeta heroe

//canva js grafico
let graficoHeroe = (datosAPI) => {
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            title: {
                text: `Estadistica de poder para ${datosAPI.name}`
            },
            data: [{
                type: "pie",
                startAngle: 240,
                indexLabel: "{label} {y}",
                dataPoints: [
                    { y: `${datosAPI.powerstats.power}`, label: "Power" },
                    { y: `${datosAPI.powerstats.combat}`, label: "Combat" },
                    { y: `${datosAPI.powerstats.intelligence}`, label: "intelligence" },
                    { y: `${datosAPI.powerstats.strength}`, label: "Strength" },
                    { y: `${datosAPI.powerstats.speed}`, label: "Speed" },
                    { y: `${datosAPI.powerstats.durability}`, label: "Durability" }
                ]
            }]
        });
        chart.render();
    } //fin canva js grafico
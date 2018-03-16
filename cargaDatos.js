window.onload = function() {


    fecha2 = new Date();
    arrayHoras = ["23:00", "21:00", "19:00", "17:00", "15:00", "13:00", "11:00", "09:00", "07:00", "05:00","03:00","01:00"];
    diasSemana = new Array("Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo");
    diasMes = new Array("01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19",
                                "20","21","22","23","24","25","26","27","28","29","30","31");
    arraymeses = new Array();
    arraymeses[0]= fecha2.getFullYear()+"-0"+(fecha2.getMonth()+1);
    for (var i = 1; i < 14; i++) {
      arraymeses[i]=0;
    }
    contadorasociadoAño = fecha2.getMonth() - 1;
    contadorPosArrayMeses= 0;
    contador = 0;
    contadorSemana = 0;
    contadorControldia = 0;
    contadorMedia = 0;
    ground_temp_semanal = new Array();
    air_pressure_semanal =new Array();
    humidity_semanal = new Array();

    wind_speed_semanal =  new Array();
    rainfall_semanal = new Array();
    for (var i = 0; i < fecha2.getDay(); i++) {
      ground_temp_semanal[i]=0;
      air_pressure_semanal[i]=0;
      humidity_semanal[i]=0;

      wind_speed_semanal[i] =  0;
      rainfall_semanal[i] = 0;
    }
    contadorMensual = 0;
    contadorControldiaMes = 0;
    contadorMediaMes = 0;

    ground_temp_mensual= new Array();
    air_pressure_mensual= new Array();
    humidity_mensual= new Array();

    wind_speed_mensual = new Array();
    rainfall_mensual = new Array();
    for (var i = 0; i < fecha2.getDate()-1; i++) {

      ground_temp_mensual[i]=0;
      air_pressure_mensual[i]=0;
      humidity_mensual[i]=0;

      wind_speed_mensual[i] =0;
      rainfall_mensual[i] = 0;
    }
    contadorTotal = 0;
    contadormediaAnual= 0;
    contadorControldiaAnual = 0;
    if (fecha2.getMonth() < 10 ) {
        anoActual = fecha2.getFullYear()+"-0"+fecha2.getMonth();
    }
    else {
        anoActual = fecha2.getFullYear()+"-"+fecha2.getMonth();
    }



    ground_temp_anual= new Array();
    air_pressure_anual= new Array();
    humidity_anual= new Array();
    wind_speed_anual = new Array();
    rainfall_anual =  new Array();
    for (var i = 0; i < 14; i++) {

      ground_temp_anual[i]= 0;
      air_pressure_anual[i]= 0;
      humidity_anual[i] = 0;

      wind_speed_anual[i] = 0;
      rainfall_anual [i]=  0;
    }

    document.getElementById('semana').disabled = true;
    document.getElementById('mensual').disabled = true;
    document.getElementById('dia').disabled = true;
    document.getElementById('anual').disabled = true;
    datosOriginales = new Array();
    datosOrdenados = new Array();
    c=0;
    d=0;
    e=0;
    f=0;
    g=0;
    h=0;
    datos = document.getElementById('datos');
    datos.style.borderCollapse = "collapse";
    datos.style.fontFamily = "sans-serif";
    datos.style.fontSize = ".8em"
    datos.style.verticalAlign="center";
    datos.style.width = "100%";
    datos.style.backgroundColor = "rgb(249, 248, 237)";
    for (var i = 0; i < document.getElementsByTagName('th').length; i++) {
      document.getElementsByTagName('th')[i].style.padding = "1% 1%";
      document.getElementsByTagName('th')[i].style.backgroundColor = "rgb(143, 141, 142)";
    }
    for (var i = 0; i < document.getElementsByTagName('button').length; i++) {
      document.getElementsByTagName('button')[i].style.backgroundColor ="rgb(16, 213, 208)";
      document.getElementsByTagName('button')[i].style.fontSize = ".7em";
      document.getElementsByTagName('button')[i].style.height = "3%";
      document.getElementsByTagName('button')[i].style.width = "24%";
      document.getElementsByTagName('button')[i].style.borderRadius = "10px";
    }

    botonesGraficas = document.getElementById('botonesGraficas');
    botonesGraficas.style.width = "50%";
    botonesGraficas.style.margin = "0 auto";
    graficaContendorPrincipal = document.getElementById('contendorPrincipalgraficas');
    graficaContendorPrincipal.style.width = "90%";
    graficaContendorPrincipal.style.margin = "0 auto";
    popCanvasUno = document.getElementById("graficaUno");
    popCanvasDos = document.getElementById("graficaDos");
    popCanvasTres = document.getElementById("graficaTres");

    popCanvasCinco = document.getElementById('graficaCinco');
    popCanvasSeis = document.getElementById('graficaSeis');
    contenedorgraficaUno= document.getElementById('contenedorgraficaUno');
    contenedorgraficaDos= document.getElementById('contenedorgraficaDos');
    contenedorgraficaTres= document.getElementById('contenedorgraficaTres');

    contenedorgraficaCinco = document.getElementById('contenedorgraficaCinco');
    contenedorgraficaSeis = document.getElementById('contenedorgraficaSeis');
    contenedorgraficaUno.style.cssFloat = "left";
    contenedorgraficaDos.style.cssFloat = "left";
    contenedorgraficaTres.style.cssFloat = "left";
    contenedorgraficaCinco.style.cssFloat = "clear";
    contenedorgraficaCinco.style.cssFloat ="left";
    contenedorgraficaSeis.style.cssFloat ="left";
    contenedorgraficaUno.style.width = "33%";
    contenedorgraficaDos.style.width = "33%";
    contenedorgraficaTres.style.width = "33%";
    contenedorgraficaCinco.style.width ="50%";
    contenedorgraficaSeis.style.width = "50%";
    document.getElementById('botonesTabla').style.clear = "left";
    descargaArchivo();
    descargaArchivoCompleto();
    descargaArchivoGraficaDiaria();
    descargaArchivoGraficaSemanal();
    descargaArchivoGraficaMensual();
    document.getElementById('atras').onclick = gestorClick;
    document.getElementById('adelante').onclick = gestorClick;
    document.getElementById('semana').onclick = gestorClick;
    document.getElementById('dia').onclick = gestorClick;
    document.getElementById('mensual').onclick = gestorClick;
    document.getElementById('anual').onclick = gestorClick;
    document.getElementById('atras').disabled = true;
    document.getElementById('dia').disabled = true;
    // carga graficos en pantalla

 }
function gestorClick() {

  switch (this.id) {
    case "atras" :
      if (contador != 0) {
          contador--;
          document.getElementById('adelante').disabled = false;
          descargaArchivo();
      }
      else {
        document.getElementById('atras').disabled = true;
      }
      break;
    case "adelante" :
        if (contador >= 63) {
            document.getElementById('adelante').disabled = true;
        }
        else {
          contador++;
          document.getElementById('atras').disabled = false;
          descargaArchivo();
        }
      break;
      case "semana":
          resetCanvas();
          // carga graficos en pantalla
          graficas(popCanvasUno, diasSemana, ground_temp_semanal.reverse(), "Temperatura",'bar');
          graficas(popCanvasDos, diasSemana, air_pressure_semanal.reverse(), "Presión aire",'bar');
          graficas(popCanvasTres, diasSemana, humidity_semanal.reverse(), "Humedad",'bar');
          graficas(popCanvasCinco, diasSemana, wind_speed_semanal.reverse(),"Velocidad viento", 'bar');
          graficas(popCanvasSeis, diasSemana, rainfall_semanal.reverse(),"Lluvia",'bar');

      break;
      case "dia":
          resetCanvas();
          // carga graficos en pantalla
          graficas(popCanvasUno, arrayHoras , ground_temp_dia, "Temperatura",'line');
          graficas(popCanvasDos, arrayHoras , air_pressure_dia, "Presión aire",'bar');
          graficas(popCanvasTres, arrayHoras , humidity_dia, "Humedad",'bar');
          graficas(popCanvasCinco, arrayHoras ,wind_speed_dia, "Velocidad viento",'bar');
          graficas(popCanvasSeis, arrayHoras ,rainfall_dia, "Lluvia", 'bar');


      break;
      case "mensual":
          resetCanvas();
          // carga graficos en pantalla
          graficas(popCanvasUno, diasMes, ground_temp_mensual.reverse(), "Temperatura",'line');
          graficas(popCanvasDos, diasMes, air_pressure_mensual.reverse(), "Presión aire",'bar');
          graficas(popCanvasTres, diasMes, humidity_mensual.reverse(), "Humedad",'bar');
          graficas(popCanvasCinco, diasMes, wind_speed_mensual.reverse(), "Velocidad viento",'bar');
          graficas(popCanvasSeis, diasMes, rainfall_mensual.reverse(), "Lluvia",'bar');

      break;
      case "anual":
          resetCanvas();
          // carga graficos en pantalla

          graficas(popCanvasUno, arraymeses, ground_temp_anual, "Temperatura",'line');
          graficas(popCanvasDos, arraymeses, air_pressure_anual, "Presión aire",'bar');
          graficas(popCanvasTres, arraymeses, humidity_anual, "Humedad",'bar');
          graficas(popCanvasCinco, arraymeses, wind_speed_anual, "Velocidad viento", 'bar');
          graficas(popCanvasSeis, arraymeses, rainfall_anual, "Lluvias", 'bar');

      break;
    }
}
// PETICION AL SERVIDOR EN SEGUNDO PLANO (AJAX)
function descargaArchivo() {
  // 1.-Instancia del objeto XMLHttpRequest
  if (window.XMLHttpRequest) {
  var peticion_http = new XMLHttpRequest();
  } else if (window.ActiveXObject) { // navegadores obsoletos
  var peticion_http = new ActiveXObject("Microsoft.XMLHTTP");
  }

  // 2.-Preparar la funcion de respuesta
  peticion_http.onreadystatechange = muestraContenido;

  // 3.-Realizar peticion HTTP
  var url = 'https://apex.oracle.com/pls/apex/raspberrypi/weatherstation/getallmeasurements/2339720?page='+contador;

  peticion_http.open('GET', url, true);
  peticion_http.send(null);

  // 4.-Respuesta del servidor
   function muestraContenido() {

      if (peticion_http.readyState == 4 && peticion_http.status == 200) {

        // se recoge el doc con notacion json
        var respuesta_json = peticion_http.responseText;
        var objeto_json = eval("(" + respuesta_json + ")");

        for ( var i = 0; i < 20; i++) {
          datosOriginales[i] = new Array();
          datosOrdenados[i] = new Array();
        }

        var tablaInsertar = "<thead><tr><th id='reading'>Hora lectura</th><th id='station'>Estacion tiempo</th>"+
                            "<th id='ground'>Temperatura</th><th id='air2'>Presión aire</th>"+
                            "<th id='humidity'>Humedad</th><th id='wind1'>Dirección viento</th><th id='wind2'>Velocidad viento</th>"+
                            "<th id='rainfall'>lluvia</th></tr><thead><tbody>";

        for ( var i = 0; i < 20; i++) {
          reading_timestamp = objeto_json.items[i].reading_timestamp;
          fecha = reading_timestamp.substring(0, 10);
          hora = reading_timestamp.substring(11, 19);

          tablaInsertar += "<tr>";

          tablaInsertar += "<td>" + fecha +" "+ hora
                        + "</td><td>" + objeto_json.items[i].created_by
                        + "</td><td>" + Math.trunc(objeto_json.items[i].ground_temp)
                        + "</td><td>" + Math.trunc(objeto_json.items[i].air_pressure)
                        + "</td><td>" + Math.trunc(objeto_json.items[i].humidity)
                        + "</td><td>" + Math.trunc(objeto_json.items[i].wind_direction)
                        + "</td><td>" + Math.trunc(objeto_json.items[i].wind_speed)
                        + "</td><td>" + Math.trunc(objeto_json.items[i].rainfall)
                        + "</td>";

          tablaInsertar += "</tr>";

          datosOriginales[0][i] = fecha+" "+hora;
          datosOrdenados[0][i] = fecha+" "+hora;

          datosOriginales[1][i] = objeto_json.items[i].created_by;
          datosOrdenados[1][i] = objeto_json.items[i].created_by;

          datosOriginales[2][i] = Math.trunc(objeto_json.items[i].ground_temp);
          datosOrdenados[2][i] = Math.trunc(objeto_json.items[i].ground_temp);

          datosOriginales[3][i] = Math.trunc(objeto_json.items[i].air_pressure);
          datosOrdenados[3][i] = Math.trunc(objeto_json.items[i].air_pressure);

          datosOriginales[4][i] = Math.trunc(objeto_json.items[i].humidity);
          datosOrdenados[4][i] = Math.trunc(objeto_json.items[i].humidity);

          datosOriginales[5][i] = Math.trunc(objeto_json.items[i].wind_direction);
          datosOrdenados[5][i] = Math.trunc(objeto_json.items[i].wind_direction);

          datosOriginales[6][i] = Math.trunc(objeto_json.items[i].wind_speed);
          datosOrdenados[6][i] = Math.trunc(objeto_json.items[i].wind_speed);

          datosOriginales[7][i] = Math.trunc(objeto_json.items[i].rainfall);
          datosOrdenados[7][i] = Math.trunc(objeto_json.items[i].rainfall);

         }
         tablaInsertar +="</tbody>"
         // carga de la tabla en pantalla
         document.getElementById("datos").innerHTML = tablaInsertar;

         estilosTabla();
         llamarResaltarCabecera();
     }
   }
 }

function llamarResaltarCabecera() {
  document.getElementById("ground").onclick = resaltar;
  document.getElementById("air2").onclick = resaltar;
  document.getElementById("humidity").onclick = resaltar;
  document.getElementById("wind1").onclick = resaltar;
  document.getElementById("wind2").onclick = resaltar;
  document.getElementById("rainfall").onclick = resaltar;

  document.getElementById("ground").onmouseover = resaltar;
  document.getElementById("air2").onmouseover = resaltar;
  document.getElementById("humidity").onmouseover = resaltar;
  document.getElementById("wind1").onmouseover = resaltar;
  document.getElementById("wind2").onmouseover = resaltar;
  document.getElementById("rainfall").onmouseover = resaltar;

  document.getElementById("ground").onmouseout = resaltar;
  document.getElementById("air2").onmouseout = resaltar;
  document.getElementById("humidity").onmouseout = resaltar;
  document.getElementById("wind1").onmouseout = resaltar;
  document.getElementById("wind2").onmouseout = resaltar;
  document.getElementById("rainfall").onmouseout = resaltar;

}
function resaltar(elEvento) {
  var evento = elEvento || window.event;
  switch (evento.type) {
		case 'click' :

			switch (this.id) {
				case "ground" :
					if (c == 0) {
						// ordena la primera fila descendente
						datosOrdenados[0].sort(function(a,b){return a - b});
						c++;
					} else {
						// ordena la primera fila ascendente
            datosOrdenados[0].sort(function(a, b){return b - a});
            c--;
					}
					ordenarPor(0);
					break;
				case "air2" :
					if (d == 0) {
						// ordena la segunda fila descendente
						datosOrdenados[1].sort(function(a, b) {return a - b});
						d++;
					} else {
						// ordena la segunda fila ascendente
						datosOrdenados[1].sort(function(a, b) {return b - a});
						d--;
					}

					ordenarPor(1);
					break;
				case "humidity" :
        if (e == 0) {
          // ordena la tercera fila descendente
          datosOrdenados[2].sort(function(a, b) {return a - b});
          e++;
        } else {
          // ordena la tercera fila ascendente
          datosOrdenados[2].sort(function(a, b) {return b - a});
          e--;
        }
					ordenarPor(2);
					break;
        case "wind1" :
        if (f == 0) {
          // ordena la cuarta fila descendente
          datosOrdenados[3].sort(function(a, b) {return a - b});
          f++;
        } else {
          // ordena la cuarta fila ascendente
          datosOrdenados[3].sort(function(a, b) {return b - a});
          f--;
        }
          ordenarPor(3);
          break;
        case "wind2" :
        if (g == 0) {
          // ordena la quinta fila descendente
          datosOrdenados[4].sort(function(a, b) {return a - b});
          g++;
        } else {
          // ordena la quinta fila ascendente
          datosOrdenados[4].sort(function(a, b) {return b - a});
          g--;
        }
          ordenarPor(4);
          break;
        case "rainfall" :
        if (h == 0) {
          // ordena la sexta fila descendente
          datosOrdenados[5].sort(function(a, b) {return a - b});
          h++;
        } else {
          // ordena la sexta fila ascendente
          datosOrdenados[5].sort(function(a, b) {return b - a});
          h--;
        }
          ordenarPor(5);
          break;
			}
			break;

		case 'mouseover' :
			this.style.backgroundColor = "rgb(200, 200, 200)";
			break;

		case 'mouseout' :
			this.style.backgroundColor = "rgb(143, 141, 142)";
			break;
	}
}
function ordenarPor(fila) {

  var tablaInsertar = "<thead><tr><th id='reading'>Fecha lectura</th><th id='station'>Estacion</th>"+
                      "<th id='ground'>Temperatura</th><th id='air2'>Presión aire</th>"+
                      "<th id='humidity'>Humedad</th><th id='wind1'>Dirección viento</th><th id='wind2'>Velocidad viento</th>"+
                      "<th id='rainfall'>lluvia</th></tr><thead><tbody>";

	for ( var i = 0; i < datosOrdenados.length; i++) {
		tablaInsertar += "<tr>";

		for ( var j = 0; j < datosOriginales.length; j++) {

			if (datosOrdenados[fila][i] == datosOriginales[fila][j]) {

				tablaInsertar += "<td>" + datosOriginales[0][j] + "</td><td>"
						+ datosOriginales[1][j] + "</td><td>"
            + datosOriginales[2][j] + "</td><td>"
            + datosOriginales[3][j] + "</td><td>"
            + datosOriginales[4][j] + "</td><td>"
            + datosOriginales[5][j] + "</td><td>"
            + datosOriginales[6][j] + "</td><td>"
						+ datosOriginales[7][j] + "</td>";
				break;
			}
		}
		tablaInsertar += "</tr>";
	}
	tablaInsertar += "</tbody>";

	document.getElementById("datos").innerHTML = tablaInsertar;
  estilosTabla();
	llamarResaltarCabecera();

}
 function estilosTabla() {
   for (var i = 0; i < document.getElementsByTagName('td').length; i++) {
     document.getElementsByTagName('td')[i].style.padding = "1% 1%";
   }
   for (var i = 0; i < document.getElementsByTagName('th').length; i++) {
     document.getElementsByTagName('th')[i].style.padding = "1% 1%";
     document.getElementsByTagName('th')[i].style.backgroundColor = "rgb(143, 141, 142)";
   }

 }
 function resetCanvas() {
   if (contenedorgraficaUno.hasChildNodes()) {
     contenedorgraficaUno.removeChild(contenedorgraficaUno.childNodes[0]);
     contenedorgraficaDos.removeChild(contenedorgraficaDos.childNodes[0]);
     contenedorgraficaTres.removeChild(contenedorgraficaTres.childNodes[0]);
     contenedorgraficaCinco.removeChild(contenedorgraficaCinco.childNodes[0]);
     contenedorgraficaSeis.removeChild(contenedorgraficaSeis.childNodes[0]);
     contenedorgraficaUno.innerHTML = '<canvas id="graficaUno"><canvas>';
     contenedorgraficaDos.innerHTML = '<canvas id="graficaDos"><canvas>';
     contenedorgraficaTres.innerHTML = '<canvas id="graficaTres"><canvas>';
     contenedorgraficaCinco.innerHTML = '<canvas id="graficaCinco"><canvas>';
     contenedorgraficaSeis.innerHTML = '<canvas id="graficaSeis"><canvas>';
     popCanvasUno = document.querySelector('#graficaUno');
     popCanvasDos = document.querySelector('#graficaDos');
     popCanvasTres = document.querySelector('#graficaTres');
     popCanvasCinco = document.querySelector('#graficaCinco');
     popCanvasSeis = document.querySelector('#graficaSeis');

   }
 }
 function graficas(canvas, label ,datos, titulo, tipo) {

      var barChart = new Chart(canvas, {
      type: tipo,
      data: {
        labels: label,
        datasets: [{
          label: titulo,
          data:  datos,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)'
          ]
        }]
      }
    });

 }

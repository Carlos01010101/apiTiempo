function descargaArchivoGraficaDiaria() {
  // 1.-Instancia del objeto XMLHttpRequest
  if (window.XMLHttpRequest) {
  var peticion_http = new XMLHttpRequest();
  } else if (window.ActiveXObject) { // navegadores obsoletos
  var peticion_http = new ActiveXObject("Microsoft.XMLHTTP");
  }

  // 2.-Preparar la funcion de respuesta
  peticion_http.onreadystatechange = muestragraficoDiario;

  // 3.-Realizar peticion HTTP
  var url = 'https://apex.oracle.com/pls/apex/raspberrypi/weatherstation/getallmeasurements/2339720?page='+contador;

  peticion_http.open('GET', url, true);
  peticion_http.send(null);

// 4.-Respuesta del servidor
 function muestragraficoDiario() {
    if (peticion_http.readyState == 4 && peticion_http.status == 200) {
      // se recoge el doc con notacion json
      var respuesta_json = peticion_http.responseText;
      var objeto_json = eval("(" + respuesta_json + ")");
      var fecha2 = new Date();// variable control de dia para grafica del dia anterior

      if (parseInt(fecha2.getDate()-1) < 10) {
          ayer = fecha2.getFullYear()+"-0"+(fecha2.getMonth()+1)+"-0"+(fecha2.getDate()-1) ;

      }
      else {
          ayer = fecha2.getFullYear()+"-0"+(fecha2.getMonth()+1)+"-"+(fecha2.getDate()-1) ;

      }

      contadorHoras = 0;
      //creo array datos graficas
      wind_speed_dia = new Array();
      ground_temp_dia = new Array();
      air_pressure_dia =new Array();
      humidity_dia = new Array();
      wind_direction_dia = new Array();
      rainfall_dia = new Array();
      for ( var i = 0; i < objeto_json.items.length; i++) {
        reading_timestamp = objeto_json.items[i].reading_timestamp;
        fecha = reading_timestamp.substring(0, 10);
        hora = reading_timestamp.substring(11, 19);

        if (ayer == fecha) {

          horaComparar = hora.substring(0,5);

          if (horaComparar == arrayHoras[contadorHoras]) {
            wind_speed_dia[contadorHoras] = objeto_json.items[i].wind_speed;
            ground_temp_dia[contadorHoras]=objeto_json.items[i].ground_temp;
            air_pressure_dia[contadorHoras]= objeto_json.items[i].air_pressure;
            humidity_dia[contadorHoras]= objeto_json.items[i].humidity;
            rainfall_dia[contadorHoras]= objeto_json.items[i].rainfall;
            contadorHoras++;
          }
        }
       }
       document.getElementById('dia').disabled = false;
       document.getElementById('contenedorgraficaDos').removeChild(document.getElementById('imagen'));
       // carga graficos en pantalla
       graficas(popCanvasUno, arrayHoras , ground_temp_dia, "Temperatura",'line');
       graficas(popCanvasDos, arrayHoras , air_pressure_dia, "Presión aire",'bar');
       graficas(popCanvasTres, arrayHoras , humidity_dia, "Humedad",'bar');
       graficas(popCanvasCinco, arrayHoras ,wind_speed_dia, "Velocidad viento",'bar');
       graficas(popCanvasSeis, arrayHoras ,rainfall_dia, "Lluvia", 'bar');

   }
 }
}

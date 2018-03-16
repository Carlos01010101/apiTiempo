
function descargaArchivoGraficaSemanal() {
   var finPeticion = false;
  // 1.-Instancia del objeto XMLHttpRequest
  if (window.XMLHttpRequest) {
  var peticion_http = new XMLHttpRequest();
  } else if (window.ActiveXObject) { // navegadores obsoletos
  var peticion_http = new ActiveXObject("Microsoft.XMLHTTP");
  }

  // 2.-Preparar la funcion de respuesta
  peticion_http.onreadystatechange = muestragrafico;

  // 3.-Realizar peticion HTTP
  var url = 'https://apex.oracle.com/pls/apex/raspberrypi/weatherstation/getallmeasurements/2339720?page='+contadorSemana;

  peticion_http.open('GET', url, true);
  peticion_http.send(null);

// 4.-Respuesta del servidor
 function muestragrafico() {
    if (peticion_http.readyState == 4 && peticion_http.status == 200) {
      // se recoge el doc con notacion json
      var respuesta_json = peticion_http.responseText;
      var objeto_json = eval("(" + respuesta_json + ")");
      fecha2 = new Date();// variable control de dia
      var diaSemana = fecha2.getDay();
      var ayer = fecha2.getFullYear()+"-0"+(fecha2.getMonth()+1)+"-"+(fecha2.getDate()-diaSemana);

      for ( var i = 0; i < objeto_json.items.length && !finPeticion; i++) {
        var reading_timestamp = objeto_json.items[i].reading_timestamp;
        var fecha = reading_timestamp.substring(0, 10);
        var hora = reading_timestamp.substring(11, 19);

        if (ayer != fecha) {

            var dia = ""+fecha2.getDate()-contadorControldia;
            if (fecha.substring(8,10) == (dia)) {
              rainfall_semanal[contadorControldia] += parseInt(objeto_json.items[i].rainfall);
              wind_speed_semanal[contadorControldia] += parseInt(objeto_json.items[i].wind_speed);

              ground_temp_semanal[contadorControldia] += parseInt(objeto_json.items[i].ground_temp);
              air_pressure_semanal[contadorControldia] += parseInt(objeto_json.items[i].air_pressure);
              humidity_semanal[contadorControldia] += parseInt(objeto_json.items[i].humidity);
              contadorMedia++;

            }

            else {
              wind_speed_semanal[contadorControldia] = wind_speed_semanal[contadorControldia]/contadorMedia;

              ground_temp_semanal[contadorControldia] = ground_temp_semanal[contadorControldia]/contadorMedia;
              air_pressure_semanal[contadorControldia] = air_pressure_semanal[contadorControldia]/contadorMedia;
              humidity_semanal[contadorControldia] = humidity_semanal[contadorControldia]/contadorMedia;
              contadorMedia = 0 ;
              contadorControldia++;
            }
          }
        else {
          wind_speed_semanal[contadorControldia] = wind_speed_semanal[contadorControldia]/contadorMedia;
        
          ground_temp_semanal[contadorControldia] = ground_temp_semanal[contadorControldia]/contadorMedia;
          air_pressure_semanal[contadorControldia] = air_pressure_semanal[contadorControldia]/contadorMedia;
          humidity_semanal[contadorControldia] = humidity_semanal[contadorControldia]/contadorMedia;
          finPeticion = true;
          document.getElementById('semana').disabled = false;

          }
        }
        if (!finPeticion) {
          contadorSemana++;
          descargaArchivoGraficaSemanal();
        }
       }


   }
}

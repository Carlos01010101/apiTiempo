function descargaArchivoGraficaMensual() {
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
  var url = 'https://apex.oracle.com/pls/apex/raspberrypi/weatherstation/getallmeasurements/2339720?page='+contadorMensual;

  peticion_http.open('GET', url, true);
  peticion_http.send(null);

// 4.-Respuesta del servidor
 function muestragrafico() {
    if (peticion_http.readyState == 4 && peticion_http.status == 200) {
      // se recoge el doc con notacion json
      var respuesta_json = peticion_http.responseText;
      var objeto_json = eval("(" + respuesta_json + ")");

      var fecha2 = new Date();// variable control de dia2

      var diaUnoMes = fecha2.getFullYear()+"-0"+(fecha2.getMonth()+1)+"-01";
      for ( var i = 0; i < objeto_json.items.length && !finPeticion; i++) {
        reading_timestamp = objeto_json.items[i].reading_timestamp;
        fecha = reading_timestamp.substring(0, 10);
        hora = reading_timestamp.substring(11, 19);
        if (diaUnoMes != fecha) {


            var diaMes = fecha2.getDate()-contadorControldiaMes+"";

            if (parseInt(fecha.substring(8,10)) == (diaMes)) {
              rainfall_mensual[contadorControldiaMes] += parseInt(objeto_json.items[i].rainfall);
              wind_speed_mensual[contadorControldiaMes] += parseInt(objeto_json.items[i].wind_speed);
              ground_temp_mensual[contadorControldiaMes] += parseInt(objeto_json.items[i].ground_temp);
              air_pressure_mensual[contadorControldiaMes] += parseInt(objeto_json.items[i].air_pressure);
              humidity_mensual[contadorControldiaMes] += parseInt(objeto_json.items[i].humidity);
              contadorMedia++;

            }

            else {
              wind_speed_mensual[contadorControldiaMes] = wind_speed_mensual[contadorControldiaMes]/contadorMedia;
              ground_temp_mensual[contadorControldiaMes] = ground_temp_mensual[contadorControldiaMes]/contadorMedia;
              air_pressure_mensual[contadorControldiaMes] = air_pressure_mensual[contadorControldiaMes]/contadorMedia;
              humidity_mensual[contadorControldiaMes] = humidity_mensual[contadorControldiaMes]/contadorMedia;
              contadorMedia = 0 ;
              contadorControldiaMes++;
            }
          }
        else {
          wind_speed_mensual[contadorControldiaMes] = wind_speed_mensual[contadorControldiaMes]/contadorMedia;
          ground_temp_mensual[contadorControldiaMes] = ground_temp_mensual[contadorControldiaMes]/contadorMedia;
          air_pressure_mensual[contadorControldiaMes] = air_pressure_mensual[contadorControldiaMes]/contadorMedia;
          humidity_mensual[contadorControldiaMes] = humidity_mensual[contadorControldiaMes]/contadorMedia;

          finPeticion = true;
          document.getElementById('mensual').disabled =false;

          }
        }
        if (!finPeticion) {
          contadorMensual++;
          descargaArchivoGraficaMensual();
        }
       }


   }
}

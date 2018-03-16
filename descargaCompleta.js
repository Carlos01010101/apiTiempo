function descargaArchivoCompleto() {
  var finPeticion = false;
  // 1.-Instancia del objeto XMLHttpRequest
  if (window.XMLHttpRequest) {
  var peticion_http = new XMLHttpRequest();
  } else if (window.ActiveXObject) { // navegadores obsoletos
  var peticion_http = new ActiveXObject("Microsoft.XMLHTTP");
  }

  // 2.-Preparar la funcion de respuesta
  peticion_http.onreadystatechange = respuestaCompleto;

  // 3.-Realizar peticion HTTP
  var url = 'https://apex.oracle.com/pls/apex/raspberrypi/weatherstation/getallmeasurements/2339720?page='+contadorTotal;

  peticion_http.open('GET', url, true);
  peticion_http.send(null);

// 4.-Respuesta del servidor
 function respuestaCompleto() {
    if (peticion_http.readyState == 4 && peticion_http.status == 200) {
      // se recoge el doc con notacion json
      var respuesta_json = peticion_http.responseText;
      var objeto_json = eval("(" + respuesta_json + ")");

      for ( var i = 0; i < objeto_json.items.length && !finPeticion; i++) {
        reading_timestamp = objeto_json.items[i].reading_timestamp;
        fecha = reading_timestamp.substring(0, 10);
        hora = reading_timestamp.substring(11, 19);
        if(fecha.substring(0,7) == arraymeses[contadorControldiaAnual]){
          rainfall_anual[contadorControldiaAnual] += parseInt(objeto_json.items[i].rainfall);
          wind_speed_anual[contadorControldiaAnual] += parseInt(objeto_json.items[i].wind_speed);
        
          ground_temp_anual[contadorControldiaAnual] += parseInt(objeto_json.items[i].ground_temp);
          air_pressure_anual[contadorControldiaAnual]+= parseInt(objeto_json.items[i].air_pressure);
          humidity_anual[contadorControldiaAnual]  += parseInt(objeto_json.items[i].humidity);
          contadormediaAnual++;

        }
        else {
          wind_speed_anual[contadorControldiaAnual] = wind_speed_anual[contadorControldiaAnual]/contadormediaAnual;

          ground_temp_anual[contadorControldiaAnual] = ground_temp_anual[contadorControldiaAnual]/contadormediaAnual;
          air_pressure_anual[contadorControldiaAnual] = air_pressure_anual[contadorControldiaAnual]/contadormediaAnual;
          humidity_anual[contadorControldiaAnual] = humidity_anual[contadorControldiaAnual]/contadormediaAnual;
          contadorControldiaAnual++;
          contadormediaAnual=0;
          arraymeses[contadorControldiaAnual] = fecha.substring(0,7);
        }
      }

      if (contadorTotal == 60) {
        finPeticion = true;
        rainfall_anual[contadorControldiaAnual] =0;
        wind_speed_anual[contadorControldiaAnual] =0;

        ground_temp_anual[contadorControldiaAnual] = 0;
        air_pressure_anual[contadorControldiaAnual] = 0;
        humidity_anual[contadorControldiaAnual] = 0;
        arraymeses[contadorControldiaAnual] = 0;
        contadormediaAnual=0;

        document.getElementById('anual').disabled = false;
      }

        if (!finPeticion) {
          contadorTotal++;
          console.log(contadorTotal);
          descargaArchivoCompleto();

        }
       }


   }
}

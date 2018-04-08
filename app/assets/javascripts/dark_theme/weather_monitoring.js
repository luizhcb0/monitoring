$updateRate = 300000;
$devices = {};
$devices_temperature = {}
$devices_humidity = {}
$devices_luminosity = {}
$devices_atm_pressure = {}

$(".monitoring.weather_monitoring").ready(function() {
  //caching
  cacheInfo();
  getInfo();

  $allTimer = setInterval(
    function() {
      getInfo();
    },
    $updateRate
  );
  return false;
});

function cacheInfo() {
  $.ajax({
    type: "GET",
    url: "/get_all_current_weather_infos",
    dataType: "json",
    success: function(response){
      for (i = 0; i < response.length; i++) {
        $devices[i] = $('#device-'+response[i][0].id)
        $devices_temperature[i] = $('#device-'+response[i][0].id+"-temperature")
        $devices_humidity[i] = $('#device-'+response[i][0].id+"-humidity")
        $devices_luminosity[i] = $('#device-'+response[i][0].id+"-luminosity")
        $devices_atm_pressure[i] = $('#device-'+response[i][0].id+"-atm_pressure")
      }
    }
  });
  return false;
}

function getInfo() {
  $.ajax({
    type: "GET",
    url: "/get_all_current_weather_infos",
    dataType: "json",
    success: function(response){
      for (i = 0; i < response.length; i++) {
        $devices_temperature[i].html("Temperatura: "+response[i][1].data+" ºC")  //Temperature
        $devices_humidity[i].html("Umidade: "+response[i][2].data+" %")  //Humidity
        $devices_luminosity[i].html("Luminosidade: "+response[i][3].data+"")  //Luminosity
        $devices_atm_pressure[i].html("Pressão Atmosférica: "+response[i][4].data+" hPa")  //Atm Pressure
      }
    }
  });
  return false;
}

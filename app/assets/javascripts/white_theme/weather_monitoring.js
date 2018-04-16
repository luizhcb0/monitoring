$updateRate = 300000;
$devices = {};
$devices_temperature_integer = {}
$devices_temperature_decimal = {}
$devices_temperature_rainbow = {}
$devices_humidity = {}
$devices_humidity_data = {}
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
        $devices_temperature_integer[i] = $('#device-'+response[i][0].id+"-temperature-integer")
        $devices_temperature_decimal[i] = $('#device-'+response[i][0].id+"-temperature-decimal")
        $devices_temperature_rainbow[i] = $('#device-'+response[i][0].id+"-temp-rainbow")
        $devices_humidity[i] = $('#device-'+response[i][0].id+"-humidity")
        $devices_humidity_data[i] = $('#device-'+response[i][0].id+"-humidity-data")
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
        $temp = response[i][1].data.toFixed(1);
        $intPart = ($temp+"").split(".")[0];
        $decPart = ($temp+"").split(".")[1];
        $devices_temperature_integer[i].html($intPart)  //Temperature
        $devices_temperature_decimal[i].html($decPart)  //Temperature
        changeTemperatureColor($devices_temperature_rainbow[i], $intPart) //Temperature
        changeHumidity($devices_humidity[i], $devices_humidity_data[i], response[i][2].data) //Humidity
        $devices_luminosity[i].html(response[i][3].data+"")  //Luminosity
        $devices_atm_pressure[i].html(response[i][4].data+"hPa")  //Atm Pressure
      }
    }
  });
  return false;
}

function changeHumidity ($water, $data, $percentage) {
  $water.animate({
    height: $percentage+'%'
  }, 1300);
  $data.html($percentage+"%")

  return false;
}

function changeTemperatureColor($object, $temp) {
  if ($temp <= 10) {
    $object.css('background', '#5bd5f6');
  }
  else if ($temp > 10 && $temp <= 15) {
    $object.css('background', '#65e0d5');
  }
  else if ($temp > 15 && $temp <= 20) {
    $object.css('background', '#8ff8c5');
  }
  else if ($temp > 20 && $temp <= 25) {
    $object.css('background', '#bfeab5');
  }
  else if ($temp > 25 && $temp <= 30) {
    $object.css('background', '#cfeaab');
  }
  else if ($temp > 30 && $temp <= 35) {
    $object.css('background', '#f6e58b');
  }
  else if ($temp > 35 && $temp <= 40) {
    $object.css('background', '#f6c57b');
  }
  else if ($temp > 40 && $temp <= 45) {
    $object.css('background', '#f6855b');
  }
  else if ($temp > 45) {
    $object.css('background', '#f6655b');
  }
  return false;
}

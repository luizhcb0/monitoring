$updateRate = 300000;
$devices = [];
$devices_temperature_integer = []
$devices_temperature_decimal = []
$devices_temperature_rainbow = []
$devices_humidity = []
$devices_humidity_data = []
$devices_luminosity = []
$devices_sun = []
$devices_atm_pressure = []
$deviceId = []
$chart = null

$(".monitoring.weather_monitoring").ready(function() {
  //caching
  cacheInfo()

  $(".temp-container").click(function() {
    $deviceId = $(this).children("div:first").attr("id")
    $deviceId = $deviceId.split("-")
    showGraph($deviceId[1], "temperatures")
  });
  $(".water-drop").click(function() {
    $deviceId = $(this).children("div:first").attr("id")
    $deviceId = $deviceId.split("-")
    showGraph($deviceId[1], "humidities")
  });
  $(".luminosity-container").click(function() {
    $deviceId = $(this).children("div:first").attr("id")
    $deviceId = $deviceId.split("-")
    showGraph($deviceId[1], "luminosities")
  });
  $(".atm-pressure-container").click(function() {
    $deviceId = $(this).children("div:first").attr("id")
    $deviceId = $deviceId.split("-")
    showGraph($deviceId[1], "atm_pressures")
  });

  $allTimer = setInterval(
    function() {
      getInfo();
    },
    $updateRate
  );
  return false;

});

function showGraph($id, $type) {
  $(".box-zoom").show()
  $(".box").hide()
  plotWeatherChart($id, $type)
}

function goBack() {
  $(".box").show()
  $(".box-zoom").hide()
}

function plotWeatherChart($id, $type) {
  $.ajax({
    type: "GET",
    // #hidden_id is at _infos.html.erb. It shows the user who owns the devices.
    // Must be changed if more than a user has a device
    url: "/get_"+$type+"/"+$id,
    dataType: "json",
    success: function(response){
      Highcharts.setOptions($white_theme);
      $options.series = response;
      switch ($type) {
        case "temperatures":
          $options.tooltip.valueSuffix = "ºC"
          $options.yAxis.max = 50
          $options.yAxis.tickInterval = 5
          $options.yAxis.title.text = "Temperatura"
          $options.yAxis.labels.formatter = function () {
            return Highcharts.format(this.value + 'ºC');
          }
          $options.title.text = "Temperatura"
          break;
        case "humidities":
          $options.tooltip.valueSuffix = "%"
          $options.yAxis.max = 100
          $options.yAxis.tickInterval = null
          $options.yAxis.title.text = "Umidade"
          $options.yAxis.labels.formatter = function () {
            return Highcharts.format(this.value + '%');
          }
          $options.title.text = "Umidade"
          break;
        case "luminosities":
          $options.tooltip.valueSuffix = ""
          $options.yAxis.max = 65500
          $options.yAxis.tickInterval = null
          $options.yAxis.title.text = "Luminosidade"
          $options.yAxis.labels.formatter = function () {
            return Highcharts.format(this.value + '');
          }
          $options.title.text = "Luminosidade"
          break;
        case "atm_pressures":
          $options.tooltip.valueSuffix = "hPA"
          $options.yAxis.max = 1000
          $options.yAxis.tickInterval = null
          $options.yAxis.title.text = "Pressão Atmosférica"
          $options.yAxis.labels.formatter = function () {
            return Highcharts.format(this.value + 'hPa');
          }
          $options.title.text = "Pressão Atmosférica"
          break;
        default:
      }
      $options.chart.renderTo = "graph-canvas";
      $chart = new Highcharts.Chart($options);
    }
  });
  return false;
}

function cacheInfo() {
  $.ajax({
    type: "GET",
    url: "/get_all_current_weather_infos",
    dataType: "json",
    success: function(response){
      for (i = 0; i < response.length; i++) {
        $devices[i] = $('#device-'+response[i][0].serial);
        $devices_temperature_integer[i] = $('#device-'+response[i][0].id+"-temperature-integer");
        $devices_temperature_decimal[i] = $('#device-'+response[i][0].id+"-temperature-decimal");
        $devices_temperature_rainbow[i] = $('#device-'+response[i][0].id+"-temp-rainbow");
        $devices_humidity[i] = $('#device-'+response[i][0].id+"-humidity");
        $devices_humidity_data[i] = $('#device-'+response[i][0].id+"-humidity-data");
        $devices_luminosity[i] = $('#device-'+response[i][0].id+"-luminosity-data");
        $devices_sun[i] = $('#device-'+response[i][0].id+"-sun");
        $devices_atm_pressure[i] = $('#device-'+response[i][0].id+"-atm-pressure");
      }
    }
  }).done(getInfo);
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
        changeTemperatureColor($devices_temperature_rainbow[i], $temp) //Temperature
        changeHumidity($devices_humidity[i], $devices_humidity_data[i], response[i][2].data.toFixed(1)) //Humidity
        changeLuminosity($devices_luminosity[i], $devices_sun[i], response[i][3].data)  //Luminosity
        $devices_atm_pressure[i].html(response[i][4].data+" hPa")  //Atm Pressure
        $devices[i].html(response[i][0].serial)
      }
    }
  });
  return false;
}

function changeLuminosity ($sun_content, $sun, $data) {
  //$opacity = $data * 0.000015259021897  // Max = 65535
  if ($data <= 2000) {
    $opacity = 0
  }
  else {
    $opacity = 0.3 + $data * 0.000010681315328
  }
  $sun.css('background', 'rgba(240,255,210,'+$opacity+')')
  $sun_content.html($data)
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
  // $red = 100 + ($temp * 4);
  // $green =  1/($temp - 5)*($temp - 5);
  // $blue = 255 - ($temp * 3);
  // $opacity = 1;
  // $object.css('background', 'rgba('+$red+','+$green+','+$blue+','+$opacity+')');
  // console.log($red, $green, $blue)
  if ($temp <= 10) {
    $object.css('background', '#5bd5f6');
  }
  else if ($temp > 10 && $temp <= 15) {
    $object.css('background', '#65e0d5');
  }
  else if ($temp > 15 && $temp <= 18) {
    $object.css('background', '#8ff8c5');
  }
  else if ($temp > 18 && $temp <= 22) {
    $object.css('background', '#bfeab5');
  }
  else if ($temp > 22 && $temp <= 25) {
    $object.css('background', '#cfeaab');
  }
  else if ($temp > 25 && $temp <= 28) {
    $object.css('background', '#f6e58b');
  }
  else if ($temp > 28 && $temp <= 33) {
    $object.css('background', '#f6c57b');
  }
  else if ($temp > 33 && $temp <= 40) {
    $object.css('background', '#f6855b');
  }
  else if ($temp > 40) {
    $object.css('background', '#f6655b');
  }
  return false;
}

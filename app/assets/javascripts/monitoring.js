Highcharts.setOptions({
  global: {
      useUTC: false
  },
  lang: {
      months: [
          'Janeiro', 'Fevereiro', 'Março', 'Abril',
          'Maio', 'Junho', 'Julho', 'Agosto',
          'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ],
      weekdays: [
          'Domingo', 'Segunda', 'Terça', 'Quarta',
          'Quinta', 'Sexta', 'Sábado'
      ],
      shortMonths: [ "Jan" , "Fev" , "Mar" , "Abr" , "Mai" , "Jun" , "Jul" , "Ago" , "Set" , "Out" , "Nov" , "Dez"]
  },
});
$updateRate = 1000;
$dimensions = {};
$devices = {};
$chart = null;
$options = {
    chart: {
        //renderTo: 'graph-canvas',
        type: 'line',
        backgroundColor: '#f8f8f8'
    },
    title: {
        text: 'Nível nos reservatórios'
    },
    plotOptions: {
      series: {
          shadow: true,
          animation: false
      }
    },
    xAxis: {
        title: {
            text: 'Horário'
        },
        // 2 hours
        range:  1 * 3600 * 1000 * 6,
        type: 'datetime',
        labels: {
          formatter: function () {
              // return Highcharts.dateFormat('%a %d %b %H:%M', this.value);
              return Highcharts.dateFormat('%H:%M', this.value);
          },
          dateTimeLabelFormats: {
              minute: '%H:%M',
              hour: '%H:%M',
              day: '%e. %b',
              week: '%e. %b',
              month: '%b \'%y',
              year: '%Y'
          }
        }
    },
    yAxis: {
        title: {
            text: 'Nível'
        },
        tickInterval: 10,
        min: 0,
        max: 100,
        labels: {
          formatter: function () {
              // return Highcharts.dateFormat('%a %d %b %H:%M', this.value);
              return Highcharts.format(this.value + '%');
          },
        }
    },
    scrollbar: {
        enabled: true,
        barBackgroundColor: "#033a67",
        barBorderColor: "#031a47",
        barBorderRadius: 6,
        buttonArrowColor: "#fff",
        buttonBackgroundColor: "#033a67",
        buttonBorderColor: "#031a47",
        buttonBorderRadius: 2,
        height: 25,
        margin:10,
        rifleColor: "#fff",
        trackBackgroundColor: "#f3f4f5"
    },
    credits: {
        enabled: true,
        position: {
          align: 'right',
          x: -10,
          verticalAlign: 'bottom',
          y: -5
        },
        // href: 'javascript:window.open("http://lcasystems.com.br/", "_blank")',
        text: 'LCA®'
    },
    // series: $dados
};

$historyOptions = {
    chart: {
        //renderTo: 'graph-canvas',
        type: 'line',
        height: 490,
        backgroundColor: '#f8f8f8'
    },
    tooltip: {
      borderRadius: 2,
      borderWidth: 1,
      valueDecimals: 2,
      animation: false
    },
    title: {
        text: 'Nível nos reservatórios'
    },
    plotOptions: {
      series: {
          shadow: true,
          showInNavigator: true,
          animation: false
      }
    },
    xAxis: {
        title: {
            text: 'Horário'
        },
        // 2 hours
        range:  1 * 3600 * 1000 * 6,
        type: 'datetime',
        labels: {
          formatter: function () {
              // return Highcharts.dateFormat('%a %d %b %H:%M', this.value);
              return Highcharts.dateFormat('%H:%M', this.value);
          },
          dateTimeLabelFormats: {
              minute: '%H:%M',
              hour: '%H:%M',
              day: '%e. %b',
              week: '%e. %b',
              month: '%b \'%y',
              year: '%Y'
          }
        }
    },
    yAxis: {
        title: {
            text: 'Nível'
        },
        tickInterval: 10,
        tickAmount: 11,
        minRange: 100,
        min: 0,
        max: 100,
        labels: {
          formatter: function () {
              // return Highcharts.dateFormat('%a %d %b %H:%M', this.value);
              return Highcharts.format(this.value + '%');
          },
          align: 'left'
        }
    },
    rangeSelector: {
      enabled: true,
      verticalAlign: 'bottom',
	    x: 0,
	    y: 0
    },
    scrollbar: {
        enabled: true,
        barBackgroundColor: "#033a67",
        barBorderColor: "#031a47",
        barBorderRadius: 6,
        buttonArrowColor: "#fff",
        buttonBackgroundColor: "#033a67",
        buttonBorderColor: "#031a47",
        buttonBorderRadius: 2,
        height: 18,
        margin:10,
        rifleColor: "#fff",
        trackBackgroundColor: "#f3f4f5"
    },
    credits: {
        enabled: false,
    }
};

$(".monitoring.index").ready(function() {
  //caching
  getDevices();

  plotChart();
  $allTimer = setInterval(
    function() {
      getLevels();
      updateChart();
    },
    $updateRate
  );
  return false;
});

$(".monitoring.devices_history").ready(function() {
  plotHistoryChart();
  // $allTimer = setInterval(
  //   function() {
  //     updateHistoryChart();
  //   },
  //   $updateRate
  // );
  return false;
});


function updateDevice($level) {
  $percentage = $level.percentage;
  //$litters = 1000 * $level.y * $dimensions[$level.device_id].z * $dimensions[$level.device_id].x
  $litters = $percentage/100 * $dimensions[$level.device_id].volume
  $water.animate({
    height: $percentage+'%'
  }, 1000);
  $tankInfo.html("Reservatório "+$level.device_id+"<br>Nível de água: "+$percentage+"%<br>Volume: "+$litters+" litros");
  $tankInfo.css('display','block')
  return false;
}

function resumeDevice($level) {
  $percentage = $level.percentage;
  // $litters = 1000 * $level.y * $dimensions[$level.device_id].z * $dimensions[$level.device_id].x
  $litters = $percentage/100 * $dimensions[$level.device_id].volume
  $waterDeviceInfo.html('Reservatório '+$level.device_id+'<br>Nível: '+$level.percentage+'%');
  $waterDeviceInfo.css('display', 'block')
  return false;
}

function deviceInfo($element) {
  if ($element.className.split(' ')[0] == 'water-device') {
    $device_id = $element.id.substr($element.id.length - 1);
    clearInterval($allTimer);
    $oneTimer = setInterval(
      function() {
        getLevel($device_id);
        updateChart();
      },
      $updateRate
    );
    $tankInfo.css('display','none')
    $devicesCanvas.css('display','none');
    $deviceCanvas.css('display','block');
  }
  else {
    clearInterval($oneTimer);
    $allTimer = setInterval(
      function() {
        getLevels();
        updateChart();
      },
      $updateRate
    );
    $deviceCanvas.css('display','none');
    $devicesCanvas.css('display','block');
  }
  return false;
}

function deviceResumeShow($element) {
  if ($element.className.split(' ')[0] == 'water-device') {
    $device_id = $element.id.substr($element.id.length - 1);
    getResume($device_id);
  }
  return false;
}

function deviceResumeHide($element) {
  $waterDeviceInfo.css('display', 'none');
  return false;
}

function getLevel($device_id) {
  $.ajax({
    type: "GET",
    url: "/render_current_level/"+$device_id,
    dataType: "json",
    success: function(response){
      updateDevice(response);
    }
  });
  return false;
}

function getResume($device_id) {
  $.ajax({
    type: "GET",
    url: "/render_current_level/"+$device_id,
    dataType: "json",
    success: function(response){
      resumeDevice(response);
    }
  });
  return false;
}


function updateDevices($level) {
  $percentage = $level.percentage;
  if ($percentage >= 0 && $percentage < 10) {
    $devices[$level.device_id].removeClass( "low medium full" ).addClass('empty');
  }
  else if ($percentage >= 10 && $percentage < 40) {
    $devices[$level.device_id].removeClass( "empty medium full" ).addClass('low');
  }
  else if ($percentage >= 40 && $percentage < 80) {
    $devices[$level.device_id].removeClass( "empty low full" ).addClass('medium');
  }
  else if ($percentage >= 80) {
    $devices[$level.device_id].removeClass( "empty low medium" ).addClass('full');
  }
  return false;
}

function verifyDataSending(data) {
  $now = new Date();
  $now_milis = $now.getTime();
  $time= new Date(data.created_at);
  $diff = ($now_milis - $time.getTime());
  // 15 minutes
  if ($diff > 1000 * 60 * 15) {
    $devices[data.device_id].html('<i class="fa fa-exclamation-triangle"></i>');
  }
  else {
    $devices[data.device_id].html('');
  }
  return false;

}

function getLevels() {
  $.ajax({
    type: "GET",
    url: "/render_all_current_levels",
    dataType: "json",
    success: function(response){
      response.forEach(updateDevices);
      response.forEach(verifyDataSending);
    }
  });
  return false;
}

function getDevices() {
  $.ajax({
    type: "GET",
    url: "/get_all_dimensions",
    dataType: "json",
    success: function(response){
      $temp = response;
      for (i = 0; i < $temp.length; i++) {
        $devices[$temp[i].device_id] = ($('#device-'+$temp[i].device_id));
        $dimensions[$temp[i].device_id] = $temp[i];
      }
      $tankInfo = $(".tank-info");
      $water = $(".water");
      $waterDeviceInfo = $('.water-device-info');
      $deviceCanvas = $('.device-canvas');
      $devicesCanvas = $('.devices-canvas');
      getLevels();
    }
  });
  return false;
}

function plotChart() {
  $.ajax({
    type: "GET",
    // #hidden_id is at _infos.html.erb. It shows the user who owns the devices.
    // Must be changed if more than a user has a device
    url: "/get_user_devices_levels/"+$("#hidden_id").val(),
    dataType: "json",
    success: function(response){
      $options.series = response;
      $options.chart.renderTo = "graph-canvas";
      $chart = new Highcharts.Chart($options);
    }
  });
  return false;
}

function plotHistoryChart() {
  $.ajax({
    type: "GET",
    // #hidden_id is at _infos.html.erb. It shows the user who owns the devices.
    // Must be changed if more than a user has a device
    url: "/get_user_devices_levels_history/"+$("#hidden_id").val(),
    dataType: "json",
    success: function(response){
      // $historyOptions.plotOptions.series.shadow = true;
      $historyOptions.series = response;
      $historyOptions.chart.renderTo = "history-graph-canvas";
      $chart = new Highcharts.StockChart($historyOptions);
    }
  });
  return false;
}

// Updating Chart
function updateChart() {
  $.ajax({
    type: "GET",
    url: "/get_user_devices_levels/"+$("#hidden_id").val(),
    dataType: "json",
    success: function(response){
      $($chart.series).each(function(i) {
        $chart.series[i].update(response[i]);
        // Problema da Função receber um NaN
        // $chart.series[i].setData(response[i].data);
      });
      $ex = $chart.xAxis[0].getExtremes();
      // $ex.max - $ex.min = difference milli seconds between first plot and last
      if ($ex.dataMax - $ex.dataMin > 3600000) {
        if ($ex.dataMax - $ex.max  < 60000 ) {
          $chart.xAxis[0].setExtremes($ex.min, $ex.dataMax + 120000);
        }
        else {

        }
      }
      else {
        $chart.xAxis[0].setExtremes($ex.dataMin - 2000, $ex.dataMax + 2000);
      }
      // $("body").append($ex.min+" "+($ex.max - $ex.min)+" "+$ex.max+"<br>");
      // $("body").append($ex.dataMin+" "+($ex.dataMax - $ex.dataMin)+" "+$ex.dataMax+"<br><br>");

    }
  });
  return false;
}

function updateHistoryChart() {
  $.ajax({
    type: "GET",
    url: "/get_user_devices_levels_history/"+$("#hidden_id").val(),
    dataType: "json",
    success: function(response){
      $($chart.series).each(function(i) {
        $chart.series[i].update(response[i]);
        // Problema da Função receber um NaN
        // $chart.series[i].setData(response[i].data);
      });
      $ex = $chart.xAxis[0].getExtremes();
      // $("body").append(($ex.max - $ex.min)+"<br>");
      // $ex.max - $ex.min = difference milli seconds between first plot and last
      if ($ex.max - $ex.min > 360000) {
        $chart.xAxis[0].setExtremes($ex.min + (1000) , $ex.max + (1000));
      }
      $chart.redraw();
    }
  });
  return false;
}

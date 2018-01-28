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

$dark_theme = Highcharts.theme = {
  chart: {
    backgroundColor: '#0a0d20',
    style: {
       fontFamily: '\'Unica One\', sans-serif'
    },
  },
  colors: ['#2b908f', '#b0eeae', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
      '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
  title: {
      style: {
        color: "#C9B978",
        fontSize: "20px"
      }
  },
  tooltip: {
    borderRadius: 2,
    valueDecimals: 2,
    animation: false,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    style: {
       color: '#F0F0F0'
    }
  },
  plotOptions: {
    series: {
        shadow: true,
        animation: false
    }
  },
  legend: {
    itemHoverStyle:{
      color: '#C9B978'
    },
    itemHiddenStyle:{
      color: '#5a5d70'
    },
    itemStyle: {
      color: '#eee',
      fontWeight: 'bold'
    }
  },
  xAxis: {
    gridLineColor: '#1b2040',
    title: {
      style: {
        color: "#C9B978"
      }
    },
    labels: {
      style: {
        color: '#efeff5'
      }
    },
    style: {
      color: "#fff"
    },
    lineColor: '#fff'
  },
  yAxis: {
    gridLineColor: '#191d3d',
    title: {
      style: {
        color: "#C9B978"
      }
    },
    labels: {
      style: {
        color: '#efeff5'
      }
    },
    style: {
      color: "#fff"
    },
    tickColor: '#fff'
  },
  rangeSelector: {
    buttonTheme: { // styles for the buttons
      fill: 'none',
      stroke: 'none',
      'stroke-width': 0,
      r: 8,
      style: {
        color: '#efeff5',
        fontWeight: 'bold'
      },
      states: {
        hover: {
          fill: 'none',
          style: {
            color: '#C9B978'
          }
        },
        select: {
          fill: '#C9B978',
          style: {
            color: '#14172f'
          }
        },
        disabled: {
          style: {
            color: '#5a5d70'
          }
        }
      }
    },
    inputBoxBorderColor: '#efeff5',
    inputStyle: {
        color: '#efeff5'
    },
    labelStyle: {
        color: '#C9B978'
    },
  },
  navigator: {
    handles: {
       backgroundColor: '#C9B978',
       borderColor: '#14172f'
    },
    outlineColor: '#3b4060',
    maskFill: 'rgba(190,210,160,0.165)',
    // series: {
    //    color: '#7798BF',
    //    lineColor: '#A6C7ED'
    // },
    xAxis: {
       gridLineColor: '#3b4060'
    }
   },
  scrollbar: {
      enabled: true,
      barBackgroundColor: "#404565",
      barBorderColor: "#05031a",
      barBorderRadius: 6,
      barBorderWidth: 0,
      buttonArrowColor: "#C9B978",
      buttonBackgroundColor: "#404565",
      buttonBorderColor: "#05031a",
      buttonBorderRadius: 4,
      buttonBorderWidth: 0,
      height: 25,
      margin:10,
      rifleColor: "#C9B978",
      trackBackgroundColor: "#101535",
      trackBorderWidth: 0,
      trackBorderRadius: 8,
      trackBorderColor: 'none'
  },
  credits: {
      enabled: false,
      style: {
        color: "#eee"
      },
      position: {
        align: 'right',
        x: -10,
        verticalAlign: 'bottom',
        y: -5
      },
      href: 'javascript:window.open("http://lcasystems.com.br/", "_blank")',
      text: 'LCA®'
  }
}
$graphUpdateRate = 60000;
$deviceUpdateRate = 1000;
$dimensions = {};
$devices = {};
$chart = null;
$options = {
  chart: {
    //renderTo: 'graph-canvas',
    type: 'line'
  },
  title: {
    text: 'Nível nos reservatórios'
  },
  tooltip: {
    valueSuffix: '%',
    xDateFormat: '%A, %e de %B, %H:%M:%S'
  },
  xAxis: {
    title: {
      text: 'Horário',
    },
    // 8 hours
    range:  1 * 3600 * 1000 * 8,
    type: 'datetime',
    labels: {
      formatter: function () {
        if (Highcharts.dateFormat('%H:%M', this.value) == "00:00") {
          if (Highcharts.dateFormat('%d/%m', this.value) == "01/01") {
            return Highcharts.dateFormat('%H:%M<br>%e %b/%Y', this.value);
          }
          else {
            return Highcharts.dateFormat('%H:%M<br>%e %b', this.value);
          }
        }
        else {
          return Highcharts.dateFormat('%H:%M', this.value);
        }
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
        return Highcharts.format(this.value + '%');
      },
    }
  }
};

$historyOptions = {
    chart: {
        //renderTo: 'graph-canvas',
        type: 'line',
        height: 490,
        backgroundColor: '#0a0d20'
    },
    tooltip: {
      valueSuffix: '%',
      xDateFormat: '%A, %e de %B, %H:%M:%S'
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
        // 72 hours
        range:  1 * 3600 * 1000 * 72,
        type: 'datetime',
        labels: {
          formatter: function () {
              if (Highcharts.dateFormat('%H:%M', this.value) == "00:00") {
                if (Highcharts.dateFormat('%d/%m', this.value) == "01/01") {
                  return Highcharts.dateFormat('%H:%M<br>%e %b/%Y', this.value);
                }
                else {
                  return Highcharts.dateFormat('%H:%M<br>%e %b', this.value);
                }
              }
              else {
                return Highcharts.dateFormat('%H:%M', this.value);
              }
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
    $graphUpdateRate
  );
  return false;
});

$(".monitoring.devices_history").ready(function() {
  plotHistoryChart();
  return false;
});


function updateDevice($level) {
  $percentage = $level.percentage;
  $litters = ($percentage/100 * $dimensions[$level.device_id].volume).toFixed(2)
  $water.animate({
    height: $percentage+'%'
  }, 1000);
  $tankInfo.html("Reservatório "+$level.device_id+"<br>Nível de água: "+$percentage+"%<br>Volume: "+$litters+" litros");
  $tankInfo.css('display','block')
  return false;
}

function resumeDevice($level) {
  $percentage = $level.percentage;
  $litters = ($percentage/100 * $dimensions[$level.device_id].volume).toFixed(2)
  $waterDeviceInfo.html('Reservatório '+$level.device_id+'<br>Nível: '+$level.percentage+'%');
  $waterDeviceInfo.css('display', 'block')
  return false;
}

function deviceInfo($element) {
  if ($element.className.split(' ')[0] == 'water-device') {
    $device_id = $element.id.split('-')[1]
    clearInterval($allTimer);
    $oneTimer = setInterval(
      function() {
        getLevel($device_id);
        updateChart();
      },
      $deviceUpdateRate
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
      $graphUpdateRate
    );
    $deviceCanvas.css('display','none');
    $devicesCanvas.css('display','block');
  }
  return false;
}

function deviceResumeShow($element) {
  if ($element.className.split(' ')[0] == 'water-device') {
    $device_id = $element.id.split('-')[1]
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
      verifyDataSending(response)
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
  else if ($percentage >= 40 && $percentage < 60) {
    $devices[$level.device_id].removeClass( "empty low full" ).addClass('medium');
  }
  else if ($percentage >= 60) {
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
      Highcharts.setOptions($dark_theme);
      $options.series = response;
      $options.chart.renderTo = "graph-canvas";
      $chart = new Highcharts.Chart($options);
    }
  });
  return false;
}

function plotHistoryChart() {
  $('#loading').show();
  $.ajax({
    type: "GET",
    // #hidden_id is at _infos.html.erb. It shows the user who owns the devices.
    // Must be changed if more than a user has a device
    url: "/get_user_devices_levels_history/"+$("#hidden_id").val(),
    dataType: "json",
    success: function(response){
      $('#loading').hide();
      // $historyOptions.plotOptions.series.shadow = true;
      Highcharts.setOptions($dark_theme);
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
          $chart.xAxis[0].setExtremes($ex.min, $ex.dataMax + 60000);
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

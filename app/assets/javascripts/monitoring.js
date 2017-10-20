$updateRate = 1000;
$dimensions = [];
$chart = null;
$options = {
    chart: {
        renderTo: 'graph-canvas',
        type: 'line',
        backgroundColor: '#f8f8f8'
    },
    title: {
        text: 'Nível nos reservatórios'
    },
    plotOptions: {
      series: {
          animation: false
      }
    },
    xAxis: {
        title: {
            text: 'Horário'
        },
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
        labels: {
          formatter: function () {
              // return Highcharts.dateFormat('%a %d %b %H:%M', this.value);
              return Highcharts.format(this.value + '%');
          },
        }
    },
    scrollbar: {
        enabled: true
    },
    credits: {
        enabled: true,
        position: {
          align: 'right',
          x: -10,
          verticalAlign: 'bottom',
          y: -5
        },
        href: 'javascript:window.open("http://lcasystems.com.br/", "_blank")',
        text: 'LCA®'
    },
    // series: $dados
};

$(".monitoring.index").ready(function() {
  getLevels();
  getDevices();
  plotChart();
  $allTimer = setInterval(
    function() {
      getLevels();
      updateChart();
    },
    $updateRate
  );
});


function updateDevice($level) {
  $percentage = $level.percentage;
  $litters = 1000 * $level.y * $dimensions[$level.device_id - 1].z * $dimensions[$level.device_id - 1].x
  $(".tank_info").html("Nível de água: "+$percentage+"%<br>Volume: "+$litters+" litros");
  $('.water').animate({
    height: $percentage+'%'
  }, 1000);
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
    $('.devices-canvas').css('display','none');
    $('.device-canvas').css('display','block');
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
    $('.device-canvas').css('display','none');
    $('.devices-canvas').css('display','block');
  }
}

function getLevel() {
  $.ajax({
    type: "GET",
    url: "/render_current_level/"+$device_id,
    dataType: "json",
    success: function(response){
      updateDevice(response);
    }
  });
}


function updateDevices($level) {
  $percentage = $level.percentage;
  if ($percentage >= 0 && $percentage < 10) {
    $('#device-'+$level.device_id).removeClass( "low medium full" ).addClass('empty');
  }
  else if ($percentage >= 10 && $percentage < 40) {
    $('#device-'+$level.device_id).removeClass( "empty medium full" ).addClass('low');
  }
  else if ($percentage >= 40 && $percentage < 80) {
    $('#device-'+$level.device_id).removeClass( "empty low full" ).addClass('medium');
  }
  else if ($percentage >= 80) {
    $('#device-'+$level.device_id).removeClass( "empty low medium" ).addClass('full');
  }
}

function getLevels() {
  $.ajax({
    type: "GET",
    url: "/render_all_current_levels",
    dataType: "json",
    success: function(response){
      response.forEach(updateDevices);
    }
  });
}

function getDevices() {
  $.ajax({
    type: "GET",
    url: "/get_all_dimensions",
    dataType: "json",
    success: function(response){
      $dimensions = response;
    }
  });
}


function plotChart() {
  $.ajax({
    type: "GET",
    url: "/get_devices_levels",
    dataType: "json",
    success: function(response){
      $options.series = response;
      $chart = new Highcharts.Chart($options);
    }
  });
}

// Updating Chart
function updateChart() {
  $.ajax({
    type: "GET",
    url: "/get_devices_levels",
    dataType: "json",
    success: function(response){
      $($chart.series).each(function(i) {
        $chart.series[i].setData(response[i].data);
      });
      $chart.redraw();
    }
  });
}
$updateRate = 1000;
$dimensions = [];

$(".monitoring.index").ready(function() {
  getLevels();
  getDevices();
  
  // chart();
  $allTimer = setInterval(
    function() {
      getLevels();
      //updatechart();
    },
    $updateRate
  );
});

// function updateDevice($level) {
//   switch ($level) {
//     case 0:
//     $('.water').animate({
//           height: '5%'
//       }, 1000);  
//       break;
//     
//     case 1:
//     $('.water').animate({
//           height: '30%'
//       }, 1000);
//       break;
//     
//     case 2:
//     $('.water').animate({
//           height: '65%'
//       }, 1000);
//       break;
//     
//     case 3:
//     $('.water').animate({
//           height: '95%'
//       }, 1000);
//       break;    
//   }
// }

function updateDevice($level) {
  $percentage = $level.y / $dimensions[$level.device_id - 1].y*100;
  $percentage = Math.round($percentage).toFixed(2);
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

// function updateDevices($level) {
//   switch($level.level) {
//     case 0:
//       $('#device-'+$level.device_id).removeClass( "low medium full" ).addClass('empty');
//       break;
//     case 1:
//       $('#device-'+$level.device_id).removeClass( "empty medium full" ).addClass('low');
//       break;
//     case 2:
//       $('#device-'+$level.device_id).removeClass( "empty low full" ).addClass('medium');
//       break;
//     case 3:
//       $('#device-'+$level.device_id).removeClass( "empty low medium" ).addClass('full');
//       break;  
//   }
// }

function updateDevices($level) {
  $percentage = $level.y / $dimensions[$level.device_id - 1].y;
  if ($percentage >= 0 && $percentage < 0.1) {
    $('#device-'+$level.device_id).removeClass( "low medium full" ).addClass('empty');
  }
  else if ($percentage >= 0.2 && $percentage < 0.4) {
    $('#device-'+$level.device_id).removeClass( "empty medium full" ).addClass('low');
  }
  else if ($percentage >= 0.4 && $percentage < 0.8) {
    $('#device-'+$level.device_id).removeClass( "empty low full" ).addClass('medium');
  }
  else if ($percentage >= 0.8) {
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

// Creating Chart Mannualy
function chart() {
  $.ajax({
    type: "GET",
    url: "/get_all_devices_graph",
    dataType: "json",
    success: function(response){
      $chart = new Chartkick.LineChart("graph-display", response);
    }
  });
}

// Updating Chart
function updatechart() {
  $.ajax({
    type: "GET",
    url: "/get_all_devices_graph",
    dataType: "json",
    success: function(response){
      $chart = Chartkick.charts["chart-1"];
      $chart.updateData(response);
    }
  });
}
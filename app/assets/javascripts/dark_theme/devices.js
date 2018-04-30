$(".devices.edit, .devices.new, .devices.new_registration, .devices.edit_registration, .devices").ready(function(){
  $formModel = $(".form-model")
  $formDimension = $(".form-dimension")
  $serialError = $(".serial-error")
  $serialRegister = $("#serial-register")
  $descField = $("#desc-field")
  $waterFormat = /^\d{4}-\d{4}-\d{2}$/
  $sigfoxFormat = /^\w{6}$/
  $deviceId = null

  // $("#serial-field").mask('9999-9999-99');
  // $("#serial-register").mask('9999-9999-99');

  if ($formModel.val() == "water_level") {
    $formDimension.css('display','block')
  }

  $formModel.change(function() {
    if ($formModel.val() == "water_level") {
      $formDimension.css('display','block')
    }
    else {
      $formDimension.css('display','none')
    }
  });

  // Edit Registration
  if ($waterFormat.test($("#device_serial").val())) {
    $formDimension.css('display','block')
  }

  $("#serial-field").change(function(){
    $.ajax({
      type: "GET",
      url: "/serial_check/"+$("#serial-field").val(),
      dataType: "html",
      success: function(response){
        if (response != "[]") {
          $serialError.html("Número de Série já cadastrado");
        }
        else {
          $serialError.html("");
        }
      }
    });
  });

  $("#btn-next").click(function(e) {
    $.ajax({
      type: "GET",
      url: "/available_check/"+$serialRegister.val(),
      dataType: "json",
      success: function(response){
        if (response == "") {
          $serialError.html("Número de Série inválido");
        }
        else {
          if ($sigfoxFormat.test($serialRegister.val())) {
            $deviceId = response[0].id
            $(".main-registration").css("display","none")
            $("#detail-registration").css("display","block")
            $(".registering-serial").html($serialRegister.val())
          }
          else if ($waterFormat.test($serialRegister.val())) {
            $deviceId = response[0].id
            $(".main-registration").css("display","none")
            $("#detail-registration .form-dimension, #detail-registration").css("display","block")
            $(".registering-serial").html($serialRegister.val())
          }
          else {
            $serialError.html("Número de Série inválido");
          }
        }
      }
    });
  });
  $("#btn-back").click(function(e) {
    $(".main-registration").css("display","block")
    $("#detail-registration .form-dimension, #detail-registration").css("display","none")
    $(".registering-serial").html("")
  });

  $("#btn-submit").click(function(e){
      e.preventDefault();
      $.ajax({
        type: "POST",
        url: "/registration_process/",
        dataType: "json",
        data: {
          device: {
            serial: $serialRegister.val(), dimension_attributes: {
              x: $(".dimension-x").val(), y: $(".dimension-y").val(), z: $(".dimension-z").val(), volume: $(".dimension-volume").val(), id: $deviceId
            }
          },
          user_device: {description: $descField.val()}
        },
        success: function(r){
          document.location.href = "/devices/";
        }
      });
  });

});

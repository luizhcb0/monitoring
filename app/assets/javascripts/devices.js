$(document).ready(function(){
  $("#serial-field").mask('9999-9999-99');
  $("#serial-register").mask('9999-9999-99');


  $("#serial-field").change(function(){
    $.ajax({
      type: "GET",
      url: "/serial_check/"+$("#serial-field").val(),
      dataType: "html",
      success: function(response){
        if (response != "[]") {
          $(".serial-error").html("O Número de Série já existe");
        }
        else {
          $(".serial-error").html("");
        }
      }
    });
  });

  $("#btn-submit").click(function(e){
      e.preventDefault();
      $.ajax({
        type: "GET",
        url: "/available_check/"+$("#serial-register").val(),
        dataType: "html",
        success: function(response){
          if (response != "[]") {
            $(".serial-error").html("");
            $.ajax({
              type: "POST",
              url: "/registration_process/",
              dataType: "json",
              data: {device: {serial: $("#serial-register").val(), description: $("#desc-field").val() }},
              success: function(r){
                document.location.href = "/devices/";
              }
            });
          }
          else {
            $(".serial-error").html("Número de Série inválido");
          }
        }
      });
  });

});

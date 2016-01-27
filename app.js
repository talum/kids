$(document).on('ready', function(){
  parseBoroughs();
  displayAllBoroughs();
  neighborhoodClickListener();
});

function parseBoroughs(){
  data.forEach(function(boroughObject){
    var boroughName = boroughObject.borough.name;
    var boroughId = boroughObject.borough.id;
    var mappings = boroughObject.mappings;

    function displayBorough(){
      $("#container-A").append('<div id="' + boroughId +'"><h1>' + boroughName + '</h1>');
      } 
    displayBorough(); 
    
    mappings.forEach(function(mappingObject){
      var macroName = mappingObject.macro.name;
      var macroId = mappingObject.macro.id;

      var neighborhoods = mappingObject.neighborhoods;
      var neighborhoodArray = neighborhoods.map(function(obj){
          return obj.name;
      });
     
     displayMacro();

     function displayMacro(){
        if (!(neighborhoodArray.includes(macroName))){
          $("#" + boroughId).append("<h2>" + macroName + "</h2>");
        }
        $("#" + boroughId).append('<ul id="' + macroId + '"></ul>');
      }

      function displayNeighborhood(){
        for (var i=0; i<neighborhoodArray.length; i++){
          $("#" + macroId).append("<li><a href='#'>" + neighborhoodArray[i] + "</a></li>");
        }
      }
        displayNeighborhood();   
    });
  });
}

function displayAllBoroughs(){
  data.forEach(function(boroughObject){
    var boroughId = boroughObject.borough.id;
    $(".borough-list").append("<li class='" + boroughId + "'>" + boroughObject.borough.name + "</li>");
  })
}

function neighborhoodClickListener(){
  $("li").on("click", function(e){
    var boroughId = $(this).parent().parent().attr('id');
    var $borough = $("li."+boroughId);
    e.preventDefault();
    $borough.addClass("highlighted");
    $(this).on('mouseout', function(){
      $borough.removeClass("highlighted");
    })
  });
}
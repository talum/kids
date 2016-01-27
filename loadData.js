$(document).on("ready", function(){
  var app = new App();
  app.parseBoroughs();
  app.displayAllBoroughs();
  app.neighbrhoodClickListener();
});

var App = function(){};

App.prototype.parseBoroughs = function(){
  data.forEach(function(boroughObject){
      var boroughName = boroughObject.borough.name;
      var boroughId = boroughObject.borough.id;
      var mappings = boroughObject.mappings;

      function displayBorough(){
        $("#container-A").append('<div id="' + boroughId +'" class="borough-listing"><h2>' + boroughName + '</h2>');
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
          if (boroughName !== macroName){
            $("#" + boroughId).append("<h3>" + macroName + "</h3>");
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

App.prototype.displayAllBoroughs = function(){
  data.forEach(function(boroughObject){
    var boroughId = boroughObject.borough.id;
    $(".borough-list").append("<li class='" + boroughId + "'>" + boroughObject.borough.name + "</li>");
  });  
}

App.prototype.neighbrhoodClickListener = function(){
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
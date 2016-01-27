document.addEventListener('DOMContentLoaded', function(){
    var app = new App();
    app.parseBoroughs();
    app.displayAllBoroughs();
    app.neighbrhoodClickListener();
})

var App = function(){};

App.prototype.parseBoroughs = function(){
  data.forEach(function(boroughObject){
      var boroughName = boroughObject.borough.name;
      var boroughId = boroughObject.borough.id;
      var mappings = boroughObject.mappings;

      function displayBorough(){
        var containerA = document.querySelector("#container-A");
        var boroughContainer = document.createElement('div');
        boroughContainer.id = "borough" + boroughId;
        var boroughHeader = document.createElement('h2');
        boroughHeader.className += "borough-listing";
        boroughHeader.textContent = boroughName;
        containerA.appendChild(boroughContainer);
        boroughContainer.appendChild(boroughHeader);
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
          var boroughContainer = document.querySelector("#borough"+boroughId);
          var boroughList = document.createElement('ul');
          boroughList.id = "list" + macroId;
          boroughContainer.appendChild(boroughList);

          if (boroughName !== macroName){
            var macroHeader = document.createElement('h3');
            macroHeader.textContent = macroName;
            boroughContainer.appendChild(macroHeader);
          }
        }

        function displayNeighborhood(){
          var boroughList = document.querySelector("#list" + macroId);
          for (var i=0; i<neighborhoodArray.length; i++){
            var neighborhood = document.createElement('li');
            neighborhood.innerHTML = "<a href='#'>" + neighborhoodArray[i] + "</a>";
            boroughList.appendChild(neighborhood);
          }
        }
          displayNeighborhood();   
      });
    });  
}

App.prototype.displayAllBoroughs = function(){
  data.forEach(function(boroughObject){
    var boroughId = boroughObject.borough.id;
    var boroughList = document.querySelector(".borough-list");
    var boroughListItem = document.createElement('li');
    boroughListItem.textContent = boroughObject.borough.name;
    boroughListItem.className += ("borough" + boroughId);
    boroughList.appendChild(boroughListItem);
  });  
}

App.prototype.neighbrhoodClickListener = function(){
  var linkedNeighborhoods = document.querySelectorAll('li');
  for(i=0; i<linkedNeighborhoods.length; i++){
    linkedNeighborhoods[i].addEventListener("click", function(e){
      e.preventDefault();
      var boroughId = this.parentElement.parentElement.id;
      var boroughInList = document.querySelector("."+boroughId);
      boroughInList.classList.add("highlighted");
      this.addEventListener("mouseout", function(){
        boroughInList.classList.remove("highlighted");
      });
    });
  }
 }
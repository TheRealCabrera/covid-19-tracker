var dropdown = $('#country-dropdown');
dropdown.empty();
dropdown.append('<option selected="true" disabled>Choose country</option>');
dropdown.prop('selectedIndex',0);
var countriesUrl='reports/countries';

$.getJSON(countriesUrl,function (data) {
	$.each(data, function(key, entry){
		console.log(entry.name);
		dropdown.append($('<option></option>').attr('value', entry.name.toLowerCase()).text(entry.name));	
		})
});

$('#country-dropdown').change(function(){
    sendRequest("/reports/test/"+$(this).val(),"GET");
    //+$(this).val(),"GET");
});

function sendRequest(url, method) {
  $.ajax({
    url: url,
    async: false,
    
    success: function(response) {
      console.log("Successful >> url:" + url);
//      let results = response.split(", ").map(Number);
      console.log(response);
      var jsonObj = JSON.parse(response);
      
      loadChart(jsonObj.dataPoints, document.getElementById("country-dropdown").value);
    },
//    error: function(response) {
//      console.log("Error");

//    },
    error: function(xhr, textStatus, errorThrown){
    	console.log("error");
    	console.log(xhr.responseText);
    },
    type: method,
    headers: {
 //     Accept: 'application/json;charset=utf-8',
      'Content-Type': 'text/plain'
    },
    dataType: 'text'
  });
 }




//------------------------------
// Chart to display predictions
//------------------------------
var chart = "";

function loadChart(dp, state) {
	var chart = new CanvasJS.Chart("chartContainer", {
		title:{
			text: "COVID-19 confirmed cases over time for " + state.toUpperCase()              
		},
		data: [              
		{
			// Change type to "doughnut", "line", "splineArea", etc.
			type: "column",
			dataPoints: dp
		}
		]
	});
	chart.render();
}

//----------------------------
// display chart with updated
// drawing from canvas
//----------------------------




var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?units=metric&';
var cities = ['London', 'Ankara', 'Berlin', 'Miami'];
var apiKey = '734f76cc92d3b821fb15c1c613fe9965';

if(typeof apiKey === 'undefined'){
	alert('Api key is not defined');
}

function addCity(query, b){
	"use strict";
	$.getJSON(apiUrl + 'q=' + query + '&appid=' + apiKey, function(data) {
		if(data.cod === 200){
			if(!cities.includes(data.name) || !b){
				cities.push(data.name);
				$(".citylist_div ul").append('<li id="' + data.id + '"><span class="list_delete">×</span><span class="list_cityname">' + data.name + ', ' + data.sys.country + '</span><span class="list_forecast">' + data.weather[0].main + '</span><span class="list_celsius">' + parseInt(data.main.temp) + ' °C</span></li>');
				$('#addcity').val('');
				$('#addcity').focus();
			}else{
				alert('Bu şehir zaten eklendi !');
			}
		}else if(data.cod === 404){
			alert('City not found');
		}
	}).fail(function(jqXHR) {
    if (jqXHR.status === 404) {
        alert("City Not Found");
    }
});
}

cities.forEach(function(element) {
	addCity(element, false);
});

$('#addcity').keyup(function(e){
	"use strict";
    if(e.keyCode === 13)
    {
        addCity($(this).val(), true);
    }
});

$('#addcity_button').on('click', function(){
	"use strict";
	addCity($('#addcity').val());
});

$("#search").keyup(function () {
    var filter = $(this).val();
    $(".citylist_div ul li").each(function () {
        if ($(this).text().search(new RegExp(filter, "i")) < 0) {
            $(this).hide();
        } else {
            $(this).show()
        }
    });
});

$(document).on('click','.list_delete',function(){
	"use strict";
	var newCities = [];
	var id = $(this).parent().attr('id');
	$.getJSON(apiUrl + 'id=' + id + '&appid=' + apiKey, function(data) {
		cities.forEach(function(element) {
			if(element !== data.name){
				newCities.push(element);
			}
		cities = newCities;
		});
	});
    $(this).closest('li').remove();
});
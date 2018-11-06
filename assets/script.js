var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?units=metric&';
var cities = ['London', 'Ankara', 'Berlin', 'Miami'];
var apiKey = '734f76cc92d3b821fb15c1c613fe9965';

if(typeof apiKey === 'undefined'){
	alert('Api key is not defined');
}

function addCity(query, b){
	"use strict";
    cityfound('',false);
	$.getJSON(apiUrl + 'q=' + query + '&appid=' + apiKey, function(data) {
		if(data.cod === 200){
			if(!cities.includes(data.name) || !b){
				cities.push(data.name);
				var li_background = 'haze';
				if(data.weather[0].main.toLowerCase()==='clear'){li_background = 'clear';}
				$(".citylist_div ul").append('<li id="' + data.id + '" class="' + li_background + '"><span class="list_delete">×</span><span class="list_cityname">' + data.name + ', ' + data.sys.country + '</span><span class="list_forecast">' + data.weather[0].main + '</span><span class="list_celsius">' + parseInt(data.main.temp) + ' °C</span></li>');
				$('#addcity').val('');
				$('#addcity').focus();
			}else{
        		cityfound('City already added',true);
			}
		}else if(data.cod === 404){
			cityfound('City not found',true);
		}
	}).fail(function(jqXHR) {
    if (jqXHR.status === 404) {
        cityfound('City not found',true);
    }
});
}

cities.forEach(function(element) {
	"use strict";
	addCity(element, false);
});

$('#addcity').keyup(function(e){
	"use strict";
	cityfound('',false);
	searchfound(false);
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
	var count = 0;
	cityfound('',false);
    $(".citylist_div ul li").each(function () {
        if ($(this).text().search(new RegExp(filter, "i")) < 0) {
            $(this).hide();
        } else {
            $(this).show();
			count++;
        }
    });
		if(count===0){
			searchfound(true);
		}else{
			searchfound(false);
		}
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

function searchfound(b){
	"use strict";
	if(b){
			if(!$('#search_info').length){
				$(".search_div").append('<span id="search_info" class="search_error"></span>');				
			}
			$("#search_info").removeClass('err_out');
			$("#search_info").html('No Results');
			$("#search_info").addClass('err_in');
		}else{
			$("#search_info").removeClass('err_in');
			$("#search_info").addClass('err_out');
		}
}
function cityfound(s,b){
	"use strict";
		if(b){
			if(!$('#add_info').length){
				$(".addcity_div").append('<span id="add_info" class="add_error"></span>');				
			}
			$("#add_info").removeClass('err_out');
			$("#add_info").html(s);
			$("#add_info").addClass('err_in');
		}else{
			$("#add_info").removeClass('err_in');
			$("#add_info").addClass('err_out');
		}
}

document.addEventListener("click", function(){
	"use strict";
    cityfound('',false);
	searchfound(false);
});
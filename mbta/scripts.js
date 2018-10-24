function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 42.352271, lng: -71.05524200000001},
	  zoom: 13
	});

	setLines(map);
    setMarkers(map);
    findMe(map);
    
}

var RedLineStopCoordinates_ray = [
		['Alewife', 42.395428, -71.142483, 1, 'place-alfcl'],
		['Davis', 42.39674, -71.121815, 2, 'place-davis'],
		['Porter', 42.3884, -71.11914899999999, 3, 'place-portr'],
		['Harvard', 42.373362, -71.118956, 4, 'place-harsq'],
		['Central', 42.365486, -71.103802, 5, 'place-cntsq'],
		['Kendall', 42.36249079, -71.08617653, 6, 'place-knncl'],
		['Charles', 42.361166, -71.070628, 7, 'place-chmnl'],
		['Park St', 42.35639457, -71.0624242, , 'place-pktrm'],
		['Downtown Crossing', 42.355518, -71.060225, 9, 'place-dwnxg'],
		['South Station', 42.352271, -71.05524200000001, 10, 'place-sstat'],
		['Broadway', 42.342622, -71.056967, 11, 'place-brdwy'],
		['Andrew', 42.330154, -71.057655, 12, 'place-andrw'],
		['JFK', 42.320685, -71.052391, 13, 'place-jfk'],
		['North Quincy', 42.275275, -71.029583, 14, 'place-nqncy'],
		['Wollaston', 42.2665139, -71.0203369, 15, 'place-wlsta'],
		['Quincy Center', 42.251809, -71.005409, 16, 'place-qnctr'],
		['Quincy Adams', 42.233391, -71.007153, 17, 'place-qamnl'],
		['Braintree', 42.2078543, -71.0011385, 18, 'place-brntn']
    ];
var Fork_ray = [
		['JFK', 42.320685, -71.052391, 19, 'place-jfk'],
		['Savin Hill', 42.31129, -71.053331, 20, 'place-shmnl'],
		['Fields Corner', 42.300093, -71.061667, 21, 'place-fldcr'],
		['Shawmut', 42.29312583, -71.06573796000001, 22, 'place-smmnl'],
		['Ashmont', 42.284652, -71.06448899999999, 23, 'place-asmnl']
	];

function setLines(map) {
	var RedLineStopCoordinates = [
			new google.maps.LatLng(42.395428, -71.142483),
			new google.maps.LatLng(42.39674, -71.121815),
			new google.maps.LatLng(42.3884, -71.11914899999999),
			new google.maps.LatLng(42.373362, -71.118956),
			new google.maps.LatLng(42.365486, -71.103802),
			new google.maps.LatLng(42.36249079, -71.08617653),
			new google.maps.LatLng(42.361166, -71.070628),
			new google.maps.LatLng(42.35639457, -71.0624242),
			new google.maps.LatLng(42.355518, -71.060225),
			new google.maps.LatLng(42.352271, -71.05524200000001),
			new google.maps.LatLng(42.342622, -71.056967),
			new google.maps.LatLng(42.330154, -71.057655),
			new google.maps.LatLng(42.320685, -71.052391),
			new google.maps.LatLng(42.275275, -71.029583),
			new google.maps.LatLng(42.2665139, -71.0203369),
			new google.maps.LatLng(42.251809, -71.005409),
			new google.maps.LatLng(42.233391, -71.007153),
			new google.maps.LatLng(42.2078543, -71.0011385)
        ];
    var Fork = [
    		new google.maps.LatLng(42.320685, -71.052391),
    		new google.maps.LatLng(42.31129, -71.053331),
    		new google.maps.LatLng(42.300093, -71.061667),
    		new google.maps.LatLng(42.29312583, -71.06573796000001),
    		new google.maps.LatLng(42.284652, -71.06448899999999)
    	];

    var trainPathMain = new google.maps.Polyline({
          path: RedLineStopCoordinates ,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

    var trainPathFork = new google.maps.Polyline({
          path: Fork ,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

    trainPathMain.setMap(map);
    trainPathFork.setMap(map);
}

function setMarkers(map) {

    var image = {
		url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
		size: new google.maps.Size(20, 32),
		origin: new google.maps.Point(0, 0),
		anchor: new google.maps.Point(0, 32)
    };

    var shape = {
		coords: [1, 1, 1, 20, 18, 20, 18, 1],
		type: 'poly'
    };

    for (var i = 0; i < RedLineStopCoordinates_ray.length; i++) {
		var rlsc = RedLineStopCoordinates_ray[i];
		var marker = new google.maps.Marker({
			position: {lat: rlsc[1], lng: rlsc[2]},
			map: map,
			icon: image,
			shape: shape,
			title: rlsc[0],
			zIndex: rlsc[3]
		});

		url = 'https://chicken-of-the-sea.herokuapp.com/redline/schedule.json?stop_id=' + rlsc[4];
    	makeHTTPRequest(url, marker, rlsc, i);
	}

	for (var i = 0; i < Fork_ray.length; i++) {
		var rlsc = Fork_ray[i];
		var marker = new google.maps.Marker({
			position: {lat: rlsc[1], lng: rlsc[2]},
			map: map,
			icon: image,
			shape: shape,
			title: rlsc[0],
			zIndex: rlsc[3]
		});

		url = 'https://chicken-of-the-sea.herokuapp.com/redline/schedule.json?stop_id=' + rlsc[4];
    	makeHTTPRequest(url, marker, rlsc, i);
	}
}

function makeHTTPRequest(url, marker, coordinates, index) {
	var infowindow = new google.maps.InfoWindow();
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open('GET', url, true);
	
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState = 4 && xmlhttp.status == 200) {
    		var parsedData = JSON.parse(xmlhttp.responseText);
    		var info = parsedData.data;
    		var station = coordinates[0];
    		var returnHTML;
    		returnHTML = "<strong>" + station;

    		//for (var j = 0; j < info.length; j++) {
    			if (info[0].attributes.arrival_time == null) {
    				returnHTML = "Data Not Available <br>";
    			} else {
    				returnHTML = "<strong>" + station + "</strong><br>" + "Arrival At: " + info[0].attributes.arrival_time + "<br> Departure At: " + info[0].attributes.departure_time + "<br>";
    				
    			}
    		//}
    		setWindow(marker, map, infowindow, returnHTML, index);
		}
	};

	xmlhttp.send();
}

function setWindow(marker, map, infowindow, returnHTML, index) {
	google.maps.event.addListener(marker, 'click', (function(marker, index) {
		return function() {
			infowindow.setContent(returnHTML);
			infowindow.open(map, marker);
		}		
	})(marker, index));
	
}

function findMe(map) {
	var me;
	navigator.geolocation.getCurrentPosition(function(somePos) {
		lat = somePos.coords.latitude;
		lng = somePos.coords.longitude;
		me = new google.maps.LatLng(lat, lng);
		map.panTo(me);
		marker = new google.maps.Marker({
				position: me,
				title: "Here I Am!"
			});
		marker.setMap(map)
	});

// 	var dist;
// 	var shortlatlang = new google.maps.LatLng(RedLineStopCoordinates_ray[0][1], RedLineStopCoordinates_ray[0][2]);
// 	var shortest = new google.maps.geometry.spherical.computeDistanceBetween(me, shortlatlang);
// 	consol.log(shortest);
// 	var shortest_pos = RedLineStopCoordinates_ray[0];
// 	for (var i = 0; i < RedLineStopCoordinates_ray.length; i++) {
// 	 	dist[i] = new google.maps.geometry.spherical.computeDistanceBetween(me, RedLineStopCoordinates_ray[i]);
// 		if (shortest > dist[i]) {
// 		 	shortest = dist[i];
// 		 	shortest_pos = RedLineStopCoordinates_ray[i];
// 		}
// 	}

// 	var distFork;
// 	var shortestFork = new google.maps.geometry.spherical.computeDistanceBetween(me, Fork_ray[0]);
// 	var shortestFork_pos = Fork_ray[0];
// 	for (var i = 0; i < Fork_ray.length; i++) {
// 	 	distFork[i] = new google.maps.geometry.spherical.computeDistanceBetween(me, Fork_ray[i]);
// 		if (shortestFork > distFork[i]) {
// 		 	shortestFork = distFork[i];
// 		 	shortestFork_pos = Fork_ray[i];
// 		}
// 	}

// 	if (shortest > shortest_fork) {
// 		shortest_pos = shortest_fork_pos;
// 	}

// 	var short_path = [me, shortest_pos];
//  	var shortestPath = new google.maps.Polyline({
// 	      path: short_path,
// 	      geodesic: true,
// 	      strokeColor: '#FF0000',
// 	      strokeOpacity: 1.0,
// 	      strokeWeight: 2
//     });

//     shortestPath.setMap(map);

// }

















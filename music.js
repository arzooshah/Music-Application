$(document).ready(function () {


	//Auto Scroll Up button

	var offset = 50;

	var duration = 300;

	$(window).scroll(function () {

		if (jQuery(this).scrollTop() > offset) {

			$('.back-to-top').fadeIn(duration);

		} else {

			$('.back-to-top').fadeOut(duration);

		}

	});



	$('.back-to-top').click(function (event) {

		event.preventDefault();

		$('html, body').animate({
			scrollTop: 0
		}, duration);

		return false;

	})
	//Auto Scroll Button Finish

	//Ajax call start................
	var ofset = 0;
	var limit = 5;
	var track = "";

	// Api Call Method

	function apiCall(track, ofset, limit) {


		return $.ajax({

			async: true,
			crossDomain: true,
			url: "https://api.spotify.com/v1/search?type=track&q=" + track + "&offset=" + ofset + "&limit=" + limit,
			method: "GET",

			headers: {

				Authorization: "Bearer BQAL2yzlagAh3JFe6j5nqo7PpjJL6QYykEVg65QSKRZG5HDCIeAJ4ANBVUCIr3QbTz9F901_5kb62E1ZZ9Hw4qbqV0O_Ecjw9iJ-IaSupWL5UzA1eyV_kN43yaxdljsKra7l4KU3944XDcNhd4gw1Y6FXeRW0_i_gRko",

			},
			dataType: "json",

			success: function (data) {
				var widget = show(data);
				$('#table').html(widget);
				$('#srch-track').val('');
				console.log(data);
				$('#no-search').hide();
			}

		});

		// else {
		// 		$("#error").html("<div class='alert alert-danger text-center'><a href = '#'class = 'close'data - dismiss = 'alert'aria - label = 'close'></a> Field Cannot be Empty</div > ");	
		// 	}
	}

	// Search Button Method

	$('#search').click(function () {


		track = $('#srch-track').val();

		if (track != '') {
			$('html, body').animate({
    			scrollTop: $('#tablePosition').offset().top
				 }, 1000);
			
			apiCall(track, ofset, limit);
			$('#error').hide();

		} else {
			$('#error').show();
			$('#error').html("<div class='alert alert-danger text-center'><a href = '#'class = 'close'data - dismiss = 'alert'aria - label = 'close'></a> Field Cannot be Empty</div > ");

			//			$("#error").html("<div class='alert alert-danger text-center'><a href = '#'class = 'close'data - dismiss = 'alert'aria - label = 'close'></a> Field Cannot be Empty</div > ").fadeTo(2000, 0).slideUp(500, function () {
			//
			//				$("#error").slideUp(500);
			//			});


		}


	});
	
	


	// Previous Button Method

	$('#prev').click(function () {

		$("a").click(function (event) {
			event.preventDefault();

		});

		if (ofset >= 5) {
			ofset = ofset - 5;
			apiCall(track, ofset, limit);
		} else {
			return false;
		}

	});

	// Next Button Method

	$('#nxt').click(function () {


		$("a").click(function (event) {
			event.preventDefault();
			//			return false;	

		});

		ofset = ofset + 5;
		apiCall(track, ofset, limit);

	});

	// Calculat Miliseconds to Minute and Seconds

	function millisToMinutesAndSeconds(millis) {
		var minutes = Math.floor(millis / 60000);
		var seconds = ((millis % 60000) / 1000).toFixed(0);
		return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
	}

	// Api call data shows in table

	function show(data) {
		$('#table').empty();

		for (var i = 0; i < data.tracks.items.length; i++) {
			//console.log(data.tracks.items[i].album.images[2]);

			$("tbody").append("<tr><td> <image src=" + (data.tracks.items[i].album.images[2].url) + "/>  </td><td>" + (data.tracks.items[i].album.artists[0].name) + "</td><td>" + (data.tracks.items[i].name) + "</td><td>" + (data.tracks.items[i].album.name) + "</td> <td > " + millisToMinutesAndSeconds(data.tracks.items[i].duration_ms) + "</td><td > " + (data.tracks.items[i].popularity) + "</td><td >  <a href=" + (data.tracks.items[i].preview_url) + " target='_blank'><i class='fas fa-link'></i></a></td></tr>");
		}
	}
});

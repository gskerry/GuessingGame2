
jQuery(document).ready(function(){

	// $("h1").before('<p id="welcome">(jQuery\'s Live.)</p>');

	var answer = Math.floor((Math.random()*100)+1)
	console.log(answer);
	// $("h1").after(answer);

	var tries = 5
	document.getElementById("counter").innerHTML = tries;

	var guess_ray = [];
	guess_ray.push(answer);

	var process_guess = function(){

		$("#guessbox").attr("placeholder","Enter a Number 1-100");
		$("#guessbox").removeClass('testclass');

		var guess_str = document.getElementById("guessbox").value;
		console.log("guess_input:",guess_str);
		console.log("type:",typeof guess_str);		

		var current_guess = Number(guess_str);
		console.log("current guess:",current_guess);
		console.log("type:",typeof current_guess);

		if(current_guess == undefined){
			alert("Please make a guess.");
			// NOT currently working... blank input = zero... have to redefine to undefined... 
		} else if (current_guess > 100 || current_guess < 1 || current_guess !== Math.round(current_guess)){
			$("#guessbox").attr("placeholder","Whole numbers, 1-100 only, please.");
			$("#guessbox").addClass('testclass');
			// var response_nonnum = $('<p id="response">Whole numbers, 1-100 only, please.</p>');
			// var response_nonnum = $('<button class="btn btn-success" type="button" id="again">Play Again!</button>');
			// $('#counter').before(response_nonnum)
			// alert("Whole numbers, 1-100 only, please.");
		} else if(current_guess !== answer && guess_ray.indexOf(current_guess) !== -1){
			$('#response').remove();
			$('#alert_dup').remove();
			var response_duplicate = $('<p id="alert_dup" class="response">Already guessed that. Please make a new guess</p>');
			$('.btn-group').before(response_duplicate)
			// alert("Already guessed that. Please make a new guess");
		} else {
			tries -= 1;
			
			$('.response').remove();
			$('#response').remove();
			var response_over_cold = $('<p id="response">You over-shot. Lower.</p>');
			var response_over_warm = $('<p id="response">Close. You\'re a bit over.</p>');
			var response_success = $('<p id="response_success">Nice job!</p>');
			var response_under_warm = $('<p id="response">Close. Not quite high enough.</p>');
			var response_under_cold = $('<p id="response">Way under. Guess higher.</p>');


			if (tries >= 0){
				// alert("Guess made.");
				console.log("tries left:",tries);
				document.getElementById("counter").innerHTML = tries;

				guess_ray.push(current_guess);
				// console.log("guesses:",guess_ray);

				$('#history').remove();
				guess_ray.sort(function(a, b){return a-b});
				console.log("guesses-sorted:",guess_ray);

				var guess_history = $('<div id="history">Tracking: </div>')
				$('#guessbox').after(guess_history)

				for(i=0;i<guess_ray.length;i++){
					// $('#history').remove();
					if(guess_ray[i] === answer){
						var guess_display = $('<span id="history_target">[X], </span>')
						$('#history').append(guess_display)
					} else {
						if ((guess_ray[i] > answer && guess_ray[i] - answer < 20) || (guess_ray[i] < answer && answer - guess_ray[i] < 20)){
							var guess_display = $('<span id="history_warm">'+guess_ray[i]+', </span>')
							$('#history').append(guess_display)							
						} else{
							var guess_display = $('<span id="history_cold">'+guess_ray[i]+', </span>')
							$('#history').append(guess_display)	
						}

					}
				}
				

				
				// $('#guessbox').after(ray_display)

				if(current_guess == answer){
					$('#counter').before(response_success)
					$('.btn-group').remove();
					$('#history_target').remove();
					$('#history_target').replaceWith('<span id="history_target">'+answer+', </span>');
					$('.app-container').css('background-image','url(https://raw.githubusercontent.com/gskerry/GuessingGame2/gh-pages/assets/img/bkg-image4.jpg)');
				} else if (current_guess > answer && current_guess - answer < 20) {
					$('.btn-group').prepend(response_over_warm)
				} else if (current_guess < answer && answer - current_guess < 20) {
					$('.btn-group').prepend(response_under_warm)
				} else if (current_guess > answer) {
					$('.btn-group').prepend(response_over_cold)
				} else {
					$('.btn-group').prepend(response_under_cold)
				}

			} else {
				var response_endgame = $('<p id="alert_end">Sorry. Out of Guesses. The answer is: '+answer+'</p>');
				// alert("Sorry. No more Guesses. The answer is: "+answer)
				$('#alert_dup').remove();
				$('.btn-group').remove();
				$('#alert_end').remove();
				$('#history').after(response_endgame)
			}
		} 

		$("#guessbox").val('');

	}


	$("#guessbox").keypress(function(){
		if (event.which == 13) process_guess();
	});

	$("#guess").click(process_guess);


	$('#giveup').on('click', function(){
		alert("The answer is: "+answer)
		$('.btn-group').remove();
		tries = 0
		document.getElementById("counter").innerHTML = tries;
	})

	$('#again').on('click', function(){
		location.reload(true);
	})


});

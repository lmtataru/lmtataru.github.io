$(document).ready(function () {
	$("#jokes").click(function (e){
		e.preventDefault();
		$.ajax({
			url:'https://api.icndb.com/jokes/random',
			type:'get',
			dataType:'json',
			success: function(data){
				$("#jokeData").html(data.value.joke);
			},
			error: function(xhr, status, error){
				console.log(xhr);
				console.log(status);
				console.log(error);
			}
		});
	});
});

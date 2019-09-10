var countdown = 5;
var intervalId;
var highscore = 10;

var time = {
    run: function () {
        clearInterval(intervalId);
        intervalId = setInterval(time.decrement, 1000);
    },
    stop: function () {
        clearInterval(intervalId);
    },
    decrement: function () {
        countdown--;

        $("#timer").html("<h2>" + countdown + "</h2>");
        // $("#timer").hide()
        if (countdown === 0) {
            time.stop();

            alert("Time Up!");
        };
    }

}

var choices = {
    startGame: function(){

    },
}
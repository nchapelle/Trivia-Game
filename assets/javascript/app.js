var countdown = 5;
var intervalId;
var highscore = 10;
var round = 0; //index 
var score = 0;
var unanswered = 0;
var badGuess= 0;

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
            // unanswered++
            alert("Time Up!");
        };
    }

}

var game = {
    startGame: function(){
        $("game-box").empty();
        round = 0
        score = 0
        badGuess = 0
        questions.gameCard();
        time.run();
    },
    checkRound: function(){
        userChoice = $(this).attr("data-value")
        if (userChoice === questions.answerList[round]){ //check var names etc 
        //then check if end of round or not
        //else
        game.resultsRound();
        }
        //check to see if game is over
        //max length=10
        else if(round<10){
            round++;
            questions.gameCard();
        }
        else{
            //alert
            //show final results
            //timeout 
            game.startGame();
        }
        
    },
    resultsRound: function(){
        //empty div
        if (countdown === 0) {
            unanswered++
        }
        else if (userChoice === questions.answerList[round]){
            score++
        }
        else {
            badGuess++
        }
        //display result card
        //on click move on to next round
        
    }
}
var choices=[
   ['a','b'], //choices[0].length
   [1,2,3,4] //choices[1].length

   // option:1 useful for static number of length (for loop problems)
   


]
var questions = {
    answerList: [true, false, [6, 5, 6], "Bob Marley"],
    questionList: ["Are you in love?", "Is Pikachu pink?", "What is 4+2?", "Buffalo Soldier"],
    gameCard: function(){
        var gameBox = $("<div>");
        gameBox.addClass("col-xs-12 col-med-6 col-lg-3");

        var gamecard = $("<div>");
        gamecard.addClass("card text-center");
        $(gameBox).append(gamecard);
        $("#game-box").append(gameBox);

        var cardBody = $("<div>");
        cardBody.addClass("card-body");

        var questionH5 = $("<h5>");
        questionH5.addClass("card-title");
        questionH5.text(questions.questionList[round]);
        var cardTable = $("<table>")
        cardTable.addClass("card-text")

     //if answers are in a table use for loop inside this function
        for (var i=0; i<choices[1].length; i++){
            var cardText = $("<tr>");
            cardText.addClass("clickable");
            cardText.text(choices[round][i]);
            cardText.attr("data-value", choices[round][i]);
           $(cardTable).append(cardText);

            
        };
        
        $(cardBody).append(questionH5, cardTable);
        $(gamecard).append(cardBody)
        $(".clickable").on("click", function(){
            console.log("it clicks");
            game.checkRound();
           });
    },
    
}
$(document).ready(function (){
    game.startGame()
});
var countdown = 6;
var intervalId;
var highscore = 1;
var round = 0; //index 
var score = 0;
var unanswered = 0;
var badGuess= 0;
var userChoice= ""

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
        $("#timer").hide()
        if (countdown === 0) {
            time.stop();
            unanswered++;
            $("#game-box").empty();
            setTimeout(function() {
                
             alert("Time Up!"); game.checkRound(); countdown=6; time.run()}, 500);
        };
    }

}

var game = {
    startGame: function(){
        $("game-box").empty();
        round = 0
        score = 0
        badGuess = 0
        unanswered = 0
        questions.gameCard();
        time.run();
    },
    checkRound: function(){
        if (round >= 9){ //check var names etc 
        //then check if end of round or not
        //else
        console.log("Good Game")
        game.endGame();
        }
        //check to see if game is over
        //max length=10
        else if(round<9){
            round++;
            console.log(round)
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
        $("#game-box").empty();
        time.stop();
        countdown = 6

        if (countdown === 0) {
            unanswered++
            game.checkRound();
        }
        else if (userChoice === choices[round].correctAnswer){
            score++
            game.checkRound();
        }
        else {
            badGuess++
            game.checkRound();
        }
        //display result card
        //on click move on to next round
        time.run();
    },

    endGame: function(){
        round = 0;
        if (score > highscore){
            $("#highscore").text("High Score: " + score)
            highscore = score
        };
        setTimeout(function(){
            alert("Good Game!  Correct Choices: " + score + " You Failed to answer "+ unanswered + " times & you had "+badGuess + " incorrect answers. Thanks for Playing!" )
        }, 500);
        setTimeout(function () {
            game.startGame();
        }, 3000)
    },
}
var choices=[
//    ['a','b'], //choices[0].length
//    [1,2,3,4], //choices[1].length

   // option:1 useful for static number of length (for loop problems)
   {question: "You get a free answer to start off. Choose C.",
    answer: ["a", "b", "c"],
    correctAnswer: "c"
   },
   {question: "That was the easy one, from here on out if you get the rest wrong... You'll still get a score that isn't zero. Oh right you need the next question! What's 2+2?",
   answer: ["Seriously?","It's obviously 4", 6, 4],
   correctAnswer: "4"
   },
   {question: "Is Pikachu Pink?",
   answer: ["true", "false"],
   correctAnswer: "false"
   },
   {question: "Pikachu is a national treasure. What Parade is he in on Thanksgiving.",
    answer:["Trick question it's not on Thanksgiving it's Christmas", "The Macy's Day Parade", "Do you like visiting New York City?"],
    correctAnswer:"The Macy's Day Parade",
   },
   {question: "What are the good parts about Javascript?",
    answer:["Arrays","Native language to most Web Browsers", "Objects inside of Arrays", "All of the Above" ],
    correctAnswer: "All of the Above"
   },
   {question: "If you know me this is easy. What's my favorite color?",
    answer: ["green", "Blue", "Black", "Brown", "Yellow", "Purple", "Green", "Pink"],
    correctAnswer: "Green"
   },
   {question: "Why were there so many answers last question?",
    answer: ["I wanted to waste your time", "To showcase the dynamic capabilites of my function", "Obviously Both"],
    correctAnswer: "Obviously Both"
   },
   {question: "I'm probably going to phone in the rest of these questions and answers.",
    answer: ["true", "false"],
    correctAnswer: "true"
   },
   {question: "The Philadelphia Eagles are better off without Nick Foles.",
    answer: ["true", "false"],
    correctAnswer: "true"
   },
   {question: "I believed the last answer BEFORE he broke his shoulder.",
    answer: ["true", "false"],
    correctAnswer: "true"
   },





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
        questionH5.text(choices[round].question); // change this to match the object
        var cardTable = $("<div>");
        cardTable.addClass("card-text");
        const centerDiv = $("<div>");
        centerDiv.addClass("text-center");
        $(cardTable).append(centerDiv);

     //if answers are in a table use for loop inside this function
        for (var i=0; i<choices[round].answer.length; i++){
            var cardText = $("<div>");
            cardText.addClass("clickable");
            cardText.text(choices[round].answer[i]);
            cardText.attr("data-value", choices[round].answer[i]);
           $(centerDiv).append(cardText);

            
        };
        
        $(cardBody).append(questionH5, cardTable);
        $(gamecard).append(cardBody)
        $(".clickable").on("click", function(){
            console.log("it clicks");
            userChoice = $(this).attr("data-value")
            game.resultsRound();
           });
        
    },
    
}
$(document).ready(function (){
    game.startGame()
});
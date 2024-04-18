var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern= [];
//3. At the top of the game.js file, create a new empty array with the name userClickedPattern.
var userClickedPattern = [];


var started = false;
//8.Create a new variable called level and start at level 0.
var level = 0;
$(document).keydown(function(){
if(!started){
        $("#level-title").text("level " + level);
        nextSequence();
        started= true;
}
});


//1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

  //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");

  //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
 //10. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence. 
  checkAnswer(userClickedPattern.length-1);

});

//9. Create a new function called checkAnswer(), it should take one input with the name currentLevel

function checkAnswer(currentLevel){
        if(gamePattern[currentLevel]=== userClickedPattern[currentLevel]){
                if(userClickedPattern.length === gamePattern.length){

// 11. Call nextSequence() after a 1000 millisecond delay
                        setTimeout(function(){
                                nextSequence();
                        },1000);
                }
        }
 else{
//12. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
        playSound("wrong");

// 13. In the styles.css file, there is a class called "game-over", apply the class to the body of the website when the user gets one of the answers wrong and then remove /it after 200 milliseconds.
        $("body").addClass("game-over");

//14. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
        $("#level-title").text("Game over. Press any Key to restart");
        setTimeout(function(){
                $("body").removeClass("game-over");
        },200);

//16. Call this fuction when user gets sequence wrong.
        startOver();
}
}

function nextSequence(){
        userClickedPattern= [];
        level++;
        $("#level-title").text("level" + level);
   
        var randomNumber = Math.floor(Math.random() * 4);
        var randomChoosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChoosenColour);
      
        $("#" + randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

        playSound(randomChoosenColour);
    
}

//5. Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColor){

//6. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
        $( "#" + currentColor ).addClass( "pressed" );

//7. Use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
        setTimeout(function(){
                $("#" +  currentColor).removeClass("pressed");
             
        }, 100);
}
function playSound(name){
        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
}
//15.Create a new function called startOver 
function startOver(){
        

//17. Inside this function, you'll need to reset the values of level, gamePattern and started variables
        level=0;
        gamePattern = [];
        started = false;

}
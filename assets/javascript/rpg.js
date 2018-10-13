//--------------Logic---------------//

//Need to restart game upon loading page
    //Clear character selection
    //Clear defender selection
    //Display all characters

//Clicking a character selects them as your character
    //Display character under yourCharacter
    //Hides select characters panel
    //Display other character to enemies panel

//Click character in enemy panel makes them defender, dislpays in defender panel
    //Removes the character from enemies panel
    //Display attack button
    //Attack button triggers fight functionality
    //Submit both yourCharacter and defenders stats
        
            //Attack corresponds to attack points, which increases
            //Subtract health from defender based on current attack points
            //Counter attack from defender after every attack, which decreases yourCharacters else
            //Conditional statement that continues this process until one of the characters health reaches 0
            //If youur characters health = 0, then game over function
            //If defender health reaches 0, clear defender area. Allow for new defender to be selected.

//When new defender selected, submits new defender stats
    //yourCharacter stats do not change


//-----------Variables--------------//

var character;

var yourCharacter;

var defender;

var currentDefender = $("#defender");

var yoda = {
    healthPoints: 100,
    attackPower: 5,
    counterAttackPower: 10,
    currentPower: 5
}
        
var darth = {
    healthPoints:150,
    attackPower: 15,
    counterAttackPower: 10,
    currentPower: 7
}

var obi = {
    healthPoints: 125,
    attackPower: 10,
    counterAttackPower: 10,
    currentPower: 15
}

var boba = {
    healthPoints: 110,
    attackPower: 20,
    counterAttackPower: 10,
    currentPower: 25
}

var inBattle = false;

wins = 0;

var characterAttackPower;

var characterHealthPoints;

var characterHealth;

var defenderCounterAttackPower;

var defenderHealthPoints;

var defenderHealth;


//------------Functions-----------------//

function resetGame(){
    resetDisplay();
    yourCharacter = "";
    currentDefender = "";
    characterAttackPower = "";
    characterHealthPoints = "";
    characterHealth = "";
    defenderCounterAttackPower = "";
    defenderHealthPoints = "";
    defenderHealth = "";
}

function resetDisplay(){
    $("#enemiesYodaSelected").hide();
    $("#enemiesDarthSelected").hide();
    $("#enemiesObiSelected").hide();
    $("#enemiesBobaSelected").hide();
    $("#yodaSelected").hide();
    $("#darthSelected").hide();
    $("#obiSelected").hide();
    $("#bobaSelected").hide();
    $("#yodaDefender").hide();
    $("#darthDefender").hide();
    $("#obiDefender").hide();
    $("#bobaDefender").hide();
    $("#attack").hide();
    $("#youWin").hide();
    $("#gameOver").hide();
}

//Character select click functions


$("#yoda").on("click", function(){
    $("#enemiesYodaSelected").show();
    $("#charactersGroup").hide();
    $("#yodaSelected").show();
    yourCharacter = yoda;
    });
    
  

$("#darth").on("click", function(){
    $("#enemiesDarthSelected").show();
    $("#charactersGroup").hide();
    $("#darthSelected").show();
    yourCharacter = darth;
})

$("#obi").on("click", function(){
    $("#enemiesObiSelected").show();
    $("#charactersGroup").hide();
    $("#obiSelected").show();
    yourCharacter = obi;
})

$("#boba").on("click", function(){
    $("#enemiesBobaSelected").show();
    $("#charactersGroup").hide();
    $("#bobaSelected").show();
    yourCharacter = boba;
})


//Defender click functions

$("body").on("click", ".yodaEnemy", function(){
    if(!inBattle){
    $("#yodaDefender").show();
    $(".yodaEnemy").hide();
    currentDefender = yoda;
    $(".enemyHealth").html(yoda.healthPoints);
    startBattle();
    };
});


$("body").on("click", ".darthEnemy", function(){
    if(!inBattle){ 
    $(".darthEnemy").hide();
    $("#darthDefender").show();
    currentDefender = darth;
    $(".enemyHealth").html(darth.healthPoints);
    startBattle();
    };
});

$("body").on("click", ".obiEnemy", function(){
    if(!inBattle){ 
    $("#obiDefender").show();
    $(".obiEnemy").hide();
    currentDefender = obi;
    $(".enemyHealth").html(obi.healthPoints);
    startBattle();
    };
});

$("body").on("click", ".bobaEnemy", function(){
    if(!inBattle){
    $("#bobaDefender").show();
    $(".bobaEnemy").hide();
    currentDefender = boba;
    $(".enemyHealth").html(boba.healthPoints);
    startBattle();
    };
});

resetGame();

function startBattle(){
    inBattle = true;
    $("#attack").show();
}

//Clears out currentDefender and resets battle when enemy defeated
function clearCurrentDefender(){
    $("#yodaDefender").hide();
    $("#darthDefender").hide();
    $("#obiDefender").hide();
    $("#bobaDefender").hide();
    $("#attack").hide();
    inBattle = false;
}

var attackBonus= 0;

//Attack button function
$("body").on("click", "#attack", function(){
    currentDefender.healthPoints = (currentDefender.healthPoints - yourCharacter.currentPower);
    yourCharacter.currentPower = (yourCharacter.currentPower += yourCharacter.attackPower);
    console.log(currentDefender.healthPoints);
    $(".enemyHealth").html(currentDefender.healthPoints);
    if(currentDefender.healthPoints <= 0){
    clearCurrentDefender();
    wins++
    }
    else{
    yourCharacter.healthPoints = (yourCharacter.healthPoints - currentDefender.counterAttackPower);
    }
    $(".yourHealth").html(yourCharacter.healthPoints);
    if(yourCharacter.healthPoints <= 0){
        gameOver();
    }
    console.log(wins);
    if(wins == 3){
        youWin();
        
    }
})



//Triggered when you lose
function gameOver(){
    $("#gameOver").show();
    $("#attack").hide();
}

//Triggered when you defeat all enemies
function youWin(){
    $("#youWin").show();
    $("#attack").hide();
}
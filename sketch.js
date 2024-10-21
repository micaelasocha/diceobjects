let dice = [];
let numberOfDice = 12;
let resetButton;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < numberOfDice; i++) {
    dice[i] = new Die(50); // argument is the size of the die
  }
  resetButton = createButton("Reset");
  resetButton.position(width / 2 - 20, height - 615); 
  resetButton.size(100, 40); 
  resetButton.mousePressed(resetDice); 
}

function draw() {
  background("darkolivegreen");
  
  // loop over the array and place+display each die
  for (let i = 0; i < dice.length; i++) {
    const die = dice[i]; // 'die' is a temporary variable for the current array item
    die.place(die.size*1.2*i+die.size, die.size*2); // place the die neatly in the row
    die.display(); // actually draw it on screen

    fill("white");
  textSize(20);
  textAlign(LEFT);
  textWrap(WORD);
    let instructions = "Welcome to the Blind Rank Number Game! Press any key to roll the dice. After each roll, click a die to lock in its value. Your goal is to arrange 10 values in ascending order by selecting one die per round without knowing the next roll. If you cant arrange a value accordingly, YOU LOSE! Reset the game and start over. Good luck! :)";
  
    // Display the text with a specified width to ensure it wraps
    text(instructions, width / 2 - 250, height - 500, 1000, 250);
  }


}

function mouseClicked() {
  // loop over the array of dice...
  for (let i = 0; i < dice.length; i++) {
    const die = dice[i];
    // if the cursor is over the current die, freeze/unfreeze that die
    if (die.isTouched(mouseX,mouseY)) {
      die.toggleFreeze();
    }
  }
}

// for computers...
function keyPressed() {
  shakeDice();
}

// for phones...
function deviceShaken() {
  shakeDice();
}

// loop over the array of dice and try to roll each one in turn
// (note that a die won't actually roll if it's frozen)
// also, output the list of values to the console
function shakeDice() {
  let list = "values: ";
  for (let i = 0; i < dice.length; i++) {
    const die = dice[i];
    die.roll();
    list = list + die.value + " ";
  }
  console.log(list);
}

function resetDice() {
  for (let i = 0; i < dice.length; i++) {
    dice[i].unfreeze(); 
  }
  console.log("All dice have been reset.");
}
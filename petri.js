const readline = require('readline');

class Petri {
  constructor(size = 4) {
    //Setup input interface
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    //create a new 2D array to act as the "dish"
    this.dish = Array.from(Array(size), () => Array(size).fill(false))
    this.size = size;
    this.previousGenerations = [];
    this.visual = false;
  }
  
  init() {
    this.rl.question('How big is the dish? ',response => {
      const size = parseInt(response);
      if(isNaN(size) || size <= 3){
        console.log('Error: Invalid Size');
        this.init();
      } else {
        console.log(`Created Petri Dish of size ${size}x${size}`);
        this.dish = Array.from(Array(size), () => Array(size).fill(false))
        this.size = size;
        this.previousGenerations = [];
        this.input();
      }
    });
  }

  parseInput(input) {
    const coordStrings = input.split(',');
    if(coordStrings.length != 2) return false;
    try{
      const coords = {
        x: parseInt(coordStrings[0]),
        y: parseInt(coordStrings[1])
      };
      if(coords.x > this.size-1 || coords.y > this.size-1) return false;
      return coords;
    } catch(e){
      return false;
    }
  }

  input() {
    //ask for input
    this.rl.question('Please provide a bacteria coordinate (or type "end" to stop input): ', response => {
      //check if not the end of input
      if (response != 'end'){
        //attempt to parse the input
        const coords = this.parseInput(response);
        //if an invalid input has been given, show error
        if(coords == false){
          console.log('Error: Coordinates must be made up of 2 integer values within the bounds of the dish');
        } else {
          //else bring input coords to life
          this.dish[coords.x][coords.y] = true;
        }
        //call another input round
        this.input();
      } else {
        //switch to generate
        this.output();
        this.generate();
      }
    });
  }

  getLiveSiblings(x,y) {
    let count = 0;
    let totalChecked = [];
    for(let curX = x-1; curX <= x+1; curX++){
      for(let curY = y-1; curY <= y+1; curY++){
        if(this.dish[curX] != undefined){
          totalChecked.push([curX,curY]);
          if(this.dish[curX][curY] == true && !(curX == x && curY == y)) count++;
        }
      }
    }
    //return final count
    return count;
  }

  output() {
    //Output the current generation
    console.log(`Generation ${this.previousGenerations.length}`);
    //I used a visual grid for testing
    if(this.visual){
      //draw a square for each x & y position using unicode
      for(let y = 0; y < this.size; y++){
        let rowString = "";
        for(let x = 0; x < this.size; x++){
          if(this.dish[x][y] == true) rowString += "\u25A3 ";
          else rowString += '\u25A7 ';
        }
        console.log(rowString);
      }
    } else {
      for(let y = 0; y < this.size; y++){
        for(let x = 0; x < this.size; x++){
          if(this.dish[x][y]) console.log(`${x},${y}`);
        }
      }
      console.log('end');
    }
  }

  continue() {
    this.rl.question('Would you like to run another Generation? (yes or no)', response => {
      response = response.toLowerCase();
      if(response == 'yes') this.generate();
      else if(response == 'no') this.init();
      else {
        console.log('Error: Invalid Answer');
        this.continue();
      }
    });
  }

  generate() {
    //create working js array with no connection to main dish
    let workingDish = JSON.parse(JSON.stringify(this.dish));

    for(let x = 0; x < this.size; x++){
      for(let y = 0; y < this.size; y++){
        //get number of siblings
        let liveSiblings = this.getLiveSiblings(x,y);
        if(liveSiblings < 2) {
          workingDish[x][y] = false;
        } else if(liveSiblings > 3){
          workingDish[x][y] = false;
        } else if(liveSiblings == 3){
          workingDish[x][y] = true;
        }
        //rule 2 doesn't change the dish and as such can be left out
      }
    }
    this.previousGenerations.push(this.dish);
    this.dish = workingDish;
    this.output();
    this.continue();
  }

}

module.exports = Petri;
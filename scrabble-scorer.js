// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");


const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};



function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";

	for (let i = 0; i < word.length; i++) {
      
	  for (const pointValue in oldPointStructure) {

		 if (oldPointStructure[pointValue].includes(word[i])) {
         
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }

	  }
	}
	return letterPoints;
 }

//  initialPrompt();
// console.log(oldScrabbleScorer("Banana"));

 // your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt(word) {

   console.log("Let's play some scrabble!"); //added
   word = input.question(`\nEnter a word to score: `) //added
   
   return word //modified
};


let newPointStructure = transform(oldPointStructure);

let simpleScorer = function(word) {
   let score = 0
   for (let i = 0; i < word.length; i++) {
      score += 1;
   }
   return score;
};

// console.log(simpleScorer("Astrix"))

let vowelBonusScorer = function(word) {
   let score = 0;
   const vowels = [ 'A','E','I','O','U' ];
   for (let i = 0; i < word.length; i ++) {
      let letter = word[i].toUpperCase(); //uppercase to match the A E I O U 
      if (vowels.includes(letter)) {
         score += 3;
      } else {
            score += 1;
         }
    }
    return score;
}

// console.log(vowelBonusScorer("banana"))

let scrabbleScorer = function(word) {
   word = word.toUpperCase();
   let score = 0;

   for (let i = 0; i < word.length; i++) {
       let letter = word[i].toLowerCase(); // Convert letter to lowercase
       let letterScore = newPointStructure[letter];

       console.log(`Letter '${letter.toUpperCase()}' score: ${letterScore}`);

       if (typeof letterScore !== 'undefined') {
           score += letterScore;
       } else {
           console.log(`Letter '${letter.toUpperCase()}' not found in newPointStructure.`);
       }
   }

   return score;
};


const scoringAlgorithms = [
   {name: "Simple", 
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
},

   {name: "Bonus Vowels", 
   description: "Vowels are 3 pts, consonants are 1 point",
   scorerFunction: vowelBonusScorer},

   {name: "Scrabble",
   description: "The Traditional scoring algorithm",
   scorerFunction: scrabbleScorer} //dropped the oldScrabbleScorer and replaced with scrabbleScorer
];


function scorerPrompt(word) {

   console.log(`Which scoring algorithm would you like to use? \n`);
   console.log(`0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}`);
   console.log(`1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}`);
   console.log(`2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}`);
   

   let prompt = input.question('Enter 0, 1, or 2: ');
   prompt = parseInt(prompt); //converts argument to a string, parses that string, returns as an integer - is its own function
   //alternative using Number to change the value 

   if (prompt === 0 || prompt === 1 || prompt === 2) {
      let score = scoringAlgorithms[prompt].scorerFunction(word); // Calculate score using selected scorerFunction
      console.log(`Score for ${word}: ${score}`);
   } else {
      console.log(`Invalid input. Please enter 0, 1, or 2.`);
   }
   // return word; Do i really want to return prompt # or word?
}
// console.log(scorerPrompt("Banana"))

function transform(oldStructure) {
   let newStructure = {}; //intialize an empty array to hold transformed data 
                           //Rememeber... Key can be in variable name - the for in loop iterates over the key:value pairs in the oldStructure (or tin this case the oldPointStructure)
   for (let key in oldStructure) {  // iterating over each key in the oldStructure objected
       let lettersArray = oldStructure[key]; //we know its an array - each key in oldStructure contains the array of letters associated with that key
       lettersArray.forEach(letter => {
           newStructure[letter.toLowerCase()] = parseInt(key); //keys of objects are typically strings - ensures key is stored as an integer
       });
   }

   return newStructure;
}

function runProgram() {
   // let word = initialPrompt();
   // scorerPrompt(word);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

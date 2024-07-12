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

 // your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt(word) {

   console.log("Let's play some scrabble!"); //added
   word = input.question(`\nEnter a word to score: `) //added

   let scoredword = oldScrabbleScorer(word) //added
   // console.log(scoredword);
   
   return scoredword //modified
};


let newPointStructure;

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
      let letter = word[i];
      if (vowels.includes(letter)) {
         score += 3;
      } else {
            score += 1;
         }
    }
    return score;
}

// vowelBonusScorer("babe")
// console.log(vowelBonusScorer("Hello"));

let scrabbleScorer;

const scoringAlgorithms = [
   {"name": "Simple Scorer", 
   "description": "Each letter is worth 1 point.",
   "scorerFunction": simpleScorer},

   {"name": "Bonus Vowels", 
   "description": "Vowels are 3 pts, consonants are 1 point",
   "scorerFunction": vowelBonusScorer},

   {"name": "Scrabble",
   "description": "The Traditional scoring algorithm",
   "scorerFunction": oldScrabbleScorer} //anonymous function based off variable - drop the ()
];

function scorerPrompt(response) {

   for (let i = 0; scoringAlgorithms.length; i++){
      let response = input.question("Which scoring algorithm would you like to use? "); 
         if (i===0){
            console.log(scoringAlgorithms.simpleScorer[0]);
         } else if (i===1) {
            console.log(scoringAlgorithms.vowelBonusScorer); 
         } else (i===2) 
            console.log(scoringAlgorithms.oldScrabbleScorer);

      }
      return response; //?

 }
 
 


function transform() {};

function runProgram() {
   initialPrompt();
   scorerPrompt();
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

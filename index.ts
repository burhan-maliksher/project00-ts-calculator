#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

// animating tiltle 
const stopAnimation=()=>{
    return new Promise((resolve) => {
        setTimeout(resolve,2000);  
    });
}

// async function animated_title(){
async function animated_title(){   
  const show=chalkAnimation.rainbow(`___________________'MB 🧮 Calculator'_____________________`);
    await stopAnimation();
    show.stop();
    console.log(chalk.yellow.bgRedBright.bold(`                                               Autor: "M.B"`));
    getUserInput();
}

animated_title();

// function to continue calculation
async function repeater(){
  const answer= await inquirer.prompt([
    {
      type:"list",
      name:"descion",
      message:`choose "y" for new calculation, "n" to exit the program\n`,
      choices:["y","n"]
    }
  ])
  .then((answers)=>{
    if(answers.descion==="n"){
        const show=chalkAnimation.neon(`______________Thanks for using our calculator_________________`);
        const exit=()=>{show.stop()};
        setTimeout(exit,2000); 
    }else{
      getUserInput();
    }
  })
  
}

//using inquirer to get user input 
async function getUserInput(){ 
  let resultOfTwoValues:number;
  const answer= await inquirer.prompt([
    /* Pass your questions in here */
    // storing input values in objects
    {
        type:"number",
        name:"value_1",
        message:"Please Enter a number",
        validate:validateInput
    },
      {
      type:"list",
      name:"operator",
      message:"Please choose an operation",
      choices:["+","-","x","%","/","^"]
    },
    {
      type:"number",
      name:"value_2",
      message:"Please Enter a number",
      validate:validateInput
    }
  ])
  
  .then((answers) => {
    // Use user feedback for... whatever!!
    // calculation at user choose 
    switch(answers.operator){
      case "+":
        resultOfTwoValues= answers.value_1 + answers.value_2;
        console.log(chalk.green(`Result:${resultOfTwoValues} `));
        repeater();
        break;
      case "-":
        resultOfTwoValues= answers.value_1 - answers.value_2;
        console.log(chalk.green(`Result:${resultOfTwoValues} `));
        repeater();
        break;
      case "x":
        resultOfTwoValues= answers.value_1 * answers.value_2;
        console.log(chalk.green(`Result:${resultOfTwoValues} `));
        repeater();
        break;
      case "%":
        resultOfTwoValues= answers.value_1 % answers.value_2;
        console.log(chalk.green(`Result:${resultOfTwoValues} `));
        repeater();
        break;
      case "/":
        resultOfTwoValues= answers.value_1 / answers.value_2;
        console.log(chalk.green(`Result:${resultOfTwoValues.toFixed(2)} `));
        repeater();
        break;
      case "^":
        resultOfTwoValues= answers.value_1 ** answers.value_2;
        console.log(chalk.green(`Result:${resultOfTwoValues} `));
        repeater();
        break;
  
    }
  })

}

// user input value validation 
const validateInput = async (input:number) => {
    if (isNaN(input)){
      return chalk.red("please enter a valid number");
    }
    return true;
    
 };

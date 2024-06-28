/*
                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.
*/

// Piece of code written by AndrewNation

const fs = require("fs");

function compileCPP(input, output){}

export function transpileToCPP(code: string[], output: string) {
   const template = fs.readFileSync("./template/base.cpp", "utf-8");

   const baseTemplate = template.split("/n");
   const finalCode = [];

   for(let i = 0; i < baseTemplate.length; i++){
      finalCode.push(baseTemplate[i]);

      if(i == 5){
         for(let j = 0; j < code.length; j++){
            console.log(code[j])
            finalCode.push(code[j]);
         }
      }
   }

   fs.writeFile(output, finalCode.join("\n"), (err) => {
     if (err) {
       console.error(err);
     } else {
       console.log(`Successfully wrote data to ${output}`);
     }
   });
 }
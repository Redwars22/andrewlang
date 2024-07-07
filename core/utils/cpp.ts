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
   const template_end = fs.readFileSync("./template/part2.cpp", "utf-8");

   const baseTemplate = template.split("/n");
   const part2Template = template_end.split("/n");
   let finalCode = [];

   finalCode = baseTemplate

   for(let line = 0; line < code.length; line++){
    finalCode.push(code[line]);
   }

   finalCode.push("}");

   for(let line = 0; line < part2Template.length; line++){
    finalCode.push(part2Template[line])
   }

   fs.writeFile(output, finalCode.join("\n"), (err) => {
     if (err) {
       console.error(err);
     } else {
       console.log(`Successfully wrote data to ${output}`);
     }
   });
 }
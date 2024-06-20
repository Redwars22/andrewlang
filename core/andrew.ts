/*
                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.
*/

// Piece of code written by AndrewNation

import { errors } from "./errors";
import { rules } from "./grammar";
import { keywords } from "./keywords";
import { builtinMethods } from "./lib/io";
import { symbols } from "./symbols";
import { tokenize } from "./tokenize";
import { TTokens } from "./type/types";

const fs = require("fs");

const ANDREW_TYPES_LIST = ["int", "str", "char", "bool", "float", "double"];

const identifiers = [] as {
  id?: string;
  type?: "function" | "constant" | "variable";
}[];

const jsCode: string[] = [];

let isFunction: boolean = false,
  openingBracketsCount: number = 0,
  closingBracketsCount: number = 0,
  skipLines: boolean = false;

function checkIfItExists(
  id: string,
  type: "function" | "variable" | "constant"
): boolean {
  for (let i = 0; i < identifiers.length; i++) {
    if (identifiers[i].id == id + "()" && identifiers[i].type == type) {
      return true;
    }
  }

  return false;
}

function parseVariableDeclarationStatement(
  tokens: string[],
  pos: number
): string[] {
  let vectorOfTokens: string[] = tokens;

  for (let tk = pos; tk < tokens.length; tk++) {
    if (tokens[tk].includes(symbols.TYPE_ANNOTATION)) {
      let variableWithType = [] as string[];
      let isValidType = false;

      variableWithType = tokens[tk].split(symbols.TYPE_ANNOTATION);

      for (let _type = 0; _type < ANDREW_TYPES_LIST.length; _type++) {
        if (variableWithType[1].includes(ANDREW_TYPES_LIST[_type])) {
          isValidType = true;
        }
      }

      if (!isValidType) {
        console.error(errors.INVALID_TYPE_OR_MISMATCH);
      }

      vectorOfTokens[tk] = variableWithType[0];
    }
  }

  return vectorOfTokens;
}

function parseFunctionDeclarationStatement(
  tokens: string[],
  pos: number
): string[] {
  let vectorOfTokens: string[] = tokens;
  let hasArgs = false;

  for (let tk = pos; tk < vectorOfTokens.length; tk++) {
    let currToken = vectorOfTokens[tk];

    if (!hasArgs) {
      if (
        currToken.includes(symbols.OPENING_PARENTHESIS) &&
        currToken.includes(symbols.CLOSING_PARENTHESIS)
      ) {
        isFunction = true;
      }
    } else openingBracketsCount++;
  }

  if (!isFunction) throw "invalid func decl";

  vectorOfTokens[0] = "function";
  identifiers.push({ id: vectorOfTokens[1], type: "function" });

  return vectorOfTokens;
}

function getJSFuncCounterpart(key: string) {
  if (key == "PRINT") {
    return builtinMethods.io.PRINT;
  }

  return "";
}

function parseBuiltInFunctions(
  tokens: string[],
  pos: number,
  id: string,
  key: string
): string[] {
  let vectorOfTokens: string[] = tokens;

  for (let tk = 0; tk < tokens.length; tk++) {
    vectorOfTokens[tk] = vectorOfTokens[tk].replace(
      id,
      getJSFuncCounterpart(key)
    );
  }

  return vectorOfTokens;
}

export function parse(lines: TTokens) {
  for (let line = 0; line < lines.length; line++) {
    for (let pos = 0; pos < lines[line].length; pos++) {
      let currToken = lines[line][pos];

      //Comments
      if (currToken.includes(symbols.MULT_LINE_COMMENT_END)) {
        skipLines = false;
        continue;
      }

      if (skipLines) continue;

      //Curly brackets
      if (
        currToken.includes(symbols.CLOSING_CURLY_BRACKET) ||
        lines[line].join(" ").includes(symbols.CLOSING_CURLY_BRACKET)
      ) {
        closingBracketsCount++;
        if (lines[line].length == 1) jsCode.push(lines[line].join(" "));
      }

      if (
        currToken.includes(symbols.OPENING_CURLY_BRACKET) ||
        lines[line].join(" ").includes(symbols.OPENING_CURLY_BRACKET)
      ) {
        openingBracketsCount++;
        if (lines[line].length == 1) jsCode.push(lines[line].join(" "));
      }

      //Ignore single line comments
      if (currToken.includes(symbols.SINGL_LINE_COMMENT)) {
        continue;
      }

      //Ignore multi line comments
      if (currToken.includes(symbols.MULT_LINE_COMMENT_BEGIN)) {
        skipLines = true;
      }

      //Variables and Constants
      if (
        currToken.includes(keywords.DEC_VAR_KEYWD) ||
        currToken.includes(keywords.DEC_CONST_KEYWD)
      ) {
        lines[line] = parseVariableDeclarationStatement(lines[line], pos);
        jsCode.push(lines[line].join(" "));
        break;
      }

      //Function declaration
      if (currToken.includes(keywords.FUNC_DECL)) {
        lines[line] = parseFunctionDeclarationStatement(lines[line], pos);
        jsCode.push(lines[line].join(" "));
        break;
      }

      //Built-in print function
      if (currToken.includes("io.print")) {
        lines[line] = parseBuiltInFunctions(
          lines[line],
          pos,
          "io.print",
          "PRINT"
        );
        jsCode.push(lines[line].join(" "));
        break;
      }

      //Function calls
      if (lines[line][pos].match(rules.FUNCTION_CALL) &&
        !lines[line][pos].includes(symbols.OBJECT_PROP_OR_METHOD)
      ) {
        const id = lines[line][pos].split(symbols.OPENING_PARENTHESIS)[0];

        if (!checkIfItExists(id, "function")) break;

        jsCode.push(lines[line].join(" "));
        break;
      }

      //Return value of functions
      if (currToken.includes(keywords.FUNC_RET_KEYWD)) {
        jsCode.push(
          lines[line].join(" ").replace(keywords.FUNC_RET_KEYWD, "return")
        );
        break;
      }

      //If statement
      if (currToken.includes(keywords.IF_KEYWD)) {
        let thisLine = lines[line];

        thisLine[0] = keywords.IF_KEYWD + " " + symbols.OPENING_PARENTHESIS;

        //Logic operator
        for (let i = 1; i < thisLine.length; i++) {
          if (thisLine[i].includes(keywords.AND_OP_KEYWD)) {
            console.log("AND");
            thisLine[i] = thisLine[i].replace(keywords.AND_OP_KEYWD, "&&");
          }

          if (thisLine[i].includes(keywords.NOT_OP_KEYWD)) {
            console.log("NOT");
            thisLine[i] = thisLine[i].replace(keywords.NOT_OP_KEYWD, "!");
          }

          if (thisLine[i].includes(keywords.AND_OP_KEYWD)) {
            console.log("OR");
            thisLine[i] = thisLine[i].replace(keywords.OR_OP_KEYWD, "||");
          }
        }

        console.log(thisLine);
        thisLine[thisLine.length - 1] = ") " + thisLine[thisLine.length - 1];

        jsCode.push(thisLine.join(" "));
        break;
      }

      //While statement
      if (currToken.includes(keywords.WHILE_KEYWD)) {
        let thisLine = lines[line];

        thisLine[0] = keywords.WHILE_KEYWD + " " + symbols.OPENING_PARENTHESIS;

        //Logic operator
        for (let i = 1; i < thisLine.length; i++) {
          if (thisLine[i].includes(keywords.AND_OP_KEYWD)) {
            console.log("AND");
            thisLine[i] = thisLine[i].replace(keywords.AND_OP_KEYWD, "&&");
          }

          if (thisLine[i].includes(keywords.NOT_OP_KEYWD)) {
            console.log("NOT");
            thisLine[i] = thisLine[i].replace(keywords.NOT_OP_KEYWD, "!");
          }

          if (thisLine[i].includes(keywords.AND_OP_KEYWD)) {
            console.log("OR");
            thisLine[i] = thisLine[i].replace(keywords.OR_OP_KEYWD, "||");
          }
        }

        console.log(thisLine);
        thisLine[thisLine.length - 1] = ") " + thisLine[thisLine.length - 1];

        jsCode.push(thisLine.join(" "));
        break;
      }

      //Increment or decrement statement
      if (
        currToken.match(rules.INC_DEC_STATEMENT) ||
        currToken.match(rules.INC_DEC_STATEMENT_PRE)
      ) {
        jsCode.push(currToken);
      }

      //Classes
      if (currToken.match(rules.CLASSES.METHOD_CALL)) {
        jsCode.push(lines[line].join(" "));
        break;
      }
    }
  }

  if (openingBracketsCount == closingBracketsCount) {
  } else {
    throw errors.CLOSING_CURLY_BRACKET_MISSING;
  }
}

export function transpile(code: string[], output: string) {
  fs.writeFile(output, code.join("\n"), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Successfully wrote data to ${output}`);
    }
  });
}

let code: string[] = [];

try {
  let input = process.argv[2];
  let output = process.argv[3];

  const data = fs.readFileSync(input, "utf-8");
  code = data.split("\n");

  parse(tokenize(code));
  transpile(jsCode, output);
} catch (e) {
  console.error(e);
}
const fs = require("fs");

const keywords = {
  DEC_VAR_KEYWD: "let",
  DEC_CONST_KEYWD: "const",
  DECL_CONST_ALT_KEYWD: "def",
  FUNC_DECL: "fun",
  IF_KEYWD: "if",
  FUNC_RET_KEYWD: "ret",
  AND_OP_KEYWD: "and",
  OR_OP_KEYWD: "or",
  NOT_OP_KEYWD: "not",
  WHILE_KEYWD: "while",
};

const symbols = {
  SINGL_LINE_COMMENT: "//",
  SINGL_LINE_COMMENT_ALT: "#",
  MULT_LINE_COMMENT_BEGIN: "/*",
  MULT_LINE_COMMENT_END: "*/",
  ASSIGN: "=",
  STATEMENT_END: ";",
  TYPE_ANNOTATION: ":",
  OPENING_CURLY_BRACKET: "{",
  CLOSING_CURLY_BRACKET: "}",
  OPENING_PARENTHESIS: "(",
  CLOSING_PARENTHESIS: ")",
};

const rules = {
  FUNCTION_CALL: /[a-z0-9_]+\([a-z0-9_]*\)[;]?/gm,
  INC_DEC_STATEMENT: /.*[a-zA-Z_0-9].{2}[-+]?(;)/gm,
  INC_DEC_STATEMENT_PRE: /.{2}[-+].*[a-zA-Z_0-9]?(;)/gm,
};

const builtinMethods = {
  io: {
    PRINT: "console.log",
  },
};

const ANDREW_TYPES_LIST = ["int", "str", "char", "bool", "float", "double"];

type IAndrewTypes = "int" | "str" | "char" | "bool" | "float" | "double";

const SyntaxTree = {
  program: {
    nodes: [] as {}[],
  },
};

const identifiers = [] as {
  id?: string;
  type?: "function" | "constant" | "variable";
}[];

const errors = {
  INVALID_TYPE_OR_MISMATCH: "Not a valid type or type mismatch",
  CLOSING_CURLY_BRACKET_MISSING: "A closing curly bracket is missing",
};

const jsCode: string[] = [];

let isFunction: boolean = false,
  openingBracketsCount: number = 0,
  closingBracketsCount: number = 0,
  skipLines: boolean = false;

function tokenize(code: string[]): Array<Array<string>> {
  let tokenizedLines: Array<Array<string>> = [[]];
  let currentLineTokens: string[];

  for (let line = 0; line < code.length; line++) {
    currentLineTokens = code[line].split(" ");
    tokenizedLines[line] = currentLineTokens;
  }

  return tokenizedLines;
}

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
      let variableWithType = [];
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

function parse(lines: Array<Array<string>>) {
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
      if (lines[line][pos].match(rules.FUNCTION_CALL)) {
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

      //Array declaration
    }
  }

  if (openingBracketsCount == closingBracketsCount) {
  } else {
    throw errors.CLOSING_CURLY_BRACKET_MISSING;
  }
}

function transpile(code: string[], output: string) {
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

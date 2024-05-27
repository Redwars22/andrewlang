/*
                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.
*/

// Piece of code written by AndrewNation

const keywords = {
    DEC_VAR_KEYWD: "let",
    DEC_CONST_KEYWD: "const",
    FUNC_DECL: "fun"
}

const symbols = {
    SINGL_LINE_COMMENT: "//",
    MULT_LINE_COMMENT_BEGIN: "/*",
    ASSIGN: "=",
    STATEMENT_END: ";",
    TYPE_ANNOTATION: ":",
    OPENING_CURLY_BRACKET: "{",
    CLOSING_CURLY_BRACKET: "}",
    OPENING_PARENTHESIS: "(",
    CLOSING_PARENTHESIS: ")"
}

const rules = {
    FUNCTION_CALL: /[a-z0-9_]+\([a-z0-9_]*\)[;]?/gm
}

const builtinMethods = {
    "io": {
        "PRINT": "console.log"
    }
}

const ANDREW_TYPES_LIST = ["int", "str", "char", "bool", "float", "double"];

type IAndrewTypes = "int" | "str" | "char" | "bool" | "float" | "double";

const SyntaxTree = {
    program: {
        nodes: [] as {}[]
    }
};

const identifiers = [] as {
    id?: string;
    type?: "function" | "constant" | "variable"
}[];

const errors = {
    INVALID_TYPE_OR_MISMATCH: "Not a valid type or type mismatch",
    CLOSING_CURLY_BRACKET_MISSING: "A closing curly bracket is missing"
}

const jsCode: string[] = [];

let isFunction: boolean = false, openingBracketsCount: number = 0, closingBracketsCount: number = 0;

function tokenize(code: string[]): Array<Array<string>> {
    let tokenizedLines: Array<Array<string>> = [[]];
    let currentLineTokens: string[];

    for (let line = 0; line < code.length; line++) {
        currentLineTokens = code[line].split(" ");
        tokenizedLines[line] = currentLineTokens;
    }

    return tokenizedLines;
}

function checkIfItExists(id: string, type: "function" | "variable" | "constant"): boolean {
    for(let i = 0; i < identifiers.length; i++){
        if (identifiers[i].id == id + "()" && identifiers[i].type == type) {
            return true;
        }
    }

    return false;
}

function parseVariableDeclarationStatement(tokens: string[], pos: number): string[] {
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

function parseFunctionDeclarationStatement(tokens: string[], pos: number): string[] {
    let vectorOfTokens: string[] = tokens;
    let hasArgs = false;

    for (let tk = pos; tk < vectorOfTokens.length; tk++) {
        let currToken = vectorOfTokens[tk];

        if (!hasArgs) {
            if (currToken.includes(symbols.OPENING_PARENTHESIS) &&
                currToken.includes(symbols.CLOSING_PARENTHESIS)
            ) {
                isFunction = true; 
            }
        }

        if (currToken.includes(symbols.OPENING_CURLY_BRACKET)) openingBracketsCount++;
    }

    if(!isFunction) throw("invalid func decl");

    vectorOfTokens[0] = "function";
    identifiers.push({id: vectorOfTokens[1], type: "function"});

    return vectorOfTokens;
}

function getJSFuncCounterpart(key: string) {
    if(key == "PRINT"){
        return builtinMethods.io.PRINT;
    }

    return "";
}

function parseBuiltInFunctions(tokens: string[], pos: number, id: string, key: string): string[] {
    let vectorOfTokens: string[] = tokens;

    for(let tk = 0; tk < tokens.length; tk++){
        vectorOfTokens[tk] = vectorOfTokens[tk].replace(id, getJSFuncCounterpart(key));
    }

    return vectorOfTokens;
}

function parse(lines: Array<Array<string>>) {
    for (let line = 0; line < lines.length; line++) {
        for (let pos = 0; pos < lines[line].length; pos++) {
            let currToken = lines[line][pos];

            //Variables and Constants
            if (currToken.includes(keywords.DEC_VAR_KEYWD)) {
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

            if(currToken.includes(symbols.CLOSING_CURLY_BRACKET)) {
                closingBracketsCount++;
                jsCode.push(lines[line].join(" "));
                break;
            }

            //Built-in print function
            if(currToken.includes("io.print")) {
                lines[line] = parseBuiltInFunctions(lines[line], pos, "io.print", "PRINT");
                jsCode.push(lines[line].join(" "))
                break;
            }

            //Function calls
            if (lines[line][pos].match(rules.FUNCTION_CALL)) {
                const id = lines[line][pos].split(symbols.OPENING_PARENTHESIS)[0];
                
                if(!checkIfItExists(id, "function")) break;

                jsCode.push(lines[line].join(" "));
                break;
            }
        }
    }

    if(openingBracketsCount == closingBracketsCount){

    } else {
        throw(errors.CLOSING_CURLY_BRACKET_MISSING);
    }
}

function transpile() { }

const code: string[] = ["let msg = \"Hello World\"", "fun greet() {", "io.print(msg)", "}", "greet()"];

try {
    parse(tokenize(code));
} catch (e) {
    console.error(e)
}

// Add a function to open file, to exec and to write to js and run
console.log(code.join("\n"));
eval(jsCode.join("\n"))
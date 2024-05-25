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

const builtinMethods = {
    io: {
        PRINT: "console.log"
    }
}

const ANDREW_TYPES_LIST = ["int", "str", "char", "bool", "float", "double"];

type IAndrewTypes = "int" | "str" | "char" | "bool" | "float" | "double";

const SyntaxTree = {
    program: {
        nodes: [] as {}[]
    }
};

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
                jsCode.push(lines[line].join(" "))
            }
        }
    }

    if(openingBracketsCount == closingBracketsCount){

    } else {
        throw(errors.CLOSING_CURLY_BRACKET_MISSING);
    }
}

function transpile() { }

const code: string[] = ["let name:int = -123;", "fun greet() {", "io.print(12);", "}"];

try {
    parse(tokenize(code));
} catch (e) {
    console.error(e)
}

console.log(jsCode);
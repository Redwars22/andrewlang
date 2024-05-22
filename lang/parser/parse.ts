const keywords = {
    DECLARE_VAR_KEYWD: "let",
    DECLARE_CONST_KEYWD: "const"
}

const symbols = {
    SINGLE_LINE_COMMENT: "//"
}

const SyntaxTree = {
    program: {
        nodes: [] as {}[]
    }
};

function Parse(line: string){
    let tokens: string[] = line.split(" ");

    if(line.includes(symbols.SINGLE_LINE_COMMENT)){
        return;
    }

    if(tokens[0] == keywords.DECLARE_VAR_KEYWD){
        const variable = {
            type: "",
            identifier: "",
            initialValue: "" as string | null
        }

        let isTypeAnnotated = () => {
            if(tokens[1].includes(":")){
                let tk = tokens[1].split(":");
                console.log(tk)
                variable.identifier = tk[0];
                variable.type = typeof tk[1];

                return true;
            } else {
                variable.identifier = tokens[1];
                return false;
            }
        }

        if(tokens[2] == "="){
            variable.initialValue = tokens[3];
        } else {
            variable.initialValue = null;
        }

        if(!isTypeAnnotated() && variable.initialValue){
            variable.type = typeof variable.initialValue;
        }

        if(variable.type !== typeof variable.initialValue){
            console.log("MISMATCHING TYPE");
        }

        SyntaxTree.program.nodes.push({
            kind: "VAR_DECL",
            identifier: variable.identifier,
            value: variable.initialValue,
            type: variable.type
        });
    }
}

const code = [
    "let name:int = -123",
    "//this is a comment"
]

for(let i = 0; i < code.length; i++){
    Parse(code[i]);
}

console.log(SyntaxTree)
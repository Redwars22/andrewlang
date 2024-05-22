#include <iostream>
#include <map>
#include <bits/stdc++.h>

std::map <std::string, std::string> keywords = {
    {"DECLARE_VAR_KEYWD", "let"},
    {"DECLARE_CONST_KEYWD", "const"}
};

std::map <std::string, std::string> symbols = {
    {"SINGLE_LINE_COMMENT", "//"}
};

void Parse(std::string line){
    std::stringstream tokens(line);
    std::string _tok;

    if(line.find(symbols["SINGLE_LINE_COMMENT"])){
        std::cout << "it is a comment";
        return;
    }
    
    while(tokens >> _tok){
        if(_tok == keywords["DECLARE_VAR_KEYWD"]){
        
        }
    }
}

int main() {
    const std::string testVarDecl = "let name:int = -123";
    const std::string comment = "//comment";
    
    Parse(testVarDecl);
    Parse(comment);
    return 0;
}

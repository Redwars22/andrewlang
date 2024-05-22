
#include <iostream>
#include <map>
#include <bits/stdc++.h>

std::map <std::string, std::string> keywords = {
    {"DECLARE_VAR_KEYWD", "let"},
    {"DECLARE_CONST_KEYWD", "const"}
};

void Parse(std::string line){
    std::stringstream tokens(line);
    std::string _tok;
    
    while(tokens >> _tok){
        if(_tok == keywords["DECLARE_VAR_KEYWD"]){
        
        }
    }
}

int main() {
    const std::string testVarDecl = "let name:int = -123";
    
    Parse(testVarDecl);
    return 0;
}

/*
                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.
*/

// Piece of code written by AndrewNation

#include <iostream>

class io {
    public:
        virtual void printLn(int arg){
            std::cout << arg << std::endl;
        }
        
        virtual void printLn(std::string arg){
            std::cout << arg << std::endl;
        }
        
        virtual void printLn(double arg){
            std::cout << arg << std::endl;
        }
        
        virtual void printLn(float arg){
            std::cout << arg << std::endl;
        }
        
        virtual void print(int arg){
            std::cout << arg;
        }
        
        virtual void print(std::string arg){
            std::cout << arg;
        }
        
        virtual void print(float arg){
            std::cout << arg;
        }
        
        virtual void print(double arg){
            std::cout << arg;
        }

        virtual int readInt(){
            int val;
            std::cin >> val; 

            return val;
        }

        virtual std::string read(){
            std::string val;
            std::cin >> val; 

            return val;
        }

        virtual float readFloat(){
            float val;
            std::cin >> val; 

            return val;
        }

        virtual double readDouble(){
            double val;
            std::cin >> val; 

            return val;
        }

        virtual char readChar(){
            char val;
            std::cin >> val; 

            return val;
        }
};

int main() {
    io io;
    io.printLn(9);
    io.printLn("abcdefg");
    io.print(999);
    io.print("samelinetext -- ");
    io.print(9.999);
    io.read();

    return 0;
}
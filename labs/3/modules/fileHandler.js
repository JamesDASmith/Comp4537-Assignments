let fs = require('fs');  //node methods 'file system'

class FileHandler{

//static cause you can call the method without creating a object
 static appendToFile(fileName, text){

    //appends to end of a file 
    //if a file doesnt exist it creates one 
    //sync means it waits for any other file process to be finished 
    fs.appendFileSync(fileName, text + "\n");

 }
//utf8 is character encoding, tells js to return the contents as a string 
 static readFromFile(fileName){
return fs.readFileSync(fileName, 'utf8')
 }
}
module.exports = FileHandler;
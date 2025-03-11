import {writeFile, readFile} from "fs"
import {start, use} from "./03e-cmdFramework.js"


use("sum", function sum(input){
    console.log(Number(input[0]) + Number(input[1]));
})
use("minus", function minus(input){
    console.log(Number(input[0]) - Number(input[1]));
})
use("print", function print(input){
    let obj={
        name: input[0],
        family: input[1],
        email: input[2]
    }
    console.log(obj);
})
use("print2", function print2(input){
    let obj={
        name: input[0],
        family: input[1],
        email: input[2]
    }
    for(let x in obj){
        console.log('salam: ' + obj[x]);
    }
})
use("write", function write(input){
    let obj={
        name: input[0],
        family: input[1],
        email: input[2]
    }
    function writeCallback(error, data){
        if(error){
            console.log('ERROR:', error);
        }
        else{
            console.log('write done.');
        }
    }
    writeFile('./data.txt', JSON.stringify(obj), writeCallback);
})
use("create", function create(input){
    let obj={
        name: input[0],
        family: input[1],
        email: input[2]
    }
    readFile('./data.json', 'utf8', function (error, data){
        if(error){
            console.log('ERROR:', error);
        }
        else{
            let dataObject = JSON.parse(data);
            dataObject.data.push(obj);
            let dataString = JSON.stringify(dataObject);
            
            writeFile('./data.json', dataString, function (error){
                if(error){
                    console.log('ERROR:', error);
                }
                else{
                    console.log('create Done.');
                }
            });
        }
    });
})
use("read", function read(input){
    readFile("data.json", "utf8", function (error, data){
        if(error){
            console.log('ERROR:', error);
        }
        else if(input.length !== 0){
            let find = input[0]
            let file_data = JSON.parse(data).data;
            let file_found = false;
            
            for (let index = 0; index < file_data.length; index++) {
                if(file_data[index].name === find){
                    console.log("FILE DATA: ", file_data[index]);
                    file_found = true;
                    break;
                }
            }

            if(!file_found){
                console.log("not found.")
            }
        }
        else{
            let file_data = JSON.parse(data).data;
            console.log("FILE DATA: ", file_data);
        }
    });
})

start()
let fs = require('fs');
let input = process.argv.slice(3);
let command = process.argv[2];

let controllers = [
    {
        command: "sum",
        function: function sum(input){
            if (command === 'sum') {
                console.log(Number(input[0]) + Number(input[1]));
            }
        }
    },
    {
        command: "minus",
        function: function minus(input){
            if (command === 'minus') {
                console.log(Number(input[0]) - Number(input[1]));
            }
        }
    },
    {
        command: "print",
        function: function print(input){
            if (command === 'print') {
                let obj={
                    name: input[0],
                    family: input[1],
                    email: input[2]
                }
                console.log(obj);
            }
        }
    },
    {
        command: "print2",
        function: function print2(input){
            if (command === 'print2') {
                let obj={
                    name: input[0],
                    family: input[1],
                    email: input[2]
                }
                for(let x in obj){
                    console.log('salam: ' + obj[x]);
                }
            }
        }
    },
    {
        command: "write",
        function: function write(input){
            if (command === 'write') {
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
                fs.writeFile('./data.txt', JSON.stringify(obj), writeCallback);
            }
        }
    },
    {
        command: "create",
        function: function create(input){
            if (command === 'create') {
                let obj={
                    name: input[0],
                    family: input[1],
                    email: input[2]
                }
                fs.readFile('./data.json', 'utf8', function (error, data){
                    if(error){
                        console.log('ERROR:', error);
                    }
                    else{
                        let dataObject = JSON.parse(data);
                        dataObject.data.push(obj);
                        let dataString = JSON.stringify(dataObject);
                        
                        fs.writeFile('./data.json', dataString, function (error){
                            if(error){
                                console.log('ERROR:', error);
                            }
                            else{
                                console.log('create Done.');
                            }
                        });
                    }
                });
            }
        }
    },
    {
        command: "read",
        function: function read(input){
            if (command === "read") {
                fs.readFile("data.json", "utf8", function (error, data){
                    if(error){
                        console.log('ERROR:', error);
                    }
                    else if(input.length !== 0){
                        find = input[0]
                        file_data = JSON.parse(data).data;
                        file_found = false;
                        
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
                        file_data = JSON.parse(data).data;
                        console.log("FILE DATA: ", file_data);
                    }
                });
            }
        }
    }
]


for (let controller of controllers) {
    if (controller.command === command) {
        controller.function(input)
    }
}

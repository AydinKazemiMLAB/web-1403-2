import {use, start, write} from "./05-httpFramework-f.js"
import {readFile} from "fs"


use("GET", "sum", function(request, response){
    let url = request.url.split('/');
    let inputs = url.slice(2);

    write(response, 200, (Number(inputs[0]) + Number(inputs[1])).toString())
});


use("POST", "sum", function(request, response){
    let data = request.data

    write(response, 200, (Number(data.input1) + Number(data.input2)).toString())
});


use("GET", "log", function(request, response){
    let data = request.data
    console.log("Data: ", data);
    response.end()
})


use("GET", "file", function(request, response){
    let url = request.url.split('/');
    let inputs = url.slice(2);

    readFile(inputs[0], function (error, data){
        if(error){
            write(response, 400, "Error: " + error)
        }else{
            write(response, 200, data)
        }
    });
})


start()

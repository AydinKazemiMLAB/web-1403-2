import {use, start} from "./05-httpFramework-d.js"


use("GET", "sum", function(request, response){
    let url = request.url.split('/');
    let inputs = url.slice(2);

    response.write((Number(inputs[0]) + Number(inputs[1])).toString());
    response.end();
});


use("POST", "sum", function(request, response){
    let data = request.data

    response.write((Number(data.input1) + Number(data.input2)).toString());
    response.end();
});


use("GET", "log", function(request, response){
    let data = request.data
    console.log("Data: ", data);
    response.end()
})


start()

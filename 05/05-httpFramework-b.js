import {createServer} from 'http';


let controllers = [];


function use(name, func){
    let item = {
        command: name,
        function: func
    }
    controllers.push(item);
}


function router(request, response){
    let url = request.url.split('/');
    let command = url[1];

    for(let item of controllers){
        if(item.command === command){
            item.function(request, response);
        }
    }
}


let myServer = createServer(function(request, response){
    console.log(request.method, request.url);

    let data = '';
    request.on("data", function(chunk){
        data += chunk;
    });
    request.on("end", function(){
        try{
            data = JSON.parse(data);
        }
        catch(e){
            
        }
        request.data = data;
        router(request, response);
    });
});


use("sum", function(request, response){
    let url = request.url.split('/');
    let inputs = url.slice(2);
    let method = request.method
    let data = request.data
    
    if(method === "GET"){
        response.write((Number(inputs[0]) + Number(inputs[1])).toString());
        
    }else if(method === "POST"){
        response.write((Number(data.input1) + Number(data.input2)).toString());
    }

    response.end();
});


use("log", function(request, response){
    let data = request.data
    console.log("Data: ", data);
    response.end()
})


myServer.listen(80);

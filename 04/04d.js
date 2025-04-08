import {createServer} from "http"


let server = createServer(function(request, responce){

    let data = ""
    request.on("data", function(chunk){
        data += chunk;
    })

    request.on("end", function(){
        router(request, responce, data)
    })
})


function router(request, responce, data){
    let url = request.url.split('/');
    let method = request.method
    let command = url[1];
    let inputs = url.slice(2);

    if(command === "sum" && method === "GET"){
        let answer = Number(inputs[0]) + Number(inputs[1]);
        responce.write(String(answer));

    }else if(command === "sum" && method === "POST"){
        data = JSON.parse(data)
        let answer = Number(data.input1) + Number(data.input2);
        responce.write(String(answer))

    }else{
        responce.write("command not found")
    }
    
    responce.end()
}
server.listen(8000)
import {createServer} from 'http';


let controllers = [];


function use(method, name, func){
    let item = {
        method: method,
        command: name,
        function: func
    }
    controllers.push(item);
}


function router(request, response){
    let url = request.url.split('/');
    let method = request.method
    let command = url[1];
    let find = false;

    for(let item of controllers){
        if(item.command === command && item.method === method){
            item.function(request, response);
            find = true;
            break;
        }
    }

    if(find === false){
        response.write("Command not found");
        response.end();
    }
}


function start(){
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
    
    myServer.listen(80);
}


function write(response, status, body){
    response.write(body);
    response.writeHead(status);
    response.end()
}


export {
    use,
    start,
    write
}


import {createServer} from "http"


let server = createServer(function(request, responce){
    let url = request.url.split('/')
    let answer = Number(url[1]) + Number(url[2])
    responce.write(String(answer))
    responce.end()
})

server.listen(8000)
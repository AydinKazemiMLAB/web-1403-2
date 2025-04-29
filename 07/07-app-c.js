import {writeFile, readFile} from 'fs';
import {use, start, write} from "./07-httpFramework-a.js";
import jwt from "jsonwebtoken";
let signKey = "hello world"
let tokenAge = 300;


function checkToken(token){
    let decodedToken = jwt.verify(token, signKey)
    if(Date.now()/1000 - decodedToken.iat > tokenAge){
        console.log("Token is expired")
        return false;
    }else{
        return true;
    }
}


function extractCookies(headerCookies, find){
    let cookies = headerCookies.split(';');
    for(let cookie of cookies){
        let cookieParts = cookie.split('=');
        if(cookieParts[0] === find){
            return cookieParts[1];
        }
    }
}


use('POST', 'sum', function (request, response) {
    let token = extractCookies(request.headers.cookie, "token");
    if(checkToken(token)) {
        response.write((parseInt(request.data.input1) + parseInt(request.data.input2)).toString());
        response.end();
    }else {
        write(response, 403, 'ERROR:' + "Token is expired");
    }
});

use('GET', 'sum', function (request, response) {
    let url = request.url.split('/');
    let inputs = url.slice(2);
    response.write((parseInt(inputs[0]) + parseInt(inputs[1])).toString());
    response.end();
});

use('GET', 'log', function (request, response) {
    console.log('post data is:', request.data);
    response.end();
});

use('GET', 'file', function (request, response) {
    let url = request.url.split('/');
    let inputs = url.slice(2);

    readFile(inputs[0], function (error, fileBody) {
        if (error) {
            console.log('ERROR:', error);
            write(response, 400, 'ERROR:' + error)
        } else {
            response.write(fileBody);
            response.end();
        }
    });
});

use('POST', 'user', function (request, response) {
    readFile('./users.json', 'utf8', function (error, fileData) {
        if (error) {
            console.log('ERROR:', error);
            write(response, 500, 'ERROR:' + error);
        } else {
            let dataObject = JSON.parse(fileData);
            let find = false;
            let username = request.data.user

            for(let user_info of dataObject.records){
                if(user_info.user === username){
                    find = true;
                    break;
                }
            }

            if(find === false){
                dataObject.records.push(request.data);
                let dataString = JSON.stringify(dataObject);

                writeFile('./users.json', dataString, function (error) {
                    if (error) {
                        console.log('ERROR:', error);
                        write(response, 500, 'ERROR:' + error)
                    } else {
                        console.log('User Created.');
                        write(response, 200, 'User Created.')
                    }
                });
            }else{
                console.log('ERROR: ', "Username is already taken");
                write(response, 400, 'ERROR: ' + "Username is already taken");
            }
        }
    });
});

use("DELETE", "user", function (request, response){
    readFile('./users.json', 'utf8', function (error, fileData) {
        if (error) {
            console.log('ERROR:', error);
            write(response, 500, 'ERROR:' + error);
        } else {
            let dataObject = JSON.parse(fileData);
            let find = false
            let username = request.data.user

            for(let i in dataObject.records){
                if(dataObject.records[i].user === username){
                    dataObject.records.splice(i, 1);
                    find = true;
                    break;
                }
            }

            if(find === false){
                console.log('ERROR: ', "User does not exist");
                write(response, 400, 'ERROR: ' + "User does not exist");
            }else{
                let dataString = JSON.stringify(dataObject);
                writeFile('./users.json', dataString, function (error){
                    if(error){
                        console.log('ERROR:', error);
                        write(response, 500, 'ERROR: ' + error);
                    }
                    else{
                        console.log('User deleted successfully');
                        write(response, 200, 'User deleted successfully');
                    }
                });
            }
        }
    });
})

use("POST", "token", function (request, response){
    readFile('./users.json', 'utf8', function (error, fileData) {
        if (error) {
            console.log('ERROR:', error);
            write(response, 500, 'ERROR:' + error);
        }else {
            let dataObject = JSON.parse(fileData);
            let username = request.data.user
            let password = request.data.pass

            for(let user_info of dataObject.records){
                if(user_info.user === username && user_info.pass == password){
                    let token = jwt.sign(user_info, signKey)
                    let dataString = JSON.stringify({"token": token})
                    let headerToken = ["token=" + token + ";Max-Age=" + tokenAge]

                    console.log("Token successfully created");
                    write(response, 200, dataString, headerToken);
                    return;
                }
            }

            console.log('ERROR: ', "User not found");
            write(response, 500, 'ERROR: ' + "User not found");
        }
    });
})

start();

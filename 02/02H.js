let fs = require("fs");

let my_array = process.argv.slice(3);
let command = process.argv[2];

if(command === "sum"){
    console.log(Number(my_array[0]) + Number(my_array[1]));

}else if(command === "minus"){
    console.log(Number(my_array[0]) - Number(my_array[1]));

}else if(command === "print"){
    let obj = {
        first_name: my_array[0],
        last_name: my_array[1],
        email: my_array[2]
    };

    for(let key in obj){
        console.log("Hello " + obj[key]);
    };

    
    let strObj = JSON.stringify(obj);

    fs.writeFile("data.json", strObj, function(error, data){
        if (error){
            console.log("Error: " + error)
        }else{
            console.log("Success: " + data)
        };
    });

}else if(command === "create"){
    fs.readFile("data2.json", "utf8", function(error, data){
        if(error){
            console.log("Error while reading: " + error);

        }else{
            let new_data = JSON.parse(data);
            let obj = {
                first_name: my_array[0],
                last_name: my_array[1],
                email: my_array[2]
            };

            new_data.data.push(obj);
            new_data = JSON.stringify(new_data);

            fs.writeFile("data2.json", new_data, function(error){
                if (error){
                    console.log("Error while writing: " + error)
                }else{
                    console.log("Success")
                };
            });
        }
    });

}else{
    console.log("Invalid Input");
};

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

    let fs = require("fs");
    let strObj = JSON.stringify(obj);

    fs.writeFile("data.json", strObj, function(error, data){
        if (error){
            console.log("Error: " + error)
        }else{
            console.log("Success: " + data)
        };
    });

}else{
    console.log("Invalid Input");
};

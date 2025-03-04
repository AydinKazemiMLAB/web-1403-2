let my_array = process.argv.slice(3);
let command = process.argv[2];

if(command === "sum"){
    console.log(Number(my_array[0]) + Number(my_array[1]));
}else if(command === "minus"){
    console.log(Number(my_array[0]) - Number(my_array[1]));
}else{
    console.log("Invalid Input");
}

let my_array = process.argv.slice(2);

if(my_array[0] === "sum"){
    console.log(Number(my_array[1]) + Number(my_array[2]));
}else{
    console.log("Invalid Input");
}

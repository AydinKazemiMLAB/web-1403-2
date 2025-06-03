import assert from "assert";
import axios from "axios";


describe("Array", function (){
    describe("#indexOf()", function (){
        it('should return -1 when the value is not present', function () {

            axios.put("http://127.0.0.1/item", {
                id: 103330
            }).then(
                function (response){
                    console.log(response.data)
                }
            ).catch(
                function (error){
                    console.log(error)
                }
            )

            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    })
})

var express = require ("express");
var app = express();

var PORT = process.env.PORT || 3000;
var todos=[{
	id:1,
	description: "Go to Market ",
	completed: false 
},
{
	id:2,
	description: "Go to Bathroom ",
	completed: false 

},
{
	id:3,
	description: "Go to Bed ",
	completed: false 
}];

app.get("/todos",function (req,res) {
	res.json(todos);
	console.log("In the TODOS !");
});

app.get("/todos/:id",function (req,res) {
    var reqId = parseInt(req.params.id,10); 
    var todoSen;
    

    todos.forEach(function (todo) {
    	if (todo.id === reqId){
          todoSen=todo;
         }
          });

   	   if(todoSen)
   	   {
   	   	 res.json(todoSen);
   	   }else{
   	   	res.status(404).send();
   	   }


});



app.get("/", function (req,res) {
	res.status(404).send();
});

app.listen(PORT, function () {
});
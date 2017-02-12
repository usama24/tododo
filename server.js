var express = require ("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());
var PORT = process.env.PORT || 3000;
var todos=[];
var todoArray = 1;

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


app.post("/todos",function (req, res) {
	var body = req.body;

var idd = todoArray;

body.id=idd;
todoArray++;
todos.push(body);

    res.json(body);
});

app.get("/", function (req,res) {
	res.status(404).send();
});

app.listen(PORT, function () {
});
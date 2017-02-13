var express = require ("express");
var bodyParser = require("body-parser");
var _ = require("underscore");
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


app.delete("/todos/:id",function (req,res) {
var reqId = parseInt(req.params.id,10);
var matchedtodo = _.findWhere(todos,{id: reqId});

if(!matchedtodo){
	res.status(404).send("no such id exists ");
}else{
	todos = _.without(todos, matchedtodo);

	res.json(matchedtodo);
}

});


app.put("/todos/:id",function (req,res) {
      var reqId = parseInt(req.params.id,10);
      var parobj={};
      var matchedtodo = _.findWhere(todos, {id: reqId});
      var reqbody = _.pick(req.body,"completed", "description");

      if(reqbody.hasOwnProperty("completed") && _.isBoolean(reqbody.completed)){
          parobj.completed = reqbody.completed;
      }else if(reqbody.hasOwnProperty("completed")){
        return	res.status(404).send();
      }

      if(reqbody.hasOwnProperty("description") && _.isString(reqbody.description)){
          parobj.description = reqbody.description;
      }else if(reqbody.hasOwnProperty("description")){
        return	res.status(404).send();
      } 

      
     _.extend(matchedtodo, parobj);
      

      res.json(matchedtodo);
      
});


app.get("/", function (req,res) {
	res.status(404).send();
});

app.listen(PORT, function () {
});
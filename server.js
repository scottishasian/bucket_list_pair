const express = require('express');
const parser = require('body-parser');
const app = express();

const MongoClient = require('mongodb').MongoClient;
// we only want access to that specific object in MongoDB.


app.use(parser.json());
app.use(express.static('client/build'));
app.use(parser.urlencoded({extended: true}));

MongoClient.connect('mongodb://localhost:27017', function(err, client){
  if(err){
  console.log(err);
  return;
  }

 const db = client.db('buck_list');
 console.log("Connect to database");

 app.post('/api/list', function(req, res){
   db.collection('list').insert(req.body, function(err, result){
     if(err){
     res.status(500);
     res.send();
     return;
   }
   console.log("Saved to list");
   res.status(201);
   res.json(result.ops[0]);
   })
 });










  app.listen(3000, function(){
    console.log("Listening on port 3000");
  });

});

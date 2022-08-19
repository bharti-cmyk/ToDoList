const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Todolist = require('./models/todolist');

const app = express();

//setting up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//to parse form input we use urlencoded
app.use(express.urlencoded());

//to use static files we use asset
app.use(express.static('assets'));

app.get('/', function(req, res){


    Todolist.find({}, function(err, todolist){
        if(err){
            console.log("error in fetching list from db");
            return;
        }
        return res.render('home',{
            title: "Todolist",
            list: todolist
        });

    })
  
})

// to create new record
app.post('/create-list', function(req, res){
    
    
    Todolist.create({
        description: req.body.description,
        category: req.body.category,
        duedate: req.body.duedate.slice(0,1)
    }, function(err, newTodolist){
        if(err){console.log('Error in creating a list!')
            return;}
            console.log('******', newTodolist);
            return res.redirect('back');
    })
  

});



app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})

//to delete a record
app.get('/delete-list/', function(req, res){
    console.log(req.query);
    let id = req.query.id

    Todolist.findOneAndDelete(id, function(err){
        if(err){
            console.log('error in deleting the object');
            return;
        }
        return res.redirect('back');
    })


   
});

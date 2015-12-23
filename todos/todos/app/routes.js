/**
 * Created by a.kopylov on 21.12.2015.
 */
module.exports = function(app,passport,Todo){


    app.get('/api/todos', function (req, res) {

        // use mongoose to get all todos in the database
        Todo.find(function (err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        }
        );
    });

    app.post('/api/todos', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function (err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });

    });

// delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function (err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });
    app.get('/auth/facebook', passport.authenticate('facebook',{scope: 'email'}));
    app.get('/auth/facebook/callback',
      passport.authenticate('facebook',{
          successRedirect : '/',
          failureRedirect : '/'
      })
    );
    app.get('/in', function (req, res) {
        res.sendFile(__dirname+'/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
        console.log('Sending indexpage');
        res.json({"userno":"20"})
    });
    app.get('/ej', function (req,res){
        res.render('index.ejs');
        res.json({"userno":"10"});
    })

};

//route middleware to make sure a user is logged in

function isLoggedIn(req,res,next){
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
var express = require('express'),
    pug = require('pug'),
    app =  express(),
     Sequelize = require('sequelize'),
     sequelize = new Sequelize('zahra120', 'zahra120', '' , {dialect: 'postgres'}),
      bodyParser = require('body-parser');


      var Message = sequelize.define('message', {
        title: Sequelize.STRING,
        description: Sequelize.TEXT
      });

   app.use(bodyParser.urlencoded({ extended: false }));


   app.get('/new', function(request, response) {
      Message.findAll({ order: 'id DESC' }).then(function(messages){
         response.send(pug.renderFile('views/index.pug', { messages: messages }));

   });


});


   app.get('/', function(request, response){
      response.send(pug.renderFile('views/new.pug'));
   });

   app.post('/', function(request, response){
      console.log(request.body);
      Message.create(request.body).then(function(){
         response.redirect('/new');
      });

});



   sequelize.sync().then(function(){
     console.log('we are conected to database');
     app.listen(3000, function() {
       console.log('Web server started on port 3000');
     });
});

var express = require('express'),
    pug = require('pug'),
    app =  express(),
     Sequelize = require('sequelize'),
     sequelize = new Sequelize('zahra120', 'zahra120', '' , {dialect: 'postgres'}),
      bodyParser = require('body-parser');


      var Message = sequelize.define('message', {
        name: Sequelize.STRING,
        description: Sequelize.TEXT
      });

   app.use(bodyParser.urlencoded({ extended: false }));


   app.get('/', function(request, response) {
    Message.findAll().then(function(messages){
      response.send(pug.renderFile('views/index.pug', { messages: messages }));

   });


});


   app.get('/new', function(request, response){
      response.send(pug.renderFile('views/new.pug'));
   });

   app.post('/', function(request, response){
   console.log(request.body);
   Message.create(request.body).then(function(){
      response.redirect('/');
   });

});



   sequelize.sync().then(function(){
  console.log('we are conected to database');
  app.listen(3000, function() {
    console.log('Web server started on port 3000');
  });
});

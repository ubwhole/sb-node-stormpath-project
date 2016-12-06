var express = require('express');
var stormpath = require('express-stormpath');
 
var app = express();
 
app.set('views', './views');
app.set('view engine', 'jade');
 
app.use(stormpath.init(app, {
      expand: {
                      customData: true
      }
}));
 
app.get('/', stormpath.getUser, function(req, res) {
      res.render('home', {
              title: 'Welcome'
            });
});

app.get('/notes', stormpath.apiAuthenticationRequired, function(req, res) {
      res.json({notes: req.user.customData.notes || "This is your notebook. Edit this to start saving your notes!"})
});
 
var bodyParser = require('body-parser');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
     
app.post('/notes', stormpath.apiAuthenticationRequired, function(req, res) {
      if(!req.body.notes || typeof req.body.notes != "string") {
              res.status(400).send("400 Bad Request")
      }
       
      req.user.customData.notes = req.body.notes
      req.user.customData.save()
      res.status(200).end()
});

app.use('/profile',stormpath.loginRequired,require('./profile')());

app.on('stormpath.ready',function(){
      console.log('Stormpath Ready');
});
 
app.listen(process.env.PORT || 3000);

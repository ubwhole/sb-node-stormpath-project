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
 
app.on('stormpath.ready',function(){
      console.log('Stormpath Ready');
});
 
app.listen(process.env.PORT || 3000);

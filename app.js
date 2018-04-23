/**
 * Created by summer on 2018/4/21.
 */
require('events').EventEmitter.prototype._maxListeners = 100;
var resize = require('./lib/resize'),
  cfg = require('./config'),
  express = require('express'),
  port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000,
  host = process.env.OPENSHIFT_NODEJS_IP;

const photosPath = './resources/photos';
resize.init(photosPath);

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/assets/dist/'));
app.use('/', require('./lib/gallery.js')(Object.assign({
  staticFiles : 'resources/photos',
  urlRoot : '/',
  title : 'Summer Album',
  render : false
}, cfg)), function (req, res, next) {
  return res.render('gallery', Object.assign({
    galleryHtml : req.html
  }, cfg));
});

app.listen(port, host);
host = host || 'localhost';
console.log('summer-album listening on ' + host + ':' + port);
'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _feed = require('../src/feed');

var _feed2 = _interopRequireDefault(_feed);

var _index = require('../src/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var yp = new _index2.default({
  buildURLFunction: function buildURLFunction(videoId) {
    return 'http://podsync.net/download/youtube/' + videoId;
  },
  apiKey: 'AIzaSyAcIv3VxVE1n61pW-WrN5iTbW8yfkx-5TY',
  maxVideos: 30,
  cacheTTL: 1800
});

yp.feedForChannel('UCdiSVEfN3qg0VeZO3t4vueA', function (err, xml) {
  console.log(err || xml);

  _fs2.default.writeFile("/Users/aroras/Desktop/youtube-podcast-master/output.xml", xml, function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
  // process.exit();
});

//# sourceMappingURL=index-compiled.js.map
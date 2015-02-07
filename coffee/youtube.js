// Generated by CoffeeScript 1.9.0
(function() {
  var filePath, google, pully, search_youtube, youtube;

  google = void 0;

  search_youtube = void 0;

  youtube = void 0;

  google = require('googleapis');

  pully = require('pully');

  filePath = "/home/rob/youtube";

  search_youtube = function(query, callback) {
    youtube.search.list({
      part: 'snippet',
      type: 'video',
      q: query,
      maxResults: 1,
      order: 'date',
      safeSearch: 'moderate',
      videoEmbeddable: true
    }, function(err, res) {
      if (err) {
        return callback(err);
      }
      res.items.forEach(function(result) {
        var video;
        video = void 0;
        video = {
          id: result.id.videoId,
          urlShort: 'http://youtu.be/' + result.id.videoId,
          urlLong: 'http://www.youtube.com/watch?v=' + result.id.videoId,
          title: result.snippet.title || ''
        };
        youtube.videos.list({
          part: 'contentDetails',
          id: video.id
        }, function(err2, data) {
          if (err2) {
            return callback(err2);
          }
          if (data.items.length >= 1) {
            data.items[0].contentDetails.duration.replace(/PT(\d+)M(\d+)S/, function(t, m, s) {
              video.duration = parseInt(m) * 60 + parseInt(s);
            });
            video.definition = data.items[0].contentDetails.definition;
            callback(null, video);
          }
        });
      });
    });
  };

  google.options({
    auth: 'AIzaSyC8uRTf_hJCiI5Yy0t88Kds97gaa47q6TI'
  });

  youtube = google.youtube('v3');

  search_youtube('Never gonna give you up', function(res) {
    return console.log(res.urlShort);
  }, function(err) {
    return console.error(err);
  });

}).call(this);

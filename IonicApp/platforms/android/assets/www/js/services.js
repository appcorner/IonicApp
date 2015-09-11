angular.module('starter.services', [])

.factory('Playlist', function () {
    var media;
    var mediaTimer = null;
    var isMediaPlay = false;
    var playlist = {
        songList: [
            "sound/distance.mp3",
            "sound/5.mp3",
            "sound/dot.mp3",
            "sound/0.mp3",
            "sound/2.mp3",
            "sound/kilometer.mp3",
            "sound/time.mp3",
            "sound/5.mp3",
            "sound/10.mp3",
            "sound/ed.mp3",
            "sound/minute.mp3",
            "sound/ye.mp3",
            "sound/10.mp3",
            "sound/9.mp3",
            "sound/second.mp3"
        ],
        currentMedia: 0,
    };

    // onSuccess Callback
    //
    var onSuccess = function () {
        console.log("playAudio():Audio Success");
        //media.stop();
        isMediaPlay = false;
        playlist.currentMedia++;
        //playLoop();
    };

    // onError Callback 
    //
    var onError = function (error) {
        alert('code: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
    };

    return {
        play: function () {
            var self = this;
            //media = null;
            playlist.currentMedia = 0;

            // loop every 100 millisecond
            if (mediaTimer == null) {
                mediaTimer = setInterval(self.playLoop, 50);
            }
        },
        playLoop: function () {
            var self = this;
            if (!isMediaPlay) {
                if (playlist.currentMedia < playlist.songList.length) {
                    console.log(getPhoneGapPath() + playlist.songList[playlist.currentMedia]);
                    var media = new Media(getPhoneGapPath() + playlist.songList[playlist.currentMedia], onSuccess, onError);
                    isMediaPlay = true;
                    media.play();
                } else {
                    self.stop();
                }
            }
        },
        stop: function () {
            clearInterval(mediaTimer);
            mediaTimer = null;
        }
    };
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});

var randomTattoo = {
    
    agents : [
        'Patrick Swayze',
        'a grizzly bear',
        'a shark',
        'a sea monster',
        'a gorilla',
        'Michael Jordan',
        'an angel',
        'a unicorn',
        'an eagle',
        'a tiger',
        'a robot',
        'a ninja turtle',
        'a bulldog',
        'a hula girl',
        'a panther',
        'Wile E. Coyote',
        'Daffy Duck',
        'Mr. T',
        'a wolf',
        'a pinup girl',
        'a sparrow',
        'a mermaid',
        'a dolphin',
        'a dragon',
        'an octopus',
        'a puppydog',
        'a kitty cat',
        'a mouse',
        'a magician',
        'a beaver',
        'a whale',
        'a smurf',
        'Keanu Reeves',
        
    ],

    patients : [
        'the moon',
        'an El Camino',
        'a sushi role',
        'a taco',
        'a burrito',
        'a lighthouse',
        'an avocado',
        'a bible',
        'a sailboat',
        'a tall ship',
        'a submarine',
        'a donut',
        'a sausage',
        'a hot dog',
        'a hamburger',
        'the planet Earth'
    ],

    accessories : [
        'a sword',
        'a bat',
        'a flower',
        'a slice of pizza',
        'a trombone',
        'a pipe',
        'a top hat',
        'a mullet',
        'a beer belly',
        'a beer',
        'a chainsaw',
        'a martini',
        'a sword',
        'a tennis racket',
        'a lasso',
        'a bull whip',
        'a club',
        'a flamethrower',
        'a samurai sword',
        'a battleaxe',
        'a pocket watch',
        'sunglasses',
        'a peg leg',
        'a banana',
        'a necktie',
        'a monocle',
        'a deck of cards',
        'sweater vest',
        'a beard',
        'a mustache',
        'a peach',
        'a dirt bike',
        'scooter',
        'a hot dog',
        'jazz hands',
        'an oven mit',
        'a sledge hammer',
        'a butcher knife',
        'a cappuchino',
        'a telescope',
        'a magnifying glass',
        'a cigarette',
        'a cigar',
        'a harpoon',
        'a toolbox',
        'wings',
        'a whiskey flask',
        'a crown',
        'boxing gloves'


    ],

    transitives : [
        'punching',
        'kissing',
        'licking',
        'dancing with',
        'riding on',
        'smashing',
        'slam dunking',
        'eating',
        'slapping',
        'holding',
        'arm-wrestling',
        'holding up',
        'karate chopping',
        'jumping over',
        'pointing at',
        'shaking hands with',
        'straddling',
        'climbing',
        'tackling',
        'biting',
        'chasing',
        'fighting',
        'holding hands with',
        'kicking'

    ],

    intransitives : [
        'surfing',
        'tap dancing',
        'giving a thumbs up',
        'smiling',
        'winking',
        'parachuting',
        'snowboarding',
        'chilling on a log',
        'drinking whiskey',
        'chugging a beer',
        'high-kicking',
        'flipping the bird',
        'winking',
        'crying',
        'showing some leg',
        'fishing',
        'riding a Harley Davidson',
        'laying in a hammock',
        'on fire',
        'laughing',
        'blowing a kiss',
        'moonwalking',
        'rollerblading'

    ],

    init : function() {
        var template = randomTattoo.random(randomTattoo.templates);
        var str = '';
        for (var i=0; i < template.length; i++) {
            str += template[i]() + ' ';
        }
        return str;
    },

    getAgent : function() {
        return randomTattoo.random(randomTattoo.agents);
    },

    getTransitive : function() {
        return randomTattoo.random(randomTattoo.transitives);
    },

    getIntransitive : function() {
        return randomTattoo.random(randomTattoo.intransitives);
    },

    getPatient : function() {
        return randomTattoo.random( randomTattoo.agents.concat(randomTattoo.patients) );
    },

    random : function(list) {
        return list[Math.floor(Math.random()*list.length)];
    },
}
randomTattoo.templates = [
    [randomTattoo.getAgent, randomTattoo.getTransitive, randomTattoo.getPatient],
    [randomTattoo.getAgent, randomTattoo.getIntransitive]
];


var randomTattooApp = angular.module('randomTattooApp', []);

randomTattooApp.controller('conversationController', ['$scope', 'messages', 'cleverBotIo', function($scope, messages, cleverBotIo){
    $scope.comments = messages.list;

    var scrollConvo = function() {
        var convo = document.getElementById('conversation');
        t = setTimeout(function() {
            convo.scrollTop = convo.scrollHeight;
            clearTimeout(t);
        }, 1);        
    }

    $scope.$watchCollection('comments', scrollConvo);

    $scope.$watchCollection('comments', function() {

        if ($scope.comments[$scope.comments.length-1].author == 'user') {
            
            cleverBotIo.ask( $scope.comments[$scope.comments.length-1].text ).then(
                function(res){
                    messages.add(res.data.response, true);
                },
                function(res){
                    //@TODO
                    console.log('failed to ask bot');
                    console.log(res.data);
                }
            ); 
        }
    });


}]);

randomTattooApp.controller('keyboardController', ['$scope', 'messages', function($scope, messages){
    
    $scope.inputField = 'Yeahh!';
    
    $scope.submitForm = function(event) {
        if ($scope.inputField) {
            messages.add($scope.inputField);
            $scope.inputField = '';
        }
        focusInput();
    }

    //put focus on the input
    var focusInput = function() {
        document.getElementById('input').focus();
    }
    focusInput();

}]);


randomTattooApp.factory('messages', function(){
  var messages = {};

  messages.list = [
    {
        author: 'user',
        text: 'What tattoo should I get?'
    },
    {
        author: 'app',
        text: 'You should get '+randomTattoo.init()
    }
  ];

  messages.add = function(message, byBot){
    var authr = (byBot) ? 'app' : 'user';
    messages.list.push({author: authr, text: message});
  };

  return messages;
});


function scrollTo(element, to, duration) {
    if (duration <= 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
}

randomTattooApp.service('cleverBotIo', ['$http', function($http){
    var base_url = "https://cleverbot.io/1.0/";
    var user = 'QKsG3FR5HSF5ePOt'; //@todo
    var key = '3oVxeenSBIudDaP2zRu23geHmaM173PT'; //@todo
    var nick = 'bot' + Date.now();
    var bot;
    /*
    data – {string|Object} – The response body transformed with the transform functions.
    status – {number} – HTTP status code of the response.
    headers – {function([headerName])} – Header getter function.
    config – {Object} – The configuration object that was used to generate the request.
    statusText – {string} – HTTP status text of the response.
    */    
    $http.post(base_url+'create', {user: user, key: key, nick: nick}, {
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        }
    }).then(
        function(res) {
            console.log(res.data);
        },
        function(res) {
            console.log('Woops. Couldnt create bot');
            console.log(res.data);
        }
    );

    bot = {
        ask : function(text) {
            return $http.post(base_url + 'ask', {user: user, key: key, nick: nick, text: text}, {

                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }

            });
        }
    };

    return bot;

}]);

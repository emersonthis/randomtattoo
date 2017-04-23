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
        'a smurf'
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
        'arm wrestling',
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
        'high-kicking',
        'flipping the bird',
        'partying',
        'crying',
        'showing some leg',
        'fishing',
        'riding a Harley Davidson',
        'laying in a hammock',
        'on fire',
        'laughing',
        'blowing a kiss'


    ],

    init : function() {
        // var template = randomTattoo.random(randomTattoo.templates);
        // var str = '';
        // for (var i; i < template.length; i++) {
        //     str += template[i]();
        // }
        // return str;
        return randomTattoo.getAgent() + ' ' + randomTattoo.getTransitive() + ' ' + randomTattoo.getPatient();
    },

    getAgent : function() {
        return this.random(randomTattoo.agents);
    },

    getTransitive : function() {
        return this.random(randomTattoo.transitives);
    },

    getPatient : function() {
        return this.random( randomTattoo.agents.concat(randomTattoo.patients) );
    },

    random : function(list) {
        return list[Math.floor(Math.random()*list.length)];
    },

    // templates : [
    //     [randomTattoo.getAgent, randomTattoo.getTransitive, randomTattoo.getPatient]
    // ]


}

var randomTattooApp = angular.module('randomTattooApp', []);

randomTattooApp.controller('conversationController', ['$scope', 'messages', function($scope, messages){
    $scope.comments = messages.list;

    var scrollConvo = function() {
        var convo = document.getElementById('conversation');
        t = setTimeout(function() {
            convo.scrollTop = convo.scrollHeight;
            clearTimeout(t);
        }, 1);        
    }

    $scope.$watchCollection('comments', scrollConvo); 
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

  messages.add = function(message){
    messages.list.push({author: 'user', text: message});
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


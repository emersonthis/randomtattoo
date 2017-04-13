var randomTattoo = {
    
    agents : [
        'Patrick Swayze',
        'a grizzly bear',
        'a shark',
        'a sea monster',
        'a gorilla',
        'the Portland Trail Blazers',
        'Michael Jordan',
        'an angel',
        'a unicorn',
        'an eagle'
    ],

    accessories : [
        'a sword',
        'a bat',
        'a flower',
        'a slice of pizza',
        'a trombone',
        'a pipe',
        'a tophat',
        'a mullet',
        'beer belly'
    ],

    transitives : [
        'punching',
        'kissing',
        'licking',
        'dancing with',
        'riding on',
        'smashing',
        'slam dunking',
        'eating'
    ],

    intransitives : [
        'surfing',
        'tap dancing',
        'giving a thumbs up',
        'smiling',
        'winking',
        'parachuting',
        'snowboarding'
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
        return this.random(randomTattoo.agents);
    },

    random : function(list) {
        return list[Math.floor(Math.random()*list.length)];
    },

    // templates : [
    //     [randomTattoo.getAgent, randomTattoo.getTransitive, randomTattoo.getPatient]
    // ]


}

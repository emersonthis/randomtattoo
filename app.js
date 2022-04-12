var randomTattoo = {
  agents: [
    "a beaver",
    "a bulldog",
    "a cobra",
    "a dolphin",
    "a dragon",
    "a gorilla",
    "a grizzly bear",
    "a hula girl",
    "a kitty cat",
    "a magician",
    "a mermaid",
    "a mouse",
    "a ninja turtle",
    "a panther",
    "a pinup girl",
    "a puppydog",
    "a robot",
    "a sea monster",
    "a shark",
    "a smurf",
    "a sparrow",
    "a tiger",
    "a tyrannosaurus",
    "a unicorn",
    "a walrus",
    "a whale",
    "a wolf",
    "an angel",
    "an eagle",
    "an octopus",
    "Daffy Duck",
    "Keanu Reeves",
    "Michael Jordan",
    "Mr. T",
    "Patrick Swayze",
    "Wile E. Coyote",
  ],

  patients: [
    "a bible",
    "a burrito",
    "a donut",
    "a hamburger",
    "a hot dog",
    "a lighthouse",
    "a sailboat",
    "a sausage",
    "a submarine",
    "a sushi role",
    "a taco",
    "a tall ship",
    "an avocado",
    "an El Camino",
    "the moon",
    "the planet Earth",
  ],

  accessories: [
    "a banana",
    "a bat",
    "a battleaxe",
    "a beard",
    "a beer belly",
    "a beer",
    "a bull whip",
    "a butcher knife",
    "a cappuchino",
    "a chainsaw",
    "a cigar",
    "a cigarette",
    "a club",
    "a crown",
    "a deck of cards",
    "a dirt bike",
    "a flamethrower",
    "a flower",
    "a harpoon",
    "a hot dog",
    "a lasso",
    "a magnifying glass",
    "a martini",
    "a monocle",
    "a mullet",
    "a mustache",
    "a necktie",
    "a peach",
    "a peg leg",
    "a pipe",
    "a pocket watch",
    "a samurai sword",
    "a sledge hammer",
    "a slice of pizza",
    "a sword",
    "a sword",
    "a telescope",
    "a tennis racket",
    "a toolbox",
    "a top hat",
    "a trombone",
    "a whiskey flask",
    "an oven mit",
    "boxing gloves",
    "jazz hands",
    "scooter",
    "sunglasses",
    "sweater vest",
    "wings",
  ],

  transitives: [
    "arm-wrestling",
    "biting",
    "chasing",
    "climbing",
    "dancing with",
    "eating",
    "fighting",
    "holding hands with",
    "holding up",
    "holding",
    "jumping over",
    "karate chopping",
    "kicking",
    "kissing",
    "licking",
    "pointing at",
    "punching",
    "riding on",
    "shaking hands with",
    "slam dunking",
    "slapping",
    "smashing",
    "straddling",
    "tackling",
  ],

  intransitives: [
    "blowing a kiss",
    "chilling on a log",
    "chugging a beer",
    "crying",
    "drinking whiskey",
    "fishing",
    "flipping the bird",
    "giving a thumbs up",
    "high-kicking",
    "laughing",
    "laying in a hammock",
    "moonwalking",
    "on fire",
    "parachuting",
    "riding a Harley Davidson",
    "rollerblading",
    "showing some leg",
    "smiling",
    "snowboarding",
    "surfing",
    "tap dancing",
    "winking",
    "winking",
  ],

  init: function () {
    var template = randomTattoo.random(randomTattoo.templates);
    var str = "";
    for (var i = 0; i < template.length; i++) {
      str += template[i]() + " ";
    }
    return str;
  },

  getAgent: function () {
    return randomTattoo.random(randomTattoo.agents);
  },

  getTransitive: function () {
    return randomTattoo.random(randomTattoo.transitives);
  },

  getIntransitive: function () {
    return randomTattoo.random(randomTattoo.intransitives);
  },

  getPatient: function () {
    return randomTattoo.random(
      randomTattoo.agents.concat(randomTattoo.patients)
    );
  },

  random: function (list) {
    return list[Math.floor(Math.random() * list.length)];
  },
};
randomTattoo.templates = [
  [randomTattoo.getAgent, randomTattoo.getTransitive, randomTattoo.getPatient],
  [randomTattoo.getAgent, randomTattoo.getIntransitive],
];

function stopThinking() {
  document.getElementById("spinner").remove();
  document.getElementById("idea").append(randomTattoo.init());
}
var t = setTimeout(stopThinking, 3000);

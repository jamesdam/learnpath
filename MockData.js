var diff = [
  '/images/pawn.png',
  '/images/knight.png',
  '/images/rook.png',
];

var author = ['Hung Doan', 'Hoang Tran', 'Trung Nguyen', 'Long Dam', 'James Wang', 'Zuck Mackerberg', 'Bill LaGate'];
var TIDS = [104, 103, 203];
var PIDS = [424, 10, 23];

var tuttitle = [
  'Javascript Hello world!',
  'Javascript W3school tutorial',
  'Javascript OOP using Prototype',
];

var genTut = function(level) {
  var tut = {
    id: TIDS[level],
    icon: diff[level],
    title: tuttitle[level],
    createdBy: author[Math.floor(Math.random() * 4)],
    star: 5,
    desc: "In this tutorial I will run you through the process setting up an Express.js app and making it do what a basic website might do. You will learn the basics of routes, views, Jade templates, Stylus CSS engine, handling POST and GET requests.",
    url: 'http://www.hacksparrow.com/express-js-tutorial.html',
    stat: {
      likes: Math.floor(Math.random() * 100),
      shares: Math.floor(Math.random() * 50),
      views: Math.floor(Math.random() * 1000),
    },
    requires: [
      'javascript-basic',
      'javascript-object',
      'web programming',
    ],
    acquires: [
      'javascript-basic',
      'javascript-oop',
    ],
    comments: [
        {poster: {name: 'Trung Nguyen',
                   profile_url: 'https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-prn1/528965_502225796458105_664130755_n.jpg'},
        content: 'I Love this tutorial. Very easy to understand and follow!'},
        {poster: {name: 'Hoang Tran',
                   profile_url: 'https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-ash4/310833_2226187246638_8245941_n.jpg'},
        content: 'This rocks!!!'}
    ],
  };
  return tut;
}

var pathtitle = [
  '...',
  'Object Oriented Programming in Javascript',
  'Implement web server in NodeJS'
];

var skills = [
  'javascript-basic',
  'js-oop',
  'nodejs',
  'web-dev'
];

var genPath = function(level) {
  var path = {
    id: PIDS[level],
    title: pathtitle[level],
    createdBy: author[Math.floor(Math.random() * 7)],
    icon: diff[level],
    star: 5,
    desc: "In this path I will run you through the process setting up an Express.js app and making it do what a basic website might do. You will learn the basics of routes, views, Jade templates, Stylus CSS engine, handling POST and GET requests.",
    url: 'http://www.hacksparrow.com/express-js-tutorial.html',
    stat: {
      likes: 103,
      shares: 50,
      views: 1042
    },
    comments: [
        {poster: {name: 'Hung Don',
                  profile_url: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/371019_697811725_247259128_q.jpg'},
        content: 'Great materials!'},
    ],
    steps: [
      'Javascript Hello world!',
      'Javascript W3school tutorial',
      'Javascript OOP using Prototype',
    ],
    acquires: [
      'nodejs-basic',
      'javascript',
      'javascript-oop',
    ],
  };
  return path;
}

var MockData = function() {

  var tuts = [genTut(0), genTut(2), genTut(1)];
  var paths = [genPath(1), genPath(2)];

  return {
    tuts: tuts,
    paths: paths,
    getTut: function(id) {
      for (i in tuts) {
        if (tuts[i].id == id) {
          return tuts[i];
        }
      }
      return tuts[0];
    },
    getPath: function(id) {
      for (i in paths) {
        if (paths[i].id == id) {
          return paths[i];
        }
      }
      return paths[0];
    }
  }

}();

module.exports = MockData;

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var logger = require('./logger');
app.use(logger);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('public'));

var data = [
    {
        id: 1,
        title: "I love Ouda's class",
        body: "(As quoted by the RateMyProfessor.com website) Ouda is one of the best, " +
        "if not the best, profs in the faculty. Really cares about the students and seems " +
        "to do all he can to improve the program -The Software program would be years behind " +
        "without his influence. His courses have big projects, which can be tough, but it helps " +
        "emphasize the 'learn by doing' approach that is so relevant to SE."
    },
    {
        id: 2,
        title: "Ember is awesome",
        body: "Ember.js is designed to help developers build ambitiously large web applications that are " +
        "competitive with native apps. Doing so requires both new tools and a new vocabulary of concepts. " +
        "We've spent a lot of time borrowing ideas pioneered by native application frameworks like Cocoa and " +
        "Smalltalk." +
        " However, it's important to remember what makes the web special. Many people think that something is " +
        "a web application because it uses technologies like HTML, CSS and JavaScript. In reality, these are " +
        "just implementation details."
    },
    {
        id: 3,
        title: "What is Ember data?!",
        body: "Ember.js's sister library, Ember Data, contains tools to make common operations simple, and make " +
        "it easy to use different backends data formats with your app."
    }
];

var _id = 3;

app.get('/posts', function (request, response) {
    response.json({posts: data});
});

app.get('/posts/:post_id', function (request, response) {
    var post = data.filter(function (post) {
        return post.id == request.params.post_id;
    });
    response.json({posts: post});
});

app.post('/posts', function (request, response) {
    _id++;
    var newPost = {
        id: _id,
        title: request.body.post.title,
        body: request.body.post.body
    };
    data.push(newPost);
    response.status(201).json({posts: newPost});
});

app.put('/posts/:post_id', function (request, response) {
    var post = data.filter(function (post) {
        return post.id == request.params.post_id;
    });
    post[0].title = request.body.post.title;
    post[0].body = request.body.post.body;
    response.status(201).json({posts: post});
});

app.delete('/posts/:post_id', function (request, response) {
    var post = data.filter(function (post) {
            return post.id != request.params.post_id;
        });
    data = post;
    response.sendStatus(200);
});

app.listen(3500, function () {
    console.log('Listening on port 3500');
});


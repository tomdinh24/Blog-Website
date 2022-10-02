//jshint esversion:6

// required() is similar to import in python
// express js makes it easier and faster to build server-side web applications
// ejs allows users to generate HTML template with js
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();

// Default content 
const homeContent = "Hello, Welcome to my blog. Hopefully you enjoy the my contents!";

const aboutContent = "My name is Tom Lam and I am the author of this blog. I am currently a second year student at De Anza College studying computer science. This blog is a reflection of my daily life as a community college student, a gym rat, and a future software engineer and investor. Hopefully my reflection can bring some value to your life. Hope you enjoy my content!";

const contactContent = "Email: tomdinh0811@gmail.com";


// view engine allows programmers render/display output to web pages using template files
// function: set view engine to esj
app.set("view engine", "ejs");

// parse through html body
app.use(bodyParser.urlencoded({extended: true}));

// allow express to access public files
app.use(express.static("public"));



// store posts for home page
let posts = [];


// home page 
// render default content and new post
app.get("/", function(req, res) {
    res.render("home", { 
        startingContent: homeContent, 
        newPost: posts
    });
});


// about page
app.get("/about", function(req, res) {
    res.render("about", { aboutContent: aboutContent});
});


// contact page
app.get("/contact", function(req, res) {
    res.render("contact", { contactContent: contactContent});
});


// compose page
app.get("/compose", function(req, res) {
    res.render("compose");
});


// retrieve title and postbody from browser
// update posts array
// redirect to home page after hitting publish
app.post("/compose", function(req,res) {

    const post = {
        title: req.body.postTitle,
        content: req.body.postBody
    };

    posts.push(post)
    res.redirect("/")

});


// create a new page based on post template 
// retrieve post title and make everything lowercase
// if the post title and parameters match then create a new page
app.get("/post/:postName", function(req,res) {
    const requestedTitle = _.lowerCase(req.params.postName);

    posts.forEach(function(post) {
        const storedTitle = _.lowerCase(post.title);

        if (storedTitle === requestedTitle) {
            res.render("post", {
                title: post.title, 
                content: post.content
            })
        }
    });

});


app.listen(3000, function() {
    console.log("Server started on port 3000");
});
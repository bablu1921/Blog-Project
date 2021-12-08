const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');

const homeStartingContent = "Nam ut feugiat quam, ac posuere tellus. Fusce porttitor sodales velit sit amet blandit. Aenean non augue nec est volutpat vehicula. Fusce blandit mi a imperdiet semper. Suspendisse luctus leo at felis scelerisque, vitae lobortis sem rutrum. Praesent in sapien ut diam maximus sodales ac sed lectus. Pellentesque egestas tortor id mauris aliquet, ac rutrum ex euismod. Aenean interdum tempus nisi vel iaculis. Sed mollis pretium elit eget tempor.";

const contactContent = "Morbi eu dapibus urna, vel fringilla mauris. Ut sapien elit, accumsan sit amet pretium a, euismod vitae risus. Fusce dui ex, fermentum et pellentesque sit amet, dictum nec mi. Duis porttitor, mi eu suscipit consequat, sem lorem porta neque, vel lacinia nunc metus vitae nulla.";

const aboutContent = "Praesent aliquam pharetra arcu id mollis. Suspendisse lobortis, risus vitae ultricies dapibus, neque augue convallis orci, sed convallis lacus elit id erat. Curabitur placerat lobortis metus, in pharetra metus mollis ac";

let arr = [];
var i = 0;
let link;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("home.ejs",
        {
            homeStartingContent: homeStartingContent,
            arr: arr,
            link: link

        });


});

app.get("/about", function (req, res) {
    res.render("about.ejs", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
    res.render("contact.ejs", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
    res.render("compose.ejs");

});

app.post("/compose", function (req, res) {
    var compose = {

        title: req.body.title,
        post: req.body.post
    };

    arr.push(compose);

    res.redirect("/");



});










app.get("/post/:bablu", function (req, res) {
    const postTitle = req.params.bablu;
    link = postTitle;
    arr.forEach(function (post) {
        if (_.lowerCase(post.title) === _.lowerCase(postTitle)) {
            res.render("post.ejs", { title: post.title, post: post.post })
        }

    })
});




app.listen(3030, function () {
    console.log("Server is running");
})

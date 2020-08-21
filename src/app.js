/* TODO: 
0) refractor the code
1) Create login/sign up routes and profile creation
2) don't show edit/delete button to anaynous user
3) Make about/help page
4) Add different tags for blogs eg: education, etc
5) work on search panel
6) newsletter subscription
7) interest of new user
8) show number of blog posts available
9) text-area input with bold/italic/underline/heading/ image uploading so on
10) background image for posts*/

const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')
const articles = require('../routes/articles')
const Article = require('./../models/article')
const methodOverride = require('method-override')
/* any link or form can do only get or post request, so to manipulate the type of request we have used method-override */

mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'))

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    // making responsive -> while accessing individual blog post => 'articles/edit/:id'
    let found = true;
    if(req.query.found !== undefined) found = req.query.found;

    Article.find({}, (err, foundArticle) => {
        res.render('./articles/index', {articles: foundArticle, found: found});
    }).sort({createdAt: 'desc'});
});

app.use('/articles', articles);             // works as a middleware, used so that we can distrube our routes to different files 

app.listen(3000);
const express = require('express');
const router = express.Router();
const url = require('url')
const Article = require('./../models/article');

router.get('/', (req, res) => {
    // accessing all articles from user and render it to the user
});

router.get('/new', (req, res) => {
    res.render('articles/new', {article: new Article(), error: false});
});

router.get('/edit/:id', (req, res) => {
    Article.findOne({_id: req.params.id}, (err, fndArticle) => {
        if(err) {
            res.redirect(url.format({
                pathname: '/',
                query: {
                    found: false
                }
            }))
        }
        else{
            res.render('articles/edit', {article: fndArticle, error: false});  
        } 
    });
});

router.get('/:slug', (req, res) => {
    Article.findOne({slug: req.params.slug}, (err, foundArticle) => {
        if(err) {
            res.redirect(url.format({
                pathname: '/',
                query: {
                    found: false
                }
            }))
        }
        else res.render('articles/show', {article: foundArticle});
    })
});

router.delete('/:id', (req, res) => {
    Article.deleteOne({_id: req.params.id}, (err) => {
        if(err) console.log(err);
    })
    res.redirect('/')
})

router.put('/edit/:id', (req, res) => {
    const {title, description, markdown} = req.body

    Article.findById(req.params.id, (err, foundArticle) => {
        foundArticle.title = title
        foundArticle.description = description
        foundArticle.markdown = markdown

        foundArticle.save(() => {
            res.redirect('/')
        })
    })
})

router.post('/new', (req, res) => {
    const {title, description, markdown, postId} = req.body
    
    let article;
    if(postId) {
        article = new Article(req.body)
    } else {
        article = new Article({title, description, markdown})
    }

    article.save((err, addedArticle) => {
        console.log(err)
        err ? res.render('articles/new', {article: article, error: true}) : res.redirect(`/articles/${addedArticle.slug}`);
    })
});

module.exports = router;
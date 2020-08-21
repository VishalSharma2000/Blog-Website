const mongoose = require('mongoose')
const slugify = require('slugify')
const marked = require('marked')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const DOMPurify = createDomPurify(new JSDOM().window)

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    }, 
    sanitizeHtml: {
        type: String,
        required: true
    }
});
// we are adding slugify to our db so that we don't have to calculate it again and again

articleSchema.pre('validate', function(next) {
    if(this.title) {
        this.slug = slugify(this.title, {lower: true, strict: true, remove: undefined })
    } else {
        const err = new Error("Please enter a title");
        return next(err);
    }

    if(this.markdown) {
        this.sanitizeHtml = DOMPurify.sanitize(marked(this.markdown))
    }

    next();
});

module.exports = mongoose.model('article', articleSchema);
const metalsmith  = require("metalsmith");
const markdown    = require('metalsmith-markdown');
const highlighter = require('highlighter');
const templates   = require('metalsmith-templates');
const permalinks  = require('metalsmith-permalinks');
const collections = require('metalsmith-collections');
const define      = require('metalsmith-define');
const pagination  = require('metalsmith-pagination');
const snippet     = require('metalsmith-snippet');
const date        = require('metalsmith-build-date');

metalsmith(__dirname)
    .source("src")
    .use(define({
        blog: {
            url: 'https://texteditor.maxistar.me',
            title: 'Simple Text Editor',
            description: 'Simple Text Editor'
        },
        owner: {
            url: 'https://maxistar.me',
            name: 'Maxim Starikov'
        },
        moment: require('moment')
    }))
    .use(collections({
        articles: {
            pattern: 'articles/**/*.md',
            sortBy: 'date',
            reverse: true
        }
    }))
    .use(pagination({
        'collections.articles': {
            perPage: 200,
            first: 'index.html',
            path: 'page/:num/index.html',
            template: 'index.jade'
        }
    }))
    .use(markdown({
        gfm: true,
        tables: true,
        highlight: highlighter()
    }))
    .use(snippet({
        maxLength: 50
    }))
    .use(date())
    .use(permalinks())
    .use(templates({
        engine: 'jade',
        directory: 'templates'
    }))
    .destination("build")
    .build(function (err) {
        if (err) {
            throw err;
        }
    });

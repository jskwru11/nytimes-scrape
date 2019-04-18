const express = require('express');
const bodyParser = require('body-parser');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

const dbPort = 27017;
const dbName = 'articles_db';
const baseUrl = `mongodb://localhost:${dbPort}/${dbName}`;
mongoose.connect(baseUrl, {useNewUrlParser: true});

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    link: String,
    title: String,
    body: String,
    isFavorite: Boolean
});

const savedArticleSchema = new Schema({
    link: String,
    title: String,
    body: String,
    isFavorite: Boolean
});

const Article = mongoose.model('Article', articleSchema);
const FavoriteArticles = mongoose.model('FavoriteArticles', savedArticleSchema);

app.get('/api/articles', (req, res) => {
    console.log('someone hit this api...')
    axios.get('https://www.nytimes.com/')
    .then(response => {

        const $ = cheerio.load(response.data);

        const results = [];

         $('article').each((idx, elem) => {
            const link = $(elem).find('a').attr('href');
            const title = $(elem).find('h2').text();
            const body = $(elem).find('p').text();
            if (link !== '' && title !== '' && body !== '') {
                const newArticle = new Article({
                    link,
                    title,
                    body,
                    isFavorite: false
                })
                results.push(newArticle);
                newArticle.save()
                .then(() => {
                    Article.find({})
                    .then(data => {
                        res.json(data)
                    })
                    .catch(error => {
                        if (error) {
                            throw error
                        }
                    })
                })
                .catch(error => {
                    if (error) {
                        throw error
                    }
                });
            }
        })

    })
});



app.delete('/api/articles', (req, res) => {
    Article.remove({}, (error) => {
        if (error) {
            throw error;
        }
    })
    res.json({message: 'collections deleted'})
});

app.post('/api/favorite/articles', (req, res) => {
    console.log('posting data...');
    const data = req.body;

    const saveArticle = new FavoriteArticles(data);
    saveArticle.save();
    res.json({message: 'saved successfully...'});
});

app.get('/api/favorite/articles', (req, res) => {
    FavoriteArticles.find({}).then(results => {
        res.json(results);
    }).catch(error => {
        if (error) {
            throw error;
        }
    })
});

app.listen(PORT, () => console.log(`Server currently listening @ 'http://localhost:${PORT}/`));


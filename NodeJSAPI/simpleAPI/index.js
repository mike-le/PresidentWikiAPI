const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const Trie = require('./collections/Trie.js');
const router = express.Router();
const port = process.env.PORT || 8088;

const app = express();
let productMap = [];
let titleTrie = new Trie();
let brandTrie = new Trie();
let categTrie = new Trie();
let freqTrie = new Trie();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

router.use(function(req, res, next) {
    console.log('Router initiating...');
    next(); 
});

router.post('/products/autocomplete', function(req, res) {
    let type = req.body.type;
    let prefix = req.body.prefix;
    let arr = [];

    if(type && prefix){
        if(type === 'brand'){
            arr = brandTrie.getPrefix(prefix);
        } else if (type === 'title') {
            arr = titleTrie.getPrefix(prefix);
        } else if (type === 'category'){
            arr = categTrie.getPrefix(prefix);
        }
    }

    res.send(arr);
});

router.post('/products/search', function(req, res) {
    let conditions = req.body.conditions;
    let pagination = req.body.pagination;
    let result = []

    if(conditions && pagination){
        let end = pagination.size * pagination.from;
        let start = end - pagination.size;

        productMap.forEach(function(product){
            let meetsConditions = true;
            conditions.forEach(function(condition){
                let type = condition.type;
                let values = condition.values;
                let currCondition = false;

                for(var i=0; i<values.length; i++){
                    let value = values[i];
                    if(product[type].includes(value)){
                        currCondition = true;
                    }
                }
                meetsConditions &= currCondition;
            })
            if(meetsConditions){
                result.push(product);
            }
        });

        res.send(result.slice(start, end));
    } else {
        res.send(result);
    }
});

router.post('/products/keywords', function(req, res) {
    let keywords = req.body.keywords;
    if(keywords && Array.isArray(keywords)){
        let obj = {
            "keywordFrequencies" : []
        };
    
        keywords.forEach(function(word){
            let count = freqTrie.getCount(word);
            let freq = {};
            freq[word] = count;
            obj['keywordFrequencies'].push(freq);
        })
    }
    
    res.send(obj);
});

app.use('/api', router)

var filePath = process.argv.slice(2)[0]
try {
    fs.readFile(filePath, 'utf-8', function(err, data) {
        if (err) throw err;
        let lines = data.split("\n");
        
        for(var i=0;i<lines.length;i++){
            let obj = {};
            let currentline = lines[i].split("\t");
            if(currentline.length !== 6) {
                throw new Error('Invalid number of columns');
            }
            
            obj['productId'] = currentline[0];
            obj['title'] = currentline[1];
            obj['brandId'] = currentline[2];
            obj['brandName'] = currentline[3];
            obj['categoryId'] = currentline[4];
            obj['categoryName'] = currentline[5];
        
            productMap.push(obj);
            titleTrie.add(obj['title']);
            brandTrie.add(obj['brandName']);
            categTrie.add(obj['categoryName']);
            
            let wordArr = obj['title'].split(' ');
            wordArr.forEach(function(word){
                freqTrie.add(word);
            });
        }
        app.listen(port, function () {
            console.log("Running simpleAPI on port " + port);
        });
    });
} catch (err) {
    if (err.code === 'ENOENT') {
        console.log('Invalid file path');
    } else {
        console.log(err);
    }
}





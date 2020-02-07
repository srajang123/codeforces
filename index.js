const express = require('express');
const request = require('request');
const expHbs = require('express-handlebars');
const app = express();

app.engine('hbs', expHbs({
    extname: 'hbs',
    defaultLayout: 'main'
}));
app.set('view engine', 'hbs');
app.use(express.static('public'));

function contests() {
    request('https://codeforces.com/api/contest.list', (err, response, body) => {
        return JSON.parse(body).result;
    })
}

app.get('/', (req, res, next) => {
    res.render('index', { title: 'CodeForces API', home: true });
});
app.get('/contests/:type', (req, res, next) => {
    let type = req.params.type;
    request('https://codeforces.com/api/contest.list', (err, response, body) => {
        let data = JSON.parse(body).result;
        res.render('home', { data: data, type: type, contests: true, title: 'Contest List' })
    })
});
app.get('/contests/', (req, res, next) => {
    //res.render('home', { data: 'a', contests: true, title: 'Contest List' })
    request('https://codeforces.com/api/contest.list', (err, response, body) => {
        let data = JSON.parse(body).result;
        res.render('home', { data: data, contests: true, title: 'Contest List' })
    })
})
app.use((req, res, next) => {
    res.render('404', { title: 'Page Not Found', nofound: true });
})
app.listen(2000, () => { console.log('Server stared at 2000') })
const express = require('express');
const request = require('request');
const expHbs = require('express-handlebars');
const app = express();

const PORT=process.env.PORT||2000;

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
    request('https://codeforces.com/api/contest.list', (err, response, body) => {
        let data = JSON.parse(body).result;
        res.render('home', { data: data, contests: true, title: 'Contest List' })
    })
});
app.get('/problems/', (req, res, next) => {
    request('https://codeforces.com/api/problemset.problems', (err, response, body) => {
        let data = JSON.parse(body).result.problems.sort((a, b) => {
            /*x = a.index.toLowerCase();
            y = b.index.toLowerCase();
            if (x < y) return -1;
            if (x > y) return 1;*/
            x=a.rating;
            y=b.rating;
            if(!x || !y)return 0;
            if(x<y)return -1;
            if(x>y) return 1;
            return 0;
        });
        res.render('questions', { data: data, problems: true, title: 'Question List' })
    })
});
app.use((req, res, next) => {
    res.render('404', { title: 'Page Not Found', nofound: true });
})
app.listen(PORT, () => { console.log(`Server stared at ${PORT}`) })

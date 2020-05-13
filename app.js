const createError = require('http-errors');
const express = require('express');
const path = require('path');
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const axios = require("axios");
const DB = require("./knex/index")

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

//wrike Api OAUTH

// axios.get(`https://login.wrike.com/oauth2/authorize/v4?client_id=${process.env.CLIENT_ID}&response_type=code`)
//     .then(response => console.log(response))
//     .catch(e => console.log(e.response));


// axios.get(" https://www.wrike.com/api/v4/contacts?me=true", {
//     headers: {
//         "Authorization": `bearer ${process.env.ACCESS_TOKEN}`
//     }
// }).then(response => console.log(response.data.data));
// axios.post(`https://login.wrike.com/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=authorization_code&code=${process.env.CODE}`
// ).then(res => console.log(res)).catch(e => console.log(e.response))


axios.get(" https://www.wrike.com/api/v4/contacts", {
    headers: {
        "Authorization": `bearer ${process.env.ACCESS_TOKEN}`
    }
}).then(res => {

        for(let i=1;i < res.data.data.length;i++) {
            // console.log({
            //     wrike_id: res.data.data[i].id,
            //         firstName: res.data.data[i].firstName,
            //         lastName: res.data.data[i].lastName
            // })
            DB.insertData("user_wrike", {
                // wrike_id: res.data.data[i].id,
                firstName: res.data.data[i].firstName,
                lastName: res.data.data[i].lastName
            })

        }

}).catch(e => console.log(e.response.data));

//HUBSTAFF OAUTH
// axios.post(`https://account.hubstaff.com/access_tokens?client_id=${process.env.HUB_CLIENT_ID}
//
//                 &grant_type=refresh_token&refresh_token=${process.env.HUB_ACCESS_TOKEN}`
// )
//     .then(response => console.log(response))
//     .catch(e => console.log(e.response));


//  axios.get("https://api.hubstaff.com/v2/organizations", {
//     headers: {
//         "Authorization": `Bearer ${process.env.HUB_ACCESS_TOKEN}`
//     }
// }).then(res =>
//      DB.insertData("organization", {
//          name: res.data.organizations[0].name,
//          status: res.data.organizations[0].status
//      })
// ).catch(e => console.log(e.response));


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
app.listen(5000);

module.exports = app;

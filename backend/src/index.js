const { request } = require('express');
const express = require ('express');
const fileupload = require ('express-fileupload');
const morgan = require('morgan');
const cors = require('cors');
const { mongoose} = require('./database');
const resultsCtrl = require('./controllers/results.controller');



require('dotenv').config({path:'variables.env'});
//Initialization
const app = express();



//Settings
app.set('port', process.env.PORT || 5000);
//Middlewares

//Global Variables
app.use(fileupload())
app.use(morgan('dev'));
app.use(express.json()); //Get json data
app.use(cors({origin: 'http://localhost:3000'}));

//Routes
app.use('/api/waypoints',require('./routes/waypoint.routes'));
app.use('/api/trackpoints',require('./routes/trackpoint.routes'));
app.use('/api/competitors',require('./routes/competitor.routes'));
app.use('/api/categories',require('./routes/category.routes'));
app.use('/api/categorytypes',require('./routes/categorytypes.routes'));
app.use('/api/races',require('./routes/race.routes'));
app.use('/api/admins',require('./routes/admin.routes'));
app.use('/api/stages',require('./routes/stage.routes'));
app.use('/api/testing',require('./routes/testing.routes'));
app.use('/api/partialresults',require('./routes/partialresult.routes'));
app.use('/api/results',require('./routes/results.routes'));
//Static FIles


// Server is listenning
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));

 
});



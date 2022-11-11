const express=require('express');
const bodyParser=require('body-parser');
const api = require('./api');
const cors = require('cors');
const port=3000;
const app=express();
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.listen((process.env.PORT || 5000), function() {
	console.log("Server is listening at port:" + 5000);
});

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors()) 
// Parses the text as json
app.use(bodyParser.json());

app.use('/api', api);


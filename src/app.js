const config = require('./config/config');
const express = require('express');
const app = express();


//set port
app.set('port', process.env.PORT || config.port);

//dev 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//router
app.use('/api/', require('./router'))


// star the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`)
})
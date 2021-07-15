const express = require('express');
const app = express();

// Global Middleware 01
app.use(middleWareGlobal01);
app.use(middleWareGlobal02);

function middleWareGlobal01(req,res,next) {
    console.log('I am the first global middleware.');
    // Variable attached to the request object
    req.customProperty = 100;
    next();
}

// Global Middleware 02
function middleWareGlobal02(req,res,next) {
    console.log(`The custom property defined in middleWareGlobal01 is ${req.customProperty}`)
    // Reassign custom property
    req.customProperty = 600;
    console.log('I am the second global middleware.');
    next();
}

// Route Specific Middleware
function middleWare(req,res,next) {
    console.log('I am a route specific middleware.');
    // Error catcher
    // const errObj = new Error('I am an error.');
    // next(errObj);
    next();
}

// Special middleware with an extra parameter
function errorHandler(err,req,res,next) {
    if(err) {
        res.send('There was an error, please try again.');
    }
}

// Standard Express Callback
app.get('/', middleWare, (req,res,next) => {
    console.log('I am the standard express callback.');
    console.log(`The custom property that was redifined in middleWareGlobal02 is ${req.customProperty}`)
    res.send(`<h1>Welcome to the website</h1>`);
});

// Must always appear last at the end of the app
app.use(errorHandler);

app.listen(5000, () => console.log("Server started..."))
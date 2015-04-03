//Modules
var http = require('http');
var companyData = require('./public/companyData.js');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('./logger');

//Connect to MONGO DB
mongoose.connect('mongodb://localhost:27017/stockTEMP_');

var app = express();

app.use(logger);//will allow
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

//Schema for Companies
var companySchema = mongoose.Schema({
    name: String,
    openPrice: Number,
    symbolURL: String,
    currentPrice: Number,
    changeValue: Number,
    changeIcon: String,
    changePercentage: Number,
    shareVolume: Number
});

//Schema for BuyOrder
var buyOrderSchema = mongoose.Schema({
    timeStamp: Date,
    size: Number,
    price: Number,
    company: String
});

//Schema for SellOrder
var saleOrderSchema = mongoose.Schema({
    timeStamp: Date,
    size: Number,
    price: Number,
    company: String
});

//Schema for Transactions
var transactionSchema = mongoose.Schema({
    timeStamp: Date,
    size: Number,
    price: Number,
    company: String
});
//Adding the mongoode models for calls
var Companies = mongoose.model('Companies', companySchema);
var BuyOrders = mongoose.model('BuyOrders', buyOrderSchema);
var SaleOrders = mongoose.model('SaleOrders', saleOrderSchema);
var Transactions = mongoose.model('Transactions',transactionSchema);

//Basic route to homepage
app.get('/', function(request, response) {
    response.sendFile(__dirname + '/public/index.html');
});

//Gets saleOrders from route
app.get('/saleOrders', function(request, response){
    SaleOrders.find(function(error, saleOrder){
        if(error) response.send(error);
        response.json({saleOrders: saleOrder})
    });
});

//Get to companies, gets all companies
app.get('/companies',function (request, response){
    //response.json({companies: companyData.companies});
    Companies.find(function (error, company) {
        if (error) response.send(error);
        response.json({Companies: company});
    });
});

//Get to buyorders
app.get('/buyOrders', function(request, response){
    BuyOrders.find(function(error, buyOrder){
        if(error) response.send(error);
        response.json({buyOrders: buyOrder})
    });
});

//Post to all companies
app.post('/companies', function(request, response){
    var newCompany = new Companies({

        name: request.body.company.name,
        openPrice: request.body.company.openPrice,
        symbolURL: request.body.company.symbolURL,
        currentPrice: request.body.company.currentPrice,
        changeValue: request.body.company.changeValue,
        changeIcon: request.body.company.changeIcon,
        changePercentage: request.body.company.changePercentage,
        shareVolume: request.body.company.shareVolume
    });

    newCompany.save(function(error) {
        if (error) response.send(error);
        response.status(201).json({Companies : newCompany});
    });
});

//Post to sellOrders
app.post('/saleOrders', function(request, response){
    var newsaleOrder = new SaleOrders({
        timeStamp: request.body.saleOrder.timeStamp,
        size: request.body.saleOrder.size,
        price: request.body.saleOrder.price,
        company: request.body.saleOrder.company
    });

    newsaleOrder.save(function(error){
        if (error) response.send(error);
        response.status(201).json({SaleOrders : newsaleOrder});
    });

    console.log(request.body);
});

//Post to buyorders
app.post('/buyOrders', function(request, response){
    var newbuyOrder = new BuyOrders({
        timeStamp: request.body.buyOrder.timeStamp,
        size: request.body.buyOrder.size,
        price: request.body.buyOrder.price,
        company: request.body.buyOrder.company
    });

    newbuyOrder.save(function(error){
        if (error) response.send(error);
        response.status(201).json({BuyOrders : newbuyOrder});
    });

    console.log(request.body);
});

//Post to transactions
app.post('/transactions', function(request, response){
    var newTransaction = new Transactions({
        timeStamp: request.body.transaction.timeStamp,
        size: request.body.transaction.size,
        price: request.body.transaction.price,
        company: request.body.transaction.company
    });

    newTransaction.save(function(error){
        if(error) response.send(error);
        response.status(201).json({Transactions: newTransaction})
    });

    console.log(request.body);
});

//Put to a specified company
app.put('/companies/:company_id', function(request, response){
    Companies.findById(request.params.company_id, function(error, company){
        if(error) response.send(error);

        company.name = request.body.company.name,
            company.openPrice= request.body.company.openPrice,
            company.symbolURL= request.body.company.symbolURL,
            company.currentPrice= request.body.company.currentPrice,
            company.changeValue =request.body.company.changeValue,
            company.changeIcon =request.body.company.changeIcon,
            company.changePercentage= request.body.company.changePercentage,
            company.shareVolume= request.body.company.shareVolume

        company.save(function (error) {
            if (error) response.send(error);
            response.status(201).json({Companies: company});
        });
    });
    console.log(request.body);
});

//Puts the SaleOrder with id
app.put('/saleOrders/:saleOrders_id', function(request,response){
    SaleOrders.findById(request.params.saleOrders_id, function(error, saleOrder){
        if(error) response.send(error);

        saleOrder.timeStamp = request.body.saleOrder.timeStamp,
            saleOrder.size = request.body.saleOrder.size,
            saleOrder.price = request.body.saleOrder.price,
            saleOrder.company = request.body.saleOrder.company

        saleOrder.save(function (error){
            if (error) response.send(error);
            response.status(201).json({SaleOrders: saleOrder});
        });
    });
});

// Puts the buy order with id
app.put('/buyOrders/:buyOrders_id', function(request,response){
    BuyOrders.findById(request.params.buyOrders_id, function(error, buyOrder){
        if(error) response.send(error);

        buyOrder.timeStamp = request.body.buyOrder.timeStamp,
            buyOrder.size = request.body.buyOrder.size,
            buyOrder.price = request.body.buyOrder.price,
            buyOrder.company = request.body.buyOrder.company

        buyOrder.save(function (error){
            if (error) response.send(error);
            response.status(201).json({BuyOrders: buyOrder});
        });
    });
});
//Deletes sell order by id
app.delete('/saleOrders/:saleOrders_id', function(request, response){
    SaleOrders.remove({
        _id: request.params.saleOrders_id
    }, function(error, saleOrders){
        if(error) response.send(err);
        response.status(201).json({saleOrders: SaleOrders})
    });

    console.log(response.body);
});

//Deletes buy order by id
app.delete('/buyOrders/:buyOrders_id', function(request, response){
    BuyOrders.remove({
        _id: request.params.buyOrders_id
    }, function(error, buyOrders){
        if(error) response.send(err);
        response.status(201).json({buyOrders: BuyOrders})
    });


});

app.listen(8080 ,function () {
    console.log('Listening on port 8080');
});;
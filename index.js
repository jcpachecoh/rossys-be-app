const ApiBuilder = require('claudia-api-builder'),
    AWS = require('aws-sdk');
var api = new ApiBuilder(),
    dynamoDb = new AWS.DynamoDB.DocumentClient();

api.post('/users', function (request) {
  var params = {
    TableName: 'UsersRossys',
    Item: {
        address: request.body.address,
        city: request.body.city,
        company: request.body.company,
        email: request.body.email,
        firstName:request.body.firstName,
        lastName: request.body.lastName,
        password: request.body.password
    }
  }
  return dynamoDb.put(params).promise(); // returns dynamo result
}, { success: 201 }); // returns HTTP status 201 - Created if successful

api.get('/users', function (request) { // GET all users
  return dynamoDb.scan({ TableName: 'UsersRossys' }).promise()
      .then(response => response.Items)
});

api.post('/orders', function (request) {
    var params = {
      TableName: 'OrdersRossys',
        Item: {
          order: request.body.order,
          iva: request.body.iva,
          total: request.body.total,
          useremail: request.body.useremail,
          products: request.body.products,
          paymentmethod: request.body.paymentmethod,
        }
    }
    return dynamoDb.put(params).promise(); // returns dynamo result
  }, { success: 201 }); // returns HTTP status 201 - Created if successful

  api.get('/orders', function (request) { // GET all users
    return dynamoDb.scan({ TableName: 'OrdersRossys' }).promise()
        .then(response => response.Items)
  });

module.exports = api;

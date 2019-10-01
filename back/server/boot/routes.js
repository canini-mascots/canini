var dsConfig = require('../datasources.json');
var path = require('path');

module.exports = function(app) {
  let Customer = app.models.Customer;
  app.post('/api/request-password-reset', function(req, res, next) {
    Customer.resetPassword({
      email: req.body.email
    }, function (err) {
      if (err) {
        res.status(401).json({"error": {"message":"fail"}});
        return res;
      }
      else {
        res.status(200).json({"success": {"message":"Success"}});
        return res;
      }
    });
    
  });
}
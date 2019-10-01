'use strict';
var config = require('../../server/config.json');
var devConfig = require('../../server/config.development.json');
var path = require('path');
module.exports = function (Customer) {

    var plainPwd; var repeatPassword;
    Customer.beforeRemote('create', function (ctx, inst, next) {
        plainPwd = ctx.req.body.password;
        next()
    })
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    Customer.validate('password', function (err, res) {
        const pattern = new RegExp("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.{6,})")
        if (plainPwd && !pattern.test(plainPwd)) err()
    }, { message: 'passwordRequeriments' })
    
    Customer.validatesUniquenessOf('email', {message: 'notUniqueEmail'});
    Customer.validatesFormatOf('email', {with: re, message: 'invalidEmail'});
    Customer.on('resetPasswordRequest', function(info) {
         var url = devConfig.web;
         var message = 'Click <a href="' + url + 'set-password'+ '?access_token=' +
             info.accessToken.id + '">here</a> to reset your password';
         //'here' in above html is linked to : 'http://<host:port>/reset-password?access_token=<short-lived/temporary access token>'
          Customer.app.models.Email.send({
            to: info.email,
            from: devConfig.email,
            subject: "Reset Password",
            html: message
          }, function(err) {
            if (err) return console.log(err);
            console.log('> sending password reset email to:', info.email);
          });
      });
};
    
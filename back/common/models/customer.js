'use strict';

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
};
    
'use strict';

module.exports = function (Customer) {

    var plainPwd; var repeatPassword;
    Customer.beforeRemote('create', function (ctx, inst, next) {
        plainPwd = ctx.req.body.password;
        repeatPassword = ctx.req.body.repeatPassword;
        next()
    })

    Customer.validate('password', function (err, res) {
        const pattern = new RegExp("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.{6,})")
        if (plainPwd && !pattern.test(plainPwd)) err()
    }, { message: 'Password must contain 1 number, 1 uppercase, 1 lowercase and a minimum of 6 letters. ' })

    Customer.validate('password', customValidator, { message: 'Passwords dont mach' });
    function customValidator(err) {
        if (plainPwd!=repeatPassword) err();
    };
};
    
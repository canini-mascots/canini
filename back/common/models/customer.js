const app = require('../../server/server');

module.exports = function (Self) {
    var plainPwd;
    
    Self.validatesUniquenessOf('email', {message: 'notUniqueEmail'});
    
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    Self.validatesFormatOf('email', {with: re, message: 'invalidEmail'});

    Self.validate('password', function (err, res) {
        const pattern = new RegExp("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.{6,})")
        if (plainPwd && !pattern.test(plainPwd)) err()
    }, { message: 'passwordRequeriments' });
  
    Self.on('resetPasswordRequest', function(info) {
        const from = app.dataSources.email.settings.transports[0].auth.user;

        const href = `http://localhost:8080/Customer/set-password?access_token=${info.accessToken.id}`;
        const html = `Click <a href="${href}"> here</a> to reset your password`;

        Self.app.models.Email.send({
          to: info.email,
          from,
          subject: 'Reset Password',
          html
        }, function(err) {
          if (err) return console.log(err);
          console.log('> Sending password reset email to:', info.email);
        });
    });

    Self.beforeRemote('create', function (ctx, inst, next) {
        plainPwd = ctx.req.body.password;
        next()
    });
};
    
const app = require('../../server/server');

module.exports = function(Self) {
  Self.validatesUniquenessOf('email', {
    message: 'notUniqueEmail'
  });

  Self.validatePassword = function(password) {
    if (!password) {
      const err = new Error('passwordEmpty');
      err.statusCode = 422;
      throw err;
    }

    const pattern = new RegExp('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.{6,})')
    if (!pattern.test(password)) {
      const err = new Error('passwordRequeriments');
      err.statusCode = 422;
      throw err;
    }
  };

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
};

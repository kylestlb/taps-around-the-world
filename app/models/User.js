var thinky = require('../../util/thinky.js'),
    type = thinky.type,
    r = thinky.r,
    validator = require('validator'),
    bcrypt = require('bcrypt');

var fn = function(pw) {
    console.log(pw);
    return true;
};

var User = thinky.createModel('User', {
    id: type.string(),
    username: type.string(),
    password: type.string(),
    createdAt: type.date().default(r.now()),
    reauth: type.boolean().default(true)
});

User.ensureIndex('username');

User.define('checkPassword', function(password) {
    return new Promise(function(resolve, reject) {
        // this.password: hash stored in DB
        bcrypt.compare(password, this.password, function(err, res){

            if(err)
                reject(err);
            else
                resolve(res);
        });
    }.bind(this));
});

User.defineStatic('generateHash', function(password) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, result) {
                if (err)
                    reject(err);
                else
                    resolve(result);
            });
        });
    });
});

module.exports = User;


/*  bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });*/
'use strict';

var pg = require('pg');
var config = require('../config/environment');
var crypto = require('crypto');

exports.getUserById = function (userId, done) {
  pg.connect(config.postreg.connectionString, function(err, client) {
    if(err) {
      client.end();
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT users._id, users.provider, users.email, users.role, users.name, users._v FROM users WHERE _id = ' + 1, function(err1, result1) {
      if(err1) {
        client.end();
        return console.error('error running query', err1);
      }

      if (!result1 || result1.rows.length < 1) {
        client.end();
        done();
        return console.error('no results from campaign query', err1);
      }

      done(result1.rows[0]);
      client.end();        
      
    });
  });
};

exports.getUserByIdWithPassword = function (userId, done) {
  pg.connect(config.postreg.connectionString, function(err, client) {
    if(err) {
      client.end();
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT users._id, users.provider, users.email, users.role, users.name, users."hashedPassword", users.salt, users._v FROM users WHERE _id = ' + 1, function(err1, result1) {
      if(err1) {
        client.end();
        return console.error('error running query', err1);
      }

      if (!result1 || result1.rows.length < 1) {
        client.end();
        done();
        return console.error('no results from campaign query', err1);
      }

      done(result1.rows[0]);
      client.end();        
      
    });
  });
};

exports.getUserByEmailInternal = function (userEmail, done) {
  pg.connect(config.postreg.connectionString, function(err, client) {
    if(err) {
      client.end();
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT users._id, users.provider, users.email, users.role, users.name, users."hashedPassword", users.salt, users._v FROM users WHERE lower(email) = $1',
     [userEmail.toLowerCase()], function(err1, result1) {
      if(err1) {
        client.end();
        return console.error('error running query', err1);
      }

      if (!result1 || result1.rows.length < 1) {
        client.end();
        done();
        return console.error('no results from campaign query', err1);
      }

      done(result1.rows[0]);
      client.end();        
      
    });
  });
};

exports.getUsers = function (done) {
  pg.connect(config.postreg.connectionString, function(err, client) {
    if(err) {
      client.end();
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT users._id, users.provider, users.email, users.role, users.name, users._v FROM users', function(err1, result1) {
      if(err1) {
        client.end();
        return console.error('error running query', err1);
      }

      if (!result1) {
        client.end();
        done();
        return console.error('no results from campaign query', err1);
      }

      done(result1.rows);
      client.end();        
      
    });
  });
}

exports.createUser = function (user, done) {
  if (!user || !user.password) {
    return console.error('illegal user was submitted to createUser()', JSON.stringify(user));
  }

  user.salt = exports.makeSalt();
  user.hashedPassword = exports.encryptPassword(user.password, user.salt);

  pg.connect(config.postreg.connectionString, 
    function(err, client) {
      if(err) {
        client.end();
        return console.error('error fetching client from pool', err);
      }

      client.query(
        'INSERT INTO users (provider, email, role, name, "hashedPassword", salt, _v) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
        [user.provider, user.email, user.role, user.name, user.hashedPassword, user.salt, 0], 
        function(err, result) {
            if (err) {
                console.log(err);
            } 
            // else {
            //     console.log('row inserted with data: ' + JSON.stringify(result));
            // }

            client.end();
        });  
    });      
}

exports.updatePassword = function (user, done) {
  if (!user || !user.password) {
    return console.error('illegal user was submitted to updatePassword()', JSON.stringify(user));
  }

  pg.connect(config.postreg.connectionString, 
    function(err, client) {
      if(err) {
        client.end();
        return console.error('error fetching client from pool', err);
      }

      client.query(
        'UPDATE users SET "hashedPassword" = $1 WHERE _id = $2', 
        [user.hashedPassword, user._id], 
        function(err, result) {
            if (err) {
                console.log(err);
            } 
            // else {
            //     console.log('row inserted with data: ' + JSON.stringify(result));
            // }
            done();

            client.end();
        });  
    });      
}

var validatePresenceOf = function(value) {
  return value && value.length;
};

exports.authenticate = function(plainText, user) {
    //console.log('authenticatingggggggggggggggggggggggggggggggggggggg');
    if (!user) {
      return false;
    }
    return this.encryptPassword(plainText, user.salt) === user.hashedPassword;
};


exports.makeSalt = function() {
    return crypto.randomBytes(16).toString('base64');
};

exports.encryptPassword = function(password, salt) {
    if (!password || !salt) return '';
    var saltNew = new Buffer(salt, 'base64');
    return crypto.pbkdf2Sync(password, saltNew, 10000, 64).toString('base64');
};
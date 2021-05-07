// generate token using secret from process.env.JWT_SECRET
var jwt = require('jsonwebtoken');
 
// generate token and return it
function generateToken(user) {
  if (!user) return null;
 
  var u = {
    name: user.name
  };
 
  return jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
}

function generateResetToken(user) {
  if (!user) return null;
 
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
}
 
// return basic user details
function getCleanUser(user) {
  if (!user) return null;
 
  return {
    name: user.name,
  };
}
 
module.exports = {
  generateToken,
  getCleanUser,
  generateResetToken
}
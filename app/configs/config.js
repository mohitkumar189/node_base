var env = require('./config.json');

module.exports = () => {
  var node_env = process.env.NODE_ENV || 'development';
  return env[node_env];
}; 
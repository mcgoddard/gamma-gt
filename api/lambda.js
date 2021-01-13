const serverless = require('serverless-http');
const { app } = require('./server');

module.exports.gamma_gt_api = serverless(app);

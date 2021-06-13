const env = process.env.NODE_ENV || 'development';
const configModule = require(`./configs/${env}`);

if (!configModule) {
  throw new Error('Config for given NODE_ENV was not found');
}

module.exports = configModule;

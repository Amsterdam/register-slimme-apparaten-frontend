export const ENVIRONMENTS = {
  DEVELOPMENT: 'DEVELOPMENT',
  ACCEPTANCE: 'ACCEPTANCE',
  PRODUCTION: 'PRODUCTION'
};

export const HOSTS = {
  DEVELOPMENT: process.env.ROOT,
  ACCEPTANCE: process.env.ACC_URL,
  PRODUCTION: process.env.PROD_URL,
};

export const getEnvironment = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return ENVIRONMENTS.PRODUCTION;
    case 'acceptance':
      return ENVIRONMENTS.ACCEPTANCE;
    default:
      return ENVIRONMENTS.DEVELOPMENT;
  }
};

const ENVIRONMENT = (process.env.NODE_ENV).toUpperCase();

export default ENVIRONMENT;

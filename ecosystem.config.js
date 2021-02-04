module.exports = {
  apps : [{
    name: 'scanner-in',
    script: 'index.js',
    env_development: {
        NODE_ENV: 'development',
        PORT: 5000,
        PG_DB_HOST: 'localhost',
        PG_DB_PORT: 5432,
        PG_DB_USER: 'postgres',
        PG_DB_DB: 'test',
        PG_DB_PASSWD: 'password',
     },
     env_test: {
        NODE_ENV: 'production',
        PORT: process.env.PORT,
        PG_DB_HOST: 'ec2-54-159-107-189.compute-1.amazonaws.com',
        PG_DB_PORT: 5432,
        PG_DB_USER: 'otuwstlmetkuzh',
        PG_DB_DB: 'df4kau9c7sqlko',
        PG_DB_PASSWD: '2b3c00ad4ff11e72154bf63d4310dcacbcf657caeeefdbdac857939fcf0b6637',
     }
  }],
};

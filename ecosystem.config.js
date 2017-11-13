module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'WEB',
      script    : './dist/index.js',
      watch     : true,
      error_file: '../shared/logs/web-err.log',
      out_file  : '../shared/logs/web-out.log',
      pid_file  : '../shared/pids/web.pid',
      env: {
        NODE_ENV: 'development',
        DEBUG: '*'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'root',
      host : 'www.aipatn.com',
      ref  : 'origin/master',
      repo : 'https://github.com/gogokoala/aipatn-web.git',
      path : '/mnt/disk1/www/aipatn/web/prod',
      'post-deploy' : 'npm install && ng build --prod --build-optimizer',
      env  : {
        NODE_ENV: 'production'
      }
    },
    dev : {
      user : 'root',
      host : 'www.aipatn.com',
      ref  : 'origin/master',
      repo : 'https://github.com/gogokoala/aipatn-web.git',
      path : '/mnt/disk1/www/aipatn/web/dev',
      'post-deploy' : 'npm install && ng build --base-href=/my/app/',
      env  : {
        NODE_ENV: 'development',
        DEBUG: '*'
      }
    }
  }
};

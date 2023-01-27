var config = {
    "dev": {
        hostname: 'localhost',
        port: 8080,
        db_hostname: 'database',
        db_user: 'root',
        db_pwd: 'firebasenexto',
        db_port: 3306,
        db_database: 'nexto',
    },
    "test": {
        hostname: 'localhost',
        port: 8080,
        db_hostname: 'database',
        db_user: 'root',
        db_pwd: 'firebasenexto',
        db_port: 3306,
        db_database: 'nexto',
    },
    "prod": {
        hostname: '192.168.0.100',
        port: 8080,
        db_hostname: 'localhost',
        db_user: 'root',
        db_pwd: 'firebasenexto',
        db_port: 3306,
        db_database: 'nexto'
    },
    default: {
        hostname: 'localhost',
        port: 8080,
        db_hostname: 'localhost',
        db_user: 'root',
        db_pwd: 'firebasenexto',
        db_port: 3306,
        db_database: 'nexto'
    }
  }
  exports.get = function get(env) {
    return config[env] || config.default;
  }
const crypto = require('crypto')

module.exports = {
    user: 'root', // 数据库用户名
    password: '', // 数据库用户密码
    host: 'localhost', // 数据库服务器远程ip
    port: '3306', // 数据库服务器端口
    database: 'breakfast_shop', // 数据库名称

    // jwt:https://www.npmjs.com/package/jsonwebtoken
    // iss(issuer) ：签发人
    // exp(expiration time) ：过期时间
    // sub(subject) ：主题
    // aud(audience) ：受众
    // nbf(Not Before) ：生效时间
    // iat(Issued At) ：签发时间
    // jti(JWT ID) ：编号
    // expiresIn: 超时时间

    secret: crypto.createHash('md5').update(JSON.stringify({project: 'breakfast_shop', public: '2019-12-01'})).digest('hex'),
    iss: 'ws',
    exp: 60,
    sub: 'shop_app',
    aud: 'mobile',
    nbf: '2019-12-01',
    iat: Date.now(),
    jti: 'abcdefg123456',
    expiresIn: '3000s'
}
const Sequelize = require('sequelize');

// 데이터베이스의 연결정보를 설정

const config = {
    host: process.env.lumpyboard_host || '127.0.0.1',
    port : 3306,
    database: 'lumpyboard',
    user: 'user',
    password: process.env.lumpyboard_password || '1234qwer@'
};

// 데이터베이스 연결을 위한 시퀄라이즈 객체 생성 및 연결
const sequelize = new Sequelize(config.database, config.user, config.password,{
    host: config.host,
    dialect:'mysql',
});

module.exports = {
    sequelize,
    //데이터베이스 연결이 완료된 객체모델을 생성해서 반환
    //그런데 해당 모듈에 대한 설명이 전혀 없는데 이걸 어떻게 싱크를 맞추고 가져다
    // 쓴다는 건지가 이해가 잘 안됨. 
    GlobalStat: require('./global-stat.model')(sequelize),
};


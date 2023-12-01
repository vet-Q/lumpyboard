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
    WoahStat: require('./WOAH_stat_model')(sequelize),
};


// 모델을 정의하고 테이블을 생성. 필요한 경우 실행

// 모델을 정의하고 테이블을 생성
// const WoahStat =require('./WOAH_stat_model')(sequelize);


// async function createTable() {
//     try {
//         await sequelize.sync({ force: true }); // force: true 옵션을 사용하면 테이블이 이미 존재하는 경우 덮어쓸 수 있습니다.
//         console.log('테이블이 성공적으로 생성되었습니다.');
//     } catch (error) {
//         console.error('테이블 생성 중 오류가 발생했습니다.', error);
//     } finally {
//         sequelize.close(); // 연결 종료
//     }
// }
// //
// // // 테이블 생성 함수 호출
// createTable();

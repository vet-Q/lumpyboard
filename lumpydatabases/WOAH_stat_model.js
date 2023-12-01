const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
        return sequelize.define(
            // 모델이름 정의.
            // 시퀄라이즈에 정의된 객체모델들은 sequelize.models.GlobalStat처럼 모델 이름을 이용해 언제든 가져올 수 있음.
            'Event', {
                    id: {
                            type: DataTypes.INTEGER,
                            primaryKey: true,
                            autoIncrement: true // 자동 증가하는 고유번호로 설정
                    },
                    reportId: DataTypes.INTEGER,
                    country: DataTypes.STRING,
                    disease: DataTypes.STRING,
                    causalAgent: DataTypes.STRING,
                    startDate: DataTypes.DATE,
                    endDate: DataTypes.DATE,
                    latitude: DataTypes.FLOAT,
                    longitude: DataTypes.FLOAT,
                    location: DataTypes.STRING,
                    address: DataTypes.STRING,
                    speciesName: DataTypes.STRING,
                    isWild: DataTypes.BOOLEAN,
                    susceptible: DataTypes.INTEGER,
                    cases: DataTypes.INTEGER,
                    deaths: DataTypes.INTEGER,
                    killed: DataTypes.INTEGER,
                    slaughtered: DataTypes.INTEGER,
                    vaccinated: DataTypes.INTEGER
            });
};
const {DataTypes} = require('sequelize')

module.exports = (sequelize) =>{
    return sequelize.define(
        // 모델이름 정의.
        // 시퀄라이즈에 정의된 객체모델들은 sequelize.models.GlobalStat처럼 모델 이름을 이용해 언제든 가져올 수 있음. 
        'GlobalStat',
        {
            // 모델의 속성을 정의하는 코드. 앞의 이름들이 객체모델의 속성이름이면서 테이블 상의 컬림명이 됨. 
            id :{
                autoIncrement: true,
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                primaryKey:true,
            },
            cc :{
                type:DataTypes.CHAR(2),
                allowNull: false,
            },
            date:{
                type:DataTypes.DATEONLY,
                allowNull: false,
            },
            confirmed: {
                type:DataTypes.INTEGER,
                allowNull: false,
            },
            death:{
                type:DataTypes.INTEGER,
                allowNull:true,    
            },
            released:{
                type:DataTypes.INTEGER,
                allowNull: true,
            },
            tested:{
                type:DataTypes.INTEGER,
                allowNull: true,
            },
            testing: {
                type:DataTypes.INTEGER,
                allowNull: true,
            },
            negative:{
                type: DataTypes.INTEGER,
                allowNull:true
            },
        },
        // parameter3: set the option.
        // It needs,
        // 1) sequelize instance,
        // 2) database's table name,
        // 3) table index, timestamp configuration.
        {
            sequelize, //set the sequelize instance
            tableName: "Globalstat",
            indexes :[
                {
                    name:'PRIMARY',
                    unique: true,
                    fields:[{name:'id'}],
                },
                {
                    name:'ccWithDate',
                    unique: true,
                    fields:[{name:'cc'},{name:'date'}],
                },
            ],
            timestamps: false,//타임스탬프 속성의 자동생성을 막는 코드

        },
    );
};
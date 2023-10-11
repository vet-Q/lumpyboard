// 잡다한 데이터를 저장하는데 쓰는 API를 추가
// 굳이 DB table을 만들지 않아도 되는 데이터의 경우가 종종 있으므로
//  이러한 데이터를 테이블 하나에 키값 쌍을 한 행으로 저장해서 어떤 데이터든
//  유연하게 저장하고 불러올 수 있는 key-value API를 만듦. 

const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
 return sequelize.define (
    'keyValue',
    {
        id: {
            autoIncrement : true,
            type : DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        },
        key:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        value :{
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'keyValue',
        timestamps : false,
        indexes: [
            {
                name: 'PRIMARY',
                unique:true,
                fields:[{ name:'id' }],
            },
            {
                name:'key',
                unique: true,
                fields :[{ name: 'key'}],
            },
        ],
    },
 );

};
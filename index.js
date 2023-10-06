const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./database');
const globalStatController = require('./controller/global-stats.controller');


async function launchServer(){
    const app = express(); // 익스프레스 인스턴스 생성

    //Content-Type이 application인 HTTP요청의 body를 parsing할 수 있도록 설정

    app.use(bodyParser.json());

    app.get('/', (req,res)=> {
        res.json({message: 'hello coronaboard' });
    });

    app.get('/global-stats',globalStatController.getAll);
    app.post('/global-stats',globalStatController.insertOrUpdate);
    app.delete('/global-stats',globalStatController.remove);


    try {
        await sequelize.sync();//
        console.log("Database is ready!");
    } catch (error) {
        console.log('Unable to connect to the database');
        console.log(error);
        process.exit(1)
    }

    const port = process.env.PORT ||  8888 //set the initial port number to 8888


    app.listen(port, ()=> {
        console.log(`Server is running on port ${port}`);
    });
};

launchServer();
// 처음 API서버를 띄웠던 코드에서, 서버를 초기화하고 시작하는 코드를 launchServer()라는 비동기 함수로 감싸고, 내부에 sequelize.sync()를 실행하는 코드를 추가하였음.

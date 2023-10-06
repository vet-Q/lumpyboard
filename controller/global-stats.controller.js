const { GlobalStat } = require('../database');
//getAll(),insertOrUpdate(), remove() 함수의 내부에서는 GlobalStat
//객체의 메서드를 이용하여 데이터베이스 관련 작업을 수행함. 이 메서드들은 시퀄라이즈 ORM에서 제공하는 기능임
const { wrapWithErrorHandler} = require('../util');


//데이터 조회
async function getAll (req, res) {
    const result = await GlobalStat.findAll();
    // 장상적으로 데이터가 얻어진 경우 해당 내용을 
    // 상태코드 200과 함께 반환하는 함수
    res.status(200).json({ result });
}

// function for insert or update data 
// 통계 데이터를 삽입하거나 기존에 있는 데이터를 갱신하는 함수

async function insertOrUpdate(req, res) {
    const {cc, date} = req.body;

    if (!cc || !date) {
        res.status(400).json({error:"cc and date are required!"})
        return ;
    }

    //count the number which is fit for requested condition 
    // GlobalStat에 count와 create함수가 있었나> 없었던 것 같은데. 
    // ==> sequelize에 있는 기능을 가져다 쓸 수 있도록 해주는 함수. destructuring으로 Sequelize ORM의 기능을 그대로 가져다 쓸 수 있도록 했기 때문에 가능한 기능임. 
    
    const count = await GlobalStat.count({ where:{ cc, date }});

    if (count === 0) {
        await GlobalStat.create(req.body);
        } else {
        await GlobalStat.update(req.body, { where : {cc, date } });
        };
        res.status(200).json({result:'success'});
}


// delete the data
async function remove(req, res) {
    const {cc, date} = req.body;
    if (!cc|date) {
        res.status(400).json({ error: 'cc and date are required'});
        return;
    }

    await GlobalStat.destroy({
        where :{
            cc,
            date,
        },
    });

    res.status(200).json({result:'success'});
}

// errorhandler로 래핑하면 컨트롤러의 각 함수들이 앞서 만들어 둔 errorHandler로 한번 감싸져서 외부로 전달되게 됨. 
module.exports = wrapWithErrorHandler({
    getAll,
    insertOrUpdate,
    remove,
});


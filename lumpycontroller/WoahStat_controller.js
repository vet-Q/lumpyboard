const { WoahStat } = require('../lumpydatabases');
//getAll(),insertOrUpdate(), remove() 함수의 내부에서는 WoahStat메서드를 수행함.
//객체의 메서드를 이용하여 데이터베이스 관련 작업을 수행함. 이 메서드들은 시퀄라이즈 ORM에서 제공하는 기능임
const { wrapWithErrorHandler } = require('../util');


//데이터 조회
async function getAll (req, res) {
    const result = await WoahStat.findAll();
    // 장상적으로 데이터가 얻어진 경우 해당 내용을
    // 상태코드 200과 함께 반환하는 함수
    res.status(200).json({ result });
}

// function for insert or update data
// 통계 데이터를 삽입하거나 기존에 있는 데이터를 갱신하는 함수

async function insertOrUpdate(req, res) {
   try {
       console.log('hello welcome to DB')
       await WoahStat.create(req.body);
       // if (count === 0) {
       //     await GlobalStat.create(req.body);
       // } else {
       //     await GlobalStat.update(req.body, { where : { date } });
       // };
       res.status(200).json({result: 'success'});
   } catch (e) {
       console.log(`there is a problem to upload your data to DB:${e}`)
    }
}


// delete the data
async function remove(req, res) {
    try {
        // 데이터 삭제
        await WoahStat.destroy({
            where: {}, // 원하는 조건을 여기에 추가하여 특정 데이터만 삭제 가능
            truncate: true // 테이블을 완전히 비우려면 true로 설정
        });

        res.status(200).json({ result: 'success' });
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({ error: 'Failed to delete data' });
    }
}


// errorhandler로 래핑하면 컨트롤러의 각 함수들이 앞서 만들어 둔 errorHandler로 한번 감싸져서 외부로 전달되게 됨.
module.exports = wrapWithErrorHandler ({
    getAll,
    insertOrUpdate,
    remove,
});


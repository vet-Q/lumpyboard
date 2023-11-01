const cheerio = require('cheerio');
const fs = require('fs');
const axios = require('axios');
const { saveToExcel }  = require('./save_to_excel')

const headers = {
    'Content-type': 'application/json',
    'Accept': '*/*', 'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
};


const uri = "https://wahis.woah.org/api/v1/pi/review/report/163116/all-information?language=en"

async function subcrawler (uri) {
    try{
        return await axios.get(uri,{headers})
    }catch (error) {
        console.log(error);
    }
};

function print (data) {
    console.log(data)
}

subcrawler(uri)
    .then((res) => {
        print(res);
        return saveToExcel(res.data.outbreaks);  // 데이터를 Excel 파일로 저장
    })
    .catch(err => {
        console.error('Error:', err);
    });

module.exports = {
    subcrawler,
}
const path = require('path');
const fs = require('fs');
const ApiClient = require('./api-client');
const { crawlAndUpdateDomestic } = require('./domestic-updater');

async function main(){
//     마지막으로 크롤링한 데이터를 파일로 저장하는 디렉터리
    const outputPath = path.join(process.cwd(),'output');

//     폴더가 없다면 생성
    if(!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath);
    }
    const apiClient = new ApiClient();
    try {
        console.log('crawlAndUpdateDomestic started');
        await crawlAndUpdateDomestic(outputPath,apiClient)
    } catch(e){
        console.log('crawlAndUpdateDomestic failed', e);
    }
}

main();
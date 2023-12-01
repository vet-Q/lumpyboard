const path = require('path');
const fs = require('fs');

const ApiClient = require('./Woahapi-client');
const { crawlAndUpdateDomestic } = require('./WOAH_updator');


// ApiClient를 통해 DB upload를 위한 객체를 생성하고 이 값을 crawlAndUpdateDomestic에 넣어주어, 업데이트가 수행되도록 함.
// mainCrawler는 WOAH_Updator에서 불러서 실행하므로, index.js에서는 해당 파일을 불러오지 않음에 주의


async function main () {
    const outputPath = path.join(process.cwd());

    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath);
    } 

    const apiClient = new ApiClient();

    try {
        console.log('crawlAndUpdate started');
        await crawlAndUpdateDomestic(outputPath, apiClient);
    } catch (e) {
        console.log('crawlAndUpdate failed', e)
    }
}

main();



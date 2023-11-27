const ReportNumberCrawler = require('./reportNumberCrawler');
const SubCrawler = require('./SubCrawler');
const eventCrawler = require('./eventCrawler');
const fs = require('fs');
const path = require("path");

function compareNumbers(a, b) {
    return a - b;
}

const TotalPath = path.join(process.cwd(), 'Total.json');

const Client = new APIClient();

async function Crawler() {
    try {
        const Reportnumber = new ReportNumberCrawler();
        const newData = await Reportnumber.crawlNumber();
        const { crawledDate: _, NumberStat } = newData;
        const results = [];

        j = 1

        for (let i of NumberStat) {
            let url = `https://wahis.woah.org/api/v1/pi/review/report/${i.reportId}/all-information?language=en`;
            const data = new SubCrawler(url);
            const { eventField, reportNumber } = await data.crawlstats();
            let eventInfo = {};

            reportNumber.sort(compareNumbers);
            for (let el of reportNumber) {
                let { dates, resultArray, measure } = await eventCrawler(i.reportId, el);

                if (!resultArray.length) continue;
                eventInfo[el] = { dates, resultArray, measure };
            }

            const TotalData = {
                eventField,
                eventInfo,
            };

            results.push(TotalData);
            console.log(TotalData)
            console.log(NumberStat.length, `${j}번째입니다`)
            //     크롤링된 최신 값을 파일에 저장

            j++
        }
        fs.writeFileSync(TotalPath, JSON.stringify(results));
        console.log(results);
        return results

    } catch (error) {
        console.error("Error in Crawler:", error);
    }
}


module.exports = Crawler;

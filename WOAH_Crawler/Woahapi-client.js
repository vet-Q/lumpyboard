const axios = require('axios');

class ApiClient {
    constructor() {
        //     HTTP client 정의
        const client = axios.create({
            baseURL:process.env.CB_API_BASE_URL || 'http://localhost:8888',
        });

        //     응답에 대한 인터셉터를 등록하면 모든 응답에 대해 여기 등록된 함수를 수행함
        client.interceptors.response.use((resp)=> {
            return resp.data;
        });

        this.client = client;
    }

//     국가별 통계를 upsert하는 global-stats API호출
    async upsertGlobalStat(data){
        return await this.client.post('global-stats', data);
    }

    async upsertKeyValue(key,value) {
        return await this.client.post('key-value',{
            key,
            value
        });
    }
}

module.exports = ApiClient;


const axios = require('axios');

class ApiClient {
  constructor(){
    const client = axios.create({
      baseURL: process.env.cb_api_base_url || 'http://localhost:8888',
    });


    // 해당 부분의 코드가 잘 이해되지 않음. 나중에 해당 데이터를 이용하려고 옆문을 만들어 놓은 거라는 의미인가?
    client.interceptors.response.use((resp) => {
      return resp.data
    });

    this.client = client;
  }

  async getAllGlobalStats(){
    const response = await this.client.get('/global-stats');
    return response.result;
  }
}

module.exports = ApiClient;
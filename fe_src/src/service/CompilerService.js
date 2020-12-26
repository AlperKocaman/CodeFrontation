import axios from 'axios';

export default class CompilerService {

    async requestToServer(url = '',method='', data = {},token='') {
        const config = {
            headers: { Authorization: 'Bearer '+token }
        };
        try {
            if (method=='POST'){
                const response = await axios.post(url, data, config);
                return response;
            }else if (method=='GET'){
                const response = await axios.get(url, config);
                return response;
            }else if (method=='PUT'){
                const response = await axios.put(url, data, config);
                return response;
            }else if (method=='DELETE'){
                const response = await axios.delete(url, data, config);
                return response;
            }
        } catch (error) {
            console.error(error);
        }
    }

    async getSubmit(id, token) {
        const url = "http://localhost:8080/judge/submit/"+id;
        const method = 'GET';
        const response = await this.requestToServer(url, method, {}, token);
        return response;
    }

    async addSubmit(data, token){
        const url="http://localhost:8080/judge/submit";
        const method='POST';
        const response = await this.requestToServer(url, method, data, token);
        return response;
    }


    async getTestRun(id, token) {
        const url = "http://localhost:8080/judge/testRun/"+id;
        const method = 'GET';
        const response = await this.requestToServer(url, method, {}, token);
        return response;
    }

    async testRun(data, token){
        const url="http://localhost:8080/judge/testRun";
        const method='POST';
        const response = await this.requestToServer(url, method, data, token);
        return response;
    }

    async registerSonar(data, token){
        const url="http://localhost:8080/registerSonar";
        const method='POST';
        const response = await this.requestToServer(url, method, data, token);
        return response;
    }

    async updateSubmissionWithSonarData(data, id, token){
        const url="http://localhost:8080/judge/submit/" + id;
        const method='PUT';
        const response = await this.requestToServer(url, method, data, token);
        return response;
    }
}

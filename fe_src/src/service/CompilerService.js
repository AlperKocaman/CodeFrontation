import axios from 'axios';

export default class CompilerService {

    async requestToServer(url = '',method='', data = {}) {
        try {
            if (method=='POST'){
                const response = await axios.post(url, data);
                return response;
            }else if (method=='GET'){
                const response = await axios.get(url);
                return response;
            }else if (method=='PUT'){
                const response = await axios.put(url, data);
                return response;
            }else if (method=='DELETE'){
                const response = await axios.delete(url, data);
                return response;
            }
        } catch (error) {
            console.error(error);
        }
    }

    async getSubmit(id) {
        const url = "http://localhost:8080/judge/submit/"+id;
        const method = 'GET';
        const response = await this.requestToServer(url, method, {});
        return response;
    }

    async addSubmit(data){
        const url="http://localhost:8080/judge/submit";
        const method='POST';
        const response = await this.requestToServer(url, method, data);
        return response;
    }


    async getTestRun(id) {
        const url = "http://localhost:8080/judge/testRun/"+id;
        const method = 'GET';
        const response = await this.requestToServer(url, method, {});
        return response;
    }

    async testRun(data){
        const url="http://localhost:8080/judge/testRun";
        const method='POST';
        const response = await this.requestToServer(url, method, data);
        return response;
    }

    async registerSonar(data){
        const url="http://localhost:8080/registerSonar";
        const method='POST';
        const response = await this.requestToServer(url, method, data);
        return response;
    }

    async updateSubmissionWithSonarData(data, id){
        const url="http://localhost:8080/judge/submit/" + id;
        const method='PUT';
        const response = await this.requestToServer(url, method, data);
        return response;
    }
}

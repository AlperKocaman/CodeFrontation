import axios from 'axios';

export default class ProblemService {

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

    async getProblems(username, token) {
        const url = "http://localhost:8080/main/problems/" + username;
        const method = 'GET';
        const response = await this.requestToServer(url, method, {}, token);
        return response;
    }

    async getProblem(problemCode, token) {
        const url = "http://localhost:8080/main/problems/problemKey/" + problemCode;
        const method = 'GET';
        const response = await this.requestToServer(url, method, {}, token);
        return response;
    }

    async deleteProblems(problems, token){
        const url="http://localhost:8080/main/problems/delete-problems";
        const method='POST';
        const response = await this.requestToServer(url, method, problems, token);
        return response;
    }

    async deleteProblem(problem, token){
        const url="http://localhost:8080/main/problems/"+problem.id;
        const method='DELETE';
        const response = await this.requestToServer(url, method, {}, token);
        return response;
    }

    async addProblem(problem, token){
        const url="http://localhost:8080/main/problem";
        const method='POST';
        const response = await this.requestToServer(url, method, problem, token);
        return response;
    }

    async updateProblem(problem, token){
        const url="http://localhost:8080/main/problems/"+problem.id;
        const method='PUT';
        const response = await this.requestToServer(url, method, problem, token);
        return response;
    }

    async dmojUpdateProblemList(token){
        const url="http://localhost:8081/update/problems";
        const method='POST';
        const response = await this.requestToServer(url, method, {}, token);
        return response;
    }
}

import axios from 'axios';

export default class ProblemService {

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

    async getProblems(username) {
        const url = "http://localhost:8080/main/problems/" + username;
        const method = 'GET';
        const response = await this.requestToServer(url, method, {});
        return response;
    }

    async deleteProblems(problems){
        const url="http://localhost:8080/main/problems/delete-problems";
        const method='POST';
        const response = await this.requestToServer(url, method, problems);
        return response;
    }

    async deleteProblem(problem){
        const url="http://localhost:8080/main/problems/"+problem.id;
        const method='DELETE';
        const response = await this.requestToServer(url, method, {});
        return response;
    }

    async addProblem(problem){
        const url="http://localhost:8080/main/problem";
        const method='POST';
        const response = await this.requestToServer(url, method, problem);
        return response;
    }

    async updateProblem(problem){
        const url="http://localhost:8080/main/problems/"+problem.id;
        const method='PUT';
        const response = await this.requestToServer(url, method, problem);
        return response;
    }
}

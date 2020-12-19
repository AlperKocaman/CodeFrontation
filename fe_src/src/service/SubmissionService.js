import axios from 'axios';

export default class SubmissionService{

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

    async getSubmissions() {
        const url = "http://localhost:8080/main/submissions";
        const method = 'GET';
        const response = await this.requestToServer(url, method, {});
        return response;
    }

    async deleteSubmissions(submissions){
        const url="http://localhost:8080/main/submissions/delete-submissions";
        const method='POST';
        const response = await this.requestToServer(url, method, submissions);
        return response;
    }

    async deleteSubmission(submission){
        const url="http://localhost:8080/main/submissions/"+submission.id;
        const method='DELETE';
        const response = await this.requestToServer(url, method, {});
        return response;
    }

    async addSubmission(submission){
        const url="http://localhost:8080/main/submission";
        const method='POST';
        const response = await this.requestToServer(url, method, submission);
        return response;
    }

    async updateSubmission(submission){
        const url="http://localhost:8080/main/submissions/"+submission.id;
        const method='PUT';
        const response = await this.requestToServer(url, method, submission);
        return response;
    }
}

import axios from 'axios';

export default class SubmissionService {

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

    async getSubmissions(username, token) {
        const url = "http://localhost:8080/main/submissions/" + username;
        const method = 'GET';
        const response = await this.requestToServer(url, method, {}, token);
        return response;
    }
    async getSubmissionsByUsernameAndProblemCode(username, problemCode, token) {
        const url = "http://localhost:8080/main/submissions/" + username + "/" + problemCode;
        const method = 'GET';
        const response = await this.requestToServer(url, method, {}, token);
        return response;
    }

    async deleteSubmissions(submissions, token) {
        const url = "http://localhost:8080/main/submissions/delete-submissions";
        const method = 'POST';
        const response = await this.requestToServer(url, method, submissions, token);
        return response;
    }

    async deleteSubmission(submission, token) {
        const url = "http://localhost:8080/main/submissions/" + submission.id;
        const method = 'DELETE';
        const response = await this.requestToServer(url, method, {}, token);
        return response;
    }

    async addSubmission(submission, token) {
        const url = "http://localhost:8080/main/submission";
        const method = 'POST';
        const response = await this.requestToServer(url, method, submission, token);
        return response;
    }

    async updateSubmission(submission, token) {
        const url = "http://localhost:8080/main/submissions/" + submission.id;
        const method = 'PUT';
        const response = await this.requestToServer(url, method, submission, token);
        return response;
    }

    extractSonarKeyFromUrl(sonarUrl) {
        return sonarUrl.substring(30);
    }

    async getSonarMetrics(submission, token) {
        let response = [];
        const complexityMetricsUrl = "http://localhost:8080/getSonarComplexityMetrics/" +
            this.extractSonarKeyFromUrl(submission.sonarUrl);
        const duplicationMetricsUrl = "http://localhost:8080/getSonarDuplicationMetrics/" +
            this.extractSonarKeyFromUrl(submission.sonarUrl);
        const maintainabilityMetricsUrl = "http://localhost:8080/getSonarMaintainabilityMetrics/" +
            this.extractSonarKeyFromUrl(submission.sonarUrl);
        const reliabilityMetricsUrl = "http://localhost:8080/getSonarReliabilityMetrics/" +
            this.extractSonarKeyFromUrl(submission.sonarUrl);
        const securityMetricsUrl = "http://localhost:8080/getSonarSecurityMetrics/" +
            this.extractSonarKeyFromUrl(submission.sonarUrl);
        const sizeMetricsUrl = "http://localhost:8080/getSonarSizeMetrics/" +
            this.extractSonarKeyFromUrl(submission.sonarUrl);
        const method = 'GET';

        response.push(await this.requestToServer(complexityMetricsUrl, method, submission, token));
        response.push(await this.requestToServer(duplicationMetricsUrl, method, submission, token));
        response.push(await this.requestToServer(maintainabilityMetricsUrl, method, submission, token));
        response.push(await this.requestToServer(reliabilityMetricsUrl, method, submission, token));
        response.push(await this.requestToServer(securityMetricsUrl, method, submission, token));
        response.push(await this.requestToServer(sizeMetricsUrl, method, submission, token));
        return response;
    }

}

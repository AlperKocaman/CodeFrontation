import axios from 'axios';

export default class SubmissionService {

    BACKEND_BASE_URL = "http://localhost:9000/api/";
    FIRST_URL_PARAMETER = "measures/component?metricKeys=";
    COMPLEXITY_METRICS = "complexity,cognitive_complexity";
    DUPLICATION_METRICS = "duplicated_blocks,duplicated_files,duplicated_lines,duplicated_lines_density";
    MAINTAINABILITY_METRICS = "code_smells,sqale_index";
    RELIABILITY_METRICS = "bugs,reliability_rating,reliability_remediation_effort";
    SECURITY_METRICS = "vulnerabilities,security_rating,security_remediation_effort,security_hotspots,security_review_rating";
    SIZE_METRICS = "comment_lines,comment_lines_density,ncloc,functions";
    LAST_URL_PARAMETER = "&component=";

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

    extractSonarKeyFromUrl(sonarUrl, token) {
        return sonarUrl.substring(35);
    }

    async getSonarMetrics(submission, token) {
        let response = [];
        const complexityMetricsUrl = this.BACKEND_BASE_URL + this.FIRST_URL_PARAMETER + this.COMPLEXITY_METRICS + this.LAST_URL_PARAMETER +
            this.extractSonarKeyFromUrl(submission.sonarUrl);
        const duplicationMetricsUrl = this.BACKEND_BASE_URL + this.FIRST_URL_PARAMETER + this.DUPLICATION_METRICS + this.LAST_URL_PARAMETER +
            this.extractSonarKeyFromUrl(submission.sonarUrl);
        const maintainabilityMetricsUrl = this.BACKEND_BASE_URL + this.FIRST_URL_PARAMETER + this.MAINTAINABILITY_METRICS + this.LAST_URL_PARAMETER +
            this.extractSonarKeyFromUrl(submission.sonarUrl);
        const reliabilityMetricsUrl = this.BACKEND_BASE_URL + this.FIRST_URL_PARAMETER + this.RELIABILITY_METRICS + this.LAST_URL_PARAMETER +
            this.extractSonarKeyFromUrl(submission.sonarUrl);
        const securityMetricsUrl = this.BACKEND_BASE_URL + this.FIRST_URL_PARAMETER + this.SECURITY_METRICS + this.LAST_URL_PARAMETER +
            this.extractSonarKeyFromUrl(submission.sonarUrl);
        const sizeMetricsUrl = this.BACKEND_BASE_URL + this.FIRST_URL_PARAMETER + this.SIZE_METRICS + this.LAST_URL_PARAMETER +
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

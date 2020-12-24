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

    async requestToServer(url = '', method = '', data = {}) {
        try {
            if (method == 'POST') {
                const response = await axios.post(url, data);
                return response;
            } else if (method == 'GET') {
                const response = await axios.get(url);
                return response;
            } else if (method == 'PUT') {
                const response = await axios.put(url, data);
                return response;
            } else if (method == 'DELETE') {
                const response = await axios.delete(url, data);
                return response;
            }
        } catch (error) {
            console.error(error);
        }
    }

    async getSubmissions(username) {
        const url = "http://localhost:8080/main/submissions/" + username;
        const method = 'GET';
        const response = await this.requestToServer(url, method, {});
        return response;
    }
    async getSubmissionsByUsernameAndProblemCode(username, problemCode) {
        const url = "http://localhost:8080/main/submissions/" + username + "/" + problemCode;
        const method = 'GET';
        const response = await this.requestToServer(url, method, {});
        return response;
    }

    async deleteSubmissions(submissions) {
        const url = "http://localhost:8080/main/submissions/delete-submissions";
        const method = 'POST';
        const response = await this.requestToServer(url, method, submissions);
        return response;
    }

    async deleteSubmission(submission) {
        const url = "http://localhost:8080/main/submissions/" + submission.id;
        const method = 'DELETE';
        const response = await this.requestToServer(url, method, {});
        return response;
    }

    async addSubmission(submission) {
        const url = "http://localhost:8080/main/submission";
        const method = 'POST';
        const response = await this.requestToServer(url, method, submission);
        return response;
    }

    async updateSubmission(submission) {
        const url = "http://localhost:8080/main/submissions/" + submission.id;
        const method = 'PUT';
        const response = await this.requestToServer(url, method, submission);
        return response;
    }

    extractSonarKeyFromUrl(sonarUrl) {
        return sonarUrl.substring(35);
    }

    async getSonarMetrics(submission) {
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

        response.push(await this.requestToServer(complexityMetricsUrl, method, submission));
        response.push(await this.requestToServer(duplicationMetricsUrl, method, submission));
        response.push(await this.requestToServer(maintainabilityMetricsUrl, method, submission));
        response.push(await this.requestToServer(reliabilityMetricsUrl, method, submission));
        response.push(await this.requestToServer(securityMetricsUrl, method, submission));
        response.push(await this.requestToServer(sizeMetricsUrl, method, submission));
        return response;
    }


}

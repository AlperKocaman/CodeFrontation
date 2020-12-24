import axios from 'axios';

export default class CommentService{

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

    async getUserComments(user) {
        const url = "http://localhost:8080/main/comments/userId#" + user.id;
        const method = 'GET';
        const response = await this.requestToServer(url, method, {});
        return response;
    }
    async getSubmissionComments(submission) {
        const url = "http://localhost:8080/main/comments/submissionId#" + submission.id;
        const method = 'GET';
        const response = await this.requestToServer(url, method, {});
        return response;
    }
    async getComments() {
        const url = "http://localhost:8080/main/comments";
        const method = 'GET';
        const response = await this.requestToServer(url, method, {});
        return response;
    }

    async deleteComments(comments){
        const url="http://localhost:8080/main/comments/delete-comments";
        const method='POST';
        const response = await this.requestToServer(url, method, comments);
        return response;
    }

    async deleteComment(comment){
        const url="http://localhost:8080/main/comments/"+comment.id;
        const method='DELETE';
        const response = await this.requestToServer(url, method, {});
        return response;
    }

    async addComment(comment){
        const url="http://localhost:8080/main/comments";
        const method='POST';
        const response = await this.requestToServer(url, method, comment);
        return response;
    }

    async updateComment(comment){
        const url="http://localhost:8080/main/comments/"+comment.id;
        const method='PUT';
        const response = await this.requestToServer(url, method, comment);
        return response;
    }
}

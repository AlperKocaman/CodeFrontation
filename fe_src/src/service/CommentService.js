import axios from 'axios';

export default class CommentService{

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
                const response = await axios.delete(url, config);
                return response;
            }
        } catch (error) {
            console.error(error);
        }
    }

    async getCommentsByUserName(username,token) {
        const url = "http://localhost:8080/main/comments/" + username;
        const method = 'GET';
        const response = await this.requestToServer(url, method, {},token);
        return response;
    }
    async getCommentsByUsernameAndProblemCode(username, problemCode,token) {
        const url = "http://localhost:8080/main/comments/" + username + "/" + problemCode;
        const method = 'GET';
        const response = await this.requestToServer(url, method, {},token);
        return response;
    }  
    async getCommentsBySubmissionId(submissionId,token) {
        const url = "http://localhost:8080/main/commentsBySubmissionId/" +submissionId;
        const method = 'GET';
        const response = await this.requestToServer(url, method, {},token);
        return response;
    }

    async getComments(token) {
        const url = "http://localhost:8080/main/comments/";
        const method = 'GET';
        const response = await this.requestToServer(url, method, {},token);
        return response;
    }

    async deleteComments(comments,token){
        const url="http://localhost:8080/main/comments/delete-comments";
        const method='POST';
        const response = await this.requestToServer(url, method, comments,token);
        return response;
    }

    async deleteComment(comment,token){
        const url="http://localhost:8080/main/comments/"+comment.id;
        const method='DELETE';
        const response = await this.requestToServer(url, method, {},token);
        return response;
    }

    async addComment(comment,token){
        const url="http://localhost:8080/main/comments";
        const method='POST';
        const response = await this.requestToServer(url, method, comment,token);
        return response;
    }

    async updateComment(comment,token){
        const url="http://localhost:8080/main/comments/"+comment.id;
        const method='PUT';
        const response = await this.requestToServer(url, method, comment,token);
        return response;
    }
}

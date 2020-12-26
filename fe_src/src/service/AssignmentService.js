import axios from 'axios';

export default class AssignmentService {

    async requestToServer(url = '',method='', data = {}, token = '') {
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

    async assignTemplateAndProblem(user, problem, token){
        const url="http://localhost:8080/main/assignments/";
        const method='POST';
        const response = await this.requestToServer(url, method, {user:user,problem:problem}, token);
        return response;
    }

    async getAssignmentByUsernameAndProblemCode(username, problemCode, token){
        const url=`http://localhost:8080/main/assignments/${username}/${problemCode}`;
        const method='GET';
        const response = await this.requestToServer(url, method, {}, token);
        return response;
    }
}
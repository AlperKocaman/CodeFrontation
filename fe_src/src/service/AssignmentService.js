import axios from 'axios';

export default class AssignmentService {

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

    async assignTemplateAndProblem(user, problem){
        const url="http://localhost:8080/main/assignments/";
        const method='POST';
        const response = await this.requestToServer(url, method, {user:user,problem:problem});
        return response;
    }
}
import axios from 'axios';

export default class UserService {

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

    async getRoles(token) {
        const url = "http://localhost:8080/main/roles";
        const method = 'GET';
        const response = await this.requestToServer(url, method, {}, token);
        return response;
    }

    async getUsers(token) {
        const url = "http://localhost:8080/main/users";
        const method = 'GET';
        const response = await this.requestToServer(url, method, {}, token);
        return response;
    }

    async deleteUsers(users, token){
        const url="http://localhost:8080/main/users/delete-users";
        const method='POST';
        const response = await this.requestToServer(url, method, users, token);
        return response;
    }

    async deleteUser(user, token){
        const url="http://localhost:8080/main/users/"+user.id;
        const method='DELETE';
        const response = await this.requestToServer(url, method, {}, token);
        return response;
    }

    async addUser(user, token){
        const url="http://localhost:8080/main/user";
        const method='POST';
        const response = await this.requestToServer(url, method, user, token);
        return response;
    }

    async updateUser(user, token){
        const url="http://localhost:8080/main/users/"+user.id;
        const method='PUT';
        const response = await this.requestToServer(url, method, user, token);
        return response;
    }
}

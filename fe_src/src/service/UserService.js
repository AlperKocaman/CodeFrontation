import axios from 'axios';

export default class UserService {

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

    async getUsers() {
        const url = "http://localhost:8080/main/users";
        const method = 'GET';
        const response = await this.requestToServer(url, method, {});
        return response;
    }

    async deleteUsers(users){
        const url="http://localhost:8080/main/users/delete-users";
        const method='POST';
        const response = await this.requestToServer(url, method, users);
        return response;
    }

    async deleteUser(user){
        const url="http://localhost:8080/main/users/"+user.id;
        const method='DELETE';
        const response = await this.requestToServer(url, method, {});
        return response;
    }

    async addUser(user){
        const url="http://localhost:8080/main/user";
        const method='POST';
        const response = await this.requestToServer(url, method, user);
        return response;
    }

    async updateUser(user){
        const url="http://localhost:8080/main/users/"+user.id;
        const method='PUT';
        const response = await this.requestToServer(url, method, user);
        return response;
    }
}

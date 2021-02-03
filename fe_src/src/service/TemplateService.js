import axios from 'axios';

export default class TemplateService {

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

    async getRoles(token) {
        const url = "http://localhost:8080/main/roles";
        const method = 'GET';
        const response = await this.requestToServer(url, method, {}, token);
        return response;
    }

    async getTemplates(token) {
        const url = "http://localhost:8080/main/templates";
        const method = 'GET';
        const response = await this.requestToServer(url, method, {}, token);
        return response;
    }

    async deleteTemplates(templates, token){
        const url="http://localhost:8080/main/templates/delete-templates";
        const method='POST';
        const response = await this.requestToServer(url, method, templates, token);
        return response;
    }

    async deleteTemplate(template, token){
        const url="http://localhost:8080/main/templates/"+template.id;
        const method='DELETE';
        const response = await this.requestToServer(url, method, {}, token);
        return response;
    }

    async addTemplate(template, token){
        const url="http://localhost:8080/main/template";
        const method='POST';
        const response = await this.requestToServer(url, method, template, token);
        return response;
    }

    async updateTemplate(template, token){
        const url="http://localhost:8080/main/templates/"+template.id;
        const method='PUT';
        const response = await this.requestToServer(url, method, template, token);
        return response;
    }
}

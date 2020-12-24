import axios from 'axios';

export default class TemplateService {

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

    async getRoles() {
        const url = "http://localhost:8080/main/roles";
        const method = 'GET';
        const response = await this.requestToServer(url, method, {});
        return response;
    }

    async getTemplates() {
        const url = "http://localhost:8080/main/templates";
        const method = 'GET';
        const response = await this.requestToServer(url, method, {});
        return response;
    }

    async deleteTemplates(templates){
        const url="http://localhost:8080/main/templates/delete-templates";
        const method='POST';
        const response = await this.requestToServer(url, method, templates);
        return response;
    }

    async deleteTemplate(template){
        const url="http://localhost:8080/main/templates/"+template.id;
        const method='DELETE';
        const response = await this.requestToServer(url, method, {});
        return response;
    }

    async addTemplate(template){
        const url="http://localhost:8080/main/template";
        const method='POST';
        const response = await this.requestToServer(url, method, template);
        return response;
    }

    async updateTemplate(template){
        const url="http://localhost:8080/main/templates/"+template.id;
        const method='PUT';
        const response = await this.requestToServer(url, method, template);
        return response;
    }
}

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './indexTable.css';

import React, { Component } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import TemplateService from "../service/TemplateService";
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import './UserList.css';
import uuid from 'uuid-random';
import {Dropdown} from "primereact/dropdown";
import UserService from '../service/UserService';
import ProblemService from '../service/ProblemService';
import {MultiSelect} from "primereact/multiselect";

export class TemplateList extends Component {

    emptyTemplate = {
        id: null,
        name: '',
        role:null,//{id:null,name:''},
        roleName:'',
        definition:'',
        author: null,
        authorId:'',
        authorName:'',
        templateProblems:[],
        problemIds:[],
        problemNames:[]
    };

    
    constructor(props) {
        super(props);

        this.state = {
            templates: [],
            templateDialog: false,
            deleteTemplateDialog: false,
            deleteTemplatesDialog: false,
            template: this.emptyTemplate,
            selectedTemplates: null,
            submitted: false,
            globalFilter: null,
            templatesForDatatable:[]
        };

        this.roleItems = [];
        this.userItems = [];
        this.problems = [];

        this.templateService = new TemplateService();
        this.userService = new UserService();
        this.problemService = new ProblemService();
        this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
        this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);

        this.linkable = this.linkable.bind(this);
        this.onClickTemplateCode = this.onClickTemplateCode.bind(this);
        this.openNew = this.openNew.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.saveTemplate = this.saveTemplate.bind(this);
        this.editTemplate = this.editTemplate.bind(this);
        this.confirmDeleteTemplate = this.confirmDeleteTemplate.bind(this);
        this.deleteTemplate = this.deleteTemplate.bind(this);
        this.exportCSV = this.exportCSV.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedTemplates = this.deleteSelectedTemplates.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputNumberChange = this.onInputNumberChange.bind(this);
        this.hideDeleteTemplateDialog = this.hideDeleteTemplateDialog.bind(this);
        this.hideDeleteTemplatesDialog = this.hideDeleteTemplatesDialog.bind(this);
    }

    componentDidMount() {
        this.templateService.getTemplates().then(res => {
            let temp = res.data;
            temp.forEach((item,i)=>{
                item.roleName=item.role?item.role.name:'';
                item.problemNames=item.templateProblems?item.templateProblems.map((ee)=>ee.name):[];
            });
            this.setState({templates:temp});
        });
        
        this.templateService.getRoles().then(res => {
            console.log(res);
            this.roleItems = res.data;
        });

        this.userService.getUsers().then(res => {
            console.log(res);
            this.userItems = res.data;
        });

        this.problemService.getProblems().then(res=>{
            this.problems = res.data;
        });

    }

    openNew() {
        this.setState({
            template: this.emptyTemplate,
            submitted: false,
            templateDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            templateDialog: false
        });
    }

    hideDeleteTemplateDialog() {
        this.setState({ deleteTemplateDialog: false });
    }

    hideDeleteTemplatesDialog() {
        this.setState({ deleteTemplatesDialog: false });
    }

    saveTemplate() {
        if (this.state.template.name.trim()) {

            if (this.state.template.id) {
                this.templateService.updateTemplate(this.state.template).then(data => {
                    const index = this.findIndexById(this.state.template.id);
                    let state = { submitted: true };
                    let templates = [...this.state.templates];
                    let template = {...this.state.template};
                    templates[index] = template;
                    state = {
                        ...state,
                        templates,
                        templateDialog: false,
                        template: this.emptyTemplate
                    };
                    this.setState(state);
                    this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Template Updated', life: 3000 });
                }).catch(error => {
                    console.error('There was an error while updating template!', error);
                });
            }
            else {
                this.templateService.addTemplate(this.state.template).then(data => {
                    let state = { submitted: true };
                    let templates = [...this.state.templates];
                    let template = {...this.state.template};
                    template.id = data.data.id;
                    templates.push(template);

                    state = {
                        ...state,
                        templates,
                        templateDialog: false,
                        template: this.emptyTemplate
                    };
                    this.setState(state);
                    this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Template Created', life: 3000 });
                }).catch(error => {
                    console.error('There was an error while adding template!', error);
                });
            }

        }


    }

    deleteTemplate() {
        this.templateService.deleteTemplate(this.state.template).then(data => {
            let templates = this.state.templates.filter(val => val.id !== this.state.template.id);
            this.setState({
                templates,
                deleteTemplateDialog: false,
                template: this.emptyTemplate
            });
            this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Template Deleted', life: 3000 });
        }).catch(error => {
            console.error('There was an error while deleting template!', error);
        });
    }

    deleteSelectedTemplates() {
        this.templateService.deleteTemplates(this.state.selectedTemplates).then(data => {
            let templates = this.state.templates.filter(val => !this.state.selectedTemplates.includes(val));
            this.setState({
                templates,
                deleteTemplateDialog: false,
                selectedTemplate: null
            });
            this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Template Deleted', life: 3000 });
        }).catch(error => {
            console.error('There was an error while deleting mulltiple templates!', error);
        });
    }

    editTemplate(template) {
        this.setState({
            template: { ...template },
            templateDialog: true
        });
    }

    confirmDeleteTemplate(template) {
        this.setState({
            template,
            deleteTemplateDialog: true
        });
    }

    findIndexById(id) {
        let index = -1;
        for (let i = 0; i < this.state.templates.length; i++) {
            if (this.state.templates[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId() {
        return uuid();
    }

    exportCSV() {
        this.dt.exportCSV();
    }

    confirmDeleteSelected() {
        this.setState({ deleteTemplatesDialog: true });
    }

    onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let template = {...this.state.template};
        template[`${name}`] = val;
        this.setState({ template });
    }

    onRoleChange(e){
        let template = {...this.state.template};
        template[`role`] = e.value;
        template[`roleName`] = e.value?e.value.name:'';
        this.setState({ template });
    }

    onUserChange(e){
        let template = {...this.state.template};
        template[`author`] = e.value;
        template[`authorId`] = e.value?e.value.id:'';
        template[`authorName`] = e.value?e.value.username:'';
        this.setState({ template });
    }

    onProblemChange(e){
        let template = {...this.state.template};
        template[`templateProblems`] = e.value;
        template[`problemIds`] = e.value?e.value.map((item)=>item.id):[];
        template[`problemNames`] = e.value?e.value.map((item)=>item.name):[];
        this.setState({ template });
    }

    onInputNumberChange(e, name) {
        const val = e.value || 0;
        let template = {...this.state.template};
        template[`${name}`] = val;

        this.setState({ template });
    }

    leftToolbarTemplate() {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={this.openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={this.confirmDeleteSelected} disabled={!this.state.selectedTemplates || !this.state.selectedTemplates.length} />
            </React.Fragment>
        )
    }

    rightToolbarTemplate() {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={this.exportCSV} />
            </React.Fragment>
        )
    }

    linkable(rowData) {
        return <a style={{cursor: 'pointer', textDecoration: 'underline'}}
                  onClick={this.onClickTemplateCode}>{rowData.code}</a>;
    }

    onClickTemplateCode = (event) => {
        console.log('onClickTemplateCode : ' + event.target.text);
        window.location.assign('templates/' + event.target.text);
    };

    actionBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => this.editTemplate(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteTemplate(rowData)} />
            </React.Fragment>
        );
    }

    render() {
        const header = (
            <div className="table-header">
                <h5 className="p-m-0">Manage Templates</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Search..." />
                </span>
            </div>
        );
        const templateDialogFooter = (
            <React.Fragment>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveTemplate} />
            </React.Fragment>
        );
        const deleteTemplateDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteTemplateDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteTemplate} />
            </React.Fragment>
        );
        const deleteTemplatesDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteTemplatesDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedTemplates} />
            </React.Fragment>
        );

        return (
            <div className="datatable-crud-demo">
                <Toast ref={(el) => this.toast = el} />

                <div className="card">
                    <Toolbar className="p-mb-4" left={this.leftToolbarTemplate} right={this.rightToolbarTemplate}></Toolbar>

                    <DataTable ref={(el) => this.dt = el} value={this.state.templates} selection={this.state.selectedTemplates} onSelectionChange={(e) => this.setState({ selectedTemplates: e.value })}
                               dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                               currentPageReportTemplate="Showing {first} to {last} of {totalRecords} templates"
                               globalFilter={this.state.globalFilter}
                               header={header}>

                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="name" header="Name" sortable></Column>
                        <Column field="roleName" header="Role" sortable></Column>
                        <Column field="definition" header="Definition" sortable></Column>
                        <Column field="authorName" header="Authors" sortable></Column>
                        <Column field="problemNames" header="Problems" sortable></Column>
                        <Column body={this.actionBodyTemplate}></Column>
                    </DataTable>
                </div>
                <Dialog visible={this.state.templateDialog} style={{ width: '500px' }} header="Template Details" modal className="p-fluid" footer={templateDialogFooter} onHide={this.hideDialog}>
                    <div className="p-field">
                        <label htmlFor="name">Template Name</label>
                        <InputText id="name" value={this.state.template.name} onChange={(e) => this.onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.template.name })} />
                        {this.state.submitted && !this.state.template.name && <small className="p-invalid">Template name is required.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="role">Role</label>
                        <Dropdown optionLabel="name" value={this.state.template.role} options={this.roleItems} onChange={(e) => this.onRoleChange(e)} placeholder="Select a Role"/>
                        {this.state.submitted && !this.state.template.role && <small className="p-invalid">Template role is required.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="definition">Definition</label>
                        <InputText id="definition" value={this.state.template.definition} onChange={(e) => this.onInputChange(e, 'definition')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.template.definition })} />
                        {this.state.submitted && !this.state.template.definition && <small className="p-invalid">Template definition is required.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="author">Authors</label>
                        <Dropdown optionLabel="username" value={this.state.template.author} options={this.userItems} onChange={(e) => this.onUserChange(e)} placeholder="Select a Author"/>
                        {this.state.submitted && !this.state.template.author && <small className="p-invalid">Authors are required.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="templateProblems">Problems</label>
                        <MultiSelect id="templateProblems"  display="chip" placeholder="Select Problems" optionLabel="name" value={this.state.template.templateProblems} options={this.problems} onChange={(e) => this.onProblemChange(e)}
                                     className={classNames({ 'p-invalid': this.state.submitted && !this.state.template.templateProblems })}/>
                        {this.state.submitted && !this.state.template.templateProblems && <small className="p-invalid">Problems are required.</small>}
                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteTemplateDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteTemplateDialogFooter} onHide={this.hideDeleteTemplateDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.template && <span>Are you sure you want to delete <b>{this.state.template.name}</b>?</span>}
                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteTemplatesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteTemplatesDialogFooter} onHide={this.hideDeleteTemplatesDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.template && <span>Are you sure you want to delete the selected templates?</span>}
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default TemplateList;
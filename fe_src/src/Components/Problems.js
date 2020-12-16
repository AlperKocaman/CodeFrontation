import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './indexTable.css';

import React, { Component } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ProblemService from "../service/ProblemService";
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import './UserList.css';
import uuid from 'uuid-random';

export class Problems extends Component {

    emptyProblem = {
        id: null,
        name: '',
        code: '',
        creators: {}, // FIXME: creators is a list, should it return "" ?
        type: '',
        category: '',
        difficultyLevel: 0,
        bestCode: '',
        point: 0,
        timeLimit: '',
        memoryLimit: '',
        allowedLanguages: {}  // FIXME: creators is a list, should it return "" ?
    };

    constructor(props) {
        super(props);

        this.state = {
            problems: [],
            problemDialog: false, // FIXME : ne iş yapmakta ?
            deleteProblemDialog: false,
            deleteProblemsDialog: false,
            problem: this.emptyProblem,
            selectedProblems: null,
            submitted: false, // FIXME : ne iş yapmakta ?
            globalFilter: null // FIXME : ne iş yapmakta ?
        };

        this.problemService = new ProblemService();
        this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
        this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);

        this.openNew = this.openNew.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.saveProblem = this.saveProblem.bind(this);
        this.editProblem = this.editProblem.bind(this);
        this.confirmDeleteProblem = this.confirmDeleteProblem.bind(this);
        this.deleteProblem = this.deleteProblem.bind(this);
        this.exportCSV = this.exportCSV.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedProblems = this.deleteSelectedProblems.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputNumberChange = this.onInputNumberChange.bind(this);
        this.hideDeleteProblemDialog = this.hideDeleteProblemDialog.bind(this);
        this.hideDeleteProblemsDialog = this.hideDeleteProblemsDialog.bind(this);
    }

    componentDidMount() {
        this.problemService.getProblems().then(res => {
            this.setState({problems: res.data});
        });
    }

    openNew() {
        this.setState({
            problem: this.emptyProblem,
            submitted: false,
            problemDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            problemDialog: false
        });
    }

    hideDeleteProblemDialog() {
        this.setState({ deleteProblemDialog: false });
    }

    hideDeleteProblemsDialog() {
        this.setState({ deleteProblemsDialog: false });
    }

    saveProblem() {


        if (this.state.problem.name.trim()) {

            if (this.state.problem.id) {
                this.problemService.updateProblem(this.state.problem).then(data => {
                    const index = this.findIndexById(this.state.problem.id);
                    let state = { submitted: true };
                    let problems = [...this.state.problems];
                    let problem = {...this.state.problem};
                    problems[index] = problem;
                    state = {
                        ...state,
                        problems,
                        problemDialog: false,
                        problem: this.emptyProblem
                    };
                    this.setState(state);
                    this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Problem Updated', life: 3000 });
                }).catch(error => {
                    console.error('There was an error while updating problem!', error);
                });
            }
            else {
                this.problemService.addProblem(this.state.problem).then(data => {
                    let state = { submitted: true };
                    let problems = [...this.state.problems];
                    let problem = {...this.state.problem};
                    problem.id = data.data.id;
                    problems.push(problem);

                    state = {
                        ...state,
                        problems,
                        problemDialog: false,
                        problem: this.emptyProblem
                    };
                    this.setState(state);
                    this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Problem Created', life: 3000 });
                }).catch(error => {
                    console.error('There was an error while adding problem!', error);
                });
            }

        }


    }

    deleteProblem() {
        this.problemService.deleteProblem(this.state.problem).then(data => {
            let problems = this.state.problems.filter(val => val.id !== this.state.problem.id);
            this.setState({
                problems,
                deleteProblemDialog: false,
                problem: this.emptyProblem
            });
            this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Problem Deleted', life: 3000 });
        }).catch(error => {
            console.error('There was an error while deleting problem!', error);
        });
    }

    deleteSelectedProblems() {
        this.problemService.deleteProblems(this.state.selectedProblems).then(data => {
            let problems = this.state.problems.filter(val => !this.state.selectedProblems.includes(val));
            this.setState({
                problems,
                deleteProblemDialog: false,
                selectedProblem: null
            });
            this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Problem Deleted', life: 3000 });
        }).catch(error => {
            console.error('There was an error while deleting mulltiple problems!', error);
        });
    }

    editProblem(problem) {
        this.setState({
            problem: { ...problem },
            problemDialog: true
        });
    }

    confirmDeleteProblem(problem) {
        this.setState({
            problem,
            deleteProblemDialog: true
        });
    }

    findIndexById(id) {
        let index = -1;
        for (let i = 0; i < this.state.problems.length; i++) {
            if (this.state.problems[i].id === id) {
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
        this.setState({ deleteProblemsDialog: true });
    }

    // FIXME : asagidaki methodlar ??
    onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let problem = {...this.state.problem};
        problem[`${name}`] = val;

        this.setState({ problem });
    }

    onInputNumberChange(e, name) {
        const val = e.value || 0;
        let problem = {...this.state.problem};
        problem[`${name}`] = val;

        this.setState({ problem });
    }

    leftToolbarTemplate() {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={this.openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={this.confirmDeleteSelected} disabled={!this.state.selectedProblems || !this.state.selectedProblems.length} />
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

    actionBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => this.editProblem(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteProblem(rowData)} />
            </React.Fragment>
        );
    }

    render() {
        const header = (
            <div className="table-header">
                <h5 className="p-m-0">Manage Users</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Search..." />
                </span>
            </div>
        );
        const userDialogFooter = (
            <React.Fragment>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveUser} />
            </React.Fragment>
        );
        const deleteUserDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteUserDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteUser} />
            </React.Fragment>
        );
        const deleteUsersDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteUsersDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedUsers} />
            </React.Fragment>
        );

        return (
            <div className="datatable-crud-demo">
                <Toast ref={(el) => this.toast = el} />

                <div className="card">
                    <Toolbar className="p-mb-4" left={this.leftToolbarTemplate} right={this.rightToolbarTemplate}></Toolbar>

                    <DataTable ref={(el) => this.dt = el} value={this.state.users} selection={this.state.selectedUsers} onSelectionChange={(e) => this.setState({ selectedUsers: e.value })}
                               dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                               currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                               globalFilter={this.state.globalFilter}
                               header={header}>

                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="username" header="Username" sortable></Column>
                        <Column field="firstName" header="First Name" sortable></Column>
                        <Column field="lastName" header="Last Name" sortable></Column>

                        <Column field="email" header="E-mail" sortable></Column>

                        <Column field="targetRole" header="Target Role" sortable></Column>
                        <Column field="targetProject" header="Target Project" sortable></Column>
                        <Column field="skills" header="Skills" sortable></Column>

                        <Column body={this.actionBodyTemplate}></Column>
                    </DataTable>
                </div>

                <Dialog visible={this.state.userDialog} style={{ width: '450px' }} header="User Details" modal className="p-fluid" footer={userDialogFooter} onHide={this.hideDialog}>
                    <div className="p-field">
                        <label htmlFor="username">Username</label>
                        <InputText id="username" value={this.state.user.username} onChange={(e) => this.onInputChange(e, 'username')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.user.username })} />
                        {this.state.submitted && !this.state.user.username && <small className="p-invalid">Username is required.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="firstName">First Name</label>
                        <InputText id="firstName" value={this.state.user.firstName} onChange={(e) => this.onInputChange(e, 'firstName')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.user.firstName })} />
                        {this.state.submitted && !this.state.user.firstName && <small className="p-invalid">First Name is required.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="lastName">Last Name</label>
                        <InputText id="lastName" value={this.state.user.lastName} onChange={(e) => this.onInputChange(e, 'lastName')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.user.lastName })} />
                        {this.state.submitted && !this.state.user.lastName && <small className="p-invalid">Last Name is required.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="email">E-mail</label>
                        <InputText id="email" value={this.state.user.email} onChange={(e) => this.onInputChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.user.email })} />
                        {this.state.submitted && !this.state.user.email && <small className="p-invalid">E-mail is required.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="isAdmin">Admin Status</label>
                        <InputText id="isAdmin" value={this.state.user.isAdmin} onChange={(e) => this.onInputChange(e, 'isAdmin')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.user.isAdmin })} />
                        {this.state.submitted && !this.state.user.isAdmin && <small className="p-invalid">Admin Status is required.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="targetRole">Target Role</label>
                        <InputText id="targetRole" value={this.state.user.targetRole} onChange={(e) => this.onInputChange(e, 'targetRole')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.user.targetRole })} />
                        {this.state.submitted && !this.state.user.targetRole && <small className="p-invalid">Target Role is required.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="targetProject">Target Project</label>
                        <InputText id="targetProject" value={this.state.user.targetProject} onChange={(e) => this.onInputChange(e, 'targetProject')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.user.targetProject })} />
                        {this.state.submitted && !this.state.user.targetProject && <small className="p-invalid">Target Project is required.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="skills">Skills</label>
                        <InputText id="skills" value={this.state.user.skills} onChange={(e) => this.onInputChange(e, 'skills')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.user.skills })} />
                        {this.state.submitted && !this.state.user.skills && <small className="p-invalid">Skills is required.</small>}
                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteUserDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={this.hideDeleteUserDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.user && <span>Are you sure you want to delete <b>{this.state.user.username}</b>?</span>}
                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteUsersDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUsersDialogFooter} onHide={this.hideDeleteUsersDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.user && <span>Are you sure you want to delete the selected users?</span>}
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default Problems;
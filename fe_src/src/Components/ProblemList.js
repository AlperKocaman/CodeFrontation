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
import {MultiSelect} from "primereact/multiselect";

export class ProblemList extends Component {

    emptyProblem = {
        id: null,
        name: '',
        code: '',
        author: '',
        type: '',
        category: '',
        difficultyLevel: 0,
        bestCode: '',
        timeLimit: 0,
        memoryLimit: '',
        allowedLanguages: ''
    };

    constructor(props) {
        super(props);

        this.state = {
            problems: [],
            problemDialog: false,
            deleteProblemDialog: false,
            deleteProblemsDialog: false,
            problem: this.emptyProblem,
            selectedProblems: null,
            submitted: false,
            globalFilter: null
        };

        this.languages = [
            {language: 'JAVA'},
            {language: 'PYTHON'},
            {language: 'CPP'},
            {language: 'C'},
            {language: 'C#'},
            {language: 'JAVASCRIPT'},
            {language: 'PHP'},
            {language: 'GO'},
            {language: 'HASKELL'},
            {language: 'SCALA'},
            {language: 'KOTLIN'},
            {language: 'SWIFT'},
            {language: 'OBJECTIVE_C'},
            {language: 'TYPESCRIPT'},
            {language: 'RUBY'},
            {language: 'HTML'},
            {language: 'CSS'}
        ];

        this.problemService = new ProblemService();
        this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
        this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);

        this.linkable = this.linkable.bind(this);
        this.onClickProblemCode = this.onClickProblemCode.bind(this);
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

    linkable(rowData) {
        return <a style={{cursor: 'pointer', textDecoration: 'underline'}}
                  onClick={this.onClickProblemCode}>{rowData.code}</a>;
    }

    onClickProblemCode = (event) => {
        console.log('onClickProblemCode : ' + event.target.text);
        window.location.assign('problems/' + event.target.text);
    };

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
                <h5 className="p-m-0">Manage Problems</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Search..." />
                </span>
            </div>
        );
        const problemDialogFooter = (
            <React.Fragment>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveProblem} />
            </React.Fragment>
        );
        const deleteProblemDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteProblemDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteProblem} />
            </React.Fragment>
        );
        const deleteProblemsDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteProblemsDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedProblems} />
            </React.Fragment>
        );

        return (
            <div className="datatable-crud-demo">
                <Toast ref={(el) => this.toast = el} />

                <div className="card">
                    <Toolbar className="p-mb-4" left={this.leftToolbarTemplate} right={this.rightToolbarTemplate}></Toolbar>

                    <DataTable ref={(el) => this.dt = el} value={this.state.problems} selection={this.state.selectedProblems} onSelectionChange={(e) => this.setState({ selectedProblems: e.value })}
                               dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                               currentPageReportTemplate="Showing {first} to {last} of {totalRecords} problems"
                               globalFilter={this.state.globalFilter}
                               header={header}>

                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="code" body={this.linkable} header="Problem Code" sortable></Column>
                        <Column field="name" header="Problem Name" sortable></Column>
                        <Column field="author" header="Author" sortable></Column>
                        <Column field="type" header="Problem Type" sortable></Column>
                        <Column field="category" header="Category" sortable></Column>
                        <Column field="difficultyLevel" header="Difficulty" sortable></Column>
                        <Column field="timeLimit" header="Time Limit" sortable></Column>
                        <Column field="memoryLimit" header="Memory Limit" sortable></Column>
                        <Column field="allowedLanguages" header="Allowed Languages" sortable></Column>

                        <Column body={this.actionBodyTemplate}></Column>
                    </DataTable>
                </div>
                <Dialog visible={this.state.problemDialog} style={{ width: '500px' }} header="Problem Details" modal className="p-fluid" footer={problemDialogFooter} onHide={this.hideDialog}>
                    <div className="p-field">
                        <label htmlFor="code">Problem Code</label>
                        <InputText id="code" value={this.state.problem.code} onChange={(e) => this.onInputChange(e, 'code')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.problem.code })} />
                        {this.state.submitted && !this.state.problem.code && <small className="p-invalid">Problem code is required.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="name">Problem Name</label>
                        <InputText id="name" value={this.state.problem.name} onChange={(e) => this.onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.problem.name })} />
                        {this.state.submitted && !this.state.problem.name && <small className="p-invalid">Problem name is required.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="author">Authors</label>
                        <InputText id="author" value={this.state.problem.author} onChange={(e) => this.onInputChange(e, 'author')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.problem.author })} />
                        {this.state.submitted && !this.state.problem.author && <small className="p-invalid">Authors are required.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="type">Problem Type</label>
                        <InputText id="type" value={this.state.problem.type} onChange={(e) => this.onInputChange(e, 'type')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.problem.type })} />
                        {this.state.submitted && !this.state.problem.type && <small className="p-invalid">Problem type is required.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="category">Problem Category</label>
                        <InputText id="category" value={this.state.problem.category} onChange={(e) => this.onInputChange(e, 'category')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.problem.category })} />
                        {this.state.submitted && !this.state.problem.category && <small className="p-invalid">Problem category is required.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="difficultyLevel">Difficulty Level</label>
                        <InputText id="difficultyLevel" value={this.state.problem.difficultyLevel} onChange={(e) => this.onInputChange(e, 'difficultyLevel')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.problem.difficultyLevel })} />
                        {this.state.submitted && !this.state.problem.difficultyLevel && <small className="p-invalid">Problem difficulty level is required.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="timeLimit">Time Limit</label>
                        <InputText id="timeLimit" value={this.state.problem.timeLimit} onChange={(e) => this.onInputChange(e, 'timeLimit')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.problem.timeLimit })} />
                        {this.state.submitted && !this.state.problem.timeLimit && <small className="p-invalid">Problem time limit is required.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="memoryLimit">Memory Limit</label>
                        <InputText id="memoryLimit" value={this.state.problem.memoryLimit} onChange={(e) => this.onInputChange(e, 'memoryLimit')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.problem.memoryLimit })} />
                        {this.state.submitted && !this.state.problem.memoryLimit && <small className="p-invalid">Problem memory limit is required.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="allowedLanguages">Allowed Languages</label>
                        <MultiSelect id="allowedLanguages"  display="chip" placeholder="Select Language/s" optionLabel="language" value={this.state.problem.allowedLanguages} options={this.languages} onChange={(e) => this.onInputChange(e, 'allowedLanguages')}
                                     className={classNames({ 'p-invalid': this.state.submitted && !this.state.problem.allowedLanguages })}/>
                        {this.state.submitted && !this.state.problem.allowedLanguages && <small className="p-invalid">Allowed languages is required.</small>}
                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteProblemDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProblemDialogFooter} onHide={this.hideDeleteProblemDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.problem && <span>Are you sure you want to delete <b>{this.state.problem.name}</b>?</span>}
                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteProblemsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProblemsDialogFooter} onHide={this.hideDeleteProblemsDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.problem && <span>Are you sure you want to delete the selected problems?</span>}
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default ProblemList;
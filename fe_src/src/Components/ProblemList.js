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
import {auth, generateUserDocument} from "./Firebase";

export class ProblemList extends Component {

    emptyProblem = {
        id: null,
        name: '',
        code: '',
        author: '',
        category: '',
        difficultyLevel: 0,
        bestCode: '',
        inputs: '',
        inputSpecification:'',
        outputs: '',
        outputSpecification:'',
        sampleInputs:'',
        sampleOutputs:'',
        explanation:'',
        point: 0,
        description: '',
        timeLimit: 0,
        memoryLimit: '',
        allowedLanguages: null
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
            globalFilter: null,
            authenticateUser: null,
            token: ''
        };



        this.problemService = new ProblemService();
        this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
        this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);

        this.linkable = this.linkable.bind(this);
        this.onClickProblemCode = this.onClickProblemCode.bind(this);
        this.openNew = this.openNew.bind(this);

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

    componentDidMount = async () => {
        auth.onAuthStateChanged(async userAuth => {
            const user = await generateUserDocument(userAuth);
            if (userAuth) {
                userAuth.getIdToken().then(idToken =>  {
                    this.setState({'token': idToken });
                    this.problemService.getProblems(this.props.username ? this.props.username : '',idToken).then(res => {
                        this.setState({problems: res.data});
                    });
                });
            }
            this.setState({'authenticateUser': user });
        });


    }

    openNew() {
        console.log('onClickProblemListAdd');
        window.location.assign('/admin/problems/addProblem/');
    }

    hideDeleteProblemDialog() {
        this.setState({ deleteProblemDialog: false });
    }

    hideDeleteProblemsDialog() {
        this.setState({ deleteProblemsDialog: false });
    }

    deleteProblem() {
        this.problemService.deleteProblem(this.state.problem, this.state.token).then(data => {
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
        this.problemService.deleteProblems(this.state.selectedProblems, this.state.token).then(data => {
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
        console.log('onClickProblemListEdit');
        window.location.assign('/admin/problems/addProblem/' + problem.code);
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
        window.location.assign('/admin/problems/problemKey/' + event.target.text);
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
                               header={header} resizableColumns columnResizeMode="fit" >

                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="code" body={this.linkable} header="Problem Code" sortable></Column>
                        <Column field="name" header="Problem Name" sortable></Column>
                        <Column field="author" header="Author" sortable></Column>
                        <Column field="category" header="Category" sortable></Column>
                        <Column field="difficultyLevel" header="Difficulty" sortable></Column>
                        <Column field="timeLimit" header="Time Limit" sortable></Column>
                        <Column field="memoryLimit" header="Memory Limit" sortable></Column>
                        <Column field="allowedLanguages" header="Allowed Languages" sortable></Column>

                        <Column body={this.actionBodyTemplate}></Column>
                    </DataTable>
                </div>
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
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './indexTable.css';

import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import SubmissionService from '../service/SubmissionService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import './SubmissionList.css';
import uuid from 'uuid-random';
import { Fieldset } from 'primereact/fieldset';
import {auth, generateUserDocument} from "./Firebase";


export class SubmissionList extends Component {

  emptySubmission = {
    id: null,
    problemCode: '',
    name: '',
    user: '',
    language: false,
    time: '',
    memory: '',
    point: '',
    status: '',
    result: '',
    sonarUrl: ''
  };

  constructor(props) {
    super(props);

    this.state = {
      submissions: [],
      submissionDialog: false,
      deleteSubmissionDialog: false,
      deleteSubmissionsDialog: false,
      submission: this.emptySubmission,
      selectedSubmissions: null,
      submitted: false,
      globalFilter: null,
      sonarDialog: false,
      commentDialog: false,
      comment: null,
      sonarComplexityResults: [],
      sonarDuplicationResults: [],
      sonarMaintainabilityResults: [],
      sonarReliabilityResults: [],
      sonarSecurityResults: [],
      sonarSizeResults: [],
      authenticateUser: null
    };

    this.submissionService = new SubmissionService();
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);

    this.linkable = this.linkable.bind(this);
    this.openNew = this.openNew.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.editSubmission = this.editSubmission.bind(this);
    this.confirmDeleteSubmission = this.confirmDeleteSubmission.bind(this);
    this.deleteSubmission = this.deleteSubmission.bind(this);
    this.exportCSV = this.exportCSV.bind(this);
    this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
    this.deleteSelectedSubmissions = this.deleteSelectedSubmissions.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputNumberChange = this.onInputNumberChange.bind(this);
    this.hideDeleteSubmissionDialog = this.hideDeleteSubmissionDialog.bind(this);
    this.hideDeleteSubmissionsDialog = this.hideDeleteSubmissionsDialog.bind(this);
    this.addSonarInspectButton = this.addSonarInspectButton.bind(this);
    this.hideSonarDialog = this.hideSonarDialog.bind(this);
  }

  componentDidMount = async () => {
    auth.onAuthStateChanged(async userAuth => {
      const user = await generateUserDocument(userAuth);
      this.setState({'authenticateUser': user });
    });
    if (this.props.username && !this.props.problemCode) {
      this.submissionService.getSubmissions(this.props.username).then(res => {
        this.setState({ submissions: res.data });
      });
    }
    else if (this.props.problemCode && this.props.username) {
      this.submissionService.getSubmissionsByUsernameAndProblemCode(this.props.username, this.props.problemCode).then(res => {
        this.setState({ submissions: res.data });
      })
    }
    else {
      this.submissionService.getSubmissions('').then(res => {
        this.setState({ submissions: res.data });
      });
    }
  }

  openNew() {
    this.setState({
      submission: this.emptySubmission,
      submitted: false,
      submissionDialog: true
    });
  }

  hideDialog() {
    this.setState({
      submitted: false,
      submissionDialog: false
    });
  }

  hideDeleteSubmissionDialog() {
    this.setState({ deleteSubmissionDialog: false });
  }

  hideDeleteSubmissionsDialog() {
    this.setState({ deleteSubmissionsDialog: false });
  }


  deleteSubmission() {
    this.submissionService.deleteSubmission(this.state.submission).then(data => {
      let submissions = this.state.submissions.filter(val => val.id !== this.state.submission.id);
      this.setState({
        submissions,
        deleteSubmissionDialog: false,
        submission: this.emptySubmission
      });
      this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Submission Deleted', life: 3000 });
    }).catch(error => {
      console.error('There was an error!', error);
    });
  }

  deleteSelectedSubmissions() {
    this.submissionService.deleteSubmissions(this.state.selectedSubmissions).then(data => {
      let submissions = this.state.submissions.filter(val => !this.state.selectedSubmissions.includes(val));
      this.setState({
        submissions,
        deleteSubmissionsDialog: false,
        selectedSubmissions: null
      });
      this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Submissions Deleted', life: 3000 });
    }).catch(error => {
      console.error('There was an error!', error);
    });
  }

  editSubmission(submission) {
    this.setState({
      submission: { ...submission },
      submissionDialog: true
    });
  }

  confirmDeleteSubmission(submission) {
    this.setState({
      submission,
      deleteSubmissionDialog: true
    });
  }

  findIndexById(id) {
    let index = -1;
    for (let i = 0; i < this.state.submissions.length; i++) {
      if (this.state.submissions[i].id === id) {
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
    this.setState({ deleteSubmissionsDialog: true });
  }

  onInputChange(e, name) {
    const val = (e.target && e.target.value) || '';
    let submission = { ...this.state.submission };
    submission[`${name}`] = val;

    this.setState({ submission });
  }

  onInputNumberChange(e, name) {
    const val = e.value || 0;
    let submission = { ...this.state.submission };
    submission[`${name}`] = val;

    this.setState({ submission });
  }

  linkable(rowData) {
    if (!this.props.username) {
      return <a style={{ cursor: 'pointer', textDecoration: 'underline' }}
        onClick={this.onClickUsername}>{rowData.username}</a>;
    } else {
      return <a>{rowData.username}</a>
    }
  }

  onClickUsername = (event) => {
    console.log('onClickUsername : ' + event.target.text);
    window.location.assign('/admin/submissions/' + event.target.text);
  };

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
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => this.editSubmission(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteSubmission(rowData)} />
      </React.Fragment>
    );
  }

  addSonarInspectButton(rowData) {
    return (
      <Button type="button" icon="pi pi-chart-bar" className="p-button-rounded p-button-text" onClick={() => this.openSonarDialog(rowData)} />
    );
  }

  openSonarDialog(submission) {
    this.submissionService.getSonarMetrics(submission).then(res =>
      this.setState({
        submission: { ...submission },
        sonarComplexityResults: res[0].data.component.measures,
        sonarDuplicationResults: res[1].data.component.measures,
        sonarMaintainabilityResults: res[2].data.component.measures,
        sonarReliabilityResults: res[3].data.component.measures,
        sonarSecurityResults: res[4].data.component.measures,
        sonarSizeResults: res[5].data.component.measures,
        sonarDialog: true
      })).catch(error => {
        console.error('There was an error!', error);
      });
  }

  hideSonarDialog() {
    this.setState({
      sonarDialog: false
    });
  }

  commentBodyTemplate = (rowData) => {
    if (!rowData.comment) {
      return (
        <Button type="button" icon="pi pi-plus-circle" className="p-button-rounded p-button-success p-button-text" onClick={() => this.openCommentDialog(rowData.comment)} />
      );
    } else {
      return (
        <Button type="button" icon="pi pi-comment" className="p-button-rounded p-button-text" onClick={() => this.openCommentDialog(rowData.comment)} />
      );
    }

  }

  openCommentDialog = (comment) => {
    this.setState({ commentDialog: true, comment: comment })
  }

  hideCommentDialog = () => {
    this.setState({
      commentDialog: false
    });
  }

  render() {
    const header = (
      <div className="table-header">
        <h5 className="p-m-0">Submissions</h5>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Search..." />
        </span>
      </div>
    );

    const deleteSubmissionDialogFooter = (
      <React.Fragment>
        <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteSubmissionDialog} />
        <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSubmission} />
      </React.Fragment>
    );
    const deleteSubmissionsDialogFooter = (
      <React.Fragment>
        <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteSubmissionsDialog} />
        <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedSubmissions} />
      </React.Fragment>
    );

    return (
      <div className="datatable-crud-demo">
        <Toast ref={(el) => this.toast = el} />

        <div className="card">
          <Toolbar className="p-mb-4" right={this.rightToolbarTemplate}></Toolbar>

          <DataTable ref={(el) => this.dt = el} value={this.state.submissions} selection={this.state.selectedSubmissions} onSelectionChange={(e) => this.setState({ selectedSubmissions: e.value })}
            dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} submissions"
            globalFilter={this.state.globalFilter}
            header={header}>

            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
            <Column field="id" header="Id" sortable></Column>
            <Column field="problemCode" header="Problem Code" sortable></Column>
            <Column field="name" header="Name" sortable></Column>

            <Column field="username" body={this.linkable} header="User" sortable></Column>
            <Column field="language" header="Language" sortable></Column>
            <Column field="time" header="Time" sortable></Column>
            <Column field="memory" header="Memory" sortable></Column>
            <Column field="point" header="Point" sortable></Column>
            <Column field="status" header="Status" sortable></Column>
            <Column field="result" header="Result" sortable></Column>
            <Column field={this.addSonarInspectButton} header="Sonar"></Column>
            <Column field="comment" header="Comment" body={this.commentBodyTemplate} ></Column>

            <Column body={this.actionBodyTemplate}></Column>
          </DataTable>
        </div>

        <Dialog visible={this.state.sonarDialog} style={{ width: '1000px' }} header="Sonar Analysis Details" modal className="p-fluid" onHide={this.hideSonarDialog}>
          <Fieldset legend="Complexity Metrics" toggleable>
            <DataTable ref={(el) => this.dt = el} value={this.state.sonarComplexityResults} dataKey="id" >
              <Column field="metric" header="Metrics" ></Column>
              <Column field="value" header="Values" ></Column>
            </DataTable>
          </Fieldset>
          <p></p>
          <Fieldset legend="Duplication Metrics" toggleable>
            <DataTable ref={(el) => this.dt = el} value={this.state.sonarDuplicationResults} dataKey="id" >
              <Column field="metric" header="Metrics" ></Column>
              <Column field="value" header="Values" ></Column>
            </DataTable>
          </Fieldset>
          <p></p>
          <Fieldset legend="Maintainability Metrics" toggleable>
            <DataTable ref={(el) => this.dt = el} value={this.state.sonarMaintainabilityResults} dataKey="id" >
              <Column field="metric" header="Metrics" ></Column>
              <Column field="value" header="Values" ></Column>
            </DataTable>
          </Fieldset>
          <p></p>
          <Fieldset legend="Reliability Metrics" toggleable>
            <DataTable ref={(el) => this.dt = el} value={this.state.sonarReliabilityResults} dataKey="id" >
              <Column field="metric" header="Metrics" ></Column>
              <Column field="value" header="Values" ></Column>
            </DataTable>
          </Fieldset>
          <p></p>
          <Fieldset legend="Security Metrics" toggleable>
            <DataTable ref={(el) => this.dt = el} value={this.state.sonarSecurityResults} dataKey="id" >
              <Column field="metric" header="Metrics" ></Column>
              <Column field="value" header="Values" ></Column>
            </DataTable>
          </Fieldset>
          <p></p>
          <Fieldset legend="Size Metrics" toggleable>
            <DataTable ref={(el) => this.dt = el} value={this.state.sonarSizeResults} dataKey="id" >
              <Column field="metric" header="Metrics" ></Column>
              <Column field="value" header="Values" ></Column>
            </DataTable>
          </Fieldset>
          <br />
          <p>If you want to look further details, you can proceed to
                        <a style={{ cursor: 'pointer', textDecoration: 'underline' }} href={this.state.submission.sonarUrl}> SonarQube page of this submission !</a></p>
        </Dialog>

        <Dialog header="Comment" visible={this.state.commentDialog} maximizable modal style={{ width: '30vw' }} onHide={this.hideCommentDialog}>
          <div>{ }</div>
        </Dialog>


        <Dialog visible={this.state.deleteSubmissionDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteSubmissionDialogFooter} onHide={this.hideDeleteSubmissionDialog}>
          <div className="confirmation-content">
            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
            {this.state.submission && <span>Are you sure you want to delete <b>{this.state.submission.id}</b>?</span>}
          </div>
        </Dialog>

        <Dialog visible={this.state.deleteSubmissionsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteSubmissionsDialogFooter} onHide={this.hideDeleteSubmissionsDialog}>
          <div className="confirmation-content">
            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
            {this.state.submission && <span>Are you sure you want to delete the selected submissions?</span>}
          </div>
        </Dialog>
      </div>
    );
  }
}

export default SubmissionList
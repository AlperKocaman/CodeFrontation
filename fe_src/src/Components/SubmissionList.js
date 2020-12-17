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
import './UserList.css';
import uuid from 'uuid-random';

export class SubmissionList extends Component {

  emptySubmission = {
    id: null,
    problemCode: '',
    name: '',
    user: '',
    language: false,
    time: '',
    memory: '',
    points: ''
  };

  constructor(props) {
    super(props);

    this.state = {
      submissions: [],
      userDialog: false,
      deleteSubmissionDialog: false,
      deleteSubmissionsDialog: false,
      submission: this.emptySubmission,
      selectedSubmissions: null,
      submitted: false,
      globalFilter: null
    };

    this.submissionService = new SubmissionService();
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);

    this.openNew = this.openNew.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.editUser = this.editUser.bind(this);
    this.confirmDeleteUser = this.confirmDeleteUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.exportCSV = this.exportCSV.bind(this);
    this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
    this.deleteSelectedUsers = this.deleteSelectedUsers.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputNumberChange = this.onInputNumberChange.bind(this);
    this.hideDeleteUserDialog = this.hideDeleteUserDialog.bind(this);
    this.hideDeleteUsersDialog = this.hideDeleteUsersDialog.bind(this);
  }

  componentDidMount() {
    this.submissionService.getSubmissions().then(res => {
      this.setState({ submissions: res.data });
    });
  }

  openNew() {
    this.setState({
      user: this.emptySubmission,
      submitted: false,
      userDialog: true
    });
  }

  hideDialog() {
    this.setState({
      submitted: false,
      userDialog: false
    });
  }

  hideDeleteUserDialog() {
    this.setState({ deleteUserDialog: false });
  }

  hideDeleteUsersDialog() {
    this.setState({ deleteUsersDialog: false });
  }


  deleteUser() {
    this.submissionService.deleteUser(this.state.submission).then(data => {
      let users = this.state.submissions.filter(val => val.id !== this.state.submission.id);
      this.setState({
        users,
        deleteUserDialog: false,
        user: this.emptySubmission
      });
      this.toast.show({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
    }).catch(error => {
      console.error('There was an error!', error);
    });
  }

  deleteSelectedUsers() {
    this.submissionService.deleteUsers(this.state.selectedSubmissions).then(data => {
      let users = this.state.submissions.filter(val => !this.state.selectedSubmissions.includes(val));
      this.setState({
        users,
        deleteUsersDialog: false,
        selectedUsers: null
      });
      this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
    }).catch(error => {
      console.error('There was an error!', error);
    });
  }

  editUser(user) {
    this.setState({
      user: { ...user },
      userDialog: true
    });
  }

  confirmDeleteUser(user) {
    this.setState({
      user,
      deleteUserDialog: true
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
    this.setState({ deleteUsersDialog: true });
  }

  onInputChange(e, name) {
    const val = (e.target && e.target.value) || '';
    let user = { ...this.state.submission };
    user[`${name}`] = val;

    this.setState({ user });
  }

  onInputNumberChange(e, name) {
    const val = e.value || 0;
    let user = { ...this.state.submission };
    user[`${name}`] = val;

    this.setState({ user });
  }

  rightToolbarTemplate() {
    return (
      <React.Fragment>
        <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" />
        <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={this.exportCSV} />
      </React.Fragment>
    )
  }

  statusBodyTemplate(rowData) {
    return <span className={`user-badge status-${rowData.isAdmin ? 'admin' : 'user'}`}>{rowData.isAdmin ? 'ADMIN' : 'USER'}</span>;
  }
  actionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => this.editUser(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteUser(rowData)} />
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
          <Toolbar className="p-mb-4" right={this.rightToolbarTemplate}></Toolbar>

          <DataTable ref={(el) => this.dt = el} value={this.state.submissions} selection={this.state.selectedSubmissions} onSelectionChange={(e) => this.setState({ selectedUsers: e.value })}
            dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
            globalFilter={this.state.globalFilter}
            header={header}>

            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
            <Column field="id" header="Id" sortable></Column>
            <Column field="problemCode" header="Problem Code" sortable></Column>
            <Column field="name" header="Name" sortable></Column>

            <Column field="user" header="User" sortable></Column>
            <Column field="language" header="Language" body={this.statusBodyTemplate} sortable></Column>
            <Column field="time" header="Time" sortable></Column>
            <Column field="memory" header="Memory" sortable></Column>
            <Column field="points" header="Points" sortable></Column>
            <Column field="status" header="Status" sortable></Column>
            <Column field="result" header="Result" sortable></Column>
            <Column field="sonar" header="Sonar" sortable></Column>

            <Column body={this.actionBodyTemplate}></Column>
          </DataTable>
        </div>

        <Dialog visible={this.state.deleteSubmissionDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={this.hideDeleteUserDialog}>
          <div className="confirmation-content">
            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
            {this.state.submission && <span>Are you sure you want to delete <b>{this.state.submission.id}</b>?</span>}
          </div>
        </Dialog>

        <Dialog visible={this.state.deleteSubmissionsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUsersDialogFooter} onHide={this.hideDeleteUsersDialog}>
          <div className="confirmation-content">
            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
            {this.state.submission && <span>Are you sure you want to delete the selected users?</span>}
          </div>
        </Dialog>
      </div>
    );
  }
}

export default SubmissionList
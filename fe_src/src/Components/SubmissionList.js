import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './indexTable.css';

import React, { Component } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import UserService from '../service/UserService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import './UserList.css';
import uuid from 'uuid-random';

export class SubmissionList extends Component {

  emptyUser = {
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
      users: [],
      userDialog: false,
      deleteUserDialog: false,
      deleteUsersDialog: false,
      user: this.emptyUser,
      selectedUsers: null,
      submitted: false,
      globalFilter: null
    };

    this.userService = new UserService();
    this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);

    this.openNew = this.openNew.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.saveUser = this.saveUser.bind(this);
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
    this.userService.getUsers().then(res => {
      this.setState({users: res.data});
    });
  }

  openNew() {
    this.setState({
      user: this.emptyUser,
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

  saveUser() {


    if (this.state.user.id.trim()) {

      if (this.state.user.id) {
        this.userService.updateUser(this.state.user).then(data => {
          const index = this.findIndexById(this.state.user.id);
          let state = { submitted: true };
          let users = [...this.state.users];
          let user = {...this.state.user};
          users[index] = user;
          state = {
            ...state,
            users,
            userDialog: false,
            user: this.emptyUser
          };
          this.setState(state);
          this.toast.show({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
        }).catch(error => {
          console.error('There was an error!', error);
        });
      }
      else {
        this.userService.addUser(this.state.user).then(data => {
          let state = { submitted: true };
          let users = [...this.state.users];
          let user = {...this.state.user};
          user.id = data.data.id;
          users.push(user);

          state = {
            ...state,
            users,
            userDialog: false,
            user: this.emptyUser
          };
          this.setState(state);
          this.toast.show({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
        }).catch(error => {
          console.error('There was an error!', error);
        });
      }

    }


  }

  deleteUser() {
    this.userService.deleteUser(this.state.user).then(data => {
      let users = this.state.users.filter(val => val.id !== this.state.user.id);
      this.setState({
        users,
        deleteUserDialog: false,
        user: this.emptyUser
      });
      this.toast.show({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
    }).catch(error => {
      console.error('There was an error!', error);
    });
  }

  deleteSelectedUsers() {
    this.userService.deleteUsers(this.state.selectedUsers).then(data => {
      let users = this.state.users.filter(val => !this.state.selectedUsers.includes(val));
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
    for (let i = 0; i < this.state.users.length; i++) {
      if (this.state.users[i].id === id) {
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
    let user = {...this.state.user};
    user[`${name}`] = val;

    this.setState({ user });
  }

  onInputNumberChange(e, name) {
    const val = e.value || 0;
    let user = {...this.state.user};
    user[`${name}`] = val;

    this.setState({ user });
  }

  leftToolbarTemplate() {
    return (
        <React.Fragment>
          <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={this.openNew} />
          <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={this.confirmDeleteSelected} disabled={!this.state.selectedUsers || !this.state.selectedUsers.length} />
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

  statusBodyTemplate(rowData) {
    return <span className={`user-badge status-${rowData.isAdmin ?  'admin' :'user'}`}>{rowData.isAdmin ?  'ADMIN' :'USER'}</span>;
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

          <Dialog visible={this.state.userDialog} style={{ width: '450px' }} header="User Details" modal className="p-fluid" footer={userDialogFooter} onHide={this.hideDialog}>
            <div className="p-field">
              <label htmlFor="id">Id</label>
              <InputText id="id" value={this.state.user.id} onChange={(e) => this.onInputChange(e, 'id')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.user.id })} />
              {this.state.submitted && !this.state.user.id && <small className="p-invalid">Id is required.</small>}
            </div>
            <div className="p-field">
              <label htmlFor="problemCode">Problem Code</label>
              <InputText id="problemCode" value={this.state.user.problemCode} onChange={(e) => this.onInputChange(e, 'problemCode')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.user.problemCode })} />
              {this.state.submitted && !this.state.user.problemCode && <small className="p-invalid">Problem Code is required.</small>}
            </div>
            <div className="p-field">
              <label htmlFor="name">Name</label>
              <InputText id="name" value={this.state.user.name} onChange={(e) => this.onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.user.name })} />
              {this.state.submitted && !this.state.user.name && <small className="p-invalid">Name is required.</small>}
            </div>
            <div className="p-field">
              <label htmlFor="user">User</label>
              <InputText id="user" value={this.state.user.user} onChange={(e) => this.onInputChange(e, 'user')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.user.user })} />
              {this.state.submitted && !this.state.user.user && <small className="p-invalid">User is required.</small>}
            </div>
            <div className="p-field">
              <label htmlFor="language">Language</label>
              <InputText id="language" value={this.state.user.language} onChange={(e) => this.onInputChange(e, 'language')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.user.language })} />
              {this.state.submitted && !this.state.user.language && <small className="p-invalid">Language is required.</small>}
            </div>
            <div className="p-field">
              <label htmlFor="time">Time</label>
              <InputText id="time" value={this.state.user.time} onChange={(e) => this.onInputChange(e, 'time')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.user.time })} />
              {this.state.submitted && !this.state.user.time && <small className="p-invalid">Time is required.</small>}
            </div>
            <div className="p-field">
              <label htmlFor="memory">Memory</label>
              <InputText id="memory" value={this.state.user.memory} onChange={(e) => this.onInputChange(e, 'memory')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.user.memory })} />
              {this.state.submitted && !this.state.user.memory && <small className="p-invalid">Memory is required.</small>}
            </div>
            <div className="p-field">
              <label htmlFor="points">Points</label>
              <InputText id="points" value={this.state.user.points} onChange={(e) => this.onInputChange(e, 'points')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.user.points })} />
              {this.state.submitted && !this.state.user.points && <small className="p-invalid">Points is required.</small>}
            </div>
          </Dialog>

          <Dialog visible={this.state.deleteUserDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={this.hideDeleteUserDialog}>
            <div className="confirmation-content">
              <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
              {this.state.user && <span>Are you sure you want to delete <b>{this.state.user.id}</b>?</span>}
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

export default SubmissionList
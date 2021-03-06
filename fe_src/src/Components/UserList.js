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
export class UserList extends Component {

    emptyUser = {
        id: null,
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        isAdmin: false,
        targetRole: '',
        targetProject: '',
        skills: ''
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

        this.linkable = this.linkable.bind(this);
        this.onClickUsername = this.onClickUsername.bind(this);
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


        if (this.state.user.username.trim()) {

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
//<a style={{cursor: 'pointer', textDecoration: 'underline'}}
//onClick={this.onClickUsername}>{rowData.username}</a>
    statusBodyTemplate(rowData) {
        return <span className={`user-badge status-${rowData.isAdmin ?  'admin' :'user'}`}>{rowData.isAdmin ?  'ADMIN' :'USER'}</span>;
    }

    linkable(rowData) {
        return <a style={{cursor: 'pointer', textDecoration: 'underline'}}
                  onClick={this.onClickUsername}>{rowData.username}</a>;
    }

    onClickUsername = (event) => {
        console.log('onClickUsername : ' + event.target.text);
        window.location.assign('problems/' + event.target.text);
    };

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
                        <Column field="username" body={this.linkable} header="Username" sortable></Column>
                        <Column field="firstName" header="First Name" sortable></Column>
                        <Column field="lastName" header="Last Name" sortable></Column>

                        <Column field="email" header="E-mail" sortable></Column>
                        <Column field="isAdmin" header="Admin Status" body={this.statusBodyTemplate} sortable></Column>
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

export default UserList;
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './indexTable.css';

import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import CommentService from '../service/CommentService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import './CommentList.css';
import uuid from 'uuid-random';

export class CommentList extends Component {

  emptyComment = {
    id: null,
    username: '',
    problemName: '',
    submissionId:'',
    targetRole:'',
    targetProject:'',
    commenter:'',
    commentText:'',
    commentRating:'',
    creationDate:'',
    updateDate:''
  };

  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      commentDialog: false,
      comment: this.emptyComment,
      globalFilter: null
    };

    this.commentService = new CommentService();
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
    this.exportCSV = this.exportCSV.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputNumberChange = this.onInputNumberChange.bind(this);
  }

  componentDidMount() {
    debugger;
    console.log(this.props.username)
    if (this.props.username && !this.props.problemName) {
      this.commentService.getComments(this.props.username).then(res => {
        if (res.data  != null){
          this.setState({ comment: res.data });
      }
      });
    }
    else if (this.props.problemName && this.props.username) {
      this.commentService.getCommentsByUsernameAndProblemCode(this.props.username, this.props.problemCode).then(res => {
        if (res.data  != null){
          this.setState({ comment: res.data });
      }
        
      })
    }
    else {
      this.commentService.getComments().then(res => {
        if (res.data  != null){
          this.setState({ comment: res.data });
      }
      });
    }
  }

  exportCSV() {
    this.dt.exportCSV();
  }

  onInputChange(e, name) {
    const val = (e.target && e.target.value) || '';
    let comment = { ...this.state.comment };
    comment[`${name}`] = val;

    this.setState({ comment });
  }

  onInputNumberChange(e, name) {
    const val = e.value || 0;
    let comment = { ...this.state.comment };
    comment[`${name}`] = val;

    this.setState({ comment });
  }

  rightToolbarTemplate() {
    return (
      <React.Fragment>
        <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" />
        <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={this.exportCSV} />
      </React.Fragment>
    )
  }

  render() {
    const header = (
      <div className="table-header">
        <h5 className="p-m-0">Comments</h5>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Search..." />
        </span>
      </div>
    );

    return (
      <div className="datatable-crud-demo">
        <Toast ref={(el) => this.toast = el} />

        <div className="card">
          <Toolbar className="p-mb-4" right={this.rightToolbarTemplate}></Toolbar>

          <DataTable ref={(el) => this.dt = el} value={this.state.comments}
            dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} comments"
            globalFilter={this.state.globalFilter}
            header={header}>

            <Column field="username" header="User Name" sortable></Column>
            <Column field="problemName" header="Problem Name" sortable></Column>
            <Column field="id" header="Submission ID" sortable></Column>
            <Column field="targetRole" header="Target Role"sortable></Column>
            <Column field="targetProject" header="Target Project"sortable></Column>
            <Column field="commenterUserName" header="Commenter" sortable></Column>
            <Column field="comment" header="Comment" sortable></Column>
            <Column field="rating" header="Rating"sortable></Column>
            <Column field="createdDate" header="Created On" sortable></Column>
            <Column field="updatedDate" header="Updated" sortable></Column>

          </DataTable>
        </div>
      </div>
    );
  }
}

export default  CommentList
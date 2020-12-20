import React, {Component} from 'react'
import MaterialTable from "material-table";
import {forwardRef} from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {Link} from "@reach/router";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedUser: null,
            userList: [],
            redirect: false,
            path: ""
        };
    }


    componentDidMount = () => {
        fetch('http://localhost:8080/main/users')
            .then(async response => {
                const data = await response.json();
                //check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                //this.setState({ postId: data.id })
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    };
    //const requestOptions = {
    //    method: 'POST',
    //    headers: { 'Content-Type': 'application/json' },
    //    body: JSON.stringify({ title: 'React POST Request Example' })
    //};
    //fetch('https://jsonplaceholder.typicode.com/invalid-url', requestOptions)
    //    .then(async response => {
    //        const data = await response.json();
//
    //        // check for error response
    //        if (!response.ok) {
    //            // get error message from body or default to response status
    //            const error = (data && data.message) || response.status;
    //            return Promise.reject(error);
    //        }
//
    //        this.setState({ postId: data.id })
    //    })
    //    .catch(error => {
    //        this.setState({ errorMessage: error.toString() });
    //        console.error('There was an error!', error);
    //    });
//

onCellEditApproved = (newValue, oldValue, rowData, columnDef) => {
    console.log('onCellEditApproved newValue: ' + JSON.stringify(newValue));
    console.log('onCellEditApproved oldValue: ' + JSON.stringify(oldValue));
    console.log('onCellEditApproved rowData: ' + JSON.stringify(rowData));
    console.log('onCellEditApproved columnDef: ' + JSON.stringify(columnDef));
};

onRowAddCancelled = (rowData) => {
    console.log('onRowAddCancelled rowData: ' + JSON.stringify(rowData));
};

onRowUpdateCancelled = (rowData) => {
    console.log('onRowUpdateCancelled rowData: ' + JSON.stringify(rowData));
};

onRowAdd = (newData) => {
    console.log('onRowAdd newData: ' + JSON.stringify(newData));
    //onRowAdd newData: {"id":"3434","username":"bpitt","first_name":"brad","last_name":"pitt","email":"pbitt@gmail.com","is_admin":"false","target_role":"devops","target_project":"IHTAR","skills":"java"}

};

onRowUpdate = (newData, oldData) => {
    console.log('onRowUpdate newData: ' + JSON.stringify(newData));
    //onRowUpdate newData: {"id":"124345","username":"mduzgun","first_name":"Mehmet","last_name":"Düzgün","email":"memetduzgun@gmail.com","is_admin":true,"target_role":"junior developer","target_project":"IHTAR","skills":"java, python"}
    console.log('onRowUpdate oldData: ' + JSON.stringify(oldData));
    //onRowUpdate oldData: {"id":"1243","username":"mduzgun","first_name":"Mehmet","last_name":"Düzgün","email":"memetduzgun@gmail.com","is_admin":true,"target_role":"junior developer","target_project":"IHTAR","skills":"java, python","tableData":{"id":0,"editing":"update"}}
};

onRowDelete = (oldData) => {
    console.log('onRowDelete oldData: ' + JSON.stringify(oldData));
    //onRowDelete oldData: {"id":"1243","username":"mduzgun","first_name":"Mehmet","last_name":"Düzgün","email":"memetduzgun@gmail.com","is_admin":true,"target_role":"junior developer","target_project":"IHTAR","skills":"java, python","tableData":{"id":0,"editing":"delete"}}
};

onClickUsername = (event) => {
    console.log('onClickUsername : ' + event.target.text);
    window.location.assign("/");//FIXME redirect /user/mduzgun
};

render()
{

    return (

        <div className="container">
            <div style={{maxWidth: "100%"}}>
                <MaterialTable

                    //cellEditable={{
                    //    cellStyle: {},
                    //    onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                    //
                    //        return new Promise((resolve, reject) => {
                    //            this.onCellEditApproved(newValue, oldValue, rowData, columnDef);
                    //            setTimeout(resolve, 1000);
                    //        });
                    //    }
                    //}}
                    editable={{
                        //isEditable: rowData => rowData.name === 'a', // only name(a) rows would be editable
                        //isEditHidden: rowData => rowData.name === 'x',
                        //isDeletable: rowData => rowData.name === 'b', // only name(b) rows would be deletable,
                        //isDeleteHidden: rowData => rowData.name === 'y',
                        //onBulkUpdate: changes => {
                        //    return new Promise((resolve, reject) => {
                        //        console.log('changes: ' + changes);
                        //        setTimeout(resolve, 4000);
                        //    });
                        //},

                        //new Promise((resolve, reject) => {
                        //    setTimeout(() => {
                        //        /* setData([...data, newData]); */
//
                        //        resolve();
                        //    }, 1000);
                        //}),
                        onRowAddCancelled: rowData => {
                            return new Promise((resolve, reject) => {
                                this.onRowAddCancelled(rowData);
                                setTimeout(resolve, 1000);
                            });
                        },
                        //console.log('Row adding cancelled'),
                        onRowUpdateCancelled: rowData => {
                            return new Promise((resolve, reject) => {
                                this.onRowUpdateCancelled(rowData);
                                setTimeout(resolve, 1000);
                            });
                        },
                        //console.log('Row editing cancelled'),
                        onRowAdd: newData => {
                            return new Promise((resolve, reject) => {
                                this.onRowAdd(newData);
                                setTimeout(resolve, 1000);
                            });
                        },
                        //new Promise((resolve, reject) => {
                        //    setTimeout(() => {
                        //        /* setData([...data, newData]); */
//
                        //        resolve();
                        //    }, 1000);
                        //}),
                        onRowUpdate: (newData, oldData) => {
                            return new Promise((resolve, reject) => {
                                this.onRowUpdate(newData, oldData);
                                setTimeout(resolve, 1000);
                            });
                        },
                        //new Promise((resolve, reject) => {
                        //    setTimeout(() => {
                        //        const dataUpdate = [...data];
                        //        const index = oldData.tableData.id;
                        //        dataUpdate[index] = newData;
                        //        setData([...dataUpdate]);
//
                        //        resolve();
                        //    }, 1000);
                        //}),
                        onRowDelete: oldData => {
                            return new Promise((resolve, reject) => {
                                this.onRowDelete(oldData);
                                setTimeout(resolve, 1000);
                            });
                        }
                        //new Promise((resolve, reject) => {
                        //    setTimeout(() => {
                        //        const dataDelete = [...data];
                        //        const index = oldData.tableData.id;
                        //        dataDelete.splice(index, 1);
                        //        setData([...dataDelete]);
//
                        //        resolve();
                        //    }, 1000);
                        //})
                    }}
                    icons={tableIcons}
                    options={{
                        search: true,
                        //filtering: true,
                        exportButton: true,
                        grouping: true,
                        //selection: true
                    }}

                    columns={[
                        {title: "Id", field: "id"},
                        {
                            field: 'username',
                            title: 'Kullanıcı Adı',
                            render: rowData => <a style={{cursor: 'pointer', textDecoration: 'underline'}}
                                                  onClick={this.onClickUsername}>{rowData.username}</a>
                        },
                        //{title: "Kullanıcı Adı", field: "username"},
                        {title: "Adı", field: "firstName"},
                        {title: "Soyadı", field: "lastName"},
                        {title: "Email", field: "email"},
                        {title: "Yönetici", field: "isAdmin", type: "boolean"}, //FIXME fix later?
                        {title: "Hedef Rol", field: "targetRole"},
                        {title: "Hedef Proje", field: "targetProject"},
                        {title: "Yetenekler", field: "skills"}

                        //{title: "Doğum Yılı", field: "birthYear", type: "numeric"},
                        //{
                        //    title: "Doğum Yeri",
                        //    field: "birthCity",
                        //    lookup: {6: "Ankara", 40: "Kırşehir"},
                        //},
                    ]}
                    data={[
                        {
                            id: "1243",
                            username: "mduzgun",
                            firstName: "Mehmet",
                            lastName: "Düzgün",
                            email: "memetduzgun@gmail.com",
                            isAdmin: true,
                            targetRole: "junior developer",
                            targetProject: "IHTAR",
                            skills: "java, python"
                        },
                    ]}
                    title="Kullanıcı Listesi"
                />
            </div>
        </div>
    );
}
}
export default UserList;

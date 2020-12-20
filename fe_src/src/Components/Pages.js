import React, {useContext} from "react";
import {Router} from "@reach/router";
import ProblemList from "./ProblemList";
import SubmissionList from "./SubmissionList";
import Dashboard from "./Dashboard";
import UserList from "./UserList";
import DataTableCrudDemo from "../Demo/DataTableCrudDemo";
import Compiler from "./Compiler";
import TemplateList from "./TemplateList";

function Pages() {
    return (

        <Router>
            <Compiler path="/"/>
            <Dashboard path="admin"/>
            <UserList path="users"/>
            <DataTableCrudDemo path="test"/>
            <ProblemList path="admin/problems"/>
            <TemplateList path="admin/templates"/>
            <SubmissionList path="admin/submissions"/>
            <UserList path="admin/users"/>
        </Router>

    );
}

export default Pages;

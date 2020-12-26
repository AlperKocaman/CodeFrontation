import React, {useContext} from "react";
import {Router} from "@reach/router";
import ProblemList from "./ProblemList";
import SubmissionList from "./SubmissionList";
import Dashboard from "./Dashboard";
import UserList from "./UserList";
import Compiler from "./Compiler";
import TemplateList from "./TemplateList";
import Problem from "./Problem";
import AddProblem from "./AddProblem";
import Evaluator from "./Evaluator";
import CommentList from "./CommentList";

function Pages() {
    return (
        <Router>
            <Evaluator path="/"/>
            <Compiler path="compiler"/>
            <Dashboard path="admin"/>
            <Problem path="admin/problems/problemKey/:problemCode"/>
            <ProblemList path="admin/problems"/>
            <AddProblem path="admin/problems/addProblem"/>
            <AddProblem path="admin/problems/addProblem/:problemCode"/>
            <ProblemList path="admin/problems/:username"/>
            <TemplateList path="admin/templates"/>
            <SubmissionList path="admin/submissions"/>
            <SubmissionList path="admin/submissions/:username"/>
            <SubmissionList path="admin/submissions/:username/:problemCode"/>
            <UserList path="admin/users"/>
            <CommentList path="admin/comments"/>
            <CommentList path="admin/comments/:username/"/>
            <CommentList path="admin/comments/:username/:problemCode"/>
        </Router>

    );
}

export default Pages;

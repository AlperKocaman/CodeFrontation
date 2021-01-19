import React from "react";
import {Router} from "@reach/router";
import ProblemList from "./ProblemList";
import Dashboard from "./Dashboard";
import Problem from "./Problem";

function Pages(props) {
    const problemListPath= "/admin/problems/"+props.username;
    const NotFound = () => window.location.assign(problemListPath);

    return (
        <Router>
            <Problem path="/admin/problems/problemKey/:problemCode"/>
            <ProblemList path={problemListPath}/>
            <NotFound default />
        </Router>

    );
}

export default Pages;

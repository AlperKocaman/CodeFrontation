import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './indexTable.css';

import React, { Component } from 'react';
import ProblemService from "../service/ProblemService";
import './Problem.css';
import uuid from 'uuid-random';
import Evaluator from "./Evaluator";
import {auth, generateUserDocument} from "./Firebase";
import AssignmentService from "../service/AssignmentService";

export class Problem extends Component {

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
        allowedLanguages: ''
    };

    constructor(props) {
        super(props);

        this.state = {
            problem: this.emptyProblem,
            submitted: false,
            globalFilter: null,
            assignmentId: null,
            isAdmin: false,
            authenticateUser: null
        };

        this.problemService = new ProblemService();
        this.assignmentService = new AssignmentService();
        this.exportCSV = this.exportCSV.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputNumberChange = this.onInputNumberChange.bind(this);
    }

    componentDidMount = async () => {
        auth.onAuthStateChanged(async userAuth => {
            const user = await generateUserDocument(userAuth);
            if (userAuth) {
                userAuth.getIdToken().then(idToken =>  {
                    this.setState({'token': idToken });
                    this.problemService.getProblem(this.props.problemCode ? this.props.problemCode : '', idToken).then(res => {
                        this.setState({problem: res.data});
                    });
                    const username=user.username;     //FIXME dinamikleştir
                    const problemCode=this.props.problemCode;
                    this.assignmentService.getAssignmentByUsernameAndProblemCode(username,problemCode,idToken).then(res => {
                        if(res && res.data && res.data.id){
                            this.setState({assignmentId: res.data.id, isAdmin:res.data.user.isAdmin});
                        }
                    });
                });
            }
            this.setState({'authenticateUser': user });
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

    render() {
        return (
            <div id="content" className="content">
                <pre>
                    <div id="content2" className="content2">
                        <h1>{this.state.problem.name} </h1>
                        <h6>
                            Author : {this.state.problem.author}
                            &nbsp; &nbsp;
                            Points : {this.state.problem.point}
                            &nbsp; &nbsp;
                            Category : {this.state.problem.category}
                            &nbsp; &nbsp;
                            Time Limit : {this.state.problem.timeLimit}
                            &nbsp; &nbsp;
                            Memorty Limit : {this.state.problem.memoryLimit}
                        </h6>
                        <hr/>
                        <br/>
                        <p>{this.state.problem.description}</p>
                        <h3>
                            Input Specification
                        </h3>
                        <hr/>
                         <br/>
                        <p>{this.state.problem.inputSpecification}</p>
                        <h3>
                            Output Specification
                        </h3>
                        <hr/>
                        <br/>
                        <p>{this.state.problem.outputSpecification}</p>
                        <h3>
                            Sample Input
                        </h3>
                        <hr/>
                        <br/>
                        <div id="sample" className="sample">
                             <p>{this.state.problem.sampleInputs}</p>
                        </div>
                        <h3>
                            Sample Output
                        </h3>
                        <hr/>
                        <br/>
                        <div id="sample" className="sample">
                            <p>{this.state.problem.sampleOutputs}</p>
                        </div>
                        <h3>
                            Explanation of Sample
                        </h3>
                        <hr/>
                        <br/>
                        <p>{this.state.problem.explanation}</p>
                    </div>
                </pre>
                { this.state.problem.code && this.state.assignmentId && !this.state.isAdmin &&
                    <div className="evaluator">
                        <Evaluator
                            problemCode={this.state.problem.code} assignmentId ={this.state.assignmentId}
                        />
                    </div>
                }
                
            </div>
        )
    }
}

export default Problem;
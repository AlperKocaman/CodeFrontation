import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './indexTable.css';

import React, { Component } from 'react';
import ProblemService from "../service/ProblemService";
import './Problem.css';
import uuid from 'uuid-random';

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
            globalFilter: null
        };

        this.problemService = new ProblemService();
        this.exportCSV = this.exportCSV.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputNumberChange = this.onInputNumberChange.bind(this);
    }

    componentDidMount() {
        this.problemService.getProblem(this.props.problemCode ? this.props.problemCode : '').then(res => {
            this.setState({problem: res.data});
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
            </div>
        )
    }
}

export default Problem;
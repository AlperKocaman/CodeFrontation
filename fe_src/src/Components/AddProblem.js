import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './indexTable.css';

import React, {Component} from 'react';
import classNames from 'classnames';
import ProblemService from "../service/ProblemService";
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import {FileUpload} from 'primereact/fileupload';
import {InputText} from 'primereact/inputtext';
import './AddProblem.css';
import uuid from 'uuid-random';
import {MultiSelect} from "primereact/multiselect";
import {InputTextarea} from "primereact/inputtextarea";

export class AddProblem extends Component {

    emptyProblem = {
        id: null,
        name: '',
        code: '',
        author: '',
        category: '',
        difficultyLevel: null,
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
        memoryLimit: 0,
        allowedLanguages: null
    };

    languages = [
        'JAVA',
        'PYTHON',
        'CPP',
        'C',
        'C#',
        'JAVASCRIPT',
        'PHP',
        'GO',
        'HASKELL',
        'SCALA',
        'KOTLIN',
        'SWIFT',
        'OBJECTIVE_C',
        'TYPESCRIPT',
        'RUBY',
        'HTML',
        'CSS'
    ];

    levels = [
        'EASY',
        'MEDIUM',
        'HARD'
    ];

    categories = [
        'HASHMAP',
        'ARRAYS',
        'STRINGS',
        'SQL',
        'SPRING_CONTEXT',
        'ALGORITHMS'
    ]


    constructor(props) {
        super(props);

        this.state = {
            problem: this.emptyProblem,
            submitted: false,
            selectedLanguages: null,
            selectedDifficulty: null,
            selectedCategory: null,
            globalFilter: null
        };

        this.problemService = new ProblemService();
        this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
        this.saveProblem = this.saveProblem.bind(this);
        this.exportCSV = this.exportCSV.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputNumberChange = this.onInputNumberChange.bind(this);
    }

    componentDidMount() {
        if(this.props.problemCode && this.state.problem.name.valueOf() === ""){
            this.problemService.getProblem(this.props.problemCode).then(res => {
                this.setState({problem: res.data});
            });
        }
    }

    saveProblem() {
        if(!this.state.problem.name || this.state.problem.name.valueOf() === ""){
            this.toast.show({ severity: 'fail', summary: 'Unsuccessful', detail: 'Problem name is empty!', life: 3000 });
            return;
        }
        if(!this.state.problem.code || this.state.problem.code.valueOf() === ""){
            this.toast.show({ severity: 'fail', summary: 'Unsuccessful', detail: 'Problem code is empty!', life: 3000 });
            return;
        }
        if(!this.state.problem.author || this.state.problem.author.valueOf() === ""){
            this.toast.show({ severity: 'fail', summary: 'Unsuccessful', detail: 'Problem author is empty!', life: 3000 });
            return;
        }
        if(!this.state.problem.category || this.state.problem.category.toString().valueOf() === ""){
            this.toast.show({ severity: 'fail', summary: 'Unsuccessful', detail: 'Problem category is empty!', life: 3000 });
            return;
        }
        if(!this.state.problem.difficultyLevel || this.state.problem.difficultyLevel.toString().valueOf() === ""){
            this.toast.show({ severity: 'fail', summary: 'Unsuccessful', detail: 'Problem difficulty level is empty!', life: 3000 });
            return;
        }
        if(!this.state.problem.timeLimit || this.state.problem.timeLimit.valueOf() === ""){
            this.toast.show({ severity: 'fail', summary: 'Unsuccessful', detail: 'Problem time limit is empty!', life: 3000 });
            return;
        }
        if(!this.state.problem.memoryLimit || this.state.problem.memoryLimit.valueOf() === ""){
            this.toast.show({ severity: 'fail', summary: 'Unsuccessful', detail: 'Problem memory limit is empty!', life: 3000 });
            return;
        }
        if(!this.state.problem.allowedLanguages || this.state.problem.allowedLanguages.toString().valueOf() === ""){
            this.toast.show({ severity: 'fail', summary: 'Unsuccessful', detail: 'Problem allowed languages is empty!', life: 3000 });
            return;
        }

        if (this.state.problem.name.trim()) {

            this.state.problem.allowedLanguages = this.state.problem.allowedLanguages.toString();
            this.state.problem.difficultyLevel = this.state.problem.difficultyLevel.toString();
            this.state.problem.category = this.state.problem.category.toString();

            if (this.state.problem.id) {
                this.problemService.updateProblem(this.state.problem).then(data => {
                    this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Problem Updated', life: 3000 });
                    this.returnBackToProblemList();
                }).catch(error => {
                    console.error('There was an error while updating problem!', error);
                });
            }
            else {
                this.problemService.addProblem(this.state.problem).then(data => {
                    this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Problem Created', life: 3000 });
                    this.returnBackToProblemList();
                }).catch(error => {
                    console.error('There was an error while adding problem!', error);
                });
            }

        }
    }

    returnBackToProblemList() {
        console.log('onClickCancelInProblemAdd');
        window.location.assign('/admin/problems');
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
                <h5 className="p-m-0">Manage Problems</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Search..." />
                </span>
            </div>
        );

        return (
            <div id="content" className="content">
                <Toast ref={(el) => this.toast = el} />
                <div id="fillProblem" className="fillProblem">
                    <h1>Problem</h1>
                    <h5>
                        By filling this form, you can create or update problems.
                    </h5>
                    <hr/>
                    <br/>
                    <Toast ref={(el) => this.toast = el} />
                    <div id="informPart" className="informPart">
                        <h2>Problem Information</h2>
                        <div className="p-field" >
                            <br/>
                            <label htmlFor="name" className="p-d-block">Problem Name : </label>
                            <InputText id="name" value={this.state.problem.name} aria-describedby="name-help" className="p-d-block" onChange={(e) => this.onInputChange(e, 'name')} required autoFocus />
                            <small id="name-help" className="p-d-block">Describes the problem.</small>
                            {this.state.submitted && !this.state.problem.name && <small className="p-invalid">Problem name is required.</small>}
                            <br/>
                        </div>
                        <div className="p-field" >
                            <br/>
                            <label htmlFor="code" className="p-d-block">Problem Code : </label>
                            <InputText id="code" value={this.state.problem.code} aria-describedby="code-help" className="p-d-block" onChange={(e) => this.onInputChange(e, 'code')} required autoFocus />
                            <small id="code-help" className="p-d-block">Enter a unique problem code.</small>
                            {this.state.submitted && !this.state.problem.code && <small className="p-invalid">Problem code is required.</small>}
                            <br/>
                        </div>
                        <div className="p-field" >
                            <br/>
                            <label htmlFor="author" className="p-d-block">Authors : </label>
                            <InputText id="author" value={this.state.problem.author} aria-describedby="author-help" className="p-d-block" onChange={(e) => this.onInputChange(e, 'author')} required autoFocus />
                            <small id="author-help" className="p-d-block">Writers of the problem</small>
                            {this.state.submitted && !this.state.problem.author && <small className="p-invalid">Authors are required.</small>}
                            <br/>
                        </div>
                        <hr/>
                    </div>
                    <br/><br/><br/>
                    <div id="problemCriteria" className="problemCriteria">
                        <h2>Problem Criteria</h2>
                        <div className="p-field" >
                            <br/>
                            <label htmlFor="category" className="p-d-block">Problem Category : </label>
                            <MultiSelect id="category" display="chip" placeholder= {"Select Category"} value={this.state.selectedCategory} options={this.categories} onChange={(e) => { this.setState({ selectedCategory: e.value}); this.onInputChange(e, 'category'); }}
                                         className={classNames({ 'p-invalid': this.state.submitted && !this.state.problem.category })} />
                            <small id="category-help" className="p-d-block"> Category of the problem</small>
                            {this.state.submitted && !this.state.problem.category && <small className="p-invalid">Problem category is required.</small>}
                            <br/>
                        </div>
                        <div className="p-field" >
                            <br/>
                            <label htmlFor="difficultyLevel" className="p-d-block">Difficulty Level</label>
                            <MultiSelect id="difficultyLevel" display="chip" placeholder= {"Select Difficulty"} value={this.state.selectedDifficulty} options={this.levels} onChange={(e) => { this.setState({ selectedDifficulty: e.value}); this.onInputChange(e, 'difficultyLevel'); }}
                                         className={classNames({ 'p-invalid': this.state.submitted && !this.state.problem.difficultyLevel })} />
                            <small id="difficulty-help" className="p-d-block"> Difficulty level of the problem</small>
                            {this.state.submitted && !this.state.problem.difficultyLevel && <small className="p-invalid">Problem difficulty level is required.</small>}
                            <br/>
                        </div>
                        <div className="p-field" >
                            <br/>
                            <label htmlFor="timeLimit" className="p-d-block">Time Limit</label>
                            <InputText id="timeLimit" value={this.state.problem.timeLimit} aria-describedby="time-help" onChange={(e) => this.onInputChange(e, 'timeLimit')} required autoFocus />
                            <small id="time-help" className="p-d-block">Time limit of the problem in minutes</small>
                            {this.state.submitted && !this.state.problem.timeLimit && <small className="p-invalid">Problem time limit is required.</small>}
                            <br/>
                        </div>
                        <div className="p-field">
                            <br/>
                            <label htmlFor="memoryLimit" className="p-d-block">Memory Limit</label>
                            <InputText id="memoryLimit" value={this.state.problem.memoryLimit} aria-describedby="memory-help" onChange={(e) => this.onInputChange(e, 'memoryLimit')} required autoFocus />
                            <small id="memory-help" className="p-d-block">Memory limit of the problem in megabytes</small>
                            {this.state.submitted && !this.state.problem.memoryLimit && <small className="p-invalid">Problem memory limit is required.</small>}
                            <br/>
                        </div>
                        <div className="p-field">
                            <br/>
                            <label htmlFor="allowedLanguages" className="p-d-block">Allowed Languages</label>
                            <MultiSelect id="allowedLanguages" display="chip" placeholder= {"Select Languages"} value={this.state.selectedLanguages} options={this.languages} onChange={(e) => { this.setState({ selectedLanguages: e.value}); this.onInputChange(e, 'allowedLanguages'); }}
                                         className={classNames({ 'p-invalid': this.state.submitted && !this.state.problem.allowedLanguages })} />
                            <small id="memory-help" className="p-d-block"> Allowed languages of the problem</small>
                            {this.state.submitted && !this.state.problem.allowedLanguages && <small className="p-invalid">Allowed languages is required.</small>}
                            <br/>
                        </div>
                        <hr/>
                    </div>
                    <br/><br/><br/>
                    <div id="problemDefinition" className="problemDefinition">
                        <h2>Problem Definition</h2>
                        <br/>
                        <div className="p-field">
                            <InputTextarea value={this.state.problem.description} onChange={(e) => this.onInputChange(e, 'description')}
                                           required autoFocus rows={10} cols={200} autoResize
                                           placeholder="Please provide the description of the problem here!"/>
                        </div>
                    </div>
                    <br/><br/><br/>
                    <div id="inputOutputSpecification" className="inputOutputSpecification">
                        <h2>Input/Output Specification</h2>
                        <br/>
                        <div className="p-field">
                            <InputTextarea value={this.state.problem.inputSpecification} onChange={(e) => this.onInputChange(e, 'inputSpecification')}
                                           required autoFocus rows={10} cols={95} autoResize
                                           placeholder="Please provide the input specification of the problem here!"/>
                        </div>
                        <div className="p-field">
                            <InputTextarea value={this.state.problem.outputSpecification} onChange={(e) => this.onInputChange(e, 'outputSpecification')}
                                           required autoFocus rows={10} cols={95} autoResize
                                           placeholder="Please provide the output specification of the problem here!"/>
                        </div>
                    </div>
                    <br/><br/><br/>
                    <div id="inputOutput" className="inputOutputSpecification">
                        <h2>Inputs/Outputs</h2>
                        <br/>
                        <div className="p-field">
                            <InputTextarea value={this.state.problem.inputs} onChange={(e) => this.onInputChange(e, 'inputs')}
                                           required autoFocus rows={10} cols={95} autoResize
                                           placeholder="Please provide the inputs of the problem that will be used in evaluation here!"/>
                        </div>
                        <div className="p-field">
                            <InputTextarea value={this.state.problem.outputs} onChange={(e) => this.onInputChange(e, 'outputs')}
                                           required autoFocus rows={10} cols={95} autoResize
                                           placeholder="Please provide the outputs of the problem that will be expected from program here!"/>
                        </div>
                    </div>
                    <br/><br/><br/>
                    <div id="sampleInputOutput" className="inputOutputSpecification">
                        <h2>Sample Inputs/Outputs</h2>
                        <br/>
                        <div className="p-field">
                            <InputTextarea value={this.state.problem.sampleInputs} onChange={(e) => this.onInputChange(e, 'sampleInputs')}
                                           required autoFocus rows={10} cols={95} autoResize
                                           placeholder="Please provide the sample inputs for the problem that will be used in the test by the assignee here!"/>
                        </div>
                        <div className="p-field">
                            <InputTextarea value={this.state.problem.sampleOutputs} onChange={(e) => this.onInputChange(e, 'sampleOutputs')}
                                           required autoFocus rows={10} cols={95} autoResize
                                           placeholder="Please provide the sample outputs for the problem that will be expected from the program results here!"/>
                        </div>
                    </div>
                    <br/><br/><br/>
                    <div id="sampleExplanation" className="problemDefinition">
                        <h2>Explanation of the Sample Input/Output</h2>
                        <br/>
                        <div className="p-field">
                            <InputTextarea value={this.state.problem.explanation} onChange={(e) => this.onInputChange(e, 'explanation')}
                                           required autoFocus rows={10} cols={200} autoResize
                                           placeholder="Please provide the explanation of the sample input/outputs here!"/>
                        </div>
                    </div>
                </div>
                <div className="buttonsComposite">
                    <div className="buttons">
                        <Button label="Save" icon="pi pi-check" className="p-button-lg" onClick={this.saveProblem} />
                    </div>
                    <div className="buttons">
                        <Button label="Cancel" icon="pi pi-times" className="p-button-lg" onClick={this.returnBackToProblemList} />
                    </div>
                </div>
            </div>
        );
    }
}

export default AddProblem;
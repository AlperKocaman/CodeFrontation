import React, { Component } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/python';
import 'brace/mode/java';
import 'brace/mode/c_cpp';
import 'brace/mode/ruby';
import 'brace/mode/javascript';
import 'brace/snippets/python';
import 'brace/snippets/java';
import 'brace/snippets/c_cpp';
import 'brace/snippets/ruby';
import 'brace/snippets/javascript';
import 'brace/ext/language_tools';
import 'brace/theme/dracula';
import 'brace/theme/dreamweaver';
import 'brace/theme/eclipse';
import 'brace/theme/github';
import 'brace/theme/chrome';
import 'brace/theme/tomorrow_night';
import 'brace/theme/monokai';
import CompilerService from "../service/CompilerService";
import {auth, generateUserDocument} from "./Firebase";

export class Evaluator extends Component {
   
    constructor(props) {
        super(props);
        
        this.onChange = this.onChange.bind(this);
        this.optionChanged = this.optionChanged.bind(this);
        this.optionThemeChanged = this.optionThemeChanged.bind(this);

        this.testCode = this.testCode.bind(this);
        this.submitCode = this.submitCode.bind(this);
        this.sendCodeForRun = this.sendCodeForRun.bind(this);
        this.sendCode = this.sendCode.bind(this);

        this.getTestRunResult = this.getTestRunResult.bind(this);
        this.getSubmitResult = this.getSubmitResult.bind(this);

        this.compilerService = new CompilerService();

        //react type language enum
        this.languages={

            java:"JAVA",
            python:"PYTHON",
            javascript:"JAVASCRIPT",
            c_cpp:"C",
            ruby:"RUBY",
            python3:"PY3"
        };

        this.state = {
            themeName:'dracula',
            modeName:'java',
            consoleOutput:'output...',
            authenticateUser: null
        };

        this.codeString='';

    }

    componentDidMount = async () => {
        auth.onAuthStateChanged(async userAuth => {
            const user = await generateUserDocument(userAuth);
            this.setState({'authenticateUser': user});
        });
    }

    onChange(newValue) {
        this.codeString =newValue;
    }

    optionChanged = () => {
        let modeName = document.getElementById("langOption").value;
        this.setState({modeName:modeName});
    };
    optionThemeChanged = () => {
        let themeName = document.getElementById("themeOption").value;
        this.setState({themeName:themeName});
    };

    submitCode = () => {
        const assignmentId="2331b35b-0778-4810-b7ad-828527d74def";
        const problemCode="aplusb";
        const username="mduzgun";     //FIXME dinamikleştir
        this.sendCode("" + this.codeString,this.languages[''+this.state.modeName],assignmentId,problemCode,username);

    }

    sendCode = (requestData,lang,assignmentId,problemCode,username) => {

        let data = { "body": requestData, "language":lang, "assignmentId":assignmentId
          , "problemCode":problemCode, "username":username };

        this.compilerService.addSubmit(data).then(res => {
            let result=res.data;
            console.log(result);
            setTimeout(this.getSubmitResult, 3000, result.id);
        });
    }


    getSubmitResult= (submissionId)  => {
        this.compilerService.getSubmit(submissionId).then(res => {
            let testCaseList= res.data.testCaseList;
            let response="";
            if(testCaseList==undefined){
                this.setState({consoleOutput:"Error is occurred !!!"});
            }else{
                testCaseList.forEach(caseObj => {
                    console.log(caseObj)
                    response+= "Test Case "+caseObj.position+" ==> time= "+caseObj.time+", memory= "+caseObj.memory+", point= "+caseObj.point+"\n"
                });
                let submission= res.data.submission;
                response+= "Total Result ==> time= "+submission.time+", memory= "+submission.memory+", point= "+submission.point+"\n"
                this.setState({consoleOutput:response});
            }
        });
    }

    testCode = () => {
        const assignmentId="2331b35b-0778-4810-b7ad-828527d74def";
        const problemCode="aplusb";
        const username="mduzgun";     //FIXME dinamikleştir
        this.sendCodeForRun("" + this.codeString,this.languages[''+this.state.modeName],assignmentId,problemCode,username);
    }

    sendCodeForRun = (requestData,lang,assignmentId,problemCode,username) => {

        var data = { "body": requestData, "language":lang, "assignmentId":assignmentId
            , "problemCode":problemCode, "username":username };

        this.compilerService.testRun(data).then(res => {
            let result=res.data;
            console.log(result);
            setTimeout(this.getTestRunResult, 3000, result.id);
        });
    };

    getTestRunResult = (submissionId)  => {
        this.compilerService.getTestRun(submissionId).then(res => {
            let testRunCaseList= res.data.testRunCaseList;
            let response="";
            if(testRunCaseList==undefined){
                this.setState({consoleOutput:"Error is occurred !!!"});
            }else{
                testRunCaseList.forEach(caseObj => {
                    console.log(caseObj);
                    if (caseObj.point==100){
                        response+= "Test Cases are passed succesfully";
                    }else{
                        response+= "Test Cases are not passed succesfully";
                    }
                    //response+= "Test Case "+caseObj.position+" ==> time= "+caseObj.time+", memory= "+caseObj.memory+", point= "+caseObj.point+"\n"
                });
                let testRun= res.data.testRun;
                //response+= "Total Result ==> time= "+testRun.time+", memory= "+testRun.memory+", point= "+testRun.point+"\n"

                this.setState({consoleOutput:response});
            }
        });
    }

    render() {
        return (
            <div style={{backgroundColor:'rgb(255, 255, 255)',width:'63vw',height:'100vh'}}>
                <div style={{color:'rgb(90, 78, 45)',width:'55vw',height:'60vh',marginLeft:'auto',marginRight:'auto'}}>
                    <h2  style={{marginLeft:'auto',marginRight:'auto'}}>Code Area</h2>
                    <div id ="editorContainer">
                        <AceEditor style={{width:'55vw',height:'50vh'}}
                        mode={this.state.modeName=='python3'?'python':this.state.modeName}
                        theme={this.state.themeName}
                        name="editorContent"
                        value={this.props.value}
                        onChange={this.onChange}
                        showPrintMargin={false}
                        showGutter={true}
                        highlightActiveLine={true}
                        editorProps={{$blockScrolling: Infinity}}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                            showLineNumbers: true,
                            tabSize: 4,
                            fontSize:16,
                            spellcheck:true
                        }}
                        />
                    </div>
                    <div id = "editorButtons" style={{marginTop:'2px',float:'right'}}>
                        <select id="langOption" className="option" onChange={() => this.optionChanged()} style={{marginRight:'2px'}}>
                            <option value="java">Java8</option>
                            <option value="c_cpp">C/C++</option>
                            <option value="python">Python</option>
                            <option value="python3">Python3</option>
                            <option value="javascript">Javascript</option>
                            <option value="ruby">RUBY</option>
                        </select>
                        <select id="themeOption" className="option" onChange={() => this.optionThemeChanged()} style={{marginRight:'0px'}}>
                            <option value="eclipse">Eclipse</option>
                            <option value="github">GitHub</option>
                            <option value="monokai">Monokai</option>
                            <option value="tomorrow_night">TomorrowNight</option>
                            <option value="chrome">Chrome</option>
                            <option value="dracula">Dracula</option>
                            <option value="dreamweaver">DreamWeaver</option>
                        </select>
                    </div>
                    <div>
                        <button id="runButton" type="button" className="btn btn-dark" style={{marginTop:'2px',marginLeft:'0px',background: '#f3f7f7',
                                color: 'black'}} onClick={() => this.submitCode()}>Submit</button>
                        <button id="executeButton" type="button" className="btn btn-dark" style={{marginTop:'2px',marginLeft:'0px',background: '#4CAF50',
                                color: 'white'}} onClick={() => this.testCode()}>Execute Test</button>
                    </div>
                    <div id ="consoleContainer">
                        <AceEditor style={{width:'55vw',height:'17vh'}}
                        mode={this.state.modeName=='python3'?'python':this.state.modeName}
                        theme={this.state.themeName}
                        value={this.state.consoleOutput}
                        name="consoleContent"
                        showPrintMargin={false}
                        highlightActiveLine={true}
                        editorProps={{$blockScrolling: Infinity}}
                        setOptions={{
                            enableBasicAutocompletion: false,
                            enableLiveAutocompletion: false,
                            enableSnippets: true,
                            showLineNumbers: false,
                            tabSize: 2,
                            fontSize:10,
                            spellcheck:false,
                            readOnly:true
                        }}
                        />
                    </div> 
                    <div style={{marginTop:'2px',float:'right'}}>
                        <button id="executeButton" type="button" className="btn btn-dark" style={{marginTop:'2px',marginRight:'0px',background: '#f3f7f7',
                                color: 'black'}} onClick={() => this.setState({consoleOutput:'output...'})}>Clear Console</button>
                    </div>
                </div>         
            </div>
        );
    }
}

export default Evaluator;
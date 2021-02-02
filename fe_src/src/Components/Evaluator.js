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
import AssignmentService from '../service/AssignmentService';

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
        this.assignmentService = new AssignmentService();

        //react type language enum
        this.languages={

            java:"JAVA8",
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
            authenticateUser: null,
            token: '',
            problemCode:''
        };

        this.codeString='';

    }

    componentDidMount = async () => {
        this.setState({problemCode:this.props.problemCode});
        this.setState({assignmentId:this.props.assignmentId});
        auth.onAuthStateChanged(async userAuth => {
            const user = await generateUserDocument(userAuth);
            if (userAuth) {
                userAuth.getIdToken().then(idToken =>  {
                    this.setState({'token': idToken });
                });
            }
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
        const username=this.state.authenticateUser.username;     //FIXME dinamikleştir
        const problemCode=this.state.problemCode;
        const assignmentId=this.state.assignmentId;
        this.sendCode("" + this.codeString,this.languages[''+this.state.modeName],assignmentId,problemCode,username);
    }

    sendCode = (requestData,lang,assignmentId,problemCode,username) => {

        let data = { "body": requestData, "language":lang, "assignmentId":assignmentId
          , "problemCode":problemCode, "username":username, "point": 0, "time": 0, "memory": 0};


        let fileName = username + "-" + problemCode;
        if(lang === this.languages.java){
            let codeStr = requestData;
            let classStrIndex = codeStr.indexOf("class");
            let whiteSpaceStrIndex = codeStr.indexOf(" ", classStrIndex+6);
            fileName = codeStr.substring(classStrIndex+6,whiteSpaceStrIndex);
        }

        let sonarRegistryData = {
            "id": username + "-" + problemCode,
            "programmingLanguage":lang,
            "numberOfSubmittedFile":1,
            "codes":[requestData],
            "fileNames":[fileName] }

        this.compilerService.addSubmit(data, this.state.token).then(res => {
            let result=res.data;
            console.log(result);
            if(result){
                this.compilerService.registerSonar(sonarRegistryData, this.state.token).then(res => {
                   data = { "id": result.id, "sonarUrl": "http://localhost:9000/dashboard?id=" + username + "-" + problemCode,
                       ... data };
                   this.compilerService.updateSubmissionWithSonarData(data, result.id, this.state.token);
                });
            }
            setTimeout(this.getSubmitResult, 5000, result.id);
        });
    }


    getSubmitResult= (submissionId)  => {
        this.compilerService.getSubmit(submissionId, this.state.token).then(res => {
            let testCaseList= res.data.testCaseList;
            let response="";
            let checkError= false;
            if(testCaseList==undefined){
                this.setState({consoleOutput:"Error is occurred !!!"});
            }else{
                //testCaseList.forEach(caseObj => {
                //    console.log(caseObj)
                //    let output=caseObj.output;
                //    if(output.startsWith("Compile Error")){
                //        checkError= true;
                //        response+= output;
                //    }else{
                //        response+= "Test Case "+caseObj.position+" ==> time= "+caseObj.time+", memory= "+caseObj.memory+", point= "+caseObj.point+"\n"
                //    }
                //});
                //if(!checkError){
                //    let submission= res.data.submission;
                //    response+= "Total Result ==> time= "+submission.time+", memory= "+submission.memory+", point= "+submission.point+"\n"
                //}
                response += "Your code is submitted successfully";
                this.setState({consoleOutput:response});
            }
        });
    }

    testCode = () => {
        const username=this.state.authenticateUser.username;     //FIXME dinamikleştir
        const problemCode=this.state.problemCode;
        const assignmentId=this.state.assignmentId;
        this.sendCodeForRun("" + this.codeString,this.languages[''+this.state.modeName],assignmentId,problemCode,username);
    }

    sendCodeForRun = (requestData,lang,assignmentId,problemCode,username) => {

        var data = { "body": requestData, "language":lang, "assignmentId":assignmentId
            , "problemCode":problemCode, "username":username };

        this.compilerService.testRun(data, this.state.token).then(res => {
            let result=res.data;
            console.log(result);
            setTimeout(this.getTestRunResult, 5000, result.id); // FIXME : timeout bilgisi problem time limitten alınabilir
        });
    };

    getTestRunResult = (submissionId)  => {
        this.compilerService.getTestRun(submissionId, this.state.token).then(res => {
            let testRunCaseList= res.data.testRunCaseList;
            let response="";
            if(testRunCaseList==undefined){
                this.setState({consoleOutput:"Error is occurred !!!"});
            }else{
                testRunCaseList.forEach(caseObj => {
                    console.log(caseObj);
                    let output=caseObj.output;
                    if(output.startsWith("Compile Error")){
                        response+= output;
                    }else {
                        if (caseObj.point == 100) {
                            response += "Test Cases are passed successfully";
                        } else {
                            response += "Test Cases are not passed successfully";
                        }
                    }
                });
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
                            fontSize:16,
                            spellcheck:false,
                            readOnly:true
                        }}
                        />
                    </div> 
                    <div style={{marginTop:'2px',float:'right',lineHeight: '30px'}}>
                        <button id="executeButton" type="button" className="btn btn-dark" style={{marginTop:'2px',marginRight:'0px',background: '#f3f7f7',
                                color: 'black'}} onClick={() => this.setState({consoleOutput:'output...'})}>Clear Console</button>
                    </div>
                </div>         
            </div>
        );
    }
}

export default Evaluator;
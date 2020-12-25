import React from 'react'
import {auth} from "./Firebase";
import CompilerService from "../service/CompilerService";

const Compiler = () => {
    let displayOfSignOutButton='block'; //TODO for signout burasının değiştirilmesi gerekiyor
    let lang="PY3";
    let ace = require('ace-builds/src-noconflict/ace');
    let mode_java = require('ace-builds/src-noconflict/mode-java');//TODO if mode_java is not required, error is ocurred in htmEditor.getSession().setMode("ace/mode/java");
    let theme_monokai = require('ace-builds/src-noconflict/theme-monokai'); //TODO if theme-monokai is not required, error is ocurred in htmEditor.setTheme("ace/theme/monokai");
    let compilerService = new CompilerService();

    const optionChanged = () => {
        lang = document.getElementById("langOption").value;
        if(lang=="JAVA8"){
            initJavaEditor()
        }else if(lang=="PY3"){
            initPythonEditor()
        }
    };
    const sendCodeForRun = (requestData,lang,assignmentId,problemCode,username) => {

        var data = { "body": requestData, "language":lang, "assignmentId":assignmentId
            , "problemCode":problemCode, "username":username };

        compilerService.testRun(data).then(res => {
            let result=res.data;
            console.log(result);
            setTimeout(getTestRunResult, 3000, result.id);
        });
    };

    const sendCode = (requestData,lang,assignmentId,problemCode,username) => {

        var data = { "body": requestData, "language":lang, "assignmentId":assignmentId
          , "problemCode":problemCode, "username":username };

        compilerService.addSubmit(data).then(res => {
            let result=res.data;
            console.log(result);
            setTimeout(getSubmitResult, 3000, result.id);
        });


        ///var resultArea = document.getElementById("resultArea");
///
        ///// send data (method:post)
        ///var xhr = new XMLHttpRequest();
        ///var url = "http://localhost:8080/judge/submit";
        ///xhr.open("POST", url, true);
        ///xhr.setRequestHeader("Content-Type", "application/json");
        ///xhr.onreadystatechange = function () {
        ///    if (xhr.readyState === 4 && xhr.status === 200) {
        ///        //var json = JSON.parse(xhr.responseText);
        ///        var resultString = xhr.responseText
///
        ///        //setTimeout(getSubmitResult, 3000, "Hello", "John");
        ///    }
        ///};
        ///// assignmentId gelmeli buraya
        ///var data = JSON.stringify({ "body": requestData, "language":lang, "assignmentId":assignmentId
        ///    , "problemCode":problemCode, "username":username });
        ///xhr.send(data);
    };

    const executeCode = () => {
        var htmEditor = ace.edit("htmEditor");
        const assignmentId="2331b35b-0778-4810-b7ad-828527d74def";
        const problemCode="aplusb";
        const username="mduzgun";     //FIXME dinamikleştir
        sendCode("" + htmEditor.getValue(),lang,assignmentId,problemCode,username);

    }

    const runCode = () => {
        var htmEditor = ace.edit("htmEditor");
        const assignmentId="2331b35b-0778-4810-b7ad-828527d74def";
        const problemCode="aplusb";
        const username="mduzgun";     //FIXME dinamikleştir
        sendCodeForRun("" + htmEditor.getValue(),lang,assignmentId,problemCode,username);

    }
    const getTestRunResult= (submissionId)  => {
        compilerService.getTestRun(submissionId).then(res => {
            var resultArea = document.getElementById("resultArea");
            let testRunCaseList= res.data.testRunCaseList;
            let response="";
            if(testRunCaseList==undefined){
                resultArea.innerText = "Error is occurred !!!";
            }else{
                testRunCaseList.forEach(caseObj => {
                    console.log(caseObj)
                    if (caseObj.point==100){
                        response+= "Test Cases are passed succesfully"
                    }else{
                        response+= "Test Cases are not passed succesfully"
                    }
                    //response+= "Test Case "+caseObj.position+" ==> time= "+caseObj.time+", memory= "+caseObj.memory+", point= "+caseObj.point+"\n"
                });
                let testRun= res.data.testRun;
                //response+= "Total Result ==> time= "+testRun.time+", memory= "+testRun.memory+", point= "+testRun.point+"\n"

                resultArea.innerText = response;
            }
        });
    }


    const getSubmitResult= (submissionId)  => {
        compilerService.getSubmit(submissionId).then(res => {
            var resultArea = document.getElementById("resultArea");
            // {"testCaseList":[{"id":"22e5a3b6-4169-4196-812e-a8ecec4ca4da","submissionId":"a66d48ad-04f1-4be6-8d4e-00a017a1b74b",
            // "input":null,"output":"10\n2\n","position":1,"time":0.02956737,"memory":9688,"point":5,"totalPoint":5,
            // "status":"NOT_COMPLETED","createdDate":null},{"id":"124a8b6f-2fe8-4a72-bc72-82a0048a0418",
            // "submissionId":"a66d48ad-04f1-4be6-8d4e-00a017a1b74b","input":null,"output":"2\n4\n7\n19998\n200000\n",
            // "position":2,"time":0.030948658,"memory":9688,"point":20,"totalPoint":20,"status":"NOT_COMPLETED",
            // "createdDate":null},{"id":"c84d2af2-f611-4001-badd-62bae3d7daef","submissionId":"a66d48ad-04f1-4be6-8d4e-00a017a1b74b",
            // "input":null,"output":"907\n-809\n1207\n927\n16\n-1120\n146\n-112\n293\n-1708\n-636\n1156\n-1014\n-2","position":3,
            // "time":0.673969876,"memory":9688,"point":75,"totalPoint":75,"status":"NOT_COMPLETED","createdDate":null}],
            // "submission":{"id":"a66d48ad-04f1-4be6-8d4e-00a017a1b74b","assignmentId":"2331b35b-0778-4810-b7ad-828527d74def",
            // "problemCode":"aplusb","username":"mduzgun","time":0.734485904,"memory":9688,"point":100,"body":null,"language":null,
            // "status":"NOT_COMPLETED","result":"ACCEPTED","sonarUrl":null,"name":null,"createdDate":null,"updatedDate":null}}
            let testCaseList= res.data.testCaseList;
            let response="";
            if(testCaseList==undefined){
                resultArea.innerText = "Error is occurred !!!";
            }else{
                testCaseList.forEach(caseObj => {
                    console.log(caseObj)
                    response+= "Test Case "+caseObj.position+" ==> time= "+caseObj.time+", memory= "+caseObj.memory+", point= "+caseObj.point+"\n"
                });
                let submission= res.data.submission;
                response+= "Total Result ==> time= "+submission.time+", memory= "+submission.memory+", point= "+submission.point+"\n"

                resultArea.innerText = response;
            }
        });
    }

    const initEditor = () => {
        var pythonBegin =
            "N = int(input())\n\n" +
            "for _ in range(N):\n" +
            "    a, b = map(int, input().split())\n" +
            "    print(a + b)\n" ;

        ace.require("ace/ext/language_tools");

        var htmEditor = ace.edit("htmEditor");
        htmEditor.getSession().setMode("ace/mode/python");
        htmEditor.setTheme("ace/theme/monokai");
        htmEditor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true
        });
        htmEditor.setFontSize(23);

        //htmEditor.session.insert(0, javaBegin);//htmEditor.getCursorPosition()
        htmEditor.setValue(pythonBegin);
        htmEditor.setShowPrintMargin(false);
        htmEditor.setHighlightActiveLine(false);
    }

    const initJavaEditor = () => {
        var javaBegin =
            "public class Solution {\n\n" +
            "   public String solution(){\n" +
            "       // calculate factorial :) \n" +
            '       return "HELLO WORLD!!";\n' +
            "   }" +
            "\n}\n";
        ace.require("ace/ext/language_tools");

        var htmEditor = ace.edit("htmEditor");
        htmEditor.getSession().setMode("ace/mode/java");

        htmEditor.setValue(javaBegin);

    }


    const initPythonEditor = () => {
        var pythonBegin =
            "N = int(input())\n\n" +
            "for _ in range(N):\n" +
            "    a, b = map(int, input().split())\n" +
            "    print(a + b)\n";

        ace.require("ace/ext/language_tools");

        var htmEditor = ace.edit("htmEditor");
        htmEditor.getSession().setMode("ace/mode/python");

        htmEditor.setValue(pythonBegin);

    }

    window.addEventListener('load', initEditor);


  return (
      <div className="container">
          <h1>We Are The Champions!</h1>

          <select id="langOption" className="option" onChange={() => optionChanged()}>
              <option value="PY3">Python3</option>
              <option value="JAVA8">Java8</option>
          </select>

          <div className="row">
              <div className="col-sm-12" id="htmPane">
                  <div className="inner" id="htmEditor"></div>
              </div>

          </div>
          <button id="runButton" type="button" className="btn btn-dark" style={{background: '#f3f7f7',
              color: 'black'}} onClick={() => runCode()}>Run</button>
          <button id="executeButton" type="button" className="btn btn-dark" style={{background: '#4CAF50',
              color: 'white'}} onClick={() => executeCode()}>Execute</button>

          <br></br>
          <h3>Result:</h3>
          <div id="resultArea" style={{background: 'honeydew'}}>

          </div>
          <button className = "w-full py-3 bg-red-600 mt-4 text-white" style={{display: displayOfSignOutButton}} onClick = {() => {auth.signOut()}}>Sign out</button>

      </div>
  )
}

export default Compiler
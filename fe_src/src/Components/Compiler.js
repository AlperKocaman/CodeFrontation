import React from 'react'
import {auth} from "./Firebase";

const Compiler = () => {
    let displayOfSignOutButton='None'; //TODO for signout burasının değiştirilmesi gerekiyor
    let lang="java";
    let ace = require('ace-builds/src-noconflict/ace');
    let mode_java = require('ace-builds/src-noconflict/mode-java');//TODO if mode_java is not required, error is ocurred in htmEditor.getSession().setMode("ace/mode/java");
    let theme_monokai = require('ace-builds/src-noconflict/theme-monokai'); //TODO if theme-monokai is not required, error is ocurred in htmEditor.setTheme("ace/theme/monokai");
    const optionChanged = () => {
        lang = document.getElementById("langOption").value;
        if(lang=="java"){
            initJavaEditor()
        }else if(lang=="python"){
            initPythonEditor()
        }
    };

    const sendCode = (requestData,lang) => {
        var resultArea = document.getElementById("resultArea");

        // send data (method:post)
        var xhr = new XMLHttpRequest();
        var url = "http://localhost:8080/main/evaluate";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                //var json = JSON.parse(xhr.responseText);
                var resultString = xhr.responseText
                resultArea.innerHTML = resultString.replace(/\n/g, "<br />");
            }
        };
        var data = JSON.stringify({ "code": requestData, "lang":lang });
        xhr.send(data);
    };

    const executeCode = () => {
        var htmEditor = ace.edit("htmEditor");
        sendCode("" + htmEditor.getValue(),lang);
    }

    const initEditor = () => {
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
        htmEditor.setTheme("ace/theme/monokai");
        htmEditor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true
        });
        htmEditor.setFontSize(23);

        //htmEditor.session.insert(0, javaBegin);//htmEditor.getCursorPosition()
        htmEditor.setValue(javaBegin);
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
            "class Solution :\n\n" +
            "   def __init__(self,value):\n" +
            '       self.value = value \n' +
            "   def solution(self):\n" +
            "       # calculate factorial :) \n" +
            '       return "HELLO WORLD!!"\n' +
            "\n}\n";
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
              <option value="java">Java</option>
              <option value="python">Python</option>
          </select>

          <div className="row">
              <div className="col-sm-12" id="htmPane">
                  <div className="inner" id="htmEditor"></div>
              </div>

          </div>
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
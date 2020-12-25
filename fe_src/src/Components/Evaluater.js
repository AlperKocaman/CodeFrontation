import React, { Component } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/python';
import 'brace/mode/java';
import 'brace/mode/csharp';
import 'brace/mode/c_cpp';
import 'brace/mode/php';
import 'brace/mode/javascript';
import 'brace/snippets/python';
import 'brace/snippets/java';
import 'brace/snippets/csharp';
import 'brace/snippets/c_cpp';
import 'brace/snippets/php';
import 'brace/snippets/javascript';
import 'brace/ext/language_tools';
import 'brace/theme/dracula';
import 'brace/theme/dreamweaver';
import 'brace/theme/eclipse';
import 'brace/theme/github';
import 'brace/theme/chrome';
import 'brace/theme/tomorrow_night';

export class Evaluater extends Component {
   
    constructor(props) {
        super(props);
        
        this.onChange = this.onChange.bind(this);
        this.optionChanged = this.optionChanged.bind(this);
        this.optionThemeChanged = this.optionThemeChanged.bind(this);

        this.submitCode = this.submitCode.bind(this);
        this.executeCode = this.executeCode.bind(this);

        this.state = {
            themeName:'dracula',
            modeName:'java'
        };

    }

    onChange(newValue) {
        //console.log('change', newValue);
    }

    optionChanged = () => {
        let modeName = document.getElementById("langOption").value;
        this.setState({modeName:modeName});
    };
    optionThemeChanged = () => {
        let themeName = document.getElementById("themeOption").value;
        this.setState({themeName:themeName});
    };

    submitCode(){

    }
    executeCode(){

    }


    render() {
        return (
            <div style={{backgroundColor:'rgb(154, 163, 166)',width:'100vw',height:'100vh'}}>
                <div style={{color:'rgb(90, 78, 45)',width:'55vw',height:'60vh',marginLeft:'auto',marginRight:'auto'}}>
                    <h2  style={{marginLeft:'auto',marginRight:'auto'}}>Code Area</h2>
                    <div id ="editorContainer">
                        <AceEditor style={{width:'55vw',height:'60vh'}}
                        mode={this.state.modeName}
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
                    <div id = "editorButtons" style={{float:'right'}}>
                        <select id="langOption" className="compilerElements" onChange={() => this.optionChanged()} style={{marginRight:'2px'}}>
                            <option value="java">Java8</option>
                            <option value="python">Python3</option>
                            <option value="csharp">C#</option>
                            <option value="c_cpp">C/C++</option>
                            <option value="php">PHP</option>
                            <option value="javascript">Javascript</option>
                        </select>
                        <select id="themeOption" className="compilerElements" onChange={() => this.optionThemeChanged()} style={{marginRight:'0px'}}>
                            <option value="eclipse">Eclipse</option>
                            <option value="github">GitHub</option>
                            <option value="tomorrow_night">TomorrowNight</option>
                            <option value="chrome">Chrome</option>
                            <option value="dracula">Dracula</option>
                            <option value="dreamweaver">DreamWeaver</option>
                        </select>
                    </div>
                    <div>
                        <button className="compilerElements" onClick={()=>this.submitCode()} style={{marginRight:'2px'}} > Submit Code </button>
                        <button className="compilerElements" onClick={()=>this.executeCode()} > Try Code </button>
                    </div>
                    <div id ="consoleContainer">
                        <AceEditor style={{width:'55vw',height:'20vh'}}
                        mode={this.state.modeName}
                        theme={this.state.themeName}
                        value="output..."
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
                </div>         
            </div>
        );
    }
}

export default Evaluater;
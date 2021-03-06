import React, { Component } from 'react';

import './App.css';
var uuid = require('uuid');
var firebase = require('firebase'); 


var config = {
    apiKey: "AIzaSyCyzSpxSUnGdO2_aulWCvx8zbrmce2xiLU",
    authDomain: "simple-survey-app.firebaseapp.com",
    databaseURL: "https://simple-survey-app.firebaseio.com",
    storageBucket: "simple-survey-app.appspot.com",
    messagingSenderId: "567182102231"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: uuid.v1(),
      name:'',
      answers:{
        q1:'',
        q2:'',
        q3:'',
        q4:'' 
      },
      submitted: false
    }
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
  }
  handleNameSubmit(event){
    var name = this.refs.name.value;
    this.setState({name:name}, function(){
      console.log(this.state);

    });
    
   event.preventDefault();
  }
    

  handleQuestionSubmit(event){
      
      firebase.database().ref('surveys/' + this.state.id).set({
        name: this.state.name,
        answers: this.state.answers
      });
      this.setState({submitted:true}, function(){
        console.log('Questions Submitted...');
      });
      event.preventDefault();
  }
  handleQuestionChange(event){
    var answers = this.state.answers;
    

     if(event.target.name === 'q1'){
        answers.q1 = event.target.value;
     } else if(event.target.name === 'q2'){
       answers.q2 = event.target.value;
     } else if(event.target.name === 'q3'){
       answers.q3 = event.target.value;
     } else if(event.target.name === 'q4'){
       answers.q4 = event.target.value;
     }

     this.setState({answers:answers},function(){
        console.log(this.state);
     });
  }
  render() {
    var user;
    var questions;
    if(this.state.name && this.state.submitted === false){
          user = <h2> Welcome {this.state.name}</h2>
          questions = <span>
            <h3>Survey Questions</h3>
            <form onSubmit={this.handleQuestionSubmit.bind(this)}>
            
              <div>
              
                <label>what is your favorite operating system</label> <br />
                <input type = "radio" name= "q1" value= "Windows" onChange={this.handleQuestionChange}/>Windows<br />
                <input type = "radio" name= "q1" value= "OSX" onChange={this.handleQuestionChange}/>OSX<br />
                <input type = "radio" name= "q1" value= "Linux" onChange={this.handleQuestionChange}/>Linux<br />
                <input type = "radio" name= "q1" value= "Solaris" onChange={this.handleQuestionChange}/>Solaris<br />
                <input type = "radio" name= "q1" value= "Other" onChange={this.handleQuestionChange}/>Other<br />
            </div>
            <div>
              
                <label>what is your favorite brand of TV?</label> <br />
                <input type = "radio" name= "q2" value= "Sony" onChange={this.handleQuestionChange}/>Sony<br />
                <input type = "radio" name= "q2" value= "Samsung" onChange={this.handleQuestionChange}/>Samsung<br />
                <input type = "radio" name= "q2" value= "Panasonic" onChange={this.handleQuestionChange}/>Panasonic<br />
                <input type = "radio" name= "q2" value= "Vizio" onChange={this.handleQuestionChange}/>Vizio<br />
                <input type = "radio" name= "q2" value= "Other" onChange={this.handleQuestionChange}/>Other<br />
            </div>
            <div>
              
                <label>what is your favorite Smartphone Brand</label> <br />
                <input type = "radio" name= "q3" value= "Apple" onChange={this.handleQuestionChange}/>Apple<br />
                <input type = "radio" name= "q3" value= "Samsung" onChange={this.handleQuestionChange}/>Samsung<br />
                <input type = "radio" name= "q3" value= "Blackberry" onChange={this.handleQuestionChange}/>Blackberry<br />
                <input type = "radio" name= "q3" value= "Other" onChange={this.handleQuestionChange}/>Other<br />
            </div>
            <div>
              
                <label>what is your favorite Framework</label> <br />
                <input type = "radio" name= "q4" value= "Angularjs" onChange={this.handleQuestionChange}/>Angularjs<br />
                <input type = "radio" name= "q4" value= "Reactjs" onChange={this.handleQuestionChange}/>Reactjs<br />
                <input type = "radio" name= "q4" value= "Emberjs" onChange={this.handleQuestionChange}/>Emberjs<br />
                <input type = "radio" name= "q4" value= "Underscorejs" onChange={this.handleQuestionChange}/>Underscorejs<br />
                <input type = "radio" name= "q4" value= "Other" onChange={this.handleQuestionChange}/>Other<br />
            </div>
            <input type = "submit" value="submit" />

            </form>
          </span>
    }else if(!this.state.name && this.state.submitted === false){
        user = <span>
        <h2>Please enter your name to begin the survey</h2>
        <form onSubmit={this.handleNameSubmit.bind(this)}>
          <input type = "text" placeholder="Enter Name..." ref="name" />
        </form>
      </span>;
      questions = '';
    } else if(this.state.submitted === true){
        user = <h2>Thank you {this.state.name}</h2>
    }
    return (
      <div className="App">
        <div className="App-header text-center">
         <h2>SimpleSurvey</h2>
        </div>
        <div className = "text-center">
            {user}
        </div>
        <div className = "container">
          {questions}
        </div>
        
      </div>
    );
  }
}

export default App;

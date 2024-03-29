import React, { Component } from 'react';
import Person from './Person/Person';
import classes from './App.css';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends Component {
  state = {
     persons: [
      { id:'toto1', name :'Max', age: 28 },
      { id:'toto2', name :'Stephanie', age: 32 },
      { id:'toto3', name :'Manu', age: 36 },
  
    ],
    otherState: 'some other value',
    showPersons: false
  };



  // switchNameHandler = (newName) => {
  //   //console.log('was clicked');
  //   //this.state.persons[0].name = "Jonathan";
  //   this.setState({
  //       persons: [
  //         { id:'toto1', name : newName, age: 28 },
  //         { id:'toto2', name : 'Jules', age: 32 },
  //         { id:'toto3', name :'Manu', age: 30 }
    
  //       ]
  //     })
  // }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    

    const person = {
       ...this.state.persons[personIndex]
    };

    //const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
    });

    console.log(persons);
  }

  deletePersonhandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }


  render() {
 

    let persons = null;
    let btnClass = '';

    if(this.state.showPersons) {
      persons = (
           <div>
             {this.state.persons.map((person, index) => {
               return <ErrorBoundary key={person.id}>
                 <Person 
                  click={() => this.deletePersonhandler(index)}
                  name={person.name} 
                  age={person.age} 
                  changed={(event) => this.nameChangeHandler(event, person.id)}
                  />
                  </ErrorBoundary>
             })}
            </div> 
      );

      btnClass = classes.Red;
      
     
    }

    const assignedClasses = [];
    if(this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }

    if(this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (

          <div className={classes.App}>
            <h1>June 3nd </h1>
            <p className={assignedClasses.join(' ')}>It works</p>
            <button className={btnClass} onClick={this.togglePersonsHandler}>Switch name</button>
            {persons}          
          </div>

      );
      
    //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'In underground'));
  }

}
export default App;





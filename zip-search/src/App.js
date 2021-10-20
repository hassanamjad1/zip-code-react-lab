import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (<div>This is the City component</div>);
}

function ZipSearchField(props) {
  return (
  <div>
    Enter Zip Code : 
    <input type="text" onChange={ props.changeHandler } />
  </div>
  
  );
}


class App extends Component {

  state = {
    zipCode :'',
    cities : [],
    isLoaded : false,
    
  }
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     zipCode :'',
  //     cities : [],
  //     isLoaded : false,
  //   };
  // }
  zipChanged = (event) => {
    // console.log(event.target.value)
    this.setState({
       zipCode : event.target.value,
    })
    console.log(this.state.zipCode)
    
    let zipNum = event.target.value;

    if (zipNum.length === 5){
      fetch('http://ctp-zip-api.herokuapp.com/zip/'+zipNum)
        .then((res) => res.json())
        // .then((data) => console.log(data))
        .then( result => {  
          this.setState({
            cities : result,
            isLoaded : true,
          });
      });
    }
  }

  render() {
    const cityBox = {
      color : "black",
      backgroundColor : "lightgrey",
      // padding : "10px",
      fontSize : "30px",
      // paddingRight : "75px",
      // paddingLeft : "75px",
      
    };
    const { cities } = this.state;
    
    //isLabeled not working
    let  isLoaded = this.state;
    if(isLoaded){
      return (
        <div>
          <div className="App-header">
            <h2>Zip Code Search</h2>
          </div>
          <div className="App">  
            <ZipSearchField zipCode={this.state.zipCode} changeHandler={this.zipChanged} />
            <div>Current Zip is {this.state.zipCode}</div>
            {/* <div>Current cities is {this.state.cities}</div> */}

            <div  >
              {/* { this.state.cities.map( (city) => <City/>)} */}
              {/* { this.state.cities.map()} */}
              {/* <City />
              <City />
              <City /> */}
              {cities.map(item => (
                <div>
                  <div style = {cityBox}  >
                    <h3 style={{color: "white", backgroundColor : "black", fontSize : "25px" }} >{item.City}</h3>
                    <ul>
                      <li>
                        <h5>State : {item.State}</h5>
                      </li>
                      <li>
                        <h5>Location : {item.Location}</h5>
                      </li>
                      <li>
                        <h5>Population : {item.EstimatedPopulation}</h5>
                      </li>
                      <li>
                        <h5>Total Wages : {item.TotalWages}</h5>
                      </li>
                    </ul>
                  </div>
                  <br></br>
                  {/* <div></div> */}
                </div>
              ))}

            </div>
          </div>
        </div>
      );
    }else{
      return <div>Fetch() Failed</div>
    }
  }
}

export default App;

import './App.css';
import api from './Api';
import { Component } from 'react';

class App extends Component{

state={
  transferencia:[]
}

async componentDidMount(){
  const response = await api.get('');

  console.log(response.data);

  this.setState({transferencia: response.data})
}
  render(){
    return(
      <div>

      </div>
    );
  }
}

export default App;

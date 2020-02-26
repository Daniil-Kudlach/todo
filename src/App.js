import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App" style={{position:"fixed", top:"0", width:"100vw"}}>
      <Input todoList={ls()}/>
    </div>
  );
  function ls(){
    let arr = localStorage.getItem('todo');
    arr !== null? arr = JSON.parse(arr) : arr = [];
    return arr;
  }
}

class Input extends React.Component{
  constructor(props){
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleBtnDel = this.handleBtnDel.bind(this);
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
    this.state = {todoList:props.todoList, inputValue:''};
  }

  handleOnClick(){
    if(this.state.inputValue !== ''){
      this.setState(({todoList})=>{
        todoList.unshift(this.state.inputValue);
        localStorage.setItem('todo',JSON.stringify(todoList));
      });
      this.setState({inputValue:'',});
    }
  }

  handleOnChange(ev){
    this.setState({inputValue:ev.target.value,});
  }

  handleBtnDel(ev){
    let i = ev.target.className.match(/\d+/g)[0];
    this.setState((state)=>{
      state.todoList.splice(i,1);
      localStorage.setItem('todo',JSON.stringify(state.todoList));
    });
    this.setState({inputValue:'',});
  }

  handleOnKeyDown(ev){
   if(ev.key === 'Enter'){
    this.handleOnClick();
   }
  }

  render(){
    return(
    <div style={{marginTop:"3px"}}>
    <h3>TODO LIST</h3>
    <label>
    <input onChange={this.handleOnChange} onKeyDown={this.handleOnKeyDown} type="text" name="input" value={this.state.inputValue}/>
    <button onClick={this.handleOnClick}>ADD</button>
    </label>
    <Todo todoList={this.state.todoList} handleBtnDel={this.handleBtnDel}/>
    </div>)}
}

function Todo(props){
  const listyle = {
    border:"1px solid black",
    borderRadius:"5px",
    listStyle:"none",
    padding: "10px 10px 25px 10px",
    fontFamily: "Arial",
    margin: "10px",
    wordWrap:"break-word",
    position:"relative",
    textAlign:"justify",
    boxShadow:' 0 0 5px 2px black',
  };
  const ulstyle = {
    margin:"auto",
    width:"60vw",
    height:"70vh",
    overflowY:"scroll",
    paddingBottom:"10px",
    boxShadow:' inset 0 0 15px 5px black',
    borderRadius:"5px",
  }
  const btnstyle = {
    width:"20px",
    height:"20px",
    borderRadius:"50%",
    position:"absolute", 
    right:"10px", 
    bottom:"5px",
    padding:"0",
    lineHeight:"10px",
    color:"red",
  }
    return(
      <div>
      <ul style={ulstyle}>{props.todoList.map((item,i) => (<li key={item+i} style={listyle}><span>{item}</span><button style={btnstyle} className={`btnDel${i}`} onClick={props.handleBtnDel}>X</button></li>))}</ul>
      </div>
    )
}

export default App;


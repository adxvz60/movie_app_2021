
function App() {
  return (
    <div className="App">
      <h1>Hello react!!!!!!!!</h1>
      <Food fav = "Kimchi" something={true} />
      
    </div>
  );
}

function Food(props){
  //console.log(props);
  return(
  <h3>I love {props.fav}</h3>
  );
}

export default App

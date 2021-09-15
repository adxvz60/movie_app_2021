
function App() {
  return (
    <div className="App">
      <h1>Hello react!!!!!!!!</h1>
      <Food fav = "Kimchi" something={true} papapa={['hello', 1, 2, true]}/>
      
    </div>
  );
}

function Food(props){
  console.log(props);
  return(
  <h3>I love potato</h3>
  );
}

export default App

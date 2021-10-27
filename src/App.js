
import { HashRouter,Route } from 'react-router-dom'

import './App.css'
import About from './routes/About'

function App(){
    return(
        <HashRouter>
            <Route path="/home" />
            <Route path="/about"  component={About} />
        </HashRouter>
    )
}

export default App;
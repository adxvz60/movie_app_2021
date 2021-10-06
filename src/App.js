//import React, {Component} from 'react'
import React from "react";

class App extends React.Component{
    constructor(props) {
        super(props)
        console.log('constructor');
    }

    componentDidMount(){
        console.log('componentDidMount');
    }

    componentDidUpdate(){
        console.log('componentDidUpdate');
    }

    render(){
        console.log('render')
        return(
            <div>
                <h1>Hello</h1>
            </div>
        )
    }
}

export default App;
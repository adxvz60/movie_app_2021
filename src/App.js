//import React, {Component} from 'react'
import React from "react";

class App extends React.Component{
    state = {
        isLodaing: true
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({isLoading: false})
        }, 5000)
    }

    render(){
        const{ isLoading } = this.state
        return(
            <div>
                {isLoading ? 'Loading...' : 'We are ready'}
            </div>
        )
    }
}

export default App;
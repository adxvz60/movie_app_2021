//import React, {Component} from 'react'
import React from "react";
import axios from "axios";

class App extends React.Component{
    state = {
        isLodaing: true,
        movies: []
    }

    componentDidMount() {
        //영화 데이터 로딩
        axios.get('https:yts-proxy.now.sh/list_movies.json')
    }

    render(){
        const{ isLoading } = this.state
        return(
            <div>
                {isLoading ? 'Loading...' : '영화 데이터 출력'}
            </div>
        )
    }
}

export default App;
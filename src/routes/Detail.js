import react from "react";

class Detail extends React.Component {
    componentDidMount(){
        const{location,history} = this.props
        if(location.state === undefined){
            history('/')
        }
    }
}
    return (
        <span>{location, history}</span>
    )


export default Detail;
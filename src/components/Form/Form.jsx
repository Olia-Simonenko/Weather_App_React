import React,{Component} from "react";
import "./Form.css";


class Form extends Component{
    
    render(){
        return(
            <form onSubmit={this.props.getWeather}>
                <div className="row">
                    <div className="form-group">
                        <div className="col-md-4 col-xs-6 col-md-offset-4 col-xs-offset-3 text-center"> 
                            <div className="input-group">
                                <input className="form-control" type="text" name="city" placeholder="Enter city..."/>
                                <span className="input-group-btn">
                                    <button className="btn btn-secondary" onClick={this.clearBtn}>&#10148;</button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </form>   
        );
    }
}

export default Form;

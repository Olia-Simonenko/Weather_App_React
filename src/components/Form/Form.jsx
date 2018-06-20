import React from "react";

const Form = props =>(
    <form onSubmit={props.getWeather}>
    <div className="row">
        <div className="form-group">
            <div className="col-md-4 col-md-offset-4 text-center"> 
                <div className="input-group">
                    <input className="form-control" type="text" name="city" placeholder="Enter city..." pattern="^[a-zA-Z]+$"/>
                        <span className="input-group-btn">
                            <button className="btn btn-secondary">&#10148;</button>
                        </span>
                </div>
            </div>
        </div>
    </div>
    </form>   
);

export default Form;

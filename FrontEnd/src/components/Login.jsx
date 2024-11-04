import React, { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";

function Login(props) {
    const [input, setInput] = useState();

    function onSubmit() {

    }

    const handleToggleChange = (selectedOption) => {
        input['option'] = selectedOption;
    };

    function handleOnChange(event) {
        const { name, value } = event.target;
        input[name] = value;
    
        console.log(input);
    }

    return (
        <div className="container mt-5">
            <h1 style={styles.title}>Login</h1>
    
            <div className="row">
                <div className="col-sm-8">
                    <div style={styles.loginCard} className="card">
                        <div className="card-body">
                            <form onChange={handleOnChange}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" name="username" placeholder="Enter email"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password" placeholder="Enter password"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="switch">Login as</label>
                                    <ToggleSwitch optionA="Coach" optionB="Competitor" onChange={handleToggleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="teamName">Team name</label>
                                    <input type="text" className="form-control" name="teamName" placeholder="Enter team name"/>
                                </div>
                                <button onClick={onSubmit} type="submit" className="btn btn-dark">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
        
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-body">
                            <a className="btn btn-block" href="/auth/google" role="button">
                                <i className="fab fa-google"> Sign In with Google </i>
                            </a>
                        </div>
                    </div>
                </div>
        
            </div>
        </div>
    )
};

const styles = {
    title: {
        color: "#50125c",
        marginBottom: "20px"
    },
    loginCard: {
        color: "#fff",
        backgroundColor: "#50125c",
    }
}

export default Login;
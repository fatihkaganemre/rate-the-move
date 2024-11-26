import React, { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";

function Login(props) {
    const [input, setInput] = useState({});

    const onSubmit = (event) => {
        event.preventDefault();
        props.onLogin(input);
    };

    const handleToggleChange = (selectedOption) => {
        setInput(prevInput => ({
            ...prevInput,
            option: selectedOption
        }));
    };

    function handleOnChange(event) {
        const { name, value } = event.target;
        setInput(prevInput => ({
            ...prevInput,
            [name]: value
        }));
    };

    return (
        <div className="container mt-5">
            <h1 style={styles.title}>Login</h1>
    
            <div className="row">
                <div className="col-sm-8">
                    <div style={styles.loginCard} className="card">
                        <div className="card-body">
                            <form onChange={handleOnChange} onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input id="email" type="email" className="form-control" name="email" placeholder="Enter email" autoComplete="on" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input id="password"  type="password" className="form-control" name="password" placeholder="Enter password" autoComplete="on" required/>
                                </div>
                                <div className="form-group">
                                    <ToggleSwitch optionA="Coach" optionB="Competitor" onChange={handleToggleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="teamName">Team name</label>
                                    <input id="teamName" type="text" className="form-control" name="teamName" placeholder="Enter team name" autoComplete="on" required/>
                                </div>
                                <input type="submit" value="Login" className="btn btn-dark"/>
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
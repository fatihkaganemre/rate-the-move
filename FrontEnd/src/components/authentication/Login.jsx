import React, { useState } from "react";

function Login(props) {
    const [input, setInput] = useState({});

    const onSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(input);
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
                                <div style={styles.loginRegister}>
                                    <input type="submit" value="Login" className="btn btn-dark"/>
                                    <button type="button" onClick={props.onRegister} className="btn btn-light">Register</button>
                                </div>
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
    },
    loginRegister: {
        display: "flex",
        flexDirection: "row",
        gap: "10px"
    }
}

export default Login;
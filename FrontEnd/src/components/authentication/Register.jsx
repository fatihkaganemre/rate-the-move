import React, { useState } from "react";
import ToggleSwitch from "../common/ToggleSwitch";

function Register(props) {
    const [input, setInput] = useState({});
    const [type, setType] = useState('coach');

    const onSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(input);
    };

    function handleOnChange(event) {
        const { name, value } = event.target;
        setInput(prevInput => ({
            ...prevInput,
            type: type,
            [name]: value
        }));
    };

    return (
        <div className="container mt-5">
            <h1 style={styles.title}>Register</h1>
    
            <div className="row">
                <div className="col-sm-8">
                    <div style={styles.loginCard} className="card">
                        <div className="card-body">
                            <form onChange={handleOnChange} onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input id="name" type="text" className="form-control" name="name" placeholder="Enter name" autoComplete="on" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="surname">Surname</label>
                                    <input id="surname" type="text" className="form-control" name="surname" placeholder="Enter surname" autoComplete="on" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input id="email" type="email" className="form-control" name="email" placeholder="Enter email" autoComplete="on" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input id="password"  type="password" className="form-control" name="password" placeholder="Enter password" autoComplete="on" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="switch">Login as</label>
                                    <ToggleSwitch optionA="Coach" optionB="Competitor" onChange={setType} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="teamName">Team name</label>
                                    <input id="teamName" type="text" className="form-control" name="teamName" placeholder="Enter team name" autoComplete="on" required/>
                                </div>
                                <div style={styles.loginRegister} className="form-group">
                                    <input type="submit" value="Register" className="btn btn-dark"/>
                                    <button className="btn btn-light" onClick={props.onCancel}>Cancel</button>
                                </div>
                            </form>
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

export default Register;
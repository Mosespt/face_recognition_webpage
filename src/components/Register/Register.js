import React, { useState, useEffect } from "react";
import PowerModeInput from "power-mode-input";
import "./Register.css";

const Register = ({ onRouteChange, loadUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        const name = document.getElementById("name");
        const password = document.getElementById("password");
        const email = document.getElementById("email-address");

        PowerModeInput.make(name, { color: "white" });
        PowerModeInput.make(password, { color: "white" });
        PowerModeInput.make(email, { color: "white" });
    }, []);

    function onEmailChange(event) {
        setEmail(event.target.value);
    }

    function onPasswordChange(event) {
        setPassword(event.target.value);
    }

    function onNameChange(event) {
        setName(event.target.value);
    }

    function onSubmitRegister() {
        fetch("https://brainy-server.onrender.com/register", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password,
                name: name,
            }),
        })
            .then((response) => response.json())
            .then((user) => {
                if (user.id) {
                    loadUser(user);
                    onRouteChange("signin");
                }
            });
    }

    return (
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center glass">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset
                        id="sign_up"
                        className="ba b--transparent ph0 mh0"
                    >
                        <legend className="f2 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="text"
                                name="name"
                                id="name"
                                onChange={onNameChange}
                            />
                        </div>
                        <div className="mt3">
                            <label
                                className="db fw6 lh-copy f6"
                                htmlFor="email-address"
                            >
                                Email
                            </label>
                            <input
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="email"
                                name="email-address"
                                id="email-address"
                                onChange={onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label
                                className="db fw6 lh-copy f6"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="password"
                                name="password"
                                id="password"
                                onChange={onPasswordChange}
                            />
                        </div>
                    </fieldset>
                    <div className="">
                        <input
                            onClick={onSubmitRegister}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Register"
                        />
                    </div>
                    <div className="lh-copy mt4">
                        <p className="f6 dark-grey di">
                            Already have an account?{" "}
                        </p>
                        <p
                            onClick={() => onRouteChange("signin")}
                            className="f6 link dim black di pointer"
                        >
                            Sign In
                        </p>
                    </div>
                </div>
            </main>
        </article>
    );
};

export default Register;

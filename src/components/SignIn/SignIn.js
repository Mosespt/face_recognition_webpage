import React, { useState, useEffect } from "react";
import PowerModeInput from "power-mode-input";
import "./SignIn.css";

const SignIn = ({ onRouteChange, loadUser }) => {
    const [signInEmail, setSignInEmail] = useState("");
    const [signInPassword, setSignInPassword] = useState("");

    useEffect(() => {
        const passM = document.getElementById("password");
        const emailM = document.getElementById("email-address");
        PowerModeInput.make(passM, { color: "white" });
        PowerModeInput.make(emailM, { color: "white" });
    }, []);

    function onEmailChange(event) {
        setSignInEmail(event.target.value);
    }

    function onPasswordChange(event) {
        setSignInPassword(event.target.value);
    }

    function onSubmitSignin() {
        fetch("https://brainy-server.onrender.com/signin", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword,
            }),
        })
            .then((response) => response.json())
            .then((user) => {
                if (user.id) {
                    loadUser(user);
                    onRouteChange("home");
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
                        <legend className="f2 fw6 ph0 mh0">B R A I N Y</legend>
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
                            onClick={onSubmitSignin}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Sign in"
                        />
                    </div>
                    <div className="lh-copy mt4">
                        <p className="f6 dark-grey di">New here? </p>
                        <p
                            onClick={() => onRouteChange("register")}
                            className="f6 link dim black di pointer"
                        >
                            Register
                        </p>
                    </div>
                </div>
            </main>
        </article>
    );
};

export default SignIn;

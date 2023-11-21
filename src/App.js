import React, { useState } from "react";
import ParticlesBg from "particles-bg";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import "./App.css";

function App() {
    const [input, setInput] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [box, setBox] = useState({});
    const [route, setRoute] = useState("signout");
    const [isSignedIn, setSignedIn] = useState(false);
    const [user, setUser] = useState({
        user: {
            id: "",
            name: "",
            email: "",
            entries: 0,
            joined: new Date(),
        },
    });

    const loadUser = (userData) => {
        setUser({
            ...userData,
            user: {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                entries: userData.entries,
                joined: userData.joined,
            },
        });
    };

    const calculateFaceLocation = (data) => {
        const clarifaiFace =
            data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById("inputImage");
        const width = (image.width = Number(image.width));
        const height = (image.height = Number(image.height));
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - clarifaiFace.right_col * width,
            bottomRow: height - clarifaiFace.bottom_row * height,
        };
    };

    const displayFaceBox = (box) => {
        setBox(box);
    };

    const onInputChange = (event) => {
        setInput(event.target.value);
    };

    const onButtonSubmit = () => {
        setImageUrl(input);

        fetch("https://brainy-server.onrender.com/imageurl", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                input: input,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response) {
                    fetch("https://brainy-server.onrender.com/image", {
                        method: "put",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            id: user.id,
                        }),
                    })
                        .then((response) => response.json())
                        .then((count) => {
                            setUser(Object.assign(user, { entries: count }));
                        })
                        .catch(console.log);
                }
                displayFaceBox(calculateFaceLocation(response));
            })
            .catch((err) => console.error(err));
    };

    const onRouteChange = (myRoute) => {
        setRoute({ route: myRoute });
        if (myRoute === "home") {
            setSignedIn({ isSignedIn: false });
            setImageUrl("");
        } else {
            setSignedIn(isSignedIn === true);
        }
    };

    return (
        <div className="App">
            <ParticlesBg
                className="particles"
                color="#ff8282"
                num={200}
                type="cobweb"
                bg={true}
            />

            <div className="container">
                <div className="left-component">
                    <Logo />
                </div>
                <div className="right-component">
                    <Navigation
                        isSignedIn={isSignedIn}
                        onRouteChange={onRouteChange}
                    />
                </div>
            </div>

            {route.route === "home" ? (
                <div>
                    <Rank name={user.name} entries={user.entries} />
                    <ImageLinkForm
                        onInputChange={onInputChange}
                        onButtonSubmit={onButtonSubmit}
                    />
                    <FaceRecognition box={box} imageUrl={imageUrl} />
                </div>
            ) : route.route === "register" ? (
                <Register loadUser={loadUser} onRouteChange={onRouteChange} />
            ) : (
                <SignIn loadUser={loadUser} onRouteChange={onRouteChange} />
            )}
        </div>
    );
}

export default App;

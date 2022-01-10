import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm.js';
import Rank from './components/rank/Rank.js';
import FaceRecognition from './components/faceRecognition/FaceRecognition.js'
import Particles from "react-tsparticles";
import SignIn from "./components/signIn/SignIn.js";
import Register from "./components/register/Register.js";

// const app = new Clarifai.App({
//  apiKey: 'e2251cc2cbad4eacbfae87ce8c9f35bd'
// });

const initialState = {
    input: '', // user input
    imageUrl: '',
    box: {},
    route: 'signin', // keep track of where we are on the page
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0, // how many images sent
      joined: '' // when  they joined
    }
}

class App extends Component {
  constructor() {
    super(); // to use 'this'
    this.state = initialState;
    console.log('initialstate', initialState.route);
  }

  loadUser = (data) => {
    this.setState({user: 
      {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries, // how many images sent
        joined: data.joined // when  they joined
    }})
  }

  calculateFaceLocation = (data) => { // bounding box
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box; // bounding box goes by % of image
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    return { // find dots for: left corner, right corner, bottom left, bottom right
      leftColumn: clarifaiFace.left_col * width, // left_col is % of width so multiply by width
      topRow: clarifaiFace.top_row * height,
      rightColumn: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    // console.log(box);
    this.setState({box: box}) // state is now set w/ box
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onPictureSubmit = () => { // when 'detect' btn is clicked
    // console.log("clicked");
    this.setState({imageUrl: this.state.input}); // have image url updated w/ whatever input is
    // app.models
    // .predict(
    //   Clarifai.FACE_DETECT_MODEL, // model
    //   this.state.input) // url as input, cannot use image url here
    fetch('https://facialrecognitionapi.herokuapp.com/imageurl', { // get from backend
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch('https://facialrecognitionapi.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => { // update entries
          this.setState(Object.assign(this.state.user, {entries: count})) // target obj, what you want to extend it with
        })
        .catch(console.log); // error handling after .then
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState) // signing out how to make this return to sign in screen
      console.log('route now', this.state.route);
    }
    else if (route === "home") {
      this.setState({isSignedIn: 'true'}) // signing in
    }
    this.setState({route: route}); // wrap in curly brackets since it's an object
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles
          params={{
            fpsLimit: 60,
            particles: {
              color: {
                value: "#000"
              },
              links: {
                enable: true,
                color: "#000",
                distance: 150
              },
              move: {
                enable: true
              }
            }
          }}
        />
        
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home' 
        ? <div>
          <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries} />
          <ImageLinkForm
            onInputChange={this.onInputChange}
            onPictureSubmit={this.onPictureSubmit}
          />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </div>
        : (
          route === "signin" 
          ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )
      }
      </div>
    );
  }
}

export default App;





/// new
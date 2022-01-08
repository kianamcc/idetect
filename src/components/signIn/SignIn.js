import React from 'react';
import Error from "../error/Error.js";

// auto - height automatically adjusted based on width
// props are the parameters
class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signInEmail: '',
            signInPassword: '',
            errorMessage: false // new
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    // Grab signin route, if we get a response, we then load the user with that response
    onSubmitSignIn = () => {
        // console.log(this.state);
        fetch('https://facialrecognitionapi.herokuapp.com/signin',  { // send to whatever host api server is on
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword,
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange("home");
            }
            else {
                this.setState({errorMessage: true});
            }
        }) 
    }


    render() {
        const { onRouteChange } = this.props;
        const displayError = this.state.errorMessage;
        let msg;

        if (displayError) {
           msg = <Error/>
          }

        return (
  
            <article className="br3 ba b--white mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 white">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            required
                            type="email"
                            name="email-address" 
                            id="email-address"
                            onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            required
                            type="password"
                            name="password" 
                            id="password"
                            onChange={this.onPasswordChange}
                            />
                        </div>
                        {msg}
                        </fieldset>
                        <div className="">
                        <input
                            onClick={this.onSubmitSignIn} // defining function, not calling
                            // onClick={this.onSignInSuccess} // new
                            className="br-pill ph3 pv2 input-reset ba b--white white bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Sign in"
                            />
                        </div>
                        <div className="lh-copy mt3">
                        <p onClick={() => onRouteChange("register")} className="f6 link dim white db pointer">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
} // end signin extends

export default SignIn;









/// newewww
// import React from 'react';

// // auto - height automatically adjusted based on width
// // props are the parameters
// class SignIn extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             signInEmail: '',
//             signInPassword: ''
//         }
//     }
//     onEmailChange = (event) => { // update the empty email state
//         this.setState({signInEmail: event.target.value})
//     }

//     onPasswordChange = (event) => {
//         this.setState({signInPassword: event.target.value})
//     }

//     handleSubmit

//     // Grab signin route, if we get a response, we then load the user with that response
//     onSubmitSignIn = () => {
//         console.log(this.state);
//         fetch('http://localhost:3001/signin',  { // send to whatever host api server is on
//             method: 'post',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//                 email: this.state.signInEmail,
//                 password: this.state.signInPassword,
//             })
//         })
//         .then(response => response.json())
//         .then(user => {
//             if (user.id) {
//                 this.props.loadUser(user);
//                 this.props.onRouteChange("home");
//             }
//             else if (!user.id) {
//                 console.log('error');
//             }
//         }) 
//     }

//     render() {
//         const { onRouteChange } = this.props;

//         // const [submitted, setSubmitted] = this.setState(false);

//         return (
//             <div className="form-container ">
//               <form className="register-form center">
//                 {/* Uncomment the next line to show the error message */}
//                 {/* <span id="first-name-error">Please enter a first name</span> */}
//                 <input
//                   id="email"
//                   className="form-field"
//                   type="text"
//                   placeholder="Email"
//                   name="email"
//                   required
//                 />
//                 {/* Uncomment the next line to show the error message */}
//                 {/* <span id="last-name-error">Please enter a last name</span> */}
//                 <input
//                   id="password"
//                   className="form-field"
//                   type="text"
//                   placeholder="Password"
//                   name="password"
//                   required
//                 />
//                 {/* Uncomment the next line to show the error message */}
//                 {/* <span id="email-error">Please enter an email address</span> */}
//                 <button className="form-field" type="submit">
//                   Sign in
//                 </button>
//               </form>
//             </div>
//           );
//     }
// } // end signin extends

// export default SignIn;

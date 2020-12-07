import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config'; 
import userEvent from '@testing-library/user-event';
import { useState } from 'react';



firebase.initializeApp(firebaseConfig);



const App = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  })

  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, email, photoURL} = res.user;
      const signedIn = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedIn)
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
  }


  const handleSignOut = () => {
    firebase.auth().signOut()
    .then(res =>{
      const signOut = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
      }
      setUser(signOut)
    })
   .catch(err => {
     console.log(err);
   })
  }





  return (
    <div className="App">
      


      {
        user.isSignedIn && <div>
          <h1>welcome,{user.name}</h1>
          <h1>EMAIL: {user.email}</h1>
          <img src={user.photo} alt=""/>
        </div>
      }


{
        user.isSignedIn ? <button onClick={handleSignOut} style={{backgroundColor:'green', color: 'red', height: '80px' ,width: '300px', borderRadius: '5px', marginTop: '50px'}}><h2>jhumu click here to log out</h2> </button>
        : <button onClick={handleSignIn}
        style={{backgroundColor:'green', color: 'red', height: '80px' ,width: '300px', borderRadius: '5px', marginTop: '50px'}}> <h2>jhumu click here to log in</h2> </button>
        
      }
    </div>
  );
};

export default App;


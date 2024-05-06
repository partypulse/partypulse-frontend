import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import StartPage from "./pages/start/startpage";
import LoginPage from "./pages/login/loginpage";
import RegisterPage from "./pages/register/registerpage";


function App() {
    const [view, setView ] = useState("start");

  return (
    <div className="App">

        <nav>
        <button onClick={()=> setView("login")}>Login</button>

        <button onClick={()=> setView("register")}>Register</button>

        <button onClick={()=> setView("start")}>Home</button>

        </nav>

        {view==="start"&&(
            <StartPage/>
        )}

        {view==="login"&&(
            <LoginPage/>
        )}

        {view==="register"&&(
            <RegisterPage/>
        )}




    </div>
  );
}

export default App;

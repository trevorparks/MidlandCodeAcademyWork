import React, {useState} from 'react';
import { useUserContext } from '../context/UserContext';
import Button from '../styled/elements/Button.js';
import axios from 'axios'; 


const bcrypt = require("bcryptjs");

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUserContext();

  let reqURL;

  const handleLogin = async (e) => {
    e.preventDefault();
  
     reqURL = 'http://localhost:3006/' + e.target.value;

    try {
      const response = await axios.post(reqURL, {
        username: username,
        password: password
      });
    if (response.status === 200) {
      setUser({ username });
    } else {
      console.error("Error registering");
    }
   }
    catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form>
        <label htmlFor='username'>Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
        />
        <label htmlFor='password'>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          type='password'
        />
        <Button value = 'register' primary
          disabled={username.length < 4 || password.length < 4}
          onClick={(e) => {
            handleLogin(e);
          }}
        >
          Register
        </Button>
        <Button value = 'login' primary
          disabled={username.length < 4 || password.length < 4}
          onClick={(e) => {
            handleLogin(e);
          }}
        >
          Login
        </Button>
      </form>
    </div>
  )
};

export default LoginPage;
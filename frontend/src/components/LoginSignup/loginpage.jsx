import React, { useState , useEffect} from 'react';
import './loginpage.css';
import user_icon from '../../assets/person.png';
import email_icon from '../../assets/email.png';
import pass_icon from '../../assets/password.png';
import axios from 'axios';

// Make sure the component name starts with an uppercase letter
const LoginPage = () => {

  const [action, setAction] = useState('Login');
  const [username, setUsername] = useState('');
  // const [fullName, setfullName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);


  
  useEffect(() => {
    if (user) {
      const storedJWT = localStorage.getItem('user');
      const jwtToken = JSON.parse(storedJWT)?.token;
      console.log(jwtToken);

      // const url = http://localhost:4002/api/${jwtToken};

      axios.get(`http://192.168.188.224:4002/api/${jwtToken}`)
        .then((response) => {
          // Handle successful response

          setUserData(JSON.stringify(response.data)); // Assuming the server responds with JSON data
        })
        .catch((error) => {
          // Handle error
          console.error('Error:', error);
        });
    }
  }, [user]);


  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);
  
  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://192.168.188.224:4002/register-user', {
        email,
        username,
        password,
      });
      if (response.data.success) {
        setMessage(response.data.message);
        // window.location.href('http://localhost:3000/asc');
        window.location.href = '/login';
        // alert("PLss login in")
        console.log("helo")
      } else {
        setMessage('Invali  d username or password');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred during login');
    }
  };

  // const handleLogin = async () => {
  //   try {
  //     const response = await axios.post('http://192.168.188.224:4002/register-user', {
  //       email,

  //       password,
  //     });
  //     if (response.data.success) {
  //       setMessage(response.data.message);
  //       // window.location.href('http://localhost:3000/about');
  //       // window.location.href = '/home';
  //       setMessage("Kindly Login In")
  //     } else {
  //       setMessage('Invali  d username or password');

  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setMessage('An error occurred during login');
  //   }
  // };


  

  // logout the user
  const handleLogout = () => {
    setUser(null);
    setEmail('');
    setPassword('');
    localStorage.removeItem('user');
  };

  // login the user
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://192.168.188.224:4002/login', {
        email,
        password,
      });
      setUser(response.data);

      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      console.error('Login failed:', error);
    }
  };


  // if there's a user show the message below
  if (user) {
   
      window.location.href = '/';
        {/* {`${JSON.parse(userData)?.decoded?.email} is logged in`}
        <button onClick={handleLogout}>Logout</button> */}
      
      
 
  }  
  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>
      
      <div className='inputs'>
        {action === 'Login' ? (
          <div></div>
        ) : (
          
          <div className='input'>
            <img src={user_icon} alt='' />
            <input
              type='text'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}
        
        

        <div className='input'>
          <img src={email_icon} alt='' />
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='input'>
          <img src={pass_icon} alt='' />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      {action === 'Sign Up' ? (
        <div></div>
      ) : (
        <div className='forgot'>Forgot Password?</div>
      )}
      {action === 'Sign Up' ? (
        <div className='submit-cont'> <button className='submit' onClick={handleSignUp}>Sign Up</button></div>
      ) : (
        <div className='submit-cont'><button  className="submit" onClick={handleLogin}>Login</button></div>
      )}

      <div className='submit-container'>
        <div
          className={action === 'Login' ? 'submit gray' : 'submit'}
          onClick={() => {
            setAction('Sign Up');
          }}
        >
          Go to SignUp
        </div>
        <div
          className={action === 'Sign Up' ? 'submit gray' : 'submit'}
          onClick={() => {
            setAction('Login');
          }}
        >
          Go to Login
        </div>
      </div>
      <p>{message}</p>
    
    </div>
  );
};

export default LoginPage;

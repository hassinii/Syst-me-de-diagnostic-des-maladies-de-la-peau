import React, { useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useUserData } from '../../contexts/UserDataContext';


function ForgetPass() {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true); 
  const [isResponse, setresponse] = useState(false)
  const inputRef=useRef();
  const navigate = useNavigate();
  const {path} = useUserData();
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const handleSubmit =async (e) => {
    e.preventDefault();

    // Valider le format de l'e-mail (par exemple, en utilisant une expression régulière)
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (emailRegex.test(email)) {
      // L'e-mail est valide, naviguer vers la page de destination
      setIsEmailValid(true);
      console.log(inputRef.current.value);
      try {
        const requestData = {
          email: email,
        };
      
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        let response = await axios.post(`${path}/request_password_reset`,requestData,config)
        console.log(response.status);
        setError("")
        setMessage("")
        if(response){
          setresponse(true)
        }
        if(response.status === 200){
          setMessage("An email has been sent with instructions to reset your password")
        }
        else if(response.status === 422){
          setresponse(true)
          setError("User with this email not found")
        }
        else{
          setresponse(true)
          console.log(response.data);
          setError("Error try again !")
        }
      } catch (error) {
        setError("")
        setMessage("")
        setresponse(true)
        setError("Error try again !")
      }
    } else {
      setIsEmailValid(false);
      console.log("invalid email ");
    }
  };

  return (
    <>
    
    <div className="container mt-5" style={styles.container}>
      <img src="https://cdn-icons-png.flaticon.com/512/6146/6146587.png" style={styles.image} className='mx-auto d-block'/>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div className="form-group">
          <label htmlFor="email" className='mb-2 label-control'>E-mail adress</label>
    
          <input
            type="text"
            className={`form-control ${isEmailValid ? '' : 'is-invalid'}`}
            id="email"
            placeholder="your-email@example.com"
            ref={inputRef}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          {!isEmailValid && (
            <div className="text-danger">The email address is not valid</div>
          )}
        </div>
        
        <button className="btn btn-primary justify-content-center" style={styles.button}>Rest password</button>
        {isResponse && message !="" && <div className="p-3 mb-2  text-success">{message}</div>}
        {isResponse && error !="" && <div className="p-3 mb-2  text-danger">{error}</div>}
      </form>
    </div>
    </>
  );
}

export default ForgetPass;


const styles ={
    container :{
      width:500,
      display:"flex",
      alignItem:"center",
      justifyContent:"center"
    },
    form:{
      width:400,
    },
    button:{
      marginTop:20,
    },
    image:{
      width:40,
      height:40,
      marginTop:-25
    }
  };
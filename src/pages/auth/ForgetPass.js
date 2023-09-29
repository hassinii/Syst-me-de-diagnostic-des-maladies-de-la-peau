import React, { useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function ForgetPass() {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true); // État pour gérer la validation de l'e-mail
  const inputRef=useRef();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    // Valider le format de l'e-mail (par exemple, en utilisant une expression régulière)
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (emailRegex.test(email)) {
      // L'e-mail est valide, naviguer vers la page de destination
      setIsEmailValid(true);
      console.log(inputRef.current.value);
      navigate('/forgetpass/newpasseword');
    } else {
      // L'e-mail n'est pas valide, définir l'état d'erreur
      setIsEmailValid(false);
      console.log("invalid email ");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Formulaire</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Adresse e-mail</label>
          <input
            type="text"
            className={`form-control ${isEmailValid ? '' : 'is-invalid'}`}
            id="email"
            placeholder="Adresse e-mail"
            ref={inputRef}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!isEmailValid && (
            <div className="invalid-feedback">L'adresse e-mail n'est pas valide.</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">Soumettre</button>
      </form>
    </div>
  );
}

export default ForgetPass;

import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function PasswordChange() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const newPasswordAction = (e) => {
    e.preventDefault(); // Empêche la soumission du formulaire par défaut
    
    if (newPassword.trim() === '' || confirmPassword.trim() === '') {
      setMessage('Veuillez remplir tous les champs.');
    } else if (newPassword === confirmPassword) {
      // Ajoutez ici la logique pour changer le mot de passe.
      setMessage('Mot de passe changé avec succès.');
    } else {
      setMessage('Les mots de passe ne correspondent pas.');
    }
  };
  

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">Changer le mot de passe</div>
            <div className="card-body">
              <div className="form-group">
                <label>Nouveau mot de passe :</label>
                <input
                  type="password"
                  className="form-control"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
              </div>
              <div className="form-group">
                <label>Confirmer le mot de passe :</label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
              <button onClick={newPasswordAction} className="btn btn-primary">
                Changer le mot de passe
              </button>
       
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordChange;

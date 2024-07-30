import React, { useState } from 'react';

const CopierCollerComponent = ({ texteACopier }) => {
  const [copieEffectuee, setCopieEffectuee] = useState(false);

  const copierTexte = () => {
    const textarea = document.createElement('textarea');
    textarea.value = texteACopier;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    setCopieEffectuee(true);
    setTimeout(() => setCopieEffectuee(false), 2000);
  };

  const boutonClasses = copieEffectuee
    ? 'input-group-prepend bg-success'
    : 'input-group-prepend';


  const spanClasses = copieEffectuee
    ? 'input-group-text bg-success text-white fw-bold'
    : 'input-group-text';
  return (
    <div>
      <div className="form-group text-start">
        <label htmlFor="basic-url">Lien vers la boutique</label>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder={copieEffectuee ? 'Copie effectuée !' : texteACopier}
            disabled
          />
          <div className={boutonClasses} onClick={copierTexte}>
            <span className={spanClasses} id="basic-addon1">
              <i className="fas fa-copy" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopierCollerComponent;

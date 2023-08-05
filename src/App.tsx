import React, { useState } from 'react';

const App: React.FC = () => {
  const [validation, setValidation] = useState<boolean>(false);
  const [isIbanValid, setIsIbanValid] = useState<boolean>(false);
  const [iBan, setIban] = useState<string>('');

  
  
  const calculateCheckDigits = () => {
    setValidation(true);

    const COUNTRY_CODE = iBan.slice(0, 2);    
    const CHECK_DIGITS = iBan.slice(2, 4);        
    const BANK_CODE = iBan.slice(4,7);            
    const ACCOUNT_NUMBER =  iBan.slice(7,20);
    const NATIONAL_CHECK_DIGIT = iBan.slice(20,22);

    const formatIban = `${BANK_CODE}${ACCOUNT_NUMBER}${NATIONAL_CHECK_DIGIT}${COUNTRY_CODE}${CHECK_DIGITS}`;
    const transformLetters = formatIban.replace(/M/g, "22").replace(/E/g, "14");  // Staticly defined for our example purpose.
    const onlyContainDigits = /^\d+$/;

    if(iBan.length !== 22 || COUNTRY_CODE !== 'ME' || !onlyContainDigits.test(transformLetters)) return setIsIbanValid(false)
    if(BigInt(transformLetters) % 97n === 1n) return setIsIbanValid(true);
    return setIsIbanValid(false);
  }

  const handleIbanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIban(e.target.value);
    setValidation(false);
  };

  return (
    <div className="wrapper">
      <div className="form">
        <input
          placeholder="Enter IBAN" 
          type="text" 
          onChange={handleIbanChange}
          />
        <button onClick={calculateCheckDigits}>Check</button>
      </div>
      {validation && (
        <div className="message">
          <p className={isIbanValid ? 'success' : 'error'}>
            {isIbanValid ? 'IBAN is Valid' : 'IBAN is Invalid'}
          </p>
        </div>
      )}
    </div>
  );
}

export default App

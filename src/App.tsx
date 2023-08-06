import React, { useState } from 'react';

// Define the type for IBAN validation result
type TisIbanValid = {
  isValid: boolean,
  errorMessage?: string
}

const App: React.FC = () => {
  // State to track form submission
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // State to track IBAN validation result
  const [isIbanValid, setIsIbanValid] = useState<TisIbanValid>({ isValid: false, errorMessage: '' });

  // State to store the entered IBAN
  const [iBan, setIban] = useState<string>('');

  // Function to calculate and validate IBAN
  const calculateCheckDigits = () => {
    setIsSubmitted(true);

    const COUNTRY_CODE = iBan.slice(0, 2);
    const CHECK_DIGITS = iBan.slice(2, 4);
    const BANK_CODE = iBan.slice(4, 7);
    const ACCOUNT_NUMBER = iBan.slice(7, 20);
    const NATIONAL_CHECK_DIGIT = iBan.slice(20, 22);

    const formatIban = `${BANK_CODE}${ACCOUNT_NUMBER}${NATIONAL_CHECK_DIGIT}${COUNTRY_CODE}${CHECK_DIGITS}`;
    const transformLetters = formatIban.replace(/M/g, "22").replace(/E/g, "14"); // Staticly defined for example purpose.
    const onlyContainDigits = /^\d+$/;

    // Validate IBAN length, country code, and format
    if (!iBan.length) {
      return setIsIbanValid({ isValid: false, errorMessage: 'IBAN is a required field.' });
    } else if (iBan.length !== 22 || COUNTRY_CODE !== 'ME' || !onlyContainDigits.test(transformLetters)) {
      return setIsIbanValid({ isValid: false });
    } else if (BigInt(transformLetters) % 97n === 1n) {
      return setIsIbanValid({ isValid: true });
    } else {
      return setIsIbanValid({ isValid: false });
    }
  }

  // Handle IBAN input change
  const handleIbanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIban(e.target.value);
    setIsSubmitted(false);
  };

  return (
    <div className="wrapper">
      <h1>Montenegro IBAN validator</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Enter IBAN"
          onChange={handleIbanChange}
        />
        <button
          onKeyDown={calculateCheckDigits}
          onClick={calculateCheckDigits}
        >
          Check
        </button>
      </div>
      {isSubmitted && (
        <div className="message">
          <p className={isIbanValid.isValid ? 'success' : 'error'}>
            {isIbanValid.isValid ? 'IBAN is Valid' : isIbanValid.errorMessage || 'IBAN is Invalid'}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
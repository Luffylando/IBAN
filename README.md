# Montenegro (ME) IBAN validation checker.

  ### VALID (ME) IBAN EXAMPLES:

  `ME25505000012345678951`

  `ME22331671692796789581`

  `ME39388973998519221411`

  `ME50427598335836614292`

  `ME90852335172733441417`


  ### Steps for validation:

  1. Valid country code, for this example ME.
  2. Length of IBAN code must be exactly 22.
  3. Once the check digits are calculated by rearanging the string, converting alpha-chars into numbers and then deviding the final number with 97 in order to confirm that what remains is 1, we mark the iban as valid.

  ### Read more about IBAN: `https://en.wikipedia.org/wiki/International_Bank_Account_Number`

  ### Website for generating IBAN's: `http://randomiban.com/?country=Montenegro`

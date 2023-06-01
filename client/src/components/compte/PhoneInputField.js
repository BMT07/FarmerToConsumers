import React from 'react';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './stylePhone.css';

const PhoneInputField = ({ label, value, onChange,helperText  }) => {
  const handleOnChange = (phone) => {
    onChange(phone);
  };
  

  return (
    

    
    <FormControl variant="outlined" >

      <InputLabel>{label}</InputLabel>
      <PhoneInput 
        country={'us'}
        value={value}
        onChange={handleOnChange}
        inputComponent={OutlinedInput}
        inputProps={{ labelWidth: 0 }}
        />
        <div className='errorPhone'>
          {helperText}
        </div>
      </FormControl>
        
    
  );
};

export default PhoneInputField;

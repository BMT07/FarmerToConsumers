const isEmpty = require("./isEmpty");
const validator = require("validator"); //npm i validator
function ValidateRegister(data) {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirm = !isEmpty(data.confirm) ? data.confirm : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.role = !isEmpty(data.role) ? data.role : "";
  data.phoneNumber= !isEmpty(data.phoneNumber) ? data.phoneNumber : "";
  //location
  data.streetAddress = !isEmpty(data.streetAddress) ? data.streetAddress : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.postalCode = !isEmpty(data.postalCode) ? data.postalCode : "";
  if (!validator.isEmail(data.email)) {
    errors.email = "Required format email";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Required email";
  }
  if (validator.isEmpty(data.name)) {
    errors.name = "Required name";
  }
  if (validator.isEmpty(data.role)) {
    errors.role = "Required role";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Required password";
  }
  if (validator.isEmpty(data.confirm)) {
    errors.confirm = "Required confirm";
  }
  if(!validator.equals(data.password, data.confirm)){
    errors.confirm = "Passwords not matches";
  }
  if (validator.isEmpty(data.streetAddress)) {
    errors.streetAddress = "Required ";
  }
  if (validator.isEmpty(data.city)) {
    errors.city = "Required city";
  }
  if (validator.isEmpty(data.postalCode)) {
    errors.postalCode = "Required ";
  } 
  if (validator.isEmpty(data.phoneNumber)) {
    errors.phoneNumber = "Required ";
  }
  if(!data.password || data.password.trim().length < 8){
    errors.password = "Password must be at least 8 characters long"
  } else if (!data.password.match(/[0-9]/)) {
    errors.password = "Password must contain at least one digit"
  } else if (!data.password.match(/[A-Z]/)) {
    errors.password = "Password must contain at least one uppercase letter"
  } else if (!data.password.match(/[a-z]/)) {
    errors.password = "Password must contain at least one lowercase letter"
  } else if (!data.password.match(/[@#*]/)) {
    errors.password = "Password must contain at least one of the following characters: *, @, #"
  }
  if (isNaN(data.postalCode)) {
    errors.postalCode="Postal code must be a number"
  }
  if (isNaN(data.phoneNumber)) {
    errors.phoneNumber="Phone number must be a number"
  }
  return {
      errors,
      isValid: isEmpty(errors)
  }
};
function ValidateLogin(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isEmail(data.email)) {
    errors.email = "Required format email";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Required email";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Required password";
  }
  return {
      errors,
      isValid: isEmpty(errors)
  }
};
function ValidateProfile(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.role = !isEmpty(data.role) ? data.role : "";
  data.phoneNumber= !isEmpty(data.phoneNumber) ? data.phoneNumber : "";
  //location
  data.streetAddress = !isEmpty(data.streetAddress) ? data.streetAddress : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.postalCode = !isEmpty(data.postalCode) ? data.postalCode : "";

  if (validator.isEmpty(data.name)) {
    errors.name = "Required name";
  }
  if (validator.isEmpty(data.role)) {
    errors.role = "Required role";
  }
  if (validator.isEmpty(data.streetAddress)) {
    errors.streetAddress = "Required streetAddress";
  }
  if (validator.isEmpty(data.city)) {
    errors.city = "Required city";
  }
  if (validator.isEmpty(data.postalCode)) {
    errors.postalCode = "Required postal code";
  } 
  if (validator.isEmpty(data.phoneNumber)) {
    errors.phoneNumber = "Required phone number";
  }
  if (isNaN(data.postalCode)) {
    errors.postalCode="Postal code must be a number"
  }
  if (isNaN(data.phoneNumber)) {
    errors.phoneNumber="Phone number must be a number"
  }
  return {
      errors,
      isValid: isEmpty(errors)
  }
};


module.exports={
  ValidateRegister, ValidateLogin, ValidateProfile
}
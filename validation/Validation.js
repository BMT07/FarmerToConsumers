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
    errors.streetAddress = "Required streetAddress";
  }
  if (validator.isEmpty(data.city)) {
    errors.city = "Required city";
  }
  if (validator.isEmpty(data.postalCode)) {
    errors.postalCode = "Required postalCode";
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
module.exports={
  ValidateRegister, ValidateLogin
}
import axios from 'axios';
import { ERRORS, SET_USER } from './type';
import jwt_decode from 'jwt-decode';
export const Registration = (form, history,setAlert) => (dispatch) => {
  axios
    .post('http://localhost:8080/FarmerToConsumer/register', form)
    .then((res) => {
      setAlert(true)
      console.log(res);
      console.log(form);
      dispatch({
        type: ERRORS,
        payload: {},
      });
    })
    .catch((err) => {
      dispatch({
        type: ERRORS,
        payload: err.response.data,
      });
    });
};
export const LoginAction = (form, history) => (dispatch) => {
  axios
    .post('http://localhost:8080/FarmerToConsumer/login', form)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwt', token);
      const decode = jwt_decode(token);
      dispatch(setUser(decode));
    })
    .catch((err) => {
      dispatch({
        type: ERRORS,
        payload: err.response.data,
      });
    });
};

export const setUser = (decode) => ({
  type: SET_USER,
  payload: decode,
});
export const Logout = () => (dispatch) => {
  localStorage.removeItem('jwt');
  dispatch({
    type: SET_USER,
    payload: {},
  });
};

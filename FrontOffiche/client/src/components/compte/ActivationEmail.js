import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  showErrMsg,
  showSuccessMsg,
} from '../../util/notification/Notifications';
//import jwt_decode from 'jwt-decode';
function ActivationEmail() {
  const { activation_token } = useParams();
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');
  // console.log(useParams());

  // const params = useParams();

  // useEffect(() => {
  //   if (params.activation_token) {
  //     const activationEmail = async () => {
  //       try {
  //         const decode = jwt_decode(params.activation_token);
  //         const res = await axios.post(
  //           'http://localhost:8080/FarmerToConsumer/activation',
  //           decode.email
  //         );
  //         setSuccess(res.data.msg);
  //       } catch (err) {
  //         err.response.data.msg && setErr(err.response.data.msg);
  //       }
  //     };
  //     activationEmail();
  //   }
  // });

  useEffect(() => {
    if(activation_token){
        const activationEmail = async () => {
            try {
                const res = await axios.post('http://localhost:8080/FarmerToConsumer/activation', {activation_token})
                setSuccess(res.data.msg)
            } catch (err) {
                err.response.data.msg && setErr(err.response.data.msg)
            }
        }
        activationEmail()
    }
},[activation_token])

const history=useHistory()
  return (
    history.push('/login')
  );
}

export default ActivationEmail;

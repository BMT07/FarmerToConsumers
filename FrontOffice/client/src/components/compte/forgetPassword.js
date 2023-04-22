import { Box, Button, Card, Grid, Input } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
function ForgetPassword() {
    let history = useHistory();
    const [step, setStep] = useState(1);
    const [error, setErrors] = useState(null);
    const [email, setEmail] = useState("");
    const [user, setUser] = useState(null);
    const [secretcode, setSecretCode] = useState("");
    const [password, setPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const checkEmail = async (email) => {
        try {
          const result = await axios.post("http://localhost:8080/FarmerToConsumer/resetPassword", { email });
          console.log(result);
          setErrors(null)
          setStep(2);
        } catch (error) {
          setErrors(error.response.data.msg);
        }
      };
      const sendCode = async (code) => {
        try {
          const result = await axios.post("http://localhost:8080/FarmerToConsumer/CheckSecretCode", { code });
          console.log(result);
          setUser(result.data.findcode.user);
          setErrors(null)
          setStep(3);
        } catch (error) {
          setErrors(error.response.data.msg);
        }
      };
      const resetPassword = async (id) => {
        try {
          const result = await axios.put(`http://localhost:8080/FarmerToConsumer/resetNewPassword/${id}`, {
            newpass: password,
            confirmpass: newpassword,
          });
          console.log(result);
          history.push("/login");
        } catch (error) {
          console.log(error.response)
          setErrors(error.response.data.msg);
        }
      };
  return (
    <Box display="flex"
            justifyContent="center"
            alignItems="center"
            marginTop={10}  >
    <Card style={{width:"800px", height:"400px" ,alignItems:"center",
    justifyContent:"center", textAlign: 'center', display:"flex"} }>
    <Grid container  spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center" sx={{ marginTop:"30px" }}> 

        <h1 >Forget password ?</h1>         
              {step === 1 ? (
                <Box>
                  <p
                    style={{ width: "107%", marginBottom:"50px" }}
                    className="mt-6 text-lg text-gray-600 text-center"
                  >
                    Enter your email address so we can send you the recovery code
                  </p>
                  <Box component="form"
                    onSubmit={(e) => {
                      checkEmail(email);
                      e.preventDefault();
                    }}
                  >
                    <Input
                      type="email"
                      name="email"
                      fullWidth
                      required
                      placeholder="Email"
                      color="success"
                      style={{ marginTop: "7%", maxWidth:"300px" , marginRight:"10px"}}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {error !== null ? (
                      <p className="mt-6 text-xs text-red-600 text-center">
                        <span
                          className="border-red-500"
                          style={{ fontSize: "15px", color: " red" }}
                        >
                          {error}
                        </span>
                      </p>
                    ) : null}
                    <Button type="submit" color="success"  endIcon={ <SendIcon />}>                    
                      <span className="text">Send</span>
                     
                    </Button>
                  </Box>
                </Box>
              ) : null}
              {step === 2 ? (
                <Box>
                  <p
                    style={{ width: "107%" ,  marginBottom:"70px"}}
                    className="mt-6 text-lg text-gray-600 text-center"
                  >
                    Enter recovery code
                  </p>
                  <Box component="form"
                    className="mt-6"

                    onSubmit={(e) => {
                      sendCode(secretcode);
                      e.preventDefault();
                    }}
                  >
                    <Input
                      type="text"
                      name="email"
                      color="success"
                      required
                      placeholder="Secret Code"
                      style={{ marginTop: "7%" }}
                      onChange={(e) => setSecretCode(e.target.value)}
                    />
                    {error !== null ? (
                      <p className="mt-6 text-xs text-red-600 text-center">
                        <span
                          className="border-red-500"
                          style={{ fontSize: "15px", color: " red" }}
                        >
                          {error}
                        </span>
                      </p>
                    ) : null}
                    <Button type="submit" color="success" sx={{marginLeft:"50px"}} endIcon={ <SendIcon />}>
                      <span className="text" >Send</span>
                    </Button>
                  </Box>
                </Box>
              ) : null}
              {step === 3 ? (
                <Box>
                  <p
                    style={{ width: "107%" }}
                    className="mt-6 text-lg text-gray-600 text-center"
                  >
                    Enter new password
                  </p>
                  <Box component="form"
                    className="mt-6"
                    onSubmit={(e) => {
                      resetPassword(user._id);
                      e.preventDefault();
                    }}
                  >
                    <Grid>
                    <Input
                      type="password"
                      name="email"
                      required
                      placeholder="Password"
                      style={{ marginTop: "20%" , width:"100%"}}
                      color="success"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    </Grid>
                    <Grid>
                    <Input
                      type="password"
                      color="success"
                      name="email"
                      required
                      placeholder="New Password"
                      style={{ marginTop: "10%", width:"100%" }}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    </Grid>
                    {error !== null ? (
                      <p className="mt-6 text-xs text-red-600 text-center">
                        <span
                          className="border-red-500"
                          style={{ fontSize: "15px", color: " red" }}
                        >
                          {error}
                        </span>
                      </p>
                    ) : null}
                    <Button type="submit" color="success" endIcon={ <SendIcon />} sx={{marginTop:"30px"}}>
                      <span className="text">Edit</span>
                    </Button>
                </Box>
                </Box>
              ) : null}
    </Grid></Card>    </Box>  
  )
}

export default ForgetPassword
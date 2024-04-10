import React, { useState } from 'react';
import { Row, Col, Image, Form, Button } from 'react-bootstrap';
import background from "../../assets/images/loginbackground.jpg";
import logo from "../../assets/images/logo.png";
import Swal from "sweetalert2";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {

    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rePassword, setRePassword] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [getCode, setGetCode] = useState<string>("");

    const handleOnEmailChanged = (name: string) => {
        setEmail(name);
    };
    const handleOnPasswordChanged = (name: string) => {
        setPassword(name);
    };

    const handleOnRePasswordChanged = (name: string) => {
        setRePassword(name);
    };
    const handleOnCodeChanged = (name: string) => {
        setCode(name);
    };

    async function requestdataEmail() {

        let data = {
            userName: email
        }
        axios.post('http://localhost:8080/getResetCode', data).then(res => {
            console.log(res)
        if (res.status === 200) {
            setGetCode(res.data);
            Swal.fire({
                title: "Enter code we send your email",
                text: "",
                icon: "success",
                showCancelButton: false,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "white",
                confirmButtonText: "Ok",
            }).then((result: any) => {
                if (result.isConfirmed) {
                    //console.log(id);
                }
            });
        } else {
            Swal.fire({
                title: "Something goes wrong. Please try again.",
                text: "",
                icon: "error",
                showCancelButton: false,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "white",
                confirmButtonText: "Ok",
            }).then((result: any) => {
                if (result.isConfirmed) {
                    //console.log(id);
                }
            });
        }
    })
    }

    async function requestdata() {

        let data = {
            password: email,
            RePassword: rePassword
        }
        const response = await fetch("http://localhost:8080/log_in", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.status === 200) {
            Swal.fire({
                title: "Successfully reset your password",
                text: "",
                icon: "success",
                showCancelButton: false,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "white",
                confirmButtonText: "Ok",
            }).then((result: any) => {
                if (result.isConfirmed) {
                    navigate('/');
                }
            });
        } else {
            Swal.fire({
                title: "Something goes wrong. Please try again.",
                text: "",
                icon: "error",
                showCancelButton: false,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "white",
                confirmButtonText: "Ok",
            }).then((result: any) => {
                if (result.isConfirmed) {
                    //console.log(id);
                }
            });
        }
    }

    const handleSubmitEmail = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        if (!email) {
            setError("email can not be empty");
        }
        else {
            requestdataEmail();
            setValidated(false);
        }
    }
    const handleSubmitCode = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        if (!code) {
            setError("Enter code we send your email");
        } else {
            if (code==getCode) {
                Swal.fire({
                    title: "Success, Enter New Password",
                    text: "",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "white",
                    confirmButtonText: "Ok",
                }).then((result: any) => {
                    if (result.isConfirmed) {
                        //console.log(id);
                    }
                });
            } else {
                Swal.fire({
                    title: "Something goes wrong. Please try again.",
                    text: "",
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "white",
                    confirmButtonText: "Ok",
                }).then((result: any) => {
                    if (result.isConfirmed) {
                        //console.log(id);
                    }
                });
            }
            setValidated(false);
        }
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        if (!password || !rePassword) {
            setError("password can not be empty");
        } else if (password !== rePassword) {
            setError("password and repassword need to be same");
        } else {
            requestdata();
            setValidated(false);
        }
    }

    return (
        <Row className='login-page'>
            <Col xs={12} className='p-0'>
                <Image src={background} />
            </Col>
            <Col>
                <Row className='login-content px-4 pt-3 pb-5'>
                    <Image src={logo} />
                    <Form noValidate validated={validated} onSubmit={handleSubmitEmail}>
                        <Form.Control type="email" placeholder="email" required value={email}
                            onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                                handleOnEmailChanged(ev.target.value)
                            } />
                        <Button variant="primary" type="submit" className='code'>
                            Send Code
                        </Button>
                    </Form>
                    <Form noValidate validated={validated} onSubmit={handleSubmitCode}>
                        <Form.Control type="text" placeholder="code" required value={code}
                            onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                                handleOnCodeChanged(ev.target.value)
                            } />
                        <Button variant="primary" type="submit" className='code'>
                            Verify
                        </Button>
                    </Form>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Control type="password" placeholder="New Password" required value={password}
                            onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                                handleOnPasswordChanged(ev.target.value)
                            } />
                        <Form.Control type="password" placeholder="Retype Password" required value={rePassword}
                            onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                                handleOnRePasswordChanged(ev.target.value)
                            } />
                        <p className='errors'>{error}</p>
                        <Button variant="primary" type="submit" className='submit'>
                            Reset Password
                        </Button>
                        <a href='/'><h6 className='mt-2 d-flex justify-content-end'>Back to log in </h6></a>
                    </Form>
                </Row>
            </Col>
        </Row>
    );
}
export default ResetPassword; 
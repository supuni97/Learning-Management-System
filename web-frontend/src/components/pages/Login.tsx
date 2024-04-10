import React, { useState } from 'react';
import { Row, Col, Image, Form, Button } from 'react-bootstrap';
import background from "../../assets/images/loginbackground.jpg";
import logo from "../../assets/images/logo.png";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const [comments, setComments] = useState([])
    const navigate = useNavigate();


    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleOnEmailChanged = (name: string) => {
        setEmail(name);
    };
    const handleOnPasswordChanged = (name: string) => {
        setPassword(name);
    };

    async function requestdata() {
        console.log(email, password);
        let data = {
            userName: email,
            userPassword: password
        }

        axios.post('http://localhost:8080/authenticate', data).then(res => {

            localStorage.setItem('role', res.data.user.role[0].roleName)
            //localStorage.setItem('role', 'Student')
            localStorage.setItem('token', res.data.jwtToken)
            localStorage.setItem('email', email)

            if (res.status === 200) {
                Swal.fire({
                    title: "You Successfully login to system",
                    text: "",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "white",
                    confirmButtonText: "Ok",
                }).then((result: any) => {
                    if (result.isConfirmed) {
                        navigate('/home');
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

    const handleSubmit = (event: any) => {
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
        if (!password) {
            setError("password can not be empty");
        }
        else {
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
                    <Image src={logo} className='mb-3' />
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Control type="email" placeholder="Enter email" required value={email}
                            onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                                handleOnEmailChanged(ev.target.value)
                            } />
                        <Form.Control type="password" placeholder="Password" required value={password}
                            onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                                handleOnPasswordChanged(ev.target.value)
                            } />

                        <a href='/resetpassword'><h6>Forgot Your Password? </h6></a>
                        <p className='errors'>{error}</p>
                        <Button variant="primary" type="submit" className='submit mt-4'>
                            Submit
                        </Button>
                        <a href='/register'><h6 className='mt-2 d-flex justify-content-center'>Don't have account? Sign Up </h6></a>
                    </Form>
                </Row>
            </Col>
        </Row>
    );
}
export default Login;
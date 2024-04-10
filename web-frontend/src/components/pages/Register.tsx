import React, { useState } from 'react';
import { Row, Col, Image, Form, Button } from 'react-bootstrap';
import background from "../../assets/images/loginbackground.jpg";
import logo from "../../assets/images/logo.png";
import Swal from "sweetalert2";
import Select from "react-select";
import { DropDown } from '../types/LMSTypes';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rePassword, setRePassword] = useState<string>("");
    const [userType, setUserType] = useState<string>("");
    const [degree, setDegree] = useState<string>("");
    const [mobile, setMobile] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [getCode, setGetCode] = useState<string>("");

    const handleOnFirstNameChanged = (name: string) => {
        setFirstName(name);
    };
    const handleOnLastNameChanged = (name: string) => {
        setLastName(name);
    };
    const handleOnEmailChanged = (name: string) => {
        setEmail(name);
    };
    const handleOnPasswordChanged = (name: string) => {
        setPassword(name);
    };
    const handleOnRePasswordChanged = (name: string) => {
        setRePassword(name);
    };
    const handleOnDegreeChanged = (name: string) => {
        setDegree(name);
    };
    const handleOnMobileChanged = (name: string) => {
        setMobile(name);
    };
    const handleOnUseTypeChanged = (name: DropDown | null) => {
        if (!name) {
            return;
        }
        setUserType(name.value);
    };
    const handleOnCodeChanged = (name: string) => {
        setCode(name);
    };

    const authors = [
        { value: "Student", label: "Student" },
        { value: "Teacher", label: "Teacher" }
    ];

    async function requestdata() {

        let data = {
            userName: email,
        }
        axios.post('http://localhost:8080/getRegisterCode', data).then(res => {

            if (res.status === 200) {
                console.log(res);
                Swal.fire({
                    title: "Enter Code We Send Your Email",
                    text: "",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "white",
                    confirmButtonText: "Ok",
                }).then((result: any) => {
                    if (result.isConfirmed) {
                        setGetCode(res.data);
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
                        setFirstName("");
                        setLastName("");
                        setEmail("");
                        setPassword("");
                        setRePassword("");
                        setUserType("");
                        setDegree("");
                        setMobile("");
                        setError("");
                        setCode("");
                    }
                });
            }
        })
    }

    function passData() {
        let data = {
            userName: email,
            userFirstName: firstName,
            userLastName: lastName,
            userPassword: password,
            homeAddress: "kadugaammulla",
            degreeProgramme: degree,
            phone: mobile,
            roleName: userType,
        }
        axios.post('http://localhost:8080/registerNewUser', data).then(res => {
            console.log(res)

            localStorage.setItem('role', userType)
            localStorage.setItem('email', email)
            if (res.status === 200) {
                console.log(res);
                Swal.fire({
                    title: "You Successfully Register to system",
                    text: "",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "white",
                    confirmButtonText: "Ok",
                }).then((result: any) => {
                    if (result.isConfirmed) {
                        navigate('/');
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

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        if (!firstName || !lastName || !email || !degree || !password || !rePassword) {
            setError("fields can not be empty");
        }
        else if (password !== rePassword) {
            setError("password and repassword need to be same");
        }
        else {
            if (code == getCode) {
                requestdata();
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
            if(code == getCode){
                passData();
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

    return (
        <Row className='login-page'>
            <Col xs={12} className='p-0'>
                <Image src={background} />
            </Col>
            <Col>
                <Row className='login-content px-4 pt-3 pb-5 register'>
                    <Image src={logo} />
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row>
                            <Col xs={6}>
                                <Form.Control type="text" placeholder="First Name" required value={firstName}
                                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                                        handleOnFirstNameChanged(ev.target.value)
                                    } />
                                <Form.Control type="text" placeholder="Degree" required value={degree}
                                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                                        handleOnDegreeChanged(ev.target.value)
                                    } />
                                <Form.Control type="password" placeholder="Password" required value={password}
                                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                                        handleOnPasswordChanged(ev.target.value)
                                    } />
                                <Select
                                    options={authors}
                                    onChange={(selected: DropDown | null) => {
                                        handleOnUseTypeChanged(selected);
                                    }}
                                />
                            </Col>
                            <Col xs={6}>
                                <Form.Control type="text" placeholder="Last Name" required value={lastName}
                                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                                        handleOnLastNameChanged(ev.target.value)
                                    } />
                                <Form.Control type="email" placeholder="email" required value={email}
                                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                                        handleOnEmailChanged(ev.target.value)
                                    } />
                                <Form.Control type="password" placeholder="Retype Password" required value={rePassword}
                                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                                        handleOnRePasswordChanged(ev.target.value)
                                    } />
                                <Form.Control type="number" placeholder="Mobile" required value={mobile}
                                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                                        handleOnMobileChanged(ev.target.value)
                                    } />
                            </Col>
                        </Row>
                        <p className='errors'>{error}</p>
                        <Button variant="primary" type="submit" className='submit mt-2 mb-3'>
                            Regitster
                        </Button>
                    </Form>
                    <Form noValidate validated={validated} onSubmit={handleSubmitCode}>
                        <Form.Control type="text" placeholder="code" required
                            onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                                handleOnCodeChanged(ev.target.value)
                            } />
                        <Button variant="primary" type="submit" className='code'>
                            Verify
                        </Button>
                        <a href='/'><h6 className='mt-2 d-flex justify-content-center'>Have account? Log In </h6></a>
                    </Form>
                </Row>
            </Col>
        </Row>
    );
}
export default Register;
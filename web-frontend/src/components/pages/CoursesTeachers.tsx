import React, { useState, useEffect } from 'react';
import { Row, Col, Image, Button, Modal, Form } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import background from "../../assets/images/profilebackground.jpg";
import { IAssignTask, IMarkAdd } from '../types/LMSTypes';
import LeftNavbar from '../navbars/LeftNavbar';
import TopNavbar from '../navbars/TopNavbar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import cources from '../../assets/images/cources-black.svg';
import { IMyCourse } from '../types/LMSTypes';
import Swal from "sweetalert2";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CoursesTeachers = () => {

    const navigate = useNavigate();

    const [value, onChange] = useState(new Date());
    const [calendarShow, setCalendarShow] = useState(false);
    const [courseShow, setCourseShow] = useState(false);

    const calendar = () => {
        if (calendarShow === true) {
            setCalendarShow(false);
        } else {
            setCalendarShow(true);
            setCourseShow(false);
        }
    }

    const course = () => {
        if (courseShow === true) {
            setCourseShow(false);
        } else {
            setCourseShow(true);
            setCalendarShow(false);
        }
    }

    const auth = localStorage.getItem('token');

    const [courses, setCourses] = useState<IMyCourse[]>([]);

    async function requestCoursedata() {
        const config = {
            headers: { Authorization: `Bearer ${auth}` }
        };
        axios.get('http://localhost:8080/viewMarks', config).then(res => {
            console.log(res.data);
            setCourses(res.data);
        })
    }
    useEffect(() => {
        requestCoursedata();
    }, [auth]);

    const user = localStorage.getItem('role');
    var courseLink: any;
    user === 'Teacher' ? courseLink = '/coursesteachers' : courseLink = '';

    const courseNavigate = (id: string) => {
        localStorage.setItem('courseId', id)
        navigate(courseLink);
    }

    const MyCourseList = () => {
        return (
            <Row className='width-100'>
                {courses.map((course: IMyCourse, index: number) => (
                    <Col course={course}
                        index={index}
                        key={index}>
                        <Row onClick={() => courseNavigate(course.courseId)}>
                            <Image src={cources} alt='cources' className='cource-icon' />
                            <h6>{course.courseName}</h6>
                        </Row>
                    </Col>
                ))}
            </Row>
        )
    }

    const tutorials: IAssignTask[] = [
        { name: 'tutorial1', assignDate: '2022/04/05', dueDate: '2022/04/30' },
        { name: 'tutorial1', assignDate: '2022/04/05', dueDate: '2022/04/30' },
        { name: 'tutorial1', assignDate: '2022/04/05', dueDate: '2022/04/30' },
        { name: 'tutorial1', assignDate: '2022/04/05', dueDate: '2022/04/30' },
    ];

    const courseId = localStorage.getItem('courseId');

    const [addMarks, setAddMarks] = useState<IMarkAdd[]>([]);

    async function marksAdd() {
        const config = {
            headers: { Authorization: `Bearer ${auth}` }
        };
        let data = {
            courseId: courseId,
        }
        axios.post('http://localhost:8080/getUserNamesWithSubject',data, config).then(res => {
            console.log(res.data);
            setAddMarks(res.data);
        })
    }
    useEffect(() => {
        marksAdd();
    }, [auth]);

    const [annousmentShow, setAnnousmentShow] = useState(false);
    const handleAnnousmentClose = () => setAnnousmentShow(false);
    const handleAnnousmentShow = () => setAnnousmentShow(true);

    const [validated, setValidated] = useState(false);
    const [emailHeader, setEmailHeader] = useState<string>("");
    const [emailBody, setEmailBody] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleOnEmailChanged = (name: string) => {
        setEmailHeader(name);
    };
    const handleOnPasswordChanged = (name: string) => {
        setEmailBody(name);
    };

    const handleOnMarkAddChanged = (name: string, id: number) => {
        addMarks[id].marks = name;
    };

    const handleSubmitMarks = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        // if (!emailHeader) {
        //     setError("Email Header can not be empty");
        // }
        // if (!emailBody) {
        //     setError("Email Body can not be empty");
        // }
        // else {
            requestdata();
            setValidated(false);
            setAnnousmentShow(false);
        // }
    }

    async function requestdata() {
        console.log(addMarks)
        let data = addMarks;
        const config = {
            headers: { Authorization: `Bearer ${auth}` }
        };
        axios.post('http://localhost:8080/addMarksToCourse', data, config).then(res => {

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
                        setShow(false)
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
                        
                    }
                });
            }

        })
    }

    async function sendEmails() {
        let data = {
            courseId: courseId,
            subject: emailHeader,
            body: emailBody
        }
        const config = {
            headers: { Authorization: `Bearer ${auth}` }
        };
        console.log(data);
        axios.post('http://localhost:8080/sendNotifications', data, config).then(res => {

            if (res.status === 200) {
                Swal.fire({
                    title: "Email send Successfully",
                    text: "",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "white",
                    confirmButtonText: "Ok",
                }).then((result: any) => {
                    if (result.isConfirmed) {
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
        if (!emailHeader) {
            setError("Email Header can not be empty");
        }
        if (!emailBody) {
            setError("Email Body can not be empty");
        }
        else {
            sendEmails();
            setValidated(false);
            setAnnousmentShow(false);
        }
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const CourseShow = () => {
        return (
            <>
                {tutorials.map((assignTasks: IAssignTask, index: number) => (
                    <Row assignTasks={assignTasks} index={index} key={index}>
                        <Col xs={3}>
                            <h5 className='colour-green'>{assignTasks.name}</h5>
                        </Col>
                        <Col xs={2}>
                            <h5 className='item-center colour-green'>{assignTasks.assignDate}</h5>
                        </Col>
                        <Col xs={3}>
                            <h5 className='item-center colour-green'>{assignTasks.dueDate}</h5>
                        </Col>
                        <Col xs={2}>
                            <h5 className='item-center colour-green'><FaEdit className="text-warning" /></h5>
                        </Col>
                        <Col xs={2}>
                            <h5 className='item-center colour-green'><FaTrash className='text-danger' /></h5>
                        </Col>
                    </Row>
                ))}
            </>
        )
    }

    return (
        <Row className='lms'>
            <Col xs={1} className="left">
                <LeftNavbar calendar={calendar}
                    course={course} />
            </Col>
            <Col xs={12} className="topnav-content pe-0">
                <Row>
                    <TopNavbar />
                </Row>
                <Row>
                    <Row className='home-page px-0'>
                        <Col xs={12} className='px-0 profile-background'>
                            <Image src={background} alt='profile backgroung' />
                        </Col>
                        <Col xs={12} className='profile-content ps-5'>
                            <Row>
                                <Col xs={12} className='pb-5'>
                                    <h5>PMAT 22213 - Mathematical Modules For Computing</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={3}>
                                    <h5 className='pb-3'>Task</h5>
                                </Col>
                                <Col xs={2}>
                                    <h5 className='pb-3 item-center '>Assign Date</h5>
                                </Col>
                                <Col xs={3}>
                                    <h5 className='pb-3 item-center'>Due Date</h5>
                                </Col>
                                <Col xs={2}>
                                    <h5 className='pb-3 item-center'>Update</h5>
                                </Col>
                                <Col xs={2}>
                                    <h5 className='pb-3 item-center'>Remove</h5>
                                </Col>
                            </Row>
                            {CourseShow()}
                        </Col>
                        <Col xs={12} className='ps-5 my-5 z-1'>
                            <Button className='new-task'>New Task</Button>
                            <Button className='new-task' onClick={handleAnnousmentShow} >New Annousment</Button>
                            <Button className='new-task float-right background-green me-5 pe-5' onClick={handleShow}>Course Final Marks</Button>
                        </Col>
                        <Col xs={12} className='ps-5 mb-5'>
                            <Row>
                                <Col xs={12} className='pb-2 colour-brown'>
                                    <h5>Student List</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}>
                                    <h5 className='pb-3 colour-brown'>Name</h5>
                                </Col>
                                <Col xs={6}>
                                    <h5 className='pb-3 colour-brown'>Grade</h5>
                                </Col>
                            </Row>
                            {addMarks.map((assignMarks: IMarkAdd, index: number) => (
                                <Row assignMarks={assignMarks} index={index} key={index}>
                                    <Col xs={6}>
                                        <h5 className='colour-green'>{assignMarks.userEmail}</h5>
                                    </Col>
                                    <Col xs={6}>
                                        <h5 className='colour-green'>{assignMarks.marks}</h5>
                                    </Col>
                                </Row>
                            ))}
                            <Row>
                                <Col xs={3}>

                                </Col>
                                <Col xs={9}>
                                    <Row>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Row>
            </Col >
            <Col className='calendar'>
                {calendarShow && <Calendar onChange={onChange} value={value} />}
            </Col>
            {
                courseShow && <Col className='cource'>
                    {MyCourseList()}
                </Col>
            }
            <Modal show={annousmentShow} onHide={handleAnnousmentClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sending Annousment To Student</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Control type="text" placeholder="Enter Email Header" className='mb-3' required value={emailHeader}
                            onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                                handleOnEmailChanged(ev.target.value)
                            } />
                        <Form.Control type="text" placeholder="Enter Email Body" required value={emailBody}
                            onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                                handleOnPasswordChanged(ev.target.value)
                            } />
                        <p className='errors'>{error}</p>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleAnnousmentClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Send Annousment
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Marks To Students</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmitMarks}>
                    <Modal.Body className='mb-2 student-add-mark'>
                        {addMarks.map((assignMarks: IMarkAdd, index: number) => (
                            <Row assignMarks={assignMarks} index={index} key={index} className='mb-2'>
                                <Col xs={1}></Col>
                                <Col xs={7}>
                                    <h5 className='colour-green'>{assignMarks.userEmail}</h5>
                                </Col>
                                <Col xs={4}>
                                    <Form.Control type="number" placeholder="Enter Mark" required value={assignMarks.marks}
                                        onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                                            handleOnMarkAddChanged(ev.target.value, index)
                                        } />
                                </Col>
                            </Row>
                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type='submit'>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Row >
    );
}
export default CoursesTeachers;
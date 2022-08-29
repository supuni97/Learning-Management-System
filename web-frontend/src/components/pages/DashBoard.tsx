import React, { useEffect, useState } from 'react';
import { Row, Col, Image, Dropdown, Button } from 'react-bootstrap';
import background from "../../assets/images/dashboardbackground.jpg";
import { VscTriangleDown } from 'react-icons/vsc';
import { IAllCourse } from '../types/LMSTypes';
import Swal from "sweetalert2";
import LeftNavbar from '../navbars/LeftNavbar';
import TopNavbar from '../navbars/TopNavbar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import cources from '../../assets/images/cources-black.svg';
import { IMyCourse } from '../types/LMSTypes';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DashBoard = () => {

    const navigate = useNavigate();

    const [science, setScience] = useState<IAllCourse[]>([]);
    const [commerce, setCommerce] = useState<IAllCourse[]>([]);
    const [humanities, setHumanities] = useState<IAllCourse[]>([]);
    const [socialScience, setSocialScience] = useState<IAllCourse[]>([]);
    const [medicine, setMedicine] = useState<IAllCourse[]>([]);
    const [computing, setComputing] = useState<IAllCourse[]>([]);

    const auth = localStorage.getItem('token');

    async function requestdata1() {
        const config = {
            headers: { Authorization: `Bearer ${auth}` }
        };
        let data = {
            degreeProgramme:"Bio Science"
        };

        axios.post('http://localhost:8080/getAllCoursesForSelectedDegreeProgramme', data, config).then(res => {
            setScience(res.data);
            setMedicine(res.data)
            setCommerce(res.data);
        })
    }
    async function requestdata2() {
        const config = {
            headers: { Authorization: `Bearer ${auth}` }
        };
        let data = {
            degreeProgramme:"Humanities"
        };

        axios.post('http://localhost:8080/getAllCoursesForSelectedDegreeProgramme', data, config).then(res => {
            setHumanities(res.data);
            setSocialScience(res.data);

        })
    }
    async function requestdata3() {
        const config = {
            headers: { Authorization: `Bearer ${auth}` }
        };
        let data = {
            degreeProgramme:"Mathematics"
        };

        axios.post('http://localhost:8080/getAllCoursesForSelectedDegreeProgramme', data, config).then(res => {
            setHumanities(res.data);
        })
    }
    async function requestdata4() {
        const config = {
            headers: { Authorization: `Bearer ${auth}` }
        };
        let data = {
            degreeProgramme:"Software Engineering"
        };

        axios.post('http://localhost:8080/getAllCoursesForSelectedDegreeProgramme', data, config).then(res => {
            setComputing(res.data);

        })
    }
    useEffect(() => {
        requestdata1();
        requestdata2();
        requestdata3();
        requestdata4();
    }, [auth]);

    async function enrollCourse(id: string, name:string) {
        const config = {
            headers: { Authorization: `Bearer ${auth}` }
        };
        let data = {
            courseId: id,
            courseName: name,
            semester: "semester 1"
        };
        axios.post('http://localhost:8080/enrollToCourse', data, config).then(res => {
            if (res.status === 200) {
                console.log(res);
                Swal.fire({
                    title: "You Successfully Register to course",
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
                    }
                });
            }

        })
    }

    const enrollRequest = (id: string, name: string) => {
        Swal.fire({
            title: name,
            text: "Are You Want to Enroll this Course?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Enroll it!",
        }).then((result: any) => {
            if (result.isConfirmed) {
                enrollCourse(id,name);
            }
        });
    }

    const CourseShow = () => {
        return (
            <Col xs={12}>
                <Dropdown className='mb-2'>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Commerce and Management Studies
                        <VscTriangleDown className='dropdown-icon' />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {commerce.map((course: IAllCourse, index: number) => (
                            <Dropdown.Item
                                course={course}
                                index={index}
                                key={index}
                            >{course.courseName}<Button className='dropdown-enroll' onClick={() => enrollRequest(course.courseCode, course.courseName)}>Enroll</Button></Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className='mb-2'>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Humanities
                        <VscTriangleDown className='dropdown-icon' />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {humanities.map((course: IAllCourse, index: number) => (
                            <Dropdown.Item
                                course={course}
                                index={index}
                                key={index}
                            >{course.courseName}<Button className='dropdown-enroll' onClick={() => enrollRequest(course.courseCode, course.courseName)}>Enroll</Button></Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className='mb-2'>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Medicine
                        <VscTriangleDown className='dropdown-icon' />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {medicine.map((course: IAllCourse, index: number) => (
                            <Dropdown.Item
                                course={course}
                                index={index}
                                key={index}
                            >{course.courseName}<Button className='dropdown-enroll' onClick={() => enrollRequest(course.courseCode, course.courseName)}>Enroll</Button></Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className='mb-2'>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Science
                        <VscTriangleDown className='dropdown-icon' />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {science.map((course: IAllCourse, index: number) => (
                            <Dropdown.Item
                                course={course}
                                index={index}
                                key={index}
                            >{course.courseName}<Button className='dropdown-enroll' onClick={() => enrollRequest(course.courseCode, course.courseName)}>Enroll</Button></Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className='mb-2'>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Social Science
                        <VscTriangleDown className='dropdown-icon' />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {socialScience.map((course: IAllCourse, index: number) => (
                            <Dropdown.Item
                                course={course}
                                index={index}
                                key={index}
                            >{course.courseName}<Button className='dropdown-enroll' onClick={() => enrollRequest(course.courseCode, course.courseName)}>Enroll</Button></Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className='mb-2'>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Computing and Technology
                        <VscTriangleDown className='dropdown-icon' />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {computing.map((course: IAllCourse, index: number) => (
                            <Dropdown.Item
                                course={course}
                                index={index}
                                key={index}
                            >{course.courseName}<Button className='dropdown-enroll' onClick={() => enrollRequest(course.courseCode, course.courseName)}>Enroll</Button></Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
        )
    }

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
                    <Row className='home-page px-0 dashboard'>
                        <Col xs={12} className='px-0'>
                            <Image src={background} alt='home backgroung' />
                        </Col>
                        <Col xs={12} className='my-courses my-3'>
                            <h2>All Courses</h2>
                        </Col>
                        {CourseShow()}
                    </Row>
                </Row>
            </Col>
            <Col className='calendar'>
                {calendarShow && <Calendar onChange={onChange} value={value} />}
            </Col>
            {courseShow && <Col className='cource'>
                {MyCourseList()}
            </Col>}
        </Row>
    );
}
export default DashBoard;
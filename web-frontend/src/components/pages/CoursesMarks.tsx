import React, { useState, useEffect } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import background from "../../assets/images/profilebackground.jpg";
import LeftNavbar from '../navbars/LeftNavbar';
import TopNavbar from '../navbars/TopNavbar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import cources from '../../assets/images/cources-black.svg';
import { IMyCourse } from '../types/LMSTypes';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CoursesMarks = () => {

    const navigate = useNavigate();

    const auth = localStorage.getItem('token');

    const [courses, setCourses] = useState<IMyCourse[]>([]);

    async function requestdata() {
        const config = {
            headers: { Authorization: `Bearer ${auth}` }
        };
        axios.get('http://localhost:8080/viewMarks', config).then(res => {
            console.log(res.data);
            setCourses(res.data);
        })
    }
    useEffect(() => {
        requestdata();
    }, [auth]);

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
    const CourseShow = () => {
        return (
            <>
                {courses.map((marks: IMyCourse, index: number) => (
                    <Row marks={marks} index={index} key={index}>
                        <Col xs={3}>
                            <h4 className='colour-green'>{marks.courseName}</h4>
                        </Col>
                        <Col xs={3}>
                            <h4 className='item-center colour-green'>{marks.semester}</h4>
                        </Col>
                        <Col xs={3}>
                            <h4 className='item-center colour-green'>2.0</h4>
                        </Col>
                        <Col xs={3}>
                            <h4 className='item-center colour-green'>{marks.marks}</h4>
                        </Col>
                    </Row>
                ))}
            </>
        );
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
                                <Col xs={3}>
                                    <h4 className='pb-3 colour-green'>Course Name</h4>
                                </Col>
                                <Col xs={3}>
                                    <h4 className='pb-3 item-center colour-green'>Semester</h4>
                                </Col>
                                <Col xs={3}>
                                    <h4 className='pb-3 item-center colour-green'>Grade</h4>
                                </Col>
                                <Col xs={3}>
                                    <h4 className='pb-3 item-center colour-green'>Contribution to GPA</h4>
                                </Col>
                            </Row>
                            {CourseShow()}
                        </Col>
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
export default CoursesMarks;
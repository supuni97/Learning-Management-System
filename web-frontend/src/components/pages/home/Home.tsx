import React, { useState, useEffect } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import background from "../../../assets/images/homebackground2.jpg";
import { IMyCourse } from '../../types/LMSTypes';
import Courses from './Courses';
import LeftNavbar from '../../navbars/LeftNavbar';
import TopNavbar from '../../navbars/TopNavbar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import cources from '../../../assets/images/cources-black.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {

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

    const CourseShow = () => {
        return (
            <Row className='width-100'>
                {courses.map((course: IMyCourse, index: number) => (
                    <Courses
                        course={course}
                        index={index}
                        key={index}
                    />
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
                    <Row className='home-page px-0'>
                        <Col xs={12} className='px-0'>
                            <Image src={background} alt='home backgroung' />
                        </Col>
                        <Col xs={12} className='my-courses my-3'>
                            <h2>My Courses</h2>
                        </Col>
                        <Col xs={12} className='ps-5'>
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
export default Home;
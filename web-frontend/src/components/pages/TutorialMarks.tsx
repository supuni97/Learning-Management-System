import React, { useState } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import background from "../../assets/images/profilebackground.jpg";
import { ITutorialMarks } from '../types/LMSTypes';
import LeftNavbar from '../navbars/LeftNavbar';
import TopNavbar from '../navbars/TopNavbar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import cources from '../../assets/images/cources-black.svg';
import { IMyCourse } from '../types/LMSTypes';
import { useNavigate } from 'react-router-dom';

const TutorialMarks = () => {

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

    const coursesList: IMyCourse[] = [];

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
                {coursesList.map((course: IMyCourse, index: number) => (
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

    const courses: ITutorialMarks[] = [
        { name: "tutorial1", weight: '3', grade: 'A', range: '0 to 100', total: '80' },
        { name: "tutorial1", weight: '3', grade: 'A', range: '0 to 100', total: '80' },
        { name: "tutorial1", weight: '3', grade: 'A', range: '0 to 100', total: '80' },
        { name: "tutorial1", weight: '3', grade: 'A', range: '0 to 100', total: '80' },
        { name: "tutorial1", weight: '3', grade: 'A', range: '0 to 100', total: '80' },
    ];

    const CourseShow = () => {
        return (
            <>
                {courses.map((marks: ITutorialMarks, index: number) => (
                    <Row marks={marks} index={index} key={index}>
                        <Col xs={3}>
                            <h5 className='colour-green'>{marks.name}</h5>
                        </Col>
                        <Col xs={2}>
                            <h5 className='item-center colour-green'>{marks.weight}</h5>
                        </Col>
                        <Col xs={2}>
                            <h5 className='item-center colour-green'>{marks.grade}</h5>
                        </Col>
                        <Col xs={2}>
                            <h5 className='item-center colour-green'>{marks.range}</h5>
                        </Col>
                        <Col xs={3}>
                            <h5 className='item-center colour-green'>{marks.total}</h5>
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
                                    <h4>PMAT 22213 - Mathematical Modules For Computing</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={3}>
                                    <h5 className='pb-3 colour-green'>Grade Item</h5>
                                </Col>
                                <Col xs={2}>
                                    <h5 className='pb-3 item-center colour-green'>Calculated Weight</h5>
                                </Col>
                                <Col xs={2}>
                                    <h5 className='pb-3 item-center colour-green'>Grade</h5>
                                </Col>
                                <Col xs={2}>
                                    <h5 className='pb-3 item-center colour-green'>Range</h5>
                                </Col>
                                <Col xs={3}>
                                    <h5 className='pb-3 item-center colour-green'>Combination Of Course Total</h5>
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
export default TutorialMarks;
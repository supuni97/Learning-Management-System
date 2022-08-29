import React from 'react';
import { Row, Col, Navbar, Nav, Container, NavDropdown, Image } from 'react-bootstrap';
import home from '../../assets/images/home.svg';
import dashboard from '../../assets/images/dashboard.svg';
import calender from '../../assets/images/calendar.svg';
import cources from '../../assets/images/cources.svg';
import marks from '../../assets/images/marks.svg';

type LeftNavbarProps = {
    calendar: () => void,
    course: () => void
}
const LeftNavbar: React.FC<LeftNavbarProps> = (props) => {

    const { calendar, course } = props;

    const user = localStorage.getItem('role');
    var hide;
    user === 'Teacher' ? hide = 'hide' : hide = '';

    return (
        <Row className='left-navbar'>
            <Col xs={12} className="items">
                <Navbar expand="xxl">
                    <Container className='px-3 mt-3'>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" className='calassaple-btn' />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto mt-1 mb-5 pb-5">
                                <a href='/home'>
                                    <Row className='icon-block'>
                                        <Image src={home} alt='home' className='icon1' />
                                        <h4 className='icon-text'>Home</h4>
                                    </Row>
                                </a>
                                <a href='/dashboard'>
                                    <Row>
                                        <Image src={dashboard} alt='dashboard' className='icon1' />
                                        <h4 className='icon-text'>Dashboard</h4>
                                    </Row>
                                </a>
                                <Row onClick={calendar}>
                                    <Image src={calender} alt='calender' className='icon1' />
                                    <h4 className='icon-text'>Calender</h4>
                                </Row>
                                <Row onClick={course}>
                                    <Image src={cources} alt='cources' className='icon1' />
                                    <h4 className='icon-text'>Cources</h4>
                                </Row>
                                <a href='/coursemarks'>
                                    <Row id={hide} className='mb-5'>
                                        <Image src={marks} alt='marks' className='icon1' />
                                        <h4 className='icon-text'>Marks</h4>
                                    </Row>
                                </a>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <a href='/home'>
                    <Row>
                        <Image src={home} alt='home' className='icon' />
                    </Row>
                </a>
                <a href='/dashboard'>
                    <Row>
                        <Image src={dashboard} alt='dashboard' className='icon' />
                    </Row>
                </a>
                <Row onClick={calendar}>
                    <Image src={calender} alt='calender' className='icon' />
                </Row>
                <Row onClick={course}>
                    <Image src={cources} alt='cources' className='icon' />
                </Row>
                <a href='/coursemarks'>
                    <Row id={hide} >
                        <Image src={marks} alt='marks' className='icon' />
                    </Row>
                </a>
            </Col>
        </Row>
    );
}
export default LeftNavbar;
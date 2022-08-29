import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import logo from "../../assets/images/logo.png";
import profile from "../../assets/images/profile.svg";

const TopNavbar = () => {
    return (
        <Row className='top-navbar px-0'>
            <Col xs={1} className="px-0">
                <a href='/home'>
                    <Image src={logo} alt='logo' className='logo ms-2' />
                </a>
            </Col>
            <Col xs={9} className="px-0">
                <a href='/home'>
                    <h1 className='logo-text'>Virtual Learning Environment</h1>
                </a>
            </Col>
            <Col xs={2} className="px-0">
                <a href='/profile'>
                    <Image src={profile} alt='profile' className='profile' />
                </a>
            </Col>
        </Row>
    );
}
export default TopNavbar;
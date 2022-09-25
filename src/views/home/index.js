import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { getCurrentPi, calculateMoreAccuratePi } from '../../service/homeService';
import './index.scss';

const Home = () => {
    const [piValue, setPiValue] = useState(null);
    const [circumferenceOfSun, setCircumferenceOfSun] = useState(null);
    const [alert, setAlert] = useState({
        title: '',
        message: '',
        isVisible: false,
        type: ''
    })

    const resetAlertState = () => {
        setAlert({
            title: '',
            message: '',
            isVisible: false,
            type: ''
        })
    }

    const displayNoPiAlert = () => {
        setAlert({
            title: 'No PI Was Calculated Previously!',
            message: 'Please click on the Get a more accurate Pi value button',
            isVisible: true,
            type: 'info'
        })
        setTimeout(() => {
            resetAlertState()
        }, 5000)
    }

    const getCurrentPiValue = () => {
        getCurrentPi().then(res => {
            switch (res.status) {
                case 200: {
                    setPiValue(res.data.pi_value);
                    break;
                }
                case 204:
                    displayNoPiAlert()
                    break;
                default:
                    setAlert({
                        title: 'Something Went Wrong!',
                        message: 'Please try again!',
                        isVisible: true,
                        type: 'danger'
                    })
                    setTimeout(() => {
                        resetAlertState()
                    }, 5000)
                    break;
            }
        })
    }

    useEffect(() => {
        getCurrentPiValue()
    }, [])

    const getPiValueWithDecimal = () => {
        if (!piValue) return piValue
        return piValue
    }

    const calculatePi = () => {
        calculateMoreAccuratePi().then(res => {
            setPiValue(res.value.toString())
        })
    }

    const calculateCircumferenceOfSun = () => {
        if (!piValue) {
            displayNoPiAlert()
            return;
        }
        const diameterOfSun = 1392530;
        setCircumferenceOfSun((diameterOfSun * `${piValue}`));
    }

    return <Container fluid>
        <div className='homepage-container'>
            <div className='card-section'>
                <Row>
                    <Col lg={6} xl={6} md={6} sm={6} xs={12} className='card-container'>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Current PI Value</Card.Title>
                                <Card.Text>
                                    {getPiValueWithDecimal()}
                                </Card.Text>
                                <Button variant="primary" onClick={getCurrentPiValue}>Get Current PI</Button>
                            </Card.Body>
                        </Card></Col>

                    <Col lg={6} xl={6} md={6} sm={6} xs={12} className='card-container'>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Circumference of Sun</Card.Title>
                                <Card.Text>
                                    {circumferenceOfSun}
                                </Card.Text>
                                <Button variant="primary" onClick={calculateCircumferenceOfSun}>Calculate</Button>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
            </div>

            <Row>
                <Col><Button className='calculate-pi-button' onClick={calculatePi}>Get a more accurate Pi value</Button></Col>
            </Row>
            <Alert show={alert.isVisible} variant={alert.type}>
                <Alert.Heading>{alert.title}</Alert.Heading>
                <hr></hr>
                <p>
                    {alert.message}
                </p>
            </Alert>
        </div>

    </Container >
}

export default Home;
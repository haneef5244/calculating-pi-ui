import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { getCurrentPi, calculateMoreAccuratePi } from '../../service/homeService';
import './index.scss';

const Home = () => {
    const [piValue, setPiValue] = useState(null);
    const [circumferenceOfSun, setCircumferenceOfSun] = useState(null);

    const getCurrentPiValue = () => {
        getCurrentPi().then(res => {
            switch (res.status) {
                case 200: {
                    const newPiWithDecimal = '3.' + res.data.pi_value.substring(1, res.data.pi_value.length)

                    setPiValue(res.data.pi_value);
                    break;
                }
                case 204:
                    window.alert('No pi value was calculated before, please calculate before getting new value')
                    break;
                default:
                    window.alert('Something went wrong, please try again')
                    break;
            }
        })
    }

    useEffect(() => {
        getCurrentPiValue()
    })

    const getPiValueWithDecimal = () => {
        if (!piValue) return piValue
        else if (piValue.length === 1) return piValue
        else return '3.' + piValue.substring(1, piValue.length)
    }

    const calculatePi = () => {
        calculateMoreAccuratePi().then(res => {
            setPiValue(res.value.toString())
        })
    }

    const calculateCircumferenceOfSun = () => {
        const diameterOfSun = 1392530;
        setCircumferenceOfSun((diameterOfSun * `${'3.' + piValue.substring(1, piValue.length)}`));
    }

    return <Container fluid>
        <div className='homepage-container'>
            <div className='card-section'>
                <Row>
                    <Col lg={6} xl={6} md={6} sm={6} xs={12}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Current PI Value</Card.Title>
                                <Card.Text>
                                    {getPiValueWithDecimal()}
                                </Card.Text>
                                <Button variant="primary" onClick={getCurrentPiValue}>Get Current PI</Button>
                            </Card.Body>
                        </Card></Col>

                    <Col lg={6} xl={6} md={6} sm={6} xs={12}>
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

        </div>
    </Container >
}

export default Home;
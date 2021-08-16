import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MainScreen from '../../components/MainScreen';
import './LoginScreen.css';
import axios from 'axios';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
const LoginScreen = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');

        if (userInfo) {
            history.push('/mynotes');
        }
    }, [history]);

    const submitHandler = async e => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };
            setLoading(true);
            const { data } = await axios.post(
                '/api/users/login',
                {
                    email,
                    password,
                },
                config
            );
            console.log(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            history.push('/mynotes');
        } catch (error) {
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainScreen title="LOGIN">
            <div className="loginContainer">
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {loading && <Loading />}
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <Row className="py-3">
                        <Col>
                            New Customer ?{' '}
                            <Link to="/register">Register Here</Link>
                        </Col>
                    </Row>
                </Form>
            </div>
        </MainScreen>
    );
};

export default LoginScreen;

import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import MainScreen from '../../components/MainScreen';
const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [pic, setPic] = useState(
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
    );
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [message, setMessage] = useState('');
    const [picMessage, setPicMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');

    const submitHandler = async e => {
        e.preventDefault();

        if (password !== confirmpassword) {
            setMessage('Passwords Do not Match');
        } else {
            setMessage(null);
            try {
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                    },
                };
                setLoading(true);
                const { data } = await axios.post(
                    '/api/users',
                    { name, pic, email, password },
                    config
                );
                localStorage.setItem('userInfo', JSON.stringify(data));
            } catch (error) {
                setError(error.response.data.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const postDetails = pics => {
        if (!pics) {
            return setPicMessage('Please Select an Image');
        }
        setPicMessage(null);
        if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
            const data = new FormData();
            data.append('file', pics.file);
            data.append('upload_preset', 'notezipper');
            fetch('https://api.cloudinary.com/v1_1/dohkxhql2/image/upload', {
                method: 'post',
                body: data,
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setPic(data.url.toString());
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    return (
        <MainScreen title="REGISTER">
            <div className="loginContainer">
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {message && (
                    <ErrorMessage variant="danger">{message}</ErrorMessage>
                )}
                {loading && <Loading />}
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            placeholder="Enter Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>

                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmpassword}
                            onChange={e => setConfirmpassword(e.target.value)}
                        />
                    </Form.Group>
                    {picMessage && (
                        <ErrorMessage variant="danger">
                            {picMessage}
                        </ErrorMessage>
                    )}
                    <Form.Group controlId="pic" className="mb-3">
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.Control
                            type="file"
                            //  onChange={e => postDetails(e.target.files[0])}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        REGISTER
                    </Button>
                </Form>
            </div>
        </MainScreen>
    );
};

export default RegisterScreen;

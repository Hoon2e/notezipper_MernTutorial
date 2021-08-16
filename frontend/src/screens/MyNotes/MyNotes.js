import React, { useContext, useEffect, useState } from 'react';
import {
    Accordion,
    Badge,
    Button,
    Card,
    useAccordionButton,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MainScreen from '../../components/MainScreen';
import axios from 'axios';

function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('totally custom!')
    );

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
            }}
            onClick={decoratedOnClick}
        >
            {children}
        </div>
    );
}

const MyNotes = () => {
    const [notes, setNotes] = useState([]);

    const deleteHandler = id => {
        if (window.confirm('Are you sure?')) {
        }
    };
    const fetchNotes = async () => {
        const { data } = await axios.get('/api/notes');
        setNotes(data);
    };

    useEffect(() => {
        fetchNotes();
    }, []);
    return (
        <MainScreen title="Welcome Back Hoon">
            <Link to="createnote">
                <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
                    Create New Note
                </Button>
            </Link>
            <Accordion>
                {notes.map(note => (
                    <Card style={{ margin: 10 }} key={note._id}>
                        <Card.Header
                            style={{
                                display: 'flex',
                            }}
                        >
                            <CustomToggle eventKey={note._id}>
                                <span
                                    style={{
                                        color: 'black',
                                        textDecoration: 'none',
                                        cursor: 'pointer',
                                        alignSelf: 'center',
                                        fontSize: 18,
                                    }}
                                >
                                    {note.title}
                                </span>

                                <div>
                                    <Button href={`/note/${note._id}`}>
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        className="mx-2"
                                        onClick={() => deleteHandler(note._id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </CustomToggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={note._id}>
                            <Card.Body>
                                <div>
                                    <Badge className="bg-success">
                                        Category - {note.category}
                                    </Badge>
                                </div>

                                <blockquote className="blockquote mb-0">
                                    <p>{note.content}</p>
                                    <footer className="blockquote-footer">
                                        Created On - date
                                    </footer>
                                </blockquote>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                ))}
            </Accordion>
        </MainScreen>
    );
};

export default MyNotes;

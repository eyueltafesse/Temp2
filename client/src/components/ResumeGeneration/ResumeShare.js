import React, { useContext, useState, useEffect } from "react";
import "./ResumeGeneration.css";
import { Button, Table, Form, Row, Col, Modal } from "react-bootstrap";

const ResumeShare = (props) => {
    const [isEmailShowing, setEmailShowing] = useState(true);
    const handleSend = () => {
        setEmailShowing(false);
        console.log('resume share', props, isEmailShowing); 
    }

    const handleCancel = () => {
        props.handleResumeShare(false);
    }
    return (
        <>
            <Col>
                <Modal show={props.isShareShowing} onHide={handleCancel}>
                    <Modal.Header closeButton>
                        <Modal.Title> Enter Email: </Modal.Title>
                    </Modal.Header>
                    {
                        isEmailShowing ? (
                            <Modal.Body>
                    <Form.Control
                      type="email"
                      name="emailId"
                    />
                    </Modal.Body>
                        ) :
                        (
                        <Modal.Body>
                            <p className="resume-content">
                                Resume for employee 123456 sent successfully.    
                            </p>    
                        </Modal.Body>
                        )
                    }
                    { isEmailShowing ? (<Modal.Footer>
                        <Button variant="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSend}>
                            Send
                        </Button>
                        </Modal.Footer>): (
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleCancel}>
                                Continue
                            </Button>
                        </Modal.Footer>
                        ) 
                    }
                </Modal>
            </Col>
        </>
    )

}

export default ResumeShare;

      
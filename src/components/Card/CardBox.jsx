import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './style.css'

const CardBox = (props) => {

    const { header, body_title, body_content, btnAction, actionToContinue } = props

    return (
        <Card className='card-box-container'>
            <Card.Header>{header}</Card.Header>
            <Card.Body>
                <Card.Title>{body_title}</Card.Title>

                {body_content}

                {btnAction && <Button variant="primary" onClick={actionToContinue}>{btnAction}</Button>}
            </Card.Body>
        </Card>
    )
}

export default CardBox;
import React from 'react'

import buttonStyle from '../components/button.module.css'
import containerStyle from '../components/container.module.css'
import iconStyle from '../components/icon.module.css'
import textStyle from '../components/text.module.css'

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Row, Col } from 'react-bootstrap'

import { RiLoginCircleFill } from 'react-icons/ri'

import { csrfToken } from 'next-auth/client'





export default function logon({ csrfToken }){

    return (
        <Container className={containerStyle.loginBody}>
            <Row>
                <Col md={{ span: 2, offset: 5 }} className={iconStyle.divForIcon}>
                    <RiLoginCircleFill  />
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 4, offset: 4 }} className={textStyle.loginTitle}>
                    nome do sistema
                </Col>
            </Row>
            <Form method='post' action='/api/auth/callback/credentials'>
            <input name='csrfToken' type='hidden' defaultValue={csrfToken}/>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control name='username' type="text" placeholder="Usuário" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Control name='password' type="password" placeholder="Senha" />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={{ span: 2, offset: 7 }} >
                        <Button variant="primary" type="submit" className={buttonStyle.submit}>
                            Acessar
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

logon.getInitialProps = async (context) => {
    return {
      csrfToken: await csrfToken(context)
    }
  }
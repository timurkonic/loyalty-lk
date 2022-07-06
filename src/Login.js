import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function Login() {

    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Modal show={show} size="lg" backdrop={false} centered={true} animation={false} onHide={handleClose} contentClassName="border-0 shadow-lg">
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Номер карты</Form.Label>
                            <Form.Control id="login"/>
                            <Form.Text className="text-muted">Тринадцатизначный номер Вашей карты лояльности Народная, находится на обратной стороне</Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password"/>
                            <Form.Text className="text-muted">Пароль для входа в личный кабинет</Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="red" onClick={handleClose}>Войти</Button>
                    <Button variant="blue" onClick={handleClose}>Регистрация</Button>
                </Modal.Footer>
            </Modal>
      </>
    );
}

export default Login;
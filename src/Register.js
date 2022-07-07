import { useState } from 'react';
import { Modal, Button, Form, Toast } from 'react-bootstrap';
import backendService from './BackendService';

const Register = () => {

    const [show, setShow] = useState(true);
    const [card, setCard] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [registerEnabled, setRegisterEnabled] = useState(false);
    const [toastText, setToastText] = useState("");
    const [toastShow, setToastShow] = useState(false);

    const doRegister = async () => {
        try {
            const response = await backendService('POST', '/user/login', { body: {} });
        }
        catch (e) {
            setToastText(e.error);
            setToastShow(true);
        }
    }

    return (
        <Modal show={show} size="lg" backdrop={false} centered={true} animation={false} keyboard={false} onHide={() => setShow(false)} contentClassName="border-0 shadow-lg">
            <Modal.Body>
                <div className="modal-before">Регистрация</div>
                <Form className="mb-3">
                <Form.Group>
                        <Form.Label>Номер карты</Form.Label>
                        <Form.Control value={card} onChange={e => setCard(e.target.value)}/>
                        <Form.Text className="text-muted">Тринадцатизначный номер Вашей карты лояльности Народная, находится на обратной стороне</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Код регистрации</Form.Label>
                        <Form.Control value={code} onChange={e => setCode(e.target.value)}/>
                        <Form.Text className="text-muted">Код регистрации, находится на чеке</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                        <Form.Text className="text-muted">Пароль для входа в личный кабинет</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Подтверждение пароля</Form.Label>
                        <Form.Control type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                        <Form.Text className="text-muted">Подтверждение пароля</Form.Text>
                    </Form.Group>
                </Form>
                <Toast onClose={() => setToastShow(false)} show={toastShow} animation={false} delay={3000} autohide={true}>
                    <Toast.Header closeButton={false}>Ошибка</Toast.Header>
                    <Toast.Body className="text-danger">{toastText}</Toast.Body>
                </Toast>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="red" onClick={() => doRegister()} disabled={!registerEnabled}>Зарегистрироваться</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Register;
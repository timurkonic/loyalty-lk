import { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import backendService from './BackendService';

const Login = () => {

    const [show, setShow] = useState(true);
    const [login, setLogin] = useState("");
    const [loginEnabled, setLoginEnabled] = useState(false);
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState("");

    const checkLogin = (value) => {
        const re = /^[0-9]{13}$/;
        setLoginEnabled(re.test(value));
        setLogin(value);
    }

    const doLogin = async () => {
        try {
            const response = await backendService('POST', '/user/login', { body: {id: login, pass: password} });
        }
        catch (e) {
            setAlert(e.error);
            setTimeout(() => setAlert(""), 2000);
        }
    }

    return (
        <Modal show={show} size="lg" backdrop={false} centered={true} animation={false} keyboard={false} onHide={() => setShow(false)} contentClassName="border-0 shadow-lg">
            <Modal.Body>
                <Form className="mb-3">
                    <Form.Group>
                        <Form.Label>Номер карты</Form.Label>
                        <Form.Control id="login" value={login} onChange={e => checkLogin(e.target.value)}/>
                        <Form.Text className="text-muted">Тринадцатизначный номер Вашей карты лояльности Народная, находится на обратной стороне</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                        <Form.Text className="text-muted">Пароль для входа в личный кабинет</Form.Text>
                    </Form.Group>
                </Form>
                <Alert show={alert.length > 0} variant="danger" className="position-absolute">{alert}</Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="red" onClick={() => doLogin()} disabled={!loginEnabled}>Войти</Button>
                <Button variant="blue" onClick={() => setShow(false)}>Регистрация</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Login;
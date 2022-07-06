import { useState, useEffect, useCallback } from 'react';
import { Modal, Button, Form, Toast } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import backendService from './BackendService';

const Login = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(true);

    const [login, setLogin] = useState("");   
    const [password, setPassword] = useState("");

    const [loginValid, setLoginValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);

    const [loginEnabled, setLoginEnabled] = useState(false);

    const [toastText, setToastText] = useState("");
    const [toastShow, setToastShow] = useState(false);

    const checkLogin = useCallback(() => {
        const re = /9900^[0-9]{9}$/;
        return re.test(login);
    }, [login]);

    const checkPassword = useCallback(() => {
        return password.length >= 3;
    }, [password]);

    const doLogin = async () => {
        try {
            const response = await backendService('POST', '/user/login', { body: {id: login, pass: password} });
        }
        catch (e) {
            setToastText(e.error);
            setToastShow(true);
        }
    }

    const goRegister = () => {
        navigate('/register')
    }

    useEffect(() => {
        setLoginValid(login.length === 0 || checkLogin());
        setPasswordValid(password.length === 0 || checkPassword());

        setLoginEnabled(checkLogin() && checkPassword());
    }, [checkLogin, checkPassword]);

    return (
        <Modal show={show} size="lg" backdrop={false} centered={true} animation={false} keyboard={false} onHide={() => setShow(false)} contentClassName="border-0 shadow-lg">
            <Modal.Body>
                <div class="modal-before">Вход в личный кабинет</div>
                <Form className="mb-3">
                    <Form.Group>
                        <Form.Label>Номер карты</Form.Label>
                        <Form.Control id="login" value={login} onChange={e => setLogin(e.target.value)} className={loginValid ? "" : "border border-danger"}/>
                        <Form.Text className="text-muted">Тринадцатизначный номер Вашей карты лояльности Народная, находится на обратной стороне</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} className={passwordValid ? "" : "border border-danger"}/>
                        <Form.Text className="text-muted">Пароль для входа в личный кабинет</Form.Text>
                    </Form.Group>
                </Form>
                <Toast onClose={() => setToastShow(false)} show={toastShow} animation={false} delay={3000} autohide={true}>
                    <Toast.Header closeButton={false}>Ошибка</Toast.Header>
                    <Toast.Body className="text-danger">{toastText}</Toast.Body>
                </Toast>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="red" onClick={() => doLogin()} disabled={!loginEnabled}>Войти</Button>
                <Button variant="blue" onClick={() => goRegister()}>Регистрация</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Login;
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import backendService from "./BackendService";
import Transactions from "./Transactions";

const Main = ({ account, token }) => {
    const [ transactions, setTransactions ] = useState([]);

    const loadTransactions = async () => {
        if (!token) {
          return;
        }
    
        try {
          const response = await backendService('GET', '/user/transactions', { token: token });
          response.reverse();
          setTransactions(response);
        }
        catch (e) {
        }
    };

    useEffect(() => {
        loadTransactions();
    }, []);
    
    return (
        <>
            <Container fluid={true}>
                <Row>
                    <Col lg="3">
                        <div className="block">
                            <div className="blockTitle">{ account.owner_family_name } { account.owner_first_name } { account.owner_third_name }</div>
                            <div className="blockText"><a href="#">Мой профиль</a></div>
                            <div className="blockText">{ account.id }</div>
                            { account.balance > 0 || account.balance_bns > 0 ? <div className="blockTitle">Баланс</div> : ''}
                            { account.balance > 0 ? <div className="blockText">{account.balance} &#8381;</div> : '' }
                            { account.balance_bns > 0 ? <div className="blockText">{account.balance_bns} Б</div> : '' }
                        </div>
                    </Col>
                    <Col lg="6">
                        <Transactions transactions={transactions} account={account}/>
                    </Col>
                    <Col lg="3">
                        <div className="block">
                            <div className="blockTitle">Включите отправку электронных чеков вместо бумажных</div>
                            <div className="blockText"><a href="#">Почему это важно?</a></div>
                            <div className="blockText"><a href="#">Хочу включить</a></div>
                        </div>
                        <div className="block">
                            <div className="blockTitle">Подписка на акции по СМС выключена</div>
                            <div className="blockText"><a href="#">Хочу включить</a></div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Main;
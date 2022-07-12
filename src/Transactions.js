import './Transactions.css';
import { useState } from 'react';
import { Nav } from 'react-bootstrap';

const Transactions = ({ transactions, account }) => {
    const [transactionFilter, setTransactionFilter] = useState("all");

    const dateFormatter = new Intl.DateTimeFormat('ru', { day: 'numeric', month: "long",  year: 'numeric' });
    const timeFormatter = new Intl.DateTimeFormat('ru', { hour: 'numeric', minute: "numeric" });
    const amountFormatter = new Intl.NumberFormat('ru', { minimumFractionDigits: 2 });

    const TransactionFilter = ({account, transactionFilter, setTransactionFilter}) => {
        const onSelect = (transactionFilter) => {
            setTransactionFilter(transactionFilter);
        }

        const hasBonus = account.type !== 0;
        const hasRuble = account.type === 0 || account.type === 1;

        return (
            <Nav onSelect={onSelect} activeKey={transactionFilter}>
                <Nav.Item><Nav.Link className="transactionFilterLink" eventKey="all" disabled={transactionFilter === 'all'}>Все</Nav.Link></Nav.Item>
                { hasBonus ? <Nav.Item><Nav.Link className="transactionFilterLink" eventKey="addbonus" disabled={transactionFilter === 'addbonus'}>Начисление бонусов</Nav.Link></Nav.Item> : null }
                { hasBonus ? <Nav.Item><Nav.Link className="transactionFilterLink" eventKey="paybonus" disabled={transactionFilter === 'paybonus'}>Списание бонусов</Nav.Link></Nav.Item> : null }
                { hasRuble ? <Nav.Item><Nav.Link className="transactionFilterLink" eventKey="addruble" disabled={transactionFilter === 'addruble'}>Начисление рублей</Nav.Link></Nav.Item> : null }
                { hasRuble ? <Nav.Item><Nav.Link className="transactionFilterLink" eventKey="payruble" disabled={transactionFilter === 'payruble'}>Списание рублей</Nav.Link></Nav.Item> : null }
            </Nav>
        );
    }

    const Transaction = ({ transaction, showDt }) => {
        return <>
            { showDt ? <div className="transactionDt">{ transaction.dt }</div> : null }
            <div className="transactionContent">
                <div className="transactionTm">{ transaction.tm }</div>
                <div className="transactionName"> { transaction.name } </div>
                { transaction.type === 0 ? <div className="transactionAmount transactionAmountPay"> { amountFormatter.format(transaction.amount) } &#8381;</div> : null }
                { transaction.type === 1 ? <div className="transactionAmount transactionAmountAdd"> { amountFormatter.format(transaction.amount) } &#8381;</div> : null }
                { transaction.type === 4 ? <div className="transactionAmount transactionAmountAdd"> { amountFormatter.format(transaction.amount_bns) } Б</div> : null }
                { transaction.type === 5 ? <div className="transactionAmount transactionAmountPay"> { amountFormatter.format(transaction.amount_bns) } Б</div> : null }
            </div>
        </>
    }

    return (
        <div className="block">
            <div className="blockTitle">Последние операции</div>
            <TransactionFilter account={account} transactionFilter={transactionFilter} setTransactionFilter={setTransactionFilter}/>
            {
                transactions
                    .filter(transaction => 
                        transactionFilter === 'all' ||
                        (transactionFilter === 'addbonus' && transaction.type === 4) ||
                        (transactionFilter === 'paybonus' && transaction.type === 5) ||
                        (transactionFilter === 'addruble' && transaction.type === 1) ||
                        (transactionFilter === 'payruble' && transaction.type === 0)
                    )
                    .slice(0, 10)
                    .map(transaction => ({ ...transaction, dt: dateFormatter.format(new Date(transaction.ts)), tm: timeFormatter.format(new Date(transaction.ts)) }))
                    .map((transaction, index, arr) => <Transaction transaction={transaction} showDt={index === 0 || transaction.dt !== arr[index-1].dt} key={transaction.ts}/>)
            }
        </div>
    );
}

export default Transactions;
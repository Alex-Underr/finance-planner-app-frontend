import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { ExpensesLimits } from '../../components/CashflowPage/ExpensesLimits/ExpensesLimits';
import { TransactionDataList } from '../../components/CashflowPage/TransactionDataList/TransactionDataList';
// import {ModalAddIncome} from '../../components/CashflowPage/ModalAddIncome';
import {Container} from '../../components/Container/Container';
import css from './CashflowPage.module.css';
// =============
import cashflowOperations from 'redux/cashflowPage/cashflowPage-operations';

export const CashflowPage = () => {
  const [formData, setFormData] = useState({
    category: 'Other',
    categoryType: 'expense',
    expenseComment: '',
    sum: '',
  });
  

  const handleSubmit = event => {
    event.preventDefault();
    console.log(formData);

    setFormData({
      category: '',
      expenseComment: '',
      sum: '',
    });
  };
  // ===============================================================
  const dispatch = useDispatch();

  const handleSubmitAdd = e => {
    e.preventDefault()
    console.log("click1");
    const credentials = {
      comment: "coffee",
      sum: 500,
      categoryType: "expense",
      category: "other"
    }
    dispatch(cashflowOperations.addTransaction(credentials))
      .unwrap()
      .then(response => {
        console.log(response);
      })
    .catch(error => console.error(error));
  }

  const handleSubmitGet = e => {
    e.preventDefault()
    console.log("click2");
    dispatch(cashflowOperations.getCashflowLimits())
      .unwrap()
      .then(response => {
        console.log(response);
      })
    .catch(error => console.error(error));
  }

  
  // ===============================================================

  return (
    <main className={css.main}>
      <Container>
        {/* <button type="submit" onClick={handleSubmitAdd} style={{width: "200px", height:"200px"}}></button>
        <button type="submit" onClick={handleSubmitGet} style={{width: "200px", height:"200px", backgroundColor:"red"}}></button>
        <button type="submit" onClick={handleSubmitCategories} style={{width: "200px", height:"200px", backgroundColor:"green"}}></button>
        <ul>
          {category.map((el, i) => {
            return (<li key={i}>{el}</li>)
          })}
        </ul> */}
        <form onSubmit={handleSubmit} className={css.form}>
          <TransactionDataList setFormData={setFormData} formData={formData} />
          {/* <ExpensesLimits />
          <ModalAddIncome /> */}
        </form>
      </Container>
    </main>
  );
};

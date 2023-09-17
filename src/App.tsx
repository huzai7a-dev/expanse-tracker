import { useState } from "react";
import ExpenseForm, { ExpenseFormData } from "./components/ExpenseForm"
import ItemsTable from "./components/ExpenseListTable"
import FilterExpenseList from "./components/FilterExpenseList"


const expensesList = [
  {
      id: 1,
      description: "Groceries",
      amount: 50.00,
      category: "Groceries"
  },
  {
      id: 2,
      description: "Gasoline",
      amount: 30.00,
      category: "Utilities"
    },
  {
      id: 3,
      description: "Dinner at a restaurant",
      amount: 75.00,
      category: "Groceries"
  },
  {
      id: 4,
      description: "Movie tickets",
      amount: 20.00,
      category: "Entertainment"
  },
  {
      id: 5,
      description: "Internet bill",
      amount: 60.00,
      category: "Utilities"
  }
];

function App() {
  const [expenses, setExpenses] = useState(expensesList);
  const [selectedCategory, setCategory] = useState('')

  const visibleExpense = selectedCategory ? expenses.filter(expense => expense.category === selectedCategory) : expenses

  const handleDeleteItem = (id:number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  }
 
  const addExpense = (formData: ExpenseFormData) => {
    const newExpense = {
      ...formData,
      id:expenses.length + 1
    }
    setExpenses((prevExpenses)=> [...prevExpenses,newExpense])
  } 
  
  return (
    <div className="container-md py-4">
      <ExpenseForm onSubmit={addExpense} />
      <FilterExpenseList onSelectCategory={setCategory}/>
      <ItemsTable expenses={visibleExpense} onDelete={handleDeleteItem} />
    </div>
  )
}

export default App

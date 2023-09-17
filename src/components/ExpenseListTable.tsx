

interface Expense {
    id: number,
    description: string,
    amount: number,
    category: string
}
interface Props {
    expenses: Expense[],
    onDelete: (id: number) => void
}
const ItemsTable = ({ expenses, onDelete }: Props) => {

    if(expenses.length === 0) return null
    return (
        <table className="table table-bordered mt-3">
            <thead>
                <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Category</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {expenses.map((expense) =>
                    <tr key={expense.id}>
                        <td>{expense.description}</td>
                        <td>{expense.amount}</td>
                        <td>{expense.category}</td>
                        <td>
                            <button
                                className="btn  btn-danger"
                                onClick={() => onDelete(expense.id)}
                            >Delete</button>
                        </td>
                    </tr>
                )}
            </tbody>
            <tfoot>
                <tr>
                    <td>Total</td>
                    <td>{expenses.reduce((acc, expense) =>
                    { return acc + expense.amount }, 0).toFixed(2)}</td>
                    <td></td>
                    <td></td>
                </tr>
            </tfoot>
            </table>
    )
}

export default ItemsTable;
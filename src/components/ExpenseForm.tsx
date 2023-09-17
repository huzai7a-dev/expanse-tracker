import z from 'zod';
import { categories } from '../constants';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
    description: z.string().min(3, {message:'Description should be atleast 3 characters long'}).max(255),
    amount: z.number({invalid_type_error:'Amount is required'}).min(0.1).max(100_000),
    category: z.enum(categories, { errorMap: () => ({ message:'Category is required'}) })
});

export type ExpenseFormData = z.infer<typeof schema>

interface Props {
    onSubmit:(data:ExpenseFormData)=> void
}
const AddForm = ({ onSubmit }:Props) => {
    const { register, handleSubmit, formState: { errors },reset } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) })

    return (
        <form onSubmit={handleSubmit((data) => {
            onSubmit(data)
            reset()
        })}>
            <div>
                <label htmlFor="description" className="form-label">Description</label><br />
                <input
                    type="text"
                    {...register('description')}
                    id="description"
                    className="form-control"
                />
                {errors.description && <p className='text-danger'>{errors.description.message}</p>}
            </div>
            <div className="my-3">
                <label htmlFor="amount" className="form-label">Amount</label><br />
                <input
                    {...register('amount', {valueAsNumber:true})}
                    id="amount"
                    className="form-control"
                    type="text"
                />
                {errors.amount && <p className='text-danger'>{errors.amount.message}</p>}
            </div>

            <div className="my-3">
                <label htmlFor="category" className="mb-2">Category</label>
                <select
                    {...register('category')}
                    className="form-select"
                    id="category"
                    aria-label="Default select example"
                >
                    <option value={''}></option>
                    {categories.map((category) =>
                        <option key={category} value={category}>{category}</option>)}
                </select>
                {errors.category && <p className='text-danger'>{errors.category.message}</p>}
            </div>
            <button type='submit' className="btn btn-primary mt-3">Submit</button>
        </form>
    )
}

export default AddForm;
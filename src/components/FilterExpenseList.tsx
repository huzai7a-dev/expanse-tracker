import { categories } from "../constants";

interface Props {
    onSelectCategory:(category:string) => void
}
const FilterExpenseList = ({ onSelectCategory }:Props) => {
    return (
        <select
            className="form-select mt-3"
            onChange={(event) => onSelectCategory(event.target.value)}
        >
            <option value="">All Categories</option>
            {categories.map((category) =>
                <option key={category} value={category}>{category}</option>)}
        </select>
    )
}

export default FilterExpenseList;
import CatButton from "./CatButton";
import { apiProps } from "../api";

interface Props {
    query: string
    setQuery: (query: string) => void
    clickHandler: (filterType: string) => void
    todos: apiProps[]
}

const BodySec = ({query, setQuery, clickHandler, todos}: Props) => {
    return (
        <div className='flex flex-col gap-5 w-full p-3 px-7 bg-green-50'>
            <div className='justify-items-center'>
                <input
                    type='search'
                    className="w-full bg-gray-200 p-2 px-5 rounded-full"
                    placeholder="Search..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <div className="flex gap-20 justify-center ">
                <CatButton clickHandler={clickHandler} todo={todos} type="all" />
                <CatButton clickHandler={clickHandler} todo={todos} type="remaining" />
                <CatButton clickHandler={clickHandler} todo={todos} type="completed" />
            </div>
        </div>
    )
}

export default BodySec
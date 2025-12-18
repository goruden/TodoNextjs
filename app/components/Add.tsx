import { Services } from "../api"
import { useContext } from "react"
import { TodoContext } from "../pages/TodoPage"
import axios from "axios"

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const Add = ({ open, setOpen }: Props) => {
    if (!open) return null
    const { fetchTodos } = useContext(TodoContext);

    const clickHandler = async () => {
        const title = document.querySelector('input')?.value
        const description = document.querySelector('textarea')?.value || ''
        
        if (title?.trim()) {
            await Services.putData(title, description)
            //axios.post('https://todo-using-nextjs-default-rtdb.asia-southeast1.firebasedatabase.app/todos.json', { title, description })
            fetchTodos()
            setOpen(false)
        } else {
            alert('Title is required')
        }
    }
    
    return (
        <div className='fixed w-full h-full top-0 left-0 bg-black/40 flex items-center justify-center'>
            <div className='bg-white w-1/2 flex flex-col py-5 px-10 rounded-2xl gap-3'>
                <p className="text-2xl font-bold">Add New Todo</p>
                <input className='bg-gray-300 p-2 rounded' type="text" placeholder='Title' />
                <textarea className='bg-gray-300 p-2 rounded' placeholder='Description' />
                <div className='flex gap-10 justify-center px-10'>
                    <button className='bg-green-300 rounded-lg p-2 px-5' onClick={clickHandler}>Add</button>
                    <button className='bg-gray-300 rounded-lg p-2 px-5' onClick={() => setOpen(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Add
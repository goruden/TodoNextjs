import { useState } from "react"
import { Services, apiProps } from "../api"

function GetFormattedDate(date: string) {
    const dateObj = new Date(date);
    var month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    var day  = ("0" + (dateObj.getDate())).slice(-2);
    var year = dateObj.getFullYear();
    var hour =  ("0" + (dateObj.getHours())).slice(-2);
    var min =  ("0" + (dateObj.getMinutes())).slice(-2);
    return year + "-" + month + "-" + day + " " + hour + ":" + min;
}

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    onOrderCreated: () => void;
    item: apiProps;
}

const Update = ({ open, setOpen, onOrderCreated, item }: Props) => {
    const [editItem, setEditItem] = useState(item)

    if (!open) return null
    const clickHandler = async () => {
        if (!item.id) {
            console.error('Cannot update item: ID is missing')
            return
        }
        await Services.updateData(editItem.title, editItem.description, item.id, editItem.status)
        onOrderCreated()
        setOpen(false)
    }

    return (
        <div className='fixed w-full h-full top-0 left-0 bg-black/40 flex items-center justify-center'>
            <div className='bg-white w-1/2 flex flex-col py-5 px-10 rounded-2xl gap-3'>
                <p className="text-2xl font-bold">Update Todo</p>
                <input className='bg-gray-300 p-2 rounded' type="text" placeholder='Title' value={editItem.title} onChange={(e) => setEditItem({...editItem, title: e.target.value})} />
                <textarea className='bg-gray-300 p-2 rounded' placeholder='Description' value={editItem.description} onChange={(e) => setEditItem({...editItem, description: e.target.value})} />
                <input disabled className='bg-gray-200 p-2 rounded' type="text" value={GetFormattedDate(item.date)} />
                <input disabled className='bg-gray-200 p-2 rounded' type="text" value={item.status} />
                <div className='flex gap-10 justify-center px-10'>
                    <button className='cursor-pointer bg-green-300 hover:bg-green-400 rounded-lg p-2 flex-1' onClick={clickHandler}>Save</button>
                    <button className='cursor-pointer bg-gray-300 hover:bg-gray-400 rounded-lg p-2 flex-1' onClick={() => setOpen(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Update
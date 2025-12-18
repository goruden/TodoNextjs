import { useState } from "react"
import Add from "./Add"

const Title = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex justify-between gap-10 bg-green-100 rounded-t-2xl p-5 px-7 w-full">
        <p className="text-2xl font-bold">ToDoList</p>
        <div>
            <button className="cursor-pointer bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded-lg" onClick={() => setOpen(true)}>+ Add</button>
        </div>
        <Add open={open} setOpen={setOpen} />
    </div>
  )
}

export default Title
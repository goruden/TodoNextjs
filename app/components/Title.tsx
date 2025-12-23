import { useState } from "react"
import Add from "./Add"
import { Services } from "@/app/api"

const Title = () => {
  const [open, setOpen] = useState(false)
  const logout = async () => {
    const confirmed = confirm("Are you sure you want to log out?");
    if (confirmed) {
      await Services.logout()
      window.location.href = '/auth'
    }
  }
  return (
    <div className="flex justify-between gap-10 bg-green-100 rounded-t-2xl p-5 px-7 w-full">
      <p className="text-2xl font-bold">ToDoList</p>
      <div>
        <button className="cursor-pointer bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded-lg" onClick={() => setOpen(true)}>+ Add</button>
      </div>
      <div className="flex gap-2">
        <Add open={open} setOpen={setOpen} />
        <button onClick={logout} className="bg-red-300 hover:bg-red-400 text-black px-3 py-1 rounded-lg">LogOut</button>
      </div>
    </div>
  )
}

export default Title
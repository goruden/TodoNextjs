import { apiProps } from "../api"

interface Props{
    clickHandler: (filterType: string) => void
    type: string
    todo: apiProps[]
}

const CatButton = ({clickHandler, type, todo}: Props) => {
  return (
    <button 
        onClick={() => {
            clickHandler(type)
        }}
        className={`flex cursor-pointer bg-gray-200 rounded-lg items-center
            ${type === 'all' 
                ? 'bg-sky-50 hover:bg-sky-100' 
                : type === 'remaining' 
                ? 'bg-red-50 hover:bg-red-100' 
                : 'bg-green-50 hover:bg-green-100'}`}
    >
        {type==='all' 
            ? 
            <div className="bg-sky-200 p-2 rounded-l-lg">
                {todo.length}
            </div> 
            : 
            <div className={`p-2 rounded-l-lg ${ type === 'remaining' 
                ? 'bg-red-200' 
                : 'bg-green-200'}`
            }>
                {todo.filter(item => item.status === type).length}
            </div>
        }
        <p className="p-2">{type}</p>
    </button>
  )
}

export default CatButton
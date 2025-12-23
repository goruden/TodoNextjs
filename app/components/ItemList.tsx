import { useState, useRef, useEffect } from "react"
import { Services, apiProps } from "../api"
import Update from "./Update"

interface Props {
  item: apiProps
  onOrderCreated: () => void
  query: string
}

// const highlightText = (text: string, query: string) => {
//   if (!query.trim()) return text

//   const regex = new RegExp(`(${query})`, 'gi')
//   const parts = text.split(regex)

//   return parts.map((part, index) =>
//     regex.test(part) ?
//       <span key={index} className="bg-blue-200">{part}</span> :
//       part
//   )
// }

// const highlightText = (text: string, query: string) => {
//   if (!query) return text

//   const lowerText = text.toLowerCase()
//   const lowerQuery = query.toLowerCase()

//   const result = []
//   let startIndex = 0

//   while (true) {
//     const index = lowerText.indexOf(lowerQuery, startIndex)

//     if (index === -1) {
//       result.push(text.slice(startIndex))
//       break
//     }

//     if (index > startIndex) {
//       result.push(text.slice(startIndex, index))
//     }

//     result.push(
//       <span key={index} className="bg-blue-200">
//         {text.slice(index, index + query.length)}
//       </span>
//     )

//     startIndex = index + query.length
//   }

//   return result
// }

const ItemList = ({ item, onOrderCreated, query }: Props) => {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [updateOpen, setUpdateOpen] = useState(false)
  const queryRef = useRef<HTMLDivElement>(null)

  return (
    <div className='flex gap-10 w-full px-10'>
      <div className='w-20'>
        <button className="cursor-pointer hover:bg-gray-200 rounded-full" onClick={async () => {
          if (item.id) {
            await Services.updateStatus(item.id, item.status === 'completed' ? 'remaining' : 'completed')
            onOrderCreated()
          }
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
            <path fillRule="evenodd" color={item.status === 'completed' ? 'green' : 'gray'} d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div ref={queryRef} className='flex-1 flex flex-col'>
        <div className={`${item.status === 'completed' ? 'line-through' : ''}`}>
          {/* {highlightText(item.title, query)} */}
          {
            query === ''
              ? item.title
              // : <>
              //   {item.title.split(query)[0]}
              //   <span className="bg-blue-200">{query}</span>
              //   {item.title.split(query)[1]}
              //   <span className="bg-blue-200">{query}</span>
              //   {item.title.split(query)[2]}
              // </>
              : <>
                {item.title.split(query).map((part, index) => (
                  <>
                    {part}
                    {index < item.title.split(query).length - 1 && (
                      <span className="bg-blue-200">{query}</span>
                    )}
                  </>
                ))}
              </>
          }
        </div>
        <div className={`${item.status === 'completed' ? 'line-through' : ''} text-gray-500 text-xs`}>
          {/* {highlightText(item.description, query)} */}
          {
            query === ''
              ? item.description
              : <>
                {item.description.split(query).map((part, index) => (
                  <>
                    {part}
                    {index < item.description.split(query).length - 1 && (
                      <span className="bg-blue-200">{query}</span>
                    )}
                  </>
                ))}
              </>
          }
        </div>
      </div>
      <div className='flex gap-5'>
        <button className="cursor-pointer bg-blue-300 hover:bg-blue-400 p-2 rounded-lg" onClick={() => setUpdateOpen(true)}>Update</button>
        {
          updateOpen === true &&
          <Update open={updateOpen} setOpen={setUpdateOpen} item={item} />
        }
        <button className="cursor-pointer bg-red-300 hover:bg-red-400 p-2 rounded-lg" onClick={() => setDeleteOpen(true)}>Delete</button>
        {
          deleteOpen === true &&
          <div className='fixed top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center'>
            <div className="bg-white p-10 rounded-2xl flex flex-col gap-5">
              <p className="text-xl font-bold">Are you sure you want to delete this item?</p>
              <div className="flex gap-5 items-center justify-center">
                <button className="cursor-pointer bg-orange-400 hover:bg-orange-500 p-2 rounded w-20" onClick={async () => {
                  if (item.id) {
                    await Services.deleteData(item.id)
                    onOrderCreated()
                    setDeleteOpen(false)
                  }
                }}>Yes</button>
                <button className="cursor-pointer bg-gray-400 hover:bg-gray-500 p-2 rounded w-20" onClick={() => setDeleteOpen(false)}>No</button>
              </div>
            </div>
          </div>
        }
      </div>
    </div >
  )
}

export default ItemList
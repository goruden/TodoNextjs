import { supabase } from '../lib/supabase'
import axios from 'axios'

export interface apiProps {
  id?: string
  title: string
  description: string
  date: string
  status: 'remaining' | 'completed'
}

const url = 'https://todo-using-nextjs-default-rtdb.asia-southeast1.firebasedatabase.app'

export const Services = {
  getAll: async () => {
    const { data, error } = await supabase
    .from('todos')
    .select()
    if (error) {
      console.error(error)
      throw error
    }
    return data
  },
  updateData: async ( title: string, description: string, id: string, status: string) => {
    const { error } = await supabase
    .from('todos')
    .update({ title: title, description: description, status: status })
    .eq('id', id)
    if (error) {
      console.error(error)
      throw error
    }
  },
  updateStatus: async ( id:string, status:string) => {
    const { error } = await supabase
    .from('todos')
    .update({status:status})
    .eq('id', id)
    if (error) {
      console.error(error)
      throw error
    }
  },
  //axios.post('https://todo-using-nextjs-default-rtdb.asia-southeast1.firebasedatabase.app/todos.json', { title, description })
  putData: async ( title: string, description: string) => {
    const { error } = await supabase
    .from('todos')
    .insert({ title: title, description: description, date: new Date().toISOString(), status: 'remaining'})
    // axios.post(url + '/todos.json', { title: title, description: description, date: new Date().toISOString(), status: 'remaining'})
    if (error) {
      console.error(error)
      throw error
    }
  },
  deleteData: async (id: string) => {
    const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id)
    if (error) {
      console.error(error)
      throw error
    }
  }
}

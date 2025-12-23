import { supabase } from '../lib/supabase'

export interface apiProps {
  id?: string
  title: string
  description: string
  date: string
  status: 'remaining' | 'completed'
}


export const Services = {
  getAll: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      window.location.href = '/auth'
      throw new Error('Not authenticated')
    }

    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false })

    if (error) throw error
    return data
  },

  updateData: async (
    title: string,
    description: string,
    id: string,
    status: string
  ) => {
    const { error } = await supabase
      .from('todos')
      .update({ title, description, status })
      .eq('id', id)

    if (error) {
      console.error(error)
      throw error
    }
  },

  updateStatus: async (id: string, status: 'remaining' | 'completed') => {
    const { error } = await supabase
      .from('todos')
      .update({ status })
      .eq('id', id)

    if (error) throw error
  },

  putData: async (title: string, description: string) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { error } = await supabase.from('todos').insert({
      title,
      description,
      date: new Date().toISOString(),
      status: 'remaining',
      user_id: user.id
    })

    if (error) throw error
  },

  deleteData: async (id: string) => {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  signUp: async (username: string, password: string) => {
    const email = `${username}@todo.app`

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) throw error

    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          username
        })

      if (profileError) {
        throw profileError
      }
    }

  },

  login: async (username: string, password: string) => {
    const email = `${username}@todo.app`

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error
  },

  logout: async () => {
    await supabase.auth.signOut()
  }
}

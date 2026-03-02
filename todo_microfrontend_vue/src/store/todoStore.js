import { defineStore } from 'pinia'

const API_URL = import.meta.env.VITE_API_URL 

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: []
  }),

  actions: {
    // Fetch all todos from backend
    async fetchTodos() {
      try {
        const res = await fetch(API_URL)
        this.todos = await res.json()
      } catch (err) {
        console.error('Error fetching todos:', err)
      }
    },

    // Add a new todo
    async addTodo(text) {
      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text })
        })
        const newTodo = await res.json()
        this.todos.push(newTodo)
      } catch (err) {
        console.error('Error adding todo:', err)
      }
    },

    // Delete a todo
    async deleteTodo(id) {
      try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
        this.todos = this.todos.filter(t => t.id !== id)
      } catch (err) {
        console.error('Error deleting todo:', err)
      }
    },

    // Toggle done/undone
    async toggleTodo(id, done) {
      try {
        const todo = this.todos.find(t => t.id === id)
        const res = await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...todo, done })
        })
        const updatedTodo = await res.json()
        this.todos = this.todos.map(t => (t.id === id ? updatedTodo : t))
      } catch (err) {
        console.error('Error toggling todo:', err)
      }
    },

    // Update todo text
    async updateTodo(id, text) {
      try {
        const todo = this.todos.find(t => t.id === id)
        const res = await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...todo, text })
        })
        const updatedTodo = await res.json()
        this.todos = this.todos.map(t => (t.id === id ? updatedTodo : t))
      } catch (err) {
        console.error('Error updating todo:', err)
      }
    }
  }
})
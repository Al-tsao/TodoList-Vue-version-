const STORAGE_KEY = 'todomvc-app-vue'

const filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter(todo => !todo.completed),
  completed: (todos) => todos.filter(todo => todo.completed),
}

new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todos: [
      {
        id: uuidv4(),
        title: '學習 Vue Template 的使用',
        completed: true,
      },
      {
        id: uuidv4(),
        title: '學習在 Vue Template 中進行條件判斷',
        completed: false,
      },
      {
        id: uuidv4(),
        title: '學習在 Vue Template 中使用迴圈',
        completed: false,
      },
    ],
    currentEditTodo: {},
    visibility: 'all',
  },
  methods: {
    addTodo() {
      const title = this.newTodo && this.newTodo.trim()
      if (!title) {
        return
      }
      this.todos.push({
        id: uuidv4(),
        title: this.newTodo,
        completed: false,
      })
      this.newTodo = ''
    },
    removeTodo(todo) {
      this.todos = this.todos.filter(_todo => _todo.id !== todo.id)
    },
    editTodo(todo) {
      this.currentEditTodo = { ...todo }
    },
    doneEdit() {
      this.todos = this.todos.map(todo => {
        if (todo.id === this.currentEditTodo.id) {
          return { ...this.currentEditTodo }
        } else {
          return todo
        }
      }).filter(todo => todo.title.trim())
      this.currentEditTodo = {}
    },
    cancelEdit() {
      this.currentEditTodo = {}
    },
    setVisibility(visibility) {
      this.visibility = visibility;
    },
    clearCompleted() {
      this.todos = filters.active(this.todos)
    },
    saveStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
    }
  },
  computed: {
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
    remaining() {
      return filters.active(this.todos).length;
    },
    allDone: {
      get() {
        return this.remaining === 0
      },
      set(value) {
        this.todos = this.todos.map((todo) => {
          if (value === true) {
            // 全部勾選：將 todos 裡所有項目的 completed 設為 true
            return {
              ...todo,
              completed: true
            }
          } else {
            // 取消勾選：將 todos 裡所有項目的 completed 設為 false
            return {
              ...todo,
              completed: false
            }
          }
        })
      }
    }
  },
  filters: {
    pluralize(n) {
      return n === 1 ? "item" : "items";
    }
  },
  watch: {
    todos: {
      handler: function () {
        this.saveStorage()
      },
      deep: true,
    }
  },
  created() {
    this.todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || [])
  },
  directives: {
    'todo-focus': function (el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  }
})

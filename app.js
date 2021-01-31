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
        completed: false,
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
    finished(todo, event) {
      this.todos.forEach(element => {
        if (element.id === todo.id) {
          /* 方法一: 用classList.toggle */
          // event.target.parentElement.parentElement.classList.toggle('completed')
          /* 方法二: 直接修改Vue中的data */
          if (element.completed) {
            element.completed = false
          } else {
            element.completed = true
          }
        }
      });
    },
    setVisibility(visibility) {
      this.visibility = visibility;
    },
    clearCompleted() {
      this.todos = filters.active(this.todos)
    }
  },
  computed: {
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
    remaining() {
      return filters.active(this.todos).length;
    }
  },
  filters: {
    pluralize(n) {
      return n === 1 ? "item" : "items";
    }
  },
})

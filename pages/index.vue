<template>
  <div>
    <h2>リスト: {{ page }}</h2>
    <ol>
      <li v-for="(todo,index) in todos" :key="index">{{ todo.text }}</li>   
    </ol>
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
export default {
  components: { InfiniteLoading },
  data() {
    return {
      page: 0,
      todos: []
    }
  },
  methods: {
    async infiniteHandler($state) {
      const newTodos = await this.generateTodos()
      
      if (newTodos.length > 0) {
        this.todos.push(...newTodos)
        this.page++
        $state.loaded()
      } else {
        $state.complete()
      }
    },
    generateTodos() {
      return new Promise((resolve, reject) => {
        const generated = []
        setTimeout(() => {
          for(let i = 0; i < 100; i++) {
            generated.push({
              text: "コンテンツ" + i, done: false
            });
          }
          resolve(generated)
        }, 1000);
      })
    }
  }
}
</script>

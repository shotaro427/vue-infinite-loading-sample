<template>
  <div>
    <h2>リスト:{{ page }}</h2>
    <ol>
      <li v-for="(todo,index) in todos" :key="index">{{ todo.text }}</li>   
    </ol>
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'
export default {
  components: { InfiniteLoading },
  computed: {
    ...mapState(['todos', 'page'])
  },
  methods: {
    ...mapActions(['fetchTodos']),
    async infiniteHandler($state) {
      await this.fetchTodos({ loadState: $state })
    },
  }
}
</script>

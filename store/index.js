function generateTodos() {
  return new Promise((resolve, reject) => {
    const generated = []
    setTimeout(() => {
      for (let i = 0; i < 100; i++) {
        generated.push({
          text: "コンテンツ" + i, done: false
        });
      }
      resolve(generated)
    }, 10000);
  })
}

export const state = () => ({
  todos: [],
  page: 0,
})

export const mutations = {
  ADD_TODOS(state, todos) {
    state.todos.push(...todos)
  },
  INCREASE_PAGE(state) {
    state.page++
  }
}

export const actions = {
  async fetchTodos({ commit }, { loadState }) {
    try {
      const todos = await generateTodos()
      console.log('fetch TODOS', todos.length)

      if (loadState && todos.length > 0) {
        commit('ADD_TODOS', todos)
        commit('INCREASE_PAGE')
        loadState.loaded()
      } else if (loadState) {
        loadState.complete()
      }
    } catch (e) {
      if (loadState) {
        loadState.error()
      }
    }

  }
}
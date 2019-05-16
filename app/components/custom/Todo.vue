<template>
  <GridLayout rows="*" columns="auto, *, auto,auto">
    <Label
      row="0"
      col="0"
      :text="'fa-check-circle-o' | fonticon"
      class="fa check"
      :class="todo.done ? 'completed': ''"
      @tap="toggleTodo(todo)"
    />
    <Label
      row="0"
      col="1"
      class="center-v"
      :class="{ completedline: todo.done }"
      :text="todo.text"
      textWrap="true"
    />

    <Label
      row="0"
      col="2"
      :text="'fa-pencil-square-o' | fonticon"
      class="edit fa"
      @tap="editTodo(todo)"
    />
    <Label
      row="0"
      col="3"
      :text="'fa-trash-o' | fonticon"
      class="delete fa"
      @tap="deleteTodo(todo)"
    />
  </GridLayout>
</template>

<script>
export default {
  name: "Todo",
  computed: {},
  props: {
    todo: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      editing: false
    };
  },
  methods: {
    deleteTodo(todo) {
      this.$emit("deleteTodo", todo);
    },
    editTodo(todo) {
      this.$emit("editTodo", todo);
    },
    toggleTodo(todo) {
      this.$emit("toggleTodo", todo);
    },
    doneEdit(e) {
      const value = e.target.value.trim();
      const { todo } = this;
      if (!value) {
        this.deleteTodo({
          todo
        });
      } else if (this.editing) {
        this.editTodo({
          todo,
          value
        });
        this.editing = false;
      }
    },
    cancelEdit(e) {
      e.target.value = this.todo.text;
      this.editing = false;
    }
  }
};
</script>
<style scoped>
.completedline {
  color: #d9d9d9;
  text-decoration: line-through;
}
</style>

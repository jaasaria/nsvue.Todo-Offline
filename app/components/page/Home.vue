<template>
  <Page class="page">

    <ActionBar class="actionbar" title="NS - Thing's Todo"/>

    <GridLayout class="content" rows="auto, *, auto" columns="*">

      <!-- Header -->
      <StackLayout row="0" col="0">
        <GridLayout marginTop="15" rows="auto" columns="auto,*,auto">
          <Label
            class="fa check"
            :text="'fa-check-square' | fonticon"
            :class="{ completed: toggleAllCheck }"
            @tap="toggle"
          />
          <TextField hint="Enter Todo Here" v-model="todo" row="0" col="1"/>
          <Button class="primary" row="0" col="2" text="Add" @tap="addTodo"/>
        </GridLayout>
        <StackLayout class="lineBreak m-t-10 m-b-10"></StackLayout>
      </StackLayout>

      <!-- Body -->
      <StackLayout row="1" col="0">
        <ListView height="100%" for="(todo, index) in filteredTodos" :key="index">
          <v-template>
            <Todo
              :todo="todo"
              @toggleTodo="toggleTodo"
              @deleteTodo="deleteTodo"
              @editTodo="editTodo"
            ></Todo>
          </v-template>
        </ListView>
      </StackLayout>

      <!-- Footer -->
      <StackLayout v-show="todos.length" row="2" col="0">
        <StackLayout class="lineBreak"/>

        <GridLayout rows="*" columns="auto, *,auto,auto">
          <Label row="0" col="0" class="center-v">{{ remaining }} Items Left</Label>
          <Button
            class="btnfooter"
            v-for="(val, key, index) in filters"
            :text="key"
            :key="index"
            @tap="visibility = key"
            row="0"
            :col="index + 1"
            :class="visibility === key ? 'selected':'btnfilter'"
          />
        </GridLayout>
        
      </StackLayout>
    </GridLayout>
  </Page>
</template>


<script>
import Todo from "@/components/custom/Todo.vue";
import TodoEdit from "@/components/custom/TodoEdit.vue";
import { toast } from "@/utils/helper";

const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
};

const defaultTodos = [
  { text: "Facebook", done: false },
  { text: "Twitter", done: false },
  { text: "Youtube", done: true },
  { text: "Instagram", done: true },
  { text: "Viber", done: false },
  { text: "Javascript", done: false },
  { text: "Php", done: false },
  { text: "Objective-C", done: true },
  {
    text:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus distinctio rerum, voluptates, esse sapiente unde totam, quas dolores vero autem iusto architecto odit quia nisi! Rem, amet? Esse, distinctio officiis.",
    done: false
  }
];
export default {
  components: { Todo },
  data() {
    return {
      todo: "",
      toggleAllCheck: false,
      visibility: "all",
      filters,
      todos: defaultTodos
    };
  },
  computed: {
    allChecked() {
      return this.todos.every(todo => todo.done);
    },
    filteredTodos() {
      return filters[this.visibility](this.todos);
    },
    remaining() {
      return this.todos.filter(todo => !todo.done).length;
    }
  },
  methods: {
    toggle() {
      this.toggleAllCheck = !this.toggleAllCheck;
      this.toggleAll(this.toggleAllCheck);
    },
    addTodo() {
      const text = this.todo;
      if (text.trim()) {
        this.todos.push({
          text,
          done: false
        });
        toast(text + " : was added successfully");
      }
      this.todo = "";
    },
    toggleTodo(todo) {
      todo.done = !todo.done;
    },
    deleteTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1);
    },
    editTodo(todo) {
      this.openEdit(todo);
    },
    toggleAll(done) {
      this.todos.forEach(todo => {
        todo.done = done;
      });
    },
    openEdit(todo) {
      prompt({
        title: "Update Todo",
        message: "Enter your prefer value below: ",
        okButtonText: "Update",
        cancelButtonText: "Cancel",
        defaultText: todo.text
      }).then(result => {
        console.log(`Dialog result: ${result.result}, text: ${result.text}`);
        todo.text = result.text;
      });
    }
  }
};
</script>

<style scoped>
.checked {
  color: #20a8d8;
  background-color: red;
}
.btnfooter {
  font-size: 10;
}
.selected {
  color: white;
  background-color: #20a8d8;
}
.btnfilter {
  color: black;
  background-color: white;
}
</style>


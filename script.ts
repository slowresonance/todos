type Todo = Readonly<{
  id: string;
  text: string;
  hidden: boolean;
  done: boolean;
}>;

class Model {
  name: string;
  todos: Todo[];
  onTodoListChanged: Function;

  constructor() {
    this.name = "simple-todos";
    this.todos = JSON.parse(localStorage.getItem(this.name));
  }

  bindTodoListChanged(callback: Function) {
    this.onTodoListChanged = callback;
  }

  _commit(list: Todo[]) {
    this.onTodoListChanged(list);
    localStorage.setItem(this.name, JSON.stringify(this.todos));
  }

  parseTodo(input: string) {
    let hidden = input.startsWith("~");
    let text = hidden ? input.split("~")[1] : input;
    this.addTodo(text, hidden);
  }

  addTodo(text: string, hidden: boolean) {
    const todo: Todo = {
      id: this.randID(5),
      text: text,
      hidden: hidden,
      done: false,
    };

    this.todos.push(todo);

    this._commit(this.todos);
  }

  editTodo(id: string, updatedText: string) {
    this.todos = this.todos.map((todo) =>
      todo.id === id
        ? {
            id: todo.id,
            text: updatedText,
            hidden: todo.hidden,
            done: todo.done,
          }
        : todo
    );
  }

  deleteTodo(id: string) {
    this.todos = this.todos.filter((todo) => todo.id !== id);

    this._commit(this.todos);
  }

  toggleTodo(id: string) {
    this.todos = this.todos.map((todo) =>
      todo.id === id
        ? {
            id: todo.id,
            text: todo.text,
            hidden: todo.hidden,
            done: !todo.done,
          }
        : todo
    );

    this._commit(this.todos);
  }

  randID(length: number): string {
    return [...Array(length)]
      .map((_) => ((Math.random() * 36) | 0).toString(36))
      .join(``)
      .toUpperCase();
  }
}

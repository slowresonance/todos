class Model {
    constructor() {
        this.name = "simple-todos";
        this.todos = JSON.parse(localStorage.getItem(this.name));
    }
    bindTodoListChanged(callback) {
        this.onTodoListChanged = callback;
    }
    _commit(list) {
        this.onTodoListChanged(list);
        localStorage.setItem(this.name, JSON.stringify(this.todos));
    }
    parseTodo(input) {
        let hidden = input.startsWith("~");
        let text = hidden ? input.split("~")[1] : input;
        this.addTodo(text, hidden);
    }
    addTodo(text, hidden) {
        const todo = {
            id: this.randID(5),
            text: text,
            hidden: hidden,
            done: false,
        };
        this.todos.push(todo);
        this._commit(this.todos);
    }
    editTodo(id, updatedText) {
        this.todos = this.todos.map((todo) => todo.id === id
            ? {
                id: todo.id,
                text: updatedText,
                hidden: todo.hidden,
                done: todo.done,
            }
            : todo);
    }
    deleteTodo(id) {
        this.todos = this.todos.filter((todo) => todo.id !== id);
        this._commit(this.todos);
    }
    toggleTodo(id) {
        this.todos = this.todos.map((todo) => todo.id === id
            ? {
                id: todo.id,
                text: todo.text,
                hidden: todo.hidden,
                done: !todo.done,
            }
            : todo);
        this._commit(this.todos);
    }
    randID(length) {
        return [...Array(length)]
            .map((_) => ((Math.random() * 36) | 0).toString(36))
            .join(``)
            .toUpperCase();
    }
}

// Todo
var todo = {
  lastInsert : null,
  storage : new Lawnchair({name:'todo', record:'todos'}, function() {
    
  }),
  add : function (text) {
    todo.storage.save({todo:text}, function (obj) {
      todo.lastInsert = obj;
    });
    return todo.lastInsert;
  },
  render: function (obj) {
    var list = document.getElementById("list");
    var item = document.createElement('li');
    var text = document.createTextNode();
    text.data = obj.todo;
    item.appendChild(text);
    list.appendChild(item);
  },
  clear: function () {
    var list = document.getElementById("list");
    list.innerHTML = '';
  },
  renderAll: function () {
    todo.storage.all(function (objs) {
      _.each(objs, function(obj){
        todo.render(obj);
      });
    });
  }
};

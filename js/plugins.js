// Todo
var todo = {
  lastInsert : null,
  storage : new Lawnchair({name:'todo', record:'todos'}, function() {
    
  }),
  add: function (text) {
    todo.storage.save({todo:text}, function (obj) {
      todo.lastInsert = obj;
    });
    return todo.lastInsert;
  },
  remove: function (id) {
    todo.storage.remove(id);
  },
  
  render: function (obj) {
    var $list = $("#list");
    var $item = $('<li>');
    var $removeSpan = $("<span>");
    $removeSpan.addClass('icon-remove');
    $item.data('key', obj.key);
    $item.html(obj.todo);
    $item.append($removeSpan);
    $list.append($item);
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

var keys = {
  prepare: function () {
    console.log('blah');
    $(document).keypress(function(e) {
      if(e.shiftKey && e.keyCode === 63) {
        $('.help').toggle();
      }
    });
    $(window).on('onkeypress', function (event){
      console.log(event);
    })
  }
}
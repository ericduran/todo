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
    $(document).keypress(function(e) {
      // Lets show the help menu on shift + ?
      if(e.target.nodeName !== 'INPUT' && e.shiftKey && e.keyCode === 63) {
        $('.help').toggle();
      }
    });

    // Lets loose focus on ecs
    $('#text').on('keyup', function(e) {
      if (e.keyCode === 27) {
      }
    });
  }
}

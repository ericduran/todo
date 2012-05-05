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
    $('li').first().addClass('s');
    $(document).keypress(function(e) {
      if(e.target.nodeName !== 'INPUT') {
        // Lets show the help menu on shift + ?
        if (e.shiftKey && e.keyCode === 63) {
          $('.help').toggle();
        }
        // 106 = j & 107 = k
        if (e.keyCode === 106 || e.keyCode == 107) {
          if (e.keyCode == 106) {
            if ($('li.s').next()[0] && $('li.s').next()[0].tagName === 'LI')
              $('li.s').removeClass('s').next().addClass('s'); // Testing no brakets see how I like it.
          }
          else {
            if ($('li.s').prev()[0] && $('li.s').prev()[0].tagName === 'LI')
              $('li.s').removeClass('s').prev().addClass('s');
          }
        }
        // Delete on d
        if (e.keyCode === 100) {
          $item = $('li.s');
          $item.next().addClass('s');
          todo.remove($item.data('key'));
          $item.remove();
        }
        // Mark complete on c
        if (e.keyCode === 99) {
          $item = $('li.s');
          $item.next().addClass('s');
          $item.removeClass('s').addClass('c');
        }
      }
    });

    // Lets loose focus on ecs
    $('#text').on('keyup', function(e) {
      if (e.keyCode === 27) {
      }
    });
  }
}

var cache = {
  appCache: window.applicationCache,
  listeners: function() {
    cache.appCache.addEventListener('cached', cache.cached, false);
    cache.appCache.addEventListener('updateready', cache.updateready, false);
    cache.appCache.addEventListener('obsolete', cache.obsolete, false);
  },
  update: function () {
    cache.appCache.update();
  },
  cached: function(e) {
    // Display Message something like "This site has been cached, which means you can still visit it and add new items to your todo while your on the subway ;-)"
  },
  obsolete: function (e) {
  },
  updateready: function (e) {
  }
}

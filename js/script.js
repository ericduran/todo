
// Doc.Ready. Render our todos
todo.renderAll();
keys.prepare();
// Attach save
saveB = document.getElementById("action-submit");
textInput = document.getElementById('text')
saveB.addEventListener('click', function(event) {
  event.preventDefault();
  todo.add(textInput.value);
  todo.clear();
  todo.renderAll();
  // Only do this if todo.add() returns succesful.
  textInput.value = '';
});

$("#text").keyup(function(event){
    if(event.keyCode == 13){
      event.preventDefault();
      todo.add(textInput.value);
      todo.clear();
      todo.renderAll();
      // Only do this if todo.add() returns succesful.
      textInput.value = '';
    }
});

$('li').swipeRight(function(){
  // Remove the current li that was swipe
  todo.remove($(this).parent())
  $(this).remove();
});

$('#list').on('click', '.icon-remove', function (event) {
  var $item = $(this).parent();
  todo.remove($item.data('key'));
  // Only remove if todo.remove is TRUE.
  $item.remove();
});


// Doc.Ready. Render our todos
todo.renderAll();

// Attach save
form = document.getElementById("action");
textInput = document.getElementById('text')
form.addEventListener('submit', function(event) {
  event.preventDefault();
  todo.add(textInput.value);
  todo.clear();
  todo.renderAll();
  console.log('fired');
});
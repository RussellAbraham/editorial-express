$(document).ready(function() {
  let editor;

  // Function to handle saving the document
  const saveDocument = async () => {
    const updatedBody = editor.getData();

    // Extract noteId from the current URL
    const noteId = window.location.pathname.split('/').pop();

    // Send the updatedBody to the server for database update
    try {
      const response = await $.ajax({
        url: '/notes/updateNote',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          noteId: noteId, // replace with the actual note ID
          updatedBody: updatedBody,
        }),
      });
      console.log('Success:', response);
      flash('Saved note to the database', 'success', document.getElementById('flashMessage'));
      // Handle success, e.g., show a success message
    } catch (error) {
      console.error('Error:', error);
      // Handle error, e.g., show an error message
    }
  };

  // Initialize CKEditor
  ClassicEditor
    .create(document.querySelector('#editor'), {
      allowedContent: true,
    })
    .then(newEditor => {
      editor = newEditor;
      window.editor = newEditor;
      console.log(editor);

      // Attach click event listener to the save button
      $('#saveButton').on('click', saveDocument);
    })
    .catch(error => {
      console.error(error);
    });

  // Initialize jQuery Terminal
  $('#terminal').terminal(async function(command, term) {
    const commandArray = command.split(' ');
    const mainCommand = commandArray[0].toLowerCase();

    switch (mainCommand) {
      case 'sql':
        // Handle command to post to the server
        try {
          const response = await $.ajax({
            url: '/notes/command',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ command }),
          });
          term.echo(JSON.stringify(response, null, 2));
        } catch (error) {
          console.error('Error:', error);
        }
        break;

      case 'edit':
        // Handle command to interact with CKEditor
        const ckeditorCommand = commandArray.slice(1).join(' ');
        editor.setData(ckeditorCommand);
        term.echo('Editor content updated.');
        break;

      case 'source':
        term.echo(editor.getData());
        break;

      case 'clear':
        term.clear();
        break;

      default:
        term.echo('Invalid command. Supported commands: sql, edit');
        break;
    }
  }, {
    greetings: 'Welcome to Editor Terminal',
    name: 'editor_terminal',
    height: 400,
    prompt: '> '
  });
});

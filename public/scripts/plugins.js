// jQuery should fire second
$(document).ready(function() {

  let editor;

    ClassicEditor
      .create(document.querySelector('#editor'), {
        allowedContent: true, // This allows all HTML content
        // Add any additional configuration options here
      })
      .then(newEditor => {
        editor = newEditor;
        window.editor = newEditor;
        console.log(editor);

        $('#saveButton').on('click', () => {
          const updatedBody = editor.getData();

          // Extract noteId from the current URL
          const noteId = window.location.pathname.split('/').pop();

          // Send the updatedBody to the server for database update
          $.ajax({
            url: '/notes/updateNote',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
              noteId: noteId, // replace with the actual note ID
              updatedBody: updatedBody,
            }),
            success: function (data) {
              console.log('Success:', data);
              // Handle success, e.g., show a success message

            },
            error: function (error) {
              console.error('Error:', error);
              // Handle error, e.g., show an error message
            },
          });
        });
      })
      .catch(error => {
        console.error(error);
      });

});

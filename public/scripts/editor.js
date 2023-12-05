
$(document).ready(function() {

  let editor;

    ClassicEditor
      .create(document.querySelector('#editor'), {
        allowedContent: true,
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
              noteId: noteId,
              updatedBody: updatedBody,
            }),
            success: function (data) {
              console.log('Success:', data);
              flash('updated your note 😁', 'success', document.getElementById('flash'));
            },
            error: function (error) {
              console.error('Error:', error);
            },
          });
        });
      })
      .catch(error => {
        console.error(error);
      });

});

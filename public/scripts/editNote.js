$(document).ready(function () {
  //Click on X to delete Todo
  $(".text").on("dblclick", function (event) {
    $(this).attr('disabled', false);
    $(this).focus();
  });

  $(".text").on("keyup", function (event) {
    if (event.which === 13) {
      $(this).blur();
      $(this).attr('disabled', true);
      const noteId = $(this).attr('id');
      const isNotebook = $(this).hasClass("notebook-item");

      $.ajax({
        url: isNotebook ? '/notebook/updateNotebookTitle' : '/notes/updateNoteTitle',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          noteId: noteId,
          updatedTitle: $(this).val()
        }),
        success: function (data) {
          console.log('Success:', data);
          flash('updated title', 'success', document.getElementById('flash'));
          // Handle success, e.g., show a success message

        },
        error: function (error) {
          console.error('Error:', error);
          // Handle error, e.g., show an error message
        }
      })
      //console.log($(this).attr);
    }
  });

});

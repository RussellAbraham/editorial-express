$(document).ready(function () {

  $("#list-group1").on("click", "span", function (event) {
    const listId = $(this).parent()[0].id;
    const listItem = $(this).parent();

    $(this).parent().fadeOut(500, function () {
      $(this).remove();
    });

    const isNotebook = listItem.hasClass("notebook-item");

    // Send the updatedBody to the server for database update
    $.ajax({
      url: isNotebook ? `/notebook/delete/${listId}` : `/notes/delete/${listId}`,
      method: 'POST',
      contentType: 'application/json',
      success: function (data) {
        console.log('Success:', data);
        flash('Deleted your item 😤', 'danger', document.getElementById('flash'));
      },
      error: function (error) {
        console.error('Error:', error);
      },
    });

    event.stopPropagation();
  });

});

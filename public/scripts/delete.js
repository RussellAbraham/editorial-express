$(document).ready(function () {
  //Click on X to delete Todo
  $("#list-group1").on("click", "span", function (event) {
    console.log($(this).parent())
    const listId = $(this).parent()[0].id
    console.log(listId)


    $(this).parent().fadeOut(500,function(){
    	$(this).remove();
    });

    // Send the updatedBody to the server for database update
    $.ajax({
      url: `/notes/delete/${listId}`,
      method: 'POST',
      contentType: 'application/json',
      success: function (data) {
        console.log('Success:', data);
        // Handle success, e.g., show a success message

      },
      error: function (error) {
        console.error('Error:', error);
        // Handle error, e.g., show an error message
      },
    });


    event.stopPropagation();
  });

});




// function deleteItem(itemId) {


//   // Confirm the deletion with the user (optional)
//   if (!confirm('Are you sure you want to delete this item?')) {
//     return;
//   }

//   fetch(`/notes/delete/${itemId}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       // Add any additional headers you need, such as authentication headers
//     },
//   })
//     .then(response => {
//       if (response.ok) {
//         // Successfully deleted the item
//         console.log(`Item with ID ${itemId} deleted successfully`);

//         // Fetch the updated list from the server and refresh the container
//         // fetchUpdatedList();

//         // location.reload();

//         // Optionally, you can also remove the corresponding list item from the DOM
//         var listItem = document.getElementById(itemId);
//         if (listItem) {
//           listItem.remove();
//         } else {
//           console.log(`Item with ID ${itemId} not found in the DOM`);
//         }
//       } else {
//         // Handle the case where the deletion was not successful
//         console.error(`Failed to delete item with ID ${itemId}`);
//       }
//     })
//     .catch(error => {
//       // Handle errors that occur during the fetch
//       console.error('An error occurred during the deletion:', error);
//     });

//   function fetchUpdatedList() {
//     fetch('/notes')
//       .then(response => response.text())
//       .then(html => {
//         console.log('Fetched HTML:', html);  // Log the fetched HTML for debugging
//         document.getElementById('container').innerHTML = html;
//       })
//       .catch(error => {
//         console.error('An error occurred while fetching the updated list:', error);
//       });
//   }
// }

// $(document).ready(function () {
//   // Your other code (if any) inside the document ready function
// });

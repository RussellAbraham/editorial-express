const searchFunction  = () => {
  searchMessage.innerHTML = ''
  let input = document.getElementById("searchInput");
  let filter = input.value.toLowerCase();
  let ul = document.getElementById("searchList");
  let li = ul.getElementsByTagName("li");
  let currentCount = 0;

  for (let i = 0; i < li.length; i++) {
    let a = li[i].getElementsByTagName("a")[0];

    if (a.innerHTML.toLowerCase().indexOf(filter) > -1) {
      li[i].style.display = "";
      currentCount--;
    } else {
      li[i].style.display = "none";
      currentCount++;
    }
    console.log(currentCount)
  }
  if (currentCount === li.length) {
    searchMessage.innerHTML = [
      `<div class="alert alert-danger alert-dismissible" role="alert">`,
      `   <div class="d-flex justify-content-center">Nothing here...</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('');
  }
};

// function levenshteinDistance(a, b) {
//   const matrix = [];

//   // If one string is empty, the distance is the length of the other string
//   if (a.length === 0) return b.length;
//   if (b.length === 0) return a.length;

//   // Initialize the first row and column of the matrix
//   for (let i = 0; i <= b.length; i++) {
//     matrix[i] = [i];
//   }
//   for (let j = 0; j <= a.length; j++) {
//     matrix[0][j] = j;
//   }

//   console.log(matrix)
//   // Fill in the rest of the matrix
//   for (let i = 1; i <= b.length; i++) {
//     for (let j = 1; j <= a.length; j++) {
//       if (b.charAt(i - 1) === a.charAt(j - 1)) {
//         matrix[i][j] = matrix[i - 1][j - 1];
//       } else {
//         matrix[i][j] = Math.min(matrix[i - 1][j - 1], // Substitution
//                                 matrix[i][j - 1],     // Insertion
//                                 matrix[i - 1][j])    // Deletion
//                                 + 1;
//       }
//     }
//   }

//   return matrix[b.length][a.length];
// }

// function fuzzySearch() {
//   let input = document.getElementById("searchInput");
//   let filter = input.value.toLowerCase();
//   let ul = document.getElementById("searchList");
//   let li = ul.getElementsByTagName("li");
//   const threshold = 58; // Adjust as needed



//   for (let i = 0; i < li.length; i++) {
//     let a = li[i].getElementsByTagName("a")[0];
//     let text = a.innerHTML.toLowerCase();
//     // console.log(text, filter, distance)
//     // Skip further calculation if the length difference is greater than the threshold
//     if (Math.abs(filter.length - text.length) > threshold) {
//         li[i].style.display = "none";
//         continue;
//     }

//     // Calculate the Levenshtein distance
//     let distance = levenshteinDistance(filter, text);
//     console.log(filter, text, distance)
//     if (distance <= threshold) {
//       li[i].style.display = "";
//     } else {
//       li[i].style.display = "none";
//     }
//   }
// }


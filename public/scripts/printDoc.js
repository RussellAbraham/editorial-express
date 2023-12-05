// Function to open a print window with the editor content
// the `editor` global variable should exist
const printDoc = () => {
  const printWindow = window.open("about:blank", "printWindow", "width=900,height=600");
  printWindow.document.open();
  printWindow.document.write(`<!doctype html><html><head><title>Print</title></head><body onload="print();">${editor.getData()}</body></html>`);

  // Include editor styles
  const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
  stylesheets.forEach((stylesheet) => {
    printWindow.document.head.appendChild(stylesheet.cloneNode(true));
  });

  printWindow.document.close();
};

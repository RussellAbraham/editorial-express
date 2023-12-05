$(document).ready(function () {

  // Initialize jQuery Terminal
  $('#terminal').terminal(async function (command, term) {
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
          term.echo(error);
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
    greetings: 'Welcome to the Editor Terminal',
    name: 'editor_terminal',
    height: 400,
    prompt: '> '
  });

});

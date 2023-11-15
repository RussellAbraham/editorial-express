// jQuery
$(document).ready(function() {
  console.log( "ready!" );
});

// should fire first
document.addEventListener('DOMContentLoaded', function(event){
  try {
    if(event.isTrusted){
      console.info('document event is trusted');
    } else {
      throw new Error('document event is not trusted');
    }
  } catch (er){
    console.error(er.message);
  } finally {
    console.log('document has loaded');
  }
}, false);

// should fire last
window.addEventListener('load', function(event){
  try {
    if(event.isTrusted){
      console.info('window event is trusted');
    } else {
      console.warn('window event is not trusted');
    }
  }
  catch (er){
    console.error(er.stack);
  }
  finally {
    console.log('window has loaded');
  }
}, false);

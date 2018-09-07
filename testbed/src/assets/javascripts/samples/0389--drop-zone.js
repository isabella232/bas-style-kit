jQuery(function($){
  // [General] Disable auto discover for all elements:
  Dropzone.autoDiscover = false;

  // Dropzone 1
  // ----------

  // [Dropzone 1] Prepare the file list
  var previewsTemplate1 = $('#dropzone-1 .bsk-dropzone-file-list .bsk-dropzone-file-list-items').html();
  $('#dropzone-1 .bsk-dropzone-file-list .bsk-dropzone-file-list-items').empty();

  // [Dropzone 1] Enable dropzone on specific element
  var dropzone1 = new Dropzone('#dropzone-1', {
    url: 'https://bas-style-kit-file-upload.herokuapp.com/upload-single',
    previewsContainer: '#dropzone-1 .bsk-dropzone-file-list-items',
    previewTemplate: previewsTemplate1,
    createImageThumbnails: false,
    clickable: "#dropzone-1 .bsk-message-inner"
  });

  // [Dropzone 1] Add event listeners to add Style Kit specific classes
  dropzone1.on("addedfile", function(file) {
    $('#' + dropzone1.element.id).addClass('bsk-dropzone-started');
  });
  dropzone1.on("reset", function(file) {
    $('#' + dropzone1.element.id).removeClass('bsk-dropzone-started');
  });

  // [Dropzone 1] Add event listeners to update file status for each file item
  dropzone1.on("processing", function(file) {
    $(file.previewElement).find('[data-bsk-dz-status]').text('Pending...');
  });
  dropzone1.on("uploadprogress", function(file, progress) {
    $(file.previewElement).find('[data-bsk-dz-status]').text('Uploading (' + Math.round(progress) + '%)');
  });
  dropzone1.on("success", function(file, message) {
    $(file.previewElement).find('[data-bsk-dz-status]').addClass('bsk-text-success').text('Uploaded');
  });
  dropzone1.on("error", function(file, message, xhr) {
    $('#' + dropzone1.element.id).addClass('bsk-dropzone-errors');
    $(file.previewElement).find('[data-bsk-dz-status]').addClass('bsk-text-danger').text('Upload Error');
    $(file.previewElement).find('[data-dz-name]').addClass('bsk-text-danger');

    var errorMessage = '[' + xhr.status + '] ' + xhr.statusText;

    errorMessage = '<li data-bsk-dz-file-id="' + base64Encode(file.name) + '"><strong>' + file.name + '</strong> - ' + errorMessage + '</li>';
    $('#' + dropzone1.element.id).find('.bsk-dropzone-errors-container ul').append(errorMessage);
  });
  dropzone1.on("removedfile", function(file) {
    $('#' + dropzone1.element.id).find('.bsk-dropzone-errors-container ul li[data-bsk-dz-file-id="' + base64Encode(file.name) + '"]').remove();

    // Check if errors container is now empty
    if ($('#' + dropzone1.element.id).find('.bsk-dropzone-errors-container ul li').length < 1) {
      $('#' + dropzone1.element.id).removeClass('bsk-dropzone-errors');
    }
  });

  // Dropzone 2
  // ----------

  // [Dropzone 2] Prepare the file list
  var previewsTemplate2 = $('#dropzone-2 .bsk-dropzone-file-list .bsk-dropzone-file-list-items').html();
  $('#dropzone-2 .bsk-dropzone-file-list .bsk-dropzone-file-list-items').empty();

  // [Dropzone 2] Enable dropzone on specific element
  var dropzone2 = new Dropzone('#dropzone-2', {
    url: 'https://bas-style-kit-file-upload.herokuapp.com/upload-single-restricted-size',
    previewsContainer: '#dropzone-2 .bsk-dropzone-file-list-items',
    previewTemplate: previewsTemplate2,
    createImageThumbnails: false,
    clickable: "#dropzone-2 .bsk-message-inner"
  });

  // [Dropzone 2] Add event listeners to add Style Kit specific classes
  dropzone2.on("addedfile", function(file) {
    $('#' + dropzone2.element.id).addClass('bsk-dropzone-started');
  });
  dropzone2.on("reset", function(file) {
    $('#' + dropzone2.element.id).removeClass('bsk-dropzone-started');
  });

  // [Dropzone 2] Add event listeners to update file status for each file item
  dropzone2.on("processing", function(file) {
    $(file.previewElement).find('[data-bsk-dz-status]').text('Pending...');
  });
  dropzone2.on("uploadprogress", function(file, progress) {
    $(file.previewElement).find('[data-bsk-dz-status]').text('Uploading (' + Math.round(progress) + '%)');
  });
  dropzone2.on("success", function(file, message) {
    $(file.previewElement).find('[data-bsk-dz-status]').addClass('bsk-text-success').text('Uploaded');
  });
  dropzone2.on("error", function(file, message, xhr) {
    $('#' + dropzone2.element.id).addClass('bsk-dropzone-errors');
    $(file.previewElement).find('[data-bsk-dz-status]').addClass('bsk-text-danger').text('Upload Error');
    $(file.previewElement).find('[data-dz-name]').addClass('bsk-text-danger');

    var errorMessage = '[' + xhr.status + '] ' + xhr.statusText;

    // Detect specific errors
    if (xhr.statusText == 'REQUEST ENTITY TOO LARGE') {
      if (message.hasOwnProperty('errors')) {
        requestEntityTooLargeError = message.errors.find(function(error) {
          return error.title === 'Request content length is too great'
        })
        if (requestEntityTooLargeError !== 'undefined') {
          var maxSize = humanFileSize(requestEntityTooLargeError.meta.maximum_content_length_allowed);
          var fileSize = humanFileSize(requestEntityTooLargeError.meta.request_content_length);
          errorMessage = 'File is too large, maximum allowed is <em>' + maxSize + '</em>, the file uploaded was <em>' + fileSize + '</em>';
        }
      }
    }

    errorMessage = '<li data-bsk-dz-file-id="' + base64Encode(file.name) + '"><strong>' + file.name + '</strong> - ' + errorMessage + '</li>';
    $('#' + dropzone2.element.id).find('.bsk-dropzone-errors-container ul').append(errorMessage);
  });
  dropzone2.on("removedfile", function(file) {
    $('#' + dropzone2.element.id).find('.bsk-dropzone-errors-container ul li[data-bsk-dz-file-id="' + base64Encode(file.name) + '"]').remove();

    // Check if errors container is now empty
    if ($('#' + dropzone2.element.id).find('.bsk-dropzone-errors-container ul li').length < 1) {
      $('#' + dropzone2.element.id).removeClass('bsk-dropzone-errors');
    }
  });

  function humanFileSize(size) {
    var i = size == 0 ? 0 : Math.floor( Math.log(size) / Math.log(1024) );
    return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
  };

  function base64Encode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode(parseInt(p1, 16));
    }))
  };
});

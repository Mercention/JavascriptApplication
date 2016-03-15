/*
	Author: Salimur Mamum Rahman
	Notes: Thank much SoftUni for teach me quality code!
*/

// Change later to a more concrete selector
var selector = document.body;

// Trigger file selection window
$(selector).on('click', '#upload-file-button', function() {
	$('#picture').click();
});

// Reads the selected file and returns the data as a base64 encoded string
$(selector).on('change', '#picture', function() {
	var file = this.files[0],
		reader;
	
	if (file.type.match(/image\/.*/)) {
		reader = new FileReader();
		reader.onload = function (e) {
			// TODO: set file name to picture name paragraph
		    $('.picture-name').html(file.name);

			// TODO: set read image data for image preview
		    $('.picture-preview').attr('src', e.target.result);
		};
		reader.readAsDataURL(file);
	} else {
		// TODO: Display type-mismatch error message
	}
});
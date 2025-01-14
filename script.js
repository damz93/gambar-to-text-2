document.getElementById('ocrForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const imageInput = document.getElementById('image');
    const outputTextarea = document.getElementById('output');
    const loadingIndicator = document.getElementById('loading');

    if (imageInput.files.length === 0) {
        alert('Please upload an image file.');
        return;
    }

    const imageFile = imageInput.files[0];
    const reader = new FileReader();

    reader.onload = function () {
        loadingIndicator.classList.remove('hidden');
        outputTextarea.value = '';

        Tesseract.recognize(reader.result, 'eng', {
            logger: (info) => console.log(info), // Optional: log progress
        })
            .then(({ data: { text } }) => {
                loadingIndicator.classList.add('hidden');
                outputTextarea.value = text;
            })
            .catch((error) => {
                loadingIndicator.classList.add('hidden');
                outputTextarea.value = 'Error: ' + error.message;
            });
    };

    reader.readAsDataURL(imageFile);
});

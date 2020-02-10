const startDownload = (filename, content, type) => {
    doDownload(filename, content, type);
};

function doDownload(filename, content, type) {
    //Create Blob
    const blob = new Blob(content, { type: type });

    // Create download URL for blob
    const url = window.URL.createObjectURL(blob);

    //generate anchor for blob-url
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;

    anchor.click();

    // cleanup
    anchor.remove();
    document.addEventListener('focus', () => {
        window.URL.revokeObjectURL(blob);
    });
}

export { startDownload };

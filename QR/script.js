
const video = document.getElementById('qr-video');
const message = document.getElementById('message');

// Function to handle successful QR code scan
function onScanSuccess(decodedText) {
    message.textContent = `QR Code scanned: ${decodedText}`;

    // Replace with your actual video source based on the scanned data (decodedText)
    const videoSource = `sbi-dream${decodedText}.mp4`; // Modify this line
    video.src = videoSource;
    video.play();
}

// Function to handle camera access permission
function onScanError(err) {
    message.textContent = `Error accessing camera: ${err}`;
}

// Initialize QR code scanner with callback functions
Html5QrcodeScanner
    .getCameras()
    .then(devices => {
        if (devices && devices.length) {
            const options = { fps: 10, deviceId: devices[0].id }; // Adjust options as needed
            Html5QrcodeScanner.render(video, options, onScanSuccess, onScanError);
        } else {
            message.textContent = 'No cameras found.';
        }
    })
    .catch(err => {
        message.textContent = `Error: ${err}`;
    });
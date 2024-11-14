// Wait for the page to load
window.addEventListener('load', async () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    // Load the face detection model
    await faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js/models');

    // Start video stream
    navigator.mediaDevices.getUserMedia({ video: {} })
        .then(stream => {
            video.srcObject = stream;
        });

    // Detect faces and draw the effect
    video.addEventListener('play', () => {
        const displaySize = { width: video.width, height: video.height };
        faceapi.matchDimensions(canvas, displaySize);

        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
            const resizedDetections = faceapi.resizeResults(detections, displaySize);

            context.clearRect(0, 0, canvas.width, canvas.height);

            resizedDetections.forEach(detection => {
                const { x, y, width, height } = detection.box;
                // Draw orange stroke
                context.lineWidth = 10;
                context.strokeStyle = '#ffa500';
                context.strokeRect(x, y, width, height);
                // Draw white stroke
                context.lineWidth = 20;
                context.strokeStyle = '#ffffff';
                context.strokeRect(x - 10, y - 10, width + 20, height + 20);
            });
        }, 100);
    });
});

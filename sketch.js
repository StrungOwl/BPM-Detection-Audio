let mic, fft;
let bassEnergy;
let lastBeatTime = 0;
let bpm = 120; // Set the BPM of the song (can be detected dynamically)
let beatInterval = (60 / bpm) * 1000; // Calculate time between beats in milliseconds
let audioOn = false;

let freqThreshold = 150; // Set the threshold for bass energy 0 is high 200 is low

function setup() {
    createCanvas(windowWidth, windowHeight);
    getAudioContext().suspend();
    fft = new p5.FFT();
    mic = new p5.AudioIn();
    mic.start();
    fft.setInput(mic);
}

function draw() {
    background(220);

    if (audioOn) {
        fft.analyze();
        bassEnergy = fft.getEnergy("bass"); // Low frequency energy

        console.log("Bass Energy: ", bassEnergy); // Log bass energy for debugging

        // Check for a beat (if bass energy exceeds a threshold)
        if (bassEnergy > freqThreshold && millis() - lastBeatTime > beatInterval * 0.8) {
            lastBeatTime = millis();
            console.log("Beat detected!");
        }

        // Example: Move a circle to the beat
        let timeSinceLastBeat = millis() - lastBeatTime;
        let speedC = map(timeSinceLastBeat, 0, beatInterval, 0, width);
        ellipse(speedC, height / 2, height * 0.5, height * 0.5); // Move the circle with the beat
    }
}

function mousePressed() {
    audioOn = true;
    getAudioContext().resume();
    console.log("Audio context resumed and microphone started");
}
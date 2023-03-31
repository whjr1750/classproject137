objects = [];
video = "";
status = "";

function preload() {
    video = createVideo('video.mp4');
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded); //put capital D in objectDetector
    document.getElementById("status").innerHTML = "Status: Detecting objects";
}

function modelLoaded() {
    console.log("model loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResult(error, results) {
    if (error) {
        console.log(error)
    }
    console.log(results);
    objects = results;
}
function draw() {
    image(video, 0, 0, 480, 380);

    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status- Object detected";
            document.getElementById("no_of_objs").innerHTML = "Number of objects detected are- " + objects.length;
            fill("green");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();  // put capital F for fill
            stroke("green");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}




function preload() {
    classifier = ml5.imageClassifier("DoodleNet")
}

function setup() {
    canvas = createCanvas(280, 280)
    canvas.center()
    canvas.mouseReleased(classifyCanvas)
    synth = window.speechSynthesis;
}

function draw() {
    strokeWeight(10)
    stroke(0)
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY)
    }
}

function clearCanvas(){
    background("white")
}

function classifyCanvas(){
    classifier.classify(canvas, gotResult)
}

function gotResult(error, result){
    console.log(result)
    var results = result[0].label
    document.getElementById("label").innerHTML = "Nome: "+ results
    document.getElementById("confidence").innerHTML ="Precisão: "+ Math.round(result[0].confidence * 100)+"%"
    utterThis = new SpeechSynthesisUtterance(results.replace('_', ' '));
    synth.speak(utterThis)
}
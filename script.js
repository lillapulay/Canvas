const canvas = document.querySelector('#draw');

// HTML canvas, unlike Paint, lets us draw on context (2D or 3D), instead of directly on the canvas element
const ctx = canvas.getContext('2d');

// Be the width of the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Base settings
ctx.strokeStyle = '#BADA55'; // Drawing requires a color to start with
ctx.lineJoin = 'round'; // Shape of lines meeting
ctx.lineCap = 'round'; // Shape of the line
ctx.lineWidth = 20; // Line
ctx.globalCompositeOperation = 'multiply'; // Layers overlapping blen into each other

// Dummy variables
let isDrawing = false; // So it only draws when the mouse btn is held down (true)
let lastX = 0;
let lastY = 0;
let hue = 0; // Starting value - will get updated by the draw function - https://mothereffinghsl.com/
let direction = true;

// Will be called upon moving the mouse over the canvas
function draw(e) {
  if (!isDrawing) return; // Won't run if the mouse btn is not down
  console.log(e); // To log the coordinates where we move the mouse

  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;  // Hue, lightness, saturation
  // ctx.lineWidth = hue; // Copies the value of hue, so the line gets thicker then resets
  ctx.beginPath();
  ctx.moveTo(lastX, lastY); // Drawing starts here
  ctx.lineTo(e.offsetX, e.offsetY); // Drawing goes until this pointOffset values come from the event/element
  ctx.stroke();
  // After using this function we want to update the lastX and lastY vars
  /*  lastX = e.offsetX;
   lastY = e.offsetY; */
  // Or set it with destructuring an array
  [lastX, lastY] = [e.offsetX, e.offsetY];
  hue++; // For changing the colors while we draw - even if we go above 360 hue keeps repeating this without a problem

  // Or we can reset hue at 360
  if (hue >= 360) {
    hue = 0;
  }
  // Keeps alternating the lineWidth
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction; // Flips the direction
  }
  if (direction) {
    ctx.lineWidth++; // BY ITSELF this line would increment the lineWidth infinitely
  } else {
    ctx.lineWidth--;
  }
}

// Listeners: so it only draws when the mouse btn is down
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false); // If mouse leaves the area, stops drawing even if it returns later witth the btn still down

// Updates X and Y before starting to draw - no line from the start 
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});


// This alone would add a straight line from the start every time we press the mouse btn
//canvas.addEventListener('mousedown', () => isDrawing = true);
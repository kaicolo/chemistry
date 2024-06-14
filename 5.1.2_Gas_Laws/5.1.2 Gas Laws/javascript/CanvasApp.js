// canvas.js - Encapsulates common canvas functions

function CanvasApp(id) {
  if (!id) return;
  this.el = document.getElementById(id);
  this.ctx = this.el.getContext('2d');
  this.corner = new Image();
  this.corner.src = 'img/corner.png';
  this.radius = 0;
  this.corner_colour = '#ffffff';
  this.background_colour = '#ffffff';
  this.frame = 0;
  this.fps = 0;
  this.showfps = true;
  this.draw_req = true;
  this.sleep = false;
  this.lastupdate = 0;
  
  // Attach an FPS div to the page
  this.fps_el = document.createElement('div');
  this.fps_el.setAttribute('id', 'fps');
  document.body.appendChild(this.fps_el);
  
  // Initialise canvas resize dependents
  //this.resize(this.el.width, this.el.height);
};

// Requests draw() be called on the next interval 
CanvasApp.prototype.redraw = function() {
  this.draw_req = true;
};

// Starts the update() loop
CanvasApp.prototype.start = function() {
  this.lastupdate = new Date().getTime();
  var instant = this;
  window.setInterval(function() { instant.onupdate(); }, 100);
  window.setInterval(function() { instant.onfpsupdate(); }, 1000);
};

// Interval callback to update FPS info
CanvasApp.prototype.onfpsupdate = function() {
  if (!this.showfps) return;
  this.fps = this.frame;
  this.frame = 0;
  this.fps_el.innerHTML = this.fps;
};

// Interval callback for logic update
CanvasApp.prototype.onupdate = function() {
  var now = new Date().getTime();
  var dt = now - this.lastupdate;
  this.lastupdate = now;
  this.update(this, dt);
};

// Update logic
CanvasApp.prototype.update = function(canvas) {
  if (this.showfps) this.frame++;
  if (this.draw_req) {
    this.draw_req = false;
    this.ctx.fillStyle = this.background_colour;
    this.ctx.clearRect(0, 0, this.getWidth(), this.getHeight());
    this.ctx.fillRect(0, 0, this.getWidth(), this.getHeight());
    this.draw(this.ctx);
  }
};

// Called when a redraw() has been issued
CanvasApp.prototype.draw = function(ctx) {
  if (this.radius > 0) {
    ctx.lineWidth = this.radius / 2;
    ctx.strokeStyle = this.corner_colour;
    ctx.beginPath();
    ctx.arc(this.radius * 0.75, this.radius * 0.75, this.radius, Math.PI, Math.PI * 1.5, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(this.el.width - this.radius * 0.75, this.radius * 0.75, this.radius, Math.PI * 1.5, 0, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(this.el.width - this.radius * 0.75, this.el.height - this.radius * 0.75, this.radius, 0, Math.PI * 0.5, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(this.radius * 0.75, this.el.height - this.radius * 0.75, this.radius, Math.PI * 0.5, Math.PI, false);
    ctx.stroke();
  }
};

// Returns the width of the canvas
CanvasApp.prototype.getWidth = function() {
  return this.el.width;
};

// Returns the height of the canvas
CanvasApp.prototype.getHeight = function() {
  return this.el.height;
};

// Sets background fill colour
CanvasApp.prototype.background = function(colour) {
  this.background_colour = colour;
};

// Sets round corners
CanvasApp.prototype.corners = function(radius, colour) {
  this.radius = radius;
  this.corner_colour = colour;
};

// Resize the canvas
CanvasApp.prototype.resize = function(width, height) {
   this.el.width = width;
   this.el.height = height;
   this.fps_el.style.left = this.el.offsetLeft + this.el.width - 23 + 'px';
   this.fps_el.style.top = this.el.offsetTop + 3 + 'px';
};// JavaScript Document
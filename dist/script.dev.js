"use strict";

var mouse = {
  x: undefined,
  y: undefined,
  hold: false,
  currentElement: undefined
};

document.onpointermove = function (_ref) {
  var clientX = _ref.clientX,
      clientY = _ref.clientY,
      target = _ref.target;
  mouse.x = clientX;
  mouse.y = clientY;

  if (mouse.currentElement && mouse.hold) {
    mouse.currentElement.animate({
      left: "".concat(clientX, "px"),
      top: "".concat(clientY, "px")
    }, {
      duration: 1000,
      fill: 'forwards'
    });
  }
};

document.onmousedown = function (_ref2) {
  var clientX = _ref2.clientX,
      clientY = _ref2.clientY,
      target = _ref2.target;
  mouse.x = clientX;
  mouse.y = clientY;
  mouse.hold = true;

  if (target.classList.contains('tree__move')) {
    var mainTree = document.getElementById('main-tree');
    var container = document.getElementById('drag-zone');
    mouse.currentElement = target.closest('.tree__item');
    container.appendChild(mouse.currentElement);
    mouse.currentElement.style.position = 'absolute';
    mouse.currentElement.style.top = "".concat(mouse.y, "px");
    mouse.currentElement.style.left = "".concat(mouse.x, "px");
  }
};

document.onmouseup = function (_ref3) {
  var target = _ref3.target;
  mouse.currentElement = undefined;
  mouse.hold = false;

  if (target.classList.contains('tree__item')) {
    var mainTree = document.getElementById('main-tree');
    var container = document.getElementById('drag-zone');
    var newTree = target.closest('.tree__item').cloneNode(true);
    mainTree.appendChild(newTree);
    container.removeChild(mouse.currentElement);
  }
};
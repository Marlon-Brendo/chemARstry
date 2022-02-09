/* global AFRAME, THREE */
AFRAME.registerComponent('model-viewer', {
  schema: {
    Model: { default: "" },
    title: { default: "" },
    uploadUIEnabled: { default: true }
  },

  init: function() {    
    this.initUploadInput();

    this.onMouseUp = this.onMouseUp.bind(this);
    // this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseWheel = this.onMouseWheel.bind(this);
    
    document.getElementById('test').addEventListener('input', this.onSliderChange(document.getElementById('test').value))

    // Mouse 2D controls.
    document.addEventListener("mouseup", this.onMouseUp);
    // document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mousedown", this.onMouseDown);
    document.addEventListener("wheel", this.onMouseWheel);
    

    var el = document.querySelector("#octo");
    var elCamera = document.querySelector("[camera]");
    var pos = el.getAttribute("position");

    //elCamera.setAttribute("position", "0 0 5");
    elCamera.object3D.position.set(0, 0, 5);
    elCamera.setAttribute('look-controls', 'mouseEnabled: false');
    elCamera.setAttribute('wasd-controls', 'enabled: false');
    //debugger;
    //var newpos = pos[1] + 1;
    //el.setAttribute("rotation", { x: 0, y: 0, z: 0 });
    //debugger;
  },

  onMouseUp: function(evt) {
    this.leftRightButtonPressed = false;
    if (evt.buttons === undefined || evt.buttons !== 0) {
      return;
    }
    this.oldClientX = undefined;
    this.oldClientY = undefined;
  },

  onSliderChange: function(evt) {    
    var bol = document.getElementById('bol');
    bol.object3D.position.y = evt*0.2;
    // var bolPos  = bol.getAttribute('position')
    //bol.setAttribute('position', '0 ' + evt*0.1 + ' 0')
    debugger
  },
  
  update: function(){
    
  },

  onMouseDown: function(evt) {
    if (evt.buttons = 1) {      
      this.leftRightButtonPressed = true;
      //debugger;
    }
    this.oldClientX = evt.clientX;
    this.oldClientY = evt.clientY;   
  },
  
  onMouseMove: function(evt) {   
    //var model = this.el;
    //model.object3D.rotation.y += 0.1;
    if (this.leftRightButtonPressed) {
        //debugger;   
        var dX;
        var dY;
        var modelPivotEl = this.el;
        if (!this.oldClientX) { return; }
        dX = this.oldClientX - evt.clientX;
        dY = this.oldClientY - evt.clientY;
      //set global rotation
        modelPivotEl.object3D.rotation.y -= dX/100;
        modelPivotEl.object3D.rotation.x -= dY/100;
      
        modelPivotEl.object3D.rotation.x = Math.min(Math.max(-Math.PI, modelPivotEl.object3D.rotation.x), Math.PI);
      
        this.oldClientX = evt.clientX;
        this.oldClientY = evt.clientY;
     }
  },
  onMouseWheel: function(evt) {
    var elCamera = document.querySelector("[camera]");
    //var position = elCamera.object3D.position.z;
    //debugger;    
    //elCamera.object3D.position.multiplyScalar(evt.deltaY/1000);
    
    elCamera.object3D.position.z -= evt.deltaY*0.01;
    
    //var modelScale = this.modelScale || modelPivotEl.object3D.scale.x;
    //modelScale -= evt.deltaY / 100;
    //modelScale = Math.min(Math.max(0.8, modelScale), 2.0);
    // Clamp scale.
    //modelPivotEl.object3D.scale.set(modelScale, modelScale, modelScale);
    //this.modelScale = modelScale;
  },

  
  initUploadInput: function () {
    var uploadContainerEl = this.uploadContainerEl = document.createElement('div');
    var inputEl = this.inputEl = document.createElement('input');
    var submitButtonEl = this.submitButtonEl = document.createElement('button');
    var style = document.createElement('style');
    var css =
      '.a-upload-model  {box-sizing: border-box; display: inline-block; height: 34px; padding: 0; width: 70%;' +
      'bottom: 20px; left: 15%; right: 15%; position: absolute; color: white;' +
      'font-size: 12px; line-height: 12px; border: none;' +
      'border-radius: 5px}' +
      '.a-upload-model.hidden {display: none}' +
      '.a-upload-model-button {cursor: pointer; padding: 0px 2px 0 2px; font-weight: bold; color: #666; border: 3px solid #666; box-sizing: border-box; vertical-align: middle; width: 25%; max-width: 110px; border-radius: 10px; height: 34px; background-color: white; margin: 0;}' +
      '.a-upload-model-button:hover {border-color: #ef2d5e; color: #ef2d5e}' +
      '.a-upload-model-input {color: #666; vertical-align: middle; padding: 0px 10px 0 10px; text-transform: uppercase; border: 0; width: 75%; height: 100%; border-radius: 10px; margin-right: 10px}' +
      '@media only screen and (max-width: 800px) {' +
      '.a-upload-model {margin: auto;}' +
      '.a-upload-model-input {width: 70%;}}' +
      '@media only screen and (max-width: 700px) {' +
      '.a-upload-model {display: none}}';
    var inputDefaultValue = this.inputDefaultValue = 'Copy URL to glTF or glb model';

    if (AFRAME.utils.device.checkARSupport()) {
      css += '@media only screen and (max-width: 800px) {' +
      '.a-upload-model-input {width: 60%;}}';
    }

    uploadContainerEl.classList.add('a-upload-model');
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    document.getElementsByTagName('head')[0].appendChild(style);

    submitButtonEl.classList.add('a-upload-model-button');
    submitButtonEl.innerHTML = 'OPEN MODEL';
    submitButtonEl.addEventListener('click', this.submitURLButtonClicked);

    inputEl.classList.add('a-upload-model-input');
    inputEl.onfocus = function () {
      if (this.value !== inputDefaultValue) { return; }
      this.value = '';
    };
    inputEl.onblur = function () {
      if (this.value) { return; }
      this.value = inputDefaultValue;
    };

    this.el.sceneEl.addEventListener('infomessageopened', function () {
      uploadContainerEl.classList.add('hidden');
    });
    this.el.sceneEl.addEventListener('infomessageclosed', function () {
      uploadContainerEl.classList.remove('hidden');
    });

    inputEl.value = inputDefaultValue;

    uploadContainerEl.appendChild(inputEl);
    uploadContainerEl.appendChild(submitButtonEl);

    var parent = this.el.parentElement;
    parent.parentElement.appendChild(uploadContainerEl);
    // this.el.sceneEl.appendChild(uploadContainerEl);
  }
  
});

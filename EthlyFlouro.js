/* global AFRAME, THREE */
AFRAME.registerComponent('jato', {
    schema: {
      Model: { default: "" },
      uploadUIEnabled: { default: true }
    },

    init: function() {
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseWheel = this.onMouseWheel.bind(this);

        document.addEventListener("mouseup", this.onMouseUp);
        document.addEventListener("mousemove", this.onMouseMove);
        document.addEventListener("mousedown", this.onMouseDown);
        document.addEventListener("wheel", this.onMouseWheel);


      //TEST PRETEND JSON VARS
        var Atoms = [
            [-1.4635,   -0.4641,    1.3092, 'F'],
            [-0.0365,    0.2233,   -0.4645, 'C'],
            [ 1.3198,   -0.5098,   -0.2125, 'C'],
            [-1.2645,   -0.6131,   -0.0299, 'C'],
            [-0.0847,    1.6362,    0.1708, 'C'],
            [ 1.6168,   -0.8004,    1.2605, 'C'],
            [ 1.4381,   -1.8059,   -1.0246, 'C'],
            [-2.5598,   -0.2344,   -0.7332, 'C'],
            [ 1.0342,    2.5683,   -0.2757, 'C'],
            [-0.1050,    0.3581,   -1.5536, 'H'],
            [ 2.1226,    0.1396,   -0.5829, 'H'],
            [-1.1003,   -1.6782,   -0.2089, 'H'],
            [-1.0347,    2.1135,   -0.0964, 'H'],
            [-0.0745,    1.5674,    1.2645, 'H'],
            [ 0.8708,   -1.4723,    1.6964, 'H'],
            [ 1.6374,    0.1188,    1.8530, 'H'],
            [ 2.5968,   -1.2783,    1.3684, 'H'],
            [ 0.7991,   -2.6027,   -0.6330, 'H'],
            [ 2.4690,   -2.1771,   -0.9971, 'H'],
            [ 1.1775,   -1.6366,   -2.0745, 'H'],
            [-2.8587,    0.7901,   -0.4938, 'H'],
            [-3.3722,   -0.8852,   -0.3934, 'H'],
            [-2.4668,   -0.3328,   -1.8187, 'H'],
            [ 1.1002,    2.6098,   -1.3673, 'H'],
            [ 2.0033,    2.2556,    0.1231, 'H'],
            [ 0.8437,    3.5825,    0.0906, 'H']
        ]
        var Bonds = [
            [1,  4,  1,  0,  0,  0,  0],
            [2,  3,  1,  0,  0,  0,  0],
            [2,  4,  1,  0,  0,  0,  0],
            [2,  5,  1,  0,  0,  0,  0],
            [2, 10,  1,  0,  0,  0,  0],
            [3,  6,  1,  0,  0,  0,  0],
            [3,  7,  1,  0,  0,  0,  0],
            [3, 11,  1,  0,  0,  0,  0],
            [4,  8,  1,  0,  0,  0,  0],
            [4, 12,  1,  0,  0,  0,  0],
            [5,  9,  1,  0,  0,  0,  0],
            [5, 13,  1,  0,  0,  0,  0],
            [5, 14,  1,  0,  0,  0,  0],
            [6, 15,  1,  0,  0,  0,  0],
            [6, 16,  1,  0,  0,  0,  0],
            [6, 17,  1,  0,  0,  0,  0],
            [7, 18,  1,  0,  0,  0,  0],
            [7, 19,  1,  0,  0,  0,  0],
            [7, 20,  1,  0,  0,  0,  0],
            [8, 21,  1,  0,  0,  0,  0],
            [8, 22,  1,  0,  0,  0,  0],
            [8, 23,  1,  0,  0,  0,  0],
            [9, 24,  1,  0,  0,  0,  0],
            [9, 25,  1,  0,  0,  0,  0],
            [9, 26,  1,  0,  0,  0,  0]
        ]

        var Ents = []
        var BondPos =[]
        var BondEnts = []

        var scene = document.querySelector("#jato");
        var el = document.createElement('a-entity');
        scene.appendChild(el);
        el.setAttribute('id', 'target')
        var elCamera = document.querySelector("[camera]"); 

        Bonds.forEach((bond, i) => {
            var AtomA = bond[0] - 1
            var AtomB = bond[1] - 1

            var Xa = Atoms[AtomA][0]
            var Ya = Atoms[AtomA][1] 
            var Za = Atoms[AtomA][2]

            var Xb = Atoms[AtomB][0]
            var Yb = Atoms[AtomB][1]
            var Zb = Atoms[AtomB][2]

            BondPos.push([Xa, Ya, Za, Xb, Yb, Zb])
            BondEnts.push(document.createElement('a-tube'))
        })

        Atoms.forEach(atom => {
            Ents.push(document.createElement('a-entity'))
        })

        elCamera.object3D.position.set(0, 0, 5);
        elCamera.setAttribute('look-controls', 'mouseEnabled: false');
        elCamera.setAttribute('wasd-controls', 'enabled: false');

        Ents.forEach((ent, i) => {
            if(Atoms[i][3]== 'H'){
                ent.setAttribute('geometry', 'primitive: sphere; radius: 0.3')
                ent.setAttribute('material', 'color: #f7f7f7')
            }
            else if(Atoms[i][3]== 'O'){
                ent.setAttribute('geometry', 'primitive: sphere; radius: 0.5')
                ent.setAttribute('material', 'color: #f50407')
            }
            else if(Atoms[i][3]== 'C'){
                ent.setAttribute('geometry', 'primitive: sphere; radius: 0.5')
                ent.setAttribute('material', 'color: #303030')
            }
            else if(Atoms[i][3]== 'F'){
                ent.setAttribute('geometry', 'primitive: sphere; radius: 0.5')
                ent.setAttribute('material', 'color: #1abd53')
            }
            else{
                ent.setAttribute('geometry', 'primitive: sphere; radius: 0.5')
            }

            ent.setAttribute('position', Atoms[i][0] + ' ' + Atoms[i][1] + ' ' + Atoms[i][2])

            el.appendChild(ent)
        })

        BondEnts.forEach((ent, i) => {
            ent.setAttribute('path', BondPos[i][0] + ' ' + BondPos[i][1] + ' ' + BondPos[i][2] + ',' +BondPos[i][3] + ' ' + BondPos[i][4] + ' ' + BondPos[i][5])
            ent.setAttribute('radius', '0.1')
            ent.setAttribute('material', 'color: #FFC65D')

            el.appendChild(ent)
        })
    },

    update: function(){

    },

    onMouseUp: function(evt) {
        this.leftRightButtonPressed = false;
        if (evt.buttons === undefined || evt.buttons !== 0) {
          return;
        }
        this.oldClientX = undefined;
        this.oldClientY = undefined;
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
            var dX;
            var dY;
            var modelPivotEl = document.querySelector("#target");
            if (!this.oldClientX) { return; }
            dX = this.oldClientX - evt.clientX;
            dY = this.oldClientY - evt.clientY;
            //debugger;

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
        elCamera.object3D.position.z -= evt.deltaY*0.01;
    }
  });

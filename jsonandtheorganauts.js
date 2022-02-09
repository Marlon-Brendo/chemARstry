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
            [0 , 0 , 1, 'H'],
            [1 , 1 , 0, 'O'],
            [2 , 0 , 0, 'H']
        ]
        var Bonds = [
            [1,  2,  1,  0,  0,  0,  0],
            [2,  3,  1,  0,  0,  0,  0]
        ];

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

        elCamera.object3D.position.set(1, 0, 5);
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
            else{
                ent.setAttribute('geometry', 'primitive: sphere; radius: 0.5')
            }

            ent.setAttribute('position', Atoms[i][0] + ' ' + Atoms[i][1] + ' ' + Atoms[i][2])

            el.appendChild(ent)
        })

        BondEnts.forEach((ent, i) => {
            ent.setAttribute('path', BondPos[i][0] + ' ' + BondPos[i][1] + ' ' + BondPos[i][2] + ',' +BondPos[i][3] + ' ' + BondPos[i][4] + ' ' + BondPos[i][5])
            ent.setAttribute('radius', '0.1')

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

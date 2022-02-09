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
        onButtonClick = this.onButtonClick.bind(this);

        document.addEventListener("mouseup", this.onMouseUp);
        document.addEventListener("mousemove", this.onMouseMove);
        document.addEventListener("mousedown", this.onMouseDown);
        document.addEventListener("wheel", this.onMouseWheel);

        document.getElementById('go').addEventListener("click", function() {onButtonClick(document.getElementById('test').value); } );

        var coords = []
        var atoms = []
        var bonds = []

        let requestURL = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/cyclohexane/record/JSON/?record_type=3d&response_type=display'
        let request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
        request.onload = function() {
            const test = request.response;
            coords = test.PC_Compounds[0].coords[0].conformers[0];
            atoms = test.PC_Compounds[0].atoms.element;
            bonds = test.PC_Compounds[0].bonds;
            console.log(test);

            var Ents = []
            var BondPos =[]
            var BondEnts = []

            var scene = document.querySelector("#jato");
            var el = document.createElement('a-entity');
            scene.appendChild(el);
            el.setAttribute('id', 'target')
            var elCamera = document.querySelector("[camera]"); 

            for(let i = 0; i < bonds.aid1.length; i++){
                debugger
                var AtomA = bonds.aid1[i] - 1
                var AtomB = bonds.aid2[i] - 1

                var Xa = coords.x[AtomA]
                var Ya = coords.y[AtomA] 
                var Za = coords.z[AtomA]
                var Xb = coords.x[AtomB]
                var Yb = coords.y[AtomB]
                var Zb = coords.z[AtomB]

                BondPos.push([Xa, Ya, Za, Xb, Yb, Zb])
                BondEnts.push(document.createElement('a-tube'))
            }

            atoms.forEach(atom => {
                Ents.push(document.createElement('a-entity'))
            })

            elCamera.object3D.position.set(0, 0, 5);
            elCamera.setAttribute('look-controls', 'mouseEnabled: false');
            elCamera.setAttribute('wasd-controls', 'enabled: false');

            Ents.forEach((ent, i) => {
                if(atoms[i]== 1){
                    ent.setAttribute('geometry', 'primitive: sphere; radius: 0.3')
                    ent.setAttribute('material', 'color: #f7f7f7')
                }
                else if(atoms[i]== 8){
                    ent.setAttribute('geometry', 'primitive: sphere; radius: 0.5')
                    ent.setAttribute('material', 'color: #f50407')
                }
                else if(atoms[i]== 6){
                    ent.setAttribute('geometry', 'primitive: sphere; radius: 0.5')
                    ent.setAttribute('material', 'color: #303030')
                }
                else{
                    ent.setAttribute('geometry', 'primitive: sphere; radius: 0.5')
                }

                //ent.setAttribute('position', Atoms[i][0] + ' ' + Atoms[i][1] + ' ' + Atoms[i][2])
                ent.setAttribute('position', coords.x[i] + ' ' + coords.y[i] + ' ' + coords.z[i])
                el.appendChild(ent)
            })

            BondEnts.forEach((ent, i) => {
                ent.setAttribute('path', BondPos[i][0] + ' ' + BondPos[i][1] + ' ' + BondPos[i][2] + ',' +BondPos[i][3] + ' ' + BondPos[i][4] + ' ' + BondPos[i][5])
                ent.setAttribute('radius', '0.1')
                ent.setAttribute('material', 'color: #FFC65D')

                el.appendChild(ent)
            })
        }
    },

    update: function(){

    },

    onButtonClick: function(evt){
        let test = evt;
        // debugger;

        var coords = []
        var atoms = []
        var bonds = []

        let requestURL = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/' + evt + '/record/JSON/?record_type=3d&response_type=display'
        let request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
        request.onload = function() {
            document.getElementById('target').remove();
            const test = request.response;
            coords = test.PC_Compounds[0].coords[0].conformers[0];
            atoms = test.PC_Compounds[0].atoms.element;
            bonds = test.PC_Compounds[0].bonds;
            console.log(test);

            var Ents = []
            var BondPos =[]
            var BondEnts = []

            var scene = document.querySelector("#jato");
            var el = document.createElement('a-entity');
            scene.appendChild(el);
            el.setAttribute('id', 'target')
            var elCamera = document.querySelector("[camera]"); 

            for(let i = 0; i < bonds.aid1.length; i++){
                var AtomA = bonds.aid1[i] - 1
                var AtomB = bonds.aid2[i] - 1

                var Xa = coords.x[AtomA]
                var Ya = coords.y[AtomA] 
                var Za = coords.z[AtomA]
                var Xb = coords.x[AtomB]
                var Yb = coords.y[AtomB]
                var Zb = coords.z[AtomB]

                BondPos.push([Xa, Ya, Za, Xb, Yb, Zb])
                BondEnts.push(document.createElement('a-tube'))
            }

            atoms.forEach(atom => {
                Ents.push(document.createElement('a-entity'))
            })

            elCamera.object3D.position.set(0, 0, 5);
            elCamera.setAttribute('look-controls', 'mouseEnabled: false');
            elCamera.setAttribute('wasd-controls', 'enabled: false');

            Ents.forEach((ent, i) => {
                if(atoms[i]== 1){
                    ent.setAttribute('geometry', 'primitive: sphere; radius: 0.3')
                    ent.setAttribute('material', 'color: #f7f7f7')
                }
                else if(atoms[i]== 8){
                    ent.setAttribute('geometry', 'primitive: sphere; radius: 0.5')
                    ent.setAttribute('material', 'color: #f50407')
                }
                else if(atoms[i]== 6){
                    ent.setAttribute('geometry', 'primitive: sphere; radius: 0.5')
                    ent.setAttribute('material', 'color: #303030')
                }
                else{
                    ent.setAttribute('geometry', 'primitive: sphere; radius: 0.5')
                }

                //ent.setAttribute('position', Atoms[i][0] + ' ' + Atoms[i][1] + ' ' + Atoms[i][2])
                ent.setAttribute('position', coords.x[i] + ' ' + coords.y[i] + ' ' + coords.z[i])
                el.appendChild(ent)
            })

            BondEnts.forEach((ent, i) => {
                ent.setAttribute('path', BondPos[i][0] + ' ' + BondPos[i][1] + ' ' + BondPos[i][2] + ',' +BondPos[i][3] + ' ' + BondPos[i][4] + ' ' + BondPos[i][5])
                ent.setAttribute('radius', '0.1')
                ent.setAttribute('material', 'color: #FFC65D')

                el.appendChild(ent)
            })
        }
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

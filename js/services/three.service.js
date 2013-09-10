'use strict';

angular
    .module('ShowpadDemo')
    .service('$three', [
        function () {

            var camera, renderer, controls, scene;

            /**
             * Initialise three.js and stuff
             * @param {DOMElement} wrapper
             * @return {void}
             */
            function init (wrapper) {
                var width = wrapper.clientWidth,
                    height = wrapper.clientHeight;

                // create camera object
                camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);
                camera.position.z = 2000;

                // create the canvas renderer
                renderer = new THREE.CanvasRenderer();
                renderer.setSize(width, height);

                // add controls but disable them
                controls = new THREE.OrbitControls(camera, wrapper);

                controls.zoomSpeed = 0.75;
                controls.rotateSpeed = 0.75;
                controls.noPan = true;
                controls.autoRotate = true;

                controls.addEventListener('change', function() {
                    render();
                });

                // add renderer to DOM
                wrapper.appendChild(renderer.domElement);
            }


            /**
             * Generate the scene
             * @param {number} horizontalRows
             * @param {number} verticalRows
             * @param {number} size
             * @param {string} color
             * @return {void}
             */
            function generate(horizontalRows, verticalRows, size, color) {

                scene = new THREE.Scene();

                var boxSize = size * 10,
                    depth = 300,
                    thickness = 20,
                    width = (boxSize * verticalRows) + (thickness * (verticalRows - 1)),
                    height = (boxSize * horizontalRows) + (thickness * (horizontalRows - 1)),
                    meshes = [], i, j, d, l = 4, calc,
                    material, geometry, mesh, light;

                // first add bottom, top and sides
                meshes[0] = [ thickness * 2, height + (2 * 2 * thickness), depth, -(width / 2) - (thickness), 0, 0 ]; // left
                meshes[1] = [ thickness * 2, height + (2 * 2 * thickness), depth, (width / 2) + (thickness), 0, 0 ]; // right
                meshes[2] = [ width, thickness * 2, depth, 0, (height / 2) + thickness, 0 ]; // top
                meshes[3] = [ width, thickness * 2, depth, 0, - (height / 2) - thickness, 0 ]; // bottom

                for (i = 1; i < verticalRows; i++) {
                    calc = -(width / 2) + (boxSize * i) + (thickness * (i - 1)) + (thickness / 2);
                    meshes[l++] = [ thickness, height, depth, calc, 0, 0 ];
                }


                for (i = 1; i < horizontalRows; i++) {
                    for (j = 0; j < verticalRows; j++) {
                        calc = -(width / 2) + (boxSize / 2)  + ((boxSize + thickness)* j);
                        meshes[l++] = [ boxSize, thickness, depth, calc, -(height / 2) + (height / horizontalRows * i) , 0 ];
                    }
                }

                for (var i = 0; i < l; i++) {
                    d = meshes[i];

                    material = new THREE.MeshLambertMaterial( { color: new THREE.Color(color), shading: THREE.FlatShading } );
                    geometry = new THREE.CubeGeometry(d[0], d[1], d[2]);
                    mesh = new THREE.Mesh(geometry, material);

                    mesh.position.x = d[3];
                    mesh.position.y = d[4];
                    mesh.position.z = d[5];

                    mesh.updateMatrix();
                    mesh.matrixAutoUpdate = false;

                    scene.add(mesh);
                }

                // add lights
                light = new THREE.DirectionalLight( 0xffffff );
                light.position.set(1, 1, 1);
                scene.add( light );

                light = new THREE.DirectionalLight( 0xffffff );
                light.position.set(-1, -0.8, -1);
                scene.add( light );

                light = new THREE.AmbientLight( 0x222222);
                scene.add(light);

            }


            function render() {
                renderer.render(scene, camera);
            }

            // return the service definition
            return {
                init: init,
                generate: generate,
                render: render
            }
        }
    ]);
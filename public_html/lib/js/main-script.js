function VR(parentElement) {
    if (parentElement === null) {
        throw "The passed parent element is null and can not be user for generating the scene.";
    }
    if (parentElement.childNodes.length !== 0) {
        console.warn("The passed parent element is not an empty container, this may lead to unwanted behaviour.");
    }

    function Content(sc) {
        if (sc === undefined || sc === null) {
            throw "Passed scene for creating content is null or undefined. Scene needs to be defined before adding content to it.";
        }

        var cube, material, sphere, sphereGeometry;

        this.create = function (pathToImage) {
            if (pathToImage === null) {
                // error handling
            }
            material = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('lib/img/bergsjostolen.jpg')});
            
            sphereGeometry = new THREE.SphereGeometry(100, 20, 20);
            
            sphere = new THREE.Mesh(sphereGeometry, material);
            sphere.scale.x = -1;
            sc.add(sphere);
        };

        this.animate = function () {
        };
    }
    ;

    var scene, camera, renderer, canvasElement, content,
            w = window.innerWidth,
            h = window.innerHeight;

    var adjustToResize = function () {
        window.addEventListener("resize", function () {
            w = window.innerWidth;
            h = window.innerHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        });
    };

    var init = function () {
        // define scene and camera
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, w / h, 1, 1000);
        camera.position.set(0, 0, 5);
        scene.add(camera);

        // create canvas-element and append it to given parent element     
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(w, h);
        canvasElement = renderer.domElement;
        parentElement.appendChild(canvasElement);

        // define new Content-object and create the content
        content = new Content(scene);
        content.create();

        // calling function which ensures adjusting all elements on resize-event
        adjustToResize();
        console.log("Initialization finished...");
    };

    var render = function () {
        requestAnimationFrame(render);
        content.animate();
        renderer.render(scene, camera);
    };

    this.start = function () {
        init();
        render();
        console.log("Start of VR finished...");
    };
}
;

document.addEventListener('DOMContentLoaded', function () {
    try {
        var vr = new VR(document.getElementById("three-wrapper"));
        vr.start();
    } catch (err) {
        console.error("ERROR: " + err);
    }
}, false);
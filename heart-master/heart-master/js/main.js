	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
	var container, stats;
	var camera, scene, renderer;
	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;
	var raycaster;
	var mouse;
	var heartPart;
	var heartIsOpen;
	var aortaPin;
	
	// set up the canvas on which to draw the locator line
	// MUST NOT be below init() and animate()
	var lineCanvas = document.createElement( 'canvas' );
	lineCanvas.id = "dotsCanvas";
	lineCanvas.width = window.innerWidth;
	lineCanvas.height = window.innerHeight;
	lineCanvas.style.position = "absolute";
	lineCanvas.style.zIndex = "101";
	lineCanvas.style.display = "inline";
	document.body.appendChild(lineCanvas);
	


	init();
	animate();
	
	function init() {
		
		// camera
		camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
		camera.position.z = 5;

		// controls
		controls = new THREE.TrackballControls( camera );
		controls.rotateSpeed = 1.0;
		controls.zoomSpeed = 1.2;
		controls.panSpeed = 0.8;
		controls.noZoom = false;
		controls.noPan = false;
		controls.staticMoving = true;
		controls.dynamicDampingFactor = 0.3;
		controls.keys = [ 65, 83, 68 ];
		controls.addEventListener( 'change', render ); 
		
		// scene
		scene = new THREE.Scene();
		var ambient = new THREE.AmbientLight( 0x444444 );
		scene.add( ambient );
		var directionalLight1 = new THREE.DirectionalLight( 0xffeedd, 0.7 );
		directionalLight1.position.set( 0, 0, 1 ).normalize();
		var directionalLight2 = new THREE.DirectionalLight( 0xffeedd, 0.7 );
		directionalLight2.position.set( 0, 0, -1 ).normalize();
		var directionalLight3 = new THREE.DirectionalLight( 0xffeedd, 0.7 );
		directionalLight3.position.set( 1, 0, 0).normalize();
		var directionalLight4 = new THREE.DirectionalLight( 0xffeedd, 0.7 );
		directionalLight4.position.set( -1, 0, 0 ).normalize();
		var directionalLight5 = new THREE.DirectionalLight( 0xffeedd, 0.7 );
		directionalLight5.position.set( 0, 1, 0 ).normalize();
		var directionalLight6 = new THREE.DirectionalLight( 0xffeedd, 0.7 );
		directionalLight6.position.set( 0, -1, 0 ).normalize();
		scene.add( directionalLight1 );
		scene.add( directionalLight2 );
		scene.add( directionalLight3 );
		scene.add( directionalLight4 );			
		scene.add( directionalLight5 );
		scene.add( directionalLight6 );
		
		// models
		var onProgress = function ( xhr ) {
			if ( xhr.lengthComputable ) {
				var percentComplete = xhr.loaded / xhr.total * 100;
				console.log( Math.round(percentComplete, 2) + '% downloaded' );
			}
		};
		var onError = function ( xhr ) { };
		/*
		THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
		var mtlLoader = new THREE.MTLLoader();
		mtlLoader.setBaseUrl( 'models/' );
		mtlLoader.setPath( 'models/' );
		mtlLoader.load( 'building.mtl', function( materials ) {
			materials.preload();
			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials( materials );
			objLoader.setPath( 'models/' );
			objLoader.load( 'building.obj', function ( object ) {
				object.position.x = 32;
				object.position.y = -3;
				object.position.z = 3;
				object.rotation.x = -1.6;
				object.name = 'openHeart';
				scene.add( object );
			}, onProgress, onError );
		});
		*/
		
		THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
		var mtlLoader2 = new THREE.MTLLoader();
		mtlLoader2.setBaseUrl( 'models/' );
		mtlLoader2.setPath( 'models/' );
		mtlLoader2.load( 'building.mtl', function( materials ) {
			materials.preload();
			var objLoader2 = new THREE.OBJLoader();
			objLoader2.setMaterials( materials );
			objLoader2.setPath( 'models/' );
			objLoader2.load( 'building.obj', function ( object ) {
				object.position.x = 32;
				object.position.y = -3;
				object.position.z = 3;
				object.rotation.x = -1.6;
				object.scale.x= 3.949999999999994; object.scale.y= 3.949999999999994; object.scale.z= 3.949999999999994;
				object.name = 'heartPart';
				scene.add( object );
			}, onProgress, onError );
		});
		
		
		heartPart = scene.getObjectByName('heartPart', true);
		heartIsOpen = false;

	//	camera.position.z = 5;
		
		// container
		container = document.createElement( 'div' );
		document.body.appendChild( container );
		
		// renderer three.js in canvas
		var threeCanvas = document.getElementById('threeCanvas');
		renderer = new THREE.WebGLRenderer({canvas: threeCanvas});
		threeCanvas.width  = window.innerWidth;
		threeCanvas.height = window.innerHeight;
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		
		// stats
		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '0px';
		stats.domElement.style.zIndex = 100;
		container.appendChild( stats.domElement );
		
		// window resize
		window.addEventListener( 'resize', onWindowResize, false );

		raycaster = new THREE.Raycaster();
		mouse = new THREE.Vector2();
		
	}
	
	function onWindowResize() {
		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
		controls.handleResize();
		animate();
	}

	function animate() {
		requestAnimationFrame( animate );
		controls.update();
		TWEEN.update();
		if (document.getElementById("dotsCanvas").style.display == "inline") {
			//checkDots();
		}
		render();
	}
	
	function render() {
		renderer.render( scene, camera );
		stats.update();

	}
	
	
	
	
	

	
	
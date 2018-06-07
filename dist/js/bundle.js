/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/shortid/index.js":
/*!***************************************!*\
  !*** ./node_modules/shortid/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nmodule.exports = __webpack_require__(/*! ./lib/index */ \"./node_modules/shortid/lib/index.js\");\n\n\n//# sourceURL=webpack:///./node_modules/shortid/index.js?");

/***/ }),

/***/ "./node_modules/shortid/lib/alphabet.js":
/*!**********************************************!*\
  !*** ./node_modules/shortid/lib/alphabet.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar randomFromSeed = __webpack_require__(/*! ./random/random-from-seed */ \"./node_modules/shortid/lib/random/random-from-seed.js\");\n\nvar ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';\nvar alphabet;\nvar previousSeed;\n\nvar shuffled;\n\nfunction reset() {\n    shuffled = false;\n}\n\nfunction setCharacters(_alphabet_) {\n    if (!_alphabet_) {\n        if (alphabet !== ORIGINAL) {\n            alphabet = ORIGINAL;\n            reset();\n        }\n        return;\n    }\n\n    if (_alphabet_ === alphabet) {\n        return;\n    }\n\n    if (_alphabet_.length !== ORIGINAL.length) {\n        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);\n    }\n\n    var unique = _alphabet_.split('').filter(function(item, ind, arr){\n       return ind !== arr.lastIndexOf(item);\n    });\n\n    if (unique.length) {\n        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));\n    }\n\n    alphabet = _alphabet_;\n    reset();\n}\n\nfunction characters(_alphabet_) {\n    setCharacters(_alphabet_);\n    return alphabet;\n}\n\nfunction setSeed(seed) {\n    randomFromSeed.seed(seed);\n    if (previousSeed !== seed) {\n        reset();\n        previousSeed = seed;\n    }\n}\n\nfunction shuffle() {\n    if (!alphabet) {\n        setCharacters(ORIGINAL);\n    }\n\n    var sourceArray = alphabet.split('');\n    var targetArray = [];\n    var r = randomFromSeed.nextValue();\n    var characterIndex;\n\n    while (sourceArray.length > 0) {\n        r = randomFromSeed.nextValue();\n        characterIndex = Math.floor(r * sourceArray.length);\n        targetArray.push(sourceArray.splice(characterIndex, 1)[0]);\n    }\n    return targetArray.join('');\n}\n\nfunction getShuffled() {\n    if (shuffled) {\n        return shuffled;\n    }\n    shuffled = shuffle();\n    return shuffled;\n}\n\n/**\n * lookup shuffled letter\n * @param index\n * @returns {string}\n */\nfunction lookup(index) {\n    var alphabetShuffled = getShuffled();\n    return alphabetShuffled[index];\n}\n\nmodule.exports = {\n    characters: characters,\n    seed: setSeed,\n    lookup: lookup,\n    shuffled: getShuffled\n};\n\n\n//# sourceURL=webpack:///./node_modules/shortid/lib/alphabet.js?");

/***/ }),

/***/ "./node_modules/shortid/lib/build.js":
/*!*******************************************!*\
  !*** ./node_modules/shortid/lib/build.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar encode = __webpack_require__(/*! ./encode */ \"./node_modules/shortid/lib/encode.js\");\nvar alphabet = __webpack_require__(/*! ./alphabet */ \"./node_modules/shortid/lib/alphabet.js\");\n\n// Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.\n// This number should be updated every year or so to keep the generated id short.\n// To regenerate `new Date() - 0` and bump the version. Always bump the version!\nvar REDUCE_TIME = 1459707606518;\n\n// don't change unless we change the algos or REDUCE_TIME\n// must be an integer and less than 16\nvar version = 6;\n\n// Counter is used when shortid is called multiple times in one second.\nvar counter;\n\n// Remember the last time shortid was called in case counter is needed.\nvar previousSeconds;\n\n/**\n * Generate unique id\n * Returns string id\n */\nfunction build(clusterWorkerId) {\n\n    var str = '';\n\n    var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);\n\n    if (seconds === previousSeconds) {\n        counter++;\n    } else {\n        counter = 0;\n        previousSeconds = seconds;\n    }\n\n    str = str + encode(alphabet.lookup, version);\n    str = str + encode(alphabet.lookup, clusterWorkerId);\n    if (counter > 0) {\n        str = str + encode(alphabet.lookup, counter);\n    }\n    str = str + encode(alphabet.lookup, seconds);\n\n    return str;\n}\n\nmodule.exports = build;\n\n\n//# sourceURL=webpack:///./node_modules/shortid/lib/build.js?");

/***/ }),

/***/ "./node_modules/shortid/lib/decode.js":
/*!********************************************!*\
  !*** ./node_modules/shortid/lib/decode.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar alphabet = __webpack_require__(/*! ./alphabet */ \"./node_modules/shortid/lib/alphabet.js\");\n\n/**\n * Decode the id to get the version and worker\n * Mainly for debugging and testing.\n * @param id - the shortid-generated id.\n */\nfunction decode(id) {\n    var characters = alphabet.shuffled();\n    return {\n        version: characters.indexOf(id.substr(0, 1)) & 0x0f,\n        worker: characters.indexOf(id.substr(1, 1)) & 0x0f\n    };\n}\n\nmodule.exports = decode;\n\n\n//# sourceURL=webpack:///./node_modules/shortid/lib/decode.js?");

/***/ }),

/***/ "./node_modules/shortid/lib/encode.js":
/*!********************************************!*\
  !*** ./node_modules/shortid/lib/encode.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar randomByte = __webpack_require__(/*! ./random/random-byte */ \"./node_modules/shortid/lib/random/random-byte-browser.js\");\n\nfunction encode(lookup, number) {\n    var loopCounter = 0;\n    var done;\n\n    var str = '';\n\n    while (!done) {\n        str = str + lookup( ( (number >> (4 * loopCounter)) & 0x0f ) | randomByte() );\n        done = number < (Math.pow(16, loopCounter + 1 ) );\n        loopCounter++;\n    }\n    return str;\n}\n\nmodule.exports = encode;\n\n\n//# sourceURL=webpack:///./node_modules/shortid/lib/encode.js?");

/***/ }),

/***/ "./node_modules/shortid/lib/index.js":
/*!*******************************************!*\
  !*** ./node_modules/shortid/lib/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar alphabet = __webpack_require__(/*! ./alphabet */ \"./node_modules/shortid/lib/alphabet.js\");\nvar encode = __webpack_require__(/*! ./encode */ \"./node_modules/shortid/lib/encode.js\");\nvar decode = __webpack_require__(/*! ./decode */ \"./node_modules/shortid/lib/decode.js\");\nvar build = __webpack_require__(/*! ./build */ \"./node_modules/shortid/lib/build.js\");\nvar isValid = __webpack_require__(/*! ./is-valid */ \"./node_modules/shortid/lib/is-valid.js\");\n\n// if you are using cluster or multiple servers use this to make each instance\n// has a unique value for worker\n// Note: I don't know if this is automatically set when using third\n// party cluster solutions such as pm2.\nvar clusterWorkerId = __webpack_require__(/*! ./util/cluster-worker-id */ \"./node_modules/shortid/lib/util/cluster-worker-id-browser.js\") || 0;\n\n/**\n * Set the seed.\n * Highly recommended if you don't want people to try to figure out your id schema.\n * exposed as shortid.seed(int)\n * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.\n */\nfunction seed(seedValue) {\n    alphabet.seed(seedValue);\n    return module.exports;\n}\n\n/**\n * Set the cluster worker or machine id\n * exposed as shortid.worker(int)\n * @param workerId worker must be positive integer.  Number less than 16 is recommended.\n * returns shortid module so it can be chained.\n */\nfunction worker(workerId) {\n    clusterWorkerId = workerId;\n    return module.exports;\n}\n\n/**\n *\n * sets new characters to use in the alphabet\n * returns the shuffled alphabet\n */\nfunction characters(newCharacters) {\n    if (newCharacters !== undefined) {\n        alphabet.characters(newCharacters);\n    }\n\n    return alphabet.shuffled();\n}\n\n/**\n * Generate unique id\n * Returns string id\n */\nfunction generate() {\n  return build(clusterWorkerId);\n}\n\n// Export all other functions as properties of the generate function\nmodule.exports = generate;\nmodule.exports.generate = generate;\nmodule.exports.seed = seed;\nmodule.exports.worker = worker;\nmodule.exports.characters = characters;\nmodule.exports.decode = decode;\nmodule.exports.isValid = isValid;\n\n\n//# sourceURL=webpack:///./node_modules/shortid/lib/index.js?");

/***/ }),

/***/ "./node_modules/shortid/lib/is-valid.js":
/*!**********************************************!*\
  !*** ./node_modules/shortid/lib/is-valid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar alphabet = __webpack_require__(/*! ./alphabet */ \"./node_modules/shortid/lib/alphabet.js\");\n\nfunction isShortId(id) {\n    if (!id || typeof id !== 'string' || id.length < 6 ) {\n        return false;\n    }\n\n    var characters = alphabet.characters();\n    var len = id.length;\n    for(var i = 0; i < len;i++) {\n        if (characters.indexOf(id[i]) === -1) {\n            return false;\n        }\n    }\n    return true;\n}\n\nmodule.exports = isShortId;\n\n\n//# sourceURL=webpack:///./node_modules/shortid/lib/is-valid.js?");

/***/ }),

/***/ "./node_modules/shortid/lib/random/random-byte-browser.js":
/*!****************************************************************!*\
  !*** ./node_modules/shortid/lib/random/random-byte-browser.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto\n\nfunction randomByte() {\n    if (!crypto || !crypto.getRandomValues) {\n        return Math.floor(Math.random() * 256) & 0x30;\n    }\n    var dest = new Uint8Array(1);\n    crypto.getRandomValues(dest);\n    return dest[0] & 0x30;\n}\n\nmodule.exports = randomByte;\n\n\n//# sourceURL=webpack:///./node_modules/shortid/lib/random/random-byte-browser.js?");

/***/ }),

/***/ "./node_modules/shortid/lib/random/random-from-seed.js":
/*!*************************************************************!*\
  !*** ./node_modules/shortid/lib/random/random-from-seed.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// Found this seed-based random generator somewhere\n// Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)\n\nvar seed = 1;\n\n/**\n * return a random number based on a seed\n * @param seed\n * @returns {number}\n */\nfunction getNextValue() {\n    seed = (seed * 9301 + 49297) % 233280;\n    return seed/(233280.0);\n}\n\nfunction setSeed(_seed_) {\n    seed = _seed_;\n}\n\nmodule.exports = {\n    nextValue: getNextValue,\n    seed: setSeed\n};\n\n\n//# sourceURL=webpack:///./node_modules/shortid/lib/random/random-from-seed.js?");

/***/ }),

/***/ "./node_modules/shortid/lib/util/cluster-worker-id-browser.js":
/*!********************************************************************!*\
  !*** ./node_modules/shortid/lib/util/cluster-worker-id-browser.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = 0;\n\n\n//# sourceURL=webpack:///./node_modules/shortid/lib/util/cluster-worker-id-browser.js?");

/***/ }),

/***/ "./node_modules/three/build/three.module.js":
/*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
/*! exports provided: WebGLRenderTargetCube, WebGLRenderTarget, WebGLRenderer, ShaderLib, UniformsLib, UniformsUtils, ShaderChunk, FogExp2, Fog, Scene, Sprite, LOD, SkinnedMesh, Skeleton, Bone, Mesh, LineSegments, LineLoop, Line, Points, Group, VideoTexture, DataTexture, CompressedTexture, CubeTexture, CanvasTexture, DepthTexture, Texture, CompressedTextureLoader, DataTextureLoader, CubeTextureLoader, TextureLoader, ObjectLoader, MaterialLoader, BufferGeometryLoader, DefaultLoadingManager, LoadingManager, JSONLoader, ImageLoader, ImageBitmapLoader, FontLoader, FileLoader, Loader, LoaderUtils, Cache, AudioLoader, SpotLightShadow, SpotLight, PointLight, RectAreaLight, HemisphereLight, DirectionalLightShadow, DirectionalLight, AmbientLight, LightShadow, Light, StereoCamera, PerspectiveCamera, OrthographicCamera, CubeCamera, ArrayCamera, Camera, AudioListener, PositionalAudio, AudioContext, AudioAnalyser, Audio, VectorKeyframeTrack, StringKeyframeTrack, QuaternionKeyframeTrack, NumberKeyframeTrack, ColorKeyframeTrack, BooleanKeyframeTrack, PropertyMixer, PropertyBinding, KeyframeTrack, AnimationUtils, AnimationObjectGroup, AnimationMixer, AnimationClip, Uniform, InstancedBufferGeometry, BufferGeometry, Geometry, InterleavedBufferAttribute, InstancedInterleavedBuffer, InterleavedBuffer, InstancedBufferAttribute, Face3, Object3D, Raycaster, Layers, EventDispatcher, Clock, QuaternionLinearInterpolant, LinearInterpolant, DiscreteInterpolant, CubicInterpolant, Interpolant, Triangle, Math, Spherical, Cylindrical, Plane, Frustum, Sphere, Ray, Matrix4, Matrix3, Box3, Box2, Line3, Euler, Vector4, Vector3, Vector2, Quaternion, Color, ImmediateRenderObject, VertexNormalsHelper, SpotLightHelper, SkeletonHelper, PointLightHelper, RectAreaLightHelper, HemisphereLightHelper, GridHelper, PolarGridHelper, FaceNormalsHelper, DirectionalLightHelper, CameraHelper, BoxHelper, Box3Helper, PlaneHelper, ArrowHelper, AxesHelper, Shape, Path, ShapePath, Font, CurvePath, Curve, ShapeUtils, WebGLUtils, WireframeGeometry, ParametricGeometry, ParametricBufferGeometry, TetrahedronGeometry, TetrahedronBufferGeometry, OctahedronGeometry, OctahedronBufferGeometry, IcosahedronGeometry, IcosahedronBufferGeometry, DodecahedronGeometry, DodecahedronBufferGeometry, PolyhedronGeometry, PolyhedronBufferGeometry, TubeGeometry, TubeBufferGeometry, TorusKnotGeometry, TorusKnotBufferGeometry, TorusGeometry, TorusBufferGeometry, TextGeometry, TextBufferGeometry, SphereGeometry, SphereBufferGeometry, RingGeometry, RingBufferGeometry, PlaneGeometry, PlaneBufferGeometry, LatheGeometry, LatheBufferGeometry, ShapeGeometry, ShapeBufferGeometry, ExtrudeGeometry, ExtrudeBufferGeometry, EdgesGeometry, ConeGeometry, ConeBufferGeometry, CylinderGeometry, CylinderBufferGeometry, CircleGeometry, CircleBufferGeometry, BoxGeometry, BoxBufferGeometry, ShadowMaterial, SpriteMaterial, RawShaderMaterial, ShaderMaterial, PointsMaterial, MeshPhysicalMaterial, MeshStandardMaterial, MeshPhongMaterial, MeshToonMaterial, MeshNormalMaterial, MeshLambertMaterial, MeshDepthMaterial, MeshDistanceMaterial, MeshBasicMaterial, LineDashedMaterial, LineBasicMaterial, Material, Float64BufferAttribute, Float32BufferAttribute, Uint32BufferAttribute, Int32BufferAttribute, Uint16BufferAttribute, Int16BufferAttribute, Uint8ClampedBufferAttribute, Uint8BufferAttribute, Int8BufferAttribute, BufferAttribute, ArcCurve, CatmullRomCurve3, CubicBezierCurve, CubicBezierCurve3, EllipseCurve, LineCurve, LineCurve3, QuadraticBezierCurve, QuadraticBezierCurve3, SplineCurve, REVISION, MOUSE, CullFaceNone, CullFaceBack, CullFaceFront, CullFaceFrontBack, FrontFaceDirectionCW, FrontFaceDirectionCCW, BasicShadowMap, PCFShadowMap, PCFSoftShadowMap, FrontSide, BackSide, DoubleSide, FlatShading, SmoothShading, NoColors, FaceColors, VertexColors, NoBlending, NormalBlending, AdditiveBlending, SubtractiveBlending, MultiplyBlending, CustomBlending, AddEquation, SubtractEquation, ReverseSubtractEquation, MinEquation, MaxEquation, ZeroFactor, OneFactor, SrcColorFactor, OneMinusSrcColorFactor, SrcAlphaFactor, OneMinusSrcAlphaFactor, DstAlphaFactor, OneMinusDstAlphaFactor, DstColorFactor, OneMinusDstColorFactor, SrcAlphaSaturateFactor, NeverDepth, AlwaysDepth, LessDepth, LessEqualDepth, EqualDepth, GreaterEqualDepth, GreaterDepth, NotEqualDepth, MultiplyOperation, MixOperation, AddOperation, NoToneMapping, LinearToneMapping, ReinhardToneMapping, Uncharted2ToneMapping, CineonToneMapping, UVMapping, CubeReflectionMapping, CubeRefractionMapping, EquirectangularReflectionMapping, EquirectangularRefractionMapping, SphericalReflectionMapping, CubeUVReflectionMapping, CubeUVRefractionMapping, RepeatWrapping, ClampToEdgeWrapping, MirroredRepeatWrapping, NearestFilter, NearestMipMapNearestFilter, NearestMipMapLinearFilter, LinearFilter, LinearMipMapNearestFilter, LinearMipMapLinearFilter, UnsignedByteType, ByteType, ShortType, UnsignedShortType, IntType, UnsignedIntType, FloatType, HalfFloatType, UnsignedShort4444Type, UnsignedShort5551Type, UnsignedShort565Type, UnsignedInt248Type, AlphaFormat, RGBFormat, RGBAFormat, LuminanceFormat, LuminanceAlphaFormat, RGBEFormat, DepthFormat, DepthStencilFormat, RGB_S3TC_DXT1_Format, RGBA_S3TC_DXT1_Format, RGBA_S3TC_DXT3_Format, RGBA_S3TC_DXT5_Format, RGB_PVRTC_4BPPV1_Format, RGB_PVRTC_2BPPV1_Format, RGBA_PVRTC_4BPPV1_Format, RGBA_PVRTC_2BPPV1_Format, RGB_ETC1_Format, RGBA_ASTC_4x4_Format, RGBA_ASTC_5x4_Format, RGBA_ASTC_5x5_Format, RGBA_ASTC_6x5_Format, RGBA_ASTC_6x6_Format, RGBA_ASTC_8x5_Format, RGBA_ASTC_8x6_Format, RGBA_ASTC_8x8_Format, RGBA_ASTC_10x5_Format, RGBA_ASTC_10x6_Format, RGBA_ASTC_10x8_Format, RGBA_ASTC_10x10_Format, RGBA_ASTC_12x10_Format, RGBA_ASTC_12x12_Format, LoopOnce, LoopRepeat, LoopPingPong, InterpolateDiscrete, InterpolateLinear, InterpolateSmooth, ZeroCurvatureEnding, ZeroSlopeEnding, WrapAroundEnding, TrianglesDrawMode, TriangleStripDrawMode, TriangleFanDrawMode, LinearEncoding, sRGBEncoding, GammaEncoding, RGBEEncoding, LogLuvEncoding, RGBM7Encoding, RGBM16Encoding, RGBDEncoding, BasicDepthPacking, RGBADepthPacking, CubeGeometry, Face4, LineStrip, LinePieces, MeshFaceMaterial, MultiMaterial, PointCloud, Particle, ParticleSystem, PointCloudMaterial, ParticleBasicMaterial, ParticleSystemMaterial, Vertex, DynamicBufferAttribute, Int8Attribute, Uint8Attribute, Uint8ClampedAttribute, Int16Attribute, Uint16Attribute, Int32Attribute, Uint32Attribute, Float32Attribute, Float64Attribute, ClosedSplineCurve3, SplineCurve3, Spline, AxisHelper, BoundingBoxHelper, EdgesHelper, WireframeHelper, XHRLoader, BinaryTextureLoader, GeometryUtils, ImageUtils, Projector, CanvasRenderer, SceneUtils, LensFlare */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/***/ }),

/***/ "./src/gridGenerator.js":
/*!******************************!*\
  !*** ./src/gridGenerator.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var shortid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! shortid */ \"./node_modules/shortid/index.js\");\n/* harmony import */ var shortid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(shortid__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst generateGrid = (scene, sideLength) => {\n  const tiles = []\n  for (let x = 0; x <= 160; x += sideLength) {\n    for (let y = 0; y <= 140; y += sideLength) {\n      tiles.push({ id: shortid__WEBPACK_IMPORTED_MODULE_1___default.a.generate(), x, y, state: 0, visited: false });\n    }\n  }\n  \n  var material = new three__WEBPACK_IMPORTED_MODULE_0__[\"LineBasicMaterial\"]( { color: 0xffffff } );\n  tiles.forEach((tile) => {\n    const { x, y } = tile;\n    var geometry1 = new three__WEBPACK_IMPORTED_MODULE_0__[\"Geometry\"]();\n    geometry1.vertices.push(new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](x, y, 0));\n    geometry1.vertices.push(new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](x + sideLength, y, 0));\n  \n    var geometry2 = new three__WEBPACK_IMPORTED_MODULE_0__[\"Geometry\"]()\n    geometry2.vertices.push(new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](x + sideLength, y, 0));\n    geometry2.vertices.push(new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](x + sideLength, y + sideLength, 0));\n  \n    var geometry3 = new three__WEBPACK_IMPORTED_MODULE_0__[\"Geometry\"]()\n    geometry3.vertices.push(new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](x + sideLength, y + sideLength, 0));\n    geometry3.vertices.push(new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](x, y + sideLength, 0));\n  \n    var geometry4 = new three__WEBPACK_IMPORTED_MODULE_0__[\"Geometry\"]()\n    geometry4.vertices.push(new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](x, y + sideLength, 0));\n    geometry4.vertices.push(new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](x, y, 0));\n  \n    var line1 = new three__WEBPACK_IMPORTED_MODULE_0__[\"Line\"](geometry1, material);\n    var line2 = new three__WEBPACK_IMPORTED_MODULE_0__[\"Line\"](geometry2, material);\n    var line3 = new three__WEBPACK_IMPORTED_MODULE_0__[\"Line\"](geometry3, material);\n    var line4 = new three__WEBPACK_IMPORTED_MODULE_0__[\"Line\"](geometry4, material);\n  \n    tile['top'] = line3;\n    tile['right'] = line2;\n    tile['bottom'] = line1;\n    tile['left'] = line4;\n  \n    scene.add(line1)\n    scene.add(line2)\n    scene.add(line3)\n    scene.add(line4)\n  });\n\n  return tiles;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ generateGrid });\n\n\n//# sourceURL=webpack:///./src/gridGenerator.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var _gridGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gridGenerator */ \"./src/gridGenerator.js\");\n/* harmony import */ var _mazeGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mazeGenerator */ \"./src/mazeGenerator.js\");\n/* harmony import */ var _pathfinder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pathfinder */ \"./src/pathfinder.js\");\n\n\n\n\n\nconst scene = new three__WEBPACK_IMPORTED_MODULE_0__[\"Scene\"]()\nscene.background = new three__WEBPACK_IMPORTED_MODULE_0__[\"Color\"]('#000000')\nconst camera = new three__WEBPACK_IMPORTED_MODULE_0__[\"PerspectiveCamera\"]( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )\nconst renderer = new three__WEBPACK_IMPORTED_MODULE_0__[\"WebGLRenderer\"]()\nrenderer.setSize( window.innerWidth, window.innerHeight )\ndocument.body.appendChild( renderer.domElement )\ncamera.position.set( 85, 75, 100 )\n\nlet fps, fpsInterval, startTime, now, then, elapsed\nfps = 60\nfpsInterval = 1000 / fps\nthen = Date.now()\n\nconst sideLength = 10;\n\nlet tiles\nlet isInitialized = false;\nlet pathfinderInitialized = false;\nfunction animate() {\n  requestAnimationFrame( animate )\n  renderer.render( scene, camera )\n  now = Date.now()\n  elapsed = now - then\n  if (elapsed > fpsInterval) {\n    then = now - (elapsed % fpsInterval)\n    if (!isInitialized) {\n      tiles = _gridGenerator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].generateGrid(scene, sideLength)\n      _mazeGenerator__WEBPACK_IMPORTED_MODULE_2__[\"default\"].initialize(tiles, sideLength)\n      isInitialized = true\n    } else {\n      if (!_mazeGenerator__WEBPACK_IMPORTED_MODULE_2__[\"default\"].isFinished()) {\n        _mazeGenerator__WEBPACK_IMPORTED_MODULE_2__[\"default\"].generate(scene)\n      } else {\n        if (!pathfinderInitialized) {\n          _pathfinder__WEBPACK_IMPORTED_MODULE_3__[\"default\"].initialize(tiles, sideLength, scene)\n          pathfinderInitialized = true;\n        }\n        if (!_pathfinder__WEBPACK_IMPORTED_MODULE_3__[\"default\"].isFinished()) {\n          _pathfinder__WEBPACK_IMPORTED_MODULE_3__[\"default\"].findPath()\n        } else {\n          _pathfinder__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getColoredTiles().forEach((coloredTile) => {\n            scene.remove(coloredTile)\n          })\n\n          tiles.forEach((tile) => {\n            scene.remove(tile.top)\n            scene.remove(tile.right)\n            scene.remove(tile.bottom)\n            scene.remove(tile.left)\n          })\n          isInitialized = false\n          pathfinderInitialized = false\n        }\n      }\n\n    }\n  }\n}\n\nanimate()\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/mazeGenerator.js":
/*!******************************!*\
  !*** ./src/mazeGenerator.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\n\nlet unvisited, stack, currentTile, tiles, sideLength\nconst getTile = (x, y, direction) => {\n  switch (direction) {\n    case 'top':\n      return tiles.find((c) => c.x === x && c.y === y + sideLength);\n    \n    case 'right':\n      return tiles.find((c) => c.x === x + sideLength && c.y === y);\n\n    case 'left':\n      return tiles.find((c) => c.x === x - sideLength && c.y === y)\n\n    case 'bottom':\n      return tiles.find((c) => c.x === x && c.y === y - sideLength)\n\n    default:\n      return null\n\n  }\n}\n\nconst getOpposite = (direction) => {\n  switch (direction) {\n    case 'top':\n      return 'bottom'\n\n    case 'left':\n      return 'right'\n\n    case 'right':\n      return 'left'\n\n    case 'bottom':\n      return 'top'\n  }\n}\n\nconst initialize = (newTiles, newSideLength) => {\n  tiles = newTiles\n  sideLength = newSideLength\n  unvisited = []\n  stack = []\n  tiles.forEach((c) => {\n    unvisited.push(c)\n  })\n  currentTile = tiles[0]\n  currentTile.state = 1\n}\n\nconst generate = (scene) => {\n  if (unvisited.length > 0) {\n    let options = ['top', 'left', 'bottom', 'right']\n    let neighborTile = null;\n    while (options.length !== 0 && neighborTile === null) {\n      const index = Math.floor(Math.random() * options.length);\n      const direction = options[index];\n      options = options.filter((o) => o !== direction);\n\n      neighborTile = getTile(currentTile.x, currentTile.y, direction);\n      if (neighborTile !== undefined && !(neighborTile.state === 1 || neighborTile.state === 2)) {\n        stack.push(currentTile)\n        scene.remove(currentTile[direction])\n        currentTile[direction] = null\n        scene.remove(neighborTile[getOpposite(direction)])\n        neighborTile[getOpposite(direction)] = null\n        neighborTile.state = 1\n        currentTile = neighborTile\n      } else {\n        neighborTile = null\n      }\n\n      if (options.length === 0) {\n        break;\n      }\n    }\n    if (neighborTile === null) {\n      currentTile.state = 2\n      currentTile = stack.pop()\n    }\n    unvisited = unvisited.filter((c) => !(c.state === 1 || c.state === 2))\n  }\n}\n\nconst isFinished = () => unvisited.length === 0\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ initialize, generate, isFinished });\n\n\n\n//# sourceURL=webpack:///./src/mazeGenerator.js?");

/***/ }),

/***/ "./src/pathfinder.js":
/*!***************************!*\
  !*** ./src/pathfinder.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\n\nlet tiles, coloredTiles, startingTile, endingTile, sideLength, scene\nlet closedSet, openSet, cameFrom, gScore, fScore\nlet finished\n\nconst heuristicCostEstimate = (tile1, tile2) => {\n  return (Math.abs(tile1.x - tile2.x) + Math.abs(tile1.y - tile2.y)) / sideLength\n}\n\nconst initialize = (newTiles, newSideLength, newScene) => {\n  scene = newScene\n  tiles = newTiles\n  console.log('tiles', tiles);\n  sideLength = newSideLength\n  coloredTiles = []\n  \n  startingTile = tiles[0]\n  endingTile = tiles[tiles.length - 1]\n\n  closedSet = []\n  openSet = [ startingTile ]\n  cameFrom = {}\n  gScore = {}\n  fScore = {}\n  finished = false\n\n  tiles.forEach((tile) => {\n    gScore[tile.id] = 999999\n    fScore[tile.id] = 999999\n  })\n\n  gScore[startingTile.id] = 0\n  fScore[startingTile.id] = heuristicCostEstimate(startingTile, endingTile)\n\n  console.log('g', gScore)\n  console.log('f', fScore)\n\n\n  colorTile(scene, startingTile, 0x00ff00)\n  colorTile(scene, endingTile, 0xff0000)\n}\n\nconst colorTile = (scene, tile, color) => {\n  if (!tile) {\n    return\n  }\n  if (tile.coloredTile) {\n    return\n  }\n  \n  const { x, y } = tile\n  var geometry = new three__WEBPACK_IMPORTED_MODULE_0__[\"BoxGeometry\"]( sideLength - 2, sideLength - 2, 0 )\n  geometry.translate(x + (Math.floor(sideLength / 2) * 10) / 10, y + (Math.floor(sideLength / 2) * 10) / 10, -1)\n  var material2 = new three__WEBPACK_IMPORTED_MODULE_0__[\"MeshBasicMaterial\"]( { color } )\n  var coloredTile = new three__WEBPACK_IMPORTED_MODULE_0__[\"Mesh\"]( geometry, material2 )\n  tile.coloredTile = coloredTile\n  scene.add( coloredTile )\n  coloredTiles.push(coloredTile)\n}\n\nconst getTileWithLowestFScore = () => {\n  let lowest = 999999;\n  let id = null;\n  openSet.forEach((tile) => {\n    if (lowest >= fScore[tile.id]) {\n      lowest = fScore[tile.id]\n      id = tile.id\n    }\n  });\n\n  return id\n}\n\nconst getTile = (x, y, direction) => {\n  switch (direction) {\n    case 'top':\n      return tiles.find((c) => c.x === x && c.y === y + sideLength);\n    \n    case 'right':\n      return tiles.find((c) => c.x === x + sideLength && c.y === y);\n\n    case 'left':\n      return tiles.find((c) => c.x === x - sideLength && c.y === y)\n\n    case 'bottom':\n      return tiles.find((c) => c.x === x && c.y === y - sideLength)\n\n    default:\n      return null\n\n  }\n}\n\nconst getOpposite = (direction) => {\n  switch (direction) {\n    case 'top':\n      return 'bottom'\n\n    case 'left':\n      return 'right'\n\n    case 'right':\n      return 'left'\n\n    case 'bottom':\n      return 'top'\n  }\n}\n\nconst getTileById = (tileId) => tiles.find((tile) => tile.id === tileId)\nconst getNeighbors = (tile) => {\n  let directions = []\n  let neighbors = []\n  if (!tile.top) {\n    directions.push('top')\n  }\n\n  if (!tile.left) {\n    directions.push('left')\n  }\n\n  if (!tile.right) {\n    directions.push('right')\n  }\n\n  if (!tile.bottom) {\n    directions.push('bottom')\n  }\n\n  directions.forEach((direction) => {\n    neighbors.push(getTile(tile.x, tile.y, direction))\n  })\n  \n  return neighbors\n}\n\nconst reconstructPath = (current) => {\n  const totalPath = current;\n}\n\nconst findPath = () => {\n  if (openSet.length > 0) {\n    const currentTileId = getTileWithLowestFScore()\n    if (currentTileId === endingTile.id) {\n      console.log('finito!')\n      finished = true\n    }\n    const currentTile = getTileById(currentTileId)\n    colorTile(scene, currentTile, 0xffffff)\n    currentTile.visited = true\n    console.log('current', currentTile)\n\n    openSet = openSet.filter((tile) => tile.id !== currentTileId)\n\n    closedSet.push(currentTileId)\n\n    const neighbors = getNeighbors(currentTile)\n    neighbors.forEach((neighbor) => {\n      if (neighbor.visited) {\n        return\n      }\n      if (closedSet.includes(neighbor)) {\n        console.log('dounf')\n        return\n      }\n\n      if (!openSet.includes(neighbor)) {\n        openSet.push(neighbor)\n      }\n\n      const tentativeScore = gScore[currentTileId] + 1\n      console.log('scor1', tentativeScore)\n      console.log('score', gScore[neighbor.id])\n      if (tentativeScore > gScore[neighbor.id]) {\n        console.log('whaat')\n        return\n      }\n\n      cameFrom[neighbor.id] = currentTileId\n      gScore[neighbor.id] = tentativeScore\n      fScore[neighbor.id] = gScore[neighbor.id] + heuristicCostEstimate(neighbor, endingTile)\n    })\n  }\n\n}\n\nconst isFinished = () => finished\n\nconst getColoredTiles = () => coloredTiles\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ initialize, findPath, isFinished, getColoredTiles });\n\n\n//# sourceURL=webpack:///./src/pathfinder.js?");

/***/ })

/******/ });
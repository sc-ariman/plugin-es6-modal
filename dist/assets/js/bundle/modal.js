/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports);
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports);
	    global.modal = mod.exports;
	  }
	})(this, function (exports) {
	  'use strict';
	
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	
	  function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	    }
	  }
	
	  var _createClass = function () {
	    function defineProperties(target, props) {
	      for (var i = 0; i < props.length; i++) {
	        var descriptor = props[i];
	        descriptor.enumerable = descriptor.enumerable || false;
	        descriptor.configurable = true;
	        if ("value" in descriptor) descriptor.writable = true;
	        Object.defineProperty(target, descriptor.key, descriptor);
	      }
	    }
	
	    return function (Constructor, protoProps, staticProps) {
	      if (protoProps) defineProperties(Constructor.prototype, protoProps);
	      if (staticProps) defineProperties(Constructor, staticProps);
	      return Constructor;
	    };
	  }();
	
	  var PEModal = function () {
	    function PEModal(option) {
	      _classCallCheck(this, PEModal);
	
	      if (option instanceof Object || Object.getPrototypeOf(option) === Object.prototype) {
	        var target = option.target;
	        var loadingElement = option.loadingElement;
	
	        if (target instanceof Object || Object.getPrototypeOf(target) === Object.prototype) {
	          // check target length
	          var targets = Array.from(target);
	          if (targets.length == 0 || targets == void 0) {
	            console.warn('pem target undifined');
	            return false;
	          }
	
	          // check loading element
	          var loadingImage = void 0;
	          if (loadingElement == void 0 || loadingElement == null || loadingElement == '') {
	            loadingImage = '<img src="/assets/images/loading.gif">';
	          } else {
	            loadingImage = loadingElement;
	          }
	
	          var _iteratorNormalCompletion = true;
	          var _didIteratorError = false;
	          var _iteratorError = undefined;
	
	          try {
	            for (var _iterator = targets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	              var _target = _step.value;
	
	              this.target = _target;
	              this.onClick(_target, loadingImage);
	            }
	          } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	              }
	            } finally {
	              if (_didIteratorError) {
	                throw _iteratorError;
	              }
	            }
	          }
	        }
	      }
	
	      this.nextFlug = true;
	      return this;
	    }
	
	    _createClass(PEModal, [{
	      key: 'onClick',
	      value: function onClick(target, loadingImage) {
	        var _this2 = this;
	
	        var modalFrame = '\n        <div class="pem" id="pem">\n          <div class="pem__wrap">\n            <div class="pem__body">\n              <div class="pem__content">\n                <div class="pem__close">\n                  <span>\xD7</span>\n                </div>\n                <div id="pem__contentInner" class="pem__contentInner">\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>';
	
	        target.addEventListener('click', function (event_1) {
	          var body = document.body;
	
	          new Promise(function (resolve, reject) {
	            var onBefore = _this2.onBefore;
	
	            checkPromise(onBefore, function () {
	              var nextFlug = _this2.nextFlug;
	
	              if (_this2.nextFlug) {
	                resolve(_this2.nextFlug);
	              } else {
	                reject(new Error('error message'));
	              }
	            });
	          }).then(function (nextFlug) {
	            return new Promise(function (resolve, reject) {
	              if (nextFlug) {
	                var onBeforeModal = _this2.onBeforeModal;
	
	                checkPromise(onBeforeModal, function () {
	                  // show loading
	                  _this2.loading().showLoading(loadingImage);
	
	                  if (_this2.nextFlug) {
	                    resolve(_this2.nextFlug);
	                  } else {
	                    reject(new Error('error message'));
	                  }
	                });
	              } else {
	                reject(new Error('error message'));
	              }
	            });
	          }).then(function (nextFlug) {
	            return new Promise(function (resolve, reject) {
	              if (nextFlug) {
	                // show modal
	                body.insertAdjacentHTML('beforeend', modalFrame);
	                body.classList.add('pem__open');
	
	                var onModal = _this2.onModal;
	                checkPromise(onModal, function () {
	                  if (_this2.nextFlug) {
	                    resolve(_this2.nextFlug);
	                  } else {
	                    reject(new Error('error message'));
	                  }
	                });
	              } else {
	                reject(new Error('error message'));
	              }
	            });
	          }).then(function (nextFlug) {
	            return new Promise(function (resolve, reject) {
	              if (nextFlug) {
	                (function () {
	                  // hide loading
	                  _this2.loading().hideLoading();
	
	                  var modal = document.getElementById('pem');
	                  setTimeout(function () {
	                    modal.classList.add('pem--activate');
	                  }, 1);
	
	                  // hide modal event
	                  modal.addEventListener('click', function (event_2) {
	                    var _this = event_2.currentTarget;
	                    _this.classList.remove('pem--activate');
	                    body.classList.remove('pem__open');
	
	                    setTimeout(function () {
	                      _this.parentNode.removeChild(_this);
	                      checkPromise(_this2.onModalAfter);
	                    }, 300);
	                  });
	
	                  // not hide pem__contentInner in click event
	                  var pem__contentInner = document.getElementById('pem__contentInner');
	                  pem__contentInner.addEventListener('click', function (event_3) {
	                    event_3.stopPropagation();
	                  });
	
	                  // modal scrolling on mobile devices
	                  body.addEventListener('touchmove', function (e) {
	                    var hasClass = body.classList.contains('pem__open');
	                    if (hasClass) {
	                      e.preventDefault();
	                    }
	                  }, { passive: false });
	                })();
	              } else {
	                reject(new Error('error message'));
	              }
	            });
	          }).catch(function (error) {
	            var modal = document.getElementById('pem');
	            modal.parentNode.removeChild(modal);
	            _this2.loading().hideLoading();
	            console.log(error);
	
	            _this2.onError();
	          });
	        });
	
	        /*
	         * checkPromise - Promiseの有無をチェック
	         *
	         * @params (onFunc) function - Function to check for promise
	         * @params (func) function - Function after checked
	         */
	        function checkPromise(onFunc, func) {
	          if (onFunc !== void 0) {
	            if (typeof onFunc.then === 'function') {
	              onFunc().then(function () {
	                if (func !== void 0) {
	                  return func();
	                }
	              });
	            } else {
	              return new Promise(function (resolve) {
	                resolve(onFunc());
	              }).then(function () {
	                if (func !== void 0) {
	                  return func();
	                }
	              });
	            }
	          } else {
	            if (func !== void 0) {
	              return func();
	            }
	          }
	        }
	      }
	    }, {
	      key: 'onBefore',
	      value: function onBefore() {}
	    }, {
	      key: 'onBeforeModal',
	      value: function onBeforeModal() {}
	    }, {
	      key: 'onModal',
	      value: function onModal() {}
	    }, {
	      key: 'onModalAfter',
	      value: function onModalAfter() {}
	    }, {
	      key: 'onError',
	      value: function onError() {
	        var _this3 = this;
	
	        return new Promise(function (resolve) {
	          if (typeof _this3.onError === 'function') {
	            resolve(_this3.onError());
	          } else {
	            resolve();
	          }
	        });
	      }
	    }, {
	      key: 'loading',
	      value: function loading() {
	        var obj = {
	          // show loading
	          showLoading: function showLoading(loadingImage) {
	            if (loadingImage == void 0 || loadingImage == null || loadingImage == '') {
	              loadingImage = '\n            <img src="/assets/images/loading.gif">';
	            }
	
	            var loadingElement = '\n          <div class="pemLoading" id="pemLoading">\n            <div class="pemLoading__wrapper">\n                <div class="pemLoading__body">\n                  ' + loadingImage + '\n                </div>\n              </div>\n          </div>';
	
	            document.body.insertAdjacentHTML('beforeend', loadingElement);
	            var loading = document.getElementById('pemLoading');
	            setTimeout(function () {
	              if (loading !== null) {
	                loading.classList.add('pemLoading--activate');
	              }
	            }, 1);
	          },
	
	          // hide loading
	          hideLoading: function hideLoading() {
	            var loading = document.getElementById('pemLoading');
	            if (loading !== null) {
	              setTimeout(function () {
	                loading.classList.remove('pemLoading--activate');
	                setTimeout(function () {
	                  loading.parentNode.removeChild(loading);
	                }, 300);
	              }, 300);
	            }
	          }
	        };
	
	        return obj;
	      }
	    }]);
	
	    return PEModal;
	  }();
	
	  exports.default = PEModal;
	
	  if (typeof window != 'undefined') {
	    !window.PEModal && (window.PEModal = PEModal);
	  }
	});

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTI3YzRkODEyZDlkNWEyMzNiY2IiLCJ3ZWJwYWNrOi8vLy4vanMvbW9kYWwuanMiXSwibmFtZXMiOlsiUEVNb2RhbCIsIm9wdGlvbiIsIk9iamVjdCIsImdldFByb3RvdHlwZU9mIiwicHJvdG90eXBlIiwidGFyZ2V0IiwibG9hZGluZ0VsZW1lbnQiLCJ0YXJnZXRzIiwiQXJyYXkiLCJmcm9tIiwibGVuZ3RoIiwiY29uc29sZSIsIndhcm4iLCJsb2FkaW5nSW1hZ2UiLCJvbkNsaWNrIiwibmV4dEZsdWciLCJtb2RhbEZyYW1lIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50XzEiLCJib2R5IiwiZG9jdW1lbnQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9uQmVmb3JlIiwiY2hlY2tQcm9taXNlIiwiRXJyb3IiLCJ0aGVuIiwib25CZWZvcmVNb2RhbCIsImxvYWRpbmciLCJzaG93TG9hZGluZyIsImluc2VydEFkamFjZW50SFRNTCIsImNsYXNzTGlzdCIsImFkZCIsIm9uTW9kYWwiLCJoaWRlTG9hZGluZyIsIm1vZGFsIiwiZ2V0RWxlbWVudEJ5SWQiLCJzZXRUaW1lb3V0IiwiZXZlbnRfMiIsIl90aGlzIiwiY3VycmVudFRhcmdldCIsInJlbW92ZSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsIm9uTW9kYWxBZnRlciIsInBlbV9fY29udGVudElubmVyIiwiZXZlbnRfMyIsInN0b3BQcm9wYWdhdGlvbiIsImUiLCJoYXNDbGFzcyIsImNvbnRhaW5zIiwicHJldmVudERlZmF1bHQiLCJwYXNzaXZlIiwiY2F0Y2giLCJlcnJvciIsImxvZyIsIm9uRXJyb3IiLCJvbkZ1bmMiLCJmdW5jIiwib2JqIiwid2luZG93Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFD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a0JBQWQsQ0FBaUMsV0FBakMsRUFBOEN6QixjQUE5QztBQUNBLGlCQUFJdUIsVUFBVVQsU0FBU2lCLGNBQVQsQ0FBd0IsWUFBeEIsQ0FBZDtBQUNBQyx3QkFBVyxZQUFNO0FBQ2IsbUJBQUdULFlBQVksSUFBZixFQUFxQjtBQUNuQkEseUJBQVFHLFNBQVIsQ0FBa0JDLEdBQWxCLENBQXNCLHNCQUF0QjtBQUNEO0FBQ0YsY0FKSCxFQUlLLENBSkw7QUFLRCxZQXhCTzs7QUEwQlI7QUFDQUUsd0JBQWEsdUJBQU07QUFDakIsaUJBQUlOLFVBQVVULFNBQVNpQixjQUFULENBQXdCLFlBQXhCLENBQWQ7QUFDQSxpQkFBR1IsWUFBWSxJQUFmLEVBQXFCO0FBQ25CUywwQkFBVyxZQUFNO0FBQ2ZULHlCQUFRRyxTQUFSLENBQWtCVSxNQUFsQixDQUF5QixzQkFBekI7QUFDQUosNEJBQVcsWUFBTTtBQUNmVCwyQkFBUWMsVUFBUixDQUFtQkMsV0FBbkIsQ0FBK0JmLE9BQS9CO0FBQ0Qsa0JBRkQsRUFFRyxHQUZIO0FBR0QsZ0JBTEQsRUFLRyxHQUxIO0FBTUQ7QUFDRjtBQXJDTyxVQUFWOztBQXdDQSxnQkFBTytCLEdBQVA7QUFDRDs7Ozs7O3FCQUdZNUQsTzs7QUFDZixPQUFJLE9BQU82RCxNQUFQLElBQWlCLFdBQXJCLEVBQWtDO0FBQ2hDLE1BQUNBLE9BQU83RCxPQUFSLEtBQW9CNkQsT0FBTzdELE9BQVAsR0FBaUJBLE9BQXJDO0FBQ0QiLCJmaWxlIjoibW9kYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlMjdjNGQ4MTJkOWQ1YTIzM2JjYiIsIi8qKlxuUGx1Z2luIEVTNiBNb2RhbFxuXG5Db3B5cmlnaHQgKGMpIDIwMTdcblxuVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5odHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4qL1xuXG5jbGFzcyBQRU1vZGFsIHtcbiAgY29uc3RydWN0b3Iob3B0aW9uKSB7XG4gICAgaWYob3B0aW9uIGluc3RhbmNlb2YgT2JqZWN0IHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvcHRpb24pID09PSBPYmplY3QucHJvdG90eXBlKSB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBvcHRpb24udGFyZ2V0O1xuICAgICAgY29uc3QgbG9hZGluZ0VsZW1lbnQgPSBvcHRpb24ubG9hZGluZ0VsZW1lbnQ7XG5cbiAgICAgIGlmKHRhcmdldCBpbnN0YW5jZW9mIE9iamVjdCB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGFyZ2V0KSA9PT0gT2JqZWN0LnByb3RvdHlwZSkge1xuICAgICAgICAvLyBjaGVjayB0YXJnZXQgbGVuZ3RoXG4gICAgICAgIGxldCB0YXJnZXRzID0gQXJyYXkuZnJvbSh0YXJnZXQpO1xuICAgICAgICBpZih0YXJnZXRzLmxlbmd0aCA9PSAwIHx8IHRhcmdldHMgPT0gdm9pZCAwKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdwZW0gdGFyZ2V0IHVuZGlmaW5lZCcpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIGxvYWRpbmcgZWxlbWVudFxuICAgICAgICBsZXQgbG9hZGluZ0ltYWdlO1xuICAgICAgICBpZihsb2FkaW5nRWxlbWVudCA9PSB2b2lkIDAgfHwgbG9hZGluZ0VsZW1lbnQgPT0gbnVsbCB8fCBsb2FkaW5nRWxlbWVudCA9PSAnJykge1xuICAgICAgICAgIGxvYWRpbmdJbWFnZSA9IGA8aW1nIHNyYz1cIi9hc3NldHMvaW1hZ2VzL2xvYWRpbmcuZ2lmXCI+YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2FkaW5nSW1hZ2UgPSBsb2FkaW5nRWxlbWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IHRhcmdldCBvZiB0YXJnZXRzKSB7XG4gICAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgICAgdGhpcy5vbkNsaWNrKHRhcmdldCwgbG9hZGluZ0ltYWdlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubmV4dEZsdWcgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgb25DbGljayh0YXJnZXQsIGxvYWRpbmdJbWFnZSkge1xuICAgIGNvbnN0IG1vZGFsRnJhbWUgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwZW1cIiBpZD1cInBlbVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwZW1fX3dyYXBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwZW1fX2JvZHlcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBlbV9fY29udGVudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwZW1fX2Nsb3NlXCI+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj7Dlzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwicGVtX19jb250ZW50SW5uZXJcIiBjbGFzcz1cInBlbV9fY29udGVudElubmVyXCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PmA7XG5cbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnRfMSkgPT4ge1xuICAgICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG5cbiAgICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgbGV0IG9uQmVmb3JlID0gdGhpcy5vbkJlZm9yZTtcblxuICAgICAgICBjaGVja1Byb21pc2Uob25CZWZvcmUsICgpID0+IHtcbiAgICAgICAgICBsZXQgbmV4dEZsdWcgPSB0aGlzLm5leHRGbHVnO1xuXG4gICAgICAgICAgaWYgKHRoaXMubmV4dEZsdWcpIHtcbiAgICAgICAgICAgIHJlc29sdmUodGhpcy5uZXh0Rmx1Zyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2Vycm9yIG1lc3NhZ2UnKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAudGhlbigobmV4dEZsdWcpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBpZiAobmV4dEZsdWcpIHtcbiAgICAgICAgICAgIGxldCBvbkJlZm9yZU1vZGFsID0gdGhpcy5vbkJlZm9yZU1vZGFsO1xuXG4gICAgICAgICAgICBjaGVja1Byb21pc2Uob25CZWZvcmVNb2RhbCwgKCkgPT4ge1xuICAgICAgICAgICAgICAvLyBzaG93IGxvYWRpbmdcbiAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nKCkuc2hvd0xvYWRpbmcobG9hZGluZ0ltYWdlKTtcblxuICAgICAgICAgICAgICBpZiAodGhpcy5uZXh0Rmx1Zykge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5uZXh0Rmx1Zyk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZXJyb3IgbWVzc2FnZScpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2Vycm9yIG1lc3NhZ2UnKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAudGhlbigobmV4dEZsdWcpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBpZiAobmV4dEZsdWcpIHtcbiAgICAgICAgICAgIC8vIHNob3cgbW9kYWxcbiAgICAgICAgICAgIGJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBtb2RhbEZyYW1lKTtcbiAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgncGVtX19vcGVuJyk7XG5cbiAgICAgICAgICAgIGxldCBvbk1vZGFsID0gdGhpcy5vbk1vZGFsO1xuICAgICAgICAgICAgY2hlY2tQcm9taXNlKG9uTW9kYWwsICgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMubmV4dEZsdWcpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMubmV4dEZsdWcpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2Vycm9yIG1lc3NhZ2UnKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2Vycm9yIG1lc3NhZ2UnKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAudGhlbigobmV4dEZsdWcpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBpZiAobmV4dEZsdWcpIHtcbiAgICAgICAgICAgIC8vIGhpZGUgbG9hZGluZ1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nKCkuaGlkZUxvYWRpbmcoKTtcblxuICAgICAgICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGVtJyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgncGVtLS1hY3RpdmF0ZScpO1xuICAgICAgICAgICAgfSwgMSk7XG5cbiAgICAgICAgICAgIC8vIGhpZGUgbW9kYWwgZXZlbnRcbiAgICAgICAgICAgIG1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50XzIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBfdGhpcyA9IGV2ZW50XzIuY3VycmVudFRhcmdldDtcbiAgICAgICAgICAgICAgICBfdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdwZW0tLWFjdGl2YXRlJyk7XG4gICAgICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdwZW1fX29wZW4nKTtcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgX3RoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChfdGhpcyk7XG4gICAgICAgICAgICAgICAgICBjaGVja1Byb21pc2UodGhpcy5vbk1vZGFsQWZ0ZXIpO1xuICAgICAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIG5vdCBoaWRlIHBlbV9fY29udGVudElubmVyIGluIGNsaWNrIGV2ZW50XG4gICAgICAgICAgICBjb25zdCBwZW1fX2NvbnRlbnRJbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwZW1fX2NvbnRlbnRJbm5lcicpO1xuICAgICAgICAgICAgcGVtX19jb250ZW50SW5uZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnRfMykgPT4ge1xuICAgICAgICAgICAgICBldmVudF8zLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIG1vZGFsIHNjcm9sbGluZyBvbiBtb2JpbGUgZGV2aWNlc1xuICAgICAgICAgICAgYm9keS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCAoZSkgPT4ge1xuICAgICAgICAgICAgICBsZXQgaGFzQ2xhc3MgPSBib2R5LmNsYXNzTGlzdC5jb250YWlucygncGVtX19vcGVuJyk7XG4gICAgICAgICAgICAgIGlmKGhhc0NsYXNzKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LHtwYXNzaXZlOiBmYWxzZX0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdlcnJvciBtZXNzYWdlJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBsZXQgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGVtJyk7XG4gICAgICAgIG1vZGFsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobW9kYWwpO1xuICAgICAgICB0aGlzLmxvYWRpbmcoKS5oaWRlTG9hZGluZygpO1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG5cbiAgICAgICAgdGhpcy5vbkVycm9yKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8qXG4gICAgICogY2hlY2tQcm9taXNlIC0gUHJvbWlzZeOBruacieeEoeOCkuODgeOCp+ODg+OCr1xuICAgICAqXG4gICAgICogQHBhcmFtcyAob25GdW5jKSBmdW5jdGlvbiAtIEZ1bmN0aW9uIHRvIGNoZWNrIGZvciBwcm9taXNlXG4gICAgICogQHBhcmFtcyAoZnVuYykgZnVuY3Rpb24gLSBGdW5jdGlvbiBhZnRlciBjaGVja2VkXG4gICAgICovXG4gICAgZnVuY3Rpb24gY2hlY2tQcm9taXNlKG9uRnVuYywgZnVuYykge1xuICAgICAgaWYob25GdW5jICE9PSB2b2lkIDApIHtcbiAgICAgICAgaWYodHlwZW9mIG9uRnVuYy50aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgb25GdW5jKClcbiAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBpZihmdW5jICE9PSB2b2lkIDApe1xuICAgICAgICAgICAgICByZXR1cm4gZnVuYygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShvbkZ1bmMoKSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBpZihmdW5jICE9PSB2b2lkIDApe1xuICAgICAgICAgICAgICByZXR1cm4gZnVuYygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZihmdW5jICE9PSB2b2lkIDApe1xuICAgICAgICAgIHJldHVybiBmdW5jKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkJlZm9yZSgpIHt9XG5cbiAgb25CZWZvcmVNb2RhbCgpIHt9XG5cbiAgb25Nb2RhbCgpIHt9XG5cbiAgb25Nb2RhbEFmdGVyKCkge31cblxuICBvbkVycm9yKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgaWYodHlwZW9mIHRoaXMub25FcnJvciA9PT0gJ2Z1bmN0aW9uJyl7XG4gICAgICAgIHJlc29sdmUodGhpcy5vbkVycm9yKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbG9hZGluZygpIHtcbiAgICBsZXQgb2JqID0ge1xuICAgICAgLy8gc2hvdyBsb2FkaW5nXG4gICAgICBzaG93TG9hZGluZzogKGxvYWRpbmdJbWFnZSkgPT4ge1xuICAgICAgICBpZihsb2FkaW5nSW1hZ2UgPT0gdm9pZCAwIHx8IGxvYWRpbmdJbWFnZSA9PSBudWxsIHx8IGxvYWRpbmdJbWFnZSA9PSAnJykge1xuICAgICAgICAgIGxvYWRpbmdJbWFnZSA9IGBcbiAgICAgICAgICAgIDxpbWcgc3JjPVwiL2Fzc2V0cy9pbWFnZXMvbG9hZGluZy5naWZcIj5gO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbG9hZGluZ0VsZW1lbnQgPSBgXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInBlbUxvYWRpbmdcIiBpZD1cInBlbUxvYWRpbmdcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwZW1Mb2FkaW5nX193cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBlbUxvYWRpbmdfX2JvZHlcIj5cbiAgICAgICAgICAgICAgICAgICR7bG9hZGluZ0ltYWdlfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5gO1xuXG4gICAgICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBsb2FkaW5nRWxlbWVudCk7XG4gICAgICAgIGxldCBsb2FkaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BlbUxvYWRpbmcnKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZihsb2FkaW5nICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIGxvYWRpbmcuY2xhc3NMaXN0LmFkZCgncGVtTG9hZGluZy0tYWN0aXZhdGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCAxKTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIGhpZGUgbG9hZGluZ1xuICAgICAgaGlkZUxvYWRpbmc6ICgpID0+IHtcbiAgICAgICAgbGV0IGxvYWRpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGVtTG9hZGluZycpO1xuICAgICAgICBpZihsb2FkaW5nICE9PSBudWxsKSB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBsb2FkaW5nLmNsYXNzTGlzdC5yZW1vdmUoJ3BlbUxvYWRpbmctLWFjdGl2YXRlJyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgbG9hZGluZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGxvYWRpbmcpO1xuICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgICB9LCAzMDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBvYmo7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUEVNb2RhbDtcbmlmICh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnKSB7XG4gICF3aW5kb3cuUEVNb2RhbCAmJiAod2luZG93LlBFTW9kYWwgPSBQRU1vZGFsKTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9tb2RhbC5qcyJdLCJzb3VyY2VSb290IjoiIn0=
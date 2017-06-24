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
	
	      return this;
	    }
	
	    _createClass(PEModal, [{
	      key: 'onClick',
	      value: function onClick(target, loadingImage) {
	        var _this2 = this;
	
	        var modalFrame = '\n        <div class="pem" id="pem" role="dialog">\n          <div class="pem__wrap">\n            <div class="pem__body">\n              <div class="pem__content">\n                <div class="pem__close">\n                  <span>\xD7</span>\n                </div>\n                <div id="pem__contentInner" class="pem__contentInner">\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>';
	
	        target.addEventListener('click', function (event_1) {
	          var body = document.body;
	
	          new Promise(function (resolve, reject) {
	            var onBefore = _this2.onBefore;
	
	            checkPromise(onBefore, function (result) {
	              if (result) {
	                resolve(result);
	              } else {
	                reject(new Error('error message'));
	              }
	            });
	          }).then(function (nextFlug) {
	            return new Promise(function (resolve, reject) {
	              if (nextFlug) {
	                var onBeforeModal = _this2.onBeforeModal;
	
	                checkPromise(onBeforeModal, function (result) {
	                  // show loading
	                  _this2.loading().showLoading(loadingImage);
	
	                  if (result) {
	                    resolve(result);
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
	                checkPromise(onModal, function (result) {
	                  if (result) {
	                    resolve(result);
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
	            if (modal !== null) {
	              modal.parentNode.removeChild(modal);
	            }
	
	            _this2.loading().hideLoading();
	          });
	        });
	
	        /*
	         * checkPromise - Promiseの有無をチェック
	         *
	         * @params (modalFunction) function - Function to check for promise
	         * @params (func) function - Function after checked
	         */
	        function checkPromise(modalFunction, func) {
	          if (modalFunction !== void 0) {
	            if (typeof modalFunction.then === 'function') {
	              modalFunction().then(function (result) {
	                if (func == void 0) {
	                  return func(true);
	                } else {
	                  return func(result);
	                }
	              }).catch(function () {
	                return false;
	              });
	            } else {
	              return new Promise(function (resolve, reject) {
	                resolve(modalFunction());
	              }).then(function (result) {
	                if (typeof result === 'boolean') {
	                  if (func == void 0) {
	                    return func(true);
	                  } else {
	                    return func(result);
	                  }
	                } else {
	                  return func(true);
	                }
	              }).catch(function () {
	                return false;
	              });
	            }
	          } else {
	            if (func !== void 0) {
	              return false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDAyYTdhMTg3YzAxNTYxZTRmNzYiLCJ3ZWJwYWNrOi8vLy4vanMvbW9kYWwuanMiXSwibmFtZXMiOlsiUEVNb2RhbCIsIm9wdGlvbiIsIk9iamVjdCIsImdldFByb3RvdHlwZU9mIiwicHJvdG90eXBlIiwidGFyZ2V0IiwibG9hZGluZ0VsZW1lbnQiLCJ0YXJnZXRzIiwiQXJyYXkiLCJmcm9tIiwibGVuZ3RoIiwiY29uc29sZSIsIndhcm4iLCJsb2FkaW5nSW1hZ2UiLCJvbkNsaWNrIiwibW9kYWxGcmFtZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudF8xIiwiYm9keSIsImRvY3VtZW50IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJvbkJlZm9yZSIsImNoZWNrUHJvbWlzZSIsInJlc3VsdCIsIkVycm9yIiwidGhlbiIsIm5leHRGbHVnIiwib25CZWZvcmVNb2RhbCIsImxvYWRpbmciLCJzaG93TG9hZGluZyIsImluc2VydEFkamFjZW50SFRNTCIsImNsYXNzTGlzdCIsImFkZCIsIm9uTW9kYWwiLCJoaWRlTG9hZGluZyIsIm1vZGFsIiwiZ2V0RWxlbWVudEJ5SWQiLCJzZXRUaW1lb3V0IiwiZXZlbnRfMiIsIl90aGlzIiwiY3VycmVudFRhcmdldCIsInJlbW92ZSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsIm9uTW9kYWxBZnRlciIsInBlbV9fY29udGVudElubmVyIiwiZXZlbnRfMyIsInN0b3BQcm9wYWdhdGlvbiIsImUiLCJoYXNDbGFzcyIsImNvbnRhaW5zIiwicHJldmVudERlZmF1bHQiLCJwYXNzaXZlIiwiY2F0Y2giLCJlcnJvciIsIm1vZGFsRnVuY3Rpb24iLCJmdW5jIiwib2JqIiwid2luZG93Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFD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QUFyRSxFQUF5RTtBQUN2RUE7QUFFRDs7QUFFRCxpQkFBTVAsNkxBSU1PLFlBSk4scUVBQU47O0FBU0FNLHNCQUFTRCxJQUFULENBQWNjLGtCQUFkLENBQWlDLFdBQWpDLEVBQThDMUIsY0FBOUM7QUFDQSxpQkFBSXdCLFVBQVVYLFNBQVNtQixjQUFULENBQXdCLFlBQXhCLENBQWQ7QUFDQUMsd0JBQVcsWUFBTTtBQUNiLG1CQUFHVCxZQUFZLElBQWYsRUFBcUI7QUFDbkJBLHlCQUFRRyxTQUFSLENBQWtCQyxHQUFsQixDQUFzQixzQkFBdEI7QUFDRDtBQUNGLGNBSkgsRUFJSyxDQUpMO0FBS0QsWUF4Qk87O0FBMEJSO0FBQ0FFLHdCQUFhLHVCQUFNO0FBQ2pCLGlCQUFJTixVQUFVWCxTQUFTbUIsY0FBVCxDQUF3QixZQUF4QixDQUFkO0FBQ0EsaUJBQUdSLFlBQVksSUFBZixFQUFxQjtBQUNuQlMsMEJBQVcsWUFBTTtBQUNmVCx5QkFBUUcsU0FBUixDQUFrQlUsTUFBbEIsQ0FBeUIsc0JBQXpCO0FBQ0FKLDRCQUFXLFlBQU07QUFDZlQsMkJBQVFjLFVBQVIsQ0FBbUJDLFdBQW5CLENBQStCZixPQUEvQjtBQUNELGtCQUZELEVBRUcsR0FGSDtBQUdELGdCQUxELEVBS0csR0FMSDtBQU1EO0FBQ0Y7QUFyQ08sVUFBVjs7QUF3Q0EsZ0JBQU82QixHQUFQO0FBQ0Q7Ozs7OztxQkFHWTNELE87O0FBQ2YsT0FBSSxPQUFPNEQsTUFBUCxJQUFpQixXQUFyQixFQUFrQztBQUNoQyxNQUFDQSxPQUFPNUQsT0FBUixLQUFvQjRELE9BQU81RCxPQUFQLEdBQWlCQSxPQUFyQztBQUNEIiwiZmlsZSI6Im1vZGFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMDAyYTdhMTg3YzAxNTYxZTRmNzYiLCIvKipcblBsdWdpbiBFUzYgTW9kYWxcblxuQ29weXJpZ2h0IChjKSAyMDE3XG5cblRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuKi9cblxuY2xhc3MgUEVNb2RhbCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbikge1xuICAgIGlmKG9wdGlvbiBpbnN0YW5jZW9mIE9iamVjdCB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob3B0aW9uKSA9PT0gT2JqZWN0LnByb3RvdHlwZSkge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gb3B0aW9uLnRhcmdldDtcbiAgICAgIGNvbnN0IGxvYWRpbmdFbGVtZW50ID0gb3B0aW9uLmxvYWRpbmdFbGVtZW50O1xuXG4gICAgICBpZih0YXJnZXQgaW5zdGFuY2VvZiBPYmplY3QgfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKHRhcmdldCkgPT09IE9iamVjdC5wcm90b3R5cGUpIHtcbiAgICAgICAgLy8gY2hlY2sgdGFyZ2V0IGxlbmd0aFxuICAgICAgICBsZXQgdGFyZ2V0cyA9IEFycmF5LmZyb20odGFyZ2V0KTtcbiAgICAgICAgaWYodGFyZ2V0cy5sZW5ndGggPT0gMCB8fCB0YXJnZXRzID09IHZvaWQgMCkge1xuICAgICAgICAgIGNvbnNvbGUud2FybigncGVtIHRhcmdldCB1bmRpZmluZWQnKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBsb2FkaW5nIGVsZW1lbnRcbiAgICAgICAgbGV0IGxvYWRpbmdJbWFnZTtcbiAgICAgICAgaWYobG9hZGluZ0VsZW1lbnQgPT0gdm9pZCAwIHx8IGxvYWRpbmdFbGVtZW50ID09IG51bGwgfHwgbG9hZGluZ0VsZW1lbnQgPT0gJycpIHtcbiAgICAgICAgICBsb2FkaW5nSW1hZ2UgPSBgPGltZyBzcmM9XCIvYXNzZXRzL2ltYWdlcy9sb2FkaW5nLmdpZlwiPmA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9hZGluZ0ltYWdlID0gbG9hZGluZ0VsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCB0YXJnZXQgb2YgdGFyZ2V0cykge1xuICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICAgIHRoaXMub25DbGljayh0YXJnZXQsIGxvYWRpbmdJbWFnZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG9uQ2xpY2sodGFyZ2V0LCBsb2FkaW5nSW1hZ2UpIHtcbiAgICBjb25zdCBtb2RhbEZyYW1lID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwicGVtXCIgaWQ9XCJwZW1cIiByb2xlPVwiZGlhbG9nXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInBlbV9fd3JhcFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBlbV9fYm9keVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGVtX19jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBlbV9fY2xvc2VcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPsOXPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJwZW1fX2NvbnRlbnRJbm5lclwiIGNsYXNzPVwicGVtX19jb250ZW50SW5uZXJcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+YDtcblxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudF8xKSA9PiB7XG4gICAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcblxuICAgICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBsZXQgb25CZWZvcmUgPSB0aGlzLm9uQmVmb3JlO1xuXG4gICAgICAgIGNoZWNrUHJvbWlzZShvbkJlZm9yZSwgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZXJyb3IgbWVzc2FnZScpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChuZXh0Rmx1ZykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIGlmIChuZXh0Rmx1Zykge1xuICAgICAgICAgICAgbGV0IG9uQmVmb3JlTW9kYWwgPSB0aGlzLm9uQmVmb3JlTW9kYWw7XG5cbiAgICAgICAgICAgIGNoZWNrUHJvbWlzZShvbkJlZm9yZU1vZGFsLCAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgIC8vIHNob3cgbG9hZGluZ1xuICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcoKS5zaG93TG9hZGluZyhsb2FkaW5nSW1hZ2UpO1xuXG4gICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZXJyb3IgbWVzc2FnZScpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2Vycm9yIG1lc3NhZ2UnKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAudGhlbigobmV4dEZsdWcpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBpZiAobmV4dEZsdWcpIHtcbiAgICAgICAgICAgIC8vIHNob3cgbW9kYWxcbiAgICAgICAgICAgIGJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBtb2RhbEZyYW1lKTtcbiAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgncGVtX19vcGVuJyk7XG5cbiAgICAgICAgICAgIGxldCBvbk1vZGFsID0gdGhpcy5vbk1vZGFsO1xuICAgICAgICAgICAgY2hlY2tQcm9taXNlKG9uTW9kYWwsIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdlcnJvciBtZXNzYWdlJykpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdlcnJvciBtZXNzYWdlJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKG5leHRGbHVnKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgaWYgKG5leHRGbHVnKSB7XG4gICAgICAgICAgICAvLyBoaWRlIGxvYWRpbmdcbiAgICAgICAgICAgIHRoaXMubG9hZGluZygpLmhpZGVMb2FkaW5nKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BlbScpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ3BlbS0tYWN0aXZhdGUnKTtcbiAgICAgICAgICAgIH0sIDEpO1xuXG4gICAgICAgICAgICAvLyBoaWRlIG1vZGFsIGV2ZW50XG4gICAgICAgICAgICBtb2RhbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudF8yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgX3RoaXMgPSBldmVudF8yLmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgICAgICAgICAgX3RoaXMuY2xhc3NMaXN0LnJlbW92ZSgncGVtLS1hY3RpdmF0ZScpO1xuICAgICAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncGVtX19vcGVuJyk7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIF90aGlzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoX3RoaXMpO1xuICAgICAgICAgICAgICAgICAgY2hlY2tQcm9taXNlKHRoaXMub25Nb2RhbEFmdGVyKTtcbiAgICAgICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBub3QgaGlkZSBwZW1fX2NvbnRlbnRJbm5lciBpbiBjbGljayBldmVudFxuICAgICAgICAgICAgY29uc3QgcGVtX19jb250ZW50SW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGVtX19jb250ZW50SW5uZXInKTtcbiAgICAgICAgICAgIHBlbV9fY29udGVudElubmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50XzMpID0+IHtcbiAgICAgICAgICAgICAgZXZlbnRfMy5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBtb2RhbCBzY3JvbGxpbmcgb24gbW9iaWxlIGRldmljZXNcbiAgICAgICAgICAgIGJvZHkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgbGV0IGhhc0NsYXNzID0gYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ3BlbV9fb3BlbicpO1xuICAgICAgICAgICAgICBpZihoYXNDbGFzcykge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSx7cGFzc2l2ZTogZmFsc2V9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZXJyb3IgbWVzc2FnZScpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgbGV0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BlbScpO1xuICAgICAgICBpZihtb2RhbCAhPT0gbnVsbCkge1xuICAgICAgICAgIG1vZGFsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobW9kYWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2FkaW5nKCkuaGlkZUxvYWRpbmcoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLypcbiAgICAgKiBjaGVja1Byb21pc2UgLSBQcm9taXNl44Gu5pyJ54Sh44KS44OB44Kn44OD44KvXG4gICAgICpcbiAgICAgKiBAcGFyYW1zIChtb2RhbEZ1bmN0aW9uKSBmdW5jdGlvbiAtIEZ1bmN0aW9uIHRvIGNoZWNrIGZvciBwcm9taXNlXG4gICAgICogQHBhcmFtcyAoZnVuYykgZnVuY3Rpb24gLSBGdW5jdGlvbiBhZnRlciBjaGVja2VkXG4gICAgICovXG4gICAgZnVuY3Rpb24gY2hlY2tQcm9taXNlKG1vZGFsRnVuY3Rpb24sIGZ1bmMpIHtcbiAgICAgIGlmKG1vZGFsRnVuY3Rpb24gIT09IHZvaWQgMCkge1xuICAgICAgICBpZih0eXBlb2YgbW9kYWxGdW5jdGlvbi50aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgbW9kYWxGdW5jdGlvbigpXG4gICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgaWYoZnVuYyA9PSB2b2lkIDApe1xuICAgICAgICAgICAgICByZXR1cm4gZnVuYyh0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jKHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKG1vZGFsRnVuY3Rpb24oKSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgIGlmKGZ1bmMgPT0gdm9pZCAwKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuYyh0cnVlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuYyhyZXN1bHQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gZnVuYyh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmKGZ1bmMgIT09IHZvaWQgMCl7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25CZWZvcmUoKSB7fVxuXG4gIG9uQmVmb3JlTW9kYWwoKSB7fVxuXG4gIG9uTW9kYWwoKSB7fVxuXG4gIG9uTW9kYWxBZnRlcigpIHt9XG5cbiAgbG9hZGluZygpIHtcbiAgICBsZXQgb2JqID0ge1xuICAgICAgLy8gc2hvdyBsb2FkaW5nXG4gICAgICBzaG93TG9hZGluZzogKGxvYWRpbmdJbWFnZSkgPT4ge1xuICAgICAgICBpZihsb2FkaW5nSW1hZ2UgPT0gdm9pZCAwIHx8IGxvYWRpbmdJbWFnZSA9PSBudWxsIHx8IGxvYWRpbmdJbWFnZSA9PSAnJykge1xuICAgICAgICAgIGxvYWRpbmdJbWFnZSA9IGBcbiAgICAgICAgICAgIDxpbWcgc3JjPVwiL2Fzc2V0cy9pbWFnZXMvbG9hZGluZy5naWZcIj5gO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbG9hZGluZ0VsZW1lbnQgPSBgXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInBlbUxvYWRpbmdcIiBpZD1cInBlbUxvYWRpbmdcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwZW1Mb2FkaW5nX193cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBlbUxvYWRpbmdfX2JvZHlcIj5cbiAgICAgICAgICAgICAgICAgICR7bG9hZGluZ0ltYWdlfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5gO1xuXG4gICAgICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBsb2FkaW5nRWxlbWVudCk7XG4gICAgICAgIGxldCBsb2FkaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BlbUxvYWRpbmcnKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZihsb2FkaW5nICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIGxvYWRpbmcuY2xhc3NMaXN0LmFkZCgncGVtTG9hZGluZy0tYWN0aXZhdGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCAxKTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIGhpZGUgbG9hZGluZ1xuICAgICAgaGlkZUxvYWRpbmc6ICgpID0+IHtcbiAgICAgICAgbGV0IGxvYWRpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGVtTG9hZGluZycpO1xuICAgICAgICBpZihsb2FkaW5nICE9PSBudWxsKSB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBsb2FkaW5nLmNsYXNzTGlzdC5yZW1vdmUoJ3BlbUxvYWRpbmctLWFjdGl2YXRlJyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgbG9hZGluZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGxvYWRpbmcpO1xuICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgICB9LCAzMDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBvYmo7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUEVNb2RhbDtcbmlmICh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnKSB7XG4gICF3aW5kb3cuUEVNb2RhbCAmJiAod2luZG93LlBFTW9kYWwgPSBQRU1vZGFsKTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9tb2RhbC5qcyJdLCJzb3VyY2VSb290IjoiIn0=
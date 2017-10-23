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
	    function PEModal(options) {
	      _classCallCheck(this, PEModal);
	
	      var defaults = {
	        button: null,
	        modalElement: null,
	        insertElement: null,
	        loadingElement: null,
	        loadingIcon: null,
	        target: null,
	        onBefore: null,
	        onBeforeModal: null,
	        onModal: null,
	        onCloseAfter: null
	      };
	
	      this.init(defaults, options);
	    }
	
	    _createClass(PEModal, [{
	      key: 'init',
	      value: function init(defaults, options) {
	        if (options instanceof Object || Object.getPrototypeOf(options) === Object.prototype) {
	          this.options = defaults;
	
	          // check exists same key
	          for (var key in options) {
	            if (options.hasOwnProperty(key)) {
	              var dest = Object.getOwnPropertyDescriptor(options, key);
	              if (dest.enumerable) {
	                this.options[key] = options[key];
	              }
	            }
	          }
	
	          this.checkOptions();
	        } else {
	          return false;
	        }
	      }
	    }, {
	      key: 'checkOptions',
	      value: function checkOptions() {
	        // check button
	        var button = this.options['button'];
	        if (button == null && button instanceof Object !== false) {
	          console.warn('pem button undifined!');
	          return false;
	        }
	
	        // check target
	        var target = this.options['target'];
	        if (target instanceof Object == false) {
	          this.options['target'] = null;
	        } else if (this.options['target'].length != void 0) {
	          // if jqurty object
	          this.options['target'] = target[0];
	        }
	
	        // check loading icon
	        this.options['loadingIcon'] = this.hasLoadingIcon(this.options['loadingIcon']);
	
	        // check loading element
	        this.options['loadingElement'] = this.hasLoadingElement(this.options['loadingElement'], this.options['loadingIcon']);
	
	        // check modal element
	        this.options['modalElement'] = this.hasModalElement(this.options['modalElement'], this.options['target']);
	
	        // check modal insert Element
	        this.options['insertElement'] = this.hasInsertElement(this.options['insertElement']);
	
	        // check function
	        var onBefore = this.options['onBefore'];
	        this.onBefore = typeof onBefore == 'function' ? onBefore : function () {};
	
	        var onBeforeModal = this.options['onBeforeModal'];
	        this.onBeforeModal = typeof onBeforeModal == 'function' ? onBeforeModal : function () {};
	
	        var onModal = this.options['onModal'];
	        this.onModal = typeof onModal == 'function' ? onModal : function () {};
	
	        var onCloseAfter = this.options['onCloseAfter'];
	        this.onCloseAfter = typeof onCloseAfter == 'function' ? onCloseAfter : function () {};
	
	        this.onIgnite();
	      }
	    }, {
	      key: 'onIgnite',
	      value: function onIgnite() {
	        var _this = this;
	
	        var body = document.body;
	        var target = this.options['target'];
	        var loadingElement = this.options['loadingElement'];
	        var modalElement = this.options['modalElement'];
	        var insertElement = this.options['insertElement'];
	        var isTarget = modalElement == null && target !== null;
	
	        new Promise(function (resolve, reject) {
	          checkPromise(_this.onBefore, function (result) {
	            if (result) {
	              resolve(result);
	            } else {
	              reject(new Error('error message'));
	            }
	          });
	        }).then(function (nextFlug) {
	          return new Promise(function (resolve, reject) {
	            if (nextFlug) {
	              checkPromise(_this.onBeforeModal, function (result) {
	                // show loading
	                _this.loading().showLoading(loadingElement);
	
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
	              if (isTarget) {
	                target.setAttribute('style', 'opacity: 0; display: block; -webkit-transition: all .3s; transition: all .3s;');
	              } else {
	                body.insertAdjacentHTML('beforeend', modalElement);
	                if (insertElement !== null) {
	                  var content_inner = document.getElementById('pem__contentInner');
	                  content_inner.insertAdjacentHTML('beforeend', insertElement);
	                }
	              }
	
	              body.classList.add('pem__open');
	
	              checkPromise(_this.onModal, function (result) {
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
	                _this.loading().hideLoading();
	
	                // add modal
	                var modal = target == void 0 || target == null ? document.getElementById('pem') : target;
	                setTimeout(function () {
	                  if (isTarget) {
	                    modal.style.opacity = 1;
	                  }
	                  modal.classList.add('pem--activate');
	                }, 1);
	
	                // hide modal event
	                var pemClose = modal.getElementsByClassName('pemClose');
	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;
	
	                try {
	                  for (var _iterator = Array.from(pemClose)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var self = _step.value;
	
	                    self.addEventListener('click', function (event_2) {
	                      body.classList.remove('pem__open');
	                      modal.classList.remove('pem--activate');
	
	                      if (isTarget) {
	                        modal.style.opacity = 0;
	
	                        setTimeout(function () {
	                          modal.style.display = 'none';
	                          checkPromise(_this.onCloseAfter);
	                        }, 300);
	                      } else {
	                        setTimeout(function () {
	                          modal.parentNode.removeChild(modal);
	                          checkPromise(_this.onCloseAfter);
	                        }, 300);
	                      }
	                    });
	                  }
	
	                  // not hide pem__contentInner in click event
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
	
	                var pem__contentInner = document.getElementById('pem__contentInner');
	                if (pem__contentInner !== null) {
	                  pem__contentInner.addEventListener('click', function (event_3) {
	                    event_3.stopPropagation();
	                  });
	                }
	
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
	          console.log(error);
	          var modal = document.getElementById('pem');
	          if (modal !== null) {
	            modal.parentNode.removeChild(modal);
	          }
	
	          _this.loading().hideLoading();
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
	      key: 'hasModalElement',
	      value: function hasModalElement(element, target) {
	        // check modal element
	        if (element == null && target == null) {
	          element = '\n        <div id="pem" class="pem pemClose" role="dialog">\n          <div class="pem__wrap">\n            <div class="pem__body">\n              <div class="pem__content">\n                <div class="pem__close pemClose">\n                  <span>\xD7</span>\n                </div>\n                <div id="pem__contentInner" class="pem__contentInner">\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>';
	        }
	
	        return element;
	      }
	    }, {
	      key: 'hasInsertElement',
	      value: function hasInsertElement(element) {
	        // check modal insert element
	        if (element !== null && {}.toString.call(element) === '[object String]' && 0 < element.length) {
	          return element;
	        } else {
	          return null;
	        }
	      }
	    }, {
	      key: 'hasLoadingIcon',
	      value: function hasLoadingIcon(icon) {
	        if (icon == void 0 || icon == null) {
	          icon = '<img src="/assets/images/loading.gif">';
	        }
	
	        return icon;
	      }
	    }, {
	      key: 'hasLoadingElement',
	      value: function hasLoadingElement(element, icon) {
	        if (element == void 0 || element == null) {
	          element = '\n        <div id="pemLoading" class="pemLoading">\n          <div class="pemLoading__wrapper">\n              <div class="pemLoading__body">\n                ' + icon + '\n              </div>\n            </div>\n        </div>';
	        }
	
	        return element;
	      }
	    }, {
	      key: 'loading',
	      value: function loading() {
	        var obj = {
	          // show loading
	          showLoading: function showLoading(loadingElement) {
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
	                  if (loading.parentNode !== null) {
	                    loading.parentNode.removeChild(loading);
	                  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTlkZmVkODBmMDc0OTUyYjY0NmYiLCJ3ZWJwYWNrOi8vLy4vanMvbW9kYWwuanMiXSwibmFtZXMiOlsiUEVNb2RhbCIsIm9wdGlvbnMiLCJkZWZhdWx0cyIsImJ1dHRvbiIsIm1vZGFsRWxlbWVudCIsImluc2VydEVsZW1lbnQiLCJsb2FkaW5nRWxlbWVudCIsImxvYWRpbmdJY29uIiwidGFyZ2V0Iiwib25CZWZvcmUiLCJvbkJlZm9yZU1vZGFsIiwib25Nb2RhbCIsIm9uQ2xvc2VBZnRlciIsImluaXQiLCJPYmplY3QiLCJnZXRQcm90b3R5cGVPZiIsInByb3RvdHlwZSIsImtleSIsImhhc093blByb3BlcnR5IiwiZGVzdCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImVudW1lcmFibGUiLCJjaGVja09wdGlvbnMiLCJjb25zb2xlIiwid2FybiIsImxlbmd0aCIsImhhc0xvYWRpbmdJY29uIiwiaGFzTG9hZGluZ0VsZW1lbnQiLCJoYXNNb2RhbEVsZW1lbnQiLCJoYXNJbnNlcnRFbGVtZW50Iiwib25JZ25pdGUiLCJib2R5IiwiZG9jdW1lbnQiLCJpc1RhcmdldCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY2hlY2tQcm9taXNlIiwicmVzdWx0IiwiRXJyb3IiLCJ0aGVuIiwibmV4dEZsdWciLCJsb2FkaW5nIiwic2hvd0xvYWRpbmciLCJzZXRBdHRyaWJ1dGUiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJjb250ZW50X2lubmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJjbGFzc0xpc3QiLCJhZGQiLCJoaWRlTG9hZGluZyIsIm1vZGFsIiwic2V0VGltZW91dCIsInN0eWxlIiwib3BhY2l0eSIsInBlbUNsb3NlIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsIkFycmF5IiwiZnJvbSIsInNlbGYiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnRfMiIsInJlbW92ZSIsImRpc3BsYXkiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJwZW1fX2NvbnRlbnRJbm5lciIsImV2ZW50XzMiLCJzdG9wUHJvcGFnYXRpb24iLCJlIiwiaGFzQ2xhc3MiLCJjb250YWlucyIsInByZXZlbnREZWZhdWx0IiwicGFzc2l2ZSIsImNhdGNoIiwiZXJyb3IiLCJsb2ciLCJtb2RhbEZ1bmN0aW9uIiwiZnVuYyIsImVsZW1lbnQiLCJ0b1N0cmluZyIsImNhbGwiLCJpY29uIiwib2JqIiwid2luZG93Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0M3Qk1BLE87QUFDSixzQkFBWUMsT0FBWixFQUFxQjtBQUFBOztBQUNuQixXQUFJQyxXQUFXO0FBQ2JDLGlCQUFnQixJQURIO0FBRWJDLHVCQUFnQixJQUZIO0FBR2JDLHdCQUFnQixJQUhIO0FBSWJDLHlCQUFnQixJQUpIO0FBS2JDLHNCQUFnQixJQUxIO0FBTWJDLGlCQUFnQixJQU5IO0FBT2JDLG1CQUFnQixJQVBIO0FBUWJDLHdCQUFnQixJQVJIO0FBU2JDLGtCQUFnQixJQVRIO0FBVWJDLHVCQUFnQjtBQVZILFFBQWY7O0FBYUEsWUFBS0MsSUFBTCxDQUFVWCxRQUFWLEVBQW9CRCxPQUFwQjtBQUNEOzs7OzRCQUVJQyxRLEVBQVVELE8sRUFBUztBQUN0QixhQUFHQSxtQkFBbUJhLE1BQW5CLElBQTZCQSxPQUFPQyxjQUFQLENBQXNCZCxPQUF0QixNQUFtQ2EsT0FBT0UsU0FBMUUsRUFBcUY7QUFDbkYsZ0JBQUtmLE9BQUwsR0FBZUMsUUFBZjs7QUFFQTtBQUNBLGdCQUFJLElBQUllLEdBQVIsSUFBZWhCLE9BQWYs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T0FBUCxHQUFpQkEsT0FBckM7QUFDRCIsImZpbGUiOiJtb2RhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDk5ZGZlZDgwZjA3NDk1MmI2NDZmIiwiLyoqXG5QbHVnaW4gRVM2IE1vZGFsXG5cbkNvcHlyaWdodCAoYykgMjAxN1xuXG5UaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbmh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiovXG5cbmNsYXNzIFBFTW9kYWwge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgbGV0IGRlZmF1bHRzID0ge1xuICAgICAgYnV0dG9uOiAgICAgICAgIG51bGwsXG4gICAgICBtb2RhbEVsZW1lbnQ6ICAgbnVsbCxcbiAgICAgIGluc2VydEVsZW1lbnQ6ICBudWxsLFxuICAgICAgbG9hZGluZ0VsZW1lbnQ6IG51bGwsXG4gICAgICBsb2FkaW5nSWNvbjogICAgbnVsbCxcbiAgICAgIHRhcmdldDogICAgICAgICBudWxsLFxuICAgICAgb25CZWZvcmU6ICAgICAgIG51bGwsXG4gICAgICBvbkJlZm9yZU1vZGFsOiAgbnVsbCxcbiAgICAgIG9uTW9kYWw6ICAgICAgICBudWxsLFxuICAgICAgb25DbG9zZUFmdGVyOiAgIG51bGwsXG4gICAgfTtcblxuICAgIHRoaXMuaW5pdChkZWZhdWx0cywgb3B0aW9ucyk7XG4gIH1cblxuICBpbml0KGRlZmF1bHRzLCBvcHRpb25zKSB7XG4gICAgaWYob3B0aW9ucyBpbnN0YW5jZW9mIE9iamVjdCB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob3B0aW9ucykgPT09IE9iamVjdC5wcm90b3R5cGUpIHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IGRlZmF1bHRzO1xuXG4gICAgICAvLyBjaGVjayBleGlzdHMgc2FtZSBrZXlcbiAgICAgIGZvcih2YXIga2V5IGluIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIHZhciBkZXN0ID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvcHRpb25zLCBrZXkpO1xuICAgICAgICAgIGlmIChkZXN0LmVudW1lcmFibGUpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1trZXldID0gb3B0aW9uc1trZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmNoZWNrT3B0aW9ucygpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tPcHRpb25zKCkge1xuICAgIC8vIGNoZWNrIGJ1dHRvblxuICAgIGxldCBidXR0b24gPSB0aGlzLm9wdGlvbnNbJ2J1dHRvbiddO1xuICAgIGlmKGJ1dHRvbiA9PSBudWxsICYmIGJ1dHRvbiBpbnN0YW5jZW9mIE9iamVjdCAhPT0gZmFsc2UpIHtcbiAgICAgIGNvbnNvbGUud2FybigncGVtIGJ1dHRvbiB1bmRpZmluZWQhJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgdGFyZ2V0XG4gICAgbGV0IHRhcmdldCA9IHRoaXMub3B0aW9uc1sndGFyZ2V0J107XG4gICAgaWYodGFyZ2V0IGluc3RhbmNlb2YgT2JqZWN0ID09IGZhbHNlKSB7XG4gICAgICB0aGlzLm9wdGlvbnNbJ3RhcmdldCddID0gbnVsbDtcbiAgICB9IGVsc2UgaWYodGhpcy5vcHRpb25zWyd0YXJnZXQnXS5sZW5ndGggIT0gdm9pZCAwKSB7XG4gICAgICAvLyBpZiBqcXVydHkgb2JqZWN0XG4gICAgICB0aGlzLm9wdGlvbnNbJ3RhcmdldCddID0gdGFyZ2V0WzBdO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIGxvYWRpbmcgaWNvblxuICAgIHRoaXMub3B0aW9uc1snbG9hZGluZ0ljb24nXSA9IHRoaXMuaGFzTG9hZGluZ0ljb24odGhpcy5vcHRpb25zWydsb2FkaW5nSWNvbiddKTtcblxuICAgIC8vIGNoZWNrIGxvYWRpbmcgZWxlbWVudFxuICAgIHRoaXMub3B0aW9uc1snbG9hZGluZ0VsZW1lbnQnXSA9IHRoaXMuaGFzTG9hZGluZ0VsZW1lbnQodGhpcy5vcHRpb25zWydsb2FkaW5nRWxlbWVudCddLCB0aGlzLm9wdGlvbnNbJ2xvYWRpbmdJY29uJ10pO1xuXG4gICAgLy8gY2hlY2sgbW9kYWwgZWxlbWVudFxuICAgIHRoaXMub3B0aW9uc1snbW9kYWxFbGVtZW50J10gPSB0aGlzLmhhc01vZGFsRWxlbWVudCh0aGlzLm9wdGlvbnNbJ21vZGFsRWxlbWVudCddLCB0aGlzLm9wdGlvbnNbJ3RhcmdldCddKTtcblxuICAgIC8vIGNoZWNrIG1vZGFsIGluc2VydCBFbGVtZW50XG4gICAgdGhpcy5vcHRpb25zWydpbnNlcnRFbGVtZW50J10gPSB0aGlzLmhhc0luc2VydEVsZW1lbnQodGhpcy5vcHRpb25zWydpbnNlcnRFbGVtZW50J10pO1xuXG4gICAgLy8gY2hlY2sgZnVuY3Rpb25cbiAgICBjb25zdCBvbkJlZm9yZSA9IHRoaXMub3B0aW9uc1snb25CZWZvcmUnXTtcbiAgICB0aGlzLm9uQmVmb3JlID0gKHR5cGVvZiBvbkJlZm9yZSA9PSAnZnVuY3Rpb24nKSA/IG9uQmVmb3JlIDogKCkgPT4ge307XG5cbiAgICBjb25zdCBvbkJlZm9yZU1vZGFsID0gdGhpcy5vcHRpb25zWydvbkJlZm9yZU1vZGFsJ107XG4gICAgdGhpcy5vbkJlZm9yZU1vZGFsID0gKHR5cGVvZiBvbkJlZm9yZU1vZGFsID09ICdmdW5jdGlvbicpID8gb25CZWZvcmVNb2RhbCA6ICgpID0+IHt9O1xuXG4gICAgY29uc3Qgb25Nb2RhbCA9IHRoaXMub3B0aW9uc1snb25Nb2RhbCddO1xuICAgIHRoaXMub25Nb2RhbCA9ICh0eXBlb2Ygb25Nb2RhbCA9PSAnZnVuY3Rpb24nKSA/IG9uTW9kYWwgOiAoKSA9PiB7fTtcblxuICAgIGNvbnN0IG9uQ2xvc2VBZnRlciA9IHRoaXMub3B0aW9uc1snb25DbG9zZUFmdGVyJ107XG4gICAgdGhpcy5vbkNsb3NlQWZ0ZXIgPSAodHlwZW9mIG9uQ2xvc2VBZnRlciA9PSAnZnVuY3Rpb24nKSA/IG9uQ2xvc2VBZnRlciA6ICgpID0+IHt9O1xuXG4gICAgdGhpcy5vbklnbml0ZSgpO1xuICB9XG5cbiAgb25JZ25pdGUoKSB7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5vcHRpb25zWyd0YXJnZXQnXTtcbiAgICBjb25zdCBsb2FkaW5nRWxlbWVudCA9IHRoaXMub3B0aW9uc1snbG9hZGluZ0VsZW1lbnQnXTtcbiAgICBjb25zdCBtb2RhbEVsZW1lbnQgPSB0aGlzLm9wdGlvbnNbJ21vZGFsRWxlbWVudCddO1xuICAgIGNvbnN0IGluc2VydEVsZW1lbnQgPSB0aGlzLm9wdGlvbnNbJ2luc2VydEVsZW1lbnQnXTtcbiAgICBjb25zdCBpc1RhcmdldCA9IG1vZGFsRWxlbWVudCA9PSBudWxsICYmIHRhcmdldCAhPT0gbnVsbDtcblxuICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNoZWNrUHJvbWlzZSh0aGlzLm9uQmVmb3JlLCAocmVzdWx0KSA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZXJyb3IgbWVzc2FnZScpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSlcbiAgICAudGhlbigobmV4dEZsdWcpID0+IHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChuZXh0Rmx1Zykge1xuICAgICAgICAgIGNoZWNrUHJvbWlzZSh0aGlzLm9uQmVmb3JlTW9kYWwsIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIC8vIHNob3cgbG9hZGluZ1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nKCkuc2hvd0xvYWRpbmcobG9hZGluZ0VsZW1lbnQpO1xuXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2Vycm9yIG1lc3NhZ2UnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZXJyb3IgbWVzc2FnZScpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSlcbiAgICAudGhlbigobmV4dEZsdWcpID0+IHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChuZXh0Rmx1Zykge1xuICAgICAgICAgIC8vIHNob3cgbW9kYWxcbiAgICAgICAgICBpZiAoaXNUYXJnZXQpIHtcbiAgICAgICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ29wYWNpdHk6IDA7IGRpc3BsYXk6IGJsb2NrOyAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAuM3M7IHRyYW5zaXRpb246IGFsbCAuM3M7Jyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBtb2RhbEVsZW1lbnQpO1xuICAgICAgICAgICAgaWYoaW5zZXJ0RWxlbWVudCAhPT0gbnVsbCApIHtcbiAgICAgICAgICAgICAgdmFyIGNvbnRlbnRfaW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGVtX19jb250ZW50SW5uZXInKTtcbiAgICAgICAgICAgICAgY29udGVudF9pbm5lci5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGluc2VydEVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgncGVtX19vcGVuJyk7XG5cbiAgICAgICAgICBjaGVja1Byb21pc2UodGhpcy5vbk1vZGFsLCAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2Vycm9yIG1lc3NhZ2UnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZXJyb3IgbWVzc2FnZScpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSlcbiAgICAudGhlbigobmV4dEZsdWcpID0+IHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChuZXh0Rmx1Zykge1xuICAgICAgICAgIC8vIGhpZGUgbG9hZGluZ1xuICAgICAgICAgIHRoaXMubG9hZGluZygpLmhpZGVMb2FkaW5nKCk7XG5cbiAgICAgICAgICAvLyBhZGQgbW9kYWxcbiAgICAgICAgICBjb25zdCBtb2RhbCA9ICh0YXJnZXQgPT0gdm9pZCAwIHx8IHRhcmdldCA9PSBudWxsKSA/IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwZW0nKSA6IHRhcmdldDtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmIChpc1RhcmdldCkge1xuICAgICAgICAgICAgICBtb2RhbC5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ3BlbS0tYWN0aXZhdGUnKTtcbiAgICAgICAgICB9LCAxKTtcblxuICAgICAgICAgIC8vIGhpZGUgbW9kYWwgZXZlbnRcbiAgICAgICAgICBjb25zdCBwZW1DbG9zZSA9IG1vZGFsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BlbUNsb3NlJyk7XG4gICAgICAgICAgZm9yIChsZXQgc2VsZiBvZiBBcnJheS5mcm9tKHBlbUNsb3NlKSkge1xuICAgICAgICAgICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudF8yKSA9PiB7XG4gICAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncGVtX19vcGVuJyk7XG4gICAgICAgICAgICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ3BlbS0tYWN0aXZhdGUnKTtcblxuICAgICAgICAgICAgICBpZiAoaXNUYXJnZXQpIHtcbiAgICAgICAgICAgICAgICBtb2RhbC5zdHlsZS5vcGFjaXR5ID0gMDtcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICAgIGNoZWNrUHJvbWlzZSh0aGlzLm9uQ2xvc2VBZnRlcik7XG4gICAgICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIG1vZGFsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobW9kYWwpO1xuICAgICAgICAgICAgICAgICAgY2hlY2tQcm9taXNlKHRoaXMub25DbG9zZUFmdGVyKTtcbiAgICAgICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBub3QgaGlkZSBwZW1fX2NvbnRlbnRJbm5lciBpbiBjbGljayBldmVudFxuICAgICAgICAgIGNvbnN0IHBlbV9fY29udGVudElubmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BlbV9fY29udGVudElubmVyJyk7XG4gICAgICAgICAgaWYocGVtX19jb250ZW50SW5uZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHBlbV9fY29udGVudElubmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50XzMpID0+IHtcbiAgICAgICAgICAgICAgZXZlbnRfMy5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIG1vZGFsIHNjcm9sbGluZyBvbiBtb2JpbGUgZGV2aWNlc1xuICAgICAgICAgIGJvZHkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgKGUpID0+IHtcbiAgICAgICAgICAgIGxldCBoYXNDbGFzcyA9IGJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdwZW1fX29wZW4nKTtcbiAgICAgICAgICAgIGlmKGhhc0NsYXNzKSB7XG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2Vycm9yIG1lc3NhZ2UnKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgbGV0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BlbScpO1xuICAgICAgaWYobW9kYWwgIT09IG51bGwpIHtcbiAgICAgICAgbW9kYWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChtb2RhbCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubG9hZGluZygpLmhpZGVMb2FkaW5nKCk7XG4gICAgfSk7XG5cbiAgICAvKlxuICAgICAqIGNoZWNrUHJvbWlzZSAtIFByb21pc2Xjga7mnInnhKHjgpLjg4Hjgqfjg4Pjgq9cbiAgICAgKlxuICAgICAqIEBwYXJhbXMgKG1vZGFsRnVuY3Rpb24pIGZ1bmN0aW9uIC0gRnVuY3Rpb24gdG8gY2hlY2sgZm9yIHByb21pc2VcbiAgICAgKiBAcGFyYW1zIChmdW5jKSBmdW5jdGlvbiAtIEZ1bmN0aW9uIGFmdGVyIGNoZWNrZWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjaGVja1Byb21pc2UobW9kYWxGdW5jdGlvbiwgZnVuYykge1xuICAgICAgaWYobW9kYWxGdW5jdGlvbiAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGlmKHR5cGVvZiBtb2RhbEZ1bmN0aW9uLnRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBtb2RhbEZ1bmN0aW9uKClcbiAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBpZihmdW5jID09IHZvaWQgMCl7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jKHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmMocmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUobW9kYWxGdW5jdGlvbigpKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgaWYoZnVuYyA9PSB2b2lkIDApe1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jKHRydWUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jKHJlc3VsdCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYoZnVuYyAhPT0gdm9pZCAwKXtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYXNNb2RhbEVsZW1lbnQoZWxlbWVudCwgdGFyZ2V0KSB7XG4gICAgLy8gY2hlY2sgbW9kYWwgZWxlbWVudFxuICAgIGlmKGVsZW1lbnQgPT0gbnVsbCAmJiB0YXJnZXQgPT0gbnVsbCkge1xuICAgICAgZWxlbWVudCA9IGBcbiAgICAgICAgPGRpdiBpZD1cInBlbVwiIGNsYXNzPVwicGVtIHBlbUNsb3NlXCIgcm9sZT1cImRpYWxvZ1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwZW1fX3dyYXBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwZW1fX2JvZHlcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBlbV9fY29udGVudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwZW1fX2Nsb3NlIHBlbUNsb3NlXCI+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj7Dlzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwicGVtX19jb250ZW50SW5uZXJcIiBjbGFzcz1cInBlbV9fY29udGVudElubmVyXCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PmA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICBoYXNJbnNlcnRFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAvLyBjaGVjayBtb2RhbCBpbnNlcnQgZWxlbWVudFxuICAgIGlmKGVsZW1lbnQgIT09IG51bGwgJiYgKHt9KS50b1N0cmluZy5jYWxsKGVsZW1lbnQpID09PSAnW29iamVjdCBTdHJpbmddJyAmJiAwIDwgZWxlbWVudC5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBoYXNMb2FkaW5nSWNvbihpY29uKSB7XG4gICAgaWYoaWNvbiA9PSB2b2lkIDAgfHwgaWNvbiA9PSBudWxsKSB7XG4gICAgICBpY29uID0gJzxpbWcgc3JjPVwiL2Fzc2V0cy9pbWFnZXMvbG9hZGluZy5naWZcIj4nO1xuICAgIH1cblxuICAgIHJldHVybiBpY29uO1xuICB9XG5cbiAgaGFzTG9hZGluZ0VsZW1lbnQoZWxlbWVudCwgaWNvbikge1xuICAgIGlmKGVsZW1lbnQgPT0gdm9pZCAwIHx8IGVsZW1lbnQgPT0gbnVsbCkge1xuICAgICAgZWxlbWVudCA9IGBcbiAgICAgICAgPGRpdiBpZD1cInBlbUxvYWRpbmdcIiBjbGFzcz1cInBlbUxvYWRpbmdcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicGVtTG9hZGluZ19fd3JhcHBlclwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGVtTG9hZGluZ19fYm9keVwiPlxuICAgICAgICAgICAgICAgICR7aWNvbn1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+YDtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIGxvYWRpbmcoKSB7XG4gICAgbGV0IG9iaiA9IHtcbiAgICAgIC8vIHNob3cgbG9hZGluZ1xuICAgICAgc2hvd0xvYWRpbmc6IChsb2FkaW5nRWxlbWVudCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgbG9hZGluZ0VsZW1lbnQpO1xuICAgICAgICBsZXQgbG9hZGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwZW1Mb2FkaW5nJyk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGlmKGxvYWRpbmcgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGxvYWRpbmcuY2xhc3NMaXN0LmFkZCgncGVtTG9hZGluZy0tYWN0aXZhdGUnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDEpO1xuICAgICAgfSxcblxuICAgICAgLy8gaGlkZSBsb2FkaW5nXG4gICAgICBoaWRlTG9hZGluZzogKCkgPT4ge1xuICAgICAgICBsZXQgbG9hZGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwZW1Mb2FkaW5nJyk7XG4gICAgICAgIGlmKGxvYWRpbmcgIT09IG51bGwpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGxvYWRpbmcuY2xhc3NMaXN0LnJlbW92ZSgncGVtTG9hZGluZy0tYWN0aXZhdGUnKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBpZihsb2FkaW5nLnBhcmVudE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBsb2FkaW5nLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobG9hZGluZyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBFTW9kYWw7XG5pZiAodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJykge1xuICAhd2luZG93LlBFTW9kYWwgJiYgKHdpbmRvdy5QRU1vZGFsID0gUEVNb2RhbCk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvbW9kYWwuanMiXSwic291cmNlUm9vdCI6IiJ9
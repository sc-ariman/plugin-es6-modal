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
	
	  var Modal = function () {
	    function Modal(element) {
	      _classCallCheck(this, Modal);
	
	      if (element instanceof Object || Object.getPrototypeOf(element) === Object.prototype) {
	        var targets = Array.from(element);
	        if (targets.length == 0 || targets == void 0) {
	          console.warn('target undifined');
	          return false;
	        }
	
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	          for (var _iterator = targets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var target = _step.value;
	
	            this.onClick(target);
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
	
	      this.nextFlug = true;
	
	      return this;
	    }
	
	    _createClass(Modal, [{
	      key: 'onClick',
	      value: function onClick(target) {
	        var _this2 = this;
	
	        var modalFrame = '\n        <div class="modal" id="modal">\n          <div class="modal_wrap">\n            <div class="wrap_body">\n              <div class="body_content">\n                <div class="modal_close">\n                  \xD7\n                </div>\n                <div id="content_inner" class="content_inner">\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>';
	
	        target.addEventListener('click', function (event_1) {
	          _this2.target = event_1.target;
	          var body = document.body;
	
	          new Promise(function (resolve, reject) {
	            var onBefore = _this2.onBefore();
	
	            // Check if THEN
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
	                var onBeforeModal = _this2.onBeforeModal();
	
	                // Check if THEN
	                checkPromise(onBeforeModal, function () {
	                  // show loading
	                  _this2.loading().showLoading(_this2.loadingImage);
	
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
	                body.classList.add('modal_open');
	
	                // Check if THEN
	                var onModal = _this2.onModal();
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
	
	                  var modal = document.getElementById('modal');
	                  setTimeout(function () {
	                    modal.classList.add('modal_activate');
	                  }, 1);
	
	                  // hide modal event
	                  modal.addEventListener('click', function (event_2) {
	                    var _this = event_2.currentTarget;
	                    _this.classList.remove('modal_activate');
	                    body.classList.remove('modal_open');
	
	                    setTimeout(function () {
	                      _this.parentNode.removeChild(_this);
	                      _this2.onModalAfter();
	                    }, 300);
	                  });
	
	                  // not hide content_inner in click event
	                  var content_inner = document.getElementById('content_inner');
	                  content_inner.addEventListener('click', function (event_3) {
	                    event_3.stopPropagation();
	                    event_3.preventDefault();
	                  });
	
	                  // modal scrolling on mobile devices
	                  body.addEventListener('touchmove', function (e) {
	                    var hasClass = body.classList.contains('modal_open');
	                    if (hasClass) {
	                      e.preventDefault();
	                    }
	                  });
	                })();
	              } else {
	                reject(new Error('error message'));
	              }
	            });
	          }).catch(function (error) {
	            var modal = document.getElementById('modal');
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
	          if (onFunc !== void 0 && typeof onFunc.then === 'function') {
	            onFunc.then(function () {
	              func();
	            });
	          } else {
	            func();
	          }
	        }
	      }
	    }, {
	      key: 'onBefore',
	      value: function onBefore() {
	        var _this3 = this;
	
	        return new Promise(function (resolve) {
	          if (typeof _this3.onBefore === 'function') {
	            resolve(_this3.onBefore());
	          } else {
	            resolve();
	          }
	        });
	      }
	    }, {
	      key: 'onBeforeModal',
	      value: function onBeforeModal() {
	        var _this4 = this;
	
	        return new Promise(function (resolve) {
	          if (typeof _this4.onBeforeModal === 'function') {
	            resolve(_this4.onBeforeModal());
	          } else {
	            resolve();
	          }
	        });
	      }
	    }, {
	      key: 'onModal',
	      value: function onModal() {
	        var _this5 = this;
	
	        return new Promise(function (resolve) {
	          if (typeof _this5.onModal === 'function') {
	            resolve(_this5.onModal());
	          } else {
	            resolve();
	          }
	        });
	      }
	    }, {
	      key: 'onModalAfter',
	      value: function onModalAfter() {
	        var _this6 = this;
	
	        return new Promise(function (resolve) {
	          if (typeof _this6.onModalAfter === 'function') {
	            resolve(_this6.onModalAfter());
	          } else {
	            resolve();
	          }
	        });
	      }
	    }, {
	      key: 'onError',
	      value: function onError() {
	        var _this7 = this;
	
	        return new Promise(function (resolve) {
	          if (typeof _this7.onError === 'function') {
	            resolve(_this7.onError());
	          } else {
	            resolve();
	          }
	        });
	      }
	    }, {
	      key: 'loading',
	      value: function loading(image) {
	        if (image == void 0) {
	          image = '\n        <img src="/assets/images/loading.gif">';
	        }
	
	        var loadingElement = '\n      <div class="loading" id="loading">\n        <div class="loading_wrapper">\n            <div class="loading_body">\n              ' + image + '\n            </div>\n          </div>\n      </div>';
	
	        var obj = {
	          // show loading
	          showLoading: function showLoading() {
	            document.body.insertAdjacentHTML('beforeend', loadingElement);
	            var loading = document.getElementById('loading');
	            if (loading !== null) {
	              loading.classList.add('loading_activate');
	            }
	          },
	
	          // hide loading
	          hideLoading: function hideLoading() {
	            var loading = document.getElementById('loading');
	            if (loading !== null) {
	              loading.classList.remove('loading_activate');
	              setTimeout(function () {
	                loading.parentNode.removeChild(loading);
	              }, 300);
	            }
	          }
	        };
	
	        return obj;
	      }
	    }]);
	
	    return Modal;
	  }();
	
	  exports.default = Modal;
	
	  if (typeof window != 'undefined') {
	    !window.Modal && (window.Modal = Modal);
	  }
	});

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDliNzE2M2JmNTY5NDhmODIwOTgiLCJ3ZWJwYWNrOi8vLy4vanMvbW9kYWwuanMiXSwibmFtZXMiOlsiTW9kYWwiLCJlbGVtZW50IiwiT2JqZWN0IiwiZ2V0UHJvdG90eXBlT2YiLCJwcm90b3R5cGUiLCJ0YXJnZXRzIiwiQXJyYXkiLCJmcm9tIiwibGVuZ3RoIiwiY29uc29sZSIsIndhcm4iLCJ0YXJnZXQiLCJvbkNsaWNrIiwibmV4dEZsdWciLCJtb2RhbEZyYW1lIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50XzEiLCJib2R5IiwiZG9jdW1lbnQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9uQmVmb3JlIiwiY2hlY2tQcm9taXNlIiwiRXJyb3IiLCJ0aGVuIiwib25CZWZvcmVNb2RhbCIsImxvYWRpbmciLCJzaG93TG9hZGluZyIsImxvYWRpbmdJbWFnZSIsImluc2VydEFkamFjZW50SFRNTCIsImNsYXNzTGlzdCIsImFkZCIsIm9uTW9kYWwiLCJoaWRlTG9hZGluZyIsIm1vZGFsIiwiZ2V0RWxlbWVudEJ5SWQiLCJzZXRUaW1lb3V0IiwiZXZlbnRfMiIsIl90aGlzIiwiY3VycmVudFRhcmdldCIsInJlbW92ZSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsIm9uTW9kYWxBZnRlciIsImNvbnRlbnRfaW5uZXIiLCJldmVudF8zIiwic3RvcFByb3BhZ2F0aW9uIiwicHJldmVudERlZmF1bHQiLCJlIiwiaGFzQ2xhc3MiLCJjb250YWlucyIsImNhdGNoIiwiZXJyb3IiLCJsb2ciLCJvbkVycm9yIiwib25GdW5jIiwiZnVuYyIsImltYWdlIiwibG9hZGluZ0VsZW1lbnQiLCJvYmoiLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVB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LGtCQUFkLENBQWlDLFdBQWpDLEVBQThDNkIsY0FBOUM7QUFDQSxpQkFBSWhDLFVBQVVULFNBQVNrQixjQUFULENBQXdCLFNBQXhCLENBQWQ7QUFDQSxpQkFBR1QsWUFBWSxJQUFmLEVBQXFCO0FBQ25CQSx1QkFBUUksU0FBUixDQUFrQkMsR0FBbEIsQ0FBc0Isa0JBQXRCO0FBQ0Q7QUFDRixZQVJPOztBQVVSO0FBQ0FFLHdCQUFhLHVCQUFNO0FBQ2pCLGlCQUFJUCxVQUFVVCxTQUFTa0IsY0FBVCxDQUF3QixTQUF4QixDQUFkO0FBQ0EsaUJBQUdULFlBQVksSUFBZixFQUFxQjtBQUNuQkEsdUJBQVFJLFNBQVIsQ0FBa0JVLE1BQWxCLENBQXlCLGtCQUF6QjtBQUNBSiwwQkFBVyxZQUFNO0FBQ2ZWLHlCQUFRZSxVQUFSLENBQW1CQyxXQUFuQixDQUErQmhCLE9BQS9CO0FBQ0QsZ0JBRkQsRUFFRyxHQUZIO0FBR0Q7QUFDRjtBQW5CTyxVQUFWOztBQXNCQSxnQkFBT2lDLEdBQVA7QUFDRDs7Ozs7O3FCQUdZNUQsSzs7QUFDZixPQUFJLE9BQU82RCxNQUFQLElBQWlCLFdBQXJCLEVBQWtDO0FBQ2hDLE1BQUNBLE9BQU83RCxLQUFSLEtBQWtCNkQsT0FBTzdELEtBQVAsR0FBZUEsS0FBakM7QUFDRCIsImZpbGUiOiJtb2RhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGQ5YjcxNjNiZjU2OTQ4ZjgyMDk4IiwiLyoqXG5QbHVnaW4gRVM2IE1vZGFsXG5cbkNvcHlyaWdodCAoYykgMjAxN1xuXG5UaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbmh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiovXG5cbmNsYXNzIE1vZGFsIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIGlmKGVsZW1lbnQgaW5zdGFuY2VvZiBPYmplY3QgfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKGVsZW1lbnQpID09PSBPYmplY3QucHJvdG90eXBlKSB7XG4gICAgICBsZXQgdGFyZ2V0cyA9IEFycmF5LmZyb20oZWxlbWVudCk7XG4gICAgICBpZih0YXJnZXRzLmxlbmd0aCA9PSAwIHx8IHRhcmdldHMgPT0gdm9pZCAwKSB7XG4gICAgICAgIGNvbnNvbGUud2FybigndGFyZ2V0IHVuZGlmaW5lZCcpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IHRhcmdldCBvZiB0YXJnZXRzKSB7XG4gICAgICAgIHRoaXMub25DbGljayh0YXJnZXQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubmV4dEZsdWcgPSB0cnVlO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBvbkNsaWNrKHRhcmdldCkge1xuICAgIGNvbnN0IG1vZGFsRnJhbWUgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbFwiIGlkPVwibW9kYWxcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWxfd3JhcFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXBfYm9keVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm9keV9jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsX2Nsb3NlXCI+XG4gICAgICAgICAgICAgICAgICDDl1xuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJjb250ZW50X2lubmVyXCIgY2xhc3M9XCJjb250ZW50X2lubmVyXCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PmA7XG5cbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnRfMSkgPT4ge1xuICAgICAgdGhpcy50YXJnZXQgPSBldmVudF8xLnRhcmdldDtcbiAgICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuXG4gICAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGxldCBvbkJlZm9yZSA9IHRoaXMub25CZWZvcmUoKTtcblxuICAgICAgICAvLyBDaGVjayBpZiBUSEVOXG4gICAgICAgIGNoZWNrUHJvbWlzZShvbkJlZm9yZSwgKCkgPT4ge1xuICAgICAgICAgIGxldCBuZXh0Rmx1ZyA9IHRoaXMubmV4dEZsdWc7XG5cbiAgICAgICAgICBpZiAodGhpcy5uZXh0Rmx1Zykge1xuICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLm5leHRGbHVnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZXJyb3IgbWVzc2FnZScpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChuZXh0Rmx1ZykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIGlmIChuZXh0Rmx1Zykge1xuICAgICAgICAgICAgbGV0IG9uQmVmb3JlTW9kYWwgPSB0aGlzLm9uQmVmb3JlTW9kYWwoKTtcblxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgVEhFTlxuICAgICAgICAgICAgY2hlY2tQcm9taXNlKG9uQmVmb3JlTW9kYWwsICgpID0+IHtcbiAgICAgICAgICAgICAgLy8gc2hvdyBsb2FkaW5nXG4gICAgICAgICAgICAgIHRoaXMubG9hZGluZygpLnNob3dMb2FkaW5nKHRoaXMubG9hZGluZ0ltYWdlKTtcblxuICAgICAgICAgICAgICBpZiAodGhpcy5uZXh0Rmx1Zykge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5uZXh0Rmx1Zyk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZXJyb3IgbWVzc2FnZScpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2Vycm9yIG1lc3NhZ2UnKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAudGhlbigobmV4dEZsdWcpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBpZiAobmV4dEZsdWcpIHtcbiAgICAgICAgICAgIC8vIHNob3cgbW9kYWxcbiAgICAgICAgICAgIGJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBtb2RhbEZyYW1lKTtcbiAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgnbW9kYWxfb3BlbicpO1xuXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBUSEVOXG4gICAgICAgICAgICBsZXQgb25Nb2RhbCA9IHRoaXMub25Nb2RhbCgpO1xuICAgICAgICAgICAgY2hlY2tQcm9taXNlKG9uTW9kYWwsICgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMubmV4dEZsdWcpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMubmV4dEZsdWcpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2Vycm9yIG1lc3NhZ2UnKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2Vycm9yIG1lc3NhZ2UnKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAudGhlbigobmV4dEZsdWcpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBpZiAobmV4dEZsdWcpIHtcbiAgICAgICAgICAgIC8vIGhpZGUgbG9hZGluZ1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nKCkuaGlkZUxvYWRpbmcoKTtcblxuICAgICAgICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwnKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdtb2RhbF9hY3RpdmF0ZScpO1xuICAgICAgICAgICAgfSwgMSk7XG5cbiAgICAgICAgICAgIC8vIGhpZGUgbW9kYWwgZXZlbnRcbiAgICAgICAgICAgIG1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50XzIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBfdGhpcyA9IGV2ZW50XzIuY3VycmVudFRhcmdldDtcbiAgICAgICAgICAgICAgICBfdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdtb2RhbF9hY3RpdmF0ZScpO1xuICAgICAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbW9kYWxfb3BlbicpO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBfdGhpcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKF90aGlzKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMub25Nb2RhbEFmdGVyKCk7XG4gICAgICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gbm90IGhpZGUgY29udGVudF9pbm5lciBpbiBjbGljayBldmVudFxuICAgICAgICAgICAgY29uc3QgY29udGVudF9pbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50X2lubmVyJyk7XG4gICAgICAgICAgICBjb250ZW50X2lubmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50XzMpID0+IHtcbiAgICAgICAgICAgICAgZXZlbnRfMy5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgZXZlbnRfMy5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIG1vZGFsIHNjcm9sbGluZyBvbiBtb2JpbGUgZGV2aWNlc1xuICAgICAgICAgICAgYm9keS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCAoZSkgPT4ge1xuICAgICAgICAgICAgICBsZXQgaGFzQ2xhc3MgPSBib2R5LmNsYXNzTGlzdC5jb250YWlucygnbW9kYWxfb3BlbicpO1xuICAgICAgICAgICAgICBpZihoYXNDbGFzcykge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2Vycm9yIG1lc3NhZ2UnKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGxldCBtb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbCcpO1xuICAgICAgICBtb2RhbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG1vZGFsKTtcbiAgICAgICAgdGhpcy5sb2FkaW5nKCkuaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuXG4gICAgICAgIHRoaXMub25FcnJvcigpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvKlxuICAgICAqIGNoZWNrUHJvbWlzZSAtIFByb21pc2Xjga7mnInnhKHjgpLjg4Hjgqfjg4Pjgq9cbiAgICAgKlxuICAgICAqIEBwYXJhbXMgKG9uRnVuYykgZnVuY3Rpb24gLSBGdW5jdGlvbiB0byBjaGVjayBmb3IgcHJvbWlzZVxuICAgICAqIEBwYXJhbXMgKGZ1bmMpIGZ1bmN0aW9uIC0gRnVuY3Rpb24gYWZ0ZXIgY2hlY2tlZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNoZWNrUHJvbWlzZShvbkZ1bmMsIGZ1bmMpIHtcbiAgICAgIGlmKG9uRnVuYyAhPT0gdm9pZCAwICYmIHR5cGVvZiBvbkZ1bmMudGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvbkZ1bmMudGhlbigoKSA9PiB7XG4gICAgICAgICAgZnVuYygpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bmMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkJlZm9yZSgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGlmKHR5cGVvZiB0aGlzLm9uQmVmb3JlID09PSAnZnVuY3Rpb24nKXtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLm9uQmVmb3JlKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgb25CZWZvcmVNb2RhbCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGlmKHR5cGVvZiB0aGlzLm9uQmVmb3JlTW9kYWwgPT09ICdmdW5jdGlvbicpe1xuICAgICAgICByZXNvbHZlKHRoaXMub25CZWZvcmVNb2RhbCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG9uTW9kYWwoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBpZih0eXBlb2YgdGhpcy5vbk1vZGFsID09PSAnZnVuY3Rpb24nKXtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLm9uTW9kYWwoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBvbk1vZGFsQWZ0ZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBpZih0eXBlb2YgdGhpcy5vbk1vZGFsQWZ0ZXIgPT09ICdmdW5jdGlvbicpe1xuICAgICAgICByZXNvbHZlKHRoaXMub25Nb2RhbEFmdGVyKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgb25FcnJvcigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGlmKHR5cGVvZiB0aGlzLm9uRXJyb3IgPT09ICdmdW5jdGlvbicpe1xuICAgICAgICByZXNvbHZlKHRoaXMub25FcnJvcigpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGxvYWRpbmcoaW1hZ2UpIHtcbiAgICBpZihpbWFnZSA9PSB2b2lkIDApIHtcbiAgICAgIGltYWdlID0gYFxuICAgICAgICA8aW1nIHNyYz1cIi9hc3NldHMvaW1hZ2VzL2xvYWRpbmcuZ2lmXCI+YDtcbiAgICB9XG5cbiAgICBjb25zdCBsb2FkaW5nRWxlbWVudCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJsb2FkaW5nXCIgaWQ9XCJsb2FkaW5nXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsb2FkaW5nX3dyYXBwZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsb2FkaW5nX2JvZHlcIj5cbiAgICAgICAgICAgICAgJHtpbWFnZX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+YDtcblxuICAgIGxldCBvYmogPSB7XG4gICAgICAvLyBzaG93IGxvYWRpbmdcbiAgICAgIHNob3dMb2FkaW5nOiAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBsb2FkaW5nRWxlbWVudCk7XG4gICAgICAgIGxldCBsb2FkaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWRpbmcnKTtcbiAgICAgICAgaWYobG9hZGluZyAhPT0gbnVsbCkge1xuICAgICAgICAgIGxvYWRpbmcuY2xhc3NMaXN0LmFkZCgnbG9hZGluZ19hY3RpdmF0ZScpO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICAvLyBoaWRlIGxvYWRpbmdcbiAgICAgIGhpZGVMb2FkaW5nOiAoKSA9PiB7XG4gICAgICAgIGxldCBsb2FkaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWRpbmcnKTtcbiAgICAgICAgaWYobG9hZGluZyAhPT0gbnVsbCkge1xuICAgICAgICAgIGxvYWRpbmcuY2xhc3NMaXN0LnJlbW92ZSgnbG9hZGluZ19hY3RpdmF0ZScpO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgbG9hZGluZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGxvYWRpbmcpO1xuICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIG9iajtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNb2RhbDtcbmlmICh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnKSB7XG4gICF3aW5kb3cuTW9kYWwgJiYgKHdpbmRvdy5Nb2RhbCA9IE1vZGFsKTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9tb2RhbC5qcyJdLCJzb3VyY2VSb290IjoiIn0=
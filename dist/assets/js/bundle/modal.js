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
	    function Modal(element, nextFlug) {
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
	
	      this.target;
	      this.nextFlug = true;
	
	      return this;
	    }
	
	    _createClass(Modal, [{
	      key: 'onClick',
	      value: function onClick(target) {
	        var _this2 = this;
	
	        var modalElement = '\n        <div class="modal" id="modal">\n          <div class="modal_wrap">\n            <div class="wrap_body">\n              <div class="body_content">\n                <div class="modal_close">\n                  \xD7\n                </div>\n                <div id="content_inner" class="content_inner" style="padding:10%; background: #fff;">\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>';
	
	        target.addEventListener('click', function (event_1) {
	          _this2.target = event_1.target;
	          var body = document.body;
	
	          // before displaying a modal
	          new Promise(function (resolve, reject) {
	            _this2.onBefore();
	            var nextFlug = _this2.nextFlug;
	
	            if (nextFlug) {
	              resolve(nextFlug);
	            } else {
	              reject(new Error('error message'));
	            }
	          }).then(function (nextFlug) {
	            return new Promise(function (resolve, reject) {
	              if (nextFlug) {
	                _this2.onBeforeModal();
	                // show loading
	                _this2.loading().showLoading();
	                resolve(nextFlug);
	              } else {
	                reject(new Error('error message'));
	              }
	            });
	          }).then(function (nextFlug) {
	            return new Promise(function (resolve, reject) {
	              if (_this2.nextFlug) {
	                (function () {
	                  // hide loading
	                  _this2.loading().hideLoading();
	
	                  // show modal
	                  body.insertAdjacentHTML('beforeend', modalElement);
	                  body.classList.add('modal_open');
	
	                  _this2.onModal();
	
	                  var modal = document.getElementById('modal');
	                  modal.style.display = 'block';
	                  modal.style.transition = 'opacity .3s';
	                  setTimeout(function () {
	                    modal.style.opacity = 1;
	                  }, 1);
	
	                  // hide modal event
	                  modal.addEventListener('click', function (event_2) {
	                    var _this = event_2.currentTarget;
	                    _this.style.opacity = 0;
	                    body.classList.remove('modal_open');
	
	                    setTimeout(function () {
	                      _this.parentNode.removeChild(_this);
	                    }, 300);
	                  });
	
	                  // modal inner
	                  var content_inner = document.getElementById('content_inner');
	                  content_inner.addEventListener('click', function (event_3) {
	                    event_3.stopPropagation();
	                    event_3.preventDefault();
	                  });
	
	                  // Modal scrolling on mobile devices
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
	            // hide loading
	            _this2.loading().hideLoading();
	            console.log(error);
	          });
	        });
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
	              loading.style.opacity = 0;
	              loading.style.display = 'block';
	              loading.style.transition = 'opacity .5s';
	              loading.style.opacity = 1;
	            }
	          },
	
	          // hide loading
	          hideLoading: function hideLoading() {
	            var loading = document.getElementById('loading');
	            if (loading !== null) {
	              setTimeout(function () {
	                loading.style.opacity = 0;
	              }, 1);
	              setTimeout(function () {
	                loading.parentNode.removeChild(loading);
	              }, 500);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTc2ZDk1Yzg2NWEyYWZjM2NmYWYiLCJ3ZWJwYWNrOi8vLy4vanMvbW9kYWwuanMiXSwibmFtZXMiOlsiTW9kYWwiLCJlbGVtZW50IiwibmV4dEZsdWciLCJPYmplY3QiLCJnZXRQcm90b3R5cGVPZiIsInByb3RvdHlwZSIsInRhcmdldHMiLCJBcnJheSIsImZyb20iLCJsZW5ndGgiLCJjb25zb2xlIiwid2FybiIsInRhcmdldCIsIm9uQ2xpY2siLCJtb2RhbEVsZW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnRfMSIsImJvZHkiLCJkb2N1bWVudCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwib25CZWZvcmUiLCJFcnJvciIsInRoZW4iLCJvbkJlZm9yZU1vZGFsIiwibG9hZGluZyIsInNob3dMb2FkaW5nIiwiaGlkZUxvYWRpbmciLCJpbnNlcnRBZGphY2VudEhUTUwiLCJjbGFzc0xpc3QiLCJhZGQiLCJvbk1vZGFsIiwibW9kYWwiLCJnZXRFbGVtZW50QnlJZCIsInN0eWxlIiwiZGlzcGxheSIsInRyYW5zaXRpb24iLCJzZXRUaW1lb3V0Iiwib3BhY2l0eSIsImV2ZW50XzIiLCJfdGhpcyIsImN1cnJlbnRUYXJnZXQiLCJyZW1vdmUiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJjb250ZW50X2lubmVyIiwiZXZlbnRfMyIsInN0b3BQcm9wYWdhdGlvbiIsInByZXZlbnREZWZhdWx0IiwiZSIsImhhc0NsYXNzIiwiY29udGFpbnMiLCJjYXRjaCIsImVycm9yIiwibG9nIiwiaW1hZ2UiLCJsb2FkaW5nRWxlbWVudCIsIm9iaiIsIndpbmRvdyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdB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SUYsVUFBVVIsU0FBU2dCLGNBQVQsQ0FBd0IsU0FBeEIsQ0FBZDtBQUNBLGlCQUFHUixZQUFZLElBQWYsRUFBcUI7QUFDbkJZLDBCQUFXLFlBQU07QUFDZloseUJBQVFTLEtBQVIsQ0FBY0ksT0FBZCxHQUF3QixDQUF4QjtBQUNELGdCQUZELEVBRUcsQ0FGSDtBQUdBRCwwQkFBVyxZQUFNO0FBQ2ZaLHlCQUFRa0IsVUFBUixDQUFtQkMsV0FBbkIsQ0FBK0JuQixPQUEvQjtBQUNELGdCQUZELEVBRUcsR0FGSDtBQUdEO0FBQ0Y7QUF4Qk8sVUFBVjs7QUEyQkEsZ0JBQU9nQyxHQUFQO0FBQ0Q7Ozs7OztxQkFHWTFELEs7O0FBQ2YsT0FBSSxPQUFPMkQsTUFBUCxJQUFpQixXQUFyQixFQUFrQztBQUNoQyxNQUFDQSxPQUFPM0QsS0FBUixLQUFrQjJELE9BQU8zRCxLQUFQLEdBQWVBLEtBQWpDO0FBQ0QiLCJmaWxlIjoibW9kYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBhNzZkOTVjODY1YTJhZmMzY2ZhZiIsIi8qKlxuTW9kYWxcblxuQ29weXJpZ2h0IChjKSAyMDE3XG5cblRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuKi9cblxuLyogZ2xvYmFsICQgKi9cbmNsYXNzIE1vZGFsIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgbmV4dEZsdWcpIHtcbiAgICBpZihlbGVtZW50IGluc3RhbmNlb2YgT2JqZWN0IHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihlbGVtZW50KSA9PT0gT2JqZWN0LnByb3RvdHlwZSkge1xuICAgICAgbGV0IHRhcmdldHMgPSBBcnJheS5mcm9tKGVsZW1lbnQpO1xuICAgICAgaWYodGFyZ2V0cy5sZW5ndGggPT0gMCB8fCB0YXJnZXRzID09IHZvaWQgMCkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ3RhcmdldCB1bmRpZmluZWQnKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCB0YXJnZXQgb2YgdGFyZ2V0cykge1xuICAgICAgICB0aGlzLm9uQ2xpY2sodGFyZ2V0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnRhcmdldDtcbiAgICB0aGlzLm5leHRGbHVnID0gdHJ1ZTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgb25DbGljayh0YXJnZXQpIHtcbiAgICBjb25zdCBtb2RhbEVsZW1lbnQgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbFwiIGlkPVwibW9kYWxcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWxfd3JhcFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXBfYm9keVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm9keV9jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsX2Nsb3NlXCI+XG4gICAgICAgICAgICAgICAgICDDl1xuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJjb250ZW50X2lubmVyXCIgY2xhc3M9XCJjb250ZW50X2lubmVyXCIgc3R5bGU9XCJwYWRkaW5nOjEwJTsgYmFja2dyb3VuZDogI2ZmZjtcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+YDtcblxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudF8xKSA9PiB7XG4gICAgICB0aGlzLnRhcmdldCA9IGV2ZW50XzEudGFyZ2V0O1xuICAgICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG5cbiAgICAgIC8vIGJlZm9yZSBkaXNwbGF5aW5nIGEgbW9kYWxcbiAgICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdGhpcy5vbkJlZm9yZSgpO1xuICAgICAgICBsZXQgbmV4dEZsdWcgPSB0aGlzLm5leHRGbHVnO1xuXG4gICAgICAgIGlmIChuZXh0Rmx1Zykge1xuICAgICAgICAgIHJlc29sdmUobmV4dEZsdWcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2Vycm9yIG1lc3NhZ2UnKSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAudGhlbigobmV4dEZsdWcpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBpZiAobmV4dEZsdWcpIHtcbiAgICAgICAgICAgIHRoaXMub25CZWZvcmVNb2RhbCgpO1xuICAgICAgICAgICAgLy8gc2hvdyBsb2FkaW5nXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcoKS5zaG93TG9hZGluZygpO1xuICAgICAgICAgICAgcmVzb2x2ZShuZXh0Rmx1Zyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2Vycm9yIG1lc3NhZ2UnKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAudGhlbigobmV4dEZsdWcpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5uZXh0Rmx1Zykge1xuICAgICAgICAgICAgLy8gaGlkZSBsb2FkaW5nXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcoKS5oaWRlTG9hZGluZygpO1xuXG4gICAgICAgICAgICAvLyBzaG93IG1vZGFsXG4gICAgICAgICAgICBib2R5Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgbW9kYWxFbGVtZW50KTtcbiAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgnbW9kYWxfb3BlbicpO1xuXG4gICAgICAgICAgICB0aGlzLm9uTW9kYWwoKTtcblxuICAgICAgICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwnKTtcbiAgICAgICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgbW9kYWwuc3R5bGUudHJhbnNpdGlvbiA9ICdvcGFjaXR5IC4zcyc7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgbW9kYWwuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICAgICAgICB9LCAxKTtcblxuICAgICAgICAgICAgLy8gaGlkZSBtb2RhbCBldmVudFxuICAgICAgICAgICAgbW9kYWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnRfMikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IF90aGlzID0gZXZlbnRfMi5jdXJyZW50VGFyZ2V0O1xuICAgICAgICAgICAgICAgIF90aGlzLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgICAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbW9kYWxfb3BlbicpO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBfdGhpcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKF90aGlzKTtcbiAgICAgICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBtb2RhbCBpbm5lclxuICAgICAgICAgICAgY29uc3QgY29udGVudF9pbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50X2lubmVyJyk7XG4gICAgICAgICAgICBjb250ZW50X2lubmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50XzMpID0+IHtcbiAgICAgICAgICAgICAgZXZlbnRfMy5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgZXZlbnRfMy5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgLy8gTW9kYWwgc2Nyb2xsaW5nIG9uIG1vYmlsZSBkZXZpY2VzXG4gICAgICAgICAgICBib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIChlKSA9PiB7XG4gICAgICAgICAgICAgIGxldCBoYXNDbGFzcyA9IGJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdtb2RhbF9vcGVuJyk7XG4gICAgICAgICAgICAgIGlmKGhhc0NsYXNzKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZXJyb3IgbWVzc2FnZScpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgLy8gaGlkZSBsb2FkaW5nXG4gICAgICAgIHRoaXMubG9hZGluZygpLmhpZGVMb2FkaW5nKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgb25CZWZvcmUoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBpZih0eXBlb2YgdGhpcy5vbkJlZm9yZSA9PT0gJ2Z1bmN0aW9uJyl7XG4gICAgICAgIHJlc29sdmUodGhpcy5vbkJlZm9yZSgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG9uQmVmb3JlTW9kYWwoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBpZih0eXBlb2YgdGhpcy5vbkJlZm9yZU1vZGFsID09PSAnZnVuY3Rpb24nKXtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLm9uQmVmb3JlTW9kYWwoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBvbk1vZGFsKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgaWYodHlwZW9mIHRoaXMub25Nb2RhbCA9PT0gJ2Z1bmN0aW9uJyl7XG4gICAgICAgIHJlc29sdmUodGhpcy5vbk1vZGFsKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbG9hZGluZyhpbWFnZSkge1xuICAgIGlmKGltYWdlID09IHZvaWQgMCkge1xuICAgICAgaW1hZ2UgPSBgXG4gICAgICAgIDxpbWcgc3JjPVwiL2Fzc2V0cy9pbWFnZXMvbG9hZGluZy5naWZcIj5gO1xuICAgIH1cblxuICAgIGNvbnN0IGxvYWRpbmdFbGVtZW50ID0gYFxuICAgICAgPGRpdiBjbGFzcz1cImxvYWRpbmdcIiBpZD1cImxvYWRpbmdcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxvYWRpbmdfd3JhcHBlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxvYWRpbmdfYm9keVwiPlxuICAgICAgICAgICAgICAke2ltYWdlfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5gO1xuXG4gICAgbGV0IG9iaiA9IHtcbiAgICAgIC8vIHNob3cgbG9hZGluZ1xuICAgICAgc2hvd0xvYWRpbmc6ICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGxvYWRpbmdFbGVtZW50KTtcbiAgICAgICAgbGV0IGxvYWRpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hZGluZycpO1xuICAgICAgICBpZihsb2FkaW5nICE9PSBudWxsKSB7XG4gICAgICAgICAgbG9hZGluZy5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICAgICAgICBsb2FkaW5nLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgIGxvYWRpbmcuc3R5bGUudHJhbnNpdGlvbiA9ICdvcGFjaXR5IC41cyc7XG4gICAgICAgICAgbG9hZGluZy5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgLy8gaGlkZSBsb2FkaW5nXG4gICAgICBoaWRlTG9hZGluZzogKCkgPT4ge1xuICAgICAgICBsZXQgbG9hZGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2FkaW5nJyk7XG4gICAgICAgIGlmKGxvYWRpbmcgIT09IG51bGwpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGxvYWRpbmcuc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBsb2FkaW5nLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobG9hZGluZyk7XG4gICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1vZGFsO1xuaWYgKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgIXdpbmRvdy5Nb2RhbCAmJiAod2luZG93Lk1vZGFsID0gTW9kYWwpO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL21vZGFsLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==
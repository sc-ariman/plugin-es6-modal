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
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	Plugin ES6 Modal
	
	Copyright (c) 2017
	
	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
	*/
	
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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTA5N2U3M2Y0NDk0MDkyNGY4MDYiLCJ3ZWJwYWNrOi8vLy4vanMvbW9kYWwuanMiXSwibmFtZXMiOlsiUEVNb2RhbCIsIm9wdGlvbnMiLCJkZWZhdWx0cyIsImJ1dHRvbiIsIm1vZGFsRWxlbWVudCIsImluc2VydEVsZW1lbnQiLCJsb2FkaW5nRWxlbWVudCIsImxvYWRpbmdJY29uIiwidGFyZ2V0Iiwib25CZWZvcmUiLCJvbkJlZm9yZU1vZGFsIiwib25Nb2RhbCIsIm9uQ2xvc2VBZnRlciIsImluaXQiLCJPYmplY3QiLCJnZXRQcm90b3R5cGVPZiIsInByb3RvdHlwZSIsImtleSIsImhhc093blByb3BlcnR5IiwiZGVzdCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImVudW1lcmFibGUiLCJjaGVja09wdGlvbnMiLCJjb25zb2xlIiwid2FybiIsImxlbmd0aCIsImhhc0xvYWRpbmdJY29uIiwiaGFzTG9hZGluZ0VsZW1lbnQiLCJoYXNNb2RhbEVsZW1lbnQiLCJoYXNJbnNlcnRFbGVtZW50Iiwib25JZ25pdGUiLCJib2R5IiwiZG9jdW1lbnQiLCJpc1RhcmdldCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY2hlY2tQcm9taXNlIiwicmVzdWx0IiwiRXJyb3IiLCJ0aGVuIiwibmV4dEZsdWciLCJsb2FkaW5nIiwic2hvd0xvYWRpbmciLCJzZXRBdHRyaWJ1dGUiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJjb250ZW50X2lubmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJjbGFzc0xpc3QiLCJhZGQiLCJoaWRlTG9hZGluZyIsIm1vZGFsIiwic2V0VGltZW91dCIsInN0eWxlIiwib3BhY2l0eSIsInBlbUNsb3NlIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsIkFycmF5IiwiZnJvbSIsInNlbGYiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnRfMiIsInJlbW92ZSIsImRpc3BsYXkiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJwZW1fX2NvbnRlbnRJbm5lciIsImV2ZW50XzMiLCJzdG9wUHJvcGFnYXRpb24iLCJlIiwiaGFzQ2xhc3MiLCJjb250YWlucyIsInByZXZlbnREZWZhdWx0IiwicGFzc2l2ZSIsImNhdGNoIiwiZXJyb3IiLCJsb2ciLCJtb2RhbEZ1bmN0aW9uIiwiZnVuYyIsImVsZW1lbnQiLCJ0b1N0cmluZyIsImNhbGwiLCJpY29uIiwib2JqIiwid2luZG93Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Q0E7Ozs7Ozs7OztLQVNNQSxPO0FBQ0osb0JBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFDbkIsU0FBSUMsV0FBVztBQUNiQyxlQUFnQixJQURIO0FBRWJDLHFCQUFnQixJQUZIO0FBR2JDLHNCQUFnQixJQUhIO0FBSWJDLHVCQUFnQixJQUpIO0FBS2JDLG9CQUFnQixJQUxIO0FBTWJDLGVBQWdCLElBTkg7QUFPYkMsaUJBQWdCLElBUEg7QUFRYkMsc0JBQWdCLElBUkg7QUFTYkMsZ0JBQWdCLElBVEg7QUFVYkMscUJBQWdCO0FBVkgsTUFBZjs7QUFhQSxVQUFLQyxJQUFMLENBQVVYLFFBQVYsRUFBb0JELE9BQXBCO0FBQ0Q7Ozs7MEJBRUlDLFEsRUFBVUQsTyxFQUFTO0FBQ3RCLFdBQUdBLG1CQUFtQmEsTUFBbkIsSUFBNkJBLE9BQU9DLGNBQVAsQ0FBc0JkLE9BQXRCLE1BQW1DYSxPQUFPRSxTQUExRSxFQUFxRjtBQUNuRixjQUFLZixPQUFMLEdBQWVDLFFBQWY7O0FBRUE7QUFDQSxjQUFJLElBQUllLEdBQVIsSUFBZWhCLE9BQWYsRUFBd0I7QUFDdEIsZUFBSUEsUUFBUWlC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c0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYTA5N2U3M2Y0NDk0MDkyNGY4MDYiLCIvKipcblBsdWdpbiBFUzYgTW9kYWxcblxuQ29weXJpZ2h0IChjKSAyMDE3XG5cblRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuKi9cblxuY2xhc3MgUEVNb2RhbCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBsZXQgZGVmYXVsdHMgPSB7XG4gICAgICBidXR0b246ICAgICAgICAgbnVsbCxcbiAgICAgIG1vZGFsRWxlbWVudDogICBudWxsLFxuICAgICAgaW5zZXJ0RWxlbWVudDogIG51bGwsXG4gICAgICBsb2FkaW5nRWxlbWVudDogbnVsbCxcbiAgICAgIGxvYWRpbmdJY29uOiAgICBudWxsLFxuICAgICAgdGFyZ2V0OiAgICAgICAgIG51bGwsXG4gICAgICBvbkJlZm9yZTogICAgICAgbnVsbCxcbiAgICAgIG9uQmVmb3JlTW9kYWw6ICBudWxsLFxuICAgICAgb25Nb2RhbDogICAgICAgIG51bGwsXG4gICAgICBvbkNsb3NlQWZ0ZXI6ICAgbnVsbCxcbiAgICB9O1xuXG4gICAgdGhpcy5pbml0KGRlZmF1bHRzLCBvcHRpb25zKTtcbiAgfVxuXG4gIGluaXQoZGVmYXVsdHMsIG9wdGlvbnMpIHtcbiAgICBpZihvcHRpb25zIGluc3RhbmNlb2YgT2JqZWN0IHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvcHRpb25zKSA9PT0gT2JqZWN0LnByb3RvdHlwZSkge1xuICAgICAgdGhpcy5vcHRpb25zID0gZGVmYXVsdHM7XG5cbiAgICAgIC8vIGNoZWNrIGV4aXN0cyBzYW1lIGtleVxuICAgICAgZm9yKHZhciBrZXkgaW4gb3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgdmFyIGRlc3QgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9wdGlvbnMsIGtleSk7XG4gICAgICAgICAgaWYgKGRlc3QuZW51bWVyYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zW2tleV0gPSBvcHRpb25zW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2hlY2tPcHRpb25zKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjaGVja09wdGlvbnMoKSB7XG4gICAgLy8gY2hlY2sgYnV0dG9uXG4gICAgbGV0IGJ1dHRvbiA9IHRoaXMub3B0aW9uc1snYnV0dG9uJ107XG4gICAgaWYoYnV0dG9uID09IG51bGwgJiYgYnV0dG9uIGluc3RhbmNlb2YgT2JqZWN0ICE9PSBmYWxzZSkge1xuICAgICAgY29uc29sZS53YXJuKCdwZW0gYnV0dG9uIHVuZGlmaW5lZCEnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBjaGVjayB0YXJnZXRcbiAgICBsZXQgdGFyZ2V0ID0gdGhpcy5vcHRpb25zWyd0YXJnZXQnXTtcbiAgICBpZih0YXJnZXQgaW5zdGFuY2VvZiBPYmplY3QgPT0gZmFsc2UpIHtcbiAgICAgIHRoaXMub3B0aW9uc1sndGFyZ2V0J10gPSBudWxsO1xuICAgIH0gZWxzZSBpZih0aGlzLm9wdGlvbnNbJ3RhcmdldCddLmxlbmd0aCAhPSB2b2lkIDApIHtcbiAgICAgIC8vIGlmIGpxdXJ0eSBvYmplY3RcbiAgICAgIHRoaXMub3B0aW9uc1sndGFyZ2V0J10gPSB0YXJnZXRbMF07XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgbG9hZGluZyBpY29uXG4gICAgdGhpcy5vcHRpb25zWydsb2FkaW5nSWNvbiddID0gdGhpcy5oYXNMb2FkaW5nSWNvbih0aGlzLm9wdGlvbnNbJ2xvYWRpbmdJY29uJ10pO1xuXG4gICAgLy8gY2hlY2sgbG9hZGluZyBlbGVtZW50XG4gICAgdGhpcy5vcHRpb25zWydsb2FkaW5nRWxlbWVudCddID0gdGhpcy5oYXNMb2FkaW5nRWxlbWVudCh0aGlzLm9wdGlvbnNbJ2xvYWRpbmdFbGVtZW50J10sIHRoaXMub3B0aW9uc1snbG9hZGluZ0ljb24nXSk7XG5cbiAgICAvLyBjaGVjayBtb2RhbCBlbGVtZW50XG4gICAgdGhpcy5vcHRpb25zWydtb2RhbEVsZW1lbnQnXSA9IHRoaXMuaGFzTW9kYWxFbGVtZW50KHRoaXMub3B0aW9uc1snbW9kYWxFbGVtZW50J10sIHRoaXMub3B0aW9uc1sndGFyZ2V0J10pO1xuXG4gICAgLy8gY2hlY2sgbW9kYWwgaW5zZXJ0IEVsZW1lbnRcbiAgICB0aGlzLm9wdGlvbnNbJ2luc2VydEVsZW1lbnQnXSA9IHRoaXMuaGFzSW5zZXJ0RWxlbWVudCh0aGlzLm9wdGlvbnNbJ2luc2VydEVsZW1lbnQnXSk7XG5cbiAgICAvLyBjaGVjayBmdW5jdGlvblxuICAgIGNvbnN0IG9uQmVmb3JlID0gdGhpcy5vcHRpb25zWydvbkJlZm9yZSddO1xuICAgIHRoaXMub25CZWZvcmUgPSAodHlwZW9mIG9uQmVmb3JlID09ICdmdW5jdGlvbicpID8gb25CZWZvcmUgOiAoKSA9PiB7fTtcblxuICAgIGNvbnN0IG9uQmVmb3JlTW9kYWwgPSB0aGlzLm9wdGlvbnNbJ29uQmVmb3JlTW9kYWwnXTtcbiAgICB0aGlzLm9uQmVmb3JlTW9kYWwgPSAodHlwZW9mIG9uQmVmb3JlTW9kYWwgPT0gJ2Z1bmN0aW9uJykgPyBvbkJlZm9yZU1vZGFsIDogKCkgPT4ge307XG5cbiAgICBjb25zdCBvbk1vZGFsID0gdGhpcy5vcHRpb25zWydvbk1vZGFsJ107XG4gICAgdGhpcy5vbk1vZGFsID0gKHR5cGVvZiBvbk1vZGFsID09ICdmdW5jdGlvbicpID8gb25Nb2RhbCA6ICgpID0+IHt9O1xuXG4gICAgY29uc3Qgb25DbG9zZUFmdGVyID0gdGhpcy5vcHRpb25zWydvbkNsb3NlQWZ0ZXInXTtcbiAgICB0aGlzLm9uQ2xvc2VBZnRlciA9ICh0eXBlb2Ygb25DbG9zZUFmdGVyID09ICdmdW5jdGlvbicpID8gb25DbG9zZUFmdGVyIDogKCkgPT4ge307XG5cbiAgICB0aGlzLm9uSWduaXRlKCk7XG4gIH1cblxuICBvbklnbml0ZSgpIHtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzLm9wdGlvbnNbJ3RhcmdldCddO1xuICAgIGNvbnN0IGxvYWRpbmdFbGVtZW50ID0gdGhpcy5vcHRpb25zWydsb2FkaW5nRWxlbWVudCddO1xuICAgIGNvbnN0IG1vZGFsRWxlbWVudCA9IHRoaXMub3B0aW9uc1snbW9kYWxFbGVtZW50J107XG4gICAgY29uc3QgaW5zZXJ0RWxlbWVudCA9IHRoaXMub3B0aW9uc1snaW5zZXJ0RWxlbWVudCddO1xuICAgIGNvbnN0IGlzVGFyZ2V0ID0gbW9kYWxFbGVtZW50ID09IG51bGwgJiYgdGFyZ2V0ICE9PSBudWxsO1xuXG4gICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY2hlY2tQcm9taXNlKHRoaXMub25CZWZvcmUsIChyZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdlcnJvciBtZXNzYWdlJykpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KVxuICAgIC50aGVuKChuZXh0Rmx1ZykgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKG5leHRGbHVnKSB7XG4gICAgICAgICAgY2hlY2tQcm9taXNlKHRoaXMub25CZWZvcmVNb2RhbCwgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgLy8gc2hvdyBsb2FkaW5nXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcoKS5zaG93TG9hZGluZyhsb2FkaW5nRWxlbWVudCk7XG5cbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZXJyb3IgbWVzc2FnZScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdlcnJvciBtZXNzYWdlJykpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KVxuICAgIC50aGVuKChuZXh0Rmx1ZykgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKG5leHRGbHVnKSB7XG4gICAgICAgICAgLy8gc2hvdyBtb2RhbFxuICAgICAgICAgIGlmIChpc1RhcmdldCkge1xuICAgICAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnb3BhY2l0eTogMDsgZGlzcGxheTogYmxvY2s7IC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIC4zczsgdHJhbnNpdGlvbjogYWxsIC4zczsnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIG1vZGFsRWxlbWVudCk7XG4gICAgICAgICAgICBpZihpbnNlcnRFbGVtZW50ICE9PSBudWxsICkge1xuICAgICAgICAgICAgICB2YXIgY29udGVudF9pbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwZW1fX2NvbnRlbnRJbm5lcicpO1xuICAgICAgICAgICAgICBjb250ZW50X2lubmVyLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgaW5zZXJ0RWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCdwZW1fX29wZW4nKTtcblxuICAgICAgICAgIGNoZWNrUHJvbWlzZSh0aGlzLm9uTW9kYWwsIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZXJyb3IgbWVzc2FnZScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdlcnJvciBtZXNzYWdlJykpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KVxuICAgIC50aGVuKChuZXh0Rmx1ZykgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKG5leHRGbHVnKSB7XG4gICAgICAgICAgLy8gaGlkZSBsb2FkaW5nXG4gICAgICAgICAgdGhpcy5sb2FkaW5nKCkuaGlkZUxvYWRpbmcoKTtcblxuICAgICAgICAgIC8vIGFkZCBtb2RhbFxuICAgICAgICAgIGNvbnN0IG1vZGFsID0gKHRhcmdldCA9PSB2b2lkIDAgfHwgdGFyZ2V0ID09IG51bGwpID8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BlbScpIDogdGFyZ2V0O1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGlzVGFyZ2V0KSB7XG4gICAgICAgICAgICAgIG1vZGFsLnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgncGVtLS1hY3RpdmF0ZScpO1xuICAgICAgICAgIH0sIDEpO1xuXG4gICAgICAgICAgLy8gaGlkZSBtb2RhbCBldmVudFxuICAgICAgICAgIGNvbnN0IHBlbUNsb3NlID0gbW9kYWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGVtQ2xvc2UnKTtcbiAgICAgICAgICBmb3IgKGxldCBzZWxmIG9mIEFycmF5LmZyb20ocGVtQ2xvc2UpKSB7XG4gICAgICAgICAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50XzIpID0+IHtcbiAgICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdwZW1fX29wZW4nKTtcbiAgICAgICAgICAgICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgncGVtLS1hY3RpdmF0ZScpO1xuXG4gICAgICAgICAgICAgIGlmIChpc1RhcmdldCkge1xuICAgICAgICAgICAgICAgIG1vZGFsLnN0eWxlLm9wYWNpdHkgPSAwO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgY2hlY2tQcm9taXNlKHRoaXMub25DbG9zZUFmdGVyKTtcbiAgICAgICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgbW9kYWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChtb2RhbCk7XG4gICAgICAgICAgICAgICAgICBjaGVja1Byb21pc2UodGhpcy5vbkNsb3NlQWZ0ZXIpO1xuICAgICAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIG5vdCBoaWRlIHBlbV9fY29udGVudElubmVyIGluIGNsaWNrIGV2ZW50XG4gICAgICAgICAgY29uc3QgcGVtX19jb250ZW50SW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGVtX19jb250ZW50SW5uZXInKTtcbiAgICAgICAgICBpZihwZW1fX2NvbnRlbnRJbm5lciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcGVtX19jb250ZW50SW5uZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnRfMykgPT4ge1xuICAgICAgICAgICAgICBldmVudF8zLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gbW9kYWwgc2Nyb2xsaW5nIG9uIG1vYmlsZSBkZXZpY2VzXG4gICAgICAgICAgYm9keS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCAoZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGhhc0NsYXNzID0gYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ3BlbV9fb3BlbicpO1xuICAgICAgICAgICAgaWYoaGFzQ2xhc3MpIHtcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIHsgcGFzc2l2ZTogZmFsc2UgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZXJyb3IgbWVzc2FnZScpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICBsZXQgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGVtJyk7XG4gICAgICBpZihtb2RhbCAhPT0gbnVsbCkge1xuICAgICAgICBtb2RhbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG1vZGFsKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5sb2FkaW5nKCkuaGlkZUxvYWRpbmcoKTtcbiAgICB9KTtcblxuICAgIC8qXG4gICAgICogY2hlY2tQcm9taXNlIC0gUHJvbWlzZeOBruacieeEoeOCkuODgeOCp+ODg+OCr1xuICAgICAqXG4gICAgICogQHBhcmFtcyAobW9kYWxGdW5jdGlvbikgZnVuY3Rpb24gLSBGdW5jdGlvbiB0byBjaGVjayBmb3IgcHJvbWlzZVxuICAgICAqIEBwYXJhbXMgKGZ1bmMpIGZ1bmN0aW9uIC0gRnVuY3Rpb24gYWZ0ZXIgY2hlY2tlZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNoZWNrUHJvbWlzZShtb2RhbEZ1bmN0aW9uLCBmdW5jKSB7XG4gICAgICBpZihtb2RhbEZ1bmN0aW9uICE9PSB2b2lkIDApIHtcbiAgICAgICAgaWYodHlwZW9mIG1vZGFsRnVuY3Rpb24udGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIG1vZGFsRnVuY3Rpb24oKVxuICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmKGZ1bmMgPT0gdm9pZCAwKXtcbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmModHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gZnVuYyhyZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShtb2RhbEZ1bmN0aW9uKCkpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICBpZihmdW5jID09IHZvaWQgMCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmModHJ1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmMocmVzdWx0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmModHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZihmdW5jICE9PSB2b2lkIDApe1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhc01vZGFsRWxlbWVudChlbGVtZW50LCB0YXJnZXQpIHtcbiAgICAvLyBjaGVjayBtb2RhbCBlbGVtZW50XG4gICAgaWYoZWxlbWVudCA9PSBudWxsICYmIHRhcmdldCA9PSBudWxsKSB7XG4gICAgICBlbGVtZW50ID0gYFxuICAgICAgICA8ZGl2IGlkPVwicGVtXCIgY2xhc3M9XCJwZW0gcGVtQ2xvc2VcIiByb2xlPVwiZGlhbG9nXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInBlbV9fd3JhcFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBlbV9fYm9keVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGVtX19jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBlbV9fY2xvc2UgcGVtQ2xvc2VcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPsOXPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJwZW1fX2NvbnRlbnRJbm5lclwiIGNsYXNzPVwicGVtX19jb250ZW50SW5uZXJcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+YDtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIGhhc0luc2VydEVsZW1lbnQoZWxlbWVudCkge1xuICAgIC8vIGNoZWNrIG1vZGFsIGluc2VydCBlbGVtZW50XG4gICAgaWYoZWxlbWVudCAhPT0gbnVsbCAmJiAoe30pLnRvU3RyaW5nLmNhbGwoZWxlbWVudCkgPT09ICdbb2JqZWN0IFN0cmluZ10nICYmIDAgPCBlbGVtZW50Lmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGhhc0xvYWRpbmdJY29uKGljb24pIHtcbiAgICBpZihpY29uID09IHZvaWQgMCB8fCBpY29uID09IG51bGwpIHtcbiAgICAgIGljb24gPSAnPGltZyBzcmM9XCIvYXNzZXRzL2ltYWdlcy9sb2FkaW5nLmdpZlwiPic7XG4gICAgfVxuXG4gICAgcmV0dXJuIGljb247XG4gIH1cblxuICBoYXNMb2FkaW5nRWxlbWVudChlbGVtZW50LCBpY29uKSB7XG4gICAgaWYoZWxlbWVudCA9PSB2b2lkIDAgfHwgZWxlbWVudCA9PSBudWxsKSB7XG4gICAgICBlbGVtZW50ID0gYFxuICAgICAgICA8ZGl2IGlkPVwicGVtTG9hZGluZ1wiIGNsYXNzPVwicGVtTG9hZGluZ1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwZW1Mb2FkaW5nX193cmFwcGVyXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwZW1Mb2FkaW5nX19ib2R5XCI+XG4gICAgICAgICAgICAgICAgJHtpY29ufVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5gO1xuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgbG9hZGluZygpIHtcbiAgICBsZXQgb2JqID0ge1xuICAgICAgLy8gc2hvdyBsb2FkaW5nXG4gICAgICBzaG93TG9hZGluZzogKGxvYWRpbmdFbGVtZW50KSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBsb2FkaW5nRWxlbWVudCk7XG4gICAgICAgIGxldCBsb2FkaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BlbUxvYWRpbmcnKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgaWYobG9hZGluZyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgbG9hZGluZy5jbGFzc0xpc3QuYWRkKCdwZW1Mb2FkaW5nLS1hY3RpdmF0ZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgMSk7XG4gICAgICB9LFxuXG4gICAgICAvLyBoaWRlIGxvYWRpbmdcbiAgICAgIGhpZGVMb2FkaW5nOiAoKSA9PiB7XG4gICAgICAgIGxldCBsb2FkaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BlbUxvYWRpbmcnKTtcbiAgICAgICAgaWYobG9hZGluZyAhPT0gbnVsbCkge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgbG9hZGluZy5jbGFzc0xpc3QucmVtb3ZlKCdwZW1Mb2FkaW5nLS1hY3RpdmF0ZScpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGlmKGxvYWRpbmcucGFyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGxvYWRpbmcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChsb2FkaW5nKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgICB9LCAzMDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBvYmo7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUEVNb2RhbDtcbmlmICh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnKSB7XG4gICF3aW5kb3cuUEVNb2RhbCAmJiAod2luZG93LlBFTW9kYWwgPSBQRU1vZGFsKTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9tb2RhbC5qcyJdLCJzb3VyY2VSb290IjoiIn0=
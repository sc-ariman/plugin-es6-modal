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
/***/ (function(module, exports) {

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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDUyN2Q1NDgwN2EwNzliM2Q4NTciLCJ3ZWJwYWNrOi8vLy4vanMvcGVtb2RhbC5qcyJdLCJuYW1lcyI6WyJQRU1vZGFsIiwib3B0aW9ucyIsImRlZmF1bHRzIiwiYnV0dG9uIiwibW9kYWxFbGVtZW50IiwiaW5zZXJ0RWxlbWVudCIsImxvYWRpbmdFbGVtZW50IiwibG9hZGluZ0ljb24iLCJ0YXJnZXQiLCJvbkJlZm9yZSIsIm9uQmVmb3JlTW9kYWwiLCJvbk1vZGFsIiwib25DbG9zZUFmdGVyIiwiaW5pdCIsIk9iamVjdCIsImdldFByb3RvdHlwZU9mIiwicHJvdG90eXBlIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJkZXN0IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsImNoZWNrT3B0aW9ucyIsImNvbnNvbGUiLCJ3YXJuIiwibGVuZ3RoIiwiaGFzTG9hZGluZ0ljb24iLCJoYXNMb2FkaW5nRWxlbWVudCIsImhhc01vZGFsRWxlbWVudCIsImhhc0luc2VydEVsZW1lbnQiLCJvbklnbml0ZSIsImJvZHkiLCJkb2N1bWVudCIsImlzVGFyZ2V0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJjaGVja1Byb21pc2UiLCJyZXN1bHQiLCJFcnJvciIsInRoZW4iLCJuZXh0Rmx1ZyIsImxvYWRpbmciLCJzaG93TG9hZGluZyIsInNldEF0dHJpYnV0ZSIsImluc2VydEFkamFjZW50SFRNTCIsImNvbnRlbnRfaW5uZXIiLCJnZXRFbGVtZW50QnlJZCIsImNsYXNzTGlzdCIsImFkZCIsImhpZGVMb2FkaW5nIiwibW9kYWwiLCJzZXRUaW1lb3V0Iiwic3R5bGUiLCJvcGFjaXR5IiwicGVtQ2xvc2UiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiQXJyYXkiLCJmcm9tIiwic2VsZiIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudF8yIiwicmVtb3ZlIiwiZGlzcGxheSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInBlbV9fY29udGVudElubmVyIiwiZXZlbnRfMyIsInN0b3BQcm9wYWdhdGlvbiIsImUiLCJoYXNDbGFzcyIsImNvbnRhaW5zIiwicHJldmVudERlZmF1bHQiLCJwYXNzaXZlIiwiY2F0Y2giLCJlcnJvciIsImxvZyIsIm1vZGFsRnVuY3Rpb24iLCJmdW5jIiwiZWxlbWVudCIsInRvU3RyaW5nIiwiY2FsbCIsImljb24iLCJvYmoiLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQTs7Ozs7Ozs7O0tBU01BLE87QUFDSixvQkFBWUMsT0FBWixFQUFxQjtBQUFBOztBQUNuQixTQUFJQyxXQUFXO0FBQ2JDLGVBQWdCLElBREg7QUFFYkMscUJBQWdCLElBRkg7QUFHYkMsc0JBQWdCLElBSEg7QUFJYkMsdUJBQWdCLElBSkg7QUFLYkMsb0JBQWdCLElBTEg7QUFNYkMsZUFBZ0IsSUFOSDtBQU9iQyxpQkFBZ0IsSUFQSDtBQVFiQyxzQkFBZ0IsSUFSSDtBQVNiQyxnQkFBZ0IsSUFUSDtBQVViQyxxQkFBZ0I7QUFWSCxNQUFmOztBQWFBLFVBQUtDLElBQUwsQ0FBVVgsUUFBVixFQUFvQkQsT0FBcEI7QUFDRDs7OzswQkFFSUMsUSxFQUFVRCxPLEVBQVM7QUFDdEIsV0FBR0EsbUJBQW1CYSxNQUFuQixJQUE2QkEsT0FBT0MsY0FBUCxDQUFzQmQsT0FBdEIsTUFBbUNhLE9BQU9FLFNBQTFFLEVBQXFGO0FBQ25GLGNBQUtmLE9BQUwsR0FBZUMsUUFBZjs7QUFFQTtBQUNBLGNBQUksSUFBSWUsR0FBUixJQUFlaEIsT0FBZixFQUF3QjtBQUN0QixlQUFJQSxRQUFR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dXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGQ1MjdkNTQ4MDdhMDc5YjNkODU3IiwiLyoqXG5QbHVnaW4gRVM2IE1vZGFsXG5cbkNvcHlyaWdodCAoYykgMjAxN1xuXG5UaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbmh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiovXG5cbmNsYXNzIFBFTW9kYWwge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgbGV0IGRlZmF1bHRzID0ge1xuICAgICAgYnV0dG9uOiAgICAgICAgIG51bGwsXG4gICAgICBtb2RhbEVsZW1lbnQ6ICAgbnVsbCxcbiAgICAgIGluc2VydEVsZW1lbnQ6ICBudWxsLFxuICAgICAgbG9hZGluZ0VsZW1lbnQ6IG51bGwsXG4gICAgICBsb2FkaW5nSWNvbjogICAgbnVsbCxcbiAgICAgIHRhcmdldDogICAgICAgICBudWxsLFxuICAgICAgb25CZWZvcmU6ICAgICAgIG51bGwsXG4gICAgICBvbkJlZm9yZU1vZGFsOiAgbnVsbCxcbiAgICAgIG9uTW9kYWw6ICAgICAgICBudWxsLFxuICAgICAgb25DbG9zZUFmdGVyOiAgIG51bGwsXG4gICAgfTtcblxuICAgIHRoaXMuaW5pdChkZWZhdWx0cywgb3B0aW9ucyk7XG4gIH1cblxuICBpbml0KGRlZmF1bHRzLCBvcHRpb25zKSB7XG4gICAgaWYob3B0aW9ucyBpbnN0YW5jZW9mIE9iamVjdCB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob3B0aW9ucykgPT09IE9iamVjdC5wcm90b3R5cGUpIHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IGRlZmF1bHRzO1xuXG4gICAgICAvLyBjaGVjayBleGlzdHMgc2FtZSBrZXlcbiAgICAgIGZvcih2YXIga2V5IGluIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIHZhciBkZXN0ID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvcHRpb25zLCBrZXkpO1xuICAgICAgICAgIGlmIChkZXN0LmVudW1lcmFibGUpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1trZXldID0gb3B0aW9uc1trZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmNoZWNrT3B0aW9ucygpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tPcHRpb25zKCkge1xuICAgIC8vIGNoZWNrIGJ1dHRvblxuICAgIGxldCBidXR0b24gPSB0aGlzLm9wdGlvbnNbJ2J1dHRvbiddO1xuICAgIGlmKGJ1dHRvbiA9PSBudWxsICYmIGJ1dHRvbiBpbnN0YW5jZW9mIE9iamVjdCAhPT0gZmFsc2UpIHtcbiAgICAgIGNvbnNvbGUud2FybigncGVtIGJ1dHRvbiB1bmRpZmluZWQhJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgdGFyZ2V0XG4gICAgbGV0IHRhcmdldCA9IHRoaXMub3B0aW9uc1sndGFyZ2V0J107XG4gICAgaWYodGFyZ2V0IGluc3RhbmNlb2YgT2JqZWN0ID09IGZhbHNlKSB7XG4gICAgICB0aGlzLm9wdGlvbnNbJ3RhcmdldCddID0gbnVsbDtcbiAgICB9IGVsc2UgaWYodGhpcy5vcHRpb25zWyd0YXJnZXQnXS5sZW5ndGggIT0gdm9pZCAwKSB7XG4gICAgICAvLyBpZiBqcXVydHkgb2JqZWN0XG4gICAgICB0aGlzLm9wdGlvbnNbJ3RhcmdldCddID0gdGFyZ2V0WzBdO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIGxvYWRpbmcgaWNvblxuICAgIHRoaXMub3B0aW9uc1snbG9hZGluZ0ljb24nXSA9IHRoaXMuaGFzTG9hZGluZ0ljb24odGhpcy5vcHRpb25zWydsb2FkaW5nSWNvbiddKTtcblxuICAgIC8vIGNoZWNrIGxvYWRpbmcgZWxlbWVudFxuICAgIHRoaXMub3B0aW9uc1snbG9hZGluZ0VsZW1lbnQnXSA9IHRoaXMuaGFzTG9hZGluZ0VsZW1lbnQodGhpcy5vcHRpb25zWydsb2FkaW5nRWxlbWVudCddLCB0aGlzLm9wdGlvbnNbJ2xvYWRpbmdJY29uJ10pO1xuXG4gICAgLy8gY2hlY2sgbW9kYWwgZWxlbWVudFxuICAgIHRoaXMub3B0aW9uc1snbW9kYWxFbGVtZW50J10gPSB0aGlzLmhhc01vZGFsRWxlbWVudCh0aGlzLm9wdGlvbnNbJ21vZGFsRWxlbWVudCddLCB0aGlzLm9wdGlvbnNbJ3RhcmdldCddKTtcblxuICAgIC8vIGNoZWNrIG1vZGFsIGluc2VydCBFbGVtZW50XG4gICAgdGhpcy5vcHRpb25zWydpbnNlcnRFbGVtZW50J10gPSB0aGlzLmhhc0luc2VydEVsZW1lbnQodGhpcy5vcHRpb25zWydpbnNlcnRFbGVtZW50J10pO1xuXG4gICAgLy8gY2hlY2sgZnVuY3Rpb25cbiAgICBjb25zdCBvbkJlZm9yZSA9IHRoaXMub3B0aW9uc1snb25CZWZvcmUnXTtcbiAgICB0aGlzLm9uQmVmb3JlID0gKHR5cGVvZiBvbkJlZm9yZSA9PSAnZnVuY3Rpb24nKSA/IG9uQmVmb3JlIDogKCkgPT4ge307XG5cbiAgICBjb25zdCBvbkJlZm9yZU1vZGFsID0gdGhpcy5vcHRpb25zWydvbkJlZm9yZU1vZGFsJ107XG4gICAgdGhpcy5vbkJlZm9yZU1vZGFsID0gKHR5cGVvZiBvbkJlZm9yZU1vZGFsID09ICdmdW5jdGlvbicpID8gb25CZWZvcmVNb2RhbCA6ICgpID0+IHt9O1xuXG4gICAgY29uc3Qgb25Nb2RhbCA9IHRoaXMub3B0aW9uc1snb25Nb2RhbCddO1xuICAgIHRoaXMub25Nb2RhbCA9ICh0eXBlb2Ygb25Nb2RhbCA9PSAnZnVuY3Rpb24nKSA/IG9uTW9kYWwgOiAoKSA9PiB7fTtcblxuICAgIGNvbnN0IG9uQ2xvc2VBZnRlciA9IHRoaXMub3B0aW9uc1snb25DbG9zZUFmdGVyJ107XG4gICAgdGhpcy5vbkNsb3NlQWZ0ZXIgPSAodHlwZW9mIG9uQ2xvc2VBZnRlciA9PSAnZnVuY3Rpb24nKSA/IG9uQ2xvc2VBZnRlciA6ICgpID0+IHt9O1xuXG4gICAgdGhpcy5vbklnbml0ZSgpO1xuICB9XG5cbiAgb25JZ25pdGUoKSB7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5vcHRpb25zWyd0YXJnZXQnXTtcbiAgICBjb25zdCBsb2FkaW5nRWxlbWVudCA9IHRoaXMub3B0aW9uc1snbG9hZGluZ0VsZW1lbnQnXTtcbiAgICBjb25zdCBtb2RhbEVsZW1lbnQgPSB0aGlzLm9wdGlvbnNbJ21vZGFsRWxlbWVudCddO1xuICAgIGNvbnN0IGluc2VydEVsZW1lbnQgPSB0aGlzLm9wdGlvbnNbJ2luc2VydEVsZW1lbnQnXTtcbiAgICBjb25zdCBpc1RhcmdldCA9IG1vZGFsRWxlbWVudCA9PSBudWxsICYmIHRhcmdldCAhPT0gbnVsbDtcblxuICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNoZWNrUHJvbWlzZSh0aGlzLm9uQmVmb3JlLCAocmVzdWx0KSA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZXJyb3IgbWVzc2FnZScpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSlcbiAgICAudGhlbigobmV4dEZsdWcpID0+IHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChuZXh0Rmx1Zykge1xuICAgICAgICAgIGNoZWNrUHJvbWlzZSh0aGlzLm9uQmVmb3JlTW9kYWwsIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIC8vIHNob3cgbG9hZGluZ1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nKCkuc2hvd0xvYWRpbmcobG9hZGluZ0VsZW1lbnQpO1xuXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2Vycm9yIG1lc3NhZ2UnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZXJyb3IgbWVzc2FnZScpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSlcbiAgICAudGhlbigobmV4dEZsdWcpID0+IHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChuZXh0Rmx1Zykge1xuICAgICAgICAgIC8vIHNob3cgbW9kYWxcbiAgICAgICAgICBpZiAoaXNUYXJnZXQpIHtcbiAgICAgICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ29wYWNpdHk6IDA7IGRpc3BsYXk6IGJsb2NrOyAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAuM3M7IHRyYW5zaXRpb246IGFsbCAuM3M7Jyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBtb2RhbEVsZW1lbnQpO1xuICAgICAgICAgICAgaWYoaW5zZXJ0RWxlbWVudCAhPT0gbnVsbCApIHtcbiAgICAgICAgICAgICAgdmFyIGNvbnRlbnRfaW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGVtX19jb250ZW50SW5uZXInKTtcbiAgICAgICAgICAgICAgY29udGVudF9pbm5lci5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGluc2VydEVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgncGVtX19vcGVuJyk7XG5cbiAgICAgICAgICBjaGVja1Byb21pc2UodGhpcy5vbk1vZGFsLCAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2Vycm9yIG1lc3NhZ2UnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZXJyb3IgbWVzc2FnZScpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSlcbiAgICAudGhlbigobmV4dEZsdWcpID0+IHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChuZXh0Rmx1Zykge1xuICAgICAgICAgIC8vIGhpZGUgbG9hZGluZ1xuICAgICAgICAgIHRoaXMubG9hZGluZygpLmhpZGVMb2FkaW5nKCk7XG5cbiAgICAgICAgICAvLyBhZGQgbW9kYWxcbiAgICAgICAgICBjb25zdCBtb2RhbCA9ICh0YXJnZXQgPT0gdm9pZCAwIHx8IHRhcmdldCA9PSBudWxsKSA/IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwZW0nKSA6IHRhcmdldDtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmIChpc1RhcmdldCkge1xuICAgICAgICAgICAgICBtb2RhbC5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ3BlbS0tYWN0aXZhdGUnKTtcbiAgICAgICAgICB9LCAxKTtcblxuICAgICAgICAgIC8vIGhpZGUgbW9kYWwgZXZlbnRcbiAgICAgICAgICBjb25zdCBwZW1DbG9zZSA9IG1vZGFsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BlbUNsb3NlJyk7XG4gICAgICAgICAgZm9yIChsZXQgc2VsZiBvZiBBcnJheS5mcm9tKHBlbUNsb3NlKSkge1xuICAgICAgICAgICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudF8yKSA9PiB7XG4gICAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncGVtX19vcGVuJyk7XG4gICAgICAgICAgICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ3BlbS0tYWN0aXZhdGUnKTtcblxuICAgICAgICAgICAgICBpZiAoaXNUYXJnZXQpIHtcbiAgICAgICAgICAgICAgICBtb2RhbC5zdHlsZS5vcGFjaXR5ID0gMDtcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICAgIGNoZWNrUHJvbWlzZSh0aGlzLm9uQ2xvc2VBZnRlcik7XG4gICAgICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIG1vZGFsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobW9kYWwpO1xuICAgICAgICAgICAgICAgICAgY2hlY2tQcm9taXNlKHRoaXMub25DbG9zZUFmdGVyKTtcbiAgICAgICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBub3QgaGlkZSBwZW1fX2NvbnRlbnRJbm5lciBpbiBjbGljayBldmVudFxuICAgICAgICAgIGNvbnN0IHBlbV9fY29udGVudElubmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BlbV9fY29udGVudElubmVyJyk7XG4gICAgICAgICAgaWYocGVtX19jb250ZW50SW5uZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHBlbV9fY29udGVudElubmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50XzMpID0+IHtcbiAgICAgICAgICAgICAgZXZlbnRfMy5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIG1vZGFsIHNjcm9sbGluZyBvbiBtb2JpbGUgZGV2aWNlc1xuICAgICAgICAgIGJvZHkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgKGUpID0+IHtcbiAgICAgICAgICAgIGxldCBoYXNDbGFzcyA9IGJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdwZW1fX29wZW4nKTtcbiAgICAgICAgICAgIGlmKGhhc0NsYXNzKSB7XG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2Vycm9yIG1lc3NhZ2UnKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgbGV0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BlbScpO1xuICAgICAgaWYobW9kYWwgIT09IG51bGwpIHtcbiAgICAgICAgbW9kYWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChtb2RhbCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubG9hZGluZygpLmhpZGVMb2FkaW5nKCk7XG4gICAgfSk7XG5cbiAgICAvKlxuICAgICAqIGNoZWNrUHJvbWlzZSAtIFByb21pc2Xjga7mnInnhKHjgpLjg4Hjgqfjg4Pjgq9cbiAgICAgKlxuICAgICAqIEBwYXJhbXMgKG1vZGFsRnVuY3Rpb24pIGZ1bmN0aW9uIC0gRnVuY3Rpb24gdG8gY2hlY2sgZm9yIHByb21pc2VcbiAgICAgKiBAcGFyYW1zIChmdW5jKSBmdW5jdGlvbiAtIEZ1bmN0aW9uIGFmdGVyIGNoZWNrZWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjaGVja1Byb21pc2UobW9kYWxGdW5jdGlvbiwgZnVuYykge1xuICAgICAgaWYobW9kYWxGdW5jdGlvbiAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGlmKHR5cGVvZiBtb2RhbEZ1bmN0aW9uLnRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBtb2RhbEZ1bmN0aW9uKClcbiAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBpZihmdW5jID09IHZvaWQgMCl7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jKHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmMocmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUobW9kYWxGdW5jdGlvbigpKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgaWYoZnVuYyA9PSB2b2lkIDApe1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jKHRydWUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jKHJlc3VsdCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYoZnVuYyAhPT0gdm9pZCAwKXtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYXNNb2RhbEVsZW1lbnQoZWxlbWVudCwgdGFyZ2V0KSB7XG4gICAgLy8gY2hlY2sgbW9kYWwgZWxlbWVudFxuICAgIGlmKGVsZW1lbnQgPT0gbnVsbCAmJiB0YXJnZXQgPT0gbnVsbCkge1xuICAgICAgZWxlbWVudCA9IGBcbiAgICAgICAgPGRpdiBpZD1cInBlbVwiIGNsYXNzPVwicGVtIHBlbUNsb3NlXCIgcm9sZT1cImRpYWxvZ1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwZW1fX3dyYXBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwZW1fX2JvZHlcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBlbV9fY29udGVudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwZW1fX2Nsb3NlIHBlbUNsb3NlXCI+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj7Dlzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwicGVtX19jb250ZW50SW5uZXJcIiBjbGFzcz1cInBlbV9fY29udGVudElubmVyXCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PmA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICBoYXNJbnNlcnRFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAvLyBjaGVjayBtb2RhbCBpbnNlcnQgZWxlbWVudFxuICAgIGlmKGVsZW1lbnQgIT09IG51bGwgJiYgKHt9KS50b1N0cmluZy5jYWxsKGVsZW1lbnQpID09PSAnW29iamVjdCBTdHJpbmddJyAmJiAwIDwgZWxlbWVudC5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBoYXNMb2FkaW5nSWNvbihpY29uKSB7XG4gICAgaWYoaWNvbiA9PSB2b2lkIDAgfHwgaWNvbiA9PSBudWxsKSB7XG4gICAgICBpY29uID0gJzxpbWcgc3JjPVwiL2Fzc2V0cy9pbWFnZXMvbG9hZGluZy5naWZcIj4nO1xuICAgIH1cblxuICAgIHJldHVybiBpY29uO1xuICB9XG5cbiAgaGFzTG9hZGluZ0VsZW1lbnQoZWxlbWVudCwgaWNvbikge1xuICAgIGlmKGVsZW1lbnQgPT0gdm9pZCAwIHx8IGVsZW1lbnQgPT0gbnVsbCkge1xuICAgICAgZWxlbWVudCA9IGBcbiAgICAgICAgPGRpdiBpZD1cInBlbUxvYWRpbmdcIiBjbGFzcz1cInBlbUxvYWRpbmdcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicGVtTG9hZGluZ19fd3JhcHBlclwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGVtTG9hZGluZ19fYm9keVwiPlxuICAgICAgICAgICAgICAgICR7aWNvbn1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+YDtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIGxvYWRpbmcoKSB7XG4gICAgbGV0IG9iaiA9IHtcbiAgICAgIC8vIHNob3cgbG9hZGluZ1xuICAgICAgc2hvd0xvYWRpbmc6IChsb2FkaW5nRWxlbWVudCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgbG9hZGluZ0VsZW1lbnQpO1xuICAgICAgICBsZXQgbG9hZGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwZW1Mb2FkaW5nJyk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGlmKGxvYWRpbmcgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGxvYWRpbmcuY2xhc3NMaXN0LmFkZCgncGVtTG9hZGluZy0tYWN0aXZhdGUnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDEpO1xuICAgICAgfSxcblxuICAgICAgLy8gaGlkZSBsb2FkaW5nXG4gICAgICBoaWRlTG9hZGluZzogKCkgPT4ge1xuICAgICAgICBsZXQgbG9hZGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwZW1Mb2FkaW5nJyk7XG4gICAgICAgIGlmKGxvYWRpbmcgIT09IG51bGwpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGxvYWRpbmcuY2xhc3NMaXN0LnJlbW92ZSgncGVtTG9hZGluZy0tYWN0aXZhdGUnKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBpZihsb2FkaW5nLnBhcmVudE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBsb2FkaW5nLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobG9hZGluZyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBFTW9kYWw7XG5pZiAodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJykge1xuICAhd2luZG93LlBFTW9kYWwgJiYgKHdpbmRvdy5QRU1vZGFsID0gUEVNb2RhbCk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvcGVtb2RhbC5qcyJdLCJzb3VyY2VSb290IjoiIn0=
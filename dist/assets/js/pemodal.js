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
	      addModalClass: null,
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
	
	      // check add Class for modal
	      this.options['addModalClass'] = this.hasAddModalClass(this.options['addModalClass']);
	
	      // check loading icon
	      this.options['loadingIcon'] = this.hasLoadingIcon(this.options['loadingIcon']);
	
	      // check loading element
	      this.options['loadingElement'] = this.hasLoadingElement(this.options['loadingElement'], this.options['loadingIcon']);
	
	      // check modal element
	      this.options['modalElement'] = this.hasModalElement(this.options['modalElement'], this.options['target'], this.options['addModalClass']);
	
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
	      var hasTarget = modalElement == null && target !== null;
	
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
	            if (hasTarget) {
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
	                if (hasTarget) {
	                  modal.style.opacity = 1;
	                }
	                modal.classList.add('pem--activate');
	              }, 1);
	
	              // hide modal event
	              var pemClose = document.getElementsByClassName('pemClose');
	              var _iteratorNormalCompletion = true;
	              var _didIteratorError = false;
	              var _iteratorError = undefined;
	
	              try {
	                for (var _iterator = Array.from(pemClose)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                  var self = _step.value;
	
	                  self.addEventListener('click', function (event_2) {
	                    body.classList.remove('pem__open');
	                    modal.classList.remove('pem--activate');
	
	                    if (hasTarget) {
	                      modal.style.opacity = 0;
	
	                      setTimeout(function () {
	                        modal.style.display = 'none';
	                        checkPromise(_this.onCloseAfter);
	                      }, 300);
	                    } else {
	                      setTimeout(function () {
	                        if (modal.parentNode !== null) {
	                          modal.parentNode.removeChild(modal);
	                          checkPromise(_this.onCloseAfter);
	                        }
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
	    key: 'hasAddModalClass',
	    value: function hasAddModalClass(addClass) {
	      // check modal Class
	      if (addClass !== null && {}.toString.call(addClass) === '[object String]' && 0 < addClass.length) {
	        return addClass;
	      } else {
	        return null;
	      }
	    }
	  }, {
	    key: 'hasModalElement',
	    value: function hasModalElement(element, target, addModalClass) {
	      // check modal element
	      if (element == null && target == null) {
	        addModalClass = addModalClass !== null ? addModalClass : '';
	        element = '\n        <div id="pem" class="pem pemClose ' + addModalClass + '" role="dialog">\n          <div class="pem__wrap">\n            <div class="pem__body">\n              <div class="pem__content">\n                <div class="pem__close pemClose">\n                  <span>\xD7</span>\n                </div>\n                <div id="pem__contentInner" class="pem__contentInner">\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>';
	      }
	
	      return element;
	    }
	  }, {
	    key: 'hasInsertElement',
	    value: function hasInsertElement(element) {
	      // check modal insert element
	      if (element instanceof Object) {
	        var elements = '';
	
	        if (element.length == null && 0 < element.outerHTML.length) {
	          element = element.outerHTML;
	        } else if (0 < element.length) {
	          var _iteratorNormalCompletion2 = true;
	          var _didIteratorError2 = false;
	          var _iteratorError2 = undefined;
	
	          try {
	            for (var _iterator2 = Array.from(element)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	              var self = _step2.value;
	
	              elements += self.outerHTML;
	            }
	          } catch (err) {
	            _didIteratorError2 = true;
	            _iteratorError2 = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                _iterator2.return();
	              }
	            } finally {
	              if (_didIteratorError2) {
	                throw _iteratorError2;
	              }
	            }
	          }
	
	          element = elements;
	        }
	      }
	
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmVhMGEyZTU5NzY3OWQ0MGUwNmUiLCJ3ZWJwYWNrOi8vLy4vanMvcGVtb2RhbC5qcyJdLCJuYW1lcyI6WyJQRU1vZGFsIiwib3B0aW9ucyIsImRlZmF1bHRzIiwiYWRkTW9kYWxDbGFzcyIsImJ1dHRvbiIsIm1vZGFsRWxlbWVudCIsImluc2VydEVsZW1lbnQiLCJsb2FkaW5nRWxlbWVudCIsImxvYWRpbmdJY29uIiwidGFyZ2V0Iiwib25CZWZvcmUiLCJvbkJlZm9yZU1vZGFsIiwib25Nb2RhbCIsIm9uQ2xvc2VBZnRlciIsImluaXQiLCJPYmplY3QiLCJnZXRQcm90b3R5cGVPZiIsInByb3RvdHlwZSIsImtleSIsImhhc093blByb3BlcnR5IiwiZGVzdCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImVudW1lcmFibGUiLCJjaGVja09wdGlvbnMiLCJjb25zb2xlIiwid2FybiIsImxlbmd0aCIsImhhc0FkZE1vZGFsQ2xhc3MiLCJoYXNMb2FkaW5nSWNvbiIsImhhc0xvYWRpbmdFbGVtZW50IiwiaGFzTW9kYWxFbGVtZW50IiwiaGFzSW5zZXJ0RWxlbWVudCIsIm9uSWduaXRlIiwiYm9keSIsImRvY3VtZW50IiwiaGFzVGFyZ2V0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJjaGVja1Byb21pc2UiLCJyZXN1bHQiLCJFcnJvciIsInRoZW4iLCJuZXh0Rmx1ZyIsImxvYWRpbmciLCJzaG93TG9hZGluZyIsInNldEF0dHJpYnV0ZSIsImluc2VydEFkamFjZW50SFRNTCIsImNvbnRlbnRfaW5uZXIiLCJnZXRFbGVtZW50QnlJZCIsImNsYXNzTGlzdCIsImFkZCIsImhpZGVMb2FkaW5nIiwibW9kYWwiLCJzZXRUaW1lb3V0Iiwic3R5bGUiLCJvcGFjaXR5IiwicGVtQ2xvc2UiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiQXJyYXkiLCJmcm9tIiwic2VsZiIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudF8yIiwicmVtb3ZlIiwiZGlzcGxheSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInBlbV9fY29udGVudElubmVyIiwiZXZlbnRfMyIsInN0b3BQcm9wYWdhdGlvbiIsImUiLCJoYXNDbGFzcyIsImNvbnRhaW5zIiwicHJldmVudERlZmF1bHQiLCJwYXNzaXZlIiwiY2F0Y2giLCJlcnJvciIsImxvZyIsIm1vZGFsRnVuY3Rpb24iLCJmdW5jIiwiYWRkQ2xhc3MiLCJ0b1N0cmluZyIsImNhbGwiLCJlbGVtZW50IiwiZWxlbWVudHMiLCJvdXRlckhUTUwiLCJpY29uIiwib2JqIiwid2luZG93Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Q0E7Ozs7Ozs7OztLQVNNQSxPO0FBQ0osb0JBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFDbkIsU0FBSUMsV0FBVztBQUNiQyxzQkFBZ0IsSUFESDtBQUViQyxlQUFnQixJQUZIO0FBR2JDLHFCQUFnQixJQUhIO0FBSWJDLHNCQUFnQixJQUpIO0FBS2JDLHVCQUFnQixJQUxIO0FBTWJDLG9CQUFnQixJQU5IO0FBT2JDLGVBQWdCLElBUEg7QUFRYkMsaUJBQWdCLElBUkg7QUFTYkMsc0JBQWdCLElBVEg7QUFVYkMsZ0JBQWdCLElBVkg7QUFXYkMscUJBQWdCO0FBWEgsTUFBZjs7QUFjQSxVQUFLQyxJQUFMLENBQVVaLFFBQVYsRUFBb0JELE9BQXBCO0FBQ0Q7Ozs7MEJBRUlDLFEsRUFBVUQsTyxFQUFTO0FBQ3RCLFdBQUdBLG1CQUFtQmMsTUFBbkIsSUFBNkJBLE9BQU9DLGNBQVAsQ0FBc0JmLE9BQXRCLE1BQW1DYyxPQUFPRSxTQUExRSxFQUFxRjtB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QUFSLEtBQW9CeUYsT0FBT3pGLE9BQVAsR0FBaUJBLE9BQXJDO0FBQ0QsRSIsImZpbGUiOiJwZW1vZGFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMmVhMGEyZTU5NzY3OWQ0MGUwNmUiLCIvKipcblBsdWdpbiBFUzYgTW9kYWxcblxuQ29weXJpZ2h0IChjKSAyMDE3XG5cblRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuKi9cblxuY2xhc3MgUEVNb2RhbCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBsZXQgZGVmYXVsdHMgPSB7XG4gICAgICBhZGRNb2RhbENsYXNzOiAgbnVsbCxcbiAgICAgIGJ1dHRvbjogICAgICAgICBudWxsLFxuICAgICAgbW9kYWxFbGVtZW50OiAgIG51bGwsXG4gICAgICBpbnNlcnRFbGVtZW50OiAgbnVsbCxcbiAgICAgIGxvYWRpbmdFbGVtZW50OiBudWxsLFxuICAgICAgbG9hZGluZ0ljb246ICAgIG51bGwsXG4gICAgICB0YXJnZXQ6ICAgICAgICAgbnVsbCxcbiAgICAgIG9uQmVmb3JlOiAgICAgICBudWxsLFxuICAgICAgb25CZWZvcmVNb2RhbDogIG51bGwsXG4gICAgICBvbk1vZGFsOiAgICAgICAgbnVsbCxcbiAgICAgIG9uQ2xvc2VBZnRlcjogICBudWxsLFxuICAgIH07XG5cbiAgICB0aGlzLmluaXQoZGVmYXVsdHMsIG9wdGlvbnMpO1xuICB9XG5cbiAgaW5pdChkZWZhdWx0cywgb3B0aW9ucykge1xuICAgIGlmKG9wdGlvbnMgaW5zdGFuY2VvZiBPYmplY3QgfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG9wdGlvbnMpID09PSBPYmplY3QucHJvdG90eXBlKSB7XG4gICAgICB0aGlzLm9wdGlvbnMgPSBkZWZhdWx0cztcblxuICAgICAgLy8gY2hlY2sgZXhpc3RzIHNhbWUga2V5XG4gICAgICBmb3IodmFyIGtleSBpbiBvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICB2YXIgZGVzdCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob3B0aW9ucywga2V5KTtcbiAgICAgICAgICBpZiAoZGVzdC5lbnVtZXJhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNba2V5XSA9IG9wdGlvbnNba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5jaGVja09wdGlvbnMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrT3B0aW9ucygpIHtcbiAgICAvLyBjaGVjayBidXR0b25cbiAgICBsZXQgYnV0dG9uID0gdGhpcy5vcHRpb25zWydidXR0b24nXTtcbiAgICBpZihidXR0b24gPT0gbnVsbCAmJiBidXR0b24gaW5zdGFuY2VvZiBPYmplY3QgIT09IGZhbHNlKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ3BlbSBidXR0b24gdW5kaWZpbmVkIScpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIHRhcmdldFxuICAgIGxldCB0YXJnZXQgPSB0aGlzLm9wdGlvbnNbJ3RhcmdldCddO1xuICAgIGlmKHRhcmdldCBpbnN0YW5jZW9mIE9iamVjdCA9PSBmYWxzZSkge1xuICAgICAgdGhpcy5vcHRpb25zWyd0YXJnZXQnXSA9IG51bGw7XG4gICAgfSBlbHNlIGlmKHRoaXMub3B0aW9uc1sndGFyZ2V0J10ubGVuZ3RoICE9IHZvaWQgMCkge1xuICAgICAgLy8gaWYganF1cnR5IG9iamVjdFxuICAgICAgdGhpcy5vcHRpb25zWyd0YXJnZXQnXSA9IHRhcmdldFswXTtcbiAgICB9XG5cbiAgICAvLyBjaGVjayBhZGQgQ2xhc3MgZm9yIG1vZGFsXG4gICAgdGhpcy5vcHRpb25zWydhZGRNb2RhbENsYXNzJ10gPSB0aGlzLmhhc0FkZE1vZGFsQ2xhc3ModGhpcy5vcHRpb25zWydhZGRNb2RhbENsYXNzJ10pO1xuXG4gICAgLy8gY2hlY2sgbG9hZGluZyBpY29uXG4gICAgdGhpcy5vcHRpb25zWydsb2FkaW5nSWNvbiddID0gdGhpcy5oYXNMb2FkaW5nSWNvbih0aGlzLm9wdGlvbnNbJ2xvYWRpbmdJY29uJ10pO1xuXG4gICAgLy8gY2hlY2sgbG9hZGluZyBlbGVtZW50XG4gICAgdGhpcy5vcHRpb25zWydsb2FkaW5nRWxlbWVudCddID0gdGhpcy5oYXNMb2FkaW5nRWxlbWVudCh0aGlzLm9wdGlvbnNbJ2xvYWRpbmdFbGVtZW50J10sIHRoaXMub3B0aW9uc1snbG9hZGluZ0ljb24nXSk7XG5cbiAgICAvLyBjaGVjayBtb2RhbCBlbGVtZW50XG4gICAgdGhpcy5vcHRpb25zWydtb2RhbEVsZW1lbnQnXSA9IHRoaXMuaGFzTW9kYWxFbGVtZW50KHRoaXMub3B0aW9uc1snbW9kYWxFbGVtZW50J10sIHRoaXMub3B0aW9uc1sndGFyZ2V0J10sIHRoaXMub3B0aW9uc1snYWRkTW9kYWxDbGFzcyddKTtcblxuICAgIC8vIGNoZWNrIG1vZGFsIGluc2VydCBFbGVtZW50XG4gICAgdGhpcy5vcHRpb25zWydpbnNlcnRFbGVtZW50J10gPSB0aGlzLmhhc0luc2VydEVsZW1lbnQodGhpcy5vcHRpb25zWydpbnNlcnRFbGVtZW50J10pO1xuXG4gICAgLy8gY2hlY2sgZnVuY3Rpb25cbiAgICBjb25zdCBvbkJlZm9yZSA9IHRoaXMub3B0aW9uc1snb25CZWZvcmUnXTtcbiAgICB0aGlzLm9uQmVmb3JlID0gKHR5cGVvZiBvbkJlZm9yZSA9PSAnZnVuY3Rpb24nKSA/IG9uQmVmb3JlIDogKCkgPT4ge307XG5cbiAgICBjb25zdCBvbkJlZm9yZU1vZGFsID0gdGhpcy5vcHRpb25zWydvbkJlZm9yZU1vZGFsJ107XG4gICAgdGhpcy5vbkJlZm9yZU1vZGFsID0gKHR5cGVvZiBvbkJlZm9yZU1vZGFsID09ICdmdW5jdGlvbicpID8gb25CZWZvcmVNb2RhbCA6ICgpID0+IHt9O1xuXG4gICAgY29uc3Qgb25Nb2RhbCA9IHRoaXMub3B0aW9uc1snb25Nb2RhbCddO1xuICAgIHRoaXMub25Nb2RhbCA9ICh0eXBlb2Ygb25Nb2RhbCA9PSAnZnVuY3Rpb24nKSA/IG9uTW9kYWwgOiAoKSA9PiB7fTtcblxuICAgIGNvbnN0IG9uQ2xvc2VBZnRlciA9IHRoaXMub3B0aW9uc1snb25DbG9zZUFmdGVyJ107XG4gICAgdGhpcy5vbkNsb3NlQWZ0ZXIgPSAodHlwZW9mIG9uQ2xvc2VBZnRlciA9PSAnZnVuY3Rpb24nKSA/IG9uQ2xvc2VBZnRlciA6ICgpID0+IHt9O1xuXG4gICAgdGhpcy5vbklnbml0ZSgpO1xuICB9XG5cbiAgb25JZ25pdGUoKSB7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5vcHRpb25zWyd0YXJnZXQnXTtcbiAgICBjb25zdCBsb2FkaW5nRWxlbWVudCA9IHRoaXMub3B0aW9uc1snbG9hZGluZ0VsZW1lbnQnXTtcbiAgICBjb25zdCBtb2RhbEVsZW1lbnQgPSB0aGlzLm9wdGlvbnNbJ21vZGFsRWxlbWVudCddO1xuICAgIGNvbnN0IGluc2VydEVsZW1lbnQgPSB0aGlzLm9wdGlvbnNbJ2luc2VydEVsZW1lbnQnXTtcbiAgICBjb25zdCBoYXNUYXJnZXQgPSBtb2RhbEVsZW1lbnQgPT0gbnVsbCAmJiB0YXJnZXQgIT09IG51bGw7XG5cbiAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjaGVja1Byb21pc2UodGhpcy5vbkJlZm9yZSwgKHJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2Vycm9yIG1lc3NhZ2UnKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pXG4gICAgLnRoZW4oKG5leHRGbHVnKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAobmV4dEZsdWcpIHtcbiAgICAgICAgICBjaGVja1Byb21pc2UodGhpcy5vbkJlZm9yZU1vZGFsLCAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAvLyBzaG93IGxvYWRpbmdcbiAgICAgICAgICAgIHRoaXMubG9hZGluZygpLnNob3dMb2FkaW5nKGxvYWRpbmdFbGVtZW50KTtcblxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdlcnJvciBtZXNzYWdlJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2Vycm9yIG1lc3NhZ2UnKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pXG4gICAgLnRoZW4oKG5leHRGbHVnKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAobmV4dEZsdWcpIHtcbiAgICAgICAgICAvLyBzaG93IG1vZGFsXG4gICAgICAgICAgaWYgKGhhc1RhcmdldCkge1xuICAgICAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnb3BhY2l0eTogMDsgZGlzcGxheTogYmxvY2s7IC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIC4zczsgdHJhbnNpdGlvbjogYWxsIC4zczsnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIG1vZGFsRWxlbWVudCk7XG4gICAgICAgICAgICBpZihpbnNlcnRFbGVtZW50ICE9PSBudWxsICkge1xuICAgICAgICAgICAgICB2YXIgY29udGVudF9pbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwZW1fX2NvbnRlbnRJbm5lcicpO1xuICAgICAgICAgICAgICBjb250ZW50X2lubmVyLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgaW5zZXJ0RWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCdwZW1fX29wZW4nKTtcblxuICAgICAgICAgIGNoZWNrUHJvbWlzZSh0aGlzLm9uTW9kYWwsIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZXJyb3IgbWVzc2FnZScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdlcnJvciBtZXNzYWdlJykpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KVxuICAgIC50aGVuKChuZXh0Rmx1ZykgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKG5leHRGbHVnKSB7XG4gICAgICAgICAgLy8gaGlkZSBsb2FkaW5nXG4gICAgICAgICAgdGhpcy5sb2FkaW5nKCkuaGlkZUxvYWRpbmcoKTtcblxuICAgICAgICAgIC8vIGFkZCBtb2RhbFxuICAgICAgICAgIGNvbnN0IG1vZGFsID0gKHRhcmdldCA9PSB2b2lkIDAgfHwgdGFyZ2V0ID09IG51bGwpID8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BlbScpIDogdGFyZ2V0O1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGhhc1RhcmdldCkge1xuICAgICAgICAgICAgICBtb2RhbC5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ3BlbS0tYWN0aXZhdGUnKTtcbiAgICAgICAgICB9LCAxKTtcblxuICAgICAgICAgIC8vIGhpZGUgbW9kYWwgZXZlbnRcbiAgICAgICAgICBjb25zdCBwZW1DbG9zZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BlbUNsb3NlJyk7XG4gICAgICAgICAgZm9yIChsZXQgc2VsZiBvZiBBcnJheS5mcm9tKHBlbUNsb3NlKSkge1xuICAgICAgICAgICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudF8yKSA9PiB7XG4gICAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncGVtX19vcGVuJyk7XG4gICAgICAgICAgICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ3BlbS0tYWN0aXZhdGUnKTtcblxuICAgICAgICAgICAgICBpZiAoaGFzVGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgbW9kYWwuc3R5bGUub3BhY2l0eSA9IDA7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICBjaGVja1Byb21pc2UodGhpcy5vbkNsb3NlQWZ0ZXIpO1xuICAgICAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZihtb2RhbC5wYXJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZGFsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobW9kYWwpO1xuICAgICAgICAgICAgICAgICAgICBjaGVja1Byb21pc2UodGhpcy5vbkNsb3NlQWZ0ZXIpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIG5vdCBoaWRlIHBlbV9fY29udGVudElubmVyIGluIGNsaWNrIGV2ZW50XG4gICAgICAgICAgY29uc3QgcGVtX19jb250ZW50SW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGVtX19jb250ZW50SW5uZXInKTtcbiAgICAgICAgICBpZihwZW1fX2NvbnRlbnRJbm5lciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcGVtX19jb250ZW50SW5uZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnRfMykgPT4ge1xuICAgICAgICAgICAgICBldmVudF8zLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gbW9kYWwgc2Nyb2xsaW5nIG9uIG1vYmlsZSBkZXZpY2VzXG4gICAgICAgICAgYm9keS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCAoZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGhhc0NsYXNzID0gYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ3BlbV9fb3BlbicpO1xuICAgICAgICAgICAgaWYoaGFzQ2xhc3MpIHtcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIHsgcGFzc2l2ZTogZmFsc2UgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZXJyb3IgbWVzc2FnZScpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICBsZXQgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGVtJyk7XG4gICAgICBpZihtb2RhbCAhPT0gbnVsbCkge1xuICAgICAgICBtb2RhbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG1vZGFsKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5sb2FkaW5nKCkuaGlkZUxvYWRpbmcoKTtcbiAgICB9KTtcblxuICAgIC8qXG4gICAgICogY2hlY2tQcm9taXNlIC0gUHJvbWlzZeOBruacieeEoeOCkuODgeOCp+ODg+OCr1xuICAgICAqXG4gICAgICogQHBhcmFtcyAobW9kYWxGdW5jdGlvbikgZnVuY3Rpb24gLSBGdW5jdGlvbiB0byBjaGVjayBmb3IgcHJvbWlzZVxuICAgICAqIEBwYXJhbXMgKGZ1bmMpIGZ1bmN0aW9uIC0gRnVuY3Rpb24gYWZ0ZXIgY2hlY2tlZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNoZWNrUHJvbWlzZShtb2RhbEZ1bmN0aW9uLCBmdW5jKSB7XG4gICAgICBpZihtb2RhbEZ1bmN0aW9uICE9PSB2b2lkIDApIHtcbiAgICAgICAgaWYodHlwZW9mIG1vZGFsRnVuY3Rpb24udGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIG1vZGFsRnVuY3Rpb24oKVxuICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmKGZ1bmMgPT0gdm9pZCAwKXtcbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmModHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gZnVuYyhyZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShtb2RhbEZ1bmN0aW9uKCkpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICBpZihmdW5jID09IHZvaWQgMCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmModHJ1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmMocmVzdWx0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmModHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZihmdW5jICE9PSB2b2lkIDApe1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhc0FkZE1vZGFsQ2xhc3MoYWRkQ2xhc3MpIHtcbiAgICAvLyBjaGVjayBtb2RhbCBDbGFzc1xuICAgIGlmKGFkZENsYXNzICE9PSBudWxsICYmICh7fSkudG9TdHJpbmcuY2FsbChhZGRDbGFzcykgPT09ICdbb2JqZWN0IFN0cmluZ10nICYmIDAgPCBhZGRDbGFzcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBhZGRDbGFzcztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgaGFzTW9kYWxFbGVtZW50KGVsZW1lbnQsIHRhcmdldCwgYWRkTW9kYWxDbGFzcykge1xuICAgIC8vIGNoZWNrIG1vZGFsIGVsZW1lbnRcbiAgICBpZihlbGVtZW50ID09IG51bGwgJiYgdGFyZ2V0ID09IG51bGwpIHtcbiAgICAgIGFkZE1vZGFsQ2xhc3MgPSAoYWRkTW9kYWxDbGFzcyAhPT1udWxsKSA/IGFkZE1vZGFsQ2xhc3MgOiAnJztcbiAgICAgIGVsZW1lbnQgPSBgXG4gICAgICAgIDxkaXYgaWQ9XCJwZW1cIiBjbGFzcz1cInBlbSBwZW1DbG9zZSAke2FkZE1vZGFsQ2xhc3N9XCIgcm9sZT1cImRpYWxvZ1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwZW1fX3dyYXBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwZW1fX2JvZHlcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBlbV9fY29udGVudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwZW1fX2Nsb3NlIHBlbUNsb3NlXCI+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj7Dlzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwicGVtX19jb250ZW50SW5uZXJcIiBjbGFzcz1cInBlbV9fY29udGVudElubmVyXCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PmA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICBoYXNJbnNlcnRFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAvLyBjaGVjayBtb2RhbCBpbnNlcnQgZWxlbWVudFxuICAgIGlmKGVsZW1lbnQgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgIGxldCBlbGVtZW50cyA9ICcnO1xuXG4gICAgICBpZihlbGVtZW50Lmxlbmd0aCA9PSBudWxsICYmIDAgPCBlbGVtZW50Lm91dGVySFRNTC5sZW5ndGgpIHtcbiAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQub3V0ZXJIVE1MO1xuICAgICAgfSBlbHNlIGlmKDAgPCBlbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICBmb3IgKGxldCBzZWxmIG9mIEFycmF5LmZyb20oZWxlbWVudCkpIHtcbiAgICAgICAgICAgZWxlbWVudHMgKz0gc2VsZi5vdXRlckhUTUw7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudCA9IGVsZW1lbnRzO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKGVsZW1lbnQgIT09IG51bGwgJiYgKHt9KS50b1N0cmluZy5jYWxsKGVsZW1lbnQpID09PSAnW29iamVjdCBTdHJpbmddJyAmJiAwIDwgZWxlbWVudC5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBoYXNMb2FkaW5nSWNvbihpY29uKSB7XG4gICAgaWYoaWNvbiA9PSB2b2lkIDAgfHwgaWNvbiA9PSBudWxsKSB7XG4gICAgICBpY29uID0gJzxpbWcgc3JjPVwiL2Fzc2V0cy9pbWFnZXMvbG9hZGluZy5naWZcIj4nO1xuICAgIH1cblxuICAgIHJldHVybiBpY29uO1xuICB9XG5cbiAgaGFzTG9hZGluZ0VsZW1lbnQoZWxlbWVudCwgaWNvbikge1xuICAgIGlmKGVsZW1lbnQgPT0gdm9pZCAwIHx8IGVsZW1lbnQgPT0gbnVsbCkge1xuICAgICAgZWxlbWVudCA9IGBcbiAgICAgICAgPGRpdiBpZD1cInBlbUxvYWRpbmdcIiBjbGFzcz1cInBlbUxvYWRpbmdcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicGVtTG9hZGluZ19fd3JhcHBlclwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGVtTG9hZGluZ19fYm9keVwiPlxuICAgICAgICAgICAgICAgICR7aWNvbn1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+YDtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIGxvYWRpbmcoKSB7XG4gICAgbGV0IG9iaiA9IHtcbiAgICAgIC8vIHNob3cgbG9hZGluZ1xuICAgICAgc2hvd0xvYWRpbmc6IChsb2FkaW5nRWxlbWVudCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgbG9hZGluZ0VsZW1lbnQpO1xuICAgICAgICBsZXQgbG9hZGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwZW1Mb2FkaW5nJyk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGlmKGxvYWRpbmcgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGxvYWRpbmcuY2xhc3NMaXN0LmFkZCgncGVtTG9hZGluZy0tYWN0aXZhdGUnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDEpO1xuICAgICAgfSxcblxuICAgICAgLy8gaGlkZSBsb2FkaW5nXG4gICAgICBoaWRlTG9hZGluZzogKCkgPT4ge1xuICAgICAgICBsZXQgbG9hZGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwZW1Mb2FkaW5nJyk7XG4gICAgICAgIGlmKGxvYWRpbmcgIT09IG51bGwpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGxvYWRpbmcuY2xhc3NMaXN0LnJlbW92ZSgncGVtTG9hZGluZy0tYWN0aXZhdGUnKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBpZihsb2FkaW5nLnBhcmVudE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBsb2FkaW5nLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobG9hZGluZyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBFTW9kYWw7XG5pZiAodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJykge1xuICAhd2luZG93LlBFTW9kYWwgJiYgKHdpbmRvdy5QRU1vZGFsID0gUEVNb2RhbCk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvcGVtb2RhbC5qcyJdLCJzb3VyY2VSb290IjoiIn0=
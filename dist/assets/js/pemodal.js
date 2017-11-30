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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzNiN2IxZjMxYWVmODU4M2ZlNzAiLCJ3ZWJwYWNrOi8vLy4vanMvcGVtb2RhbC5qcyJdLCJuYW1lcyI6WyJQRU1vZGFsIiwib3B0aW9ucyIsImRlZmF1bHRzIiwiYWRkTW9kYWxDbGFzcyIsImJ1dHRvbiIsIm1vZGFsRWxlbWVudCIsImluc2VydEVsZW1lbnQiLCJsb2FkaW5nRWxlbWVudCIsImxvYWRpbmdJY29uIiwidGFyZ2V0Iiwib25CZWZvcmUiLCJvbkJlZm9yZU1vZGFsIiwib25Nb2RhbCIsIm9uQ2xvc2VBZnRlciIsImluaXQiLCJPYmplY3QiLCJnZXRQcm90b3R5cGVPZiIsInByb3RvdHlwZSIsImtleSIsImhhc093blByb3BlcnR5IiwiZGVzdCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImVudW1lcmFibGUiLCJjaGVja09wdGlvbnMiLCJjb25zb2xlIiwid2FybiIsImxlbmd0aCIsImhhc0FkZE1vZGFsQ2xhc3MiLCJoYXNMb2FkaW5nSWNvbiIsImhhc0xvYWRpbmdFbGVtZW50IiwiaGFzTW9kYWxFbGVtZW50IiwiaGFzSW5zZXJ0RWxlbWVudCIsIm9uSWduaXRlIiwiYm9keSIsImRvY3VtZW50IiwiaGFzVGFyZ2V0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJjaGVja1Byb21pc2UiLCJyZXN1bHQiLCJFcnJvciIsInRoZW4iLCJuZXh0Rmx1ZyIsImxvYWRpbmciLCJzaG93TG9hZGluZyIsInNldEF0dHJpYnV0ZSIsImluc2VydEFkamFjZW50SFRNTCIsImNvbnRlbnRfaW5uZXIiLCJnZXRFbGVtZW50QnlJZCIsImNsYXNzTGlzdCIsImFkZCIsImhpZGVMb2FkaW5nIiwibW9kYWwiLCJzZXRUaW1lb3V0Iiwic3R5bGUiLCJvcGFjaXR5IiwicGVtQ2xvc2UiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiQXJyYXkiLCJmcm9tIiwic2VsZiIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudF8yIiwicmVtb3ZlIiwiZGlzcGxheSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInBlbV9fY29udGVudElubmVyIiwiZXZlbnRfMyIsInN0b3BQcm9wYWdhdGlvbiIsImUiLCJoYXNDbGFzcyIsImNvbnRhaW5zIiwicHJldmVudERlZmF1bHQiLCJwYXNzaXZlIiwiY2F0Y2giLCJlcnJvciIsImxvZyIsIm1vZGFsRnVuY3Rpb24iLCJmdW5jIiwiYWRkQ2xhc3MiLCJ0b1N0cmluZyIsImNhbGwiLCJlbGVtZW50Iiwib3V0ZXJIVE1MIiwiaWNvbiIsIm9iaiIsIndpbmRvdyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdENBOzs7Ozs7Ozs7S0FTTUEsTztBQUNKLG9CQUFZQyxPQUFaLEVBQXFCO0FBQUE7O0FBQ25CLFNBQUlDLFdBQVc7QUFDYkMsc0JBQWdCLElBREg7QUFFYkMsZUFBZ0IsSUFGSDtBQUdiQyxxQkFBZ0IsSUFISDtBQUliQyxzQkFBZ0IsSUFKSDtBQUtiQyx1QkFBZ0IsSUFMSDtBQU1iQyxvQkFBZ0IsSUFOSDtBQU9iQyxlQUFnQixJQVBIO0FBUWJDLGlCQUFnQixJQVJIO0FBU2JDLHNCQUFnQixJQVRIO0FBVWJDLGdCQUFnQixJQVZIO0FBV2JDLHFCQUFnQjtBQVhILE1BQWY7O0FBY0EsVUFBS0MsSUFBTCxDQUFVWixRQUFWLEVBQW9CRCxPQUFwQjtBQUNEOzs7OzBCQUVJQyxRLEVBQVVELE8sRUFBUztBQUN0QixXQUFHQSxtQkFBbUJjLE1BQW5CLElBQTZCQSxPQUFPQyxjQUFQLENBQXNCZixPQUF0QixNQUFtQ2MsT0FBT0UsU0FBMUUsRUFBcUY7QUFDbkYsY0FBS2hCLE9BQUwsR0FBZUMsUUFBZjs7QUFFQTtBQUNBLGNBQUksSUFBSWdCLEdBQVIsSUFBZWpCLE9BQWYsRUFBd0I7QUFDdEIsZUFBSUEsUUFBUWtCLGNBQVIsQ0FBdUJELEdBQXZCLENBQUosRUFBaUM7QUFDL0IsaUJBQUlFLE9BQU9MLE9BQU9NLHdCQUFQLENBQWdDcEIsT0FBaEMsRUFBeUNpQixHQUF6QyxDQUFYO0FBQ0EsaUJBQUlFLEtBQUtFLFVBQVQsRUFBcUI7QUFDbkIsb0JBQUtyQixPQUFMLENBQWFpQixHQUFiLElBQW9CakIsUUFBUWlCLEdBQVIsQ0FBcEI7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsY0FBS0ssWUFBTDtBQUNELFFBZEQsTUFjTztBQUNMLGdCQUFPLEtBQVA7QUFDRDtBQUNGOzs7b0NBRWM7QUFDYjtBQUNBLFdBQUluQixTQUFTLEtBQUtILE9BQUwsQ0FBYSxRQUFiLENBQWI7QUFDQSxXQUFHRyxVQUFVLElBQVYsSUFBa0JBLGtCQUFrQlcsTUFBbEIsS0FBNkIsS0FBbEQsRUFBeUQ7QUFDdkRTLGlCQUFRQyxJQUFSLENBQWEsdUJBQWI7QUFDQSxnQkFBTyxLQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxXQUFJaEIsU0FBUyxLQUFLUixPQUFMLENBQWEsUUFBYixDQUFiO0FBQ0EsV0FBR1Esa0JBQWtCTSxNQUFsQixJQUE0QixLQUEvQixFQUFzQztBQUNwQyxjQUFLZCxPQUFMLENBQWEsUUFBYixJQUF5QixJQUF6QjtBQUNELFFBRkQsTUFFTyxJQUFHLEtBQUtBLE9BQUwsQ0FBYSxRQUFiLEVBQXVCeUIsTUFBdkIsSUFBaUMsS0FBSyxDQUF6QyxFQUE0QztBQUNqRDtBQUNBLGNBQUt6QixPQUFMLENBQWEsUUFBYixJQUF5QlEsT0FBTyxDQUFQLENBQXpCO0FBQ0Q7O0FBRUQ7QUFDQSxZQUFLUixPQUFMLENBQWEsZUFBYixJQUFnQyxLQUFLMEIsZ0JBQUwsQ0FBc0IsS0FBSzFCLE9BQUwsQ0FBYSxlQUFiLENBQXRCLENBQWhDOztBQUVBO0FBQ0EsWUFBS0EsT0FBTCxDQUFhLGFBQWIsSUFBOEIsS0FBSzJCLGNBQUwsQ0FBb0IsS0FBSzNCLE9BQUwsQ0FBYSxhQUFiLENBQXBCLENBQTlCOztBQUVBO0FBQ0EsWUFBS0EsT0FBTCxDQUFhLGdCQUFiLElBQWlDLEtBQUs0QixpQkFBTCxDQUF1QixLQUFLNUIsT0FBTCxDQUFhLGdCQUFiLENBQXZCLEVBQXVELEtBQUtBLE9BQUwsQ0FBYSxhQUFiLENBQXZELENBQWpDOztBQUVBO0FBQ0EsWUFBS0EsT0FBTCxDQUFhLGNBQWIsSUFBK0IsS0FBSzZCLGVBQUwsQ0FBcUIsS0FBSzdCLE9BQUwsQ0FBYSxjQUFiLENBQXJCLEVBQW1ELEtBQUtBLE9BQUwsQ0FBYSxRQUFiLENBQW5ELEVBQTJFLEtBQUtBLE9BQUwsQ0FBYSxlQUFiLENBQTNFLENBQS9COztBQUVBO0FBQ0EsWUFBS0EsT0FBTCxDQUFhLGVBQWIsSUFBZ0MsS0FBSzhCLGdCQUFMLENBQXNCLEtBQUs5QixPQUFMLENBQWEsZUFBYixDQUF0QixDQUFoQzs7QUFFQTtBQUNBLFdBQU1TLFdBQVcsS0FBS1QsT0FBTCxDQUFhLFVBQWIsQ0FBakI7QUFDQSxZQUFLUyxRQUFMLEdBQWlCLE9BQU9BLFFBQVAsSUFBbUIsVUFBcEIsR0FBa0NBLFFBQWxDLEdBQTZDLFlBQU0sQ0FBRSxDQUFyRTs7QUFFQSxXQUFNQyxnQkFBZ0IsS0FBS1YsT0FBTCxDQUFhLGVBQWIsQ0FBdEI7QUFDQSxZQUFLVSxhQUFMLEdBQXNCLE9BQU9BLGFBQVAsSUFBd0IsVUFBekIsR0FBdUNBLGFBQXZDLEdBQXVELFlBQU0sQ0FBRSxDQUFwRjs7QUFFQSxXQUFNQyxVQUFVLEtBQUtYLE9BQUwsQ0FBYSxTQUFiLENBQWhCO0FBQ0EsWUFBS1csT0FBTCxHQUFnQixPQUFPQSxPQUFQLElBQWtCLFVBQW5CLEdBQWlDQSxPQUFqQyxHQUEyQyxZQUFNLENBQUUsQ0FBbEU7O0FBRUEsV0FBTUMsZUFBZSxLQUFLWixPQUFMLENBQWEsY0FBYixDQUFyQjtBQUNBLFlBQUtZLFlBQUwsR0FBcUIsT0FBT0EsWUFBUCxJQUF1QixVQUF4QixHQUFzQ0EsWUFBdEMsR0FBcUQsWUFBTSxDQUFFLENBQWpGOztBQUVBLFlBQUttQixRQUFMO0FBQ0Q7OztnQ0FFVTtBQUFBOztBQUNULFdBQU1DLE9BQU9DLFNBQVNELElBQXRCO0FBQ0EsV0FBTXhCLFNBQVMsS0FBS1IsT0FBTCxDQUFhLFFBQWIsQ0FBZjtBQUNBLFdBQU1NLGlCQUFpQixLQUFLTixPQUFMLENBQWEsZ0JBQWIsQ0FBdkI7QUFDQSxXQUFNSSxlQUFlLEtBQUtKLE9BQUwsQ0FBYSxjQUFiLENBQXJCO0FBQ0EsV0FBTUssZ0JBQWdCLEtBQUtMLE9BQUwsQ0FBYSxlQUFiLENBQXRCO0FBQ0EsV0FBTWtDLFlBQVk5QixnQkFBZ0IsSUFBaEIsSUFBd0JJLFdBQVcsSUFBckQ7O0FBRUEsV0FBSTJCLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDL0JDLHNCQUFhLE1BQUs3QixRQUFsQixFQUE0QixVQUFDOEIsTUFBRCxFQUFZO0FBQ3RDLGVBQUlBLE1BQUosRUFBWTtBQUNWSCxxQkFBUUcsTUFBUjtBQUNELFlBRkQsTUFFTztBQUNMRixvQkFBTyxJQUFJRyxLQUFKLENBQVUsZUFBVixDQUFQO0FBQ0Q7QUFDRixVQU5EO0FBT0QsUUFSRCxFQVNDQyxJQVRELENBU00sVUFBQ0MsUUFBRCxFQUFjO0FBQ2xCLGdCQUFPLElBQUlQLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdEMsZUFBSUssUUFBSixFQUFjO0FBQ1pKLDBCQUFhLE1BQUs1QixhQUFsQixFQUFpQyxVQUFDNkIsTUFBRCxFQUFZO0FBQzNDO0FBQ0EscUJBQUtJLE9BQUwsR0FBZUMsV0FBZixDQUEyQnRDLGNBQTNCOztBQUVBLG1CQUFJaUMsTUFBSixFQUFZO0FBQ1ZILHlCQUFRRyxNQUFSO0FBQ0QsZ0JBRkQsTUFFTztBQUNMRix3QkFBTyxJQUFJRyxLQUFKLENBQVUsZUFBVixDQUFQO0FBQ0Q7QUFDRixjQVREO0FBVUQsWUFYRCxNQVdPO0FBQ0xILG9CQUFPLElBQUlHLEtBQUosQ0FBVSxlQUFWLENBQVA7QUFDRDtBQUNGLFVBZk0sQ0FBUDtBQWdCRCxRQTFCRCxFQTJCQ0MsSUEzQkQsQ0EyQk0sVUFBQ0MsUUFBRCxFQUFjO0FBQ2xCLGdCQUFPLElBQUlQLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdEMsZUFBSUssUUFBSixFQUFjO0FBQ1o7QUFDQSxpQkFBSVIsU0FBSixFQUFlO0FBQ2IxQixzQkFBT3FDLFlBQVAsQ0FBb0IsT0FBcEIsRUFBNkIsK0VBQTdCO0FBQ0QsY0FGRCxNQUVPO0FBQ0xiLG9CQUFLYyxrQkFBTCxDQUF3QixXQUF4QixFQUFxQzFDLFlBQXJDO0FBQ0EsbUJBQUdDLGtCQUFrQixJQUFyQixFQUE0QjtBQUMxQixxQkFBSTBDLGdCQUFnQmQsU0FBU2UsY0FBVCxDQUF3QixtQkFBeEIsQ0FBcEI7QUFDQUQsK0JBQWNELGtCQUFkLENBQWlDLFdBQWpDLEVBQThDekMsYUFBOUM7QUFDRDtBQUNGOztBQUVEMkIsa0JBQUtpQixTQUFMLENBQWVDLEdBQWYsQ0FBbUIsV0FBbkI7O0FBRUFaLDBCQUFhLE1BQUszQixPQUFsQixFQUEyQixVQUFDNEIsTUFBRCxFQUFZO0FBQ3JDLG1CQUFJQSxNQUFKLEVBQVk7QUFDVkgseUJBQVFHLE1BQVI7QUFDRCxnQkFGRCxNQUVPO0FBQ0xGLHdCQUFPLElBQUlHLEtBQUosQ0FBVSxlQUFWLENBQVA7QUFDRDtBQUNGLGNBTkQ7QUFPRCxZQXJCRCxNQXFCTztBQUNMSCxvQkFBTyxJQUFJRyxLQUFKLENBQVUsZUFBVixDQUFQO0FBQ0Q7QUFDRixVQXpCTSxDQUFQO0FBMEJELFFBdERELEVBdURDQyxJQXZERCxDQXVETSxVQUFDQyxRQUFELEVBQWM7QUFDbEIsZ0JBQU8sSUFBSVAsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0QyxlQUFJSyxRQUFKLEVBQWM7QUFBQTtBQUNaO0FBQ0EscUJBQUtDLE9BQUwsR0FBZVEsV0FBZjs7QUFFQTtBQUNBLG1CQUFNQyxRQUFTNUMsVUFBVSxLQUFLLENBQWYsSUFBb0JBLFVBQVUsSUFBL0IsR0FBdUN5QixTQUFTZSxjQUFULENBQXdCLEtBQXhCLENBQXZDLEdBQXdFeEMsTUFBdEY7QUFDQTZDLDBCQUFXLFlBQU07QUFDZixxQkFBSW5CLFNBQUosRUFBZTtBQUNia0IseUJBQU1FLEtBQU4sQ0FBWUMsT0FBWixHQUFzQixDQUF0QjtBQUNEO0FBQ0RILHVCQUFNSCxTQUFOLENBQWdCQyxHQUFoQixDQUFvQixlQUFwQjtBQUNELGdCQUxELEVBS0csQ0FMSDs7QUFPQTtBQUNBLG1CQUFNTSxXQUFXdkIsU0FBU3dCLHNCQUFULENBQWdDLFVBQWhDLENBQWpCO0FBZFk7QUFBQTtBQUFBOztBQUFBO0FBZVosc0NBQWlCQyxNQUFNQyxJQUFOLENBQVdILFFBQVgsQ0FBakIsOEhBQXVDO0FBQUEsdUJBQTlCSSxJQUE4Qjs7QUFDckNBLHdCQUFLQyxnQkFBTCxDQUFzQixPQUF0QixFQUErQixVQUFDQyxPQUFELEVBQWE7QUFDMUM5QiwwQkFBS2lCLFNBQUwsQ0FBZWMsTUFBZixDQUFzQixXQUF0QjtBQUNBWCwyQkFBTUgsU0FBTixDQUFnQmMsTUFBaEIsQ0FBdUIsZUFBdkI7O0FBRUEseUJBQUk3QixTQUFKLEVBQWU7QUFDYmtCLDZCQUFNRSxLQUFOLENBQVlDLE9BQVosR0FBc0IsQ0FBdEI7O0FBRUFGLGtDQUFXLFlBQU07QUFDZkQsK0JBQU1FLEtBQU4sQ0FBWVUsT0FBWixHQUFzQixNQUF0QjtBQUNBMUIsc0NBQWEsTUFBSzFCLFlBQWxCO0FBQ0Qsd0JBSEQsRUFHRyxHQUhIO0FBSUQsc0JBUEQsTUFPTztBQUNMeUMsa0NBQVcsWUFBTTtBQUNmLDZCQUFHRCxNQUFNYSxVQUFOLEtBQXFCLElBQXhCLEVBQThCO0FBQzVCYixpQ0FBTWEsVUFBTixDQUFpQkMsV0FBakIsQ0FBNkJkLEtBQTdCO0FBQ0FkLHdDQUFhLE1BQUsxQixZQUFsQjtBQUNEO0FBQ0Ysd0JBTEQsRUFLRyxHQUxIO0FBTUQ7QUFDRixvQkFuQkQ7QUFvQkQ7O0FBRUQ7QUF0Q1k7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUF1Q1osbUJBQU11RCxvQkFBb0JsQyxTQUFTZSxjQUFULENBQXdCLG1CQUF4QixDQUExQjtBQUNBLG1CQUFHbUIsc0JBQXNCLElBQXpCLEVBQStCO0FBQzdCQSxtQ0FBa0JOLGdCQUFsQixDQUFtQyxPQUFuQyxFQUE0QyxVQUFDTyxPQUFELEVBQWE7QUFDdkRBLDJCQUFRQyxlQUFSO0FBQ0Qsa0JBRkQ7QUFHRDs7QUFFRDtBQUNBckMsb0JBQUs2QixnQkFBTCxDQUFzQixXQUF0QixFQUFtQyxVQUFDUyxDQUFELEVBQU87QUFDeEMscUJBQUlDLFdBQVd2QyxLQUFLaUIsU0FBTCxDQUFldUIsUUFBZixDQUF3QixXQUF4QixDQUFmO0FBQ0EscUJBQUdELFFBQUgsRUFBYTtBQUNYRCxxQkFBRUcsY0FBRjtBQUNEO0FBQ0YsZ0JBTEQsRUFLRyxFQUFFQyxTQUFTLEtBQVgsRUFMSDtBQS9DWTtBQXFEYixZQXJERCxNQXFETztBQUNMckMsb0JBQU8sSUFBSUcsS0FBSixDQUFVLGVBQVYsQ0FBUDtBQUNEO0FBQ0YsVUF6RE0sQ0FBUDtBQTBERCxRQWxIRCxFQW1IQ21DLEtBbkhELENBbUhPLFVBQUNDLEtBQUQsRUFBVztBQUNoQnJELGlCQUFRc0QsR0FBUixDQUFZRCxLQUFaO0FBQ0EsYUFBSXhCLFFBQVFuQixTQUFTZSxjQUFULENBQXdCLEtBQXhCLENBQVo7QUFDQSxhQUFHSSxVQUFVLElBQWIsRUFBbUI7QUFDakJBLGlCQUFNYSxVQUFOLENBQWlCQyxXQUFqQixDQUE2QmQsS0FBN0I7QUFDRDs7QUFFRCxlQUFLVCxPQUFMLEdBQWVRLFdBQWY7QUFDRCxRQTNIRDs7QUE2SEE7Ozs7OztBQU1BLGdCQUFTYixZQUFULENBQXNCd0MsYUFBdEIsRUFBcUNDLElBQXJDLEVBQTJDO0FBQ3pDLGFBQUdELGtCQUFrQixLQUFLLENBQTFCLEVBQTZCO0FBQzNCLGVBQUcsT0FBT0EsY0FBY3JDLElBQXJCLEtBQThCLFVBQWpDLEVBQTZDO0FBQzNDcUMsNkJBQ0NyQyxJQURELENBQ00sVUFBQ0YsTUFBRCxFQUFZO0FBQ2hCLG1CQUFHd0MsUUFBUSxLQUFLLENBQWhCLEVBQWtCO0FBQ2hCLHdCQUFPQSxLQUFLLElBQUwsQ0FBUDtBQUNELGdCQUZELE1BRU87QUFDTCx3QkFBT0EsS0FBS3hDLE1BQUwsQ0FBUDtBQUNEO0FBQ0YsY0FQRCxFQVFDb0MsS0FSRCxDQVFPLFlBQU07QUFDWCxzQkFBTyxLQUFQO0FBQ0QsY0FWRDtBQVdELFlBWkQsTUFZTztBQUNMLG9CQUFPLElBQUl4QyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDRCx1QkFBUTBDLGVBQVI7QUFDRCxjQUZNLEVBR05yQyxJQUhNLENBR0QsVUFBQ0YsTUFBRCxFQUFZO0FBQ2hCLG1CQUFJLE9BQU9BLE1BQVAsS0FBa0IsU0FBdEIsRUFBaUM7QUFDL0IscUJBQUd3QyxRQUFRLEtBQUssQ0FBaEIsRUFBa0I7QUFDaEIsMEJBQU9BLEtBQUssSUFBTCxDQUFQO0FBQ0Qsa0JBRkQsTUFFTztBQUNMLDBCQUFPQSxLQUFLeEMsTUFBTCxDQUFQO0FBQ0Q7QUFDRixnQkFORCxNQU1PO0FBQ0wsd0JBQU93QyxLQUFLLElBQUwsQ0FBUDtBQUNEO0FBQ0YsY0FiTSxFQWNOSixLQWRNLENBY0EsWUFBTTtBQUNYLHNCQUFPLEtBQVA7QUFDRCxjQWhCTSxDQUFQO0FBaUJEO0FBQ0YsVUFoQ0QsTUFnQ087QUFDTCxlQUFHSSxTQUFTLEtBQUssQ0FBakIsRUFBbUI7QUFDakIsb0JBQU8sS0FBUDtBQUNEO0FBQ0Y7QUFDRjtBQUNGOzs7c0NBRWdCQyxRLEVBQVU7QUFDekI7QUFDQSxXQUFHQSxhQUFhLElBQWIsSUFBc0IsRUFBRCxDQUFLQyxRQUFMLENBQWNDLElBQWQsQ0FBbUJGLFFBQW5CLE1BQWlDLGlCQUF0RCxJQUEyRSxJQUFJQSxTQUFTdkQsTUFBM0YsRUFBbUc7QUFDakcsZ0JBQU91RCxRQUFQO0FBQ0QsUUFGRCxNQUVPO0FBQ0wsZ0JBQU8sSUFBUDtBQUNEO0FBQ0Y7OztxQ0FFZUcsTyxFQUFTM0UsTSxFQUFRTixhLEVBQWU7QUFDOUM7QUFDQSxXQUFHaUYsV0FBVyxJQUFYLElBQW1CM0UsVUFBVSxJQUFoQyxFQUFzQztBQUNwQ04seUJBQWlCQSxrQkFBaUIsSUFBbEIsR0FBMEJBLGFBQTFCLEdBQTBDLEVBQTFEO0FBQ0FpRixvRUFDc0NqRixhQUR0QztBQWNEOztBQUVELGNBQU9pRixPQUFQO0FBQ0Q7OztzQ0FFZ0JBLE8sRUFBUztBQUN4QjtBQUNBLFdBQUdBLG1CQUFtQnJFLE1BQXRCLEVBQThCO0FBQzVCcUUsbUJBQVVBLFFBQVFDLFNBQWxCO0FBQ0Q7O0FBRUQsV0FBR0QsWUFBWSxJQUFaLElBQXFCLEVBQUQsQ0FBS0YsUUFBTCxDQUFjQyxJQUFkLENBQW1CQyxPQUFuQixNQUFnQyxpQkFBcEQsSUFBeUUsSUFBSUEsUUFBUTFELE1BQXhGLEVBQWdHO0FBQzlGLGdCQUFPMEQsT0FBUDtBQUNELFFBRkQsTUFFTztBQUNMLGdCQUFPLElBQVA7QUFDRDtBQUNGOzs7b0NBRWNFLEksRUFBTTtBQUNuQixXQUFHQSxRQUFRLEtBQUssQ0FBYixJQUFrQkEsUUFBUSxJQUE3QixFQUFtQztBQUNqQ0EsZ0JBQU8sd0NBQVA7QUFDRDs7QUFFRCxjQUFPQSxJQUFQO0FBQ0Q7Ozt1Q0FFaUJGLE8sRUFBU0UsSSxFQUFNO0FBQy9CLFdBQUdGLFdBQVcsS0FBSyxDQUFoQixJQUFxQkEsV0FBVyxJQUFuQyxFQUF5QztBQUN2Q0EsdUxBSVlFLElBSlo7QUFRRDs7QUFFRCxjQUFPRixPQUFQO0FBQ0Q7OzsrQkFFUztBQUNSLFdBQUlHLE1BQU07QUFDUjtBQUNBMUMsc0JBQWEscUJBQUN0QyxjQUFELEVBQW9CO0FBQy9CMkIsb0JBQVNELElBQVQsQ0FBY2Msa0JBQWQsQ0FBaUMsV0FBakMsRUFBOEN4QyxjQUE5QztBQUNBLGVBQUlxQyxVQUFVVixTQUFTZSxjQUFULENBQXdCLFlBQXhCLENBQWQ7QUFDQUssc0JBQVcsWUFBTTtBQUNmLGlCQUFHVixZQUFZLElBQWYsRUFBcUI7QUFDbkJBLHVCQUFRTSxTQUFSLENBQWtCQyxHQUFsQixDQUFzQixzQkFBdEI7QUFDRDtBQUNGLFlBSkQsRUFJRyxDQUpIO0FBS0QsVUFWTzs7QUFZUjtBQUNBQyxzQkFBYSx1QkFBTTtBQUNqQixlQUFJUixVQUFVVixTQUFTZSxjQUFULENBQXdCLFlBQXhCLENBQWQ7QUFDQSxlQUFHTCxZQUFZLElBQWYsRUFBcUI7QUFDbkJVLHdCQUFXLFlBQU07QUFDZlYsdUJBQVFNLFNBQVIsQ0FBa0JjLE1BQWxCLENBQXlCLHNCQUF6QjtBQUNBViwwQkFBVyxZQUFNO0FBQ2YscUJBQUdWLFFBQVFzQixVQUFSLEtBQXVCLElBQTFCLEVBQWdDO0FBQzlCdEIsMkJBQVFzQixVQUFSLENBQW1CQyxXQUFuQixDQUErQnZCLE9BQS9CO0FBQ0Q7QUFDRixnQkFKRCxFQUlHLEdBSkg7QUFLRCxjQVBELEVBT0csR0FQSDtBQVFEO0FBQ0Y7QUF6Qk8sUUFBVjs7QUE0QkEsY0FBTzJDLEdBQVA7QUFDRDs7Ozs7O21CQUdZdkYsTzs7QUFDZixLQUFJLE9BQU93RixNQUFQLElBQWlCLFdBQXJCLEVBQWtDO0FBQ2hDLElBQUNBLE9BQU94RixPQUFSLEtBQW9Cd0YsT0FBT3hGLE9BQVAsR0FBaUJBLE9BQXJDO0FBQ0QsRSIsImZpbGUiOiJwZW1vZGFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMzNiN2IxZjMxYWVmODU4M2ZlNzAiLCIvKipcblBsdWdpbiBFUzYgTW9kYWxcblxuQ29weXJpZ2h0IChjKSAyMDE3XG5cblRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuKi9cblxuY2xhc3MgUEVNb2RhbCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBsZXQgZGVmYXVsdHMgPSB7XG4gICAgICBhZGRNb2RhbENsYXNzOiAgbnVsbCxcbiAgICAgIGJ1dHRvbjogICAgICAgICBudWxsLFxuICAgICAgbW9kYWxFbGVtZW50OiAgIG51bGwsXG4gICAgICBpbnNlcnRFbGVtZW50OiAgbnVsbCxcbiAgICAgIGxvYWRpbmdFbGVtZW50OiBudWxsLFxuICAgICAgbG9hZGluZ0ljb246ICAgIG51bGwsXG4gICAgICB0YXJnZXQ6ICAgICAgICAgbnVsbCxcbiAgICAgIG9uQmVmb3JlOiAgICAgICBudWxsLFxuICAgICAgb25CZWZvcmVNb2RhbDogIG51bGwsXG4gICAgICBvbk1vZGFsOiAgICAgICAgbnVsbCxcbiAgICAgIG9uQ2xvc2VBZnRlcjogICBudWxsLFxuICAgIH07XG5cbiAgICB0aGlzLmluaXQoZGVmYXVsdHMsIG9wdGlvbnMpO1xuICB9XG5cbiAgaW5pdChkZWZhdWx0cywgb3B0aW9ucykge1xuICAgIGlmKG9wdGlvbnMgaW5zdGFuY2VvZiBPYmplY3QgfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG9wdGlvbnMpID09PSBPYmplY3QucHJvdG90eXBlKSB7XG4gICAgICB0aGlzLm9wdGlvbnMgPSBkZWZhdWx0cztcblxuICAgICAgLy8gY2hlY2sgZXhpc3RzIHNhbWUga2V5XG4gICAgICBmb3IodmFyIGtleSBpbiBvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICB2YXIgZGVzdCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob3B0aW9ucywga2V5KTtcbiAgICAgICAgICBpZiAoZGVzdC5lbnVtZXJhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNba2V5XSA9IG9wdGlvbnNba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5jaGVja09wdGlvbnMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrT3B0aW9ucygpIHtcbiAgICAvLyBjaGVjayBidXR0b25cbiAgICBsZXQgYnV0dG9uID0gdGhpcy5vcHRpb25zWydidXR0b24nXTtcbiAgICBpZihidXR0b24gPT0gbnVsbCAmJiBidXR0b24gaW5zdGFuY2VvZiBPYmplY3QgIT09IGZhbHNlKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ3BlbSBidXR0b24gdW5kaWZpbmVkIScpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIHRhcmdldFxuICAgIGxldCB0YXJnZXQgPSB0aGlzLm9wdGlvbnNbJ3RhcmdldCddO1xuICAgIGlmKHRhcmdldCBpbnN0YW5jZW9mIE9iamVjdCA9PSBmYWxzZSkge1xuICAgICAgdGhpcy5vcHRpb25zWyd0YXJnZXQnXSA9IG51bGw7XG4gICAgfSBlbHNlIGlmKHRoaXMub3B0aW9uc1sndGFyZ2V0J10ubGVuZ3RoICE9IHZvaWQgMCkge1xuICAgICAgLy8gaWYganF1cnR5IG9iamVjdFxuICAgICAgdGhpcy5vcHRpb25zWyd0YXJnZXQnXSA9IHRhcmdldFswXTtcbiAgICB9XG5cbiAgICAvLyBjaGVjayBhZGQgQ2xhc3MgZm9yIG1vZGFsXG4gICAgdGhpcy5vcHRpb25zWydhZGRNb2RhbENsYXNzJ10gPSB0aGlzLmhhc0FkZE1vZGFsQ2xhc3ModGhpcy5vcHRpb25zWydhZGRNb2RhbENsYXNzJ10pO1xuXG4gICAgLy8gY2hlY2sgbG9hZGluZyBpY29uXG4gICAgdGhpcy5vcHRpb25zWydsb2FkaW5nSWNvbiddID0gdGhpcy5oYXNMb2FkaW5nSWNvbih0aGlzLm9wdGlvbnNbJ2xvYWRpbmdJY29uJ10pO1xuXG4gICAgLy8gY2hlY2sgbG9hZGluZyBlbGVtZW50XG4gICAgdGhpcy5vcHRpb25zWydsb2FkaW5nRWxlbWVudCddID0gdGhpcy5oYXNMb2FkaW5nRWxlbWVudCh0aGlzLm9wdGlvbnNbJ2xvYWRpbmdFbGVtZW50J10sIHRoaXMub3B0aW9uc1snbG9hZGluZ0ljb24nXSk7XG5cbiAgICAvLyBjaGVjayBtb2RhbCBlbGVtZW50XG4gICAgdGhpcy5vcHRpb25zWydtb2RhbEVsZW1lbnQnXSA9IHRoaXMuaGFzTW9kYWxFbGVtZW50KHRoaXMub3B0aW9uc1snbW9kYWxFbGVtZW50J10sIHRoaXMub3B0aW9uc1sndGFyZ2V0J10sIHRoaXMub3B0aW9uc1snYWRkTW9kYWxDbGFzcyddKTtcblxuICAgIC8vIGNoZWNrIG1vZGFsIGluc2VydCBFbGVtZW50XG4gICAgdGhpcy5vcHRpb25zWydpbnNlcnRFbGVtZW50J10gPSB0aGlzLmhhc0luc2VydEVsZW1lbnQodGhpcy5vcHRpb25zWydpbnNlcnRFbGVtZW50J10pO1xuXG4gICAgLy8gY2hlY2sgZnVuY3Rpb25cbiAgICBjb25zdCBvbkJlZm9yZSA9IHRoaXMub3B0aW9uc1snb25CZWZvcmUnXTtcbiAgICB0aGlzLm9uQmVmb3JlID0gKHR5cGVvZiBvbkJlZm9yZSA9PSAnZnVuY3Rpb24nKSA/IG9uQmVmb3JlIDogKCkgPT4ge307XG5cbiAgICBjb25zdCBvbkJlZm9yZU1vZGFsID0gdGhpcy5vcHRpb25zWydvbkJlZm9yZU1vZGFsJ107XG4gICAgdGhpcy5vbkJlZm9yZU1vZGFsID0gKHR5cGVvZiBvbkJlZm9yZU1vZGFsID09ICdmdW5jdGlvbicpID8gb25CZWZvcmVNb2RhbCA6ICgpID0+IHt9O1xuXG4gICAgY29uc3Qgb25Nb2RhbCA9IHRoaXMub3B0aW9uc1snb25Nb2RhbCddO1xuICAgIHRoaXMub25Nb2RhbCA9ICh0eXBlb2Ygb25Nb2RhbCA9PSAnZnVuY3Rpb24nKSA/IG9uTW9kYWwgOiAoKSA9PiB7fTtcblxuICAgIGNvbnN0IG9uQ2xvc2VBZnRlciA9IHRoaXMub3B0aW9uc1snb25DbG9zZUFmdGVyJ107XG4gICAgdGhpcy5vbkNsb3NlQWZ0ZXIgPSAodHlwZW9mIG9uQ2xvc2VBZnRlciA9PSAnZnVuY3Rpb24nKSA/IG9uQ2xvc2VBZnRlciA6ICgpID0+IHt9O1xuXG4gICAgdGhpcy5vbklnbml0ZSgpO1xuICB9XG5cbiAgb25JZ25pdGUoKSB7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5vcHRpb25zWyd0YXJnZXQnXTtcbiAgICBjb25zdCBsb2FkaW5nRWxlbWVudCA9IHRoaXMub3B0aW9uc1snbG9hZGluZ0VsZW1lbnQnXTtcbiAgICBjb25zdCBtb2RhbEVsZW1lbnQgPSB0aGlzLm9wdGlvbnNbJ21vZGFsRWxlbWVudCddO1xuICAgIGNvbnN0IGluc2VydEVsZW1lbnQgPSB0aGlzLm9wdGlvbnNbJ2luc2VydEVsZW1lbnQnXTtcbiAgICBjb25zdCBoYXNUYXJnZXQgPSBtb2RhbEVsZW1lbnQgPT0gbnVsbCAmJiB0YXJnZXQgIT09IG51bGw7XG5cbiAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjaGVja1Byb21pc2UodGhpcy5vbkJlZm9yZSwgKHJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2Vycm9yIG1lc3NhZ2UnKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pXG4gICAgLnRoZW4oKG5leHRGbHVnKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAobmV4dEZsdWcpIHtcbiAgICAgICAgICBjaGVja1Byb21pc2UodGhpcy5vbkJlZm9yZU1vZGFsLCAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAvLyBzaG93IGxvYWRpbmdcbiAgICAgICAgICAgIHRoaXMubG9hZGluZygpLnNob3dMb2FkaW5nKGxvYWRpbmdFbGVtZW50KTtcblxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdlcnJvciBtZXNzYWdlJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2Vycm9yIG1lc3NhZ2UnKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pXG4gICAgLnRoZW4oKG5leHRGbHVnKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAobmV4dEZsdWcpIHtcbiAgICAgICAgICAvLyBzaG93IG1vZGFsXG4gICAgICAgICAgaWYgKGhhc1RhcmdldCkge1xuICAgICAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnb3BhY2l0eTogMDsgZGlzcGxheTogYmxvY2s7IC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIC4zczsgdHJhbnNpdGlvbjogYWxsIC4zczsnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIG1vZGFsRWxlbWVudCk7XG4gICAgICAgICAgICBpZihpbnNlcnRFbGVtZW50ICE9PSBudWxsICkge1xuICAgICAgICAgICAgICB2YXIgY29udGVudF9pbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwZW1fX2NvbnRlbnRJbm5lcicpO1xuICAgICAgICAgICAgICBjb250ZW50X2lubmVyLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgaW5zZXJ0RWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCdwZW1fX29wZW4nKTtcblxuICAgICAgICAgIGNoZWNrUHJvbWlzZSh0aGlzLm9uTW9kYWwsIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZXJyb3IgbWVzc2FnZScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdlcnJvciBtZXNzYWdlJykpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KVxuICAgIC50aGVuKChuZXh0Rmx1ZykgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKG5leHRGbHVnKSB7XG4gICAgICAgICAgLy8gaGlkZSBsb2FkaW5nXG4gICAgICAgICAgdGhpcy5sb2FkaW5nKCkuaGlkZUxvYWRpbmcoKTtcblxuICAgICAgICAgIC8vIGFkZCBtb2RhbFxuICAgICAgICAgIGNvbnN0IG1vZGFsID0gKHRhcmdldCA9PSB2b2lkIDAgfHwgdGFyZ2V0ID09IG51bGwpID8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BlbScpIDogdGFyZ2V0O1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGhhc1RhcmdldCkge1xuICAgICAgICAgICAgICBtb2RhbC5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ3BlbS0tYWN0aXZhdGUnKTtcbiAgICAgICAgICB9LCAxKTtcblxuICAgICAgICAgIC8vIGhpZGUgbW9kYWwgZXZlbnRcbiAgICAgICAgICBjb25zdCBwZW1DbG9zZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BlbUNsb3NlJyk7XG4gICAgICAgICAgZm9yIChsZXQgc2VsZiBvZiBBcnJheS5mcm9tKHBlbUNsb3NlKSkge1xuICAgICAgICAgICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudF8yKSA9PiB7XG4gICAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncGVtX19vcGVuJyk7XG4gICAgICAgICAgICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ3BlbS0tYWN0aXZhdGUnKTtcblxuICAgICAgICAgICAgICBpZiAoaGFzVGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgbW9kYWwuc3R5bGUub3BhY2l0eSA9IDA7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICBjaGVja1Byb21pc2UodGhpcy5vbkNsb3NlQWZ0ZXIpO1xuICAgICAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZihtb2RhbC5wYXJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZGFsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobW9kYWwpO1xuICAgICAgICAgICAgICAgICAgICBjaGVja1Byb21pc2UodGhpcy5vbkNsb3NlQWZ0ZXIpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIG5vdCBoaWRlIHBlbV9fY29udGVudElubmVyIGluIGNsaWNrIGV2ZW50XG4gICAgICAgICAgY29uc3QgcGVtX19jb250ZW50SW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGVtX19jb250ZW50SW5uZXInKTtcbiAgICAgICAgICBpZihwZW1fX2NvbnRlbnRJbm5lciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcGVtX19jb250ZW50SW5uZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnRfMykgPT4ge1xuICAgICAgICAgICAgICBldmVudF8zLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gbW9kYWwgc2Nyb2xsaW5nIG9uIG1vYmlsZSBkZXZpY2VzXG4gICAgICAgICAgYm9keS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCAoZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGhhc0NsYXNzID0gYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ3BlbV9fb3BlbicpO1xuICAgICAgICAgICAgaWYoaGFzQ2xhc3MpIHtcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIHsgcGFzc2l2ZTogZmFsc2UgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZXJyb3IgbWVzc2FnZScpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICBsZXQgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGVtJyk7XG4gICAgICBpZihtb2RhbCAhPT0gbnVsbCkge1xuICAgICAgICBtb2RhbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG1vZGFsKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5sb2FkaW5nKCkuaGlkZUxvYWRpbmcoKTtcbiAgICB9KTtcblxuICAgIC8qXG4gICAgICogY2hlY2tQcm9taXNlIC0gUHJvbWlzZeOBruacieeEoeOCkuODgeOCp+ODg+OCr1xuICAgICAqXG4gICAgICogQHBhcmFtcyAobW9kYWxGdW5jdGlvbikgZnVuY3Rpb24gLSBGdW5jdGlvbiB0byBjaGVjayBmb3IgcHJvbWlzZVxuICAgICAqIEBwYXJhbXMgKGZ1bmMpIGZ1bmN0aW9uIC0gRnVuY3Rpb24gYWZ0ZXIgY2hlY2tlZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNoZWNrUHJvbWlzZShtb2RhbEZ1bmN0aW9uLCBmdW5jKSB7XG4gICAgICBpZihtb2RhbEZ1bmN0aW9uICE9PSB2b2lkIDApIHtcbiAgICAgICAgaWYodHlwZW9mIG1vZGFsRnVuY3Rpb24udGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIG1vZGFsRnVuY3Rpb24oKVxuICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmKGZ1bmMgPT0gdm9pZCAwKXtcbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmModHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gZnVuYyhyZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShtb2RhbEZ1bmN0aW9uKCkpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICBpZihmdW5jID09IHZvaWQgMCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmModHJ1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmMocmVzdWx0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmModHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZihmdW5jICE9PSB2b2lkIDApe1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhc0FkZE1vZGFsQ2xhc3MoYWRkQ2xhc3MpIHtcbiAgICAvLyBjaGVjayBtb2RhbCBDbGFzc1xuICAgIGlmKGFkZENsYXNzICE9PSBudWxsICYmICh7fSkudG9TdHJpbmcuY2FsbChhZGRDbGFzcykgPT09ICdbb2JqZWN0IFN0cmluZ10nICYmIDAgPCBhZGRDbGFzcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBhZGRDbGFzcztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgaGFzTW9kYWxFbGVtZW50KGVsZW1lbnQsIHRhcmdldCwgYWRkTW9kYWxDbGFzcykge1xuICAgIC8vIGNoZWNrIG1vZGFsIGVsZW1lbnRcbiAgICBpZihlbGVtZW50ID09IG51bGwgJiYgdGFyZ2V0ID09IG51bGwpIHtcbiAgICAgIGFkZE1vZGFsQ2xhc3MgPSAoYWRkTW9kYWxDbGFzcyAhPT1udWxsKSA/IGFkZE1vZGFsQ2xhc3MgOiAnJztcbiAgICAgIGVsZW1lbnQgPSBgXG4gICAgICAgIDxkaXYgaWQ9XCJwZW1cIiBjbGFzcz1cInBlbSBwZW1DbG9zZSAke2FkZE1vZGFsQ2xhc3N9XCIgcm9sZT1cImRpYWxvZ1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwZW1fX3dyYXBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwZW1fX2JvZHlcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBlbV9fY29udGVudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwZW1fX2Nsb3NlIHBlbUNsb3NlXCI+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj7Dlzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwicGVtX19jb250ZW50SW5uZXJcIiBjbGFzcz1cInBlbV9fY29udGVudElubmVyXCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PmA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICBoYXNJbnNlcnRFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAvLyBjaGVjayBtb2RhbCBpbnNlcnQgZWxlbWVudFxuICAgIGlmKGVsZW1lbnQgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgIGVsZW1lbnQgPSBlbGVtZW50Lm91dGVySFRNTDtcbiAgICB9XG5cbiAgICBpZihlbGVtZW50ICE9PSBudWxsICYmICh7fSkudG9TdHJpbmcuY2FsbChlbGVtZW50KSA9PT0gJ1tvYmplY3QgU3RyaW5nXScgJiYgMCA8IGVsZW1lbnQubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgaGFzTG9hZGluZ0ljb24oaWNvbikge1xuICAgIGlmKGljb24gPT0gdm9pZCAwIHx8IGljb24gPT0gbnVsbCkge1xuICAgICAgaWNvbiA9ICc8aW1nIHNyYz1cIi9hc3NldHMvaW1hZ2VzL2xvYWRpbmcuZ2lmXCI+JztcbiAgICB9XG5cbiAgICByZXR1cm4gaWNvbjtcbiAgfVxuXG4gIGhhc0xvYWRpbmdFbGVtZW50KGVsZW1lbnQsIGljb24pIHtcbiAgICBpZihlbGVtZW50ID09IHZvaWQgMCB8fCBlbGVtZW50ID09IG51bGwpIHtcbiAgICAgIGVsZW1lbnQgPSBgXG4gICAgICAgIDxkaXYgaWQ9XCJwZW1Mb2FkaW5nXCIgY2xhc3M9XCJwZW1Mb2FkaW5nXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInBlbUxvYWRpbmdfX3dyYXBwZXJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBlbUxvYWRpbmdfX2JvZHlcIj5cbiAgICAgICAgICAgICAgICAke2ljb259XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PmA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICBsb2FkaW5nKCkge1xuICAgIGxldCBvYmogPSB7XG4gICAgICAvLyBzaG93IGxvYWRpbmdcbiAgICAgIHNob3dMb2FkaW5nOiAobG9hZGluZ0VsZW1lbnQpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGxvYWRpbmdFbGVtZW50KTtcbiAgICAgICAgbGV0IGxvYWRpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGVtTG9hZGluZycpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBpZihsb2FkaW5nICE9PSBudWxsKSB7XG4gICAgICAgICAgICBsb2FkaW5nLmNsYXNzTGlzdC5hZGQoJ3BlbUxvYWRpbmctLWFjdGl2YXRlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAxKTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIGhpZGUgbG9hZGluZ1xuICAgICAgaGlkZUxvYWRpbmc6ICgpID0+IHtcbiAgICAgICAgbGV0IGxvYWRpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGVtTG9hZGluZycpO1xuICAgICAgICBpZihsb2FkaW5nICE9PSBudWxsKSB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBsb2FkaW5nLmNsYXNzTGlzdC5yZW1vdmUoJ3BlbUxvYWRpbmctLWFjdGl2YXRlJyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgaWYobG9hZGluZy5wYXJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbG9hZGluZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGxvYWRpbmcpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIG9iajtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQRU1vZGFsO1xuaWYgKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgIXdpbmRvdy5QRU1vZGFsICYmICh3aW5kb3cuUEVNb2RhbCA9IFBFTW9kYWwpO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL3BlbW9kYWwuanMiXSwic291cmNlUm9vdCI6IiJ9
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjU4MjQwNTU1YmQ0ZjU4ZmQ0ZGQiLCJ3ZWJwYWNrOi8vLy4vanMvcGVtb2RhbC5qcyJdLCJuYW1lcyI6WyJQRU1vZGFsIiwib3B0aW9ucyIsImRlZmF1bHRzIiwiYWRkTW9kYWxDbGFzcyIsImJ1dHRvbiIsIm1vZGFsRWxlbWVudCIsImluc2VydEVsZW1lbnQiLCJsb2FkaW5nRWxlbWVudCIsImxvYWRpbmdJY29uIiwidGFyZ2V0Iiwib25CZWZvcmUiLCJvbkJlZm9yZU1vZGFsIiwib25Nb2RhbCIsIm9uQ2xvc2VBZnRlciIsImluaXQiLCJPYmplY3QiLCJnZXRQcm90b3R5cGVPZiIsInByb3RvdHlwZSIsImtleSIsImhhc093blByb3BlcnR5IiwiZGVzdCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImVudW1lcmFibGUiLCJjaGVja09wdGlvbnMiLCJjb25zb2xlIiwid2FybiIsImxlbmd0aCIsImhhc0FkZE1vZGFsQ2xhc3MiLCJoYXNMb2FkaW5nSWNvbiIsImhhc0xvYWRpbmdFbGVtZW50IiwiaGFzTW9kYWxFbGVtZW50IiwiaGFzSW5zZXJ0RWxlbWVudCIsIm9uSWduaXRlIiwiYm9keSIsImRvY3VtZW50IiwiaGFzVGFyZ2V0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJjaGVja1Byb21pc2UiLCJyZXN1bHQiLCJFcnJvciIsInRoZW4iLCJuZXh0Rmx1ZyIsImxvYWRpbmciLCJzaG93TG9hZGluZyIsInNldEF0dHJpYnV0ZSIsImluc2VydEFkamFjZW50SFRNTCIsImNvbnRlbnRfaW5uZXIiLCJnZXRFbGVtZW50QnlJZCIsImNsYXNzTGlzdCIsImFkZCIsImhpZGVMb2FkaW5nIiwibW9kYWwiLCJzZXRUaW1lb3V0Iiwic3R5bGUiLCJvcGFjaXR5IiwicGVtQ2xvc2UiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiQXJyYXkiLCJmcm9tIiwic2VsZiIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudF8yIiwicmVtb3ZlIiwiZGlzcGxheSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInBlbV9fY29udGVudElubmVyIiwiZXZlbnRfMyIsInN0b3BQcm9wYWdhdGlvbiIsImNhdGNoIiwiZXJyb3IiLCJsb2ciLCJtb2RhbEZ1bmN0aW9uIiwiZnVuYyIsImFkZENsYXNzIiwidG9TdHJpbmciLCJjYWxsIiwiZWxlbWVudCIsImVsZW1lbnRzIiwib3V0ZXJIVE1MIiwiaWNvbiIsIm9iaiIsIndpbmRvdyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdENBOzs7Ozs7Ozs7S0FTTUEsTztBQUNKLG9CQUFZQyxPQUFaLEVBQXFCO0FBQUE7O0FBQ25CLFNBQUlDLFdBQVc7QUFDYkMsc0JBQWdCLElBREg7QUFFYkMsZUFBZ0IsSUFGSDtBQUdiQyxxQkFBZ0IsSUFISDtBQUliQyxzQkFBZ0IsSUFKSDtBQUtiQyx1QkFBZ0IsSUFMSDtBQU1iQyxvQkFBZ0IsSUFOSDtBQU9iQyxlQUFnQixJQVBIO0FBUWJDLGlCQUFnQixJQVJIO0FBU2JDLHNCQUFnQixJQVRIO0FBVWJDLGdCQUFnQixJQVZIO0FBV2JDLHFCQUFnQjtBQVhILE1BQWY7O0FBY0EsVUFBS0MsSUFBTCxDQUFVWixRQUFWLEVBQW9CRCxPQUFwQjtBQUNEOzs7OzBCQUVJQyxRLEVBQVVELE8sRUFBUztBQUN0QixXQUFHQSxtQkFBbUJjLE1BQW5CLElBQTZCQSxPQUFPQyxjQUFQLENBQXNCZixPQUF0QixNQUFtQ2MsT0FBT0UsU0FBMUUsRUFBcUY7QUFDbkYsY0FBS2hCLE9BQUwsR0FBZUMsUUFBZjs7QUFFQTtBQUNBLGNBQUksSUFBSWdCLEdB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LENBQWNjLGtCQUFkLENBQWlDLFdBQWpDLEVBQThDeEMsY0FBOUM7QUFDQSxlQUFJcUMsVUFBVVYsU0FBU2UsY0FBVCxDQUF3QixZQUF4QixDQUFkO0FBQ0FLLHNCQUFXLFlBQU07QUFDZixpQkFBR1YsWUFBWSxJQUFmLEVBQXFCO0FBQ25CQSx1QkFBUU0sU0FBUixDQUFrQkMsR0FBbEIsQ0FBc0Isc0JBQXRCO0FBQ0Q7QUFDRixZQUpELEVBSUcsQ0FKSDtBQUtELFVBVk87O0FBWVI7QUFDQUMsc0JBQWEsdUJBQU07QUFDakIsZUFBSVIsVUFBVVYsU0FBU2UsY0FBVCxDQUF3QixZQUF4QixDQUFkO0FBQ0EsZUFBR0wsWUFBWSxJQUFmLEVBQXFCO0FBQ25CVSx3QkFBVyxZQUFNO0FBQ2ZWLHVCQUFRTSxTQUFSLENBQWtCYyxNQUFsQixDQUF5QixzQkFBekI7QUFDQVYsMEJBQVcsWUFBTTtBQUNmLHFCQUFHVixRQUFRc0IsVUFBUixLQUF1QixJQUExQixFQUFnQztBQUM5QnRCLDJCQUFRc0IsVUFBUixDQUFtQkMsV0FBbkIsQ0FBK0J2QixPQUEvQjtBQUNEO0FBQ0YsZ0JBSkQsRUFJRyxHQUpIO0FBS0QsY0FQRCxFQU9HLEdBUEg7QUFRRDtBQUNGO0FBekJPLFFBQVY7O0FBNEJBLGNBQU91QyxHQUFQO0FBQ0Q7Ozs7OzttQkFHWW5GLE87O0FBQ2YsS0FBSSxPQUFPb0YsTUFBUCxJQUFpQixXQUFyQixFQUFrQztBQUNoQyxJQUFDQSxPQUFPcEYsT0FBUixLQUFvQm9GLE9BQU9wRixPQUFQLEdBQWlCQSxPQUFyQztBQUNELEUiLCJmaWxlIjoicGVtb2RhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGI1ODI0MDU1NWJkNGY1OGZkNGRkIiwiLyoqXG5QbHVnaW4gRVM2IE1vZGFsXG5cbkNvcHlyaWdodCAoYykgMjAxN1xuXG5UaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbmh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiovXG5cbmNsYXNzIFBFTW9kYWwge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgbGV0IGRlZmF1bHRzID0ge1xuICAgICAgYWRkTW9kYWxDbGFzczogIG51bGwsXG4gICAgICBidXR0b246ICAgICAgICAgbnVsbCxcbiAgICAgIG1vZGFsRWxlbWVudDogICBudWxsLFxuICAgICAgaW5zZXJ0RWxlbWVudDogIG51bGwsXG4gICAgICBsb2FkaW5nRWxlbWVudDogbnVsbCxcbiAgICAgIGxvYWRpbmdJY29uOiAgICBudWxsLFxuICAgICAgdGFyZ2V0OiAgICAgICAgIG51bGwsXG4gICAgICBvbkJlZm9yZTogICAgICAgbnVsbCxcbiAgICAgIG9uQmVmb3JlTW9kYWw6ICBudWxsLFxuICAgICAgb25Nb2RhbDogICAgICAgIG51bGwsXG4gICAgICBvbkNsb3NlQWZ0ZXI6ICAgbnVsbCxcbiAgICB9O1xuXG4gICAgdGhpcy5pbml0KGRlZmF1bHRzLCBvcHRpb25zKTtcbiAgfVxuXG4gIGluaXQoZGVmYXVsdHMsIG9wdGlvbnMpIHtcbiAgICBpZihvcHRpb25zIGluc3RhbmNlb2YgT2JqZWN0IHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvcHRpb25zKSA9PT0gT2JqZWN0LnByb3RvdHlwZSkge1xuICAgICAgdGhpcy5vcHRpb25zID0gZGVmYXVsdHM7XG5cbiAgICAgIC8vIGNoZWNrIGV4aXN0cyBzYW1lIGtleVxuICAgICAgZm9yKHZhciBrZXkgaW4gb3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgdmFyIGRlc3QgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9wdGlvbnMsIGtleSk7XG4gICAgICAgICAgaWYgKGRlc3QuZW51bWVyYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zW2tleV0gPSBvcHRpb25zW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2hlY2tPcHRpb25zKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjaGVja09wdGlvbnMoKSB7XG4gICAgLy8gY2hlY2sgYnV0dG9uXG4gICAgbGV0IGJ1dHRvbiA9IHRoaXMub3B0aW9uc1snYnV0dG9uJ107XG4gICAgaWYoYnV0dG9uID09IG51bGwgJiYgYnV0dG9uIGluc3RhbmNlb2YgT2JqZWN0ICE9PSBmYWxzZSkge1xuICAgICAgY29uc29sZS53YXJuKCdwZW0gYnV0dG9uIHVuZGlmaW5lZCEnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBjaGVjayB0YXJnZXRcbiAgICBsZXQgdGFyZ2V0ID0gdGhpcy5vcHRpb25zWyd0YXJnZXQnXTtcbiAgICBpZih0YXJnZXQgaW5zdGFuY2VvZiBPYmplY3QgPT0gZmFsc2UpIHtcbiAgICAgIHRoaXMub3B0aW9uc1sndGFyZ2V0J10gPSBudWxsO1xuICAgIH0gZWxzZSBpZih0aGlzLm9wdGlvbnNbJ3RhcmdldCddLmxlbmd0aCAhPSB2b2lkIDApIHtcbiAgICAgIC8vIGlmIGpxdXJ0eSBvYmplY3RcbiAgICAgIHRoaXMub3B0aW9uc1sndGFyZ2V0J10gPSB0YXJnZXRbMF07XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgYWRkIENsYXNzIGZvciBtb2RhbFxuICAgIHRoaXMub3B0aW9uc1snYWRkTW9kYWxDbGFzcyddID0gdGhpcy5oYXNBZGRNb2RhbENsYXNzKHRoaXMub3B0aW9uc1snYWRkTW9kYWxDbGFzcyddKTtcblxuICAgIC8vIGNoZWNrIGxvYWRpbmcgaWNvblxuICAgIHRoaXMub3B0aW9uc1snbG9hZGluZ0ljb24nXSA9IHRoaXMuaGFzTG9hZGluZ0ljb24odGhpcy5vcHRpb25zWydsb2FkaW5nSWNvbiddKTtcblxuICAgIC8vIGNoZWNrIGxvYWRpbmcgZWxlbWVudFxuICAgIHRoaXMub3B0aW9uc1snbG9hZGluZ0VsZW1lbnQnXSA9IHRoaXMuaGFzTG9hZGluZ0VsZW1lbnQodGhpcy5vcHRpb25zWydsb2FkaW5nRWxlbWVudCddLCB0aGlzLm9wdGlvbnNbJ2xvYWRpbmdJY29uJ10pO1xuXG4gICAgLy8gY2hlY2sgbW9kYWwgZWxlbWVudFxuICAgIHRoaXMub3B0aW9uc1snbW9kYWxFbGVtZW50J10gPSB0aGlzLmhhc01vZGFsRWxlbWVudCh0aGlzLm9wdGlvbnNbJ21vZGFsRWxlbWVudCddLCB0aGlzLm9wdGlvbnNbJ3RhcmdldCddLCB0aGlzLm9wdGlvbnNbJ2FkZE1vZGFsQ2xhc3MnXSk7XG5cbiAgICAvLyBjaGVjayBtb2RhbCBpbnNlcnQgRWxlbWVudFxuICAgIHRoaXMub3B0aW9uc1snaW5zZXJ0RWxlbWVudCddID0gdGhpcy5oYXNJbnNlcnRFbGVtZW50KHRoaXMub3B0aW9uc1snaW5zZXJ0RWxlbWVudCddKTtcblxuICAgIC8vIGNoZWNrIGZ1bmN0aW9uXG4gICAgY29uc3Qgb25CZWZvcmUgPSB0aGlzLm9wdGlvbnNbJ29uQmVmb3JlJ107XG4gICAgdGhpcy5vbkJlZm9yZSA9ICh0eXBlb2Ygb25CZWZvcmUgPT0gJ2Z1bmN0aW9uJykgPyBvbkJlZm9yZSA6ICgpID0+IHt9O1xuXG4gICAgY29uc3Qgb25CZWZvcmVNb2RhbCA9IHRoaXMub3B0aW9uc1snb25CZWZvcmVNb2RhbCddO1xuICAgIHRoaXMub25CZWZvcmVNb2RhbCA9ICh0eXBlb2Ygb25CZWZvcmVNb2RhbCA9PSAnZnVuY3Rpb24nKSA/IG9uQmVmb3JlTW9kYWwgOiAoKSA9PiB7fTtcblxuICAgIGNvbnN0IG9uTW9kYWwgPSB0aGlzLm9wdGlvbnNbJ29uTW9kYWwnXTtcbiAgICB0aGlzLm9uTW9kYWwgPSAodHlwZW9mIG9uTW9kYWwgPT0gJ2Z1bmN0aW9uJykgPyBvbk1vZGFsIDogKCkgPT4ge307XG5cbiAgICBjb25zdCBvbkNsb3NlQWZ0ZXIgPSB0aGlzLm9wdGlvbnNbJ29uQ2xvc2VBZnRlciddO1xuICAgIHRoaXMub25DbG9zZUFmdGVyID0gKHR5cGVvZiBvbkNsb3NlQWZ0ZXIgPT0gJ2Z1bmN0aW9uJykgPyBvbkNsb3NlQWZ0ZXIgOiAoKSA9PiB7fTtcblxuICAgIHRoaXMub25JZ25pdGUoKTtcbiAgfVxuXG4gIG9uSWduaXRlKCkge1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuICAgIGNvbnN0IHRhcmdldCA9IHRoaXMub3B0aW9uc1sndGFyZ2V0J107XG4gICAgY29uc3QgbG9hZGluZ0VsZW1lbnQgPSB0aGlzLm9wdGlvbnNbJ2xvYWRpbmdFbGVtZW50J107XG4gICAgY29uc3QgbW9kYWxFbGVtZW50ID0gdGhpcy5vcHRpb25zWydtb2RhbEVsZW1lbnQnXTtcbiAgICBjb25zdCBpbnNlcnRFbGVtZW50ID0gdGhpcy5vcHRpb25zWydpbnNlcnRFbGVtZW50J107XG4gICAgY29uc3QgaGFzVGFyZ2V0ID0gbW9kYWxFbGVtZW50ID09IG51bGwgJiYgdGFyZ2V0ICE9PSBudWxsO1xuXG4gICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY2hlY2tQcm9taXNlKHRoaXMub25CZWZvcmUsIChyZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdlcnJvciBtZXNzYWdlJykpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KVxuICAgIC50aGVuKChuZXh0Rmx1ZykgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKG5leHRGbHVnKSB7XG4gICAgICAgICAgY2hlY2tQcm9taXNlKHRoaXMub25CZWZvcmVNb2RhbCwgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgLy8gc2hvdyBsb2FkaW5nXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcoKS5zaG93TG9hZGluZyhsb2FkaW5nRWxlbWVudCk7XG5cbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZXJyb3IgbWVzc2FnZScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdlcnJvciBtZXNzYWdlJykpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KVxuICAgIC50aGVuKChuZXh0Rmx1ZykgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKG5leHRGbHVnKSB7XG4gICAgICAgICAgLy8gc2hvdyBtb2RhbFxuICAgICAgICAgIGlmIChoYXNUYXJnZXQpIHtcbiAgICAgICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ29wYWNpdHk6IDA7IGRpc3BsYXk6IGJsb2NrOyAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAuM3M7IHRyYW5zaXRpb246IGFsbCAuM3M7Jyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBtb2RhbEVsZW1lbnQpO1xuICAgICAgICAgICAgaWYoaW5zZXJ0RWxlbWVudCAhPT0gbnVsbCApIHtcbiAgICAgICAgICAgICAgdmFyIGNvbnRlbnRfaW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGVtX19jb250ZW50SW5uZXInKTtcbiAgICAgICAgICAgICAgY29udGVudF9pbm5lci5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGluc2VydEVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgncGVtX19vcGVuJyk7XG5cbiAgICAgICAgICBjaGVja1Byb21pc2UodGhpcy5vbk1vZGFsLCAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2Vycm9yIG1lc3NhZ2UnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZXJyb3IgbWVzc2FnZScpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSlcbiAgICAudGhlbigobmV4dEZsdWcpID0+IHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChuZXh0Rmx1Zykge1xuICAgICAgICAgIC8vIGhpZGUgbG9hZGluZ1xuICAgICAgICAgIHRoaXMubG9hZGluZygpLmhpZGVMb2FkaW5nKCk7XG5cbiAgICAgICAgICAvLyBhZGQgbW9kYWxcbiAgICAgICAgICBjb25zdCBtb2RhbCA9ICh0YXJnZXQgPT0gdm9pZCAwIHx8IHRhcmdldCA9PSBudWxsKSA/IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwZW0nKSA6IHRhcmdldDtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmIChoYXNUYXJnZXQpIHtcbiAgICAgICAgICAgICAgbW9kYWwuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdwZW0tLWFjdGl2YXRlJyk7XG4gICAgICAgICAgfSwgMSk7XG5cbiAgICAgICAgICAvLyBoaWRlIG1vZGFsIGV2ZW50XG4gICAgICAgICAgY29uc3QgcGVtQ2xvc2UgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwZW1DbG9zZScpO1xuICAgICAgICAgIGZvciAobGV0IHNlbGYgb2YgQXJyYXkuZnJvbShwZW1DbG9zZSkpIHtcbiAgICAgICAgICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnRfMikgPT4ge1xuICAgICAgICAgICAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3BlbV9fb3BlbicpO1xuICAgICAgICAgICAgICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdwZW0tLWFjdGl2YXRlJyk7XG5cbiAgICAgICAgICAgICAgaWYgKGhhc1RhcmdldCkge1xuICAgICAgICAgICAgICAgIG1vZGFsLnN0eWxlLm9wYWNpdHkgPSAwO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgY2hlY2tQcm9taXNlKHRoaXMub25DbG9zZUFmdGVyKTtcbiAgICAgICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYobW9kYWwucGFyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBtb2RhbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG1vZGFsKTtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tQcm9taXNlKHRoaXMub25DbG9zZUFmdGVyKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBub3QgaGlkZSBwZW1fX2NvbnRlbnRJbm5lciBpbiBjbGljayBldmVudFxuICAgICAgICAgIGNvbnN0IHBlbV9fY29udGVudElubmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BlbV9fY29udGVudElubmVyJyk7XG4gICAgICAgICAgaWYocGVtX19jb250ZW50SW5uZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHBlbV9fY29udGVudElubmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50XzMpID0+IHtcbiAgICAgICAgICAgICAgZXZlbnRfMy5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdlcnJvciBtZXNzYWdlJykpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIGxldCBtb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwZW0nKTtcbiAgICAgIGlmKG1vZGFsICE9PSBudWxsKSB7XG4gICAgICAgIG1vZGFsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobW9kYWwpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmxvYWRpbmcoKS5oaWRlTG9hZGluZygpO1xuICAgIH0pO1xuXG4gICAgLypcbiAgICAgKiBjaGVja1Byb21pc2UgLSBQcm9taXNl44Gu5pyJ54Sh44KS44OB44Kn44OD44KvXG4gICAgICpcbiAgICAgKiBAcGFyYW1zIChtb2RhbEZ1bmN0aW9uKSBmdW5jdGlvbiAtIEZ1bmN0aW9uIHRvIGNoZWNrIGZvciBwcm9taXNlXG4gICAgICogQHBhcmFtcyAoZnVuYykgZnVuY3Rpb24gLSBGdW5jdGlvbiBhZnRlciBjaGVja2VkXG4gICAgICovXG4gICAgZnVuY3Rpb24gY2hlY2tQcm9taXNlKG1vZGFsRnVuY3Rpb24sIGZ1bmMpIHtcbiAgICAgIGlmKG1vZGFsRnVuY3Rpb24gIT09IHZvaWQgMCkge1xuICAgICAgICBpZih0eXBlb2YgbW9kYWxGdW5jdGlvbi50aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgbW9kYWxGdW5jdGlvbigpXG4gICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgaWYoZnVuYyA9PSB2b2lkIDApe1xuICAgICAgICAgICAgICByZXR1cm4gZnVuYyh0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jKHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKG1vZGFsRnVuY3Rpb24oKSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgIGlmKGZ1bmMgPT0gdm9pZCAwKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuYyh0cnVlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuYyhyZXN1bHQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gZnVuYyh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmKGZ1bmMgIT09IHZvaWQgMCl7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFzQWRkTW9kYWxDbGFzcyhhZGRDbGFzcykge1xuICAgIC8vIGNoZWNrIG1vZGFsIENsYXNzXG4gICAgaWYoYWRkQ2xhc3MgIT09IG51bGwgJiYgKHt9KS50b1N0cmluZy5jYWxsKGFkZENsYXNzKSA9PT0gJ1tvYmplY3QgU3RyaW5nXScgJiYgMCA8IGFkZENsYXNzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGFkZENsYXNzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBoYXNNb2RhbEVsZW1lbnQoZWxlbWVudCwgdGFyZ2V0LCBhZGRNb2RhbENsYXNzKSB7XG4gICAgLy8gY2hlY2sgbW9kYWwgZWxlbWVudFxuICAgIGlmKGVsZW1lbnQgPT0gbnVsbCAmJiB0YXJnZXQgPT0gbnVsbCkge1xuICAgICAgYWRkTW9kYWxDbGFzcyA9IChhZGRNb2RhbENsYXNzICE9PW51bGwpID8gYWRkTW9kYWxDbGFzcyA6ICcnO1xuICAgICAgZWxlbWVudCA9IGBcbiAgICAgICAgPGRpdiBpZD1cInBlbVwiIGNsYXNzPVwicGVtIHBlbUNsb3NlICR7YWRkTW9kYWxDbGFzc31cIiByb2xlPVwiZGlhbG9nXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInBlbV9fd3JhcFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBlbV9fYm9keVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGVtX19jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBlbV9fY2xvc2UgcGVtQ2xvc2VcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPsOXPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJwZW1fX2NvbnRlbnRJbm5lclwiIGNsYXNzPVwicGVtX19jb250ZW50SW5uZXJcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+YDtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIGhhc0luc2VydEVsZW1lbnQoZWxlbWVudCkge1xuICAgIC8vIGNoZWNrIG1vZGFsIGluc2VydCBlbGVtZW50XG4gICAgaWYoZWxlbWVudCBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgbGV0IGVsZW1lbnRzID0gJyc7XG5cbiAgICAgIGlmKGVsZW1lbnQubGVuZ3RoID09IG51bGwgJiYgMCA8IGVsZW1lbnQub3V0ZXJIVE1MLmxlbmd0aCkge1xuICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5vdXRlckhUTUw7XG4gICAgICB9IGVsc2UgaWYoMCA8IGVsZW1lbnQubGVuZ3RoKSB7XG4gICAgICAgIGZvciAobGV0IHNlbGYgb2YgQXJyYXkuZnJvbShlbGVtZW50KSkge1xuICAgICAgICAgICBlbGVtZW50cyArPSBzZWxmLm91dGVySFRNTDtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50ID0gZWxlbWVudHM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYoZWxlbWVudCAhPT0gbnVsbCAmJiAoe30pLnRvU3RyaW5nLmNhbGwoZWxlbWVudCkgPT09ICdbb2JqZWN0IFN0cmluZ10nICYmIDAgPCBlbGVtZW50Lmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGhhc0xvYWRpbmdJY29uKGljb24pIHtcbiAgICBpZihpY29uID09IHZvaWQgMCB8fCBpY29uID09IG51bGwpIHtcbiAgICAgIGljb24gPSAnPGltZyBzcmM9XCIvYXNzZXRzL2ltYWdlcy9sb2FkaW5nLmdpZlwiPic7XG4gICAgfVxuXG4gICAgcmV0dXJuIGljb247XG4gIH1cblxuICBoYXNMb2FkaW5nRWxlbWVudChlbGVtZW50LCBpY29uKSB7XG4gICAgaWYoZWxlbWVudCA9PSB2b2lkIDAgfHwgZWxlbWVudCA9PSBudWxsKSB7XG4gICAgICBlbGVtZW50ID0gYFxuICAgICAgICA8ZGl2IGlkPVwicGVtTG9hZGluZ1wiIGNsYXNzPVwicGVtTG9hZGluZ1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwZW1Mb2FkaW5nX193cmFwcGVyXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwZW1Mb2FkaW5nX19ib2R5XCI+XG4gICAgICAgICAgICAgICAgJHtpY29ufVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5gO1xuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgbG9hZGluZygpIHtcbiAgICBsZXQgb2JqID0ge1xuICAgICAgLy8gc2hvdyBsb2FkaW5nXG4gICAgICBzaG93TG9hZGluZzogKGxvYWRpbmdFbGVtZW50KSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBsb2FkaW5nRWxlbWVudCk7XG4gICAgICAgIGxldCBsb2FkaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BlbUxvYWRpbmcnKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgaWYobG9hZGluZyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgbG9hZGluZy5jbGFzc0xpc3QuYWRkKCdwZW1Mb2FkaW5nLS1hY3RpdmF0ZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgMSk7XG4gICAgICB9LFxuXG4gICAgICAvLyBoaWRlIGxvYWRpbmdcbiAgICAgIGhpZGVMb2FkaW5nOiAoKSA9PiB7XG4gICAgICAgIGxldCBsb2FkaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BlbUxvYWRpbmcnKTtcbiAgICAgICAgaWYobG9hZGluZyAhPT0gbnVsbCkge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgbG9hZGluZy5jbGFzc0xpc3QucmVtb3ZlKCdwZW1Mb2FkaW5nLS1hY3RpdmF0ZScpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGlmKGxvYWRpbmcucGFyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGxvYWRpbmcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChsb2FkaW5nKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgICB9LCAzMDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBvYmo7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUEVNb2RhbDtcbmlmICh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnKSB7XG4gICF3aW5kb3cuUEVNb2RhbCAmJiAod2luZG93LlBFTW9kYWwgPSBQRU1vZGFsKTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9wZW1vZGFsLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWYyMDMyZjk4YTgzMTZhNzAzN2MiLCJ3ZWJwYWNrOi8vLy4vanMvcGVtb2RhbC5qcyJdLCJuYW1lcyI6WyJQRU1vZGFsIiwib3B0aW9ucyIsImRlZmF1bHRzIiwiYWRkTW9kYWxDbGFzcyIsImJ1dHRvbiIsIm1vZGFsRWxlbWVudCIsImluc2VydEVsZW1lbnQiLCJsb2FkaW5nRWxlbWVudCIsImxvYWRpbmdJY29uIiwidGFyZ2V0Iiwib25CZWZvcmUiLCJvbkJlZm9yZU1vZGFsIiwib25Nb2RhbCIsIm9uQ2xvc2VBZnRlciIsImluaXQiLCJPYmplY3QiLCJnZXRQcm90b3R5cGVPZiIsInByb3RvdHlwZSIsImtleSIsImhhc093blByb3BlcnR5IiwiZGVzdCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImVudW1lcmFibGUiLCJjaGVja09wdGlvbnMiLCJjb25zb2xlIiwid2FybiIsImxlbmd0aCIsImhhc0FkZE1vZGFsQ2xhc3MiLCJoYXNMb2FkaW5nSWNvbiIsImhhc0xvYWRpbmdFbGVtZW50IiwiaGFzTW9kYWxFbGVtZW50IiwiaGFzSW5zZXJ0RWxlbWVudCIsIm9uSWduaXRlIiwiYm9keSIsImRvY3VtZW50IiwiaXNUYXJnZXQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNoZWNrUHJvbWlzZSIsInJlc3VsdCIsIkVycm9yIiwidGhlbiIsIm5leHRGbHVnIiwibG9hZGluZyIsInNob3dMb2FkaW5nIiwic2V0QXR0cmlidXRlIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiY29udGVudF9pbm5lciIsImdldEVsZW1lbnRCeUlkIiwiY2xhc3NMaXN0IiwiYWRkIiwiaGlkZUxvYWRpbmciLCJtb2RhbCIsInNldFRpbWVvdXQiLCJzdHlsZSIsIm9wYWNpdHkiLCJwZW1DbG9zZSIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJBcnJheSIsImZyb20iLCJzZWxmIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50XzIiLCJyZW1vdmUiLCJkaXNwbGF5IiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwicGVtX19jb250ZW50SW5uZXIiLCJldmVudF8zIiwic3RvcFByb3BhZ2F0aW9uIiwiZSIsImhhc0NsYXNzIiwiY29udGFpbnMiLCJwcmV2ZW50RGVmYXVsdCIsInBhc3NpdmUiLCJjYXRjaCIsImVycm9yIiwibG9nIiwibW9kYWxGdW5jdGlvbiIsImZ1bmMiLCJhZGRDbGFzcyIsInRvU3RyaW5nIiwiY2FsbCIsImVsZW1lbnQiLCJpY29uIiwib2JqIiwid2luZG93Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Q0E7Ozs7Ozs7OztLQVNNQSxPO0FBQ0osb0JBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFDbkIsU0FBSUMsV0FBVztBQUNiQyxzQkFBZ0IsSUFESDtBQUViQyxlQUFnQixJQUZIO0FBR2JDLHFCQUFnQixJQUhIO0FBSWJDLHNCQUFnQixJQUpIO0FBS2JDLHVCQUFnQixJQUxIO0FBTWJDLG9CQUFnQixJQU5IO0FBT2JDLGVBQWdCLElBUEg7QUFRYkMsaUJBQWdCLElBUkg7QUFTYkMsc0JBQWdCLElBVEg7QUFVYkMsZ0JBQWdCLElBVkg7QUFXYkMscUJBQWdCO0FBWEgsTUFBZjs7QUFjQSxVQUFLQyxJQUFMLENBQVVaLFFBQVYsRUFBb0JELE9BQXBCO0FBQ0Q7Ozs7MEJBRUlDLFEsRUFBVUQsTyxFQUFTO0FBQ3RCLFdBQUdBLG1CQUFtQmMsTUFBbkIsSUFBNkJBLE9BQU9DLGNBQVAsQ0FBc0JmLE9BQXRCLE1BQW1DYyxPQUFPRSxTQUExRSxFQUFxRjtBQUNuRixjQUFLaEIsT0FBTCxHQUFlQyxR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LFNBQVNlLGNBQVQsQ0FBd0IsWUFBeEIsQ0FBZDtBQUNBLGVBQUdMLFlBQVksSUFBZixFQUFxQjtBQUNuQlUsd0JBQVcsWUFBTTtBQUNmVix1QkFBUU0sU0FBUixDQUFrQmMsTUFBbEIsQ0FBeUIsc0JBQXpCO0FBQ0FWLDBCQUFXLFlBQU07QUFDZixxQkFBR1YsUUFBUXNCLFVBQVIsS0FBdUIsSUFBMUIsRUFBZ0M7QUFDOUJ0QiwyQkFBUXNCLFVBQVIsQ0FBbUJDLFdBQW5CLENBQStCdkIsT0FBL0I7QUFDRDtBQUNGLGdCQUpELEVBSUcsR0FKSDtBQUtELGNBUEQsRUFPRyxHQVBIO0FBUUQ7QUFDRjtBQXpCTyxRQUFWOztBQTRCQSxjQUFPMEMsR0FBUDtBQUNEOzs7Ozs7bUJBR1l0RixPOztBQUNmLEtBQUksT0FBT3VGLE1BQVAsSUFBaUIsV0FBckIsRUFBa0M7QUFDaEMsSUFBQ0EsT0FBT3ZGLE9BQVIsS0FBb0J1RixPQUFPdkYsT0FBUCxHQUFpQkEsT0FBckM7QUFDRCxFIiwiZmlsZSI6InBlbW9kYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlZjIwMzJmOThhODMxNmE3MDM3YyIsIi8qKlxuUGx1Z2luIEVTNiBNb2RhbFxuXG5Db3B5cmlnaHQgKGMpIDIwMTdcblxuVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5odHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4qL1xuXG5jbGFzcyBQRU1vZGFsIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIGxldCBkZWZhdWx0cyA9IHtcbiAgICAgIGFkZE1vZGFsQ2xhc3M6ICBudWxsLFxuICAgICAgYnV0dG9uOiAgICAgICAgIG51bGwsXG4gICAgICBtb2RhbEVsZW1lbnQ6ICAgbnVsbCxcbiAgICAgIGluc2VydEVsZW1lbnQ6ICBudWxsLFxuICAgICAgbG9hZGluZ0VsZW1lbnQ6IG51bGwsXG4gICAgICBsb2FkaW5nSWNvbjogICAgbnVsbCxcbiAgICAgIHRhcmdldDogICAgICAgICBudWxsLFxuICAgICAgb25CZWZvcmU6ICAgICAgIG51bGwsXG4gICAgICBvbkJlZm9yZU1vZGFsOiAgbnVsbCxcbiAgICAgIG9uTW9kYWw6ICAgICAgICBudWxsLFxuICAgICAgb25DbG9zZUFmdGVyOiAgIG51bGwsXG4gICAgfTtcblxuICAgIHRoaXMuaW5pdChkZWZhdWx0cywgb3B0aW9ucyk7XG4gIH1cblxuICBpbml0KGRlZmF1bHRzLCBvcHRpb25zKSB7XG4gICAgaWYob3B0aW9ucyBpbnN0YW5jZW9mIE9iamVjdCB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob3B0aW9ucykgPT09IE9iamVjdC5wcm90b3R5cGUpIHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IGRlZmF1bHRzO1xuXG4gICAgICAvLyBjaGVjayBleGlzdHMgc2FtZSBrZXlcbiAgICAgIGZvcih2YXIga2V5IGluIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIHZhciBkZXN0ID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvcHRpb25zLCBrZXkpO1xuICAgICAgICAgIGlmIChkZXN0LmVudW1lcmFibGUpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1trZXldID0gb3B0aW9uc1trZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmNoZWNrT3B0aW9ucygpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tPcHRpb25zKCkge1xuICAgIC8vIGNoZWNrIGJ1dHRvblxuICAgIGxldCBidXR0b24gPSB0aGlzLm9wdGlvbnNbJ2J1dHRvbiddO1xuICAgIGlmKGJ1dHRvbiA9PSBudWxsICYmIGJ1dHRvbiBpbnN0YW5jZW9mIE9iamVjdCAhPT0gZmFsc2UpIHtcbiAgICAgIGNvbnNvbGUud2FybigncGVtIGJ1dHRvbiB1bmRpZmluZWQhJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgdGFyZ2V0XG4gICAgbGV0IHRhcmdldCA9IHRoaXMub3B0aW9uc1sndGFyZ2V0J107XG4gICAgaWYodGFyZ2V0IGluc3RhbmNlb2YgT2JqZWN0ID09IGZhbHNlKSB7XG4gICAgICB0aGlzLm9wdGlvbnNbJ3RhcmdldCddID0gbnVsbDtcbiAgICB9IGVsc2UgaWYodGhpcy5vcHRpb25zWyd0YXJnZXQnXS5sZW5ndGggIT0gdm9pZCAwKSB7XG4gICAgICAvLyBpZiBqcXVydHkgb2JqZWN0XG4gICAgICB0aGlzLm9wdGlvbnNbJ3RhcmdldCddID0gdGFyZ2V0WzBdO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIGFkZCBDbGFzcyBmb3IgbW9kYWxcbiAgICB0aGlzLm9wdGlvbnNbJ2FkZE1vZGFsQ2xhc3MnXSA9IHRoaXMuaGFzQWRkTW9kYWxDbGFzcyh0aGlzLm9wdGlvbnNbJ2FkZE1vZGFsQ2xhc3MnXSk7XG5cbiAgICAvLyBjaGVjayBsb2FkaW5nIGljb25cbiAgICB0aGlzLm9wdGlvbnNbJ2xvYWRpbmdJY29uJ10gPSB0aGlzLmhhc0xvYWRpbmdJY29uKHRoaXMub3B0aW9uc1snbG9hZGluZ0ljb24nXSk7XG5cbiAgICAvLyBjaGVjayBsb2FkaW5nIGVsZW1lbnRcbiAgICB0aGlzLm9wdGlvbnNbJ2xvYWRpbmdFbGVtZW50J10gPSB0aGlzLmhhc0xvYWRpbmdFbGVtZW50KHRoaXMub3B0aW9uc1snbG9hZGluZ0VsZW1lbnQnXSwgdGhpcy5vcHRpb25zWydsb2FkaW5nSWNvbiddKTtcblxuICAgIC8vIGNoZWNrIG1vZGFsIGVsZW1lbnRcbiAgICB0aGlzLm9wdGlvbnNbJ21vZGFsRWxlbWVudCddID0gdGhpcy5oYXNNb2RhbEVsZW1lbnQodGhpcy5vcHRpb25zWydtb2RhbEVsZW1lbnQnXSwgdGhpcy5vcHRpb25zWyd0YXJnZXQnXSwgdGhpcy5vcHRpb25zWydhZGRNb2RhbENsYXNzJ10pO1xuXG4gICAgLy8gY2hlY2sgbW9kYWwgaW5zZXJ0IEVsZW1lbnRcbiAgICB0aGlzLm9wdGlvbnNbJ2luc2VydEVsZW1lbnQnXSA9IHRoaXMuaGFzSW5zZXJ0RWxlbWVudCh0aGlzLm9wdGlvbnNbJ2luc2VydEVsZW1lbnQnXSk7XG5cbiAgICAvLyBjaGVjayBmdW5jdGlvblxuICAgIGNvbnN0IG9uQmVmb3JlID0gdGhpcy5vcHRpb25zWydvbkJlZm9yZSddO1xuICAgIHRoaXMub25CZWZvcmUgPSAodHlwZW9mIG9uQmVmb3JlID09ICdmdW5jdGlvbicpID8gb25CZWZvcmUgOiAoKSA9PiB7fTtcblxuICAgIGNvbnN0IG9uQmVmb3JlTW9kYWwgPSB0aGlzLm9wdGlvbnNbJ29uQmVmb3JlTW9kYWwnXTtcbiAgICB0aGlzLm9uQmVmb3JlTW9kYWwgPSAodHlwZW9mIG9uQmVmb3JlTW9kYWwgPT0gJ2Z1bmN0aW9uJykgPyBvbkJlZm9yZU1vZGFsIDogKCkgPT4ge307XG5cbiAgICBjb25zdCBvbk1vZGFsID0gdGhpcy5vcHRpb25zWydvbk1vZGFsJ107XG4gICAgdGhpcy5vbk1vZGFsID0gKHR5cGVvZiBvbk1vZGFsID09ICdmdW5jdGlvbicpID8gb25Nb2RhbCA6ICgpID0+IHt9O1xuXG4gICAgY29uc3Qgb25DbG9zZUFmdGVyID0gdGhpcy5vcHRpb25zWydvbkNsb3NlQWZ0ZXInXTtcbiAgICB0aGlzLm9uQ2xvc2VBZnRlciA9ICh0eXBlb2Ygb25DbG9zZUFmdGVyID09ICdmdW5jdGlvbicpID8gb25DbG9zZUFmdGVyIDogKCkgPT4ge307XG5cbiAgICB0aGlzLm9uSWduaXRlKCk7XG4gIH1cblxuICBvbklnbml0ZSgpIHtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzLm9wdGlvbnNbJ3RhcmdldCddO1xuICAgIGNvbnN0IGxvYWRpbmdFbGVtZW50ID0gdGhpcy5vcHRpb25zWydsb2FkaW5nRWxlbWVudCddO1xuICAgIGNvbnN0IG1vZGFsRWxlbWVudCA9IHRoaXMub3B0aW9uc1snbW9kYWxFbGVtZW50J107XG4gICAgY29uc3QgaW5zZXJ0RWxlbWVudCA9IHRoaXMub3B0aW9uc1snaW5zZXJ0RWxlbWVudCddO1xuICAgIGNvbnN0IGlzVGFyZ2V0ID0gbW9kYWxFbGVtZW50ID09IG51bGwgJiYgdGFyZ2V0ICE9PSBudWxsO1xuXG4gICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY2hlY2tQcm9taXNlKHRoaXMub25CZWZvcmUsIChyZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdlcnJvciBtZXNzYWdlJykpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KVxuICAgIC50aGVuKChuZXh0Rmx1ZykgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKG5leHRGbHVnKSB7XG4gICAgICAgICAgY2hlY2tQcm9taXNlKHRoaXMub25CZWZvcmVNb2RhbCwgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgLy8gc2hvdyBsb2FkaW5nXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcoKS5zaG93TG9hZGluZyhsb2FkaW5nRWxlbWVudCk7XG5cbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZXJyb3IgbWVzc2FnZScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdlcnJvciBtZXNzYWdlJykpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KVxuICAgIC50aGVuKChuZXh0Rmx1ZykgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKG5leHRGbHVnKSB7XG4gICAgICAgICAgLy8gc2hvdyBtb2RhbFxuICAgICAgICAgIGlmIChpc1RhcmdldCkge1xuICAgICAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnb3BhY2l0eTogMDsgZGlzcGxheTogYmxvY2s7IC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIC4zczsgdHJhbnNpdGlvbjogYWxsIC4zczsnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIG1vZGFsRWxlbWVudCk7XG4gICAgICAgICAgICBpZihpbnNlcnRFbGVtZW50ICE9PSBudWxsICkge1xuICAgICAgICAgICAgICB2YXIgY29udGVudF9pbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwZW1fX2NvbnRlbnRJbm5lcicpO1xuICAgICAgICAgICAgICBjb250ZW50X2lubmVyLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgaW5zZXJ0RWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCdwZW1fX29wZW4nKTtcblxuICAgICAgICAgIGNoZWNrUHJvbWlzZSh0aGlzLm9uTW9kYWwsIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZXJyb3IgbWVzc2FnZScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdlcnJvciBtZXNzYWdlJykpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KVxuICAgIC50aGVuKChuZXh0Rmx1ZykgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKG5leHRGbHVnKSB7XG4gICAgICAgICAgLy8gaGlkZSBsb2FkaW5nXG4gICAgICAgICAgdGhpcy5sb2FkaW5nKCkuaGlkZUxvYWRpbmcoKTtcblxuICAgICAgICAgIC8vIGFkZCBtb2RhbFxuICAgICAgICAgIGNvbnN0IG1vZGFsID0gKHRhcmdldCA9PSB2b2lkIDAgfHwgdGFyZ2V0ID09IG51bGwpID8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BlbScpIDogdGFyZ2V0O1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGlzVGFyZ2V0KSB7XG4gICAgICAgICAgICAgIG1vZGFsLnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgncGVtLS1hY3RpdmF0ZScpO1xuICAgICAgICAgIH0sIDEpO1xuXG4gICAgICAgICAgLy8gaGlkZSBtb2RhbCBldmVudFxuICAgICAgICAgIGNvbnN0IHBlbUNsb3NlID0gbW9kYWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGVtQ2xvc2UnKTtcbiAgICAgICAgICBmb3IgKGxldCBzZWxmIG9mIEFycmF5LmZyb20ocGVtQ2xvc2UpKSB7XG4gICAgICAgICAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50XzIpID0+IHtcbiAgICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdwZW1fX29wZW4nKTtcbiAgICAgICAgICAgICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgncGVtLS1hY3RpdmF0ZScpO1xuXG4gICAgICAgICAgICAgIGlmIChpc1RhcmdldCkge1xuICAgICAgICAgICAgICAgIG1vZGFsLnN0eWxlLm9wYWNpdHkgPSAwO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgY2hlY2tQcm9taXNlKHRoaXMub25DbG9zZUFmdGVyKTtcbiAgICAgICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgbW9kYWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChtb2RhbCk7XG4gICAgICAgICAgICAgICAgICBjaGVja1Byb21pc2UodGhpcy5vbkNsb3NlQWZ0ZXIpO1xuICAgICAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIG5vdCBoaWRlIHBlbV9fY29udGVudElubmVyIGluIGNsaWNrIGV2ZW50XG4gICAgICAgICAgY29uc3QgcGVtX19jb250ZW50SW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGVtX19jb250ZW50SW5uZXInKTtcbiAgICAgICAgICBpZihwZW1fX2NvbnRlbnRJbm5lciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcGVtX19jb250ZW50SW5uZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnRfMykgPT4ge1xuICAgICAgICAgICAgICBldmVudF8zLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gbW9kYWwgc2Nyb2xsaW5nIG9uIG1vYmlsZSBkZXZpY2VzXG4gICAgICAgICAgYm9keS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCAoZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGhhc0NsYXNzID0gYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ3BlbV9fb3BlbicpO1xuICAgICAgICAgICAgaWYoaGFzQ2xhc3MpIHtcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIHsgcGFzc2l2ZTogZmFsc2UgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZXJyb3IgbWVzc2FnZScpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICBsZXQgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGVtJyk7XG4gICAgICBpZihtb2RhbCAhPT0gbnVsbCkge1xuICAgICAgICBtb2RhbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG1vZGFsKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5sb2FkaW5nKCkuaGlkZUxvYWRpbmcoKTtcbiAgICB9KTtcblxuICAgIC8qXG4gICAgICogY2hlY2tQcm9taXNlIC0gUHJvbWlzZeOBruacieeEoeOCkuODgeOCp+ODg+OCr1xuICAgICAqXG4gICAgICogQHBhcmFtcyAobW9kYWxGdW5jdGlvbikgZnVuY3Rpb24gLSBGdW5jdGlvbiB0byBjaGVjayBmb3IgcHJvbWlzZVxuICAgICAqIEBwYXJhbXMgKGZ1bmMpIGZ1bmN0aW9uIC0gRnVuY3Rpb24gYWZ0ZXIgY2hlY2tlZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNoZWNrUHJvbWlzZShtb2RhbEZ1bmN0aW9uLCBmdW5jKSB7XG4gICAgICBpZihtb2RhbEZ1bmN0aW9uICE9PSB2b2lkIDApIHtcbiAgICAgICAgaWYodHlwZW9mIG1vZGFsRnVuY3Rpb24udGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIG1vZGFsRnVuY3Rpb24oKVxuICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmKGZ1bmMgPT0gdm9pZCAwKXtcbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmModHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gZnVuYyhyZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShtb2RhbEZ1bmN0aW9uKCkpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICBpZihmdW5jID09IHZvaWQgMCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmModHJ1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmMocmVzdWx0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmModHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZihmdW5jICE9PSB2b2lkIDApe1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhc0FkZE1vZGFsQ2xhc3MoYWRkQ2xhc3MpIHtcbiAgICAvLyBjaGVjayBtb2RhbCBDbGFzc1xuICAgIGlmKGFkZENsYXNzICE9PSBudWxsICYmICh7fSkudG9TdHJpbmcuY2FsbChhZGRDbGFzcykgPT09ICdbb2JqZWN0IFN0cmluZ10nICYmIDAgPCBhZGRDbGFzcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBhZGRDbGFzcztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgaGFzTW9kYWxFbGVtZW50KGVsZW1lbnQsIHRhcmdldCwgYWRkTW9kYWxDbGFzcykge1xuICAgIC8vIGNoZWNrIG1vZGFsIGVsZW1lbnRcbiAgICBpZihlbGVtZW50ID09IG51bGwgJiYgdGFyZ2V0ID09IG51bGwpIHtcbiAgICAgIGFkZE1vZGFsQ2xhc3MgPSAoYWRkTW9kYWxDbGFzcyAhPT1udWxsKSA/IGFkZE1vZGFsQ2xhc3MgOiAnJztcbiAgICAgIGVsZW1lbnQgPSBgXG4gICAgICAgIDxkaXYgaWQ9XCJwZW1cIiBjbGFzcz1cInBlbSBwZW1DbG9zZSAke2FkZE1vZGFsQ2xhc3N9XCIgcm9sZT1cImRpYWxvZ1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwZW1fX3dyYXBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwZW1fX2JvZHlcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBlbV9fY29udGVudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwZW1fX2Nsb3NlIHBlbUNsb3NlXCI+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj7Dlzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwicGVtX19jb250ZW50SW5uZXJcIiBjbGFzcz1cInBlbV9fY29udGVudElubmVyXCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PmA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICBoYXNJbnNlcnRFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAvLyBjaGVjayBtb2RhbCBpbnNlcnQgZWxlbWVudFxuICAgIGlmKGVsZW1lbnQgIT09IG51bGwgJiYgKHt9KS50b1N0cmluZy5jYWxsKGVsZW1lbnQpID09PSAnW29iamVjdCBTdHJpbmddJyAmJiAwIDwgZWxlbWVudC5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBoYXNMb2FkaW5nSWNvbihpY29uKSB7XG4gICAgaWYoaWNvbiA9PSB2b2lkIDAgfHwgaWNvbiA9PSBudWxsKSB7XG4gICAgICBpY29uID0gJzxpbWcgc3JjPVwiL2Fzc2V0cy9pbWFnZXMvbG9hZGluZy5naWZcIj4nO1xuICAgIH1cblxuICAgIHJldHVybiBpY29uO1xuICB9XG5cbiAgaGFzTG9hZGluZ0VsZW1lbnQoZWxlbWVudCwgaWNvbikge1xuICAgIGlmKGVsZW1lbnQgPT0gdm9pZCAwIHx8IGVsZW1lbnQgPT0gbnVsbCkge1xuICAgICAgZWxlbWVudCA9IGBcbiAgICAgICAgPGRpdiBpZD1cInBlbUxvYWRpbmdcIiBjbGFzcz1cInBlbUxvYWRpbmdcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicGVtTG9hZGluZ19fd3JhcHBlclwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGVtTG9hZGluZ19fYm9keVwiPlxuICAgICAgICAgICAgICAgICR7aWNvbn1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+YDtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIGxvYWRpbmcoKSB7XG4gICAgbGV0IG9iaiA9IHtcbiAgICAgIC8vIHNob3cgbG9hZGluZ1xuICAgICAgc2hvd0xvYWRpbmc6IChsb2FkaW5nRWxlbWVudCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgbG9hZGluZ0VsZW1lbnQpO1xuICAgICAgICBsZXQgbG9hZGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwZW1Mb2FkaW5nJyk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGlmKGxvYWRpbmcgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGxvYWRpbmcuY2xhc3NMaXN0LmFkZCgncGVtTG9hZGluZy0tYWN0aXZhdGUnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDEpO1xuICAgICAgfSxcblxuICAgICAgLy8gaGlkZSBsb2FkaW5nXG4gICAgICBoaWRlTG9hZGluZzogKCkgPT4ge1xuICAgICAgICBsZXQgbG9hZGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwZW1Mb2FkaW5nJyk7XG4gICAgICAgIGlmKGxvYWRpbmcgIT09IG51bGwpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGxvYWRpbmcuY2xhc3NMaXN0LnJlbW92ZSgncGVtTG9hZGluZy0tYWN0aXZhdGUnKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBpZihsb2FkaW5nLnBhcmVudE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBsb2FkaW5nLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobG9hZGluZyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBFTW9kYWw7XG5pZiAodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJykge1xuICAhd2luZG93LlBFTW9kYWwgJiYgKHdpbmRvdy5QRU1vZGFsID0gUEVNb2RhbCk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvcGVtb2RhbC5qcyJdLCJzb3VyY2VSb290IjoiIn0=
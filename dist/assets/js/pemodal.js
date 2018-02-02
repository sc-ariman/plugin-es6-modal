/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.pemodal = mod.exports;
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
        if (target instanceof Object === false) {
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
          console.warn(error);
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
});

/***/ })
/******/ ]);
//# sourceMappingURL=pemodal.js.map
/**
Plugin ES6 Modal

Copyright (c) 2017

This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
*/

class PEModal {
  constructor(options) {
    let defaults = {
      addModalClass:  null,
      button:         null,
      modalElement:   null,
      insertElement:  null,
      loadingElement: null,
      loadingIcon:    null,
      target:         null,
      onBefore:       null,
      onBeforeModal:  null,
      onModal:        null,
      onCloseAfter:   null,
    };

    this.init(defaults, options);
  }

  init(defaults, options) {
    if(options instanceof Object || Object.getPrototypeOf(options) === Object.prototype) {
      this.options = defaults;

      // check exists same key
      for(var key in options) {
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

  checkOptions() {
    // check button
    let button = this.options['button'];
    if(button == null && button instanceof Object !== false) {
      console.warn('pem button undifined!');
      return false;
    }

    // check target
    let target = this.options['target'];
    if(target instanceof Object == false) {
      this.options['target'] = null;
    } else if(this.options['target'].length != void 0) {
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
    const onBefore = this.options['onBefore'];
    this.onBefore = (typeof onBefore == 'function') ? onBefore : () => {};

    const onBeforeModal = this.options['onBeforeModal'];
    this.onBeforeModal = (typeof onBeforeModal == 'function') ? onBeforeModal : () => {};

    const onModal = this.options['onModal'];
    this.onModal = (typeof onModal == 'function') ? onModal : () => {};

    const onCloseAfter = this.options['onCloseAfter'];
    this.onCloseAfter = (typeof onCloseAfter == 'function') ? onCloseAfter : () => {};

    this.onIgnite();
  }

  onIgnite() {
    const body = document.body;
    const target = this.options['target'];
    const loadingElement = this.options['loadingElement'];
    const modalElement = this.options['modalElement'];
    const insertElement = this.options['insertElement'];
    const hasTarget = modalElement == null && target !== null;

    new Promise((resolve, reject) => {
      checkPromise(this.onBefore, (result) => {
        if (result) {
          resolve(result);
        } else {
          reject(new Error('error message'));
        }
      });
    })
    .then((nextFlug) => {
      return new Promise((resolve, reject) => {
        if (nextFlug) {
          checkPromise(this.onBeforeModal, (result) => {
            // show loading
            this.loading().showLoading(loadingElement);

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
    })
    .then((nextFlug) => {
      return new Promise((resolve, reject) => {
        if (nextFlug) {
          // show modal
          if (hasTarget) {
            target.setAttribute('style', 'opacity: 0; display: block; -webkit-transition: all .3s; transition: all .3s;');
          } else {
            body.insertAdjacentHTML('beforeend', modalElement);
            if(insertElement !== null ) {
              var content_inner = document.getElementById('pem__contentInner');
              content_inner.insertAdjacentHTML('beforeend', insertElement);
            }
          }

          body.classList.add('pem__open');

          checkPromise(this.onModal, (result) => {
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
    })
    .then((nextFlug) => {
      return new Promise((resolve, reject) => {
        if (nextFlug) {
          // hide loading
          this.loading().hideLoading();

          // add modal
          const modal = (target == void 0 || target == null) ? document.getElementById('pem') : target;
          setTimeout(() => {
            if (hasTarget) {
              modal.style.opacity = 1;
            }
            modal.classList.add('pem--activate');
          }, 1);

          // hide modal event
          const pemClose = document.getElementsByClassName('pemClose');
          for (let self of Array.from(pemClose)) {
            self.addEventListener('click', (event_2) => {
              body.classList.remove('pem__open');
              modal.classList.remove('pem--activate');

              if (hasTarget) {
                modal.style.opacity = 0;

                setTimeout(() => {
                  modal.style.display = 'none';
                  checkPromise(this.onCloseAfter);
                }, 300);
              } else {
                setTimeout(() => {
                  if(modal.parentNode !== null) {
                    modal.parentNode.removeChild(modal);
                    checkPromise(this.onCloseAfter);
                  }
                }, 300);
              }
            });
          }

          // not hide pem__contentInner in click event
          const pem__contentInner = document.getElementById('pem__contentInner');
          if(pem__contentInner !== null) {
            pem__contentInner.addEventListener('click', (event_3) => {
              event_3.stopPropagation();
            });
          }

          // modal scrolling on mobile devices
          body.addEventListener('touchmove', (e) => {
            let hasClass = body.classList.contains('pem__open');
            if(hasClass) {
              e.preventDefault();
            }
          }, { passive: false });
        } else {
          reject(new Error('error message'));
        }
      });
    })
    .catch((error) => {
      console.log(error);
      let modal = document.getElementById('pem');
      if(modal !== null) {
        modal.parentNode.removeChild(modal);
      }

      this.loading().hideLoading();
    });

    /*
     * checkPromise - Promiseの有無をチェック
     *
     * @params (modalFunction) function - Function to check for promise
     * @params (func) function - Function after checked
     */
    function checkPromise(modalFunction, func) {
      if(modalFunction !== void 0) {
        if(typeof modalFunction.then === 'function') {
          modalFunction()
          .then((result) => {
            if(func == void 0){
              return func(true);
            } else {
              return func(result);
            }
          })
          .catch(() => {
            return false;
          });
        } else {
          return new Promise((resolve, reject) => {
            resolve(modalFunction());
          })
          .then((result) => {
            if (typeof result === 'boolean') {
              if(func == void 0){
                return func(true);
              } else {
                return func(result);
              }
            } else {
              return func(true);
            }
          })
          .catch(() => {
            return false;
          });
        }
      } else {
        if(func !== void 0){
          return false;
        }
      }
    }
  }

  hasAddModalClass(addClass) {
    // check modal Class
    if(addClass !== null && ({}).toString.call(addClass) === '[object String]' && 0 < addClass.length) {
      return addClass;
    } else {
      return null;
    }
  }

  hasModalElement(element, target, addModalClass) {
    // check modal element
    if(element == null && target == null) {
      addModalClass = (addModalClass !==null) ? addModalClass : '';
      element = `
        <div id="pem" class="pem pemClose ${addModalClass}" role="dialog">
          <div class="pem__wrap">
            <div class="pem__body">
              <div class="pem__content">
                <div class="pem__close pemClose">
                  <span>×</span>
                </div>
                <div id="pem__contentInner" class="pem__contentInner">
                </div>
              </div>
            </div>
          </div>
        </div>`;
    }

    return element;
  }

  hasInsertElement(element) {
    // check modal insert element
    if(element instanceof Object) {
      let elements = '';

      if(element.length == null && 0 < element.outerHTML.length) {
        element = element.outerHTML;
      } else if(0 < element.length) {
        for (let self of Array.from(element)) {
           elements += self.outerHTML;
        }
        element = elements;
      }
    }

    if(element !== null && ({}).toString.call(element) === '[object String]' && 0 < element.length) {
      return element;
    } else {
      return null;
    }
  }

  hasLoadingIcon(icon) {
    if(icon == void 0 || icon == null) {
      icon = '<img src="/assets/images/loading.gif">';
    }

    return icon;
  }

  hasLoadingElement(element, icon) {
    if(element == void 0 || element == null) {
      element = `
        <div id="pemLoading" class="pemLoading">
          <div class="pemLoading__wrapper">
              <div class="pemLoading__body">
                ${icon}
              </div>
            </div>
        </div>`;
    }

    return element;
  }

  loading() {
    let obj = {
      // show loading
      showLoading: (loadingElement) => {
        document.body.insertAdjacentHTML('beforeend', loadingElement);
        let loading = document.getElementById('pemLoading');
        setTimeout(() => {
          if(loading !== null) {
            loading.classList.add('pemLoading--activate');
          }
        }, 1);
      },

      // hide loading
      hideLoading: () => {
        let loading = document.getElementById('pemLoading');
        if(loading !== null) {
          setTimeout(() => {
            loading.classList.remove('pemLoading--activate');
            setTimeout(() => {
              if(loading.parentNode !== null) {
                loading.parentNode.removeChild(loading);
              }
            }, 300);
          }, 300);
        }
      }
    };

    return obj;
  }
}

export default PEModal;
if (typeof window != 'undefined') {
  !window.PEModal && (window.PEModal = PEModal);
}
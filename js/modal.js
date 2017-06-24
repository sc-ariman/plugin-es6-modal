/**
Plugin ES6 Modal

Copyright (c) 2017

This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
*/

class PEModal {
  constructor(option) {
    if(option instanceof Object || Object.getPrototypeOf(option) === Object.prototype) {
      const target = option.target;
      const loadingElement = option.loadingElement;

      if(target instanceof Object || Object.getPrototypeOf(target) === Object.prototype) {
        // check target length
        let targets = Array.from(target);
        if(targets.length == 0 || targets == void 0) {
          console.warn('pem target undifined');
          return false;
        }

        // check loading element
        let loadingImage;
        if(loadingElement == void 0 || loadingElement == null || loadingElement == '') {
          loadingImage = `<img src="/assets/images/loading.gif">`;
        } else {
          loadingImage = loadingElement;
        }

        for (let target of targets) {
          this.target = target;
          this.onClick(target, loadingImage);
        }
      }
    }

    return this;
  }

  onClick(target, loadingImage) {
    const modalFrame = `
        <div class="pem" id="pem" role="dialog">
          <div class="pem__wrap">
            <div class="pem__body">
              <div class="pem__content">
                <div class="pem__close">
                  <span>×</span>
                </div>
                <div id="pem__contentInner" class="pem__contentInner">
                </div>
              </div>
            </div>
          </div>
        </div>`;

    target.addEventListener('click', (event_1) => {
      const body = document.body;

      new Promise((resolve, reject) => {
        let onBefore = this.onBefore;

        checkPromise(onBefore, (result) => {
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
            let onBeforeModal = this.onBeforeModal;

            checkPromise(onBeforeModal, (result) => {
              // show loading
              this.loading().showLoading(loadingImage);

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
            body.insertAdjacentHTML('beforeend', modalFrame);
            body.classList.add('pem__open');

            let onModal = this.onModal;
            checkPromise(onModal, (result) => {
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

            const modal = document.getElementById('pem');
            setTimeout(() => {
              modal.classList.add('pem--activate');
            }, 1);

            // hide modal event
            modal.addEventListener('click', (event_2) => {
                const _this = event_2.currentTarget;
                _this.classList.remove('pem--activate');
                body.classList.remove('pem__open');

                setTimeout(() => {
                  _this.parentNode.removeChild(_this);
                  checkPromise(this.onModalAfter);
                }, 300);
             });

            // not hide pem__contentInner in click event
            const pem__contentInner = document.getElementById('pem__contentInner');
            pem__contentInner.addEventListener('click', (event_3) => {
              event_3.stopPropagation();
            });

            // modal scrolling on mobile devices
            body.addEventListener('touchmove', (e) => {
              let hasClass = body.classList.contains('pem__open');
              if(hasClass) {
                e.preventDefault();
              }
            },{passive: false});
          } else {
            reject(new Error('error message'));
          }
        });
      })
      .catch((error) => {
        let modal = document.getElementById('pem');
        if(modal !== null) {
          modal.parentNode.removeChild(modal);
        }

        this.loading().hideLoading();
      });
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

  onBefore() {}

  onBeforeModal() {}

  onModal() {}

  onModalAfter() {}

  loading() {
    let obj = {
      // show loading
      showLoading: (loadingImage) => {
        if(loadingImage == void 0 || loadingImage == null || loadingImage == '') {
          loadingImage = `
            <img src="/assets/images/loading.gif">`;
        }

        const loadingElement = `
          <div class="pemLoading" id="pemLoading">
            <div class="pemLoading__wrapper">
                <div class="pemLoading__body">
                  ${loadingImage}
                </div>
              </div>
          </div>`;

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
              loading.parentNode.removeChild(loading);
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
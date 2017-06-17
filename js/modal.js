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

    this.nextFlug = true;
    return this;
  }

  onClick(target, loadingImage) {
    const modalFrame = `
        <div class="pem" id="pem">
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

        checkPromise(onBefore, () => {
          let nextFlug = this.nextFlug;

          if (this.nextFlug) {
            resolve(this.nextFlug);
          } else {
            reject(new Error('error message'));
          }
        });
      })
      .then((nextFlug) => {
        return new Promise((resolve, reject) => {
          if (nextFlug) {
            let onBeforeModal = this.onBeforeModal;

            checkPromise(onBeforeModal, () => {
              // show loading
              this.loading().showLoading(loadingImage);

              if (this.nextFlug) {
                resolve(this.nextFlug);
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
            checkPromise(onModal, () => {
              if (this.nextFlug) {
                resolve(this.nextFlug);
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
        modal.parentNode.removeChild(modal);
        this.loading().hideLoading();
        console.log(error);

        this.onError();
      });
    });

    /*
     * checkPromise - Promiseの有無をチェック
     *
     * @params (onFunc) function - Function to check for promise
     * @params (func) function - Function after checked
     */
    function checkPromise(onFunc, func) {
      if(onFunc !== void 0) {
        if(typeof onFunc.then === 'function') {
          onFunc()
          .then(() => {
            if(func !== void 0){
              return func();
            }
          });
        } else {
          return new Promise((resolve) => {
            resolve(onFunc());
          })
          .then(() => {
            if(func !== void 0){
              return func();
            }
          });
        }
      } else {
        if(func !== void 0){
          return func();
        }
      }
    }
  }

  onBefore() {}

  onBeforeModal() {}

  onModal() {}

  onModalAfter() {}

  onError() {
    return new Promise((resolve) => {
      if(typeof this.onError === 'function'){
        resolve(this.onError());
      } else {
        resolve();
      }
    });
  }

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
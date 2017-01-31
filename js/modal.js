/**
Plugin ES6 Modal

Copyright (c) 2017

This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
*/

class Modal {
  constructor(element) {
    if(element instanceof Object || Object.getPrototypeOf(element) === Object.prototype) {
      let targets = Array.from(element);
      if(targets.length == 0 || targets == void 0) {
        console.warn('target undifined');
        return false;
      }

      for (let target of targets) {
        this.onClick(target);
      }
    }

    this.nextFlug = true;

    return this;
  }

  onClick(target) {
    const modalFrame = `
        <div class="modal" id="modal">
          <div class="modal_wrap">
            <div class="wrap_body">
              <div class="body_content">
                <div class="modal_close">
                  ×
                </div>
                <div id="content_inner" class="content_inner">
                </div>
              </div>
            </div>
          </div>
        </div>`;

    target.addEventListener('click', (event_1) => {
      this.target = event_1.target;
      const body = document.body;

      new Promise((resolve, reject) => {
        let onBefore = this.onBefore();

        // Check if THEN
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
            let onBeforeModal = this.onBeforeModal();

            // Check if THEN
            checkPromise(onBeforeModal, () => {
              // show loading
              this.loading().showLoading(this.loadingImage);

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
            body.classList.add('modal_open');

            // Check if THEN
            let onModal = this.onModal();
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

            const modal = document.getElementById('modal');
            setTimeout(() => {
              modal.classList.add('modal_activate');
            }, 1);

            // hide modal event
            modal.addEventListener('click', (event_2) => {
                const _this = event_2.currentTarget;
                _this.classList.remove('modal_activate');
                body.classList.remove('modal_open');

                setTimeout(() => {
                  _this.parentNode.removeChild(_this);
                  this.onModalAfter();
                }, 300);
             });

            // not hide content_inner in click event
            const content_inner = document.getElementById('content_inner');
            content_inner.addEventListener('click', (event_3) => {
              event_3.stopPropagation();
              event_3.preventDefault();
            });

            // modal scrolling on mobile devices
            body.addEventListener('touchmove', (e) => {
              let hasClass = body.classList.contains('modal_open');
              if(hasClass) {
                e.preventDefault();
              }
            });
          } else {
            reject(new Error('error message'));
          }
        });
      })
      .catch((error) => {
        let modal = document.getElementById('modal');
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
      if(onFunc !== void 0 && typeof onFunc.then === 'function') {
        onFunc.then(() => {
          func();
        });
      } else {
        func();
      }
    }
  }

  onBefore() {
    return new Promise((resolve) => {
      if(typeof this.onBefore === 'function'){
        resolve(this.onBefore());
      } else {
        resolve();
      }
    });
  }

  onBeforeModal() {
    return new Promise((resolve) => {
      if(typeof this.onBeforeModal === 'function'){
        resolve(this.onBeforeModal());
      } else {
        resolve();
      }
    });
  }

  onModal() {
    return new Promise((resolve) => {
      if(typeof this.onModal === 'function'){
        resolve(this.onModal());
      } else {
        resolve();
      }
    });
  }

  onModalAfter() {
    return new Promise((resolve) => {
      if(typeof this.onModalAfter === 'function'){
        resolve(this.onModalAfter());
      } else {
        resolve();
      }
    });
  }

  onError() {
    return new Promise((resolve) => {
      if(typeof this.onError === 'function'){
        resolve(this.onError());
      } else {
        resolve();
      }
    });
  }

  loading(image) {
    if(image == void 0) {
      image = `
        <img src="/assets/images/loading.gif">`;
    }

    const loadingElement = `
      <div class="loading" id="loading">
        <div class="loading_wrapper">
            <div class="loading_body">
              ${image}
            </div>
          </div>
      </div>`;

    let obj = {
      // show loading
      showLoading: () => {
        document.body.insertAdjacentHTML('beforeend', loadingElement);
        let loading = document.getElementById('loading');
        if(loading !== null) {
          loading.classList.add('loading_activate');
        }
      },

      // hide loading
      hideLoading: () => {
        let loading = document.getElementById('loading');
        if(loading !== null) {
          loading.classList.remove('loading_activate');
          setTimeout(() => {
            loading.parentNode.removeChild(loading);
          }, 300);
        }
      }
    };

    return obj;
  }
}

export default Modal;
if (typeof window != 'undefined') {
  !window.Modal && (window.Modal = Modal);
}
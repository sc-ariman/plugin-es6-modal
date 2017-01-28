/**
Modal

Copyright (c) 2017

This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
*/

/* global $ */
class Modal {
  constructor(element, nextFlug) {
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

    this.target;
    this.nextFlug = true;

    return this;
  }

  onClick(target) {
    const modalElement = `
        <div class="modal" id="modal">
          <div class="modal_wrap">
            <div class="wrap_body">
              <div class="body_content">
                <div class="modal_close">
                  ×
                </div>
                <div id="content_inner" class="content_inner" style="padding:10%; background: #fff;">
                </div>
              </div>
            </div>
          </div>
        </div>`;

    target.addEventListener('click', (event_1) => {
      this.target = event_1.target;
      const body = document.body;

      // before displaying a modal
      new Promise((resolve, reject) => {
        this.onBefore();
        let nextFlug = this.nextFlug;

        if (nextFlug) {
          resolve(nextFlug);
        } else {
          reject(new Error('error message'));
        }
      })
      .then((nextFlug) => {
        return new Promise((resolve, reject) => {
          if (nextFlug) {
            this.onBeforeModal();
            // show loading
            this.loading().showLoading();
            resolve(nextFlug);
          } else {
            reject(new Error('error message'));
          }
        });
      })
      .then((nextFlug) => {
        return new Promise((resolve, reject) => {
          if (this.nextFlug) {
            // hide loading
            this.loading().hideLoading();

            // show modal
            body.insertAdjacentHTML('beforeend', modalElement);
            body.classList.add('modal_open');

            this.onModal();

            const modal = document.getElementById('modal');
            modal.style.display = 'block';
            modal.style.transition = 'opacity .3s';
            setTimeout(() => {
              modal.style.opacity = 1;
            }, 1);

            // hide modal event
            modal.addEventListener('click', (event_2) => {
                const _this = event_2.currentTarget;
                _this.style.opacity = 0;
                body.classList.remove('modal_open');

                setTimeout(() => {
                  _this.parentNode.removeChild(_this);
                }, 300);
             });

            // modal inner
            const content_inner = document.getElementById('content_inner');
            content_inner.addEventListener('click', (event_3) => {
              event_3.stopPropagation();
              event_3.preventDefault();
            });


            // Modal scrolling on mobile devices
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
        // hide loading
        this.loading().hideLoading();
        console.log(error);
      });
    });
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
          loading.style.opacity = 0;
          loading.style.display = 'block';
          loading.style.transition = 'opacity .5s';
          loading.style.opacity = 1;
        }
      },

      // hide loading
      hideLoading: () => {
        let loading = document.getElementById('loading');
        if(loading !== null) {
          setTimeout(() => {
            loading.style.opacity = 0;
          }, 1);
          setTimeout(() => {
            loading.parentNode.removeChild(loading);
          }, 500);
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
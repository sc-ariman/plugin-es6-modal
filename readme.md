# Plugin-es6-modal

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/sc-ariman/tool/blob/master/LICENSE)

simple modal window

## Description

You get any targets.  
add something event for targets, and add any arguments.  
event ignite.  
enjoy!

## Usage

```javascript
// The minimum required arguments are "button" and "target" or "insertElement" .
document.querySelector('.btn').addEventListener('click', function(e){
    var modal = new PEModal({
        button: e.currentTarget,
        insertElement: '<span>insert Element</span>',
        // or
        // insertElement: document.querySelector or $('.jquery_element'),
        // or
        // target: document.getElementById('test'),
    });
});

// You can also use bind of jquery.
var btn_jquery = $('.btnJquery_1');
btn_jquery.on('click', function(e){
    var modal = new PEModal({
        button: $(this),
        target: $('#test'),
    });
});

// More than one element
var btn = document.querySelectorAll('.btnModal');
for (var i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', function (e) {
        var modal = new PEModal({
            addModalClass: 'pem--addModal',
            button: e.currentTarget,
            // If modify loading elemnt.
            loadingElement: '<div class="loading"></div>',
            loadingIcon:    '<i class="icon icon-spinner"></i>',
            insertElement:  '<span>insert Element</span>',
            onBefore:  function(){
                console.log('onBefore');
                // if you want to stop creating a next modal function.
                // return false;
            },
            onBeforeModal: function(){
                console.log('onBeforeModal');
            },
            onModal: function(){
                console.log('onModal');

                return new Promise((resolve) => {
                    setTimeout(function(){
                        var content_inner = document.getElementById('pem__contentInner');
                        content_inner.insertAdjacentHTML('beforeend', 'On Modal!');
                        resolve(true);
                    }, 1000);
                });
            },
            onCloseAfter: function() {
                console.log('onCloseAfter');
            }
        });
    }, false);
}

```

### OPTION

#### addModalClass

* Type: string
* Default: ''

Add class to parent element.

#### button

* Type: element
* Default: ''

Element query to use as button.

#### close event
If you want to close the opened modal what can add  "pem__close" class for any element.

```
exmple
insertElement: '<span class="pemClose closeArea">insert Element</span>',
```
Modal close on click at "closeArea" class.

#### target

* Type: element
* Default: ''

If there is an element in the target, "target" takes precedence over "insertElement".

#### loadingElement

* Type: string
* Default:
```
<div id="pemLoading" class="pemLoading">
    <div class="pemLoading__wrapper">
        <div class="pemLoading__body">
            ${loadingIcon}
        </div>
    </div>
</div>
```

#### loadingIcon

* Type: string
* Default: `<img src="/assets/images/loading.gif">`

#### insertElement

* Type: string or element
* Default: ''

#### trigger

* Type: function
* Default: ''
* arguments: `onBefore`, `onBeforeModal` , `onModal`, `onCloseAfter`

if you want to stop creating a next modal function.
`function() {return false;}`

also, if return a promise, the next modal function fires after promise processing.

## Install

``$ git clone https://github.com/sc-ariman/plugin-es6-modal.git ``


## Licence

[MIT](https://github.com/sc-ariman/tool/blob/master/LICENSE)

## Author

[@arima7th](http://twitter.com/arima7th)

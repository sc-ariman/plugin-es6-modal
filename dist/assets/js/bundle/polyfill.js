var ary = [
  '//cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.22.0/polyfill.min.js',
  //'//cdnjs.cloudflare.com/ajax/libs/flexibility/2.0.1/flexibility.js'
];
var len = ary.length;
var i = 0;
while (i < len) {
  var sc = document.createElement("script");
  sc.setAttribute("src", ary[i]);
  document.head.appendChild(sc);
  i++;
}
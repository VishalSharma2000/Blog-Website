// const { default: Quill } = require("quill");


var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block', 'image'],
  [{'header': [1, 2, 3, 4, 5, 6, false]}],
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'script': 'sub'}, {'script': 'super'}],
  ['link', 'formula', 'video'],
  [{'size': ['small', false, 'large', 'huge']}],
  [{'color': []}, {'background': []}],
  [{'font': []}],
  [{'align': []}]
]

var quill = new Quill('#editor', {
  modules: {
    toolbar: toolbarOptions
  },
  theme: 'snow',
  placeholder: 'Share your Knowledge...'
})


// var form = document.querySelector('.newPost')
// form.onsubmit = () => {
//   // populate hidden form unit
//   var Hiddeninput = document.querySelector('#hiddenTA')
//   Hiddeninput.value = JSON.stringify(quill.getContents())

//   console.log(Hiddeninput.value)
// }
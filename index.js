import Moveable from "moveable";
import Swiper from "swiper";

let moveable;

document.getElementById('moveable').addEventListener('click', (event) => {
  let target = document.getElementById('target');
  if (target) {
    target.removeAttribute('id');
  }

  if (moveable) {
    moveable.destroy();
  }

  moveable = new Moveable(document.body)
  if (event.target.className.match(/furniture/)) {
    event.target.id = "target";
    moveable.setState({
        target: event.target,
        draggable: true,
        rotatable: true,
        throttleDrag: 0,
        throttleRotate: 0,
        rotationPosition: "top",
        origin: false,
    });

    const frame = {
      translate: [0, 0],
      rotate: 0,
    };
    moveable
      .on("dragStart", ({ set }) => {
        set(frame.translate);
      })
      .on("drag", ({ target, transform }) => {
        console.log(transform);
        target.style.transform = transform;
      })
      .on("dragEnd", ({ target, isDrag, clientX, clientY }) => {
        console.log("onDragEnd", target, isDrag);
      })
      .on("rotateStart", ({ set }) => {
          set(frame.rotate);
      }).on("rotate", ({ target, transform }) => {
          target.style.transform = transform;
      }).on("rotateEnd", ({ target, isDrag, clientX, clientY }) => {
          console.log("onRotateEnd", target, isDrag);
      });
  }
});

document.getElementById('buttons').addEventListener('click', (event) => {
  if (event.target.src) {
    let image = document.createElement('img');
    image.src = event.target.src;
    image.setAttribute('class', 'furniture');
    if (event.target.src.match(/chair/)) {
      image.classList.add('chair');
    }
    document.getElementById('moveable').appendChild(image);
  }
});

window.addEventListener("keydown", function(event) {
  let target = document.getElementById('target');
  if (event.code === 'Backspace' && target) {
    moveable.destroy();
    target.remove();
    moveable = new Moveable(document.body)
  }
}, true);

document.getElementById('js-hamburger').addEventListener('click', (event) => {
  let target = document.getElementById('target');
  if (target) {
    target.removeAttribute('id');
  }

  if (moveable) {
    moveable.destroy();
  }
  moveable = new Moveable(document.body)
})


var mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    loop: true,
    grabCursor: true,
    breakpoints: {
      0: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      // when window width is >= 800px
      800: {
        slidesPerView: 5,
        spaceBetween: 20
      }
    },

    // If we need pagination
    pagination: {
      el: '.swiper-pagination'
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })


function toggleNav() {
  var body = document.body;
  var hamburger = document.getElementById('js-hamburger');
  var blackBg = document.getElementById('js-black-bg');
  var nav = document.getElementById('nav');

  hamburger.addEventListener('click', function() {
    body.classList.toggle('nav-open');
  });
  blackBg.addEventListener('click', function() {
    body.classList.remove('nav-open');
  });
  nav.addEventListener('click', function() {
    body.classList.remove('nav-open');
  });
}
toggleNav();


// room画像を選択
if (window.File && window.FileReader) {
  function handleFileSelect(evt) {
    var file = evt.target.files[0]; // File object

    if (file.type.match('image.*')) {
      var reader = new FileReader();

      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          let image = document.createElement('img');
          image.src = e.target.result;
          image.setAttribute('id', 'target');
          image.style.height = '150px';
          document.getElementById('moveable').appendChild(image);
        };
      })(file);

      // Read in the image file as a data URL.
      reader.readAsDataURL(file);

      reader.onloadend = function() {
        moveable = new Moveable(document.body);
        moveable.setState({
            target: document.getElementById('target'),
            draggable: true,
            rotatable: true,
            scalable: true,
            throttleDrag: 0,
            throttleRotate: 0,
            throttleScale: 0,
            rotationPosition: "top",
            origin: false,
            keepRatio: true,
        });

        const frame = {
          translate: [0, 0],
          rotate: 0,
          scale: [1, 1],
        };
        moveable
          .on("dragStart", ({ set }) => {
            set(frame.translate);
          })
          .on("drag", ({ target, transform }) => {
            console.log(transform);
            target.style.transform = transform;
          })
          .on("dragEnd", ({ target, isDrag, clientX, clientY }) => {
            console.log("onDragEnd", target, isDrag);
          })
          .on("rotateStart", ({ set }) => {
              set(frame.rotate);
          }).on("rotate", ({ target, transform }) => {
              target.style.transform = transform;
          }).on("rotateEnd", ({ target, isDrag, clientX, clientY }) => {
              console.log("onRotateEnd", target, isDrag);
          }).on("scaleStart", ({ set, dragStart }) => {
              set(frame.scale);
          }).on("scale", ({ target, scale, drag, transform }) => {
              target.style.transform = transform;
          }).on("scaleEnd", ({ target, isDrag, clientX, clientY }) => {
              console.log("onScaleEnd", target, isDrag);
          });
      }
    };
  }

  document.getElementById('file').addEventListener('change', handleFileSelect, false);
} else {
  alert('The File APIs are not fully supported in this browser.');
}

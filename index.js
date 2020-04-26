import Moveable from "moveable";

let moveable;

document.getElementById('moveable').addEventListener('click', (event) => {
  if (moveable) {
    moveable.destroy();
  }

  moveable = new Moveable(document.body)

  if (event.target.className === 'square') {
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

document.getElementById('button').addEventListener('click', (event) => {
  let image = document.createElement('img');
  image.src = event.target.src;
  image.setAttribute('class', 'square');
  image.setAttribute('style', 'width: 100px; height: 100px; position: absolute;');
  document.getElementById('moveable').appendChild(image);
});

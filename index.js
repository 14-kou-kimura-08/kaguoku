import Moveable from "moveable";

const moveable = new Moveable(document.body, {
  // If you want to use a group, set multiple targets(type: Array<HTMLElement | SVGElement>).
  target: document.getElementById("target"),
  draggable: true,
  rotatable: true,
  pinchable: true,
  throttleDrag: 0,
  throttleRotate: 0,
  rotationPosition: "top",
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
  .on("rotateStart", ({ target, clientX, clientY }) => {
      console.log("onRotateStart", target);
  }).on("rotate", ({ target, transform }) => {
      target.style.transform = transform;
  }).on("rotateEnd", ({ target, isDrag, clientX, clientY }) => {
      console.log("onRotateEnd", target, isDrag);
  });

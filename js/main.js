const socket = new WebSocket("ws://ucha.ge:8082");
let isSocketConnected = false;
socket.addEventListener("open", function (event) {
  isSocketConnected = true;
});
socket.onmessage = function (data) {
  console.log(data);
};

let elementTd = document.querySelectorAll("td");
socket.addEventListener("message", function (event) {
  //   console.log(event.data);
  let indexAndColor = JSON.parse(event.data);
  elementTd[indexAndColor.id].style.backgroundColor = indexAndColor.color;
});

const colorArray = [
  "red",
  "yellow",
  "black",
  "blue",
  "green",
  "brown",
  "orange",
  "aqua",
  "purple",
  "gold",
];
let getRandomColor = function () {
  let valueRandomNumber = Math.random() * 9;
  let flooredRandomNumber = Math.floor(valueRandomNumber);
  return colorArray[flooredRandomNumber];
};

for (let index = 0; index < elementTd.length; index++) {
  const element = elementTd[index];
  const myColor = getRandomColor();

  element.addEventListener("click", () => {
    element.style.backgroundColor = myColor;
    let objcetToSend = {
      id: index,
      color: myColor,
    };
    if (isSocketConnected) {
      socket.send(JSON.stringify(objcetToSend));
    } else {
      console.log("WARNING: We are not connected to the WebSocket yet");
    }
  });
}

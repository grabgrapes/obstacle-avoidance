function myFunction() {
  console.log("Function is called!");
}

// 获取按钮元素
const button = document.getElementById("myButton");

// 添加事件监听器
if (button) {
  button.addEventListener("click", myFunction);
}
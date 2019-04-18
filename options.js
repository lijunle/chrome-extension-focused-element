let list = document.getElementById("list");

function constructOptions(colors) {
  for (let color of colors) {
    let button = document.createElement("button");
    button.style.backgroundColor = color;
    button.addEventListener("click", function() {
      chrome.storage.sync.set({ color: color }, function() {
        console.log("color is " + color);
      });
    });

    list.appendChild(button);
  }
}

constructOptions(["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"]);

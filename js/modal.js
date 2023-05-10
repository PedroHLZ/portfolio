var modalLinks = document.getElementsByClassName("modal-link");
var modal = document.getElementById("modal");
var modalFrame = document.getElementById("modalFrame");

for (var i = 0; i < modalLinks.length; i++) {
  modalLinks[i].addEventListener("click", function(event) {
    event.preventDefault();
    modal.style.display = "block";
    var source = this.getAttribute("data-src");
    modalFrame.src = source;
  });
}

document.getElementsByClassName("close")[0].addEventListener("click", function() {
  modal.style.display = "none";
  modalFrame.src = "";
});
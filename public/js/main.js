document.addEventListener("DOMContentLoaded", init);

function init(){
  const projectBoxes = document.getElementsByClassName("project-box");
  for (let i = 0; i < projectBoxes.length; i++){
    const targetBox = projectBoxes[i];
    const boxDay = targetBox.getAttribute("data-day");
    targetBox.addEventListener("click", () => {
      location.href = `/project/${boxDay}`;
    });
  }
}
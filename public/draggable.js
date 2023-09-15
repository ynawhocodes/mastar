document.addEventListener("DOMContentLoaded", function () {
  // 여기에 드래그 가능한 요소에 대한 코드를 추가합니다.
  const draggableElements = document.querySelectorAll(".draggable");
  draggableElements.forEach((element) => {
    let offsetX, offsetY;
    let isDragging = false;

    // 마우스 버튼을 누를 때
    element.addEventListener("mousedown", (e) => {
      isDragging = true;

      // 마우스 포인터 위치에서 이미지의 현재 위치를 빼서 이동 거리를 계산합니다.
      offsetX = e.clientX - element.getBoundingClientRect().left;
      offsetY = e.clientY - element.getBoundingClientRect().top;

      // 드래그할 때 커서 모양 변경
      element.style.cursor = "grabbing";
    });

    // 문서에서 마우스를 이동할 때
    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;

      // 마우스 위치에 따라 이미지 위치를 업데이트합니다.
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;

      element.style.left = x + "px";
      element.style.top = y + "px";
    });

    // 마우스 버튼을 놓을 때
    document.addEventListener("mouseup", () => {
      if (isDragging) {
        // 드래그 종료 시 커서 모양 변경
        element.style.cursor = "grab";
        isDragging = false;
      }
    });
  });
});

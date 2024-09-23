const draggables = document.querySelectorAll('.draggable');
const dropZone = document.getElementById('dropZone');

draggables.forEach(item => {
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('touchstart', touchStart);
  item.addEventListener('touchmove', touchMove);
  item.addEventListener('touchend', touchEnd);
});

dropZone.addEventListener('dragover', dragOver);
dropZone.addEventListener('drop', drop);

let currentDraggedItem = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

// Drag start (mouse)
function dragStart(e) {
  currentDraggedItem = e.target;
  
  // Calculate the offset of the mouse relative to the dragged element
  const rect = currentDraggedItem.getBoundingClientRect();
  dragOffsetX = e.clientX - rect.left;
  dragOffsetY = e.clientY - rect.top;

  e.dataTransfer.setData('text/plain', e.target.id);
  setTimeout(() => {
    currentDraggedItem.style.display = 'none'; // Hide while dragging
  }, 0);
}

// Drag over (allow drop)
function dragOver(e) {
  e.preventDefault();
}

// Drop (mouse)
function drop(e) {
    e.preventDefault();
  
    const dropZoneRect = dropZone.getBoundingClientRect();
    
    const offsetX = e.clientX - dropZoneRect.left - dragOffsetX;
    const offsetY = e.clientY - dropZoneRect.top - dragOffsetY;
  
    // Position the dragged item
    currentDraggedItem.style.position = 'absolute';
    currentDraggedItem.style.left = `${offsetX}px`;
    currentDraggedItem.style.top = `${offsetY}px`;
    currentDraggedItem.style.display = 'block'; // Show it again

    // Append the item back to the drop zone
    dropZone.appendChild(currentDraggedItem);
    currentDraggedItem = null;
  }

// Touch start (touch devices)
function touchStart(e) {
  currentDraggedItem = e.target;

  // Calculate the touch offset relative to the element's position
  const rect = currentDraggedItem.getBoundingClientRect();
  const touch = e.touches[0];
  dragOffsetX = touch.clientX - rect.left;
  dragOffsetY = touch.clientY - rect.top;

  setTimeout(() => {
    currentDraggedItem.style.display = 'none'; // Hide while dragging
  }, 0);
}

// Touch move (touch devices)
function touchMove(e) {
  e.preventDefault();
  const touch = e.touches[0];

  const dropZoneRect = dropZone.getBoundingClientRect();
  
  // Calculate the new position relative to the drop zone
  const offsetX = touch.clientX - dropZoneRect.left - dragOffsetX;
  const offsetY = touch.clientY - dropZoneRect.top - dragOffsetY;

  currentDraggedItem.style.left = `${offsetX}px`;
  currentDraggedItem.style.top = `${offsetY}px`;
  currentDraggedItem.style.display = 'block'; // Keep visible while moving
}

// Touch end (touch devices)
function touchEnd(e) {
  const touch = e.changedTouches[0];
  const dropZoneRect = dropZone.getBoundingClientRect();

  const offsetX = touch.clientX - dropZoneRect.left - dragOffsetX;
  const offsetY = touch.clientY - dropZoneRect.top - dragOffsetY;

  // Set the new position
  currentDraggedItem.style.position = 'absolute';
  currentDraggedItem.style.left = `${offsetX}px`;
  currentDraggedItem.style.top = `${offsetY}px`;
  currentDraggedItem.style.display = 'block'; // Make it visible again

  // Append the item back to the drop zone
  dropZone.appendChild(currentDraggedItem);

  currentDraggedItem = null;
}

// function drop(e) {
//     e.preventDefault();
  
//     const dropZoneRect = dropZone.getBoundingClientRect();
    
//     const offsetX = e.clientX - dropZoneRect.left - dragOffsetX;
//     const offsetY = e.clientY - dropZoneRect.top - dragOffsetY;
  
//     // Position the dragged item
//     currentDraggedItem.style.position = 'absolute';
//     currentDraggedItem.style.left = `${offsetX}px`;
//     currentDraggedItem.style.top = `${offsetY}px`;
//     currentDraggedItem.style.display = 'block'; // Show it again
  
//     // Create sparkle effect at the drop point
//     createSparkles(offsetX + itemWidth / 2, offsetY + itemHeight / 2, itemWidth, itemHeight);
  
//     // Append the item back to the drop zone
//     dropZone.appendChild(currentDraggedItem);
//     currentDraggedItem = null;
//   }
  
//   function createSparkles(x, y) {
//     for (let i = 0; i < 10; i++) {
//       const sparkle = document.createElement('div');
//       sparkle.classList.add('sparkle');
//       sparkle.style.left = `${x + (Math.random() * 50 - 25)}px`;
//       sparkle.style.top = `${y + (Math.random() * 50 - 25)}px`;
  
//       dropZone.appendChild(sparkle);
  
//       // Remove the sparkle after the animation ends
//       setTimeout(() => {
//         sparkle.remove();
//       }, 500); // Matches the duration of the CSS animation
//     }
//   }
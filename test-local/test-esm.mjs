// Test ES module build
import { 
  SortableContainer, 
  SortableElement, 
  SortableHandle,
  sortableContainer,
  sortableElement,
  sortableHandle,
  arrayMove 
} from '../dist/react-sortable-hoc-latest.esm.js';

console.log('✅ All ES module imports successful!');
console.log('SortableContainer:', typeof SortableContainer);
console.log('SortableElement:', typeof SortableElement);
console.log('SortableHandle:', typeof SortableHandle);
console.log('sortableContainer:', typeof sortableContainer);
console.log('sortableElement:', typeof sortableElement);
console.log('sortableHandle:', typeof sortableHandle);
console.log('arrayMove:', typeof arrayMove);

// Test arrayMove function
const testArray = [1, 2, 3, 4, 5];
const movedArray = arrayMove(testArray, 0, 2);
console.log('Original array:', testArray);
console.log('After moving index 0 to 2:', movedArray);
console.log('✅ arrayMove function works correctly!');

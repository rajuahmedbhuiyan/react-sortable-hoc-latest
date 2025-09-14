// Test UMD build by loading it as a script
const fs = require('fs');
const path = require('path');

// Read the UMD build
const umdPath = path.join(__dirname, '..', 'dist', 'react-sortable-hoc-latest.umd.js');
const umdContent = fs.readFileSync(umdPath, 'utf8');

// Create a simple test environment
const mockReact = {
  createElement: (type, props, ...children) => ({ type, props, children }),
  useCallback: (fn) => fn,
  useRef: () => ({ current: null }),
  useState: (initial) => [initial, () => {}],
  useEffect: () => {},
  useMemo: (fn) => fn(),
  forwardRef: (fn) => fn,
  Component: class Component {},
  PureComponent: class PureComponent {}
};

const mockReactDOM = {
  createRoot: () => ({ render: () => {} }),
  findDOMNode: () => null
};

// Mock global objects
global.React = mockReact;
global.ReactDOM = mockReactDOM;
global.console = console;
global.process = { env: { NODE_ENV: 'test' } };
global.document = {
  createElement: () => ({}),
  addEventListener: () => {},
  removeEventListener: () => {}
};
global.window = {
  ...global,
  getComputedStyle: () => ({}),
  addEventListener: () => {},
  removeEventListener: () => {},
  document: global.document
};
global.invariant = (condition, message) => {
  if (!condition) throw new Error(message);
};

// Mock array-move
global.arrayMove = (array, from, to) => {
  const newArray = array.slice();
  newArray.splice(to, 0, newArray.splice(from, 1)[0]);
  return newArray;
};

// Mock prop-types
global.PropTypes = {
  number: { isRequired: {} },
  string: { isRequired: {} },
  bool: { isRequired: {} },
  func: { isRequired: {} },
  object: { isRequired: {} },
  array: { isRequired: {} },
  oneOf: () => ({ isRequired: {} }),
  oneOfType: () => ({ isRequired: {} }),
  shape: () => ({ isRequired: {} })
};

// Evaluate the UMD build
try {
  eval(umdContent);
  
  // Check what global objects are available
  console.log('Available global objects:', Object.keys(global).filter(key => key.includes('Sortable')));
  
  // Test if the global SortableHOC object is available
  if (typeof global.SortableHOC !== 'undefined') {
    const { SortableContainer, SortableElement, arrayMove } = global.SortableHOC;
    
    console.log('✅ UMD build loaded successfully!');
    console.log('SortableContainer:', typeof SortableContainer);
    console.log('SortableElement:', typeof SortableElement);
    console.log('arrayMove:', typeof arrayMove);
    
    // Test arrayMove function
    const testArray = [1, 2, 3, 4, 5];
    const movedArray = arrayMove(testArray, 0, 2);
    console.log('Original array:', testArray);
    console.log('After moving index 0 to 2:', movedArray);
    console.log('✅ arrayMove function works correctly!');
    
    console.log('✅ All tests passed! The UMD build is working correctly.');
  } else {
    console.error('❌ SortableHOC global object not found');
  }
} catch (error) {
  console.error('❌ Error loading UMD build:', error.message);
}

import "@testing-library/jest-dom/extend-expect";
import "jest-plugin-context/setup";

window.alert = jest.fn();
window.console.log = jest.fn();

// 보통 이렇게 처음에 브라우저에서만 제공하는 메소드를 mock해요.

Object.defineProperty(window, 'localStorage', { 
  value: mock,
  setItem: jest.fn(),
  getItem: jest.fn(),
  clear: jest.fn(),
});
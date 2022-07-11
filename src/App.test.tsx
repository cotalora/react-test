import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Renderizado del componente total APP', () => {
  const componentRender = render(<App />);
  expect(componentRender).toBeTruthy();
});
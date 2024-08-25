import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

test('renders button with children', () => {
  const { getByText } = render(<Button>Hello</Button>);
  const buttonElement = getByText('Hello');
  expect(buttonElement).toBeInTheDocument();
});

test('calls onClick when button is clicked', () => {
  const handleClick = jest.fn();
  const { getByText } = render(<Button onClick={handleClick}>Click me</Button>);
  const buttonElement = getByText('Click me');
  fireEvent.click(buttonElement);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('disables button when disabled prop is true', () => {
  const { getByText } = render(<Button disabled>Disabled</Button>);
  const buttonElement = getByText('Disabled');
  expect(buttonElement).toBeDisabled();
});
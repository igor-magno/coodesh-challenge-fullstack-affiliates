import { render, screen } from '@testing-library/react';
import Layout from './Layout';

test('renders learn Transações', () => {
  render(<Layout isPending={false} children/>);
  const linkElement = screen.getByText(/Transações/i);
  expect(linkElement).toBeInTheDocument();
});

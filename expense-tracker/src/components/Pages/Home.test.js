import { render, screen } from '@testing-library/react';
import Home from './Home';



test('checking the welcome note', () => {
    render(<Home />);
    const linkElement = screen.getByText('Amount?');
    expect(linkElement).toBeInTheDocument();
  });
  
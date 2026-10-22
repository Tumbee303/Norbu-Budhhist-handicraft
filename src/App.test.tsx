import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

function renderApp() {
  return render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

describe('App', () => {
  it('renders without crashing', () => {
    const { getByRole } = renderApp();
    // App should render without errors - check for main content
    expect(getByRole('main')).toBeInTheDocument();
  });

  it('shows header with wordmark', () => {
    const { getAllByRole, getAllByText } = renderApp();
    // Check for header role (banner) - there should be at least one
    const banners = getAllByRole('banner');
    expect(banners.length).toBeGreaterThan(0);
    // Check for BUDDHIST HANDICRAFT text
    expect(getAllByText('BUDDHIST HANDICRAFT').length).toBeGreaterThan(0);
  });

  it('shows main content area', () => {
    const { getByRole } = renderApp();
    expect(getByRole('main')).toBeInTheDocument();
  });

  it('shows footer', () => {
    const { getByRole } = renderApp();
    expect(getByRole('contentinfo')).toBeInTheDocument();
  });
});
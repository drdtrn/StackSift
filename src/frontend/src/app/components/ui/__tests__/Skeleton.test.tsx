import { render } from '@testing-library/react';
import { Skeleton } from '../Skeleton';

// Framer Motion's `motion` components render to normal DOM elements in
// jsdom — animations do not run, but the component renders correctly.
jest.mock('framer-motion', () => ({
  motion: {
    span: ({ children, animate: _a, transition: _t, ...props }: React.HTMLAttributes<HTMLSpanElement> & { animate?: unknown; transition?: unknown }) => (
      <span {...props}>{children}</span>
    ),
  },
}));

const getRoot = (ui: React.ReactElement) => {
  const { container } = render(ui);
  return container.firstChild as HTMLElement;
};

describe('Skeleton', () => {
  it('renders a span element with aria-hidden', () => {
    const el = getRoot(<Skeleton />);
    expect(el.tagName).toBe('SPAN');
    expect(el).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders a circle shape with rounded-full class', () => {
    const el = getRoot(<Skeleton shape="circle" />);
    expect(el.className).toMatch(/rounded-full/);
  });

  it('renders a rectangle shape (rounded-md, not full)', () => {
    const el = getRoot(<Skeleton shape="rectangle" />);
    expect(el.className).not.toMatch(/rounded-full/);
    expect(el.className).toMatch(/rounded-md/);
  });

  it('applies explicit width and height via inline style', () => {
    const el = getRoot(<Skeleton width="200px" height="40px" />);
    expect(el).toHaveStyle({ width: '200px', height: '40px' });
  });

  it('is hidden from screen readers via aria-hidden', () => {
    const el = getRoot(<Skeleton />);
    expect(el).toHaveAttribute('aria-hidden', 'true');
  });

  it('accepts a custom className', () => {
    const el = getRoot(<Skeleton className="opacity-30" />);
    expect(el.className).toMatch(/opacity-30/);
  });
});

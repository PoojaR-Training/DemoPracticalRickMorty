/**
 * @fileoverview Tests for useDebounce hook
 * Tools: Jest + @testing-library/react-hooks (or @testing-library/react for RN)
 */

import { renderHook, act } from '@testing-library/react-hooks';
import { useDebounce } from '../useDebounce';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe('useDebounce – initial render', () => {
  it('returns the initial value on mount without waiting', () => {
    const { result } = renderHook(() => useDebounce('hello', 300));

    expect(result.current).toBe('hello');
  });

  it('uses 300 ms as the default delay', () => {
    const { result } = renderHook(() => useDebounce('default delay'));

    expect(result.current).toBe('default delay');

    act(() => {
      jest.advanceTimersByTime(299);
    });
    expect(result.current).toBe('default delay');

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current).toBe('default delay');
  });
});

describe('useDebounce – before delay', () => {
  it('does not update the debounced value before the delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } },
    );

    rerender({ value: 'updated', delay: 500 });

    act(() => {
      jest.advanceTimersByTime(499);
    });

    expect(result.current).toBe('initial');
  });
});

describe('useDebounce – after delay', () => {
  it('updates the debounced value after the full delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } },
    );

    rerender({ value: 'updated', delay: 500 });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });

  it('works with a custom delay value', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'a', delay: 1000 } },
    );

    rerender({ value: 'b', delay: 1000 });

    act(() => {
      jest.advanceTimersByTime(999);
    });
    expect(result.current).toBe('a');

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current).toBe('b');
  });
});

describe('useDebounce – rapid updates (core debounce behaviour)', () => {
  it('ignores intermediate values and only keeps the last one', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'a' } },
    );

    rerender({ value: 'ab' });
    act(() => {
      jest.advanceTimersByTime(100);
    });

    rerender({ value: 'abc' });
    act(() => {
      jest.advanceTimersByTime(100);
    });

    rerender({ value: 'abcd' });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('abcd');
  });
});

describe('useDebounce – cleanup on unmount', () => {
  it('clears the pending timer on unmount so no state update occurs', () => {
    const { result, rerender, unmount } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'initial' } },
    );

    rerender({ value: 'updated' });

    unmount();

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('initial');
  });
});

describe('useDebounce – generic types', () => {
  it('works with numbers', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce<number>(value, 300),
      { initialProps: { value: 0 } },
    );

    rerender({ value: 42 });
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe(42);
  });

  it('works with objects', () => {
    const initial = { q: '' };
    const updated = { q: 'react native' };

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce<{ q: string }>(value, 300),
      { initialProps: { value: initial } },
    );

    rerender({ value: updated });
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toEqual({ q: 'react native' });
  });
});

describe('useDebounce – real-world search scenario', () => {
  it('reflects debouncedSearch only after the user stops typing', () => {
    let searchInput = '';

    const { result, rerender } = renderHook(() =>
      useDebounce(searchInput, 300),
    );

    ['re', 'rea', 'reac', 'react'].forEach(partial => {
      searchInput = partial;
      rerender();
      act(() => {
        jest.advanceTimersByTime(100);
      });
    });

    expect(result.current).toBe('');

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('react');
  });
});

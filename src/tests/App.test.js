import React, { useEffect } from 'react';
import { act, render, screen } from '@testing-library/react';
import App from '../App';
import fetchData from '../data/fetchData';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(fetchData),
  });
});

describe('initial render works properly', () => {
  it('renders table and filter', async () => {
    act(() => {
      render(<App />)
    })

    expect(await screen.findByRole('table')).toBeInTheDocument();
    expect(await screen.findByRole('banner')).toBeInTheDocument();
  });
  it('calls fetch when the app starts', () => {
    act(() => {
      render(<App />)
    })
    expect(global.fetch).toBeCalled();
  });
});

describe('some tests in the filter component', () => {
  it('has a name-filter and works properly', async () => {
    act(() => {
      render(<App />)
    })
    expect(await screen.findByRole('textbox', {
      name: /filtro por nome/i
    })).toBeInTheDocument();
    userEvent.type(await screen.findByRole('textbox', {
      name: /filtro por nome/i
    }), 'aa');
    expect((await screen.findByRole('table')).childElementCount).toBe(2);
  })
  it('has a numeric filter and works properly', async () => {
    act(() => {
      render(<App />)
    })
    expect(await screen.findByRole('spinbutton')).toBeInTheDocument();
    userEvent.type(await screen.findByRole('spinbutton'), '4500000000');
    userEvent.click(await screen.findByRole('button', {
      name: /filtrar/i
    }));
    expect((await screen.findByRole('table')).childElementCount).toBe(2);
    expect(await screen.findByRole('cell', {
      name: /coruscant/i
    })).toBeInTheDocument();
  })
})
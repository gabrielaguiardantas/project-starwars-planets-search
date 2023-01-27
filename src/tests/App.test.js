import React, { useEffect } from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
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
    expect((await screen.findByRole('table')).rows.length).toBe(2);
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
    expect((await screen.findByRole('table')).rows.length).toBe(2);
    expect(await screen.findByRole('cell', {
      name: /coruscant/i
    })).toBeInTheDocument();

    //limpando tudo 
    userEvent.click(await screen.findByRole('button', {
      name: /remover filtros/i
    }))

    //começando uma filtragem
    userEvent.selectOptions(await screen.findByRole('combobox', {
      name: /coluna/i
    }), 'rotation_period');
    userEvent.selectOptions(await screen.findByRole('combobox', {
      name: /operador/i
    }), 'menor que');
    userEvent.clear(await screen.findByRole('spinbutton'));
    userEvent.type(await screen.findByRole('spinbutton'), '18');
    userEvent.click(await screen.findByRole('button', {
      name: /filtrar/i
    }));
    expect((await screen.findByRole('table')).rows.length).toBe(2);
    expect(await screen.findByRole('cell', {
      name: /bespin/i
    })).toBeInTheDocument();

    //limpando tudo
    userEvent.click(await screen.findByRole('button', {
      name: /remover filtros/i
    }))

    //começando uma segunda filtragem
    userEvent.selectOptions(await screen.findByRole('combobox', {
      name: /coluna/i
    }), 'rotation_period');
    userEvent.selectOptions(await screen.findByRole('combobox', {
      name: /operador/i
    }), 'igual a');
    userEvent.clear(await screen.findByRole('spinbutton'));
    userEvent.type(await screen.findByRole('spinbutton'), '12');
    userEvent.click(await screen.findByRole('button', {
      name: /filtrar/i
    }));
    expect((await screen.findByRole('table')).rows.length).toBe(2);
    expect(await screen.findByRole('cell', {
      name: /bespin/i
    })).toBeInTheDocument();
  })
  it('has a possibility to delete a created filter', async () => {
    act(() => {
      render(<App />)
    })
    userEvent.selectOptions(await screen.findByRole('combobox', {
      name: /coluna/i
    }), 'rotation_period');
    userEvent.selectOptions(await screen.findByRole('combobox', {
      name: /operador/i
    }), 'igual a');
    userEvent.clear(await screen.findByRole('spinbutton'));
    userEvent.type(await screen.findByRole('spinbutton'), '12');
    userEvent.click(await screen.findByRole('button', {
      name: /filtrar/i
    }));
    expect((await screen.findByRole('table')).rows.length).toBe(2);
    expect(await screen.findByRole('cell', {
      name: /bespin/i
    })).toBeInTheDocument();
    userEvent.click(await screen.findByRole('button', {
      name: /excluir/i
    }));
    expect((await screen.findByRole('table')).rows.length).toBe(11);
  })
  it('has a possibility to sort ascendent or descendent the elements on table and this tool work properly', async () => {
    act(() => {
      render(<App />);
    })
    
    await waitFor(() => {
    userEvent.selectOptions(screen.getByRole('combobox', {
      name: /ordenar/i
    }), 'rotation_period');
    userEvent.click(screen.getByTestId('column-sort-input-desc'));
    userEvent.click(screen.getByRole('button', {
      name: /ordenar/i
    }));
    expect((screen.getByRole('table')).rows[1].firstElementChild.innerHTML).toBe('Kamino');
    })

    // segunda filtragem para confirmação do elemento com valor desconhecido em último na ordem
    await waitFor(() => {
    userEvent.selectOptions(screen.getByRole('combobox', {
      name: /ordenar/i
    }), 'surface_water');
    userEvent.click(screen.getByTestId('column-sort-input-asc'));
    userEvent.click(screen.getByRole('button', {
      name: /ordenar/i
    }));
    expect((screen.getByRole('table')).rows[10].firstElementChild.innerHTML).toBe('Coruscant');
  })
  })
})
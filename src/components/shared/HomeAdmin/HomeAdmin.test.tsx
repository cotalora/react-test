import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../../../App';
import HomeAdmin from './HomeAdmin';

test('Al presionar el botón entrar, con datos correcots, me tiene que renderizar el componente de home del administrador', async () => {
    const component = render(<App />);
    const inputEmail = component.getByLabelText('email-input');
    const inputPassword = component.getByLabelText('password-input');
    fireEvent.change(inputEmail, {target: {value: 'adminC@gmail.com'}})
    fireEvent.change(inputPassword, {target: {value: '123456789'}})
    const buttonLogin = component.getByText('Entrar');
    fireEvent.click(buttonLogin);
    await waitFor(() => {
        expect(<HomeAdmin />).toBeTruthy();
    });
});
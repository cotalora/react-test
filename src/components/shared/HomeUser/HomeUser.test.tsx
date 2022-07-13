import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../../../App';
import HomeUser from './HomeUser';

test('Al presionar el botón entrar, con datos correctos, me tiene que renderizar el componente de home del paciente', async () => {
    const component = render(<App />);
    const inputEmail = component.getByLabelText('email-input');
    const inputPassword = component.getByLabelText('password-input');
    fireEvent.change(inputEmail, {target: {value: 'paciente1C@gmail.com'}})
    fireEvent.change(inputPassword, {target: {value: '123456789'}})
    const buttonLogin = component.getByText('Entrar');
    fireEvent.click(buttonLogin);
    await waitFor(() => {
        expect(<HomeUser />).toBeTruthy();
    });
});
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Login from './Login'
import App from '../../../App';
import Register from '../Register/Register';
import HomeUser from '../HomeUser/HomeUser';
import HomeDoctor from '../HomeDoctor/HomeDoctor';
import HomeAdmin from '../HomeAdmin/HomeAdmin';

test('Al renderizar APP se debe renderizar el componente Login', () => {
    render(<App />);
    expect(<Login />).toBeTruthy();
});

test('Al presionar el botón entrar, sin los datos diligenciados, se debe mostrar el mensajde de error', async () => {
    const component = render(<App />);
    const buttonLogin = component.getByText('Entrar');
    fireEvent.click(buttonLogin);
    await waitFor(() => {
        const msgAlert = screen.getByText(/Debe digitar ambos campos/i);
        const msgAlertX = component.getByText('X');
        expect(msgAlert).toBeInTheDocument();
        fireEvent.click(msgAlertX)    
    })
});

test('Al presionar el botón entrar, con datos erroneos, se debe mostrar el mensajde de error', async () => {
    const component = render(<App />);
    const inputEmail = component.getByLabelText('email-input');
    const inputPassword = component.getByLabelText('password-input');
    fireEvent.change(inputEmail, {target: {value: 'asdasdasdasdasdsadasdasd'}})
    fireEvent.change(inputPassword, {target: {value: '12312312'}})
    const buttonLogin = component.getByText('Entrar');
    fireEvent.click(buttonLogin);
    await waitFor(() => {
        const msgAlert = screen.getByText(/Contraseña o correo incorrectos/i);
        expect(msgAlert).toBeInTheDocument();
    });
});

test('Al presionar el botón registrar, me tiene que renderizar el componente de registro', async () => {
    const component = render(<App />);
    const buttonSignUp = component.getByText('Registrarse');
    fireEvent.click(buttonSignUp);
    await waitFor(() => {
        expect(<Register />).toBeTruthy();
    });
});

test('Al presionar el botón registrar, me tiene que renderizar el componente de registro', async () => {
    const component = render(<App />);
    const buttonBack = component.getByText('Atrás');
    fireEvent.click(buttonBack);
    await waitFor(() => {
        expect(<Login />).toBeTruthy();
    });
});
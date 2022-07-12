import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Login from '../Login/Login'
import App from '../../../App';
import Register from '../Register/Register';
import Home from '../Home/Home';

test('Al presionar el botón registrar, me tiene que renderizar el componente de registro', async () => {
    const component = render(<App />);
    const buttonSignUp = component.getByText('Registrarse');
    fireEvent.click(buttonSignUp);
    await waitFor(() => {
        expect(<Register />).toBeTruthy();
    });
});

test('Al crear un usuario me tiene que mostrar error', async () => {
    const component = render(<App />);
    const inputFirtsName = component.getByTestId('firts-name-input');
    const inputFirtsLastName = component.getByTestId('firts-lastname-input');
    const inputDocumentNumber = component.getByTestId('document-number-input');
    const inputEmail = component.getByTestId('email-input');
    const inputPassword = component.getByTestId('password-input');
    const inputPasswordConfirm = component.getByTestId('password-confirmation-input');
    fireEvent.change(inputFirtsName, {target: {value: 'Doctor'}});
    fireEvent.change(inputFirtsLastName, {target: {value: 'Doctor'}});
    fireEvent.change(inputDocumentNumber, {target: {value: '987654321'}});
    fireEvent.change(inputEmail, {target: {value: 'paciente1C@gmail.com'}});
    fireEvent.change(inputPassword, {target: {value: '123456789'}});
    fireEvent.change(inputPasswordConfirm, {target: {value: '123456789'}});
    const buttonSignUpP = component.getByText('Registrar');
    fireEvent.click(buttonSignUpP);
    await waitFor(() => {
        const msgAlert = screen.getByText(/Error al crear el usuario/i);
        expect(msgAlert).toBeInTheDocument();
    });
});

test('Al crear un usuario, con contraseña diferente me tiene que mostrar error', async () => {
    const component = render(<App />);
    const inputFirtsName = component.getByTestId('firts-name-input');
    const inputFirtsLastName = component.getByTestId('firts-lastname-input');
    const inputDocumentNumber = component.getByTestId('document-number-input');
    const inputEmail = component.getByTestId('email-input');
    const inputPassword = component.getByTestId('password-input');
    const inputPasswordConfirm = component.getByTestId('password-confirmation-input');
    fireEvent.change(inputFirtsName, {target: {value: 'Doctor'}});
    fireEvent.change(inputFirtsLastName, {target: {value: 'Doctor'}});
    fireEvent.change(inputDocumentNumber, {target: {value: '987654321'}});
    fireEvent.change(inputEmail, {target: {value: 'paciente1C@gmail.com'}});
    fireEvent.change(inputPassword, {target: {value: '123456799'}});
    fireEvent.change(inputPasswordConfirm, {target: {value: '123456789'}});
    const buttonSignUpP = component.getByText('Registrar');
    fireEvent.click(buttonSignUpP);
    await waitFor(() => {
        const msgAlert = screen.getByText(/Contraseñas deben ser diferentes/i);
        expect(msgAlert).toBeInTheDocument();
    });
});
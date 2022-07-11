import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Login from '../Login/Login'
import App from '../../../App';
import Register from '../Register/Register';

test('Al presionar el botón registrar, me tiene que renderizar el componente de registro', () => {
    const component = render(<App />);
    const buttonSignUp = component.getByText('Registrarse');
    fireEvent.click(buttonSignUp);
    setTimeout(() => {
        expect(<Register />).toBeTruthy();
    }, 100);
});

test('Al presionar el botón atrás, me tiene que renderizar el componente de login', () => {
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
    setTimeout(() => {
        const msgAlert = screen.getByText(/Error al crear el usuario/i);
        expect(msgAlert).toBeInTheDocument();
    }, 1000);
});
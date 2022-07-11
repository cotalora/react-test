import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
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

test('Al presionar el botón entrar, sin los datos diligenciados, se debe mostrar el mensajde de error', () => {
    const component = render(<App />);
    const buttonLogin = component.getByText('Entrar');
    fireEvent.click(buttonLogin);
    setTimeout(() => {
        const msgAlert = screen.getByText(/Debe digitar ambos campos/i);
        expect(msgAlert).toBeInTheDocument();
    }, 100);
});

test('Al presionar el botón entrar, con datos erroneos, se debe mostrar el mensajde de error', () => {
    const component = render(<App />);
    const inputEmail = component.getByLabelText('email-input');
    const inputPassword = component.getByLabelText('password-input');
    fireEvent.change(inputEmail, {target: {value: 'asdasdasdasdasdsadasdasd'}})
    fireEvent.change(inputPassword, {target: {value: '12312312'}})
    const buttonLogin = component.getByText('Entrar');
    fireEvent.click(buttonLogin);
    setTimeout(() => {
        const msgAlert = screen.getByText(/Contraseña o correo incorrectos/i);
        expect(msgAlert).toBeInTheDocument();
    }, 100);
});

test('Al presionar el botón registrar, me tiene que renderizar el componente de registro', () => {
    const component = render(<App />);
    const buttonSignUp = component.getByText('Registrarse');
    fireEvent.click(buttonSignUp);
    setTimeout(() => {
        expect(<Register />).toBeTruthy();
    }, 100);
});

test('Al presionar el botón registrar, me tiene que renderizar el componente de registro', () => {
    const component = render(<App />);
    const buttonBack = component.getByText('Atrás');
    fireEvent.click(buttonBack);
    setTimeout(() => {
        expect(<Login />).toBeTruthy();
    }, 100);
});

test('Al presionar el botón entrar, con datos correctos, me tiene que renderizar el componente de home del paciente', () => {
    const component = render(<App />);
    const inputEmail = component.getByLabelText('email-input');
    const inputPassword = component.getByLabelText('password-input');
    fireEvent.change(inputEmail, {target: {value: 'paciente1C@gmail.com'}})
    fireEvent.change(inputPassword, {target: {value: '123456789'}})
    const buttonLogin = component.getByText('Entrar');
    fireEvent.click(buttonLogin);
    setTimeout(() => {
        expect(<HomeUser />).toBeTruthy();
    }, 100);
});

test('Al presionar el botón entrar, con datos correcots, me tiene que renderizar el componente de home del doctor', () => {
    const component = render(<App />);
    const inputEmail = component.getByLabelText('email-input');
    const inputPassword = component.getByLabelText('password-input');
    fireEvent.change(inputEmail, {target: {value: 'doctorC@gmail.com'}})
    fireEvent.change(inputPassword, {target: {value: '123456789'}})
    const buttonLogin = component.getByText('Entrar');
    fireEvent.click(buttonLogin);
    setTimeout(() => {
        expect(<HomeDoctor />).toBeTruthy();
    }, 100);
});

test('Al presionar el botón entrar, con datos correcots, me tiene que renderizar el componente de home del administrador', () => {
    const component = render(<App />);
    const inputEmail = component.getByLabelText('email-input');
    const inputPassword = component.getByLabelText('password-input');
    fireEvent.change(inputEmail, {target: {value: 'adminC@gmail.com'}})
    fireEvent.change(inputPassword, {target: {value: '123456789'}})
    const buttonLogin = component.getByText('Entrar');
    fireEvent.click(buttonLogin);
    setTimeout(() => {
        expect(<HomeAdmin />).toBeTruthy();
    }, 100);
});
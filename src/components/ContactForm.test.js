import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App.js';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<App/>);
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);
    const contactHeader = screen.queryByText('Contact Form');
    expect(contactHeader).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
  render(<ContactForm/>);
  const firstNameInput = screen.getByLabelText('First Name*');
  userEvent.type(firstNameInput, 'JAB2');
  const error =  await screen.findAllByTestId('error');
  expect(error).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
  render (<ContactForm/>);

  const submit = screen.getByText('Submit');
  userEvent.click(submit);
  const threeErrors = await screen.queryAllByTestId('error');
  expect(threeErrors).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
  render(<ContactForm/>);
  const fName = screen.getByLabelText('First Name*');
  const lName = screen.getByLabelText('Last Name*');
  const submit = screen.getByText('Submit');
  userEvent.type(fName, 'Jayson');
  userEvent.type(lName, 'Byrd');
  userEvent.click(submit);
  const errors = await screen.queryAllByTestId('error');
  expect(errors).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);
  const email = screen.getByLabelText(/email/i);
  userEvent.type(email, 'fjgjgmv');
  const error = await screen.findByText(/email must be a valid email address/i);
  expect(error).toBeInTheDocument();
});
test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm/>);
  const submit = screen.getByRole('button');
  const fName = screen.queryByText('First Name*');
  const email = screen.getByLabelText(/email/i);
  userEvent.type(fName, 'Jayson')
  userEvent.type(email, 'jayson@jaysonbyrd.tech');
  userEvent.click(submit);
  const error = await screen.queryAllByTestId('error');

  expect(error).toHaveLength(1);
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
  render(<ContactForm/>);
  const email = screen.findByPlaceholderText('bluebill1049@hotmail.com');
  const fName = screen.queryByText('First Name*');
  const lName = screen.queryByText('Last Name*');
  const submit = screen.getByRole('button');
  userEvent.type(email, 'jayson@jaysonbyrd.tech');
  userEvent.type(fName, 'Jayson');
  userEvent.type(lName, 'Byrd II');
  userEvent.click(submit);
  expect(fName).toBeInTheDocument();
  expect(lName).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
});

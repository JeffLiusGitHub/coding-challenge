import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from '../../App';
import store from '../../store/index';
import userEvent from '@testing-library/user-event';

describe('test the apptoolbar without login', () => {
  test('should render appToolbar text on the page', () => {
    const history = createBrowserHistory();
    render(
      <BrowserRouter history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
    const appToolbarText = screen.getByText(
      /Intelligence Bank Coding Exercise/i
    );
    expect(appToolbarText).toBeInTheDocument();
  });

  test('should render appToolbar login button', () => {
    const history = createBrowserHistory();
    render(
      <BrowserRouter history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  test('should render appToolbar logo', () => {
    const history = createBrowserHistory();
    history.push('/login');
    render(
      <BrowserRouter history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
    const buttonElement = screen.getByRole('img');
    expect(buttonElement).toBeInTheDocument();
  });
});

describe('test render login page', () => {
  test('should render login button when login', () => {
    const history = createBrowserHistory();
    history.push('/login');
    render(
      <BrowserRouter history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
    const buttonElement = screen.getByRole('button', { name: 'Login' });
    expect(buttonElement).toBeInTheDocument();
  });

  test('should render reset button when login', () => {
    const history = createBrowserHistory();
    history.push('/login');
    render(
      <BrowserRouter history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
    const buttonElement = screen.getByRole('button', { name: 'Reset' });
    expect(buttonElement).toBeInTheDocument();
  });

  test('should render username textarea when login', () => {
    const history = createBrowserHistory();
    history.push('/login');
    render(
      <BrowserRouter history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
    const inputElement = screen.getByRole('textbox', { name: 'username' });
    expect(inputElement).toBeInTheDocument();
  });

  test('should render password textarea when login', () => {
    const history = createBrowserHistory();
    history.push('/login');
    render(
      <BrowserRouter history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
    const inputElement = screen.getByTestId('password');
    expect(inputElement).toBeInTheDocument();
  });

  test('should render please log in below when login', () => {
    const history = createBrowserHistory();
    history.push('/login');
    render(
      <BrowserRouter history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
    const displayText = screen.getByText(/Please log in below/i);
    expect(displayText).toBeInTheDocument();
  });
});

describe('test when user enter input', () => {
  test('should display error message when user enter empty input', () => {
    const history = createBrowserHistory();
    history.push('/login');
    render(
      <BrowserRouter history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
    const buttonElement = screen.getByRole('button', { name: 'Login' });
    userEvent.click(buttonElement);
    const displayuserInvalidText = screen.getByText(
      /username cannot be empty/i
    );
    const displayPasswordInvalidText = screen.getByText(
      /password cannot be empty/i
    );
    expect(displayuserInvalidText).toBeInTheDocument();
    expect(displayPasswordInvalidText).toBeInTheDocument();
  });

  test('should display error snackbar when user enter wrong input', async () => {
    window.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValueOnce({ username: '' }),
    });
    const history = createBrowserHistory();
    history.push('/login');
    render(
      <BrowserRouter history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
    const userInputElement = screen.getByRole('textbox', { name: 'username' });
    const passwordInputElement = screen
      .getByTestId('password')
      .getElementsByTagName('input')[0];
    const buttonElement = screen.getByRole('button', { name: 'Login' });
    fireEvent.change(userInputElement, { target: { value: 'abc' } });
    fireEvent.change(passwordInputElement, { target: { value: '123' } });
    userEvent.click(buttonElement);
    const errorMessageElement = await screen.findByText(/Error!/i);
    expect(errorMessageElement).toBeInTheDocument();
  });

  test('should redirect to welcome page and display success in snackbar when user enter correct input', async () => {
    window.alert = jest.fn();
    const mockJson = jest.fn();
    window.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: mockJson,
    });
    mockJson.mockResolvedValueOnce({
      username: 'testuser',
      fullname: 'Test User',
    });
    const history = createBrowserHistory();
    history.push('/login');
    render(
      <BrowserRouter history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
    const userInputElement = await screen.findByRole('textbox', {
      name: 'username',
    });
    const passwordInputElement = screen
      .getByTestId('password')
      .getElementsByTagName('input')[0];
    const buttonElement = screen.getByRole('button', { name: 'Login' });
    fireEvent.change(userInputElement, { target: { value: 'testuser' } });
    fireEvent.change(passwordInputElement, { target: { value: 'password' } });
    userEvent.click(buttonElement);
    const successMessageElement = await screen.findByText(/Success!/i);
    const welcomeUserElement = await screen.findByText(/welcome testuser!/i);
    expect(successMessageElement).toBeInTheDocument();
    expect(welcomeUserElement).toBeInTheDocument();
  });
});

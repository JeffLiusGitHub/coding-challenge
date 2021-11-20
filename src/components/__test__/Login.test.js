import { render, screen, fireEvent } from '@testing-library/react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Login from '../../containers/Login';
import App from '../../App';
import store from '../../store/index';
import { useNavigate } from 'react-router-dom';
import { Index } from '../../index';
import { Route, Routes, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('test the apptoolbar without login', () => {

    test('render appToolbar text', () => {
    const history = createMemoryHistory();
    history.push('/login');
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

  test('render appToolbar button', () => {
    
    render(
      <BrowserRouter history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
    const buttonElement = screen.getByRole(('button'));
 
    expect(buttonElement).toBeInTheDocument();
  });

  test('render appToolbar logo', () => {
    
    render(
      <BrowserRouter history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
    const buttonElement = screen.getByRole(('img'));
 
    expect(buttonElement).toBeInTheDocument();
  });

});

describe('test render login page',()=>{

    test('render login button', () => {
    
        render(
          <BrowserRouter history={history}>
            <Provider store={store}>
              <Login />
            </Provider>
          </BrowserRouter>
        );
        const buttonElement = screen.getByRole(('button'),{name:'Login'});
     
        expect(buttonElement).toBeInTheDocument();
      });
    
      test('render reset button', () => {
    
        render(
          <BrowserRouter history={history}>
            <Provider store={store}>
              <Login />
            </Provider>
          </BrowserRouter>
        );
        const buttonElement = screen.getByRole(('button'),{name:'Reset'});
     
        expect(buttonElement).toBeInTheDocument();
      });

      test('render username textarea', () => {
    
        render(
          <BrowserRouter history={history}>
            <Provider store={store}>
              <Login />
            </Provider>
          </BrowserRouter>
        );
        const inputElement = screen.getByRole(('textbox'),{name:'username'});
     
        expect(inputElement).toBeInTheDocument();
      });

      test('render password textarea', () => {
    
        render(
          <BrowserRouter history={history}>
            <Provider store={store}>
              <Login />
            </Provider>
          </BrowserRouter>
        );
        const inputElement = screen.getByRole(('textbox'),{name:'password'});
     
        expect(inputElement).toBeInTheDocument();
      });

      test('render please log in below', () => {
    
        render(
          <BrowserRouter history={history}>
            <Provider store={store}>
              <Login />
            </Provider>
          </BrowserRouter>
        );
        const displayText = screen.getByText(/Please log in below/i);
        expect(displayText).toBeInTheDocument();
      });
});

describe('test when user enter input',()=>{

    test('test when user enter empty input', () => {
    
        render(
          <BrowserRouter history={history}>
            <Provider store={store}>
              <Login />
            </Provider>
          </BrowserRouter>
        );

        const buttonElement = screen.getByRole(('button'),{name:'Login'});
        userEvent.click(buttonElement)

        const displayuserInvalidText = screen.getByText(/username cannot be empty/i);
        const displayPasswordInvalidText = screen.getByText(/password cannot be empty/i);
        expect(displayuserInvalidText).toBeInTheDocument();
        expect(displayPasswordInvalidText).toBeInTheDocument();
      });

      test('test when user enter wrong input', async() => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
        json:async()=> {Resopnse:{ok:false}}
    })
        render(
          <BrowserRouter history={history}>
            <Provider store={store}>
              <Login />
            </Provider>
          </BrowserRouter>
        );
        const userInputElement = screen.getByRole(('textbox'),{name:'username'});
       
        // const passwordInputElement = screen.getByTestId('password');
        const buttonElement = screen.getByRole(('button'),{name:'Login'});
        fireEvent.change(userInputElement,{target:{value:'abc'}})
        // fireEvent.change(passwordInputElement,{target:{value:'123'}})
        userEvent.click(buttonElement)

        const errorMessageElement = await screen.findByText(/Error!/i);
       
        expect(errorMessageElement).toBeInTheDocument();
      
      });


      test('test when user enter right input', async() => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json:async()=> {Resopnse:{ok:true}}
        })
            render(
              <BrowserRouter history={history}>
                <Provider store={store}>
                  <Login />
                </Provider>
              </BrowserRouter>
            );
            const userInputElement = screen.getByRole(('textbox'),{name:'username'});
           
            // const passwordInputElement = screen.getByTestId('password');
            const buttonElement = screen.getByRole(('button'),{name:'Login'});
            fireEvent.change(userInputElement,{target:{value:'testuser'}})
            // fireEvent.change(passwordInputElement,{target:{value:'123'}})
            //cannot let test to find the password
            userEvent.click(buttonElement)
    //redirect to "/"
            const successMessageElement = await screen.findByText(/Success!/i);
            const welcomeUserElement = await screen.findByText(/welcome testuser!!/i);
            expect(successMessageElement).toBeInTheDocument();
            expect(welcomeUserElement).toBeInTheDocument();
          });
})

//test redux










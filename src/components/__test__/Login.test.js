import {render,screen} from '@testing-library/react';
import Login from '../../containers/Login';
import App from '../../App';
import index from '../../index'
test('render please log in below',()=>{
    render(<App/>);
    const linkElement = screen.getByText(/Please log in below/i);
    expect(linkElement).toBeInTheDocument();
})

test('button has correct color',()=>{
    render(<App/>);

    screen.getByRole('button',{name:'LOGIN'});

    expect(colorButton).toHaveStyle({backgroundColor: "#1976d2"})
})
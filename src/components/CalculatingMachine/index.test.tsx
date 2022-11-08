import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import CalculatingMachine from './index';

afterEach(cleanup);

describe("CalculatingMachine", () => {

    test('test plus', () => {
        render(<CalculatingMachine />);
        const numberSeven = screen.getByTestId('seven');
        const numberThree = screen.getByTestId('three');
        const plus = screen.getByTestId('plus');
        const dot = screen.getByTestId('plus');
        const qeual = screen.getByTestId('equal');
        fireEvent.click(numberSeven);
        fireEvent.click(dot);
        fireEvent.click(numberSeven);
        fireEvent.click(plus);
        fireEvent.click(numberThree);
        fireEvent.click(qeual);
        expect(screen.getByText('10.7')).toBeInTheDocument();
    });


}); 
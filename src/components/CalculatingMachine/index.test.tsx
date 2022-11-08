import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import CalculatingMachine from './index';

afterEach(cleanup);

describe("CalculatingMachine", () => {

    test('test plus', () => {
        render(<CalculatingMachine />);
        const numberSeven = screen.getByTestId('seven');
        const numberFive = screen.getByTestId('five');
        const numberThree = screen.getByTestId('three');
        const plus = screen.getByTestId('plus');
        const dot = screen.getByTestId('dot');
        const qeual = screen.getByTestId('equal');
        fireEvent.click(numberSeven);
        fireEvent.click(dot);
        fireEvent.click(numberFive);
        fireEvent.click(plus);
        fireEvent.click(numberThree);
        fireEvent.click(qeual);

        expect(screen.queryByTestId('result')?.textContent).toBe('10.5');
    });

    test('test minus', () => {
        render(<CalculatingMachine />);
        const numberNine = screen.getByTestId('nine');
        const numberTwo = screen.getByTestId('two');
        const numberSix = screen.getByTestId('six');
        const minus = screen.getByTestId('minus');
        const dot = screen.getByTestId('dot');
        const qeual = screen.getByTestId('equal');
        fireEvent.click(numberNine);
        fireEvent.click(numberTwo);
        fireEvent.click(dot);
        fireEvent.click(numberTwo);
        fireEvent.click(minus);
        fireEvent.click(numberTwo);
        fireEvent.click(dot);
        fireEvent.click(numberSix);
        fireEvent.click(qeual);

        expect(screen.queryByTestId('result')?.textContent).toBe('89.6');
    });

    test('test devide', () => {
        render(<CalculatingMachine />);
        const numberOne = screen.getByTestId('one');
        const numberFive = screen.getByTestId('five');
        const numberZero = screen.getByTestId('zero');
        const divide = screen.getByTestId('divide');
        const dot = screen.getByTestId('dot');
        const qeual = screen.getByTestId('equal');
        fireEvent.click(numberOne);
        fireEvent.click(numberZero);
        fireEvent.click(numberFive);
        fireEvent.click(dot);
        fireEvent.click(numberFive);
        fireEvent.click(divide);
        fireEvent.click(numberFive);
        fireEvent.click(qeual);

        expect(screen.queryByTestId('result')?.textContent).toBe('21.1');
    });

    test('test multiply', () => {
        render(<CalculatingMachine />);
        const numberThree = screen.getByTestId('three');
        const numberOne= screen.getByTestId('one');
        const numberSeven = screen.getByTestId('seven');
        const numberFour = screen.getByTestId('four');
        const numberNine = screen.getByTestId('nine');
        const multiply = screen.getByTestId('multiply');
        const dot = screen.getByTestId('dot');
        const qeual = screen.getByTestId('equal');
        fireEvent.click(numberOne);
        fireEvent.click(numberFour);
        fireEvent.click(dot);
        fireEvent.click(numberSeven);
        fireEvent.click(numberFour);
        fireEvent.click(multiply);
        fireEvent.click(numberThree);
        fireEvent.click(numberNine);
        fireEvent.click(qeual);

        expect(screen.queryByTestId('result')?.textContent).toBe('574.86');
    });

    test('test clear', () => {
        render(<CalculatingMachine />);
        const numberThree = screen.getByTestId('three');
        const numberOne= screen.getByTestId('one');
        const numberSeven = screen.getByTestId('seven');
        const numberFour = screen.getByTestId('four');
        const numberNine = screen.getByTestId('nine');
        const multiply = screen.getByTestId('multiply');
        const clear = screen.getByTestId('clear');
        const dot = screen.getByTestId('dot');
        const qeual = screen.getByTestId('equal');
        fireEvent.click(numberOne);
        fireEvent.click(numberFour);
        fireEvent.click(dot);
        fireEvent.click(numberSeven);
        fireEvent.click(numberFour);
        fireEvent.click(multiply);
        fireEvent.click(numberThree);
        fireEvent.click(numberNine);
        fireEvent.click(qeual);
        fireEvent.click(clear);
        expect(screen.queryByTestId('result')?.textContent).toBe('0');
    });

}); 
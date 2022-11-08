import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import './index.css';

enum BUTTON_TYPE {
    number = 'number',
    action = 'action',
    operator = 'operator',
}

interface RESULT {
    resultVal: string;
}

interface BUTTON {
    title: string;
    type: BUTTON_TYPE;
    testId?: string;
}

interface KEYBOARD {
    buttonList: BUTTON[];
    onBtnClick?: Function;
}

const MemoResult = React.memo(function Result(props: RESULT) {
    const { resultVal } = props;
    return (<div className='result-container'>
        <p data-testid="result" className='result'>{resultVal}</p></div>);
})

function KeyBoard(props: KEYBOARD) {
    const arr: Array<HTMLDivElement> = [];
    const { onBtnClick, buttonList } = props;
    // const keyboardRef = useRef(arr);
    useEffect(() => {
        // if (keyboardRef && keyboardRef.current) {
        //     keyboardRef.current[0].addEventListener('click', () => {
        //         console.log('click');
        //     })
        // }
    }, []);

    const memoKeyoards = useMemo(() => { return buttonList }, [buttonList]);
    const generateButtons = (arr: Array<BUTTON>) => {
        return <React.Fragment>
            {arr.map((item: BUTTON, index) => (<div style={{ width: item.title === '0' || item.title === '=' ? '49%' : '' }}
                className={classNames({ 'equal-item': item.title === '=' }, { 'other-item': item.title !== '=' }, 'calculating-item')} data-testid={item.testId} key={index} onClick={(e) => onBtnClick ? onBtnClick(item) : null}>
                <p>{item.title}</p>
            </div>))
            }
        </React.Fragment >
    }

    return (<div className='button-container'>
        {generateButtons(memoKeyoards)}
    </div>)
}

function CalculatingMachine() {

    const arrKeyboard: BUTTON[] = [{ title: 'C', type: BUTTON_TYPE.action, testId: "clear" }, { title: 'DEL', type: BUTTON_TYPE.action, testId: "del" }, { title: '÷', type: BUTTON_TYPE.operator, testId: "divide" }, { title: 'x', type: BUTTON_TYPE.operator, testId: "multiply" },
    { title: '7', type: BUTTON_TYPE.number, testId: "seven" }, { title: '8', type: BUTTON_TYPE.number, testId: "eight" }, { title: '9', type: BUTTON_TYPE.number, testId: "nine" }, { title: '-', type: BUTTON_TYPE.operator, testId: "minus" },
    { title: '4', type: BUTTON_TYPE.number, testId: "four" }, { title: '5', type: BUTTON_TYPE.number, testId: "five" }, { title: '6', type: BUTTON_TYPE.number, testId: "six" }, { title: '+', type: BUTTON_TYPE.operator, testId: "plus" },
    { title: '1', type: BUTTON_TYPE.number, testId: "one" }, { title: '2', type: BUTTON_TYPE.number, testId: "two" }, { title: '3', type: BUTTON_TYPE.number, testId: "three" }, { title: '.', type: BUTTON_TYPE.number, testId: "dot" },
    { title: '0', type: BUTTON_TYPE.number, testId: "zero" }, { title: '=', type: BUTTON_TYPE.operator, testId: "equal" }];

    const callStack: string[] = ['0'];
    const callStackRef = useRef(callStack);
    const [result, setResult] = useState<string>('0');

    const clearAll = () => {
        setResult('0');
        while (callStackRef.current.length) {
            callStackRef.current.pop();
        }
        callStackRef.current.push('0');
    }

    const deleteInput = () => {
        if (result === '0') {
            return;
        }
        let updatedInput = '0';
        if (result.length > 1) {
            updatedInput = result.substring(0, result.length - 1);
        }
        setResult(updatedInput);
        const index = callStackRef.current.length - 1;
        callStackRef.current[index] = updatedInput;
    }

    const accSub = (num1: number, num2: number, operator: string) => {
        let r1, r2, m, n;
        if (num1.toString().includes('.')) {
            r1 = num1.toString().split('.')[1].length;
        } else {
            r1 = 0;
        }
        if (num2.toString().includes('.')) {
            r2 = num2.toString().split('.')[1].length;
        } else {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        n = r1 > r2 ? r1 : r2;
        if (operator === '+') {
            return ((num1 * m + num2 * m) / m).toFixed(n);
        } else if (operator === '-') {
            return ((num1 * m - num2 * m) / m).toFixed(n);
        }
    }

    const executeAction = (action: string) => {
        switch (action) {
            case 'C':
                clearAll();
                break;
            case 'DEL':
                deleteInput();
                break;
            default:
                break;
        }
    }

    const caculateValue = (num1: string, num2: string, operator: string): string => {
        const transNum1 = parseFloat(num1);
        const transNum2 = parseFloat(num2);
        let value: string = '';
        switch (operator) {
            case '+':
                value = accSub(transNum1, transNum2, '+') as string;
                break;
            case '-':
                value = accSub(transNum1, transNum2, '-') as string;
                break;
            case 'x':
                value = (transNum1 * transNum2).toString();
                break;
            case '÷':
                value = (transNum1 / transNum2).toString();
                break;
            default:
                break;
        }
        return value;
    }

    const memoCallback = useCallback((btn: BUTTON) => {
        const len = callStackRef.current.length;
        const lastCharacter = callStackRef.current[len - 1];
        switch (btn.type) {
            case BUTTON_TYPE.number:
                if (result.includes('.') && btn.title === '.') {
                    return;
                }
                let latestRes = result === '0' && btn.title !== '.' ? btn.title : result.concat(btn.title);
                if (lastCharacter === '+' || lastCharacter === '-' || lastCharacter === 'x' || lastCharacter === '÷') {
                    latestRes = btn.title === '.' ? '0.' : btn.title;
                }
                if (lastCharacter !== '+' && lastCharacter !== '-' && lastCharacter !== 'x' && lastCharacter !== '÷') {
                    callStackRef.current[len - 1] = latestRes;
                } else {
                    callStackRef.current.push(latestRes);
                }
                setResult(latestRes);
                break;
            case BUTTON_TYPE.operator:
                if (btn.title === '=') {
                    if (callStackRef.current.length >= 3) {
                        const num2: string = callStackRef.current.pop() as string;
                        const operator: string = callStackRef.current.pop() as string;
                        const num1: string = callStackRef.current.pop() as string;
                        const res = caculateValue(num1, num2, operator);
                        callStackRef.current.push(res);
                        btn.title !== '=' && callStackRef.current.push(btn.title);
                        setResult(res);
                        break;
                    }
                    break;
                } else if (lastCharacter === '+' || lastCharacter === '-' || lastCharacter === 'x' || lastCharacter === '÷') {
                    callStackRef.current[len - 1] = btn.title;
                } else {
                    callStackRef.current.push(btn.title);
                }
                break;
            case BUTTON_TYPE.action:
                executeAction(btn.title)
                break;
        }
    }, [result]);


    return (<div className='calculating-machine'>
        <MemoResult resultVal={result} />
        <KeyBoard onBtnClick={memoCallback} buttonList={arrKeyboard} />
    </div>);


}
export default CalculatingMachine;
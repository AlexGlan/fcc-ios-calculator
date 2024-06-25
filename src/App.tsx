import { useState } from 'react';
import Button from './components/Button';
import Display from './components/Display';
import './styles/App.scss';

const ADD_SYMBOL: string = '+';
const SUBTRACT_SYMBOL: string = '−';
const MULTIPLY_SYMBOL: string = '×';
const DIVIDE_SYMBOL: string = '÷';
const OPERATORS: string[] = [ADD_SYMBOL, SUBTRACT_SYMBOL, MULTIPLY_SYMBOL, DIVIDE_SYMBOL];

const App = () => {
    const [result, setResult] = useState('0');
    const [formula, setFormula] = useState('');
    const [lastOperation, setLastOperation] = useState('');
    const [isValueNegated, negateValue] = useState(false);

    const calculateResult = (): void => {
        const formulaArr: string[] = formula.split(' ');      
                
        // Format Subtraction and Addition symbols
        for (let i = 0; i < formulaArr.length; i++) {            
            const currentValue: string = formulaArr[i].replace(SUBTRACT_SYMBOL, '-');            
            const nextValue: string = i !== formulaArr.length - 1
                ? formulaArr[i + 1].replace(SUBTRACT_SYMBOL, '-')
                : ''

            if (currentValue === '-') {                
                formulaArr.splice(i, 2, currentValue + nextValue);
            } else if (currentValue === '' || currentValue === ADD_SYMBOL) {
                formulaArr.splice(i, 1);
                i--;
            } else {
                formulaArr[i] = currentValue;
            }
        }
        
        // Check if last entry was an operator and remove it
        if (
            OPERATORS.includes(formulaArr[formulaArr.length - 1]) ||
            formulaArr[formulaArr.length - 1] === '-'        
        ) {
            formulaArr.pop();
            // Input allows up to 2 operator entries at once, so check one more time:
            if (OPERATORS.includes(formulaArr[formulaArr.length - 1])) {
                formulaArr.pop();
            }
        }

        // Handle order of operations
        for (let i = 0; i < formulaArr.length; i++) {                
            if (
                formulaArr[i] === MULTIPLY_SYMBOL ||
                formulaArr[i] === DIVIDE_SYMBOL
            ) { 
                const a: number = parseFloat(formulaArr[i - 1]);
                const b: number = parseFloat(formulaArr[i + 1]);
         
                const res: number = formulaArr[i] === MULTIPLY_SYMBOL
                    ? a * b
                    : a / b
                formulaArr.splice(i - 1, 3, res.toString());
                i--;
            }           
        }
    
        // Calculate the end result
        const res: string = formulaArr
            .map(Number)
            .reduce((acc, curr) => acc + curr, 0)
            .toString();
            
        setResult(res);
        setLastOperation('=');
    }

    const handleOperator = (textContent: string): void => {
        if (lastOperation === textContent) {
            return;
        }
        
        if (lastOperation === '=') {
            setFormula(`${result} ${textContent} `);
            setResult(textContent);            
            setLastOperation(textContent);
            return;
        }

        if (!/[0-9]/.test(lastOperation)) {            
            const formulaElems: string[] = formula.split(' ');
            
            if (textContent !== SUBTRACT_SYMBOL) {
                for (let i = formulaElems.length - 1; i >= 0; i--) {
                    if (/[0-9]/.test(formulaElems[i])) {
                        formulaElems.splice(i + 1);
                        break;
                    }
                }
            }

            setFormula(prevValue => {
                return prevValue.length === 0
                    ? `${result} ${textContent} `
                    : formulaElems.join(' ') + ` ${textContent} `
            });            
           
        } else {
            setFormula(prevValue => {
                return prevValue.length === 0
                    ? `${result} ${textContent} ` 
                    : prevValue += ` ${textContent} `
            });
        }

        setResult(textContent);
        setLastOperation(textContent);
    }

    const handleNumber = (textContent: string): void => {        
        if (result === '0') {
            setResult(textContent);
        } else {
            const operators: RegExp = isValueNegated
                ? new RegExp(`[${ADD_SYMBOL}${MULTIPLY_SYMBOL}${DIVIDE_SYMBOL}]`)
                : new RegExp(`[${OPERATORS.join('')}]`)
            setResult(prevResult => (prevResult += textContent).replace(operators, ''));
        }

        if (lastOperation === '=') {
            setResult(textContent);
            setFormula(textContent);
            setLastOperation(textContent);
            return;
        }

        setFormula(prevValue => prevValue += textContent);
        setLastOperation(textContent);
    }

    const handleNegate = (): void => {
        if (
            result === '0' || (/[^0-9]/.test(result) &&
            result.length === 1)
        ) {
            return;
        }

        negateValue(prevValue => !prevValue);
        setResult(prevResult => 
            prevResult.includes(SUBTRACT_SYMBOL) || prevResult.includes('-')
                ? prevResult.slice(1)
                : SUBTRACT_SYMBOL + prevResult
        );

        if (lastOperation === '=') {
            setFormula('');
            return;
        }

        setFormula(prevFormula => {
            const formulaValues: string[] = prevFormula.split(' ');            
            const lastValue: string | undefined = formulaValues.pop();
            
            if (lastValue !== undefined) {
                const negatedVal: string = lastValue.includes(SUBTRACT_SYMBOL)
                    ? lastValue.slice(1)
                    : SUBTRACT_SYMBOL + lastValue
                
                if (formulaValues[formulaValues.length - 1] === SUBTRACT_SYMBOL) {
                    formulaValues.pop();
                    negatedVal.slice(1);
                }

                formulaValues.push(negatedVal);
            }     

            return formulaValues.join(' ');
        });
    }

    const handleClick = (id: string, textContent: string): void => {
        switch (id) {
            case 'one':
            case 'two':
            case 'three':
            case 'four':
            case 'five':
            case 'six':
            case 'seven':
            case 'eight':
            case 'nine':
            case 'zero':
                handleNumber(textContent);
                break;
            case 'clear':
                negateValue(prevValue =>  prevValue === true ? false : prevValue);
                setResult('0');
                setFormula('');
                break;
            case 'negate':
                handleNegate();
                break;
            case 'percent':

                break;
            case 'divide':
            case 'multiply':
            case 'subtract':
            case 'add':
                negateValue(prevValue => prevValue === true ? false : prevValue);
                handleOperator(textContent);
                break;            
            case 'decimal':
                if (result.includes('.')) {
                    return;
                } else {
                    setResult(prevResult => prevResult += '.');
                    setFormula(prevValue => prevValue += '.');
                }
                break;            
            case 'equals':
                negateValue(prevValue =>  prevValue === true ? false : prevValue);
                calculateResult();
                break;
        }
    }

    return (
        <main className='calculator'>
            <Display output={result} formula={formula} />
            <div className='calculator__buttons'>
                {/* 1st row */}
                <Button btnText='AC' btnFunction={handleClick} btnId='clear' btnType='actions'/>
                <Button btnText='+/-' btnFunction={handleClick} btnId='negate' btnType='actions'/>
                <Button btnText='%' btnFunction={handleClick} btnId='percent' btnType='actions'/>
                <Button btnText={DIVIDE_SYMBOL} btnFunction={handleClick} btnId='divide' btnType='fun'/>
                {/* 2nd row */}
                <Button btnText='7' btnFunction={handleClick} btnId='seven' />
                <Button btnText='8' btnFunction={handleClick} btnId='eight' />
                <Button btnText='9' btnFunction={handleClick} btnId='nine' />
                <Button btnText={MULTIPLY_SYMBOL} btnFunction={handleClick} btnId='multiply' btnType='fun'/>
                {/* 3rd row */}
                <Button btnText='4' btnFunction={handleClick} btnId='four' />
                <Button btnText='5' btnFunction={handleClick} btnId='five' />
                <Button btnText='6' btnFunction={handleClick} btnId='six' />
                <Button btnText={SUBTRACT_SYMBOL} btnFunction={handleClick} btnId='subtract' btnType='fun'/>
                {/* 4th row */}
                <Button btnText='1' btnFunction={handleClick} btnId='one' />
                <Button btnText='2' btnFunction={handleClick} btnId='two' />
                <Button btnText='3' btnFunction={handleClick} btnId='three' />
                <Button btnText={ADD_SYMBOL} btnFunction={handleClick} btnId='add' btnType='fun'/>
                {/* 5th row */}
                <Button btnText='0' btnFunction={handleClick} btnId='zero' style='pill'/>
                <Button btnText='.' btnFunction={handleClick} btnId='decimal' />
                <Button btnText='=' btnFunction={handleClick} btnId='equals' btnType='fun'/>
            </div>
        </main>
    )
}

export default App
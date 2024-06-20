import { useState } from 'react';
import Button from './components/Button';
import Display from './components/Display';
import './styles/App.scss';

const App = () => {
    const [result, setResult] = useState('0');
    const [formula, setFormula] = useState('');
    const [lastOperation, setLastOperation] = useState('');

    const calculateResult = (): void => { }

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
            
            if (textContent !== '−') {
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
            setResult(prevResult => (prevResult += textContent).replace(/[+−×÷]/, ''));
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
                setResult('0');
                setFormula('');
                break;
            case 'negate':

                break;
            case 'percent':

                break;
            case 'divide':
            case 'multiply':
            case 'subtract':
            case 'add':
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
                <Button btnText='÷' btnFunction={handleClick} btnId='divide' btnType='fun'/>
                {/* 2nd row */}
                <Button btnText='7' btnFunction={handleClick} btnId='seven' />
                <Button btnText='8' btnFunction={handleClick} btnId='eight' />
                <Button btnText='9' btnFunction={handleClick} btnId='nine' />
                <Button btnText='×' btnFunction={handleClick} btnId='multiply' btnType='fun'/>
                {/* 3rd row */}
                <Button btnText='4' btnFunction={handleClick} btnId='four' />
                <Button btnText='5' btnFunction={handleClick} btnId='five' />
                <Button btnText='6' btnFunction={handleClick} btnId='six' />
                <Button btnText='−' btnFunction={handleClick} btnId='subtract' btnType='fun'/>
                {/* 4th row */}
                <Button btnText='1' btnFunction={handleClick} btnId='one' />
                <Button btnText='2' btnFunction={handleClick} btnId='two' />
                <Button btnText='3' btnFunction={handleClick} btnId='three' />
                <Button btnText='+' btnFunction={handleClick} btnId='add' btnType='fun'/>
                {/* 5th row */}
                <Button btnText='0' btnFunction={handleClick} btnId='zero' style='pill'/>
                <Button btnText='.' btnFunction={handleClick} btnId='decimal' />
                <Button btnText='=' btnFunction={handleClick} btnId='equals' btnType='fun'/>
            </div>
        </main>
    )
}

export default App
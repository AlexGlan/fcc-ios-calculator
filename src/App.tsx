import './styles/App.scss';
import Button from './components/Button';

const App = () => {
    return (
        <main className='calculator'>
            <div className='calculator__buttons'>
                {/* 1st row */}
                <Button btnText='AC' btnFunction={() => {}} btnId='clear' btnType='actions'/>
                <Button btnText='+/-' btnFunction={() => {}} btnId='negate' btnType='actions'/>
                <Button btnText='%' btnFunction={() => {}} btnId='percent' btnType='actions'/>
                <Button btnText='÷' btnFunction={() => {}} btnId='divide' btnType='fun'/>
                {/* 2nd row */}
                <Button btnText='7' btnFunction={() => {}} btnId='seven' />
                <Button btnText='8' btnFunction={() => {}} btnId='eight' />
                <Button btnText='9' btnFunction={() => {}} btnId='nine' />
                <Button btnText='×' btnFunction={() => {}} btnId='multiply' btnType='fun'/>
                {/* 3rd row */}
                <Button btnText='4' btnFunction={() => {}} btnId='four' />
                <Button btnText='5' btnFunction={() => {}} btnId='five' />
                <Button btnText='6' btnFunction={() => {}} btnId='six' />
                <Button btnText='−' btnFunction={() => {}} btnId='subtract' btnType='fun'/>
                {/* 4th row */}
                <Button btnText='1' btnFunction={() => {}} btnId='one' />
                <Button btnText='2' btnFunction={() => {}} btnId='two' />
                <Button btnText='3' btnFunction={() => {}} btnId='three' />
                <Button btnText='+' btnFunction={() => {}} btnId='add' btnType='fun'/>
                {/* 5th row */}
                <Button btnText='0' btnFunction={() => {}} btnId='zero' style='pill'/>
                <Button btnText='.' btnFunction={() => {}} btnId='decimal' />
                <Button btnText='=' btnFunction={() => {}} btnId='equals' btnType='fun'/>
            </div>
        </main>
    )
}

export default App
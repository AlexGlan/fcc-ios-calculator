import '../styles/Display.scss';

type DisplayProps = {
    output: string,
    formula: string
}

const Display = ({output, formula}: DisplayProps): JSX.Element => {
    return (
        <div className='output'>
            <p id='display'>{output}</p>
            <p className='formula'>{formula}</p>
        </div>
    )
}

export default Display;
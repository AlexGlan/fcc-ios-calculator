import '../styles/Display.scss';

type DisplayProps = {
    output: string,
    formula: string
}

const Display = ({output, formula}: DisplayProps): JSX.Element => {
    const fontSizeStyle: {fontSize: string} = output.length < 7
        ? {fontSize: '4.4rem'}
        : output.length < 10
            ? {fontSize: '3rem'}
            : {fontSize: '2.5rem'}

    return (
        <div className='output'>
            <p id='display' style={fontSizeStyle}>{output}</p>
            <p className='formula'>{formula}</p>
        </div>
    )
}

export default Display;
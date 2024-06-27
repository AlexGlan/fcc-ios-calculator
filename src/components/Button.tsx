import '../styles/Button.scss';

type ButtonProps = {
    btnText: string,
    btnId: string,
    btnType?: string,
    btnFunction: (id: string, textContent: string) => void,
    style?: string
}

const Button = (props: ButtonProps): JSX.Element => {
    const { 
        btnText,
        btnId,
        btnType,
        btnFunction,
        style
    } = props;

    return (
        <button
            id={btnId}
            onClick={() => { btnFunction(btnId, btnText); }}
            style={
                style === 'pill'
                    ? {
                        gridColumn: 'span 2',
                        width: '100%',
                        paddingLeft: '1.5rem',
                        textAlign: 'left'
                      }
                    : {}
            }
            className={
                btnType === 'actions'
                    ? 'btn actions'
                    : btnType === 'fun'
                        ? 'btn fun'
                        : 'btn regular'
            }
        >
        {btnText}
        </button>
    )
}

export default Button
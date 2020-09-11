import buttonModule from './button.module.css'


function SubmitButton(props){
    return(
        <button className={buttonModule.submit}>
            {props.text}
        </button>
    )
}


export {SubmitButton}


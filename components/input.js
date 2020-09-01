import inputModule from './input.module.css'

function TextInput(params){
    return(
        <input type='text' placeholder={params.placeholder} className={inputModule.Input}/>
    )
}

function PasswordInput(params){
    return(
        <input type='password' placeholder={params.placeholder} className={inputModule.Input}/>
    )
}


export {TextInput, PasswordInput}
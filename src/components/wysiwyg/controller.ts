import type { Delta } from "quill"
import type { fieldErrorType } from "../_types"
import type { wysiwygConfigType } from "."
import type Quill from "quill"

//validation of value
export const doValidateValue = (
    quill:Quill,
    onValidate:(error:fieldErrorType, newValue:Delta)=>void,
    config:wysiwygConfigType,
) =>{
    let isError = false
    let errorMessage = ''

    const valueLength = quill.getLength()-1


    if(config['isRequired'] && !isError){
        if(!valueLength){
            isError = true
            errorMessage = 'This field cannot be empty!'
        }
    }

    if(config['minLength'] && !isError){
        if(valueLength < config.minLength){
            isError = true
            errorMessage = `Minimum ${config.minLength} characters required`
        }
    }

    if(config['maxLength'] && !isError){
        if(valueLength > config.maxLength){
            isError = true
            errorMessage = `Maximum ${config.maxLength} characters allowed`
        }
    }

    onValidate({isError:isError, errorMessage:errorMessage}, quill.getContents())
}

export const onInputChange = (
    quillRef:React.RefObject<Quill | null>,
    isDirtyRef: React.RefObject<boolean>,
    onChange?: (content: Delta) => void,
    config?:wysiwygConfigType,
    onValidate?:(error:fieldErrorType, value:Delta)=>void
) =>{
    if(!quillRef.current){
        return null
    }
    const newValue = quillRef.current.getContents()

    if (onChange) {
        onChange(newValue);
    }  
    if(onValidate && config){
        doValidateValue(quillRef.current, onValidate, config)
    }

    //set input text dirty after user typing something
    if(!isDirtyRef.current){
        isDirtyRef.current = true
    }
}

export const onInputFocus = (
    event:FocusEvent,
    quillRef:React.RefObject<Quill | null>,
    setIsFocus:React.Dispatch<React.SetStateAction<boolean>>,
	onFocus?:(e:FocusEvent, value:Delta)=>void
) =>{
    if(!quillRef.current){
        return null
    }

    setIsFocus(true)

    if(onFocus){
        const newValue = quillRef.current.getContents()
        onFocus(event, newValue)
    }
}

export const onInputBlur = (
    event:FocusEvent,
    quillRef:React.RefObject<Quill | null>,
    setIsFocus:React.Dispatch<React.SetStateAction<boolean>>,
    isDirtyRef: React.RefObject<boolean>,
    config?:wysiwygConfigType,
    onValidate?:(error:fieldErrorType, value:Delta)=>void,
	onBlur?:(e:FocusEvent, value:Delta)=>void
) =>{
    if(!quillRef.current){
        return null
    }

    setIsFocus(false)

    if(onBlur){
        const newValue = quillRef.current.getContents()
        onBlur(event, newValue)
    }

    if(onValidate && config && isDirtyRef.current){
        doValidateValue(quillRef.current, onValidate, config)
    }
}
import './styles.scss';
import clsx from 'clsx';
import * as ctrl from './controller';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { GlobalContext, type _GlobalContextType } from 'src/context/global-context';
import type { fieldErrorType, globalShapeType } from 'src/components/_types';

import {EditorView, basicSetup} from "codemirror"
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { html } from '@codemirror/lang-html';
import { indentWithTab } from '@codemirror/commands';
import { ChangeSet, EditorState } from '@codemirror/state';
import { keymap } from '@codemirror/view';
import { githubLight } from '@fsegurai/codemirror-theme-github-light'
import { githubDark } from '@fsegurai/codemirror-theme-github-dark'
import { debounce } from 'lodash';
import { PiWarningBold } from 'react-icons/pi';
import { placeholder } from "@codemirror/view";


export type codeInputLanguageType = 'json' | 'tsx' | 'html' | 'text'

export type inputCodeStyleType = {
    inputCode?:React.CSSProperties,
    capBox?:React.CSSProperties,
    bottomCapBox?:React.CSSProperties,
    codeEditorBox?:React.CSSProperties,
}

export type inputCodeConfigType = {
    isRequired?:boolean
    maxLength?: number
    minLength?: number
    isHideTextCount?: boolean
    isAsPreview?:boolean
}

const InputCode = ({
    lang = 'text',
    className = undefined,
    style = undefined,
    shape = undefined,
    txtPlaceholder = undefined,
    value = undefined,
    isDisabled = false,
    onChange = undefined, 
	onBlur = undefined,
    onFocus = undefined,
    error = undefined,
    onValidate = undefined,
	config = undefined
}:{
    lang?:codeInputLanguageType
    className?:string
    style?:inputCodeStyleType,
    shape?:globalShapeType
    txtPlaceholder?:string
    value?:string
    isDisabled?:boolean
    onChange?:(newValue:string)=>void
	onBlur?:(e:FocusEvent, value:string)=>void
    onFocus?:(e:FocusEvent, value:string)=>void
    error?:fieldErrorType;
	onValidate?:(error:fieldErrorType, value:string)=>void
    config?:inputCodeConfigType;
}) =>{
    //Context start ====
    const {
        appTheme,
        globalShape
    } = useContext(GlobalContext) as _GlobalContextType
    //Context end ====
    
    const isDarkmode = useMemo(()=>{
        return appTheme.globalTheme === 'dark'
    },[appTheme.globalTheme])
    const isAsPreview = useMemo(()=>{
        return config?.isAsPreview
    },[config?.isAsPreview])
    
    const editorRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView | null>(null);
    const[valueTamp, setValueTamp] = useState(value??'')
    const isDirtyRef = useRef(false)

    const debouncedOnChange = useCallback(
        debounce((newValue:string) => {
            ctrl.onInputChange(newValue, isDirtyRef, onChange, config, onValidate)
        }, 500),
    [onChange]);



    // Get language extension
    const getLanguageExtension = (lang: string) => {
        switch (lang) {
        case 'json':
            return [json()];
        case 'tsx':
            return [javascript({ typescript: true, jsx: true })];
        case 'html':
            return [html()];
        case 'text':
        default:
            return []; // No language extension for plain text
        }
    };

    useEffect(() => {
        if (!editorRef.current) return;

        
        const updateListener = EditorView.updateListener.of((update) => {
            if (update.docChanged) {
                const newValue = update.state.doc.toString();
                if(!isDisabled){
                    setValueTamp(newValue)
                    debouncedOnChange(newValue)
                }
            }
        });

        const eventHandler = EditorView.domEventHandlers({
            blur:(e, view)=>{
                ctrl.onInputBlur(e, view.state.doc.toString(), isDirtyRef, config, onValidate, onBlur)
            },
            focus:(e, view)=>{
                ctrl.onInputFocus(e, view.state.doc.toString(), onFocus)
            }
        })

        const extensions = [
            basicSetup,
            keymap.of([indentWithTab]), // Enable Tab for indentation
            ...(Array.isArray(getLanguageExtension(lang)) 
                ? getLanguageExtension(lang) 
                : [getLanguageExtension(lang)]
            ),
            updateListener,
            eventHandler,
            EditorState.readOnly.of(isDisabled),
            EditorView.editable.of(!isDisabled),
        ];

        if(txtPlaceholder){
            extensions.push(placeholder(txtPlaceholder))
        }

        // Add theme
        if (isDarkmode) {
            extensions.push(githubDark);
        }else{
            extensions.push(githubLight);
        }

        const state = EditorState.create({
            doc: valueTamp,
            extensions,
        });

        const view = new EditorView({
            state,
            parent: editorRef.current,
        });

        viewRef.current = view;

        return () => {
            view.destroy();
            viewRef.current = null;
        };
    }, [lang, isDarkmode, isDisabled, txtPlaceholder]);

    // Update value when prop changes
    useEffect(() => {
        if (!viewRef.current || value == null) return;

        const current = viewRef.current.state.doc.toString();
        if (value === current) return;

        // Create minimal changes instead of replacing everything
        const changes = ChangeSet.of(
            [{ from: 0, to: current.length, insert: value }],
            current.length
        );

        viewRef.current.dispatch({
            changes,
        });
    }, [value]);

    return(
        <div 
            className={
                clsx(
                    'input-code',
                    (shape)?(shape):(globalShape),
                    {
                        ['disabled']:(isDisabled),
                        ['has-error']:(error?.isError),
                    },
                    className
                )
            }
            style={style?.inputCode}
        >
            {
                (!isAsPreview)&&(
                    <div
                        className='cap-box'
                        style={style?.capBox}
                    >
                        <p>{lang.toLocaleUpperCase()}</p>
                    </div>
                )
            }
            <div 
                ref={editorRef} 
                className={clsx(
                    "code-editor-box",
                    (isDarkmode)?('dark'):('light')
                )}
                style={style?.codeEditorBox}
                onClick={(e) => {
                    if ((e.target as HTMLElement).classList.contains("code-editor-box")) {
                        viewRef.current?.focus()
                    }
                }}
            />
            {
                (!isAsPreview)&&(
                    <div
                        className='bottom-cap-box'
                        style={style?.bottomCapBox}
                    >
                        {
                            (error&& error.isError && error.errorMessage)&&(
                                <div className='error-box'>
                                    <PiWarningBold className='global-icon'/>
                                    <p>{error.errorMessage}</p>
                                </div>
                            )
                        }
                    </div>
                )
            }
            
        </div>
    )
}

export default InputCode
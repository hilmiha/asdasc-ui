import React, { useEffect, useRef, useState, useContext, useMemo } from 'react';
import Quill, { Delta } from 'quill';
import 'quill/dist/quill.core.css'; 
import './styles.scss';
import { debounce } from 'lodash';
import clsx from 'clsx';
import { GlobalContext, type _GlobalContextType } from 'src/context/global-context';
import * as ctrl from './controller';
import { PiWarningBold } from 'react-icons/pi';
import type { fieldErrorType, globalShapeType } from 'src/components/_types';
import type { wysiwygModulesType } from './components/toolbar-component';
import ToolbarComponent from './components/toolbar-component';

const Wysiwyg = ({
	className = undefined,
	style = undefined,
	shape = undefined,
	
	placeholder = undefined,
	value = undefined,
	isDisabled = false,
	onChange = undefined,
	onBlur = undefined,
	onFocus = undefined,
	error = undefined,
    onValidate = undefined,
	
	config = undefined
}:_Wysiwyg) => {
	const {
        globalShape
    } = useContext(GlobalContext) as _GlobalContextType
	
	const editorRef = useRef<HTMLDivElement>(null);
	const quillRef = useRef<Quill | null>(null);

	const modules = useMemo<wysiwygModulesType[]>(()=>{
		const tamp:wysiwygModulesType[] = ['bold', 'italic', 'underline', 'strike', 'code', 'subscript', 'superscript', 'text-type', 'order-list', 'unorder-list', 'indent', 'align', 'color', 'highlight', 'link', 'image', 'quote-block', 'code-block']
		
		return config?.moduleList?(config.moduleList):(tamp)

	},[config?.moduleList])

	const isAsPreview = useMemo(()=>{
		return config?.isAsPreview
	},[config?.isAsPreview])

	const isDirtyRef = useRef(false)
	const [isFocus, setIsFocus] = useState(false)

	const debouncedOnChange = debounce(() => {
		if(quillRef.current){
			ctrl.onInputChange(quillRef, isDirtyRef, onChange, config, onValidate)
		}
	}, 300)

	const handleFocus = (event:FocusEvent) => {
		if(quillRef.current){
			ctrl.onInputFocus(event, quillRef, setIsFocus, onFocus)
		}
	};

	const handleBlur = (event:FocusEvent) => {
		if(quillRef.current){
			ctrl.onInputBlur(event, quillRef, setIsFocus, isDirtyRef, config, onValidate, onBlur)
		}
	};
	
	useEffect(() => {
		if (editorRef.current && !quillRef.current) {
		// Initialize Quill without toolbar
			quillRef.current = new Quill(editorRef.current, {
				theme: 'snow',
				modules: {
					toolbar: false
				},
				formats: [
					'header', 'bold', 'italic', 'underline', 'strike',
					'list', 'indent', 'align', 'color', 'background',
					'link', 'image', 'blockquote', 'code', 'code-block', 'script'
				],
				placeholder,
				readOnly:isDisabled,
			});

			// Set initial content
			const initDelta:Delta = new Delta().insert('\n');
			quillRef.current.setContents(value??initDelta)


			// Handle content changes
			quillRef.current.on('text-change', debouncedOnChange);

			const editor = quillRef.current.root;
			editor.addEventListener('focus', handleFocus);
			editor.addEventListener('blur', handleBlur);
		}
		return () => {
			if (quillRef.current) {
				const editor = quillRef.current.root;
				editor.removeEventListener('focus', handleFocus);
				editor.removeEventListener('blur', handleBlur);
				quillRef.current.off('text-change', debouncedOnChange);
				quillRef.current = null;
			}
		};
	}, [JSON.stringify(config)]); // so when config change, validation still use latest config

  	// Update content when value prop changes
	useEffect(() => {
		if (quillRef && quillRef.current) {
			const currentContent = quillRef.current.getContents()
			if (JSON.stringify(currentContent) !== JSON.stringify(value) && !isFocus) {
				quillRef.current.setContents(value??[])
			}
		}
	}, [value]);

  	// Update readOnly state
	useEffect(() => {
		if (quillRef.current) {
			quillRef.current.enable(!isDisabled);
		}
	}, [isDisabled]);

	return (
		<div 
			className={clsx(
				`wysiwyg-box`,
				(shape)?(shape):(globalShape),
				{
					['has-error']:(error?.isError),
					['disabled']:(isDisabled)
				},
				className,
			)} 
		>
			{
				(!isAsPreview)&&(
					<ToolbarComponent 
						quill={quillRef.current} 
						shape={(shape)?(shape):(globalShape)}
						moduleList={modules}
						isDisabled={isDisabled}
					/>
				)
			}
			
			<div ref={editorRef} className={'editor-box'} style={style?.editorBox}/>
			{
				(!isAsPreview)&&(
					<div className='footer-box'>
						{
							(error&& error.isError && error.errorMessage)&&(
								<div className='error-box'>
									<PiWarningBold className='global-icon'/>
									<p>{error.errorMessage}</p>
								</div>
							)
						}
						{
							(!config?.isHideTextCount)&&(
								<p className='count-box'>Count: {quillRef.current?quillRef.current.getLength()-1:'0'}</p>
							)
						}
					</div>
				)
			}
			
		</div>
	);
};

export default Wysiwyg;

interface _Wysiwyg {
	className?: string;
	style?: wysiwygStyleType;
	shape?:globalShapeType;

	placeholder?: string;
	value?: Delta;
	isDisabled?: boolean;
	onChange?: (content: Delta) => void;
	onBlur?:(e:FocusEvent, value:Delta)=>void
	onFocus?:(e:FocusEvent, value:Delta)=>void
    error?:fieldErrorType;
	onValidate?:(error:fieldErrorType, value:Delta)=>void
	
	config?:wysiwygConfigType;
}

export type wysiwygStyleType = {
	editorBox:React.CSSProperties;
}
export type wysiwygConfigType = {
    isRequired?:boolean
	maxLength?: number
    minLength?: number
	isHideTextCount?: boolean
	isAsPreview?:boolean
	moduleList?:wysiwygModulesType[]
}
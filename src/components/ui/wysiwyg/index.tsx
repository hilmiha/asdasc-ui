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
import FloatingToolbarWrapper from './components/floating-toolbar-component';

const Wysiwyg = ({
	type = 'classic',
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
}:_Wysiwyg) => {
	const {
        globalShape
    } = useContext(GlobalContext) as _GlobalContextType
	
	const editorRef = useRef<HTMLDivElement>(null);
	const quillRef = useRef<Quill | null>(null);

	const modules = useMemo<wysiwygModulesType[]>(()=>{
		const tamp:wysiwygModulesType[] = ['bold', 'italic', 'underline', 'strike', 'code', 'subscript', 'superscript', 'text-type', 'order-list', 'unorder-list', 'indent', 'align', 'color', 'highlight', 'link', 'image', 'quote-block', 'code-block', 'clear']
		
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
			let allowedFormat:wysiwygFormat[] = [
				'header', 'bold', 'italic', 'underline', 'strike',
				'list', 'indent', 'align', 'color', 'background',
				'link', 'image', 'blockquote', 'code', 'code-block', 'script'
			]

			if(config?.disabledFormat){
				allowedFormat = [...allowedFormat].filter((i)=>!config.disabledFormat?.includes(i))
			}
			
			quillRef.current = new Quill(editorRef.current, {
				theme: 'snow',
				modules: {
					toolbar: false,
					keyboard: {
						bindings: {
							enter: {
								key: 'Enter',
								handler: function() {
									return (config?.isDisableNewLine)?(false):(true); // Prevent default behavior
								}
							}
						}
					},
					clipboard: {
						matchers: [
							['*', function (node:any) {
								return new Delta().insert(node.innerText); //clear format on paste
							}]
						]
					}
				},
				formats: allowedFormat,
				placeholder:txtPlaceholder,
				readOnly:isDisabled,
			});

			// Set initial content
			const initDelta:Delta = new Delta().insert('\n');
			quillRef.current.setContents(value??initDelta)


			// Handle content changes
			const quill = quillRef.current;
			quill.on('text-change', () => {
				if (!config?.isListOnly) { //when isList only false
					debouncedOnChange();
					return;
				}

				//format when config isListOnlyTrue

				const len = quill.getLength();
				const range = quill.getSelection() || { index: len - 1 };
				const format = quill.getFormat(range.index);

				// Case 1: editor is empty or almost empty and not a bullet
				if (len <= 1 && (format.list !== 'bullet' && format.list !== 'ordered')) {
					const fallback = new Delta().insert('\n', { list: 'bullet' });
					quill.setContents(fallback);
					quill.setSelection(0);
					return;
				}

				// Case 2: cursor is in a new non-bullet line
				// (usually happens when user presses Enter at the end)
				const [line] = quill.getLine(range.index);
				if (line && !quill.getFormat(range.index).list) {
					const lineIndex = quill.getIndex(line);
					const lineLength = line.length();

					// Remove that non-bullet line (delete its newline)
					quill.deleteText(lineIndex, lineLength, 'silent');

					// Find last bullet line
					let lastBulletIndex = 0;
					const lines = quill.getLines();
					for (let i = lines.length - 1; i >= 0; i--) {
						const formats = quill.getFormat(quill.getIndex(lines[i]));
						if (formats.list === 'bullet' || formats.list === 'ordered') {
							lastBulletIndex = quill.getIndex(lines[i]) + lines[i].length() - 1;
							break;
						}
					}

					// Move cursor back to end of last bullet
					quill.setSelection(lastBulletIndex, 0, 'silent');
					return;
				}

				// Default case: normal update
				debouncedOnChange();
			});

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
				(type==='classic')&&(!isAsPreview || (isAsPreview && onChange))&&(
					<ToolbarComponent 
						quill={quillRef.current} 
						shape={(shape)?(shape):(globalShape)}
						moduleList={modules}
						isDisabled={isDisabled}
					/>
				)
			}
			{
				(type==='floating' && !isAsPreview )&& (
					<FloatingToolbarWrapper 
						quill={quillRef.current}
						moduleList={modules}
						shape={shape || globalShape}
						isDisabled={isDisabled}
					/>
				)
			}
			<div ref={editorRef} className={'editor-box'} style={style?.editorBox}/>
			{
				(type==='classic')&&(!isAsPreview)&&(
					<div className='footer-box' style={style?.footerBox}>
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
	type?: 'classic' | 'floating'
	className?: string;
	style?: wysiwygStyleType;
	shape?:globalShapeType;

	txtPlaceholder?: string;
	value?: Delta;
	isDisabled?: boolean;
	onChange?: (content: Delta, quillRef:React.RefObject<Quill | null>) => void;
	onBlur?:(e:FocusEvent, value:Delta)=>void
	onFocus?:(e:FocusEvent, value:Delta)=>void
    error?:fieldErrorType;
	onValidate?:(error:fieldErrorType, value:Delta)=>void
	
	config?:wysiwygConfigType;
}

export type wysiwygStyleType = {
	editorBox?:React.CSSProperties;
	footerBox?:React.CSSProperties;
}
type wysiwygFormat = 'header' | 'bold' | 'italic' | 'underline' | 'strike' | 'list' | 'indent' | 'align' | 'color' | 'background' | 'link' | 'image' | 'blockquote' | 'code' | 'code-block' | 'script'
export type wysiwygConfigType = {
    isRequired?:boolean
	isDisableNewLine?:boolean
	maxLength?: number
    minLength?: number
	isHideTextCount?: boolean
	isAsPreview?:boolean
	moduleList?:wysiwygModulesType[]
	disabledFormat?:wysiwygFormat[]
	isListOnly?:boolean
}

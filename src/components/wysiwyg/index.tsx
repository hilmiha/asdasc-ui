import React, { useEffect, useRef, useState, useCallback, useContext } from 'react';
import Quill, { Delta } from 'quill';
import 'quill/dist/quill.core.css'; // Import only core styles, no default toolbar
import './styles.scss';
import ToolbarComponent from './components/toolbar-component';
import { debounce } from 'lodash';
import clsx from 'clsx';
import { GlobalContext, type _GlobalContextType } from '../../context/global-context';
import type { globalShapeType } from '../_types';

// Enhanced Quill Editor with Custom Toolbar
interface CustomQuillEditorProps {
	value?: Delta;
	onChange?: (content: Delta) => void;
	placeholder?: string;
	readOnly?: boolean;
	className?: string;
	style?: React.CSSProperties;
	shape?:globalShapeType
}

const Wysiwyg: React.FC<CustomQuillEditorProps> = ({
	value = undefined,
	onChange = undefined,
	placeholder = 'Write something...',
	readOnly = false,
	className = '',
	style = {},
	shape = undefined
}) => {
	const {
        globalShape
    } = useContext(GlobalContext) as _GlobalContextType

	const editorRef = useRef<HTMLDivElement>(null);
	const quillRef = useRef<Quill | null>(null);
	const [quillInstance, setQuillInstance] = useState<Quill | null>(null);
	const [isFocus, setIsFocus] = useState(false)

	const handleFocus = () => {
		setIsFocus(true)
	};

	const handleBlur = () => {
		setIsFocus(false)
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
				readOnly,
			});

			setQuillInstance(quillRef.current);

			// Set initial content
			if (value) {
				// quillRef.current.clipboard.dangerouslyPasteHTML(value);
				quillRef.current.setContents(value)
			}

			// Handle content changes
			quillRef.current.on('text-change', () => {
				if(quillRef.current){
					debouncedOnChange(quillRef.current.getContents())
				}
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
				quillRef.current = null;
				setQuillInstance(null);
			}
		};
	}, []);

	const debouncedOnChange = useCallback(
		debounce((newValue:Delta) => {
			if (onChange) {
				onChange(newValue);
			}
		}, 300),
	[onChange]);

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
			quillRef.current.enable(!readOnly);
		}
	}, [readOnly]);

	return (
		<div 
			className={clsx(
				`wysiwyg-box`,
				className
			)} 
			style={style}
		>
			<ToolbarComponent quill={quillInstance} shape={(shape)?(shape):(globalShape)}/>
			<div ref={editorRef} className={clsx('editor-box', (shape)?(shape):(globalShape))}/>
		</div>
	);
};

export default Wysiwyg;
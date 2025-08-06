import type Quill from "quill";
import { useCallback, useEffect, useState } from "react";
import IconButton from "../../icon-button";
import { PiCodeBlockBold, PiEraserBold, PiListBulletsBold, PiListNumbersBold, PiQuotesBold, PiTextAlignCenterBold, PiTextAlignJustifyBold, PiTextAlignLeftBold, PiTextAlignRightBold, PiTextBBold, PiTextIndentBold, PiTextItalicBold, PiTextOutdentBold, PiTextStrikethroughBold, PiTextUnderlineBold } from "react-icons/pi";
import InsertLinkModule from "./insert-link-module";
import InsertImageModule from "./insert-image-module";
import FormatTextColorModule from "./format-text-color-module";
import FormatTextHighlightModule from "./format-text-highlight-module";
import FormatTextTypeModule from "./format-text-type-module";
import type { globalShapeType } from "../../_types";
import clsx from "clsx";

const ToolbarComponent = ({
    quill,
    shape
}:{
    quill: Quill | null,
    shape?:globalShapeType
}) =>{
    const [activeFormats, setActiveFormats] = useState<{[key: string]: any}>({});
    // const [selectedText, setSelectedText] = useState<string>('');
    // Format functions
    const formatText = useCallback((format: string, value?: any) => {
        if (!quill) return;
        
        const selection = quill.getSelection();
        if (selection) {
            if (value === undefined) {
                // Toggle format if no value provided
                const currentFormat = quill.getFormat(selection);
                const newValue = currentFormat[format] ? false : true;
                quill.format(format, newValue);
            } else {
                quill.format(format, value);
            }
            quill.focus();
        }
    }, [quill]);
    
    const insertLink = useCallback((selection:{index:number, length:number}, link:string, text:string) => {
        if (!quill) return;
        quill.insertText(selection.index, text, 'link', link);
        quill.focus();
    }, [quill]);

    const insertImage = useCallback((selection:{index:number, length:number}, link:string) => {
        if (!quill) return;
        quill.insertEmbed(selection.index, 'image', link);
        quill.focus();
    }, [quill]);

    // const insertContent = useCallback((type: string) => {
    //     if (!quill) return;
    
    //     const selection = quill.getSelection() || { index: 0, length: 0 };
        
    //     switch (type) {
    //         case 'link':
    //             const url = prompt('Enter URL:');
    //             if (url) {
    //                 if (selection.length === 0) {
    //                 const text = prompt('Enter link text:') || url;
    //                 quill.insertText(selection.index, text, 'link', url);
    //                 } else {
    //                 quill.format('link', url);
    //                 }
    //             }
    //             break;
    //         case 'image':
    //             const imageUrl = prompt('Enter image URL:');
    //             if (imageUrl) {
    //                 quill.insertEmbed(selection.index, 'image', imageUrl);
    //             }
    //             break;
    //         default:
    //             break;
    //     }
    //     quill.focus();
    // }, [quill]);
    
    const applyBlock = useCallback((format: string, value?: any) => {
        if (!quill) return;
        
        const selection = quill.getSelection();
        if (!selection) return;
    
        // Handle special cases for block formats
        if (format === 'blockquote') {
            const currentFormat = quill.getFormat(selection);
            const newValue = currentFormat.blockquote ? false : true;
            quill.format('blockquote', newValue);
        } else if (format === 'code-block') {
            const currentFormat = quill.getFormat(selection);
            const newValue = currentFormat['code-block'] ? false : true;
            quill.format('code-block', newValue);
        } else if (format === 'list') {
            // Handle list toggling
            const currentFormat = quill.getFormat(selection);
            if (currentFormat.list === value) {
                quill.format('list', false);
            } else {
                quill.format('list', value);
            }
        } else if (format === 'indent') {
            // Handle indentation - check if we're in a list
            const currentFormat = quill.getFormat(selection);
            if (currentFormat.list) {
                // We're in a list, apply indent
                const currentIndent = currentFormat.indent as number || 0;
                const newIndent = value === '+1' ? currentIndent + 1 : Math.max(0, currentIndent - 1);
                quill.format('indent', newIndent > 0 ? newIndent : false);
            } else {
                // Not in a list, apply regular indent
                const currentIndent = currentFormat.indent as number || 0;
                const newIndent = value === '+1' ? currentIndent + 1 : Math.max(0, currentIndent - 1);
                quill.format('indent', newIndent > 0 ? newIndent : false);
            }
        } else {
            quill.format(format, value);
        }
        
        quill.focus();
    }, [quill]);
    
    const clearFormats = useCallback(() => {
        if (!quill) return;
            const selection = quill.getSelection();
        if (selection) {
            quill.removeFormat(selection.index, selection.length);
            quill.focus();
        }
    }, [quill]);
    
      // Update active formats when selection changes
    useEffect(() => {
        if (!quill) return;
    
        const updateFormats = () => {
            const selection = quill.getSelection();
            if (selection) {
                const formats = quill.getFormat(selection);
                setActiveFormats(formats);
                // setSelectedText(quill.getText(selection.index, selection.length));
            }
        };
    
        // Add keyboard shortcuts for indentation
        const addKeyboardShortcuts = () => {
            // Tab for indent
            quill.keyboard.addBinding({
            key: 9, // Tab key
            handler: (range: any) => {
                const formats = quill.getFormat(range);
                if (formats.list) {
                    applyBlock('indent', '+1');
                    return false; // Prevent default tab behavior
                }
                return true; // Allow default behavior for non-lists
            }
            });
    
            // Shift+Tab for outdent
            quill.keyboard.addBinding({
                key: 9, // Tab key
                shiftKey: true,
                handler: (range: any) => {
                    const formats = quill.getFormat(range);
                    if (formats.list) {
                        applyBlock('indent', '-1');
                        return false; // Prevent default behavior
                    }
                    return true;
                }
            });
        };
    
        // Listen for selection changes
        quill.on('selection-change', updateFormats);
        // Listen for text changes to update formats
        quill.on('text-change', updateFormats);
        
        // Add keyboard shortcuts
        addKeyboardShortcuts();
    
        return () => {
            quill.off('selection-change', updateFormats);
            quill.off('text-change', updateFormats);
        };
    }, [quill, applyBlock]);

    return(
        <div className={clsx(
            "toolbar-container",
            shape
        )}>
            <IconButton
                icon={<PiTextBBold className="global-icon"/>}
                appearance="subtle"
                txtLabel="Bold"
                onClick={() => formatText('bold')}
                isSelected={activeFormats.bold}
            />
            <IconButton
                icon={<PiTextItalicBold className="global-icon"/>}
                appearance="subtle"
                txtLabel="Italic"
                onClick={() => formatText('italic')}
                isSelected={activeFormats.italic}
            />
            <IconButton
                icon={<PiTextUnderlineBold className="global-icon"/>}
                appearance="subtle"
                txtLabel="Underline"
                onClick={() => formatText('underline')}
                isSelected={activeFormats.underline}
            />
            <IconButton
                icon={<PiTextStrikethroughBold className="global-icon"/>}
                appearance="subtle"
                txtLabel="Strikethrough"
                onClick={() => formatText('strike')}
                isSelected={activeFormats.strike}
            />
            <FormatTextTypeModule
                selected={activeFormats.header}
                onClickOption={(value)=>{applyBlock('header', value || false)}}
            />
            {/* <div className="header-dropdown-box">
                <DropdownMenu
                    trigger={
                        <Button 
                            txtLabel={`${activeFormats.header?('Header '):('')}${activeFormats.header || 'Normal'}`}
                            iconAfter={<PiCaretDownBold/>}
                        />
                    }
                    options={[
                        {id:'', txtLabel:'Normal'},
                        {id:'1', txtLabel:'Header 1'},
                        {id:'2', txtLabel:'Header 2'},
                        {id:'3', txtLabel:'Header 3'},
                        {id:'4', txtLabel:'Header 4'},
                        {id:'5', txtLabel:'Header 5'},
                        {id:'6', txtLabel:'Header 6'},
                    ]}
                    onClick={(value)=>{applyBlock('header', value || false)}}
                />
            </div> */}
            <IconButton
                icon={<PiListNumbersBold className="global-icon"/>}
                appearance="subtle"
                txtLabel="Numbered List"
                onClick={() => applyBlock('list', 'ordered')}
                isSelected={activeFormats.list === 'ordered'}
            />
            <IconButton
                icon={<PiListBulletsBold className="global-icon"/>}
                appearance="subtle"
                txtLabel="Bullet List"
                onClick={() => applyBlock('list', 'bullet')}
                isSelected={activeFormats.list === 'bullet'}
            />
            <IconButton
                icon={<PiTextOutdentBold className="global-icon"/>}
                appearance="subtle"
                txtLabel="Decrease Indent"
                onClick={() => applyBlock('indent', '-1')}
                isDisabled={!activeFormats.indent && activeFormats.indent !== 0}
            />
            <IconButton
                icon={<PiTextIndentBold className="global-icon"/>}
                appearance="subtle"
                txtLabel="Increase Indent"
                onClick={() => applyBlock('indent', '+1')}
                isDisabled={activeFormats.indent === 8}
            />
            <IconButton
                icon={<PiTextAlignLeftBold className="global-icon"/>}
                appearance="subtle"
                txtLabel="Align Left"
                onClick={() => applyBlock('align', '')}
                isSelected={!activeFormats.align}
            />
            <IconButton
                icon={<PiTextAlignCenterBold className="global-icon"/>}
                appearance="subtle"
                txtLabel="Align Center"
                onClick={() => applyBlock('align', 'center')}
                isSelected={activeFormats.align === 'center'}
            />
            <IconButton
                icon={<PiTextAlignRightBold className="global-icon"/>}
                appearance="subtle"
                txtLabel="Align Right"
                onClick={() => applyBlock('align', 'right')}
                isSelected={activeFormats.align === 'right'}
            />
            <IconButton
                icon={<PiTextAlignJustifyBold className="global-icon"/>}
                appearance="subtle"
                txtLabel="Align Justify"
                onClick={() => applyBlock('align', 'justify')}
                isSelected={activeFormats.align === 'justify'}
            />
            <FormatTextColorModule
                selected={activeFormats.color || '#000000'}
                onApply={(value) => formatText('color', value)}
            />
            <FormatTextHighlightModule
                selected={activeFormats.background || 'transparent'}
                onApply={(value) => formatText('background', value)}
            />
            <InsertLinkModule
                quill={quill}
                onInsert={(selection, link, text)=>{insertLink(selection, link, text)}}
            />
            <InsertImageModule
                quill={quill}
                onInsert={(selection, link)=>{insertImage(selection, link)}}
            />
            <IconButton
                icon={<PiQuotesBold className="global-icon"/>}
                appearance="subtle"
                txtLabel="Blockquote"
                onClick={() => applyBlock('blockquote')}
                isSelected={activeFormats.blockquote}
            />
            <IconButton
                icon={<PiCodeBlockBold className="global-icon"/>}
                appearance="subtle"
                txtLabel="Code Block"
                onClick={() => applyBlock('code-block')}
                isSelected={activeFormats['code-block']}
            />
            <IconButton
                icon={<PiEraserBold className="global-icon"/>}
                appearance="subtle"
                txtLabel="Clear Formatting"
                onClick={() => clearFormats()}
            />
        </div>
    )
}

export default ToolbarComponent
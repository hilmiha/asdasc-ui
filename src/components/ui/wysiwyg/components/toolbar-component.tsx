import type Quill from "quill";
import { useCallback, useEffect, useState } from "react";
import IconButton from "../../icon-button";
import { PiCodeBlockBold, PiCodeBold, PiEraserBold, PiListBulletsBold, PiListNumbersBold, PiQuotesBold, PiTextAlignCenterBold, PiTextAlignJustifyBold, PiTextAlignLeftBold, PiTextAlignRightBold, PiTextBBold, PiTextIndentBold, PiTextItalicBold, PiTextOutdentBold, PiTextStrikethroughBold, PiTextSubscriptBold, PiTextSuperscriptBold, PiTextUnderlineBold } from "react-icons/pi";
import InsertLinkModule from "./insert-link-module";
import InsertImageModule from "./insert-image-module";
import FormatTextColorModule from "./format-text-color-module";
import FormatTextHighlightModule from "./format-text-highlight-module";
import FormatTextTypeModule from "./format-text-type-module";
import type { globalShapeType } from "src/components/_types";
import clsx from "clsx";

const ToolbarComponent = ({
    quill,
    shape,
    moduleList = ['bold', 'italic', 'underline', 'strike', 'code', 'subscript', 'superscript', 'text-type', 'order-list', 'unorder-list', 'indent', 'align', 'color', 'highlight', 'link', 'image', 'quote-block', 'code-block', 'clear'],
    isDisabled = false,
    isFloating = false,
}:{
    quill: Quill | null,
    shape?:globalShapeType
    moduleList:wysiwygModulesType[]
    isDisabled:boolean
    isFloating?:boolean
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
                const currentFormat = quill.getFormat(selection);
                const newValue = currentFormat[format]===value?(false):value;
                quill.format(format, newValue);
            }
            quill.focus();
        }
    }, [quill]);
    
    const insertLink = useCallback((selection:{index:number, length:number}, link:string, text:string) => {
        if (!quill) return;
        quill.insertText(selection.index, text, 'link', link);
        quill.focus();
    }, [quill]);

    const insertImage = useCallback((selection:{index:number, length:number}, link:string, width:string, height:string) => {
        if (!quill) return;
        quill.insertEmbed(selection.index, 'image', link);
        // Then apply dimensions if provided

        // Format the inserted image
        if (width || height) {
            quill.formatText(selection.index, 1, {
                width: width ? `${width}px` : undefined,
                height: height ? `${height}px` : undefined
            });
        }

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
            {
                ['toolbar-floating']:(isFloating),
            },
            shape
        )}>
            {
                moduleList.includes('bold')&&(
                    <IconButton
                        icon={<PiTextBBold className="global-icon"/>}
                        appearance="subtle"
                        txtLabel="Bold"
                        onClick={() => formatText('bold')}
                        isSelected={activeFormats.bold}
                        isDisabled={isDisabled}
                    />
                )
            }
            {
                moduleList.includes('italic')&&(
                    <IconButton
                        icon={<PiTextItalicBold className="global-icon"/>}
                        appearance="subtle"
                        txtLabel="Italic"
                        onClick={() => formatText('italic')}
                        isSelected={activeFormats.italic}
                        isDisabled={isDisabled}
                    />
                )
            }
            {
                moduleList.includes('underline')&&(
                    <IconButton
                        icon={<PiTextUnderlineBold className="global-icon"/>}
                        appearance="subtle"
                        txtLabel="Underline"
                        onClick={() => formatText('underline')}
                        isSelected={activeFormats.underline}
                        isDisabled={isDisabled}
                    />
                )
            }
            {
                moduleList.includes('strike')&&(
                    <IconButton
                        icon={<PiTextStrikethroughBold className="global-icon"/>}
                        appearance="subtle"
                        txtLabel="Strikethrough"
                        onClick={() => formatText('strike')}
                        isSelected={activeFormats.strike}
                        isDisabled={isDisabled}
                    />
                )
            }
            {
                moduleList.includes('code')&&(
                    <IconButton
                        icon={<PiCodeBold className="global-icon"/>}
                        appearance="subtle"
                        txtLabel="Code"
                        onClick={() => formatText('code')}
                        isSelected={activeFormats.code}
                        isDisabled={isDisabled}
                    />
                )
            }
            {
                moduleList.includes('subscript')&&(
                    <IconButton
                        icon={<PiTextSubscriptBold className="global-icon"/>}
                        appearance="subtle"
                        txtLabel="Subscript"
                        onClick={() => formatText('script', 'sub')}
                        isSelected={activeFormats.script==='sub'}
                        isDisabled={isDisabled}
                    />
                )
            }
            {
                moduleList.includes('superscript')&&(
                    <IconButton
                        icon={<PiTextSuperscriptBold className="global-icon"/>}
                        appearance="subtle"
                        txtLabel="Superscript"
                        onClick={() => formatText('script', 'super')}
                        isSelected={activeFormats.script==='super'}
                        isDisabled={isDisabled}
                    />
                )
            }
            {
                moduleList.includes('text-type')&&(
                    <FormatTextTypeModule
                        selected={activeFormats.header}
                        onClickOption={(value)=>{applyBlock('header', value || false)}}
                        isDisabled={isDisabled}
                    />
                )
            }
            {
                moduleList.includes('order-list')&&(
                    <IconButton
                        icon={<PiListNumbersBold className="global-icon"/>}
                        appearance="subtle"
                        txtLabel="Ordered List"
                        onClick={() => applyBlock('list', 'ordered')}
                        isSelected={activeFormats.list === 'ordered'}
                        isDisabled={isDisabled}
                    />
                )
            }
            {
                moduleList.includes('unorder-list')&&(
                    <IconButton
                        icon={<PiListBulletsBold className="global-icon"/>}
                        appearance="subtle"
                        txtLabel="Bullet List"
                        onClick={() => applyBlock('list', 'bullet')}
                        isSelected={activeFormats.list === 'bullet'}
                        isDisabled={isDisabled}
                    />
                )
            }
            {
                moduleList.includes('indent')&&(
                    <>
                        <IconButton
                            icon={<PiTextOutdentBold className="global-icon"/>}
                            appearance="subtle"
                            txtLabel="Decrease Indent"
                            onClick={() => applyBlock('indent', '-1')}
                            isDisabled={(!activeFormats.indent && activeFormats.indent !== 0) || isDisabled}
                        />
                        <IconButton
                            icon={<PiTextIndentBold className="global-icon"/>}
                            appearance="subtle"
                            txtLabel="Increase Indent"
                            onClick={() => applyBlock('indent', '+1')}
                            isDisabled={(activeFormats.indent === 8) || isDisabled}
                        />
                    </>
                )
            }
            {
                moduleList.includes('align')&&(
                    <>
                        <IconButton
                            icon={<PiTextAlignLeftBold className="global-icon"/>}
                            appearance="subtle"
                            txtLabel="Align Left"
                            onClick={() => applyBlock('align', '')}
                            isSelected={!activeFormats.align}
                            isDisabled={isDisabled}
                        />
                        <IconButton
                            icon={<PiTextAlignCenterBold className="global-icon"/>}
                            appearance="subtle"
                            txtLabel="Align Center"
                            onClick={() => applyBlock('align', 'center')}
                            isSelected={activeFormats.align === 'center'}
                            isDisabled={isDisabled}
                        />
                        <IconButton
                            icon={<PiTextAlignRightBold className="global-icon"/>}
                            appearance="subtle"
                            txtLabel="Align Right"
                            onClick={() => applyBlock('align', 'right')}
                            isSelected={activeFormats.align === 'right'}
                            isDisabled={isDisabled}
                        />
                        <IconButton
                            icon={<PiTextAlignJustifyBold className="global-icon"/>}
                            appearance="subtle"
                            txtLabel="Align Justify"
                            onClick={() => applyBlock('align', 'justify')}
                            isSelected={activeFormats.align === 'justify'}
                            isDisabled={isDisabled}
                        />
                    </>
                )
            }
            {
                moduleList.includes('color')&&(
                    <FormatTextColorModule
                        selected={activeFormats.color || ''}
                        onApply={(value) => formatText('color', value)}
                        isDisabled={isDisabled}
                    />
                )
            }
            {
                moduleList.includes('highlight')&&(
                    <FormatTextHighlightModule
                        selected={activeFormats.background || 'transparent'}
                        onApply={(value) => formatText('background', value)}
                        isDisabled={isDisabled}
                    />
                )
            }
            {
                moduleList.includes('link')&&(
                    <InsertLinkModule
                        quill={quill}
                        onInsert={(selection, link, text)=>{insertLink(selection, link, text)}}
                        isDisabled={isDisabled}
                    />
                )
            }
            {
                moduleList.includes('image')&&(
                    <InsertImageModule
                        quill={quill}
                        onInsert={(selection, link, height, width)=>{insertImage(selection, link, width, height)}}
                        isDisabled={isDisabled}
                    />
                )
            }
            {
                moduleList.includes('quote-block')&&(
                    <IconButton
                        icon={<PiQuotesBold className="global-icon"/>}
                        appearance="subtle"
                        txtLabel="Blockquote"
                        onClick={() => applyBlock('blockquote')}
                        isSelected={activeFormats.blockquote}
                        isDisabled={isDisabled}
                    />
                )
            }
            {
                moduleList.includes('code-block')&&(
                    <IconButton
                        icon={<PiCodeBlockBold className="global-icon"/>}
                        appearance="subtle"
                        txtLabel="Code Block"
                        onClick={() => applyBlock('code-block')}
                        isSelected={activeFormats['code-block']}
                        isDisabled={isDisabled}
                    />
                )
            }
            {
                moduleList.includes('clear')&&(
                    <IconButton
                        icon={<PiEraserBold className="global-icon"/>}
                        appearance="subtle"
                        txtLabel="Clear Formatting"
                        onClick={() => clearFormats()}
                        isDisabled={isDisabled}
                    />
                )
            }
        </div>
    )
}

export default ToolbarComponent

export type wysiwygModulesType = 'bold' | 'italic' | 'underline' | 'strike' | 'code' | 'subscript' | 'superscript' | 'text-type' | 'order-list' | 'unorder-list' | 'indent' | 'align' | 'color' | 'highlight' | 'link' | 'image' | 'quote-block' | 'code-block' | 'clear'

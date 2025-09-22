import Quill, { Delta } from "quill";

export const QuillHtmlUtils = {
    // Get HTML with embedded CSS for complete standalone display
    getStandaloneHtml: (quill: Quill): string => {
        const html = quill.root.innerHTML;
        const css = `
            <style>
                .ql-editor {
                    font-family: 'Helvetica Neue', Arial, sans-serif;
                    font-size: 14px;
                    line-height: 1.42;
                    color: black;
                }

                p {
                    margin: 0px;
                    margin-bottom:16px;
                }
                h1, h2, h3, h4, h5, h6{
                    margin: 0px;
                }
                

                blockquote {
                    border-left: 4px solid #ccc;
                    margin: 16px 0;
                    padding: 8px 16px;
                    background-color: #f9f9f9;
                    font-style: italic;
                }
                
                blockquote + blockquote {
                    margin-top: 0;
                    padding-top: 0;
                }
                
                blockquote:has(+ blockquote) {
                    margin-bottom: 0;
                    padding-bottom: 0;
                }

                .ql-code-block-container {
                    background-color: #f4f4f4;
                    padding: 8px 16px;
                    border: 1px solid #e1e1e1;
                    border-radius: 4px;
                    font-family: monospace;
                    margin: 16px 0;
                }

                .ql-code-block{
                    white-space: pre;
                }
                
                
                .ql-editor ol, .ql-editor ul {
                    padding-left: 1.5em;
                }
                
                .ql-editor li {
                    list-style-type: none;
                    padding-left: 0.5em;
                    position: relative;
                }
                
                .ql-editor li[data-list="bullet"]::before {
                    content: "•";
                    color: #333;
                    font-weight: bold;
                    position: absolute;
                    margin-left: -1em;
                }
                
                .ql-editor li[data-list="ordered"] {
                    counter-increment: list-0;
                }
                
                .ql-editor li[data-list="ordered"]::before {
                    content: counter(list-0, decimal) ". ";
                    color: #333;
                    position: absolute;
                    margin-left: -2em;
                    text-align: right;
                    width: 1.5em;
                }
                
                .ql-editor li[data-list="ordered"].ql-indent-1 {
                    counter-increment: list-1;
                }
                
                .ql-editor li[data-list="ordered"].ql-indent-1::before {
                    content: counter(list-1, lower-alpha) ". ";
                }
                
                .ql-editor li[data-list="ordered"].ql-indent-2 {
                    counter-increment: list-2;
                }
                
                .ql-editor li[data-list="ordered"].ql-indent-2::before {
                    content: counter(list-2, lower-roman) ". ";
                }
                
                .ql-editor .ql-indent-1 { padding-left: 3em; }
                .ql-editor .ql-indent-2 { padding-left: 6em; }
                .ql-editor .ql-indent-3 { padding-left: 9em; }
                .ql-editor .ql-indent-4 { padding-left: 12em; }
                .ql-editor .ql-indent-5 { padding-left: 15em; }
                
                .ql-editor .ql-align-center { text-align: center; }
                .ql-editor .ql-align-right { text-align: right; }
                .ql-editor .ql-align-justify { text-align: justify; }
            </style>
        `;
        
        return css + '<div class="ql-editor">' + html + '</div>';
    },

    // Convert Quill Delta to clean HTML
    deltaToHtml: (delta: Delta): string => {
        const tempDiv = document.createElement('div');
        const tempQuill = new Quill(tempDiv, { 
            theme: 'bubble', 
            readOnly:true
        });
        tempQuill.setContents(delta);

        const result = QuillHtmlUtils.getStandaloneHtml(tempQuill);
        
        try {
            tempDiv.remove();
        } catch (e) {
            if (tempDiv.parentNode) {
                tempDiv.parentNode.removeChild(tempDiv);
            }
        }
        return result;
    },

    // Convert HTML to Delta
    htmlToDelta: (htmlString: string): Delta => {
        const tempDiv = document.createElement('div');
        const tempQuill = new Quill(tempDiv, { 
            theme: 'bubble', 
            readOnly:true
        });
        tempQuill.clipboard.dangerouslyPasteHTML(htmlString);

        const result = tempQuill.getContents()

        try {
            tempDiv.remove();
        } catch (e) {
            if (tempDiv.parentNode) {
                tempDiv.parentNode.removeChild(tempDiv);
            }
        }
        return result;
    },
};
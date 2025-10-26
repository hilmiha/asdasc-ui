import { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/react';
import { useEffect, useState } from 'react';
import ToolbarComponent, { type wysiwygModulesType } from './toolbar-component';
import type Quill from 'quill';
import type { globalShapeType } from 'src/components/_types';

const FloatingToolbarWrapper = (
    { quill, moduleList, shape, isDisabled }:{
        quill: Quill | null,
        shape?:globalShapeType
        moduleList:wysiwygModulesType[]
        isDisabled:boolean
    }
) => {
    const [isVisible, setIsVisible] = useState(false);

    const { x, y, strategy, refs, update } = useFloating({
        placement: 'bottom-start',
        middleware: [
            offset(-10),
            flip({padding: 10, fallbackPlacements:['bottom', 'bottom-start', 'bottom-end','top', 'top-start', 'top-end']}),
            shift({ padding: 10 }),
        ],
        strategy:'fixed',
        whileElementsMounted: autoUpdate,
    });

    // Handle selection placement
    useEffect(() => {
        if (!quill) return;

        const handleSelectionChange = (range: any) => {
            if (range && range.length > 0) {
                const bounds = quill.getBounds(range.index, range.length);
                if(!bounds) return;
                const editorElem = quill.root.getBoundingClientRect(); // Get editor's viewport position
                refs.setReference({
                    getBoundingClientRect: () => ({
                        width: bounds.width,
                        height: bounds.height,
                        top: editorElem.top + bounds.top,
                        bottom: editorElem.top + bounds.bottom,
                        left: editorElem.left + bounds.left,
                        right: editorElem.left + bounds.right,
                        x: editorElem.left + bounds.left,
                        y: editorElem.top + bounds.top,
                    }),
                });
                setIsVisible(true);
                update();
            } else {
                setIsVisible(false);
            }
        };

        quill.on('selection-change', handleSelectionChange);
        return () => {
            quill.off('selection-change', handleSelectionChange)
        }
    }, [quill, refs, update]);

    return (
        <div
        ref={refs.setFloating}
        style={{
            position: strategy,
            top: y,
            left: x ?? 0,
            zIndex: 1,
            display:isVisible?('block'):('none')
        }}
        >
            <ToolbarComponent
                quill={quill}
                moduleList={moduleList}
                shape={shape}
                isDisabled={isDisabled}
                isFloating={true} // pass custom flag if needed
            />
        </div>
    );
};

export default FloatingToolbarWrapper;

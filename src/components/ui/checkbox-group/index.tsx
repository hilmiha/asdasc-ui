import './styles.scss'
import * as ctrl from './controller';
import { useEffect, useState } from 'react';
import CheckboxButton from '../checkbox-button';
import { PiCaretDownBold, PiCaretUpBold, PiCircleBold, PiWarningBold } from 'react-icons/pi';
import IconButton from '../icon-button';
import type { fieldErrorType, optionItemType } from 'src/components/_types';
import { useDeepCompareMemo } from 'src/hook/useDeepCompareMemo';
import clsx from 'clsx';
import type { buttonStyleType } from '../button';

const CheckboxGroup = ({ 
    className = undefined,
    style = undefined,
    options = [], 
    selectedList = [], 
    isDisabled = false,
    isDefaultCollapse = true,
    onChange = undefined,

    triggerValidate = 0,
    error = undefined,
    onValidate = undefined,
    config = undefined
}:_CheckboxGroup) => {
    const checkedLeaves = new Set(selectedList);
    const [collapsed, setCollapsed] = useState<Set<string>>(new Set()); 

    const isTree = useDeepCompareMemo(()=>{
        return JSON.stringify(options).includes('childOption')
    },[options])

    const renderTree = (option: optionItemType, isParentCollapse?:boolean) => {
        const state = ctrl.getNodeState(option, checkedLeaves);
        const isParent = option.childOption && option.childOption.length > 0;
        const isCollapsed = isDefaultCollapse?collapsed.has(option.id):!collapsed.has(option.id);

        if(option.type==='separator'){
            return null
        }

        return (
            <div className={'checkbox-tree-box'} key={option.id}>
                <div className='parent-box'>
                    {
                        (isParent) ? (
                            <IconButton
                                appearance='subtle'
                                className='collapse-button'
                                onClick={() => {
                                    ctrl.onCollapseButtonClick(option, setCollapsed)
                                }}
                                icon={isCollapsed ? <PiCaretDownBold className='global-icon' /> : <PiCaretUpBold className='global-icon' />}
                                txtLabel={isCollapsed ? 'Expand Option' : 'Collapse Option'}
                                isShowtooltip={false}
                            />
                        ) : (isTree) ? (
                            <PiCircleBold className='global-icon' color='transparent' style={{margin:'calc(var(--space-0))'}}/> // spacer for child alignment
                        ):(
                            <></>
                        )
                    }
                    <CheckboxButton
                        isSelected={state.checked && !state.indeterminate}
                        isIndeterminate={state.indeterminate}
                        txtLabel={option.txtLabel}
                        txtSublabel={option.txtSublabel}
                        icon={option.icon}
                        onClick={(isCheck) => ctrl.onOptionItemClick(option, isCheck, checkedLeaves, onChange, onValidate, config)}
                        isDisabled={isDisabled || option.isDisabled || isParentCollapse}
                        style={style?.checkboxButton}
                    />
                </div>

                {
                    (isParent) && (
                        <div 
                            className={clsx(
                                'child-box',
                                (isCollapsed)?('closed'):('opened')
                            )}
                        >
                            <div>
                                {
                                    option.childOption!.map((i)=>{return renderTree(i, isCollapsed)})
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        );
    };


    useEffect(()=>{
        if(triggerValidate===1){
            if(onValidate && config){
                ctrl.doValidateValue(selectedList, onValidate, config)
            }
        }
    },[triggerValidate])

    return (
        <div
            className={clsx(
                'checkbox-group-container', 
                {
                    ['error']:(error?.isError),
                },
                className
            )}
            style={style?.container}
        >
            <div
                style={style?.box}
            >
                {
                    options.map(
                        (itmOption)=>{
                            return renderTree(itmOption)
                        }
                    )
                }
            </div>
            {
                (error && error.isError && error.errorMessage)&&(
                    <div className='error-box'>
                        <PiWarningBold className='global-icon'/>
                        <p>{error.errorMessage}</p>
                    </div>
                )
            }
        </div>
    );
};

export default CheckboxGroup;

interface _CheckboxGroup {
    className?:string;
    style?:checkboxGroupStyleType;
    options: optionItemType[];
    selectedList?: string[]; 
    isDisabled?: boolean;
    isDefaultCollapse?: boolean;
    onChange?: (checkedLeafIds: string[]) => void;

    triggerValidate?:0|1;
    error?:fieldErrorType;
    onValidate?:(error:fieldErrorType, value:string[])=>void;
    config?:checkboxGroupConfigType;
    
}

export type checkboxGroupConfigType = {
    minValue?:number
    maxValue?:number
    isRequired?:boolean
}

export type checkboxGroupStyleType = {
    container?:React.CSSProperties;
    box?:React.CSSProperties;
    checkboxButton?:buttonStyleType
}

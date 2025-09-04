import './styles.scss';
import clsx from 'clsx';
import { useContext, type JSX } from "react"
import { GlobalContext, type _GlobalContextType } from '../../context/global-context';
import type { globalAppearanceType, globalShapeType } from '../_types';
import IconButton from '../icon-button';
import { PiXBold } from 'react-icons/pi';
import type { buttonStyleType } from '../button';
import Button from '../button';

const Tag = ({
    className,
    style = undefined,
    shape,
    appearance = 'neutral',
    txtLabel = '',
    onClick = undefined,
    onClickRemove = undefined,
    isDisabled = false,
    iconBefore = undefined,
    iconAfter = undefined,

}:_Tag) =>{
    //Context start ====
    const {
        globalShape
    } = useContext(GlobalContext) as _GlobalContextType
    //Context end ====

    return(
        <div 
            className={clsx(
                'tag-container',
                appearance,
                (shape)?(shape):(globalShape),
                {
                    ['has-remove']:(onClickRemove)
                },
                className,
            )}
            style={style?.tagContainer}
        >
            {
                (onClick)?(
                    <Button
                        appearance='subtle'
                        className='tag-label-box-as-button'
                        txtLabel={txtLabel}
                        iconAfter={iconAfter}
                        iconBefore={iconBefore}
                        onClick={(e)=>{onClick(e, txtLabel)}}
                    />
                ):(
                    <div className='tag-label-box'>
                        {
                            (iconBefore)&&(
                                <div className='icon-before-box' style={style?.iconBefore}>
                                    {iconBefore}
                                </div>
                            )
                        }
                        <span className='tag-label' style={style?.textLabel}>{txtLabel}</span>
                        {
                            (iconAfter)&&(
                                <div className='element-after-box' style={style?.iconAfter}>
                                    {iconAfter}
                                </div>
                            )
                        }
                    </div>
                )
            }
            
            {
                (onClickRemove)&&(
                    <IconButton
                        className='remove-tag-button'
                        appearance='subtle'
                        style={style?.removeButton}
                        shape={shape}
                        icon={<PiXBold/>}
                        txtLabel={`Remove ${txtLabel}`}
                        onClick={(e)=>{onClickRemove(e, txtLabel)}}
                        isShowtooltip={false}
                        isDisabled={isDisabled}
                    />
                )
            }
        </div>
    )
}

export default Tag

interface _Tag{
    className?:string,
    style?:tagStyleType,
    shape?:globalShapeType,
    appearance?:globalAppearanceType;
    txtLabel:string,
    onClick?:(e:React.MouseEvent<HTMLButtonElement, MouseEvent>, txtLabel:string)=>void,
    onClickRemove?:(e:React.MouseEvent<HTMLButtonElement, MouseEvent>, txtLabel:string)=>void,
    isDisabled?:boolean,
    iconBefore?:JSX.Element,
    iconAfter?:JSX.Element,
}

type tagStyleType = {
    tagContainer?:React.CSSProperties,
    textLabel?:React.CSSProperties,
    iconBefore?:React.CSSProperties,
    iconAfter?:React.CSSProperties,
    removeButton?:buttonStyleType
}
import{j as e,r as s,K as L,I as h,Q as g,O as j,f as v}from"./index-CnHM78Nl.js";import{u as m,b as c}from"./index-B6hgvCtH.js";import{T as u}from"./index-QX6N4i8G.js";import{I as o}from"./index-DoHxCD7J.js";import{P as p}from"./preview-box-CMnj9gMm.js";import{I as r}from"./index-BKqCJOVt.js";import{T as F}from"./index-pWiC8YFg.js";/* empty css               */import"./helper-D8J10eng.js";const S="input-tag",d={name:"Input Selection",path:"/input-selection"},x={name:"Input Text",path:"/input-text"},V=[{id:"preview",txtLabel:"Input Selection",isSub:!1},{id:"api_ref",txtLabel:"API Refrence",isSub:!1},{id:"api_ref_1",txtLabel:"InputSelection",isSub:!0},{id:"example",txtLabel:"Example",isSub:!1},{id:"example_0",txtLabel:"Disabled field",isSub:!0},{id:"example_1",txtLabel:"Allow space on tag",isSub:!0},{id:"example_2",txtLabel:"Show sugestion or options",isSub:!0},{id:"example_3",txtLabel:"Validating value",isSub:!0},{id:"keyboard",txtLabel:"Keyboard Interactions",isSub:!1}],C=[{key:"key",txtLabel:"Key",size:{min:"100px",size:"1fr"}},{key:"description",txtLabel:"Description",size:{min:"400px",size:"1fr"}}],_=[{id:"1",key:e.jsx(u,{txtLabel:"Space"}),description:e.jsxs("p",{children:["When focus is on an ",e.jsx("span",{className:"text-code",children:"Button"}),", press and do the ",e.jsx("span",{className:"text-code",children:"onClick"})," function."]})},{id:"2",key:e.jsx(u,{txtLabel:"Enter"}),description:e.jsxs("p",{children:["When focus is on an ",e.jsx("span",{className:"text-code",children:"Button"}),", press and do the ",e.jsx("span",{className:"text-code",children:"onClick"})," function."]})},{id:"3",key:e.jsx(u,{txtLabel:"Tab"}),description:e.jsx("p",{children:"Moves focus to the next focusable element."})}],E=[{key:"prop",txtLabel:"Prop",size:{min:"140px",size:"0.5fr"}},{key:"type",txtLabel:"Type",size:{min:"220px",size:"1fr"}},{key:"default",txtLabel:"Default",size:{min:"100px",size:"0.3fr"}}],w=[{id:"1",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"id"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"string"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"2",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"className"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"string"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"3",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"shape"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"globalShapeType"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"4",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"afterElement"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"React.ReactNode"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"5",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"beforeElement"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"React.ReactNode"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"6",prop:e.jsxs("p",{style:{fontFamily:"monospace"},children:["type",e.jsx("span",{style:{color:"var(--clr-danger-700)"},children:" *"})]}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"inputTagType"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:'"text-no-space"'})},{id:"7",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"txtPlaceholder"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"string"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"8",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"options"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"optionItemType[]"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"9",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"value"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"string[]"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"10",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"isDisabled"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"boolean"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"11",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"onChange"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"function (newValue, addedValue, event) => void"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"12",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"onBlur"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"function (event, inputValue) => void"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"13",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"onFocus"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"function (event, inputValue) => void"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"14",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"error"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"fieldErrorType"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"15",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"onValidate"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"function (error, newValue) => void"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"16",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"config"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"inputTagConfigType"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})}],k=()=>{const[t,a]=s.useState([]);return e.jsxs("div",{style:{display:"grid",gap:"var(--space-100)",marginTop:"var(--space-300)",alignItems:"center"},children:[e.jsx(p,{children:e.jsx(r,{type:"text-no-space",txtPlaceholder:"Enter tag...",value:t,onChange:n=>{a(n)}})}),e.jsx(o,{lang:"tsx",isDisabled:!0,value:N,style:{inputCode:{maxHeight:"50vh"}}})]})},N=`import { useState } from "react"
import InputCode from "src/components/ui/input-code"

const InputSelectionDemo = () =>{

    const [value, setValue] = useState<string[]>([])

    return(
        <InputTag
            type="text-no-space"
            txtPlaceholder="Enter tag..."
            value={value}
            onChange={(newValue)=>{setValue(newValue)}}
        />
    )
}`,P=()=>{const{setSectionRef:t}=m(),a=s.useMemo(()=>E,[]),n=s.useMemo(()=>w,[]);return e.jsxs(e.Fragment,{children:[e.jsx("div",{id:"api_ref",ref:t("api_ref"),children:e.jsx("p",{className:"text-title-xl",children:"API Reference"})}),e.jsxs("div",{id:"api_ref_1",ref:t("api_ref_1"),style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{className:"text-title-lg",children:e.jsx("span",{className:"text-title-lg text-code",children:"InputTag"})}),e.jsx("p",{children:"Text input specifically function for inputing value, usualy list of string as tags."}),e.jsx(F,{tableColumn:a,tableData:n})]})]})},D=()=>{const{setSectionRef:t}=m(),a=s.useMemo(()=>["option-1","option-2","option-4"],[]),[n,l]=s.useState([]),[y,f]=s.useState([]),[I,T]=s.useState({isError:!1,errorMessage:""});return e.jsxs(e.Fragment,{children:[e.jsx("div",{id:"example",ref:t("example"),children:e.jsx("p",{className:"text-title-xl",children:"Example"})}),e.jsxs("div",{id:"example_0",ref:t("example_0"),style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{className:"text-title-lg",children:"Disabled field"}),e.jsxs("p",{children:["Input field can be disabled with ",e.jsx("span",{className:"text-code",children:"isDisabled"})," props."]}),e.jsxs("div",{style:{display:"grid",gap:"var(--space-100)",marginTop:"var(--space-100)",alignItems:"center"},children:[e.jsx(p,{children:e.jsx(r,{type:"text-no-space",txtPlaceholder:"Enter tag...",value:a,isDisabled:!0})}),e.jsx(o,{lang:"tsx",isDisabled:!0,value:R,style:{inputCode:{maxHeight:"50vh"}}})]})]}),e.jsxs("div",{id:"example_1",ref:t("example_1"),style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{className:"text-title-lg",children:"Allow space on tag"}),e.jsx("p",{children:"Insome usecase, tag need to be readable and writen as regular text with spaces."}),e.jsxs("div",{style:{display:"grid",gap:"var(--space-100)",marginTop:"var(--space-100)",alignItems:"center"},children:[e.jsx(p,{children:e.jsx(r,{type:"text",txtPlaceholder:"Enter tag...",value:n,onChange:i=>{l(i)}})}),e.jsx(o,{lang:"tsx",isDisabled:!0,value:$,style:{inputCode:{maxHeight:"50vh"}}})]})]}),e.jsxs("div",{id:"example_2",ref:t("example_2"),style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{className:"text-title-lg",children:"Show sugestion or options"}),e.jsx("p",{children:"Add sugestion option feature when typing tag."}),e.jsxs("div",{style:{display:"grid",gap:"var(--space-100)",marginTop:"var(--space-100)",alignItems:"center"},children:[e.jsx(p,{children:e.jsx(r,{type:"text-no-space",txtPlaceholder:"Enter tag...",options:b,value:y,onChange:i=>{f(i)}})}),e.jsx(o,{lang:"tsx",isDisabled:!0,value:z,style:{inputCode:{maxHeight:"50vh"}}})]})]}),e.jsxs("div",{id:"example_3",ref:t("example_3"),style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{className:"text-title-lg",children:"Validating value"}),e.jsxs("p",{children:["Validation can be configure inside ",e.jsx("span",{children:"config"})," props."]}),e.jsxs("div",{style:{display:"grid",gap:"var(--space-100)",marginTop:"var(--space-100)",alignItems:"center"},children:[e.jsxs(p,{children:[e.jsx("p",{children:"Please enter at least 3 item"}),e.jsx(r,{type:"text-no-space",txtPlaceholder:"Enter tag...",options:b,value:y,onChange:i=>{f(i)},onValidate:i=>{T(i)},error:I,config:{isRequired:!0,maxValue:3,minValue:2}})]}),e.jsx(o,{lang:"tsx",isDisabled:!0,value:A,style:{inputCode:{maxHeight:"50vh"}}})]})]})]})},R=`<InputTag
    type="text-no-space"
    txtPlaceholder="Enter tag..."
    value={value}
    isDisabled={true}
/>`,$=`<InputTag
    type="text"
    txtPlaceholder="Enter tag..."
    value={value}
    onChange={(newValue)=>{setValue(newValue)}}
/>`,z=`import { useState } from "react"
import InputTag from "src/components/ui/input-tag"
import type { optionItemType } from "src/components/_types"

const InputTagDemo = () =>{

    const [value, setValue] = useState<string>('')
    const option:optionItemType[] = [
        {id:'html', txtLabel:'html', type:'option'},
        {id:'css', txtLabel:'css', type:'option'},
        {id:'javascript', txtLabel:'javascript', type:'option'},
        {id:'react', txtLabel:'react', type:'option'},
    ]

    return(
        <>
            <InputTag
                type="text-no-space"
                txtPlaceholder="Enter tag..."
                options={option}
                value={value}
                onChange={(newValue)=>{setValue(newValue)}}
            />
        </>
    )
}`,A=`import { useState } from "react"
import InputTag from "src/components/ui/input-tag"
import type { fieldErrorType } from "src/components/_types"

const InputTagDemo = () =>{

    const [value, setValue] = useState<string>('')
    const [valueError, setValueError] = useState<fieldErrorType>({isError:false, errorMessage:''})
    const option:optionItemType[] = [
        {id:'html', txtLabel:'html', type:'option'},
        {id:'css', txtLabel:'css', type:'option'},
        {id:'javascript', txtLabel:'javascript', type:'option'},
        {id:'react', txtLabel:'react', type:'option'},
    ]

    return(
        <>
            <p>Please enter at least 3 item</p>
            <InputTag
                type="text-no-space"
                txtPlaceholder="Enter tag..."
                options={option}
                value={value}
                onChange={(newValue)=>{setValue(newValue)}}
                onValidate={(error)=>{setValueError(error)}}
                error={valueError}
                config={{
                    isRequired:true,
                    maxValue:3,
                    minValue:2
                }}
            />
        </>
    )
}`,b=[{id:"html",txtLabel:"html",type:"option"},{id:"css",txtLabel:"css",type:"option"},{id:"javascript",txtLabel:"javascript",type:"option"},{id:"react",txtLabel:"react",type:"option"}],B=()=>{const{setSectionRef:t}=m(),a=s.useMemo(()=>C,[]),n=s.useMemo(()=>_,[]);return e.jsxs(e.Fragment,{children:[e.jsx("div",{id:"keyboard",ref:t("keyboard"),children:e.jsx("p",{className:"text-title-xl",children:"Keyboard Interactions"})}),e.jsxs("div",{style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{children:"This component have several keyboard interaction for accesibility."}),e.jsx(F,{tableColumn:a,tableData:n})]})]})},J=()=>{const{setSectionList:t,setSectionRef:a,setPageOn:n}=m(),l=L();return s.useEffect(()=>{n(S),t(V)},[]),e.jsxs("div",{style:{display:"grid",gap:"var(--space-400)"},children:[e.jsxs("div",{id:"preview",ref:a("preview"),style:{display:"grid",gap:"var(--space-100)",alignItems:"center"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsx("p",{className:"text-title-xl",children:"Input Tag"}),e.jsxs("div",{style:{display:"flex",gap:"var(--space-100)"},children:[e.jsx(h,{icon:e.jsx(g,{className:"global-icon"}),txtLabel:`to ${d.name}`,onClick:()=>{l(`${c}${d.path}`)}}),e.jsx(h,{icon:e.jsx(j,{className:"global-icon"}),txtLabel:`to ${x.name}`,onClick:()=>{l(`${c}${x.path}`)}})]})]}),e.jsx("p",{children:"Input form for tag value."}),e.jsx(k,{})]}),e.jsx(P,{}),e.jsx(D,{}),e.jsx(B,{}),e.jsxs("div",{style:{display:"flex",gap:"var(--space-25)",justifyContent:"space-between",marginTop:"var(--space-500)"},children:[e.jsx(v,{iconBefore:e.jsx(g,{className:"global-icon"}),txtLabel:`${d.name}`,onClick:()=>{l(`${c}${d.path}`)}}),e.jsx(v,{iconAfter:e.jsx(j,{className:"global-icon"}),txtLabel:`${x.name}`,onClick:()=>{l(`${c}${x.path}`)}})]})]})};export{J as default};

import{j as e,r as i,K as F,I as y,Q as f,O as h,f as j}from"./index-DkxoG2XB.js";import{u as m,b as c}from"./index-DNmsf-4V.js";import{T as u}from"./index-DKsQXm-c.js";import{I as a}from"./index-0Xldjh2I.js";import{P as p}from"./preview-box-DEc_7Bqn.js";import{I as r}from"./index-Cguuv9Y3.js";import{T as v}from"./index-BsYtXUOb.js";/* empty css               */import"./helper-D8J10eng.js";import"./index-DAOBO2BM.js";const I="input-selection",d={name:"Input Password",path:"/input-password"},x={name:"Input Tag",path:"/input-tag"},C=[{id:"preview",txtLabel:"Input Selection",isSub:!1},{id:"api_ref",txtLabel:"API Refrence",isSub:!1},{id:"api_ref_1",txtLabel:"InputSelection",isSub:!0},{id:"example",txtLabel:"Example",isSub:!1},{id:"example_0",txtLabel:"Disabled field",isSub:!0},{id:"example_1",txtLabel:"Multiple selection",isSub:!0},{id:"example_2",txtLabel:"Combobox",isSub:!0},{id:"example_3",txtLabel:"Validating value",isSub:!0},{id:"keyboard",txtLabel:"Keyboard Interactions",isSub:!1}],V=[{key:"key",txtLabel:"Key",size:{min:"100px",size:"1fr"}},{key:"description",txtLabel:"Description",size:{min:"400px",size:"1fr"}}],_=[{id:"1",key:e.jsx(u,{txtLabel:"Space"}),description:e.jsxs("p",{children:["When focus is on an ",e.jsx("span",{className:"text-code",children:"Button"}),", press and do the ",e.jsx("span",{className:"text-code",children:"onClick"})," function."]})},{id:"2",key:e.jsx(u,{txtLabel:"Enter"}),description:e.jsxs("p",{children:["When focus is on an ",e.jsx("span",{className:"text-code",children:"Button"}),", press and do the ",e.jsx("span",{className:"text-code",children:"onClick"})," function."]})},{id:"3",key:e.jsx(u,{txtLabel:"Tab"}),description:e.jsx("p",{children:"Moves focus to the next focusable element."})}],w=[{key:"prop",txtLabel:"Prop",size:{min:"140px",size:"0.5fr"}},{key:"type",txtLabel:"Type",size:{min:"220px",size:"1fr"}},{key:"default",txtLabel:"Default",size:{min:"100px",size:"0.3fr"}}],N=[{id:"1",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"id"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"string"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"2",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"className"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"string"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"3",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"style"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"inputSelectionStyleType"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"4",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"shape"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"globalShapeType"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"5",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"afterElement"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"React.ReactNode"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"6",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"beforeElement"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"React.ReactNode"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"7",prop:e.jsxs("p",{style:{fontFamily:"monospace"},children:["type",e.jsx("span",{style:{color:"var(--clr-danger-700)"},children:" *"})]}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"inputSelectType"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"8",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"txtPlaceholder"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"string"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"9",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"isDisabled"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"boolean"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"10",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"option"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"optionItemType[]"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"11",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"value"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"string[]"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"12",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"onChange"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"function (newValue, option, event) => void"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"13",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"error"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"fieldErrorType"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"14",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"onValidate"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"function (error, newValue)=>void"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"15",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"config"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"inputSelectConfigType"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})}],P=()=>{const[t,n]=i.useState([]);return e.jsxs("div",{style:{display:"grid",gap:"var(--space-100)",marginTop:"var(--space-300)",alignItems:"center"},children:[e.jsx(p,{children:e.jsx(r,{type:"single",txtPlaceholder:"Select option...",option:O,value:t,onChange:o=>{n(o)}})}),e.jsx(a,{lang:"tsx",isDisabled:!0,value:T,style:{inputCode:{maxHeight:"50vh"}}})]})},T=`import { useState } from "react"
import type { optionItemType } from "src/components/_types"
import InputSelection from "src/components/ui/input-selection"

const InputSelectionDemo = () =>{

    const [value, setValue] = useState<string[]>([])
    const option:optionItemType[] = [
        {id:'option-1', txtLabel:'Option one', type:'option'},
        {id:'option-2', txtLabel:'Option two', type:'option'},
        {id:'option-3', txtLabel:'Option three', type:'option'},
        {id:'option-4', txtLabel:'Option four', type:'option'},
    ]

    return(
        <InputSelection
            type="single"
            txtPlaceholder="Select option..."
            option={option}
            value={value}
            onChange={(newValue)=>{setValue(newValue)}}
        />
    )
}`,O=[{id:"option-1",txtLabel:"Option one",type:"option"},{id:"option-2",txtLabel:"Option two",type:"option"},{id:"option-3",txtLabel:"Option three",type:"option"},{id:"option-4",txtLabel:"Option four",type:"option"}],k=()=>{const{setSectionRef:t}=m(),n=i.useMemo(()=>w,[]),o=i.useMemo(()=>N,[]);return e.jsxs(e.Fragment,{children:[e.jsx("div",{id:"api_ref",ref:t("api_ref"),children:e.jsx("p",{className:"text-title-xl",children:"API Reference"})}),e.jsxs("div",{id:"api_ref_1",ref:t("api_ref_1"),style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{className:"text-title-lg",children:e.jsx("span",{className:"text-title-lg text-code",children:"InputSelection"})}),e.jsx("p",{children:"Input field specifically function for inputing value from options."}),e.jsx(v,{tableColumn:n,tableData:o})]})]})},D=()=>{const{setSectionRef:t}=m(),n=i.useMemo(()=>["option-1","option-2","option-4"],[]),[o,s]=i.useState([]),[S,L]=i.useState({isError:!1,errorMessage:""});return e.jsxs(e.Fragment,{children:[e.jsx("div",{id:"example",ref:t("example"),children:e.jsx("p",{className:"text-title-xl",children:"Example"})}),e.jsxs("div",{id:"example_0",ref:t("example_0"),style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{className:"text-title-lg",children:"Disabled field"}),e.jsxs("p",{children:["Input field can be disabled with ",e.jsx("span",{className:"text-code",children:"isDisabled"})," props."]}),e.jsxs("div",{style:{display:"grid",gap:"var(--space-100)",marginTop:"var(--space-100)",alignItems:"center"},children:[e.jsx(p,{children:e.jsx(r,{type:"single",txtPlaceholder:"Select option...",option:b,value:n,isDisabled:!0})}),e.jsx(a,{lang:"tsx",isDisabled:!0,value:E,style:{inputCode:{maxHeight:"50vh"}}})]})]}),e.jsxs("div",{id:"example_1",ref:t("example_1"),style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{className:"text-title-lg",children:"Multiple selection"}),e.jsxs("p",{children:[e.jsx("span",{className:"text-code",children:"InputSelection"})," can also allow multiple selection for the value using value ",e.jsx("span",{className:"text-code",children:"multiple"})," on ",e.jsx("span",{className:"text-code",children:"type"})," props."]}),e.jsxs("div",{style:{display:"grid",gap:"var(--space-100)",marginTop:"var(--space-100)",alignItems:"center"},children:[e.jsx(p,{children:e.jsx(r,{type:"multiple",txtPlaceholder:"Select option...",option:b,value:o,onChange:l=>{s(l)}})}),e.jsx(a,{lang:"tsx",isDisabled:!0,value:R,style:{inputCode:{maxHeight:"50vh"}}})]})]}),e.jsxs("div",{id:"example_2",ref:t("example_2"),style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{className:"text-title-lg",children:"Combobox"}),e.jsx("p",{children:"Add search option feature."}),e.jsxs("div",{style:{display:"grid",gap:"var(--space-100)",marginTop:"var(--space-100)",alignItems:"center"},children:[e.jsx(p,{children:e.jsx(r,{type:"multiple",txtPlaceholder:"Select option...",option:g,value:o,onChange:l=>{s(l)},config:{isCombobox:!0}})}),e.jsx(a,{lang:"tsx",isDisabled:!0,value:M,style:{inputCode:{maxHeight:"50vh"}}})]})]}),e.jsxs("div",{id:"example_3",ref:t("example_3"),style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{className:"text-title-lg",children:"Validating value"}),e.jsxs("p",{children:["Validation can be configure inside ",e.jsx("span",{children:"config"})," props."]}),e.jsxs("div",{style:{display:"grid",gap:"var(--space-100)",marginTop:"var(--space-100)",alignItems:"center"},children:[e.jsxs(p,{children:[e.jsx("p",{children:"Please select at least 3 item"}),e.jsx(r,{type:"multiple",txtPlaceholder:"Select option...",option:g,value:o,onChange:l=>{s(l)},onValidate:l=>{L(l)},error:S,config:{isCombobox:!0,isRequired:!0,minValue:3,maxValue:5}})]}),e.jsx(a,{lang:"tsx",isDisabled:!0,value:$,style:{inputCode:{maxHeight:"50vh"}}})]})]})]})},E=`<InputSelection
    type="single"
    txtPlaceholder="Select option..."
    option={option}
    value={valueConst}
    isDisabled={true}
/>`,R=`<InputSelection
    type="multiple"
    txtPlaceholder="Select option..."
    option={optionMany}
    value={value}
    onChange={(newValue)=>{setValue(newValue)}}
/>`,M=`<InputSelection
    type="multiple"
    txtPlaceholder="Select option..."
    option={option}
    value={value}
    onChange={(newValue)=>{setValue(newValue)}}
    config={{
        isCombobox:true // to add search option feature
    }}
/>`,$=`import { useState } from "react"
import InputPassword from "src/components/ui/input-password"
import type { fieldErrorType } from "src/components/_types"

const InputPasswordDemo = () =>{

    const [value, setValue] = useState<string>('')
    const [valueError, setValueError] = useState<fieldErrorType>({isError:false, errorMessage:''})

    return(
        <>
            <p>Please select at least 3 item</p>
            <InputSelection
                type="multiple"
                txtPlaceholder="Select option..."
                option={optionMany}
                value={value}
                onChange={(newValue)=>{setValue(newValue)}}
                onValidate={(error)=>{setValueError(error)}}
                error={valueError}
                config={{
                    isCombobox:true,
                    isRequired:true,
                    minValue:3,
                    maxValue:5,
                }}
            />
        </>
    )
}`,b=[{id:"option-1",txtLabel:"Option one",type:"option"},{id:"option-2",txtLabel:"Option two",type:"option"},{id:"option-3",txtLabel:"Option three",type:"option"},{id:"option-4",txtLabel:"Option four",type:"option"}],g=[{id:"option-1",txtLabel:"Option one",type:"option"},{id:"option-2",txtLabel:"Option two",type:"option"},{id:"option-3",txtLabel:"Option three",type:"option"},{id:"option-4",txtLabel:"Option four",type:"option"},{id:"option-5",txtLabel:"Option five",type:"option"},{id:"option-6",txtLabel:"Option six",type:"option"},{id:"option-7",txtLabel:"Option seven",type:"option"},{id:"option-8",txtLabel:"Option eight",type:"option"},{id:"option-9",txtLabel:"Option nine",type:"option"},{id:"option-10",txtLabel:"Option ten",type:"option"}],z=()=>{const{setSectionRef:t}=m(),n=i.useMemo(()=>V,[]),o=i.useMemo(()=>_,[]);return e.jsxs(e.Fragment,{children:[e.jsx("div",{id:"keyboard",ref:t("keyboard"),children:e.jsx("p",{className:"text-title-xl",children:"Keyboard Interactions"})}),e.jsxs("div",{style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{children:"This component have several keyboard interaction for accesibility."}),e.jsx(v,{tableColumn:n,tableData:o})]})]})},X=()=>{const{setSectionList:t,setSectionRef:n,setPageOn:o}=m(),s=F();return i.useEffect(()=>{o(I),t(C)},[]),e.jsxs("div",{style:{display:"grid",gap:"var(--space-400)"},children:[e.jsxs("div",{id:"preview",ref:n("preview"),style:{display:"grid",gap:"var(--space-100)",alignItems:"center"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsx("p",{className:"text-title-xl",children:"Input Selection"}),e.jsxs("div",{style:{display:"flex",gap:"var(--space-100)"},children:[e.jsx(y,{icon:e.jsx(f,{className:"global-icon"}),txtLabel:`to ${d.name}`,onClick:()=>{s(`${c}${d.path}`)}}),e.jsx(y,{icon:e.jsx(h,{className:"global-icon"}),txtLabel:`to ${x.name}`,onClick:()=>{s(`${c}${x.path}`)}})]})]}),e.jsx("p",{children:"Input form for selection of options."}),e.jsx(P,{})]}),e.jsx(k,{}),e.jsx(D,{}),e.jsx(z,{}),e.jsxs("div",{style:{display:"flex",gap:"var(--space-25)",justifyContent:"space-between",marginTop:"var(--space-500)"},children:[e.jsx(j,{iconBefore:e.jsx(f,{className:"global-icon"}),txtLabel:`${d.name}`,onClick:()=>{s(`${c}${d.path}`)}}),e.jsx(j,{iconAfter:e.jsx(h,{className:"global-icon"}),txtLabel:`${x.name}`,onClick:()=>{s(`${c}${x.path}`)}})]})]})};export{X as default};

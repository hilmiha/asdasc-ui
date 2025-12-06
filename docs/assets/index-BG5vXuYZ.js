import{j as e,r as n,K as b,I as u,Q as y,O as f,f as h}from"./index-DkxoG2XB.js";import{u as c,b as o}from"./index-DNmsf-4V.js";import{T as x}from"./index-DKsQXm-c.js";import{I as i}from"./index-0Xldjh2I.js";import{P as m}from"./preview-box-DEc_7Bqn.js";import{T as j}from"./index-BsYtXUOb.js";/* empty css               */const C="input-code",r={name:"Icon Button",path:"/icon-button"},p={name:"Input Color",path:"/input-color"},F=[{id:"preview",txtLabel:"Input Code",isSub:!1},{id:"api_ref",txtLabel:"API Refrence",isSub:!1},{id:"api_ref_1",txtLabel:"InputCode",isSub:!0},{id:"example",txtLabel:"Example",isSub:!1},{id:"example_0",txtLabel:"Disabled",isSub:!0},{id:"example_2",txtLabel:"Validating value",isSub:!0},{id:"keyboard",txtLabel:"Keyboard Interactions",isSub:!1}],I=[{key:"key",txtLabel:"Key",size:{min:"100px",size:"1fr"}},{key:"description",txtLabel:"Description",size:{min:"400px",size:"1fr"}}],E=[{id:"1",key:e.jsx(x,{txtLabel:"Space"}),description:e.jsxs("p",{children:["When focus is on an ",e.jsx("span",{className:"text-code",children:"Button"}),", press and do the ",e.jsx("span",{className:"text-code",children:"onClick"})," function."]})},{id:"2",key:e.jsx(x,{txtLabel:"Enter"}),description:e.jsxs("p",{children:["When focus is on an ",e.jsx("span",{className:"text-code",children:"Button"}),", press and do the ",e.jsx("span",{className:"text-code",children:"onClick"})," function."]})},{id:"3",key:e.jsx(x,{txtLabel:"Tab"}),description:e.jsx("p",{children:"Moves focus to the next focusable element."})}],S=[{key:"prop",txtLabel:"Prop",size:{min:"140px",size:"0.5fr"}},{key:"type",txtLabel:"Type",size:{min:"220px",size:"1fr"}},{key:"default",txtLabel:"Default",size:{min:"100px",size:"0.3fr"}}],L=[{id:"1",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"lang"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"inputCodeLanguageType"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:'"text"'})},{id:"2",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"className"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"string"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"3",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"style"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"inputCodeStyleType"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"4",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"shape"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"globalShapeType"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"5",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"txtPlaceholder"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"string"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"6",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"value"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"string"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"7",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"isDisabled"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"boolean"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"8",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"onChange"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"function (newValue) => void"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"9",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"onBlur"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"(event, value) => void"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"10",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"onFocus"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"(event, value) => void"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"11",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"error"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"fieldErrorType"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"12",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"onValidate"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"function (error, value) => void"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"13",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"config"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"inputCodeConfigType"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})}],T=()=>{const[t,s]=n.useState("");return e.jsxs("div",{style:{display:"grid",gap:"var(--space-100)",marginTop:"var(--space-300)",alignItems:"center"},children:[e.jsx(m,{children:e.jsx(i,{txtPlaceholder:"Enter code...",value:t,onChange:a=>{s(a)},style:{codeEditorBox:{maxHeight:"240px"}}})}),e.jsx(i,{lang:"tsx",isDisabled:!0,value:k,style:{inputCode:{maxHeight:"50vh"}}})]})},k=`import { useState } from "react"
import InputCode from "src/components/ui/input-code"

const InputCodeDemo = () =>{

    const [value, setValue] = useState<string>('')

    return(
        <InputCode
            txtPlaceholder="Enter code..."
            value={value}
            onChange={(newValue)=>{setValue(newValue)}}
            style={{
                codeEditorBox:{
                    maxHeight:'240px'
                }
            }}
        />
    )
}`,V=()=>{const{setSectionRef:t}=c(),s=n.useMemo(()=>S,[]),a=n.useMemo(()=>L,[]);return e.jsxs(e.Fragment,{children:[e.jsx("div",{id:"api_ref",ref:t("api_ref"),children:e.jsx("p",{className:"text-title-xl",children:"API Reference"})}),e.jsxs("div",{id:"api_ref_1",ref:t("api_ref_1"),style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{className:"text-title-lg",children:e.jsx("span",{className:"text-title-lg text-code",children:"InputCode"})}),e.jsx("p",{children:"Text input specifically function for inputing code text."}),e.jsx(j,{tableColumn:s,tableData:a})]})]})},_=()=>{const{setSectionRef:t}=c(),s=n.useMemo(()=>N,[]),[a,l]=n.useState(""),[g,v]=n.useState({isError:!1,errorMessage:""});return e.jsxs(e.Fragment,{children:[e.jsx("div",{id:"example",ref:t("example"),children:e.jsx("p",{className:"text-title-xl",children:"Example"})}),e.jsxs("div",{id:"example_0",ref:t("example_0"),style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{className:"text-title-lg",children:"Disabled field"}),e.jsxs("p",{children:["Input field can be disabled with ",e.jsx("span",{className:"text-code",children:"isDisabled"})," props."]}),e.jsxs("div",{style:{display:"grid",gap:"var(--space-100)",marginTop:"var(--space-100)",alignItems:"center"},children:[e.jsx(m,{children:e.jsx(i,{lang:"html",txtPlaceholder:"Enter code...",value:s,isDisabled:!0})}),e.jsx(i,{lang:"tsx",isDisabled:!0,value:P,style:{inputCode:{maxHeight:"50vh"}}})]})]}),e.jsxs("div",{id:"example_2",ref:t("example_2"),style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{className:"text-title-lg",children:"Validating value"}),e.jsxs("p",{children:["Validation can be configure inside ",e.jsx("span",{children:"config"})," props."]}),e.jsxs("div",{style:{display:"grid",gap:"var(--space-100)",marginTop:"var(--space-100)",alignItems:"center"},children:[e.jsx(m,{children:e.jsx(i,{lang:"html",txtPlaceholder:"Enter code...",value:a,onChange:d=>{l(d)},onValidate:d=>{v(d)},error:g,config:{isRequired:!0}})}),e.jsx(i,{lang:"tsx",isDisabled:!0,value:D,style:{inputCode:{maxHeight:"50vh"}}})]})]})]})},N=`<html>
    <head>
        <title>Page Title</title>
    </head>
    <body>
        <h1>This is a Heading</h1>
        <p>This is a paragraph.</p>
    </body>
</html>`,P=`<InputCode
    lang="html"
    txtPlaceholder="Enter code..."
    value={value}
    isDisabled={true}
/>`,D=`import { useState } from "react"
import InputCode from "src/components/ui/input-code"
import type { fieldErrorType } from "src/components/_types"

const InputPasswordDemo = () =>{

    const [value, setValue] = useState<string>('')
    const [valueError, setValueError] = useState<fieldErrorType>({isError:false, errorMessage:''})

    return(
        <InputCode
            lang="html"
            txtPlaceholder="Enter code..."
            value={value}
            onChange={(newValue)=>{setValue(newValue)}}
            onValidate={(error)=>{setValueError(error)}}
            error={valueError}
            config={{
                isRequired:true,
            }}
        />
    )
}`,w=()=>{const{setSectionRef:t}=c(),s=n.useMemo(()=>I,[]),a=n.useMemo(()=>E,[]);return e.jsxs(e.Fragment,{children:[e.jsx("div",{id:"keyboard",ref:t("keyboard"),children:e.jsx("p",{className:"text-title-xl",children:"Keyboard Interactions"})}),e.jsxs("div",{style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{children:"This component have several keyboard interaction for accesibility."}),e.jsx(j,{tableColumn:s,tableData:a})]})]})},K=()=>{const{setSectionList:t,setSectionRef:s,setPageOn:a}=c(),l=b();return n.useEffect(()=>{a(C),t(F)},[]),e.jsxs("div",{style:{display:"grid",gap:"var(--space-400)"},children:[e.jsxs("div",{id:"preview",ref:s("preview"),style:{display:"grid",gap:"var(--space-100)",alignItems:"center"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsx("p",{className:"text-title-xl",children:"Input Code"}),e.jsxs("div",{style:{display:"flex",gap:"var(--space-100)"},children:[e.jsx(u,{icon:e.jsx(y,{className:"global-icon"}),txtLabel:`to ${r.name}`,onClick:()=>{l(`${o}${r.path}`)}}),e.jsx(u,{icon:e.jsx(f,{className:"global-icon"}),txtLabel:`to ${p.name}`,onClick:()=>{l(`${o}${p.path}`)}})]})]}),e.jsx("p",{children:"Input area for code."}),e.jsx(T,{})]}),e.jsx(V,{}),e.jsx(_,{}),e.jsx(w,{}),e.jsxs("div",{style:{display:"flex",gap:"var(--space-25)",justifyContent:"space-between",marginTop:"var(--space-500)"},children:[e.jsx(h,{iconBefore:e.jsx(y,{className:"global-icon"}),txtLabel:`${r.name}`,onClick:()=>{l(`${o}${r.path}`)}}),e.jsx(h,{iconAfter:e.jsx(f,{className:"global-icon"}),txtLabel:`${p.name}`,onClick:()=>{l(`${o}${p.path}`)}})]})]})};export{K as default};

import{r as c,j as t,J as b,I as u,O as i,f as d}from"./index-BIzDLPgR.js";import{u as p,b as s}from"./index-DfW2Vprn.js";/* empty css               */import{I as g}from"./index-C4fA7XK5.js";import{W as a}from"./index-Bxhr9G34.js";import{P as o}from"./preview-box-fomgYV6r.js";import"./index-1OFBHG92.js";import"./index-DZiD5Iws.js";import"./helper-D8J10eng.js";const h="wysiwyg",r={name:"Tooltip",path:"/tooltip"},k=[{id:"preview",txtLabel:"Wysiwyg",isSub:!1}],m=()=>{const e=c.useMemo(()=>x,[]);return t.jsxs("div",{style:{display:"grid",gap:"var(--space-100)",marginTop:"var(--space-300)",alignItems:"center"},children:[t.jsxs(o,{children:[t.jsx("p",{style:{textAlign:"center",marginBottom:"var(--space-100)"},children:"Classic Looks"}),t.jsx(a,{type:"classic",value:e})]}),t.jsxs(o,{children:[t.jsx("p",{style:{textAlign:"center",marginBottom:"var(--space-100)"},children:"With Floating Toolbar (select text to show toolbar)"}),t.jsx(a,{type:"floating",value:e})]}),t.jsx(g,{lang:"tsx",isDisabled:!0,value:y,style:{inputCode:{maxHeight:"50vh"}}})]})},y="//Documentation in progress",x={ops:[{attributes:{height:"50px",width:"50px",background:"transparent",color:"#21201c"},insert:{image:"https://quilljs.com/assets/images/brand-asset.png"}},{attributes:{align:"center"},insert:`
`},{attributes:{background:"transparent",color:"#000000"},insert:"Delta"},{attributes:{header:1},insert:`
`},{attributes:{background:"transparent",color:"#000000"},insert:"Deltas are a simple, yet expressive format that can be used to describe Quill's contents and changes. The format is a strict subset of JSON, is human readable, and easily parsible by machines. Deltas can describe any Quill document, includes all text and formatting information, without the ambiguity and complexity of HTML."},{insert:`
`},{attributes:{italic:!0,background:"transparent",color:"#2e96ba",bold:!0},insert:"Note"},{attributes:{blockquote:!0},insert:`
`},{attributes:{background:"transparent",color:"#000000"},insert:"Don't be confused by its name "},{attributes:{background:"transparent",color:"#000000",italic:!0},insert:"Delta"},{attributes:{background:"transparent",color:"#000000"},insert:"—Deltas represents both documents and changes to documents. If you think of Deltas as the instructions from going from one document to another, the way Deltas represent a document is by expressing the instructions starting from an empty document."},{attributes:{blockquote:!0},insert:`
`},{attributes:{background:"transparent",color:"#000000"},insert:"Deltas are implemented as a separate "},{attributes:{background:"transparent",color:"#f46b0c",link:"https://github.com/quilljs/delta/"},insert:"standalone library"},{attributes:{background:"transparent",color:"#000000"},insert:", allowing its use outside of Quill. It is suitable for "},{attributes:{background:"transparent",color:"#f46b0c",link:"https://en.wikipedia.org/wiki/Operational_transformation"},insert:"Operational Transform"},{attributes:{background:"transparent",color:"#000000"},insert:" and can be used in realtime, Google Docs like applications. For a more in depth explanation behind Deltas, see "},{attributes:{background:"transparent",color:"#f46b0c",link:"https://quilljs.com/guides/designing-the-delta-format"},insert:"Designing the Delta Format"},{attributes:{background:"transparent",color:"#000000"},insert:"."},{insert:`
`},{attributes:{italic:!0,background:"transparent",color:"#2e96ba",bold:!0},insert:"Note"},{attributes:{blockquote:!0},insert:`
`},{attributes:{background:"transparent",color:"#000000"},insert:"It is not recommended to construct Deltas by hand—rather use the chainable insert(), delete(), and retain() methods to create new Deltas. You can use import() to access Delta from Quill."},{attributes:{blockquote:!0},insert:`
`},{attributes:{background:"#ffffff",color:"#000000"},insert:"Document"},{attributes:{header:2},insert:`
`},{attributes:{background:"#ffffff",color:"#000000"},insert:'The Delta format is almost entirely self-explanatory—the example below describes the string "Gandalf the Grey" where "Gandalf" is bolded and "Grey" is colored #cccccc.'},{insert:`
{`},{attributes:{"code-block":"plain"},insert:`
`},{insert:"  ops: ["},{attributes:{"code-block":"plain"},insert:`
`},{insert:"    { insert: 'Gandalf', attributes: { bold: true } },"},{attributes:{"code-block":"plain"},insert:`
`},{insert:"    { insert: ' the ' },"},{attributes:{"code-block":"plain"},insert:`
`},{insert:"    { insert: 'Grey', attributes: { color: '#cccccc' } }"},{attributes:{"code-block":"plain"},insert:`
`},{insert:"  ]"},{attributes:{"code-block":"plain"},insert:`
`},{insert:"}"},{attributes:{"code-block":"plain"},insert:`
`},{attributes:{background:"#ffffff",color:"#000000"},insert:'As its name would imply, describing content is actually a special case for Deltas. The above example is more specifically instructions to insert a bolded string "Gandalf", an unformatted string " the ", followed by the string "Grey" colored #cccccc. When Deltas are used to describe content, it can be thought of as the content that would be created if the Delta was applied to an empty document.'},{insert:`
`},{attributes:{background:"#ffffff",color:"#000000"},insert:"Since Deltas are a data format, there is no inherent meaning to the values of "},{attributes:{background:"#f1f1f1",color:"#000000",code:!0},insert:"attribute"},{attributes:{background:"#ffffff",color:"#000000"},insert:" keypairs. For example, there is nothing in the Delta format that dictates color value must be in hex—this is a choice that Quill makes, and can be modified if desired with "},{attributes:{background:"#ffffff",color:"#f46b0c",link:"https://github.com/quilljs/parchment/"},insert:"Parchment"},{attributes:{background:"#ffffff",color:"#000000"},insert:"."},{insert:`
`},{attributes:{background:"#ffffff",color:"#000000"},insert:"Embeds"},{attributes:{header:3},insert:`
`},{attributes:{background:"#ffffff",color:"#000000"},insert:"For non-text content such as images or formulas, the insert key can be an object. The object should have one key, which will be used to determine its type. This is the "},{attributes:{background:"#f1f1f1",color:"#000000",code:!0},insert:"blotName"},{attributes:{background:"#ffffff",color:"#000000"},insert:" if you are building custom content with "},{attributes:{background:"#ffffff",color:"#f46b0c",link:"https://github.com/quilljs/parchment/"},insert:"Parchment"},{attributes:{background:"#ffffff",color:"#000000"},insert:". Like text, embeds can still have an "},{attributes:{background:"#f1f1f1",color:"#000000",code:!0},insert:"attributes"},{attributes:{background:"#ffffff",color:"#000000"},insert:" key to describe formatting to be applied to the embed. All embeds have a length of one."},{insert:`
{`},{attributes:{"code-block":"plain"},insert:`
`},{insert:"  ops: [{"},{attributes:{"code-block":"plain"},insert:`
`},{insert:"    // An image link"},{attributes:{"code-block":"plain"},insert:`
`},{insert:"    insert: {"},{attributes:{"code-block":"plain"},insert:`
`},{insert:"      image: 'https://quilljs.com/assets/images/icon.png'"},{attributes:{"code-block":"plain"},insert:`
`},{insert:"    },"},{attributes:{"code-block":"plain"},insert:`
`},{insert:"    attributes: {"},{attributes:{"code-block":"plain"},insert:`
`},{insert:"      link: 'https://quilljs.com'"},{attributes:{"code-block":"plain"},insert:`
`},{insert:"    }"},{attributes:{"code-block":"plain"},insert:`
`},{insert:"  }]"},{attributes:{"code-block":"plain"},insert:`
`},{insert:"}"},{attributes:{"code-block":"plain"},insert:`
`},{attributes:{background:"#ffffff",color:"#000000"},insert:"Line Formatting"},{attributes:{header:3},insert:`
`},{attributes:{background:"#ffffff",color:"#000000"},insert:"Attributes associated with a newline character describes formatting for that line."},{insert:`
{`},{attributes:{"code-block":"plain"},insert:`
`},{insert:"  ops: ["},{attributes:{"code-block":"plain"},insert:`
`},{insert:"    { insert: 'The Two Towers' },"},{attributes:{"code-block":"plain"},insert:`
`},{insert:"    { insert: '\\n', attributes: { header: 1 } },"},{attributes:{"code-block":"plain"},insert:`
`},{insert:"    { insert: 'Aragorn sped on up the hill.\\n' }"},{attributes:{"code-block":"plain"},insert:`
`},{insert:"  ]"},{attributes:{"code-block":"plain"},insert:`
`},{insert:"}"},{attributes:{"code-block":"plain"},insert:`
`},{attributes:{background:"#ffffff",color:"#000000"},insert:"Changes"},{attributes:{header:2},insert:`
`},{attributes:{background:"#ffffff",color:"#000000"},insert:"When you register a listener for Quill's "},{attributes:{color:"#000000"},insert:"text-change"},{attributes:{background:"#ffffff",color:"#000000"},insert:" event, one of the arguments you will get is a Delta describing what changed. In addition to "},{attributes:{background:"#f1f1f1",color:"#000000",code:!0},insert:"insert"},{attributes:{background:"#ffffff",color:"#000000"},insert:" operations, this Delta might also have "},{attributes:{background:"#f1f1f1",color:"#000000",code:!0},insert:"delete"},{attributes:{background:"#ffffff",color:"#000000"},insert:" or "},{attributes:{background:"#f1f1f1",color:"#000000",code:!0},insert:"retain"},{attributes:{background:"#ffffff",color:"#000000"},insert:" operations."},{insert:`
`},{attributes:{background:"#ffffff",color:"#000000"},insert:"Delete"},{attributes:{header:3},insert:`
`},{attributes:{background:"#ffffff",color:"#000000"},insert:"The "},{attributes:{background:"#f1f1f1",color:"#000000",code:!0},insert:"delete"},{attributes:{background:"#ffffff",color:"#000000"},insert:" operation instructs exactly what it implies: delete the next number of characters."},{insert:`
{`},{attributes:{"code-block":"plain"},insert:`
`},{insert:"  ops: ["},{attributes:{"code-block":"plain"},insert:`
`},{insert:"    { delete: 10 } // Delete the next 10 characters"},{attributes:{"code-block":"plain"},insert:`
`},{insert:"  ]"},{attributes:{"code-block":"plain"},insert:`
`},{insert:"}"},{attributes:{"code-block":"plain"},insert:`
`},{attributes:{background:"#ffffff",color:"#000000"},insert:"Since "},{attributes:{background:"#f1f1f1",color:"#000000",code:!0},insert:"delete"},{attributes:{background:"#ffffff",color:"#000000"},insert:" operations do not include "},{attributes:{background:"#ffffff",color:"#000000",italic:!0},insert:"what"},{attributes:{background:"#ffffff",color:"#000000"},insert:" was deleted, a Delta is not reversible."},{insert:`
`},{attributes:{background:"#ffffff",color:"#000000"},insert:"Retain"},{attributes:{header:3},insert:`
`},{attributes:{background:"#ffffff",color:"#000000"},insert:"A "},{attributes:{background:"#f1f1f1",color:"#000000",code:!0},insert:"retain"},{attributes:{background:"#ffffff",color:"#000000"},insert:" operation simply means keep the next number of characters, without modification. If "},{attributes:{background:"#f1f1f1",color:"#000000",code:!0},insert:"attributes"},{attributes:{background:"#ffffff",color:"#000000"},insert:" is specified, it still means keep those characters, but apply the formatting specified by the "},{attributes:{background:"#f1f1f1",color:"#000000",code:!0},insert:"attributes"},{attributes:{background:"#ffffff",color:"#000000"},insert:" object. A "},{attributes:{background:"#f1f1f1",color:"#000000",code:!0},insert:"null"},{attributes:{background:"#ffffff",color:"#000000"},insert:" value for an attributes key is used to specify format removal."},{insert:`
`},{attributes:{background:"#ffffff",color:"#000000"},insert:'Starting with the above "Gandalf the Grey" example:'},{insert:`
// {`},{attributes:{"code-block":"plain"},insert:`
`},{insert:"//   ops: ["},{attributes:{"code-block":"plain"},insert:`
`},{insert:"//     { insert: 'Gandalf', attributes: { bold: true } },"},{attributes:{"code-block":"plain"},insert:`
`},{insert:"//     { insert: ' the ' },"},{attributes:{"code-block":"plain"},insert:`
`},{insert:"//     { insert: 'Grey', attributes: { color: '#cccccc' } }"},{attributes:{"code-block":"plain"},insert:`
`},{insert:"//   ]"},{attributes:{"code-block":"plain"},insert:`
`},{insert:"// }"},{attributes:{"code-block":"plain"},insert:`

`},{insert:"{"},{attributes:{"code-block":"plain"},insert:`
`},{insert:"  ops: ["},{attributes:{"code-block":"plain"},insert:`
`},{insert:'    // Unbold and italicize "Gandalf"'},{attributes:{"code-block":"plain"},insert:`
`},{insert:"    { retain: 7, attributes: { bold: null, italic: true } },"},{attributes:{"code-block":"plain"},insert:`

`},{insert:'    // Keep " the " as is'},{attributes:{"code-block":"plain"},insert:`
`},{insert:"    { retain: 5 },"},{attributes:{"code-block":"plain"},insert:`

`},{insert:'    // Insert "White" formatted with color #fff'},{attributes:{"code-block":"plain"},insert:`
`},{insert:"    { insert: 'White', attributes: { color: '#fff' } },"},{attributes:{"code-block":"plain"},insert:`

`},{insert:'    // Delete "Grey"'},{attributes:{"code-block":"plain"},insert:`
`},{insert:"    { delete: 4 }"},{attributes:{"code-block":"plain"},insert:`
`},{insert:"  ]"},{attributes:{"code-block":"plain"},insert:`
`},{insert:"}"},{attributes:{"code-block":"plain"},insert:`
`},{attributes:{background:"#ffffff",color:"#000000"},insert:"Note that a Delta's instructions always starts at the beginning of the document. And because of plain "},{attributes:{background:"#f1f1f1",color:"#000000",code:!0},insert:"retain"},{attributes:{background:"#ffffff",color:"#000000"},insert:" operations, we never need to specify an index for a "},{attributes:{background:"#f1f1f1",color:"#000000",code:!0},insert:"delete"},{attributes:{background:"#ffffff",color:"#000000"},insert:" or "},{attributes:{background:"#f1f1f1",color:"#000000",code:!0},insert:"insert"},{attributes:{background:"#ffffff",color:"#000000"},insert:" operation."},{insert:`
`}]},C=()=>{const{setSectionList:e,setSectionRef:l,setPageOn:f}=p(),n=b();return c.useEffect(()=>{f(h),e(k)},[]),t.jsxs("div",{style:{display:"grid",gap:"var(--space-400)"},children:[t.jsx("div",{className:"global-radius",style:{backgroundColor:"var(--clr-orange-100)",padding:"var(--space-100) var(--space-200)",border:"1px solid var(--clr-border-orange)"},children:t.jsx("p",{style:{textAlign:"center"},children:t.jsx("strong",{children:"Documentation is in progress 🚧"})})}),t.jsxs("div",{id:"preview",ref:l("preview"),style:{display:"grid",gap:"var(--space-100)",alignItems:"center"},children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[t.jsx("p",{className:"text-title-xl",children:"Wysiwyg"}),t.jsx("div",{style:{display:"flex",gap:"var(--space-25)"},children:t.jsx(u,{icon:t.jsx(i,{className:"global-icon"}),txtLabel:`to ${r.name}`,onClick:()=>{n(`${s}${r.path}`)}})})]}),t.jsx("p",{children:"Text editor"}),t.jsx(m,{})]}),t.jsx("div",{style:{display:"flex",gap:"var(--space-25)",justifyContent:"space-between",marginTop:"var(--space-500)"},children:t.jsx(d,{iconBefore:t.jsx(i,{className:"global-icon"}),txtLabel:`${r.name}`,onClick:()=>{n(`${s}${r.path}`)}})})]})};export{C as default};

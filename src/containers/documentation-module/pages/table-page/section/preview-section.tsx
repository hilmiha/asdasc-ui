import { useEffect, useMemo, useState } from "react"
import { PiCheckCircleBold, PiDotsThreeBold, PiDownloadBold, PiHourglassBold, PiPencilBold, PiTagBold, PiTrashBold, PiXSquareBold } from "react-icons/pi"
import InputCode from "src/components/ui/input-code"
import Table, { type tableColumnType, type tableConfigType, type tableRowDataType } from "src/components/ui/table"
import Tag from "src/components/ui/tag"
import PreviewBox from "src/containers/documentation-module/sections/preview-box"

const PreviewSection = () =>{

    const allDataTable = useMemo(()=>{
        return generateDataDummy(300)
    },[])

    const [tableData, setTableData] = useState<tableRowDataType[]>([])
    const tableColumn = useMemo<tableColumnType[]>(()=>{
        return tableColumnDummy
    },[])

    const [tabelChecked, setTableChecked] = useState<string[]>([])
    
    const [isTableLoading, setIsTableLoading] = useState(false)
    const [tableConfig, setTableConfig] = useState<tableConfigType>({
        maxRow:10,
        currentPage:1,
        countPage:1,
        totalData:0,

        sortBy:'label3',
        isSortDesc:false
    })

    const doGetDataTable = () => {
        setIsTableLoading(true)

        const { maxRow, currentPage, sortBy, isSortDesc } = tableConfig;
        // 1. Sort data
        const sortedData = [...allDataTable].sort((a, b) => {
            const valA = a[sortBy];
            const valB = b[sortBy];

            // Handle if values are numbers or strings
            if (typeof valA === 'number' && typeof valB === 'number') {
                return isSortDesc ? valB - valA : valA - valB;
            }
            return isSortDesc
                ? String(valB).localeCompare(String(valA))
                : String(valA).localeCompare(String(valB));
        });

        // 2. Paginate
        const startIndex = (currentPage - 1) * maxRow;
        const endIndex = startIndex + maxRow;

        setTableConfig((prev) => ({
            ...prev,
            totalData: allDataTable.length,
            countPage: Math.ceil(allDataTable.length / prev.maxRow)
        }));
        
        setTableData(sortedData.slice(startIndex, endIndex))
        setTimeout(() => {
            setIsTableLoading(false)
        }, 800);
    };

    useEffect(()=>{
        doGetDataTable()
    },[JSON.stringify(tableConfig)])

    return(
        <div 
            style={{
                display:'grid',
                gap:'var(--space-100)',
                marginTop:"var(--space-300)",
                alignItems:'center',
            }}
        >
            <PreviewBox>
                <div style={{
                    height:'420px'
                }}>
                    <Table
                        tableData={tableData}
                        tableColumn={tableColumn}
                        tableConfig={tableConfig}

                        isLoading={isTableLoading}
                        isFillContainer={true}
                        
                        onClickSortColumn={(newSortBy, newIsDesc)=>{
                            setTableConfig((prev)=>{
                                const tamp:tableConfigType = {
                                    ...prev,
                                    sortBy:newSortBy,
                                    isSortDesc:newIsDesc
                                }
                                return tamp
                            })
                        }}
                        onSelectMaxRow={(newMaxRow)=>{
                            setTableConfig((prev)=>{
                                const tamp:tableConfigType = {
                                    ...prev,
                                    maxRow:newMaxRow,
                                    currentPage:1
                                }
                                return tamp
                            })
                        }}
                        onClickPagination={(newCurrentPage)=>{
                            setTableConfig((prev)=>{
                                const tamp:tableConfigType = {
                                    ...prev,
                                    currentPage:newCurrentPage
                                }
                                return tamp
                            })
                        }}

                        onClickRow={(rowData:tableRowDataType)=>{console.log(rowData)}}
                        onClickRowAction={(idButton, rowData)=>{
                            console.log(idButton, rowData)
                        }}
                        selectedRow={tabelChecked}
                        onClickRowCheckbox={(selectedList)=>{
                            setTableChecked(selectedList)
                        }}
                        isColumnSwapable={true}
                        isShowFooter={true}
                        isCheckbox={true}
                        isExpandable={true}
                    />
                </div>
                
            </PreviewBox>
            <InputCode
                lang="tsx"
                isDisabled={true}
                value={sampleCode}
                style={{
                    inputCode:{
                        maxHeight:'50vh'
                    }
                }}
            />
        </div>
    )
}

export default PreviewSection


const sampleCode = `//Documentation in progress`

const tableColumnDummy: tableColumnType[] = [
    {key:'label1', txtLable:'Label 1', size:{size:'60%', min:'280px'}, isCanSort:true, horizontalAlign:'start', isDefaultSort:true},
    {key:'label3', txtLable:'Label 3', size:{size:'10%', min:'120px'}, isCanSort:true, horizontalAlign:'end'},
    {key:'label4', txtLable:'Label 4', size:{size:'10%', min:'120px'}, isCanSort:false, horizontalAlign:'start'},
    {key:'action', type:'row-action', txtLable:'Action', size:{size:'0%', min:'154px'}, horizontalAlign:'center', actionButtonList:[
        {id:"edit", type:'button', txtLabel:'Edit', icon:<PiPencilBold className='global-icon'/>},
        {id:"delete", type:'icon-button', txtLabel:'Delete', icon:<PiTrashBold className='global-icon'/>},
        {
            id:"option", 
            type:'dropdown-menu', 
            txtLabel:'Option', 
            icon:<PiDotsThreeBold className='global-icon'/>, 
            option:[
                {
                    id:"download-csv", 
                    txtLabel:"Download as CSV", 
                    icon:<PiDownloadBold className='global-icon'/>,
                },
                {
                    id:"download-xlsx", 
                    txtLabel:"Download as XLSX", 
                    icon:<PiDownloadBold className='global-icon'/>
                }
            ]
        },
    ]},
]

const statuses = [
    { appearance: 'success', label: 'Success', icon: <PiCheckCircleBold className='global-icon'/> },
    { appearance: 'warning', label: 'Pending', icon: <PiHourglassBold className='global-icon'/> },
    { appearance: 'danger', label: 'Canceled', icon: <PiXSquareBold className='global-icon'/> }
];
const generateRandomNumber = (min: number, max: number) => {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
};
const loremText = `Lorem ipsum dolor sit amet`;
const generateDataDummy = (length:number) =>{
    const tableDataDummy: tableRowDataType[] = Array.from({ length: length??25 }, (_, index) => {
        const status = statuses[index % statuses.length];
        const tamp:tableRowDataType = {
            id: String(index + 1),
            label1: [
                `Data Row ${index + 1}`,
                (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-50)' }}>
                        <Tag txtLabel={`tag-${index + 1}`} iconBefore={<PiTagBold className='global-icon' />} onClick={(_, textLabel) => console.log(textLabel)} />
                        <Tag txtLabel={`tag-${index + 10}`} iconBefore={<PiTagBold className='global-icon' />} onClick={(_, textLabel) => console.log(textLabel)} />
                    </div>
                )
            ],
            label2: loremText,
            label3: generateRandomNumber(1000, 1000000),
            label4: (
                <Tag
                    appearance={status.appearance as any}
                    txtLabel={status.label}
                    iconBefore={status.icon}
                />
            ),
            expandedPage:(<TableExpandPage index={index+1}/>)
        }
        return tamp;
    })
    return tableDataDummy
}

const TableExpandPage = ({index}:{index:number}) =>{
    return(
        <div style={{maxHeight:'50vh', overflow:'auto'}}>
            <p>{`helloworld ${index}`}</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae dolorem sunt, nihil facere voluptas natus voluptate eligendi. Minus fuga blanditiis temporibus officiis dolorem iusto voluptate labore, quasi quis mollitia ipsa! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi veritatis consectetur tenetur odit quae, error vel consequuntur distinctio, sit commodi illo architecto facilis sunt? Provident cum corrupti maiores aliquid aspernatur.</p>
        </div>
    )
}
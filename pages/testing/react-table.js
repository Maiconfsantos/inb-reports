import { useTable, useFilters } from 'react-table'
import { useState } from 'react'
const { corpZabbix } = require('../../lib/api')

import tableStyle from '../../components/table.module.css'
import containerStyle from '../../components/container.module.css'

export default function Home({hostsTable}) {

    const filterTypes= {
        text: (rows, id, filterValue) =>{
            return rows.filter(row =>{
                const rowValue = row.values[id];
                return rowValue !== undefined ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase()) : true;
            })
        }
    }

    const ColumnFilter = ({ column: {filterValue, setFilter, filter}}) =>{
        return (
            <input 
                value = {filterValue || ""}
                onChange={e =>{
                    setFilter(e.target.value || undefined);
                }}

                placeholder={`Search ${filter ? filter : ""}...`}
            />
        )
    }

    const defaultColumn = {
        Filter: ColumnFilter
    }
    
    const data = React.useMemo(
        () => hostsTable,
        []
    )

    const columns = React.useMemo(
        () => [
          {
            Header: 'Nome',
            accessor: 'col1', // accessor is the "key" in the data
          },
          {
            Header: 'Descrição',
            accessor: 'col2',
          },
          {
            Header: 'IP',
            accessor: 'col3',
          },
          {
            Header: 'Cidade',
            accessor: 'col4',
          },
          {
            Header: 'Tipo de conexão',
            accessor: 'col5',
          },
        ],
        []
    )

    const tableInstance = useTable({ columns, data, defaultColumn, filterTypes }, useFilters)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = tableInstance


    

    return (
        <div className={containerStyle.body}>
            <table {...getTableBodyProps()} className={tableStyle.table}>
            <thead>
                {
                    headerGroups.map(headerGroup =>(
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column, i) => {
                            // three new addition to column: isSorted, isSortedDesc, getSortByToggleProps
                            const {
                                render,
                                getHeaderProps,
                                isSorted,
                                isSortedDesc,
                                getSortByToggleProps,
                                // filter,
                                canFilter
                            } = column;
                            const extraClass = isSorted
                                ? isSortedDesc
                                ? "desc"
                                : "asc"
                                : "";
                            console.log(render);
                            return (
                                <th
                                key={`th-${i}`}
                                className={tableStyle.th}
                                // getHeaderProps now receives a function
                                >
                                <div>
                                    {render("Header")}   
                                </div>
                                {/* Render the columns filter UI */}
                                <div>{canFilter ? render("Filter") : null}</div>
                                </th>
                            );
                            })}
                        </tr> 
                    ))
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row =>{
                    prepareRow(row)
                    return(
                        <tr {...row.getRowProps()} className={tableStyle.tr}>
                            {row.cells.map(cell =>{
                                return(
                                    <td {...cell.getCellProps()} className={tableStyle.td}>
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
            </table>
        </div>
      )
    
}

export async function getServerSideProps() {

    const res = await fetch(corpZabbix.link+'hosts')
    const hosts = await res.json()

    const hostsTable = hosts.map((host)=>{
        return({
            col1: host.host,
            col2: host.description,
            col3: host.interfaces[0].ip,
            col4: host.Iprangedata.city,
            col5: host.Iprangedata.connection_type
        })
    })

    return {
      props: {
        hostsTable
      }
    }
  }
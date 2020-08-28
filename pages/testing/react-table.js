import { useTable } from 'react-table'
const { corpZabbix } = require('../../lib/api')

import tableStyle from '../../components/table.module.css'
import containerStyle from '../../components/container.module.css'

export default function Home({hostsTable}) {

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

    const tableInstance = useTable({ columns, data })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    

    return (
        <div className={containerStyle.body}>
            <table {...getTableBodyProps()} className={tableStyle.table}>
            <thead>
                {
                    headerGroups.map(headerGroup =>(
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column =>(
                                <th {...column.getHeaderProps()} className={tableStyle.th}>
                                    {
                                        column.render('Header')
                                    }

                                </th>
                            ))}

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
const { corpZabbix } = require('../../lib/api')
import tableStyle from '../../components/table.module.css'
import containerStyle from '../../components/container.module.css'


export default function Home({ hosts }) {
    return (
        <div className={containerStyle.body}>
            <table className={tableStyle.table}>
                <tr>
                    <th className={tableStyle.th}>
                        Nome
                    </th>
                    <th className={tableStyle.th}>
                        Descrição
                    </th>
                    <th className={tableStyle.th}>
                        IP
                    </th>
                </tr>
                {hosts.map( host =>(
                    <tr className={tableStyle.tr}>
                        <td className={tableStyle.td}>
                            {host.host}
                        </td>
                        <td className={tableStyle.td}>
                            {host.description}
                        </td>
                        <td className={tableStyle.td}>
                            {host.interfaces[0].ip}
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    )
}



export async function getServerSideProps() {

    const res = await fetch(corpZabbix.link+'hosts')
    const hosts = await res.json()
    return {
      props: {
        hosts
      }
    }
  }
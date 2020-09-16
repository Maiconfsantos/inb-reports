import 'fontsource-roboto';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'next-auth/client'

export default function App ({ Component, pageProps }) {
  console.log(pageProps)
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}
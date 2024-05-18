import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import store, { persistor } from './redux/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App/>
    </PersistGate>
  </Provider>
)

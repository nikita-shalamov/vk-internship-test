import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import './styles/global.scss'
import './styles/fonts.scss'
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'

createRoot(document.getElementById('root')!).render(
  <ConfigProvider>
    <AdaptivityProvider>
      <App />
    </AdaptivityProvider>
  </ConfigProvider>
)

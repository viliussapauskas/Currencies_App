import { Provider } from 'react-redux'
import { store } from './src/redux/store'
import { Navigator } from './src/react/components/navigator'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { LogBox } from 'react-native'
import { useEffect } from 'react'

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#f4511e',
    },
}

export default function App() {
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
    }, [])
    return (
        <Provider store={store}>
            <PaperProvider theme={theme}>
                <Navigator />
            </PaperProvider>
        </Provider>
    )
}

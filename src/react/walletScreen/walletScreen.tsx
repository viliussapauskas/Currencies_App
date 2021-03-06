import React, { FC, useEffect, useState } from 'react'
import {
    FlatList,
    ListRenderItemInfo,
    RefreshControl,
    View,
} from 'react-native'
import { Divider, Title } from 'react-native-paper'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
    Currency,
    getCurrenciesStateSelector,
    loadCurrenciesAsync,
} from '../../redux/currencies'
import { NavigationProp } from '@react-navigation/native'
import { Layout } from '../components/layout'
import { Spinner } from '../components/spinner'
import { CurrencyRow } from './components'
import { styles } from './styles'

export interface WalletScreenProps {
    navigation: NavigationProp<any, any>
}

export const WalletScreen: FC<WalletScreenProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const { value, status } = useAppSelector(getCurrenciesStateSelector)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        dispatch(loadCurrenciesAsync())
    }, [])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        dispatch(loadCurrenciesAsync()).then(() => setRefreshing(false))
    }, [])

    const renderItem = (currency: ListRenderItemInfo<Currency>) => (
        <CurrencyRow
            currency={currency.item}
            onClick={() =>
                navigation.navigate('Currency', {
                    id: currency.item.id,
                })
            }
        />
    )

    const separator = () => <Divider />

    return (
        <Layout>
            <View style={styles.container} testID="walletScreen">
                {status === 'failed' && <Title>Error occured</Title>}
                {status && status === 'loading' && <Spinner />}
                {value && status == 'idle' && (
                    <View
                        style={{ flex: 1 }}
                        testID="walletScreen.currenciesContainer"
                    >
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                            data={value}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            ItemSeparatorComponent={separator}
                        />
                    </View>
                )}
            </View>
        </Layout>
    )
}

import React, { FC } from 'react'
import { View, Text } from 'react-native'
import { getCurrencyByNameSelector } from '../../redux/currencies'
import { useAppSelector } from '../../redux/hooks'

export interface CurrencyScreenProps {
    route: {
        params: {
            name: string
        }
    }
}

export const CurrencyScreen: FC<CurrencyScreenProps> = ({ route }) => {
    const currency = useAppSelector(
        getCurrencyByNameSelector(route?.params?.name)
    )

    return (
        <View>
            <Text>
                {route?.params?.name} --- {currency?.value}
            </Text>
        </View>
    )
}
import { CardField, useConfirmPayment, useStripe } from '@stripe/stripe-react-native';
import React from 'react';
import {
    ImageBackground,
    View,
    Button
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

const image = require('../assets/images/background.png');
const API_URL = "http://localhost:5000"

export default function PaymentScreen() {
  const { confirmPayment, loading } = useConfirmPayment();

  const handlePress = async () => {
    const response = await fetch(`${API_URL}/api/payments/create-payment-intent`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            guideID: "628ffbbc5d22479fe2cf9c94",
            userID: "6255c0f4c4415f918efc006b"
        })
    })
    const {client_secret} = await response.json();
    const val = "UserID: 6255c0f4c4415f918efc006b, GuideID: 628ffbbc5d22479fe2cf9c94"
    const {error, paymentIntent} = await confirmPayment(client_secret, {
        type: 'Card',
        billingDetails: {val}
    })

    if(error){
        alert("Error")
    }else{
        alert("Success", `Payment successful: ${paymentIntent.id}`)
        await fetch(`${API_URL}/api/payments/payment-check/${paymentIntent.id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }
  }

  return (
    <View style={{ flex: 1 }}>
    <ImageBackground source={image} style={{ flex: 1, resizeMode: 'cover' }}>
    <CardField
      postalCodeEnabled={false}
      placeholders={{
        number: '4242 4242 4242 4242',
      }}
      cardStyle={{
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 5
      }}
      style={{
        alignSelf: 'center',
        width: '98%',
        height: 50,
        marginVertical: 30,
      }}
      onCardChange={(cardDetails) => {
        console.log('cardDetails', cardDetails);
      }}
      onFocus={(focusedField) => {
        console.log('focusField', focusedField);
      }}
    />
        <TouchableOpacity style={{width: 110, height: 50, alignSelf: 'center'}}>
            <Button title='Pay' style={{flex: 1, color: 'white'}} onPress={handlePress} disabled={loading}/>
        </TouchableOpacity>
    </ImageBackground>
    </View>
  );
}
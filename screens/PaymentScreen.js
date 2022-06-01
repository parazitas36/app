import { CardField, useConfirmPayment, useStripe } from '@stripe/stripe-react-native';
import React, { useContext } from 'react';
import {
  ImageBackground,
  View,
  Button,
  Text,
  ActivityIndicator
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Context } from '../App';

const image = require('../assets/images/background.png');
const API_URL = "http://localhost:5000"

const PaymentScreen = ({ route, navigation }) => {
  const { accInfo } = useContext(Context);
  const { confirmPayment, loading } = useConfirmPayment();
  const { guideID, price, ownedState, ownedFunc } = route.params;
  const [userInfo, setUserInfo] = accInfo;
  const [waiting, setWaiting] = React.useState(false);

  console.log(userInfo)

  const handlePress = async () => {
    const response = await fetch(`${API_URL}/api/payments/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "guideID": guideID,
        "userID": userInfo["_id"]
      })
    })
    const { client_secret } = await response.json();
    const val = `UserID: ${userInfo["_id"]}, GuideID: ${guideID}`
    const { error, paymentIntent } = await confirmPayment(client_secret, {
      type: 'Card',
      billingDetails: { val }
    })

    if (error) {
      alert("Error")
    } else {
      setWaiting(true);
      const resp = await fetch(`${API_URL}/api/payments/payment-check/${paymentIntent.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const json = await resp.json();
      setUserInfo(json)
      setWaiting(false);
      navigation.navigate("Home");
    }
  }

  if (waiting) {
    <View style={{ flex: 1 }}>
      <ImageBackground source={image} style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}>
        <ActivityIndicator color="rgba(55, 155, 200, 1)" size={40} style={{ flex: 1, justifyContent: 'center', marginTop: 50 }} />
      </ImageBackground>
    </View>
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={image} style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}>
        <Text style={{ color: 'black', fontSize: 22, fontWeight: '500', textAlign: 'center', paddingTop: 20 }}>Enter your credit card data</Text>
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
        />
        <TouchableOpacity style={{ width: 150, height: 100, alignSelf: 'center' }}>
          <Button title={`Pay ${(price / 100).toFixed(2)} €`} style={{ flex: 1, color: 'white' }} onPress={handlePress} disabled={loading} />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

export default PaymentScreen;
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import React, { useContext } from 'react';
import {
  ImageBackground,
  View,
  Button,
  Text,
  ActivityIndicator,
  ToastAndroid,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Context } from '../App';

const image = require('../assets/images/background.png');
const API_URL = "https://v-guide.herokuapp.com"

const PaymentScreen = ({ route, navigation }) => {
  const { accInfo } = useContext(Context);
  const { confirmPayment, loading } = useConfirmPayment();
  const { guideID, price, title, guideImage, creatorName } = route.params;
  const [userInfo, setUserInfo] = accInfo;
  const [waiting, setWaiting] = React.useState(false);

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
      ToastAndroid.show("Could not make a payment!",
        ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Payment was successful!",
        ToastAndroid.SHORT);
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
        <ScrollView contentContainerStyle={{paddingTop: 50, paddingBottom: 85}}>
          <View style={styles.cartView}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                height: 50,
                width: '96%',
                color: 'black',
                textAlign: 'center',
                textAlignVertical: 'center',
                fontSize: 24,
                fontWeight: '500',
                borderBottomWidth: 2,
                borderBottomColor: 'rgba(0, 0, 0, .5)'
              }}>
                Your Cart
              </Text>
              <View style={styles.cartHeader}>
                <View style={styles.guideHeader}>
                  <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Guide</Text>
                </View>
                <View style={styles.priceHeader}>
                  <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Price</Text>
                </View>
              </View>
            </View>

            <View style={styles.insideCart}>
              <View style={styles.guideView}>
                <View style={styles.imageView}>
                  <Image style={styles.image} source={{ uri: guideImage }} />
                </View>

                <View style={styles.details}>
                  <Text style={styles.guideTitle}>{title}</Text>
                </View>
              </View>

              <View style={styles.priceView}>
                <Text style={{ color: 'black' }}>{`${(price).toFixed(2)} €`}</Text>
              </View>
            </View>

            <View style={{ height: 50, paddingVertical: 5, width: '96%', alignSelf: 'center', borderTopWidth: 1, borderTopColor: 'rgba(0, 0, 0, .25)', flexDirection: 'row' }}>
              <Text style={{ width: '75%', fontWeight: '500', color: "black", fontSize: 16, textAlignVertical: 'center', paddingLeft: 10, borderRightWidth: 1, borderRightColor: 'rgba(0, 0, 0, .25)' }}>Total</Text>
              <Text style={{ width: '25%', color: "black", fontSize: 16, textAlignVertical: 'center', textAlign: 'center' }}>{`${(price).toFixed(2)} €`}</Text>
            </View>
          </View>

          <Text
            style={{ color: 'black', fontSize: 22, fontWeight: '500', textAlign: 'center', paddingTop: 20 }}>
            Enter your credit card data
          </Text>
          <CardField
            postalCodeEnabled={false}
            cardStyle={{
              backgroundColor: '#FFFFFF',
              textColor: '#000000',
              placeholderColor: 'grey',
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
            <Button title={`Pay ${(price).toFixed(2)} €`} style={{ flex: 1, color: 'white' }} onPress={handlePress} disabled={loading} />
          </TouchableOpacity>
        </ScrollView>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  cartView: {
    width: '96%',
    height: 260,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    alignSelf: 'center',
    borderRadius: 15,
    overflow: 'hidden'
  },
  insideCart: {
    paddingVertical: 5,
    height: 110,
    flexDirection: 'row',
    borderRadius: 15,
    width: '96%',
    alignSelf: 'center',
  },
  imageView: {
    width: '33%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartHeader: {
    height: 50,
    paddingVertical: 5,
    width: '96%',
    alignSelf: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.25)'
  },
  priceHeader: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  guideHeader: {
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: 'rgba(0, 0, 0, .25)'
  },
  guideView: {
    width: '75%',
    flexDirection: 'row',
    borderRightWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.25)'
  },
  image: {
    width: '80%',
    aspectRatio: 1,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  details: {
    width: '67%',
  },
  guideTitle: {
    color: 'black',
    fontSize: 18,
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  priceView: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 15,
  }
})

export default PaymentScreen;
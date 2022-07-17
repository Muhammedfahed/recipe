import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ViewCart({setCartCount}) {
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const getData = async () => {
    try {
      let cartValue = await AsyncStorage.getItem('@cartValue');
      let productData = await AsyncStorage.getItem('@productData');
      cartValue = JSON.parse(cartValue);
      productData = JSON.parse(productData);

      let sum = 0;
      cartValue.forEach(item => {
        sum += item.price;
      });

      setTotalPrice(sum);

      setCartData(cartValue != null ? cartValue : null);
    } catch (e) {
      console.log({e});
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.listContainer}>
      <Image
        source={{
          uri: item.image,
        }}
        resizeMode="contain"
        style={styles.imgSize}
      />
      <View style={styles.proContainer}>
        <View style={styles.proDetails}>
          <Text style={styles.proTitle}>{item.productName}</Text>
          <Text style={styles.proWei}>{item.weight}</Text>
          <Text style={styles.proCode}>{item.code}</Text>
        </View>
        <Text style={styles.proPrice}>$ {item.price}</Text>
      </View>
    </View>
  );

  const onClickClearCart = async () => {
    try {
      const cart = JSON.stringify({});
      await AsyncStorage.setItem('@cartValue', cart);
      setCartData([]);
      setCartCount();
    } catch (error) {
      // Error saving data
    }
  };

  return (
    <View style={styles.viewCart}>
      <FlatList
        data={cartData}
        renderItem={renderItem}
        keyExtractor={item => item.code}
        showsVerticalScrollIndicator={false}
      />
      {cartData.length === 0 && (
        <Text style={styles.emptyCart}>Empty Cart</Text>
      )}
      {cartData.length > 0 && (
        <TouchableOpacity
          style={styles.clearContainer}
          onPress={() => onClickClearCart()}>
          <Text style={styles.clearTitle}>Clear All</Text>
        </TouchableOpacity>
      )}
      {cartData.length > 0 && (
        <View style={styles.priceContainer}>
          <Text style={styles.proTitle}>Total: $ {totalPrice}</Text>
        </View>
      )}
    </View>
  );
}
export default ViewCart;

const styles = StyleSheet.create({
  viewCart: {
    height: Dimensions.get('window').height / 2,
    backgroundColor: 'white',
    width: Dimensions.get('window').width - 150,
    position: 'absolute',
    right: 30,
    top: 37,
    borderRadius: 10,
  },
  imgSize: {
    width: 70,
    height: 70,
  },
  proTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContainer: {
    margin: 15,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  proWei: {
    color: 'black',
    fontSize: 14,
    opacity: 0.5,
    fontWeight: 'bold',
  },
  proDetails: {
    marginLeft: 15,
  },
  proCode: {
    color: 'black',
    fontSize: 8,
    opacity: 0.5,
    marginTop: 5,
  },
  proContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    alignItems: 'center',
  },
  proPrice: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  priceContainer: {
    position: 'absolute',
    bottom: 20,
    right: 15,
  },
  clearContainer: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    backgroundColor: 'red',
    opacity: 0.6,
    padding: 5,
    borderRadius: 7,
  },
  clearTitle: {
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
  },
  emptyCart: {
    color: 'black',
    fontSize: 13,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: Dimensions.get('window').width / 4,
    marginTop: 150,
  },
});

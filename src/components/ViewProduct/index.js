import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ViewProduct() {
  const data = [
    {
      id: 1,
      productName: 'Tomato',
      weight: '500gm',
      code: 'PRO-96284',
      price: 10,
      image: 'https://cdn-icons-png.flaticon.com/128/2503/2503930.png',
    },
    {
      id: 2,
      productName: 'Onion',
      weight: '500gm',
      code: 'PRO-9876',
      price: 34,
      image: 'https://cdn-icons-png.flaticon.com/512/424/424264.png',
    },
    {
      id: 3,
      productName: 'Noodles',
      weight: '500gm',
      code: 'PRO-6783213',
      price: 40,
      image: 'https://cdn-icons-png.flaticon.com/128/7507/7507377.png',
    },
    {
      id: 4,
      productName: 'Tea',
      weight: '500gm',
      code: 'PRO-9876',
      price: 5,
      image: 'https://cdn-icons-png.flaticon.com/128/3504/3504837.png',
    },
    {
      id: 5,
      productName: 'Sugar',
      weight: '500gm',
      code: 'PRO-786573',
      price: 15,
      image: 'https://cdn-icons-png.flaticon.com/512/1656/1656200.png',
    },
    {
      id: 6,
      productName: 'Masala',
      weight: '100gm',
      code: 'PRO-57575',
      price: 35,
      image: 'https://cdn1.vectorstock.com/i/thumb-large/99/35/masala-icon-cartoon-style-vector-28739935.jpg',
    },
  ];

  const saveProduct = async () => {
    try {
      const productData = JSON.stringify(data);
      await AsyncStorage.setItem('@productData', productData);
    } catch (error) {
      // Error saving data
    }
  };

  useEffect(() => {
    saveProduct();
  });

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

  return (
    <View style={styles.viewCart}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
export default ViewProduct;

const styles = StyleSheet.create({
  viewCart: {
    height: Dimensions.get('window').height / 2,
    backgroundColor: 'white',
    width: Dimensions.get('window').width - 40,
    position: 'absolute',
    left: 20,
    top: 50,
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
    width: '75%',
    alignItems: 'center',
  },
  proPrice: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

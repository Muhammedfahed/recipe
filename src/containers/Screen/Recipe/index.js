import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewCart from '../../../components/ViewCart';
import ViewProduct from '../../../components/ViewProduct';

function Recipe() {
  const [viewCart, setViewCart] = useState(false);
  const [viewProduct, setViewProduct] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const data = [
    {
      id: 1,
      reciepe_name: 'Veg Noodles',
      image:
        'https://thechutneylife.com/wp-content/uploads/2017/09/Veg-Hakka-Noodles-The-Chutney-Life-5-1024x683.jpg',
      incredients: [
        {
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
      ],
    },
    {
      id: 2,
      reciepe_name: 'Tea ',
      image:
        'https://images.pexels.com/photos/1493080/pexels-photo-1493080.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      incredients: [
        {
          productName: 'Tea',
          weight: '500gm',
          code: 'PRO-9876',
          price: 5,
          image: 'https://cdn-icons-png.flaticon.com/128/3504/3504837.png',
        },
        {
          productName: 'Sugar',
          weight: '500gm',
          code: 'PRO-786573',
          price: 15,
          image: 'https://cdn-icons-png.flaticon.com/512/1656/1656200.png',
        },
      ],
    },
    {
      id: 3,
      reciepe_name: 'Masala Tea ',
      image:
        'https://images1.livehindustan.com/uploadimage/library/2019/03/23/16_9/16_9_1/coffee_1553342962.jpg',
      incredients: [
        {
          productName: 'Tea',
          weight: '500gm',
          code: 'PRO-9876',
          price: 5,
          image: 'https://cdn-icons-png.flaticon.com/128/3504/3504837.png',
        },
        {
          productName: 'Sugar',
          weight: '500gm',
          code: 'PRO-786573',
          price: 15,
          image: 'https://cdn-icons-png.flaticon.com/512/1656/1656200.png',
        },
        {
          productName: 'Masala',
          weight: '100gm',
          code: 'PRO-57575',
          price: 35,
          image:
            'https://cdn1.vectorstock.com/i/thumb-large/99/35/masala-icon-cartoon-style-vector-28739935.jpg',
        },
      ],
    },
  ];

  const fun = item => {
    let arr = [];
    item.forEach(element => {
      arr.push(element.productName + ', ');
    });
    return arr;
  };

  const onClickCook = async value => {
    console.log({value});
    setCartCount(value?.length);

    try {
      const cartData = JSON.stringify(value);
      await AsyncStorage.setItem('@cartValue', cartData);
    } catch (error) {
      // Error saving data
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.innerContainer}>
      <Image
        source={{
          uri: item.image,
        }}
        resizeMode="cover"
        style={styles.recipeImage}
      />
      <View style={styles.recipeDetails}>
        <View style={styles.recipeDetails1}>
          <View style={styles.recipeTitleContainer}>
            <Text style={styles.recipeTitle}>{item.reciepe_name}</Text>
          </View>

          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => onClickCook(item.incredients)}>
            <Text style={styles.btnTitle}>Cook This Dish</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.incrContainer}>
          <Text style={styles.incrTitle}>Incredients :</Text>
          <Text style={styles.incrList}>
            {fun(item.incredients)}
            {/* Noodels,Tomato, Onion, Chilli, Beans, Masala, Water */}
          </Text>
          <Text style={styles.incrTitle}>Preparation :</Text>
          <Text style={styles.incrList}>Cooking...</Text>
        </View>
      </View>
    </View>
  );

  const getData = async () => {
    try {
      let cartValue = await AsyncStorage.getItem('@cartValue');
      cartValue = JSON.parse(cartValue);
      setCartCount(cartValue?.length || 0);
    } catch (e) {
      console.log({e});
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() => setViewProduct(!viewProduct)}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/135/135763.png',
          }}
          resizeMode="contain"
          style={styles.cartIcon}
        />
        <Text>Product List</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cartContainer}
        onPress={() => setViewCart(!viewCart)}>
        <Image
          source={{
            uri: 'https://www.freepnglogos.com/uploads/shopping-cart-png/shopping-cart-svg-png-icon-download-28.png',
          }}
          resizeMode="contain"
          style={styles.cartIcon}
        />
        <View style={styles.cartValue}>
          <Text style={{fontWeight: 'bold'}}>{cartCount}</Text>
        </View>
      </TouchableOpacity>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
      {viewCart && <ViewCart setCartCount={() => setCartCount(0)} />}
      {viewProduct && <ViewProduct />}
    </View>
  );
}
export default Recipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
  },
  innerContainer: {
    // alignItems: 'center',
    width: Dimensions.get('window').width - 40,
    marginBottom: 15,
  },
  recipeImage: {
    width: Dimensions.get('window').width - 40,
    height: 200,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  recipeDetails: {
    backgroundColor: 'white',
    width: '100%',
    height: 100,
    flexDirection: 'row',
    borderBottomLeftRadius: 30,
    // display:'flex'
  },
  recipeDetails1: {
    height: 100,
    width: '40%',
  },
  recipeTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  btnContainer: {
    backgroundColor: 'green',
    width: 120,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    position: 'absolute',
    bottom: 5,
    left: 5,
  },
  btnTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 13,
  },
  incrTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 12,
  },
  incrList: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 12,
    opacity: 0.5,
  },
  incrContainer: {
    marginTop: 10,
    width: '60%',
  },
  recipeTitleContainer: {
    backgroundColor: 'orange',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: '95%',
    marginTop: 5,
  },
  cartIcon: {
    height: 30,
    width: 30,
  },
  cartContainer: {
    backgroundColor: 'white',
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    left: Dimensions.get('window').width / 2.5,
    marginBottom: 10,
  },
  cartValue: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 20 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -5,
    right: -5,
  },
  productContainer: {
    position: 'absolute',
    left: 20,
  },
});

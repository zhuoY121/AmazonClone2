import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

// import products from '../../data/cart';
import CartProductItem from '../../components/CartProductItem';
import Button from '../../components/Button';

import {Auth, DataStore} from 'aws-amplify';
import {CartProduct} from '../../models';
import {Product} from '../../models';

const ShoppingCartScreen = () => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  const navigation = useNavigation();

  const fetchCartProducts = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    // TODO: query only my cart items
    // DataStore.query(CartProduct).then(setCartProducts);
    DataStore.query(CartProduct, cp =>
      cp.userSub('eq', userData.attributes.sub),
    ).then(setCartProducts);
    // console.log(cartProducts);
  };

  // // By default, the function passed to useEffect will run after the render is committed to the screen
  // useEffect(() => {
  //   console.log('a1');
  //   fetchCartProducts();
  // }, []);

  // It seems like we don't need this function.
  // Be careful, the logic of this useEffect() is pretty complicated.
  // useEffect(() => {
  //   console.log('a2');
  //   // If every cartProduct has a product, then return. (This means data loading is completed)
  //   if (cartProducts.filter(cp => !cp.product).length === 0) {
  //     return;
  //   }

  //   const fetchProducts = async () => {
  //     console.log('fetchProducts');
  //     // query all products that are used in the cart
  //     const products = await Promise.all(
  //       cartProducts.map(cartProduct =>
  //         DataStore.query(Product, cartProduct.productID),
  //       ),
  //     );

  //     // For every cartProduct, assign the corresponding product to it. (use cartProduct.productID)
  //     setCartProducts(currentCartProducts =>
  //       currentCartProducts.map(cartProduct => ({
  //         ...cartProduct,
  //         product: products.find(p => p.id === cartProduct.productID),
  //       })),
  //     );
  //   };
  //   fetchProducts();

  // //   fetchCartProducts();
  //   // console.log('aa');
  // }, [cartProducts]);

  // // Update shopping cart page after checkout.
  // useEffect(() => {
  //   console.log('a3');
  //   const subscription = DataStore.observe(CartProduct).subscribe(msg =>
  //     fetchCartProducts(),
  //   );
  //   return () => {
  //     subscription.unsubscribe();
  //   };
  //   // return subscription.unsubscribe; // this will cause an error: "cannot read properties of undefined (reading '_state')"
  // }, []);

  // ------1
  // useEffect(() => {
  //   const subscriptions = cartProducts.map(cp =>
  //     DataStore.observe(CartProduct, cp.id).subscribe(msg => {
  //       fetchCartProducts();
  //       console.log('bb');
  //       // console.log(msg.model, msg.opType, msg.element);
  //     }),
  //   );
  //   return () => {
  //     subscriptions.forEach(sub => sub.unsubscribe());
  //   };
  // }, [cartProducts]);
  // ------1

  // ------2
  useEffect(() => {
    console.log('a22');

    fetchCartProducts();

    const subscription = DataStore.observe(CartProduct).subscribe(msg =>
      fetchCartProducts(),
    );
    return () => {
      subscription.unsubscribe();
    };
    // return subscription.unsubscribe; // this will cause an error: "cannot read properties of undefined (reading '_state')"
  }, []);
  // ------2

  // // Pass a second argument to useEffect that is the array of values that the effect depends on.
  // // Subscribe the changes for the cartProducts
  // // Functionality: If the cartProducts in the database are changed, then the changes will update on the device.
  // // (Synchronization for multi devices)
  // useEffect(() => {
  //   console.log('a4');
  //   const subscriptions = cartProducts.map(cp =>
  //     DataStore.observe(CartProduct, cp.id).subscribe(msg => {
  //       if (msg.opType === 'UPDATE') {
  //         setCartProducts(curCartProducts =>
  //           curCartProducts.map(cp => {
  //             if (cp.id !== msg.element.id) {
  //               // console.log('differnt id');
  //               return cp;
  //             }
  //             return {
  //               ...cp,
  //               ...msg.element,
  //             };
  //           }),
  //         );
  //       }
  //     }),
  //   );

  //   return () => {
  //     subscriptions.forEach(sub => sub.unsubscribe());
  //   };
  // }, [cartProducts]);

  const onCheckout = () => {
    navigation.navigate('Address');
  };

  // If there is a cartProduct that doesn't have a product, then we render loading page and wait for loading data.
  if (cartProducts.filter(cp => !cp.product).length !== 0) {
    return <ActivityIndicator />;
  }

  const totalPrice = cartProducts.reduce(
    (summedPrice, product) =>
      summedPrice + (product?.product?.price || 0) * product.quantity, // notice this expression.
    0,
  );

  return (
    <View style={styles.page}>
      {/* Render Product Component */}
      <FlatList
        data={cartProducts}
        renderItem={({item}) => <CartProductItem cartItem={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Subtotal ({cartProducts.length}{' '}
              {cartProducts.length <= 1 ? 'item' : 'items'}
              ):
              <Text style={{color: '#e47911'}}>
                {' '}
                {'\u0024'}
                {totalPrice.toFixed(2)}
              </Text>
            </Text>

            <Button
              text="Proceed to checkout"
              onPress={onCheckout}
              containerStyles={{
                backgroundColor: '#f7e300',
                borderColor: '#c7b702',
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
});

export default ShoppingCartScreen;

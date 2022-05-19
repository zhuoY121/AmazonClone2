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

  useEffect(() => {
    fetchCartProducts();
  }, []);

  // Be careful, the logic of this useEffect() is pretty complicated.
  useEffect(() => {
    // If every cartProduct has a product, then return. (This means data loading is completed)
    // if (cartProducts.filter(cp => !cp.product).length === 0) {
    //   return;
    // }

    // const fetchProducts = async () => {
    //   // query all products that are used in the cart
    //   const products = await Promise.all(
    //     cartProducts.map(cartProduct =>
    //       DataStore.query(Product, cartProduct.productID),
    //     ),
    //   );

    //   // For every cartProduct, assign the corresponding product to it. (use cartProduct.productID)
    //   setCartProducts(currentCartProducts =>
    //     currentCartProducts.map(cartProduct => ({
    //       ...cartProduct,
    //       product: products.find(p => p.id === cartProduct.productID),
    //     })),
    //   );
    // };
    // fetchProducts();

    fetchCartProducts();
  }, [cartProducts]);

  // Update shopping cart page after checkout.
  useEffect(() => {
    const subscription = DataStore.observe(CartProduct).subscribe(msg =>
      fetchCartProducts(),
    );
    return subscription.unsubscribe; // note: here cannot use 'unsubscribe()', but don't know why.
  }, []);

  // Subscribe the changes for the cartProducts
  useEffect(() => {
    const subscriptions = cartProducts.map(cp =>
      DataStore.observe(CartProduct, cp.id).subscribe(msg => {
        if (msg.opType === 'UPDATE') {
          setCartProducts(curCartProducts =>
            curCartProducts.map(cp => {
              if (cp.id !== msg.element.id) {
                // console.log('differnt id');
                return cp;
              }
              return {
                ...cp,
                ...msg.element,
              };
            }),
          );
        }
      }),
    );

    return () => {
      subscriptions.forEach(sub => sub.unsubscribe());
    };
  }, [cartProducts]);

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

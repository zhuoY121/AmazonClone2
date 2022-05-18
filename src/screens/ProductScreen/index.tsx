import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
// import product from '../../data/product';
import {Picker} from '@react-native-picker/picker';
import QuantitySelector from '../../components/QuantitySelector';
import Button from '../../components/Button';
import ImageCarousel from '../../components/ImageCarousel';

import {Auth, DataStore} from 'aws-amplify';
import {Product} from '../../models';
import {CartProduct} from '../../models';
import {useNavigation, useRoute} from '@react-navigation/native';

const ProductScreen = () => {
  const [product, setProduct] = useState<Product | undefined>(undefined);

  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined,
  );
  const [quantity, setQuantity] = useState(1);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (!route.params?.id) {
      return;
    }
    DataStore.query(Product, route.params?.id).then(setProduct);
  }, [route.params?.id]);

  // Call this function every time the 'product' changes.
  useEffect(() => {
    if (product?.options) {
      setSelectedOption(product.options[0]);
    }
  }, [product]);

  const onAddToCart = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    // console.log(userData);

    if (!product || !userData) {
      return;
    }

    const newCartProduct = new CartProduct({
      userSub: userData.attributes.sub,
      quantity,
      option: selectedOption,
      productID: product.id,
    });

    await DataStore.save(newCartProduct);
    navigation.navigate('shoppingCart');
  };

  if (!product) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={styles.root}>
      <Text style={styles.title}>{product.title}</Text>

      {/* Image carousel */}
      <ImageCarousel images={product.images} />

      {/* Option selector */}
      <Picker
        selectedValue={selectedOption}
        onValueChange={itemValue => setSelectedOption(itemValue)}>
        {product.options.map((option, index) => (
          <Picker.Item
            label={option}
            value={option}
            key={`${option}-${index}`} // key is necessary here, or a warning will appeal
          />
        ))}
      </Picker>

      {/* Price */}
      <Text style={styles.price}>
        from {'\u0024'}
        {product.price.toFixed(2)}
        {product.oldPrice && (
          <Text style={styles.oldPrice}>
            {'\u0024'}
            {product.oldPrice.toFixed(2)}
          </Text>
        )}
      </Text>

      {/* Description */}
      <Text style={styles.description}>{product.description}</Text>

      {/* Quantity selector */}
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

      {/* Button */}
      <Button
        text={'Add To Cart'}
        onPress={onAddToCart}
        containerStyles={{backgroundColor: '#e3c905'}}
      />
      <Button
        text={'Buy Now'}
        onPress={() => {
          console.warn('Buy now');
        }}
      />
    </ScrollView>
  );
};

export default ProductScreen;

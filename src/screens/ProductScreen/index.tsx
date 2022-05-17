import {View, Text, ScrollView} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import product from '../../data/product';
import {Picker} from '@react-native-picker/picker';
import QuantitySelector from '../../components/QuantitySelector';
import Button from '../../components/Button';
import ImageCarousel from '../../components/ImageCarousel';

const ProductScreen = () => {
  const [selectedOption, setSelectedOption] = useState(
    product.options ? product.options[0] : null,
  );
  const [quantity, setQuantity] = useState(1);

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
        {product.price}
        {product.oldPrice && (
          <Text style={styles.oldPrice}>
            {'\u0024'}
            {product.oldPrice}
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
        onPress={() => {
          console.warn('Add to cart');
        }}
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

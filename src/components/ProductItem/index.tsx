import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation, useRoute} from '@react-navigation/native';

interface ProductItemProps {
  item: {
    id: string;
    title: string;
    image: string;
    avgRating: number;
    ratings: number;
    price: number;
    oldPrice?: number;
  };
}

const ProductItem = (props: ProductItemProps) => {
  const item = props.item;
  // const {item} = props;

  const navigation = useNavigation();
  const router = useRoute();

  const onPress = () => {
    // console.warn('item pressed');
    navigation.navigate('ProductDetails', {id: item.id});
  };

  return (
    <Pressable onPress={onPress} style={styles.root}>
      <Image
        style={styles.image}
        source={{
          uri: item.image,
        }}
      />

      <View style={styles.rightContainer}>
        <Text style={styles.title} numberOfLines={3}>
          {item.title}
        </Text>

        {/* Ratings */}
        <View style={styles.ratingsContainer}>
          {[0, 0, 0, 0, 0].map((el, i) => (
            <FontAwesome
              key={`${item.id}-${i}`}
              style={styles.star}
              name={i < Math.floor(item.avgRating) ? 'star' : 'star-o'}
              size={18}
              color={'#e47911'}
            />
          ))}

          <Text>{item.ratings}</Text>
        </View>

        <Text style={styles.price}>
          from {'\u0024'}
          {item.price}
          {item.oldPrice && (
            <Text style={styles.oldPrice}>
              {'\u0024'}
              {item.oldPrice}
            </Text>
          )}
        </Text>
      </View>
    </Pressable>
  );
};

export default ProductItem;

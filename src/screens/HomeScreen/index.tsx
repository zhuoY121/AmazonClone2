import {View, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import ProductItem from '../../components/ProductItem';

import products from '../../data/products';

const HomeScreen = ({searchValue}: {searchValue: string}) => {
  return (
    <View style={styles.page}>
      {/* Render Product Component */}
      <FlatList
        data={products}
        renderItem={({item}) => <ProductItem item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
});

export default HomeScreen;

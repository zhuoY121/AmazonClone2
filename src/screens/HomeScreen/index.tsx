import {View, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProductItem from '../../components/ProductItem';

// import products from '../../data/products';
import {DataStore} from 'aws-amplify';
import {Product} from '../../models';

const HomeScreen = ({searchValue}: {searchValue: string}) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    DataStore.query(Product).then(results => setProducts(results));
  }, []);

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

import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, Text} from 'react-native';
// import {Text, Card, CardItem, Input, Item, Icon} from 'native-base';

// import SearchEngine from 'react-native-search-engine';

// const dataArray = ['Manizales+', 'Medellín|', 'Bogotá', 'Viena', 'Valencia'];
// const dataArrayInt = [
//   0.1, 0.2, 0.3, 0.4, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9,
// ];

// const customizeResult = properties => {
//   const {valueResult, element} = properties;
//   console.log('element>>>', element);
//   return (
//     <Card style={styles.containerCard}>
//       <CardItem style={styles.containerCardResult}>
//         <Text>{valueResult}</Text>
//       </CardItem>
//     </Card>
//   );
// };
// const customizeInput = properties => {
//   const {search, setSearch} = properties;
//   return (
//     <Item rounded style={styles.containerInput}>
//       <Input
//         style={styles.input}
//         value={search}
//         placeholder="email"
//         autoCorrect={false}
//         onChangeSearch={object => setSearch(object)}
//         autoCapitalize="words"
//         autoCompleteType="off"
//       />
//     </Item>
//   );
// };

const MySearchEngine = () => {
  return (
    <SafeAreaView>
      <Text>MySearchEngine</Text>
    </SafeAreaView>
  );
  // const [option, setOption] = useState();
  // console.log('option>>>', option);
  // return (
  //   <SearchEngine
  //     data={dataArray}
  //     searchKey={'name'}
  //     onChangeSearch={text => setOption(text)}
  //     buttonEnabled={true}
  //     placeholder={'email'}
  //   />
  // );
};

export default MySearchEngine;

const styles = StyleSheet.create({
  input: {
    marginLeft: 12,
  },
  containerInput: {
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 8,
  },
  containerCard: {
    borderRadius: 10,
  },
  containerCardResult: {
    borderRadius: 10,
  },
  containerScrollStyle: {
    maxHeight: '50%',
  },
  textInputStyle: {
    fontSize: 20,
    textAlign: 'left',
  },
  containerTextInfoStyle: {
    borderWidth: 2,
    backgroundColor: '#fff',
    borderColor: 'red',
    borderRadius: 10,
    padding: 12,
  },
  textInfoStyle: {
    fontSize: 20,
    textAlign: 'left',
  },
  containerInputStyle: {
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 0,
    borderTopColor: 'red',
    borderBottomColor: 'red',
    borderRightColor: 'rgba(255, 255, 255, 0)',
    borderLeftColor: 'red',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 12,
  },
  containerButtonStyle: {
    borderLeftWidth: 0,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderTopColor: 'red',
    borderBottomColor: 'red',
    borderRightColor: 'red',
    borderLeftColor: 'rgba(255, 255, 255,0)',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 0,
    textAlign: 'center',
    alignItems: 'center',
    width: '20%',
  },
  containerIconStyle: {
    marginTop: 10,
  },
});

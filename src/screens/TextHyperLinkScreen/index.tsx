import {View, Text, SafeAreaView, FlatList} from 'react-native';
import React from 'react';
import TextHyperLink from '../../components/TextHyperLink';
import textHyperLink1 from '../../data/textHyperLink1';
import textHyperLinks from '../../data/textHyperLinks';

const TextHyperLinkScreen = () => {
  const onPressFunc = link => {
    console.log(link);
  };

  return (
    <SafeAreaView>
      {/* <TextHyperLink item={textHyperLink1} /> */}
      <FlatList
        data={textHyperLinks}
        renderItem={({item}) => (
          <TextHyperLink item={item} onPressFunc={onPressFunc} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default TextHyperLinkScreen;

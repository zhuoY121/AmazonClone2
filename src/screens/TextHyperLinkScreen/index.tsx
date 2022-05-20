import {View, Text, SafeAreaView, FlatList} from 'react-native';
import React from 'react';
import TextHyperLink from '../../components/TextHyperLink';
import textHyperLink1 from '../../data/textHyperLink1';
import textHyperLinks from '../../data/textHyperLinks';

const TextHyperLinkScreen = () => {
  return (
    <SafeAreaView>
      {/* <TextHyperLink item={textHyperLink1} /> */}
      <FlatList
        data={textHyperLinks}
        renderItem={({item}) => <TextHyperLink item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default TextHyperLinkScreen;

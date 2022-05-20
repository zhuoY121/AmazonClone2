import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import TextHyperLink from '../../components/TextHyperLink';
import textHyperLink1 from '../../data/textHyperLink1';

const TextHyperLinkScreen = () => {
  return (
    <SafeAreaView>
      <TextHyperLink item={textHyperLink1} />
    </SafeAreaView>
  );
};

export default TextHyperLinkScreen;

import {View, Text} from 'react-native';
import React from 'react';

interface TextHyperLinkProps {
  // Using an 'item' to wrap all the props makes passing data to <TextHyperLink> easier.
  // (e.g. <TextHyperLink item={oneData} />)
  item: {
    text: string;
    textStyle: object;
    linkCaptions: string[];
    linkStyle: object[];
    // onPress: () => void;
  };
  onPressFunc: (link: string) => void;
}

const TextHyperLink = ({item, onPressFunc}: TextHyperLinkProps) => {
  function isValidURL(s: string) {
    const res = s.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    );
    return res;
  }

  // split the text to a wordArray
  const arr = item.text.trim().split(/\s+/);
  // console.warn(arr);
  // console.log(arr);

  // for each word in the array, do
  // 1. check if it is a link.
  //   If it is a link, replace it with the linkCaptions using 'linkIndex' and set linkIndex+1, then render a <text> with an onPress.
  //   If it is not a link, then render a <text>.

  // const [linkIndex, setLinkIndex] = useState(0); // cannot use the state this way, since it will cause error: 'too many re-renders'.
  var linkIndex = -1; // Initialized with -1: Since we cannot increase 'linkIndex' in the return expression. (see the logic below)
  const textArr = arr.map((word, i) => {
    if (isValidURL(word)) {
      // setLinkIndex(linkIndex + 1); // cannot use the state this way, since it will cause an error: 'too many re-renders'.
      linkIndex = linkIndex + 1;
      // return (
      //   <Text
      //     key={`${word}-${i}-${linkIndex}`}
      //     style={item.linkStyle[linkIndex]}
      //     onPress={() => {
      //       // console.warn(word);
      //       console.log(word);
      //     }}>
      //     {item.linkCaptions[linkIndex]}
      //     {i !== arr.length - 1 ? ' ' : ''}
      //   </Text>
      // );
      return (
        <Text
          key={`${word}-${i}-${linkIndex}`}
          style={item.linkStyle[linkIndex]}
          onPress={() => onPressFunc(word)}>
          {item.linkCaptions[linkIndex]}
          {i !== arr.length - 1 ? ' ' : ''}
        </Text>
      );
    }
    return (
      // <Text style={{backgroundColor: 'grey'}}>
      <Text key={`${word}-${i}`}>
        {word}
        {i !== arr.length - 1 ? ' ' : ''}
      </Text>
    );
  });

  return (
    // <View style={{backgroundColor: 'orange'}}>
    <View>
      <Text>{textArr}</Text>
    </View>
  );
};

export default TextHyperLink;

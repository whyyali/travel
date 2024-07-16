import { Image, StyleSheet, Text, View } from 'react-native';

type Props = {
    source: any,
    height: any,
    width: any,
    radius: any
}

const ReusableImage = ({source, height, width, radius}: Props) => {
  return (
    <View>
      <Image source={{uri: source}} style={{resizeMode: "cover", height: height, width: width, borderRadius: radius}} />
    </View>
  )
}

const styles = StyleSheet.create({})

export default ReusableImage
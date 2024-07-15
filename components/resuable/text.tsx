import { Text } from 'react-native';

type Props = {
    text: string,
    color?: string,
    size?: any,
    family?: any,
    align?: any,
}

const RText = ({ text, color, size, family, align }: Props) => {
    return (
        <Text style={{ color: color, fontSize: size, textAlign: align, fontWeight: family }}>{text}</Text>
    )
}

export default RText
import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '@/constants/theme'
import ReusableImage from '../resuable/image'
import ReusableText from '../resuable/text'
import ReusableComment from '../resuable/comment'
import Star from '../star'

type ReviewProps = {
    review: {
        _id: string,
        place: string,
        review: string,
        rating: number,
        user: {
            username: string,
            profile: any,
        }
        updatedAt: any
    }

}

const ReviewTile = ({ review }: ReviewProps) => {
    // console.log(review.user.profile)

    const formatDate = (value: any) => {
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "June", "July",
            "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const date = new Date(value);
        const year = date.getFullYear();
        const monthIndex = date.getMonth();
        const month = months[monthIndex];
        const day = String(date.getDate()).padStart(2, '0');

        return `${month} ${day}`;
    };

    const renderStars = (rating: number) => {
        const starComponents = [];
        const yellowStars = rating;
        const grayStars = 5 - yellowStars;

        for (let i = 0; i < yellowStars; i++) {
            starComponents.push(<Star key={i} size={24} color='#fd9942' />);
        }

        for (let i = 0; i < grayStars; i++) {
            starComponents.push(<Star key={yellowStars + i} size={24} color='gray' />);
        }

        return starComponents;
    };

    return (
        <View style={styles.container}>
            <View style={[styles.mainWrapper]}>
                <View style={[styles.wrapper, { justifyContent: "flex-start" }]}>
                    <ReusableImage source={review.user.profile} width={54} height={54} radius={10} />
                    <View style={{ width: 20 }} />

                    <View>
                        <View style={[styles.wrapper, { gap: 60, }]}>
                            <View>
                                <ReusableText text={review.user.username.charAt(0).toUpperCase() + review.user.username.slice(1)} color={COLORS.black} size={SIZES.medium + 2} family={"400"} />
                                <ReusableText text={formatDate(review.updatedAt)} color={COLORS.gray} size={SIZES.small + 1} family={"400"} />
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                {renderStars(review.rating)}
                            </View>
                        </View>
                    </View>
                </View>

                <ReusableComment comment={review.review} lines={2} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 6,
        borderRadius: 12,
        borderBottomWidth: 0.5,
        borderColor: COLORS.lightGray,
        backgroundColor: COLORS.lightWhite,
        marginBottom: 2
    },
    mainWrapper: {
        flexDirection: "column",
        alignItems: "flex-start",
        paddingHorizontal: 8
    },
    wrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
})

export default ReviewTile
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '@/constants/theme';
import { useUser } from "@/constants/userContext";
import { BACKEND_URL } from "@env";

const MAX_CHARACTERS = 120;

type WriteProps ={
    placeId: string,
}

const WriteReview = ({placeId}: WriteProps) => {
    const [reviewText, setReviewText] = useState('');
    const [ratingText, setRatingText] = useState('');
    const [remainingCharacters, setRemainingCharacters] = useState(MAX_CHARACTERS);
    const { user } = useUser();

    const handleReviewChange = (text: string) => {
        if (text.length <= MAX_CHARACTERS) {
            setReviewText(text);
            setRemainingCharacters(MAX_CHARACTERS - text.length);
        }
    };

    const handleReviewSubmit = async () => {
        if (!user?.id || !user?.token) {
            Alert.alert('Error', 'You must be logged in to submit a review.');
            return;
        }

        const review = {
            review: reviewText,
            rating: ratingText,
            user: user.id,
            place: placeId,
        };

        try {
            const response = await fetch(`${BACKEND_URL}/api/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify(review),
            });

            const data = await response.json();

            if (response.ok) {
                // Alert.alert('Review Submitted', 'Thank you for your review!', [{ text: 'OK' }]);
                setReviewText('');
                setRatingText('');
                setRemainingCharacters(MAX_CHARACTERS);
            } else {
                console.log('Review Submission Failed', data.message);
                Alert.alert('Error', 'Failed to submit the review. Please try again.', [{ text: 'OK' }]);
            }
        } catch (error) {
            console.error('Error during review submission:', error);
            Alert.alert('Error', 'An error occurred during review submission. Please try again.', [{ text: 'OK' }]);
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.input}>
            <TextInput multiline placeholder="Write your review here ..." value={reviewText} onChangeText={handleReviewChange} style={{}} textAlignVertical='top'/>
            </View>
           
            <TextInput placeholder='Give the Rating between 1-5' value={ratingText} onChangeText={(text) => {setRatingText(text); handleReviewChange}} style={{borderWidth: 1, borderColor: COLORS.gray, paddingHorizontal: 8, paddingVertical: 6, borderRadius: 4}} />
            <View style={styles.remainingContainer}>
                <Text style={styles.remainingText}>{remainingCharacters} characters remaining</Text>
                <TouchableOpacity onPress={handleReviewSubmit} disabled={!reviewText.trim()}>
                    <Text style={[styles.submitButton, !reviewText.trim() && styles.disabledButton]}>
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: COLORS.white,
        borderRadius: 12,
        marginBottom: 16,
    },
    input: {
        height: 100,
        borderColor: COLORS.gray,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        backgroundColor: COLORS.white
    },
    remainingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    remainingText: {
        color: COLORS.gray,
        fontSize: 12,
    },
    submitButton: {
        color: COLORS.blue, 
        fontWeight: 'bold',
    },
    disabledButton: {
        color: COLORS.gray,
    },
});

export default WriteReview;

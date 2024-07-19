import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { COLORS, SIZES } from '@/constants/theme';
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { BACKEND_URL } from "@env";
import { router } from 'expo-router';
import ReusableButton from '../resuable/button';
import * as ImagePicker from 'expo-image-picker';
import ReusableText from '../resuable/text';
import { useUser } from '@/constants/userContext';

interface FormValues {
    email: string;
    password: string;
    username: string;
    verify: any,
}

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Provide a valid email").required("Required"),
    password: Yup.string().min(6, "Password must be atleast 6 characters").required("Required"),
    username: Yup.string().min(3, "Username must be atleast 3 characters").required("Required"),
    verify: Yup.number().min(6, "Enter the 6 digits code to verify email").required("Required"),

})

const handleRegistration = async (values: FormValues, resetForm: () => void, image: any, setUserDetails: (user: any) => void) => {
    const { email, password, username } = values;

    try {
        const response = await fetch(`${BACKEND_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, username, profile: image }),
        });
        const data = await response.json();
        if (data.status) {
            setUserDetails({ id: data.id, token: data.token });
            router.navigate("(tab)/home")
            resetForm();
        } else {
            console.log(data.message)
            alert(data.message);
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('An error occurred during registration. Please try again.');
    }
};


const Register = () => {
    const [obsecureText, setObsecureText] = useState(false);
    const [image, setImage] = useState<string>();
    const { setUserDetails } = useUser()
    let isSend = false
    let isVerify = false

    const pickImage = async () => {
        let result: any = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.assets[0].uri);
        }
    };

    const sendcode = async (values: any) => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/code/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ contact: values.email }),
            });

            if (response.ok) {
                const data = await response.json();
                isSend = true
            } else {
                const errorData = await response.json();
                Alert.alert(errorData.message || "Failed to send verification code.");
            }
        } catch (error) {
            console.error('Error sending verification code:', error);
        }
    }

    const verifycode = async (values: any) => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/code/receive`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ contact: values.email, code: values.verify }),
            });

            if (response.ok) {
                isVerify = true
            } else {
                const errorData = await response.json();
                Alert.alert(errorData.message || "Invalid verification code.");
            }
        } catch (error) {
            console.error('Error verifying code:', error);
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Formik initialValues={{ email: "", password: "", username: "", verify: "" }} validationSchema={validationSchema} onSubmit={(values: FormValues, { resetForm }: FormikHelpers<FormValues>) => handleRegistration(values, resetForm, image, setUserDetails)} >
                    {({ handleChange, touched, handleSubmit, values, errors, setFieldTouched }) => (
                        <View>
                            <TouchableOpacity onPress={pickImage} style={{ justifyContent: "center", alignItems: "center" }}>
                                <View style={styles.imageContainer}>
                                    {image ? (
                                        <Image source={{ uri: image }} style={styles.image} />
                                    ) : (
                                        <View style={styles.placeholder}>
                                            <Text style={styles.placeholderText}>Upload your image</Text>
                                        </View>
                                    )}
                                </View>
                            </TouchableOpacity>
                            <View style={styles.wrapper}>
                                <Text style={styles.label}>Name</Text>
                                <View>
                                    <View style={[styles.input, { borderColor: `${touched.username ? COLORS.lightBlue : COLORS.lightGray}` }]}>
                                        <MaterialCommunityIcons name='face-man-outline' size={20} color={COLORS.lightBlue} />
                                        <View style={{ width: 20 }} />
                                        <TextInput style={{ flex: 1 }} onChangeText={handleChange("username")} placeholder='Enter your name' onFocus={() => { setFieldTouched("username") }} value={values.username} autoCapitalize='none' autoCorrect={false} />
                                    </View>
                                    {touched.username && touched.username && (
                                        <Text style={styles.error}>{errors.username}</Text>
                                    )}
                                </View>
                            </View>

                            <View style={styles.wrapper}>
                                <Text style={styles.label}>Email</Text>
                                <View>
                                    <View style={[styles.input, { borderColor: `${touched.email ? COLORS.lightBlue : COLORS.lightGray}` }]}>
                                        <MaterialCommunityIcons name='email-outline' size={20} color={COLORS.lightBlue} />
                                        <View style={{ width: 20 }} />
                                        <TextInput style={{ flex: 1 }} onChangeText={handleChange("email")} placeholder='Enter your email' onFocus={() => { setFieldTouched("email") }} value={values.email} autoCapitalize='none' autoCorrect={false} />
                                    </View>
                                    {touched.email && touched.email && (
                                        <Text style={styles.error}>{errors.email}</Text>
                                    )}
                                </View>
                            </View>

                            <View style={styles.wrapper}>
                                <Text style={styles.label}>Verify</Text>
                                <View>
                                    <View style={[styles.input, { borderColor: `${touched.verify ? COLORS.lightBlue : COLORS.lightGray}` }]}>
                                        {isVerify ? <Octicons name='verified' size={20} color={COLORS.lightBlue} /> : <Octicons name='unverified' size={20} color={COLORS.lightBlue} />}
                                        <View style={{ width: 20 }} />
                                        <TextInput style={{ flex: 1 }} onChangeText={handleChange("verify")} placeholder='Verify email code' onFocus={() => { setFieldTouched("verify") }} value={values.verify} autoCapitalize='none' autoCorrect={false} />
                                        {isSend == true ? (
                                            <TouchableOpacity onPress={() => verifycode(values)}>
                                                <ReusableText text={"verify"} size={SIZES.small} family={"400"} />
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity onPress={() => sendcode(values)}>
                                                <ReusableText text={"Get Code"} size={SIZES.small} family={"400"} />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                    {touched.verify && touched.verify && (
                                        <Text style={styles.error}>{errors.verify}</Text>
                                    )}
                                </View>
                            </View>

                            <View style={styles.wrapper}>
                                <Text style={styles.label}>Password</Text>
                                <View>
                                    <View style={[styles.input, { borderColor: `${touched.password ? COLORS.lightBlue : COLORS.lightGray}` }]}>
                                        <MaterialCommunityIcons name='lock-outline' size={20} color={COLORS.lightBlue} />
                                        <View style={{ width: 20 }} />
                                        <TextInput style={{ flex: 1 }} secureTextEntry={!obsecureText} onChangeText={handleChange("password")} placeholder='Enter your password' onFocus={() => { setFieldTouched("password") }} value={values.password} autoCapitalize='none' autoCorrect={false} />
                                        <TouchableOpacity onPress={() => { setObsecureText(!obsecureText) }}>
                                            <MaterialCommunityIcons name={obsecureText ? "eye-outline" : "eye-off-outline"} size={18} />
                                        </TouchableOpacity>
                                    </View>
                                    {touched.password && touched.password && (
                                        <Text style={styles.error}>{errors.password}</Text>
                                    )}
                                </View>
                            </View>

                            <View style={{ height: 20 }} />

                            <ReusableButton title='REGISTER' onPress={handleSubmit} width={SIZES.width - 40} bgColor={COLORS.green} borderColor={COLORS.black} borderWidth={1} textColor={COLORS.white} />
                            <View style={{ height: 80 }} />
                            
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.lightWhite,
        paddingTop: 40,
    },
    wrapper: {
        marginBottom: 15
    },
    label: {
        fontWeight: "400",
        fontSize: SIZES.small,
        marginBottom: 5,
        marginEnd: 5,
        textAlign: "right"
    },
    input: {
        backgroundColor: COLORS.lightWhite,
        borderWidth: 1,
        height: 50,
        borderRadius: 12,
        flexDirection: "row",
        paddingHorizontal: 15,
        alignItems: "center"
    },
    error: {
        color: COLORS.red,
        fontSize: SIZES.small,
        fontWeight: "300",
        marginTop: 5,
        marginLeft: 5,
    },
    imageContainer: {
        width: 180,
        height: 180,
        borderWidth: 1,
        borderColor: '#3182CE',
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    placeholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#4A5568',
        fontSize: 16,
    }
})

export default Register
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { COLORS, SIZES } from '@/constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ReusableButton } from '..';

interface FormValues {
    email: string;
    password: string;
    username: string;
}

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Provide a valid email").required("Required"),
    password: Yup.string().min(6, "Password must be atleast 6 characters").required("Required"),
    username: Yup.string().min(3, "Username must be atleast 3 characters").required("Required"),
})

const handleRegistration = async (values: FormValues, resetForm: () => void) => {
    const { email, password } = values;
    // here we connect the backend 
  };

const Register = () => {
    const [obsecureText, setObsecureText] = useState(false);

    return (
        <View style={styles.container}>
            <Formik initialValues={{ email: "", password: "", username: "" }} validationSchema={validationSchema} onSubmit={(values: FormValues, { resetForm }: FormikHelpers<FormValues>) => handleRegistration(values, resetForm)} >
                {({ handleChange, touched, handleSubmit, values, errors, setFieldTouched }) => (
                    <View>
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

                        <View style={{height: 20}}/>

                        <ReusableButton title='REGISTER' onPress={handleSubmit} width={SIZES.width-40} bgColor={COLORS.green} borderColor={COLORS.black} borderWidth={1} textColor={COLORS.white}/>

                    </View>
                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.lightWhite,
        paddingTop: 60
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
    }
})

export default Register
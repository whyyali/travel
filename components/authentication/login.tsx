import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import * as Yup from "yup";
import { Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import { COLORS, SIZES } from '@/constants/theme';
import { ReusableButton } from '..';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BACKEND_URL } from '@env';
import { router } from 'expo-router';

interface FormValues {
    email: string;
    password: string;
}

const validationSchema = Yup.object().shape({
    password: Yup.string().min(6, "Password must be atleast 6 characters").required("Required"),
    email: Yup.string().email("Provide a valid email").required("Required"),
})

const handleLogin = async (values: FormValues, resetForm: () => void) => {
    const { email, password } = values;
    try {
        const response = await fetch(`${BACKEND_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.status) {
            Alert.alert('Login Successful', 'Welcome back!', [{ text: 'OK' }]);
            router.navigate("(tab)/home")
            resetForm();
        } else {
            console.log("Login Failed", data.message)
        }
    } catch (error) {
        console.error('Error during login:', error);
        Alert.alert('Error', 'An error occurred during login. Please try again.', [{ text: 'OK' }]);
    }
  };

const Login = () => {
    const [obsecureText, setObsecureText] = useState(false);
  return (
    <View style={styles.container}>
      <Formik initialValues={{email: "", password: ""}}  validationSchema={validationSchema} onSubmit={(values: FormValues, { resetForm }: FormikHelpers<FormValues>) => handleLogin(values, resetForm)}>
        {({handleChange, touched, handleSubmit, values, errors, isValid, setFieldTouched}) => (
            <View>
                <View style={styles.wrapper}>
                    <Text style={styles.label}>Email</Text>
                    <View>
                        <View style={[styles.input, { borderColor: `${touched.email ? COLORS.lightBlue : COLORS.lightGray}` }]}>
                            <MaterialCommunityIcons name='email-outline' size={20} color={COLORS.gray}/>
                            <View style={{width: 20}}/>
                            <TextInput style={{flex:1}} onChangeText={handleChange("email")} placeholder='Enter Your Email' onFocus={() => {setFieldTouched("email")}} value={values.email} autoCapitalize='none' autoCorrect={false} />
                        </View>
                        {touched.email && errors.email && (
                            <Text style={styles.error}>{errors.email}</Text>
                        )}
                    </View>
                </View>

                <View style={styles.wrapper}>
                    <Text style={styles.label}>Password</Text>
                    <View>
                        <View style={[styles.input, { borderColor: `${touched.password ? COLORS.lightBlue : COLORS.lightGray}` }]}>
                            <MaterialCommunityIcons name='lock-outline' size={20} color={COLORS.gray}/>
                            <View style={{width: 20}}/>
                            <TextInput style={{flex:1}} secureTextEntry={!obsecureText} onChangeText={handleChange("password")} placeholder='Enter Your Password' onFocus={() => {setFieldTouched("password")}} value={values.password} autoCapitalize='none' autoCorrect={false} />
                            <TouchableOpacity onPress={() => {setObsecureText(!obsecureText)}}>
                                <MaterialCommunityIcons  name={obsecureText ? "eye-outline" : "eye-off-outline"} size={18} />
                            </TouchableOpacity>
                        </View>
                        {touched.password && errors.password && (
                            <Text style={styles.error}>{errors.password}</Text>
                        )}
                    </View>
                </View>
                
                <View style={{height: 20}} />

                <ReusableButton onPress={handleSubmit} title='SIGN IN' width={SIZES.width - 40} bgColor={COLORS.green} borderColor={COLORS.black} borderWidth={1} textColor={COLORS.white} />
            </View>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 20,
        backgroundColor: COLORS.lightWhite,
        paddingTop: 60
    },
    wrapper:{
        marginBottom: 20
    },
    label:{
        fontWeight: "400",
        fontSize: SIZES.small,
        marginBottom: 5,
        marginEnd: 5,
        textAlign: "right"
    },
    input:{
        backgroundColor: COLORS.lightWhite,
        borderWidth: 1,
        height: 50,
        borderRadius: 12,
        flexDirection: "row",
        paddingHorizontal: 15,
        alignItems: "center"
    },
    error:{
        color: COLORS.red,
        fontSize: SIZES.small,
        fontWeight: "300",
        marginTop: 5,
        marginLeft: 5,
    }
})

export default Login
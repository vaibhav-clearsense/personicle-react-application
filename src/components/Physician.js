import {Pressable, View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import { getPhyQuestions } from '../../api/http';
import {PhysiciansQuestion} from '../navigationStacks'
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "../RootNavigation";
import {navigate} from "../RootNavigation"

function Physician({physician_user_id, questions, physician: {name} = {}} ) {
  
    function  physicianPressHandler(){
        navigate("Questionnaire", {phyName: name, questions: questions['questions']});
    }
    return (
        <SafeAreaView>
            <Pressable onPress={physicianPressHandler} style={({pressed}) => pressed && styles.pressed}>
                <View style={styles.phy}>
                    <View >
                        <Text styles={[styles.text]}>{name}</Text>
                    </View>
                </View>
            </Pressable>
        </SafeAreaView>)
}
export default Physician;
const styles = StyleSheet.create({
    phy:{
        padding: 12,
        marginVertical: 8,
        backgroundColor: '#e4e6eb',
        borderRadius: 6,
        elevation: 3,
        shadowColor: '#BDC3C7',
        shadowRadius: 4,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        
    },
    text: {
        alignItems: 'center'
    },
    pressed: {
        opacity: 0.75
    }

})
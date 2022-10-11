import {Pressable, View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import { getPhyQuestions } from '../../api/http';
import {PhysiciansQuestion} from '../navigationStacks'
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "../RootNavigation";
import {navigate} from "../RootNavigation"


function Physician({phy_id,visualization,responses,physician_user_id, questions, physician: {name} = {}} ) {
    console.error(visualization);
  
    function  physicianPressHandler(){
        if(!visualization)
            navigate("Questionnaire", {physician_id: physician_user_id, phyName: name, questions: questions['questions']});
        else
            navigate("Responses Visualization", {physician_id: phy_id, responses: responses[phy_id]});

    }   
    return (
        <SafeAreaView>
            { visualization == true ?  <Pressable onPress={physicianPressHandler} style={({pressed}) => pressed && styles.pressed}>
                <View style={styles.phy}>
                    <View >
                        <Text styles={[styles.text]}>{phy_id}</Text>
                    </View>
                </View>
            </Pressable> : <Pressable onPress={physicianPressHandler} style={({pressed}) => pressed && styles.pressed}>
                <View style={styles.phy}>
                    <View >
                        <Text styles={[styles.text]}>{name}</Text>
                    </View>
                </View>
            </Pressable>}
            
        </SafeAreaView>
        
        )
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
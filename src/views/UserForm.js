import React, {useState, useContext} from 'react'
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import { Avatar, FAB } from 'react-native-elements'
import UsersContext from '../context/UsersContext'

export default function UserForm({route, navigation}){
  const [user, setUser] = useState(route.params ? route.params : {})
  const { dispatch } = useContext(UsersContext)

  function handleSalvar(){
    if(!(user.name && user.email && user.avatarUrl)){
      Alert.alert(
        "Formulário Incompleto",
        "Todas as informações do cadastro devem ser preenchidas. Verifique e tente novamente.",
        [{ text: "Ok"}]
      )
      return
    } else if(!(/\S+@\S+\.\S+/.test(user.email))){
      Alert.alert(
        "E-mail inválido!",
        "O e-mail informado é inválido, verifique as informações e tente novamente.",
        [{ text: "Ok"}]
      )
      return
    }
    
    dispatch({
      type: user.id ? 'updateUser' : 'createUser',
      payload: user,
    })
    navigation.goBack()
  }

  return (
    <KeyboardAvoidingView style={styles.form} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.avatarContainer}>
        <Avatar 
          size={112}
          rounded
          icon={{ name: 'person' }}
          source={user.avatarUrl ? {uri: user.avatarUrl} : null}
          containerStyle={{ backgroundColor: '#babdbe' }}
        />
      </View>

      <Text style={styles.label}>Nome Completo</Text>
      <TextInput 
        style={styles.input}
        onChangeText={name => setUser({...user, name})}
        placeholder='Informe seu nome completo'
        value={user.name}
      />

      <Text style={styles.label}>E-mail</Text>
      <TextInput 
        style={styles.input}
        keyboardType='email-address'
        onChangeText={email => setUser({...user, email})}
        placeholder='Informe seu e-mail'
        value={user.email}
      />

      <Text style={styles.label}>URL do Avatar</Text>
      <TextInput 
        style={styles.input}
        onChangeText={avatarUrl => setUser({...user, avatarUrl})}
        placeholder='Informe a URL do seu Avatar'
        value={user.avatarUrl}
        selectTextOnFocus
      />

      <FAB
        title='Salvar'
        placement="right"
        icon={{ name: 'save', color: 'white' }}
        color="#00227b"
        onPress={handleSalvar}
      />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 16,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 128,
  },  
  label: {
    color: 'black',
    marginBottom: 4,
    paddingLeft: 2,
    fontSize: 14,
  },  
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 2,
    marginBottom: 16,
    borderRadius: 8,
    padding: 8,
  }
})
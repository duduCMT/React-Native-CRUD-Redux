import React, {useState, useContext} from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { FAB } from 'react-native-elements'
import UsersContext from '../context/UsersContext'

export default function UserForm({route, navigation}){
  const [user, setUser] = useState(route.params ? route.params : {})

  const { dispatch } = useContext(UsersContext)

  return (
    <View style={styles.form}>
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
      />

      <FAB
        title='Salvar'
        placement="right"
        icon={{ name: 'save', color: 'white' }}
        color="#00227b"
        onPress={() => {
          dispatch({
            type: user.id ? 'updateUser' : 'createUser',
            payload: user,
          })
          navigation.goBack()
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 16,
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
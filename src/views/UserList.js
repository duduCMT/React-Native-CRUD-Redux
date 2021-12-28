import React, { useContext } from 'react'
import { View, FlatList, Alert } from 'react-native'
import { Avatar, Button, ListItem } from 'react-native-elements'
import UsersContext from '../context/UsersContext'

export default function UserList({ navigation }) {
  const { state, dispatch } = useContext(UsersContext)

  function editUser(user){
    navigation.navigate('UserForm', user)
  }
  function removeUser(user){
    Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
      { text: 'Sim', onPress: () => dispatch({ type: 'deleteUser', payload: user })},
      { text: 'Não' }
    ])
  }

  function getUserItem({ item: user }) {
    return (
      <ListItem.Swipeable
        onPress={() => editUser(user)}
        key={user.id}
        bottomDivider
        leftContent={
          <Button
            title="Editar"
            icon={{ name: 'edit', color: 'white' }}
            buttonStyle={{ minHeight: '100%', backgroundColor: '#3949ab' }}
            onPress={ () => editUser(user) }
          />
        }
        rightContent={
          <Button
            title="Remover"
            icon={{ name: 'delete', color: 'white' }}
            buttonStyle={{ minHeight: '100%', backgroundColor: '#d32f2f' }}
            onPress={() => removeUser(user) }
          />
        }
      >
        <Avatar size={64} rounded source={{ uri: user.avatarUrl }} />
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem.Swipeable>
    )
  }

  return (
    <View>
      <FlatList
        data={state.users}
        keyExtractor={user => user.id.toString()}
        renderItem={getUserItem}
      />
    </View>
  )
}
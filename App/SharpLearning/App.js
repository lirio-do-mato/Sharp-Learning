/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useState }  from 'react';
import { SafeAreaView, ScrollView, StatusBar, Button, StyleSheet, Text, TextInput, useColorScheme, View, TouchableOpacity,} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';

//css
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 20,
  },
  background: {
      backgroundColor: '#46424A',
  },
  sectionTitle: {
    color:'#F7F4EB',
    textAlign:'center',
    fontSize: 26,
    fontWeight: '600',
  },
  sectionDescription: {
    paddingTop: 8,
    color: '#F7F4EB',
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: '400',
  },
  sectionAlign:{
    paddingTop:20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',  
    backgroundColor: '#46424A',
  },
  roundButton1: {
    width: 125,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize:16,
    borderRadius: 20,
    backgroundColor: '#420B2F',
  },
  sectionButtonText:{
    color: '#F7F4EB',
  },
  highlight: {
    fontWeight: '700',
  },
}); 

//variaveis com os dados do usuario
/*var nome;
function setNome(n){ alert("entrou");nome=n; }
var idade;
function setIdade(i){ idade=i; }
var email;
function setEmail(n){ email=n; }
var instrumento;
function setInstrumento(n){ instrumento=n; }
var educacao
function setEducacao(n){ educacao=n; }
var senha;
function setSenha(n){ senha=n; }
var senha2;
function setSenha2(n){ senha2=n; }*/

//stack navigator para mudar de telas
const Stack = createNativeStackNavigator();

function send(nome, idade, email, senha, senha2) {
  if(nome == '')//verifica se o nome é nulo
    alert("Preencha o seu nome");
  else
  {
    if(idade == '')//verifica se a idade é nula
      alert("Preencha a sua idade");
    else
    {
      if(email == '')//verifica se o email é nulo
        alert("Preencha o seu email");
      else{
        if(senha == '' || senha == null)//verifica se a senha é nula
          alert("Preencha a sua senha");
        else
        {
          if(senha2 == '') //verifica se a confirmação de senha é nula
            alert("Preencha a confirmação da sua senha");
          else
          {
            if(senha != senha2)//verifica se as senhas são iguais
              alert("As senhas devem ser iguais");
            else
            {
              fetch('http://143.106.202.159:3001/addUsers', { //ip da maquina que roda o server
                method: 'post',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  nome: nome,
                  idade: idade,
                  email: email,
                  senha: senha
                })
              })
              .then(res => res.text())
              .then(
                data => {alert("Usuario cadastrado com sucesso"); 
                navigation.navigate('Home');
              })
              .catch(erro => {alert(erro)})
            }
          }
        } 
      }  
    }
  }
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
        /*style={{color:'Red'} }*/
      />
    </View>
  );
}

function SignUpScreen({ navigation }) {
  React.useEffect(() =>navigation.addListener('beforeRemove', (e) => {
    e.preventDefault();
  }));
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senha2, setSenha2] = useState('');
  return (
    <View style={styles.background}>
      <View>
        <TextInput style={styles.sectionDescription} placeholder="Nome" onChangeText={nome => setNome(nome)} defaultValue={nome}/>
        <TextInput style={styles.sectionDescription} placeholder="Idade" keyboardType="numeric" onChangeText={idade => setIdade(idade)} defaultValue={idade}/>
        <TextInput style={styles.sectionDescription} placeholder="Email" onChangeText={email => setEmail(email)} defaultValue={email}/>
        <TextInput style={styles.sectionDescription} name="senha" secureTextEntry={true} placeholder="Senha" onChangeText={senha => setSenha(senha)} defaultValue={senha}/>
        <TextInput style={styles.sectionDescription} name="confirmeSenha" secureTextEntry={true} placeholder="Confirme a Senha" onChangeText={senha2 => setSenha2(senha2)} defaultValue={senha2}/>
        <View style={styles.sectionAlign}>
          <TouchableOpacity onPress={send(nome, idade, email, senha, senha2)} style={styles.roundButton1}>
            <Text style={styles.sectionButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerBackVisible: false,title: 'Cadastro', }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
/*
Install before running:
npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs
npm install uuid
npm install node-sass
*/
import React, { useState }  from 'react';
import { SafeAreaView, ScrollView, StatusBar, Button, StyleSheet, Text, TextInput, useColorScheme, View, TouchableOpacity,} from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { v4 as uuid } from "uuid";
//css
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 20,
  },
  background: {
  },
  sectionTitle: {
    color:'#F7F4EB',
    textAlign:'center',
    fontSize: 26,
    fontWeight: '600',
  },
  sectionDescription: {
    paddingTop: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: '400',
  },
  sectionAlign:{
    paddingTop:20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',  
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
//stack navigator para mudar de telas
const Stack = createNativeStackNavigator();
const Stack2 = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Função que realiza o cadastro
function send({ navigation },nome, idade, email, senha, senha2) {
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
              fetch('http://192.168.15.44:3001/addUsers', { //ip da maquina que roda o server
                method: 'post',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({//transforma as variaveis em JSON
                  nome: nome,
                  idade: idade,
                  email: email,
                  senha: senha
                })
              })
              .then(res => res.text())
              .then(//se cadastrou
                data => {alert("Usuario cadastrado com sucesso"); 
                navigation.navigate('MainNav', { nome: nome, idade: idade, email: email, senha: senha });//vai para home
              })
              .catch(erro => {alert(erro)})
            }
          }
        } 
      }  
    }
  }
}

//Função que realiza o login
function SignIn({ navigation },email, senha) {
  if(email == '')//verifica se o email é nulo
    alert("Preencha o seu email");
  else{
    if(senha == '')//verifica se a senha é nula
      alert("Preencha a sua senha");
    else
    {
      fetch('http://192.168.15.44:3001/getUsers', { //ip da maquina que roda o server
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(res => res.json())
      .then(
        data => {
          var achouEmail = false;
          var i = 0
          for(; i < data.length && achouEmail==false; i++)
            if(data[i].email==email)
              achouEmail=true;
          if(achouEmail)
            if(data[i].senha==senha)
              navigation.navigate('MainNav', { nome: data[i].nome, idade: data[i].idade, email: data[i].email, senha: data[i].senha});//vai para home
            else
              alert("Senha incorreta");
          else
            alert("Nenhum usuario encontrado com esse email")
      })
      .catch(erro => {alert(erro)})
    }  
  }
}
function search({ navigation }){
  fetch('http://192.168.15.44:3001/getTxts', { //ip da maquina que roda o server
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(res => res.json())
  .then(data => {navigation.navigate('DefaultTexts', {info: data})})
  .catch(erro => {alert(erro)})
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainNav">
        <Stack.Screen name="MainNav" component={MainNav} options={{ headerShown: false }}/>
        <Stack.Screen name="SignPage" component={SignPage} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainNav({ navigation }) {
  React.useEffect(() => navigation.addListener('beforeRemove', (e) => {
    e.preventDefault();
  }));
  return (
    <Stack2.Navigator initialRouteName="Home">
      <Stack2.Screen name="Home" component={HomeScreen}  />
      <Stack2.Screen name="DefaultTexts" component={TextOpt} options={{ headerShown: false }}/>
      <Stack2.Screen name="TextSpec" component={TextSpec} options={{ headerShown: false }}/>
    </Stack2.Navigator>
  );
}

function SignPage({ navigation }) {
  return(
    <Tab.Navigator>
      <Tab.Screen name="SignUpScreen" component={SignUpScreen} />
      <Tab.Screen name="SignInScreen" component={SignInScreen} />
    </Tab.Navigator>
  )
}

function TextOpt({ route, navigation }) {
  const { info } = route.params;
  alert(info[0].titulo);
  return (
    <>
    {
      info.map(
        (texto) => {
          return 
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => alert(texto.titulo)} style={styles.roundButton1}>
                <Text style={styles.sectionButtonText}>{texto.paragrafo1}</Text>
              </TouchableOpacity>
            </View>
        }
      )
    }
      
    </>
  );
}
function TextSpec() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>placeholder</Text>
    </View>
  );
}

function HomeScreen({ navigation }) {
  const [ inst, setInst ] = useState("");
  return (
    <View style={styles.sectionAlign}>
      <TouchableOpacity onPress={() => search({ navigation })} style={styles.roundButton1}>
        <Text style={styles.sectionButtonText}>Aulas textuais</Text>
      </TouchableOpacity>
    </View>
  );
}
 
function SignUpScreen({ navigation }) {
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
          <TouchableOpacity onPress={() => send({navigation}, nome, idade, email, senha, senha2)} style={styles.roundButton1}>
            <Text style={styles.sectionButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  return (
    <View style={styles.background}>
      <View>
        <TextInput style={styles.sectionDescription} placeholder="Email" onChangeText={email => setEmail(email)} defaultValue={email}/>
        <TextInput style={styles.sectionDescription} name="senha" secureTextEntry={true} placeholder="Senha" onChangeText={senha => setSenha(senha)} defaultValue={senha}/>
        <View style={styles.sectionAlign}>
          <TouchableOpacity onPress={() => SignIn({ navigation },email, senha)} style={styles.roundButton1}>
            <Text style={styles.sectionButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default App;
import React, { useState }  from 'react';
import { SafeAreaView, ScrollView, StatusBar, Button, StyleSheet, Text, TextInput, useColorScheme, View, TouchableOpacity,} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RNPickerSelect from "react-native-picker-select";

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

//stack navigator para mudar de telas
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Função que realiza o cadastro
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
                navigation.navigate('Home');//vai para home
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
function SignIn(nome, idade, email, senha, senha2) {
  if(email == '')//verifica se o email é nulo
    alert("Preencha o seu email");
  else{
    if(senha == '')//verifica se a senha é nula
      alert("Preencha a sua senha");
    else
    {
          fetch('http://143.106.202.159:3001/getUsers', { //ip da maquina que roda o server
            method: 'get',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(res => res.text())
          .then(
            data => {alert("chegou"); 
            navigation.navigate('Home');//vai para home
          })
          .catch(erro => {alert(erro)})
    }  
  }
}

function search(inst){
  
}

function HomePage({ navigation }) {
  React.useEffect(() => navigation.addListener('beforeRemove', (e) => {
    e.preventDefault();
  }));
  return(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

function SignPage({ navigation }) {
  return(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="SignUpScreen" component={SignUpScreen} />
        <Tab.Screen name="SignInScreen" component={SignInScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function HomeScreen({ navigation }) {
  const [ inst, setInst ] = useState("");
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Instrumento: </Text>
      <RNPickerSelect
          onValueChange={(inst) => setInst(inst)}
          items={[
              { label: "JavaScript", value: "JavaScript" },
              { label: "TypeStript", value: "TypeStript" },
              { label: "Python", value: "Python" },
              { label: "Java", value: "Java" },
              { label: "C++", value: "C++" },
              { label: "C", value: "C" },
          ]}
      />
      <Button
        title="Pesquisar"
        onPress={() => Serch(inst)}
      />
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
          <TouchableOpacity onPress={() => send(nome, idade, email, senha, senha2)} style={styles.roundButton1}>
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
          <TouchableOpacity onPress={() => SignIn(email, senha)} style={styles.roundButton1}>
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
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
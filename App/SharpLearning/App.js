/*
Install before running:
npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs
npm install uuid
npm install node-sass
npm install react-native-youtube -S
*/
import React, { useState }  from 'react';
import { SafeAreaView, ScrollView, StatusBar, Button, StyleSheet, Text, TextInput, useColorScheme, View, TouchableOpacity,} from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { v4 as uuid } from "uuid";
import YouTube from 'react-native-youtube';
import { WebView } from 'react-native-webview';
//css
const styles = StyleSheet.create({
  contentor: {
    margin: 70,
    backgroundColor: '#f0dedd' 
  },
  sectionContainer: {
    marginTop: 20,
  },
  header: {
    backgroundColor: '#4E2780',
    padding: 4,
    color: '#FFF',
    text: 'Home',
    fontFamily: 'Glacial Indifference Regular',
  },
  sectionTitle: {
    color:'#F7F4EB',
    textAlign:'center',
    fontSize: 26,
    fontWeight: '600',
  },
  camposLogin: {//Login e Cadastro usam o mesmo css
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
    backgroundColor: '#D0C3F1'  
  },
  home:{ //css da pagina principal
    padding:50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#412c5c'  
  },
  tituloHome:{
    fontFamily: 'League Spartan Bold',
    fontSize: 50,
    color: '#d0c3f1',
    paddingTop: 25
  },
  botoesDaHome: {// botoes da pagina home
    width: 300,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize:30,
    borderRadius: 20,
    backgroundColor: '#420B2F',
    margin: 20,
    fontFamily: 'Glacial Indifference Regular'
  },
  textoBotoesHome:{// Texto dos botoes da home
    color: '#F7F4EB',
  },
  janelaTextoExplicativo: {
    paddingTop:20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',  
    fontFamily: 'Glacial Indifference Regular',
    backgroundColor: '#F0D0DD',
    borderColor: '#420b2f',
    borderWidth: 2,
    borderRadius: 5
  },
  textoExplicativo:{
    color: '#17131C',
    fontSize: 22,
    borderLeftWidth: 5,
    borderRadius: 3,
    padding: 5
  },
  forms: {

  },
  inputForms: {

  },
  perguntasForms: {

  },
  botaoLogin: {//Login e Cadastro usam o mesmo css
    width: 125,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize:16,
    borderRadius: 20,
    backgroundColor: '#420B2F',
  },
  textoBotaoLogin:{//Login e Cadastro usam o mesmo css
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
      fetch('http://143.106.200.197:3001/getUsers', { //ip da maquina que roda o server
        method: 'get',
        headers: {'Content-Type': 'application/json'},
      })
      .then(res => res.json())
      .then(
        data => {
          var achouEmail = false;
          var i = 0
          var j =0;
          for(; i < data.length && achouEmail==false; i++)
            if(data[i].email==email)
            {
              j=i;
              achouEmail=true;
            }
          if(achouEmail)
            if(data[j].senha==senha)
              navigation.navigate('Home', { nome: data[j].nome, idade: data[j].idade, email: data[j].email, senha: data[j].senha });//vai para home
            else
              alert("Senha incorreta");
          else
            alert("Nenhum usuario encontrado com esse email")
      })
      .catch(erro => {alert(erro)})  
    }
  }
}

//Função que realiza o login
function Answer({ navigation }, email,nome, senha, idade, r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12,) {
  if(r1 == '' || r2 == '' || r3 == '' || r4 == '' || r5 == '' || r6 == '' || r7 == '' || r8 == '' || r9 == '' || r10 == '' || r11 == '' || r12 == '')//verifica se o email é nulo
    alert("Preencha todas as informações");
  else{
    fetch('http://192.168.15.44:3001/addAnswerAval', { //ip da maquina que roda o server
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({//transforma as variaveis em JSON
        email: email, 
        resp1: r1,
        resp2: r2,
        resp3: r3,
        resp4: r4,
        resp5: r5,
        resp6: r6,
        resp7: r7,
        resp8: r8,
        resp9: r9,
        resp10: r10,
        resp11: r11,
        resp12: r12,
      })
    })
    .then(res => res.text())
    .then(//se cadastrou
      data => {alert("Respostas enviadas com sucesso"); 
      navigation.navigate('Home', {nome:nome, email:email, senha:senha, idade:idade});//vai para home
    })
    .catch(erro => {alert(erro)})
  }
}

function searchTxt({ navigation }){
  fetch('http://192.168.15.44:3001/getTxts', { //ip da maquina que roda o server
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(res => res.json())
  .then(data => {navigation.navigate('TextMain', {info: data})})
  .catch(erro => {alert(erro)})
}
function searchVid({ navigation }){
  fetch('http://192.168.15.44:3001/getVids', { //ip da maquina que roda o server
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(res => res.json())
  .then(data => {navigation.navigate('VidMain', {info: data})})
}
function searchForm({ navigation }, email, nome, senha, idade){
  fetch('http://192.168.15.44:3001/getForms', { //ip da maquina que roda o server
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(res => res.json())
  .then(data => {
    alert(email);navigation.navigate('FormMain', {info: data, nome:nome, email:email, senha:senha, idade:idade})})
  .catch(erro => {alert(erro)})
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignPage">
        <Stack.Screen name="SignPage" component={SignPage} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={HomeScreen}  />
        <Stack.Screen name="TextMain" component={TextMain} options={{ headerShown: false }}/>
        <Stack.Screen name="TextSpec" component={TextSpec} options={{ headerShown: false }}/>
        <Stack.Screen name="FormMain" component={FormMain} options={{ headerShown: false }}/>
        <Stack.Screen name="FormSpec1" component={FormSpec1} options={{ headerShown: false }}/>
        <Stack.Screen name="FormSpec2" component={FormSpec2} options={{ headerShown: false }}/>
        <Stack.Screen name="FormSpec3" component={FormSpec3} options={{ headerShown: false }}/>
        <Stack.Screen name="VidMain" component={VidMain} options={{ headerShown: false }}/>
        <Stack.Screen name="VidSpec" component={VidSpec} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
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

function TextMain({ route, navigation }) {
  const { info } = route.params;
  //alert(info[0].titulo);
  return (
    <>
    {
      info.map(
        texto => {
          //alert(texto.titulo);
          return(
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('TextSpec', {info: texto})}>
                <Text>{texto.titulo}</Text>
              </TouchableOpacity>
            </View>
          );
        }
      )
    }
    </>
  );
}

function FormMain({ route, navigation }) {
  const { info } = route.params;
  const email = route.params.email;
  const nome = route.params.nome;
  const idade = route.params.idade;
  const senha = route.params.senha;
  //alert(info[0].titulo);
  return (
    <>
    {
      info.map(
        form => {
          //alert(texto.titulo);
          return(
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('FormSpec1', {info: form, email:email, nome:nome, senha:senha, idade:idade})}>
                <Text>{form.titulo}</Text>
              </TouchableOpacity>
            </View>
          );
        }
      )
    }
    </>
  );
}

function VidMain({ route, navigation }) {
  const { info } = route.params;
  //alert(info[0].titulo);
  return (
    <>
    {
      info.map(
        texto => {
          //alert(texto.titulo);
          return(
            <View>
              <TouchableOpacity onPress={() => {alert(texto.link);navigation.navigate('VidSpec', {info: texto})}}>
                <Text>{texto.titulo}</Text>
              </TouchableOpacity>
            </View>
          );
        }
      )
    }
    </>
  );
}

function TextSpec({ route, navigation }) {
  const { info } = route.params;
  return (
    <View style={styles.janelaTextoExplicativo}>
      <Text style={styles.textoExplicativo}>{info.titulo}</Text>
      <Text style={styles.textoExplicativo}>{info.paragrafo1}</Text>
      <Text style={styles.textoExplicativo}>{info.paragrafo2}</Text>
      <Text style={styles.textoExplicativo}>{info.paragrafo3}</Text>
      <Text style={styles.textoExplicativo}>{info.paragrafo4}</Text>
    </View>
  );
}

function FormSpec1({ route, navigation }) {
  const { info } = route.params;
  const email = route.params.email;
  const nome = route.params.nome;
  const idade = route.params.idade;
  const senha = route.params.senha;
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [p3, setP3] = useState('');
  const [p4, setP4] = useState('');
  return (
    <View style={styles.forms}>
      <Text style={styles.perguntasForms}>{info.pergunta1}</Text>
      <TextInput style={styles.inputForms} onChangeText={p1 => setP1(p1)} defaultValue={p1}/>
      <Text style={styles.perguntasForms}>{info.pergunta2}</Text>
      <TextInput style={styles.inputForms} onChangeText={p2 => setP2(p2)} defaultValue={p2}/>
      <Text style={styles.perguntasForms}>{info.pergunta3}</Text>
      <TextInput style={styles.inputForms} onChangeText={p3 => setP3(p3)} defaultValue={p3}/>
      <Text style={styles.perguntasForms}>{info.pergunta4}</Text>
      <TextInput style={styles.inputForms} onChangeText={p4 => setP4(p4)} defaultValue={p4}/>
      <TouchableOpacity onPress={() => {
        if(p1 == '' || p2 == '' || p3 == '' || p4 == '')
          alert("Preencha todas as respostas");
        else 
          navigation.navigate('FormSpec2', {info: info, email:email, nome:nome, senha:senha, idade:idade, p1: p1, p2: p2, p3: p3, p4: p4});
      }}>
        <Text>Proxima</Text>
      </TouchableOpacity>
    </View>
  );
}

function FormSpec2({ route, navigation }) {
  const { info } = route.params;
  const email = route.params.email;
  const nome = route.params.nome;
  const idade = route.params.idade;
  const senha = route.params.senha;
  const p1 = route.params.p1;
  const p2 = route.params.p2;
  const p3 = route.params.p3;
  const p4 = route.params.p4;
  const [p5, setP5] = useState('');
  const [p6, setP6] = useState('');
  const [p7, setP7] = useState('');
  const [p8, setP8] = useState('');
  return (
    <View style={styles.forms}>
      <Text style={styles.perguntasForms}>{info.pergunta5}</Text>
      <TextInput style={styles.inputForms} onChangeText={p5 => setP5(p5)} defaultValue={p5}/>
      <Text style={styles.perguntasForms}>{info.pergunta6}</Text>
      <TextInput style={styles.inputForms} onChangeText={p6 => setP6(p6)} defaultValue={p6}/>
      <Text style={styles.perguntasForms}>{info.pergunta7}</Text>
      <TextInput style={styles.inputForms} onChangeText={p7 => setP7(p7)} defaultValue={p7}/>
      <Text style={styles.perguntasForms}>{info.pergunta8}</Text>
      <TextInput style={styles.inputForms} onChangeText={p8 => setP8(p8)} defaultValue={p8}/>
      <TouchableOpacity onPress={() => {
        if(p5 == '' || p6 == '' || p7 == '' || p8 == '')
          alert("Preencha todas as respostas");
        else 
          navigation.navigate('FormSpec3', {info: info, email:email, nome:nome, senha:senha, idade:idade, p1: p1, p2: p2, p3: p3, p4: p4, p5: p5, p6: p6, p7: p7, p8: p8});
      }}>
        <Text>Proxima</Text>
      </TouchableOpacity>
    </View>
  );
}

function FormSpec3({ route, navigation }) {
  const { info } = route.params;
  const email = route.params.email;
  const nome = route.params.nome;
  const idade = route.params.idade;
  const senha = route.params.senha;
  const p1 = route.params.p1;
  const p2 = route.params.p2;
  const p3 = route.params.p3;
  const p4 = route.params.p4;
  const p5 = route.params.p5;
  const p6 = route.params.p6;
  const p7 = route.params.p7;
  const p8 = route.params.p8;
  const [p9, setP9] = useState('');
  const [p10, setP10] = useState('');
  const [p11, setP11] = useState('');
  const [p12, setP12] = useState('');
  return (
    <View style={styles.forms}>
      <Text style={styles.perguntasForms}>{info.pergunta9}</Text>
      <TextInput style={styles.inputForms} style={styles.inputForms} onChangeText={p9 => setP9(p9)} defaultValue={p9}/>
      <Text style={styles.perguntasForms}>{info.pergunta10}</Text>
      <TextInput style={styles.inputForms} onChangeText={p10 => setP10(p10)} defaultValue={p10}/>
      <Text style={styles.perguntasForms}>{info.pergunta11}</Text>
      <TextInput style={styles.inputForms} onChangeText={p11 => setP11(p11)} defaultValue={p11}/>
      <Text style={styles.perguntasForms}>{info.pergunta12}</Text>
      <TextInput style={styles.inputForms} onChangeText={p12 => setP12(p12)} defaultValue={p12}/>
      <TouchableOpacity onPress={() => alert(email)} style={styles.botoesDaHome}>
        <Text style={styles.textoBotoesHome}>Resultados das Avaliações</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        if(p9 == '' || p10 == '' || p11 == '' || p12 == '')
          alert("Preencha todas as respostas");
        else 
          Answer({ navigation }, email, nome, senha, idade, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12)
      }}>
        <Text>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

function VidSpec({ route, navigation }) {
  const link = route.params.info.link;
  return (
    <View style={{flex: 1}}>
      <WebView
          style={ {  marginTop: (Platform.OS == 'android') ? 20 : 0,} }
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{uri: link}}
      />
    </View>
  );
}

function HomeScreen({ route, navigation }) {
  React.useEffect(() => navigation.addListener('beforeRemove', (e) => {
    e.preventDefault();
  }));
  const email = route.params.email;
  const nome = route.params.nome;
  const idade = route.params.idade;
  const senha = route.params.senha;
  return (
    <View style={styles.home}>
      <Text style={styles.tituloHome}>Sharp Learning</Text>
      <View style={styles.contentor}>
        <TouchableOpacity onPress={() => searchTxt({ navigation })} style={styles.botoesDaHome}>
          <Text style={styles.textoBotoesHome}>Aulas textuais</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => searchVid({ navigation })} style={styles.botoesDaHome}>
          <Text style={styles.textoBotoesHome}>Video aulas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => searchForm({ navigation }, email, nome, senha, idade)} style={styles.botoesDaHome}>
          <Text style={styles.textoBotoesHome}>Avaliações</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert(email)} style={styles.botoesDaHome}>
          <Text style={styles.textoBotoesHome}>Resultados das Avaliações</Text>
        </TouchableOpacity>
      </View>
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
        <TextInput style={styles.camposLogin} placeholder="Nome" onChangeText={nome => setNome(nome)} defaultValue={nome}/>
        <TextInput style={styles.camposLogin} placeholder="Idade" keyboardType="numeric" onChangeText={idade => setIdade(idade)} defaultValue={idade}/>
        <TextInput style={styles.camposLogin} placeholder="Email" onChangeText={email => setEmail(email)} defaultValue={email}/>
        <TextInput style={styles.camposLogin} name="senha" secureTextEntry={true} placeholder="Senha" onChangeText={senha => setSenha(senha)} defaultValue={senha}/>
        <TextInput style={styles.camposLogin} name="confirmeSenha" secureTextEntry={true} placeholder="Confirme a Senha" onChangeText={senha2 => setSenha2(senha2)} defaultValue={senha2}/>
        <View style={styles.sectionAlign}>
          <TouchableOpacity onPress={() => send({navigation}, nome, idade, email, senha, senha2)} style={styles.botaoLogin}>
            <Text style={styles.textoBotaoLogin}>Enviar</Text>
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
        <TextInput style={styles.camposLogin} placeholder="Email" onChangeText={email => setEmail(email)} defaultValue={email}/>
        <TextInput style={styles.camposLogin} name="senha" secureTextEntry={true} placeholder="Senha" onChangeText={senha => setSenha(senha)} defaultValue={senha}/>
        <View style={styles.sectionAlign}>
          <TouchableOpacity onPress={() => SignIn({ navigation },email, senha)} style={styles.botaoLogin}>
            <Text style={styles.textoBotaoLogin}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default App;
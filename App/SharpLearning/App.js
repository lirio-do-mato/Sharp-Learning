/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Button,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Picker,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => Node = () => {


const [nome, setNome] = useState('');
const [idade, setIdade] = useState('');
const [email, setEmail] = useState('');
const [educacao, setEducacao] = useState('');
const [instrumento, setInst] = useState('');
const [senha, setSenha] = useState('');
const [senha2, setSenha2] = useState('');

function send() {
  if(nome == '')
    alert("Preencha o seu nome");
  else
  {
    if(idade == '')
      alert("Preencha a sua idade");
    else
    {
      if(email == '')
        alert("Preencha o seu email");
      else{
        if(instrumento=='')
          alert("Escolha um instrumento para acompanhar este curso, as opções validas atualmente são: Violão, Canto e Violino");
        else{
          if(instrumento.toLowerCase()!='canto'&&instrumento.toLowerCase()!='violão'&&instrumento.toLowerCase()!='violino'&&instrumento.toLowerCase()!='nenhum')
            alert("Escolha um instrumento valido, as opções atuais são: Nenhum, Violão, Canto e Violino");
          else{
            if(educacao=='')
              alert("Defina seu nivel de educação musical. As opções validas são: Nenhuma, Basica, Intermediaria, Avançada");
            else{
              if(educacao.toLowerCase()!='nenhuma'&&educacao.toLowerCase()!='basica'&&educacao.toLowerCase()!='intermediaria'&&educacao.toLowerCase()!='avançada')
                alert("Defina seu nivel de educação musical. As opções validas são: Nenhuma, Basica, Intermediaria, Avançada");
              else
              {
                if(senha == '')
                  alert("Preencha a sua senha");
                else
                {
                  if(senha2 == '')
                    alert("Preencha a confirmação da sua senha");
                  else
                  {
                    if(senha != senha2)
                      alert("As senhas devem ser iguais");
                    else
                    {
                      fetch('http://143.106.203.210:3001/addUsers', {
                        method: 'post',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          nome: nome,
                          idade: idade,
                          email: email,
                          educacao: educacao,
                          toca: instrumento,
                          senha: senha
                        })
                      })
                      .then(res => res.text())
                      .then(data => {alert("Usuario cadastrado com sucesso");})
                      .catch(erro => {alert(erro)})
                    }
                  }
                }
              }
            }
          }
        }
      }  
    }
  }
}
 
  return (
    <View style={styles.background}>
      <Text style={styles.sectionTitle}> Cadastro </Text>
      <View>
        <TextInput style={styles.sectionDescription} placeholder="Nome" onChangeText={nome => setNome(nome)} defaultValue={nome}/>
        <TextInput style={styles.sectionDescription} placeholder="Idade" onChangeText={idade => setIdade(idade)} defaultValue={idade}/>
        <TextInput style={styles.sectionDescription} placeholder="Email" onChangeText={email => setEmail(email)} defaultValue={email}/>
        <TextInput style={styles.sectionDescription} placeholder="Educação Musical" onChangeText={educacao => setEducacao(educacao)} defaultValue={educacao}/>
        <TextInput style={styles.sectionDescription} placeholder="Toca instrumento" onChangeText={instrumento => setInst(instrumento)} defaultValue={instrumento}/>
        <TextInput style={styles.sectionDescription} name="senha" secureTextEntry={true} placeholder="Senha" onChangeText={senha => setSenha(senha)} defaultValue={senha}/>
        <TextInput style={styles.sectionDescription} name="confirmeSenha" secureTextEntry={true} placeholder="Confirme a Senha" onChangeText={senha2 => setSenha2(senha2)} defaultValue={senha2}/>
        <View style={styles.sectionAlign}>
          <TouchableOpacity onPress={send} style={styles.roundButton1}>
            <Text style={styles.sectionButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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
 
export default App;
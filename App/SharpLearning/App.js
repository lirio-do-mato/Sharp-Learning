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
 } from 'react-native';
 
 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 const App: () => Node = () => {
   const isDarkMode = useColorScheme() === 'dark';
 
   const [nome, setNome] = useState('');
   const [idade, setIdade] = useState('');
   const [email, setEmail] = useState('');
   const [senha, setSenha] = useState('');
   const [senha2, setSenha2] = useState('');
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };
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
                 fetch('http://143.106.201.0:3001/addUsers', {
                   method: 'post',
                   headers: {
                     'Accept':'application/json','Content-Type': 'application/json'
                   },
                   body: JSON.stringify({
                     nome: nome,
                     idade: idade,
                     email: email,
                     educacao: 'Mediano',
                     toca: 'Violão',
                     senha: senha
                   })
                 }).then(res => res.text())
                 .then(data => 
                  {
                    alert("Usuario cadastrado com sucesso");
                  })
                  .catch(erro => {
                    alert(erro)
                  })
               }
             }
           }
         }
       }
     }
   }
 
   return (
     <View >
     <Text style={[styles.sectionTitle,{color: isDarkMode ? Colors.white : Colors.black,},]}> Cadastro </Text>
     <View>
       <TextInput placeholder="Nome" onChangeText={nome => setNome(nome)} defaultValue={nome}/>
       <TextInput placeholder="Idade" onChangeText={idade => setIdade(idade)} defaultValue={idade}/>
       <TextInput placeholder="Email" onChangeText={email => setEmail(email)} defaultValue={email}/>
       <Text style={[{color: isDarkMode ? Colors.white : Colors.black,},]}>Escolha o instrumento que acompanhara este app</Text>
       <Picker style={[{color: isDarkMode ? Colors.white : Colors.black,},]}>
         <Picker.Item label="Nenhum" value="nenhum" />
         <Picker.Item label="Baixo" value="baixo" />
         <Picker.Item label="Bateria" value="Bateria" />
         <Picker.Item label="Canto" value="canto" />
         <Picker.Item label="Piano" value="piano" />
         <Picker.Item label="Violão" value="violão" />
         <Picker.Item label="Violino" value="violino" />
       </Picker>
       <Text style={[{color: isDarkMode ? Colors.white : Colors.black,},]}>Selecione qual descreve melhor sua educação musical</Text>
       <Picker style={[{color: isDarkMode ? Colors.white : Colors.black,},]}>
         <Picker.Item label="Nenhum" value="nenhum" />
         <Picker.Item label="Basico" value="basico" />
         <Picker.Item label="Mediano" value="medio" />
         <Picker.Item label="Avançado" value="avançado" />
       </Picker>
       <TextInput name="senha" secureTextEntry={true} placeholder="Senha" onChangeText={senha => setSenha(senha)} defaultValue={senha}/>
       <TextInput name="confirmeSenha" secureTextEntry={true} placeholder="Confirme a Senha" onChangeText={senha2 => setSenha2(senha2)} defaultValue={senha2}/>
       <Button onPress={send} title="Enviar" color="#841584"/>
     </View>
   </View>
   );
 };
 
 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
 });
 
 export default App;
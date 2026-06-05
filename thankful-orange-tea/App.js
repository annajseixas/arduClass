import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// --- TELA 1: LOGIN ---
function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    if (email !== '' && senha !== '') {
      navigation.replace('Dashboard');
    } else {
      Alert.alert('Erro', 'Preencha e-mail e senha para acessar os materiais.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ArduClass</Text>
      <Text style={styles.subtitle}>Laboratório de Robótica</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="E-mail" 
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Senha" 
        value={senha}
        onChangeText={setSenha}
        secureTextEntry 
      />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

// --- TELA 2: DASHBOARD ---
function DashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bem-vindo(a) ao Laboratório!</Text>
      <Text style={styles.text}>Aulas ativas: Introdução ao Arduino</Text>
      
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Catalogo')}>
        <Text style={styles.cardTitle}> Catálogo e Tutoriais</Text>
        <Text style={styles.cardDesc}>Acesse os esquemas de montagem.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Progresso')}>
        <Text style={styles.cardTitle}> Enviar Progresso</Text>
        <Text style={styles.cardDesc}>Valide seu circuito com o professor.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logoutBtn]} onPress={() => navigation.replace('Login')}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

// --- TELA 3: CATÁLOGO DE COMPONENTES ---
function CatalogoScreen({ navigation }) {
  const componentes = [
    { id: '1', nome: 'LED RGB e Resistores', dif: 'Fácil' },
    { id: '2', nome: 'Sensor Ultrassônico HC-SR04', dif: 'Médio' },
    { id: '3', nome: 'Motor DC com Ponte H', dif: 'Difícil' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Componentes Disponíveis</Text>
      <FlatList
        data={componentes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.listItem}
            onPress={() => navigation.navigate('Tutorial', { componente: item.nome })}
          >
            <Text style={styles.listTitle}>{item.nome}</Text>
            <Text style={styles.listSub}>Dificuldade: {item.dif}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// --- TELA 4: TUTORIAL DE MONTAGEM ---
function TutorialScreen({ route, navigation }) {
  const { componente } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Montagem: {componente}</Text>
      
      <View style={styles.stepBox}>
        <Text style={styles.stepTitle}>Passo 1:</Text>
        <Text style={styles.stepText}>Conecte o GND da placa à linha negativa da protoboard.</Text>
      </View>
      
      <View style={styles.stepBox}>
        <Text style={styles.stepTitle}>Passo 2:</Text>
        <Text style={styles.stepText}>Ligue o pino de sinal na porta digital 9.</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => {
        Alert.alert('Sucesso', 'Etapa marcada como concluída!');
        navigation.goBack();
      }}>
        <Text style={styles.buttonText}>Marcar como Concluído</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// --- TELA 5: ENVIO DE PROGRESSO ---
function ProgressoScreen({ navigation }) {
  const [duvida, setDuvida] = useState('');

  const enviarAtividade = () => {
    Alert.alert('Enviado!', 'Sua foto e dúvidas foram enviadas para avaliação.');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Validação Prática</Text>
      <Text style={styles.text}>Tire uma foto do seu protótipo montado na bancada.</Text>
      
      <TouchableOpacity style={styles.photoButton}>
        <Text style={styles.buttonText}> Abrir Câmera</Text>
      </TouchableOpacity>

      <TextInput 
        style={[styles.input, styles.textArea]} 
        placeholder="Descreva problemas ou dúvidas sobre o circuito..." 
        value={duvida}
        onChangeText={setDuvida}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={enviarAtividade}>
        <Text style={styles.buttonText}>Enviar para Avaliação</Text>
      </TouchableOpacity>
    </View>
  );
}

// --- CONFIGURAÇÃO DE NAVEGAÇÃO ---
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerStyle: { backgroundColor: '#0284c7' }, headerTintColor: '#fff' }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Home - ArduClass' }} />
        <Stack.Screen name="Catalogo" component={CatalogoScreen} options={{ title: 'Catálogo' }} />
        <Stack.Screen name="Tutorial" component={TutorialScreen} options={{ title: 'Passo a Passo' }} />
        <Stack.Screen name="Progresso" component={ProgressoScreen} options={{ title: 'Enviar Atividade' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f9ff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0369a1',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#0284c7',
    textAlign: 'center',
    marginBottom: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0c4a6e',
    marginBottom: 15,
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    color: '#334155',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bae6fd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#0284c7',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutBtn: {
    backgroundColor: '#ef4444',
    marginTop: 30,
  },
  photoButton: {
    backgroundColor: '#10b981',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0369a1',
    marginBottom: 5,
  },
  cardDesc: {
    color: '#64748b',
  },
  listItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#0284c7',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  listSub: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 5,
  },
  stepBox: {
    backgroundColor: '#e0f2fe',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  stepTitle: {
    fontWeight: 'bold',
    color: '#0369a1',
    marginBottom: 5,
  },
  stepText: {
    color: '#334155',
  }
});
import React from 'react';
import { ActivityIndicator, Alert,  Button, FlatList, 
    Image, ListView, Platform, ScrollView, SectionList, StyleSheet, Text, TextInput,
    TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, 
    TouchableWithoutFeedback, View  } from 'react-native';

import {StackNavigator} from 'react-navigation';

export default class LoginScreen extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        cpfText: "",
        passwordText: "",
        placeholderCpfText: "CPF OU PASSAPORTE",
        placeholderPasswordText: "SENHA",
      }
    }

  _onPressButtonForgotPassword() {
    Alert.alert('Esqueci!')
  }
  
  _onPressButton() {
    Alert.alert('Entrou!')
  }

  render() {
    return (
      <View style={styles.login}> 
          <Text style={{ paddingBottom: 5, paddingLeft: 19, fontSize: 12, color: '#f47920'}}> 
            {this.state.cpfText.length > 0 ? this.state.placeholderCpfText : ""}
          </Text>
          <TextInput
          style={{ paddingBottom: 10, paddingLeft: 20, color: "#fff", fontSize: 16}}
          placeholder={this.state.placeholderCpfText}
          placeholderTextColor="#ccc"
          maxLength={11}
          underlineColorAndroid='transparent'
          onChangeText={(text) => this.setState({
            cpfText: text
          })}
          />
          <View style={{backgroundColor: '#7d7d7d', marginLeft:20, marginRight:20, marginBottom:20, height: 2}}></View>

          <Text style={{ paddingBottom: 5, paddingLeft: 19, fontSize: 12, color: '#f47920'}}> 
             {this.state.passwordText.length > 0 ? this.state.placeholderPasswordText : ""}
          </Text>
          <TextInput
          style={{ paddingBottom: 10, paddingLeft: 20, color: "#fff", fontSize: 16}}
          placeholder={this.state.placeholderPasswordText}
          placeholderTextColor="#ccc"
          secureTextEntry={true}
          maxLength={6}
          keyboardType="numeric"
          underlineColorAndroid='transparent'
          onChangeText={ (text) => this.setState({
            passwordText: text
          })}
          />

          <View style={{backgroundColor: '#7d7d7d', marginBottom: 10, marginLeft:20, marginRight:20, height: 2}}></View>
          <TouchableOpacity onPress={this._onPressButtonForgotPassword} underlayColor="white">
            <Text style={{marginLeft: 20, marginTop: 5, fontSize: 12, color: '#fff'}}> ESQUECI MINHA SENHA </Text>
          </TouchableOpacity>
          
          <View style={{alignItems: 'center', marginTop: 20}}>
            <TouchableOpacity onPress={this._onPressButton} underlayColor="white">
              <View style={styles.button}>
                <Text style={styles.buttonText}>Entrar</Text>
              </View>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.customContainer}>
        <Button
          title="Go to Jane's profile"
          color="#aaaaaa"
          onPress={() =>
            navigate('Profile', { name: 'Jane' })
          }
        />
      </View>
    );
  }
}

class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile Screen',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.customContainer}>
        <Button
          title="Go to Joe's profile"
          color="#aaaaaa"
          onPress={() =>
            navigate('LastScreen', { name: 'Jane' })
          }
        />
      </View>
      // <Button
      //   title="Go to next screen"
      //   onPress={() =>
      //     navigate('LastScreen', { name: 'Test' })
      //   }
      // />
    );
  }
}

class LastScreen extends React.Component {
  static navigationOptions = {
    title: 'Last Screen',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.customContainer}>
        <Button 
          color='#aaaaaa'
          title="Go back to home"
          onPress={() =>
            navigate('Home')
          }
        />
      </View>
    );
  }
}

const App = StackNavigator({
  Home: {screen: HomeScreen},
  Profile: { screen: ProfileScreen},
  LastScreen: { screen: LastScreen}
});

//export default App;

export class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.setState({
          isLoading: false, 
          dataSource: ds.cloneWithRows(responseJson.movies),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={{flex: 1, paddingTop: 40, paddingLeft: 20, paddingBottom: 20}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData.title}, {rowData.releaseYear} </Text>}/>
      </View>
    )
  }

}

// ListView - https://facebook.github.io/react-native/docs/using-a-listview.html
export class FlatListBasics extends React.Component {
  render() {
    return (
    <View style={styles.container}>
      <FlatList
        data={[
          {key: 'Devin'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
          {key: 'Julia'},
          {key: 'Juliette'},
          {key: 'Devin2'},
          {key: 'Jackson2'},
          {key: 'James2'},
          {key: 'Joel2'},
          {key: 'Jillian2'},
          {key: 'Jimmy2'},
          {key: 'Julie2'},
          {key: 'Julia2'},
          {key: 'Juliette2'},
        ]}
        renderItem={({item}) => <Text style={styles.item} >{item.key} </Text>}
      />
    </View>
    );  
  }
}

// SectionView - https://facebook.github.io/react-native/docs/using-a-listview.html
export class SectionListBasics extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SectionList
          sections= {[
            {title: 'D', data: ['Devin', 'Devon', "Dianne", "Dialog", "Ddd"]},
            {title: 'J', data: ['Jackson', 'James', 'JD', 'Jillian', 'Jimmy', 'Joel']},
            {title: 'T', data: ['Tirion', 'Tyrone', 'T-Rex', 'T-Pain', 'Test']}
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item} </Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    )
  }
}


// Button, touch and ScrollView 
// https://facebook.github.io/react-native/docs/handling-touches.html
// https://facebook.github.io/react-native/docs/using-a-scrollview.html
export class Touchables extends React.Component {
  _onPressButton() {
    Alert.alert('You tapped the button!')
  }

  _onLongPressButton() {
    Alert.alert('You long-pressed the button!')
  }

  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
        <TouchableHighlight onPress={this._onPressButton} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>TouchableHighlight</Text>
          </View>
        </TouchableHighlight>
        <TouchableOpacity onPress={this._onPressButton}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>TouchableOpacity</Text>
          </View>
        </TouchableOpacity>
        <TouchableNativeFeedback
            onPress={this._onPressButton}
            background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>TouchableNativeFeedback</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableWithoutFeedback
            onPress={this._onPressButton}
            >
          <View style={styles.button}>
            <Text style={styles.buttonText}>TouchableWithoutFeedback</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableHighlight onPress={this._onPressButton} onLongPress={this._onLongPressButton} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>Touchable with Long Press</Text>
          </View>
        </TouchableHighlight>
        <Text>Test 1.</Text>
        <Text>Test 2.</Text>
        <Text>Test 3.</Text>
        <Text>Test 1.</Text>
        <Text>Test 2.</Text>
        <Text>Test 3.</Text>
        <Text>Test 1.</Text>
        <Text>Test 2.</Text>
        <Text>Test 3.</Text>

        <Text>Test 1.</Text>
        <Text>Test 2.</Text>
        <Text>Test 3.</Text>
        <Text>Test 1.</Text>
        <Text>Test 2.</Text>
        <Text>Test 3.</Text>
        <Text>Test 1.</Text>
        <Text>Test 2.</Text>
        <Text>Test 3.</Text>
        <Text>Test 1.</Text>
        <Text>Test 2.</Text>
        <Text>Test 3.</Text>
      </View>
      </ScrollView>
    );
  }
}

// Pizza Translator - https://facebook.github.io/react-native/docs/handling-text-input.html
export class PizzaTranslator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <View style={{padding: 50}}>
        <Button
          onPress={() => {
            Alert.alert('You tapped the button!');
          }}
          title="Press Me"
        />
        <TextInput
          style={{ paddingTop: 50, fontSize: 42}}
          placeholder="Type here"
          onChangeText={(text) => this.setState({text})}
          />
          <Text style={{fontSize: 42}}>
            {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
          </Text>
      </View>
    )
  }

}

// Height and Width - https://facebook.github.io/react-native/docs/height-and-width.html
export class FlexDirectionBasics extends React.Component {
  render() {
    return (
      // Try setting `flexDirection` to `column`.
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, height: 200, backgroundColor: 'powderblue'}} />
        <View style={{flex: 1, height: 200, backgroundColor: 'steelblue'}} />
        <View style={{flex: 1, height: 200, backgroundColor: 'skyblue'}} />
      </View>
    );
  }
};

// Height and Width - https://facebook.github.io/react-native/docs/height-and-width.html
export class FixedDimensionsBasics extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'powderblue'}} />
        <View style={{flex: 2, backgroundColor: 'skyblue'}} />
        <View style={{flex: 3, backgroundColor: 'steelblue'}} />
      </View>
    );
  }
}

// Styles - https://facebook.github.io/react-native/docs/style.html
export class LotsOfStyles extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.red}> just red </Text> 
        <Text style={styles.bigblue}> just bigblue </Text> 
        <Text style={[styles.bigblue, styles.red]}> bigblue, then red </Text> 
        <Text style={[styles.red, styles.bigblue]}> red, then bigblue</Text> 
      </View>
    )
  }
 }

// State - https://facebook.github.io/react-native/docs/state.html
export class BlinkApp extends React.Component {
  render() {
    return (
      <View>
        <Text> I love to blink' </Text>
        <Blink text='Yes blinking is so great' />
        <Blink text='Why did they ever take this out of HTML' />
        <Blink text='Look at me look at me look at me' />
      </View>
    );
  }
}

// State - https://facebook.github.io/react-native/docs/state.html
class Blink extends React.Component {
  constructor (props) {
    super(props)
    this.state = {showText: true};

    //Toggle the state every second
    setInterval(() => {
      this.setState(previousState => {
        return { showText: !previousState.showText };
      });
    }, 1000);
  }

  render() {
    let display = this.state.showText ? this.props.text : '';
    return (
      // <View style={styles.container}>
      <Text>{display}</Text>
      // </View>
    );
  }
}

// Props - https://facebook.github.io/react-native/docs/props.html
export class LotsOfGreetings extends React.Component {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Greeting name='Rexxar' />
        <Greeting name='Jaina' />
        <Greeting name='Valeera' />
      </View>
    );
  }
}

// Props - https://facebook.github.io/react-native/docs/props.html
class Greeting extends React.Component {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    }
    return (
      <View >
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Text>Test 1.</Text>
        <Text>Test 2.</Text>
        <Text>Test 3.</Text>
        <Text>Hello {this.props.name}!</Text>
        <Image source={pic} style={{width: 250, height: 140}}/>
      </View>
    );
  }
}

// CSS to style the application
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  red: {
    paddingTop: 20,
    color: 'red'
  }, 
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30
  },
  customContainer: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: 'steelblue'
  },
  container: {
    paddingTop: 60
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#f26522',
    borderRadius: 45,
  },
  buttonText: {
    padding: 20,
    color: 'white',
    fontWeight: 'bold'
  }, 
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  login: {
    flex: 1,
    backgroundColor: '#333',
    justifyContent: 'center',
  }
});

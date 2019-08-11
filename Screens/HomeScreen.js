import React, { Component } from 'react'
import {Platform,StatusBar,AsyncStorage} from 'react-native'
import {createAppContainer,createBottomTabNavigator} from 'react-navigation'
import QuestionsHome from './QuestionsHome'
import { Font} from "expo";
import FarmerQuestions from './FarmerQuestions'
import {Header,Icon,Left,Body,Title,Right,Container} from 'native-base'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { logout} from '../src/utils/AuthUtil'


const AppTabNavigator=createBottomTabNavigator({
  Home:QuestionsHome,
  Questions:FarmerQuestions
 },
 {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      if (routeName === 'Home') {
        return (
          <Icon name="md-home" style={{color:tintColor}} size={24}/>
        );
      } else {
        return (
          <Icon name="chatboxes" style={{color:tintColor}} size={24}/>
        );
      }
    },
  }),
  tabBarOptions: {
    activeTintColor: '#FF6F00',
    inactiveTintColor: '#263238',
    showLabel:true
  },
}
 
 );

 const NavContainer = createAppContainer(AppTabNavigator);


class HomeScreen extends Component {
    constructor(props){
        super(props);
        
    }
     static router = NavContainer.router;
    state = {
        fontLoaded: false,
        title:'LetsFarm'
      };

    async componentWillMount() {
        await Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
        this.setState({ fontLoaded: true });

      }
      
    render() {
        return (
          <Container>
              <Header style={[styles.headerStyle,styles.androidHeader]}>
                    
                     <Left>
                     <Title style={{color:'white'}}>{this.state.title}</Title>
                       </Left> 
              
                   
                    <Right>
                        <AntIcon name="logout" style={styles.rightIcon} onPress={()=>logout(this.props)} size={20}/>
                    </Right>
                </Header>
             <NavContainer navigation={this.props.navigation} />

          </Container>
        );
    }
}



const styles={
    leftContent:{
        flexDirection:'row'
    },
    headerStyle:{
        backgroundColor:"#2980b9",
        height:90,
        borderBottomColor:"#757575"
    },
    leftIcon:{
        color:"#fff"

    },
    headerText:{
        fontSize:14,
        color:'white',
        marginRight: 10
    },

    rightIcon:{
        color:"#fff",
    },
    searchContent:{
        position:'absolute',
        left:0,
        right:0,
        top:90,
        height:70,
        backgroundColor:"#3a455c",
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:5

    },
    androidHeader:{
        ...Platform.select({
            android:{
                paddingTop:StatusBar.currentHeight
            }
        })
    }
}


export default HomeScreen

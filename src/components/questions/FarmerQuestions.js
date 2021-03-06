import React, { Component } from 'react'
import {View,ActivityIndicator} from 'react-native'
import {Input,Icon,Picker,Content, Container,Card} from 'native-base'
import QuestionCard from './QuestionCard.js'
import ActionButton from 'react-native-action-button';
import { connect } from "react-redux";
import {fetchQuestions} from '../../redux/actions/question';


class FarmerQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selected: "key1",
          questions:[]
        };
      }

      componentDidMount(){
        this.fetch();
      }
      fetch = async () =>{
            await this.props.fetchQuestions();
            if (this.props.isQtnsFetched){
                this.setState({questions:this.props.questions})
            }

      };

      onValueChange(value) {
        this.setState({
          selected: value
        });
      }
      renderQuestion(){
        return  this.state.questions.map((question)=>(

            <QuestionCard  navigation={this.props.navigation} key={question.id} singleQuestion={question} />
            ));

      }


    render() {
      const {fetchQtnError,isQtnsFetched,isLoading} =this.props
        return (
            <Container>

                <View style={{height:"10%",marginTop:5,flexDirection:'row', backgroundColor:'#f3f5f7',justifyContent:'space-between',marginLeft:5,marginRight:5,marginBottom:5}}>
                    <View style={{flexDirection:'row',width:'75%',justifyContent:'space-between', marginLeft:5,marginRight:5}}>
                            <Icon name="search"  style={{fontSize:20,paddingTop:17}}/>
                            <Input style={{marginLeft:10}} placeholder="search..."/>
                    </View>

                    <Picker
                        note
                        mode="dropdown"
                        style={{ alignItems:'flex-end',flex:1}}
                        selectedValue={this.state.selected}
                        onValueChange={this.onValueChange.bind(this)}
                        >
                        <Picker.Item label="Most Recent" value="key0" />
                        <Picker.Item label="Hot Today" value="key1" />
                        <Picker.Item label="Most Views" value="key2" />
                    </Picker>

                </View>


                <Content style={{marginTop:5}}>
                  {isLoading?
                    <ActivityIndicator style={{marginTop:10}} />
                  :
                    <Card style={{marginLeft:5,marginRight:5}}>
                        {this.renderQuestion()}
                    </Card>
                  }

                </Content>
                <ActionButton onPress={()=>this.props.navigation.navigate("PostQuestion")} buttonColor="#2980b9">
                </ActionButton>

            </Container>
        );
    }
}


const mapStateToProps = (state) =>{
  return {
      questions: state.questions.questions,
      isLoading: state.questions.isLoading,
      fetchQtnError: state.questions.fetchQtnError,
      isQtnsFetched:state.questions.isQtnsFetched

  }
};

export default connect(mapStateToProps,{fetchQuestions})(FarmerQuestions)

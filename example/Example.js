import React, {Component, PropTypes} from 'react';
import {View, TextInput} from 'react-native';
import Avatar from './Avatar';

export default class Example extends Component {
  static propTypes = {
    name: PropTypes.string,
    onPhoneChange: PropTypes.func
  };

  static defaultProps = {
    name: '',
    onPhoneChange: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {name: props.name};
  }

  render() {
    const {name} = this.state;
    return (
      <View>
        <Avatar name={name} image="../assets/avatar/empty-state.png"/>
        <TextInput testID="Example_NameInput" value={name} onChangeText={this.onNameChange.bind(this)}/>
        <TextInput testID="Example_PhoneInput" onChangeText={this.props.onPhoneChange}/>
      </View>
    );
  }

  onNameChange(name) {
    this.setState({name});
  }
}

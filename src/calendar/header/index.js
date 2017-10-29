import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import XDate from 'xdate';
import PropTypes from 'prop-types';
import styleConstructor from './style';
import { weekDayNames } from '../../dateutils';

class CalendarHeader extends Component {
  static propTypes = {
    theme: PropTypes.object,
    hideArrows: PropTypes.bool,
    month: PropTypes.instanceOf(XDate),
    addMonth: PropTypes.func,
    showIndicator: PropTypes.bool,
    firstDay: PropTypes.number,
    renderArrow: PropTypes.func,
    hideDayNames: PropTypes.bool,
    toggleMode: PropTypes.func,
    mode: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.style = styleConstructor(props.theme);
    this.addMonth = this.addMonth.bind(this);
    this.substractMonth = this.substractMonth.bind(this);
    this.toggleMode = this.toggleMode.bind(this)
  }

  toggleMode(){
    this.props.toggleMode();
  }

  addMonth() {
    this.props.addMonth(1);
  }

  substractMonth() {
    this.props.addMonth(-1);
  }

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.month.toString('yyyy MM') !==
      this.props.month.toString('yyyy MM')
    ) {
      return true;
    }
    if (nextProps.showIndicator !== this.props.showIndicator) {
      return true;
    }
    if (nextProps.mode !== this.props.mode) {
      return true;
    }
    return false;
  }

  render() {
    let leftArrow = <View />;
    let rightArrow = <View />;
    let leftControl = <View />;
    let rightControl = <View />;
    let weekDaysNames = weekDayNames(this.props.firstDay);
    if (!this.props.hideArrows) {
      leftArrow = (
        <TouchableOpacity
          onPress={this.substractMonth}
          style={this.style.arrow}
        >
          {this.props.renderArrow
            ? this.props.renderArrow('left')
            : <Image
                source={require('../img/previous.png')}
                style={this.style.arrowImage}
              />}
        </TouchableOpacity>
      );
      if(this.props.mode){
        leftControl = (
          <TouchableOpacity
            onPress={()=>{}}
            style={this.style.arrow}
          >
            {this.props.renderArrow
              ? this.props.renderArrow('left')
              : null}
          </TouchableOpacity>
        );
      } else {
        leftControl = (
          null
        );
      }
      rightArrow = (
        <TouchableOpacity onPress={this.addMonth} style={this.style.arrow}>
          {this.props.renderArrow
            ? this.props.renderArrow('right')
            : <Image
                source={require('../img/next.png')}
                style={this.style.arrowImage}
              />}
        </TouchableOpacity>
      );
      if(this.props.mode){
        rightControl = (
          <TouchableOpacity onPress={this.toggleMode} style={this.style.arrow}>
            {this.props.mode === 'week'
              ? <Image
                  source={require('../img/expand.png')}
                  style={this.style.controlImage}
                />
              : <Image
                  source={require('../img/collapse.png')}
                  style={this.style.controlImage}
                />}
          </TouchableOpacity>
        );
      } else {
        rightControl = (
          null
        );
      }
    }
    let indicator;
    if (this.props.showIndicator) {
      indicator = <ActivityIndicator />;
    }
    return (
      <View>
        <View style={this.style.header}>
          {leftControl}
          {leftArrow}
          <View style={{ flexDirection: 'row' }}>
            <Text style={this.style.monthText}>
              {this.props.month.toString(this.props.monthFormat ? this.props.monthFormat : 'MMMM yyyy')}
            </Text>
            {indicator}
          </View>
          {rightArrow}
          {rightControl}
        </View>
        {
          !this.props.hideDayNames &&
          <View style={this.style.weekBackground}>
          <View style={{backgroundColor: 'transparent'}}>
              <View style={this.style.week}>
                {weekDaysNames.map((day, idx) => (
                  <Text key={idx} style={this.style.dayHeader} numberOfLines={1}>{day}</Text>
                ))}
              </View>
            </View>
          </View>
        }
      </View>
    );
  }
}

export default CalendarHeader;

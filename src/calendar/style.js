import {StyleSheet} from 'react-native';
import * as defaultStyle from '../style';

const STYLESHEET_ID = 'stylesheet.calendar.main';

export default function getStyle(theme={}) {
  const appStyle = {...defaultStyle, ...theme};
  return StyleSheet.create({
    container: {
      paddingLeft: isNaN(appStyle.paddingLeft) ? 5 :  appStyle.paddingLeft,
      paddingRight: isNaN(appStyle.paddingRight) ? 5 :  appStyle.paddingRight,
      // flex: 1,
      backgroundColor: appStyle.calendarBackground,
      // height: 100,
    },
    week: {
      marginTop: isNaN(appStyle.weekMarginTop) ? 7 :  appStyle.weekMarginTop,
      marginBottom: isNaN(appStyle.weekMarginBottom) ? 7 :  appStyle.weekMarginBottom,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    ...(theme[STYLESHEET_ID] || {})
  });
}


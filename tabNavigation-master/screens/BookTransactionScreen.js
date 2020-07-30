import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class TransactionScreen extends React.Component {
  constructor(){
    super();
    this.state={
      hasCameraPermission:  null,
      scanned : false,
      scannedData :"",
      buttonState :"normal"
    }
  }

  getCameraPermission = async ()=>{
      const{status}=await Permissions.askAsync(Permissions.CAMERA);
      this.setState( {
          hasCameraPermission:status==="granted",
          buttonState:"clicked"
        })
  }

  handleBarCodeScan = async ({type,data})=>{
      this.setState({
        scanned:true,
        scannedData : data,
        buttonState:"normal"
      })

  }
    render() {
    const hasCameraPermission = this.state.hasCameraPermission;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;
    if(buttonState==="clicked" && hasCameraPermission){
      return(
        <BarCodeScanner onBarCodeScanned={
          scanned?undefined:this.handleBarCodeScan
        }>

        </BarCodeScanner>
      )
      
    }
    else if (buttonState==="normal"){
      return(
        <View><Text>
      hasCameraPermission===true?this.state.scannedData:"Requesting Camera Permission"</Text>
        </View>

      )

    }

      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Issue or Return</Text>
          <TouchableOpacity onpress={this.getCameraPermission}>
            <Text>
              Bar Code Scanner
            </Text>
          </TouchableOpacity>
          <View>
          <Text>
              hasCameraPermission===true?this.state.scannedData:
              "Requesting Camera Permission"
            </Text>
          </View>
        </View>
      );
    }
  }
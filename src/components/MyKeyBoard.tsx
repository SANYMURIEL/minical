import * as React from "react";
import { View, Text,StyleSheet  } from "react-native";
import { Styles } from "../styles/GlobalStyles";
import { myColors } from "../styles/Colors";
import Button from "./Buttons";


export default function MyKeyBoard() {
  const [firstNumber, setFirstNumber] = React.useState("");
  const [secondNumber, setSecondNumber] = React.useState("");
  const [operation, setOperation] = React.useState("");
  const [result, setResult] = React.useState<number | null>(null);

  const handleNumberPress = (buttonValue: string) => {
    // Allow decimal point only once per number
    if (buttonValue === "." && firstNumber.includes(".")) {
      return;
    }

    if (firstNumber.length < 10) {
      setFirstNumber(firstNumber + buttonValue);
    }
  };

  const handleOperationPress = (buttonValue: string) => {
    setOperation(buttonValue);
    setSecondNumber(firstNumber);
    setFirstNumber("");
  };

  const clear = () => {
    setFirstNumber("");
    setSecondNumber("");
    setOperation("");
    setResult(null);
  };

  const getResult = () => {
    if (firstNumber === "" || secondNumber === "") {
      return;
    }

    let num1 = parseFloat(secondNumber);
    let num2 = parseFloat(firstNumber);

    switch (operation) {
      case "+":
        clear();
        setResult(num1 + num2);
        break;

      case "-":
        clear();
        setResult(num1 - num2);
        break;

      case "*":
        clear();
        setResult(num1 * num2);
        break;

      case "/":
        clear();
        if (num2 === 0) {
          setResult(null); // Handle division by zero
          alert("Cannot divide by zero");
        } else {
          setResult(num1 / num2);
        }
        break;

      default:
        clear();
        setResult(0);
        break;
    }
  };

  const firstNumberDisplay = () => {
    if (result != null) {
      return (
        <Text
          style={[
            Styles.screenFirstNumber,
            {
              fontSize: result < 99999 ? 70 : 50,
              color: myColors.result,
            },
          ]}
        >
          {result.toFixed(2)} 
        </Text>
      );
    }

    if (firstNumber && firstNumber.length < 6) {
      return <Text style={Styles.screenFirstNumber}>{firstNumber}</Text>;
    }

    if (firstNumber === "") {
      return <Text style={Styles.screenFirstNumber}>{"0"}</Text>;
    }

    if (firstNumber.length > 5 && firstNumber.length < 8) {
      return (
        <Text style={[Styles.screenFirstNumber, { fontSize: 70 }]}>
          {firstNumber}
        </Text>
      );
    }

    if (firstNumber.length > 7) {
      return (
        <Text style={[Styles.screenFirstNumber, { fontSize: 50 }]}>
          {firstNumber}
        </Text>
      );
    }
  };

  return (
    <View style={Styles.viewBottom}>
      <View
        style={{
          height: 120,
          width: "96%",
          justifyContent: "flex-end",
          alignSelf: "center",
        }}
      >
        <Text style={Styles.screenSecondNumber}>{secondNumber}</Text>
        <Text style={{ color: "purple", fontSize: 50, fontWeight: '500' }}>
          {operation}
        </Text>
        {firstNumberDisplay()}
      </View>

      <View style={Styles.row}>
        
          
       
        <Button title="AC" isGray onPress={clear} />
        
        
        <Button title="=" isBlue onPress={() => getResult()} />
       
           
        
      </View>
      <View style={Styles.row}>
        <Button title="7" onPress={() => handleNumberPress("7")} />
        <Button title="8" onPress={() => handleNumberPress("8")} />
        <Button title="9" onPress={() => handleNumberPress("9")} />
        <Button title="X" isBlue onPress={() => handleOperationPress("*")} />
      </View>
      <View style={Styles.row}>
        <Button title="4" onPress={() => handleNumberPress("4")} />
        <Button title="5" onPress={() => handleNumberPress("5")} />
        <Button title="6" onPress={() => handleNumberPress("6")} />
        <Button title="-" isBlue onPress={() => handleOperationPress("-")} />
      </View>
      <View style={Styles.row}>
        <Button title="1" onPress={() => handleNumberPress("1")} />
        <Button title="2" onPress={() => handleNumberPress("2")} />
        <Button title="3" onPress={() => handleNumberPress("3")} />
        <Button title="+" isBlue onPress={() => handleOperationPress("+")} />
      </View>
      <View style={Styles.row}>
        <Button title="." onPress={() => handleNumberPress(".")} />
        <Button title="0" onPress={() => handleNumberPress("0")} />
        <Button title="<-" onPress={() => setFirstNumber(firstNumber.slice(0, -1))} />
       
             <Button title="/" isBlue onPress={() => handleOperationPress("/")} />
      </View>
    </View>
  );
}
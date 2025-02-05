import * as React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Styles } from "../styles/GlobalStyles";
import { myColors } from "../styles/Colors";
import Button from "./Buttons";

export default function MyKeyBoard() {
  const [firstNumber, setFirstNumber] = React.useState("");
  const [secondNumber, setSecondNumber] = React.useState("");
  const [operation, setOperation] = React.useState("");
  const [result, setResult] = React.useState<number | null>(null);

  // Nouvelle état pour suivre si une opération est en attente
  const [operationPending, setOperationPending] = React.useState(false);

  // Fonction utilitaire pour réinitialiser l'état
  const resetState = () => {
    setFirstNumber("");
    setSecondNumber("");
    setOperation("");
    setResult(null);
    setOperationPending(false);
  };

  const handleNumberPress = (buttonValue: string) => {
    // Réinitialiser si un résultat est affiché
    if (result !== null) {
      resetState();
    }

    if (buttonValue === "." && firstNumber.includes(".")) {
      return;
    }

    if (firstNumber.length < 10) {
      setFirstNumber(firstNumber + buttonValue);
    }
  };

  const handleOperationPress = (buttonValue: string) => {
    // Empêcher les opérations consécutives
    if (operationPending) {
      return;
    }

    // Gérer le cas où aucun nombre n'a été entré
    if (firstNumber === "") {
      return;
    }

    setOperation(buttonValue);
    setSecondNumber(firstNumber);
    setFirstNumber("");
    setResult(null); // Réinitialiser le résultat
    setOperationPending(true); // Marquer qu'une opération est en attente
  };

  const clear = () => {
    resetState();
  };

  const calculateResult = () => {
    if (firstNumber === "" || secondNumber === "") {
      return;
    }

    let num1 = parseFloat(secondNumber);
    let num2 = parseFloat(firstNumber);

    if (isNaN(num1) || isNaN(num2)) {
      Alert.alert("Erreur", "Entrée invalide");
      return;
    }

    switch (operation) {
      case "+":
        setResult(num1 + num2);
        break;

      case "-":
        setResult(num1 - num2);
        break;

      case "*":
        setResult(num1 * num2);
        break;

      case "/":
        if (num2 == 0) {
          Alert.alert("Erreur", "Division par zéro impossible");
          return;
        } else {
          setResult(num1 / num2);
        }
        break;

      default:
        Alert.alert("Erreur", "Opération non reconnue");
        break;
    }

    setFirstNumber("");
    setSecondNumber("");
    setOperation("");
    setOperationPending(false);
  };

  const firstNumberDisplay = () => {
    let displayValue = firstNumber;

    if (result !== null) {
      displayValue = result.toFixed(2);
    }

    if (displayValue === "") {
      displayValue = "0";
    }

    let fontSize = 70;
    if (displayValue.length > 5 && displayValue.length < 8) {
      fontSize = 70;
    } else if (displayValue.length > 7) {
      fontSize = 50;
    }

    return (
      <Text
        style={[
          Styles.screenFirstNumber,
          {
            fontSize: fontSize,
            color: myColors.result,
          },
        ]}
      >
        {displayValue}
      </Text>
    );
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
        <Text style={{ color: "purple", fontSize: 50, fontWeight: "500" }}>
          {operation}
        </Text>
        {firstNumberDisplay()}
      </View>

      <View style={Styles.row}>
        <Button title="AC" isGray onPress={clear} />
        <Button title="=" isBlue onPress={calculateResult} />
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
        <Button
          title="<-"
          onPress={() => setFirstNumber(firstNumber.slice(0, -1))}
        />
        <Button title="/" isBlue onPress={() => handleOperationPress("/")} />
      </View>
    </View>
  );
}

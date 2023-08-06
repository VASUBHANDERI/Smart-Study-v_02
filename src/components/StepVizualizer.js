import React, { useState } from "react";
import { View, Text, Button } from "react-native";

const StepVisualizer = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  if (steps.length === 0) {
    return null;
  }

  const step = steps[currentStep];

  return (
    <View>
      <Text>Step {currentStep + 1}</Text>
      <Text>{step.description}</Text>
      <Button
        title="Previous"
        onPress={handlePreviousStep}
        disabled={currentStep === 0}
      />
      <Button
        title="Next"
        onPress={handleNextStep}
        disabled={currentStep === steps.length - 1}
      />
    </View>
  );
};

export default StepVisualizer;

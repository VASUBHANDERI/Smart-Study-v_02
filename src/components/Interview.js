import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from "react-native";
import { Audio } from "expo-av";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import questionsData from "./question.json"; // Import the questions data
import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons"; // Import icons from react-native-vector-icons
import {
  main,
  primary,
  text,
  background,
  processColor,
  main50,
} from "../components/Colors"; // Import colors from app/colors.js
import useWindowSize from "../Hooks/useWindowSize";
// import  {readFileSync} from "fs";

const Interview = () => {
  const [sourceSentence, setSourceSentence] = useState("");
  const [targetSentences, setTargetSentences] = useState([]);
  const [score, setScore] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isRecordingStopped, setIsRecordingStopped] = useState(true);
  const [transcription, setTranscription] = useState("");
  const [recording, setRecording] = useState(null);
  const [recordings, setRecordings] = useState([]); // Store recorded audio URIs here
  const [playback, setPlayback] = useState(null);
  const [transcriptionInProgress, setTranscriptionInProgress] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [width, height] = useWindowSize();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: background,
      padding: 24,
      borderRadius: 30,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    questionText: {
      fontWeight: "bold",
      fontSize: 24,
      marginBottom: 20,
    },
    recordButton: {
      borderWidth: 3,
      borderColor: main,
      padding: 10,
      borderRadius: 25,
      marginBottom: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    answerText: {
      textAlign: "left",
    },
    answerTextBox: {
      borderWidth: 1,
      borderColor: main,
      backgroundColor: background,
      width: 600, // Set the width to 600
      padding: 10,
      borderRadius: 10,
      marginBottom: 20,
      // alignItems: "center",
      justifyContent: "center",
    },
    loader: {
      marginTop: 20,
    },
    similarityContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      position: "absolute",
      marginHorizontal: 20,
      bottom: 20, // Adjust this value to control the distance from the bottom
      left: 0,
      right: 0,
    },
    similarityButton: {
      backgroundColor: main50,
      alignSelf: "center",
      padding: 16,
      borderRadius: 36,
      alignItems: "center",
      justifyContent: "center",
    },
    navButton: {
      backgroundColor: main50,
      padding: 8,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    similarityText: {
      fontSize: 18,
      marginVertical: 10,
    },
  });

  const API_URL =
    "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2";

  const API_URL_1 =
    "https://api-inference.huggingface.co/models/openai/whisper-large-v2";
  const API_TOKEN = "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";

  useEffect(() => {
    Audio.requestPermissionsAsync();
    setSourceSentence(questionsData[currentQuestionIndex].modelAnswer);
  }, []);

  const handleCalculateSimilarity = async () => {
    try {
      const data = {
        inputs: {
          source_sentence: sourceSentence,
          sentences: targetSentences,
        },
      };

      const response = await axios.post(API_URL, data, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      setScore(response.data);
      console.log(response.data);
      console.log("Source", sourceSentence);
      console.log("targetSentence", targetSentences);
      console.log(score);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSourceSentence(questionsData[currentQuestionIndex].modelAnswer);
      setScore([]);
      setTranscription(""); // Clear the previous transcription
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSourceSentence(questionsData[currentQuestionIndex].modelAnswer);
      setScore([]);
      setTranscription(""); // Clear the previous transcription
    }
  };
  const startRecording = async () => {
    setTranscription(""); // Clear the previous transcription
    setTargetSentences([]); // Clear the previous target sentences
    setScore([]); // Clear the previous score
    try {
      if (isRecordingStopped) {
        const { status } = await Audio.requestPermissionsAsync();

        if (status !== "granted") {
          console.error("Audio recording permission not granted.");
          return;
        }

        const recordingObject = new Audio.Recording();
        await recordingObject.prepareToRecordAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );

        setRecording(recordingObject);
        setIsRecording(true);
        setIsRecordingStopped(false);

        // Start the recording
        await recordingObject.startAsync();
      }
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = async () => {
    try {
      if (isRecording) {
        // Stop the recording
        await recording.stopAndUnloadAsync();
        setIsRecording(false);
        setIsRecordingStopped(true);

        const audioURI = recording.getURI();

        // Save the audio data to AsyncStorage
        const recordingKey = `recording_${new Date().getTime()}`;
        await AsyncStorage.setItem(recordingKey, audioURI);

        // Update the list of recordings
        setRecordings((prevRecordings) => [audioURI, ...prevRecordings]);

        // After stopping the recording, transcribe the audio
        await transcribeAudio(audioURI);
      }
    } catch (error) {
      console.error("Error stopping recording:", error);
    }
  };

  const playRecording = async (audioURI) => {
    try {
      if (playback) {
        await playback.unloadAsync();
        setPlayback(null);
      }

      const { sound } = await Audio.Sound.createAsync({ uri: audioURI });

      setPlayback(sound);
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing recording:", error);
    }
  };

  const transcribeAudio = async (audioURI) => {
    setTranscriptionInProgress(true);
    const maxRetries = 3;
    let retryCount = 0;

    while (retryCount < maxRetries) {
      try {
        if (
          !audioURI ||
          typeof audioURI !== "string" ||
          audioURI.trim() === ""
        ) {
          console.error("Invalid audioURI. It should be a non-empty string.");
          return;
        }

        const audioBlob = await fetch(audioURI).then((response) =>
          response.blob()
        );

        if (!audioBlob) {
          console.error("Failed to fetch the audio blob from the URI.");
          return;
        }

        const response = await fetch(API_URL_1, {
          method: "POST",
          headers: {
            Authorization: "Bearer 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",
            "Content-Type": "application/octet-stream",
          },
          body: audioBlob,
        });

        if (response.ok) {
          console.log("Response:", response);
          const result = await response.json();
          console.log("Result:", result);
          if (result && result.text) {
            setTranscription(result.text);
            setTargetSentences([result.text]);
          } else {
            console.log("Response:", response);
            console.log("Result:", result);
            console.error("Transcription result is empty.");
            setTranscription("Transcription not available.");
          }
          setTranscriptionInProgress(false);
          return;
        } else {
          console.error(
            "Error transcribing audio. HTTP Status:",
            response.status
          );
          console.error("Response Body:", await response.text());
        }
      } catch (error) {
        console.error("Error transcribing audio:", error);
      }

      retryCount++;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.error("Failed to transcribe audio after multiple retries.");
    setTranscriptionInProgress(false);
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.centeredView}>
            <Text style={styles.questionText}>
              {questionsData[currentQuestionIndex].question}
            </Text>
            <TouchableOpacity
              style={styles.recordButton}
              onPress={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? (
                <Entypo name="controller-stop" size={25} color={main} />
              ) : (
                <FontAwesome5 name="microphone-alt" size={25} color={main} />
              )}
            </TouchableOpacity>
            {transcription ? (
              <View style={styles.answerTextBox}>
                <Text style={styles.answerText}> {transcription}</Text>
              </View>
            ) : transcriptionInProgress ? (
              <ActivityIndicator
                size="large"
                color={main}
                style={styles.loader}
              />
            ) : null}
          </View>
          {transcription ? (
            <TouchableOpacity
              style={styles.similarityButton}
              onPress={handleCalculateSimilarity}
            >
              <Text style={{ fontSize: 20, fontWeight: 600, color: main }}>
                Evaluate
              </Text>
            </TouchableOpacity>
          ) : null}

          {score && (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {score.map((similarity, index) => (
                <Text key={index} style={styles.similarityText}>
                  {similarity.toFixed(2) > 0.5 ? "Correct" : "Incorrect"}
                </Text>
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
      <View style={styles.similarityContainer}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={goToPreviousQuestion}
        >
          <AntDesign name="left" size={32} color={main} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={goToNextQuestion}>
          <AntDesign name="right" size={32} color={main} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Interview;

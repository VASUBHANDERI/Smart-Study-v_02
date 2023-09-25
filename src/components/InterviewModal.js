// InterviewModal.js
import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
import Interview from './Interview';
import { AntDesign } from '@expo/vector-icons';
import { main } from './Colors';

const InterviewModal = ({ isVisible, closeModal }) => {
  // Handle the back button press when the modal is open
  if (isVisible) {
    BackHandler.addEventListener('hardwareBackPress', () => {
      closeModal();
      return true;
    });
  }

  const closeModalHandler = () => {
    closeModal();
    BackHandler.removeEventListener('hardwareBackPress', () => {});
  };

  return (
    <Modal visible={isVisible} animationType="fade" transparent>
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        // onPress={closeModalHandler}
      >
        <View style={styles.modalContainer}>
          <Interview />
          <TouchableOpacity onPress={closeModalHandler} style={styles.closeButton}>
          <AntDesign name="closecircleo" size={24} color={main} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 30,
    
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
});

export default InterviewModal;

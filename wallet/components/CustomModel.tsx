import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { modalStyle } from "@/assets/styles/customModal"; // your styles

interface CustomAlertProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={modalStyle.overlay}>
        <View style={modalStyle.alertBox}>
          <Text style={modalStyle.title}>{title}</Text>
          <Text style={modalStyle.message}>{message}</Text>

          <TouchableOpacity style={modalStyle.removeButton} onPress={onConfirm}>
            <Text style={modalStyle.removeText}>Confirm</Text>
          </TouchableOpacity>

          <TouchableOpacity style={modalStyle.closeButton} onPress={onClose}>
            <Text style={modalStyle.closeText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;

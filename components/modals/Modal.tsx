import React from 'react';
import Modal from "react-native-modal";



// most of the configurations are retrieved from the documentation
// https://github.com/react-native-modal/react-native-modal
const ModalComponent = ({ children, modalVisible, setModalVisible }: { children: React.ReactNode, modalVisible: boolean, setModalVisible: (x: boolean) => void }) => {
    return (
        <Modal isVisible={modalVisible}
            className='flex items-center justify-center'
            backdropColor='black'
            backdropOpacity={0.7}
            onBackButtonPress={() => setModalVisible(!modalVisible)}
            onBackdropPress={() => setModalVisible(!modalVisible)}
            onSwipeComplete={() => setModalVisible(false)}
            swipeDirection="left"
            hideModalContentWhileAnimating={true}
            backdropTransitionOutTiming={0}

        >
            {children}
        </Modal>
    );
};


export default ModalComponent;
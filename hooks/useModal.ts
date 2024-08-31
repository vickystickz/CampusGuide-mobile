import { useState } from "react";

export const useModal = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return { modalVisible, setModalVisible }
}
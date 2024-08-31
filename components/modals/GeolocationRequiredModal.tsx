import { Pressable } from "react-native"
import ModalComponent from "./Modal"
import { StyledText } from "../StyledText"
import { StyledView } from "../StyledView"
import CampusNotFoundIllustrationIcon from "../icons/NotOnCampusIllustrationIcon"



const GeolocationRequiredModal = ({ modalVisible, setModalVisible, openSettings }: {
    setModalVisible: (v: boolean) => void
    modalVisible: boolean
    openSettings: () => void
}) => {

    return (
        <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible}>
            <StyledView className="bg-white py-8 px-6 gap-y-8 rounded-2xl">
                <StyledView className="items-center">
                    <StyledView className="flex items-center justify-center bg-p50 rounded-full w-24 h-24">
                        <CampusNotFoundIllustrationIcon className="w-10 h-16" />
                    </StyledView>
                </StyledView>
                <StyledText className="text-center text-sm text-b300">Campus Guide would like to use your precise location for routing and to identify which campus you're on.</StyledText>
                <Pressable onPress={openSettings} className="bg-p300 border border-b50 px-6 py-[10px] rounded-3xl">
                    <StyledText className="text-white text-center">Go to settings</StyledText>
                </Pressable>
                <Pressable onPress={() => setModalVisible(false)} className="border border-b50 px-6 py-[10px] rounded-3xl">
                    <StyledText className="text-p300 text-center">Cancel</StyledText>
                </Pressable>
            </StyledView>
        </ModalComponent>
    )
}

export default GeolocationRequiredModal;
import { Pressable } from "react-native"
import ModalComponent from "./Modal"
import { StyledText } from "../StyledText"
import { StyledView } from "../StyledView"
import CampusNotFoundIllustrationIcon from "../icons/NotOnCampusIllustrationIcon"

const CampusNotSelectedModal = ({ modalVisible, setModalVisible }: {
    setModalVisible: (v: boolean) => void
    modalVisible: boolean
}) => {
    return (
        <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible}>
            <StyledView className="bg-white py-8 px-6 gap-y-8 rounded-2xl items-center flex">
                <StyledView className="flex items-center justify-center bg-p50 rounded-full w-24 h-24">
                    <CampusNotFoundIllustrationIcon className="w-10 h-16" />
                </StyledView>
                <StyledText className="text-center text-sm text-b300">Please select a campus to navigate. Browse the campus list to pick one.</StyledText>
                <Pressable onPress={() => setModalVisible(false)} className="border border-b50 px-6 py-[10px] rounded-3xl">
                    <StyledText className="text-b300">Got it</StyledText>
                </Pressable>
            </StyledView>
        </ModalComponent>
    )
}

export default CampusNotSelectedModal
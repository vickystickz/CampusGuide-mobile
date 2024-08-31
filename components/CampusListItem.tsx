import { Pressable } from "react-native"
import SchoolIcon from "./icons/SchoolIcon"
import { StyledView } from "./StyledView"
import TruncatedText from "./TruncatedText"
import CampusIsMappedModal from "./modals/CampusIsMapped"
import { useModal } from "@/hooks/useModal"
import { CampusDataType } from "@/utils/data"
import { useMapContext } from "@/context/MapContext"




const CampusListItem = ({ campus }: { campus: CampusDataType }) => {
    // const { modalVisible: schoolIsNotMapped, setModalVisible: setSchoolIsNotMapped } = useModal()
    const { modalVisible: schoolIsMapped, setModalVisible: setCampusIsMappedModal } = useModal()
    const { selectedCampus, setSelectedCampus } = useMapContext()
    return (
        <>
            <CampusIsMappedModal setModalVisible={setCampusIsMappedModal} modalVisible={schoolIsMapped} campus={campus} />
            {/* <SchoolIsNotMappedModal setModalVisible={setSchoolIsNotMapped} modalVisible={schoolIsNotMapped} /> */}
            <Pressable onPress={() => {
                // Show campus information modal.

                // setCampusIsMappedModal(true)
                // To prevent state update if the user clicks multiple time
                if (selectedCampus?.id !== campus.id) {
                    setSelectedCampus?.(campus)
                }
            }
                // campus.schoolIsMapped ? setSchoolIsMappedModal(true) : setSchoolIsNotMapped(true)

            }>
                <StyledView className="flex flex-row items-center gap-x-5 my-3">
                    <StyledView className="bg-p50 rounded-full w-8 h-8 flex items-center justify-center">
                        <SchoolIcon className="w-4 h-3 text-p500" />
                    </StyledView>
                    <StyledView>
                        <TruncatedText text={campus.title} maxLength={50} customStyle="text-b300 text-sm" />
                        <TruncatedText text={`${campus.accronymn}, ${campus.city}, ${campus.state}, ${campus.country}`} maxLength={50} customStyle="text-b100 text-xs" />
                    </StyledView>
                </StyledView>
            </Pressable>
        </>
    )
}

export default CampusListItem
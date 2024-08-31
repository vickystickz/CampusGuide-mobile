
import ModalComponent from "./Modal"
import { StyledView } from "../StyledView"
import LocationMarkerIcon from "../icons/LocationMarkerIcon"
import TruncatedText from "../TruncatedText"
import { CustomImage } from "../CustomImage"
import { CampusDataType } from "@/utils/data"
const FUTAImage = require('@/assets/images/futa_image.png')

const CampusIsMappedModal = ({ modalVisible, setModalVisible, campus }: {
    setModalVisible: (v: boolean) => void
    modalVisible: boolean
    campus: CampusDataType
}) => {
    return (
        <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} >
            <StyledView className="bg-white pb-4 px-6 rounded-2xl gap-y-4 max-h-[250px] min-w-[288px]">
                <StyledView className="rounded-xl max-h-[120px]">
                    <CustomImage src={FUTAImage} style={{ width: '100%', height: '100%', borderRadius: 10 }} contentFit="cover" />
                </StyledView>
                <StyledView className="gap-y-1">
                    <TruncatedText text={campus.title} customStyle="text-sm text-b300 font-semibold" />
                    <StyledView className="flex flex-row items-center gap-x-1">
                        <StyledView>
                            <LocationMarkerIcon className="w-4 h-4 text-b100" />
                        </StyledView>
                        <StyledView>
                            <TruncatedText text={campus.ymChapter} customStyle="text-b100" />
                        </StyledView>
                    </StyledView>
                </StyledView>
            </StyledView>
        </ModalComponent >
    )
}

export default CampusIsMappedModal
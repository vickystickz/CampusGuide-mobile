import { basemapStyles } from "@/utils/data"
import BottomSheetModalComponent from "./modals/BottomSheetModal"
import { StyledText } from "./StyledText"
import { StyledView } from "./StyledView"
import { CustomImage } from "./CustomImage"
import CheckboxIcon from "./icons/CheckboxIcon"
import { useMapContext } from "@/context/MapContext"
import { Pressable } from "react-native"


const BasemapSwitcherModal = (
    { snapPoints, bottomSheetModalRef, closeModal }:
        { snapPoints: any, bottomSheetModalRef: any, closeModal: () => void }
) => {

    const { setBasemapStyle, basemapStyle } = useMapContext()

    return (
        <BottomSheetModalComponent
            snapPoints={snapPoints}
            bottomSheetModalRef={bottomSheetModalRef}
            modalTitle={'Imagery'}
            closeModal={closeModal}

        >
            <StyledView className="flex flex-col gap-y-2 h-full">
                {
                    basemapStyles.map(
                        (basemap, id) =>
                            <Pressable onPress={() => setBasemapStyle(basemap)} key={`basemap-${id}`}>
                                <StyledView className="flex flex-col gap-y-4">
                                    <StyledView className={`w-full h-[126px] rounded-2xl ${basemap.name == basemapStyle.name ? 'border-4 border-p300 relative' : ''}`}>
                                        <CustomImage src={basemap.image} style={{ width: "100%", height: "100%", borderRadius: 12 }} contentFit="cover" />
                                        {
                                            basemap.name == basemapStyle.name ? <StyledView className="absolute w-8 h-8 border-2 border-p75 rounded-xl bg-p200 right-3 top-3 flex items-center justify-center">
                                                <CheckboxIcon className="text-white w-3 h-3" />
                                            </StyledView> : null
                                        }
                                    </StyledView>
                                    <StyledText className="text-[16px] font-semibold text-b300">{basemap.name}</StyledText>
                                </StyledView>
                            </Pressable>
                    )
                }
            </StyledView>
        </BottomSheetModalComponent >
    )
}

export default BasemapSwitcherModal
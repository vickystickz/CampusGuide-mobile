import { CustomImage } from "@/components/CustomImage";
import IconComponent from "@/components/IconComponent";
import BasemapIcon from "@/components/icons/BasemapIcon";
import DirectionsIcon from "@/components/icons/DirectionsIcon";
import GeolocationIcon from "@/components/icons/GeolocationIcon";
import LocationMarkerIcon from "@/components/icons/LocationMarkerIcon";
import MenuIcon from "@/components/icons/MenuIcon";
import CampusNotFoundIllustrationIcon from "@/components/icons/NotOnCampusIllustrationIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import MapComponent from "@/components/MapComponent";
import ModalComponent from "@/components/Modal";
import SchoolListItem from "@/components/SchoolListItem";
import { StyledText } from "@/components/StyledText";
import { StyledView } from "@/components/StyledView";
import { useModal } from "@/hooks/useModal";
import { dummySchools } from "@/utils/data";
import { FlatList, Pressable, SafeAreaView } from "react-native";
const CampusGuideLogo = require('@/assets/images/campus_guide_logo.png')




export default function Index() {
  const { modalVisible, setModalVisible } = useModal()
  return (
    <SafeAreaView>
      {/* Campus not available modal */}
      <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <StyledView className="bg-white py-8 px-6 gap-y-8 rounded-2xl items-center flex">
          <StyledView className="flex items-center justify-center bg-p50 rounded-full w-24 h-24">
            <CampusNotFoundIllustrationIcon className="w-10 h-16" />
          </StyledView>
          <StyledText className="text-center text-sm text-b300">Your current location shows you're not on campus. Search for a campus or use the map to navigate around one.</StyledText>
          <Pressable onPress={() => setModalVisible(false)} className="border border-b50 px-6 py-[10px] rounded-3xl">
            <StyledText className="text-b300">Got it</StyledText>
          </Pressable>
        </StyledView>
      </ModalComponent>

      {/* Map  Component */}
      <MapComponent>
        {/* Menu and Logo */}
        <StyledView className="w-full flex flex-row justify-between top-4 absolute items-center px-6">
          <StyledView>
            <CustomImage src={CampusGuideLogo} style={{ width: 143.48, height: 30.85 }} />
          </StyledView>
          <IconComponent Icon={MenuIcon} variant="fill" />
        </StyledView>

        {/* Basemap Swtich and Geolocation */}
        <StyledView className="flex flex-col gap-y-4 bottom-[352px] right-0 absolute pr-6">
          <StyledView>
            <IconComponent Icon={GeolocationIcon} variant="fill" />
          </StyledView>
          <StyledView>
            <IconComponent Icon={BasemapIcon} variant="stroke" />
          </StyledView>
        </StyledView>

        {/* Bottom Panel */}
        <StyledView className="absolute bottom-0 h-[252px] w-full mb-10">
          <StyledView className="bg-white  flex flex-row items-center justify-between  px-4 py-[10px]">
            <StyledView className="items-center flex flex-row gap-x-10">
              <StyledView className="flex flex-row items-center shadow rounded-2xl bg-white border py-2 px-[10px] gap-x-2 border-p50 shadow-p75">
                <LocationMarkerIcon className="text-p300 w-4 h-4" />
                <StyledText className="text-p300 text-sm">Campus</StyledText>
              </StyledView>
              <StyledView className="flex flex-row items-center p-1 gap-x-2">
                <DirectionsIcon className="text-b75 w-4 h-4" />
                <StyledText className="text-b75 text-sm">Direction</StyledText>
              </StyledView>
            </StyledView>
            <Pressable onPress={() => setModalVisible(true)}>
              <StyledView>
                <IconComponent Icon={SearchIcon} />
              </StyledView>
            </Pressable>
          </StyledView>

          <StyledView className="w-full bg-[#F4F6F8] p-4">
            <FlatList data={dummySchools} renderItem={({ item }) => <SchoolListItem school={item} />} keyExtractor={item => item.id} />
          </StyledView>
        </StyledView>
      </MapComponent>
    </SafeAreaView>
  );
}



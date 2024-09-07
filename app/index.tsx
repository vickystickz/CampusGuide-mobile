import BasemapSwitcherModal from "@/components/BasemapSwitcher";
import { CustomImage } from "@/components/CustomImage";
import IconComponent from "@/components/IconComponent";
import BasemapIcon from "@/components/icons/BasemapIcon";
import DirectionsIcon from "@/components/icons/DirectionsIcon";
import GeolocationIcon from "@/components/icons/GeolocationIcon";
import LocationMarkerIcon from "@/components/icons/LocationMarkerIcon";
import MenuIcon from "@/components/icons/MenuIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import MapComponent from "@/components/MapComponent";
import { StyledText } from "@/components/StyledText";
import { StyledView } from "@/components/StyledView";
import { useBottomSheetModal } from "@/hooks/useBottomSheetModal";
import { CAMPUS_DATA, ROUTES, } from "@/utils/data";
import { FlatList, Pressable, SafeAreaView, } from "react-native";
const CampusGuideLogo = require('@/assets/images/campus_guide_logo.png')
import { useMemo, useState, } from "react";
import GeolocationRequiredModal from "@/components/modals/GeolocationRequiredModal";
import CampusListItem from "@/components/CampusListItem";
import { useNavigation } from "expo-router";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useMapContext } from "@/context/MapContext";
import CampusNotSelectedModal from "@/components/modals/CampusNotSelectedModal";
import { useModal } from "@/hooks/useModal";




type Tabs = 'campus' | 'direction';




export default function Index() {
  const {
    snapPoints,
    bottomSheetModalRef,
    handlePresentModalPress: handleBaseMapSwitcher,
    closeModal
  } = useBottomSheetModal();

  const { goToSettings, handleGeolocation, modalVisible, setModalVisible } = useGeolocation()
  const navigation = useNavigation()
  const [currentTab, setCurrentTab] = useState<Tabs>('campus')
  const { selectedCampus } = useMapContext()
  const campuseIsSelected = useMemo(() => selectedCampus !== undefined, [selectedCampus])
  const { modalVisible: campuseNotSelectedModal, setModalVisible: SetCampusNotSelectedModal } = useModal();




  return (
    <SafeAreaView>
      {/* 
      Currently I configure it such that campus must be selected before directions. This is useful to streamline geocoding results to that campus.
      
      The first edge case is to know if they're truly within the campus they selected.
      It's quiet easy to know as we can do a simple point in polygon query, however, does that mean we will reject their directions query if they're not within the campus? 
      This is something that needs to be discussed and decided, because a user can be in FUTA and want to find directions on OAU campus, just for exploration.
      Even on Google maps, it's possible to find directions from anywhere to anywhere even if you're not there.

      The second edge case is figuring if the user is within any campus at all. We also need to decide if there'll be restrictions in that regard.
      Point in polygon will not work here because it will be computationally expensive since there are many campuses, so it's better to do this from the backend.
      **A typical query will be to send the current user location (long and lat) to the backend, and the backend wil return True/False if the user is within any campus.**

      This also needs to be discussed, because as a user, I can be in FUTA south gate and want to use the app to navigate within campus, but I'm pre loading the routes 
      before I leave home (assuming I use Wifi at home and won't have access to internet once I leave home).
      
      */}
      <CampusNotSelectedModal
        modalVisible={campuseNotSelectedModal}
        setModalVisible={SetCampusNotSelectedModal} />
      {/* Geolocation required modal */}
      <GeolocationRequiredModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        openSettings={goToSettings} />
      {/* Basemap switcher modal */}
      <BasemapSwitcherModal
        snapPoints={snapPoints}
        bottomSheetModalRef={bottomSheetModalRef}
        closeModal={closeModal}
      />
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
        <StyledView className="flex flex-col gap-y-4 bottom-[300px] right-0 absolute pr-6">
          <Pressable onPress={handleGeolocation}>
            <StyledView>
              <IconComponent Icon={GeolocationIcon} variant="fill" />
            </StyledView>
          </Pressable>
          <Pressable onPress={handleBaseMapSwitcher}>
            <StyledView>
              <IconComponent Icon={BasemapIcon} variant="stroke" />
            </StyledView>
          </Pressable>
        </StyledView>

        {/* Bottom Panel */}
        <StyledView className="absolute bottom-0 h-[222px] w-full mb-10">
          <StyledView className="bg-white  flex flex-row items-center justify-between  px-4 py-[10px]">
            <StyledView className="items-center flex flex-row gap-x-10">
              <Pressable onPress={() => setCurrentTab('campus')}>
                <StyledView className={`flex flex-row items-center gap-x-2 ${currentTab === 'campus' ? 'shadow rounded-2xl bg-white border py-2 px-[10px] border-p50 shadow-p75' : "p-1"}`}>
                  <LocationMarkerIcon className={`${currentTab === 'campus' ? 'text-p300 w-4 h-4' : "text-b75 w-4 h-4"}`} />
                  <StyledText className={`${currentTab === 'campus' ? 'text-p300 text-sm' : "text-b75 text-sm"}`}>Campus</StyledText>
                </StyledView>
              </Pressable>
              <Pressable onPress={() => {
                if (campuseIsSelected) {
                  setCurrentTab('direction')
                  // Navigate to the directions page.
                  navigation.navigate(ROUTES.DIRECTIONS)
                } else {
                  //open campus not selected modal
                  SetCampusNotSelectedModal(true)
                }
              }
              }>
                <StyledView className={`flex flex-row items-center gap-x-2 ${currentTab === 'direction' ? 'shadow rounded-2xl bg-white border py-2 px-[10px] border-p50 shadow-p75' : "p-1"}`}>
                  <DirectionsIcon className={`${currentTab === 'direction' ? 'text-p300 w-4 h-4' : "text-b75 w-4 h-4"}`} />
                  <StyledText className={`${currentTab === 'direction' ? 'text-p300 text-sm' : "text-b75 text-sm"}`}>Direction</StyledText>
                </StyledView>
              </Pressable>
            </StyledView>
            <Pressable>
              <StyledView>
                <IconComponent Icon={SearchIcon} />
              </StyledView>
            </Pressable>
          </StyledView>


          {/* Tab contents */}
          <StyledView className="w-full bg-[#F4F6F8] px-4 h-full">
            {
              currentTab == 'campus' ?
                <FlatList data={CAMPUS_DATA} renderItem={({ item }) => <CampusListItem campus={item} />} keyExtractor={item => item.id} />
                :
                <CampusListItem campus={selectedCampus} />
            }
          </StyledView>
        </StyledView>
      </MapComponent>
    </SafeAreaView >
  );
}



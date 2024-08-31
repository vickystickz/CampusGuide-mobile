import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";

export const useBottomSheetModal = () => {
    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const closeModal = useCallback(() => {
        bottomSheetModalRef.current?.dismiss()
    }, [])


    return { handlePresentModalPress, snapPoints, bottomSheetModalRef, closeModal }
}
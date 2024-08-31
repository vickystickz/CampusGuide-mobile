import React, { useMemo } from 'react';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { StyledView } from '../StyledView';
import { StyledText } from '../StyledText';
import CloseIcon from '../icons/CloseIcon';
import { Pressable } from 'react-native';

const CustomBackdrop = ({ style }: BottomSheetBackdropProps) => {
    const containerStyle = useMemo(
        () => [
            style,
            {
                backgroundColor: 'rgba(0, 0, 0, 1)', opacity: 0.6,
            },

        ],
        [style]
    );
    return <StyledView style={containerStyle} />;
};



const BottomSheetModalComponent = ({ children, bottomSheetModalRef, snapPoints, modalTitle, closeModal }: { children: React.ReactNode, snapPoints: any, bottomSheetModalRef: any, modalTitle: string, closeModal: () => void }) => {
    return (
        <StyledView>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                backdropComponent={CustomBackdrop}
                handleComponent={null}
            >
                <BottomSheetView>
                    <StyledView className='flex flex-row justify-between px-6 py-6'>
                        <StyledText className='text-xl font-semibold text-b200'>{modalTitle}</StyledText>
                        <Pressable onPress={closeModal}>
                            <StyledView className='items-center justify-center flex'>
                                <CloseIcon className='w-4 h-4 text-black' />
                            </StyledView>
                        </Pressable>
                    </StyledView>
                    <StyledView className='px-6'>
                        {children}
                    </StyledView>
                </BottomSheetView>
            </BottomSheetModal>
        </StyledView>
    );
};


export default BottomSheetModalComponent;
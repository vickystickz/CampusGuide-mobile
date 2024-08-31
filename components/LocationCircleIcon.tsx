import { StyledView } from "./StyledView"

const LocationCircleIcon = ({ variant }: { variant: 'red' | 'purple' }) => {
    const styles = {
        red: 'bg-[#FF4343]',
        purple: 'bg-p200'
    }
    return (

        <StyledView className="bg-white shadow-2xl shadow-black p-1 w-6 rounded-full h-6 flex items-center justify-center">
            <StyledView className={`w-3 rounded-full h-3 ${styles[variant]}`} />
        </StyledView>
    )
}

export default LocationCircleIcon
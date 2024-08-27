import SchoolIcon from "./icons/SchoolIcon"
import { StyledView } from "./StyledView"
import TruncatedText from "./TruncatedText"


export type TSchool = {
    id: number
    name: string
    address: string
}


const SchoolListItem = ({ school }: { school: TSchool }) => {
    return (
        <StyledView className="flex flex-row items-center gap-x-5 my-3">
            <StyledView className="bg-p50 rounded-full w-8 h-8 flex items-center justify-center">
                <SchoolIcon className="w-4 h-3 text-p500" />
            </StyledView>
            <StyledView>
                <TruncatedText text={school.name} maxLength={50} customStyle="text-b300 text-sm" />
                <TruncatedText text={school.address} maxLength={50} customStyle="text-b100 text-xs" />
            </StyledView>
        </StyledView>
    )
}

export default SchoolListItem
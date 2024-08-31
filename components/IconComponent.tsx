
import { StyledView } from "./StyledView"

const IconComponent = ({ Icon, variant = 'fill', customStyle }: {
    Icon: React.JSX
    variant?: 'stroke' | 'fill',
    customStyle?: string
}) => {
    const style = {
        stroke: 'text-black',
        fill: 'text-black'
    }

    return (
        <StyledView className={`w-[36px] p-2 h-[36px] rounded-full shadow-3xl bg-white flex items-center justify-center shadow-black border border-b50`}>
            <Icon className={`w-4 h-4 ${style[variant]} ${customStyle}`} />
        </StyledView>
    )
}

export default IconComponent

import { Image, ImageContentFit, ImageStyle } from 'expo-image';

const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';



export const CustomImage = ({ src, transition = 10, contentFit = 'contain', style }: {
    src: string,
    transition?: number,
    style: ImageStyle
    contentFit?: ImageContentFit
}) => {
    return (
        <Image
            style={style}
            source={src}
            placeholder={{ blurhash }}
            contentFit={contentFit}
            transition={transition}

        />
    )
}
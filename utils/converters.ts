export const secondsToMinutesAndHour = (timeInSeconds: number) => {
    if (timeInSeconds > 60 * 60) {
        return {
            time: (Number(String(timeInSeconds / 60 * 60).substring(0, 4))), unit: 'hour'
        }

    } else if (timeInSeconds < 60) {
        return {
            time: Math.round(timeInSeconds), unit: 'seconds'
        }
    } else {
        return {
            time: Math.round(timeInSeconds / 60), unit: 'minutes'
        }
    }
}

export const metersToKM = (distanceInMeters: number) => {

    if (distanceInMeters > 1000) {
        return {
            distance: Number(String(distanceInMeters / 1000).substring(0, 4)), unit: 'km'
        }
    } else {
        return {
            distance: distanceInMeters, unit: 'm'
        }
    }
}
const calculateExercises = (hours: number[], target: number) => {
    const hours_average = hours.reduce((a,b) => a+b, 0) / hours.length
    let rate = 1
    let desc = ''

    if (target - hours_average < 0) {
        rate = 3
        desc = 'overachieving'
    } else if (target - hours_average < 0.5) {
        rate = 2
        desc = 'good performance'
    } else {
        rate = 1
        desc = 'not too good'
    }

    let res = {
        periodLength: hours.length,
        trainingDays: hours.filter(e => e>0).length,
        success: (hours_average<target) ? false : true,
        rating: rate,
        ratingDescription: desc,
        target: target,
        average: hours_average
    }
    return res
}


console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
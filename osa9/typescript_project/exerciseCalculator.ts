interface ExerciseRes {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercises = (target: number, hours: number[]): ExerciseRes => {
    const hours_average = hours.reduce((a,b) => a+b, 0) / hours.length;
    let rate = 1;
    let desc = '';

    if (isNaN(hours_average)) throw new Error('Bad arguments');

    if (target - hours_average < 0) {
        rate = 3;
        desc = 'overachieving';
    } else if (target - hours_average < 0.5) {
        rate = 2;
        desc = 'good performance';
    } else {
        rate = 1;
        desc = 'not too good';
    }

    const res = {
        periodLength: hours.length,
        trainingDays: hours.filter(e => e>0).length,
        success: (hours_average<target) ? false : true,
        rating: rate,
        ratingDescription: desc,
        target: target,
        average: hours_average
    };
    return res;
};

const target = Number(process.argv[2]);
const hours: number[] = String(process.argv.slice(3)).split(",").map(x => parseFloat(x));

if (target && hours) console.log(calculateExercises(target, hours));
//console.log(calculateExercises(target, hours));


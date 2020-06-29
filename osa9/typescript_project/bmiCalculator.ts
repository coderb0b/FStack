export const calculateBmi = (height: number, weight: number): string => {
    let bmi = Math.round(weight/((height/100)**2) * 100 ) / 100

    if (bmi < 15) {
        return 'Very severely underweight'
    } else if (bmi < 16) {
        return 'Severely underweight'
    } else if (bmi < 18.5) {
        return 'Underweight'
    } else if (bmi < 25) {
        return 'Normal (healthy weight)'
    } else if (bmi < 30) {
        return 'Overweight'
    } else if (bmi < 35) {
        return 'Obese Class I (Moderately obese)'
    } else if (bmi < 40) {
        return 'Obese Class II (Severely obese)'
    } else if (bmi >= 40) {
        return 'Obese Class III (Very severely obese)'
    }
    //throw new Error('Not good arguments')
    return ""
}

const height: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])

//if (process.argv.length < 4) throw new Error('Incorrect amount of arguments, give two')
if (process.argv.length = 2) console.log(calculateBmi(height, weight))
//console.log(calculateBmi(height, weight))
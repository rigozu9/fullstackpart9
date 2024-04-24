interface Result {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
  }
  
  const parseArguments = (args: string[]): Result => {
    if (args.length < 4) throw new Error('Not enough arguments')
    if (args.length > 4) throw new Error('Too many arguments')
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        value1: Number(args[2]),
        value2: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!')
    }
  }

  function calculateExercises(dailyHours: number[], target: number): Result {
    const periodLength = dailyHours.length
    const trainingDays = dailyHours.filter(day => day > 0).length
    const totalHours = dailyHours.reduce((a, b) => a + b, 0)
    const average = totalHours / periodLength
    const success = average >= target
 
    let rating = 1
    let ratingDescription = 'you can do better'
  
    if (average >= target) {
      rating = 3
      ratingDescription = 'great job you reached your target'
    } else if (average >= target * 0.75) {
      rating = 2
      ratingDescription = 'not too bad but could be better'
    }
  
    return {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average,
    }
  }
  
  const target = Number(process.argv[2])
  const dailyHours = process.argv.slice(3).map(arg => Number(arg)) 
  const result = calculateExercises(dailyHours, target)
  console.log(result)
interface Result {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
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
  
  const result = calculateExercises([1, 0, 2, 4.5, 0, 3, 1], 1)
  console.log(result)
  
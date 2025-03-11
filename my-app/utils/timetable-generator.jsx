const DEPARTMENTS = [
  "Computer Engineering",
  "Information Technology",
  "Mechanical Engineering",
  "Civil Engineering",
  "Biomedical Engineering",
]

const SUBJECTS = ["A", "B", "C", "D", "E", "F"]
const LABS = ["L1", "L2", "L3", "L4"]
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const HOURS_PER_DAY = 6
const TOTAL_SEMESTERS = 8

// Common subject and lab for all departments
const COMMON_SUBJECT = "A"
const COMMON_LAB = "L1"

// Faculty assignments (subject to faculty mapping)
const FACULTY_ASSIGNMENTS = {
  A: "Prof. Smith",
  B: "Prof. Johnson",
  C: "Prof. Williams",
  D: "Prof. Brown",
  E: "Prof. Jones",
  F: "Prof. Miller",
  L1: "Prof. Davis",
  L2: "Prof. Garcia",
  L3: "Prof. Rodriguez",
  L4: "Prof. Wilson",
}

// Genetic Algorithm Parameters
const POPULATION_SIZE = 50
const MAX_GENERATIONS = 100
const MUTATION_RATE = 0.1
const CROSSOVER_RATE = 0.8

// Helper function to create a random timetable
function createRandomTimetable() {
  const timetable = {}

  // Initialize timetable structure for each department and semester
  DEPARTMENTS.forEach((dept) => {
    timetable[dept] = {}

    for (let semester = 1; semester <= TOTAL_SEMESTERS; semester++) {
      timetable[dept][semester] = {}

      DAYS.forEach((day) => {
        timetable[dept][semester][day] = Array(HOURS_PER_DAY).fill(null)
      })
    }
  })

  // Assign common subject and lab for all departments
  DEPARTMENTS.forEach((dept) => {
    for (let semester = 1; semester <= TOTAL_SEMESTERS; semester++) {
      // Assign common subject
      const randomDay = DAYS[Math.floor(Math.random() * DAYS.length)]
      const randomHour = Math.floor(Math.random() * (HOURS_PER_DAY - 1)) // Ensure space for 2-hour slots

      timetable[dept][semester][randomDay][randomHour] = COMMON_SUBJECT

      // Assign common lab (2 hours)
      const labDay = DAYS[Math.floor(Math.random() * DAYS.length)]
      const labHour = Math.floor(Math.random() * (HOURS_PER_DAY - 1))

      if (labHour < HOURS_PER_DAY - 1) {
        timetable[dept][semester][labDay][labHour] = COMMON_LAB
        timetable[dept][semester][labDay][labHour + 1] = COMMON_LAB
      }
    }
  })

  // Assign department-specific subjects and labs
  DEPARTMENTS.forEach((dept) => {
    for (let semester = 1; semester <= TOTAL_SEMESTERS; semester++) {
      // Get available subjects (excluding common subject)
      const availableSubjects = SUBJECTS.filter((s) => s !== COMMON_SUBJECT)
      const availableLabs = LABS.filter((l) => l !== COMMON_LAB)

      // Assign at least 2 lectures per subject
      availableSubjects.forEach((subject) => {
        for (let i = 0; i < 2; i++) {
          let assigned = false
          let attempts = 0

          while (!assigned && attempts < 20) {
            const randomDay = DAYS[Math.floor(Math.random() * DAYS.length)]
            const randomHour = Math.floor(Math.random() * HOURS_PER_DAY)

            if (timetable[dept][semester][randomDay][randomHour] === null) {
              timetable[dept][semester][randomDay][randomHour] = subject
              assigned = true
            }

            attempts++
          }
        }
      })

      // Assign labs (2 hours each)
      availableLabs.forEach((lab) => {
        let assigned = false
        let attempts = 0

        while (!assigned && attempts < 20) {
          const randomDay = DAYS[Math.floor(Math.random() * DAYS.length)]
          const randomHour = Math.floor(Math.random() * (HOURS_PER_DAY - 1))

          if (
            timetable[dept][semester][randomDay][randomHour] === null &&
            randomHour < HOURS_PER_DAY - 1 &&
            timetable[dept][semester][randomDay][randomHour + 1] === null
          ) {
            timetable[dept][semester][randomDay][randomHour] = lab
            timetable[dept][semester][randomDay][randomHour + 1] = lab
            assigned = true
          }

          attempts++
        }
      })
    }
  })

  // Special case for first-year students (same timetable except for one subject)
  const firstYearTimetable = {}

  // Copy the first semester timetable from Computer Engineering as a base
  DAYS.forEach((day) => {
    firstYearTimetable[day] = [...timetable["Computer Engineering"][1][day]]
  })

  // Assign a unique subject for each department in the first year
  DEPARTMENTS.forEach((dept, index) => {
    const uniqueSubject = SUBJECTS[index % SUBJECTS.length]

    // Find a slot to place the unique subject
    let assigned = false
    let attempts = 0

    while (!assigned && attempts < 20) {
      const randomDay = DAYS[Math.floor(Math.random() * DAYS.length)]
      const randomHour = Math.floor(Math.random() * HOURS_PER_DAY)

      if (timetable[dept][1][randomDay][randomHour] === null) {
        timetable[dept][1][randomDay][randomHour] = uniqueSubject
        assigned = true
      }

      attempts++
    }
  })

  return timetable
}

// Fitness function to evaluate timetable quality
function calculateFitness(timetable) {
  let fitness = 100 // Start with perfect score and deduct for violations

  // Check for overlapping classes for students
  DEPARTMENTS.forEach((dept) => {
    for (let semester = 1; semester <= TOTAL_SEMESTERS; semester++) {
      DAYS.forEach((day) => {
        // Check if any student has more than 6 hours of classes
        const classHours = timetable[dept][semester][day].filter((slot) => slot !== null).length
        if (classHours > HOURS_PER_DAY) {
          fitness -= 5
        }
      })
    }
  })

  // Check faculty conflicts (same faculty teaching different classes at the same time)
  const facultySchedule = {}

  DEPARTMENTS.forEach((dept) => {
    for (let semester = 1; semester <= TOTAL_SEMESTERS; semester++) {
      DAYS.forEach((day) => {
        for (let hour = 0; hour < HOURS_PER_DAY; hour++) {
          const subject = timetable[dept][semester][day][hour]

          if (subject) {
            const faculty = FACULTY_ASSIGNMENTS[subject]

            if (!facultySchedule[faculty]) {
              facultySchedule[faculty] = {}
            }

            if (!facultySchedule[faculty][day]) {
              facultySchedule[faculty][day] = {}
            }

            if (facultySchedule[faculty][day][hour]) {
              // Faculty already teaching at this time
              fitness -= 10
            }

            facultySchedule[faculty][day][hour] = true
          }
        }
      })
    }
  })

  // Check if each subject has at least 2 lectures per week
  DEPARTMENTS.forEach((dept) => {
    for (let semester = 1; semester <= TOTAL_SEMESTERS; semester++) {
      const subjectCount = {}

      SUBJECTS.forEach((subject) => {
        subjectCount[subject] = 0
      })

      DAYS.forEach((day) => {
        for (let hour = 0; hour < HOURS_PER_DAY; hour++) {
          const subject = timetable[dept][semester][day][hour]

          if (SUBJECTS.includes(subject)) {
            subjectCount[subject]++
          }
        }
      })

      SUBJECTS.forEach((subject) => {
        if (subjectCount[subject] < 2) {
          fitness -= 5
        }
      })
    }
  })

  return Math.max(0, fitness)
}

// Crossover function to create offspring from two parent timetables
function crossover(parent1, parent2) {
  if (Math.random() > CROSSOVER_RATE) {
    return parent1 // No crossover
  }

  const child = JSON.parse(JSON.stringify(parent1))

  // Randomly select departments and semesters to crossover
  const crossoverDept = DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)]
  const crossoverSemester = Math.floor(Math.random() * TOTAL_SEMESTERS) + 1

  // Randomly select days to crossover
  const crossoverDays = DAYS.filter(() => Math.random() > 0.5)

  crossoverDays.forEach((day) => {
    child[crossoverDept][crossoverSemester][day] = [...parent2[crossoverDept][crossoverSemester][day]]
  })

  return child
}

// Mutation function to introduce random changes
function mutate(timetable) {
  const mutatedTimetable = JSON.parse(JSON.stringify(timetable))

  DEPARTMENTS.forEach((dept) => {
    for (let semester = 1; semester <= TOTAL_SEMESTERS; semester++) {
      DAYS.forEach((day) => {
        for (let hour = 0; hour < HOURS_PER_DAY; hour++) {
          if (Math.random() < MUTATION_RATE) {
            // Randomly swap with another slot
            const randomDay = DAYS[Math.floor(Math.random() * DAYS.length)]
            const randomHour = Math.floor(Math.random() * HOURS_PER_DAY)

            const temp = mutatedTimetable[dept][semester][day][hour]
            mutatedTimetable[dept][semester][day][hour] = mutatedTimetable[dept][semester][randomDay][randomHour]
            mutatedTimetable[dept][semester][randomDay][randomHour] = temp
          }
        }
      })
    }
  })

  return mutatedTimetable
}

// Main genetic algorithm function
export function generateTimetable() {
  // Initialize population
  let population = []
  for (let i = 0; i < POPULATION_SIZE; i++) {
    const timetable = createRandomTimetable()
    population.push({
      timetable,
      fitness: calculateFitness(timetable),
    })
  }

  // Evolve population
  for (let generation = 0; generation < MAX_GENERATIONS; generation++) {
    // Sort by fitness
    population.sort((a, b) => b.fitness - a.fitness)

    // Check if we have a perfect solution
    if (population[0].fitness === 100) {
      return population[0].timetable
    }

    // Create new population
    const newPopulation = []

    // Elitism: Keep the best solutions
    const eliteCount = Math.floor(POPULATION_SIZE * 0.1)
    for (let i = 0; i < eliteCount; i++) {
      newPopulation.push(population[i])
    }

    // Fill the rest of the population with offspring
    while (newPopulation.length < POPULATION_SIZE) {
      // Tournament selection
      const parent1 = tournamentSelection(population)
      const parent2 = tournamentSelection(population)

      // Crossover
      const childTimetable = crossover(parent1.timetable, parent2.timetable)

      // Mutation
      const mutatedTimetable = mutate(childTimetable)

      // Add to new population
      newPopulation.push({
        timetable: mutatedTimetable,
        fitness: calculateFitness(mutatedTimetable),
      })
    }

    population = newPopulation
  }

  // Return the best solution after all generations
  population.sort((a, b) => b.fitness - a.fitness)
  return population[0].timetable
}

// Tournament selection function
function tournamentSelection(population) {
  const tournamentSize = 3
  let best = null

  for (let i = 0; i < tournamentSize; i++) {
    const randomIndex = Math.floor(Math.random() * population.length)
    const individual = population[randomIndex]

    if (best === null || individual.fitness > best.fitness) {
      best = individual
    }
  }

  return best
}

// Function to get a specific timetable for a department and semester
export function getTimetable(department, semester) {
  // In a real application, this would fetch from a database
  // For now, we'll generate a new timetable each time
  const allTimetables = generateTimetable()
  return allTimetables[department][semester]
}

// Function to get faculty timetable
export function getFacultyTimetable(facultyName) {
  const allTimetables = generateTimetable()
  const facultyTimetable = {}

  // Initialize empty timetable
  DAYS.forEach((day) => {
    facultyTimetable[day] = Array(HOURS_PER_DAY).fill(null)
  })

  // Find all classes taught by this faculty
  DEPARTMENTS.forEach((dept) => {
    for (let semester = 1; semester <= TOTAL_SEMESTERS; semester++) {
      DAYS.forEach((day) => {
        for (let hour = 0; hour < HOURS_PER_DAY; hour++) {
          const subject = allTimetables[dept][semester][day][hour]

          if (subject && FACULTY_ASSIGNMENTS[subject] === facultyName) {
            facultyTimetable[day][hour] = {
              subject,
              department: dept,
              semester,
            }
          }
        }
      })
    }
  })

  return facultyTimetable
}

// Export constants for use in other components
export { DEPARTMENTS, SUBJECTS, LABS, DAYS, HOURS_PER_DAY, TOTAL_SEMESTERS, FACULTY_ASSIGNMENTS }


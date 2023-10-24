import prisma from './prisma.js'

async function main() {
    try {
        const studentData = await prisma.student.create({
            data: {
                name: 'Muhammad Naufal Rafianto',
                studentId: '5024211042',
                email: 'mnaufalrafianto@gmail.com',
                grade: 98.5,
            },
        })
        console.log({ studentData })
    } catch (error) {
        console.log(error)
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

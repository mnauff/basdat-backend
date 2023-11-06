import prisma from '../utils/prisma.js'

test('Create Student and Delete', async () => {
    const student = await prisma.student.create({
        data: {
            name: 'Muhammad Daffa Fisabililah',
            studentId: '5024211006',
            email: 'mydaffa2003@gmail.com',
            grade: 88.5,
        },
    })

    expect(student.studentId).toBe('5024211006')

    const deleteData = await prisma.student.delete({
        where: { studentId: student.studentId },
    })

    expect(deleteData.studentId).toBe(student.studentId)
}, 30000)

afterAll(async () => {
    await prisma.$disconnect()
})

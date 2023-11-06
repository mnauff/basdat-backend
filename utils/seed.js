import prisma from './prisma.js'

async function main() {
    try {
        const AdminData = await prisma.account.create({
            data: {
                accountId: '10101010',
                password: '$2b$10$1jrXO7KiyyGDelgphjPYv.tU5z7n28IVm7CYprl1u60jDche6DuoC',
                role: 'ADMIN',
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

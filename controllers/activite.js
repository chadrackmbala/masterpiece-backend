const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const findUserByEmail = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await prisma.users.findFirst({
            where: {
                email: email,
            },
        });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send("Utilisateur non trouvé");
        }
    } catch (error) {
        console.error("Erreur lors de la recherche d'utilisateur :", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};

module.exports = {
    findUserByEmail,
};

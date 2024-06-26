const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

const getUsers = async (req, res, next) => {
    try {
        const users = await prisma.users.findMany();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const postUsers = async (req, res) => {
    try {
        const {
            nom,
            postnom,
            prenom,
            universite,
            faculte,
            departement,
            promotion,
            adresse,
            email,
            telephone,
            role,
            motDePasse,
            comfirmMotDePasse
        } = req.body; // Récupérer les données du corps de la requête
        const user = await prisma.users.findUnique({
            where: {
                email: email
            }
        });
        if(user){
            return res.status(401).json({ message: 'Adress email already exist' })
        }
        const password = await bcrypt.hash(motDePasse, 10);
      await prisma.users.create({ // Utiliser la méthode `create` pour ajouter un nouvel utilisateur
            data: {
                nom,
                postnom,
                prenom,
                universite,
                faculte,
                departement,
                promotion,
                email,
                telephone: `${telephone}`,
                adresse,
                role,
                motDePasse: password,
                comfirmMotDePasse
            }
        });
        res.status(201).json({ message : "Nouvel utilisateur ajouté !" });
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur :", error);
        res.status(500).json({ error: "Erreur lors de l'ajout de l'utilisateur" });
    }
}

module.exports = {
    getUsers,
    postUsers,
};
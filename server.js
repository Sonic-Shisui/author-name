const express = require('express');
const app = express();
const PORT = 3000;

// Nom attendu (immuable)
const EXPECTED_AUTHOR = "ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡";

// Middleware pour vérifier le nom d'auteur dans les commandes
function validateCommand(req, res, next) {
    const { author } = req.body; // Assurez-vous que le nom est envoyé dans le corps de la requête

    if (!author) {
        return res.status(400).json({
            success: false,
            message: "𝐋𝐞 𝐜𝐡𝐚𝐦𝐩 'author' 𝐞𝐬𝐭 𝐦𝐚𝐧𝐪𝐮𝐚𝐧𝐭"
        });
    }

    if (author !== EXPECTED_AUTHOR) {
        return res.status(403).json({
            success: false,
            message: "𝐌𝐨𝐝𝐢𝐟𝐢𝐜𝐚𝐭𝐢𝐨𝐧 𝐝𝐞𝐭𝐞𝐜𝐭𝐞𝐝 ! 𝐘𝐨𝐮 𝐡𝐚𝐯𝐞 𝐳𝐞𝐫𝐨 𝐚𝐮𝐭𝐨𝐫𝐢𝐳𝐚𝐭𝐢𝐨𝐧 𝐭𝐨 𝐦𝐨𝐝𝐢𝐟𝐲 𝐭𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝."
        });
    }

    // Si tout va bien, passer au middleware suivant
    next();
}

// Route pour exécuter une commande
app.use(express.json()); // Pour traiter les requêtes JSON
app.post('/execute-command', validateCommand, (req, res) => {
    const { commandName } = req.body;

    if (!commandName) {
        return res.status(400).json({
            success: false,
            message: "𝐋𝐞 𝐜𝐡𝐚𝐦𝐩 'Name' 𝐯𝐞𝐮𝐢𝐥𝐥𝐞𝐳 𝐥𝐞 𝐫𝐞𝐦𝐩𝐥𝐢𝐫"
        });
    }

    // Logique pour exécuter la commande
    return res.status(200).json({
        success: true,
        message: `La commande '${commandName}' a été exécutée avec succès !`
    });
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`API en cours d'exécution sur http://localhost:${PORT}`);
});

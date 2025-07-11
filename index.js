const express = require('express');
const app = express();
const PORT = 3000;

const EXPECTED_AUTHOR = "ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡";

app.use(express.json());

function validateAuthor(req, res, next) {
    const { author } = req.body;

    if (!author) {
        return res.status(400).json({
            success: false,
            error: "missing_author",
            message: "Le champ 'author' est requis."
        });
    }

    if (author !== EXPECTED_AUTHOR) {
        return res.status(403).json({
            success: false,
            error: "unauthorized_author",
            message: "Nom d'auteur invalide."
        });
    }

    next();
}

app.post('/execute-command', validateAuthor, (req, res) => {
    const { commandName } = req.body;

    if (!commandName) {
        return res.status(400).json({
            success: false,
            error: "missing_command",
            message: "Le champ 'commandName' est requis."
        });
    }

    // Vérifier que la chaîne magique est dans la commande (par exemple dans commandName)
    if (!commandName.includes(EXPECTED_AUTHOR)) {
        return res.status(403).json({
            success: false,
            error: "unauthorized_command",
            message: `❌| Échec de l'exécution de la commande, veuillez remettre '${EXPECTED_AUTHOR}' comme auteur de la commande pour s'exécuter.`
        });
    }

    res.status(200).json({
        success: true,
        message: `Commande '${commandName}' exécutée avec succès.`
    });
});

app.listen(PORT, () => {
    console.log(`Serveur actif sur http://localhost:${PORT}`);
});
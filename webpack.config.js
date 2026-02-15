// Récupération de la configuration par défaut de WordPress
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

// Liste de mes scripts à compiler
const scriptEntries = {
	"slotFills/index": './src/slotFills/index.js', // Le script des SlotFills pour l'éditeur de blocs
	"optionsPage/index": './src/optionsPage/index.js', // Le script de ma page d'options
	"hooks/index": './src/hooks/index.js', // Le hook pour ajouter une taille aux boutons
	"dataViews/index": './src/dataViews/index.js', // Le script pour la page des DataViews
	// Je peux déclarer ici tous les autres scripts que je veux compiler
};

// Fusion de ma configuration Webpack avec la configuration par défaut de WordPress
module.exports = {
	...defaultConfig,
	entry: () => ({
		...defaultConfig.entry(), // Les blocs seront compilés dans /build/blocks/
		...scriptEntries, // Mes scripts
	}),
};

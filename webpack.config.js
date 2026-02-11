const defaultConfig = require('@wordpress/scripts/config/webpack.config');

/**
 * Entry points pour les scripts qui ne sont PAS des blocks.
 *
 * Chaque clé correspond au nom du fichier généré dans build/.
 * Exemple : 'index' → build/index.js + build/index.asset.php
 *
 * Les blocks (dossiers avec block.json) sont auto-découverts
 * par --blocks-manifest et n'ont pas besoin d'être listés ici.
 */
const scriptEntries = {
	"slotFills/index": './src/slotFills/index.js',
};

module.exports = {
	...defaultConfig,
	entry: () => ({
		...defaultConfig.entry(),
		...scriptEntries,
	}),
};

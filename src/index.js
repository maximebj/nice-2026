// Les imports de composants WordPress
import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar, } from '@wordpress/editor';
import { useSettings } from '@wordpress/block-editor';
import { ColorPalette, PanelBody, TextControl, ToggleControl, __experimentalVStack as VStack } from '@wordpress/components';
import { starFilled } from '@wordpress/icons';

import { useState } from '@wordpress/element';

// Ce composant utilise <PluginSidebar> pour afficher un panneau latéral dans l'éditeur de blocs.
function PluginWcNicePanel() {
  const [name, setName] = useState('Conférence Nice 2026');
  const [color, setColor] = useState('#000000');
  const [isLive, setIsLive] = useState(true);

  // Récupérer les couleurs du thème
  const [themeColors] = useSettings("color.palette.theme");

  return (
    <PluginSidebar title={__("Bonjour Nice !", "nice-2026")} icon={starFilled}>
      <PanelBody>
        <VStack spacing={4}>
          <TextControl
            label={__("Nom de la conférence", "nice-2026")}
            help={__("Entrez le nom de la conférence", "nice-2026")}
            value={name}
            onChange={(value) => setName(value)}
          />
          <ToggleControl
            label={__("Conférence confirmée ?", "nice-2026")}
            help={__("Est-ce que la conférence est confirmée ?", "nice-2026")}
            checked={isLive}
            onChange={(value) => setIsLive(value)}
          />
          <ColorPalette
            label={__("Couleur de la conférence", "nice-2026")}
            help={__("Choisissez la couleur de la conférence", "nice-2026")}
            value={color}
            onChange={(value) => setColor(value)}
            colors={themeColors}
          />
        </VStack>
      </PanelBody>
    </PluginSidebar>
  );
}

// Déclarer l'ajout de notre composant dans l'éditeur de blocs
registerPlugin('wc-nice-2026-panel', { render: PluginWcNicePanel });
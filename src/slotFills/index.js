import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar } from '@wordpress/editor';
import { useSettings } from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import {
  ColorPalette,
  PanelBody,
  TextControl,
  ToggleControl,
  __experimentalVStack as VStack,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { starFilled } from '@wordpress/icons';

import './style.scss';

function PluginWcNicePanel() {

  const [themeColors] = useSettings("color.palette.theme");

  // Lire les meta depuis le store de l'éditeur
  const meta = useSelect((select) => {
    return select('core/editor').getEditedPostAttribute('meta') || {};
  }, []);

  // Dispatcher pour modifier les meta via editPost()
  const { editPost } = useDispatch('core/editor');

  // Fonction utilitaire pour mettre à jour une meta
  const updateMeta = (key, value) => {
    editPost({ meta: { [key]: value } });
  };

  return (
    <PluginSidebar title={__("Bonjour Nice !", "nice-2026")} icon={starFilled}>
      <PanelBody>
        <VStack spacing={4}>
          <TextControl
            label={__("Nom de la conférence", "nice-2026")}
            help={__("Entrez le nom de la conférence", "nice-2026")}
            value={meta.nice_2026_conference_name || ''}
            onChange={(value) => updateMeta('nice_2026_conference_name', value)}
          />

          <ToggleControl
            label={__("Conférence confirmée ?", "nice-2026")}
            help={__("Est-ce que la conférence est confirmée ?", "nice-2026")}
            checked={meta.nice_2026_conference_confirmed || false}
            onChange={(value) => updateMeta('nice_2026_conference_confirmed', value)}
          />

          <ToggleGroupControl
            label={__('Journée de l\'événement', 'nice-2026')}
            value={meta.nice_2026_event_day || ''}
            onChange={(value) => updateMeta('nice_2026_event_day', value)}
            isBlock
            __next40pxDefaultSize
            __nextHasNoMarginBottom
          >
            <ToggleGroupControlOption key="jeudi" value="jeudi" label={__('Jeudi', 'nice-2026')} />
            <ToggleGroupControlOption key="vendredi" value="vendredi" label={__('Vendredi', 'nice-2026')} />
            <ToggleGroupControlOption key="samedi" value="samedi" label={__('Samedi', 'nice-2026')} />
          </ToggleGroupControl>

          <ColorPalette
            label={__("Couleur de la conférence", "nice-2026")}
            help={__("Choisissez la couleur de la conférence", "nice-2026")}
            value={meta.nice_2026_conference_color || ''}
            onChange={(value) => updateMeta('nice_2026_conference_color', value)}
            colors={themeColors}
          />
        </VStack>
      </PanelBody>
    </PluginSidebar>
  );
}

// Déclarer l'ajout de notre composant dans l'éditeur de blocs
registerPlugin('wc-nice-2026-panel', { render: PluginWcNicePanel });
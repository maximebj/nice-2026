import domReady from "@wordpress/dom-ready";
import { createRoot } from "@wordpress/element";
import { useState, useEffect, useCallback } from '@wordpress/element';
import {
  Button,
  TextControl,
  ColorPalette,
  ToggleControl,
  Spinner,
  Notice,
  Card,
  CardHeader,
  CardBody,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
  __experimentalHeading as Heading,
  __experimentalVStack as VStack,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

import './styles.scss';

const ENDPOINT = '/nice-2026/v1/settings';

const DEFAULT_SETTINGS = {
  nice_2026_event_name: '',
  nice_2026_event_color: '#0073aa',
  nice_2026_event_confirmed: false,
  nice_2026_event_day: 'jeudi',
};

const COLORS = [
  { name: __('Bleu', 'nice-2026'), color: '#0073aa' },
  { name: __('Rouge', 'nice-2026'), color: '#cf2e2e' },
  { name: __('Orange', 'nice-2026'), color: '#ff6900' },
  { name: __('Jaune', 'nice-2026'), color: '#fcb900' },
  { name: __('Vert', 'nice-2026'), color: '#00d084' },
  { name: __('Violet', 'nice-2026'), color: '#9b51e0' },
  { name: __('Rose', 'nice-2026'), color: '#e91e8c' },
  { name: __('Noir', 'nice-2026'), color: '#1e1e1e' },
];

// Montage de l'application React dans le conteneur PHP
domReady(() => {
  const root = createRoot(document.getElementById("nice-2026-options-page"));
  root.render(<OptionsPage />);
});

// La page d'options
function OptionsPage() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notice, setNotice] = useState(null);

  console.log(settings);

  // Met à jour une clé dans l'objet settings
  const updateSetting = useCallback((key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Chargement initial des options
  useEffect(() => {
    apiFetch({ path: ENDPOINT })
      .then((data) => {
        setSettings({
          nice_2026_event_name: data.nice_2026_event_name || '',
          nice_2026_event_day: data.nice_2026_event_day || 'jeudi',
          nice_2026_event_color: data.nice_2026_event_color || '#0073aa',
          nice_2026_event_confirmed: !!data.nice_2026_event_confirmed,
        });
      })
      .catch(() => {
        setNotice({
          status: 'error',
          message: __('Impossible de charger les options.', 'nice-2026'),
        });
      })
      .finally(() => setIsLoading(false));
  }, []);

  // Sauvegarde
  const handleSave = () => {
    setIsSaving(true);
    setNotice(null);

    apiFetch({
      path: ENDPOINT,
      method: 'POST',
      data: settings,
    })
      .then(() => {
        setNotice({
          status: 'success',
          message: __('Options enregistrées.', 'nice-2026'),
        });
      })
      .catch(() => {
        setNotice({
          status: 'error',
          message: __('Erreur lors de l\'enregistrement.', 'nice-2026'),
        });
      })
      .finally(() => setIsSaving(false));
  };

  if (isLoading) {
    return (
      <div className="nice-2026-options-page nice-2026-options-page--loading">
        <Spinner />
      </div>
    );
  }

  return (
    <VStack spacing={8} className="nice-2026-options-page">
      <Heading level={1}>
        {__('Conférence Nice 2026 — Réglages', 'nice-2026')}
      </Heading>

      {notice && (
        <Notice
          status={notice.status}
          isDismissible
          onDismiss={() => setNotice(null)}
        >
          {notice.message}
        </Notice>
      )}

      <Card className="nice-2026-options-page__card">
        <CardHeader>
          <Heading level={2}>
            {__('Informations de l\'événement', 'nice-2026')}
          </Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={8}>
            <TextControl
              label={__('Nom de l\'événement', 'nice-2026')}
              value={settings.nice_2026_event_name}
              onChange={(value) => updateSetting('nice_2026_event_name', value)}
              help={__('Le nom affiché publiquement.', 'nice-2026')}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />
            <ToggleControl
              label={__('Événement confirmé ?', 'nice-2026')}
              help={__('Est-ce que l\'événement aura lieu ?', 'nice-2026')}
              checked={settings.nice_2026_event_confirmed}
              onChange={(value) => updateSetting('nice_2026_event_confirmed', value)}
              __nextHasNoMarginBottom
            />

            <ToggleGroupControl
              label={__('Journée de l\'événement', 'nice-2026')}
              value={settings.nice_2026_event_day}
              onChange={(value) => updateSetting('nice_2026_event_day', value)}
              isBlock
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            >
              <ToggleGroupControlOption key="jeudi" value="jeudi" label={__('Jeudi', 'nice-2026')} />
              <ToggleGroupControlOption key="vendredi" value="vendredi" label={__('Vendredi', 'nice-2026')} />
              <ToggleGroupControlOption key="samedi" value="samedi" label={__('Samedi', 'nice-2026')} />
            </ToggleGroupControl>

            <fieldset className="nice-2026-options-page__color-field">
              <legend>{__('Couleur de l\'événement', 'nice-2026')}</legend>
              <ColorPalette
                colors={COLORS}
                value={settings.nice_2026_event_color}
                onChange={(value) => updateSetting('nice_2026_event_color', value)}
              />
            </fieldset>
          </VStack>
        </CardBody>
      </Card>

      <div>
        <Button
          variant="primary"
          onClick={handleSave}
          isBusy={isSaving}
          disabled={isSaving}
        >
          {isSaving
            ? __('Enregistrement…', 'nice-2026')
            : __('Enregistrer', 'nice-2026')}
        </Button>
      </div>
    </VStack>
  );
}

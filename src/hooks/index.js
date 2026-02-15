import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, SelectControl } from "@wordpress/components";
import { createHigherOrderComponent } from "@wordpress/compose";
import { addFilter } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";

// Le bloc que l'on souhaite modifier
const allowedBlocks = ["core/button"];

// Ajouter des attributs au bloc
function addAttributes(settings, name) {
  // On vérifie qu'on est sur le bon bloc
  if (!allowedBlocks.includes(name)) {
    return settings;
  }

  // On ajoute l'attribut à l'objet des attributs
  settings.attributes = {
    ...settings.attributes,
    size: {
      type: "string",
      default: "medium",
    },
  };

  // Et on retourne l'objet modifié
  return settings;
}

// Hook numéro 1 : Ajouter des attributs au bloc
addFilter(
  "blocks.registerBlockType",
  "capitainewp/addAttributes",
  addAttributes
);

// Ajouter des contrôles dans l'inspecteur du bloc
const withAdvancedControls = createHigherOrderComponent(BlockEdit => {
  return props => {
    const { name, attributes, setAttributes, isSelected } = props;
    const { size } = attributes;

    // Définir la classe CSS en fonction de la taille
    props.className += ` has-size-${size}`;

    return (
      <>
        <BlockEdit {...props} />
        {isSelected && allowedBlocks.includes(name) && (
          <InspectorControls>
            <PanelBody title={__("Button Size", "capitainewp-hooks")}>
              <SelectControl
                label={__("Size", "capitainewp-hooks")}
                value={size}
                options={[
                  {
                    label: __("Small", "capitainewp-hooks"),
                    value: "small",
                  },
                  {
                    label: __("Medium", "capitainewp-hooks"),
                    value: "medium",
                  },
                  {
                    label: __("Large", "capitainewp-hooks"),
                    value: "large",
                  },
                ]}
                onChange={size => {
                  setAttributes({ size });
                }}
              />
            </PanelBody>
          </InspectorControls>
        )}
      </>
    );
  };
}, "withAdvancedControls");

// Hook numéro 2 : Ajouter des contrôles dans l'inspecteur du bloc
addFilter("editor.BlockEdit", "capitainewp/addControls", withAdvancedControls);


// Ajouter des classes au bloc enregistré en base
function applyExtraClass(extraProps, blockType, attributes) {
  // On vérifie qu'on est sur le bon bloc
  if (!allowedBlocks.includes(blockType.name)) {
    return extraProps;
  }

  // Récupérer la taille depuis les attributs
  const { size } = attributes;

  // Appliquer la classe CSS en fonction de la taille
  extraProps.className += ` has-size-${size}`;

  // Renvoyer les propriétés modifiées
  return extraProps;
}

// Hook numéro 3 : Ajouter des classes au bloc enregistré en base
addFilter(
  "blocks.getSaveContent.extraProps",
  "capitainewp/applyExtraClass",
  applyExtraClass
);
